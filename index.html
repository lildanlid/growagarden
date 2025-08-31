<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Grow a Garden — Stock Monitor</title>
<link rel="icon" href="https://raw.githubusercontent.com/lildanlid/growagarden/refs/heads/main/images/favicon.png" type="image/png">
<style>
:root{
  --bg:#f6f7fb; --card:#fff; --text:#1f2330; --muted:#707789;
  --accent:#6b7cff; --accent-2:#50e3c2; --border:#e6e8f0;
  --good:#18a957; --bad:#e24a4a; --shadow:0 6px 20px rgba(0,0,0,.08);
  --glass-bg: rgba(255,255,255,0.6);
  --icon-filter:none; 
  --btn-dark-bg: rgba(255,255,255,0.06);
  --hover-ease: cubic-bezier(.2,.9,.2,1);
  --select-blue: #2b6cff;
  --select-blue-rgba: 43,108,255;
}
html.dark{
  --bg:#0d0f15; --card:#0f1720; --text:#dfe6ff; --muted:#9aa3b2;
  --accent:#8d9bff; --accent-2:#65f2d0; --border:#1e2433;
  --shadow:0 10px 32px rgba(0,0,0,.6); --glass-bg: rgba(8,12,18,0.55);
  --icon-filter: invert(1) brightness(2);
  --btn-dark-bg: linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
}

*{box-sizing:border-box}
body{margin:0;font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Arial; background:var(--bg); color:var(--text); -webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}

/* (styles same as before - omitted here for brevity in explanation) */
header{position:sticky;top:0;z-index:60;backdrop-filter:saturate(120%) blur(8px);background:linear-gradient(180deg, rgba(0,0,0,.04), rgba(0,0,0,0));}
.bar{display:flex;align-items:center;gap:10px;padding:12px 18px;max-width:1200px;margin:0 auto;}
.title{font-weight:800;letter-spacing:.3px;font-size:18px;display:flex;align-items:center;gap:10px}
.pill{padding:4px 10px;border-radius:999px;background:var(--card);border:1px solid var(--border);color:var(--muted);font-size:12px}
.spacer{flex:1}

button.icon{border:none;background:var(--card);border:1px solid var(--border);box-shadow:var(--shadow);width:38px;height:38px;border-radius:12px;display:grid;place-items:center;cursor:pointer;transition: transform .14s var(--hover-ease), box-shadow .14s var(--hover-ease), background .12s var(--hover-ease);} 
button.icon:hover{transform:translateY(-4px);box-shadow:0 18px 36px rgba(0,0,0,0.12);} 
button.icon img{width:18px;height:18px;display:block;filter:var(--icon-filter);transition:filter .12s ease}

html.dark button.icon{ background: var(--btn-dark-bg); border-color:var(--border); }

.row{max-width:1200px;margin:0 auto;padding:18px}
.categories{display:grid;grid-template-columns:1fr;gap:14px}
@media(min-width:880px){.categories{grid-template-columns:1fr 1fr}}
@media(min-width:1180px){.categories{grid-template-columns:1fr 1fr}}

.card{background:var(--card);border:1px solid var(--border);border-radius:14px;box-shadow:var(--shadow);overflow:hidden;transition: transform .14s var(--hover-ease), box-shadow .14s var(--hover-ease);} 
.card:hover{transform:translateY(-6px);box-shadow:0 20px 48px rgba(0,0,0,0.12)}
.card-header{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;cursor:pointer}
.card-header h2{margin:0;font-size:16px}
.badge{background:linear-gradient(135deg,var(--accent),var(--accent-2));color:#fff;padding:4px 10px;font-size:12px;border-radius:999px;font-weight:700}
.chev{transition:transform .3s ease;opacity:.85}
.card.open .chev{transform:rotate(180deg)}
.card-body{overflow:hidden;max-height:0;transition:max-height .45s cubic-bezier(.2,.8,.2,1), opacity .25s ease;opacity:0;border-top:1px dashed var(--border)}
.card.open .card-body{opacity:1}
.list{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;padding:12px}

.item{display:flex;gap:12px;align-items:center;padding:10px;border:1px solid var(--border);border-radius:12px;background:linear-gradient(180deg, rgba(0,0,0,.02), transparent);transition: transform .12s var(--hover-ease), box-shadow .12s var(--hover-ease), border-color .12s}
.item:hover{transform:translateY(-6px);box-shadow:0 14px 36px rgba(0,0,0,0.08);border-color:rgba(0,0,0,0.06)}
.item.dim{opacity:.45;filter:grayscale(.35)}
.item img{width:44px;height:44px;border-radius:10px;object-fit:cover;background:#00000008}
.meta{display:flex;flex-direction:column;gap:2px;min-width:0}
.name{font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sub{font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.qty{margin-left:auto;font-weight:800;text-align:right}
.restock{display:block;font-size:12px;color:var(--muted);margin-top:4px}

.chip{display:inline-flex;align-items:center;gap:8px;padding:6px 8px;border-radius:8px;border:1px solid var(--border);margin:4px;cursor:pointer;background:var(--card);transition: transform .12s var(--hover-ease), box-shadow .12s var(--hover-ease)}
.chip img{width:20px;height:20px;border-radius:6px;object-fit:cover}
.chip:hover{transform:translateY(-4px);box-shadow:0 12px 30px rgba(0,0,0,0.08)}
.row-muted{color:var(--muted);font-size:13px}
.notif-row{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)}
.notif-row img{width:36px;height:36px;border-radius:6px;object-fit:cover}
.tick{margin-left:auto;padding:6px 10px;border-radius:10px;font-weight:700;color:#fff}
.tick.good{background:var(--good)}
.tick.bad{background:var(--bad)}
.fade-in{animation:fadeIn .22s var(--hover-ease) both}
@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}

aside#sidebar{position:fixed;right:0;top:0;height:100%;width:360px;background:var(--card);box-shadow:var(--shadow);padding:12px;transform:translateX(110%);transition:transform .25s var(--hover-ease);z-index:70;display:flex;flex-direction:column}
aside#sidebar .side-head{display:flex;align-items:center;gap:8px}
aside#sidebar .side-body{margin-top:10px;overflow:auto;padding-right:8px;flex:1} /* ensures sidebar scrolls */
.side-section{border-radius:10px;padding:8px;border:1px solid var(--border);margin-bottom:10px;background:transparent}
.side-section .sec-head{display:flex;align-items:center;justify-content:space-between;cursor:pointer;padding:6px}
.side-section .sec-body{overflow:hidden;max-height:0;transition:max-height .28s var(--hover-ease);padding-top:6px}
.side-section.open .sec-body{max-height:420px}

#modalOverlay{position:fixed;inset:0;display:none;align-items:center;justify-content:center;z-index:200;background:rgba(6,8,12,0.48);backdrop-filter:blur(6px) saturate(120%);padding:20px}
#modalOverlay.show{display:flex}
#modalContent{width:min(1100px,96vw);max-height:88vh;overflow:auto;border-radius:14px;background:var(--card);color:var(--text);border:1px solid var(--border);box-shadow:var(--shadow);padding:18px;position:relative;transform:translateY(12px) scale(.98);opacity:0;transition:transform .28s var(--hover-ease),opacity .2s ease}
#modalOverlay.show #modalContent{transform:translateY(0) scale(1);opacity:1}
#closeModal{position:absolute;right:12px;top:10px;border-radius:8px;border:none;background:transparent;color:var(--muted);font-size:18px;cursor:pointer}

.enc-tabs{display:flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:center;margin-top:10px}
.enc-tab{padding:6px 10px;border-radius:8px;border:1px solid transparent;color:var(--muted);cursor:pointer;transition: transform .12s var(--hover-ease), box-shadow .12s var(--hover-ease)}
.enc-tab:hover{transform:translateY(-4px);box-shadow:0 12px 30px rgba(0,0,0,0.06)}
.enc-tab.active{background:linear-gradient(90deg,var(--accent),var(--accent-2));color:white;border-color:transparent}

.segmented{display:flex;gap:8px;flex-wrap:wrap}
.seg-btn{padding:8px 12px;border-radius:10px;border:1px solid var(--border);background:var(--card);cursor:pointer;transition: transform .12s var(--hover-ease), box-shadow .12s var(--hover-ease), background .12s}
.seg-btn:hover{transform:translateY(-4px);box-shadow:0 12px 30px rgba(0,0,0,0.08)}

.seg-btn.toggled{
  background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,248,250,0.94));
  color: var(--text);
  border: 1px solid rgba(var(--select-blue-rgba),0.95);

  box-shadow:
    0 12px 30px rgba(var(--select-blue-rgba),0.12),
    0 6px 18px rgba(0,0,0,0.04),
    0 0 18px rgba(var(--select-blue-rgba),0.14);
  transform: translateY(-2px) scale(1.01);
}

html.dark .seg-btn.toggled{
  background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.04));
  color: #fff;
  border: 1px solid rgba(var(--select-blue-rgba),0.14);
  box-shadow:
    0 10px 26px rgba(var(--select-blue-rgba),0.12),
    0 0 16px rgba(var(--select-blue-rgba),0.10);
}

.mut-chip{padding:6px 8px;border-radius:8px;border:1px solid var(--border);background:var(--card);cursor:pointer;transition: transform .12s var(--hover-ease), box-shadow .12s var(--hover-ease)}
.mut-chip:hover{transform:translateY(-4px);box-shadow:0 12px 30px rgba(0,0,0,0.08)}
.mut-chip.selected{
  background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,248,250,0.94));
  color: var(--text);
  border: 1px solid rgba(var(--select-blue-rgba),0.95);
  box-shadow:
    0 12px 30px rgba(var(--select-blue-rgba),0.12),
    0 6px 18px rgba(0,0,0,0.04),
    0 0 18px rgba(var(--select-blue-rgba),0.14);
  transform: translateY(-2px) scale(1.01);
}
html.dark .mut-chip.selected{
  background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.04));
  color: #fff;
  border: 1px solid rgba(var(--select-blue-rgba),0.14);
  box-shadow:
    0 10px 26px rgba(var(--select-blue-rgba),0.12),
    0 0 16px rgba(var(--select-blue-rgba),0.10);
}

