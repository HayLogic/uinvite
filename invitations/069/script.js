'use strict';
// 069. Ընկերության անունն ու ծրագիրն օրինակային են, օրը, ժամը և վայրն օգտատիրոջ տվյալներն են։
const CONFIG = Object.freeze({
  invitationNumber: '069',
  snowEnabled: true,
  companyName: 'Codu',
  eventTitle: 'Ամանորյա կորպորատիվ երեկույթ',
  companyArtwork: 'assets/botanical-codu.png',
  thankMessage: 'Սիրելի՛ գործընկերներ,\n\n{company} ընկերությունը շնորհակալություն է հայտնում ձեզ՝ ձեր աշխատանքի, նվիրվածության և մեր համատեղ ձեռքբերումների համար։\n\nՄեր հաջողությունների հիմքում ձեր տաղանդն է, ջանքն ու թիմային ոգին։ Շնորհակալ ենք, որ մեր թիմի մասն եք։\n\nԹող 2027 թվականը բերի նոր հնարավորություններ, մեծ ձեռքբերումներ և միասին ստեղծված գեղեցիկ պահեր։',
  exampleData: true,
  coverHeading: 'ԴՈՒՔ ՀՐԱՎԻՐՎԱԾ ԵՔ',
  openCaption: 'ՍԵՂՄԵՔ՝ ԲԱՑԵԼՈՒ ՀԱՄԱՐ',
  eventDate: '2026-12-26T17:00:00+04:00',
  venueName: 'Աղաբաբյանս ռեստորան',
  address: '', // Ճշգրիտ հասցեն դեռ չի տրամադրվել։
  venueImage: '', // Միայն իրական ռեստորանի լուսանկար։
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Աղաբաբյանս+ռեստորան',
  giftMessage: 'Փոքրիկ նվեր, մեծ ուրախություն։ Միացեք մեր տոնական նվերների փոխանակմանը և հաճելի անակնկալ պարգևեք ձեր գործընկերոջը։',
  giftBudget: '',
  rsvpDeadline: '',
  rsvpEndpoint: '', // Առանց endpoint-ի ձևը ցուցադրական է։ Գաղտնի բանալիներ չտեղադրել։
  programNote: 'Ծրագիրը նախնական է․ ժամերը կարող են ճշտվել։',
  program: [
    {time:'17:00',title:'Հյուրերի դիմավորում',description:'Ջերմ հանդիպումներ և տոնական տրամադրություն'},
    {time:'17:30',title:'Տոնական ընթրիք',description:'Տարվա ձեռքբերումների ամփոփում և կենացներ'},
    {time:'18:30',title:'Խաղեր և անակնկալներ',description:'Ժպիտներ, նվերներ և հաճելի բացահայտումներ'},
    {time:'19:30',title:'Երաժշտություն և պարեր',description:'Երեկոյի ամենավառ ռիթմերը'},
    {time:'21:00',title:'Տոնական ավարտ',description:'Նոր հիշողություններով՝ դեպի 2027 թվական'}
  ],
  dressCode: 'Կանաչի բոլոր երանգները և սպիտակ',
  dressColors: [
    {name:'Բաց կանաչ',color:'#a9b89b'},
    {name:'Ձիթապտղի կանաչ',color:'#7b8355'},
    {name:'Մուգ կանաչ',color:'#314a3b'},
    {name:'Սպիտակ',color:'#faf9f1'}
  ]
});
const $ = selector => document.querySelector(selector);
const cover = $('#cover');
const inside = $('#inside');
const scene = $('#scene');
const openButton = $('#open-envelope');
const closeButton = $('#close-envelope');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('[data-company]').forEach(element => { element.textContent = CONFIG.companyName; });
cover.querySelector('.invitation-from').textContent = CONFIG.coverHeading;
cover.querySelector('.invitation-from').style.whiteSpace = 'pre-line';
$('#open-caption').textContent = CONFIG.openCaption;
$('#sample-note').hidden = !CONFIG.exampleData;
$('#company-botanical').src = CONFIG.companyArtwork;
$('#company-botanical').alt = `${CONFIG.companyName}՝ եղևնու ճյուղերով և ոսկեգույն լույսերով գրված ընկերության անունը`;
$('#thank-message').textContent = CONFIG.thankMessage.replaceAll('{company}', CONFIG.companyName);
$('#gift-message').textContent = CONFIG.giftMessage;
if (CONFIG.giftBudget) { $('#gift-budget').textContent = CONFIG.giftBudget; $('#gift-budget').hidden = false; }
if (CONFIG.rsvpDeadline) { $('#rsvp-deadline').textContent = CONFIG.rsvpDeadline; $('#rsvp-deadline').hidden = false; }
document.title = `${CONFIG.companyName} · ${CONFIG.eventTitle} · ${CONFIG.invitationNumber}`;
const eventDate = new Date(CONFIG.eventDate);
const validDate = Number.isFinite(eventDate.getTime()) && /\+04:00$/.test(CONFIG.eventDate);
// Explicit Armenian labels keep rendering consistent even without browser hy-AM locale data.
const monthNames = ['հունվարի','փետրվարի','մարտի','ապրիլի','մայիսի','հունիսի','հուլիսի','օգոստոսի','սեպտեմբերի','հոկտեմբերի','նոյեմբերի','դեկտեմբերի'];
const monthTitles = ['Հունվար','Փետրվար','Մարտ','Ապրիլ','Մայիս','Հունիս','Հուլիս','Օգոստոս','Սեպտեմբեր','Հոկտեմբեր','Նոյեմբեր','Դեկտեմբեր'];
const dateParts = validDate ? Object.fromEntries(new Intl.DateTimeFormat('en-GB',{year:'numeric',month:'numeric',day:'numeric',timeZone:'Asia/Yerevan'}).formatToParts(eventDate).map(part=>[part.type,part.value])) : {};
if (validDate) {
  const weekdays = ['Կիրակի','Երկուշաբթի','Երեքշաբթի','Չորեքշաբթի','Հինգշաբթի','Ուրբաթ','Շաբաթ'];
  const weekday = new Date(Date.UTC(Number(dateParts.year),Number(dateParts.month)-1,Number(dateParts.day))).getUTCDay();
  $('#event-date').textContent = `${weekdays[weekday]}, ${Number(dateParts.day)} ${monthNames[Number(dateParts.month)-1]} ${dateParts.year}`;
  $('#event-time').textContent = `Սկիզբը՝ ${new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',hourCycle:'h23',timeZone:'Asia/Yerevan'}).format(eventDate)}`;
}
function renderCalendar() {
  if (!validDate) { $('#event-calendar').hidden = true; return; }
  const year = Number(dateParts.year), month = Number(dateParts.month)-1, eventDay = Number(dateParts.day);
  $('#calendar-month').textContent = `${monthTitles[month]} ${year}`;
  const start = (new Date(Date.UTC(year,month,1)).getUTCDay()+6)%7;
  const days = new Date(Date.UTC(year,month+1,0)).getUTCDate();
  const body = document.createDocumentFragment();
  for (let week=0;week<Math.ceil((start+days)/7);week++) {
    const row = document.createElement('tr');
    for (let column=0;column<7;column++) {
      const cell = document.createElement('td');
      const day = week*7+column-start+1;
      if (day>0 && day<=days) {
        const date = document.createElement('time');
        date.dateTime = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
        date.textContent = day;
        if (day===eventDay) {
          cell.className = 'calendar-event-day';
          date.setAttribute('aria-label',`${day} ${monthNames[month]} ${year}՝ միջոցառման օրը`);
          cell.innerHTML = '<svg class="date-tree" viewBox="0 0 70 80" aria-hidden="true"><path d="m35 1 2 5 5 .5-4 3 1 5-4-2.5-4 2.5 1-5-4-3 5-.5Z" fill="#aa925a"/><path d="M35 14 22 31h7L15 46h8L8 65h22v10h10V65h22L47 46h8L41 31h7Z" fill="#40563d" stroke="#7e8f67" stroke-width="1"/></svg>';
        }
        cell.append(date);
      }
      row.append(cell);
    }
    body.append(row);
  }
  $('#calendar-days').replaceChildren(body);
}
renderCalendar();
const program = document.createDocumentFragment();
CONFIG.program.forEach(item=>{
  const entry = document.createElement('li');
  const time = document.createElement('time'); time.textContent = item.time; time.dateTime = item.time;
  const text = document.createElement('div');
  const title = document.createElement('h3'); title.textContent = item.title;
  const description = document.createElement('p'); description.textContent = item.description;
  text.append(title,description);entry.append(time,text);program.append(entry);
});
$('#day-program').append(program);
$('#program-note').textContent = CONFIG.programNote;
$('#dress-description').textContent = CONFIG.dressCode;
CONFIG.dressColors.forEach(color=>{
  const item = document.createElement('li');
  const swatch = document.createElement('span'); swatch.className = 'dress-swatch';swatch.style.setProperty('--swatch',color.color);swatch.setAttribute('aria-hidden','true');
  const label = document.createElement('span');label.textContent = color.name;
  item.append(swatch,label);$('#dress-colors').append(item);
});
$('#venue-name').textContent = CONFIG.venueName || 'Վայրը կճշտվի';
$('#venue-address').textContent = CONFIG.address;
function safeURL(value, allowRelative=false) {
  if (!value) return '';
  try { const url = allowRelative ? new URL(value, location.href) : new URL(value); return ['http:','https:'].includes(url.protocol) ? url.href : ''; } catch { return ''; }
}
const mapsUrl = safeURL(CONFIG.mapsUrl);
if (mapsUrl) { $('#maps-link').href = mapsUrl; $('#maps-link').hidden = false; }
if (CONFIG.venueImage) {
  const image = $('#location-image');
  image.alt = `${CONFIG.venueName || 'Միջոցառման վայր'}՝ լուսանկարը`;
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
  $('#open-rsvp').textContent = expanded ? 'ԲԱՑԵԼ ՀԱՍՏԱՏՄԱՆ ՁԵՎԸ' : 'ՓԱԿԵԼ ՀԱՍՏԱՏՄԱՆ ՁԵՎԸ';
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
  name.setCustomValidity(name.value.trim().split(/\s+/).length<2 ? 'Խնդրում ենք նշել անունը և ազգանունը։' : '');
  if (!form.reportValidity()) return;
  const status = $('#form-status');
  status.classList.remove('error');
  if (isPreview) {
    status.textContent = 'Դաշտերը ճիշտ են լրացված։ Սա ցուցադրական ձև է․ պատասխանը չի ուղարկվել և չի պահպանվել։';
    status.focus();
    return;
  }
  const payload = {fullName:name.value.trim(),attendance:form.elements.attendance.value,comment:$('#comment').value.trim()};
  submitting = true;
  $('#submit-rsvp').disabled = true;
  form.setAttribute('aria-busy','true');
  status.textContent = 'Ուղարկվում է…';
  try {
    await sendRSVP(payload);
    status.textContent = 'Շնորհակալություն։ Ձեր պատասխանն ընդունված է։';
    form.reset();
  } catch {
    status.classList.add('error');
    status.textContent = 'Չհաջողվեց հաստատել պատասխանի ընդունումը։ Փորձեք ավելի ուշ կամ կապվեք կազմակերպչի հետ։';
  } finally {
    submitting = false;
    $('#submit-rsvp').disabled = false;
    form.removeAttribute('aria-busy');
    status.focus();
  }
});
$('#full-name').addEventListener('input',event=>event.target.setCustomValidity(''));


