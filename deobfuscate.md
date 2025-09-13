<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Grow a Garden — Stock Monitor (Updated)</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<link rel="icon" type="image/png" href="https://i.ibb.co/Xx1LNZLN/favicon.png">
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
  .icon-only{display:inline-flex}
  .modal{width:min(1100px,96vw);max-height:88vh;overflow:auto;border-radius:14px;padding:18px;border:1px solid var(--border);background:var(--card);box-shadow:var(--shadow)}
  .tab-row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px}
  .tab{padding:8px 12px;border-radius:10px;border:1px solid var(--border);cursor:pointer;background:var(--card)}
  .tab.active{background:linear-gradient(90deg,var(--accent),var(--accent-2));color:white;border-color:transparent;box-shadow:0 12px 30px rgba(43,108,255,0.12)}
  .weather-grid{display:grid;gap:12px;grid-template-columns:repeat(5,1fr)}
  @media(max-width:1200px){.weather-grid{grid-template-columns:repeat(4,1fr)}}
  @media(max-width:900px){.weather-grid{grid-template-columns:repeat(3,1fr)}}
  @media(max-width:600px){.weather-grid{grid-template-columns:repeat(2,1fr)}}
  .weather-card{padding:12px;border-radius:12px;border:1px solid var(--border);text-align:center;transition:transform .12s,border-color .12s,box-shadow .12s;background:linear-gradient(180deg,rgba(255,255,255,0.02),transparent);cursor:pointer;user-select:none}
  .weather-card:hover{transform:translateY(-6px);border-color:rgba(43,108,255,0.12);box-shadow:0 14px 32px rgba(43,108,255,0.06)}
  .weather-card.selected{background:linear-gradient(90deg,var(--accent),var(--accent-2));color:#fff;border-color:transparent;box-shadow:0 18px 36px rgba(43,108,255,0.12)}
  .weather-card .icon{width:56px;height:56px;border-radius:8px;object-fit:cover;margin:0 auto 8px}
  .chip{display:inline-flex;align-items:center;gap:8px;padding:8px 10px;border-radius:10px;border:1px solid var(--border);background:transparent;cursor:pointer;transition:all .12s;user-select:none}
  .chip:hover{transform:translateY(-3px)}
  .chip.selected{background:linear-gradient(90deg,var(--accent),var(--accent-2));color:white;border-color:transparent;box-shadow:0 12px 30px rgba(43,108,255,0.12)}
  .mut-list{display:flex;flex-wrap:wrap;gap:8px;max-height:260px;overflow:auto;padding:8px 0}
  .notify-btn{padding:8px 10px;border-radius:10px;border:1px solid var(--border);background:var(--card);cursor:pointer;display:flex;gap:8px;align-items:center;width:100%;text-align:left;transition:transform .12s,box-shadow .12s}
  .notify-btn:hover{transform:translateY(-3px)}
  .notify-btn.toggled{background:linear-gradient(90deg,var(--accent),var(--accent-2));color:white;border-color:transparent;box-shadow:0 12px 30px rgba(43,108,255,0.12)}
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
        <button id="darkToggle" class="nav-btn" title="Toggle theme" aria-label="Toggle theme"><span class="material-icons icon-only">dark_mode</span></button>
        <button id="calculatorBtn" class="nav-btn" title="Calculator" aria-label="Calculator"><span class="material-icons icon-only">calculate</span></button>
        <button id="encyclopediaBtn" class="nav-btn" title="Encyclopedia" aria-label="Encyclopedia"><span class="material-icons icon-only">menu_book</span></button>
        <button id="weatherBtn" class="nav-btn" title="Weather" aria-label="Weather"><span class="material-icons icon-only">cloud</span></button>
        <button id="stockPredictionsBtn" class="nav-btn" title="Stock Predictions" aria-label="Stock Predictions"><span class="material-icons icon-only">insights</span></button>
        <button id="openNotifications" class="nav-btn" title="Notifications" aria-label="Notifications"><span class="material-icons icon-only">notifications</span></button>
      </nav>
    </header>

    <main class="max-w-7xl mx-auto mt-6">
      <div class="flex items-center gap-4 mb-4">
        <div id="updatedAt" class="small-muted">—</div>
        <div class="flex-1"></div>
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
/* -------------- CONFIG -------------- */
const API_KEY = 'js_c5d322d0652bc477f50348450bb2c6fe4f4d767042b2b0facb69b074c3d46f46';
const API_STOCK = 'https://api.joshlei.com/v2/growagarden/stock';
const API_INFO_BASE = 'https://api.joshlei.com/v2/growagarden/info/';
const API_WEATHER = 'https://api.joshlei.com/v2/growagarden/weather';
const API_PRED = 'https://growagarden.gg/api/stock';
const IMAGE_API = name => `https://api.joshlei.com/v2/growagarden/image/${encodeURIComponent(String(name||'').trim().replace(/[^\w]+/g,'_'))}`;

const POLL_FULL_MS = 30000;
const PRED_POLL_MS = 60000;
const POLL_NOTIFY_MS = 3000; // check notifications frequently
const UI_REFRESH_MS = 995; // refresh UI timelines at ~1s but offset slightly (user requested 1s 995ms)

const SEEDS = ["Carrot","Strawberry","Blueberry","Tomato","Daffodil","Watermelon","Pumpkin","Apple","Bamboo","Coconut","Cactus","Dragon Fruit","Mango","Grape","Mushroom","Pepper","Cacao","Beanstalk","Ember lily","Sugar Apple","Burning Bud","Giant Pinecone","Elder Strawberry","Romanesco"];
const GEARS = ["Watering Can","Trowel","Recall Wrench","Basic Sprinkler","Advanced Sprinkler","Medium Toy","Medium Treat","Godly Sprinkler","Magnifying Glass","Master Sprinkler","Cleaning Spray","Cleansing Pet Shard","Favorite Tool","Harvest Tool","Friendship Pot","Grandmaster Sprinkler","Levelup Lolipop"];
const EGGS = ["Common Egg","Uncommon Egg","Rare Egg","Legendary Egg","Mythical Egg","Bug Egg"];

/* -------------- MUTATIONS & VARIANTS CONSTS (no API) -------------- */
const MUTATIONS = {
  cyclonic: { displayName: "Cyclonic", multiplier: 50 },
  voidtouched: { displayName: "Voidtouched", multiplier: 135 },
  bloodlit: { displayName: "Bloodlit", multiplier: 4 },
  stormcharged: { displayName: "Stormcharged", multiplier: 180 },
  ancientamber: { displayName: "AncientAmber", multiplier: 50 },
  infernal: { displayName: "Infernal", multiplier: 180 },
  honeyglazed: { displayName: "HoneyGlazed", multiplier: 5 },
  paradisal: { displayName: "Paradisal", multiplier: 100 },
  tempestuous: { displayName: "Tempestuous", multiplier: 12 },
  heavenly: { displayName: "Heavenly", multiplier: 5 },
  cracked: { displayName: "Cracked", multiplier: 4 },
  corruptfoxfirechakra: { displayName: "CorruptFoxfireChakra", multiplier: 90 },
  spaghetti: { displayName: "Spaghetti", multiplier: 15 },
  plasma: { displayName: "Plasma", multiplier: 5 },
  aurora: { displayName: "Aurora", multiplier: 90 },
  pasta: { displayName: "Pasta", multiplier: 3 },
  ascendedchakra: { displayName: "AscendedChakra", multiplier: 230 },
  sauce: { displayName: "Sauce", multiplier: 3 },
  enchanted: { displayName: "Enchanted", multiplier: 50 },
  luminous: { displayName: "Luminous", multiplier: 50 },
  amber: { displayName: "Amber", multiplier: 10 },
  boil: { displayName: "Boil", multiplier: 15 },
  enlightened: { displayName: "Enlightened", multiplier: 35 },
  jackpot: { displayName: "Jackpot", multiplier: 15 },
  drenched: { displayName: "Drenched", multiplier: 5 },
  cooked: { displayName: "Cooked", multiplier: 10 },
  eclipsed: { displayName: "Eclipsed", multiplier: 20 },
  sliced: { displayName: "Sliced", multiplier: 50 },
  toxic: { displayName: "Toxic", multiplier: 15 },
  tranquil: { displayName: "Tranquil", multiplier: 20 },
  ceramic: { displayName: "Ceramic", multiplier: 32 },
  alienlike: { displayName: "Alienlike", multiplier: 100 },
  shocked: { displayName: "Shocked", multiplier: 100 },
  touchdown: { displayName: "Touchdown", multiplier: 105 },
  foxfirechakra: { displayName: "FoxfireChakra", multiplier: 90 },
  blitzshock: { displayName: "Blitzshock", multiplier: 50 },
  burnt: { displayName: "Burnt", multiplier: 4 },
  disco: { displayName: "Disco", multiplier: 125 },
  meatball: { displayName: "Meatball", multiplier: 3 },
  sundried: { displayName: "Sundried", multiplier: 85 },
  cloudtouched: { displayName: "Cloudtouched", multiplier: 5 },
  wiltproof: { displayName: "Wiltproof", multiplier: 4 },
  glimmering: { displayName: "Glimmering", multiplier: 2 },
  corruptchakra: { displayName: "CorruptChakra", multiplier: 15 },
  gnomed: { displayName: "Gnomed", multiplier: 15 },
  aromatic: { displayName: "Aromatic", multiplier: 3 },
  windstruck: { displayName: "Windstruck", multiplier: 2 },
  brainrot: { displayName: "Brainrot", multiplier: 100 },
  flaming: { displayName: "Flaming", multiplier: 25 },
  subzero: { displayName: "Subzero", multiplier: 40 },
  junkshock: { displayName: "Junkshock", multiplier: 45 },
  wet: { displayName: "Wet", multiplier: 2 },
  abyssal: { displayName: "Abyssal", multiplier: 240 },
  harmonisedchakra: { displayName: "HarmonisedChakra", multiplier: 35 },
  gloom: { displayName: "Gloom", multiplier: 30 },
  acidic: { displayName: "Acidic", multiplier: 15 },
  maelstrom: { displayName: "Maelstrom", multiplier: 100 },
  rot: { displayName: "Rot", multiplier: 8 },
  chilled: { displayName: "Chilled", multiplier: 2 },
  bloom: { displayName: "Bloom", multiplier: 8 },
  fortune: { displayName: "Fortune", multiplier: 50 },
  verdant: { displayName: "Verdant", multiplier: 4 },
  moonlit: { displayName: "Moonlit", multiplier: 2 },
  sandy: { displayName: "Sandy", multiplier: 3 },
  infected: { displayName: "Infected", multiplier: 75 },
  chakra: { displayName: "Chakra", multiplier: 15 },
  lightcycle: { displayName: "Lightcycle", multiplier: 50 },
  clay: { displayName: "Clay", multiplier: 5 },
  cosmic: { displayName: "Cosmic", multiplier: 240 },
  corrupt: { displayName: "Corrupt", multiplier: 20 },
  celestial: { displayName: "Celestial", multiplier: 120 },
  twisted: { displayName: "Twisted", multiplier: 5 },
  glitched: { displayName: "Glitched", multiplier: 85 },
  harmonisedfoxfirechakra: { displayName: "HarmonisedFoxfireChakra", multiplier: 190 },
  molten: { displayName: "Molten", multiplier: 25 },
  dawnbound: { displayName: "Dawnbound", multiplier: 150 },
  galactic: { displayName: "Galactic", multiplier: 120 },
  blazing: { displayName: "Blazing", multiplier: 52 },
  fried: { displayName: "Fried", multiplier: 8 },
  zombified: { displayName: "Zombified", multiplier: 25 },
  pollinated: { displayName: "Pollinated", multiplier: 3 },
  oldamber: { displayName: "OldAmber", multiplier: 20 },
  frozen: { displayName: "Frozen", multiplier: 10 },
  meteoric: { displayName: "Meteoric", multiplier: 125 },
  warped: { displayName: "Warped", multiplier: 75 },
  corrosive: { displayName: "Corrosive", multiplier: 40 },
  friendbound: { displayName: "Friendbound", multiplier: 70 },
  oil: { displayName: "Oil", multiplier: 15 },
  radioactive: { displayName: "Radioactive", multiplier: 55 },
  static: { displayName: "Static", multiplier: 8 },
  choc: { displayName: "Choc", multiplier: 2 },
  beanbound: { displayName: "Beanbound", multiplier: 100 }
};

const VARIANTS = {
  normal: { displayName: "Normal", multiplier: 1 },
  silver: { displayName: "Silver", multiplier: 5 },
  gold: { displayName: "Gold", multiplier: 20 },
  rainbow: { displayName: "Rainbow", multiplier: 50 }
};

/* -------------- STATE -------------- */
function normalizeName(n){ return String(n||'').trim().toLowerCase().replace(/[^\w]+/g,'_'); }

let rawWatch = [];
try{ rawWatch = JSON.parse(localStorage.getItem('gg_watch')||'[]'); }catch(e){ rawWatch = []; }
let watchSet = new Set((rawWatch||[]).map(normalizeName));
localStorage.setItem('gg_watch', JSON.stringify([...watchSet]));

let rawWeatherWatch = [];
try{ rawWeatherWatch = JSON.parse(localStorage.getItem('gg_watch_weather')||'[]'); }catch(e){ rawWeatherWatch = []; }
let watchWeather = new Set(rawWeatherWatch || []);
localStorage.setItem('gg_watch_weather', JSON.stringify([...watchWeather]));

let rawLastQty = {};
try{ rawLastQty = JSON.parse(localStorage.getItem('gg_lastQty')||'{}'); }catch(e){ rawLastQty = {}; }
let lastKnownQty = {};
Object.keys(rawLastQty||{}).forEach(k => { lastKnownQty[normalizeName(k)] = Number(rawLastQty[k]||0); });
localStorage.setItem('gg_lastQty', JSON.stringify(lastKnownQty));

let latestStock = null;
let predMap = {};
let openCards = new Set();

/* -------------- DOM refs -------------- */
const categoriesEl = document.getElementById('categories');
const statusPill = document.getElementById('statusPill');
const updatedAt = document.getElementById('updatedAt');
const bottomTimersEl = document.getElementById('bottomTimers');

/* -------------- helpers -------------- */
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

function formatOnly(nextIso){
  if(!nextIso) return '';
  const t = new Date(nextIso).getTime();
  const diffSec = Math.floor((t - Date.now())/1000);
  const a = Math.abs(diffSec);
  let w = Math.floor(a/604800); let rem = a%604800;
  let d = Math.floor(rem/86400); rem%=86400;
  let h = Math.floor(rem/3600); rem%=3600;
  let m = Math.floor(rem/60); let s = rem%60;
  const parts = [];
  if(w) parts.push(w+'w'); if(d) parts.push(d+'d'); if(h) parts.push(h+'h'); if(m) parts.push(m+'m');
  if(parts.length === 0) parts.push(s+'s');
  if((h>0||d>0||w>0)){
    return parts.filter(p => !p.endsWith('s')).join(' ');
  }
  return parts.join(' ');
}

function timeAgoFromIso(isoOrUnix){
  if(!isoOrUnix) return '-';
  // support ISO string or unix seconds (number or numeric string)
  let ms = NaN;
  if(/^[0-9]+$/.test(String(isoOrUnix))){ ms = Number(isoOrUnix) * 1000; }
  else { ms = Date.parse(isoOrUnix); }
  if(isNaN(ms)) return '-';
  const secs = Math.floor((Date.now() - ms)/1000);
  if(secs < 0) return '-';
  return `${formatCountdownSeconds(secs)} ago`;
}

/* -------------- fetch/pred helpers -------------- */
async function tryFetchWithProxies(url){
  const proxies = [
    url,
    'https://api.allorigins.win/raw?url=' + encodeURIComponent(url),
    'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(url),
    'https://thingproxy.freeboard.io/fetch/' + url
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
      if(latestStock){
        if(Array.isArray(latestStock.nextSeen)) arr = latestStock.nextSeen;
        else if(Array.isArray(latestStock.predictions)) arr = latestStock.predictions;
      }
    }
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

/* -------------- stock fetch/render -------------- */
async function fetchStockFull(){
  try{
    const data = await apiGet(API_STOCK);
    latestStock = data;
    statusPill.textContent = 'Live';
    updatedAt.textContent = `Updated: ${new Date().toLocaleString()}`;
    await fetchPredictions().catch(()=>{});
    renderAllInPlace(data);

    // Build normalized quantity map
    const pools = [ ...(data.seed_stock||[]), ...(data.gear_stock||[]), ...(data.egg_stock||[]), ...(data.cosmetic_stock||[]), ...((data.travelingmerchant_stock && data.travelingmerchant_stock.stock) || []) ];
    const normMap = {};
    pools.forEach(it => { if(it && it.display_name) normMap[ normalizeName(it.display_name) ] = Number(it.quantity||0); });

    // For each watched item: if previously <=0 and now >0 notify immediately (handles cases where user had watch set while offline/previously zero)
    for(const n of [...watchSet]){
      const prev = Number(lastKnownQty[n] || 0);
      const nowQty = normMap[n] || 0;
      if(prev <= 0 && nowQty > 0){
        const poolMatch = pools.find(it => normalizeName(it.display_name||'') === n);
        const displayName = poolMatch ? poolMatch.display_name : n;
        tryNotify(`In stock: ${displayName}`, { body: `Quantity: ${nowQty}`, icon: (poolMatch && poolMatch.icon) ? poolMatch.icon : IMAGE_API(displayName) });
      }
      lastKnownQty[n] = nowQty;
    }
    localStorage.setItem('gg_lastQty', JSON.stringify(lastKnownQty));
  }catch(e){
    statusPill.textContent = 'Offline';
    console.warn('fetchStockFull error', e);
  }
}
fetchStockFull();
setInterval(fetchStockFull, POLL_FULL_MS);
fetchPredictions();
setInterval(fetchPredictions, PRED_POLL_MS);

/* find qty helpers */
function findQtyInStockByNormalized(stock, normalizedName){
  if(!stock) return 0;
  const pools = [stock.seed_stock||[], stock.gear_stock||[], stock.egg_stock||[], stock.cosmetic_stock||[], (stock.travelingmerchant_stock && stock.travelingmerchant_stock.stock) || []].flat();
  const it = pools.find(x => normalizeName(x.display_name || x.item_id || x.id || '') === normalizedName);
  return it ? Number(it.quantity||0) : 0;
}
function findQtyInStock(stock, displayName){
  if(!stock) return 0;
  const pools = [stock.seed_stock||[], stock.gear_stock||[], stock.egg_stock||[], stock.cosmetic_stock||[], (stock.travelingmerchant_stock && stock.travelingmerchant_stock.stock) || []].flat();
  const it = pools.find(x => (x.display_name || '').toLowerCase() === (displayName||'').toLowerCase());
  return it ? Number(it.quantity||0) : 0;
}

/* -------------- rendering -------------- */
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

  const merchantName = (data?.travelingmerchant_stock && (data.travelingmerchant_stock.merchantName || data.travelingmerchant_stock.merchantname || data.travelingmerchant_stock.name)) || 'Traveling Merchant';
  const specs = [
    { key:'seed_stock', title:'Seeds', items: data.seed_stock || [], col:0 },
    { key:'gear_stock', title:'Gears', items: data.gear_stock || [], col:1 },
    { key:'egg_stock', title:'Eggs', items: data.egg_stock || [], col:0 },
    { key:'cosmetic_stock', title:'Cosmetics', items: data.cosmetic_stock || [], col:1 },
    { key:'travelingmerchant_stock', title: `Merchant — ${merchantName}`, items: (data.travelingmerchant_stock && data.travelingmerchant_stock.stock) || [], col:0 }
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
      const predHtml = predIso ? `<div class="pred-timer" data-next="${esc(predIso)}">${esc(formatOnly(predIso))}</div>` : '';
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
  }

  updatePredTimersInDOM();
  updateTimersUI();
}

/* -------------- quick UI updates for quantities -------------- */
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
        predEl.textContent = formatOnly(iso);
      }
    });
  });
  updateTimersUI();
}

