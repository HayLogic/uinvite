'use strict';
// 070-ի ցուցադրական տվյալներ. փոխարինեք հաստատված տվյալներով հրապարակումից առաջ։
const CONFIG = Object.freeze({
  invitationNumber: '070',
  companyName: 'AMA ընկերություն',
  eventTitle: 'Ամանորյա կորպորատիվ երեկույթ',
  exampleData: true,
  eventDate: '2026-12-24T19:00:00+04:00', // Օրինակային օր և ժամ՝ Հայաստանի ժամային գոտով։
  venueName: 'Palermo Hall',
  address: 'Հասցեն կճշտվի',
  mapsUrl: '',
  thankMessage: 'Սիրելի՛ գործընկերներ,\n\nՇնորհակալ ենք ձեր աշխատանքի, նվիրվածության և այն ջերմության համար, որով ամեն օր ստեղծում եք մեր ընկերության հաջողությունը։\n\nՄեր ձեռքբերումների հիմքում դուք եք՝ ձեր տաղանդը, ջանքերն ու թիմային ոգին։\n\nԹող այս տոնական երեկոն և գալիք 2027 թվականը լինեն նոր հնարավորությունների ու միասին կերտած գեղեցիկ պահերի սկիզբ։',
  inviteMessage: 'Սիրելի՛ գործընկերներ, հրավիրում ենք ձեզ միասին ամփոփելու տարին, կիսվելու մեր ձեռքբերումներով և տոնական տրամադրությամբ դիմավորելու նոր սկիզբը։ Թող այս երեկոն դառնա ջերմ հանդիպումների ու գեղեցիկ հիշողությունների առիթ։',
  program: [
    {time:'19:00',title:'Հյուրերի դիմավորում',description:'Ջերմ հանդիպումներ և տոնական տրամադրություն'},
    {time:'19:30',title:'Տոնական ընթրիք',description:'Տարվա ձեռքբերումների ամփոփում և կենացներ'},
    {time:'20:30',title:'Խաղեր և անակնկալներ',description:'Ժպիտներ, նվերներ և հաճելի բացահայտումներ'},
    {time:'21:30',title:'Երաժշտություն և պարեր',description:'Երեկոյի ամենավառ ռիթմերը'},
    {time:'23:00',title:'Տոնական ավարտ',description:'Նոր հիշողություններով՝ դեպի նոր տարի'}
  ],
  dressDescription: 'Սպիտակի նրբությունը, ոսկու ջերմությունը և արծաթի փայլը։',
  dressColors: [
    {name:'Սպիտակ',color:'#fdfdfa'},
    {name:'Ոսկեգույն',color:'#d0ad60'},
    {name:'Արծաթագույն',color:'#bec5c9'}
  ],
  rsvpEndpoint: '', // Առանց backend-ի ձևը ցուցադրական է։ Գաղտնի բանալիներ չտեղադրել։
  musicUrl: 'assets/music.mp3',
  snowEnabled: true
});
const $ = selector => document.querySelector(selector);
document.querySelectorAll('[data-company]').forEach(element=>{element.textContent=CONFIG.companyName;});
document.title = `${CONFIG.companyName} · ${CONFIG.eventTitle} · ${CONFIG.invitationNumber}`;
$('#invite-copy').textContent=CONFIG.inviteMessage;
$('#thank-message').textContent=CONFIG.thankMessage;
$('#venue-name').textContent=CONFIG.venueName;
$('#venue-address').textContent=CONFIG.address;
function safeURL(value, relative=false) {
  if (!value) return '';
  try { const url=relative ? new URL(value,location.href) : new URL(value);return ['https:','http:'].includes(url.protocol) ? url.href : ''; } catch { return ''; }
}
const mapsUrl=safeURL(CONFIG.mapsUrl);
if(mapsUrl){$('#maps-link').href=mapsUrl;$('#maps-link').hidden=false;}
const eventDate=new Date(CONFIG.eventDate);
const validDate=Number.isFinite(eventDate.getTime())&&/\+04:00$/.test(CONFIG.eventDate);
const months=['հունվարի','փետրվարի','մարտի','ապրիլի','մայիսի','հունիսի','հուլիսի','օգոստոսի','սեպտեմբերի','հոկտեմբերի','նոյեմբերի','դեկտեմբերի'];
const monthTitles=['Հունվար','Փետրվար','Մարտ','Ապրիլ','Մայիս','Հունիս','Հուլիս','Օգոստոս','Սեպտեմբեր','Հոկտեմբեր','Նոյեմբեր','Դեկտեմբեր'];
const weekdays=['Կիրակի','Երկուշաբթի','Երեքշաբթի','Չորեքշաբթի','Հինգշաբթի','Ուրբաթ','Շաբաթ'];
const parts=validDate ? Object.fromEntries(new Intl.DateTimeFormat('en-GB',{year:'numeric',month:'numeric',day:'numeric',timeZone:'Asia/Yerevan'}).formatToParts(eventDate).map(part=>[part.type,part.value])) : {};
if(validDate){
  const year=Number(parts.year),month=Number(parts.month)-1,day=Number(parts.day);
  const weekday=new Date(Date.UTC(year,month,day)).getUTCDay();
  const time=new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',hourCycle:'h23',timeZone:'Asia/Yerevan'}).format(eventDate);
  $('#event-weekday').textContent=weekdays[weekday];
  $('#event-month').textContent=monthTitles[month];
  $('#event-day').textContent=day;
  $('#event-year').textContent=year;
  $('#event-time').textContent=`Ժամը՝ ${time}`;
  $('#calendar-month').textContent=`${monthTitles[month]} ${year}`;
  $('#calendar-note').textContent=`${day} ${months[month]} ${year} · ${time}`;
  const start=(new Date(Date.UTC(year,month,1)).getUTCDay()+6)%7;
  const days=new Date(Date.UTC(year,month+1,0)).getUTCDate();
  const calendar=document.createDocumentFragment();
  for(let week=0;week<Math.ceil((start+days)/7);week++){
    const row=document.createElement('tr');
    for(let column=0;column<7;column++){
      const cell=document.createElement('td');
      const date=week*7+column-start+1;
      if(date>0&&date<=days){
        const timeElement=document.createElement('time');
        timeElement.dateTime=`${year}-${String(month+1).padStart(2,'0')}-${String(date).padStart(2,'0')}`;
        timeElement.textContent=date;
        if(date===day){cell.className='event-date';timeElement.setAttribute('aria-label',`${date} ${months[month]} ${year}՝ միջոցառման օրը`);}
        cell.append(timeElement);
      }
      row.append(cell);
    }
    calendar.append(row);
  }
  $('#calendar-days').append(calendar);
}else{
  $('#event-month').textContent='Օրը կճշտվի';$('#event-day').textContent='—';$('#calendar-section').hidden=true;
}
function updateCountdown(now=Date.now()){
  const remaining=validDate ? eventDate.getTime()-now : NaN;
  if(!Number.isFinite(remaining)||remaining<=0){
    $('#countdown').hidden=true;$('#countdown-message').hidden=false;
    $('#countdown-message').textContent=validDate ? 'Մեր տոնական երեկոն արդեն մեկնարկել է։' : 'Միջոցառման ամսաթիվը կճշտվի։';
    return;
  }
  $('#countdown').hidden=false;$('#countdown-message').hidden=true;
  const seconds=Math.floor(remaining/1000);
  const values=[Math.floor(seconds/86400),Math.floor(seconds/3600)%24,Math.floor(seconds/60)%60,seconds%60];
  ['days','hours','minutes','seconds'].forEach((id,i)=>{document.getElementById(id).textContent=String(values[i]).padStart(2,'0');});
}
updateCountdown();setInterval(updateCountdown,1000);
const program=document.createDocumentFragment();
CONFIG.program.forEach(item=>{
  const entry=document.createElement('li');
  const time=document.createElement('time');time.textContent=item.time;time.dateTime=item.time;
  const text=document.createElement('div');
  const title=document.createElement('h3');title.textContent=item.title;
  const description=document.createElement('p');description.textContent=item.description;
  text.append(title,description);entry.append(time,text);program.append(entry);
});
$('#program-items').append(program);
$('#dress-description').textContent=CONFIG.dressDescription;
CONFIG.dressColors.forEach(color=>{
  const item=document.createElement('li');
  const swatch=document.createElement('span');swatch.className='swatch';swatch.style.setProperty('--color',color.color);swatch.setAttribute('aria-hidden','true');
  const label=document.createElement('span');label.textContent=color.name;
  item.append(swatch,label);$('#dress-colors').append(item);
});
// Open the outer folds around the page, without pulling a card out of the envelope.
const music = $('#music');
const musicButton = $('#music-toggle');
let musicUnavailable = !CONFIG.musicUrl;
let musicPlaying = false;
if (CONFIG.musicUrl) music.src = CONFIG.musicUrl;
function syncMusic() {
  const playing = musicPlaying && !music.paused && !music.ended && !musicUnavailable;
  musicButton.setAttribute('aria-pressed',String(playing));
  musicButton.setAttribute('aria-label',musicUnavailable ? 'Երաժշտության ֆայլը հասանելի չէ' : playing ? 'Դադարեցնել երաժշտությունը' : 'Միացնել երաժշտությունը');
  musicButton.disabled = musicUnavailable;
}
async function playMusic() {
  if (musicUnavailable) return;
  try { await music.play(); } catch {
    musicPlaying = false;
    $('#audio-status').textContent = musicUnavailable ? 'Երաժշտության ֆայլը հասանելի չէ։' : 'Երաժշտությունը չի միացել։ Կարող եք կրկին փորձել երաժշտության կոճակով։';
  }
  syncMusic();
}
music.addEventListener('playing',()=>{musicPlaying=true;syncMusic();});
['pause','ended','waiting','stalled'].forEach(event=>music.addEventListener(event,()=>{musicPlaying=false;syncMusic();}));
music.addEventListener('error',()=>{
  musicUnavailable=true;musicPlaying=false;syncMusic();
  $('#audio-status').textContent='Երաժշտության ֆայլը հասանելի չէ։';
});
musicButton.addEventListener('click',()=>{if(music.paused) void playMusic(); else {music.pause();syncMusic();}});
syncMusic();

