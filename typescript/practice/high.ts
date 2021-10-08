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