html.dark .seg-btn,
html.dark .mut-chip,
html.dark .enc-tab,
html.dark button.icon {
  background: var(--btn-dark-bg);
  color: #fff;
  border-color: rgba(255,255,255,0.06);
}
html.dark .seg-btn:hover,
html.dark .mut-chip:hover,
html.dark .enc-tab:hover,
html.dark button.icon:hover {
  transform:translateY(-5px);
  box-shadow: 0 18px 40px rgba(0,0,0,0.45);
}
.enc-table tbody tr:hover{ background: linear-gradient(90deg, rgba(0,0,0,0.03), transparent); transform:translateY(-4px); box-shadow: 0 12px 30px rgba(0,0,0,0.04)}
@media(max-width:720px){
  aside#sidebar{width:100%}
  .list{grid-template-columns:repeat(auto-fill,minmax(160px,1fr))}
  .item img{width:38px;height:38px}
}
</style>
</head>
<body>
<header>
  <div class="bar">
    <div class="title">🌱 Grow a Garden <span class="pill" id="statusPill">Connecting…</span></div>
    <div class="spacer"></div>
    <button id="darkToggle" class="icon" title="Toggle theme" aria-label="Toggle theme"><img id="darkIcon" src="https://img.icons8.com/ios-filled/24/000000/contrast.png" alt="theme"></button>
    <button id="calculatorBtn" class="icon" title="Calculator" aria-label="Calculator"><img src="https://img.icons8.com/ios-filled/24/000000/calculator.png" alt="Calculator"></button>
    <button id="encyclopediaBtn" class="icon" title="Encyclopedia" aria-label="Encyclopedia"><img src="https://img.icons8.com/ios-filled/24/000000/book.png" alt="Encyclopedia"></button>
    <button id="openSidebar" class="icon" title="Notifications" aria-label="Notifications"><img src="https://img.icons8.com/ios-filled/24/000000/bell.png" alt="Notifications"></button>
  </div>
</header>

<main class="row">
  <div style="display:flex;gap:10px;align-items:center;margin-bottom:12px;flex-wrap:wrap;">
    <div class="row-muted" id="updatedAt">—</div>
    <div id="restockTimers" class="row-muted" style="margin-left:auto;"></div>
  </div>
  <div class="categories" id="categories"></div>
</main>
<div id="scrim" style="display:none;position:fixed;inset:0;z-index:60;"></div>
<aside id="sidebar" aria-hidden="true">
  <div class="side-head">
    <h3 style="margin:0">Notifications</h3>
    <div class="spacer"></div>
    <button id="closeSidebar" class="icon" title="Close" aria-label="Close">✕</button>
  </div>
  <div class="side-body" id="sideBody">
    <div style="margin-top:8px;" class="row-muted">Select items to receive notifications when in-stock.</div>
    <div id="sectionsWrap"></div>
    <div style="margin-top:8px;" id="watchlist"></div>
    <div style="margin-top:8px;" class="row-muted">Your selections + theme are saved locally.</div>
  </div>
</aside>
<div id="modalOverlay" aria-hidden="true">
  <div id="modalContent" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
    <button id="closeModal" title="Close">✕</button>
    <div id="modalTitle" style="font-weight:800;margin-bottom:8px">Loading…</div>
    <div id="modalBody"></div>
  </div>
</div>

<script>
/* ---------- DATA & RECIPES ---------- */
const SEEDS = ["Carrot","Strawberry","Blueberry","Tomato","Daffodil","Watermelon","Pumpkin","Apple","Bamboo","Coconut","Cactus","Dragon Fruit","Mango","Grape","Mushroom","Pepper","Cacao","Beanstalk","Ember lily","Sugar Apple","Burning Bud","Giant Pinecone","Elder Strawberry","Romanesco"];
const GEARS = ["Watering Can","Trowel","Recall Wrench","Basic Sprinkler","Advanced Sprinkler","Medium Toy","Medium Treat","Godly Sprinkler","Magnifying Glass","Master Sprinkler","Cleaning Spray", "Cleansing Pet Shard" ,"Favorite Tool","Harvest Tool","Friendship Pot", "Grandmaster Sprinkler", "Levelup Lolipop"];
const EGGS  = ["Common Egg","Common Summer Egg","Rare Summer Egg","Mythical Egg","Paradise Egg","Bug Egg"];

const VARIANTS = [ {id:'',label:'None',mult:1},{id:'ripe',label:'🥈 Silver (x5)',mult:1},{id:'gold',label:'🪙 Gold (x20)',mult:20},{id:'rainbow',label:'🌈 Rainbow (x50)',mult:50} ];
const WEATHER_VARIANTS = [ {id:'',label:'None',mult:1},{id:'wet',label:'💧 Wet (x2)',mult:2},{id:'chilled',label:'❄️ Chilled (x2)',mult:2},{id:'drenched',label:'🌧️ Drenched (x5)',mult:5},{id:'frozen',label:'🧊 Frozen (x10)',mult:10} ];

const MUTATIONS = [
  {id:'shocked',label:'⚡ Shocked',mult:100},
  {id:'frozen',label:'🧊 Frozen',mult:10},
  {id:'wet',label:'💧 Wet',mult:2},
  {id:'chilled',label:'❄️ Chilled',mult:2},
  {id:'choc',label:'🍫 Choc',mult:2},
  {id:'moonlit',label:'🌙 Moonlit',mult:2},
  {id:'bloodlit',label:'🩸 Bloodlit',mult:4},
  {id:'celestial',label:'🌠 Celestial',mult:120},
  {id:'disco',label:'🪩 Disco',mult:125},
  {id:'zombified',label:'🧟 Zombified',mult:25},
  {id:'plasma',label:'🧪 Plasma',mult:5},
  {id:'voidtouched',label:'🌑 Voidtouched',mult:135},
  {id:'pollinated',label:'🐝 Pollinated',mult:3},
  {id:'honeyglazed',label:'🍯 Honeyglazed',mult:5},
  {id:'dawnbound',label:'🌅 Dawnbound',mult:150},
  {id:'heavenly',label:'😇 Heavenly',mult:5},
  {id:'cooked',label:'🍲 Cooked',mult:10},
  {id:'burnt',label:'🔥 Burnt',mult:4},
  {id:'molten',label:'🌋 Molten',mult:25},
  {id:'meteoric',label:'☄️ Meteoric',mult:125},
  {id:'windstruck',label:'🌬️ Windstruck',mult:2},
  {id:'alienlike',label:'👽 Alienlike',mult:100},
  {id:'sundried',label:'☀️ Sundried',mult:85},
  {id:'verdant',label:'🌿 Verdant',mult:4},
  {id:'paradisal',label:'🏝️ Paradisal',mult:100},
  {id:'twisted',label:'🌪️ Twisted',mult:5},
  {id:'galactic',label:'🪐 Galactic',mult:120},
  {id:'aurora',label:'🌌 Aurora',mult:90},
  {id:'cloudtouched',label:'☁️ Cloudtouched',mult:5},
  {id:'drenched',label:'🌧️ Drenched',mult:5},
  {id:'fried',label:'🍳 Fried',mult:8},
  {id:'amber',label:'🟠 Amber',mult:10},
  {id:'oldamber',label:'🔶 Oldamber',mult:20},
  {id:'ancientamber',label:'🟤 Ancientamber',mult:50},
  {id:'sandy',label:'🏖️ Sandy',mult:3},
  {id:'clay',label:'🧱 Clay',mult:5},
  {id:'ceramic',label:'🏺 Ceramic',mult:32},
  {id:'friendbound',label:'🤝 Friendbound',mult:70},
  {id:'infected',label:'🧫 Infected',mult:75},
  {id:'tranquil',label:'🧘 Tranquil',mult:20},
  {id:'corrupt',label:'🦠 Corrupt',mult:20},
  {id:'chakra',label:'🌀 Chakra',mult:15},
  {id:'harmonisedchakra',label:'🌀 Harmonised Chakra',mult:35},
  {id:'foxfire',label:'🦊 Foxfire',mult:90},
  {id:'harmonisedfoxfire',label:'🦊 Harmonised Foxfire',mult:190},
  {id:'radioactive',label:'☢️ Radioactive',mult:55},
  {id:'jackpot',label:'🎰 Jackpot',mult:15},
  {id:'subzero',label:'❄️ Subzero',mult:40},
  {id:'blitzshock',label:'⚡ Blitzshock',mult:50},
  {id:'touchdown',label:'🏈 Touchdown',mult:105},
  {id:'static',label:'⚛️ Static',mult:8},
  {id:'sliced',label:'🔪 Sliced',mult:50},
  {id:'sauce',label:'🍜 Sauce',mult:3},
  {id:'pasta',label:'🍝 Pasta',mult:3},
  {id:'meatball',label:'🍖 Meatball',mult:3},
  {id:'spaghetti',label:'🍝 Spaghetti',mult:15},
  {id:'acidic',label:'🧪 Acidic',mult:15},
  {id:'aromatic',label:'🌿 Aromatic',mult:15},
  {id:'oil',label:'🛢️ Oil',mult:15},
  {id:'boil',label:'💧 Boil',mult:15},
  {id:'junkshock',label:'⚡ Junkshock',mult:45},
  {id:'rot',label:'🦠 Rot',mult:8},
  {id:'bloom',label:'🌸 Bloom',mult:8},
  {id:'gloom',label:'🌑 Gloom',mult:30},
  {id:'eclipsed',label:'🌒 Eclipsed',mult:20},
  {id:'fortune',label:'🍀 Fortune',mult:50},
  {id:'lightcycle',label:'🔄 Lightcycle',mult:50},
  {id:'brainrot',label:'🧠 Brainrot',mult:100},
  {id:'warped',label:'🌀 Warped',mult:75},
  {id:'gnomed',label:'🧙‍♂️ Gnomed',mult:15},
  {id:'beanbound',label:'🫘 Beanbound',mult:100},
  {id:'tempestous',label:'⛈️ Tempestous',mult:12},
  {id:'cyclonic',label:'🌀 Cyclonic',mult:50},
  {id:'maelstrom',label:'🌊 Maelstrom',mult:100},
  {id:'glimmering',label:'✨ Glimmering',mult:2},
  {id:'toxic',label:'☣️ Toxic',mult:15},
  {id:'cosmic',label:'🌌 Cosmic',mult:210},
  {id:'stormcharged',label:'⚡ Stormcharged',mult:220},
  {id:'glitched',label:'💾 Glitched',mult:85},
  {id:'corrosive',label:'🧪 Corrosive',mult:40}
];


