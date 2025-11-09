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

export async function deleteGame(id) {
  await fetch(`${API_URL}/games/${id}`, {
    method: "DELETE"
  });
}

export async function updateGame(id, game) {
  const res = await fetch(`${API_URL}/games/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(game)
  });
  return await res.json();
}
