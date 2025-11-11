import GameForm from "../components/gameForm";
import EditForm from "../components/editForm";
import GameList from "../components/gameList";
import { useState, useEffect } from "react";
import { getGames, addGame, deleteGame, updateGame } from "../services/api";

export default function Games() {
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
      <h1>Juegos</h1>

      <GameForm
        onSave={async (data) => {
          await addGame(data);
          reload();
        }}
      />

      <EditForm
        editing={editing}
        setEditing={setEditing}
        onCancel={() => setEditing(null)}
        onSave={async (id, newData) => {
          await updateGame(id, newData);
          reload();
        }}
      />

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