/* Recipes data (updated with the new entries you provided) */
const RECIPES = [
  { emoji:'🌭', name:'Corn Dog', variants:[
      {rarity:'Mythical', ingredients:['1x Giant Pinecone','1x Pepper','1x Corn']},
      {rarity:'Mythical (alt)', ingredients:['1x Giant Pinecone','1x Pepper','1x Corn']},
      {rarity:'Divine', ingredients:['1x Giant Pinecone','2x Pepper','2x Corn','2x Beanstalk']},
      {rarity:'Prismatic', ingredients:['1x Giant Pinecone','1x Pepper','1x Corn','2x Beanstalk']}
    ]},
  { emoji:'🍝', name:'Spaghetti', variants:[
      {rarity:'Legendary', ingredients:['1x Corn','1x Bell Pepper','1x Cauliflower','1x Tomato']},
      {rarity:'Mythical', ingredients:['1x Tomato','1x Cauliflower','1x Jalapeno','1x Bone Blossom']},
      {rarity:'Mythical (alt)', ingredients:['1x Tomato','1x Cauliflower','1x Taco Fern','1x Beanstalk']},
      {rarity:'Divine', ingredients:['1x Tomato','1x Corn','2x Bone Blossom','2x Beanstalk']},
      {rarity:'Prismatic', ingredients:['1x Tomato','1x Cauliflower','3x Bone Blossom']}
    ]},
  { emoji:'🍎', name:'Candy Apple', variants:[
      {rarity:'Legendary', ingredients:['1x Sugar Apple','1x Blueberry']},
      {rarity:'Prismatic', ingredients:['1x Sugar Apple','1x Giant Pinecone']},
      {rarity:'Transcendent', ingredients:['1x Beanstalk','1x Ember Lily','1x Sugar Apple','1x Giant Pinecone','1x Bone Blossom']},
      {rarity:'Other', ingredients:['2x Sugarglaze','2x Sugar Apple']}
    ]},
  { emoji:'🥣', name:'Porridge', variants:[
      {rarity:'Rare', ingredients:['1x Cauliflower','1x Corn','1x Lingonberry']},
      {rarity:'Recipe Swap – Legendary', ingredients:['2x Banana','1x Apple']},
      {rarity:'Recipe Swap – Mythical', ingredients:['2x Sugarglaze','1x Blood Banana']},
      {rarity:'Recipe Swap – Prismatic', ingredients:['1x Corn','4x Sugar Apple']},
      {rarity:'Recipe Swap – Transcendent', ingredients:['1x Banana','1x Sugar Apple','3x Bone Blossom']}
    ]},
  { emoji:'🫖', name:'Sweet Tea', variants:[
      {rarity:'Rare', ingredients:['2x Blueberry','2x Serenity']},
      {rarity:'Legendary', ingredients:['1x Mint','1x Pineapple']},
      {rarity:'Legendary (alt)', ingredients:['1x Soft Sunshine','1x Mango']},
      {rarity:'Legendary (alt2)', ingredients:['1x Serenity','1x Mango']},
      {rarity:'Mythical', ingredients:['1x Serenity','1x Sugar Apple']},
      {rarity:'Divine', ingredients:['1x Ember Lily','1x Mango']},
      {rarity:'Divine (alt)', ingredients:['1x Rosy Delight','1x Sugar Apple']},
      {rarity:'Prismatic', ingredients:['1x Burning Bud','1x Sugar Apple']},
      {rarity:'Transcendent', ingredients:['3x Sugar Apple','1x Burning Bud']},
      {rarity:'Transcendent (alt)', ingredients:['1x Ember Lily','1x Burning Bud','2x Sugar Apple']}
    ]},
  { emoji:'🥤', name:'Smoothie', variants:[
      {rarity:'Uncommon', ingredients:['1x Carrot','1x Apple']},
      {rarity:'Legendary', ingredients:['1x Mango','1x Peach','1x Strawberry','1x Apple']},
      {rarity:'Mythical', ingredients:['3x Apple','1x Peach']},
      {rarity:'Mythical (alt)', ingredients:['2x Elder Strawberry','1x Blueberry','1x Strawberry','1x Apple']},
      {rarity:'Divine', ingredients:['1x Coconut','1x Elder Strawberry']},
      {rarity:'Divine (alt)', ingredients:['2x Grape']},
      {rarity:'Prismatic', ingredients:['2x Sugar Apple']},
      {rarity:'Transcendent', ingredients:['3x Bone Blossom','1x Pricklefruit']},
      {rarity:'Transcendent (alt)', ingredients:['4x Bone Blossom','1x Sugar Apple']}
    ]},
  { emoji:'z', name:'Salad', variants:[
      {rarity:'Common', ingredients:['3x Tomato','1x Bamboo']},
      {rarity:'Uncommon', ingredients:['1x Orange Tulip','1x Bamboo','1x Carrot','1x Tomato']},
      {rarity:'Rare', ingredients:['1x Corn','1x Tomato']},
      {rarity:'Rare (alt)', ingredients:['2x Tomato','1x Dragon Fruit']},
      {rarity:'Rare (alt2)', ingredients:['1x Peach','1x Tomato','1x Jalapeño']},
      {rarity:'Rare (alt3)', ingredients:['1x Cauliflower','1x Bamboo']},
      {rarity:'Legendary', ingredients:['1x Ember Lily','1x Dragon Fruit','1x Bamboo','1x Tomato']},
      {rarity:'Mythical', ingredients:['2x Sugar Apple','1x Tomato']},
      {rarity:'Divine', ingredients:['4x Sugar Apple','1x Tomato']},
      {rarity:'Prismatic', ingredients:['3x Bone Blossom','1x Giant Pinecone','1x Tomato']},
      {rarity:'Transcendent', ingredients:['4x Bone Blossom','1x Tomato']}
    ]},
  { emoji:'🥪', name:'Sandwich', variants:[
      {rarity:'Uncommon', ingredients:['1x Tomato','1x Carrot','1x Corn']},
      {rarity:'Uncommon (alt)', ingredients:['1x Tomato','1x Corn','1x Artichoke']},
      {rarity:'Rare', ingredients:['1x Corn','2x Tomato']},
      {rarity:'Rare (alt)', ingredients:['1x Tomato','1x Corn','1x Prickly Pear']},
      {rarity:'Legendary', ingredients:['1x Corn','1x Tomato','1x Beanstalk']},
      {rarity:'Legendary (alt)', ingredients:['1x Corn','1x Tomato','1x Loquat']},
      {rarity:'Recipe Swap – Legendary', ingredients:['1x Corn','1x Tomato','3x Avocado']},
      {rarity:'Recipe Swap – Mythical', ingredients:['1x Corn','1x Tomato','3x Bell Pepper']},
      {rarity:'Recipe Swap – Divine', ingredients:['2x Sugar Apple','1x Corn','1x Tomato']},
      {rarity:'Recipe Swap – Prismatic', ingredients:['1x Corn','1x Tomato','3x Bone Blossom']}
    ]},
  { emoji:'🥧', name:'Pie', variants:[
      {rarity:'Rare', ingredients:['1x Crown Melon','1x Jalapeño']},
      {rarity:'Legendary', ingredients:['1x Pumpkin','1x Apple']},
      {rarity:'Legendary (alt)', ingredients:['1x Coconut','1x Tomato']},
      {rarity:'Legendary (alt2)', ingredients:['1x Pumpkin','1x Dragon Fruit']},
      {rarity:'Mythical', ingredients:['1x Pumpkin','1x Sugar Apple']},
      {rarity:'Mythical (alt)', ingredients:['1x Cactus','1x Cacao','1x Pumpkin','1x Peach']},
      {rarity:'Mythical (alt2)', ingredients:['1x Pumpkin','1x Ember Lily','1x Green Apple']},
      {rarity:'Divine', ingredients:['1x Ember Lily']},
      {rarity:'Divine (alt)', ingredients:['1x Beanstalk','1x Coconut']},
      {rarity:'Prismatic', ingredients:['4x Bone Blossom','1x Pumpkin']},
      {rarity:'Prismatic (alt)', ingredients:['4x Bone Blossom','1x Coconut']},
      {rarity:'Transcendent', ingredients:['4x Bone Blossom','1x Pumpkin']},
      {rarity:'Transcendent (alt)', ingredients:['4x Bone Blossom','1x Coconut']}
    ]},
  { emoji:'🧇', name:'Waffle', variants:[
      {rarity:'Rare', ingredients:['1x Coconut','1x Strawberry']},
      {rarity:'Legendary', ingredients:['1x Peach','1x Coconut','1x Apple']},
      {rarity:'Mythical', ingredients:['1x Coconut','1x Peach']},
      {rarity:'Mythical (alt)', ingredients:['1x Coconut','1x Mango']},
      {rarity:'Divine', ingredients:['1x Sugar Apple','1x Coconut']},
      {rarity:'Prismatic', ingredients:['1x Sugarglaze','2x Bone Blossom','2x Coconut','3x Sugar Apple']},
      {rarity:'Prismatic (alt)', ingredients:['1x Sugar Apple','1x Coconut','3x Bone Blossom']},
      {rarity:'Transcendent', ingredients:['1x Sugar Apple','1x Coconut','3x Bone Blossom']}
    ]},

  /* NEW RECIPES ADDED FROM YOUR LATEST LIST */
  { emoji:'🍦', name:'Ice Cream', variants:[
      {rarity:'Uncommon', ingredients:['1x Corn','1x Blueberry','1x Strawberry']},
      {rarity:'Uncommon (alt)', ingredients:['1x Strawberry','1x Corn','1x Tomato','1x Jalapeño']},
      {rarity:'Rare', ingredients:['1x Watermelon','1x Corn']},
      {rarity:'Rare (alt)', ingredients:['1x Blueberry','1x Banana']},
      {rarity:'Legendary', ingredients:['2x Banana','1x Watermelon']},
      {rarity:'Legendary (alt)', ingredients:['1x Mango','1x Corn']},
      {rarity:'Mythical', ingredients:['1x Banana','1x Pepper']},
      {rarity:'Mythical (alt)', ingredients:['1x Loquat']},
      {rarity:'Mythical (alt2)', ingredients:['1x Corn','1x Sugar Apple']},
      {rarity:'Divine', ingredients:['1x Sugar Apple','1x Sugarglaze']},
      {rarity:'Divine (alt)', ingredients:['3x Sugar Apple','1x Corn']},
      {rarity:'Divine (alt2)', ingredients:['1x Sugarglaze','1x Tranquil Bloom','1x Bone Blossom','1x Sugar Apple']},
      {rarity:'Prismatic', ingredients:['1x Sugarglaze','1x Sugar Apple','3x Bone Blossom']},
      {rarity:'Prismatic (alt)', ingredients:['1x Banana','1x Sugar Apple','3x Bone Blossom']},
      {rarity:'Transcendent', ingredients:['1x Banana','3x Bone Blossom']},
      {rarity:'Transcendent (alt)', ingredients:['4x Sugarglaze','4x Bone Blossom']}
    ]},
  { emoji:'🍩', name:'Donut', variants:[
      {rarity:'Uncommon', ingredients:['1x Tomato','1x Strawberry','1x Corn']},
      {rarity:'Rare', ingredients:['1x Corn','1x Pineapple','1x Blueberry']},
      {rarity:'Rare (alt)', ingredients:['2x Watermelon','2x Corn']},
      {rarity:'Legendary', ingredients:['1x Sugar Apple','1x Serenity','1x Corn']},
      {rarity:'Legendary (alt)', ingredients:['1x Corn','1x Mango','1x Banana']},
      {rarity:'Divine', ingredients:['1x Sugarglaze','2x Sugar Apple']},
      {rarity:'Divine (alt)', ingredients:['1x Bone Blossom','1x Sugar Apple','1x Banana']},
      {rarity:'Mythical', ingredients:['1x Sugarglaze','1x Corn','1x Peach']},
      {rarity:'Transcendent', ingredients:['4x Bone Blossom','1x Sugarglaze']},
      {rarity:'Mythical (alt)', ingredients:['1x Sugar Apple','1x Corn','1x Tomato','1x Pepper']},
      {rarity:'Divine (alt2)', ingredients:['1x Corn','2x Sugar Apple','1x Peach']},
      {rarity:'Prismatic', ingredients:['3x Sugar Apple','1x Corn']},
      {rarity:'Transcendent (alt)', ingredients:['3x Bone Blossom','1x Banana','1x Beanstalk']}
    ]},
  { emoji:'🍕', name:'Pizza', variants:[
      {rarity:'Rare', ingredients:['1x Strawberry','1x Pepper','1x Tomato','1x Corn']},
      {rarity:'Legendary', ingredients:['1x Corn','1x Tomato','1x Pepper','1x Sugar Apple']},
      {rarity:'Legendary (alt)', ingredients:['1x Jalapeño','1x Corn','1x Dragon Fruit','1x Ember Lily']},
      {rarity:'Prismatic', ingredients:['3x Bone Blossom','1x Banana','1x Beanstalk']},
      {rarity:'Prismatic (alt)', ingredients:['3x Bone Blossom','1x Banana','1x Beanstalk']},
      {rarity:'Transcendent', ingredients:['3x Bone Blossom','1x Banana','1x Beanstalk']}
    ]},
  { emoji:'🍲', name:'Soup', variants:[
      {rarity:'Very Common', ingredients:['1x Carrot']},
      {rarity:'Common', ingredients:['1x Strawberry','1x Peach','1x Mango']},
      {rarity:'Uncommon', ingredients:['2x Coconut']},
      {rarity:'Uncommon (alt)', ingredients:['1x Coconut','1x Dragon Fruit']},
      {rarity:'Uncommon (alt2)', ingredients:['1x Green Apple','1x Grape']},
      {rarity:'Uncommon (alt3)', ingredients:['1x Apple']},
      {rarity:'Rare', ingredients:['1x Coconut','1x Elder Strawberry']},
      {rarity:'Rare (alt)', ingredients:['1x Grape','1x Sugar Apple','1x Dragon Fruit']}
    ]},
  { emoji:'🌭', name:'Hot Dog', variants:[
      {rarity:'Legendary', ingredients:['1x Pepper','1x Corn']},
      {rarity:'Legendary (alt)', ingredients:['1x Ember Lily','1x Corn','1x Bamboo']},
      {rarity:'Mythical', ingredients:['2x Pepper','1x Corn']},
      {rarity:'Divine', ingredients:['1x Corn','1x Lucky Bamboo','3x Bone Blossom']},
      {rarity:'Divine (alt)', ingredients:['1x Corn','1x Ember Lily','2x Elder Strawberry']},
      {rarity:'Divine (alt2)', ingredients:['3x Pepper','1x Corn']},
      {rarity:'Prismatic', ingredients:['1x Corn','4x Bone Blossom']},
      {rarity:'Transcendent', ingredients:['1x Corn','4x Bone Blossom']}
    ]},
  { emoji:'🍔', name:'Burger', variants:[
      {rarity:'Rare', ingredients:['1x Pepper','1x Corn','1x Tomato','1x Mint']},
      {rarity:'Rare (alt)', ingredients:['1x Ember Lily','1x Carrot','1x Tomato','1x Corn']},
      {rarity:'Legendary', ingredients:['1x Corn','1x Tomato','1x Ember Lily']},
      {rarity:'Legendary (alt)', ingredients:['1x Corn','1x Tomato','1x Beanstalk','1x Cactus']},
      {rarity:'Legendary (alt2)', ingredients:['1x Tomato','1x Corn','1x Pepper']},
      {rarity:'Legendary (alt3)', ingredients:['1x Onion','1x Pear','1x Corn','1x Tomato','1x Bone Blossom']},
      {rarity:'Legendary (alt4)', ingredients:['1x Corn','1x Tomato','1x Pepper','1x Cactus']},
      {rarity:'Legendary (alt5)', ingredients:['1x Corn','2x Bell Pepper','2x Jalapeño']},
      {rarity:'Mythical', ingredients:['1x Pepper','1x Corn','1x Tomato','1x Bone Blossom','1x Beanstalk']},
      {rarity:'Mythical (alt)', ingredients:['1x Pepper','1x Corn','1x Tomato','2x Beanstalk']},
      {rarity:'Mythical (alt2)', ingredients:['1x Corn','3x Bell Pepper']},
      {rarity:'Divine', ingredients:['1x Corn','1x Tomato','3x Bone Blossom']}
    ]},
  { emoji:'🍣', name:'Sushi', variants:[
      {rarity:'Rare', ingredients:['4x Bamboo','1x Corn']},
      {rarity:'Rare (alt)', ingredients:['1x Corn','1x Apple']},
      {rarity:'Rare (alt2)', ingredients:['1x Cauliflower','1x Bamboo']},
      {rarity:'Legendary', ingredients:['3x Bamboo','1x Maple Apple','1x Corn']},
      {rarity:'Legendary (alt)', ingredients:['3x Bamboo','1x Hive Fruit','1x Corn']},
      {rarity:'Mythical', ingredients:['2x Bamboo','1x Corn','2x Bone Blossom']},
      {rarity:'Mythical (alt)', ingredients:['3x Sugar Apple','1x Bamboo','1x Corn']},
      {rarity:'Divine', ingredients:['1x Bamboo','1x Corn','3x Bone Blossom']},
      {rarity:'Divine (alt)', ingredients:['1x Bamboo','1x Pepper','1x Ember Lily','1x Corn']},
      {rarity:'Prismatic', ingredients:['1x Coconut','4x Bone Blossom']}
    ]},
  { emoji:'🥗', name:'Jandel saled', variants:[
      {rarity:'Option 1', ingredients:[' 2x Bone Blossom','1x Mega Mushroom','1x Lemon']},
      {rarity:'Option 2', ingredients:['1x Purple Cabbage',' 3x Bone Blossom',' 1x Sinisterdrip']}
    ]}
];

