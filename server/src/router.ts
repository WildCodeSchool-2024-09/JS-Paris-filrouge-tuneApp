import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

/* ************************************************************************* */

import albumActions from "./modules/album/albumActions";
import userActions from "./modules/user/userActions";
import authServices from "./modules/auth/authServices";

router.post("/api/albums", albumActions.addAlbum);
router.get("/api/albums/:id", albumActions.browseAlbum);

router.post("/api/users", authServices.hash, userActions.add);
export default router;