setInterval(()=>{
  document.querySelectorAll('.pred-timer').forEach(el=>{
    const iso = el.dataset.next;
    if(iso) el.textContent = formatOnly(iso);
  });
  quickUpdateUI(latestStock);
}, UI_REFRESH_MS);

/* -------------- timers UI -------------- */
function calculateNextTimes(now = Date.now()){
  const dayStart = new Date().setHours(0,0,0,0);
  const next = ms => dayStart + Math.ceil((now - dayStart) / ms) * ms;
  return {
    seedsNext: next(5*60*1000),
    gearNext: next(5*60*1000),
    eggsNext: next(30*60*1000),
    cosmeticsNext: next(4*60*60*1000),
    merchantNext: next(4*60*60*1000),
    fairyNext: next(60*60*1000),
    fairyRingNext: next(1.5*60*60*1000)
  };
}

let lastWeatherForTimers = null;
async function updateTimersUI(){
  try{
    const now = Date.now();
    const t = calculateNextTimes(now);
    const parts = [];
    parts.push(`Seeds: ${formatCountdownSeconds(Math.floor((t.seedsNext - now)/1000))}`);
    parts.push(`Gears: ${formatCountdownSeconds(Math.floor((t.gearNext - now)/1000))}`);
    parts.push(`Eggs: ${formatCountdownSeconds(Math.floor((t.eggsNext - now)/1000))}`);
    parts.push(`Cosmetics: ${formatCountdownSeconds(Math.floor((t.cosmeticsNext - now)/1000))}`);
    parts.push(`Merchant: ${formatCountdownSeconds(Math.floor((t.merchantNext - now)/1000))}`);
    parts.push(`Fairy Event: ${formatCountdownSeconds(Math.floor((t.fairyNext - now)/1000))}`);
    const ringStart = t.fairyRingNext;
    const ringActiveWindow = 10*60*1000;
    if(now >= ringStart && now < ringStart + ringActiveWindow){
      parts.push(`Fairy Ring: Active (${formatCountdownSeconds(Math.floor((ringStart + ringActiveWindow - now)/1000))})`);
    } else {
      parts.push(`Fairy Ring: ${formatCountdownSeconds(Math.floor((ringStart - now)/1000))}`);
    }

    const weather = await fetchWeatherList();
    lastWeatherForTimers = weather;
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
  }catch(e){
    console.warn('updateTimersUI error', e);
  }
}

