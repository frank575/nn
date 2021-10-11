import {UserServiceImpl} from "../impl/user-service-impl";

export abstract class UserService {
  // 用來決定實現類是誰
  public static getInstanceClass = UserServiceImpl

  abstract login(username: string, pwd: string, role: string): boolean
  abstract register(): void
}
