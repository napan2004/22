/* Slide in, enlarge the cover folder, reveal its tabs and title in three beats, then return home. */
(()=>{
 const intro=document.querySelector('#site-intro');
 if(!intro||matchMedia('(prefers-reduced-motion: reduce)').matches||location.hash||!Element.prototype.animate)return;
 const hero=document.querySelector('.hero-art'),title=document.querySelector('.pdf-title');if(!hero||!title)return;
 intro.classList.add('intro-sequence-large');
 const rig=document.createElement('div');rig.className='intro-large-rig';intro.querySelector('.intro-scene').append(rig);
 const folder=hero.cloneNode(true);folder.removeAttribute('href');folder.removeAttribute('aria-label');folder.className='intro-hero-folder';folder.querySelectorAll('[id]').forEach(e=>e.removeAttribute('id'));rig.append(folder);
 const sheets=[...intro.querySelectorAll('.intro-sheet')];sheets.forEach(s=>rig.append(s));
 const cover=title.cloneNode(true);cover.setAttribute('class','intro-title-svg');const glyphs=[...cover.querySelectorAll('.letter-shell')];
 cover.querySelectorAll('[class]').forEach(e=>e.removeAttribute('class'));glyphs.forEach(g=>g.classList.add('intro-title-glyph'));
 const decoration=[...cover.children].filter(g=>!glyphs.includes(g));decoration.forEach(g=>g.style.opacity='0');glyphs.forEach(g=>g.style.opacity='0');
 intro.querySelector('.intro-cover-title').append(cover);
 const header=document.querySelector('header'),main=document.querySelector('main'),skip=document.querySelector('#intro-skip'),animations=[];
 const originalInert=[header.inert,main.inert],previousFocus=document.activeElement;let ended=false,timeout;
 function finish(){if(ended)return;ended=true;clearTimeout(timeout);animations.forEach(a=>a.cancel());intro.hidden=true;header.inert=originalInert[0];main.inert=originalInert[1];document.documentElement.classList.remove('intro-playing');window.removeEventListener('resize',finish);document.removeEventListener('keydown',onKey);if(document.activeElement===skip&&previousFocus&&previousFocus!==document.body)previousFocus.focus({preventScroll:true});intro.remove();}
 function onKey(e){if(e.key==='Escape'){e.preventDefault();finish()}else if(e.key==='Tab'){e.preventDefault();skip.focus({preventScroll:true})}}
 function motion(el,frames,options){const a=el.animate(frames,{fill:'forwards',...options});animations.push(a);return a.finished.catch(()=>{});}
 const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 intro.hidden=false;document.documentElement.classList.add('intro-playing');header.inert=true;main.inert=true;skip.addEventListener('click',finish);document.addEventListener('keydown',onKey);window.addEventListener('resize',finish,{once:true});skip.focus({preventScroll:true});timeout=setTimeout(finish,7000);
 async function play(){
  const base='translate(-50%,-50%)';
  motion(intro.querySelector('.intro-progress i'),[{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:4050,easing:'linear'});
  await motion(rig,[{transform:base+' translateX(-110vw) rotate(-9deg) scale(.35)'},{transform:base+' rotate(0) scale(.35)'}],{duration:560,easing:'cubic-bezier(.2,.75,.25,1)'});if(ended)return;
  document.querySelector('#intro-status').textContent='打开文件夹，让好想法登场。';
  await motion(rig,[{transform:base+' scale(.35)'},{transform:base+' scale(1.035)',offset:.82},{transform:base+' scale(1)'}],{duration:650,easing:'cubic-bezier(.2,.7,.2,1)'});if(ended)return;
  const front=folder.querySelector('.big-folder');motion(front,[{transform:'rotate(-3deg)'},{transform:'rotate(-3deg) skewX(-2deg) scaleY(.96)'}],{duration:200});
  const lift=rig.offsetHeight*.40,beats=[[0,1],[2,3,4],[5,6,7]],reveal=[];
  sheets.forEach((sheet,i)=>{reveal.push(motion(sheet,[{opacity:0,transform:'translate(-50%,-50%) translateY(18px)'},{opacity:1,offset:.2},{opacity:1,transform:`translate(-50%,-50%) translateY(${-lift}px)`}],{duration:470,delay:i*190,easing:'cubic-bezier(.2,.75,.2,1)'}));
   beats[i].forEach((n,j)=>reveal.push(motion(glyphs[n],[{opacity:0,transform:'translateY(330px)'},{opacity:1,offset:.28},{opacity:1,transform:'translateY(-10px)',offset:.82},{opacity:1,transform:'translateY(0)'}],{duration:540,delay:i*190+j*65,easing:'cubic-bezier(.2,.75,.25,1)'})));
  });
  decoration.forEach(g=>motion(g,[{opacity:0},{opacity:1}],{duration:350,delay:750}));await Promise.all(reveal);if(ended)return;
  await pause(650);if(ended)return;document.querySelector('#intro-status').textContent='好想法，就位。';
  await Promise.all(sheets.map((sheet,i)=>motion(sheet,[{opacity:1,transform:`translate(-50%,-50%) translateY(${-lift}px)`},{opacity:0,transform:'translate(-50%,-50%) translateY(18px)'}],{duration:400,delay:i*70,easing:'cubic-bezier(.55,0,.8,.4)'})));if(ended)return;
  motion(front,[{transform:'rotate(-3deg) skewX(-2deg) scaleY(.96)'},{transform:'rotate(-3deg)'}],{duration:220});
  const from=rig.getBoundingClientRect(),target=hero.getBoundingClientRect();const dx=target.left+target.width/2-from.left-from.width/2,dy=target.top+target.height/2-from.top-from.height/2,scale=target.width/from.width;
  const titleBox=intro.querySelector('.intro-cover-title'),fromTitle=titleBox.getBoundingClientRect(),targetTitle=title.getBoundingClientRect();
  motion(titleBox,[{transform:'translateX(-50%)'},{transform:`translateX(-50%) translate(${targetTitle.left+targetTitle.width/2-fromTitle.left-fromTitle.width/2}px,${targetTitle.top+targetTitle.height/2-fromTitle.top-fromTitle.height/2}px) scale(${targetTitle.width/fromTitle.width})`}],{duration:650,easing:'cubic-bezier(.55,0,.2,1)'});
  motion(intro.querySelector('.intro-topline'),[{opacity:1},{opacity:0}],{duration:500});motion(intro.querySelector('.intro-bottomline'),[{opacity:1},{opacity:0}],{duration:500});
  await Promise.all([motion(rig,[{transform:base},{transform:`${base} translate(${dx}px,${dy}px) scale(${scale})`}],{duration:650,easing:'cubic-bezier(.55,0,.2,1)'}),motion(intro,[{backgroundColor:'#00a4ff'},{backgroundColor:'rgba(0,164,255,0)'}],{duration:650,easing:'ease-in'})]);if(ended)return;
  await motion(intro,[{opacity:1},{opacity:0}],{duration:160});finish();
 }
 play().catch(finish);
})();
