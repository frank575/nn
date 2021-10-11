import 'reflect-metadata'

type Sex = 'female' | 'male'

class Person {
  public static _id = 0
  public id = 0;

  constructor(
    public name: string,
    public sex: Sex) {
    this.id = ++Person._id
  }

  public doEat(who: string, address: string): void {
    console.log(`${this.name}和${who}在${address}吃飯`)
  }
}

class Teacher extends Person {}

class Student extends Person {
  private num!: number
}

class Person2 {
  public static _id = 0
  public id = 0;

  constructor(
    public name: string,
    public sex: Sex) {
    this.id = ++Person._id
  }

  public doEat(who: string, address: string): void {
    console.log(`${this.name}和${who}在${address}吃飯`)
  }
}

const frank = new Person('frank', 'male')
frank.doEat('jeff', '大飯店')
console.log(frank)


const persons = [
  new Person('frank', 'male'),
  new Person('jason', 'male'),
  new Person('meimei', 'female')
]

// function 函數重載
function fn1(sex: Sex, num?: number): Person[]
function fn1(id: number): Person | undefined
function fn1(a: any, num?: number): any {
  if (a === 'male' || a === 'female') {
    const _persons = persons.filter(e => e.sex === a)
    return _persons.slice(0, num ?? _persons.length)
  } else if (typeof a === 'number') {
    return persons.find(e => e.id === a)
  }
}
// const 函數重載
interface Fn11 {
  (sex: Sex, num?: number): Person[]
  (id: number): Person | undefined
}
const fn11: Fn11 = (a, num?: number): any => {
  if (a === 'male' || a === 'female') {
    const _persons = persons.filter(e => e.sex === a)
    return _persons.slice(0, num ?? _persons.length)
  } else if (typeof a === 'number') {
    return persons.find(e => e.id === a)
  }
}

const p1 = fn1(2)
const p2 = fn1('male')
const p3 = fn1('male', 1)
console.log(p1)
console.log(p2)
console.log(p3)


// 自定義守衛
function isString(str: any): str is string {
  return typeof str === 'string'
}
const str = 123 as any
if (isString(str)) {
  str.replace('1', '2')
}


// ts4 新特性
// 1. readonly
const arr = [1, 'hi'] as const
// arr[0] = '123' error
function showArr(arr: readonly any[]) {
  // arr[0] = 1 error
}
const c1 = [1, 2, 3, 'abc']
const [x1, ...y1]: [...any[]] = c1
const c2 = [1, 2, 3, 'abc'] as const
const [x2, ...y2]: readonly [...any[]] = c2

// 2.1 可變元祖
const [username, age, ...rest]: [string, number, ...(string | number)[]] = ['frank', 24, '帥哥']
// 2.2 元祖標籤
const [username2, age2, ...rest2]: [username: string, age: number, ...rest: (string | number)[]] = ['frank', 24, '帥哥']

// 兩者等價
type CommonFunc = (...args: any) => any
interface CommonFuncInterface {
  (...args: any[]): any
}

function createInstanceFactory<T>(Constructor: new (...args: any[]) => T): T {
  return new Constructor()
}
const person = createInstanceFactory(Person)
person.id

function cross<T extends object, U extends object>(obj1: T, obj2: U): T & U
function cross<T extends object, U extends object, V extends object>(obj1: T, obj2: U, obj3?: V): T & U & V
function cross<T extends object, U extends object, V extends object>(obj1: T, obj2: U, obj3?: V) {
  // return { ...obj1, ...obj2 }

  let combine = {} as T & U & V

  for (const k in obj1) {
    (combine as T)[k] = obj1[k]
  }

  for (const k in obj2) {
    if (!combine.hasOwnProperty(k)) {
      (combine as U)[k] = obj2[k]
    }
  }

  if (obj3 != null) {
    for (const k in obj3) {
      if (!combine.hasOwnProperty(k)) {
        (combine as V)[k] = obj3[k]
      }
    }
  }

  return combine
}

const frank2 = cross({name: 'frank'}, { age: 24 })
const frank3 = cross({name: 'frank'}, { age: 24 }, { birth: '85/07/10' })