let opened=false;
$('#open-envelope').addEventListener('click',()=>{
  if(opened)return;
  void playMusic();
  opened=true;$('#open-envelope').disabled=true;$('#open-envelope').setAttribute('aria-expanded','true');
  const cover=$('#envelope-cover'),invitation=$('#invitation');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  invitation.hidden=false;invitation.inert=true;invitation.setAttribute('aria-hidden','true');
  window.scrollTo({top:0,behavior:'instant'});
  cover.classList.add('opening');
  setTimeout(()=>cover.classList.add('leaving'),reduced ? 0 : 2800);
  setTimeout(()=>{
    cover.hidden=true;invitation.inert=false;invitation.removeAttribute('aria-hidden');document.body.classList.remove('cover-active');
    $('#hero-title').tabIndex=-1;$('#hero-title').focus({preventScroll:true});
    document.dispatchEvent(new Event('invitation:opened'));
  },reduced ? 0 : 4100);
});
const form=$('#rsvp-form');
const isPreview=!CONFIG.rsvpEndpoint;
let submitting=false;
// API integration: JSON POST with fullName, attendance (yes/no) and comment.
async function sendRSVP(payload){
  const endpoint=safeURL(CONFIG.rsvpEndpoint,true);
  if(!endpoint)throw new Error('Invalid endpoint');
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),15000);
  try{
    const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:controller.signal});
    if(!response.ok)throw new Error('Request failed');
  }finally{clearTimeout(timeout);}
}
form.addEventListener('submit',async event=>{
  event.preventDefault();if(submitting)return;
  const name=$('#full-name');
  name.setCustomValidity(name.value.trim().split(/\s+/).length<2 ? 'Խնդրում ենք նշել անունը և ազգանունը։' : '');
  if(!form.reportValidity())return;
  const status=$('#form-status');status.classList.remove('error');
  if(isPreview){status.textContent='Դաշտերը ճիշտ են լրացված։ Սա ցուցադրական ձև է․ պատասխանը չի ուղարկվել և չի պահպանվել։';status.focus();return;}
  const payload={fullName:name.value.trim(),attendance:form.elements.attendance.value,comment:$('#comment').value.trim()};
  submitting=true;$('#submit-rsvp').disabled=true;form.setAttribute('aria-busy','true');status.textContent='Ուղարկվում է…';
  try{await sendRSVP(payload);status.textContent='Շնորհակալություն։ Ձեր պատասխանն ընդունված է։';form.reset();}
  catch{status.classList.add('error');status.textContent='Չհաջողվեց հաստատել պատասխանի ընդունումը։ Փորձեք ավելի ուշ կամ կապվեք կազմակերպչի հետ։';}
  finally{submitting=false;$('#submit-rsvp').disabled=false;form.removeAttribute('aria-busy');status.focus();}
});
$('#full-name').addEventListener('input',event=>event.target.setCustomValidity(''));
function initializeSnow(){
  const canvas=$('#snowfall'),context=canvas.getContext('2d');
  if(!CONFIG.snowEnabled||!context){canvas.hidden=true;return;}
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  let flakes=[],width=0,height=0,frame=0,last=0;
  let seed=702026;
  const random=()=>{seed=seed*16807%2147483647;return(seed-1)/2147483646;};
  function resize(){
    width=innerWidth;height=innerHeight;const ratio=Math.min(devicePixelRatio||1,1.5);
    canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);context.setTransform(ratio,0,0,ratio,0,0);
    const count=Math.min(45,Math.max(20,Math.round(width*height/30000)));
    flakes=Array.from({length:count},(_,i)=>({x:random()*width,y:random()*height,size:6+random()*7,speed:7+random()*10,phase:random()*Math.PI*2,rotation:random()*Math.PI/3,opacity:.45+random()*.4,gold:i%2===0}));draw(0);
  }
  function draw(elapsed){
    context.clearRect(0,0,width,height);
    context.lineCap='round';context.lineJoin='round';
    flakes.forEach(flake=>{
      if(elapsed){
        flake.y+=flake.speed*elapsed;flake.phase+=elapsed*.25;flake.rotation+=elapsed*.025;
        flake.x+=Math.sin(flake.phase)*3*elapsed;
        if(flake.y>height+18){flake.y=-18;flake.x=random()*width;}
        if(flake.x>width+18)flake.x=-18;
        if(flake.x< -18)flake.x=width+18;
      }
      // Six fine crystalline arms, like the supplied snowflake reference.
      context.beginPath();
      for(let arm=0;arm<6;arm++){
        const angle=flake.rotation+arm*Math.PI/3-Math.PI/2;
        const dx=Math.cos(angle),dy=Math.sin(angle),radius=flake.size;
        context.moveTo(flake.x,flake.y);context.lineTo(flake.x+dx*radius,flake.y+dy*radius);
        for(const fraction of [.46,.74]){
          for(const side of [-1,1]){
            const jointX=flake.x+dx*radius*fraction,jointY=flake.y+dy*radius*fraction;
            const branch=angle+side*Math.PI/3;
            context.moveTo(jointX,jointY);
            context.lineTo(jointX-Math.cos(branch)*radius*.24,jointY-Math.sin(branch)*radius*.24);
          }
        }
      }
      if(flake.gold){
        context.shadowBlur=0;context.strokeStyle=`rgba(184,151,80,${flake.opacity})`;context.lineWidth=.75;context.stroke();
      }else{
        context.shadowColor='#a5ae9444';context.shadowBlur=1.5;
        context.strokeStyle=`rgba(151,164,132,${flake.opacity*.2})`;context.lineWidth=1.8;context.stroke();
        context.strokeStyle=`rgba(255,255,253,${flake.opacity})`;context.lineWidth=1.05;context.stroke();
      }
    });
  }
  function tick(time){
    frame=0;if(document.hidden||preference.matches||document.body.classList.contains('cover-active'))return;
    if(!last)last=time;if(time-last>=33){draw(Math.min((time-last)/1000,.1));last=time;}frame=requestAnimationFrame(tick);
  }
  function resume(){if(frame)cancelAnimationFrame(frame);frame=0;last=0;draw(0);if(!document.hidden&&!preference.matches&&!document.body.classList.contains('cover-active'))frame=requestAnimationFrame(tick);}
  window.addEventListener('resize',resize,{passive:true});document.addEventListener('visibilitychange',resume);document.addEventListener('invitation:opened',resume);preference.addEventListener('change',resume);resize();resume();
}
initializeSnow();


