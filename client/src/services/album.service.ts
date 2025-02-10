import type { User } from "../types/user.type";

const getAlbumDetails = async (user: User, id: number) => {
	return fetch(`${import.meta.env.VITE_API_URL}/api/albums/${id}`, {
		headers: {
			authorization: user.token,
		},
		credentials: "include",
	});
};

const postAlbum = async (user: User, title: string) => {
	return fetch(`${import.meta.env.VITE_API_URL}/api/albums`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			authorization: user.token,
		},
		credentials: "include",
		body: JSON.stringify({
			title,
			user_id: user.id,
		}),
	});
};

export default { getAlbumDetails, postAlbum };
