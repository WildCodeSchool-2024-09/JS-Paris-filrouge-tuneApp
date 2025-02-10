import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Album } from "../types/album.type";
import albumService from "../services/album.service";
import Auth from "../context/auth";
import type { authContextType } from "../context/auth";
import type { User } from "../types/user.type";

function AlbumDetails() {
	const [album, setAlbum] = useState<Album>();
	const { id } = useParams();
	const { user } = useContext(Auth) as authContextType;

	useEffect(() => {
		const getAlbumDetails = async () => {
			try {
				const res = await albumService.getAlbumDetails(user as User, Number(id));
				setAlbum(await res.json());
			} catch (error) {
				console.log(error);
			}
		};
		getAlbumDetails();
	}, [id, user]);

	return (
		<>
			<h1>{album?.title}</h1>
			<ul>
				{album?.tracks.map((track) => (
					<li key={track.id}>{track.title}</li>
				))}
			</ul>
		</>
	);
}

export default AlbumDetails;
