# 076 · Տոնական հանգիստ՝ բացվող նվերով

Standalone Armenian invitation. Entrance: red background, white gift box with independent lid, red ribbon and generated satin bow. Button click/Enter/Space lifts lid/bow, reveals light, fades box, then reveals/focuses invitation. Double opening prevented; reduced-motion opens immediately. Music was subsequently requested and added.

Inside: warm timber chalet/fireplace/tree hero; date/time/place, countdown, RSVP CTA; about/features; four photo-led program rows; snowy chalet venue banner and map; honest preview RSVP. Generated chalet imagery is illustrative, not the real venue. Local image ratios preserved with object-fit or clipped SVG panels; reveal once with no scroll flicker.

Confirmed venue: Դիլիջան Hause (spelling supplied by user). Confirmed start: 16:00 Armenia (+04:00). Company and 31 December 2026 date remain illustrative; program starts at 16:00 but remains provisional. Exact address missing, maps name-search only. Event data lives in CONFIG in script.js. Do not carry details from earlier templates.

RSVP: name/surname, attendance and confirm. Without rsvpEndpoint no data is sent/stored; preview is labeled. Configured HTTP(S) JSON endpoint receives fullName/attendance/comment (empty), with timeout/error/retry/duplicate safeguards. No secrets in client code.

Static HTML/CSS/vanilla JS with relative local assets and Armenian font/OFL. No build or dependencies. Run npx serve . -p 3000 from this folder. Previous templates preserved.


## Music added across the collection
The user explicitly authorized adding music to all 067–076 invitations that lacked it. This folder now includes their previously supplied Happy-New-Year(chosic.com).mp3 as assets/music.mp3, plus a self-contained music.js (upload it with the HTML/CSS/script/assets). CONFIG.musicUrl owns the track path. Playback begins from the first visitor click (including the entry opening when present), never on page load. Persistent icon-only play/pause control uses actual media events and accessible Armenian labels; failed playback/missing file cannot block invitation opening or RSVP. Volume .45, loop enabled, no preload. Existing templates with music were preserved.
