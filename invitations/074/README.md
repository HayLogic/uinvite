# 074 · Տոնական երեկո

Separate Armenian ivory/evergreen/gold invitation based on the supplied reference: botanical cream hero, elegant serif and local Pinyon Latin subtitle, countdown, RSVP CTA, about/features, four program cards beside an arched champagne photograph, venue and RSVP.

Confirmed venue: Վահագնի ռեստորան. Confirmed start: 18:00 Armenia (+04:00). Company and 31 December 2026 date remain illustrative. Provisional program starts at 18:00. Exact address was not provided; it is empty and hidden. Maps opens a name-based search, not an asserted exact address. Generated botanical/table artwork is decorative, not a restaurant photograph. No entrance requested; music was subsequently added. Previous templates remain unchanged.

CONFIG at the start of script.js holds all event data. Armenian dates display in Asia/Yerevan independent of browser timezone. Countdown handles expiry. Scroll reveals run once and stay visible to avoid flicker. Images preserve proportions via object-fit; reduced motion and keyboard supported.

RSVP validates name/surname and attendance. Without rsvpEndpoint it is clearly a preview and sends/stores nothing. A configured HTTP(S) endpoint receives fullName/attendance/comment (empty) JSON; timeout, duplicate guard and error handling are included. Never put secrets in frontend code.

Static HTML/CSS/vanilla JS; local images/fonts/licenses; no build or dependencies. From this folder run npx serve . -p 3000. Relative asset paths support independent cPanel upload.


## Music added across the collection
The user explicitly authorized adding music to all 067–076 invitations that lacked it. This folder now includes their previously supplied Happy-New-Year(chosic.com).mp3 as assets/music.mp3, plus a self-contained music.js (upload it with the HTML/CSS/script/assets). CONFIG.musicUrl owns the track path. Playback begins from the first visitor click (including the entry opening when present), never on page load. Persistent icon-only play/pause control uses actual media events and accessible Armenian labels; failed playback/missing file cannot block invitation opening or RSVP. Volume .45, loop enabled, no preload. Existing templates with music were preserved.
