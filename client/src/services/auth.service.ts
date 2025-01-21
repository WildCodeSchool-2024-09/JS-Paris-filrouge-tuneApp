const register = async (email: string, password: string) => {
	return fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});
};

const login = async (email: string, password: string) => {
	return fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			email,
			password,
		}),
	});
};

export default { register, login };
