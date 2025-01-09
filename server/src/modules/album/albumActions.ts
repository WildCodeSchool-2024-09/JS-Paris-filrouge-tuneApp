import AlbumRepository from "./AlbumRepository";

const browseAlbum = async (req, res) => {
  try {
    const albumId = req.params.id;
    const [result] = await AlbumRepository.readAlbumById(albumId);

    if (result.length > 0) res.status(200).json(result)
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