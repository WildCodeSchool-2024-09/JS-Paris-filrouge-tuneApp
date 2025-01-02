import AbstractSeeder from "./AbstractSeeder";
import UserSeeder from "./UserSeeder";

class AlbumSeeder extends AbstractSeeder {
	constructor() {
		super({ table: "album", truncate: true, dependencies: [UserSeeder] });
	}

	run() {
		for (let index = 0; index < 10; index++) {
			const randomIndex = Math.floor(Math.random() * 10);

			const fakeAlbum = {
				title: this.faker.music.album(),
				user_id: this.getRef(`user_${randomIndex}`).insertId,
				refName: `album_${index}`,
			};

			this.insert(fakeAlbum);
		}
	}
}

export default AlbumSeeder;
