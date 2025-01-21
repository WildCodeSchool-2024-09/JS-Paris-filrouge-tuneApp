import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

/* ************************************************************************* */

import albumActions from "./modules/album/albumActions";
import userActions from "./modules/user/userActions";
import authActions from "./modules/auth/authActions";
import authServices from "./modules/auth/authServices";

// public routes
router.post("/api/users", authServices.hash, userActions.add);
router.post("/api/login", authActions.login);
router.get("/api/albums/:id", albumActions.browseAlbum);

// apply auth middlewares for all followings routes
router.use(authServices.isAuth);

// private routes
router.post("/api/albums", albumActions.addAlbum);

export default router;
