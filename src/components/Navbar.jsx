import { Link } from "react-router-dom";
import logoapp from "../assets/pics/logoapp.png";

const Navbar = () => {
  return (
    <div>
      <Link to="/">
        <img src={logoapp} alt="Logo de l'application" className="w-44 p-5" />
      </Link>

      <ul className="bg-non-photo-blue text-gunmetal w-min text-sm font-bold absolute top-0 right-0 p-1">
        <Link to="/">
          <li className="border-b-2 hover:bg-lavender-blush pt-2 pb-2">
            Accueil
          </li>
        </Link>

        <Link to="/players">
          <li className="border-b-2 hover:bg-lavender-blush pt-2 pb-2">
            Joueurs
          </li>
        </Link>

        <Link to="/matchs">
          <li className="border-b-2 hover:bg-lavender-blush pt-2 pb-2">
            Matchs
          </li>
        </Link>

        <Link to="/stats">
          <li className="border-b-2 hover:bg-lavender-blush pt-2 pb-2">
            Stats
          </li>
        </Link>

        <Link to="/contact">
          <li className="border-b-2 hover:bg-lavender-blush pt-2 pb-2">
            Contact
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