/* ---------- API / settings ---------- */
const API_URL = 'https://api.joshlei.com/v2/growagarden/stock';
const API_INFO = id => `https://api.joshlei.com/v2/growagarden/info/${id}`;
function API_IMAGE(name){
  // replace spaces and non-word characters with underscores as requested
  const id = String(name||'').trim().replace(/[^\w]+/g,'_');
  return `https://api.joshlei.com/v2/growagarden/image/${encodeURIComponent(id)}`;
}
const API_KEY = 'js_c5d322d0652bc477f50348450bb2c6fe4f4d767042b2b0facb69b074c3d46f46';
const POLL_MS = 30000;           // existing full UI poll (30s)
const NOTIFY_POLL_MS = 3000;     // new fast poll for watched items — 3 seconds
const INFO_TTL_MS = 5 * 60 * 1000;
const BIG_PRICE_LIMIT = 100000000000000000;

/* ---------- runtime state ---------- */
let infoCache = loadJSON('gg_info_cache', {});
let latestStock = null;
let firstLoadDone = false;
let openCardsSet = new Set();
let restockTimes = calculateRestockTimes();
let sidebarGroupState = loadJSON('gg_sidebar_groups', {});
let notifiedSet = new Set();

/* lastKnownQty map for watched items to detect transitions */
let lastKnownQty = {}; // { "Display Name": number }
let watchSet = new Set(loadJSON('gg_watch', []));

/* ---------- utils ---------- */
function loadJSON(k,f){ try{ return JSON.parse(localStorage.getItem(k) ?? JSON.stringify(f)); } catch(e){ return f; } }
function saveJSON(k,v){ localStorage.setItem(k, JSON.stringify(v)); }
function timeAgo(s){ if(!s) return '—'; const now=Math.floor(Date.now()/1000); let diff=Math.max(0,now-Number(s)); const units=[['y',365*24*3600],['mo',30*24*3600],['w',7*24*3600],['d',24*3600],['h',3600],['m',60],['s',1]]; for(const [u,sec] of units){ if(diff>=sec){const v=Math.floor(diff/sec); return `${v}${u} ago`; }} return 'just now'; }
function formatPriceNum(price){ if(price==null||price===''||isNaN(Number(price))) return null; const n=parseInt(price); if(n>=BIG_PRICE_LIMIT) return null; return n.toLocaleString(); }
function formatCountdown(ms){ const totalSeconds=Math.max(0,Math.floor(ms/1000)); const d=Math.floor(totalSeconds/86400); const h=Math.floor((totalSeconds%86400)/3600); const m=Math.floor((totalSeconds%3600)/60); const s=totalSeconds%60; const parts=[]; if(d) parts.push(`${d}d`); if(h) parts.push(`${h}h`); if(m) parts.push(`${m}m`); if(!parts.length||s) parts.push(`${s}s`); return parts.join(' '); }
function calculateRestockTimes(){ const now=Date.now(); const dayStart=new Date().setHours(0,0,0,0); const next = ms => dayStart + Math.ceil((now - dayStart) / ms) * ms; return { seeds: next(5*60*1000), gear: next(5*60*1000), egg: next(30*60*1000), cosmetics: next(4*60*60*1000), event: next(1*60*60*1000) }; }

