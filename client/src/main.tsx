// Import necessary modules from React and React Router
import { createRoot } from "react-dom/client";
import {
	RouterProvider,
	createBrowserRouter,
	useNavigate,
} from "react-router-dom";

/* ************************************************************************* */

// Import the main app component
import { type ReactNode, useContext, useEffect } from "react";
import App from "./App";
import Auth from "./context/auth";
import type { authContextType } from "./context/auth";
import AlbumDetails from "./pages/AlbumDetails";
import Albums from "./pages/Albums";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Import additional components for new routes
// Try creating these components in the "pages" folder

// import About from "./pages/About";
// import Contact from "./pages/Contact";

/* ************************************************************************* */

const PrivateRoute = ({ children }: { children: ReactNode }) => {
	const auth = useContext(Auth) as authContextType;
	const navigate = useNavigate();

	useEffect(() => {
		if (!auth?.isLoading) {
			if (!auth?.user) navigate("/login");
		}
	}, [auth, auth?.user, auth?.isLoading, navigate]);

	if (!auth?.isLoading && auth?.user) return children;
	return "...loading";
};

// Create router configuration with routes
// You can add more routes as you build out your app!
const router = createBrowserRouter([
	{
		path: "/", // The root path
		element: <App />, // Renders the App component for the home page
		children: [
			{
				path: "/dashboard",
				element: (
					<PrivateRoute>
						<Dashboard />
					</PrivateRoute>
				),
			},
			{
				path: "/dashboard/albums",
				element: (
					<PrivateRoute>
						<Albums />
					</PrivateRoute>
				),
			},
			{
				path: "/dashboard/albums/:id",
				element: (
					<PrivateRoute>
						<AlbumDetails />
					</PrivateRoute>
				),
			},
			{
				path: "/register",
				element: <Register />,
			},
			{
				path: "/login",
				element: <Login />,
			},
		],
	},
	// Try adding a new route! For example, "/about" with an About component
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
	throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(<RouterProvider router={router} />);

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
