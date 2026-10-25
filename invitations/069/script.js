'use strict';
// Sample names are from the design reference. Empty event fields are unconfirmed.
const CONFIG = Object.freeze({
  invitationNumber: '069',
  hosts: 'Patricia & Adam',
  exampleData: true,
  coverHeading: 'YOU HAVE AN\nINVITATION FROM',
  openCaption: 'CLICK TO OPEN',
  eventDate: '', // Confirmed Armenia date: YYYY-MM-DDTHH:mm:ss+04:00.
  venueName: '',
  address: '',
  venueImage: '', // Real venue photo only, e.g. assets/venue.jpg.
  mapsUrl: '',
  giftMessage: 'Bring a little joy, wrapped with love. Join our gift exchange and share a festive surprise with someone special.',
  giftBudget: '', // Fill only after confirming the gift-exchange budget.
  rsvpDeadline: '',
  rsvpEndpoint: '' // Empty means preview only. No secrets belong in this file.
});
const $ = selector => document.querySelector(selector);
const cover = $('#cover');
const inside = $('#inside');
const scene = $('#scene');
const openButton = $('#open-envelope');
const closeButton = $('#close-envelope');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('[data-hosts]').forEach(element => { element.textContent = CONFIG.hosts; });
cover.querySelector('.invitation-from').textContent = CONFIG.coverHeading;
cover.querySelector('.invitation-from').style.whiteSpace = 'pre-line';
$('#open-caption').textContent = CONFIG.openCaption;
$('#sample-note').hidden = !CONFIG.exampleData;
$('#gift-message').textContent = CONFIG.giftMessage;
if (CONFIG.giftBudget) { $('#gift-budget').textContent = CONFIG.giftBudget; $('#gift-budget').hidden = false; }
if (CONFIG.rsvpDeadline) { $('#rsvp-deadline').textContent = CONFIG.rsvpDeadline; $('#rsvp-deadline').hidden = false; }
document.title = `${CONFIG.hosts} · Christmas Party ${CONFIG.invitationNumber}`;
const eventDate = new Date(CONFIG.eventDate);
const validDate = Number.isFinite(eventDate.getTime()) && /\+04:00$/.test(CONFIG.eventDate);
if (validDate) {
  $('#event-date').textContent = new Intl.DateTimeFormat('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric',timeZone:'Asia/Yerevan'}).format(eventDate);
  $('#event-time').textContent = `AT ${new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit',timeZone:'Asia/Yerevan'}).format(eventDate)}`;
}
$('#venue-name').textContent = CONFIG.venueName || 'Location to be announced';
$('#venue-address').textContent = CONFIG.address;
function safeURL(value, allowRelative=false) {
  if (!value) return '';
  try { const url = allowRelative ? new URL(value, location.href) : new URL(value); return ['http:','https:'].includes(url.protocol) ? url.href : ''; } catch { return ''; }
}
const mapsUrl = safeURL(CONFIG.mapsUrl);
if (mapsUrl) { $('#maps-link').href = mapsUrl; $('#maps-link').hidden = false; }
if (CONFIG.venueImage) {
  const image = $('#location-image');
  image.alt = `${CONFIG.venueName || 'Event venue'} photograph`;
  image.addEventListener('load',()=>{image.hidden=false;$('#location-icon').hidden=true;});
  image.addEventListener('error',()=>{image.hidden=true;$('#location-icon').hidden=false;});
  image.src = CONFIG.venueImage;
}
let opening = false;
let fadeTimer, revealTimer;
function revealInvitation() {
  if (opening) return;
  opening = true;
  openButton.disabled = true;
  openButton.setAttribute('aria-expanded', 'true');
  cover.classList.add('opening');
  fadeTimer = setTimeout(() => cover.classList.add('leaving'), motion.matches ? 0 : 2300);
  revealTimer = setTimeout(() => {
    cover.hidden = true;
    inside.hidden = false;
    scene.classList.add('is-open');
    window.scrollTo({top:0,behavior:'instant'});
    $('#party-heading').tabIndex = -1;
    $('#party-heading').focus({preventScroll:true});
  }, motion.matches ? 0 : 3400);
}
openButton.addEventListener('click', revealInvitation);
closeButton.addEventListener('click', () => {
  clearTimeout(fadeTimer); clearTimeout(revealTimer);
  inside.hidden = true;
  cover.hidden = false;
  scene.classList.remove('is-open');
  cover.classList.remove('opening', 'leaving');
  opening = false;
  openButton.disabled = false;
  openButton.setAttribute('aria-expanded', 'false');
  window.scrollTo({top:0,behavior:'instant'});
  openButton.focus({preventScroll:true});
});
const form = $('#rsvp-form');
const formPanel = $('#rsvp-form-panel');
$('#open-rsvp').addEventListener('click',()=>{
  const expanded = $('#open-rsvp').getAttribute('aria-expanded') === 'true';
  formPanel.hidden = expanded;
  $('#open-rsvp').setAttribute('aria-expanded',String(!expanded));
  $('#open-rsvp').textContent = expanded ? 'OPEN RSVP FORM' : 'CLOSE RSVP FORM';
  if (!expanded) $('#full-name').focus({preventScroll:false});
});
const isPreview = !CONFIG.rsvpEndpoint;
$('#preview-form-note').hidden = !isPreview;
let submitting = false;
// API connection: POST JSON; accept only a successful HTTP response as delivery.
async function sendRSVP(payload) {
  const endpoint = safeURL(CONFIG.rsvpEndpoint,true);
  if (!endpoint) throw new Error('Invalid endpoint');
  const controller = new AbortController();
  const timeout = setTimeout(()=>controller.abort(),15000);
  try {
    const response = await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:controller.signal});
    if (!response.ok) throw new Error('Request failed');
  } finally { clearTimeout(timeout); }
}
form.addEventListener('submit',async event=>{
  event.preventDefault();
  if (submitting) return;
  const name = $('#full-name');
  name.setCustomValidity(name.value.trim().split(/\s+/).length<2 ? 'Please enter your name and surname.' : '');
  if (!form.reportValidity()) return;
  const status = $('#form-status');
  status.classList.remove('error');
  if (isPreview) {
    status.textContent = 'Your details are valid. This is a preview: no response was sent or stored.';
    status.focus();
    return;
  }
  const payload = {fullName:name.value.trim(),attendance:form.elements.attendance.value,comment:$('#comment').value.trim()};
  submitting = true;
  $('#submit-rsvp').disabled = true;
  form.setAttribute('aria-busy','true');
  status.textContent = 'Sending…';
  try {
    await sendRSVP(payload);
    status.textContent = 'Thank you. Your response has been received.';
    form.reset();
  } catch {
    status.classList.add('error');
    status.textContent = 'We could not confirm delivery. Please try again later or contact the hosts.';
  } finally {
    submitting = false;
    $('#submit-rsvp').disabled = false;
    form.removeAttribute('aria-busy');
    status.focus();
  }
});
$('#full-name').addEventListener('input',event=>event.target.setCustomValidity(''));
