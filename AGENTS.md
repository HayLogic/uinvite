# Project instructions

Build a Christmas corporate web invitation using HTML, CSS and vanilla JavaScript. No framework, package installation or build step is needed. Keep index.html, style.css, script.js and assets/ at the repository root.

## Design
Use the user's supplied reference: burgundy velvet envelope, realistic gold wax seal, animated opening, sparkling golden Christmas tree and elegant readable Armenian typography. Preserve this reference palette for this template. Design mobile-first, without horizontal overflow. Respect prefers-reduced-motion and keyboard accessibility.

## Implementation
Keep event data in the CONFIG object in script.js. Example content must be distinguishable from real event data. Use ISO dates with +04:00 for Armenia. Do not invent venues or working map links. Do not replace required photo assets with emoji. Keep asset paths relative for cPanel hosting.

Music must start only following user interaction and handle rejected play promises. RSVP must validate fields and hide guest count for declined attendance. Without a backend, explicitly label the form as a demo and never claim that a response was sent. Never commit secrets or put private API keys in browser code.

## Verification
Check envelope opening, audio state, countdown expiry, conditional RSVP fields and widths 360, 390, 768 and 1440 pixels. Report any checks that cannot be run. Do not deploy or add dependencies unless requested.

## Invitation numbering and current work

The user is building multiple distinct invitations. The completed burgundy/gold corporate New Year invitation for HayLogic Line Day is **068**. Its files currently remain at the repository root. Its recorded application revision is `872ca6db9fd74298ca7151b0c97a8a8b416a0e9b`; see `INVITATIONS.md`.

The next active invitation is **069**. Keep its work separate in `invitations/069/` with its own `index.html`, `style.css`, `script.js`, and `assets/` when implementation starts. This per-invitation layout supersedes the root-only layout instruction above for new invitations. Do not overwrite 068 while working on 069. Read the new invitation's user brief before choosing its design; the burgundy Christmas palette applies to 068, not automatically to every future invitation. 069 uses a pale cream snowy fir forest, olive/sage paper envelope, dark green ribbon/evergreen seal, and ivory/sage/champagne inner sections. It is fully Armenian. User-confirmed event: 26 December 2026, 17:00 Armenia (+04:00), Աղաբաբյանս ռեստորան. Company name Codu is explicitly fictional at the user's request. Dress code: all shades of green and white. Includes an automatically generated Armenian calendar with the event day in a green tree, a provisional program, gifts, an RSVP form headed Մասնակցության հաստատում with evergreen CODU company artwork, and corporate gratitude addressed to employees. Keep the company artwork in sync if the company changes. Exact venue address/photo, gift budget, RSVP deadline and endpoint remain unconfirmed/empty; do not invent them. The map uses a venue-name search, not an asserted exact pin. The form is a truthful preview without an endpoint. See invitations/069/README.md for the current data and workflow.