// A winding botanical gold ribbon is drawn/retracted by the scroll position.
function initializeProgramRibbon(){
  const container=$('#program-flow'),svg=$('#program-art'),path=$('#program-curve');
  const rows=CONFIG.program.length;
  if(!rows){container.hidden=true;return;}
  const viewHeight=rows*200;
  svg.setAttribute('viewBox',`0 0 600 ${viewHeight}`);
  let curve='M300 0';
  for(let i=0;i<rows;i++){
    const y=i*200,x=i%2===0 ? 80 : 520;
    curve+=` C300 ${y+35} ${x} ${y+55} ${x} ${y+100} C${x} ${y+155} 300 ${y+165} 300 ${y+200}`;
  }
  path.setAttribute('d',curve);
  const length=path.getTotalLength();
  const strokes=container.querySelectorAll('.program-line');
  strokes.forEach(stroke=>{stroke.style.strokeDasharray=length;});
  const namespace='http://www.w3.org/2000/svg',decorations=[];
  const count=Math.ceil(length/80);
  for(let i=0;i<count;i++){
    const fraction=(i+.5)/count;
    const point=path.getPointAtLength(length*fraction);
    const next=path.getPointAtLength(Math.min(length,length*fraction+2));
    const angle=Math.atan2(next.y-point.y,next.x-point.x)*180/Math.PI-90;
    const group=document.createElementNS(namespace,'g');
    group.setAttribute('transform',`translate(${point.x} ${point.y}) rotate(${angle})`);
    const image=document.createElementNS(namespace,'image');
    image.setAttribute('href','assets/gold-botanical-sprig.png');
    image.setAttribute('x','-29');image.setAttribute('y','-46');image.setAttribute('width','58');image.setAttribute('height','92');
    group.append(image);$('#program-botanical').append(group);decorations.push({element:group,fraction});
  }
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  let pending=0;
  function update(){
    pending=0;if($('#invitation').hidden)return;
    const rect=container.getBoundingClientRect();
    const progress=preference.matches ? 1 : Math.max(0,Math.min(1,(innerHeight*.7-rect.top)/rect.height));
    strokes.forEach(stroke=>{stroke.style.strokeDashoffset=length*(1-progress);});
    decorations.forEach(item=>{item.element.setAttribute('opacity',String(Math.max(0,Math.min(1,(progress-item.fraction)*45))));});
    const point=path.getPointAtLength(length*progress);
    $('#program-tip').setAttribute('transform',`translate(${point.x} ${point.y})`);
    $('#program-tip').style.opacity=progress>0&&progress<1 ? '1' : '0';
    container.dataset.progress=progress.toFixed(4);
  }
  function schedule(){if(!pending)pending=requestAnimationFrame(update);}
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});
  document.addEventListener('invitation:opened',schedule);preference.addEventListener('change',schedule);schedule();
}
initializeProgramRibbon();
