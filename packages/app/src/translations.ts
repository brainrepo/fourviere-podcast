const TRANSLATIONS = {
  en: {
    "start.create": "Create a new feed",
    "start.or": "or",
    "start.open_file": "open from a file",
    "start.load_from_url": "fetch by remote address",
    "start.load_from_podcastindex": "import from podcastindex",
    "start.start_by_url.title": "Import new feed from remote address",
    "start.start_by_url.action": "Import",
    "start.start_by_url.errors.invalid_xml": "The feed is not a valid XML",
    "start.start_by_url.errors.invalid_podcast_feed":
      "The feed is not a valid podcast feed",
    "start.start_by_url.errors.generic": "Error during fetching podcast feed",
    "start.start_by_url.errors.invalid_url": "The URL provided is not valid",
    "start.start_by_index.title": "Import a podcast feed from podcastindex",
    "start.start_by_index.action": "Search",
    "start.start_by_index.errors.generic":
      "Error during fetching podcast index",
    "start.start_by_index.errors.invalid_xml": "The feed is not a valid XML",
    "start.start_by_index.errors.invalid_podcast_feed":
      "The feed is not a valid podcast feed",
    "start.start_by_index.importing_in_progress":
      "Importing in progress... please wait",
  },
} as const;

export default TRANSLATIONS;