/* -------------- modal & misc helpers -------------- */
function showModal(title, renderer){
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = 'Loading…';
  document.getElementById('modalOverlay').style.display = 'flex';
  try{ renderer(); }catch(e){ document.getElementById('modalBody').innerHTML = '<div class="small-muted">Error loading content</div>'; console.error(e); }
}
document.getElementById('closeModal').addEventListener('click', ()=> { document.getElementById('modalOverlay').style.display = 'none'; document.getElementById('modalBody').innerHTML = ''; });

document.getElementById('openNotifications').addEventListener('click', ()=> showModal('Notifications', renderNotifications) );
document.getElementById('stockPredictionsBtn').addEventListener('click', ()=> showModal('Stock Predictions', renderStockPredictions) );
document.getElementById('weatherBtn').addEventListener('click', ()=> showModal('Weather', renderWeatherModal) );
document.getElementById('encyclopediaBtn').addEventListener('click', ()=> showModal('Encyclopedia', renderEncyclopedia) );
document.getElementById('calculatorBtn').addEventListener('click', ()=> showModal('Calculator', renderCalculator) );

/* -------------- notification helpers -------------- */
function askNotificationPermission(){ if("Notification" in window && Notification.permission !== 'granted') Notification.requestPermission().catch(()=>{}); }
function tryNotify(title, opts){
  if(!("Notification" in window)) return;
  if(Notification.permission === 'granted'){
    try{ new Notification(title, opts); }catch(e){ console.warn('notify failed', e); }
  } else {
    Notification.requestPermission().then(p => { if(p === 'granted') new Notification(title, opts); }).catch(()=>{});
  }
}
askNotificationPermission();

