import { useState } from "react";

export default function GameForm({ onSave }) {
  const [form, setForm] = useState({
    title: "",
    genre: "",
    rating: 0
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await onSave(form);
    setForm({ title: "", genre: "", rating: 0 });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar juego</h2>

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
  );
}
