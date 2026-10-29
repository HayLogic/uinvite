# 075 · Մանուշակագույն գալա երեկո

Standalone Armenian midnight-indigo/lavender invitation matching the reference: corporate header, violet gala hero, date/time/venue, live countdown and RSVP CTA; about and three feature cards; swipeable four-image gallery with previous/next buttons, keyboard controls and position dots; twilight Yerevan panorama venue banner and RSVP.

Confirmed venue: Dvin Hall. Confirmed time: 17:00 Armenia (+04:00). Company and 31 December 2026 date are illustrative. Welcoming 2027. No street address provided; address line is hidden. Map opens a Dvin Hall name search, not an asserted exact pin. All generated gala/skyline imagery is illustrative and not a claimed Dvin interior photo. No program, dress code, envelope or music requested in this reference.

Event data is in CONFIG in script.js. Date/time display uses Asia/Yerevan. Countdown handles expiry; gallery supports touch, trackpad, buttons and left/right keys, no autoplay. Local images preserve proportions. Reveal once and retain visibility to avoid flicker; reduced-motion and keyboard supported.

RSVP requires name/surname and attendance. Without rsvpEndpoint, form clearly says preview and sends/stores nothing. Configured endpoint receives fullName, attendance, comment (empty) JSON with timeout/duplicate/error handling. Do not put secrets in browser code.

Static HTML/CSS/vanilla JS, relative assets/local licensed Armenian font, no dependencies/build. Run npx serve . -p 3000 in this folder. Previous numbered templates remain unchanged.


## Music added across the collection
The user explicitly authorized adding music to all 067–076 invitations that lacked it. This folder now includes their previously supplied Happy-New-Year(chosic.com).mp3 as assets/music.mp3, plus a self-contained music.js (upload it with the HTML/CSS/script/assets). CONFIG.musicUrl owns the track path. Playback begins from the first visitor click (including the entry opening when present), never on page load. Persistent icon-only play/pause control uses actual media events and accessible Armenian labels; failed playback/missing file cannot block invitation opening or RSVP. Volume .45, loop enabled, no preload. Existing templates with music were preserved.
