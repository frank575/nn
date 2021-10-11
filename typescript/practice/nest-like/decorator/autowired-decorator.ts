import 'reflect-metadata'
import {collectionInstance} from "../collection";

type MyPropDecorator = (targetClassPrototype: any, propertyKey: string | symbol) => void

export const Autowired = (injectId: string): MyPropDecorator => {
  return (c, k) => {
    const PropClass = Reflect.getMetadata('design:type', c, k)
    const propInstance = new PropClass()
    // collectionInstance.set(injectId, propInstance)
    Reflect.defineProperty(c, injectId, { value: propInstance })
  }
}
