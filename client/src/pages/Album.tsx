import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlbumForm from "../components/AlbumForm";

function Album() {
  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  const submitAlbum = async (event) => {
    event.preventDefault();
    try {
      const result = await fetch(`${import.meta.env.VITE_API_URL}/api/albums`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          user_id: 1
        })
      });
      console.info(result);
      if (result.status === 201) navigate("/dashboard");
      else setError("Veuillez remplir tout les champs");
    } catch (error) {
      console.error(error);
       setError("Une erreur est survenue...");
    }
  }

  return (
    <>
      {error && error}
      <AlbumForm setTitle={setTitle} submitAlbum={submitAlbum} />
    </>
  )
}

export default Album;