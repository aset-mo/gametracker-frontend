import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/navBar";
import Home from "./pages/home";
import Games from "./pages/games";
import Contact from "./pages/contact";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
