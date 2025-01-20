import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AlbumDetails() {
  const [album, setAlbum] = useState();
  const { id } = useParams();

  const getAlbumDetails = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/albums/${id}`,
      );

      setAlbum(await res.json());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAlbumDetails();
  }, []);

  return (
    <>
      <h1>{album?.title}</h1>
      <ul>
        {album?.tracks.map((track, index) => (
          <li key={index}>{track.title}</li>
        ))}
      </ul>
    </>
  );
}

export default AlbumDetails;