// Viewport-sized snowfall: no DOM particle swarm, no input interception.
function initializeSnowfall() {
  const canvas = $('#snowfall');
  const context = canvas.getContext('2d');
  if (!CONFIG.snowEnabled || !context) { canvas.hidden = true; return; }
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let flakes = [], width = 0, height = 0, frame = 0, previousTime = 0;
  let seed = 69026;
  const random = () => { seed = seed * 16807 % 2147483647; return (seed-1)/2147483646; };
  function resize() {
    width = innerWidth; height = innerHeight;
    const ratio = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio,0,0,ratio,0,0);
    const count = Math.min(115,Math.max(48,Math.round(width*height/11000)));
    flakes = Array.from({length:count},()=>({x:random()*width,y:random()*height,radius:1.2+random()*2.5,speed:18+random()*31,drift:4+random()*10,phase:random()*Math.PI*2,opacity:.45+random()*.5}));
    draw(0);
  }
  function draw(elapsed) {
    context.clearRect(0,0,width,height);
    context.shadowColor='rgba(75,89,60,.12)'; context.shadowBlur=2;
    for (const flake of flakes) {
      if (elapsed>0) {
        flake.phase += elapsed * .55;
        flake.y += elapsed * flake.speed;
        flake.x += Math.sin(flake.phase)*flake.drift*elapsed;
        if (flake.y>height+6) { flake.y=-6; flake.x=random()*width; }
        if (flake.x>width+6) flake.x=-6;
        if (flake.x< -6) flake.x=width+6;
      }
      context.fillStyle=`rgba(255,255,249,${flake.opacity})`;
      context.beginPath();context.arc(flake.x,flake.y,flake.radius,0,Math.PI*2);context.fill();
    }
  }
  function tick(time) {
    frame=0;
    if (document.hidden || preference.matches) return;
    if (!previousTime) previousTime=time;
    if (time-previousTime>=33) {
      draw(Math.min((time-previousTime)/1000,.1));
      previousTime=time;
    }
    frame=requestAnimationFrame(tick);
  }
  function resume() {
    if (frame) cancelAnimationFrame(frame);
    frame=0;previousTime=0;
    draw(0);
    if (!document.hidden && !preference.matches) frame=requestAnimationFrame(tick);
  }
  window.addEventListener('resize',resize,{passive:true});
  document.addEventListener('visibilitychange',resume);
  preference.addEventListener('change',resume);
  resize();resume();
}
initializeSnowfall();
