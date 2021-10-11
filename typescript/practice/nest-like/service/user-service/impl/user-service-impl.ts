import {UserService} from "..";
import {UserRole} from "../../../enum/user";
import {Autowired} from "../../../decorator";
import {UserDao} from "../../../dao/user";

export class UserServiceImpl implements UserService {
  // TODO 需支持 Service 注入
  @Autowired('userDao')
  private userDao!: UserDao

  constructor() {
    console.log('UserServiceImpl 構造器創建...')
  }

  public login(username: string, pwd: string, role: UserRole) {
    console.log('執行 userservice login 方法')
    console.log(this.userDao)
    if (username === 'admin' && pwd === '123' && role === UserRole.ADMIN) {
      return true
    }
    return false
  }

  public register() {
    console.log('userservice register...')
  }
}
