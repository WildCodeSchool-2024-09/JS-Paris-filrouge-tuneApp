import db from "../../../database/client";
import type { Result } from "../../../database/client";

type User = {
  email: string,
  password: string
}

class UserRepository {
  createUser(user : User) {
    return db.query<Result>("INSERT INTO User (email, password) VALUES (?, ?)", [user.email, user.password]);
  }

}

export default new UserRepository();