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
// Դետերմինիստիկ մասնիկներ՝ առանց նկարների և ծանր canvas անիմացիայի։
let seed = 27;
function random() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
const particles = document.createDocumentFragment();
for(let i=0;i<130;i++) { const p = document.createElement('i'); const y = 12 + random()*79; const width = (y-8)*.45; p.className='particle'; p.style.cssText=`left:${50+(random()-.5)*width*2}%;top:${y}%;--size:${1+random()*2.3}px;--duration:${2+random()*3}s;--delay:-${random()*5}s`; particles.append(p); }
$('#tree-particles').append(particles);
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