/* -------------- notifications: ITEMS -------------- */
async function checkItemNotifications(){
  try{
    const data = await apiGet(API_STOCK);
    latestStock = data;
    const pools = [ ...(data.seed_stock||[]), ...(data.gear_stock||[]), ...(data.egg_stock||[]), ...(data.cosmetic_stock||[]), ...((data.travelingmerchant_stock && data.travelingmerchant_stock.stock) || []) ];
    const normMap = {};
    pools.forEach(it => { if(it && it.display_name) normMap[ normalizeName(it.display_name) ] = Number(it.quantity||0); });

    for(const n of [...watchSet]){
      if(lastKnownQty[n] == null) lastKnownQty[n] = normMap[n] || 0;
    }

    for(const n of [...watchSet]){
      const prevRaw = lastKnownQty[n];
      const prev = (prevRaw == null) ? 0 : Number(prevRaw||0);
      const nowQty = normMap.hasOwnProperty(n) ? normMap[n] : 0;
      if(prev <= 0 && nowQty > 0){
        const poolMatch = pools.find(it => normalizeName(it.display_name || '') === n);
        const displayName = poolMatch ? poolMatch.display_name : n;
        tryNotify(`In stock: ${displayName}`, { body: `Quantity: ${nowQty}`, icon: (poolMatch && poolMatch.icon) ? poolMatch.icon : IMAGE_API(displayName) });
      }
      lastKnownQty[n] = nowQty;
    }
    localStorage.setItem('gg_lastQty', JSON.stringify(lastKnownQty));
  }catch(e){ console.warn('checkItemNotifications failed', e); }
}
checkItemNotifications();
setInterval(()=>{ checkItemNotifications().catch(()=>{}); }, POLL_NOTIFY_MS);

