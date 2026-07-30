export type IconName =
  | "bolt"
  | "shield"
  | "hd"
  | "devices"
  | "free"
  | "layers"
  | "music"
  | "avatar"
  | "clock"
  | "lock";

export type Step = { title: string; body: string };
export type Feature = { icon: IconName; title: string; body: string };
export type Faq = { q: string; a: string };
export type Section = {
  heading: string;
  paragraphs: string[];
  bullets?: { title: string; body: string }[];
};

export type Tool = {
  /** URL path. The reels tool lives at the root. */
  path: string;
  /** Short label used in the header and footer. */
  nav: string;
  /** Full product name, used in breadcrumbs and structured data. */
  name: string;
  h1: string;
  lead: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** Which upstream lookup the form should run. */
  mode: "post" | "profile";
  placeholder: string;
  cta: string;
  hint: string;
  /** Short trust badges shown under the input. */
  badges: string[];
  steps: Step[];
  features: Feature[];
  sections: Section[];
  specs: { label: string; value: string }[];
  faqs: Faq[];
};

const UNIVERSAL_FAQS: Faq[] = [
  {
    q: "Is iLoveReels really free?",
    a: "Yes. Every tool on the site is free, with no download caps, no queue for the second file, and no account to create. There is nothing to upgrade to, so you will never hit a paywall halfway through a save.",
  },
  {
    q: "Do I need to install an app or browser extension?",
    a: "No. iLoveReels runs entirely in the browser you already have. Extensions that promise the same thing usually ask for permission to read every page you visit, which is a steep price for saving a video. A web page cannot do that.",
  },
  {
    q: "Can I download from private accounts?",
    a: "No, and that is deliberate. Our tools only reach content Instagram already serves publicly. If an account is private, its posts are shared under the expectation that they stay inside that follower list, and we will not work around it.",
  },
  {
    q: "Is it safe to use?",
    a: "We never ask for your Instagram password, because the tool does not need one. Traffic runs over HTTPS, the link you paste is used to fetch the file and then discarded, and we do not keep a copy of anything you download.",
  },
];

const ATTRIBUTION_SECTION: Section = {
  heading: "A short, honest note about who owns what you save",
  paragraphs: [
    "Downloading a file does not transfer its copyright. The person who filmed, edited, or designed the post still owns it, exactly as they did before you pressed the button. That distinction matters more than most downloader sites are willing to admit.",
    "In practice the line is simple. Saving a Reel to rewatch offline, to study a transition frame by frame, to keep a backup of your own work, or to send to one friend is ordinary personal use. Re-uploading someone else's clip to your own feed, stripping their handle from it, or selling it is not, and no tool can make it so.",
    "If you want to share something publicly, the kindest and safest route is Instagram's own share and repost features, which keep the original creator attached to the work. When in doubt, ask the creator. Most people say yes to a polite message and appreciate being asked.",
  ],
};

const PRIVACY_SECTION: Section = {
  heading: "What we store when you use the tool: nothing",
  paragraphs: [
    "Most download sites bury this. Here it is in plain language. When you paste a link, our server uses it to look up the public media for that post, streams the file back to your browser, and forgets the request. There is no account, so there is no download history to leak. We do not build a profile of what you watch.",
    "We do not ask for your Instagram credentials at any point. Any site that does is asking for the keys to your account in exchange for a video file, and that is never a fair trade. If you have already entered your password into a downloader somewhere, change it and turn on two-factor authentication.",
  ],
};

function withCommonSections(sections: Section[]): Section[] {
  return [...sections, PRIVACY_SECTION, ATTRIBUTION_SECTION];
}

