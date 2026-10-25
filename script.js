'use strict';
// Միջոցառման տվյալներ. լուսանկարը, հասցեն և RSVP endpoint-ը դեռ պետք է լրացնել։
const CONFIG = Object.freeze({
  companyName: 'HayLogic Line Day',
  eventTitle: 'Ամանորյա կորպորատիվ երեկո',
  newYearGreeting: 'Միասին դեպի 2027 թվական',
  giftsTitle: 'Սպասվում են նվերներ',
  giftsImage: 'assets/christmas-gifts.png',
  eventDate: '2026-12-18T18:00:00+04:00', // Հայաստանի ժամային գոտի. ժամը նույնպես այստեղ է։
  venueName: 'Ադանա Կոմպլեքս',
  venueImage: '', // Add the supplied restaurant photo here, e.g. assets/adana-complex.jpg,
  address: 'Միջոցառման հասցեն կճշտվի',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Adana+Complex+Armenia',
  musicUrl: 'assets/music.mp3',
  rsvpEndpoint: '', // HTTPS POST endpoint; JSON body; հաջողություն՝ HTTP 2xx։
  demoMode: false
});
const $ = selector => document.querySelector(selector);
const eventDate = new Date(CONFIG.eventDate);
const validDate = Number.isFinite(eventDate.getTime()) && /\+04:00$/.test(CONFIG.eventDate);
// Month names are local to keep Armenian readable even on browsers without hy-AM locale data.
const monthNames=['հունվարի','փետրվարի','մարտի','ապրիլի','մայիսի','հունիսի','հուլիսի','օգոստոսի','սեպտեմբերի','հոկտեմբերի','նոյեմբերի','դեկտեմբերի'];
const armenianParts = validDate ? Object.fromEntries(new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'numeric',year:'numeric',timeZone:'Asia/Yerevan'}).formatToParts(eventDate).map(p=>[p.type,p.value])) : {};
const dateFormatter = {format:()=>`${armenianParts.day} ${monthNames[Number(armenianParts.month)-1]}, ${armenianParts.year}`};
document.querySelectorAll('[data-company]').forEach(el => { el.textContent = CONFIG.companyName; });
document.querySelectorAll('[data-date]').forEach(el => { el.textContent = validDate ? dateFormatter.format(eventDate) : 'Ամսաթիվը կճշտվի'; });
document.querySelectorAll('[data-time]').forEach(el => { el.textContent = validDate ? new Intl.DateTimeFormat('hy-AM',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Asia/Yerevan'}).format(eventDate) : 'Ժամը կճշտվի'; });
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = validDate ? new Intl.DateTimeFormat('en',{year:'numeric',timeZone:'Asia/Yerevan'}).format(eventDate) : ''; });
$('#day-number').textContent = validDate ? new Intl.DateTimeFormat('en',{day:'2-digit',timeZone:'Asia/Yerevan'}).format(eventDate) : '—';
// Calendar uses Armenia's event date, never the browser's local timezone.
function renderEventCalendar() {
  if (!validDate) { $('#event-calendar').hidden = true; return; }
  $('#event-calendar').hidden = false;
  const year = Number(armenianParts.year);
  const month = Number(armenianParts.month) - 1;
  const selectedDay = Number(armenianParts.day);
  const monthLabels = ['Հունվար','Փետրվար','Մարտ','Ապրիլ','Մայիս','Հունիս','Հուլիս','Օգոստոս','Սեպտեմբեր','Հոկտեմբեր','Նոյեմբեր','Դեկտեմբեր'];
  $('#calendar-month').textContent = `${monthLabels[month]} ${year}`;
  const firstWeekday = (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7;
  const numberOfDays = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const fragment = document.createDocumentFragment();
  for (let week = 0; week < Math.ceil((firstWeekday + numberOfDays) / 7); week++) {
    const row = document.createElement('tr');
    for (let weekday = 0; weekday < 7; weekday++) {
      const cell = document.createElement('td');
      const day = week * 7 + weekday - firstWeekday + 1;
      if (day > 0 && day <= numberOfDays) {
        const date = document.createElement('time');
        date.dateTime = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
        date.textContent = day;
        if (day === selectedDay) {
          cell.className = 'event-day';
          date.setAttribute('aria-label', `${dateFormatter.format(eventDate)}՝ միջոցառման օրը`);
          // Separate decorative tree; the date remains readable HTML text.
          cell.innerHTML = '<svg class="calendar-tree" viewBox="0 0 70 80" aria-hidden="true"><path d="m35 2 2 5 5 .4-4 3 1.3 5L35 13l-4.3 2.4L32 10.4l-4-3 5-.4Z" fill="#f4d88f"/><path d="M35 14 22 31h7L15 46h8L8 65h22v10h10V65h22L47 46h8L41 31h7Z" fill="#cba258" stroke="#f4d895" stroke-width="1"/><path d="M22 31h7M15 46h8m24 0h8M41 31h7" fill="none" stroke="#9d7135"/></svg>';
        }
        cell.append(date);
      }
      row.append(cell);
    }
    fragment.append(row);
  }
  $('#calendar-days').replaceChildren(fragment);
}
renderEventCalendar();
$('#venue').textContent = CONFIG.venueName;
$('#address').textContent = CONFIG.address;
const venueImage = $('#venue-image');
if (CONFIG.venueImage) {
  venueImage.alt = `${CONFIG.venueName}՝ ռեստորանի լուսանկարը`;
  venueImage.addEventListener('load', () => {
    venueImage.hidden = false;
    $('#venue-photo-fallback').hidden = true;
  });
  venueImage.addEventListener('error', () => {
    venueImage.hidden = true;
    $('#venue-photo-fallback').hidden = false;
  });
  venueImage.src = CONFIG.venueImage;
}
document.title = `${CONFIG.eventTitle} · ${CONFIG.companyName}`;
$('.hero-title').textContent = CONFIG.eventTitle;
$('#new-year-greeting').textContent = CONFIG.newYearGreeting;
$('#gifts-title').textContent = CONFIG.giftsTitle;
$('#gifts-image').src = CONFIG.giftsImage;
$('#sample-note').hidden = !CONFIG.demoMode;
function safeHttpUrl(value) { try { const url = new URL(value); return ['http:','https:'].includes(url.protocol) ? url.href : ''; } catch { return ''; } }
const mapsUrl = safeHttpUrl(CONFIG.mapsUrl);
if (mapsUrl) { $('#map-link').href = mapsUrl; $('#map-link').hidden = false; }
// Animated golden light sculpture. All particles are drawn locally; no external assets.
function initializeTree() {
  const canvas = $('#tree-lights');
  const context = canvas.getContext('2d');
  if (!context) return;
  const width = 330, height = 450;
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  context.scale(pixelRatio, pixelRatio);
  let seed = 2026;
  const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const particles = [];
  // Dense, gently irregular spiral ribbons taper into the bright tip.
  for (let i = 0; i < 1900; i++) {
    const t = random();
    const angle = t * Math.PI * 9.5;
    const spread = 2.5 + t * 15;
    const x = 165 + Math.sin(angle) * (5 + t * 112) + (random() - .5) * spread * 3;
    const y = 26 + t * 374 + Math.cos(angle) * t * 9 + (random() - .5) * spread;
    particles.push({ x, y, size: .35 + random() * 1.15, phase: random() * Math.PI * 2, speed: .4 + random() * 1.8, alpha: .2 + random() * .55, flare: random() > .986 });
  }
  // Fine suspended gold dust defines a soft conical silhouette around the ribbons.
  for (let i = 0; i < 1600; i++) {
    const t = Math.sqrt(random());
    particles.push({x:165+(random()-.5)*t*242,y:29+t*375,size:.25+random()*.7,phase:random()*Math.PI*2,speed:.3+random()*1.4,alpha:.1+random()*.5,flare:false});
  }
  const glow = document.createElement('canvas'); glow.width = glow.height = 64;
  const gc = glow.getContext('2d');
  const gradient = gc.createRadialGradient(32,32,0,32,32,32);
  gradient.addColorStop(0,'rgba(255,250,215,1)');
  gradient.addColorStop(.12,'rgba(255,226,143,.95)');
  gradient.addColorStop(.32,'rgba(245,179,59,.35)');
  gradient.addColorStop(1,'rgba(231,137,19,0)');
  gc.fillStyle=gradient; gc.fillRect(0,0,64,64);
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false, frame = 0, lastFrame = 0;
  // The cursor glow is independent of the fixed tree tip and remains visible.
  const pointerLight = document.createElement('span');
  pointerLight.className = 'pointer-light';
  pointerLight.setAttribute('aria-hidden', 'true');
  document.body.append(pointerLight);
  let lightPosition = {x:window.innerWidth * .75, y:window.innerHeight * .35};
  function positionLight() {
    lightPosition.x = Math.max(24, Math.min(window.innerWidth - 24, lightPosition.x));
    lightPosition.y = Math.max(24, Math.min(window.innerHeight - 24, lightPosition.y));
    pointerLight.style.transform = `translate3d(${lightPosition.x}px, ${lightPosition.y}px, 0)`;
  }
  document.addEventListener('invitation:opened', () => {
    positionLight();
    pointerLight.classList.add('is-visible');
  }, {once:true});
  document.addEventListener('pointermove', event => {
    if (motion.matches || document.body.classList.contains('intro-active')) return;
    lightPosition = {x:event.clientX, y:event.clientY};
    positionLight();
  }, {passive:true});
  window.addEventListener('resize', positionLight, {passive:true});
  function draw(time) {
    context.clearRect(0,0,width,height);
    context.globalCompositeOperation='lighter';
    for (const p of particles) {
      const x = p.x;
      const y = p.y;
      const wave = .5 + .5 * Math.sin(time * .001 * p.speed + p.phase);
      const brightness = motion.matches ? .67 : .15 + .85 * wave * wave;
      context.globalAlpha = p.alpha * brightness;
      const radius = p.size * (p.flare ? 9 : 3.8);
      context.drawImage(glow,x-radius,y-radius,radius*2,radius*2);
      context.fillStyle='#ffe6a5';
      context.fillRect(x,y,p.size*.65,p.size*.65);
      if (p.flare && brightness > .65) {
        const arm = 3 + brightness * 3;
        context.strokeStyle='#fff1be'; context.lineWidth=.55;
        context.beginPath();context.moveTo(x-arm,y);context.lineTo(x+arm,y);context.moveTo(x,y-arm);context.lineTo(x,y+arm);context.stroke();
      }
    }
    context.save();
    context.globalAlpha = .9;
    const pulse = motion.matches ? 1 : 1 + .12 * Math.sin(time * .002);
    context.drawImage(glow,165 - 35 * pulse,26 - 35 * pulse,70 * pulse,70 * pulse);
    context.drawImage(glow,149,5,32,42);
    context.globalAlpha = 1;
    context.fillStyle='#fff4c4';
    context.beginPath();context.moveTo(165,14);context.lineTo(166.3,24);context.lineTo(171,26);context.lineTo(166.3,28);context.lineTo(165,38);context.lineTo(163.7,28);context.lineTo(159,26);context.lineTo(163.7,24);context.closePath();context.fill();
    context.restore();
    context.globalCompositeOperation='source-over';
  }
  function tick(time) {
    frame = 0;
    if (!visible || document.hidden) return;
    if (motion.matches) { draw(0); return; }
    if (time-lastFrame >= 33) { draw(time); lastFrame=time; }
    frame=requestAnimationFrame(tick);
  }
  function resume() {
    if (frame) cancelAnimationFrame(frame);
    frame=0;
    draw(motion.matches ? 0 : performance.now());
    if (visible && !document.hidden && !motion.matches) frame=requestAnimationFrame(tick);
  }
  const observer=new IntersectionObserver(entries=>{ visible=entries[0].isIntersecting; resume(); });
  observer.observe(canvas);
  document.addEventListener('visibilitychange',resume);
  motion.addEventListener('change',resume);
  draw(0);
}
initializeTree();
const audio = $('#music');
const musicButton = $('#music-toggle');
let musicMissing = !CONFIG.musicUrl;
if(CONFIG.musicUrl) audio.src = CONFIG.musicUrl;
function syncMusic() { const playing = !audio.paused && !audio.ended && !musicMissing; musicButton.setAttribute('aria-pressed',String(playing)); musicButton.setAttribute('aria-label',musicMissing ? 'Երաժշտության ֆայլը հասանելի չէ' : playing ? 'Դադարեցնել երաժշտությունը' : 'Միացնել երաժշտությունը'); $('#music-label').textContent = musicMissing ? 'Երաժշտություն չկա' : playing ? 'Դադարեցնել' : 'Երաժշտություն'; }
async function playMusic() { if(musicMissing) return; try { await audio.play(); } catch { $('#audio-status').textContent = musicMissing ? 'Երաժշտության ֆայլը հասանելի չէ։' : 'Երաժշտությունը չի միացել։ Կարող եք կրկին փորձել կոճակով։'; } syncMusic(); }
['play','pause','ended'].forEach(event => audio.addEventListener(event,syncMusic));
audio.addEventListener('error',() => { musicMissing=true; syncMusic(); $('#audio-status').textContent='Երաժշտության ֆայլը հասանելի չէ։'; });
musicButton.addEventListener('click',() => { if(audio.paused) void playMusic(); else audio.pause(); });
syncMusic();
let opened=false;
document.body.classList.add('intro-active');
$('#open-invite').addEventListener('click', () => {
  if (opened) return;
  opened = true;
  $('#open-invite').disabled = true;
  // Keep playback inside the original user gesture.
  void playMusic();
  const intro = $('#intro');
  const invitation = $('#invitation');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  invitation.hidden = false;
  invitation.inert = true;
  invitation.setAttribute('aria-hidden', 'true');
  window.scrollTo(0, 0);
  intro.classList.add('opening');
  // Unfold the cover itself; no card is lifted out of the envelope.
  setTimeout(() => intro.classList.add('leaving'), reduced ? 0 : 2900);
  setTimeout(() => {
    intro.hidden = true;
    invitation.inert = false;
    invitation.removeAttribute('aria-hidden');
    document.body.classList.remove('intro-active');
    document.dispatchEvent(new Event('invitation:opened'));
    const heading = $('.hero-title');
    heading.tabIndex = -1;
    heading.focus({preventScroll:true});
  }, reduced ? 0 : 4400);
});

function updateCountdown(now=Date.now()) { const remaining=validDate ? eventDate.getTime()-now : NaN; if(!Number.isFinite(remaining)||remaining<=0) { $('#countdown').hidden=true; $('#countdown-message').hidden=false; $('#countdown-message').textContent=validDate ? 'Մեր տոնական երեկոն արդեն մեկնարկել է։' : 'Միջոցառման ամսաթիվը կճշտվի։'; return; } $('#countdown').hidden=false; $('#countdown-message').hidden=true; const seconds=Math.floor(remaining/1000); const values=[Math.floor(seconds/86400),Math.floor(seconds/3600)%24,Math.floor(seconds/60)%60,seconds%60]; ['days','hours','minutes','seconds'].forEach((id,i) => { document.getElementById(id).textContent=String(values[i]).padStart(2,'0'); }); }
updateCountdown(); setInterval(updateCountdown,1000);
const form=$('#rsvp-form');
const isDemo=CONFIG.demoMode || !CONFIG.rsvpEndpoint;
$('#demo-notice').hidden=!isDemo;
$('#submit-rsvp').firstChild.textContent=isDemo ? 'Ստուգել պատասխանը ' : 'Հաստատել մասնակցությունը ';
let submitting=false;
// API ինտեգրացիայի միակ հատվածը. endpoint-ը պետք է ընդունի JSON և վերադարձնի 2xx։
// Սերվերը պետք է ստուգի դաշտերը, սահմանափակի հարցումները և ապահովի CORS-ը, եթե այլ դոմեն է։
async function sendRSVP(payload) { const endpoint=safeHttpUrl(CONFIG.rsvpEndpoint); if(!endpoint) throw new Error('invalid endpoint'); const controller=new AbortController(); const timeout=setTimeout(()=>controller.abort(),15000); try { const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:controller.signal}); if(!response.ok) throw new Error('request failed'); } finally { clearTimeout(timeout); } }
form.addEventListener('submit',async event => { event.preventDefault(); if(submitting) return; const name=$('#full-name'); name.setCustomValidity(name.value.trim().split(/\s+/).length<2 ? 'Խնդրում ենք նշել անունը և ազգանունը։' : ''); if(!form.reportValidity()) return; const status=$('#form-status'); status.classList.remove('error'); const payload={fullName:name.value.trim(),attendance:form.elements.attendance.value,guests:form.elements.attendance.value==='yes' ? 1 : 0,comment:$('#comment').value.trim()}; if(isDemo) { status.textContent='Դաշտերը ճիշտ են լրացված։ Սա ցուցադրական ստուգում է․ պատասխանը չի ուղարկվել և չի պահպանվել։'; status.focus(); return; } submitting=true; $('#submit-rsvp').disabled=true; form.setAttribute('aria-busy','true'); status.textContent='Ուղարկվում է…'; try { await sendRSVP(payload); status.textContent='Շնորհակալություն։ Ձեր պատասխանն ընդունված է։'; form.reset(); } catch { status.classList.add('error'); status.textContent='Չհաջողվեց հաստատել պատասխանի ընդունումը։ Փորձեք ավելի ուշ կամ կապվեք կազմակերպչի հետ։'; } finally { submitting=false; $('#submit-rsvp').disabled=false; form.removeAttribute('aria-busy'); status.focus(); } });
$('#full-name').addEventListener('input',event => event.target.setCustomValidity(''));


