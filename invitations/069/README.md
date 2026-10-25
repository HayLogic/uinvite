# Invitation 069 — Ivory & Sage Christmas Party

A standalone HTML/CSS/vanilla JavaScript invitation, with no build or package dependencies. The winter forest and sage envelope opening is followed by five image-led sections: snowy Christmas tree hero, event details, gift exchange, botanical RSVP, and thank-you.

## Run

From the repository root: `python3 -m http.server 8000`, then use the `/invitations/069/` path. Alternatively, from this directory use `npx serve .`, or open `index.html` directly. For cPanel upload this directory's `index.html`, `style.css`, `script.js`, and `assets/` to a separate document root. All asset paths are relative.

## Confirm before publication

Edit `CONFIG` at the beginning of `script.js`. Patricia & Adam are sample names from the design reference; `exampleData: true` displays a small preview note. Set it to false when real names are confirmed.

`eventDate` expects a confirmed ISO date with Armenia's `+04:00` offset. It is shown in the Armenia timezone regardless of the visitor's browser timezone. Empty date and venue fields show “to be announced”; no venue or date is invented. Fill `venueName`, `address`, and optionally `venueImage` with a real venue photo. `mapsUrl` is hidden until a valid HTTP(S) URL is supplied. A supplied photo that fails to load falls back to a small location symbol. Gift-exchange text, optional budget, and RSVP deadline are also in CONFIG; empty budget/deadline text is hidden.

## RSVP

The gold button opens a keyboard-accessible form with name and surname, attending/not attending, and an optional comment. Without `rsvpEndpoint`, the form is explicitly a preview and does not send or store responses. Validation never displays a delivery success message in this mode.

To connect a backend, set `rsvpEndpoint` to a relative or HTTP(S) endpoint. `sendRSVP()` posts JSON with `fullName`, `attendance` (`yes`/`no`), and `comment`; only a 2xx response is treated as success. The backend must validate input, handle abuse/rate limiting, and allow CORS if hosted on another origin. No frontend secrets. Duplicate concurrent submissions are prevented; timeout is 15 seconds, failures preserve entered data for retry.

## Assets and accessibility

`winter-forest.png`, `winter-seal.png`, `christmas-tree.png`, `christmas-gifts.png`, and `botanical-rsvp.png` were individually generated for this invitation. Transparent decorative assets are separate from all event text and interactive controls. The botanical RSVP image has a text alternative. `sage-paper.svg` and `gold-stars.svg` provide lightweight texture and decoration. Pinyon Script is included locally from the official Google Fonts repository, along with its SIL Open Font License (`assets/PinyonScript-OFL.txt`).

The envelope uses independent CSS/SVG folds, not a screenshot. Buttons are keyboard accessible, opening prevents repeated clicks, focus moves to the opened invitation, and reduced motion is respected. Verified at 360, 390, 768, and 1440px. Mock API checks are separate from actual delivery; a real endpoint has not been provided.

Invitation 068 remains at the repository root and is not changed by this implementation.
