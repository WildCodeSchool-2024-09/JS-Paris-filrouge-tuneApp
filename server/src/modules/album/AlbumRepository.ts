import db from "../../../database/client";
import { Result, Rows } from "../../../database/client";

type Album = {
  title: string,
  created_at: Date,
  user_id: number
}

class AlbumRepository {

  readAlbumById(id: number) {
    return db.query("SELECT * FROM album WHERE id = ?", [id]);
  }

  createAlbum(album : Album) {
    const { title, user_id} = album;
    return db.query("INSERT INTO album (title, user_id) VALUES (?, ?)", [title, user_id]);
  }

}

export default new AlbumRepository();