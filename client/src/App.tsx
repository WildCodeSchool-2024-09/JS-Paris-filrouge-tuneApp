import "./App.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Nav from "./components/Nav";
import { AuthProvider } from "./context/auth";

function App() {
	return (
		<AuthProvider>
			<ToastContainer />
			<header>TuneApp</header>
			<Nav />
			<Outlet />
			<footer>@copyright wildcodeschool 2025</footer>
		</AuthProvider>
	);
}

export default App;
