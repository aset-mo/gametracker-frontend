import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';

const API_REVIEWS_URL = 'http://localhost:4000/api/reviews';
const API_GAMES_URL = 'http://localhost:4000/api/juegos';

// Reviews component
// - Shows reviews for a specific game (reads 'gameId' from query params)
// - Supports creating, editing and deleting reviews
// - Form fields: text, score, author, hoursPlayed, difficulty
const Reviews = () => {
    const location = useLocation();
    // Accept either `?gameId=...` or `?id=...` for compatibility
    const params = new URLSearchParams(location.search);
    const gameId = params.get('gameId') || params.get('id') || null;

    // (no debug logs)

    const [reviews, setReviews] = useState([]);
    const [gameTitle, setGameTitle] = useState('Unknown Game');
    // Form state for creating/editing a review. Use English field names.
    const [newReview, setNewReview] = useState({
        text: '',
        score: 5,
        author: 'Usuario',
        hoursPlayed: 0,
        difficulty: 'Medium'
    });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const MAX_REVIEW_LENGTH = 500;

    useEffect(() => {
        if (!gameId) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                // Get game title (backend may use 'titulo' or 'title')
                const gameRes = await axios.get(`${API_GAMES_URL}/${gameId}`);
                setGameTitle(gameRes.data.titulo || gameRes.data.title || 'Juego Desconocido');

                // Get reviews by game Id
                const reviewsRes = await axios.get(`${API_REVIEWS_URL}/game/${gameId}`);
                setReviews(reviewsRes.data || []);
                setLoading(false);
            } catch (error) {
                console.error("Error al cargar datos:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, [gameId]);

    // (no additional mount-only effect needed; main useEffect handles gameId changes)

    // Generic change handler for form inputs. Handles numbers, checkboxes and text.
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Checkbox handling (kept for compatibility if used elsewhere)
        if (type === 'checkbox') {
            setNewReview({ ...newReview, [name]: checked });
            return;
        }

        // Numeric inputs should be stored as numbers
        const parsed = type === 'number' ? Number(value) : value;

        // Enforce max length for text field on client side
        if (name === 'text') {
            const truncated = String(parsed).slice(0, MAX_REVIEW_LENGTH);
            setNewReview({ ...newReview, text: truncated });
            return;
        }

        setNewReview({ ...newReview, [name]: parsed });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const reviewData = { ...newReview, gameId };
            if (editingId) {
                // Edit existing review
                const response = await axios.put(`${API_REVIEWS_URL}/${editingId}`, reviewData);
                setReviews(reviews.map(r => (r._id === editingId ? response.data : r)));
                setEditingId(null);
                setNewReview({ text: '', score: 5, author: 'Usuario', hoursPlayed: 0, difficulty: 'Medium' });
                alert('Reseña actualizada!');
            } else {
                // Create new
                const response = await axios.post(API_REVIEWS_URL, reviewData);
                setReviews([...reviews, response.data]);
                setNewReview({ text: '', score: 5, author: 'Usuario', hoursPlayed: 0, difficulty: 'Medium' });
                alert('Reseña publicada!');
            }
        } catch (error) {
            console.error("Error al publicar reseña:", error);
            alert('Error al publicar reseña.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Eliminar esta reseña?')) return;
        try {
            await axios.delete(`${API_REVIEWS_URL}/${id}`);
            setReviews(reviews.filter(r => r._id !== id));
        } catch (error) {
            console.error('Error al eliminar reseña:', error);
            alert('No se pudo eliminar la reseña.');
        }
    };

    const handleEdit = (review) => {
        setEditingId(review._id);
        setNewReview({
            text: review.text || review.textoReseña || '',
            score: review.score || review.puntuacion || 5,
            author: review.author || 'Usuario',
            hoursPlayed: review.hoursPlayed || review.horasJugadas || 0,
            difficulty: review.difficulty || review.dificultad || 'Medium'
        });
        // scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!gameId) return <div className="container"><h2>Error: No se ha especificado un Juego.</h2><Link to="/" className="button primary">Volver a la Biblioteca</Link></div>;
    if (loading) return <div className="container"><h2>Cargando reseñas de {gameTitle}...</h2></div>;

    return (
        <div className="container">
            <Link to="/" className="button secondary back-btn">← Volver a la Biblioteca</Link>
            <h1>Reseñas para: {gameTitle}</h1>

            <div className="review-form-section">
                <h2>Deja tu reseña</h2>
                <form onSubmit={handleSubmit}>
                    <label>Tu Nombre:</label>
                    <input type="text" name="author" value={newReview.author} onChange={handleChange} required />

                    <label>Puntuación (1-5):</label>
                    <input type="number" name="score" min="1" max="5" value={newReview.score} onChange={handleChange} required />

                    <label>Horas Jugadas:</label>
                    <input type="number" name="hoursPlayed" min="0" step="0.5" value={newReview.hoursPlayed} onChange={handleChange} />

                    <label>Dificultad:</label>
                    <select name="difficulty" value={newReview.difficulty} onChange={handleChange}>
                        <option value="Easy">Fácil</option>
                        <option value="Medium">Normal</option>
                        <option value="Hard">Difícil</option>
                    </select>



                    <label>Comentario Detallado:</label>
                    <textarea name="text" value={newReview.text} onChange={handleChange} required rows="5" maxLength={MAX_REVIEW_LENGTH}></textarea>
                    <div style={{ marginTop: 6, marginBottom: 8 }}><small>{newReview.text.length}/{MAX_REVIEW_LENGTH} caracteres</small></div>

                    <button type="submit" className="button primary">{editingId ? 'Guardar Cambios' : 'Publicar Reseña'}</button>
                </form>
            </div>

            <hr />

            <div className="reviews-list">
                <h3>{reviews.length} Reseñas publicadas</h3>
                {reviews.length === 0 ? (
                    <p>Sé el primero en dejar una reseña para {gameTitle}.</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review._id} className="review-item">
                            <h4>{review.author} ({'⭐'.repeat(review.score || review.puntuacion || 0)})</h4>
                            <p>{review.text || review.textoReseña}</p>
                            <p>
                                <strong>Horas jugadas:</strong> {review.hoursPlayed ?? review.horasJugadas ?? 0} •
                                <strong style={{ marginLeft: 8 }}>Dificultad:</strong> {review.difficulty || review.dificultad || 'Medium'}
                            </p>
                            <small>Publicado: {new Date(review.createdAt).toLocaleDateString()}</small>
                            <div style={{ marginTop: 10 }}>
                                <button className="button secondary" onClick={() => handleEdit(review)} style={{ marginRight: 8 }}>Editar</button>
                                <button className="button delete" onClick={() => handleDelete(review._id)}>Eliminar</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Reviews;