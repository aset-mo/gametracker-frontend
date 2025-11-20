import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Base URL
const API_URL = 'http://localhost:4000/api/juegos';

// --- Gamecard component (GameCard) ---
const GameCard = ({ game, onDelete }) => {
    // Use the names as per the backend schema (spanish)
    const statusText = game.completado ? 'Completado' : 'Pendiente / En Progreso';

    return (
        <div className="game-card">
            <img
                src={game.imagenPortada || 'https://via.placeholder.com/200x280.png?text=Game+Cover'}
                alt={game.titulo} // Title
                className="game-cover"
            />
            <div className="game-info">
                <h3>{game.titulo}</h3> {/* again, title */}
                <p>Plataforma: {game.plataforma}</p> {/* here platform */}
                <p>Estado: **{statusText}**</p>
                <p>Puntuación: {'⭐'.repeat(game.puntuacion)} ({game.puntuacion}/5)</p> {/* Score! */}

                <div className="actions">
                    <Link to={`/edit/${game._id}`} className="button edit">Editar</Link>
                    <button onClick={() => onDelete(game._id)} className="button delete">Eliminar</button>
                    {/* The reviews link will use the game link*/}
                    <Link to={`/reviews?gameId=${game._id}`} className="button reviews">Ver Reseñas</Link>
                </div>
            </div>
        </div>
    );
};

// --- Main component ---
const Biblioteca = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchGames = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL);
            setGames(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error al cargar los juegos:", error);
            setLoading(false);
            alert('Error al conectar con el Backend. Asegúrate de que el servidor esté corriendo en http://localhost:4000');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar este juego?')) return;

        try {
            await axios.delete(`${API_URL}/${id}`);
            setGames(games.filter(game => game._id !== id));
        } catch (error) {
            console.error("Error al eliminar el juego:", error);
            alert('Error al eliminar el juego.');
        }
    };

    useEffect(() => {
        fetchGames();
    }, []);

    if (loading) return <h2>Cargando tu biblioteca...</h2>;

    return (
        <div className="container">
            <h1>Mi Biblioteca de Juegos ({games.length} juegos)</h1>
            <Link to="/add" className="button add-game-btn">➕ Agregar Nuevo Juego</Link>

            <div className="games-grid">
                {games.length === 0 ? (
                    <p>No tienes juegos en tu biblioteca. ¡Agrega uno!</p>
                ) : (
                    games.map(game => (
                        <GameCard key={game._id} game={game} onDelete={handleDelete} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Biblioteca;