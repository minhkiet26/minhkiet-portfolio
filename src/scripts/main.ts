import { gsap } from 'gsap';
import { setupScrollRebuild } from './scroll-rebuild';

type Language = 'vi' | 'en';
const english: Record<string, string> = {
 skip:'Skip to content',welcome:'Glad you stopped by!',hello:'HELLO THERE, I’M',intro:'A third-year student<br/>in Software Engineering.',introNote:'A little space for the things I learn,<br/>the projects I build, and the journey along the way.',explore:'Explore my projects',replay:'Watch the cursors build again',photoNote:'A little me, away from the code.',sticker:'Stay curious.<br/>Keep learning.',scroll:'There’s more to discover',projectsLabel:'02 / THINGS I’VE BUILT',projectsTitle:'From an idea<br/>to <em>something real.</em>',projectsNote:'Learning by getting my hands into it.<br/>Two course projects. Plenty of discoveries.',coursework:'COURSE PROJECT',vnzDesc:'A corporate website backend for managing content, products, recruitment, and connections with visitors.',sealDesc:'A hackathon management system: from teams and submissions to scoring, leaderboards, and notifications.',team3:'Team of 3',team4:'Team of 4',details:'Explore project',honesty:'Both are learning projects without real users yet. The visuals above are project illustrations.',aboutLabel:'03 / A LITTLE ABOUT ME',aboutTitle:'Learn a little.<br/><em>Build step by step.</em>',aboutText:'I’m Kiệt, a third-year Software Engineering student. C# is my main language. I enjoy understanding how a request moves through an API, business logic, and a database.',aboutText2:'Team projects have given me the opportunity to build backends, apply Clean Architecture, and deploy applications. This space brings together what I’ve built and what I’m continuing to learn.',githubVisit:'Visit my GitHub',toolbox:'Inside my toolbox',mainLanguage:'MY MAIN LANGUAGE',backend:'Building backends & APIs',used:'WORKED WITH',also:'ALSO EXPLORED',testing:'Unit testing: learned the basics, still building practical experience.',contactLabel:'04 / LET’S STAY IN TOUCH',contactTitle:'A simple hello.<br/>A <em>new connection.</em>',made:'A little space, made with Astro & GSAP.',backTop:'Back to top ↑',navHome:'Home',navProjects:'Projects',navAbout:'About',navSkills:'Toolbox',navContact:'Contact',skipAnimation:'Skip animation →',projectStory:'PROJECT NOTES / BEHIND THE BUILD'
};
const vietnamese: Record<string,string> = {};
document.querySelectorAll<HTMLElement>('[data-i18n]').forEach(el => { vietnamese[el.dataset.i18n!] = el.innerHTML; });
let language: Language = 'vi';
let activeProject: 'vnz'|'seal'|null = null;
const dialog = document.querySelector<HTMLDialogElement>('#project-dialog')!;
const content = document.querySelector<HTMLElement>('#dialog-content')!;
const descriptions = {
 vi: {
  vnz: `<h2>VNZ-DNA</h2><p class="dialog-meta">DỰ ÁN MÔN HỌC · NHÓM 3 NGƯỜI · 09–10/2026</p><p>Backend cho website giới thiệu doanh nghiệp, chia thành API → Service → Repository/AppDbContext. Sử dụng ASP.NET Core, EF Core và PostgreSQL.</p><h4>Những phần mình đã đóng góp</h4><ul><li>API giới hạn tần suất truy cập (rate limiting) và chuẩn hóa phản hồi HTTP 429.</li><li>Upload media qua Cloudinary; xử lý nội dung public và slug.</li><li>Luồng email mời phỏng vấn và các chức năng liên quan hồ sơ ứng tuyển.</li><li>Triển khai lên Render; workflow GitHub Actions build/push Docker image và kích hoạt deploy.</li></ul><p class="notice">Đây là dự án nhóm môn học, chưa có người sử dụng thực tế. Link admin cần đăng nhập; thông tin đăng nhập không được công khai tại đây.</p><div class="dialog-links"><a class="button primary" href="https://github.com/VNZ-DNA/BE-VNZ-DNA" target="_blank" rel="noopener noreferrer">Xem mã nguồn ↗</a><a class="button" href="https://vnz-admin-fe.vercel.app/login" target="_blank" rel="noopener noreferrer">Mở trang admin ↗</a></div>`,
  seal: `<h2>SEAL Hackathon</h2><p class="dialog-meta">DỰ ÁN MÔN HỌC · NHÓM 4 NGƯỜI · 06–08/2026</p><p>Hệ thống Backend quản lý cuộc thi hackathon với .NET 8, EF Core và PostgreSQL. Áp dụng Clean Architecture qua các lớp Domain, Application, Infrastructure và Presentation.</p><h4>Những phần mình đã đóng góp</h4><ul><li>Luồng nộp bài của sinh viên.</li><li>Các chức năng bảng xếp hạng.</li><li>Thông báo cho sinh viên: xem chi tiết, đếm chưa đọc và đánh dấu đã đọc.</li><li>Đóng góp vào báo cáo và xử lý vòng thi.</li></ul><p class="notice">Dự án học tập theo nhóm, chưa có người sử dụng thực tế. Các phần đóng góp được tổng hợp từ lịch sử commit; đây không phải toàn bộ chức năng của hệ thống.</p><div class="dialog-links"><a class="button primary" href="https://github.com/Seal-Manager-Hackathon/hkathon" target="_blank" rel="noopener noreferrer">Xem mã nguồn ↗</a></div>`
 },
 en: {
  vnz: `<h2>VNZ-DNA</h2><p class="dialog-meta">COURSE PROJECT · TEAM OF 3 · SEP–OCT 2026</p><p>A corporate website backend, organized into API → Service → Repository/AppDbContext. Built with ASP.NET Core, EF Core, and PostgreSQL.</p><h4>My contributions</h4><ul><li>API rate limiting and consistent HTTP 429 responses.</li><li>Cloudinary media uploads, public content endpoints, and slug handling.</li><li>Interview invitation emails and related application workflows.</li><li>Deployment to Render, with GitHub Actions building/pushing Docker images and triggering deployment.</li></ul><p class="notice">A team course project without real users yet. The admin site requires sign-in; credentials are not shared here.</p><div class="dialog-links"><a class="button primary" href="https://github.com/VNZ-DNA/BE-VNZ-DNA" target="_blank" rel="noopener noreferrer">View source ↗</a><a class="button" href="https://vnz-admin-fe.vercel.app/login" target="_blank" rel="noopener noreferrer">Open admin site ↗</a></div>`,
  seal: `<h2>SEAL Hackathon</h2><p class="dialog-meta">COURSE PROJECT · TEAM OF 4 · JUN–AUG 2026</p><p>A hackathon management backend built with .NET 8, EF Core, and PostgreSQL. Clean Architecture separates Domain, Application, Infrastructure, and Presentation.</p><h4>My contributions</h4><ul><li>Student submission workflows.</li><li>Leaderboard features.</li><li>Student notifications: details, unread counts, and read status.</li><li>Contributions to reports and round handling.</li></ul><p class="notice">A team learning project without real users yet. Contributions are summarized from commit history and do not represent the entire system.</p><div class="dialog-links"><a class="button primary" href="https://github.com/Seal-Manager-Hackathon/hkathon" target="_blank" rel="noopener noreferrer">View source ↗</a></div>`
 }
};
function setLanguage(next:Language){
 language=next; document.documentElement.lang=next;
 document.querySelectorAll<HTMLElement>('[data-i18n]').forEach(el=>{const key=el.dataset.i18n!;el.innerHTML=(next==='en'?english:vietnamese)[key]||vietnamese[key];});
 document.querySelectorAll<HTMLButtonElement>('[data-lang]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.lang===next)));
 const labels = next==='en'?['Home','Projects','About','Toolbox','Contact']:['Trang chủ','Dự án','Về mình','Kỹ năng','Liên hệ'];
 document.querySelectorAll('.dock-item').forEach((el,i)=>el.setAttribute('aria-label',labels[i]));
 document.querySelector('.dock')?.setAttribute('aria-label',next==='en'?'Main navigation':'Điều hướng chính');
 document.querySelector('#theme-toggle')?.setAttribute('aria-label',next==='en'?'Toggle light and dark theme':'Đổi giao diện sáng tối');
 document.querySelector('#close-dialog')?.setAttribute('aria-label',next==='en'?'Close project details':'Đóng chi tiết dự án');
 document.querySelector('.portrait-image img')?.setAttribute('alt',next==='en'?'Minh Kiệt smiling in front of a yellow shop':'Minh Kiệt mỉm cười trước một quầy hàng màu vàng');
 document.querySelector('meta[name="description"]')?.setAttribute('content',next==='en'?'Minh Kiệt’s personal portfolio. A third-year Software Engineering student sharing VNZ-DNA and SEAL Hackathon projects.':'Portfolio cá nhân của Minh Kiệt — sinh viên năm 3 ngành Kỹ thuật phần mềm. Khám phá dự án VNZ-DNA và SEAL Hackathon.');
 if(activeProject)content.innerHTML=descriptions[next][activeProject];
 try{localStorage.setItem('mk-language',next);}catch{}
}
document.querySelectorAll<HTMLButtonElement>('[data-lang]').forEach(el=>el.addEventListener('click',()=>setLanguage(el.dataset.lang as Language)));
try{if(localStorage.getItem('mk-language')==='en')setLanguage('en');}catch{}
document.querySelector('#theme-toggle')?.addEventListener('click',()=>{
 const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=theme;
 document.querySelector('meta[name="theme-color"]')?.setAttribute('content',theme==='dark'?'#111f1c':'#f5f7f2');
 try{localStorage.setItem('mk-theme',theme);}catch{}
});
document.querySelectorAll<HTMLButtonElement>('[data-project]').forEach(el=>el.addEventListener('click',()=>{
 activeProject=el.dataset.project as 'vnz'|'seal';content.innerHTML=descriptions[language][activeProject];dialog.showModal();document.body.style.overflow='hidden';
}));
document.querySelector('#close-dialog')?.addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{document.body.style.overflow='';activeProject=null;});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});

