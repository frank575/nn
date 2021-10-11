import { User } from "../../entity/user";
import {UserDaoImpl} from "./impl/user-dao-impl";

export abstract class UserDao {
  // 用來決定實現類是誰
  public static getInstanceClass = UserDaoImpl

  public abstract findUserByUsername(username: string): User | undefined
}
