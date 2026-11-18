/* A short, skippable opening built from the actual homepage title and folder. */
(()=>{
 const intro=document.querySelector('#site-intro');
 if(!intro||matchMedia('(prefers-reduced-motion: reduce)').matches||location.hash||!Element.prototype.animate)return;
 const hero=document.querySelector('.hero-art'),title=document.querySelector('.pdf-title');
 if(!hero||!title)return;
 const folder=hero.cloneNode(true);folder.removeAttribute('href');folder.removeAttribute('aria-label');folder.className='intro-hero-folder';
 folder.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));
 const cover=title.cloneNode(true);cover.setAttribute('class','intro-title-svg');cover.querySelectorAll('[class]').forEach(el=>el.removeAttribute('class'));
 intro.querySelector('.intro-cover-title').append(cover);intro.querySelector('.intro-folder-anchor').append(folder);
 const header=document.querySelector('header'),main=document.querySelector('main'),skip=document.querySelector('#intro-skip'),sheets=[...intro.querySelectorAll('.intro-sheet')],animations=[];
 const originalInert=[header.inert,main.inert],previousFocus=document.activeElement;let ended=false,timeout;
 function finish(){if(ended)return;ended=true;clearTimeout(timeout);animations.forEach(a=>a.cancel());intro.hidden=true;header.inert=originalInert[0];main.inert=originalInert[1];document.documentElement.classList.remove('intro-playing');window.removeEventListener('resize',finish);document.removeEventListener('keydown',onKey);if(document.activeElement===skip&&previousFocus&&previousFocus!==document.body)previousFocus.focus({preventScroll:true});intro.remove();}
 function onKey(e){if(e.key==='Escape'){e.preventDefault();finish()}else if(e.key==='Tab'){e.preventDefault();skip.focus({preventScroll:true})}}
 function motion(el,frames,options){const a=el.animate(frames,{fill:'forwards',...options});animations.push(a);return a.finished.catch(()=>{});}
 async function pause(ms){await new Promise(resolve=>setTimeout(resolve,ms));}
 intro.hidden=false;document.documentElement.classList.add('intro-playing');header.inert=true;main.inert=true;skip.addEventListener('click',finish);document.addEventListener('keydown',onKey);window.addEventListener('resize',finish,{once:true});skip.focus({preventScroll:true});timeout=setTimeout(finish,6000);
 async function play(){
  const narrow=innerWidth<620,spread=Math.min(innerWidth*.29,310),lift=narrow?138:192;
  motion(intro.querySelector('.intro-cover-title'),[{opacity:0,transform:'translateY(18px) rotate(-4deg)'},{opacity:1,transform:'translateY(0) rotate(0)'}],{duration:600,easing:'cubic-bezier(.2,.8,.2,1)'});
  motion(intro.querySelector('.intro-progress i'),[{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:3250,easing:'linear'});
  await motion(folder,[{transform:'translate(-50%,-50%) translateY(75vh) rotate(-28deg) scale(.45)'},{transform:'translate(-50%,-50%) translateY(-12px) rotate(4deg) scale(1.04)',offset:.8},{transform:'translate(-50%,-50%) rotate(0) scale(1)'}],{duration:700,easing:'cubic-bezier(.18,.7,.25,1)'});if(ended)return;
  const front=folder.querySelector('.big-folder');motion(front,[{transform:'rotate(-9deg)'},{transform:'rotate(-9deg) skewX(-6deg) scaleY(.88)'}],{duration:250,easing:'ease-out'});
  await Promise.all(sheets.map((sheet,i)=>motion(sheet,[{opacity:0,transform:'translate(-50%,-50%) translate(0,70px) rotate(-8deg) scale(.55)'},{opacity:1,offset:.25},{opacity:1,transform:`translate(-50%,-50%) translate(${(i-1)*spread}px,${-lift-(i===1?70:0)}px) rotate(${(i-1)*13}deg) scale(1)`}],{duration:650,delay:i*85,easing:'cubic-bezier(.18,.75,.25,1)'})));if(ended)return;
  await pause(450);if(ended)return;
  document.querySelector('#intro-status').textContent='好想法，正在归位。';
  await Promise.all(sheets.map((sheet,i)=>motion(sheet,[{opacity:1,transform:`translate(-50%,-50%) translate(${(i-1)*spread}px,${-lift-(i===1?70:0)}px) rotate(${(i-1)*13}deg) scale(1)`},{opacity:0,transform:'translate(-50%,-50%) translate(0,70px) rotate(-8deg) scale(.55)'}],{duration:440,delay:(2-i)*60,easing:'cubic-bezier(.55,0,.8,.4)'})));if(ended)return;
  motion(front,[{transform:'rotate(-9deg) skewX(-6deg) scaleY(.88)'},{transform:'rotate(-9deg)'}],{duration:240,easing:'ease-out'});
  const from=folder.getBoundingClientRect(),to=hero.getBoundingClientRect();const dx=to.left+to.width/2-(from.left+from.width/2),dy=to.top+to.height/2-(from.top+from.height/2),scale=to.width/from.width;
  motion(intro.querySelector('.intro-cover-title'),[{opacity:1},{opacity:0,transform:'translateY(-12px)'}],{duration:480,easing:'ease-in'});
  motion(intro.querySelector('.intro-topline'),[{opacity:1},{opacity:0}],{duration:420});motion(intro.querySelector('.intro-bottomline'),[{opacity:1},{opacity:0}],{duration:420});
  await Promise.all([motion(folder,[{transform:'translate(-50%,-50%)'},{transform:`translate(-50%,-50%) translate(${dx}px,${dy}px) scale(${scale})`}],{duration:620,easing:'cubic-bezier(.55,0,.2,1)'}),motion(intro,[{backgroundColor:'#00a4ff'},{backgroundColor:'rgba(0,164,255,0)'}],{duration:620,easing:'ease-in'})]);if(ended)return;
  await motion(intro,[{opacity:1},{opacity:0}],{duration:150});finish();
 }
 play().catch(finish);
})();
