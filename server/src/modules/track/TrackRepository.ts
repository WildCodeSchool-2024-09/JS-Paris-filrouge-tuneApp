import db from "../../../database/client";
import type { Rows } from "../../../database/client";

class TrackRepository {
	readTracksByAlbumId(albumId: number) {
		return db.query<Rows>("SELECT * FROM track WHERE album_id = ?", [albumId]);
	}
}

export default new TrackRepository();
