import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <div className="navbar">
      <h2 className="logo">GitHub Dev Dashboard</h2>
        <Link to="/favorites" className="fav-button">Favorites</Link>

    </div>
  );
}