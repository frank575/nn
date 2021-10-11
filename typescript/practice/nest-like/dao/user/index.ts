import { User } from "../../entity/user";

export abstract class UserDao {
  public abstract findUserByUsername(username: string): User | undefined
}
