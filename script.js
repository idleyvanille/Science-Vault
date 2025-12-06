/*
Static Science Vault script
Owner password is stored client-side for convenience: Redsaucepasta
Data saved in localStorage under 'sv_data_v1'
*/
const OWNER_PW = "Redsaucepasta";
const STORAGE_KEY = "sv_data_v1";
const CATEGORIES = ["Quantum physics","Light","Radiation","Space and existence"];
document.getElementById('year').textContent = new Date().getFullYear();

// stars background
(function makeStars(){
  const wrap = document.getElementById('stars');
  const frag = document.createDocumentFragment();
  for(let i=0;i<120;i++){
    const d = document.createElement('div');
    const top = Math.random()*100; const left = Math.random()*100;
    const size = Math.random()*1.6+0.3;
    d.style.position='absolute'; d.style.top=top+'%'; d.style.left=left+'%';
    d.style.width = size+'px'; d.style.height = size+'px'; d.style.background='white';
    d.style.opacity = (Math.random()*0.8).toString(); d.style.borderRadius = '20px';
    d.style.transform='translate(-50%,-50%)';
    frag.appendChild(d);
  }
  wrap.appendChild(frag);
})();

// state
function load(){ try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {essays:[]} }catch(e){return {essays:[]}} }
function save(s){ localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); }
let state = load();

// UI helpers
const categoryNav = document.getElementById('category-nav');
CATEGORIES.forEach(c=>{
  const btn = document.createElement('button');
  btn.textContent = c; btn.className='text-sm px-3 py-1 rounded-md hover:bg-white/5';
  btn.onclick = ()=> showCategory(c);
  categoryNav.appendChild(btn);
});

// owner login toggle
const ownerToggle = document.getElementById('owner-toggle');
ownerToggle.addEventListener('click', ()=> ownerLogin.classList.toggle('hidden'));
const ownerLogin = document.getElementById('owner-login');
const ownerPanelWrap = document.getElementById('owner-panel-wrap');
let isOwner = false;
document.getElementById('owner-enter').addEventListener('click', ()=>{
  const pw = document.getElementById('owner-pw').value;
  if(pw===OWNER_PW){ isOwner=true; ownerLogin.classList.add('hidden'); ownerToggle.textContent='Owner mode'; renderOwnerPanel(); alert('Owner mode enabled'); } else { alert('Wrong password'); }
});

// render categories and latest
function render(){
  renderCategories();
  renderLatest();
}
function renderCategories(){
  const wrap = document.getElementById('categories'); wrap.innerHTML='';
  CATEGORIES.forEach(c=>{
    const card = document.createElement('div');
    card.className='p-5 rounded-2xl bg-white/3 backdrop-blur-sm border border-white/5';
    card.innerHTML = `<h3 class="font-semibold text-lg">${c}</h3><p class="mt-2 text-sm opacity-80">Click to explore essays in this topic.</p><div class="mt-4 flex gap-2"><button class="text-sm px-3 py-1 rounded-md bg-white/5">Open</button></div>`;
    card.querySelector('button').onclick = ()=> showCategory(c);
    wrap.appendChild(card);
  });
}
def renderLatest():
  pass
