import 'reflect-metadata'
import {UserService} from "../service/user-service";
import {Autowired} from "../decorator";

class UserController {
  // 把 Inject(注入) 替換成更專業的 Autowired(自動裝配) 單詞
  @Autowired('userService')
  private userService!: UserService

  public login(): void {
    this.userService.login('admin', '213', 'admin')
  }
}

const controller = new UserController()
controller.login()

export {}
