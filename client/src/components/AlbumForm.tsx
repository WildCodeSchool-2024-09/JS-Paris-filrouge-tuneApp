function AlbumForm({ setTitle, submitAlbum }) {
	return (
		<form onSubmit={submitAlbum}>
			<input
				type="text"
				onInput={(e) => setTitle(e.target.value)}
				placeholder="Entrez un titre d'album"
			/>
			<button type="submit">Ajouter</button>
		</form>
	);
}

export default AlbumForm;
