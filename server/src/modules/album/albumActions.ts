import type { Request, Response, NextFunction } from "express";
import TrackRepository from "../track/TrackRepository";
import AlbumRepository from "./AlbumRepository";

const browseAlbum = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const albumId = Number(req.params.id);
		const [[album]] = await AlbumRepository.readAlbumById(albumId);
		const [tracks] = await TrackRepository.readTracksByAlbumId(albumId);

		album.tracks = tracks;

		if (album) res.status(200).json(album);
		else res.sendStatus(404);
	} catch (error) {
		next(error);
	}
};

const addAlbum = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const album = req.body;
		const [result] = await AlbumRepository.createAlbum(album);
		if (result.insertId) res.status(201).json(result.insertId);
		else res.sendStatus(400);
	} catch (error) {
		next(error);
	}
};

export default { addAlbum, browseAlbum };
