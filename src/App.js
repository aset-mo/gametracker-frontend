import { useEffect, useState } from "react";
import { getGames } from "./services/api";

function App() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await getGames();
      setGames(data);
    }
    loadData();
  }, []);

  return (
    <div>
      <h1>GameTracker</h1>
      <h2>Juegos guardados:</h2>

      <ul>
        {games.map((g) => (
          <li key={g._id}>
            {g.title} — {g.genre} — ⭐ {g.rating}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;