/* DOM refs */
const statusPill = document.getElementById('statusPill');
const updatedAt = document.getElementById('updatedAt');
const categoriesEl = document.getElementById('categories');
const sectionsWrap = document.getElementById('sectionsWrap');
const sidebarEl = document.getElementById('sidebar');
const scrim = document.getElementById('scrim');
const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const restockTimersEl = document.getElementById('restockTimers');

/* theme init */
(function initTheme(){ const dark = localStorage.getItem('gg_dark') === 'true'; document.documentElement.classList.toggle('dark', dark); updateThemeIcon(); })();
document.getElementById('darkToggle')?.addEventListener('click', ()=>{ const nowDark = !document.documentElement.classList.contains('dark'); document.documentElement.classList.toggle('dark', nowDark); localStorage.setItem('gg_dark', String(nowDark)); updateThemeIcon(); });
function updateThemeIcon(){ const el=document.getElementById('darkIcon'); if(!el) return; el.src = document.documentElement.classList.contains('dark') ? 'https://img.icons8.com/ios-filled/24/ffffff/moon-symbol.png' : 'https://img.icons8.com/ios-filled/24/000000/contrast.png'; }

/* sidebar open/close */
function openSidebar(){ sidebarEl.style.transform='translateX(0)'; scrim.style.display='block'; sidebarEl.setAttribute('aria-hidden','false'); localStorage.setItem('gg_sidebar_open','true'); prefetchSidebarIcons(); }
function closeSidebar(){ sidebarEl.style.transform='translateX(110%)'; scrim.style.display='none'; sidebarEl.setAttribute('aria-hidden','true'); localStorage.setItem('gg_sidebar_open','false'); }
document.getElementById('openSidebar')?.addEventListener('click', openSidebar);
document.getElementById('closeSidebar')?.addEventListener('click', closeSidebar);
scrim.addEventListener('click', closeSidebar);
if(localStorage.getItem('gg_sidebar_open')==='true') openSidebar();

/* fetch helper */
async function fetchJSON(url, options={}){ const res = await fetch(url, options); if(!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); }

/* ---------- STOCK FETCH + RENDER ---------- */
async function fetchStock(){
  try{
    statusPill.textContent = 'Loading…';
    const data = await fetchJSON(API_URL, { headers: { 'accept':'application/json', 'jstudio-key':API_KEY }});
    preserveOpenCards();
    latestStock = data;
    statusPill.textContent = 'Live';
    updatedAt.textContent = `Updated: ${new Date().toLocaleString()}`;
    restockTimes = calculateRestockTimes();
    renderAll(data);
    if(Notification && Notification.permission !== 'denied') Notification.requestPermission().catch(()=>{});
    if(!firstLoadDone){ firstLoadDone = true; }
    // sync lastKnownQty for watched items so we don't spam old data
    syncLastKnownQtyFromLatest();
  }catch(e){ console.error(e); statusPill.textContent='Error'; }
}
setInterval(fetchStock, POLL_MS);
fetchStock();

/* preserve open cards */
function preserveOpenCards(){ openCardsSet.clear(); const opens = categoriesEl.querySelectorAll('.card.open .card-header h2'); for(const h of opens) openCardsSet.add(h.textContent.trim()); }

/* category spec includes traveling merchant (merchantName detection robust) */
function categorySpec(data){
  // merchantName detection robust: travelingmerchant_stock can be object or missing
  let merchantName = '';
  if(data && data.travelingmerchant_stock){
    const t = data.travelingmerchant_stock;
    if(typeof t === 'object'){
      merchantName = t.merchantName || t.merchantname || t.MerchantName || '';
    } else {
      merchantName = '';
    }
  }
  return [
    { key:'seed_stock', title:'Seeds', restKey:'seeds' },
    { key:'gear_stock', title:'Gears', restKey:'gear' },
    { key:'egg_stock', title:'Eggs', restKey:'egg' },
    { key:'cosmetic_stock', title:'Cosmetics', restKey:'cosmetics' },
    { key:'eventshop_stock', title:'Event Shop', restKey:'event' },
    { key:'travelingmerchant_stock', title:'Traveling Merchant', restKey:'merchant' }
  ].map(k => ({...k, items: (data[k.key] ?? (k.key==='travelingmerchant_stock' && data.travelingmerchant_stock && data.travelingmerchant_stock.stock ? data.travelingmerchant_stock.stock : [])), merchantName }));
}

/* canonical id/lookup uses underscores for spaces and non-word characters */
function canonicalId(displayName){
  if(!displayName) return '';
  return String(displayName).trim().replace(/[^\w]+/g,'_');
}

/* image helper */
function imageFor(displayName, apiIcon){
  if(apiIcon) return apiIcon;
  return API_IMAGE(displayName);
}

/* renderAll: each category toggles independently (no other side opening) */
function renderAll(data){
  categoriesEl.innerHTML = '';
  for(const cat of categorySpec(data)){
    const card = document.createElement('section'); card.className = 'card fade-in';
    const header = document.createElement('div'); header.className = 'card-header';
    const titleText = (cat.key === 'travelingmerchant_stock' && cat.merchantName) ? `${cat.title} — Merchant: ${cat.merchantName}` : cat.title;
    header.innerHTML = `<h2>${titleText}</h2><div style="display:flex;align-items:center;gap:10px"><span class="badge">${(cat.items||[]).length}</span><span class="chev">▾</span></div>`;
    const body = document.createElement('div'); body.className = 'card-body';
    const list = document.createElement('div'); list.className = 'list';
    body.appendChild(list); card.appendChild(header); card.appendChild(body); categoriesEl.appendChild(card);

    if(openCardsSet.has(titleText)) card.classList.add('open');
    ensureAccordion(card, body);
    header.addEventListener('click', (ev)=>{ ev.stopPropagation(); card.classList.toggle('open'); ensureAccordion(card, body); const t = header.querySelector('h2').textContent.trim(); if(card.classList.contains('open')) openCardsSet.add(t); else openCardsSet.delete(t); });

    for(const item of cat.items){
      const el = document.createElement('div'); el.className='item';
      if(Number(item.quantity)===0) el.classList.add('dim');
      const iconUrl = imageFor(item.display_name, item.icon);
      el.innerHTML = `
        <img src="${iconUrl}" alt="${esc(item.display_name)}" onerror="this.onerror=null;this.src='${API_IMAGE(item.display_name)}'">
        <div class="meta">
          <div class="name">${esc(item.display_name)}</div>
          <div class="sub" id="sub-${cat.key}-${item.item_id}">Price: …</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;">
          <div class="qty" title="Amount in stock" id="qty-${cat.key}-${item.item_id}">× ${item.quantity}</div>
          <div class="restock" id="rest-${cat.key}-${item.item_id}"></div>
        </div>
      `;
      list.appendChild(el);
      fillPriceSub(cat.key, item).catch(()=>{});
    }
  }
  buildSideSections();
  renderWatchlist(); // rebuild watchlist UI
  updateRestockUI();
}

