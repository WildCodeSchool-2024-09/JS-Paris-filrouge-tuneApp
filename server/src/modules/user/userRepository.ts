import db from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { User } from "../../types/user.type";

class UserRepository {
  createUser(user : User) {
    return db.query<Result>("INSERT INTO User (email, password) VALUES (?, ?)", [user.email, user.password]);
  }

  readUserByEmail(email: string) {
    return db.query<Rows>("SELECT * FROM User WHERE email = ?", [email]);
  }

  read(id: number) {
    return db.query<Rows>("SELECT * FROM User WHERE id = ?", [id]);
  }

}

export default new UserRepository();