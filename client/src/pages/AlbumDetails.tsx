import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import type { AppContextInterface } from "../types/appContext.type";
import type { Album } from "../types/album.type";
import albumService from "../services/album.service";

function AlbumDetails() {
	const [album, setAlbum] = useState<Album>();
	const { id } = useParams();
	const { user } = useOutletContext<AppContextInterface>();

	useEffect(() => {
		const getAlbumDetails = async () => {
			try {
				const res = await albumService.getAlbumDetails(user, Number(id));
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
