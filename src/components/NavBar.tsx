import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <Link to='/'><h2 className="logo">GitHub Dev Dashboard</h2></Link>
        <Link to="/favorites" className="fav-button">Favorites</Link>

    </div>
  );
}

export default NavBar;