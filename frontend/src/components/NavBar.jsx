import { NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <div className="navbar bg-yellow-300">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Pokémon</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>
              <NavLink to="/">Home</NavLink>
            </a>
          </li>
          <li>
            <a>
              {" "}
              <NavLink to="/leaderbord">Leaderbord</NavLink>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
