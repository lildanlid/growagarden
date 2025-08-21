// Handles all API fetching
const API_BASE = "https://growagarden-api.vercel.app";

async function fetchStocks() {
  try {
    const res = await fetch(`${API_BASE}/stocks`);
    if (!res.ok) throw new Error("Failed to fetch stocks");
    return await res.json();
  } catch (err) {
    console.error("Stock fetch error:", err);
    return { SEEDS: [], GEARS: [], EGGS: [] };
  }
}

function getImageUrl(itemId) {
  return `${API_BASE}/images/${itemId}`;
}
