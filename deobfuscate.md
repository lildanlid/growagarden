<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Grow a Garden — Stock Monitor</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<style>
  :root{--bg:#f6f7fb;--card:#fff;--text:#111827;--muted:#6b7280;--accent:#6b7cff;--accent-2:#50e3c2;--border:#e6e8f0;--shadow:0 8px 28px rgba(2,6,23,0.08);--glass:rgba(255,255,255,0.6)}
  html.dark{--bg:#07101a;--card:#0b1220;--text:#e6eefb;--muted:#94a3b8;--accent:#8d9bff;--accent-2:#65f2d0;--border:rgba(255,255,255,0.06);--shadow:0 12px 34px rgba(0,0,0,0.6);--glass:rgba(8,12,18,0.55)}
  html,body{height:100%}
  body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Arial;color:var(--text);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;transition:background .3s ease,color .2s ease;overflow-y:auto;background:linear-gradient(180deg,var(--bg),transparent)}
  body::before{content:"";position:fixed;inset:0;z-index:-2;pointer-events:none;background:radial-gradient(600px 600px at 6% 12%, rgba(99,102,241,0.10), transparent 18%),radial-gradient(500px 500px at 90% 80%, rgba(80,227,194,0.06), transparent 10%),radial-gradient(360px 360px at 50% 90%, rgba(240,86,199,0.03), transparent 10%);filter:blur(20px)}
  html.dark body::before{background:radial-gradient(700px 700px at 8% 14%, rgba(120,110,255,0.12), transparent 18%),radial-gradient(520px 520px at 92% 76%, rgba(60,200,170,0.07), transparent 20%),radial-gradient(360px 360px at 50% 88%, rgba(200,90,170,0.03), transparent 20%);filter:blur(22px) saturate(1.05)}
  .app-wrap{min-height:100vh;padding:18px;max-width:1200px;margin:0 auto}
  .input{width:100%;padding:10px 12px;border-radius:10px;border:1px solid var(--border);background:var(--glass);color:var(--text);outline:none;transition:box-shadow .12s,border-color .12s}
  .card{background:var(--card);border:1px solid var(--border);border-radius:14px;box-shadow:var(--shadow);transition:transform .22s cubic-bezier(.2,.9,.2,1),box-shadow .22s,background .18s;overflow:visible;position:relative}
  .card-header{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;cursor:pointer}
  .card-body{max-height:0;overflow:hidden;transition:max-height .36s cubic-bezier(.2,.9,.2,1),opacity .22s;opacity:0;padding:0 14px;border-top:1px dashed var(--border)}
  .card.open .card-body{opacity:1;padding:12px 14px}
  .list{display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));padding:12px 0}
  .item{display:flex;gap:12px;align-items:center;padding:10px;border-radius:12px;border:1px solid var(--border);background:linear-gradient(180deg,rgba(0,0,0,0.02),transparent);transition:transform .18s,border-color .12s,box-shadow .12s;min-height:72px}
  .item.dim{opacity:.45;filter:grayscale(.35)}
  .item:hover{transform:translateY(-6px);border-color:rgba(43,108,255,0.12);box-shadow:0 16px 36px rgba(43,108,255,0.04)}
  .item img{width:64px;height:64px;object-fit:cover;border-radius:10px;background:#00000008;flex-shrink:0}
  .name{font-weight:700;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .sub{font-size:12px;color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .qty{margin-left:12px;font-weight:800;text-align:right;min-width:64px;flex-shrink:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  #categories{display:flex;gap:16px;align-items:flex-start}
  .column{flex:1;display:flex;flex-direction:column;gap:12px;min-width:0}
  @media(max-width:900px){#categories{flex-direction:column}}
  header .nav-btn{border-radius:12px;padding:8px 10px;display:flex;gap:8px;align-items:center;border:1px solid var(--border);background:var(--card);box-shadow:var(--shadow);cursor:pointer;transition:transform .12s,border-color .12s}
  header .nav-btn .icon-only{display:inline-flex}
  header .nav-btn .text-only{display:none}
  @media(max-width:640px){header .nav-btn .text-only{display:inline-block}}
  .modal{width:min(1100px,96vw);max-height:88vh;overflow:auto;border-radius:14px;padding:18px;border:1px solid var(--border);background:var(--card);box-shadow:var(--shadow)}
  .tab-row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px}
  .tab{padding:8px 12px;border-radius:10px;border:1px solid var(--border);cursor:pointer;background:var(--card)}
  .tab.active{background:linear-gradient(90deg,var(--accent),var(--accent-2));color:white;border-color:transparent;box-shadow:0 12px 30px rgba(43,108,255,0.12)}
  .weather-grid{display:grid;gap:12px;grid-template-columns:repeat(5,1fr)}
  @media(max-width:1200px){.weather-grid{grid-template-columns:repeat(4,1fr)}}
  @media(max-width:900px){.weather-grid{grid-template-columns:repeat(3,1fr)}}
  @media(max-width:600px){.weather-grid{grid-template-columns:repeat(2,1fr)}}
  .weather-card{padding:12px;border-radius:12px;border:1px solid var(--border);text-align:center;transition:transform .18s,border-color .12s,box-shadow .12s;background:linear-gradient(180deg,rgba(255,255,255,0.02),transparent);cursor:pointer}
  .weather-card .icon{width:56px;height:56px;border-radius:8px;object-fit:cover;margin:0 auto 8px}
  .chip{display:inline-flex;align-items:center;gap:8px;padding:8px 10px;border-radius:10px;border:1px solid var(--border);background:transparent;cursor:pointer;transition:all .12s}
  .chip.selected{background:linear-gradient(90deg,var(--accent),var(--accent-2));color:white;border-color:transparent;box-shadow:0 12px 30px rgba(43,108,255,0.12)}
  .mut-list{display:flex;flex-wrap:wrap;gap:8px;max-height:260px;overflow:auto;padding:8px 0}
  .notify-btn{padding:8px 10px;border-radius:10px;border:1px solid var(--border);background:var(--card);cursor:pointer;display:flex;gap:8px;align-items:center;width:100%;text-align:left;transition:transform .12s,box-shadow .12s}
  .footer-timers{margin-top:18px;display:flex;gap:8px;flex-wrap:wrap;align-items:center;justify-content:center}
  .timer-chip{padding:8px 12px;border-radius:999px;background:linear-gradient(90deg,var(--accent),var(--accent-2));color:#fff;font-weight:700;box-shadow:0 8px 20px rgba(43,108,255,0.12)}
  footer{text-align:center;margin:18px 0 6px;color:var(--muted)}
  .badge{background:linear-gradient(135deg,var(--accent),var(--accent-2));color:#fff;padding:6px 10px;border-radius:999px;font-weight:700;font-size:12px}
  .small-muted{color:var(--muted);font-size:13px}
  .pred-timer{font-weight:700;color:var(--muted);font-size:13px;white-space:nowrap}
  .suggest-list{position:absolute;left:0;right:0;z-index:60;background:var(--card);border:1px solid var(--border);border-radius:8px;margin-top:6px;box-shadow:var(--shadow);max-height:280px;overflow:auto;display:none}
  .suggest-item{display:flex;gap:8px;align-items:center;padding:8px;cursor:pointer;border-bottom:1px dashed var(--border)}
  .suggest-item:hover{background:linear-gradient(90deg,rgba(43,108,255,0.06),rgba(80,227,194,0.02))}
</style>
</head>
<body>
  <div class="app-wrap">
    <header class="max-w-7xl mx-auto flex items-center gap-4">
      <div class="flex items-center gap-3">
        <span class="material-icons text-2xl" style="color:var(--accent)">spa</span>
        <div class="text-lg font-extrabold">Grow a Garden</div>
        <div id="statusPill" class="ml-3 rounded-full px-3 py-1 text-sm" style="background:var(--card);border:1px solid var(--border);color:var(--muted)">Connecting…</div>
      </div>
      <div class="flex-1"></div>
      <nav class="flex items-center gap-2">
        <button id="darkToggle" class="nav-btn" title="Toggle theme"><span class="material-icons icon-only">dark_mode</span><span class="text-only">Theme</span></button>
        <button id="calculatorBtn" class="nav-btn" title="Calculator"><span class="material-icons icon-only">calculate</span><span class="text-only">Calculator</span></button>
        <button id="encyclopediaBtn" class="nav-btn" title="Encyclopedia"><span class="material-icons icon-only">menu_book</span><span class="text-only">Encyclopedia</span></button>
        <button id="weatherBtn" class="nav-btn" title="Weather"><span class="material-icons icon-only">cloud</span><span class="text-only">Weather</span></button>
        <button id="stockPredictionsBtn" class="nav-btn" title="Stock Predictions"><span class="material-icons icon-only">insights</span><span class="text-only">Stock Predictions</span></button>
        <button id="openNotifications" class="nav-btn" title="Notifications"><span class="material-icons icon-only">notifications</span><span class="text-only">Notifications</span></button>
      </nav>
    </header>

    <main class="max-w-7xl mx-auto mt-6">
      <div class="flex items-center gap-4 mb-4">
        <div id="updatedAt" class="small-muted">—</div>
        <div class="flex-1"></div>
        <div id="restockTimersHeader" class="small-muted" style="display:none"></div>
      </div>

      <section id="categories"></section>

      <div id="bottomTimers" class="footer-timers" aria-hidden="false"></div>
    </main>

    <div id="modalOverlay" class="fixed inset-0 z-50 hidden items-center justify-center" style="background:rgba(6,8,12,0.48);backdrop-filter:blur(6px);">
      <div id="modalContent" class="modal relative">
        <button id="closeModal" style="position:absolute;right:12px;top:10px;border-radius:8px;border:none;background:transparent;font-size:18px;cursor:pointer">✕</button>
        <div id="modalTitle" class="font-extrabold text-lg mb-3">Loading…</div>
        <div id="modalBody"></div>
      </div>
    </div>

    <footer>© lildanlid</footer>
  </div>

<script>
const API_KEY = 'js_c5d322d0652bc477f50348450bb2c6fe4f4d767042b2b0facb69b074c3d46f46';
const API_STOCK = 'https://api.joshlei.com/v2/growagarden/stock';
const API_INFO_BASE = 'https://api.joshlei.com/v2/growagarden/info/';
const API_WEATHER = 'https://api.joshlei.com/v2/growagarden/weather';
const API_PRED = 'https://growagarden.gg/api/stock';
const IMAGE_API = name => `https://api.joshlei.com/v2/growagarden/image/${encodeURIComponent(String(name||'').trim().replace(/[^\w]+/g,'_'))}`;

const POLL_FULL_MS = 30000;
const PRED_POLL_MS = 60000;
const POLL_NOTIFY_MS = 3000;

const SEEDS = ["Carrot","Strawberry","Blueberry","Tomato","Daffodil","Watermelon","Pumpkin","Apple","Bamboo","Coconut","Cactus","Dragon Fruit","Mango","Grape","Mushroom","Pepper","Cacao","Beanstalk","Ember lily","Sugar Apple","Burning Bud","Giant Pinecone","Elder Strawberry","Romanesco"];
const GEARS = ["Watering Can","Trowel","Recall Wrench","Basic Sprinkler","Advanced Sprinkler","Medium Toy","Medium Treat","Godly Sprinkler","Magnifying Glass","Master Sprinkler","Cleaning Spray","Cleansing Pet Shard","Favorite Tool","Harvest Tool","Friendship Pot","Grandmaster Sprinkler","Levelup Lolipop"];
const EGGS = ["Common Egg","Uncommon Egg","Rare Egg","Legandary Egg","Mythical Egg","Bug Egg"];

let latestStock = null;
let predMap = {};
let watchSet = new Set(JSON.parse(localStorage.getItem('gg_watch')||'[]'));
let watchWeather = new Set(JSON.parse(localStorage.getItem('gg_watch_weather')||'[]'));
let lastKnownQty = {};
let openCards = new Set();
let merchantHiddenUntil = Number(localStorage.getItem('merchantHiddenUntil') || 0);

const categoriesEl = document.getElementById('categories');
const statusPill = document.getElementById('statusPill');
const updatedAt = document.getElementById('updatedAt');
const bottomTimersEl = document.getElementById('bottomTimers');

function esc(s){ return String(s||'').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function canonical(name){ return String(name||'').trim().replace(/[^\w]+/g,'_'); }
function apiGet(url){ return fetch(url, { headers:{ 'accept':'application/json','jstudio-key':API_KEY } }).then(r=>{ if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); }); }

function formatCountdownSeconds(secs, opts={hideSecondsIfHours:true}){
  secs = Math.max(0, Math.floor(secs));
  const w = Math.floor(secs / 604800); secs %= 604800;
  const d = Math.floor(secs / 86400); secs %= 86400;
  const h = Math.floor(secs / 3600); secs %= 3600;
  const m = Math.floor(secs / 60); const s = secs % 60;
  const parts = [];
  if(w) parts.push(w+'w'); if(d) parts.push(d+'d'); if(h) parts.push(h+'h'); if(m) parts.push(m+'m');
  if(!parts.length || (!opts.hideSecondsIfHours || (opts.hideSecondsIfHours && h===0 && d===0 && w===0))) parts.push(s+'s');
  return parts.join(' ');
}

function nextSeenText(nextIso, opts={hideSecondsIfHours:true}){
  if(!nextIso) return '';
  const t = new Date(nextIso).getTime();
  const diffSec = Math.floor((t - Date.now())/1000);
  if(Math.abs(diffSec) < 5) return 'Now';
  const future = diffSec > 0;
  const a = Math.abs(diffSec);
  const w = Math.floor(a/604800); let rem = a%604800;
  const d = Math.floor(rem/86400); rem%=86400;
  const h = Math.floor(rem/3600); rem%=3600;
  const m = Math.floor(rem/60); const s = rem%60;
  const parts = [];
  if(w) parts.push(w+'w'); if(d) parts.push(d+'d'); if(h) parts.push(h+'h'); if(m) parts.push(m+'m');
  if(parts.length === 0) parts.push(s+'s');
  // hide seconds if hours/days/weeks present
  let displayParts = parts;
  if(opts.hideSecondsIfHours && (h>0 || d>0 || w>0)) displayParts = parts.filter(p => !p.endsWith('s'));
  const text = displayParts.join(' ');
  return future ? `In ${text}` : `${text} ago`;
}

function calculateNextTimes(now = Date.now()){
  const dayStart = new Date().setHours(0,0,0,0);
  const next = ms => dayStart + Math.ceil((now - dayStart) / ms) * ms;
  const seedsMs = 5*60*1000;
  const gearMs = 5*60*1000;
  const eggsMs = 30*60*1000;
  const cosmeticsMs = 4*60*60*1000;
  const merchantMs = 4*60*60*1000;
  const fairyMs = 60*60*1000;
  const fairyRingMs = 1.5*60*60*1000;
  return {
    seedsNext: next(seedsMs),
    gearNext: next(gearMs),
    eggsNext: next(eggsMs),
    cosmeticsNext: next(cosmeticsMs),
    merchantNext: next(merchantMs),
    fairyNext: next(fairyMs),
    fairyRingNext: next(fairyRingMs)
  };
}

async function tryFetchWithProxies(url){
  const proxies = [
    url,
    'https://api.allorigins.win/raw?url=' + encodeURIComponent(url),
    'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(url),
    'https://thingproxy.freeboard.io/fetch/' + url,
    'https://api.allorigins.cf/raw?url=' + encodeURIComponent(url)
  ];
  for(const u of proxies){
    try{
      const res = await fetch(u);
      if(!res.ok) continue;
      const text = await res.text();
      try{ return JSON.parse(text); }catch(e){
        try{ return await res.json(); }catch(e2){ continue; }
      }
    }catch(e){}
  }
  throw new Error('all fetch attempts failed');
}

async function fetchPredictions(){
  try{
    const j = await tryFetchWithProxies(API_PRED);
    let arr = null;
    if(Array.isArray(j)) arr = j;
    else if(Array.isArray(j.nextSeen)) arr = j.nextSeen;
    else if(Array.isArray(j.next_seen)) arr = j.next_seen;
    else if(Array.isArray(j.data?.nextSeen)) arr = j.data.nextSeen;
    if(!arr || arr.length === 0){
      const saved = localStorage.getItem('gg_preds_v1');
      if(saved){ predMap = JSON.parse(saved); return true; }
      predMap = {};
      return false;
    }
    const newMap = {};
    arr.forEach(x=>{
      if(!x || !x.name) return;
      const parts = (x.name||'').split(':');
      const name = parts.length > 1 ? parts.slice(1).join(':').trim() : parts[0].trim();
      if(name) newMap[name] = x.nextSeen || x.next_seen || x.nextSeenISO || x.time || x.date || x.next || null;
    });
    predMap = newMap;
    try{ localStorage.setItem('gg_preds_v1', JSON.stringify(predMap)); }catch(e){}
    return true;
  }catch(e){
    try{ const saved = localStorage.getItem('gg_preds_v1'); if(saved){ predMap = JSON.parse(saved); return true; } }catch(e){}
    predMap = {};
    return false;
  }
}

async function fetchWeatherList(){
  try{ const res = await fetch(API_WEATHER, { headers:{ 'accept':'application/json','jstudio-key':API_KEY } }); if(!res.ok) throw new Error('HTTP '+res.status); const j = await res.json(); return j.weather || []; }catch(e){ return []; }
}

async function fetchStockFull(){
  try{
    const data = await apiGet(API_STOCK);
    latestStock = data;
    statusPill.textContent = 'Live';
    updatedAt.textContent = `Updated: ${new Date().toLocaleString()}`;
    if(data && data.travelingmerchant_stock && Array.isArray(data.travelingmerchant_stock.stock) && data.travelingmerchant_stock.stock.length > 0){
      merchantHiddenUntil = 0;
      localStorage.removeItem('merchantHiddenUntil');
    }
    await fetchPredictions().catch(()=>{});
    renderAllInPlace(data);
    for(const name of [...watchSet]) lastKnownQty[name] = findQtyInStock(data, name) || 0;
  }catch(e){
    statusPill.textContent = 'Offline';
  }
}
fetchStockFull();
setInterval(fetchStockFull, POLL_FULL_MS);
fetchPredictions();
setInterval(fetchPredictions, PRED_POLL_MS);

function findQtyInStock(stock, displayName){
  if(!stock) return 0;
  const pools = [stock.seed_stock||[], stock.gear_stock||[], stock.egg_stock||[], stock.cosmetic_stock||[], (stock.travelingmerchant_stock && stock.travelingmerchant_stock.stock) || []].flat();
  const it = pools.find(x => (x.display_name || '').toLowerCase() === (displayName||'').toLowerCase());
  return it ? Number(it.quantity||0) : 0;
}

function sortItemsByConstOrder(items, orderArray){
  const orderMap = {};
  orderArray.forEach((v,i)=> orderMap[v.toLowerCase()] = i);
  return items.slice().sort((a,b)=>{
    const an = (a.display_name||a.item_id||a.id||'').toLowerCase();
    const bn = (b.display_name||b.item_id||b.id||'').toLowerCase();
    const ai = orderMap.hasOwnProperty(an) ? orderMap[an] : 1e6;
    const bi = orderMap.hasOwnProperty(bn) ? orderMap[bn] : 1e6;
    if(ai !== bi) return ai - bi;
    return an.localeCompare(bn);
  });
}

async function renderAllInPlace(data){
  if(!categoriesEl) return;
  let leftCol = categoriesEl.querySelector('.column.left');
  let rightCol = categoriesEl.querySelector('.column.right');
  if(!leftCol || !rightCol){
    categoriesEl.innerHTML = '';
    leftCol = document.createElement('div'); leftCol.className = 'column left';
    rightCol = document.createElement('div'); rightCol.className = 'column right';
    categoriesEl.appendChild(leftCol);
    categoriesEl.appendChild(rightCol);
  }
  const merchantName = (data?.travelingmerchant_stock && (data.travelingmerchant_stock.merchantName || data.travelingmerchant_stock.merchantname || data.travelingmerchant_stock.name)) || '';
  const specs = [
    { key:'seed_stock', title:'Seeds', items: data.seed_stock || [], col:0 },
    { key:'gear_stock', title:'Gears', items: data.gear_stock || [], col:1 },
    { key:'egg_stock', title:'Eggs', items: data.egg_stock || [], col:0 },
    { key:'cosmetic_stock', title:'Cosmetics', items: data.cosmetic_stock || [], col:1 },
    { key:'travelingmerchant_stock', title: merchantName ? `Traveling Merchant — ${merchantName}` : 'Traveling Merchant', items: (data.travelingmerchant_stock && data.travelingmerchant_stock.stock) || [], col:0 }
  ];

  for(const spec of specs){
    const column = spec.col === 0 ? leftCol : rightCol;
    const key = spec.key;
    let card = column.querySelector(`.card[data-key="${key}"]`);
    if(!card){
      card = document.createElement('section'); card.className = 'card'; card.setAttribute('data-key', key);
      const header = document.createElement('div'); header.className = 'card-header';
      header.innerHTML = `<div style="display:flex;align-items:center;gap:10px"><h2 class="font-bold">${esc(spec.title)}</h2></div><div style="display:flex;align-items:center;gap:10px"><span class="badge">${(spec.items||[]).length}</span><span class="material-icons">expand_more</span></div>`;
      const body = document.createElement('div'); body.className = 'card-body';
      const list = document.createElement('div'); list.className = 'list'; body.appendChild(list);
      card.appendChild(header); card.appendChild(body);
      column.appendChild(card);
      header.addEventListener('click', ev => {
        ev.stopPropagation();
        const opened = card.classList.toggle('open');
        const body = card.querySelector('.card-body');
        if(opened){ body.style.maxHeight = body.scrollHeight + 'px'; openCards.add(spec.title); } else { body.style.maxHeight = '0px'; openCards.delete(spec.title); }
      });
    } else {
      const badge = card.querySelector('.badge'); if(badge) badge.textContent = (spec.items||[]).length;
    }

    const listEl = card.querySelector('.list');
    let itemsToRender = spec.items || [];
    if(key === 'seed_stock') itemsToRender = sortItemsByConstOrder(itemsToRender, SEEDS);
    if(key === 'gear_stock') itemsToRender = sortItemsByConstOrder(itemsToRender, GEARS);
    if(key === 'egg_stock') itemsToRender = sortItemsByConstOrder(itemsToRender, EGGS);

    const parts = [];
    for(const it of (itemsToRender || [])){
      const name = it.display_name || it.item_id || it.id || '';
      const qty = Number(it.quantity||0);
      const dim = qty === 0 ? 'dim' : '';
      const icon = it.icon || IMAGE_API(name);
      const foundKey = Object.keys(predMap).find(k=>k.toLowerCase()===name.toLowerCase());
      const predIso = foundKey ? predMap[foundKey] : null;
      const predHtml = predIso ? `<div class="pred-timer" data-next="${esc(predIso)}">${esc(nextSeenText(predIso))}</div>` : '';
      parts.push(
        `<div class="item ${dim}" data-name="${esc(name)}">`+
          `<img src="${icon}" alt="${esc(name)}" onerror="this.onerror=null;this.src='${IMAGE_API(name)}'">`+
          `<div style="flex:1;min-width:0"><div class="name" title="${esc(name)}">${esc(name)}</div><div class="sub">${predHtml}</div></div>`+
          `<div class="qty" title="Quantity">× ${qty}</div>`+
        `</div>`
      );
    }
    listEl.innerHTML = parts.join('');
    const bodyEl = card.querySelector('.card-body');
    if(openCards.has(spec.title)){
      card.classList.add('open');
      requestAnimationFrame(()=> { bodyEl.style.maxHeight = bodyEl.scrollHeight + 'px'; });
    } else {
      card.classList.remove('open');
      bodyEl.style.maxHeight = '0px';
    }

    if(key === 'travelingmerchant_stock'){
      const now = Date.now();
      const { merchantNext } = calculateNextTimes(now);
      if(merchantHiddenUntil && now < merchantHiddenUntil){
        const listE = card.querySelector('.list');
        if(listE) listE.innerHTML = `<div class="small-muted" style="padding:12px">Merchant hidden until ${new Date(merchantHiddenUntil).toLocaleString()}</div>`;
      } else {
        if(now >= merchantNext && merchantHiddenUntil === 0){
          merchantHiddenUntil = merchantNext + (30*60*1000);
          localStorage.setItem('merchantHiddenUntil', String(merchantHiddenUntil));
        }
      }
    }
  }

  updatePredTimersInDOM();
  updateTimersUI();
}

function quickUpdateUI(stock){
  if(!stock) return;
  const map = {};
  [ ...(stock.seed_stock||[]), ...(stock.gear_stock||[]), ...(stock.egg_stock||[]), ...(stock.cosmetic_stock||[]), ...((stock.travelingmerchant_stock && stock.travelingmerchant_stock.stock) || []) ].forEach(it => { if(it && it.display_name) map[it.display_name] = Number(it.quantity||0); });
  document.querySelectorAll('.card[data-key]').forEach(card=>{
    const listEl = card.querySelector('.list'); if(!listEl) return;
    listEl.querySelectorAll('.item').forEach(itemEl=>{
      const nameEl = itemEl.querySelector('.name');
      if(!nameEl) return;
      const name = nameEl.textContent.trim();
      const qty = map.hasOwnProperty(name) ? map[name] : findQtyInStock(stock, name);
      const qtyEl = itemEl.querySelector('.qty');
      if(qtyEl) qtyEl.textContent = `× ${qty}`;
      if(Number(qty) === 0) itemEl.classList.add('dim'); else itemEl.classList.remove('dim');
      const predEl = itemEl.querySelector('.pred-timer');
      if(predEl){
        const iso = predEl.dataset.next;
        predEl.textContent = nextSeenText(iso);
      }
    });
  });
  updateTimersUI();
}

setInterval(()=>{
  document.querySelectorAll('.pred-timer').forEach(el=>{
    const iso = el.dataset.next;
    if(iso) el.textContent = nextSeenText(iso);
  });
  quickUpdateUI(latestStock);
}, 1000);

async function updateTimersUI(){
  const now = Date.now();
  const t = calculateNextTimes(now);
  const parts = [];
  parts.push(`Seeds: ${formatCountdownSeconds(Math.floor((t.seedsNext - now)/1000))}`);
  parts.push(`Gears: ${formatCountdownSeconds(Math.floor((t.gearNext - now)/1000))}`);
  parts.push(`Eggs: ${formatCountdownSeconds(Math.floor((t.eggsNext - now)/1000))}`);
  parts.push(`Cosmetics: ${formatCountdownSeconds(Math.floor((t.cosmeticsNext - now)/1000))}`);
  const merchantNextMs = t.merchantNext;
  const nowMs = now;
  if(merchantHiddenUntil && nowMs < merchantHiddenUntil){
    parts.push(`Merchant visible until ${new Date(merchantHiddenUntil).toLocaleTimeString()}`);
  } else {
    const dif = Math.floor((merchantNextMs - nowMs)/1000);
    if(dif <= 0){
      if(!merchantHiddenUntil){
        merchantHiddenUntil = merchantNextMs + (30*60*1000);
        localStorage.setItem('merchantHiddenUntil', String(merchantHiddenUntil));
        parts.push(`Merchant: 30m grace`);
      } else {
        parts.push(`Merchant: hidden`);
      }
    } else {
      parts.push(`Merchant: ${formatCountdownSeconds(dif)}`);
    }
  }
  parts.push(`Fairy Event: ${formatCountdownSeconds(Math.floor((t.fairyNext - now)/1000))}`);
  const ringStart = t.fairyRingNext;
  const ringActiveWindow = 10*60*1000;
  if(now >= ringStart && now < ringStart + ringActiveWindow){
    parts.push(`Fairy Ring: Active (${formatCountdownSeconds(Math.floor((ringStart + ringActiveWindow - now)/1000))})`);
  } else {
    parts.push(`Fairy Ring: ${formatCountdownSeconds(Math.floor((ringStart - now)/1000))}`);
  }
  const weather = await fetchWeatherList();
  const night = weather.find(w => /night/i.test(w.weather_name || '') || (w.weather_id && /night/i.test(w.weather_id)));
  if(night && night.active && night.end_duration_unix){
    const nowSec = Math.floor(Date.now()/1000);
    parts.push(`Night Event: Active (${formatCountdownSeconds(night.end_duration_unix - nowSec)})`);
  } else {
    parts.push(`Night Event: ${formatCountdownSeconds(Math.floor((t.merchantNext - now)/1000))}`);
  }
  bottomTimersEl.innerHTML = '';
  parts.slice(0,8).forEach(p=>{
    const el = document.createElement('div'); el.className = 'timer-chip'; el.textContent = p; bottomTimersEl.appendChild(el);
  });
}

function showModal(title, renderer){
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = 'Loading…';
  document.getElementById('modalOverlay').style.display = 'flex';
  try{ renderer(); }catch(e){ document.getElementById('modalBody').innerHTML = '<div class="small-muted">Error loading content</div>'; }
}
document.getElementById('closeModal').addEventListener('click', ()=> { document.getElementById('modalOverlay').style.display = 'none'; document.getElementById('modalBody').innerHTML = ''; });

document.getElementById('openNotifications').addEventListener('click', ()=> showModal('Notifications', renderNotifications) );
document.getElementById('stockPredictionsBtn').addEventListener('click', ()=> showModal('Stock Predictions', renderStockPredictions) );
document.getElementById('weatherBtn').addEventListener('click', ()=> showModal('Weather', renderWeatherModal) );
document.getElementById('encyclopediaBtn').addEventListener('click', ()=> showModal('Encyclopedia', renderEncyclopedia) );
document.getElementById('calculatorBtn').addEventListener('click', ()=> showModal('Calculator', renderCalculator) );

function makeNotifyButton(name, checked, qty=0){
  const btn = document.createElement('button');
  btn.className = 'notify-btn' + (checked ? ' toggled' : '');
  btn.innerHTML = `<img src="${IMAGE_API(name)}" style="width:40px;height:40px;border-radius:6px;object-fit:cover"><div style="flex:1"><div style="font-weight:700">${esc(name)}</div><div class="small-muted">Quantity: ${qty}</div></div>`;
  btn.addEventListener('click', ()=>{
    const is = watchSet.has(name);
    if(is){ watchSet.delete(name); btn.classList.remove('toggled'); delete lastKnownQty[name]; } else { watchSet.add(name); btn.classList.add('toggled'); lastKnownQty[name] = findQtyInStock(latestStock, name) || 0; }
    localStorage.setItem('gg_watch', JSON.stringify([...watchSet]));
  });
  return btn;
}

function renderNotifications(){
  const mb = document.getElementById('modalBody');
  mb.innerHTML = `
    <div>
      <div class="tab-row">
        <div class="tab active" data-tab="items">Items</div>
        <div class="tab" data-tab="weather">Weather</div>
        <div class="tab" data-tab="merchants">Merchants</div>
        <div style="margin-left:auto"><button id="clearAll" class="nav-btn">Clear all watches</button></div>
      </div>
      <div id="notifContent"></div>
    </div>
  `;
  const tabs = mb.querySelectorAll('.tab');
  tabs.forEach(t => t.addEventListener('click', ()=>{
    tabs.forEach(x=>x.classList.remove('active')); t.classList.add('active');
    const key = t.dataset.tab;
    if(key === 'items') renderNotificationsItems();
    if(key === 'weather') renderNotificationsWeather();
    if(key === 'merchants') renderNotificationsMerchants();
  }));
  mb.querySelector('#clearAll').addEventListener('click', ()=> { watchSet.clear(); watchWeather.clear(); localStorage.setItem('gg_watch', JSON.stringify([...watchSet])); localStorage.setItem('gg_watch_weather', JSON.stringify([...watchWeather])); renderNotifications(); });
  renderNotificationsItems();
}

function renderNotificationsItems(){
  const cont = document.getElementById('notifContent');
  cont.innerHTML = `<div style="display:grid;gap:12px">
    <div><div class="font-bold">Seeds</div><div id="seedGrid" class="notify-grid mt-2" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px"></div></div>
    <div><div class="font-bold">Gears</div><div id="gearGrid" class="notify-grid mt-2" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px"></div></div>
    <div><div class="font-bold">Eggs</div><div id="eggGrid" class="notify-grid mt-2" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px"></div></div>
  </div>`;
  const seedGrid = document.getElementById('seedGrid'); const gearGrid = document.getElementById('gearGrid'); const eggGrid = document.getElementById('eggGrid');
  SEEDS.forEach(name => seedGrid.appendChild(makeNotifyButton(name, watchSet.has(name), findQtyInStock(latestStock, name))));
  GEARS.forEach(name => gearGrid.appendChild(makeNotifyButton(name, watchSet.has(name), findQtyInStock(latestStock, name))));
  EGGS.forEach(name => eggGrid.appendChild(makeNotifyButton(name, watchSet.has(name), findQtyInStock(latestStock, name))));
}

async function renderNotificationsWeather(){
  const cont = document.getElementById('notifContent');
  cont.innerHTML = `<div class="small-muted mb-2">Active first. Click a card to toggle notifications.</div><div id="weatherGrid" class="weather-grid"></div>`;
  const grid = document.getElementById('weatherGrid');
  try{
    const list = await fetchWeatherList();
    list.sort((a,b)=> (b.active?1:0) - (a.active?1:0) || (a.weather_name||'').localeCompare(b.weather_name||''));
    const now = Math.floor(Date.now()/1000);
    grid.innerHTML = '';
    list.forEach(w=>{
      if(!w) return;
      const name = w.weather_name || w.weather_id || '';
      const id = w.weather_id || canonical(name);
      const icon = w.icon || IMAGE_API(name);
      let cd = '';
      if(w.active && w.end_duration_unix) cd = formatCountdownSeconds(w.end_duration_unix - now);
      else if(!w.active && w.duration) cd = formatCountdownSeconds(w.duration);
      const card = document.createElement('div'); card.className = 'weather-card' + (watchWeather.has(id) ? ' selected' : '');
      card.innerHTML = `${w.active ? '<div style="margin-bottom:6px" class="badge">Active</div>' : ''}<img src="${icon}" class="icon" alt="${esc(name)}"><div class="font-bold">${esc(name)}</div><div class="small-muted">${esc(w.active?cd:'')}</div>`;
      grid.appendChild(card);
      card.addEventListener('click', ()=>{
        if(watchWeather.has(id)){ watchWeather.delete(id); card.classList.remove('selected'); } else { watchWeather.add(id); card.classList.add('selected'); }
        localStorage.setItem('gg_watch_weather', JSON.stringify([...watchWeather]));
      });
    });
  }catch(e){ grid.innerHTML = `<div class="small-muted">Error loading weather.</div>`; }
}

function renderNotificationsMerchants(){
  const cont = document.getElementById('notifContent');
  const MERCHANTS = [
    { id:'gnome', name:'Gnome Merchant', img:'https://static.wikia.nocookie.net/growagarden/images/8/8d/Gnome_shop.png', desc:'Gnome crates & pet', sells:['Common Gnome Crate','Farmers Gnome Crate','Classic Gnome Crate','Iconic Gnome Crate','Gnome Pet']},
    { id:'sky', name:'Sky Merchant', img:'https://static.wikia.nocookie.net/growagarden/images/5/5a/Skymerchant.png', desc:'Sky merchant items', sells:['Night Staff','Star Caller','Cloudtouched Spray']},
    { id:'honey', name:'Honey Merchant', img:'https://static.wikia.nocookie.net/growagarden/images/6/61/Honeymerchant.png', desc:'Honey merchant items', sells:['Flower Seed Pack','Honey Sprinkler','Bee Egg','Bee Crate','Honey Crafters Crate']},
    { id:'trader', name:'General Trader', img:'https://static.wikia.nocookie.net/growagarden/images/0/00/Trader.png', desc:'General traveling items', sells:['Trading Ticket','Magnifying Glass','Harvest Tool']},
    { id:'night', name:'Night Merchant', img:'https://static.wikia.nocookie.net/growagarden/images/9/99/NightMerchant.png', desc:'Night event merchant', sells:['Night Staff','Moon Melon','Star Caller']}
  ];
  cont.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:12px">${MERCHANTS.map(m=>`<div class="card p-3"><div style="display:flex;gap:12px"><img src="${m.img}" style="width:120px;height:120px;border-radius:8px;object-fit:cover"><div style="flex:1"><div class="font-bold">${esc(m.name)}</div><div class="small-muted">${esc(m.desc)}</div><div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:8px">${m.sells.map(s=>`<button class="notify-btn ${watchSet.has(s)?'toggled':''}" data-item="${esc(s)}"><img src="${IMAGE_API(s)}" style="width:28px;height:28px;border-radius:6px;object-fit:cover"><div style="flex:1">${esc(s)}</div></button>`).join('')}</div></div></div></div>`).join('')}</div>`;
  cont.querySelectorAll('button[data-item]').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const nm = e.currentTarget.dataset.item;
      if(watchSet.has(nm)){ watchSet.delete(nm); e.currentTarget.classList.remove('toggled'); delete lastKnownQty[nm]; }
      else { watchSet.add(nm); e.currentTarget.classList.add('toggled'); lastKnownQty[nm] = findQtyInStock(latestStock, nm) || 0; }
      localStorage.setItem('gg_watch', JSON.stringify([...watchSet]));
    });
  });
}

async function renderStockPredictions(){
  const mb = document.getElementById('modalBody');
  mb.innerHTML = `<div id="predWrap">Loading…</div>`;
  const wrap = document.getElementById('predWrap');
  try{
    const ok = await fetchPredictions();
    const makeOrderedFromConst = (orderArr) => {
      const list = [];
      for(const name of orderArr){
        const foundKey = Object.keys(predMap).find(k=>k.toLowerCase() === name.toLowerCase());
        if(foundKey) list.push({ name, nextSeen: predMap[foundKey] });
      }
      return list;
    };
    const seeds = makeOrderedFromConst(SEEDS);
    const gears = makeOrderedFromConst(GEARS);
    function renderList(list){
      if(!list || list.length===0) return '<div class="small-muted">No predictions</div>';
      return `<div style="display:grid;gap:8px">${list.map(it=>{
        return `<div class="card p-2" style="display:flex;gap:10px;align-items:center"><img src="${IMAGE_API(it.name)}" style="width:40px;height:40px;border-radius:6px;object-fit:cover"><div style="flex:1"><div class="font-bold">${esc(it.name)}</div><div class="small-muted">${esc(nextSeenText(it.nextSeen))}</div></div></div>`;
      }).join('')}</div>`;
    }
    wrap.innerHTML = `<h3 class="font-bold">Seeds</h3>${renderList(seeds)}<h3 class="font-bold mt-4">Gears</h3>${renderList(gears)}`;
  }catch(e){
    wrap.innerHTML = `<div class="small-muted">No predictions</div>`;
  }
}

async function renderWeatherModal(){
  const mb = document.getElementById('modalBody');
  mb.innerHTML = `<div class="font-bold mb-2">Weather</div><div id="weatherMainWrap">Loading…</div>`;
  const wrap = document.getElementById('weatherMainWrap');
  try{
    const list = await fetchWeatherList();
    list.sort((a,b)=> (b.active?1:0) - (a.active?1:0) || (a.weather_name||'').localeCompare(b.weather_name||''));
    const now = Math.floor(Date.now()/1000);
    wrap.innerHTML = `<div class="weather-grid">${list.map(w=>{
      const name = w.weather_name || w.weather_id || '';
      const icon = w.icon || IMAGE_API(name);
      let cd = '';
      if(w.active && w.end_duration_unix) cd = formatCountdownSeconds(w.end_duration_unix - now);
      else if(!w.active && w.duration) cd = formatCountdownSeconds(w.duration);
      const activeBadge = w.active ? '<div style="margin-bottom:6px" class="badge">Active</div>' : '';
      return `<div class="weather-card">${activeBadge}<img src="${icon}" class="icon" alt="${esc(name)}"><div class="font-bold">${esc(name)}</div><div class="small-muted">${esc(w.active?cd:'')}</div></div>`;
    }).join('')}</div>`;
  }catch(e){
    wrap.innerHTML = `<div class="small-muted">Error loading weather.</div>`;
  }
}

async function renderEncyclopedia(){
  const mb = document.getElementById('modalBody');
  mb.innerHTML = `<div style="display:flex;flex-direction:column;gap:8px"><div style="display:flex;gap:8px"><input id="encSearch" class="input" placeholder="Search items, mutations, weather..."><div id="encCounts" class="small-muted"></div></div><div id="encTabs" class="tab-row"></div><div id="encBody"></div></div>`;
  try{
    const data = await apiGet('https://api.joshlei.com/v2/growagarden/info');
    const merchants = [
      { id:'merchant_gnome', display_name:'Gnome Merchant', type:'merchant', description:'Sells crates & pet', icon:'https://static.wikia.nocookie.net/growagarden/images/8/8d/Gnome_shop.png' },
      { id:'merchant_sky', display_name:'Sky Merchant', type:'merchant', description:'Sky merchant items', icon:'https://static.wikia.nocookie.net/growagarden/images/5/5a/Skymerchant.png' },
      { id:'merchant_honey', display_name:'Honey Merchant', type:'merchant', description:'Honey merchant items', icon:'https://static.wikia.nocookie.net/growagarden/images/6/61/Honeymerchant.png' }
    ];
    const all = (data || []).concat(merchants);
    const counts = {};
    all.forEach(it => counts[it.type] = (counts[it.type]||0)+1);
    const tabsWrap = document.getElementById('encTabs');
    tabsWrap.innerHTML = `<div class="tab active" data-type="all">All (${all.length})</div><div class="tab" data-type="recipes">Recipes</div>` + Object.keys(counts).map(t=>`<div class="tab" data-type="${esc(t)}">${esc(t)} (${counts[t]})</div>`).join('');
    tabsWrap.querySelectorAll('.tab').forEach(tab=>tab.addEventListener('click', ()=> {
      tabsWrap.querySelectorAll('.tab').forEach(x=>x.classList.remove('active')); tab.classList.add('active');
      const type = tab.dataset.type;
      if(type === 'all') renderEncRows(all);
      else if(type === 'recipes') renderRecipes();
      else renderEncRows(all.filter(i=>i.type===type));
    }));
    document.getElementById('encCounts').textContent = `${all.length} items`;
    const encSearch = document.getElementById('encSearch');
    encSearch.addEventListener('input', ()=> {
      const q = encSearch.value.trim().toLowerCase();
      if(!q) renderEncRows(all); else renderEncRows(all.filter(i=> (i.display_name||'').toLowerCase().includes(q) || (i.description||'').toLowerCase().includes(q)));
    });
    renderEncRows(all);
    window.__GG_ENC_ITEMS = (all || []).map(it => ({ name: it.display_name, icon: it.icon || IMAGE_API(it.display_name) }));
  }catch(e){
    document.getElementById('encBody').innerHTML = `<div class="small-muted">Error loading encyclopedia.</div>`;
  }

  async function renderEncRows(items){
    const body = document.getElementById('encBody');
    if(!items || items.length===0){ body.innerHTML = `<div class="small-muted">No results</div>`; return; }
    body.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px">${items.map(it=>{
      const icon = it.icon || IMAGE_API(it.display_name || it.id);
      const desc = it.description || '';
      return `<div class="card p-3 enc-card" data-name="${esc(it.display_name)}" data-id="${esc(it.id||'')}" style="cursor:pointer"><div style="display:flex;gap:10px;align-items:center"><img src="${icon}" style="width:64px;height:64px;border-radius:8px;object-fit:cover"><div style="flex:1"><div class="font-bold">${esc(it.display_name)}</div><div class="small-muted">${esc(it.type||'')}</div></div></div><div class="enc-detail small-muted mt-2" style="display:none">${esc(desc)}</div></div>`;
    }).join('')}</div>`;
    body.querySelectorAll('.enc-card').forEach(async card=>{
      const d = card.querySelector('.enc-detail');
      card.addEventListener('click', ()=> {
        if(!d) return;
        if(d.style.display === 'none'){ d.style.display='block'; d.style.maxHeight=d.scrollHeight+'px' } else { d.style.display='none'; d.style.maxHeight='0px' }
      });
      const nm = card.dataset.name;
      const id = card.dataset.id;
      if((nm && SEEDS.some(s=>s.toLowerCase()===nm.toLowerCase())) || (nm && GEARS.some(g=>g.toLowerCase()===nm.toLowerCase()))){
        try{
          if(id){
            const info = await getInfo(id);
            if(info){
              const lastCandidates = info.last_in_stock || info.last_seen || info.last_stock || info.last_in_stock_at || info.last_seen_at || info.last_seen_unix;
              let txt = '';
              if(typeof lastCandidates === 'string') txt = lastCandidates;
              else if(typeof lastCandidates === 'number') txt = new Date(lastCandidates*1000).toLocaleString();
              else if(info.last_in_stock && typeof info.last_in_stock === 'object' && info.last_in_stock.ts) txt = new Date(info.last_in_stock.ts).toLocaleString();
              if(txt){
                const el = document.createElement('div'); el.className='small-muted'; el.textContent = `Last in stock: ${txt}`;
                d.appendChild(el);
              }
            }
          }
        }catch(e){}
      }
    });
  }
  function renderRecipes(){
    const body = document.getElementById('encBody');
    const Recipes = [
      { id: "salad", name: "Salad", recipes: [["Tomato","Tomato"],["Tomato","Tomato","Corn"],["Strawberry","Bell Pepper"],["Onion","Pear"],["Blood Banana","Tomato"],["Tomato","Tomato","Tomato","Tomato","Tomato"],["Blood Banana","Blood Banana","Tomato","Tomato"]] },
      { id: "sandwich", name: "Sandwich", recipes: [["Tomato","Tomato","Corn"],["Apple","Tomato","Tomato","Corn","Bamboo"],["Bone Blossom","Elder Strawberry","Tomato","Tomato"]] },
      { id: "pie", name: "Pie", recipes: [["Pumpkin","Apple"],["Bamboo","Pumpkin","Cactus","Coconut","Tomato"],["Bone Blossom","Sugar Apple","Banana"],["Bone Blossom","Sugar Apple","Coconut"]] },
      { id: "waffle", name: "Waffle", recipes: [["Pumpkin","Sugar Apple"],["Sugar Apple","Coconut"],["Coconut","Strawberry"],["Bone Blossom","Sugar Apple","Pumpkin"],["Orange Tulip","Orange Tulip","Pumpkin","Watermelon","Orange Tulip"]] },
      { id: "hotdog", name: "Hot Dog", recipes: [["Pepper","Corn"],["Pepper","Corn","Tomato"],["Bone Blossom","Banana"],["Giant Pinecone","Apple","Watermelon","Mushroom","Corn"]] },
      { id: "icecream", name: "Ice Cream", recipes: [["Corn","Blueberry"],["Corn","Strawberry"],["Corn","Banana"],["Sugar Apple","Sugarglaze"]] },
      { id: "donut", name: "Donut", recipes: [["Corn","Blueberry","Strawberry"],["Bone Blossom","Sugar Apple","Banana"],["Sugarglaze","Bone Blossom","Bone Blossom","Bone Blossom","Bone Blossom"]] },
      { id: "pizza", name: "Pizza", recipes: [["Banana","Tomato"],["Ember Lily","Corn","Tomato"],["Giant Pinecone","Corn","Apple","Pepper","Strawberry"],["Strawberry","Pepper","Corn","Tomato"],["Violet Corn","Sugar Apple","Bone Blossom","Bone Blossom","Bone Blossom"]] },
      { id: "sushi", name: "Sushi", recipes: [["Corn","Bamboo","Elder Strawberry","Bone Blossom","Bone Blossom"],["Beanstalk","Banana","Bone Blossom","Bone Blossom","Bone Blossom"]] },
      { id: "cake", name: "Cake", recipes: [["Corn","Corn","Strawberry","Strawberry"],["Blueberry","Corn","Tomato"],["Ember Lily","Peach","Peach"],["Banana","Strawberry","Strawberry","Pumpkin"],["Corn","Watermelon","Watermelon"],["Corn","Banana","Watermelon"],["Blueberry","Grape","Apple","Corn"],["Kiwi","Banana","Corn"],["Banana","Blood Banana","Moon Melon","Soft Sunshine"],["Sugarglaze","Sugar Apple","Bone Blossom","Bone Blossom","Bone Blossom"],["Banana","Bone Blossom","Bone Blossom","Bone Blossom","Bone Blossom"],["Corn","Elder Strawberry","Elder Strawberry","Sugar Apple","Sugar Apple"]] },
      { id: "burger", name: "Burger", recipes: [["Pepper","Corn","Tomato"],["Corn","Bone Blossom","Banana"]] },
      { id: "smoothie", name: "Smoothie", recipes: [["Strawberry","Banana","Blueberry"],["Banana","Tomato","Sugarglaze","Bone Blossom"]] },
      { id: "candyapple", name: "Candy Apple", recipes: [["Sugar Apple","Apple"],["Sugarglaze","Apple"],["Banana","Apple","Sugarglaze"]] },
      { id: "sweettea", name: "Sweet Tea", recipes: [["Tea Leaves","Sugar Apple"],["Tea Leaves","Banana"],["Tea Leaves","Bone Blossom"]] },
      { id: "porridge", name: "Porridge", recipes: [["Corn","Banana","Tomato"],["Banana","Tomato","Sugarglaze","Bone Blossom"]] },
      { id: "spaghetti", name: "Spaghetti", recipes: [["Corn","Tomato","Pepper"],["Corn","Pepper","Bone Blossom"]] },
      { id: "corndog", name: "Corndog", recipes: [["Corn","Pepper","Bone Blossom"],["Corn","Banana","Bone Blossom"]] }
    ];
    body.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px">${Recipes.map(r=>`<div class="card p-3"><div class="font-bold">${esc(r.name)}</div><div class="small-muted mt-2">${r.recipes.length} recipes</div><div style="margin-top:10px;display:flex;flex-direction:column;gap:8px">${r.recipes.map(rc=>`<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">${rc.map(ing=>`<div class="chip">${esc(ing)}</div>`).join('')}</div>`).join('')}</div></div>`).join('')}</div>`;
  }
}

