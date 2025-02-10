import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../context/auth";
import type { authContextType } from "../context/auth";

function Dashboard() {
	const navigate = useNavigate();
	const auth = useContext(Auth) as authContextType;

	return (
		<>
			<p>Bonjour : {auth?.user?.email}</p>
			<button type="button" onClick={() => navigate("/dashboard/albums")}>
				Ajouter un album
			</button>
		</>
	);
}

export default Dashboard;
