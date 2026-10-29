'use strict';
// Հաստատված են՝ Անտառամուտ ռեստորան, Դիլիջան, 16:00։ Ընկերությունը, օրը և ծրագիրը դեռ օրինակային են։
const CONFIG=Object.freeze({
  invitationNumber:'072',
  companyName:'Ձեր ընկերությունը',
  celebrationYear:'2027',
  eventTitle:'Տոնական երեկո',
  eventDate:'2026-12-31T16:00:00+04:00',
  venueName:'Անտառամուտ ռեստորան',
  rsvpEndpoint:'', // Առանց endpoint-ի ձևը ցուցադրական է։ Գաղտնի բանալիներ չտեղադրել։
  address:'Դիլիջան',
  mapsUrl:'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent('Անտառամուտ ռեստորան Դիլիջան'),
  program:[{time:'16:00',title:'Հյուրերի դիմավորում'},{time:'16:30',title:'Բացման խոսք և առաջին կենաց'},{time:'17:00',title:'Ընթրիք'},{time:'18:00',title:'Տոնական խաղեր և անակնկալներ'},{time:'19:00',title:'Կենդանի երաժշտություն'},{time:'20:30',title:'DJ և պարեր'}]
});
const $=selector=>document.querySelector(selector);
document.querySelectorAll('[data-company]').forEach(element=>{element.textContent=CONFIG.companyName;});
document.querySelectorAll('[data-year]').forEach(element=>{element.textContent=CONFIG.celebrationYear;});

document.title=`${CONFIG.companyName} · ${CONFIG.eventTitle} · ${CONFIG.invitationNumber}`;
$('#hero-venue').textContent=CONFIG.venueName;
function safeURL(value,relative=false){
  if(!value)return '';
  try{const url=relative ? new URL(value,location.href) : new URL(value);return ['http:','https:'].includes(url.protocol) ? url.href : '';}catch{return '';}
}
const eventDate=new Date(CONFIG.eventDate),validDate=Number.isFinite(eventDate.getTime())&&/\+04:00$/.test(CONFIG.eventDate);
const months=['հունվարի','փետրվարի','մարտի','ապրիլի','մայիսի','հունիսի','հուլիսի','օգոստոսի','սեպտեմբերի','հոկտեմբերի','նոյեմբերի','դեկտեմբերի'];
if(validDate){
  const parts=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'numeric',year:'numeric',timeZone:'Asia/Yerevan'}).formatToParts(eventDate).map(part=>[part.type,part.value]));
  $('#event-date').textContent=`${Number(parts.day)} ${months[Number(parts.month)-1]} ${parts.year}`;
  $('#event-time').textContent=new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',hourCycle:'h23',timeZone:'Asia/Yerevan'}).format(eventDate);
}else{$('#event-date').textContent='Ամսաթիվը կճշտվի';$('#event-time').textContent='Ժամը կճշտվի';}
$('#venue-name').textContent=CONFIG.venueName;
$('#venue-address').textContent=CONFIG.address;$('#venue-address').hidden=!CONFIG.address;
const mapURL=safeURL(CONFIG.mapsUrl);if(mapURL){$('#maps-link').href=mapURL;$('#maps-link').hidden=false;}
function updateCountdown(now=Date.now()){
 const remaining=validDate?eventDate.getTime()-now:NaN;
 const finished=!Number.isFinite(remaining)||remaining<=0;
 $('#countdown').hidden=finished;$('#countdown-message').hidden=!finished;
 if(finished){$('#countdown-message').textContent=validDate?'Մեր տոնական երեկոն արդեն մեկնարկել է։':'Ամսաթիվը կճշտվի։';return;}
 const seconds=Math.floor(remaining/1000);const values=[Math.floor(seconds/86400),Math.floor(seconds/3600)%24,Math.floor(seconds/60)%60,seconds%60];
 ['days','hours','minutes','seconds'].forEach((id,i)=>document.getElementById(id).textContent=String(values[i]).padStart(2,'0'));
}
updateCountdown();setInterval(updateCountdown,1000);
CONFIG.program.forEach(item=>{const li=document.createElement('li');li.className='reveal';const time=document.createElement('time');time.dateTime=item.time;time.textContent=item.time;const title=document.createElement('span');title.textContent=item.title;li.append(time,title);$('#program-items').append(li);});
function initializeReveals(){
  if(!('IntersectionObserver' in window))return;
  const targets=Array.from(document.querySelectorAll('.reveal'));
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  // Observe stable layout boxes; never hide a section again after it appears.
  // In particular, a tall section must not need 10% visibility to remain readable.
  const observer=new IntersectionObserver(items=>items.forEach(item=>{
    if(item.isIntersecting){item.target.classList.add('is-visible');observer.unobserve(item.target);}
  }),{threshold:0,rootMargin:'0px 0px 30px 0px'});
  document.body.classList.add('js-reveal');
  function revealAll(){targets.forEach(target=>target.classList.add('is-visible'));observer.disconnect();}
  if(preference.matches)revealAll();else targets.forEach(target=>observer.observe(target));
  preference.addEventListener('change',event=>{if(event.matches)revealAll();});
}
initializeReveals();
const form=$('#rsvp-form'),isPreview=!CONFIG.rsvpEndpoint;
$('#preview-note').hidden=!isPreview;
let submitting=false;
async function sendRSVP(payload){
  const endpoint=safeURL(CONFIG.rsvpEndpoint,true);if(!endpoint)throw new Error('Invalid endpoint');
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);
  try{const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:controller.signal});if(!response.ok)throw new Error('Request failed');}finally{clearTimeout(timeout);}
}
form.addEventListener('submit',async event=>{
  event.preventDefault();if(submitting)return;
  const name=$('#full-name');name.setCustomValidity(name.value.trim().split(/\s+/).length<2 ? 'Խնդրում ենք նշել անունը և ազգանունը։' : '');if(!form.reportValidity())return;
  const status=$('#form-status');status.classList.remove('error');
  if(isPreview){status.textContent='Դաշտերը ճիշտ են լրացված։ Սա ցուցադրական ձև է․ պատասխանը չի ուղարկվել և չի պահպանվել։';status.focus();return;}
  const payload={fullName:name.value.trim(),attendance:form.elements.attendance.value,comment:''};
  submitting=true;$('#submit-rsvp').disabled=true;form.setAttribute('aria-busy','true');status.textContent='Ուղարկվում է…';
  try{await sendRSVP(payload);status.textContent='Շնորհակալություն։ Ձեր պատասխանն ընդունված է։';form.reset();}
  catch{status.classList.add('error');status.textContent='Չհաջողվեց հաստատել պատասխանի ընդունումը։ Փորձեք ավելի ուշ կամ կապվեք կազմակերպչի հետ։';}
  finally{submitting=false;$('#submit-rsvp').disabled=false;form.removeAttribute('aria-busy');status.focus();}
});
$('#full-name').addEventListener('input',event=>event.target.setCustomValidity(''));
document.dispatchEvent(new Event('invitation:opened'));