// infer 必須在 extends 後
type personFuncType = (p: Person) => string
type inferType<T> = T extends (p: infer P) => any ? P : T
type inferResultType = inferType<personFuncType> // Person

const personSet = new Set<Person>()
personSet.add(new Person('frank', 'male'))
type ElementOf0<T> = T extends Set<infer E> ? E : never
let firstPerson: ElementOf0<typeof personSet> // Person
firstPerson = new Person('frank', 'male')

type p1Type = typeof Person
let P1: p1Type = Person
let P2: new (name: string, sex: Sex) => Person = Person
new P1('frank', 'male')
new P2('frank', 'male')

type CommonConstructor<T = any> = new (...args: any[]) => T
type ConstructorParametersType<T extends CommonConstructor<T>> =
  T extends new (...args: infer P) => any ? P : never

function createInstanceFactory2<T>(Constructor: CommonConstructor<T>, ...args: any[]): T {
  return new Constructor(...args)
}

function createInstanceFactory3<T extends new (...args: any[]) => any>(Constructor: T, ...args: ConstructorParametersType<T>): T {
  return new Constructor(...args)
}

createInstanceFactory2(Person, 'hello', 123) // 沒有類型檢測
createInstanceFactory3(Person, 'frank', 'male')


// 高級類型 type util
// Extract
type TExtract<T, U> = T extends U ? T : never
type extractType = TExtract<Teacher, Person> // Teacher
type extractType2 = TExtract<Person, Teacher> // Person 因為鴨子類型判斷 所以返回 Person
type extractType3 = TExtract<Person, Student> // never

type TExtract2<T, U> = T extends U ? T : boolean
type unionExtractType1 = TExtract2<string, string> // string
type unionExtractType2 = TExtract2<string, string | number> // string
type unionExtractType3 = TExtract2<string | number, string | number> // string | number
type unionExtractType4 = TExtract2<string | number, string> // string | boolean (聯合類型會依序比較)

type fun1 = (a: number, b: string) => string
type fun2 = (a: number) => string
type beginType1 = fun1 extends fun2 ? fun1 : never // never
type beginType2 = fun2 extends fun1 ? fun2 : never // fun2 類型，當返回值及依序參數類型一次表示 extends 成立

// 改寫 extends object 版本的 cross
type CrosType<T> = Extract<T, object>
function cross2<T, U>(obj1: CrosType<T>, obj2: CrosType<U>): T & U
function cross2<T, U, V>(obj1: CrosType<T>, obj2: CrosType<U>, obj3: CrosType<V>): T & U & V
function cross2<T, U, V>(obj1: CrosType<T>, obj2: CrosType<U>, obj3?: CrosType<V>) {
  return {} as T & U & V
}
const frank22 = cross({name: 'frank'}, { age: 24 })
const frank32 = cross({name: 'frank'}, { age: 24 }, { birth: '85/07/10' })

// Exclude
type TExclude <T, U> = T extends U ? never : T // Extract 的相反，也是依次比較

// Record, keyof any
type onAnyType = keyof any // string | number | symbol
type TRecord<K extends keyof any, T> = {
  [P in K]: T
}
type resultRecord = Record<'frank' | 'jj', Person>
const rr1: resultRecord = {
  frank: new Person('frank', 'male'),
  jj: new Person('jj', 'male')
}
type Arr = { [i: number]: string }
const arr1 = ['frank'] as Arr
const obj1 = { 0: 'frank' } as Arr
const goodSymid = Symbol()
type Goods = {
  name: string
  price: number
  [goodSymid]: number
}
const goodsList: Goods[] = [
  { [goodSymid]: 101, name: '蘋果', price: 24 },
  { [goodSymid]: 102, name: '橘子', price: 46 }
]
const goodsRecord: Record<number, Goods> = {}
goodsList.forEach(e => {
  goodsRecord[e[goodSymid]] = e
})
type testType = {
  [k: string]: any // [k: string] key 可以是 number 或 string，[k: number] key 不得是 string
}
let testObj1: testType = {
  'a': 1,
  0: 2,
  [goodSymid]: 3
} // success