/* -------------- notifications: WEATHER (active triggers only) -------------- */
let notifiedSoon = {};
let notifiedActive = {};
async function checkWeatherNotifications(){
  try{
    const list = await fetchWeatherList();
    const now = Math.floor(Date.now()/1000);

    for(const w of (list||[])){
      if(!w) continue;
      const id = w.weather_id || canonical(w.weather_name || '');
      const name = w.weather_name || id;
      const active = !!w.active;

      if(active){
        if(watchWeather.has(id) && !notifiedActive[id]){
          tryNotify(`${name} active`, { body: `${name} is active`, icon: w.icon || IMAGE_API(name) });
          notifiedActive[id] = Date.now();
        }
        if(notifiedSoon[id]) delete notifiedSoon[id];
        continue;
      }

      if(notifiedActive[id] && !active) delete notifiedActive[id];

      let secondsUntilStart = null;
      if(typeof w.start_duration_unix === 'number' && w.start_duration_unix > 0){
        secondsUntilStart = w.start_duration_unix - now;
      }

      const PRE_NOTIFY_SECONDS = 5 * 60;
      if(secondsUntilStart != null && secondsUntilStart > 0 && secondsUntilStart <= PRE_NOTIFY_SECONDS && watchWeather.has(id) && !notifiedSoon[id]){
        tryNotify(`${name} starting soon`, { body: `${name} starts in ${formatCountdownSeconds(secondsUntilStart)}`, icon: w.icon || IMAGE_API(name) });
        notifiedSoon[id] = Date.now();
      }
    }
  }catch(e){ console.warn('checkWeatherNotifications error', e); }
}
setInterval(()=>{ checkWeatherNotifications().catch(()=>{}); }, POLL_NOTIFY_MS);

/* -------------- UI for notification management -------------- */
function makeNotifyButton(name, checkedNormalized, qty=0){
  const btn = document.createElement('button');
  btn.className = 'notify-btn' + (checkedNormalized ? ' toggled' : '');
  btn.innerHTML = `<img src="${IMAGE_API(name)}" style="width:40px;height:40px;border-radius:6px;object-fit:cover"><div style="flex:1"><div style="font-weight:700">${esc(name)}</div><div class="small-muted">Quantity: ${qty}</div></div>`;
  btn.addEventListener('click', ()=>{
    const n = normalizeName(name);
    const is = watchSet.has(n);
    if(is){
      watchSet.delete(n); btn.classList.remove('toggled'); delete lastKnownQty[n];
    } else {
      watchSet.add(n); btn.classList.add('toggled');
      const currentQty = findQtyInStock(latestStock, name) || 0;
      // seed lastKnownQty to current qty, but also immediately notify if currently in stock
      const prev = Number(lastKnownQty[n] || 0);
      lastKnownQty[n] = currentQty;
      if(currentQty > 0 && prev <= 0){
        tryNotify(`In stock: ${name}`, { body: `Quantity: ${currentQty}`, icon: IMAGE_API(name) });
      }
    }
    localStorage.setItem('gg_watch', JSON.stringify([...watchSet]));
    localStorage.setItem('gg_lastQty', JSON.stringify(lastKnownQty));
    askNotificationPermission();
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
  mb.querySelector('#clearAll').addEventListener('click', ()=> { watchSet.clear(); watchWeather.clear(); lastKnownQty = {}; localStorage.setItem('gg_watch', JSON.stringify([...watchSet])); localStorage.setItem('gg_watch_weather', JSON.stringify([...watchWeather])); localStorage.setItem('gg_lastQty', JSON.stringify(lastKnownQty)); renderNotifications(); });
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
  SEEDS.forEach(name => seedGrid.appendChild(makeNotifyButton(name, watchSet.has(normalizeName(name)), findQtyInStock(latestStock, name))));
  GEARS.forEach(name => gearGrid.appendChild(makeNotifyButton(name, watchSet.has(normalizeName(name)), findQtyInStock(latestStock, name))));
  EGGS.forEach(name => eggGrid.appendChild(makeNotifyButton(name, watchSet.has(normalizeName(name)), findQtyInStock(latestStock, name))));
}

async function renderNotificationsWeather(){
  const cont = document.getElementById('notifContent');
  cont.innerHTML = `<div class="small-muted mb-2">Active first. Click a card to toggle notifications. You will receive a device notification when watched weather becomes active.</div><div id="weatherGrid" class="weather-grid"></div>`;
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
      card.setAttribute('data-id', id);
      card.innerHTML = `${w.active ? '<div style="margin-bottom:6px" class="badge">Active</div>' : ''}<img src="${icon}" class="icon" alt="${esc(name)}"><div class="font-bold">${esc(name)}</div><div class="small-muted" data-cd>${esc(w.active?cd:'')}</div>`;
      grid.appendChild(card);
      card.addEventListener('click', ()=>{
        if(watchWeather.has(id)){ watchWeather.delete(id); card.classList.remove('selected'); } else { watchWeather.add(id); card.classList.add('selected'); }
        localStorage.setItem('gg_watch_weather', JSON.stringify([...watchWeather]));
      });
    });
  }catch(e){ grid.innerHTML = `<div class="small-muted">Error loading weather.</div>`; console.warn(e); }
}

