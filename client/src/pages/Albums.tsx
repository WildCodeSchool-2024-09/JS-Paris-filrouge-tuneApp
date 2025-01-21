import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import AlbumForm from "../components/AlbumForm";
import type { FormEventHandler } from "react";
import type { AppContextInterface } from "../types/appContext.type";
import albumService from "../services/album.service";

function Albums() {
  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const { user } = useOutletContext<AppContextInterface>();

  const submitAlbum : FormEventHandler = async (event) => {
    event.preventDefault();
    try {
      const result = await albumService.postAlbum(user, title)

      if (result.status === 201) {
        const albumId = await result.json();
        navigate(`/dashboard/albums/${albumId}`);
      }
      else if (result.status === 401) navigate("/login");
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
      {/* todo : list albums here */}
    </>
  )
}

export default Albums;