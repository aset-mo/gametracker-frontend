export default function EditForm({ editing, setEditing, onCancel, onSave }) {
  if (!editing) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    await onSave(editing._id, editing);
    onCancel();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Editar juego</h3>

      <input
        value={editing.title}
        onChange={(e) =>
          setEditing({ ...editing, title: e.target.value })
        }
      />

      <input
        value={editing.genre}
        onChange={(e) =>
          setEditing({ ...editing, genre: e.target.value })
        }
      />

      <input
        type="number"
        value={editing.rating}
        onChange={(e) =>
          setEditing({ ...editing, rating: Number(e.target.value) })
        }
      />

      <button type="submit">Guardar cambios</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
}
