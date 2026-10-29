// Local invitation music. Starts only inside a trusted visitor interaction.
(()=>{
 'use strict';
 const audio=document.getElementById('invitation-music');
 const button=document.getElementById('invitation-music-toggle');
 const status=document.getElementById('invitation-audio-status');
 const source=CONFIG.musicUrl;
 let unavailable=!source,playing=false;
 if(source)audio.src=source;
 audio.volume=.45;
 function sync(){
  const active=playing&&!audio.paused&&!audio.ended&&!unavailable;
  button.setAttribute('aria-pressed',String(active));
  button.setAttribute('aria-label',unavailable?'Երաժշտության ֆայլը հասանելի չէ':active?'Դադարեցնել երաժշտությունը':'Միացնել երաժշտությունը');
  button.disabled=unavailable;
 }
 async function play(){
  if(unavailable)return;
  status.textContent='';
  try{await audio.play();}catch{playing=false;status.textContent=unavailable?'Երաժշտության ֆայլը հասանելի չէ։':'Երաժշտությունը չի միացել։ Կարող եք կրկին փորձել երաժշտության կոճակով։';}
  sync();
 }
 audio.addEventListener('playing',()=>{playing=true;sync();});
 ['pause','ended','waiting','stalled'].forEach(name=>audio.addEventListener(name,()=>{playing=false;sync();}));
 audio.addEventListener('error',()=>{unavailable=true;playing=false;status.textContent='Երաժշտության ֆայլը հասանելի չէ։';sync();});
 button.addEventListener('click',()=>{if(audio.paused)void play();else{audio.pause();sync();}});
 // Native button/anchor keyboard activation also produces a trusted click.
 document.addEventListener('click',event=>{if(!button.contains(event.target))void play();},{once:true});
 sync();
})();
