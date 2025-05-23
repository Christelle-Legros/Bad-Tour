import { Link } from "react-router-dom";
import logoapp from "../assets/pics/logoapp.png";

const Navbar = () => {
  return (
    <div>
      <Link to="/">
        <img src={logoapp} alt="Logo de l'application" className="w-44 p-5" />
      </Link>

      <div className=" text-gunmetal w-3/5 text-sm font-bold p-1 flex justify-between absolute top-0 right-1">
        <Link to="/">
          <div className="border-b-4 border-electric-blue hover:bg-electric-blue p-2">
            Accueil
          </div>
        </Link>

        <Link to="/players">
          <div className="border-b-4 border-electric-blue hover:bg-electric-blue p-2">
            Joueurs
          </div>
        </Link>

        <Link to="/matchs">
          <div className="border-b-4 border-electric-blue hover:bg-electric-blue p-2">
            Matchs
          </div>
        </Link>

        <Link to="/stats">
          <div className="border-b-4 border-electric-blue hover:bg-electric-blue p-2">
            Stats
          </div>
        </Link>

        <Link to="/contact">
          <div className="border-b-4 border-electric-blue hover:bg-electric-blue p-2">
            Contact
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