const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const dock=document.querySelector<HTMLElement>('.dock')!;
const dockItems=Array.from(document.querySelectorAll<HTMLElement>('.dock-item'));
function resetDock(){gsap.to(dockItems,{scale:1,y:0,duration:reduced.matches?0:.25,overwrite:true});}
dock.addEventListener('pointermove',e=>{
 if(reduced.matches||e.pointerType==='touch')return;
 dockItems.forEach(item=>{const rect=item.getBoundingClientRect();const distance=Math.abs(e.clientX-(rect.left+rect.width/2));const influence=Math.max(0,1-distance/110);gsap.to(item,{scale:1+influence*.4,y:-influence*9,duration:.2,overwrite:true,ease:'power2.out'});});
});
dock.addEventListener('pointerleave',resetDock);
dockItems.forEach(item=>{item.addEventListener('focus',()=>{if(!reduced.matches)gsap.to(item,{scale:1.25,y:-5,duration:.2});});item.addEventListener('blur',resetDock);});
const observer=new IntersectionObserver(entries=>{
 for(const entry of entries){if(entry.isIntersecting){dockItems.forEach(item=>{const active=item.dataset.nav===entry.target.id;item.classList.toggle('active',active);if(active)item.setAttribute('aria-current','location');else item.removeAttribute('aria-current');});}}
},{rootMargin:'-15% 0px -45% 0px',threshold:0});
['home','projects','about','contact'].forEach(id=>{const section=document.getElementById(id);if(section)observer.observe(section);});
dockItems.forEach(item=>item.addEventListener('click',()=>{dockItems.forEach(i=>{i.classList.toggle('active',i===item);i.removeAttribute('aria-current');});item.setAttribute('aria-current','location');}));

