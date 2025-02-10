import type { FormEventHandler } from "react";

function AlbumForm({
	setTitle,
	submitAlbum,
}: {
	setTitle: React.Dispatch<React.SetStateAction<string>>;
	submitAlbum: FormEventHandler;
}) {
	return (
		<form onSubmit={submitAlbum}>
			<input
				type="text"
				onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
				placeholder="Entrez un titre d'album"
			/>
			<button type="submit">Ajouter</button>
		</form>
	);
}

export default AlbumForm;
