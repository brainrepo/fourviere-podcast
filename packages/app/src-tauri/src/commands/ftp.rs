use ::function_name::named;
use log::{debug, error};
use std::borrow::Cow;
use std::path::Path;
use std::str;
use suppaftp::types::FileType;
use suppaftp::{AsyncFtpStream, Mode};
use tokio_util::compat::TokioAsyncReadCompatExt;

use crate::utils::result::Result;

#[derive(serde::Deserialize)]
pub struct Payload {
    host: String,
    port: u16,
    user: String,
    password: String,
    local_path: String,
    path: Option<String>,
    file_name: String,
    http_host: String,
    https: bool,
}

#[named]
#[tauri::command]
pub async fn ftp_upload(payload: Payload) -> Result<String> {
    let upload_result = ftp_upload_internal(payload).await;
    debug!("{} result {:?}", function_name!(), upload_result);
    if let Err(err) = &upload_result {
        error!("{} function failed: {:?}", function_name!(), err);
    }
    upload_result
}

async fn ftp_upload_internal(payload: Payload) -> Result<String> {
    let addr = format!("{}:{}", payload.host, payload.port);

    let mut ftp_stream = AsyncFtpStream::connect(addr).await?;

    ftp_stream.login(&payload.user, &payload.password).await?;

    // As default set the FTP connection to passive mode
    ftp_stream.set_mode(Mode::Passive);

    // https://www.iana.org/assignments/ftp-commands-extensions/ftp-commands-extensions.xhtml
    if ftp_stream
        .feat()
        .await
        .is_ok_and(|opts| opts.get("EPSV").is_some())
    {
        ftp_stream.set_mode(Mode::ExtendedPassive);
    }

    if let Some(path) = &payload.path {
        ftp_stream.cwd(path).await?;
    }

    ftp_stream.transfer_type(FileType::Binary).await?;

    let ext = Path::new(&payload.local_path)
        .extension()
        .map_or(Cow::default(), |ext| ext.to_string_lossy());

    let mut reader = tokio::fs::File::open(&payload.local_path)
        .await
        .map(tokio::io::BufReader::new)?
        .compat();

    ftp_stream
        .put_file(&format!("{}.{}", &payload.file_name, &ext), &mut reader)
        .await?;

    ftp_stream.quit().await?;

    let protocol = if payload.https { "https" } else { "http" };

    Ok(format!(
        "{}://{}/{}/{}.{}",
        protocol,
        payload.http_host,
        payload.path.unwrap_or("".to_string()),
        payload.file_name,
        ext
    ))
}

#[cfg(test)]
mod test {
    use std::{env::temp_dir, sync::Arc, time::Duration};

    use async_trait::async_trait;
    use libunftp::{
        auth::{AuthenticationError, Authenticator, Credentials, DefaultUser},
        ServerError,
    };
    use tokio::time::sleep;

    use crate::{
        commands::ftp::{ftp_upload, Payload},
        test_file,
    };

    #[derive(Debug)]
    struct TestAuthenticator;

    #[async_trait]
    impl Authenticator<DefaultUser> for TestAuthenticator {
        async fn authenticate(
            &self,
            username: &str,
            creds: &Credentials,
        ) -> Result<DefaultUser, AuthenticationError> {
            match username {
                "ForuviereTestUser" => match creds.password.as_deref() {
                    Some("StealThisUselessPassword") => Ok(DefaultUser),
                    _ => Err(AuthenticationError::BadPassword),
                },
                _ => Err(AuthenticationError::BadUser),
            }
        }
    }

    async fn ftp_server(port: u16) -> Result<(), ServerError> {
        let server = libunftp::Server::with_authenticator(
            Box::new(move || unftp_sbe_fs::Filesystem::new(temp_dir())),
            Arc::new(TestAuthenticator {}),
        )
        .passive_ports(50000..65535);

        server.listen(format!("127.0.0.1:{}", port)).await
    }

    #[tokio::test(flavor = "multi_thread")]
    async fn test_ftp_upload_ok() {
        let port = 2121;
        let payload = Payload {
            host: "localhost".to_string(),
            port: port,
            user: "ForuviereTestUser".to_string(),
            password: "StealThisUselessPassword".to_string(),
            local_path: test_file!("gitbar.xml").to_string(),
            path: None,
            file_name: "gitbar".to_string(),
            http_host: "localhost".to_string(),
            https: false,
        };

        let handle = tokio::spawn(async move {
            assert!(ftp_server(port).await.is_ok());
        });

        // Hopefully the server is up =D
        sleep(Duration::from_secs(2)).await;
        assert!(ftp_upload(payload).await.is_ok());
        handle.abort();
    }

    #[tokio::test(flavor = "multi_thread")]
    async fn test_ftp_upload_err_host() {
        let port = 2122;
        let payload = Payload {
            host: "localhosts".to_string(),
            port: port,
            user: "ForuviereTestUser".to_string(),
            password: "StealThisUselessPassword".to_string(),
            local_path: test_file!("gitbar.xml").to_string(),
            path: None,
            file_name: "gitbar".to_string(),
            http_host: "localhosts".to_string(),
            https: false,
        };

        let handle = tokio::spawn(async move {
            assert!(ftp_server(port).await.is_ok());
        });

        // Hopefully the server is up =D
        sleep(Duration::from_secs(2)).await;
        assert!(ftp_upload(payload).await.is_err());
        handle.abort();
    }

    #[tokio::test(flavor = "multi_thread")]
    async fn test_ftp_upload_err_user() {
        let port = 2123;
        let payload = Payload {
            host: "localhost".to_string(),
            port: port,
            user: "NotAValidUserName".to_string(),
            password: "StealThisUselessPassword".to_string(),
            local_path: test_file!("gitbar.xml").to_string(),
            path: None,
            file_name: "gitbar".to_string(),
            http_host: "localhost".to_string(),
            https: false,
        };

        let handle = tokio::spawn(async move {
            assert!(ftp_server(port).await.is_ok());
        });

        // Hopefully the server is up =D
        sleep(Duration::from_secs(2)).await;
        assert!(ftp_upload(payload).await.is_err());
        handle.abort();
    }

    #[tokio::test(flavor = "multi_thread")]
    async fn test_ftp_upload_err_local_path() {
        let port = 2124;
        let payload = Payload {
            host: "localhost".to_string(),
            port: port,
            user: "ForuviereTestUser".to_string(),
            password: "StealThisUselessPassword".to_string(),
            local_path: test_file!("gitbar.rss").to_string(),
            path: None,
            file_name: "gitbar".to_string(),
            http_host: "localhost".to_string(),
            https: false,
        };

        let handle = tokio::spawn(async move {
            assert!(ftp_server(port).await.is_ok());
        });

        // Hopefully the server is up =D
        sleep(Duration::from_secs(2)).await;
        assert!(ftp_upload(payload).await.is_err());
        handle.abort();
    }
}
