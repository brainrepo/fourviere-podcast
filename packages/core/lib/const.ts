export const FEED_TEMPLATE = `
<rss xmlns:podcast="https://github.com/Podcastindex-org/podcast-namespace/blob/main/docs/1.0.md" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" version="2.0">
    <channel>
        <title>Fourviere Podcast</title>
        <description>This is a fake show that exists only as an example of the "podcast" namespace tag usage.</description>
        <link>http://example.com/podcast</link>
        <docs>http://blogs.law.harvard.edu/tech/rss</docs>
        <language>en-US</language>
        <generator>Fourviere</generator>
        <pubDate>Fri, 09 Oct 2020 04:30:38 GMT</pubDate>
        <lastBuildDate>Fri, 09 Oct 2020 04:30:38 GMT</lastBuildDate>
        <managingEditor>john@example.com (John Doe)</managingEditor>
        <webMaster>support@example.com (Tech Support)</webMaster>
        <image>
            <url>https://example.com/images/pci_avatar-massive.jpg</url>
            <title>Podcast Feed Template</title>
            <link>https://example.com/show</link>
        </image>

        <podcast:guid>y0ur-gu1d-g035-h3r3</podcast:guid>

        <podcast:license url="https://example.org/mypodcastlicense/full.pdf">my-podcast-license-v1</podcast:license>

        <podcast:locked owner="podcastowner@example.com">yes</podcast:locked>
        <podcast:block>yes</podcast:block>
        <podcast:block id="google">no</podcast:block>
        <podcast:block id="amazon">no</podcast:block>

        <podcast:funding url="https://example.com/donate">Support the show!</podcast:funding>

        <podcast:location geo="geo:30.2672,97.7431" osm="R113314">Austin, TX</podcast:location>
        <podcast:medium>podcast</podcast:medium>

        <itunes:author>John Doe</itunes:author>
        <itunes:explicit>false</itunes:explicit>
        <itunes:type>episodic</itunes:type>
        <itunes:category text="News"/>
        <itunes:category text="Technology"/>

        <itunes:owner>
        <itunes:name>John Doe</itunes:name>
        <itunes:email>johndoe@example.com</itunes:email>
        </itunes:owner>

        <itunes:image>https://example.com/images/pci_avatar-massive.jpg</itunes:image>

        <podcast:value type="lightning" method="keysend" suggested="0.00000005000">
            <podcast:valueRecipient name="podcaster" type="node" address="036557ea56b3b86f08be31bcd2557cae8021b0e3a9413f0c0e52625c6696972e57" split="99" />
            <podcast:valueRecipient name="hosting company" type="node" address="036557ea56b3b86f08be31bcd2557cae8021b0e3a9413f0c0e52625c6696972e57" split="1" />
        </podcast:value>

        <podcast:trailer pubdate="Thu, 01 Apr 2021 08:00:00 EST" url="https://example.org/trailers/teaser" length="12345678" type="audio/mp3">Coming April 1st, 2021</podcast:trailer>

        <podcast:liveItem status="live" start="2021-09-26T07:30:00.000-0600" end="2021-09-26T09:30:00.000-0600">
            <title>Podcasting 2.0 Live Show</title>
            <description>A look into the future of podcasting and how we get to Podcasting 2.0!</description>
            <link>https://example.com/podcast/live</link>
            <guid isPermaLink="true">https://example.com/live</guid>
            <podcast:alternateEnclosure type="audio/mpeg" length="312" default="true">
                <podcast:source uri="https://example.com/pc20/livestream" />
            </podcast:alternateEnclosure>
            <enclosure url="https://example.com/pc20/livestream?format=.mp3" type="audio/mpeg" length="312" />
            <podcast:contentLink href="https://youtube.com/pc20/livestream">YouTube!</podcast:contentLink>
            <podcast:contentLink href="https://twitch.com/pc20/livestream">Twitch!</podcast:contentLink>
        </podcast:liveItem>

        <item>
            <title>Episode 3 - The Future</title>
            <description>&lt;p&gt;A look into the future of podcasting and how we get to Podcasting 2.0!&lt;/p&gt;</description>
            <link>https://example.com/podcast/ep0003</link>
            <guid isPermaLink="true">https://example.com/ep0003</guid>
            <pubDate>Fri, 09 Oct 2020 04:30:38 GMT</pubDate>
            <author>John Doe (john@example.com)</author>
            <itunes:image>https://example.com/ep0003/artMd.jpg</itunes:image>
            <podcast:images srcset="https://example.com/images/ep3/pci_avatar-massive.jpg 1500w,
                                        https://example.com/images/ep3/pci_avatar-middle.jpg 600w,
                                        https://example.com/images/ep3/pci_avatar-small.jpg 300w,
                                        https://example.com/images/ep3/pci_avatar-tiny.jpg 150w" />
            <itunes:explicit>false</itunes:explicit>
            <podcast:season name="Podcasting 2.0">1</podcast:season>
            <podcast:episode>3</podcast:episode>
            <podcast:chapters url="https://example.com/ep3_chapters.json" type="application/json"/>
            <podcast:soundbite startTime="33.833" duration="60.0" />
            <podcast:transcript url="https://example.com/ep3/transcript.txt" type="text/plain" />
            <podcast:person href="https://www.podchaser.com/creators/adam-curry-107ZzmWE5f" img="https://example.com/images/adamcurry.jpg">Adam Curry</podcast:person>
            <podcast:person role="guest" href="https://github.com/daveajones/" img="https://example.com/images/davejones.jpg">Dave Jones</podcast:person>
            <podcast:person group="visuals" role="cover art designer" href="https://example.com/artist/beckysmith">Becky Smith</podcast:person>
            
            <enclosure url="https://example.com/file-03.mp3" length="43200000" type="audio/mpeg" />

            <podcast:alternateEnclosure type="audio/mpeg" length="43200000" bitrate="128000" default="true" title="Standard">
                <podcast:source uri="https://example.com/file-03.mp3" />
                <podcast:source uri="ipfs://someRandomMpegFile03" />
            </podcast:alternateEnclosure>

            <podcast:alternateEnclosure type="audio/opus" length="32400000" bitrate="96000" title="High quality">
                <podcast:source uri="https://example.com/file-high-03.opus" />
                <podcast:source uri="ipfs://someRandomHighBitrateOpusFile03" />
            </podcast:alternateEnclosure>

            <podcast:alternateEnclosure type="audio/aac" length="54000000" bitrate="160000" title="High quality AAC">
                <podcast:source uri="https://example.com/file-proprietary-03.aac" />
                <podcast:source uri="ipfs://someRandomProprietaryAACFile03" />
            </podcast:alternateEnclosure>

            <podcast:alternateEnclosure type="audio/opus" length="5400000" bitrate="16000" title="Low bandwidth">
                <podcast:source uri="https://example.com/file-low-03.opus" />
                <podcast:source uri="ipfs://someRandomLowBitrateOpusFile03" />
            </podcast:alternateEnclosure>

            <podcast:alternateEnclosure type="video/mp4" length="7924786" bitrate="511276.52" height="720" title="Video version">
                <podcast:source uri="https://example.com/file-720.mp4" />
                <podcast:source uri="ipfs://QmX33FYehk6ckGQ6g1D9D3FqZPix5JpKstKQKbaS8quUFb" />
                <podcast:integrity type="sri" value="sha384-ExVqijgYHm15PqQqdXfW95x+Rs6C+d6E/ICxyQOeFevnxNLR/wtJNrNYTjIysUBo" />
            </podcast:alternateEnclosure>

            <podcast:value type="lightning" method="keysend" suggested="0.00000005000">
                <podcast:valueRecipient name="podcaster" type="node" address="036557ea56b3b86f08be31bcd2557cae8021b0e3a9413f0c0e52625c6696972e57" split="49" />
                <podcast:valueRecipient name="hosting company" type="node" address="036557ea56b3b86f08be31bcd2557cae8021b0e3a9413f0c0e52625c6696972e57" split="1" />
                <podcast:valueRecipient name="Gigi (Guest)" type="node" address="02e12fea95f576a680ec1938b7ed98ef0855eadeced493566877d404e404bfbf52" split="50" />
            </podcast:value>

            <podcast:socialInteract priority="1" uri="https://podcastindex.social/web/@dave/108013847520053258" protocol="activitypub" accountId="@dave" accountUrl="https://podcastindex.social/web/@dave" />
            <podcast:socialInteract priority="2" uri="https://twitter.com/PodcastindexOrg/status/1507120226361647115" protocol="twitter" accountId="@podcastindexorg" accountUrl="https://twitter.com/PodcastindexOrg" />

        </item>
    </channel>
</rss>
`;
