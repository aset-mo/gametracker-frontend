import { useEffect, useState } from "react";
import { getGames, addGame } from "./services/api";

function App() {
  const [games, setGames] = useState([]);
  const [form, setForm] = useState({
    title: "",
    genre: "",
    rating: 0,
    hoursPlayed: 0,
    completed: false
  });

  useEffect(() => {
    async function load() {
      setGames(await getGames());
    }
    load();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await addGame(form);
    setGames(await getGames()); // refrescar lista
  }

  return (
    <div>
      <h1>GameTracker</h1>

      <h2>Agregar juego</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Título"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Género"
          value={form.genre}
          onChange={(e) => setForm({ ...form, genre: e.target.value })}
        />
        <input
          type="number"
          placeholder="Rating"
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
        />
        <button type="submit">Guardar</button>
      </form>

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