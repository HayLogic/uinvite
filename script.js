'use strict';
// Միջոցառման տվյալներ. հասցեն, քարտեզը և RSVP endpoint-ը դեռ պետք է լրացնել։
const CONFIG = Object.freeze({
  companyName: 'HayLogic Line Day',
  eventTitle: 'Ամանորյա կորպորատիվ երեկո',
  eventDate: '2026-12-18T18:00:00+04:00', // Հայաստանի ժամային գոտի. ժամը նույնպես այստեղ է։
  venueName: 'Paravon ռեստորան',
  address: 'Միջոցառման հասցեն կճշտվի',
  mapsUrl: '',
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
$('#venue').textContent = CONFIG.venueName;
$('#address').textContent = CONFIG.address;
document.title = `${CONFIG.eventTitle} · ${CONFIG.companyName}`;
$('.hero-title').textContent = CONFIG.eventTitle;
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
  function draw(time) {
    context.clearRect(0,0,width,height);
    context.globalCompositeOperation='lighter';
    for (const p of particles) {
      const wave = .5 + .5 * Math.sin(time * .001 * p.speed + p.phase);
      const brightness = motion.matches ? .67 : .15 + .85 * wave * wave;
      context.globalAlpha = p.alpha * brightness;
      const radius = p.size * (p.flare ? 9 : 3.8);
      context.drawImage(glow,p.x-radius,p.y-radius,radius*2,radius*2);
      context.fillStyle='#ffe6a5';
      context.fillRect(p.x,p.y,p.size*.65,p.size*.65);
      if (p.flare && brightness > .65) {
        const arm = 3 + brightness * 3;
        context.strokeStyle='#fff1be'; context.lineWidth=.55;
        context.beginPath();context.moveTo(p.x-arm,p.y);context.lineTo(p.x+arm,p.y);context.moveTo(p.x,p.y-arm);context.lineTo(p.x,p.y+arm);context.stroke();
      }
    }
    context.globalAlpha = .9;
    context.drawImage(glow,149,5,32,42);
    context.globalAlpha = 1;
    context.fillStyle='#fff4c4';
    context.beginPath();context.moveTo(165,14);context.lineTo(166.3,24);context.lineTo(171,26);context.lineTo(166.3,28);context.lineTo(165,38);context.lineTo(163.7,28);context.lineTo(159,26);context.lineTo(163.7,24);context.closePath();context.fill();
    context.globalCompositeOperation='source-over';
  }
  function tick(time) {
    frame = 0;
    if (!visible || document.hidden || motion.matches) return;
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
$('#open-invite').addEventListener('click',() => { if(opened) return; opened=true; $('#open-invite').disabled=true; void playMusic(); $('#intro').classList.add('opening'); const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches; setTimeout(() => { $('#invitation').hidden=false; $('#intro').classList.add('leaving'); setTimeout(() => { $('#intro').hidden=true; document.body.classList.remove('intro-active'); const heading=$('.hero-title'); heading.tabIndex=-1; heading.focus({preventScroll:true}); },reduced ? 0 : 700); },reduced ? 0 : 1700); });
function updateCountdown(now=Date.now()) { const remaining=validDate ? eventDate.getTime()-now : NaN; if(!Number.isFinite(remaining)||remaining<=0) { $('#countdown').hidden=true; $('#countdown-message').hidden=false; $('#countdown-message').textContent=validDate ? 'Մեր տոնական երեկոն արդեն մեկնարկել է։' : 'Միջոցառման ամսաթիվը կճշտվի։'; return; } $('#countdown').hidden=false; $('#countdown-message').hidden=true; const seconds=Math.floor(remaining/1000); const values=[Math.floor(seconds/86400),Math.floor(seconds/3600)%24,Math.floor(seconds/60)%60,seconds%60]; ['days','hours','minutes','seconds'].forEach((id,i) => { document.getElementById(id).textContent=String(values[i]).padStart(2,'0'); }); }
updateCountdown(); setInterval(updateCountdown,1000);
const form=$('#rsvp-form');
const isDemo=CONFIG.demoMode || !CONFIG.rsvpEndpoint;
$('#demo-notice').hidden=!isDemo;
$('#submit-rsvp').firstChild.textContent=isDemo ? 'Ստուգել պատասխանը ' : 'Հաստատել մասնակցությունը ';
function syncGuests() { const attending=form.elements.attendance.value==='yes'; $('#guests-field').hidden=!attending; $('#guests').required=attending; $('#guests').disabled=!attending; }
form.querySelectorAll('[name=attendance]').forEach(el => el.addEventListener('change',syncGuests)); syncGuests();
let submitting=false;
// API ինտեգրացիայի միակ հատվածը. endpoint-ը պետք է ընդունի JSON և վերադարձնի 2xx։
// Սերվերը պետք է ստուգի դաշտերը, սահմանափակի հարցումները և ապահովի CORS-ը, եթե այլ դոմեն է։
async function sendRSVP(payload) { const endpoint=safeHttpUrl(CONFIG.rsvpEndpoint); if(!endpoint) throw new Error('invalid endpoint'); const controller=new AbortController(); const timeout=setTimeout(()=>controller.abort(),15000); try { const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:controller.signal}); if(!response.ok) throw new Error('request failed'); } finally { clearTimeout(timeout); } }
form.addEventListener('submit',async event => { event.preventDefault(); if(submitting) return; const name=$('#full-name'); name.setCustomValidity(name.value.trim().split(/\s+/).length<2 ? 'Խնդրում ենք նշել անունը և ազգանունը։' : ''); if(!form.reportValidity()) return; const status=$('#form-status'); status.classList.remove('error'); const payload={fullName:name.value.trim(),attendance:form.elements.attendance.value,guests:form.elements.attendance.value==='yes' ? Number($('#guests').value) : 0,comment:$('#comment').value.trim()}; if(isDemo) { status.textContent='Դաշտերը ճիշտ են լրացված։ Սա ցուցադրական ստուգում է․ պատասխանը չի ուղարկվել և չի պահպանվել։'; status.focus(); return; } submitting=true; $('#submit-rsvp').disabled=true; form.setAttribute('aria-busy','true'); status.textContent='Ուղարկվում է…'; try { await sendRSVP(payload); status.textContent='Շնորհակալություն։ Ձեր պատասխանն ընդունված է։'; form.reset(); syncGuests(); } catch { status.classList.add('error'); status.textContent='Չհաջողվեց հաստատել պատասխանի ընդունումը։ Փորձեք ավելի ուշ կամ կապվեք կազմակերպչի հետ։'; } finally { submitting=false; $('#submit-rsvp').disabled=false; form.removeAttribute('aria-busy'); status.focus(); } });
$('#full-name').addEventListener('input',event => event.target.setCustomValidity(''));
