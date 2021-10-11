import 'reflect-metadata'
import {TCommonPropDecorator} from "../util/type";

export const Autowired = (dependencyId: string): TCommonPropDecorator => {
  return (cp, k) => {
    // 取得 autowired service 的類
    const PropClass = Reflect.getMetadata('design:type', cp, k)

    // 已經實例化過的就直接取出注入
    if (Reflect.hasMetadata(dependencyId, PropClass.prototype, k)) {
      cp.userService = Reflect.getMetadata(dependencyId, PropClass.prototype, k)
      return
    }

    // 實例化類並寫入描述，防止二次創建，最後直接注入到類中
    const instance = new PropClass.getInstanceClass()
    Reflect.defineMetadata(dependencyId, instance, PropClass.prototype, k)
    cp.userService = instance
  }
}
