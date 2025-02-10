import {
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { User } from "../../../server/src/types/user.type";
import authService from "../services/auth.service";

export type authContextType = {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	logout: () => void;
};

const Auth = createContext<authContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const getAuth = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/api/refresh`,
					{
						credentials: "include",
					},
				);
				const token = response.headers.get("Authorization");
				const user = await response.json();
				user.token = token;
				setUser(user);
				setIsLoading(false);
			} catch (error) {
				toast.error("Votre session à expiré, veuillez vous reconnecter");
				setIsLoading(false);
			}
		};
		getAuth();
	}, []);

	const logout = useCallback(() => {
		setUser(null);
		authService.logout();
		navigate("/login");
	}, [navigate]);

	const context = useMemo(
		() => ({ user, setUser, isLoading, setIsLoading, logout }),
		[user, isLoading, logout],
	);

	return <Auth.Provider value={context}>{children}</Auth.Provider>;
};

export default Auth;
