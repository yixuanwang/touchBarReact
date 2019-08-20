const { app, BrowserWindow, TouchBar } = require('electron')
const { TouchBarLabel, TouchBarButton, TouchBarSpacer } = TouchBar

let start = false
let appeared = false

let time = 0.0
const result = new TouchBarLabel()
const wheel = new TouchBarLabel()

const gameBtn = new TouchBarButton({
  label: '🔥Start',
  click: () => {
    if(!start) {
      start = true
      gameBtn.label = "Click"
      wheel.label = "🔵"

      const reactLength = getRandomTime()
      const startTime = Date.now()
      const react = () => {
        if ((Date.now() - startTime) >= reactLength) {
          wheel.label = "🔴"
          appeared = true
          time = Date.now()
        } else {
          setTimeout(react, 10)
        }
      }

      react()
    } else {
      start = false
      wheel.label = "🔵"
      gameBtn.label = "🔥Start"
      if(appeared) {
        appeared = false
        result.label = (Date.now() - time) + " ms!"
      } else {
        result.label = "Lost"
      }
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
    wheel,
    new TouchBarSpacer({ size: 'large' }),
    result,
  ]
})

let window

app.once('ready', () => {
  window = new BrowserWindow({
    frame: false,
    titleBarStyle: 'hiddenInset',
    width: 200,
    height: 200,
    backgroundColor: '#000'
  })
  window.loadURL('about:blank')
  window.setTouchBar(touchBar)
})