function renderNotificationsMerchants(){
  const cont = document.getElementById('notifContent');
  const MERCHANTS = [
    { id: 'gnome', name: 'Gnome Merchant', img: 'https://static.wikia.nocookie.net/growagarden/images/8/8d/Gnome_shop.png/revision/latest?cb=20250725060720', desc: 'Sells Common/Classic/Farmers/Iconic Gnome Crates, and Gnome pet', sells: ['Common Gnome Crate','Farmers Gnome Crate','Classic Gnome Crate','Iconic Gnome Crate','Gnome Pet'] },
    { id: 'sky', name: 'Sky Merchant', img: 'https://static.wikia.nocookie.net/growagarden/images/5/5a/Skymerchant.png/revision/latest/scale-to-width-down/1000?cb=20250731181923', desc: 'Sells Night Staff, Star Caller, Cloudtouched Spray', sells: ['Night Staff','Star Caller','Mutation Spray Cloudtouched'] },
    { id: 'honey', name: 'Honey Merchant', img: 'https://static.wikia.nocookie.net/growagarden/images/6/61/Honeymerchant.png/revision/latest/scale-to-width-down/1000?cb=20250725054840', desc: 'Sells Bee Egg, Honey Sprinkler, Flower Seed Pack, Bee Crate, Honey Crafters Crate', sells: ['Flower Seed Pack','Honey Sprinkler','Bee Egg','Bee Crate','Honey Crafters Crate'] }
  ];

  cont.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:12px">${MERCHANTS.map(m=>`<div class="card p-3"><div style="display:flex;gap:12px"><img src="${m.img}" style="width:120px;height:120px;border-radius:8px;object-fit:cover"><div style="flex:1"><div class="font-bold">${esc(m.name)}</div><div class="small-muted">${esc(m.desc)}</div><div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:8px">${m.sells.map(s=>`<button class="notify-btn ${watchSet.has(normalizeName(s))?'toggled':''}" data-item="${esc(s)}"><img src="${IMAGE_API(s)}" style="width:28px;height:28px;border-radius:6px;object-fit:cover"><div style="flex:1">${esc(s)}</div></button>`).join('')}</div></div></div></div>`).join('')}</div>`;
  cont.querySelectorAll('button[data-item]').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const nm = e.currentTarget.dataset.item;
      const n = normalizeName(nm);
      if(watchSet.has(n)){ watchSet.delete(n); e.currentTarget.classList.remove('toggled'); delete lastKnownQty[n]; }
      else {
        watchSet.add(n); e.currentTarget.classList.add('toggled');
        const currentQty = findQtyInStock(latestStock, nm) || 0;
        const prev = Number(lastKnownQty[n] || 0);
        lastKnownQty[n] = currentQty;
        if(currentQty > 0 && prev <= 0){
          tryNotify(`Merchant item: ${nm}`, { body: `Quantity: ${currentQty}`, icon: IMAGE_API(nm) });
        }
      }
      localStorage.setItem('gg_watch', JSON.stringify([...watchSet]));
      localStorage.setItem('gg_lastQty', JSON.stringify(lastKnownQty));
      askNotificationPermission();
    });
  });
}

