const { app, BrowserWindow, TouchBar } = require('electron')
const { TouchBarLabel, TouchBarButton, TouchBarSpacer } = TouchBar

let start = false
let appeared = false

let time = 0.0
const result = new TouchBarLabel()
const wheel = new TouchBarLabel()
const click1 = new TouchBarButton({
  label: '',
  backgroundColor: "#000",
  click: () => {
    if(start) {
      if(appeared) {
        result.label = "left player win!"
        clear()
      } else {
        result.label = "right player win!"
        clear()
      }
    }
  }
})

const click2 = new TouchBarButton({
  label: '',
  backgroundColor: "#000",
  click: () => {
    if(start) {
      if(appeared) {
        result.label = "right player win!"
        clear()
      } else {
        result.label = "left player win!"
        clear()
      }
    }
  }
})

const clear = () => {
  time = 0.0
  start = false
  appeared = false
  wheel.label = ""
  click1.label = ""
  click2.label = ""
  gameBtn.label = '🔥Start'
}

const gameBtn = new TouchBarButton({
  label: '🔥Start',
  click: () => {
    if(!start) {
      result.label = ""
      start = true
      gameBtn.label = time.toString()
      wheel.label = "🔵"
      click1.label = "Click"
      click2.label = "Click"

      const reactLength = getRandomTime()
      const startTime = Date.now()
      const react = () => {
        if ((Date.now() - startTime) >= reactLength) {
          wheel.label = "🔴"
          appeared = true
        }
        if(start) {
          time += 1
          gameBtn.label = time.toString()
          setTimeout(react, 10)
        } else {
          clear()
        }
      }

      react()
    } else {
      clear()
    }
  }
})

const getRandomTime = () => {
  return Math.random()*5*1000
}

const touchBar = new TouchBar({
  items: [
    gameBtn,
    new TouchBarSpacer({ size: 'large' }),
    click1,
    new TouchBarSpacer({ size: 'flexible' }),
    wheel,
    result,
    new TouchBarSpacer({ size: 'flexible' }),
    click2,
  ]
})

let window

app.once('ready', () => {
  window = new BrowserWindow({
    frame: false,
    titleBarStyle: 'hiddenInset',
    width: 200,
    height: 200,
    backgroundColor: '#000',
  })
  window.loadURL('about:blank')
  window.setTouchBar(touchBar)
})