/* escape helper */
function esc(s){ return String(s||'').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

/* fill price sub using /info */
async function fillPriceSub(catKey,item){
  const sub = document.getElementById(`sub-${catKey}-${item.item_id}`);
  const info = await getItemInfo(item.item_id);
  if(sub){
    let priceText = formatPriceNum(info?.price);
    sub.textContent = priceText ? `Price: ${priceText} ${info?.currency ?? ''}`.trim() : '';
  }
}

/* cached /info lookup */
async function getItemInfo(item_id){
  if(!item_id) return null;
  const c = infoCache[item_id];
  const now = Date.now();
  if(c && (now - (c.ts||0)) < INFO_TTL_MS) return c.data;
  try{
    const data = await fetchJSON(API_INFO(item_id));
    infoCache[item_id] = { data, ts: now };
    saveJSON('gg_info_cache', infoCache);
    return data;
  }catch(e){ return c?.data ?? null; }
}

/* build side sections; chips use API_IMAGE with underscores */
function buildSideSections(){
  sectionsWrap.innerHTML = '';
  const groups = [
    {label:'Seeds', live: latestStock?.seed_stock ?? [], names: SEEDS},
    {label:'Gears', live: latestStock?.gear_stock ?? [], names: GEARS},
    {label:'Eggs',  live: latestStock?.egg_stock ?? [],  names: EGGS},
    {label:'Cosmetics', live: latestStock?.cosmetic_stock ?? [], names: (latestStock?.cosmetic_stock ?? []).map(i=>i.display_name)},
    {label:'Event Shop', live: latestStock?.eventshop_stock ?? [], names: (latestStock?.eventshop_stock ?? []).map(i=>i.display_name)},
    {label:'Traveling Merchant', live: latestStock?.travelingmerchant_stock?.stock ?? [], names: (latestStock?.travelingmerchant_stock?.stock ?? []).map(i=>i.display_name)}
  ];

  for(const g of groups){
    const sec = document.createElement('div'); sec.className='side-section';
    const head = document.createElement('div'); head.className='sec-head';
    head.innerHTML = `<div style="font-weight:700">${g.label}</div><div class="row-muted" id="count-${g.label}">${(g.live||[]).length} present</div>`;
    const body = document.createElement('div'); body.className='sec-body';
    const seen = new Set();

    for(const it of g.live){ if(seen.has(it.display_name)) continue; seen.add(it.display_name); body.appendChild(makeChipFor(it.display_name, it.icon)); }
    for(const name of (g.names||[])){
      if(seen.has(name)) continue; seen.add(name); body.appendChild(makeChipFor(name,'')); 
    }

    sec.appendChild(head); sec.appendChild(body); sectionsWrap.appendChild(sec);

    const st = (sidebarGroupState[g.label] === undefined) ? true : !!sidebarGroupState[g.label];
    if(st) { sec.classList.add('open'); body.style.maxHeight = body.scrollHeight + 'px'; }

    head.addEventListener('click', (ev)=>{
      ev.stopPropagation();
      sec.classList.toggle('open');
      if(sec.classList.contains('open')){ body.style.maxHeight = body.scrollHeight + 'px'; sidebarGroupState[g.label] = true; } else { body.style.maxHeight = '0px'; sidebarGroupState[g.label] = false; }
      saveJSON('gg_sidebar_groups', sidebarGroupState);
    });
  }

  function makeChipFor(displayName, icon){
    const lab = document.createElement('label'); lab.className='chip';
    const safeName = esc(displayName);
    lab.innerHTML = `<input type="checkbox" value="${safeName}"><img src="${imageFor(displayName,icon)}" alt="${safeName}" onerror="this.onerror=null;this.src='${API_IMAGE(displayName)}'"><span>${safeName}</span>`;
    const cb = lab.querySelector('input');
    cb.checked = watchSet.has(displayName);
    cb.addEventListener('change', async ()=>{
      // when user enables watch, request permission and immediately notify if already in stock
      if(cb.checked){
        // ensure permission
        try{ if("Notification" in window && Notification.permission !== 'granted'){ await Notification.requestPermission(); } }catch(e){}
        watchSet.add(displayName);
        // set lastKnownQty to current qty (so the poll can detect transitions later)
        const qty = findCurrentQty(displayName);
        lastKnownQty[displayName] = Number(qty) || 0;
        // immediate notification if currently in stock
        if(Number(qty) > 0){
          try{ if("Notification" in window && Notification.permission === 'granted'){ new Notification(`Item in stock: ${displayName}`, { body: `Quantity: ${qty}`, icon: (icon || API_IMAGE(displayName)) }); } }catch(e){}
        }
      } else {
        watchSet.delete(displayName);
        // remove from lastKnown map to avoid stale triggers
        delete lastKnownQty[displayName];
      }
      saveJSON('gg_watch', [...watchSet]);
      renderWatchlist();
    });
    return lab;
  }
}

/* attempt to prefetch icons for sidebar chips */
async function prefetchSidebarIcons(){
  const chips = sectionsWrap.querySelectorAll('.chip img');
  for(const img of chips){
    const alt = img.alt || '';
    if(!alt) continue;
    try{
      const id = canonicalId(alt);
      const info = await getItemInfo(id);
      if(info && info.icon) img.src = info.icon;
    }catch(e){}
  }
}

/* watchlist rendering: rows get data-watch-name so quick updater can find them */
function findCurrentQty(displayName){
  if(!latestStock) return 0;
  const pools=[latestStock.seed_stock, latestStock.gear_stock, latestStock.egg_stock, latestStock.cosmetic_stock, latestStock.eventshop_stock, latestStock.travelingmerchant_stock?.stock].filter(Boolean);
  for(const arr of pools){ for(const it of arr){ if(it.display_name===displayName) return Number(it.quantity)||0; } }
  return 0;
}
function findItemId(displayName){
  const pools=[latestStock?.seed_stock, latestStock?.gear_stock, latestStock?.egg_stock, latestStock?.cosmetic_stock, latestStock?.eventshop_stock, latestStock?.travelingmerchant_stock?.stock].filter(Boolean);
  for(const arr of pools){ for(const it of arr){ if(it.display_name===displayName) return it.item_id; } }
  return canonicalId(displayName);
}
async function renderWatchlist(){
  const watchWrap = document.getElementById('watchlist');
  if(!watchWrap) return;
  watchWrap.innerHTML = '';
  const names = [...watchSet].sort((a,b)=>a.localeCompare(b));
  if(names.length===0){ watchWrap.innerHTML = `<div class="row-muted">No items selected yet.</div>`; return; }
  for(const name of names){
    const qty = findCurrentQty(name);
    const id = findItemId(name);
    const info = await getItemInfo(id);
    const icon = (info && info.icon) ? info.icon : imageFor(name, '');
    const row = document.createElement('div'); row.className='notif-row fade-in';
    row.dataset.watchName = name;
    row.innerHTML = `<img src="${icon}" alt="${esc(name)}" onerror="this.onerror=null;this.src='${API_IMAGE(name)}'"><div style="min-width:0"><div style="font-weight:700">${esc(name)}</div><div class="ls row-muted">Last seen: ${timeAgo(info?.last_seen)}</div></div><div class="tick ${qty>0?'good':'bad'}">${qty>0?'✓':'✗'}</div>`;
    watchWrap.appendChild(row);
    // ensure lastKnownQty has a starting value if not set
    if(lastKnownQty[name] === undefined) lastKnownQty[name] = Number(qty) || 0;
  }
}

/* light-weight updater for the watchlist (doesn't re-fetch /info) */
function updateWatchlistQuick(newStock){
  // newStock should be the object returned by API stock
  if(!newStock) return;
  const pools = [newStock.seed_stock||[], newStock.gear_stock||[], newStock.egg_stock||[], newStock.cosmetic_stock||[], newStock.eventshop_stock||[], (newStock.travelingmerchant_stock && newStock.travelingmerchant_stock.stock) || []].flat();
  const watchWrap = document.getElementById('watchlist');
  if(!watchWrap) return;
  const rows = watchWrap.querySelectorAll('.notif-row');
  rows.forEach(row=>{
    const name = row.dataset.watchName;
    const match = pools.find(it => it.display_name === name);
    const qty = match ? Number(match.quantity || 0) : 0;
    const tick = row.querySelector('.tick');
    if(tick){
      tick.classList.toggle('good', qty>0);
      tick.classList.toggle('bad', qty===0);
      tick.textContent = qty>0 ? '✓' : '✗';
    }
    // update lastKnownQty if not set
    if(lastKnownQty[name] === undefined) lastKnownQty[name] = qty;
  });
}

/* notification poll: checks API every 3 seconds for watchSet items and fires notification only on 0->>0 transitions */
async function notifyPollOnce(){
  if(!watchSet || watchSet.size===0) return;
  try{
    const data = await fetch(API_URL, { headers: { 'accept':'application/json', 'jstudio-key':API_KEY }});
    if(!data.ok) return;
    const json = await data.json();
    // update quick UI
    updateWatchlistQuick(json);
    // build pools
    const pools = [json.seed_stock||[], json.gear_stock||[], json.egg_stock||[], json.cosmetic_stock||[], json.eventshop_stock||[], (json.travelingmerchant_stock && json.travelingmerchant_stock.stock) || []].flat();
    for(const name of [...watchSet]){
      const match = pools.find(it => it.display_name === name);
      const qty = match ? Number(match.quantity || 0) : 0;
      const prev = Number(lastKnownQty[name] || 0);
      if(prev === 0 && qty > 0){
        // send notification (permission check)
        try{
          if("Notification" in window && Notification.permission === 'granted'){
            new Notification(`Item in stock: ${name}`, { body: `Quantity: ${qty}`, icon: (match && match.icon) ? match.icon : API_IMAGE(name) });
          }
        }catch(e){}
      }
      // update lastKnownQty always
      lastKnownQty[name] = qty;
    }
    // also update global latestStock variable for UI consistency (but do not rerender full UI here)
    latestStock = json;
  }catch(e){
    // quietly ignore small poll errors
    // console.error('notifyPollOnce error', e);
  }
}

/* start 3s poll */
setInterval(notifyPollOnce, NOTIFY_POLL_MS);

/* call notifyPollOnce immediately after first stock fetch to prime */
(async ()=>{ await new Promise(r=>setTimeout(r,500)); notifyPollOnce(); })();

/* notifications on watch toggle are handled in makeChipFor change handler */

/* ---------- modal helpers ---------- */
function showModal(title, renderFn){ modalTitle.textContent = title; modalBody.innerHTML = 'Loading…'; modalOverlay.classList.add('show'); modalOverlay.setAttribute('aria-hidden','false'); renderFn(); }
function hideModal(){ modalOverlay.classList.remove('show'); modalOverlay.setAttribute('aria-hidden','true'); }
document.getElementById('closeModal')?.addEventListener('click', hideModal);

/* ---------- Calculator + Friend Overlay (same as before) ---------- */
document.getElementById('calculatorBtn')?.addEventListener('click', ()=>{ showModal('Fruit Price Calculator', renderCalculator); });

async function renderCalculator(){
  let selectedVariant = ''; let selectedWeather = ''; let selectedMutations = new Set();
  let friendCount = 0;

  modalBody.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:12px;">
      <div style="display:flex;gap:12px;align-items:center;">
        <div style="flex:1"><div style="font-size:13px;font-weight:700;margin-bottom:6px;">Crop Type</div><input id="calcCrop" placeholder="Search for a crop..." style="width:100%;padding:10px;border-radius:8px;border:1px solid var(--border);background:var(--glass-bg);color:var(--text)"></div>
        <div style="width:120px"><div style="font-size:13px;font-weight:700;margin-bottom:6px;">Weight (kg)</div><input id="calcWeight" type="number" placeholder="2.25" style="width:100%;padding:10px;border-radius:8px;border:1px solid var(--border);background:var(--glass-bg);color:var(--text)"></div>
      </div>

      <div><div style="font-weight:700;margin-bottom:6px;">Variant Mutation (Choose One — click again to disable)</div><div class="segmented" id="variantGroup"></div></div>
      <div><div style="font-weight:700;margin-bottom:6px;">Weather Mutation (Choose One — click again to disable)</div><div class="segmented" id="weatherGroup"></div></div>

      <div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
          <div style="font-weight:700;">Mutations (Multiple Allowed)</div>
          <div><button id="selectAllMuts" class="seg-btn" type="button">Select All</button></div>
        </div>
        <div id="mutationsGroup" style="display:flex;flex-wrap:wrap;gap:8px;"></div>
      </div>

      <div style="display:flex;gap:12px;align-items:center;">
        <div style="display:flex;flex-direction:column;gap:6px;">
          <label style="font-weight:700">Friends nearby: <span id="friendBadge">0 (+0%)</span></label>
          <input id="friendSlider" type="range" min="0" max="5" step="1" value="0" style="width:220px;">
          <div class="row-muted" style="font-size:12px">Click the slider to open full-screen friend control.</div>
        </div>
      </div>

      <div style="display:flex;gap:12px;align-items:center;">
        <button id="calculateBtn" style="padding:10px 16px;border-radius:10px;border:none;background:linear-gradient(90deg,var(--accent),var(--accent-2));color:white;cursor:pointer;">Calculate</button>
        <div id="calcResult" style="font-weight:700;"></div>
      </div>

      <hr>

      <div style="display:flex;flex-direction:column;gap:8px;">
        <div style="font-weight:800">⚖️ Weight Estimator (Reverse Calculator)</div>
        <div style="display:flex;gap:8px;align-items:center">
          <input id="targetPrice" type="number" placeholder="Target price (e.g., 1000000)" style="flex:1;padding:10px;border-radius:8px;border:1px solid var(--border);background:var(--glass-bg);color:var(--text)">
          <button id="estimateWeightBtn" style="padding:10px 14px;border-radius:10px;border:none;background:linear-gradient(90deg,var(--accent),var(--accent-2));color:white;cursor:pointer;">Estimate Weight</button>
        </div>
        <div id="weightEstimateResult" class="row-muted"></div>
        <div style="font-size:13px;" class="row-muted">How it works: the estimator calls the same calculate endpoint repeatedly and searches for a weight that produces the target price with your selected modifiers.</div>
      </div>
    </div>
  `;
  const vwrap = document.getElementById('variantGroup'), wwrap = document.getElementById('weatherGroup'), mwrap = document.getElementById('mutationsGroup');

  VARIANTS.forEach(v => {
    const b=document.createElement('button');
    b.className='seg-btn';
    b.textContent = v.label;
    b.dataset.val = v.id;
    b.setAttribute('type','button');
    b.setAttribute('aria-pressed','false');
    b.addEventListener('click', ()=>{
      const was = b.classList.contains('toggled');
      vwrap.querySelectorAll('.seg-btn').forEach(x=>{
        x.classList.remove('toggled');
        x.setAttribute('aria-pressed','false');
      });
      if(!was){
        b.classList.add('toggled');
        b.setAttribute('aria-pressed','true');
        selectedVariant = v.id;
      } else {
        selectedVariant = '';
      }
    });
    vwrap.appendChild(b);
  });

  WEATHER_VARIANTS.forEach(w => {
    const b=document.createElement('button');
    b.className='seg-btn';
    b.textContent = w.label;
    b.dataset.val = w.id;
    b.setAttribute('type','button');
    b.setAttribute('aria-pressed','false');
    b.addEventListener('click', ()=>{
      const was = b.classList.contains('toggled');
      wwrap.querySelectorAll('.seg-btn').forEach(x=>{
        x.classList.remove('toggled');
        x.setAttribute('aria-pressed','false');
      });
      if(!was){
        b.classList.add('toggled');
        b.setAttribute('aria-pressed','true');
        selectedWeather = w.id;
      } else {
        selectedWeather = '';
      }
    });
    wwrap.appendChild(b);
  });

  MUTATIONS.forEach(m => {
    const btn=document.createElement('button');
    btn.className='mut-chip';
    btn.textContent = `${m.label}${m.mult?` (x${m.mult})`:''}`;
    btn.dataset.val=m.id;
    btn.setAttribute('type','button');
    btn.setAttribute('aria-pressed','false');
    btn.addEventListener('click', ()=>{
      const id=btn.dataset.val;
      if(selectedMutations.has(id)){
        selectedMutations.delete(id);
        btn.classList.remove('selected');
        btn.setAttribute('aria-pressed','false');
      } else {
        selectedMutations.add(id);
        btn.classList.add('selected');
        btn.setAttribute('aria-pressed','true');
      }
    });
    mwrap.appendChild(btn);
  });

  document.getElementById('selectAllMuts').addEventListener('click', ()=>{
    const allIds = MUTATIONS.map(m=>m.id);
    const currently = selectedMutations.size;
    if(currently < allIds.length){
      selectedMutations = new Set(allIds);
      mwrap.querySelectorAll('.mut-chip').forEach(b => { b.classList.add('selected'); b.setAttribute('aria-pressed','true'); });
      document.getElementById('selectAllMuts').textContent = 'Deselect All';
    } else {
      selectedMutations.clear();
      mwrap.querySelectorAll('.mut-chip').forEach(b => { b.classList.remove('selected'); b.setAttribute('aria-pressed','false'); });
      document.getElementById('selectAllMuts').textContent = 'Select All';
    }
  });

  // friend overlay full-screen (simple)
  const friendSlider = document.getElementById('friendSlider');
  const friendBadge = document.getElementById('friendBadge');

  let friendOverlay = document.getElementById('friendOverlay');
  if(!friendOverlay){
    friendOverlay = document.createElement('div');
    friendOverlay.id = 'friendOverlay';
    friendOverlay.style = "position:fixed;inset:0;display:none;align-items:center;justify-content:center;z-index:220;background:rgba(6,8,12,0.85);backdrop-filter:blur(6px);";
    friendOverlay.innerHTML = `<div class="friendBox" style="background:var(--card);padding:28px;border-radius:14px;max-width:720px;width:94%;text-align:center;border:1px solid var(--border)"><h2 id="friendTitle">Friends Nearby</h2><div class="bigNum" id="friendBigCount">0 (+0%)</div><input id="friendBigSlider" type="range" min="0" max="5" step="1" value="0" style="width:100%"><div style="margin-top:12px;color:var(--muted);font-size:13px">Each friend increases value by 10%.</div><button class="closeBtn" id="closeFriendOverlay" style="margin-top:12px;padding:10px 14px;border-radius:10px;border:none;background:linear-gradient(90deg,var(--accent),var(--accent-2));color:white;cursor:pointer">Done</button></div>`;
    document.body.appendChild(friendOverlay);
  }
  const friendBigSlider = document.getElementById('friendBigSlider');
  const friendBigCount = document.getElementById('friendBigCount');
  const closeFriendOverlay = document.getElementById('closeFriendOverlay');

  function updateFriendDisplay(n){
    friendCount = Number(n) || 0;
    const pct = Math.round(friendCount * 10);
    friendBadge.textContent = `${friendCount} (+${pct}%)`;
    if(friendBigCount) friendBigCount.textContent = `${friendCount} (+${pct}%)`;
    if(friendSlider) friendSlider.value = friendCount;
    if(friendBigSlider) friendBigSlider.value = friendCount;
  }

  friendSlider.addEventListener('click', (ev)=>{ ev.stopPropagation(); friendOverlay.style.display='flex'; friendOverlay.setAttribute('aria-hidden','false'); });
  friendSlider.addEventListener('input', ()=> updateFriendDisplay(friendSlider.value) );
  friendBigSlider.addEventListener('input', ()=> updateFriendDisplay(friendBigSlider.value) );
  closeFriendOverlay.addEventListener('click', ()=>{ friendOverlay.style.display='none'; friendOverlay.setAttribute('aria-hidden','true'); });

  updateFriendDisplay(0);

  document.getElementById('calculateBtn').addEventListener('click', async ()=>{
    const crop = document.getElementById('calcCrop').value.trim(); const weight = parseFloat(document.getElementById('calcWeight').value);
    friendCount = Number(friendSlider.value) || 0;
    if(!crop || isNaN(weight)){ document.getElementById('calcResult').textContent='Please enter Crop and Weight.'; return; }
    let url = `https://api.joshlei.com/v2/growagarden/calculate?Name=${encodeURIComponent(crop)}&Weight=${encodeURIComponent(weight)}`;
    if(selectedVariant) url += `&Variant=${encodeURIComponent(selectedVariant)}`; if(selectedWeather) url += `&Weather=${encodeURIComponent(selectedWeather)}`;
    if(selectedMutations.size) url += `&Mutations=${encodeURIComponent([...selectedMutations].join(','))}`;
    try{
      const res = await fetch(url, { headers:{ 'accept':'application/json','jstudio-key':API_KEY } }); 
      const data = await res.json();
      const baseApiValue = Number(data.value||0);
      const friendMultiplier = 1 + (friendCount * 0.10);
      const final = Math.ceil(baseApiValue * friendMultiplier);
      document.getElementById('calcResult').textContent = `Estimated value: ${final.toLocaleString()}`;
    }catch(e){ console.error(e); document.getElementById('calcResult').textContent='Error fetching data.'; }
  });

  async function calcPriceViaApi(crop, weight, variant, weather, mutationsSet, friendsN){
    let url = `https://api.joshlei.com/v2/growagarden/calculate?Name=${encodeURIComponent(crop)}&Weight=${encodeURIComponent(weight)}`;
    if(variant) url += `&Variant=${encodeURIComponent(variant)}`;
    if(weather) url += `&Weather=${encodeURIComponent(weather)}`;
    if(mutationsSet && mutationsSet.size) url += `&Mutations=${encodeURIComponent([...mutationsSet].join(','))}`;
    const res = await fetch(url, { headers:{ 'accept':'application/json','jstudio-key':API_KEY } });
    if(!res.ok) throw new Error('API error');
    const data = await res.json();
    let baseApiValue = Number(data.value||0);
    const friendMultiplier = 1 + ((friendsN || 0) * 0.10);
    const final = Math.ceil(baseApiValue * friendMultiplier);
    return final;
  }

  async function estimateWeightForTarget(targetPrice){
    targetPrice = Number(targetPrice);
    if(!targetPrice || isNaN(targetPrice) || targetPrice <= 0) return { error: 'Enter a valid positive target price.' };
    const crop = document.getElementById('calcCrop').value.trim();
    if(!crop) return { error: 'Enter Crop (Name) to estimate for.' };
    const maxWeight = 1e7;
    const minWeight = 0.0001;
    const maxIters = 40;
    const tolerance = 1;
    let lo = minWeight, hi = maxWeight;
    try{
      const hiPrice = await calcPriceViaApi(crop, hi, selectedVariant, selectedWeather, selectedMutations, friendCount);
      if(hiPrice < targetPrice - tolerance) return { error: `Target too high — even ${hi.toLocaleString()} kg produces only ${hiPrice.toLocaleString()}` };
    }catch(err){
      return { error: 'Error querying API during estimation.' };
    }
    let resultWeight = null;
    for(let i=0;i<maxIters;i++){
      const mid = (lo + hi) / 2;
      try{
        const midPrice = await calcPriceViaApi(crop, mid, selectedVariant, selectedWeather, selectedMutations, friendCount);
        if(Math.abs(midPrice - targetPrice) <= tolerance){
          resultWeight = mid;
          break;
        }
        if(midPrice < targetPrice) lo = mid;
        else hi = mid;
        resultWeight = mid;
      }catch(e){
        return { error: 'Error querying API during estimation.' };
      }
    }
    return { weight: resultWeight };
  }

  document.getElementById('estimateWeightBtn').addEventListener('click', async ()=>{
    const target = Number(document.getElementById('targetPrice').value);
    document.getElementById('weightEstimateResult').textContent = 'Estimating — this may take a few seconds...';
    friendCount = Number(document.getElementById('friendSlider').value) || 0;
    try{
      const out = await estimateWeightForTarget(target);
      if(out.error) document.getElementById('weightEstimateResult').textContent = out.error;
      else { const w = Math.max(0, out.weight || 0); document.getElementById('weightEstimateResult').textContent = `Estimated weight: ${Number(w).toFixed(4)} kg (approx)`; }
    }catch(e){ console.error(e); document.getElementById('weightEstimateResult').textContent = 'Error during weight estimation.'; }
  });
}

