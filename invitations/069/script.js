'use strict';
// 069-ի օրինակային անունները վերցված են դիզայնի հղումից։ Փոխարինել իրական տվյալներով։
const CONFIG = Object.freeze({
  invitationNumber: '069',
  hosts: 'Patricia & Adam',
  exampleData: true,
  coverHeading: 'YOU HAVE AN\nINVITATION FROM',
  openCaption: 'CLICK TO OPEN',
  insideMessage: 'Ձեր ներկայությունը մեր օրվա ամենաթանկ նվերն է։'
});
const cover = document.querySelector('#cover');
const inside = document.querySelector('#inside');
const openButton = document.querySelector('#open-envelope');
const closeButton = document.querySelector('#close-envelope');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('[data-hosts]').forEach(element => { element.textContent = CONFIG.hosts; });
cover.querySelector('.invitation-from').textContent = CONFIG.coverHeading;
cover.querySelector('.invitation-from').style.whiteSpace = 'pre-line';
document.querySelector('#open-caption').textContent = CONFIG.openCaption;
document.querySelector('.inside-message').textContent = CONFIG.insideMessage;
document.title = `${CONFIG.hosts} · Հրավիրատոմս ${CONFIG.invitationNumber}`;
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
    inside.querySelector('h2').tabIndex = -1;
    inside.querySelector('h2').focus({preventScroll:true});
  }, motion.matches ? 0 : 3400);
}
openButton.addEventListener('click', revealInvitation);
closeButton.addEventListener('click', () => {
  clearTimeout(fadeTimer); clearTimeout(revealTimer);
  inside.hidden = true;
  cover.hidden = false;
  cover.classList.remove('opening', 'leaving');
  opening = false;
  openButton.disabled = false;
  openButton.setAttribute('aria-expanded', 'false');
  openButton.focus({preventScroll:true});
});
