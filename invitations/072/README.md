# 072 · Ձմեռային հեքիաթ

The former black/gold single-photo 072 was explicitly replaced by the user. This is the new white/ice-blue winter invitation, matching their snowy venue reference. Self-contained HTML/CSS/vanilla JS with relative generated images and local Armenian font; no build or dependencies.

Sections: snowy hero with company/navigation, Armenian invitation, date/time/place, live countdown, RSVP CTA; winter theme; white suit/ice-blue gown/silver dress code; provisional six-step program; illustrated venue gallery and optional map/address; RSVP. Reduced-motion and keyboard supported. No opening envelope or music requested.

CONFIG in script.js holds all event data. Company and venue are placeholders. 31 December 2026 19:00 Armenia (+04:00), welcoming 2027, and program times are illustrative reference values. No 067 TT Group/Adana data was carried over. Address/maps remain empty and hidden. Generated winter scenes are illustrative, not actual venue photos.

RSVP: name/surname, attendance yes/no, confirm. Without rsvpEndpoint it is clearly a preview and sends/stores nothing. Configured HTTP(S) endpoint receives fullName, attendance, comment (empty). Validation, timeout, duplicate guard and error handling are retained. Never put secrets in browser code.

Run npx serve . -p 3000 from this folder, or serve repository root and open /invitations/072/. cPanel: upload index.html/style.css/script.js/assets together.
