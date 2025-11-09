const API_URL = "http://localhost:5000/api";

export async function getGames() {
  const res = await fetch(`${API_URL}/games`);
  return await res.json();
}

export async function addGame(game) {
  const res = await fetch(`${API_URL}/games`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(game)
  });
  return await res.json();
}