/* ---------- Encyclopedia (cards + recipes) ---------- */
document.getElementById('encyclopediaBtn')?.addEventListener('click', ()=>{ showModal('Encyclopedia', renderEncyclopedia); });

async function renderEncyclopedia(){
  modalBody.innerHTML = `
    <div class="encyclopedia">
      <div class="enc-controls">
        <div class="enc-search"><input id="encSearch" placeholder="Search items, mutations, weather..." style="padding:10px;border-radius:8px;border:1px solid var(--border);background:var(--glass-bg);color:var(--text);width:100%"></div>
        <div class="spacer"></div>
        <div class="row-muted" id="encCounts">—</div>
      </div>
      <div class="enc-tabs" id="encTabsTop"></div>
      <div style="overflow:auto">
        <div id="encBody" style="padding-top:8px"></div>
      </div>
      <div class="enc-tabs" id="encTabsBottom" style="margin-top:8px"></div>
    </div>
  `;

  try{
    const res = await fetch('https://api.joshlei.com/v2/growagarden/info', { headers:{ 'accept':'application/json','jstudio-key':API_KEY }});
    const data = await res.json();
    const counts = {}; for(const it of data) counts[it.type] = (counts[it.type]||0)+1;

    const top = document.getElementById('encTabsTop'), bot = document.getElementById('encTabsBottom'); top.innerHTML=''; bot.innerHTML='';
    const allTop = document.createElement('button'); allTop.className='enc-tab active'; allTop.textContent = `All (${data.length})`; top.appendChild(allTop); bot.appendChild(allTop.cloneNode(true));
    const recipesTop = document.createElement('button'); recipesTop.className='enc-tab'; recipesTop.textContent = `Recipes (${RECIPES.length})`; top.appendChild(recipesTop); bot.appendChild(recipesTop.cloneNode(true));

    Object.entries(counts).forEach(([t,c])=>{
      const bTop=document.createElement('button'); bTop.className='enc-tab'; bTop.textContent=`${t} (${c})`; top.appendChild(bTop);
      const bBot=bTop.cloneNode(true); bot.appendChild(bBot);
      const handler = ()=>{ Array.from(top.children).forEach(x=>x.classList.remove('active')); Array.from(bot.children).forEach(x=>x.classList.remove('active')); bTop.classList.add('active'); bBot.classList.add('active'); renderEncRows(data, t); };
      bTop.addEventListener('click', handler); bBot.addEventListener('click', handler);
    });

    recipesTop.addEventListener('click', ()=>{ Array.from(top.children).forEach(x=>x.classList.remove('active')); Array.from(bot.children).forEach(x=>x.classList.remove('active')); recipesTop.classList.add('active'); renderRecipes(); });
    allTop.addEventListener('click', ()=>{ Array.from(top.children).forEach(x=>x.classList.remove('active')); Array.from(bot.children).forEach(x=>x.classList.remove('active')); allTop.classList.add('active'); renderEncRows(data); });

    document.getElementById('encCounts').textContent = `${data.length} results`;
    document.getElementById('encSearch').addEventListener('input', ()=> renderEncRows(data, null, document.getElementById('encSearch').value.trim()));

    renderEncRows(data);
  }catch(e){ document.getElementById('encBody').innerHTML = `<div class="row-muted">Error loading encyclopedia.</div>`; }

  function renderEncRows(items, filterType=null, q=''){
    const encBody = document.getElementById('encBody'); q=(q||'').toLowerCase();
    let rows = items.filter(it=> { if(filterType && it.type!==filterType) return false; if(!q) return true; return (it.display_name||'').toLowerCase().includes(q) || (it.id||'').toLowerCase().includes(q) || (it.description||'').toLowerCase().includes(q); });
    if(rows.length===0){ encBody.innerHTML = `<div class="row-muted">No results.</div>`; return; }

    // static cards (no View button/click)
    const gridHtml = rows.map(it=>{
      const priceFormatted = (it.type || '').toLowerCase().includes('weather') ? null : formatPriceNum(it.price);
      const idVal = it.id || it.item_id || canonicalId(it.display_name || '');
      const desc = (it.description || '').slice(0,140);
      const icon = it.icon ? it.icon : API_IMAGE(it.display_name || idVal);
      return `
      <div class="card" style="padding:12px;">
        <div style="display:flex;gap:12px;align-items:center">
          <img src="${icon}" alt="${esc(it.display_name)}" style="width:52px;height:52px;border-radius:8px;object-fit:cover" onerror="this.onerror=null;this.src='${API_IMAGE(it.display_name||idVal)}'">
          <div style="flex:1">
            <div style="font-weight:800">${esc(it.display_name)}</div>
            <div class="row-muted" style="font-size:13px">${esc(desc)}</div>
          </div>
        </div>
        <div style="display:flex;gap:8px;align-items:center;margin-top:8px">
          <div class="row-muted" style="font-size:12px">${esc(it.type||'')}</div>
          <div style="margin-left:auto;font-weight:700">${priceFormatted ?? ''}</div>
        </div>
      </div>`;
    }).join('');
    encBody.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px">${gridHtml}</div>`;
  }

  function renderRecipes(){
    const encBody = document.getElementById('encBody');
    if(!RECIPES || RECIPES.length===0){ encBody.innerHTML = `<div class="row-muted">No recipes configured.</div>`; return; }
    const html = RECIPES.map(r=>{
      const variantsHtml = r.variants.map(v=>`<div style="margin-bottom:6px;"><strong>${esc(v.rarity)}</strong><div style="color:var(--muted);margin-top:4px">${esc(v.ingredients.join(', '))}</div></div>`).join('');
      return `<div class="card" style="padding:12px">
        <div style="display:flex;gap:12px;align-items:center">
          <div style="font-size:26px">${r.emoji||'🍽'}</div>
          <div style="flex:1"><div style="font-weight:800">${esc(r.name)}</div><div class="row-muted">${r.variants.length} variant(s)</div></div>
        </div>
        <div style="margin-top:8px">${variantsHtml}</div>
      </div>`;
    }).join('');
    encBody.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:12px">${html}</div>`;
  }
}

