'use strict';
// Հաստատված են՝ TT Group, 18:00, Adana complex։ Օրը և ծրագիրը դեռ օրինակային են։
const CONFIG=Object.freeze({
  invitationNumber:'067',
  companyName:'TT Group',
  celebrationYear:'2027',
  eventTitle:'Տոնական երեկո',
  eventDate:'2026-12-31T18:00:00+04:00',
  venueName:'Adana complex',
  address:'Միջոցառման ճշգրիտ հասցեն կհայտարարվի շուտով։',
  celebrationImage:'', // Կցված հրավառության նկարի ֆայլը՝ assets/celebration-fireworks.png։ Hero-ի համար չէ։
  venueImage:'', // Միայն հաստատված իրական վայրի լուսանկար։
  mapsUrl:'',
  inviteMessage:'Սիրելի՛ գործընկերներ, հրավիրում ենք ձեզ միասին ամփոփելու անցնող տարին, նշելու մեր ձեռքբերումները և նոր երազանքներով դիմավորելու գալիքը։ Սպասվում է ջերմ երեկո՝ երաժշտությամբ, հաճելի անակնկալներով և միասին ստեղծված անմոռանալի պահերով։',
  program:[
    {time:'18:00',title:'Հյուրերի դիմավորում',description:'Տոնական տրամադրություն և առաջին կենացը'},
    {time:'18:30',title:'Տոնական ընթրիք',description:'Համեր, զրույցներ և գեղեցիկ պահեր'},
    {time:'20:30',title:'Խաղեր և անակնկալներ',description:'Ժպիտներ և տոնական կախարդանք'},
    {time:'22:00',title:'Երաժշտություն և պարեր',description:'Երեկոյի ամենավառ ռիթմերը'},
    {time:'00:00',title:'Միասին՝ դեպի նոր տարի',description:'Բաժակ բարձրացնենք մեր նոր սկիզբների համար'}
  ],
  rsvpEndpoint:'', // Առանց endpoint-ի ձևը ցուցադրական է։ Գաղտնի բանալիներ չտեղադրել։
  glitterEnabled:true
});
const $=selector=>document.querySelector(selector);
document.querySelectorAll('[data-company]').forEach(element=>{element.textContent=CONFIG.companyName;});
document.querySelectorAll('[data-year]').forEach(element=>{element.textContent=CONFIG.celebrationYear;});
$('#entry-year').textContent=CONFIG.celebrationYear;
document.title=`${CONFIG.companyName} · ${CONFIG.eventTitle} · ${CONFIG.invitationNumber}`;
$('#invite-message').textContent=CONFIG.inviteMessage;$('#hero-venue').textContent=CONFIG.venueName;$('#venue-name').textContent=CONFIG.venueName;$('#venue-address').textContent=CONFIG.address;
function safeURL(value,relative=false){
  if(!value)return '';
  try{const url=relative ? new URL(value,location.href) : new URL(value);return ['http:','https:'].includes(url.protocol) ? url.href : '';}catch{return '';}
}
const mapsUrl=safeURL(CONFIG.mapsUrl);if(mapsUrl){$('#maps-link').href=mapsUrl;$('#maps-link').hidden=false;}
if(CONFIG.venueImage){
  const image=$('#venue-image');image.alt=`${CONFIG.venueName}՝ միջոցառման վայրի լուսանկարը`;
  image.addEventListener('load',()=>{$('#venue-photo').hidden=false;});image.addEventListener('error',()=>{$('#venue-photo').hidden=true;});image.src=CONFIG.venueImage;
}
// Decorative interlude below the welcome section, separate from the hero and venue photo.
if(CONFIG.celebrationImage){
  const image=$('#celebration-image');
  image.addEventListener('load',()=>{$('#celebration-scene').hidden=false;});
  image.addEventListener('error',()=>{$('#celebration-scene').hidden=true;});
  image.src=CONFIG.celebrationImage;
}
const eventDate=new Date(CONFIG.eventDate),validDate=Number.isFinite(eventDate.getTime())&&/\+04:00$/.test(CONFIG.eventDate);
const months=['հունվարի','փետրվարի','մարտի','ապրիլի','մայիսի','հունիսի','հուլիսի','օգոստոսի','սեպտեմբերի','հոկտեմբերի','նոյեմբերի','դեկտեմբերի'];
if(validDate){
  const parts=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'numeric',year:'numeric',timeZone:'Asia/Yerevan'}).formatToParts(eventDate).map(part=>[part.type,part.value]));
  $('#event-date').textContent=`${Number(parts.day)} ${months[Number(parts.month)-1]} ${parts.year}`;
  $('#event-time').textContent=new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',hourCycle:'h23',timeZone:'Asia/Yerevan'}).format(eventDate);
}else{$('#event-date').textContent='Ամսաթիվը կճշտվի';$('#event-time').textContent='Ժամը կճշտվի';}
function updateCountdown(now=Date.now()){
  const remaining=validDate ? eventDate.getTime()-now : NaN;
  if(!Number.isFinite(remaining)||remaining<=0){$('#countdown').hidden=true;$('#countdown-message').hidden=false;$('#countdown-message').textContent=validDate ? 'Մեր տոնական երեկոն արդեն մեկնարկել է։' : 'Միջոցառման ամսաթիվը կճշտվի։';return;}
  $('#countdown').hidden=false;$('#countdown-message').hidden=true;
  const seconds=Math.floor(remaining/1000),values=[Math.floor(seconds/86400),Math.floor(seconds/3600)%24,Math.floor(seconds/60)%60,seconds%60];
  ['days','hours','minutes','seconds'].forEach((id,i)=>{document.getElementById(id).textContent=String(values[i]).padStart(2,'0');});
}
updateCountdown();setInterval(updateCountdown,1000);
const entries=document.createDocumentFragment();
CONFIG.program.forEach((item,i)=>{
  const entry=document.createElement('li');entry.className='reveal';entry.dataset.delay=String(i%2*70);
  const time=document.createElement('time');time.textContent=item.time;time.dateTime=item.time;
  const text=document.createElement('div'),title=document.createElement('h3'),description=document.createElement('p');title.textContent=item.title;description.textContent=item.description;
  text.append(title,description);entry.append(time,text);entries.append(entry);
});
$('#program-items').append(entries);
// Mobile navigation remains a real keyboard-accessible nav, rather than an inert decoration.
const desktop=matchMedia('(min-width:768px)');
let menuOpen=false;
function updateMenu(){
  $('#site-nav').hidden=!desktop.matches&&!menuOpen;
  $('#nav-toggle').setAttribute('aria-expanded',String(!desktop.matches&&menuOpen));
  $('#nav-toggle').setAttribute('aria-label',menuOpen ? 'Փակել ցանկը' : 'Բացել ցանկը');
}
$('#nav-toggle').addEventListener('click',()=>{menuOpen=!menuOpen;updateMenu();});
$('#site-nav').querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{menuOpen=false;updateMenu();}));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menuOpen){menuOpen=false;updateMenu();$('#nav-toggle').focus();}});
document.addEventListener('click',event=>{if(menuOpen&&!$('#site-header').contains(event.target)){menuOpen=false;updateMenu();}});
desktop.addEventListener('change',()=>{menuOpen=false;updateMenu();});updateMenu();
function initializeReveals(){
  if(!('IntersectionObserver' in window))return;
  const targets=Array.from(document.querySelectorAll('.reveal')),preference=matchMedia('(prefers-reduced-motion: reduce)');
  document.body.classList.add('js-reveal');targets.forEach(target=>target.style.setProperty('--delay',`${Number(target.dataset.delay)||0}ms`));
  const observer=new IntersectionObserver(items=>items.forEach(item=>item.target.classList.toggle('is-visible',item.isIntersecting)),{threshold:.1,rootMargin:'0px 0px -5% 0px'});
  let active=false;
  function refresh(){observer.disconnect();if(!active)return;targets.forEach(target=>{if(preference.matches)target.classList.add('is-visible');else{target.classList.remove('is-visible');observer.observe(target);}});}
  document.addEventListener('invitation:opened',()=>{active=true;refresh();},{once:true});preference.addEventListener('change',refresh);
}
initializeReveals();
let opened=false;
$('#open-invitation').addEventListener('click',()=>{
  if(opened)return;opened=true;$('#open-invitation').disabled=true;$('#open-invitation').setAttribute('aria-expanded','true');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  $('#invitation').hidden=false;$('#invitation').inert=true;$('#invitation').setAttribute('aria-hidden','true');
  window.scrollTo({top:0,behavior:'instant'});$('#entry-cover').classList.add('opening');
  setTimeout(()=>$('#entry-cover').classList.add('leaving'),reduced ? 0 : 2300);
  setTimeout(()=>{
    $('#entry-cover').hidden=true;$('#invitation').inert=false;$('#invitation').removeAttribute('aria-hidden');document.body.classList.remove('cover-active');
    $('#hero-title').tabIndex=-1;$('#hero-title').focus({preventScroll:true});document.dispatchEvent(new Event('invitation:opened'));
  },reduced ? 0 : 3400);
});
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
  const payload={fullName:name.value.trim(),attendance:form.elements.attendance.value,comment:$('#comment').value.trim()};
  submitting=true;$('#submit-rsvp').disabled=true;form.setAttribute('aria-busy','true');status.textContent='Ուղարկվում է…';
  try{await sendRSVP(payload);status.textContent='Շնորհակալություն։ Ձեր պատասխանն ընդունված է։';form.reset();}
  catch{status.classList.add('error');status.textContent='Չհաջողվեց հաստատել պատասխանի ընդունումը։ Փորձեք ավելի ուշ կամ կապվեք կազմակերպչի հետ։';}
  finally{submitting=false;$('#submit-rsvp').disabled=false;form.removeAttribute('aria-busy');status.focus();}
});
$('#full-name').addEventListener('input',event=>event.target.setCustomValidity(''));
function initializeGoldDust(){
  const canvas=$('#gold-dust'),context=canvas.getContext('2d');if(!CONFIG.glitterEnabled||!context){canvas.hidden=true;return;}
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  let width=0,height=0,particles=[],frame=0,last=0,entry=true,seed=672027;
  const random=()=>{seed=seed*16807%2147483647;return(seed-1)/2147483646;};
  const sprite=document.createElement('canvas');sprite.width=sprite.height=48;
  const brush=sprite.getContext('2d'),gradient=brush.createRadialGradient(24,24,0,24,24,24);
  gradient.addColorStop(0,'rgba(255,246,194,1)');gradient.addColorStop(.12,'rgba(255,213,104,.95)');gradient.addColorStop(.4,'rgba(215,161,46,.25)');gradient.addColorStop(1,'rgba(183,119,19,0)');brush.fillStyle=gradient;brush.fillRect(0,0,48,48);
  function resize(){
    width=innerWidth;height=innerHeight;entry=document.body.classList.contains('cover-active');const ratio=Math.min(devicePixelRatio||1,1.5);
    canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);context.setTransform(ratio,0,0,ratio,0,0);
    const count=entry ? Math.min(1100,Math.max(700,Math.round(width*1.7))) : Math.min(180,Math.max(80,Math.round(width/8)));
    particles=Array.from({length:count},(_,i)=>({x:entry ? random()*width : (i%6===0 ? width*(.94+random()*.06) : width*Math.pow(random(),1.9)*.105),y:entry ? Math.pow(random(),1.9)*height*.36 : random()*height,size:.35+random()*1.05,speed:entry ? 5+random()*12 : 3+random()*5,phase:random()*Math.PI*2,opacity:entry ? .5+random()*.5 : .25+random()*.65,star:random()>.975}));draw(0,0);
  }
  function draw(elapsed,time){
    context.clearRect(0,0,width,height);context.globalCompositeOperation='lighter';
    particles.forEach(particle=>{
      if(elapsed){particle.y+=particle.speed*elapsed;particle.phase+=elapsed*.35;particle.x+=Math.sin(particle.phase)*2*elapsed;if(particle.y>(entry ? height*.42 : height)+7){particle.y=-7;if(entry)particle.x=random()*width;}}
      const twinkle=preference.matches ? .75 : .35+.65*(.5+.5*Math.sin(time*.0008+particle.phase));
      context.globalAlpha=particle.opacity*twinkle;const radius=particle.size*(particle.star ? 6 : 3.6);
      context.drawImage(sprite,particle.x-radius,particle.y-radius,radius*2,radius*2);
      context.fillStyle='#f1c75e';context.fillRect(particle.x,particle.y,particle.size*.65,particle.size*.65);
      if(particle.star){context.strokeStyle='#ffeab0';context.lineWidth=.5;context.beginPath();context.moveTo(particle.x-3,particle.y);context.lineTo(particle.x+3,particle.y);context.moveTo(particle.x,particle.y-3);context.lineTo(particle.x,particle.y+3);context.stroke();}
    });
    context.globalAlpha=1;context.globalCompositeOperation='source-over';
  }
  function tick(time){frame=0;if(document.hidden||preference.matches)return;if(!last)last=time;if(time-last>=33){draw(Math.min((time-last)/1000,.1),time);last=time;}frame=requestAnimationFrame(tick);}
  function resume(){if(frame)cancelAnimationFrame(frame);frame=0;last=0;draw(0,0);if(!document.hidden&&!preference.matches)frame=requestAnimationFrame(tick);}
  window.addEventListener('resize',resize,{passive:true});document.addEventListener('visibilitychange',resume);document.addEventListener('invitation:opened',()=>{resize();resume();});preference.addEventListener('change',resume);resize();resume();
}
initializeGoldDust();