/* -------------- stock predictions, weather modal, encyclopedia, calculator -------------- */
async function renderStockPredictions(){
  const mb = document.getElementById('modalBody');
  mb.innerHTML = `<div id="predWrap">Loading…</div>`;
  const wrap = document.getElementById('predWrap');
  try{
    await fetchPredictions();
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

    async function resolveLastSeen(name){
      // try to find in latestStock pools first
      try{
        const pools = [ ...(latestStock?.seed_stock||[]), ...(latestStock?.gear_stock||[]), ...(latestStock?.egg_stock||[]), ...(latestStock?.cosmetic_stock||[]), ...((latestStock?.travelingmerchant_stock && latestStock.travelingmerchant_stock.stock) || []) ];
        const match = pools.find(p => ((p.display_name||'').toLowerCase() === (name||'').toLowerCase()) || (normalizeName(p.display_name||'') === normalizeName(name||'')));
        if(match){
          return match.last_seen || match.lastSeen || match.last_seen_at || match.lastSeenISO || match.lastSeenAt || null;
        }
      }catch(e){}
      // fallback: try item info endpoint by canonical id
      try{
        const id = canonical(name);
        const info = await apiGet(API_INFO_BASE + encodeURIComponent(id));
        if(info){ return info.last_seen || info.lastSeen || info.last_seen_at || info.lastSeenISO || null; }
      }catch(e){}
      return null;
    }

    function renderList(list){
      if(!list || list.length===0) return '<div class="small-muted">No predictions</div>';
      return `<div style="display:grid;gap:8px">${list.map(it=>{
        return `<div class="card p-2" style="display:flex;gap:10px;align-items:center" data-name="${esc(it.name)}"><img src="${IMAGE_API(it.name)}" style="width:40px;height:40px;border-radius:6px;object-fit:cover"><div style="flex:1"><div class="font-bold">${esc(it.name)}</div><div class="small-muted" data-next="${esc(it.nextSeen||'')}">In: ${esc(it.nextSeen ? formatOnly(it.nextSeen) : '-')} — Ago: <span class="lastseen">Loading…</span></div></div></div>`;
      }).join('')}</div>`;
    }

    wrap.innerHTML = `<h3 class="font-bold">Seeds</h3>${renderList(seeds)}<h3 class="font-bold mt-4">Gears</h3>${renderList(gears)}`;

    // Resolve last-seen times asynchronously and patch DOM
    const cards = wrap.querySelectorAll('.card[data-name]');
    for(const card of cards){
      const nm = card.getAttribute('data-name');
      const lastSeenRaw = await resolveLastSeen(nm);
      const lastEl = card.querySelector('.lastseen');
      if(lastEl){ lastEl.textContent = lastSeenRaw ? timeAgoFromIso(lastSeenRaw) : '-'; }
    }

  }catch(e){
    wrap.innerHTML = `<div class="small-muted">No predictions</div>`;
    console.warn(e);
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
      return `<div class="weather-card" data-id="${esc(w.weather_id||canonical(name))}">${activeBadge}<img src="${icon}" class="icon" alt="${esc(name)}"><div class="font-bold">${esc(name)}</div><div class="small-muted" data-cd>${esc(w.active?cd:'')}</div></div>`;
    }).join('')}</div>`;
    wrap.querySelectorAll('.weather-card').forEach(card=>{
      const id = card.dataset.id;
      if(watchWeather.has(id)) card.classList.add('selected');
      card.addEventListener('click', ()=>{
        if(watchWeather.has(id)){ watchWeather.delete(id); card.classList.remove('selected'); } else { watchWeather.add(id); card.classList.add('selected'); }
        localStorage.setItem('gg_watch_weather', JSON.stringify([...watchWeather]));
      });
    });
  }catch(e){
    wrap.innerHTML = `<div class="small-muted">Error loading weather.</div>`;
    console.warn(e);
  }
}

async function renderEncyclopedia(){
  const mb = document.getElementById('modalBody');
  mb.innerHTML = `<div style="display:flex;flex-direction:column;gap:8px"><div style="display:flex;gap:8px"><input id="encSearch" class="input" placeholder="Search items, mutations, weather..."><div id="encCounts" class="small-muted"></div></div><div id="encTabs" class="tab-row"></div><div id="encBody"></div></div>`;
  try{
    const data = await apiGet('https://api.joshlei.com/v2/growagarden/info');
    // include user-supplied fruits data into the encyclopedia list
    const FRUITS_CONST = [
      { item_id: 'carrot', display_name: 'Carrot', baseValue: 20, weightDivisor: 0.275 }
    ];

    const merchants = [
      { id:'merchant_gnome', display_name:'Gnome Merchant', type:'merchant', description:'Sells crates & pet', icon:'https://static.wikia.nocookie.net/growagarden/images/8/8d/Gnome_shop.png' },
      { id:'merchant_sky', display_name:'Sky Merchant', type:'merchant', description:'Sky merchant items', icon:'https://static.wikia.nocookie.net/growagarden/images/5/5a/Skymerchant.png' },
      { id:'merchant_honey', display_name:'Honey Merchant', type:'merchant', description:'Honey merchant items', icon:'https://static.wikia.nocookie.net/growagarden/images/6/61/Honeymerchant.png' }
    ];

    // normalize info items (API may return array or object map)
    const infoItems = Array.isArray(data) ? data.slice() : (data.items || []);

    // convert fruits into encyclopedia items and merge
    const fruitItems = FRUITS_CONST.map(f => ({ id: f.item_id || f.itemId || f.id, display_name: f.display_name || f.displayName || f.name || '', type: 'fruit', description: `Base value: ${f.baseValue}, Weight divisor: ${f.weightDivisor}`, icon: IMAGE_API(f.display_name || f.item_id) }));

    const all = infoItems.concat(merchants).concat(fruitItems);
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
    window.__GG_ENC_ITEMS = (all || []).map(it => ({ name: it.display_name, icon: it.icon || IMAGE_API(it.display_name), type: it.type }));
  }catch(e){
    document.getElementById('encBody').innerHTML = `<div class="small-muted">Error loading encyclopedia.</div>`;
    console.warn(e);
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
    });
  }
  function renderRecipes(){
    const body = document.getElementById('encBody');
    const Recipes = [
      { id: "salad", name: "Salad", recipes: [["Tomato","Tomato"],["Tomato","Tomato","Corn"],["Strawberry","Bell Pepper"],["Onion","Pear"],["Blood Banana","Tomato"],["Tomato","Tomato","Tomato","Tomato","Tomato"],["Blood Banana","Blood Banana","Tomato","Tomato"]] },
      { id: "sandwich", name: "Sandwich", recipes: [["Tomato","Tomato","Corn"],["Apple","Tomato","Tomato","Corn","Bamboo"],["Bone Blossom","Elder Strawberry","Tomato","Tomato"]] }
    ];
    body.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px">${Recipes.map(r=>`<div class="card p-3"><div class="font-bold">${esc(r.name)}</div><div class="small-muted mt-2">${r.recipes.length} recipes</div><div style="margin-top:10px;display:flex;flex-direction:column;gap:8px">${r.recipes.map(rc=>`<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">${rc.map(ing=>`<div class="chip">${esc(ing)}</div>`).join('')}</div>`).join('')}</div></div>`).join('')}</div>`;
  }
}

