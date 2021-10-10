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

const frank = new Person('frank', 'male')
frank.doEat('jeff', '大飯店')
console.log(frank)


const persons = [
  new Person('frank', 'male'),
  new Person('jason', 'male'),
  new Person('meimei', 'female')
]

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
