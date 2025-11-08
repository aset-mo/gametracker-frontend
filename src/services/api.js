const API_URL = "http://localhost:5000/api";

export async function getGames() {
  const res = await fetch(`${API_URL}/games`);
  return await res.json();
}