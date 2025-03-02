import db from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { Album } from "../../types/album.type";

class AlbumRepository {
	readAlbumById(id: number) {
		return db.query<Rows>("SELECT * FROM album WHERE id = ?", [id]);
	}

	createAlbum(album: Album) {
		const { title, user_id } = album;
		return db.query<Result>(
			"INSERT INTO album (title, user_id) VALUES (?, ?)",
			[title, user_id],
		);
	}
}

export default new AlbumRepository();
