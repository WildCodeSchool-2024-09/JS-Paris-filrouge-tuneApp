import { useState } from "react";
import "./App.css";
import { Link, Outlet, useNavigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    navigate("/login");
  }
  return (
    <>
      <header>TuneApp</header>
      <nav>
        <Link to="/dashboard">Mon dashboard</Link>
        <Link to="/dashboard/albums">Mes albums</Link>
        <button type="button" onClick={logout}>Se déconnecter</button>
      </nav>
      <Outlet context={{user, setUser}} />
      <footer>@copyright wildcodeschool 2025</footer>
    </>
  );
}

export default App;
