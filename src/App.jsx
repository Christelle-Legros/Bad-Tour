import { BrowserRouter, Routes, Route } from "react-router-dom";
import Joueurs from "./pages/Joueurs";
import Accueil from "./pages/Accueil";
import Matchs from "./pages/Matchs";
import Stats from "./pages/Stats";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import DoubleMixte from "./components/DoubleMixte";
import DoubleHommes from "./components/DoubleHommes";
import DoubleDames from "./components/DoubleDames";
import { ToastContainer, toast } from "react-toastify";

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
          <Route path="/doublemx" element={<DoubleMixte />} />
          <Route path="/doublehom" element={<DoubleHommes />} />
          <Route path="/doubledames" element={<DoubleDames />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