// Original choreography built for this page. No Swarm extension source is used.
let intro:gsap.core.Timeline|null=null;
const targets=Array.from(document.querySelectorAll<HTMLElement>('.build-item'));
const cursors=Array.from(document.querySelectorAll<HTMLElement>('.swarm-cursor'));
const skip=document.querySelector<HTMLButtonElement>('#skip-animation')!;
const replay=document.querySelector<HTMLButtonElement>('#replay')!;
function finishIntro(){intro?.kill();intro=null;gsap.set(targets,{clearProps:'opacity,visibility,clipPath'});gsap.set(cursors,{autoAlpha:0});skip.hidden=true;replay.disabled=false;}
function playIntro(){
 finishIntro();if(reduced.matches)return;
 if(window.scrollY>80){window.scrollTo({top:0,behavior:'instant'});}
 replay.disabled=true;skip.hidden=false;
 gsap.set(targets,{autoAlpha:0,clipPath:'inset(0 100% 0 0)'});
 cursors.forEach((cursor,i)=>gsap.set(cursor,{x:innerWidth*(.35+i*.15),y:innerHeight*.4,autoAlpha:1}));
 intro=gsap.timeline({onComplete:finishIntro});
 targets.forEach((target,i)=>{
  const cursor=cursors[i%3];const rect=target.getBoundingClientRect();const start=i*.37;
  intro!.to(cursor,{x:Math.min(rect.left-10,innerWidth-65),y:Math.min(rect.top,innerHeight-70),duration:.46,ease:'power2.inOut'},start)
   .set(target,{autoAlpha:1},start+.35)
   .to(target,{clipPath:'inset(0 0% 0 0)',duration:.62,ease:'power2.out'},start+.35)
   .to(cursor,{x:Math.min(rect.right,innerWidth-70),y:Math.min(rect.bottom-15,innerHeight-70),duration:.6,ease:'power2.inOut'},start+.4);
 });
 intro.to(cursors,{x:innerWidth-50,y:innerHeight-30,autoAlpha:0,duration:.5,stagger:.08},'>');
}
skip.addEventListener('click',finishIntro);replay.addEventListener('click',playIntro);
window.addEventListener('resize',()=>{if(intro)finishIntro();});
window.addEventListener('scroll',()=>{if(intro&&scrollY>100)finishIntro();},{passive:true});
window.addEventListener('keydown',e=>{if(e.key==='Escape')finishIntro();});
reduced.addEventListener('change',()=>{finishIntro();resetDock();});
// Keep the introduction visible on arrival. The swarm builds lower sections as they enter view.
setupScrollRebuild();
