export default function GameList({ games, onDelete, onEdit }) {
  return (
    <ul>
      {games.map((g) => (
        <li>
            {g.title} — {g.genre} — ⭐ {g.rating}
            <div className="actions">
                <button onClick={() => onDelete(g._id)}>Eliminar</button>
                <button onClick={() => onEdit(g)}>Editar</button>
             </div>
        </li>
      ))}
    </ul>
  );
}