/* -------------- calculator (improved — variants & mutations from const) -------------- */
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
      <div id="calcBreakdown" class="small-muted"></div>
    </div>
  `;

  const vwrap = mb.querySelector('#variantGroup'), mwrap = mb.querySelector('#mutationsGroup');
  const resultEl = mb.querySelector('#calcResult');
  const breakdownEl = mb.querySelector('#calcBreakdown');
  const CALC_API = 'https://api.joshlei.com/v2/growagarden/calculate';

  // Populate variants & mutations from constants (no API)
  async function populateCalcMeta(name){
    vwrap.innerHTML = '';
    mwrap.innerHTML = '';
    // Use VARIANTS constant
    Object.entries(VARIANTS).forEach(([id,obj])=>{
      const label = obj.displayName || id;
      const mult = obj.multiplier || obj.mult || 1;
      const btn = document.createElement('div');
      btn.className = 'chip';
      btn.textContent = `${label} (${mult}x)`;
      btn.dataset.val = id;
      btn.dataset.mult = String(mult);
      btn.addEventListener('click', ()=> { vwrap.querySelectorAll('.chip').forEach(x=>x.classList.remove('selected')); btn.classList.add('selected'); });
      vwrap.appendChild(btn);
    });

    // Use MUTATIONS constant
    Object.entries(MUTATIONS).forEach(([id,obj])=>{
      const label = obj.displayName || id;
      const mult = obj.multiplier || obj.mult || 1;
      const chip = document.createElement('div');
      chip.className = 'chip';
      chip.textContent = `${label} (${mult}x)`;
      chip.dataset.val = id;
      chip.dataset.mult = String(mult);
      chip.addEventListener('click', ()=> chip.classList.toggle('selected'));
      mwrap.appendChild(chip);
    });
  }

  mb.querySelector('#calcRun').addEventListener('click', async ()=>{
    const crop = document.getElementById('calcCrop').value.trim(); const weight = Number(document.getElementById('calcWeight').value);
    const variantBtn = vwrap.querySelector('.chip.selected'); const variant = variantBtn ? variantBtn.dataset.val : '';
    const muts = [...mwrap.querySelectorAll('.chip.selected')].map(c=>c.dataset.val);
    if(!crop || !weight){ resultEl.textContent = 'Enter Crop & Weight'; return; }
    try{
      const q = `?Name=${encodeURIComponent(crop)}&Weight=${encodeURIComponent(weight)}${variant?`&Variant=${encodeURIComponent(variant)}`:''}${muts.length?`&Mutation=${encodeURIComponent(muts.join(','))}`:''}`;
      const res = await fetch(`${CALC_API}${q}`, { headers:{ 'accept':'application/json','jstudio-key':API_KEY }});
      if(!res.ok){ resultEl.textContent = 'Error'; return; }
      const j = await res.json();
      const base = Number(j.value || j.result || j.price || 0);
      resultEl.textContent = Math.ceil(base).toLocaleString();

      // show a simple breakdown: prefer multipliers from constants, otherwise from response
      let mutMap = {};
      // If response provides mutations list, map them
      if(Array.isArray(j.mutations) && j.mutations.length){
        j.mutations.forEach(m=> mutMap[m.mutation_id || m.id || m.name] = {label: m.display_name || m.label || m.name, mult: m.multiplier || m.mult || (MUTATIONS[m.mutation_id || m.id || m.name]?.multiplier || 1) });
      } else {
        // build from selected chips (use our MUTATIONS const if available)
        mwrap.querySelectorAll('.chip.selected').forEach(c => {
          const val = c.dataset.val;
          mutMap[val] = {
            label: (MUTATIONS[val] && MUTATIONS[val].displayName) ? MUTATIONS[val].displayName : c.textContent.split(' (')[0],
            mult: Number((MUTATIONS[val] && MUTATIONS[val].multiplier) ? MUTATIONS[val].multiplier : (c.dataset.mult || 1))
          };
        });
      }

      const variantMult = variantBtn ? Number(variantBtn.dataset.mult || 1) : 1;
      const breakdownParts = [];
      breakdownParts.push(`Variant multiplier: ${variantMult}x`);
      const mutList = Object.keys(mutMap);
      if(mutList.length) breakdownParts.push('Mutations: ' + mutList.map(k=>`${mutMap[k].label} (${mutMap[k].mult}x)`).join(', '));
      if(j.explanation) breakdownParts.push(`Notes: ${j.explanation}`);
      breakdownEl.textContent = breakdownParts.join(' — ');
    }catch(e){ resultEl.textContent = 'Error'; console.warn(e); }
  });

  const cropInput = mb.querySelector('#calcCrop');
  const suggestions = mb.querySelector('#suggestions');
  cropInput.addEventListener('input', async ()=>{
    const items = (window.__GG_ENC_ITEMS || []);
    const q = cropInput.value.trim().toLowerCase();
    if(!q){ suggestions.style.display='none'; suggestions.innerHTML=''; return; }
    const matches = items.filter(i => (i.name||'').toLowerCase().includes(q)).slice(0,12);
    if(matches.length === 0){ suggestions.style.display='none'; suggestions.innerHTML=''; return; }
    suggestions.style.display='block';
    suggestions.innerHTML = matches.map(m => `<div class="suggest-item" data-name="${esc(m.name)}" style="display:flex;gap:8px;align-items:center;padding:8px;cursor:pointer"><img src="${m.icon || IMAGE_API(m.name)}" style="width:36px;height:36px;border-radius:6px;object-fit:cover"><div><div style="font-weight:700">${esc(m.name)}</div></div></div>`).join('');
    suggestions.querySelectorAll('.suggest-item').forEach(si=>{ si.addEventListener('click', async ()=>{ cropInput.value = si.dataset.name; suggestions.style.display='none'; suggestions.innerHTML=''; await populateCalcMeta(si.dataset.name); }); });
  });

  // when the crop input loses focus (and has value) attempt to populate variants & mutations (from consts)
  cropInput.addEventListener('blur', async ()=>{ const n = cropInput.value.trim(); if(n) await populateCalcMeta(n); });

  function onDocClick(e){ const mbNode = document.getElementById('modalBody'); if(!mbNode) return; if(!mbNode.contains(e.target)) { const s = document.getElementById('suggestions'); if(s) { s.style.display='none'; s.innerHTML=''; } } }
  document.removeEventListener('click', onDocClick);
  document.addEventListener('click', onDocClick);

  // Pre-populate with constants right away so users see options even before selecting a crop
  await populateCalcMeta('');
}

/* -------------- misc helpers -------------- */
function updatePredTimersInDOM(){
  document.querySelectorAll('.pred-timer').forEach(el=>{
    const iso = el.dataset.next;
    if(iso) el.textContent = formatOnly(iso);
  });
}

/* -------------- WEATHER UI REFRESH (every ~1s) -------------- */
async function refreshWeatherUI(){
  try{
    const list = await fetchWeatherList();
    const nowSec = Math.floor(Date.now()/1000);

    const weatherGrid = document.querySelector('#modalBody .weather-grid');
    if(weatherGrid){
      weatherGrid.querySelectorAll('.weather-card').forEach(card => {
        const id = card.dataset.id;
        const w = list.find(x => (x && ( (x.weather_id && x.weather_id === id) || (x.weather_name && canonical(x.weather_name) === id) )));
        const cdEl = card.querySelector('[data-cd]');
        const activeBadge = card.querySelector('.badge');
        if(!w){
          if(activeBadge) activeBadge.remove();
          if(cdEl) cdEl.textContent = '';
          return;
        }
        if(w.active){
          if(!activeBadge){
            const badge = document.createElement('div'); badge.className = 'badge'; badge.style.marginBottom = '6px'; badge.textContent = 'Active';
            card.insertBefore(badge, card.firstChild);
          }
          if(cdEl && w.end_duration_unix) cdEl.textContent = formatCountdownSeconds(w.end_duration_unix - nowSec);
        } else {
          if(activeBadge) activeBadge.remove();
          if(cdEl){
            if(w.duration) cdEl.textContent = formatCountdownSeconds(w.duration);
            else cdEl.textContent = '';
          }
        }
      });
    }

    updateTimersUI();
  }catch(e){}
}
setInterval(()=>{ refreshWeatherUI().catch(()=>{}); }, UI_REFRESH_MS);

/* -------------- init -------------- */
(function init(){
  const dark = localStorage.getItem('gg_dark') === 'true';
  document.documentElement.classList.toggle('dark', dark);
  document.getElementById('darkToggle').addEventListener('click', ()=>{
    const now = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', now);
    localStorage.setItem('gg_dark', now ? 'true' : 'false');
  });
  document.addEventListener('click', ()=>{ if("Notification" in window && Notification.permission === 'default') Notification.requestPermission().catch(()=>{}); }, { once:true });

  // live timers refresh
  setInterval(()=>{ updateTimersUI(); }, UI_REFRESH_MS);
})();
</script>
</body>
</html>