// Scroll-linked golden ribbon: scrolling backwards retracts the same path.
function initializeTimeline() {
  const container = $('#flow-timeline');
  const path = $('#timeline-curve');
  if (!container || !path) return;
  const length = path.getTotalLength();
  const strokes = container.querySelectorAll('.timeline-draw');
  strokes.forEach(stroke => { stroke.style.strokeDasharray = length; });
  const namespace = 'http://www.w3.org/2000/svg';
  const sparks = [];
  for (let i = 0; i < 95; i++) {
    const fraction = i / 94;
    const point = path.getPointAtLength(fraction * length);
    const spark = document.createElementNS(namespace, 'circle');
    spark.setAttribute('cx', point.x + Math.sin(i * 7.3) * 5);
    spark.setAttribute('cy', point.y + Math.cos(i * 5.7) * 3);
    spark.setAttribute('r', i % 7 === 0 ? '1.9' : '1');
    spark.setAttribute('class', 'timeline-spark');
    spark.style.animationDelay = `-${(i * .37) % 3}s`;
    $('#timeline-sparks').append(spark);
    sparks.push({element:spark, fraction});
  }
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let pending = 0;
  function update() {
    pending = 0;
    if ($('#invitation').hidden) return;
    const rect = container.getBoundingClientRect();
    const progress = motion.matches ? 1 : Math.max(0, Math.min(1, (innerHeight * .7 - rect.top) / rect.height));
    strokes.forEach(stroke => { stroke.style.strokeDashoffset = length * (1-progress); });
    const point = path.getPointAtLength(length * progress);
    $('#timeline-tip').setAttribute('transform', `translate(${point.x} ${point.y})`);
    $('#timeline-tip').style.opacity = progress > 0 && progress < 1 ? '1' : '0';
    sparks.forEach(spark => { spark.element.style.visibility = spark.fraction <= progress ? 'visible' : 'hidden'; });
    container.querySelectorAll('.timeline li').forEach((item, i) => item.classList.toggle('is-reached', progress >= (i + .5)/5));
    container.dataset.progress = progress.toFixed(4);
  }
  function schedule() { if (!pending) pending = requestAnimationFrame(update); }
  window.addEventListener('scroll', schedule, {passive:true});
  window.addEventListener('resize', schedule, {passive:true});
  document.addEventListener('invitation:opened', schedule);
  motion.addEventListener('change', schedule);
  schedule();
}
initializeTimeline();
