interface IGUIFactory {
  createButton(): IButton
  createCheckbox(): ICheckbox
}

interface IButton {
  paint(): void
}

interface ICheckbox {
  paint(): void
}

class WinFactory implements IGUIFactory {
  createButton(): IButton {
    return new WinButton();
  }

  createCheckbox(): ICheckbox {
    return new WinCheckbox();
  }
}

class MacFactory implements IGUIFactory {
  createButton(): IButton {
    return new MacButton();
  }

  createCheckbox(): ICheckbox {
    return new MacCheckbox();
  }
}

class WinButton implements IButton {
  paint() {
    console.log('繪製 Windows 按鈕')
  }
}

class WinCheckbox implements ICheckbox {
  paint() {
    console.log('繪製 Windows 複選框')
  }
}

class MacButton implements IButton {
  paint() {
    console.log('繪製 Mac 按鈕')
  }
}

class MacCheckbox implements ICheckbox {
  paint() {
    console.log('繪製 Mac 複選框')
  }
}

type TPlatform = 'windows' | 'mac'
const os: TPlatform = 'windows'

const createGUIFactory = (): IGUIFactory => os === 'windows'
  ? new WinFactory()
  : new MacFactory()

;(function main() {
  const guiFactory = createGUIFactory()
  const button = guiFactory.createButton()
  const checkbox = guiFactory.createCheckbox()

  button.paint()
  checkbox.paint()
})()
