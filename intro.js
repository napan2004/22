/* Storyboard opening: one fixed-ratio vector scene, diagonal arrival, arcing tabs, gather, blue flash. */
(()=>{
 const intro=document.querySelector('#site-intro');
 if(!intro||matchMedia('(prefers-reduced-motion: reduce)').matches||location.hash||!Element.prototype.animate)return;
 const source=document.querySelector('.pdf-title');if(!source)return;
 intro.classList.add('intro-prototype-mode');
 const scene=intro.querySelector('.intro-scene');scene.replaceChildren();
 scene.innerHTML=`<svg class="intro-prototype" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 1040" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><g id="intro-proto-rig"><g class="proto-mini" data-mini="0"><path d="M8 35V17Q8 0 25 0H91Q102 0 113 15L127 35Z" fill="#d1aa5d"/><rect x="0" y="15" width="240" height="165" rx="18" fill="#ffe69c"/><text x="120" y="73" text-anchor="middle" class="proto-file-number">01 / CREATIVE</text><text x="120" y="115" text-anchor="middle" class="proto-file-title">创意活动项目</text></g><g class="proto-mini" data-mini="1"><path d="M8 35V17Q8 0 25 0H91Q102 0 113 15L127 35Z" fill="#d1aa5d"/><rect x="0" y="15" width="205" height="145" rx="17" fill="#ffe69c"/><text x="102" y="65" text-anchor="middle" class="proto-file-number">02 / DESIGN</text><text x="102" y="105" text-anchor="middle" class="proto-file-title">设计类项目</text></g><g class="proto-mini" data-mini="2"><path d="M8 35V17Q8 0 25 0H91Q102 0 113 15L127 35Z" fill="#d1aa5d"/><rect x="0" y="15" width="255" height="180" rx="19" fill="#ffe69c"/><text x="127" y="76" text-anchor="middle" class="proto-file-number">03 / PLANNING</text><text x="127" y="120" text-anchor="middle" class="proto-file-title">线下活动策划</text></g><g transform="translate(330 440) rotate(-42 300 200)"><g class="proto-main-back"><path d="M-18 40V0Q-18-20 5-20H155Q176-20 194 6L215 30H555Q579 30 579 54V348Q579 380 546 380H5Q-28 380-28 347V75Q-28 47-18 40Z" fill="#dab55f"/></g><g class="proto-main-front"><rect x="0" y="20" width="600" height="400" rx="46" fill="#ffdc76"/><path d="M25 51H570" stroke="#ffe9aa" stroke-width="5" stroke-linecap="round" opacity=".6"/><g class="proto-title-slot"></g></g></g></g></svg>`;
 const svg=scene.querySelector('svg'),rig=scene.querySelector('#intro-proto-rig'),minis=[...scene.querySelectorAll('.proto-mini')];
 const title=source.cloneNode(true);title.setAttribute('class','proto-original-title');title.setAttribute('x','105');title.setAttribute('y','90');title.setAttribute('width','390');title.setAttribute('height','255');title.setAttribute('preserveAspectRatio','xMidYMid meet');
 const glyphs=[...title.querySelectorAll('.letter-shell')];title.querySelectorAll('[class]').forEach(e=>e.removeAttribute('class'));glyphs.forEach(g=>{g.classList.add('proto-title-letter');g.style.opacity='0'});title.querySelectorAll('path').forEach(p=>p.setAttribute('fill','#173b55'));scene.querySelector('.proto-title-slot').append(title);
 const flash=document.createElement('div');flash.className='intro-blue-flash';intro.append(flash);
 const header=document.querySelector('header'),main=document.querySelector('main'),skip=intro.querySelector('#intro-skip'),status=intro.querySelector('#intro-status'),animations=[];
 const wasInert=[header.inert,main.inert],previousFocus=document.activeElement;let ended=false,safety;
 function finish(){if(ended)return;ended=true;clearTimeout(safety);animations.forEach(a=>a.cancel());header.inert=wasInert[0];main.inert=wasInert[1];document.documentElement.classList.remove('intro-playing');window.removeEventListener('resize',finish);document.removeEventListener('keydown',onKey);if(document.activeElement===skip&&previousFocus&&previousFocus!==document.body)previousFocus.focus({preventScroll:true});intro.remove();}
 function onKey(e){if(e.key==='Escape'){e.preventDefault();finish()}else if(e.key==='Tab'){e.preventDefault();skip.focus({preventScroll:true})}}
 function motion(el,frames,opts){const a=el.animate(frames,{fill:'forwards',...opts});animations.push(a);return a.finished.catch(()=>{});}
 const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 intro.hidden=false;header.inert=true;main.inert=true;document.documentElement.classList.add('intro-playing');skip.addEventListener('click',finish);document.addEventListener('keydown',onKey);window.addEventListener('resize',finish,{once:true});skip.focus({preventScroll:true});safety=setTimeout(finish,7000);
 const starts=['translate(475px,550px) rotate(-42deg) scale(.25)','translate(485px,520px) rotate(-38deg) scale(.25)','translate(515px,515px) rotate(-35deg) scale(.25)'];
 const arcs=['translate(270px,410px) rotate(-32deg) scale(.8)','translate(280px,310px) rotate(-10deg) scale(.8)','translate(495px,270px) rotate(3deg) scale(.8)'];
 const ends=['translate(145px,465px) rotate(-20deg) scale(1)','translate(205px,265px) rotate(9deg) scale(1)','translate(475px,155px) rotate(14deg) scale(1)'];
 async function play(){
  motion(intro.querySelector('.intro-progress i'),[{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:3700,easing:'linear'});
  await motion(rig,[{opacity:0,transform:'translate(900px,-900px) scale(.12)'},{opacity:1,offset:.2},{opacity:1,transform:'translate(-18px,18px) scale(1.025)',offset:.88},{opacity:1,transform:'translate(0,0) scale(1)'}],{duration:950,easing:'cubic-bezier(.2,.7,.22,1)'});if(ended)return;
  status.textContent='三个文件夹，打开不同面的我。';
  const beats=[[0,1],[2,3,4],[5,6,7]],reveal=[];
  minis.forEach((mini,i)=>{reveal.push(motion(mini,[{opacity:0,transform:starts[i]},{opacity:1,transform:arcs[i],offset:.55},{opacity:1,transform:ends[i]}],{duration:640,delay:i*190,easing:'cubic-bezier(.15,.7,.25,1)'}));
   beats[i].forEach((n,j)=>reveal.push(motion(glyphs[n],[{opacity:0,transform:'translateY(90px) scale(.85)'},{opacity:1,transform:'translateY(-7px) scale(1.02)',offset:.8},{opacity:1,transform:'translateY(0) scale(1)'}],{duration:400,delay:i*190+j*60,easing:'cubic-bezier(.2,.7,.25,1)'})));
  });await Promise.all(reveal);if(ended)return;
  status.textContent='好想法，就位。';await pause(850);if(ended)return;
  await Promise.all(minis.map((mini,i)=>motion(mini,[{opacity:1,transform:ends[i]},{opacity:1,transform:arcs[i],offset:.45},{opacity:0,transform:starts[i]}],{duration:450,delay:(2-i)*55,easing:'cubic-bezier(.5,0,.75,.4)'})));if(ended)return;
  await motion(rig,[{opacity:1,transform:'translate(0,0) scale(1)'},{opacity:1,transform:'translate(0,0) scale(.1)',offset:.85},{opacity:0,transform:'translate(0,0) scale(.06)'}],{duration:430,easing:'cubic-bezier(.55,0,.8,.4)'});if(ended)return;
  await motion(flash,[{opacity:0},{opacity:1}],{duration:90});if(ended)return;
  await motion(intro,[{opacity:1},{opacity:0}],{duration:200});finish();
 }
 play().catch(finish);
})();
