# 078 · Թղթե հարսանեկան կոլաժ

Separate Armenian ivory/chocolate wedding invitation following the reference. Direct opening, no envelope requested: paper portrait card and script heading; invitation letter; generated month calendar with heart-highlighted wedding day; winding-line program; illustrated manor venue and optional map; ribbon dress palette; wishes; chocolate RSVP panel with attendance/guest stepper; care section and couple footer. Desktop uses two paper columns, mobile flows as a single column. Lace and artwork are local generated illustrations, not actual couple/venue photos.

CONFIG contains illustrative names Աննա/Դավիթ (Anna & David), date 24 May 2027 15:00 Armenia (+04:00), invite copy, wishes style and provisional program. Actual names/date/venue not supplied. Venue placeholder, empty address/map/phone hidden. Do not invent venue or contact details. Wishes and dress palette are editable reference content; confirm them before publishing a real wedding invitation. No music requested; earlier music scope applied to 067–076 only.

Calendar uses Gregorian month geometry with Monday first, explicit Armenian names, and event-local date Asia/Yerevan. One-time reveals avoid flicker; reduced motion and keyboard supported. Photos use object-fit, no stretched panels.

RSVP: required name/surname and attendance; attending guests use integer count 1–10 including respondent. Declined attendance hides/disables guest input and sends count 0. Plus/minus buttons are labeled and constrained. Without rsvpEndpoint form is an explicit preview that sends/stores nothing. A configured HTTP(S) endpoint receives fullName, attendance, comment (empty), guestCount JSON, with timeout/duplicate/error safeguards. No secrets in client code.

Static HTML/CSS/vanilla JS with local licensed fonts and relative assets; no build/dependencies. Run npx serve . -p 3000 here. Previous templates preserved.
