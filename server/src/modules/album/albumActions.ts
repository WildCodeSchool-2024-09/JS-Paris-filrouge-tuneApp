import AlbumRepository from "./AlbumRepository";

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

export default { addAlbum };