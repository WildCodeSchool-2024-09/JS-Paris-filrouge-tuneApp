import { useContext, useState } from "react";
import type { FormEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import AlbumForm from "../components/AlbumForm";
import Auth from "../context/auth";
import type { authContextType } from "../context/auth";
import albumService from "../services/album.service";
import type { User } from "../types/user.type";

function Albums() {
	const navigate = useNavigate();
	const [title, setTitle] = useState<string>("");
	const [error, setError] = useState<string>("");
	const { user } = useContext(Auth) as authContextType;

	const submitAlbum: FormEventHandler = async (event) => {
		event.preventDefault();
		try {
			const result = await albumService.postAlbum(user as User, title);

			if (result.status === 201) {
				const albumId = await result.json();
				navigate(`/dashboard/albums/${albumId}`);
			} else if (result.status === 401) navigate("/login");
			else setError("Veuillez remplir tout les champs");
		} catch (error) {
			console.error(error);
			setError("Une erreur est survenue...");
		}
	};

	return (
		<>
			{error && error}
			<AlbumForm setTitle={setTitle} submitAlbum={submitAlbum} />
			{/* todo : list albums here */}
		</>
	);
}

export default Albums;
