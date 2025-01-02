import AbstractSeeder from "./AbstractSeeder";
import AlbumSeeder from "./AlbumSeeder";

class TrackSeeder extends AbstractSeeder {
	constructor() {
		super({ table: "track", truncate: true, dependencies: [AlbumSeeder] });
	}

	run() {
		for (let index = 0; index < 10; index++) {
			const nbTracks = Math.floor(Math.random() * 8) + 8;
			for (let i = 0; i < nbTracks; i++) {
				const fakeTrack = {
					title: this.faker.music.songName(),
					album_id: this.getRef(`album_${index}`).insertId,
				};
				this.insert(fakeTrack);
			}
		}
	}
}

export default TrackSeeder;
