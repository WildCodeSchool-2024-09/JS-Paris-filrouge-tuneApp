import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../context/auth";
import type { authContextType } from "../context/auth";

const Nav = () => {
	const auth = useContext(Auth) as authContextType;
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		if (auth?.user) setIsAuth(true);
		else setIsAuth(false);
	}, [auth]);

	return (
		<nav>
			{isAuth ? (
				<>
					<Link to="/dashboard">Mon dashboard</Link>
					<Link to="/dashboard/albums">Mes albums</Link>
					<button type="button" onClick={auth?.logout}>
						Se déconnecter
					</button>
				</>
			) : (
				<>
					<Link to="/login">Login</Link>
					<Link to="/register">Register</Link>
				</>
			)}
		</nav>
	);
};

export default Nav;
