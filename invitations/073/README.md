# 073 · Դիմակահանդես

Separate Armenian black/burgundy/gold masquerade invitation, created from the user's reference. Static HTML/CSS/vanilla JS, local font and generated local artwork; no dependency or build.

Sections: company/navigation, masquerade hero, date/time/place, countdown and RSVP CTA; theme with mask; dress code with black tuxedo, burgundy evening gown and gold mask; provisional program; illustrated banquet/ballroom gallery and optional map/address; RSVP. All panels preserve intrinsic image proportions through clipped SVG viewports. Reveal animations run once and remain visible; reduced-motion and keyboard supported.

CONFIG at the start of script.js owns event data. Confirmed venue: Dvin Hall. Confirmed start: 17:00 Armenia (+04:00). Company and 31 December 2026 date remain illustrative. Provisional program now begins with arrival at 17:00. Do not inherit 072's Dilijan restaurant or 067's TT Group. Exact address/map and real venue photos are not supplied. Generated ballroom artwork is labeled illustration, not an actual restaurant photograph. No entrance envelope requested; music was subsequently added.

RSVP validates name/surname and attendance yes/no. Without rsvpEndpoint, the form is explicitly a preview and sends/stores nothing. Configured endpoint receives JSON fullName/attendance/comment (empty), with timeout, duplicate guard and HTTP error handling. No secrets in browser code.

From this folder: npx serve . -p 3000. From repository root: serve and open /invitations/073/. Relative assets allow independent cPanel upload. 067 and 072 are preserved.


## Music added across the collection
The user explicitly authorized adding music to all 067–076 invitations that lacked it. This folder now includes their previously supplied Happy-New-Year(chosic.com).mp3 as assets/music.mp3, plus a self-contained music.js (upload it with the HTML/CSS/script/assets). CONFIG.musicUrl owns the track path. Playback begins from the first visitor click (including the entry opening when present), never on page load. Persistent icon-only play/pause control uses actual media events and accessible Armenian labels; failed playback/missing file cannot block invitation opening or RSVP. Volume .45, loop enabled, no preload. Existing templates with music were preserved.
