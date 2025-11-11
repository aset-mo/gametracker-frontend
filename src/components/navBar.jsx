import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav style={{ marginBottom: "20px" }}>
      <Link to="/">Inicio</Link> |{" "}
      <Link to="/games">Juegos</Link> |{" "}
      <Link to="/contact">Contacto</Link>
    </nav>
  );
}
