import { BrowserRouter, Routes, Route } from "react-router-dom";
import Joueurs from "./pages/Joueurs";
import Accueil from "./pages/Accueil";
import Matchs from "./pages/Matchs";
import Stats from "./pages/Stats";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="bg-lavender-blush h-screen w-screen">
      {/* Tout encapsuler dans BrowserRouter, pour que toute l'App ait accès à Routes, Link... */}
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/players" element={<Joueurs />} />
          <Route path="/matchs" element={<Matchs />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
