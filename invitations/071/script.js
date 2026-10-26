'use strict';
// Հաստատված միջոցառման տվյալներ. հասցեն, քարտեզը և RSVP endpoint-ը դեռ չեն տրամադրվել։
const CONFIG = Object.freeze({
  invitationNumber:'071',
  companyName:'SS group',
  heroHeading:'Միասին դեպի',
  celebrationYear:'2027',
  eventTitle:'Ամանորյա կորպորատիվ երեկույթ',
  eventDate:'2026-12-26T17:30:00+04:00', // Հայաստանի ժամային գոտի։
  venueName:'Դվին Հոլլ',
  address:'',
  mapsUrl:'',
  inviteMessage:'Սիրելի՛ գործընկերներ, հրավիրում ենք ձեզ միասին ամփոփելու անցնող տարին, կիսվելու մեր ձեռքբերումներով և նոր երազանքներով դիմավորելու գալիքը։ Թող այս երեկոն լցվի բաժակների զնգոցով, ժպիտներով ու ջերմ հիշողություններով։',
  program:[
    {time:'17:30',title:'Հյուրերի դիմավորում',description:'Առաջին հանդիպումները և տոնական կենացը'},
    {time:'18:00',title:'Տոնական ընթրիք',description:'Տարվա ձեռքբերումների ամփոփում և ջերմ զրույցներ'},
    {time:'19:00',title:'Խաղեր և անակնկալներ',description:'Մի փոքր կախարդանք՝ յուրաքանչյուրի համար'},
    {time:'20:00',title:'Երաժշտություն և պարեր',description:'Երեկոյի ամենավառ ռիթմերը'},
    {time:'21:30',title:'Տոնական ավարտ',description:'Նոր հիշողություններով՝ դեպի նոր տարի'}
  ],
  dressDescription:'Շամպայնի երանգների նրբությունը, ոսկու փայլը և սևի դասական շքեղությունը։',
  dressColors:[{name:'Շամպայն',color:'#d9c5a2'},{name:'Ոսկեգույն',color:'#d1aa56'},{name:'Սև',color:'#262018'}],
  rsvpEndpoint:'', // Առանց endpoint-ի ձևը ցուցադրական է։ Գաղտնի բանալիներ չտեղադրել։
  bubblesEnabled:true
});
const $=selector=>document.querySelector(selector);
document.querySelectorAll('[data-company]').forEach(element=>{element.textContent=CONFIG.companyName;});
$('#hero-heading').textContent=CONFIG.heroHeading;$('#celebration-year').textContent=CONFIG.celebrationYear;$('#event-title').textContent=CONFIG.eventTitle;
document.title=`${CONFIG.companyName} · ${CONFIG.eventTitle} · ${CONFIG.invitationNumber}`;
$('#invite-message').textContent=CONFIG.inviteMessage;$('#venue-name').textContent=CONFIG.venueName;$('#venue-address').textContent=CONFIG.address;
function safeURL(value,relative=false){
  if(!value)return '';
  try{const url=relative ? new URL(value,location.href) : new URL(value);return ['http:','https:'].includes(url.protocol) ? url.href : '';}catch{return '';}
}
const mapsUrl=safeURL(CONFIG.mapsUrl);if(mapsUrl){$('#maps-link').href=mapsUrl;$('#maps-link').hidden=false;}
const eventDate=new Date(CONFIG.eventDate),validDate=Number.isFinite(eventDate.getTime())&&/\+04:00$/.test(CONFIG.eventDate);
const monthTitles=['Հունվար','Փետրվար','Մարտ','Ապրիլ','Մայիս','Հունիս','Հուլիս','Օգոստոս','Սեպտեմբեր','Հոկտեմբեր','Նոյեմբեր','Դեկտեմբեր'];
const months=['հունվարի','փետրվարի','մարտի','ապրիլի','մայիսի','հունիսի','հուլիսի','օգոստոսի','սեպտեմբերի','հոկտեմբերի','նոյեմբերի','դեկտեմբերի'];
const weekdays=['Կիրակի','Երկուշաբթի','Երեքշաբթի','Չորեքշաբթի','Հինգշաբթի','Ուրբաթ','Շաբաթ'];
if(validDate){
  const parts=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{year:'numeric',month:'numeric',day:'numeric',timeZone:'Asia/Yerevan'}).formatToParts(eventDate).map(part=>[part.type,part.value]));
  const year=Number(parts.year),month=Number(parts.month)-1,day=Number(parts.day),weekday=new Date(Date.UTC(year,month,day)).getUTCDay();
  const time=new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',hourCycle:'h23',timeZone:'Asia/Yerevan'}).format(eventDate);
  $('#date-month').textContent=`${monthTitles[month]} ${year}`;$('#date-weekday').textContent=weekdays[weekday];$('#date-day').textContent=day;$('#date-time').textContent=`Ժամը՝ ${time}`;
  $('#calendar-month').textContent=`${monthTitles[month]} ${year}`;$('#calendar-note').textContent=`${day} ${months[month]} ${year} · ${time}`;
  const start=(new Date(Date.UTC(year,month,1)).getUTCDay()+6)%7,days=new Date(Date.UTC(year,month+1,0)).getUTCDate();
  const fragment=document.createDocumentFragment();
  for(let week=0;week<Math.ceil((start+days)/7);week++){
    const row=document.createElement('tr');
    for(let column=0;column<7;column++){
      const cell=document.createElement('td'),date=week*7+column-start+1;
      if(date>0&&date<=days){
        const timeElement=document.createElement('time');timeElement.dateTime=`${year}-${String(month+1).padStart(2,'0')}-${String(date).padStart(2,'0')}`;timeElement.textContent=date;
        if(date===day){cell.className='event-date';timeElement.setAttribute('aria-label',`${date} ${months[month]} ${year}՝ միջոցառման օրը`);}
        cell.append(timeElement);
      }
      row.append(cell);
    }
    fragment.append(row);
  }
  $('#calendar-days').append(fragment);
}else{$('#date-month').textContent='Օրը կճշտվի';$('#date-day').textContent='—';$('#calendar-section').hidden=true;}
function updateCountdown(now=Date.now()){
  const remaining=validDate ? eventDate.getTime()-now : NaN;
  if(!Number.isFinite(remaining)||remaining<=0){$('#countdown').hidden=true;$('#countdown-message').hidden=false;$('#countdown-message').textContent=validDate ? 'Մեր տոնական երեկոն արդեն մեկնարկել է։' : 'Միջոցառման ամսաթիվը կճշտվի։';return;}
  $('#countdown').hidden=false;$('#countdown-message').hidden=true;
  const seconds=Math.floor(remaining/1000),values=[Math.floor(seconds/86400),Math.floor(seconds/3600)%24,Math.floor(seconds/60)%60,seconds%60];
  ['days','hours','minutes','seconds'].forEach((id,i)=>{document.getElementById(id).textContent=String(values[i]).padStart(2,'0');});
}
updateCountdown();setInterval(updateCountdown,1000);
const program=document.createDocumentFragment();
CONFIG.program.forEach((item,i)=>{
  const entry=document.createElement('li');entry.className='reveal';entry.dataset.delay=String(i%2*80);
  const time=document.createElement('time');time.textContent=item.time;time.dateTime=item.time;
  const text=document.createElement('div'),title=document.createElement('h3'),description=document.createElement('p');title.textContent=item.title;description.textContent=item.description;
  text.append(title,description);entry.append(time,text);program.append(entry);
});
$('#program-items').append(program);$('#dress-description').textContent=CONFIG.dressDescription;
CONFIG.dressColors.forEach(color=>{const item=document.createElement('li'),swatch=document.createElement('span'),label=document.createElement('span');swatch.className='swatch';swatch.style.setProperty('--color',color.color);swatch.setAttribute('aria-hidden','true');label.textContent=color.name;item.append(swatch,label);$('#dress-colors').append(item);});
// Reveal text independently of the permanently fixed background photograph.
function initializeReveals(){
  const targets=Array.from(document.querySelectorAll('.reveal'));
  if(!('IntersectionObserver' in window))return;
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  document.body.classList.add('js-reveal');
  targets.forEach(target=>target.style.setProperty('--delay',`${Number(target.dataset.delay)||0}ms`));
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('is-visible',entry.isIntersecting)),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  let active=false;
  function refresh(){
    observer.disconnect();if(!active)return;
    targets.forEach(target=>{if(preference.matches)target.classList.add('is-visible');else{target.classList.remove('is-visible');observer.observe(target);}});
  }
  document.addEventListener('invitation:opened',()=>{active=true;refresh();},{once:true});
  preference.addEventListener('change',refresh);
}
initializeReveals();
let opened=false;
$('#open-gift').addEventListener('click',()=>{
  if(opened)return;opened=true;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  $('#open-gift').disabled=true;$('#open-gift').setAttribute('aria-expanded','true');
  $('#invitation').hidden=false;$('#invitation').inert=true;$('#invitation').setAttribute('aria-hidden','true');
  window.scrollTo({top:0,behavior:'instant'});$('#gift-cover').classList.add('opening');
  setTimeout(()=>$('#gift-cover').classList.add('leaving'),reduced ? 0 : 2300);
  setTimeout(()=>{
    $('#gift-cover').hidden=true;$('#invitation').inert=false;$('#invitation').removeAttribute('aria-hidden');document.body.classList.remove('cover-active');
    $('#hero-title').tabIndex=-1;$('#hero-title').focus({preventScroll:true});document.dispatchEvent(new Event('invitation:opened'));
  },reduced ? 0 : 3300);
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
// Particle coordinates are mapped to the same image geometry as object-fit on the fixed photo.
function initializeChampagneBubbles(){
  const canvas=$('#champagne-bubbles'),context=canvas.getContext('2d'),photo=$('#champagne-background');
  if(!CONFIG.bubblesEnabled||!context){canvas.hidden=true;return;}
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  const regions=[
    [[.23,.205],[.471,.205],[.48,.29],[.46,.40],[.417,.475],[.361,.495],[.31,.478],[.266,.427],[.232,.35],[.222,.27]],
    [[.561,.204],[.804,.204],[.815,.30],[.796,.39],[.754,.47],[.697,.50],[.636,.48],[.597,.43],[.567,.35],[.553,.27]]
  ];
  let width=0,height=0,scale=1,offsetX=0,offsetY=0,sourceWidth=900,sourceHeight=1600,frame=0,last=0;
  let seed=712026;
  const random=()=>{seed=seed*16807%2147483647;return(seed-1)/2147483646;};
  function boundsAt(region,y){
    const intersections=[];
    for(let i=0;i<region.length;i++){
      const a=region[i],b=region[(i+1)%region.length];
      if((a[1]<=y&&b[1]>y)||(b[1]<=y&&a[1]>y))intersections.push(a[0]+(y-a[1])*(b[0]-a[0])/(b[1]-a[1]));
    }
    return intersections.length>=2 ? [Math.min(...intersections),Math.max(...intersections)] : [.35,.36];
  }
  const particles=regions.map((region,index)=>Array.from({length:52},()=>{
    const y=.212+random()*.265,bounds=boundsAt(region,y);
    return{x:bounds[0]+.006+random()*Math.max(0,bounds[1]-bounds[0]-.012),y,size:.0012+random()*.0024,speed:.018+random()*.026,phase:random()*Math.PI*2,opacity:.4+random()*.5,region:index};
  }));
  function resize(){
    width=innerWidth;height=innerHeight;sourceWidth=photo.naturalWidth||900;sourceHeight=photo.naturalHeight||1600;
    const ratio=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);context.setTransform(ratio,0,0,ratio,0,0);
    const contain=getComputedStyle(photo).objectFit==='contain';scale=(contain ? Math.min : Math.max)(width/sourceWidth,height/sourceHeight);
    offsetX=(width-sourceWidth*scale)/2;offsetY=(height-sourceHeight*scale)/2;draw(0);
  }
  function draw(elapsed){
    context.clearRect(0,0,width,height);
    regions.forEach((region,index)=>{
      context.save();context.beginPath();region.forEach((point,i)=>{const x=offsetX+point[0]*sourceWidth*scale,y=offsetY+point[1]*sourceHeight*scale;i ? context.lineTo(x,y) : context.moveTo(x,y);});context.closePath();context.clip();
      particles[index].forEach(particle=>{
        if(elapsed){
          particle.phase+=elapsed*.9;particle.y-=particle.speed*elapsed;
          if(particle.y<.208){particle.y=.475+random()*.007;const bounds=boundsAt(region,particle.y);particle.x=bounds[0]+(bounds[1]-bounds[0])*random();}
          particle.x+=Math.sin(particle.phase)*.0009*elapsed;
          const bounds=boundsAt(region,particle.y);particle.x=Math.max(bounds[0]+.003,Math.min(bounds[1]-.003,particle.x));
        }
        const x=offsetX+particle.x*sourceWidth*scale,y=offsetY+particle.y*sourceHeight*scale,r=Math.max(.65,particle.size*sourceWidth*scale);
        context.shadowColor='#ffe5a4aa';context.shadowBlur=3;
        context.fillStyle=`rgba(255,242,189,${particle.opacity*.48})`;context.strokeStyle=`rgba(255,246,202,${particle.opacity})`;context.lineWidth=.65;
        context.beginPath();context.arc(x,y,r,0,Math.PI*2);context.fill();context.stroke();
        context.fillStyle=`rgba(255,255,232,${particle.opacity})`;context.fillRect(x-r*.35,y-r*.45,.6,.6);
      });
      context.restore();
    });
  }
  function tick(time){
    frame=0;if(document.hidden||preference.matches||document.body.classList.contains('cover-active'))return;
    if(!last)last=time;if(time-last>=33){draw(Math.min((time-last)/1000,.1));last=time;}frame=requestAnimationFrame(tick);
  }
  function resume(){if(frame)cancelAnimationFrame(frame);frame=0;last=0;draw(0);if(!document.hidden&&!preference.matches&&!document.body.classList.contains('cover-active'))frame=requestAnimationFrame(tick);}
  photo.addEventListener('load',resize);window.addEventListener('resize',resize,{passive:true});document.addEventListener('visibilitychange',resume);document.addEventListener('invitation:opened',()=>{resize();resume();});preference.addEventListener('change',resume);resize();resume();
}
initializeChampagneBubbles();
