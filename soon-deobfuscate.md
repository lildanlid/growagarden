<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grow a Garden Tracker | Live Stock & Weather</title>
    <meta name="description" content="Live, real-time tracker for the Grow a Garden game. Monitor shop stock, get weather alerts, and never miss a rare item with our personalized watchlist and notification system.">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌱</text></svg>">
    
    <!-- External Libraries & Fonts -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

    <!-- Custom CSS Styles -->
    <style>
        :root { --bg-dark-teal: #2E5953; --bg-medium-mint: #8FB3A3; --bg-light-blue-gray: #B6C9CC; --text-pale-peach: #F2D8C9; --accent-soft-orange: #F2A789; --accent-terracotta: #D98361; --dark-bg: #2E5953; --dark-text: #F2D8C9; --light-bg: #fdfbf7; --light-text: #3f3c3a; }
        html.dark body { background-color: var(--dark-bg); color: var(--dark-text); }
        html.light body { background-color: var(--light-bg); color: var(--light-text); }
        body { font-family: 'Nunito', sans-serif; transition: background-color 0.5s ease, color 0.5s ease; overflow-x: hidden; }
        .font-header { font-family: 'Fredoka One', cursive; }
        html.dark .font-header { text-shadow: 1px 1px 0 #3a3a3a, -1px -1px 0 #3a3a3a, 1px -1px 0 #3a3a3a, -1px 1px 0 #3a3a3a, 4px 4px 6px rgba(0,0,0,0.3); }
        html.light .font-header { color: #2E5953; text-shadow: 1px 1px 0px rgba(255,255,255,0.8); }
        .section-container { transition: background-color 0.5s ease, border-color 0.5s ease; }
        html.dark .section-container { background-color: rgba(0,0,0,0.2); backdrop-filter: blur(4px); border-color: rgba(143, 179, 163, 0.3); }
        html.light .section-container { background-color: rgba(255,255,255,0.7); backdrop-filter: blur(4px); border-color: rgba(46, 89, 83, 0.2); }
        .item-card { position: relative; z-index: 1; transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, opacity 0.3s ease, filter 0.3s ease; border: 1px solid transparent; animation: card-fade-in 0.5s ease-out forwards; }
        @keyframes card-fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        html.dark .item-card { background-color: rgba(46, 89, 83, 0.5); }
        html.light .item-card { background-color: #ffffff; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); }
        .item-card.out-of-stock { opacity: 0.6; filter: grayscale(80%); }
        html.dark .item-card:hover { transform: translateY(-8px); box-shadow: 0 0 25px 5px var(--rarity-glow-color, rgba(242, 167, 137, 0.4)); border-color: var(--rarity-glow-color, var(--accent-soft-orange)); z-index: 10; }
        html.light .item-card:hover { transform: translateY(-8px); box-shadow: 0 10px 25px -5px var(--rarity-glow-color, rgba(217, 131, 97, 0.4)), 0 8px 10px -6px var(--rarity-glow-color, rgba(217, 131, 97, 0.4)); border-color: var(--rarity-glow-color, var(--accent-soft-orange)); z-index: 10; }
        .item-card.out-of-stock:hover { opacity: 1; filter: grayscale(0); }
        .shop-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem; transition: opacity 0.3s ease-out; }
        .rarity-tag { padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; }
        .rarity-prismatic { background: linear-gradient(90deg, #ec4899, #f59e0b, #84cc16, #14b8a6, #6366f1, #d946ef, #ec4899); background-size: 300% 300%; animation: prismatic-glow 4s linear infinite; color: white; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);}
        @keyframes prismatic-glow { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        .sprout-loader .seed { animation: grow-seed 2s ease-out infinite; transform-origin: bottom center; }
        .sprout-loader .sprout { animation: grow-sprout 2s ease-out infinite; transform-origin: bottom center; transform: scale(0); }
        @keyframes grow-seed { 0%, 100% { transform: scale(1); } 50% { transform: scale(0.9); } }
        @keyframes grow-sprout { 0% { transform: scale(0) translateY(10px); } 50% { transform: scale(1) translateY(0); } 100% { transform: scale(1) translateY(0) rotate(10deg); } }
        #weather-bg-container { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -10; pointer-events: none; }
        .weather-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; transition: opacity 1.5s ease; opacity: 0; }
        .weather-bg.active { opacity: 1; }
        .rain-drop { position: absolute; bottom: 100%; width: 2px; height: 80px; background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(182, 201, 204, 0.5)); animation: fall 1s linear infinite; }
        .chocolate-drop { background: linear-gradient(to bottom, rgba(0, 0, 0, 0), #582f0e); }
        @keyframes fall { to { transform: translateY(110vh); } }
        .star { position: absolute; background: white; border-radius: 50%; animation: twinkle 5s infinite ease-in-out; }
        @keyframes twinkle { 0%, 100% { opacity: 0.1; } 50% { opacity: 1; } }
        .bee { position: absolute; width: 10px; height: 10px; background: #facc15; border-radius: 50%; animation: bee-flight 8s linear infinite; opacity: 0.8; }
        .bee::before, .bee::after { content: ''; position: absolute; width: 4px; height: 4px; background: rgba(255,255,255,0.5); border-radius: 50%; top: -2px; }
        .bee::before { left: 1px; animation: flap-left 0.1s linear infinite alternate; }
        .bee::after { right: 1px; animation: flap-right 0.1s linear infinite alternate; }
        @keyframes bee-flight { from { transform: translateX(-10vw) translateY(var(--start-y)); } to { transform: translateX(110vw) translateY(var(--end-y)); } }
        @keyframes flap-left { from { transform: rotate(-30deg); } to { transform: rotate(30deg); } }
        @keyframes flap-right { from { transform: rotate(30deg); } to { transform: rotate(-30deg); } }
        .weather-bg.dark-mode { background: linear-gradient(160deg, #1e1b4b, #2E5953 80%); }
        .weather-bg.light-mode { background: linear-gradient(to bottom, #87CEEB, #f0f9ff); }
        .weather-bg.thunderstorm-bg { animation: lightning-flash 8s infinite steps(1, end); background-color: #111827}
        @keyframes lightning-flash { 80% { background-color: #111827; } 81% { background-color: #e9d5ff; } 82% { background-color: #111827; } 83% { background-color: #e9d5ff; } 84% { background-color: #111827; } }
        .weather-bg.bloodmoon-bg { background: linear-gradient(160deg, #3b0764, #7f1d1d 80%); }
        .weather-bg.frost-bg { background: linear-gradient(to bottom, #e0f2fe, #a5f3fc); }
        .weather-bg.heatwave-bg { background: linear-gradient(to bottom, #ffc107, #ff9800); }
        .weather-bg.heatwave-bg::after { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%); animation: heat-shimmer 2s linear infinite; }
        @keyframes heat-shimmer { 0% { transform: translateX(-20%); } 100% { transform: translateX(20%); } }
        .wind-streak { position: absolute; top: var(--top-pos); left: -10%; width: 50px; height: 1px; background: rgba(255,255,255,0.7); animation: wind-blow 1s linear infinite; }
        @keyframes wind-blow { from { transform: translateX(0); opacity: 0.7; } to { transform: translateX(120vw) scaleX(2); opacity: 0; } }
        .emoji-particle { position: absolute; font-size: 2rem; animation: fall 5s linear infinite; opacity: 0.8; }
        .tornado { position: absolute; bottom: 0; left: 50%; width: 0; height: 0; border-left: 50px solid transparent; border-right: 50px solid transparent; border-bottom: 200px solid rgba(128,128,128,0.3); animation: tornado-spin 5s linear infinite; transform-origin: bottom center; }
        .tornado::before, .tornado::after { content: ''; position: absolute; width: 0; height: 0; border-left: 25px solid transparent; border-right: 25px solid transparent; }
        .tornado::before { top: 50px; left: -25px; border-bottom: 100px solid rgba(128,128,128,0.4); animation: tornado-spin 1s linear infinite reverse; }
        .tornado::after { top: 100px; left: -25px; border-bottom: 50px solid rgba(128,128,128,0.5); animation: tornado-spin 0.5s linear infinite; }
        @keyframes tornado-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .item-card .icon-button { background: rgba(255,255,255,0.1); border-radius: 9999px; padding: 0.5rem; transition: all 0.2s ease; font-size: 1.25rem; line-height: 1; }
        .item-card .icon-button:hover { background: rgba(255,255,255,0.2); transform: scale(1.1); }
        .watch-button.active .star-icon { color: #facc15; text-shadow: 0 0 8px #fde047; }
        #notification-bell { color: #9ca3af; transition: color 0.3s, transform 0.3s; }
        #notification-bell.enabled { color: #facc15; text-shadow: 0 0 8px #fde047; }
        #notification-bell.denied { color: #ef4444; text-decoration: line-through; }
        #notification-bell.ringing { animation: bell-ring 0.5s ease-in-out; }
        @keyframes bell-ring { 0% { transform: rotate(0); } 10% { transform: rotate(14deg); } 20% { transform: rotate(-8deg); } 30% { transform: rotate(14deg); } 40% { transform: rotate(-4deg); } 50% { transform: rotate(10deg); } 60% { transform: rotate(0); } 100% { transform: rotate(0); } }
        .market-stall { transition: all 0.3s ease; border-bottom: 4px solid transparent; }
        .market-stall.active { border-color: var(--accent-terracotta); transform: translateY(-4px); }
        html.light .market-stall.active { border-color: var(--accent-soft-orange); }
        #rare-item-spotlight .spotlight-content { transition: opacity 0.5s ease-in-out; }
        .display-toggle { cursor: pointer; padding: 0.5rem 1rem; border-radius: 9999px; transition: color 0.3s ease; flex: 1; text-align: center; position: relative; z-index: 1; }
        .display-toggle.active { color: white; }
        html.light .display-toggle.active { color: var(--light-text); }
        #display-glider { position: absolute; top: 4px; left: 4px; height: calc(100% - 8px); width: calc(50% - 4px); border-radius: 9999px; background-color: var(--accent-terracotta); transition: transform 0.3s ease-in-out; }
        html.light #display-glider { background-color: var(--accent-soft-orange); }
        .header-item { animation: header-fade-in 0.6s 0.2s backwards; }
        @keyframes header-fade-in { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .header-icon { animation: header-icon-pop-in 0.5s 0.4s backwards; }
        @keyframes header-icon-pop-in { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } }
        .header-sprout { display: inline-block; animation: header-sprout-grow 0.8s 0.6s cubic-bezier(0.6, -0.28, 0.735, 0.045) backwards, sway 4s ease-in-out infinite alternate; }
        @keyframes header-sprout-grow { from { transform: scale(0); } to { transform: scale(1); } }
        @keyframes sway { from { transform: rotate(-8deg); } to { transform: rotate(8deg); } }
        .header-content-wrapper { max-height: 500px; overflow: hidden; transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .header-content-wrapper.header-hidden { max-height: 0; }
        .arrow { transform-origin: center; transition: transform 0.3s ease-in-out; }
        .arrow.rotate { transform: rotate(180deg); }
    </style>
</head>
<body>
    <div id="weather-bg-container"></div>

    <div id="loading-overlay" class="fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center z-50 transition-opacity duration-500">
        <div class="text-center">
            <div class="sprout-loader mx-auto w-24 h-24 flex items-center justify-center">
                <div style="width: 100px; height: 100px; position: relative;">
                    <span class="seed" style="display:inline-block; width:20px; height:30px; background:#a16207; border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; position: absolute; bottom: 30px; left: 40px;"></span>
                    <span class="sprout" style="display:inline-block; width:10px; height:40px; background:#84cc16; border-radius: 100% 0% 100% 0% / 100% 100% 0% 0%; position: absolute; bottom: 30px; left: 45px;"></span>
                </div>
            </div>
            <p class="mt-4 text-lg text-gray-300">Planting the seeds of data...</p>
        </div>
    </div>

    <div id="header-container" class="relative sticky top-0 z-30 dark:bg-dark-teal/80 bg-light-bg/80 backdrop-blur-md">
        <div class="header-content-wrapper">
            <header class="text-center px-2 container mx-auto py-4">
                <div class="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
                     <h1 class="text-4xl sm:text-5xl md:text-6xl font-header order-2 sm:order-1 header-item">
                          <span class="header-sprout">🌱</span> Grow a Garden Tracker <span class="header-sprout">🌱</span>
                     </h1>
                     <div class="flex items-center ml-0 sm:ml-6 gap-2 order-1 sm:order-2">
                         <button id="notification-bell" class="icon-button p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-soft-orange header-icon" aria-label="Toggle notifications" title="Enable Watchlist Notifications">
                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                         </button>
                         <button id="theme-switcher" class="icon-button p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-soft-orange header-icon" aria-label="Toggle theme">
                             <svg class="dark:hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                             <svg class="hidden dark:inline" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                         </button>
                     </div>
                </div>
                <p class="text-lg opacity-80 header-item" style="animation-delay: 0.3s;">Your enhanced companion for tracking stock, weather, and rarities.</p>
            </header>
        </div>
        <button id="header-toggle-btn" class="absolute left-1/2 bottom-0 translate-y-full -translate-x-1/2 w-10 h-8 rounded-b-full bg-accent-soft-orange dark:bg-accent-terracotta text-white shadow-lg z-40 flex items-center justify-center" aria-label="Toggle Header" aria-expanded="true">
          <svg class="arrow w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"></path>
          </svg>
        </button>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 relative z-10">
        <section id="dashboard" class="mb-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2 flex flex-col gap-6">
                <div id="weather-section" class="section-container rounded-2xl p-6 shadow-xl border"></div>
                <div id="watchlist" class="section-container rounded-2xl p-6 shadow-xl border"></div>
            </div>
            <div class="lg:col-span-1 flex flex-col gap-6">
                <div id="rare-item-spotlight" class="section-container rounded-2xl p-6 shadow-xl border"></div>
                <div id="rare-item-log" class="section-container rounded-2xl p-6 shadow-xl border"></div>
            </div>
        </section>

        <section id="market-street" class="mb-8 p-4 section-container rounded-2xl">
            <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 class="text-3xl font-header text-center sm:text-left mb-4 sm:mb-0">Market Street</h2>
                <div class="flex-grow max-w-lg">
                    <input type="text" id="search-bar" placeholder="Search for items..." class="w-full px-4 py-2 rounded-full bg-white/20 dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent-terracotta)] transition-shadow">
                </div>
                <div id="display-toggle-container" class="relative flex items-center p-1 rounded-full border border-white/10 bg-gray-700/20">
                    <div id="display-glider" class="absolute top-1 left-1 h-[calc(100%-0.5rem)] w-1/2 rounded-full bg-[var(--accent-terracotta)] transition-all duration-300 ease-in-out"></div>
                    <button id="display-instock" class="display-toggle active">In Stock</button>
                    <button id="display-catalog" class="display-toggle">Full Catalog</button>
                </div>
            </div>
            <div id="shops-navigation" class="flex flex-wrap justify-center gap-4 md:gap-8"></div>
        </section>
        
        <main id="shops-container" class="mb-12 shop-grid"></main>
        
        <footer class="text-center mt-16 md:mt-20 py-8 border-t-[1px] dark:border-gray-700/50 border-gray-300/50">
            <p id="connection-status" class="opacity-70">Fetching data...</p>
            <p class="opacity-50 mt-4 text-sm">Data provided by JoshLei's API. This is an unofficial fan-made tool.</p>
        </footer>
    </div>
    
<script>
// --- CONSOLIDATED JAVASCRIPT ---

document.addEventListener('DOMContentLoaded', () => {

    // --- GLOBAL STATE & CONFIG ---
    const STOCK_URL = 'https://api.joshlei.com/v2/growagarden/stock';
    const WEATHER_URL = 'https://api.joshlei.com/v2/growagarden/weather';
    const LOGS_URL = 'https://api.allorigins.win/raw?url=https://growagardenapi.onrender.com/api';
    const API_KEY = 'js_c5d322d0652bc477f50348450bb2c6fe4f4d767042b2b0facb69b074c3d46f46';

    let currentStockData = {};
    let currentWeatherData = {};
    let logDataCache = { all: [] };
    let watchlist = JSON.parse(localStorage.getItem('growagarden_watchlist')) || [];
    let activeFilter = 'all';
    let showAllItems = false;
    let searchTerm = '';
    let notificationSynth = null;
    let previouslyWatchedItemsInStock = new Set();
    let previousWeatherName = null;
    let spotlightItems = [];
    let spotlightIndex = 0;
    let spotlightInterval;

    const rarityConfig = {
        'Common': { color: '#9ca3af', textColor: '#1f2937' },
        'Uncommon': { color: '#4ade80', textColor: '#1f2937' },
        'Rare': { color: '#60a5fa', textColor: '#1f2937' },
        'Legendary': { color: '#a78bfa', textColor: '#f9fafb' },
        'Mythical': { color: '#f472b6', textColor: '#f9fafb' },
        'Divine': { color: '#facc15', textColor: '#1f2937' },
        'Prismatic': { color: 'transparent', textColor: '#f9fafb' }
    };
    const rarityOrder = ['Common', 'Uncommon', 'Rare', 'Legendary', 'Mythical', 'Divine', 'Prismatic'];

    // --- ELEMENT SELECTORS ---
    const getEl = (id) => document.getElementById(id);
    const loadingOverlay = getEl('loading-overlay');
    const shopsContainer = getEl('shops-container');
    const weatherSection = getEl('weather-section');
    const watchlistSection = getEl('watchlist');
    const spotlightSection = getEl('rare-item-spotlight');
    const logSection = getEl('rare-item-log');
    const connectionStatus = getEl('connection-status');

    // --- UTILITY FUNCTIONS ---
    const formatTime = (unix) => new Date(unix * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const timeRemaining = (unixEnd) => {
        const diff = unixEnd - Math.floor(Date.now() / 1000);
        if (diff <= 0) return 'Restocked!';
        const h = Math.floor(diff / 3600).toString().padStart(2, '0');
        const m = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
        const s = Math.floor(diff % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    // --- CORE DATA FETCHING LOGIC ---
    function hideLoadingOverlay() {
        if (loadingOverlay && loadingOverlay.style.opacity !== '0') {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => loadingOverlay.style.display = 'none', 500);
        }
    }
    
    async function fetchData(url, options = {}, isJson = true) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return isJson ? await response.json() : await response.text();
        } catch (error) {
            console.error(`Failed to fetch from ${url}:`, error);
            return null; // Return null on failure
        }
    }

    async function fetchAllData() {
        connectionStatus.textContent = "Fetching latest data...";
        const headers = { 'jstudio-key': API_KEY, 'accept': 'application/json' };
        
        const [stockData, weatherData] = await Promise.all([
            fetchData(STOCK_URL, { headers }),
            fetchData(WEATHER_URL, { headers })
        ]);

        if (stockData) currentStockData = stockData;
        if (weatherData) currentWeatherData = weatherData;

        if (stockData && weatherData) {
            connectionStatus.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
        } else {
            connectionStatus.textContent = "Failed to update main data. Will try again shortly.";
        }

        updateUI(); // Update UI even if some data failed, to show what we have
    }
    
    // --- UI RENDERING ---
    function updateUI() {
        renderShops();
        renderWeather();
        renderWatchlist();
        checkWatchlistNotifications();
    }

    function renderShops() {
        if (!currentStockData.seed_stock) { // Check if stock data is available
            shopsContainer.innerHTML = `<p class="text-center col-span-full opacity-70">Loading shop data...</p>`;
            return;
        }

        const allItems = [];
        const shopOrder = ['seed_stock', 'gear_stock', 'cosmetic_stock', 'egg_stock', 'eventshop_stock', 'travelingmerchant_stock'];
        shopOrder.forEach(key => {
            let items = currentStockData[key];
            if (key === 'travelingmerchant_stock' && items) items = items.stock;
            if (Array.isArray(items)) allItems.push(...items.map(item => ({...item, shop: key})));
        });
        
        const rarityMap = new Map(logDataCache.all.map(item => [item.id, item.rarity]));

        const filteredItems = allItems.filter(item => {
            const searchMatch = !searchTerm || item.display_name.toLowerCase().includes(searchTerm.toLowerCase());
            const stockMatch = showAllItems || item.quantity > 0;
            const shopMatch = activeFilter === 'all' || item.shop === activeFilter;
            return searchMatch && stockMatch && shopMatch;
        });

        if (filteredItems.length === 0) {
            shopsContainer.innerHTML = `<p class="text-center col-span-full opacity-70">No items match your filters.</p>`;
            return;
        }
        
        shopsContainer.innerHTML = filteredItems.map(item => {
            const isInStock = item.quantity > 0;
            const isWatched = watchlist.some(w => w.id === item.item_id);
            const rarity = rarityMap.get(item.item_id) || 'Common';
            const rarityInfo = rarityConfig[rarity] || rarityConfig['Common'];
            
            return `
            <div class="item-card rounded-xl p-4 flex flex-col ${!isInStock ? 'out-of-stock' : ''}" style="--rarity-glow-color: ${rarityInfo.color}80;" data-item-id="${item.item_id}">
                <div class="flex justify-between items-start mb-2">
                    <div class="rarity-tag ${rarity === 'Prismatic' ? 'rarity-prismatic' : ''}" style="background-color: ${rarityInfo.color}; color: ${rarityInfo.textColor};">${rarity}</div>
                    <button class="watch-button icon-button ${isWatched ? 'active' : ''}" title="Add to Watchlist" data-id="${item.item_id}" data-name="${item.display_name}" data-icon="${item.icon}">
                        <svg class="star-icon w-5 h-5" fill="${isWatched ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.539 1.118l-3.975-2.888a1 1 0 00-1.176 0l-3.975-2.888c-.783.57-1.838-.196-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                    </button>
                </div>
                <div class="flex-grow flex items-center justify-center my-4">
                    <img src="${item.icon}" alt="${item.display_name}" class="max-h-24">
                </div>
                <h3 class="font-bold text-center text-lg">${item.display_name}</h3>
                <div class="mt-4 pt-4 border-t dark:border-gray-600/50 border-gray-300/50 text-sm space-y-1">
                    <div class="flex justify-between"><span>Stock:</span> <span class="font-semibold">${isInStock ? item.quantity : 'Out of Stock'}</span></div>
                    <div class="flex justify-between"><span>Restocks:</span> <span class="font-semibold timer" data-end-time="${item.end_date_unix}">${timeRemaining(item.end_date_unix)}</span></div>
                </div>
            </div>`;
        }).join('');
    }

    function renderWeather() {
        const weather = currentWeatherData.weather?.find(w => w.active);
        if (weather) {
            weatherSection.innerHTML = `<h2 class="text-2xl font-header mb-4">Weather Alert</h2>
                <div class="flex items-center gap-4">
                    <img src="${weather.icon}" alt="${weather.weather_name}" class="w-16 h-16">
                    <div> <p class="text-xl font-bold">${weather.weather_name}</p> <p class="opacity-80">${weather.weather_id.includes('bee') ? 'Spawns bees that create Pollinated mutations.' : 'A weather event is active.'}</p> </div>
                </div>`;
            setupWeatherEffects(weather.weather_name);
        } else {
            weatherSection.innerHTML = `<h2 class="text-2xl font-header mb-4">Weather Alert</h2><p>The skies are clear.</p>`;
            setupWeatherEffects('clear');
        }
    }

    function renderWatchlist() {
        watchlistSection.innerHTML = `<h2 class="text-2xl font-header mb-4">Your Watchlist ⭐</h2>`;
        if (watchlist.length === 0) {
            watchlistSection.innerHTML += `<p class="opacity-70">Click the star on an item to track it here!</p>`;
            return;
        }
        const list = watchlist.map(item => {
            const stockItem = findItemInStock(item.id);
            const inStockClass = stockItem ? 'text-green-400' : 'opacity-60';
            return `
            <div class="flex items-center justify-between py-2 border-b dark:border-gray-700/50 border-gray-300/50">
                <div class="flex items-center gap-4"> <img src="${item.icon}" alt="${item.name}" class="w-10 h-10"> <span class="font-semibold">${item.name}</span> </div>
                <span class="${inStockClass} font-bold">${stockItem ? 'IN STOCK!' : 'Not in stock'}</span>
            </div>`;
        }).join('');
        watchlistSection.innerHTML += `<div class="space-y-2">${list}</div>`;
    }
    
    async function fetchAndRenderRareLogs() {
        spotlightSection.innerHTML = `<h2 class="text-2xl font-header mb-4">Rare Spotlight ✨</h2><div class="spotlight-content"><p class="opacity-70">Loading...</p></div>`;
        logSection.innerHTML = `<h2 class="text-2xl font-header mb-4">Rare Appearance Log</h2><p class="opacity-70">Loading...</p>`;
        
        const rawLogText = await fetchData(LOGS_URL, {}, false);
        if (!rawLogText) {
            logSection.innerHTML = `<h2 class="text-2xl font-header mb-4">Rare Appearance Log</h2><p class="opacity-70">Could not load log data.</p>`;
            spotlightSection.innerHTML = `<h2 class="text-2xl font-header mb-4">Rare Spotlight ✨</h2><div class="spotlight-content"><p class="opacity-70">Could not load log data.</p></div>`;
            return;
        }
        
        try {
            const rawLogData = JSON.parse(rawLogText);
            logDataCache.all = Object.values(rawLogData.seeds_logs || {}).flat()
                .concat(Object.values(rawLogData.gear_logs || {}).flat())
                .concat(Object.values(rawLogData.egg_logs || {}).flat())
                .concat(Object.values(rawLogData.cosmetics_logs || {}).flat());

            spotlightItems = logDataCache.all
                .filter(item => item && item.rarity && rarityOrder.indexOf(item.rarity) >= 3)
                .sort((a, b) => b.timestamp_unix - a.timestamp_unix)
                .slice(0, 10); // Get top 10 for cycling
            
            updateSpotlight(); // Initial render
            if (spotlightInterval) clearInterval(spotlightInterval);
            spotlightInterval = setInterval(updateSpotlight, 7000); // Cycle every 7 seconds

            const logList = spotlightItems.slice(0, 5).map(item => {
                 const rarityInfo = rarityConfig[item.rarity] || rarityConfig['Common'];
                 return `<div class="flex items-center justify-between py-2">
                    <div class="flex items-center gap-3"> <img src="${item.icon}" alt="${item.name}" class="w-8 h-8"> <div> <p>${item.name}</p> <div class="text-xs rarity-tag ${item.rarity === 'Prismatic' ? 'rarity-prismatic' : ''}" style="background-color: ${rarityInfo.color}; color: ${rarityInfo.textColor};">${item.rarity}</div> </div> </div>
                    <span class="text-sm opacity-70">${formatTime(item.timestamp_unix)}</span>
                </div>`
            }).join('');
            logSection.innerHTML = `<h2 class="text-2xl font-header mb-4">Rare Appearance Log</h2><div class="space-y-1">${logList}</div>`;
        } catch(e) {
            console.error("Failed to parse log data:", e);
            logSection.innerHTML = `<h2 class="text-2xl font-header mb-4">Rare Appearance Log</h2><p class="opacity-70">Error parsing log data.</p>`;
        }
    }

    function updateSpotlight() {
        if (spotlightItems.length === 0) {
            spotlightSection.innerHTML = `<h2 class="text-2xl font-header mb-4">Rare Spotlight ✨</h2><div class="spotlight-content"><p class="opacity-70">No recent rare items found.</p></div>`;
            return;
        }

        const item = spotlightItems[spotlightIndex];
        const content = spotlightSection.querySelector('.spotlight-content');
        if (content) {
            content.style.opacity = 0;
            setTimeout(() => {
                content.innerHTML = `<div class="text-center"> <img src="${item.icon}" alt="${item.name}" class="mx-auto w-24 h-24 mb-2"> <p class="font-bold text-lg">${item.name}</p> <div class="inline-block mt-1 rarity-tag rarity-prismatic">${item.rarity}</div> </div>`;
                content.style.opacity = 1;
            }, 500);
        }
        
        spotlightIndex = (spotlightIndex + 1) % spotlightItems.length;
    }

    function updateTimers() {
        document.querySelectorAll('.timer').forEach(timer => {
            timer.textContent = timeRemaining(timer.dataset.endTime);
        });
    }

    // --- WATCHLIST & NOTIFICATIONS ---
    function findItemInStock(itemId) {
        if (!currentStockData || !currentStockData.seed_stock) return null;
        for (const shopKey in currentStockData) {
            let items = currentStockData[shopKey];
            if (shopKey === 'travelingmerchant_stock' && items) items = items.stock;
            const found = items?.find(item => item.item_id === itemId && item.quantity > 0);
            if (found) return found;
        }
        return null;
    }
    
    function toggleWatchlistItem(id, name, icon) {
        const index = watchlist.findIndex(item => item.id === id);
        if (index > -1) watchlist.splice(index, 1);
        else watchlist.push({ id, name, icon });
        localStorage.setItem('growagarden_watchlist', JSON.stringify(watchlist));
        updateUI();
    }

    function checkWatchlistNotifications() {
        if (Notification.permission !== 'granted') return;
        const currentInStock = new Set();
        watchlist.forEach(item => {
            if (findItemInStock(item.id)) currentInStock.add(item.id);
        });
        for (const itemId of currentInStock) {
            if (!previouslyWatchedItemsInStock.has(itemId)) {
                const item = watchlist.find(w => w.id === itemId);
                new Notification('Item in Stock!', { body: `${item.name} is now available in the shop!`, icon: item.icon });
                if (notificationSynth) notificationSynth.triggerAttackRelease("C5", "8n");
            }
        }
        previouslyWatchedItemsInStock = currentInStock;
    }
    
    // --- EVENT HANDLERS & SETUP ---
    function setupEventListeners() {
        getEl('theme-switcher').addEventListener('click', () => {
            const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
            document.documentElement.className = newTheme;
            localStorage.setItem('growagarden_theme', newTheme);
            setupWeatherEffects(previousWeatherName); 
        });

        getEl('notification-bell').addEventListener('click', () => {
            Tone.start();
            if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
                Notification.requestPermission().then(updateBellState);
            }
            updateBellState();
        });

        getEl('header-toggle-btn').addEventListener('click', (e) => {
            const wrapper = document.querySelector('.header-content-wrapper');
            const arrow = e.currentTarget.querySelector('.arrow');
            wrapper.classList.toggle('header-hidden');
            arrow.classList.toggle('rotate', wrapper.classList.contains('header-hidden'));
        });

        getEl('search-bar').addEventListener('input', e => { searchTerm = e.target.value; renderShops(); });
        getEl('display-instock').addEventListener('click', () => {
            showAllItems = false;
            getEl('display-instock').classList.add('active');
            getEl('display-catalog').classList.remove('active');
            getEl('display-glider').style.transform = 'translateX(0%)';
            renderShops();
        });
        getEl('display-catalog').addEventListener('click', () => {
            showAllItems = true;
            getEl('display-catalog').classList.add('active');
            getEl('display-instock').classList.remove('active');
            getEl('display-glider').style.transform = 'translateX(100%)';
            renderShops();
        });

        const shopsNav = getEl('shops-navigation');
        const shops = { 'All': 'all', 'Seeds': 'seed_stock', 'Gear': 'gear_stock', 'Pets': 'egg_stock', 'Cosmetics': 'cosmetic_stock', 'Events': 'eventshop_stock', 'Merchant': 'travelingmerchant_stock' };
        shopsNav.innerHTML = Object.entries(shops).map(([name, key]) => `<button class="market-stall px-4 py-2 rounded-t-lg font-bold ${key === 'all' ? 'active' : ''}" data-shop-key="${key}">${name}</button>`).join('');
        shopsNav.addEventListener('click', e => {
            if (e.target.matches('.market-stall')) {
                activeFilter = e.target.dataset.shopKey;
                shopsNav.querySelectorAll('.market-stall').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                renderShops();
            }
        });

        shopsContainer.addEventListener('click', e => {
            const button = e.target.closest('.watch-button');
            if (button) {
                const { id, name, icon } = button.dataset;
                toggleWatchlistItem(id, name, icon);
            }
        });
    }

    function updateBellState() {
        const bell = getEl('notification-bell');
        bell.classList.remove('enabled', 'denied', 'ringing');
        if (Notification.permission === 'granted') bell.classList.add('enabled');
        if (Notification.permission === 'denied') bell.classList.add('denied');
        bell.classList.add('ringing');
        bell.addEventListener('animationend', () => bell.classList.remove('ringing'), { once: true });
    }

    // --- ADVANCED WEATHER EFFECTS ---
    function setupWeatherEffects(weatherName) {
        if (!weatherName || weatherName === previousWeatherName) return;
        previousWeatherName = weatherName;
        const container = getEl('weather-bg-container');
        container.innerHTML = '';
        const isDark = document.documentElement.classList.contains('dark');
        const createBg = (extraClass = '') => {
            const bg = document.createElement('div');
            bg.className = `weather-bg ${extraClass} ${isDark ? 'dark-mode' : 'light-mode'}`;
            container.appendChild(bg); setTimeout(() => bg.classList.add('active'), 100); return bg;
        };
        const weather = weatherName.toLowerCase();
        if (weather.includes('clear')) createBg('clear-bg');
        else if (weather.includes('rain')) {
            const bg = createBg('rain-bg');
            for (let i = 0; i < 50; i++) {
                const drop = document.createElement('div'); drop.className = 'rain-drop'; if(weather.includes('chocolate')) drop.classList.add('chocolate-drop');
                drop.style.left = `${Math.random() * 100}vw`; drop.style.animationDelay = `${Math.random() * 2}s`; bg.appendChild(drop);
            }
        } else if (weather.includes('night')) {
            const bg = createBg('night-bg');
            for (let i = 0; i < 70; i++) {
                const star = document.createElement('div'); star.className = 'star'; star.style.width = star.style.height = `${Math.random() * 2 + 1}px`;
                star.style.top = `${Math.random() * 100}%`; star.style.left = `${Math.random() * 100}%`; star.style.animationDelay = `${Math.random() * 5}s`; bg.appendChild(star);
            }
        } else if (weather.includes('bee swarm')) {
            const bg = createBg('bee-swarm-bg');
            for (let i = 0; i < 15; i++) {
                const bee = document.createElement('div'); bee.className = 'bee'; bee.style.setProperty('--start-y', `${Math.random() * 100}vh`);
                bee.style.setProperty('--end-y', `${Math.random() * 100}vh`); bee.style.animationDelay = `${Math.random() * 8}s`; bg.appendChild(bee);
            }
        } else if (weather.includes('thunderstorm')) createBg('thunderstorm-bg');
        else if (weather.includes('blood moon')) createBg('bloodmoon-bg');
        else if (weather.includes('frost')) createBg('frost-bg');
        else if (weather.includes('heatwave')) createBg('heatwave-bg');
        else if (weather.includes('windy')) {
            const bg = createBg('windy-bg');
            for (let i = 0; i < 20; i++) {
                const streak = document.createElement('div'); streak.className = 'wind-streak'; streak.style.setProperty('--top-pos', `${Math.random() * 100}vh`);
                streak.style.animationDelay = `${Math.random() * 1}s`; bg.appendChild(streak);
            }
        } else if (weather.includes('party time')) {
            const bg = createBg('party-time-bg'); const emojis = ['🎉', '🎊', '🎈', '✨', '🎁'];
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div'); particle.className = 'emoji-particle'; particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                particle.style.left = `${Math.random() * 100}vw`; particle.style.animationDelay = `${Math.random() * 5}s`; particle.style.animationDuration = `${Math.random() * 3 + 3}s`; bg.appendChild(particle);
            }
        } else if (weather.includes('tornado')) {
            const bg = createBg('tornado-bg'); const tornado = document.createElement('div'); tornado.className = 'tornado';
            tornado.style.left = `${Math.random() * 60 + 20}%`; bg.appendChild(tornado);
        } else createBg('clear-bg');
    }
    
    // --- INITIALIZATION ---
    async function init() {
        document.documentElement.className = localStorage.getItem('growagarden_theme') || 'dark';
        setupEventListeners();
        if (typeof Tone !== 'undefined') {
            notificationSynth = new Tone.Synth({ oscillator: { type: 'sine' }, envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 1 } }).toDestination();
        }
        updateBellState();

        try {
            await Promise.all([
                fetchAndRenderRareLogs(),
                fetchAllData()
            ]);
        } catch (error) {
            console.error("Initialization failed:", error);
            connectionStatus.textContent = "Failed to load initial data.";
        } finally {
            hideLoadingOverlay();
        }

        setInterval(fetchAllData, 30000);
        setInterval(updateTimers, 1000);
    }

    init();
});
</script>
</body>
</html>
