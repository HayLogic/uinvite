# 072 · Գիշերային ոսկեգույն ամանորյա հրավեր

Self-contained Armenian static invitation: `index.html`, `style.css`, `script.js`, `assets/`. Open directly or run `npx serve . -p 3000` from this folder. No build or dependencies.

The latest supplied reference guides the midnight-blue/gold terrace background, hanging ornaments, illuminated tree and dark central typography area. Artwork is generated, not a photo of the actual venue. The invitation opens directly as a full photographic poster, without an envelope. Scroll reveals, countdown, provisional evening program, venue details and RSVP follow. Reduced motion and keyboard access are supported.

Event data lives in `CONFIG` in script.js. Company and venue are placeholders. 26 December 2026 at 19:00 Armenia (+04:00), welcoming 2027, and the program are illustrative reference values, not confirmed event information. No music has been requested for 072. No venue photo or map appears until supplied. Do not carry details from previous templates.

RSVP is explicitly a preview until `rsvpEndpoint` is set; it validates name/surname and attendance and never claims a preview was sent. A configured endpoint receives JSON with fullName, attendance and comment; request timeout, duplicate-submit guard and retry messages are implemented. Never put secrets in client code.
