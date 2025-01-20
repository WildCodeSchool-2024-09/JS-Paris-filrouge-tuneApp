import db from "../../../database/client";
import { Result, Rows } from "../../../database/client";

type Track = {
  title: string,
  album_id: number,
}

class TrackRepository {
    readTracksByAlbumId(albumId: number) {
        return db.query("SELECT * FROM track WHERE album_id = ?", [albumId]);
      }
}

export default new TrackRepository();