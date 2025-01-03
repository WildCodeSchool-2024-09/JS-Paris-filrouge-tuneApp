import db from "../../../database/client";
import { Result, Rows } from "../../../database/client";

type Album = {
  title: string,
  created_at: Date,
  user_id: number
}

class AlbumRepository {

  createAlbum(album : Album) {
    const { title, user_id} = album;
    return db.query("INSERT INTO album (title, user_id) VALUES (?, ?)", [title, user_id]);
  }

}

export default new AlbumRepository();