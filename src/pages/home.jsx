import "../styles.css";

export default function Home() {
  return (
    <div className="home-page">
      <img
        src="/img/banner.jpg"
        alt="Banner principal"
        className="banner"
        loading="lazy"
      />

      <h1>GameTracker</h1>
      <p>Tu espacio para registrar y calificar tus videojuegos favoritos 🎮</p>
    </div>
  );
}
