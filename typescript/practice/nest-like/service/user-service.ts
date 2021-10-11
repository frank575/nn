export class UserService {
  public login(username: string, pwd: string, role: string) {
    console.log('執行 userservice login 方法')
    if (username === 'admin' && pwd === '123' && role === 'admin') {
      return true
    }
    return false
  }

  public register() {
    console.log('userservice register...')
  }
}