/* ---------- Restock UI update ---------- */
function updateRestockUI(){
  if(!restockTimes || !Object.keys(restockTimes).length) restockTimes = calculateRestockTimes();
  function mapKey(catKey){
    if(catKey === 'seed_stock') return 'seeds';
    if(catKey === 'gear_stock') return 'gear';
    if(catKey === 'egg_stock') return 'egg';
    if(catKey === 'cosmetic_stock') return 'cosmetics';
    if(catKey === 'eventshop_stock') return 'event';
    if(catKey === 'travelingmerchant_stock') return 'merchant';
    return 'seeds';
  }
  function update(){
    const now = Date.now();
    for(const cat of ['seed_stock','gear_stock','egg_stock','cosmetic_stock','eventshop_stock','travelingmerchant_stock']){
      const k = mapKey(cat);
      const next = restockTimes[k] || 0;
      const left = Math.max(0, next - now);
      const matches = document.querySelectorAll(`[id^="rest-${cat}-"]`);
      matches.forEach(el => { el.textContent = `Next restock: ${formatCountdown(left)}`; });
    }
    const seedsLeft = Math.max(0,(restockTimes.seeds||0)-now);
    const gearLeft = Math.max(0,(restockTimes.gear||0)-now);
    const eggLeft = Math.max(0,(restockTimes.egg||0)-now);
    const cosmeticsLeft = Math.max(0,(restockTimes.cosmetics||0)-now);
    const eventLeft = Math.max(0,(restockTimes.event||0)-now);
    restockTimersEl.textContent = `Seeds: ${formatCountdown(seedsLeft)} • Gear: ${formatCountdown(gearLeft)} • Eggs: ${formatCountdown(eggLeft)} • Cosmetics: ${formatCountdown(cosmeticsLeft)} • Event: ${formatCountdown(eventLeft)}`;

    if(seedsLeft<=0||gearLeft<=0||eggLeft<=0||cosmeticsLeft<=0||eventLeft<=0) restockTimes = calculateRestockTimes();
  }
  update();
  clearInterval(updateRestockUI._intervalId);
  updateRestockUI._intervalId = setInterval(update,1000);
}

/* ensure accordion per-card only */
function ensureAccordion(card, body){ const open = card.classList.contains('open'); body.style.maxHeight = open ? (body.scrollHeight + 'px') : '0px'; window.addEventListener('resize', ()=>{ if(card.classList.contains('open')) body.style.maxHeight = body.scrollHeight + 'px'; }); }

/* sync lastKnownQty from latestStock for watched items so we don't spam historic changes */
function syncLastKnownQtyFromLatest(){
  if(!latestStock) return;
  const pools = [latestStock.seed_stock||[], latestStock.gear_stock||[], latestStock.egg_stock||[], latestStock.cosmetic_stock||[], latestStock.eventshop_stock||[], (latestStock.travelingmerchant_stock && latestStock.travelingmerchant_stock.stock) || []].flat();
  for(const name of [...watchSet]){
    const match = pools.find(it => it.display_name === name);
    const qty = match ? Number(match.quantity || 0) : 0;
    lastKnownQty[name] = qty;
  }
}

/* initial UI boot */
(function initUI(){ buildSideSections(); renderWatchlist(); updateRestockUI(); })();

/* ensure watchlist DOM present */
(function ensureWatchlist(){ let w = document.getElementById('watchlist'); if(!w){ const el = document.createElement('div'); el.id='watchlist'; document.getElementById('sideBody').appendChild(el); } })();

</script>
</body>
</html>