function getInfo(item_id){ if(!item_id) return Promise.resolve(null); return apiGet(API_INFO_BASE + item_id).catch(()=>null); }

async function renderCalculator(){
  const mb = document.getElementById('modalBody');
  mb.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:12px">
      <div style="display:flex;gap:12px">
        <div style="flex:1">
          <div class="font-bold">Crop</div>
          <div class="search-suggestions">
            <input id="calcCrop" class="input" placeholder="Name">
            <div id="suggestions" class="suggest-list" style="display:none"></div>
          </div>
        </div>
        <div style="width:160px"><div class="font-bold">Weight (kg)</div><input id="calcWeight" class="input" type="number" step="0.0001" placeholder="2.25"></div>
      </div>
      <div><div class="font-bold">Variant</div><div id="variantGroup" style="display:flex;gap:8px;margin-top:8px"></div></div>
      <div><div class="font-bold">Mutations</div><div id="mutationsGroup" class="mut-list"></div></div>
      <div style="display:flex;gap:8px;align-items:center"><div id="calcRun" class="chip" style="font-weight:700">Calculate</div><div id="calcResult" class="font-extrabold"></div></div>
    </div>
  `;
  const vwrap = mb.querySelector('#variantGroup'), mwrap = mb.querySelector('#mutationsGroup');
  const VARIANTS = [{id:'normal',label:'Normal'},{id:'silver',label:'Silver'},{id:'gold',label:'Gold'},{id:'rainbow',label:'Rainbow'}];
  VARIANTS.forEach(v=>{
    const btn = document.createElement('div'); btn.className = 'chip'; btn.textContent = v.label || 'None'; btn.dataset.val = v.id;
    btn.addEventListener('click', ()=> { vwrap.querySelectorAll('.chip').forEach(x=>x.classList.remove('selected')); btn.classList.add('selected'); });
    vwrap.appendChild(btn);
  });
  const selectedMuts = new Set();
  const MUTATIONS = [
{"id":"cyclonic","label":"Cyclonic"},{"id":"voidtouched","label":"Voidtouched"},{"id":"bloodlit","label":"Bloodlit"},{"id":"stormcharged","label":"Stormcharged"},{"id":"ancientamber","label":"AncientAmber"},{"id":"infernal","label":"Infernal"},
{"id":"honeyglazed","label":"HoneyGlazed"},{"id":"paradisal","label":"Paradisal"},{"id":"tempestuous","label":"Tempestuous"},{"id":"heavenly","label":"Heavenly"},{"id":"cracked","label":"Cracked"},{"id":"corruptfoxfirechakra","label":"CorruptFoxfireChakra"},
{"id":"spaghetti","label":"Spaghetti"},{"id":"plasma","label":"Plasma"},{"id":"aurora","label":"Aurora"},{"id":"pasta","label":"Pasta"},{"id":"ascendedchakra","label":"AscendedChakra"},{"id":"sauce","label":"Sauce"},
{"id":"enchanted","label":"Enchanted"},{"id":"luminous","label":"Luminous"},{"id":"amber","label":"Amber"},{"id":"boil","label":"Boil"},{"id":"enlightened","label":"Enlightened"},{"id":"jackpot","label":"Jackpot"},
{"id":"drenched","label":"Drenched"},{"id":"cooked","label":"Cooked"},{"id":"eclipsed","label":"Eclipsed"},{"id":"sliced","label":"Sliced"},{"id":"toxic","label":"Toxic"},{"id":"tranquil","label":"Tranquil"},
{"id":"ceramic","label":"Ceramic"},{"id":"alienlike","label":"Alienlike"},{"id":"shocked","label":"Shocked"},{"id":"touchdown","label":"Touchdown"},{"id":"foxfirechakra","label":"FoxfireChakra"},{"id":"blitzshock","label":"Blitzshock"},
{"id":"burnt","label":"Burnt"},{"id":"disco","label":"Disco"},{"id":"meatball","label":"Meatball"},{"id":"sundried","label":"Sundried"},{"id":"cloudtouched","label":"Cloudtouched"},{"id":"wiltproof","label":"Wiltproof"},
{"id":"glimmering","label":"Glimmering"},{"id":"corruptchakra","label":"CorruptChakra"},{"id":"gnomed","label":"Gnomed"},{"id":"aromatic","label":"Aromatic"},{"id":"windstruck","label":"Windstruck"},{"id":"brainrot","label":"Brainrot"},
{"id":"flaming","label":"Flaming"},{"id":"subzero","label":"Subzero"},{"id":"junkshock","label":"Junkshock"},{"id":"wet","label":"Wet"},{"id":"abyssal","label":"Abyssal"},{"id":"harmonisedchakra","label":"HarmonisedChakra"},
{"id":"gloom","label":"Gloom"},{"id":"acidic","label":"Acidic"},{"id":"maelstrom","label":"Maelstrom"},{"id":"rot","label":"Rot"},{"id":"chilled","label":"Chilled"},{"id":"bloom","label":"Bloom"},
{"id":"fortune","label":"Fortune"},{"id":"verdant","label":"Verdant"},{"id":"moonlit","label":"Moonlit"},{"id":"sandy","label":"Sandy"},{"id":"infected","label":"Infected"},{"id":"chakra","label":"Chakra"},
{"id":"lightcycle","label":"Lightcycle"},{"id":"clay","label":"Clay"},{"id":"cosmic","label":"Cosmic"},{"id":"corrupt","label":"Corrupt"},{"id":"celestial","label":"Celestial"},{"id":"twisted","label":"Twisted"},
{"id":"glitched","label":"Glitched"},{"id":"harmonisedfoxfirechakra","label":"HarmonisedFoxfireChakra"},{"id":"molten","label":"Molten"},{"id":"dawnbound","label":"Dawnbound"},{"id":"galactic","label":"Galactic"},{"id":"blazing","label":"Blazing"},
{"id":"fried","label":"Fried"},{"id":"zombified","label":"Zombified"},{"id":"pollinated","label":"Pollinated"},{"id":"oldamber","label":"OldAmber"},{"id":"frozen","label":"Frozen"},{"id":"meteoric","label":"Meteoric"},
{"id":"warped","label":"Warped"},{"id":"corrosive","label":"Corrosive"},{"id":"friendbound","label":"Friendbound"},{"id":"oil","label":"Oil"},{"id":"radioactive","label":"Radioactive"},{"id":"static","label":"Static"},
{"id":"choc","label":"Choc"},{"id":"beanbound","label":"Beanbound"}
  ];
  MUTATIONS.forEach(m=>{
    const chip = document.createElement('div'); chip.className = 'chip'; chip.textContent = m.label; chip.dataset.val = m.id;
    chip.addEventListener('click', ()=> { const id = chip.dataset.val; if(selectedMuts.has(id)){ selectedMuts.delete(id); chip.classList.remove('selected'); } else { selectedMuts.add(id); chip.classList.add('selected'); } });
    mwrap.appendChild(chip);
  });

  mb.querySelector('#calcRun').addEventListener('click', async ()=>{
    const crop = document.getElementById('calcCrop').value.trim(); const weight = Number(document.getElementById('calcWeight').value);
    const variantBtn = vwrap.querySelector('.chip.selected'); const variant = variantBtn ? variantBtn.dataset.val : '';
    const muts = [...selectedMuts]; if(!crop || !weight){ mb.querySelector('#calcResult').textContent = 'Enter Crop & Weight'; return; }
    try{
      const q = `?Name=${encodeURIComponent(crop)}&Weight=${encodeURIComponent(weight)}${variant?`&Variant=${encodeURIComponent(variant)}`:''}${muts.length?`&Mutation=${encodeURIComponent(muts.join(','))}`:''}`;
      const res = await fetch(`https://api.joshlei.com/v2/growagarden/calculate${q}`, { headers:{ 'accept':'application/json','jstudio-key':API_KEY }});
      const j = await res.json();
      const base = Number(j.value || 0);
      mb.querySelector('#calcResult').textContent = Math.ceil(base).toLocaleString();
    }catch(e){ mb.querySelector('#calcResult').textContent = 'Error'; }
  });

  const cropInput = mb.querySelector('#calcCrop');
  const suggestions = mb.querySelector('#suggestions');
  cropInput.addEventListener('input', ()=>{
    const q = cropInput.value.trim().toLowerCase();
    if(!q){ suggestions.style.display='none'; suggestions.innerHTML=''; return; }
    const items = (window.__GG_ENC_ITEMS || []).filter(Boolean);
    const matches = items.filter(i => (i.name||'').toLowerCase().includes(q)).slice(0,12);
    if(matches.length === 0){ suggestions.style.display='none'; suggestions.innerHTML=''; return; }
    suggestions.style.display='block';
    suggestions.innerHTML = matches.map(m => `<div class="suggest-item" data-name="${esc(m.name)}" style="display:flex;gap:8px;align-items:center;padding:8px;cursor:pointer"><img src="${m.icon || IMAGE_API(m.name)}" style="width:36px;height:36px;border-radius:6px;object-fit:cover"><div><div style="font-weight:700">${esc(m.name)}</div></div></div>`).join('');
    suggestions.querySelectorAll('.suggest-item').forEach(si=>{ si.addEventListener('click', ()=>{ cropInput.value = si.dataset.name; suggestions.style.display='none'; suggestions.innerHTML=''; }); });
  });
  document.addEventListener('click', e => { if(!document.getElementById('modalBody').contains(e.target)) { const s = document.getElementById('suggestions'); if(s) { s.style.display='none'; s.innerHTML=''; } } });
}

function updatePredTimersInDOM(){
  document.querySelectorAll('.pred-timer').forEach(el=>{
    const iso = el.dataset.next;
    if(iso) el.textContent = nextSeenText(iso);
  });
}
(function restoreWatches(){ for(const name of [...watchSet]) lastKnownQty[name] = findQtyInStock(latestStock, name) || 0; })();

(function init(){
  const dark = localStorage.getItem('gg_dark') === 'true';
  document.documentElement.classList.toggle('dark', dark);
  document.getElementById('darkToggle').addEventListener('click', ()=>{
    const now = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', now);
    localStorage.setItem('gg_dark', now ? 'true' : 'false');
  });
  document.addEventListener('click', ()=>{ if("Notification" in window && Notification.permission === 'default') Notification.requestPermission().catch(()=>{}); }, { once:true });
  setInterval(()=>{ updateTimersUI(); }, 10000);
})();
</script>
</body>
</html>
5