// Pick
type TPick<T, K extends keyof T> = {
  [P in K]: T[P]
}
let ep1: TPick<Person, 'name'> = { name: 'frank' }


// Required, Partial, ReadOnly
type TPartial<T> = {
  [P in keyof T]?: T[P]
}
type TRequired<T> = {
  [P in keyof T]-?: T[P]
}
type TReadOnly<T> = {
  readonly [P in keyof T]: T[P]
}

// Omit
type TOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>


// 手寫 Promise 基本 Promise 類型
type TResolve<T> = (resolveSuccess: T) => void
type TReject = (rejectFail: any) => void
class Promise2<T> {
  constructor(promiseFunc: (resolve: TResolve<T>, reject: TReject) => void) {
    promiseFunc(this.resolve, this.reject)
  }
  resolve(resolveSuccess: T): Promise2<T> {
    return this
  }
  reject(rejectFail: any): Promise2<T> {
    return this
  }
  then(response?: T): Promise2<T> {
    return this
  }
  catch(rejectFail: any): Promise2<T> {
    return this
  }
}
new Promise((resolve, reject) => {})
new Promise2((resolve, reject) => {})
  .then()


// 手寫 Vuex 基本類型
type TStoreCommit = (type: string, payload?: any) => void
type TActionTree<S, R> = {
  [k: string]: TActionHandler<S, R>
}
type TActionHandler<S, R> = (store: Store<S>, payload?: any) => Promise<any>
interface IStore<S> {
  state: S
  commit: TStoreCommit
  actions: TActionTree<S, S>
}
class Store<S> implements IStore<S> {
  state!: S
  actions = {}
  constructor(public _state: S) {
    this.state = _state
  }
  commit() {}
}



// 裝飾器
const FirstClassDecorator = <T>(targetClass: CommonConstructor<T>) => {
  console.log('targetClass.name:', targetClass.name)
}
const SecondClassDecorator = (params: any) => <T>(targetClass: CommonConstructor<T>) => {
  console.log('targetClass.name:', targetClass.name)
}

// 執行順序為向上執行，也就是 Second -> First
@FirstClassDecorator
@SecondClassDecorator('修飾類的裝飾器參數')
class CustomerService {
  name: string = '下單'
  constructor() {
  }
  buy(){
    console.log(this.name + '購買')
  }
  placeOrder() {
    console.log(this.name + '下單購買')
  }
}

const LoggerInfoDecorator = <T extends new (...args: any[]) => any>(TargetClass: T): T => {
  // extends 處理的話就可以等到對象實例化後執行
  return class extends TargetClass {
    constructor(...args: any) {
      super(...args);
      console.log('日誌信息...targetClass:', TargetClass.name)
    }
    methoddone() {
      console.log('methoddone:', TargetClass.name)
    }
  }
}

interface LoggerInfoDecoratorInterface {
  methoddone: () => void
}

// ts 不允許裝飾器突變，所以採用該方式將突變的值類型注入，或者是使用 mixin func 處理
interface Test1 extends LoggerInfoDecoratorInterface {}

@LoggerInfoDecorator
class Test1 {
  name!: string
  constructor() {
  }
}

const t1 = new Test1()
t1.methoddone()

const MyMethodDecorator = (targetClassPrototype: any, methodname: string, methodDescription: PropertyDescriptor) => {
  methodDescription.value()
}

class RoleService {
  public roleName: string = '管理員'

  @MyMethodDecorator
  distribRoles() {
    console.log('分配角色...')
  }
}


// 使用裝飾器實現依賴注入
class Collection<T = any> {
  private constructor() {}

  static collection = new Collection()
  private containerMap = new Map<string | symbol, any>()

  public set(id: string | symbol, value: T): void {
    this.containerMap.set(id, value)
  }

  public get(id: string | symbol): T {
    return this.containerMap.get(id)
  }

  public has(id: string | symbol): boolean {
    return this.containerMap.has(id)
  }
}

type TRole = 'USER'
class UserService {
  role: TRole = 'USER'
  login () {
    console.log(this.role + '登入...')
  }
}

