import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

/* ************************************************************************* */

import albumActions from "./modules/album/albumActions";

router.post("/api/albums", albumActions.addAlbum);
router.get("/api/albums/:id", albumActions.browseAlbum);

export default router;
