import TrackRepository from "../track/TrackRepository";
import AlbumRepository from "./AlbumRepository";

const browseAlbum = async (req, res) => {
  try {
    const albumId = req.params.id;
    const [[album]] = await AlbumRepository.readAlbumById(albumId);
    const [tracks] = await TrackRepository.readTracksByAlbumId(albumId);

    album.tracks = tracks;

    if (album) res.status(200).json(album)
    else res.sendStatus(404)
  }
  catch (error) {
    res.sendStatus(500);
  }
}

const addAlbum = async (req, res) => {
  try {
    const album = req.body;
    const [result] = await AlbumRepository.createAlbum(album);
    if (result.insertId) res.sendStatus(201);
    else res.sendStatus(400);
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
}

export default { addAlbum, browseAlbum };