export const TOOLS: Tool[] = [
  {
    path: "/",
    nav: "Reels",
    name: "Instagram Reels Downloader",
    h1: "Download Instagram Reels in original quality",
    lead:
      "Paste a Reel link and get the real MP4 — the same file Instagram serves, at the resolution it was uploaded in. No watermark stamped on top, no account, no app.",
    metaTitle: "Instagram Reels Downloader — Save Reels in HD MP4, Free",
    metaDescription:
      "Download Instagram Reels as clean HD MP4 files. Paste a link, press save, done. No watermark, no login, no app — works on iPhone, Android, Windows and Mac.",
    keywords: [
      "instagram reels downloader",
      "download instagram reels",
      "reels to mp4",
      "save instagram reels hd",
      "instagram reel downloader no watermark",
    ],
    mode: "post",
    placeholder: "https://www.instagram.com/reel/…",
    cta: "Get the Reel",
    hint: "Works with reel, post, and share links. A bare shortcode works too.",
    badges: ["No watermark", "No sign-up", "Original resolution", "Unlimited"],
    steps: [
      {
        title: "Copy the link",
        body: "On the Reel, tap the paper-plane share icon and choose Copy link. On desktop, use the ••• menu, or simply copy the address bar while the Reel is open.",
      },
      {
        title: "Paste it above",
        body: "Drop the link into the box and press the button. Tracking junk like ?igsh= on the end is fine — we strip it down to the post ID for you.",
      },
      {
        title: "Save the file",
        body: "You will see a preview with the creator's handle. Press Download and the MP4 lands in your device's downloads folder, ready to move into Photos or Gallery.",
      },
    ],
    features: [
      {
        icon: "hd",
        title: "The original file, not a re-encode",
        body: "We hand you the exact MP4 from Instagram's CDN. Nothing is re-compressed, so a 1080p Reel stays 1080p and the audio track stays untouched.",
      },
      {
        icon: "bolt",
        title: "Usually done before you look up",
        body: "One request out, one file back. Most Reels resolve in a couple of seconds, and the download starts streaming immediately instead of waiting on a conversion queue.",
      },
      {
        icon: "shield",
        title: "Nothing about you is kept",
        body: "No account, no history, no password. The link you paste is used once to fetch the media and is not written to a database.",
      },
      {
        icon: "devices",
        title: "Every device, no install",
        body: "Safari on an iPhone, Chrome on Android, Firefox or Edge on a laptop. If it renders this page, it can save the file.",
      },
    ],
    sections: withCommonSections([
      {
        heading: "Why the watermark question keeps coming up",
        paragraphs: [
          "Search for a Reels downloader and half the results promise 'no watermark' as though they scrubbed something off the video. They usually did not, and the truth is more useful to know.",
          "There are two different marks people mean. The first is baked into the picture by the creator or by an editing app such as CapCut — it is part of the image data, and no downloader can remove it without re-encoding the video and degrading it. The second is added by the download site itself, which some services do so their brand rides along on every share.",
          "iLoveReels never adds the second kind. You get the file Instagram stores, byte for byte. If a logo sits in the corner of the finished video, it was in the upload before we ever saw it, and honestly, that is the creator's signature — worth leaving alone.",
        ],
      },
      {
        heading: "What people actually use this for",
        paragraphs: [
          "Reels are built to be watched once and scrolled past. That works until you need one again, and the algorithm has no interest in helping you find it.",
        ],
        bullets: [
          {
            title: "Keeping your own work",
            body: "Creators lose access to their uploads more often than you would expect — a lost password, a wrongly flagged account, a phone that did not back up. Pulling your own Reels down is the cheapest insurance there is.",
          },
          {
            title: "Watching where there is no signal",
            body: "Flights, trains through tunnels, long commutes underground. Save the recipe or the workout beforehand and it plays without a single bar of reception.",
          },
          {
            title: "Studying a technique frame by frame",
            body: "Editors, dancers, and athletes want to scrub back and forth at quarter speed. In a local player you can do that. Inside the Instagram app you cannot.",
          },
          {
            title: "Collecting reference for a project",
            body: "Mood boards, pitch decks, and shot lists all get easier when the reference lives in a folder instead of a saved-posts tab you have to scroll.",
          },
        ],
      },
      {
        heading: "Saving a Reel on an iPhone, step by step",
        paragraphs: [
          "iOS handles downloads differently from Android, which trips people up. Safari does not drop a video straight into Photos — it goes to Files first, and you move it across. It takes about ten seconds once you know the path.",
          "Open the Reel in the Instagram app, tap the share arrow, and choose Copy link. Switch to Safari, come back to this page, and paste. Press Download, and iOS asks you to confirm; accept it. Open the Files app, go to Downloads, and tap the new MP4. Use the share icon there and pick Save Video — it now appears in your camera roll and syncs with iCloud Photos like anything you filmed yourself.",
          "On Android the flow is shorter. Chrome saves the file to your Downloads folder and the Gallery app picks it up automatically, usually within a few seconds. If it does not appear, open Gallery, pull down to refresh, and check the Downloads album.",
        ],
      },
    ]),
    specs: [
      { label: "Container", value: "MP4 (H.264 video, AAC audio)" },
      { label: "Resolution", value: "Whatever was uploaded, up to 1080p" },
      { label: "Watermark added", value: "None" },
      { label: "Typical wait", value: "2–5 seconds" },
      { label: "Daily limit", value: "None" },
      { label: "Account needed", value: "No" },
    ],
    faqs: [
      {
        q: "Will the Reel keep its sound?",
        a: "Yes. The MP4 you receive is the original file with its AAC audio track intact, so music, voiceover, and effects all come along. We do not separate or re-encode the audio.",
      },
      {
        q: "Why does my download say 'link expired'?",
        a: "Instagram signs its media URLs and they stop working after a while. If you left a result sitting in the tab for an hour, just paste the link again — a fresh lookup gives you a fresh URL.",
      },
      {
        q: "Can I download a Reel that uses licensed music?",
        a: "Technically the file comes down with its audio. Whether you may reuse it is a separate question: the music is licensed to Instagram for playback there, not to you for a new upload. Personal offline viewing is fine; republishing is where you run into trouble.",
      },
      {
        q: "Does the creator find out I saved their Reel?",
        a: "No. Instagram does not notify anyone about downloads, and we never touch your account, so there is nothing to show up in their notifications.",
      },
      {
        q: "The Reel is from a private account and it fails. Why?",
        a: "Because we only fetch what Instagram serves publicly, and a private post is not that. This is a deliberate limit, not a bug — no downloader should be picking locks on someone's follower-only content.",
      },
      ...UNIVERSAL_FAQS,
    ],
  },

  {
    path: "/instagram-video-downloader",
    nav: "Video",
    name: "Instagram Video Downloader",
    h1: "Download any public Instagram video",
    lead:
      "Feed posts, long-form uploads, old IGTV clips, and the video slides inside a carousel. One box, the original MP4 out the other side.",
    metaTitle: "Instagram Video Downloader — Save Any IG Video as MP4",
    metaDescription:
      "Save Instagram videos in full quality: feed posts, IGTV, and carousel clips. Paste the link and download a clean MP4 — free, no login, no watermark added.",
    keywords: [
      "instagram video downloader",
      "download instagram video",
      "igtv downloader",
      "instagram mp4 download",
    ],
    mode: "post",
    placeholder: "https://www.instagram.com/p/…",
    cta: "Get the video",
    hint: "Feed posts, IGTV, and Reels all work here.",
    badges: ["Full quality", "No sign-up", "MP4 out", "Unlimited"],
    steps: [
      {
        title: "Copy the post link",
        body: "Use the ••• menu on the post and choose Copy link, or copy the URL from your browser's address bar while the video is open.",
      },
      {
        title: "Paste and fetch",
        body: "Put it in the box above. We read the post ID and pull every video attached to it, including each clip in a mixed carousel.",
      },
      {
        title: "Pick and download",
        body: "Each video appears as its own preview with its own button, so you can take one clip or all of them.",
      },
    ],
    features: [
      {
        icon: "hd",
        title: "Source quality preserved",
        body: "The file is copied, not converted. Whatever bitrate and resolution the creator uploaded is what reaches your disk.",
      },
      {
        icon: "layers",
        title: "Multi-video posts handled",
        body: "A carousel with four clips gives you four buttons. No guessing which slide you are about to get.",
      },
      {
        icon: "free",
        title: "No cap, no counter",
        body: "Archive a whole series in one sitting. There is no daily quota waiting to interrupt you on the fifth file.",
      },
      {
        icon: "clock",
        title: "Old posts still work",
        body: "IGTV as a brand is gone, but the videos live on as ordinary posts. Links from that era resolve exactly the same way.",
      },
    ],
    sections: withCommonSections([
      {
        heading: "Reels, feed videos, and IGTV are the same file underneath",
        paragraphs: [
          "Instagram has renamed and merged its video formats several times, which leaves people hunting for a specific downloader for each one. That hunt is unnecessary.",
          "Whatever the label on the surface, a video post is a video post: it has a shortcode in its URL and an MP4 behind it. IGTV was folded into the feed, long-form uploads sit beside short ones, and Reels are distinguished mainly by where Instagram chooses to surface them. This page and the Reels page run the same lookup, so if a link works on one it works on the other.",
          "The only real division is public versus private. Everything public resolves. Nothing private does.",
        ],
      },
      {
        heading: "Getting a usable file for editing, not just viewing",
        paragraphs: [
          "If the video is going into Premiere, DaVinci Resolve, or CapCut rather than straight to your camera roll, a few details matter.",
          "Instagram delivers H.264 in an MP4 container with AAC audio, which every editor on the market imports without a fuss. Because we never re-encode, you are not stacking a second round of compression on top of the one Instagram already applied — that second pass is what turns gradients blotchy and smears fast motion.",
          "Do expect the platform's own compression to be there. Instagram re-encodes on upload, so the file you retrieve is not the creator's master. For a polished project, ask them for the original. For reference, rough cuts, and reaction content, what you get here is plenty.",
        ],
      },
    ]),
    specs: [
      { label: "Container", value: "MP4 (H.264 / AAC)" },
      { label: "Sources", value: "Feed video, Reels, IGTV, carousel clips" },
      { label: "Re-encoding", value: "None — file is copied as-is" },
      { label: "Batch", value: "Every video in a post at once" },
      { label: "Cost", value: "Free, unlimited" },
    ],
    faqs: [
      {
        q: "Can I download just one clip out of a carousel?",
        a: "Yes. Every item in the post gets its own preview and its own download button, so you take exactly the slides you want and skip the rest.",
      },
      {
        q: "Do old IGTV links still work?",
        a: "They do. IGTV was retired as a separate product but the videos remained as normal posts, and their /tv/ links still resolve. Paste one and it behaves like any other video.",
      },
      {
        q: "What is the longest video this handles?",
        a: "There is no length limit on our side. The download simply streams for longer on a fifteen-minute upload than on a fifteen-second one.",
      },
      {
        q: "Why is the file smaller than I expected?",
        a: "Instagram compresses everything on upload to keep playback fast worldwide. You are getting their stored copy at full fidelity — but their copy is already lighter than the creator's export.",
      },
      ...UNIVERSAL_FAQS,
    ],
  },

  {
    path: "/instagram-photo-downloader",
    nav: "Photo",
    name: "Instagram Photo Downloader",
    h1: "Save Instagram photos at full resolution",
    lead:
      "Get the full-size JPEG instead of a blurry screenshot — no status bar across the top, no cropped edges, no interface in the way.",
    metaTitle: "Instagram Photo Downloader — Save IG Images in Full Size",
    metaDescription:
      "Download Instagram photos in original resolution. Paste a post link and save clean, full-size JPEGs — free, no login, no screenshot cropping.",
    keywords: [
      "instagram photo downloader",
      "download instagram photos",
      "save instagram picture",
      "instagram image downloader full size",
    ],
    mode: "post",
    placeholder: "https://www.instagram.com/p/…",
    cta: "Get the photo",
    hint: "Single images and every slide of a carousel.",
    badges: ["Full resolution", "Clean JPEG", "No sign-up", "Unlimited"],
    steps: [
      {
        title: "Copy the post link",
        body: "Tap ••• on the photo and choose Copy link, or copy the URL straight from the address bar on desktop.",
      },
      {
        title: "Paste it above",
        body: "We pull every image attached to that post, whether it holds one picture or ten.",
      },
      {
        title: "Download what you need",
        body: "Each image gets its own button. Grab the single shot you came for or work down the whole set.",
      },
    ],
    features: [
      {
        icon: "hd",
        title: "Sharper than any screenshot",
        body: "A screenshot captures your screen — interface, notch, and all — at your display's resolution. This fetches the stored image, which is typically 1080 pixels on the long edge and completely clean.",
      },
      {
        icon: "layers",
        title: "Whole carousels at once",
        body: "A ten-slide post gives you ten separate downloads rather than ten rounds of swipe, screenshot, crop.",
      },
      {
        icon: "shield",
        title: "No account, no trace",
        body: "You never sign in, so there is no history tying a saved image back to you.",
      },
      {
        icon: "devices",
        title: "Straight to camera roll",
        body: "On mobile the JPEG saves like any photo. On desktop it lands in Downloads, ready to drop into a document or board.",
      },
    ],
    sections: withCommonSections([
      {
        heading: "Why screenshots quietly ruin the picture",
        paragraphs: [
          "Screenshotting is the reflex, and it costs more quality than most people realise.",
          "A screenshot records what your display shows: the image scaled down to fit a phone screen, with the status bar, the caption, and the interface baked in. Then you crop, which throws away pixels a second time, and the app re-compresses what is left. Print that or drop it into a design and the softness is obvious.",
          "Fetching the stored file skips every one of those steps. You get Instagram's copy at the resolution it serves — usually 1080 pixels wide for a square post — with nothing overlaid and no second round of compression.",
        ],
      },
      {
        heading: "What full resolution means here",
        paragraphs: [
          "One honest caveat, because plenty of sites promise 'original quality' and hope nobody checks.",
          "Instagram resizes and re-encodes every upload. A 45-megapixel photo from a professional camera is stored at roughly 1080 pixels on its long edge, and that stored version is the only one the platform will ever hand out. No tool can conjure back the pixels Instagram discarded, whatever the marketing says.",
          "So 'full resolution' here means the largest file Instagram actually holds — considerably better than a screenshot, and the ceiling of what any downloader can reach. If you need the true original for print, the photographer is the only source.",
        ],
      },
    ]),
    specs: [
      { label: "Format", value: "JPEG, as stored by Instagram" },
      { label: "Typical size", value: "1080 px on the long edge" },
      { label: "Carousels", value: "Every slide, individually" },
      { label: "Overlay or crop", value: "None" },
      { label: "Cost", value: "Free, unlimited" },
    ],
    faqs: [
      {
        q: "Can I get the true original a camera produced?",
        a: "No, and neither can anything else. Instagram resizes on upload and only stores the resized version. What you receive here is that stored file at full size, which is the maximum any tool can reach.",
      },
      {
        q: "Does this work on posts that mix photos and video?",
        a: "Yes. A mixed carousel returns both — images as JPEG, clips as MP4 — each labelled with its own download button.",
      },
      {
        q: "Will the caption or hashtags come with the image?",
        a: "The file itself is just the picture. We show the caption on screen next to the result so you can copy any part of it you need.",
      },
      {
        q: "Can I use a downloaded photo on my own account?",
        a: "Not without permission. Saving it for personal reference is ordinary use; reposting someone's photograph as your own content needs their consent, and a credit in the caption is not a substitute for asking.",
      },
      ...UNIVERSAL_FAQS,
    ],
  },

  {
    path: "/instagram-carousel-downloader",
    nav: "Carousel",
    name: "Instagram Carousel Downloader",
    h1: "Download an entire Instagram carousel at once",
    lead:
      "Every slide of a multi-image post, in order, each with its own button. No swiping, no screenshotting, no missing the tenth one.",
    metaTitle: "Instagram Carousel Downloader — Save All Slides of a Post",
    metaDescription:
      "Download all slides from an Instagram carousel in one go. Photos and videos, full quality, in the original order — free and without an account.",
    keywords: [
      "instagram carousel downloader",
      "download all instagram slides",
      "instagram album downloader",
      "download multiple instagram photos",
    ],
    mode: "post",
    placeholder: "https://www.instagram.com/p/…",
    cta: "Get every slide",
    hint: "Up to twenty slides, photos and videos mixed.",
    badges: ["All slides", "Original order", "Mixed media", "Unlimited"],
    steps: [
      {
        title: "Copy the carousel link",
        body: "One link covers the whole post. It makes no difference which slide is on screen when you copy it.",
      },
      {
        title: "Paste and fetch",
        body: "We expand the post into its individual items and show them in the order the creator arranged them.",
      },
      {
        title: "Take what you want",
        body: "Download slide by slide, or work straight down the list to archive the full set.",
      },
    ],
    features: [
      {
        icon: "layers",
        title: "Order is preserved",
        body: "Slides appear numbered as they were published, which matters when the post is a tutorial or a before-and-after.",
      },
      {
        icon: "hd",
        title: "Photos and videos together",
        body: "Mixed carousels are handled natively — JPEGs where there were photos, MP4s where there were clips.",
      },
      {
        icon: "bolt",
        title: "One lookup for the set",
        body: "Ten slides cost one request, not ten. The previews all appear together.",
      },
      {
        icon: "free",
        title: "No slide limit",
        body: "Instagram allows up to twenty items in a post and we return all of them.",
      },
    ],
    sections: withCommonSections([
      {
        heading: "Carousels are where the useful content hides",
        paragraphs: [
          "Reels get the reach, but carousels get the substance. Recipes, workout plans, design breakdowns, statistics, step-by-step explainers — the formats worth keeping are almost always multi-slide.",
          "They are also the most annoying to save. Screenshotting ten slides means ten swipes, ten captures, ten crops, and a camera roll full of half-cropped images with a progress bar across the bottom. Then you find slide seven is missing.",
          "Pasting one link and getting a clean numbered set solves that in a single step, and the files are the stored originals rather than pictures of your own screen.",
        ],
      },
      {
        heading: "Keeping a set organised once it is saved",
        paragraphs: [
          "Files arrive named after the post rather than the content, which is fine for one save and unhelpful for fifty.",
          "If you are building a reference library, make a folder per post and rename each file with its slide number and a couple of words about what it shows — 07-proofing-times beats a string of digits when you come back in March. Copy the caption into a plain text file in the same folder; it usually holds the detail the slides only gesture at, and it keeps the creator's handle attached to the material.",
          "For anything you plan to reference publicly later, note the post URL alongside it. Future you will want to credit the source without having to hunt for it again.",
        ],
      },
    ]),
    specs: [
      { label: "Slides per post", value: "Up to 20" },
      { label: "Media types", value: "JPEG and MP4, mixed freely" },
      { label: "Ordering", value: "As published" },
      { label: "Requests used", value: "One per post" },
      { label: "Cost", value: "Free, unlimited" },
    ],
    faqs: [
      {
        q: "Can I get all slides as a single zip?",
        a: "Not currently — each slide downloads individually. Zipping would mean pulling every file onto our server first, which is exactly the kind of copy-keeping we would rather not do.",
      },
      {
        q: "Does the link change depending on which slide is showing?",
        a: "No. A carousel has one URL for the whole post, so it does not matter where you were when you copied it.",
      },
      {
        q: "Why do I see fewer items than the post has?",
        a: "Almost always because the post was edited after publishing and some slides were removed. We return what Instagram currently serves for that post ID.",
      },
      {
        q: "Are the videos in a carousel lower quality than a Reel?",
        a: "They come down exactly as stored. Carousel clips are often shorter and lighter than a standalone Reel, but nothing extra is lost on the way to you.",
      },
      ...UNIVERSAL_FAQS,
    ],
  },

  {
    path: "/instagram-audio-downloader",
    nav: "Audio",
    name: "Instagram Reels Audio Downloader",
    h1: "Get the audio from an Instagram Reel",
    lead:
      "Fetch the source file with its audio track completely intact, then keep it as-is or pull the sound out in whatever editor you already use. We will be straight with you about what this does.",
    metaTitle: "Instagram Audio Downloader — Save Reel Sound & Music",
    metaDescription:
      "Save the audio from any public Instagram Reel. Download the source file with its untouched audio track, plus clear instructions for extracting it to MP3.",
    keywords: [
      "instagram audio downloader",
      "download instagram reel audio",
      "instagram sound download",
      "reel music download",
    ],
    mode: "post",
    placeholder: "https://www.instagram.com/reel/…",
    cta: "Get the audio source",
    hint: "Returns the source file, audio track untouched.",
    badges: ["Untouched audio", "AAC source", "No sign-up", "Unlimited"],
    steps: [
      {
        title: "Copy the Reel link",
        body: "Share icon, then Copy link. Any Reel or video post carries the sound you are after.",
      },
      {
        title: "Fetch the source",
        body: "You get the MP4 exactly as Instagram stores it, with its original AAC audio track inside — nothing re-compressed.",
      },
      {
        title: "Keep it or extract it",
        body: "Many players and editors read the audio straight from the MP4. If you specifically need an MP3, the section below explains the quickest way to get one.",
      },
    ],
    features: [
      {
        icon: "music",
        title: "Audio at source quality",
        body: "Because there is no conversion step, the AAC track arrives exactly as Instagram encoded it. Converting to MP3 would actually make it slightly worse.",
      },
      {
        icon: "shield",
        title: "No inflated promises",
        body: "We do not claim to strip a studio master out of a Reel. You get the real file and honest instructions, which beats a broken MP3 button.",
      },
      {
        icon: "bolt",
        title: "One step, no queue",
        body: "Nothing is transcoded on a server, so there is no processing wait and no job to sit in line for.",
      },
      {
        icon: "free",
        title: "Free and unlimited",
        body: "Pull the audio from as many Reels as you like. No cap, no account.",
      },
    ],
    sections: withCommonSections([
      {
        heading: "How to turn the file into an MP3, if you need one",
        paragraphs: [
          "Start with the honest part: this tool downloads the Reel's source file, and the audio you want is inside it. We do not run a server-side converter, and you will see why that is usually the better deal.",
          "Most of the time no conversion is needed at all. VLC, QuickTime, Windows Media Player, and every phone's default player will happily play the file for the sound alone. Video editors — Premiere, Resolve, CapCut, iMovie — import the MP4 and let you detach the audio in one click, which is exactly what you would do with an MP3 anyway.",
          "If you genuinely need a standalone audio file, VLC does it locally in about a minute through Media, then Convert or Save, choosing an audio-only profile. On a Mac, dropping the file into GarageBand works too. Anything done locally keeps the file on your machine and avoids handing it to a third-party converter site.",
          "One thing worth knowing: an MP3 made from the Reel is a re-encode of an already-compressed AAC track, so it will sound very slightly worse than the file you started with. If your player accepts the MP4, leaving it alone is the better-sounding choice.",
        ],
      },
      {
        heading: "Where the audio came from matters more than the file format",
        paragraphs: [
          "Reel audio falls into two categories, and the difference decides what you can legitimately do with it.",
          "Original audio is what the creator recorded: their voice, their instrument, their sound design. It belongs to them. A message asking permission is usually all it takes, and creators generally enjoy being asked.",
          "Licensed music is the other case. That track is licensed to Instagram for playback inside Instagram — it is not licensed to you because you saved a copy. Using it in your own upload elsewhere is what triggers takedowns and copyright strikes. For anything you publish, use a proper licensing service or genuinely royalty-free music.",
          "Listening to it yourself, identifying a song, or studying how someone mixed their voiceover against a beat is ordinary personal use and nobody is coming after you for it.",
        ],
      },
    ]),
    specs: [
      { label: "What you receive", value: "Source MP4 with its audio track" },
      { label: "Audio codec", value: "AAC, as encoded by Instagram" },
      { label: "Server-side conversion", value: "None — nothing is re-encoded" },
      { label: "MP3 output", value: "Extract locally; instructions above" },
      { label: "Cost", value: "Free, unlimited" },
    ],
    faqs: [
      {
        q: "Why not just give me an MP3 directly?",
        a: "Because doing it properly means transcoding your file on our server, which would mean holding a copy of it, adding a processing queue, and handing back audio slightly worse than the source. Local extraction is faster, more private, and sounds better.",
      },
      {
        q: "Is the audio quality reduced?",
        a: "No. The AAC track inside the file is bit-for-bit what Instagram stores. Quality only drops if you convert it afterwards, which is why we suggest not bothering unless you need to.",
      },
      {
        q: "Can I use a Reel's song in my own video?",
        a: "If it is licensed music, no — that licence covers playback on Instagram, not reuse in your uploads. If it is the creator's own audio, ask them. Either way the safe route for published work is a proper music licence.",
      },
      {
        q: "How do I find out what a song is?",
        a: "Instagram usually names the track above the Reel's caption. If it is labelled as original audio, tapping it shows the account that created it and every Reel using it.",
      },
      ...UNIVERSAL_FAQS,
    ],
  },

  {
    path: "/instagram-profile-picture-downloader",
    nav: "Profile picture",
    name: "Instagram Profile Picture Downloader",
    h1: "View and download an Instagram profile picture",
    lead:
      "Type a username and see the avatar at a size you can actually make out — no pinching at a 40-pixel circle, and no following anyone to do it.",
    metaTitle: "Instagram Profile Picture Downloader — View Full Size DP",
    metaDescription:
      "See and save any public Instagram profile picture at full size. Enter a username, view the avatar properly, and download it — free, anonymous, no login.",
    keywords: [
      "instagram profile picture downloader",
      "instagram dp download",
      "view instagram profile picture full size",
      "download instagram avatar",
    ],
    mode: "profile",
    placeholder: "@username or instagram.com/username",
    cta: "Show the picture",
    hint: "A username, an @handle, or a profile link all work.",
    badges: ["Full size available", "Anonymous", "No sign-up", "Unlimited"],
    steps: [
      {
        title: "Enter the username",
        body: "Type the handle with or without the @, or paste the profile URL. Capitalisation does not matter.",
      },
      {
        title: "See it properly",
        body: "The avatar loads at the largest size Instagram serves, alongside the display name and follower count.",
      },
      {
        title: "Download if you want it",
        body: "One button saves the JPEG. Nothing is posted, nothing is followed, and the account owner is not told.",
      },
    ],
    features: [
      {
        icon: "avatar",
        title: "Bigger than the app allows",
        body: "Instagram deliberately gives you no way to enlarge an avatar. This shows it at the largest resolution the platform serves.",
      },
      {
        icon: "lock",
        title: "Completely anonymous",
        body: "No login means no trace. You are not viewing through your account, so nothing appears anywhere on their side.",
      },
      {
        icon: "bolt",
        title: "Just a handle needed",
        body: "No post link, no profile URL required. If you know the username, that is enough.",
      },
      {
        icon: "shield",
        title: "Public accounts only",
        body: "Private profiles are respected. If the account is locked, we do not attempt to reach around it.",
      },
    ],
    sections: withCommonSections([
      {
        heading: "Why the app makes this so difficult",
        paragraphs: [
          "Tapping an avatar in the Instagram app does nothing. There is no expand gesture, no full-size view, no save option — a design decision that has held for years, presumably as a mild privacy measure.",
          "The picture itself, though, is public. Instagram serves it to anyone who loads the profile, including people who are not logged in at all. All this tool does is show you that same public file at a size where you can see it.",
          "It is genuinely useful when you are checking that a business account is the real one before sending money, confirming an old friend is who you think before messaging, or adding a contact photo for someone whose only picture you have is a tiny circle.",
        ],
      },
      {
        heading: "Where this crosses a line",
        paragraphs: [
          "A profile picture is public, but that does not make every use of it fair, and it is worth naming the difference.",
          "Reasonable: recognising someone before you message them, verifying a shop or a seller, saving your own avatar because the original file is long gone, adding a face to a contact card.",
          "Not reasonable: building a fake account with someone else's face, feeding avatars into a face-search tool to identify strangers, or collecting images of a person who has asked to be left alone. Impersonation is against Instagram's rules and, in a lot of places, against the law.",
          "If someone is using your picture on a fake profile, report it through Instagram's impersonation form — they act on those, and having a copy of the original photograph with its metadata helps your case considerably.",
        ],
      },
    ]),
    specs: [
      { label: "Format", value: "JPEG" },
      { label: "Size", value: "Largest version Instagram serves" },
      { label: "Login required", value: "No, for you or for them" },
      { label: "Private accounts", value: "Not supported by design" },
      { label: "Cost", value: "Free, unlimited" },
    ],
    faqs: [
      {
        q: "Does the person know I looked?",
        a: "No. There is no notification for profile picture views, and because you are not signed in to anything here, there is no account activity on their side either.",
      },
      {
        q: "Can I see a private account's picture?",
        a: "No. Private profiles are excluded on purpose. Any site claiming to reach behind a private account is either failing quietly or trying to get your password.",
      },
      {
        q: "How large is the image I get?",
        a: "It is the largest copy Instagram serves publicly. Avatars are stored small by design — you will not get a poster-sized file, because one does not exist on their servers.",
      },
      {
        q: "Can I use someone's picture on my own profile?",
        a: "Please do not. Using another person's photo as your avatar is impersonation under Instagram's rules and gets accounts removed, quite apart from being unfair to them.",
      },
      ...UNIVERSAL_FAQS,
    ],
  },
];

export const HOME_TOOL = TOOLS[0];

export function getTool(path: string): Tool {
  const tool = TOOLS.find((t) => t.path === path);
  if (!tool) throw new Error(`No tool registered for path: ${path}`);
  return tool;
}

/** Every tool except the given one, for the "other tools" grid. */
export function otherTools(path: string): Tool[] {
  return TOOLS.filter((t) => t.path !== path);
}
