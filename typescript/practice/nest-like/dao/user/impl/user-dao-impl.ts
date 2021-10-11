import {User, userDb} from "../../../entity/user";
import {UserDao} from "../index";

export class UserDaoImpl implements UserDao {
    public findUserByUsername(username: string): User | undefined {
        return userDb.find(e => e.username === username)
    }
}