type MyPropertyDecorator = (targetClassPrototype: any, propertyKey: string | symbol) => void
type MyMethodDecorator = (targetClassPrototype: any, methodname: string, methodDescription: PropertyDescriptor) => void
const Inject = (id: string): MyPropertyDecorator => {
  return (t, k) => {
    // design:key 取得該成員的類型(此為 UserService)
    const PropClass = Reflect.getMetadata('design:key', t, k)
    const propClassObj = new PropClass()
  }
}

const Get = (reqpath: string): MyMethodDecorator => {
  return (t, k, d) => {
    // 將原數據放在原型的方法上
    Reflect.defineMetadata("reqPath", reqpath, t, k)
  }
}

const Controller = (rootPath: string) => {
  return <T extends CommonConstructor>(t: T) => {
    for (const k in t.prototype) {
      Reflect.getMetadata('reqPath', t.prototype, k)
    }
  }
}

// 裝飾器執行順序：屬性 -> 方法參數 -> 方法 -> 類
@Controller('/')
class UserController {
  @Inject('userService')
  private userService?: UserService

  @Get('/login')
  public login() {
    let peopleServiceInstance = Collection.collection.get('userService')
    peopleServiceInstance.login()
  }
}

let controller = new UserController()
controller.login()

// 原數據操作
let obj = {
  username: 'frank.wcw',
  age: 25,
  info() {
    console.log('訊息')
  }
}

// 在對象上定義元數據
Reflect.defineMetadata('metaobjkey', '我是一個對象的元數據', obj)
Reflect.getMetadata('metaobjkey', obj) // 我是一個對象的元數據

// 在對象屬性上定義元數據
Reflect.defineMetadata('usernamemetakey', '用戶名元數據', obj, 'username')
Reflect.getMetadata('usernamemetakey', obj, 'username') // 用戶名元數據

if (Reflect.hasMetadata('describe', obj)) {
  console.log('obj存在describe元數據')
} else {
  console.log('obj不存在describe元數據')
}

// 在類上定義元數據
@Reflect.metadata('decribe', '都是地球人')
class People {
  @Reflect.metadata('descible', '姓名不能包含非法漢字')
  name = 'frank'

  @Reflect.metadata('importinfo', '去吃屋馬好嗎')
  eat() {}

  @Reflect.metadata('firstname', '第一個名字')
  @Reflect.metadata('lastname', '最後一個名字')
  getFullName(name: string, age: number): string { return '' }
}
class ChinesePeople extends People {}

// 獲取類上元數據
Reflect.getMetadata('decribe', People) // 都是地球人
// 獲取方法上的元數據 二參為原型
Reflect.getMetadata('importinfo', People.prototype, 'eat') // 去吃屋馬好嗎
// 獲取 People.prototype 上 getFullName 方法的全部元數據的 key
// [
//   'design:returntype',
//   'design:paramtypes',
//   'design:type',
//   'firstname',
//   'lastname'
// ]
Reflect.getMetadataKeys(People.prototype, 'getFullName')

if (Reflect.hasMetadata('importinfo', People.prototype, 'eat')) {
  console.log('People原型上的eat方法存在importinfo元數據')
}
// hasMetadata 能獲取父類原型上的元數據
if (Reflect.hasMetadata('importinfo', ChinesePeople.prototype, 'eat')) {
  console.log('ChinesePeople原型上的eat方法存在importinfo元數據')
}
// hasOwnMetadata 不能獲取父類原型上的元數據，僅能獲取自己的
if (Reflect.hasOwnMetadata('importinfo', ChinesePeople.prototype, 'eat')) {
  console.log('ChinesePeople原型上的eat方法存在importinfo元數據')
}

// 3個重要且特殊的內置元數據 key
// 1. design:paramtypes
//   1. 構造器所有參數數據類型組成的數組
//   2. 類中方法全部參數的數據類型組成的數組
// 2. design:type
//   1. 獲取類屬性的數據類型
//   2. 獲取類方法參數的數據類型
// 3. design:returntype
//   1. 獲取類方法返回值的數據類型























