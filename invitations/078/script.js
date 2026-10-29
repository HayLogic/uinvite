'use strict';
// Անունները, օրը, ժամը, տեքստերը և ծրագիրը դեռ օրինակային են։
const CONFIG=Object.freeze({invitationNumber:'078',brideName:'Աննա',groomName:'Դավիթ',latinNames:'Anna & David',monogram:'Ա / Դ',eventDate:'2027-05-24T15:00:00+04:00',venueName:'Վայրը կհստակեցվի',address:'',mapsUrl:'',contactPhone:'',rsvpEndpoint:'',inviteText:'Մեծ սիրով հրավիրում ենք ձեզ կիսելու մեզ հետ մեր կյանքի ամենագեղեցիկ օրերից մեկը։ Ձեր ներկայությունը, ջերմ խոսքերն ու ժպիտները մեր տոնը կդարձնեն ամբողջական։',program:[{time:'15:00',title:'Հյուրերի դիմավորում'},{time:'16:00',title:'Արարողություն'},{time:'17:00',title:'Տոնական ընթրիք'},{time:'19:00',title:'Պարեր և երաժշտություն'},{time:'21:00',title:'Քաղցր ավարտ'}]});
const $=s=>document.querySelector(s);
[['data-bride',CONFIG.brideName],['data-groom',CONFIG.groomName],['data-monogram',CONFIG.monogram],['data-latin-names',CONFIG.latinNames],['data-venue',CONFIG.venueName]].forEach(([attribute,value])=>document.querySelectorAll(`[${attribute}]`).forEach(e=>e.textContent=value));
document.title=`${CONFIG.brideName} և ${CONFIG.groomName} · 078`;
$('#invite-text').textContent=CONFIG.inviteText;$('#venue-address').textContent=CONFIG.address;$('#venue-address').hidden=!CONFIG.address;
function safeURL(value,relative=false){if(!value)return '';try{const url=relative?new URL(value,location.href):new URL(value);return ['http:','https:'].includes(url.protocol)?url.href:'';}catch{return '';}}
const map=safeURL(CONFIG.mapsUrl);if(map){$('#maps-link').href=map;$('#maps-link').hidden=false;}
if(/^\+?[0-9 ()-]{7,24}$/.test(CONFIG.contactPhone)){$('#contact-link').textContent=CONFIG.contactPhone;$('#contact-link').href='tel:'+CONFIG.contactPhone.replace(/[^+0-9]/g,'');$('#contact-link').hidden=false;}
const date=new Date(CONFIG.eventDate),valid=Number.isFinite(date.getTime())&&/\+04:00$/.test(CONFIG.eventDate);
const months=['հունվար','փետրվար','մարտ','ապրիլ','մայիս','հունիս','հուլիս','օգոստոս','սեպտեմբեր','հոկտեմբեր','նոյեմբեր','դեկտեմբեր'];
if(valid){
 const parts=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'numeric',year:'numeric',timeZone:'Asia/Yerevan'}).formatToParts(date).map(p=>[p.type,p.value]));
 const year=Number(parts.year),month=Number(parts.month)-1,day=Number(parts.day);
 const label=`${day} ${months[month]} ${year}`;
 $('#portrait-date').textContent=label;$('#footer-date').textContent=label;$('#calendar-title').textContent=`${months[month]} ${year}`;
 const calendar=$('#calendar');['Երկ','Երք','Չոր','Հնգ','Ուրբ','Շբթ','Կիր'].forEach(name=>{const e=document.createElement('span');e.className='weekday';e.textContent=name;calendar.append(e);});
 const offset=(new Date(Date.UTC(year,month,1)).getUTCDay()+6)%7,days=new Date(Date.UTC(year,month+1,0)).getUTCDate();
 for(let n=0;n<offset;n++){const e=document.createElement('span');e.setAttribute('aria-hidden','true');calendar.append(e);}
 for(let n=1;n<=days;n++){const e=document.createElement('span');e.className='calendar-day';e.textContent=n;if(n===day){e.classList.add('wedding-day');e.setAttribute('aria-label',label+'՝ մեր հարսանիքը');e.setAttribute('aria-current','date');}calendar.append(e);}
}else{$('#portrait-date').textContent='Օրը կհստակեցվի';$('#calendar-title').textContent='Օրը կհստակեցվի';}
CONFIG.program.forEach((item,i)=>{const li=document.createElement('li');li.className='reveal';const time=document.createElement('time');time.dateTime=item.time;time.textContent=item.time;const text=document.createElement('span');text.textContent=item.title;li.append(time,text);$('#program-items').append(li);});
const motion=matchMedia('(prefers-reduced-motion: reduce)');
if('IntersectionObserver'in window){const targets=document.querySelectorAll('.reveal');document.body.classList.add('js-reveal');const observer=new IntersectionObserver(items=>items.forEach(item=>{if(item.isIntersecting){item.target.classList.add('is-visible');observer.unobserve(item.target);}}),{threshold:0,rootMargin:'0px 0px 20px 0px'});const show=()=>{targets.forEach(e=>e.classList.add('is-visible'));observer.disconnect();};if(motion.matches)show();else targets.forEach(e=>observer.observe(e));motion.addEventListener('change',e=>{if(e.matches)show();});}
const guestInput=$('#guest-count');
function syncGuests(){const attending=$('input[name=attendance]:checked').value==='yes';$('#guest-field').hidden=!attending;guestInput.disabled=!attending;guestInput.required=attending;const count=Number(guestInput.value);$('#guest-minus').disabled=count<=1;$('#guest-plus').disabled=count>=10;}
$('#guest-minus').addEventListener('click',()=>{guestInput.stepDown();syncGuests();});$('#guest-plus').addEventListener('click',()=>{guestInput.stepUp();syncGuests();});guestInput.addEventListener('input',syncGuests);document.querySelectorAll('input[name=attendance]').forEach(e=>e.addEventListener('change',syncGuests));syncGuests();
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
  const payload={fullName:name.value.trim(),attendance:form.elements.attendance.value,comment:'',guestCount:form.elements.attendance.value==='yes'?Number(guestInput.value):0};
  submitting=true;$('#submit-rsvp').disabled=true;form.setAttribute('aria-busy','true');status.textContent='Ուղարկվում է…';
  try{await sendRSVP(payload);status.textContent='Շնորհակալություն։ Ձեր պատասխանն ընդունված է։';form.reset();syncGuests();}
  catch{status.classList.add('error');status.textContent='Չհաջողվեց հաստատել պատասխանի ընդունումը։ Փորձեք ավելի ուշ կամ կապվեք կազմակերպչի հետ։';}
  finally{submitting=false;$('#submit-rsvp').disabled=false;form.removeAttribute('aria-busy');status.focus();}
});
$('#full-name').addEventListener('input',event=>event.target.setCustomValidity(''));
document.dispatchEvent(new Event('invitation:opened'));

