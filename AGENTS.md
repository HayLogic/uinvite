# Project instructions

Build a Christmas corporate web invitation using HTML, CSS and vanilla JavaScript. No framework, package installation or build step is needed. Keep index.html, style.css, script.js and assets/ at the repository root.

## Design
Use the user's supplied reference: burgundy velvet envelope, realistic gold wax seal, animated opening, sparkling golden Christmas tree and elegant readable Armenian typography. Preserve this reference palette for this template. Design mobile-first, without horizontal overflow. Respect prefers-reduced-motion and keyboard accessibility.

## Implementation
Keep event data in the CONFIG object in script.js. Example content must be distinguishable from real event data. Use ISO dates with +04:00 for Armenia. Do not invent venues or working map links. Do not replace required photo assets with emoji. Keep asset paths relative for cPanel hosting.

Music must start only following user interaction and handle rejected play promises. RSVP must validate fields and hide guest count for declined attendance. Without a backend, explicitly label the form as a demo and never claim that a response was sent. Never commit secrets or put private API keys in browser code.

## Verification
Check envelope opening, audio state, countdown expiry, conditional RSVP fields and widths 360, 390, 768 and 1440 pixels. Report any checks that cannot be run. Do not deploy or add dependencies unless requested.
