import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../context/auth";
import type { authContextType } from "../context/auth";

const Nav = () => {
	const auth = useContext(Auth) as authContextType;
	const [showLogout, setShowLogout] = useState(false);

	useEffect(() => {
		if (auth?.user) setShowLogout(true);
		else setShowLogout(false);
	}, [auth]);

	return (
		<nav>
			<Link to="/dashboard">Mon dashboard</Link>
			<Link to="/dashboard/albums">Mes albums</Link>
			{showLogout && (
				<button type="button" onClick={auth?.logout}>
					Se déconnecter
				</button>
			)}
		</nav>
	);
};

export default Nav;
