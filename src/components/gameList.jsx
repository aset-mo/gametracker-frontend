export default function GameList({ games, onDelete, onEdit }) {
  return (
    <ul>
      {games.map((g) => (
        <li key={g._id}>
          {g.title} — {g.genre} — ⭐ {g.rating}

          <button onClick={() => onDelete(g._id)}>Eliminar</button>
          <button onClick={() => onEdit(g)}>Editar</button>
        </li>
      ))}
    </ul>
  );
}
