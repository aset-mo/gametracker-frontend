import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = 'http://localhost:4000/api/juegos';

const GameForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const initialState = {
        titulo: '', 
        plataforma: '',
        genero: '', 
        imagenPortada: '',
        puntuacion: 0, //
        completado: false,
        //
    };

    const [game, setGame] = useState(initialState);

    useEffect(() => {
        if (id) {
            const fetchGame = async () => {
                try {
                    const response = await axios.get(`${API_URL}/${id}`);
                    setGame(response.data);
                } catch (error) {
                    console.error("Error al cargar juego para editar:", error);
                    alert("No se pudo cargar el juego para editar.");
                }
            };
            fetchGame();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Special handling for checkbox and number inputs
        const newValue = type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value);

        setGame({
            ...game,
            [name]: newValue
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Create the payload object explicitly
        const payload = {
            titulo: game.titulo,
            plataforma: game.plataforma,
            genero: game.genero,
            imagenPortada: game.imagenPortada,
            puntuacion: game.puntuacion,
            completado: game.completado
        };

        // 2. Debugging logs to verify payload
        console.log("Objeto FINAL a enviar a la API:", payload);

        try {
            if (id) {
                // Edition mode (PUT)
                await axios.put(`${API_URL}/${id}`, payload); // Use 'payload'
                alert('Juego actualizado exitosamente!');
            } else {
                // Creation mod (POST)
                await axios.post(API_URL, payload); // Use 'payload'
                alert('Juego agregado a la biblioteca!');
            }
            navigate('/');
} catch (error) {
        console.error("Error al guardar/actualizar juego:", error);
        
        let errorMessage = 'Error al guardar el juego. Revisa la consola para más detalles.';

        // If the error response contains validation errors, include them in the message
        if (error.response && error.response.status === 400 && error.response.data.errors) {
            errorMessage = "Errores de validación: " + error.response.data.errors.join(', ');
        }
        
        alert(errorMessage);
    }
    };

    return (
        <div className="container form-container">
            <h1>{id ? 'Editar Juego' : 'Agregar Nuevo Juego'}</h1>
            <form onSubmit={handleSubmit} className="game-form">

                {/* 1. Title (titulo) */}
                <label>Título:</label>
                <input type="text" name="titulo" value={game.titulo} onChange={handleChange} required />

                {/* 2. App/Plataform (plataforma) */}
                <label>Plataforma:</label>
                <input type="text" name="plataforma" value={game.plataforma} onChange={handleChange} />

                {/* 3. Genre (genero) */}
                <label>Género:</label>
                <input type="text" name="genero" value={game.genero} onChange={handleChange} />

                {/* 4. Finished (completado) */}
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                        type="checkbox"
                        name="completado"
                        checked={game.completado}
                        onChange={handleChange}
                        style={{ width: 'auto' }}
                    />
                    Marcar como Completado
                </label>

                {/* 5. Score (puntuacion) */}
                <label>Puntuación (1-5):</label>
                <input type="number" name="puntuacion" min="0" max="5" value={game.puntuacion} onChange={handleChange} />

                {/* 6. Cover URL (imagenPortada) */}
                <label>URL de Portada (Imagen):</label>
                <input type="text" name="imagenPortada" value={game.imagenPortada} onChange={handleChange} placeholder="Ej: https://via.placeholder.com/200" />

                {/* Buttoms */}
                <div className="button-group">
                    <button type="submit" className="button primary">{id ? 'Guardar Cambios' : 'Agregar Juego'}</button>
                    <button type="button" onClick={() => navigate('/')} className="button secondary">Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default GameForm;