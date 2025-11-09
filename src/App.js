import { useEffect, useState } from "react";
import { getGames, addGame, deleteGame, updateGame } from "./services/api";


function App() {
  const [games, setGames] = useState([]);
  const [form, setForm] = useState({
    title: "",
    genre: "",
    rating: 0,
    hoursPlayed: 0,
    completed: false
  });
  const [editing, setEditing] = useState(null);
  useEffect(() => {
    async function load() {
      setGames(await getGames());
    }
    load();
  }, []);

  return (
  <div>
    <h1>GameTracker</h1>

    <h2>Agregar juego</h2>
    <form onSubmit={async (e) => {
      e.preventDefault();
      await addGame(form);
      setGames(await getGames());
    }}>
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


    {editing && (
      <form onSubmit={async (e) => {
        e.preventDefault();
        await updateGame(editing._id, editing);
        setEditing(null);
        setGames(await getGames());
      }}>
        <h3>Editar juego</h3>

        <input
          value={editing.title}
          onChange={(e) => setEditing({ ...editing, title: e.target.value })}
        />

        <input
          value={editing.genre}
          onChange={(e) => setEditing({ ...editing, genre: e.target.value })}
        />

        <input
          type="number"
          value={editing.rating}
          onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })}
        />

        <button type="submit">Guardar cambios</button>
        <button type="button" onClick={() => setEditing(null)}>Cancelar</button>
      </form>
    )}


    <h2>Juegos guardados:</h2>
    <ul>
      {games.map((g) => (
        <li key={g._id}>
          {g.title} — {g.genre} — ⭐ {g.rating}

          <button onClick={async () => {
            await deleteGame(g._id);
            setGames(await getGames());
          }}>
            Eliminar
          </button>

          <button onClick={() => setEditing(g)}>
            Editar
          </button>
        </li>
      ))}
    </ul>
  </div>
);
}

export default App;