import {UserService} from "..";
import {UserRole} from "../../../enum/user";

export class UserServiceImpl implements UserService {
  constructor() {
    console.log('UserServiceImpl 構造器創建...')
  }

  public login(username: string, pwd: string, role: UserRole) {
    console.log('執行 userservice login 方法')
    if (username === 'admin' && pwd === '123' && role === UserRole.ADMIN) {
      return true
    }
    return false
  }

  public register() {
    console.log('userservice register...')
  }
}
