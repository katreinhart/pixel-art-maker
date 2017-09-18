

const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

const palette = document.querySelectorAll('.palette-cell')
const saveButton = document.getElementById('save-button')
const loadButton = document.getElementById('load-button')

const gameState = []
const colors = [ 'white', 'orangered', 'orange', 'gold', 'limegreen', 'skyblue', 'mediumpurple', 'chocolate', 'black', 'gray' ]
const cellSize = 10;
const numRows = 50;
const numCols = 80;

ctx.strokeStyle="black"
ctx.strokeRect(0,0,800,500)

initializeGameState = () => {
  // set up the state of the canvas (i.e. an array of arrays of 0)
  for(let i=0; i < numRows; i++) {
    const newRow = []
    for(let j=0; j < numCols; j++) {
      newRow.push(0)
    }
    gameState.push(newRow)
  }
  activeColor=8
}

draw = () => {
  // render the state of the canvas
  for(let i=0; i<numRows; i++) {
    for(let j=0; j<numCols; j++) {
      //draw the square in the color indicated
      let colorCode = gameState[i][j]
      ctx.fillStyle = colors[colorCode]

      let yStart = i * cellSize
      let xStart = j * cellSize
      ctx.fillRect(xStart, yStart, cellSize, cellSize)
      ctx.strokeStyle = 'lightgrey'
      ctx.strokeRect(xStart, yStart, cellSize, cellSize)
    }
  }

  ctx.strokeStyle="black"
  ctx.strokeRect(0,0,800,500)

  palette.forEach((cell, index) => {
    cell.style.backgroundColor = colors[index]
  })
}

initializeGameState()
draw()

let flag = false

canvas.addEventListener('mousedown', e => {
  flag = true
})

canvas.addEventListener('mouseup', e => {
  flag = false
})

canvas.addEventListener('mousemove', e => {
  if(flag) {
    let myX = Math.floor((e.clientX - 10)/cellSize)
    let myY = Math.floor((e.clientY - 80)/cellSize)
    // fill that cell with the active color.
    gameState[myY][myX]=activeColor

    draw()
  }
})


palette.forEach((colorBox, index) => {
  colorBox.addEventListener('click', (e) => {
    activeColor = index
  })
})

saveButton.addEventListener('click', function () {
  let saveGame = JSON.stringify(gameState)
  localStorage.setItem('gameState1', saveGame)
})


loadButton.addEventListener('click', function() {
  const loadGame = JSON.parse(localStorage.getItem('gameState1'))
  if(loadGame) {
    for(let i=0; i < numRows; i++) {
      const saveRow = loadGame[i]
      for(let j=0; j < numCols; j++) {
        gameState[i][j] = saveRow[j]
      }
    }
  }
  draw()
})
