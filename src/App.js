import { useEffect, useState } from "react";
import { getGames, addGame, deleteGame, updateGame } from "./services/api";
import GameList from "./components/gameList";
import GameForm from "./components/gameForm";
import EditForm from "./components/editForm";

function App() {
  const [games, setGames] = useState([]);
  const [editing, setEditing] = useState(null);

  async function reload() {
    setGames(await getGames());
  }

  useEffect(() => {
    reload();
  }, []);

  return (
    <div>
      <h1>GameTracker</h1>

      <GameForm onSave={async (data) => {
        await addGame(data);
        reload();
      }} />

      <EditForm
        editing={editing}
        setEditing={setEditing}
        onCancel={() => setEditing(null)}
        onSave={async (id, newData) => {
          await updateGame(id, newData);
          reload();
    }}
  />

      <h2>Juegos guardados:</h2>

      <GameList
        games={games}
        onDelete={async (id) => {
          await deleteGame(id);
          reload();
        }}
        onEdit={(game) => setEditing(game)}
      />
    </div>
  );
}

export default App;