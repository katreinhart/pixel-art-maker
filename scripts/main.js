

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const palette = document.querySelectorAll('.palette-cell')

const gameState = []
const colors = [ 'white', 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'brown', 'black', 'gray']
const cellSize = 10;
const numRows = 50;
const numCols = 80;

ctx.strokeStyle="black"
ctx.strokeRect(0,0,800,500)


initializeGameState = () => {
  console.log('sanity check!');
  // set up the state of the canvas (i.e. an array of arrays of 0)
  for(let i=0; i < numRows; i++) {
    const newRow = []
    for(let j=0; j < numCols; j++) {
      newRow.push(0)
    }
    gameState.push(newRow)
  }
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
    // console.log('cell', cell, 'color', colors[index]);
  })
}

initializeGameState()
draw()


canvas.addEventListener('mouseenter', e => {
  // console.log(e.clientX, e.clientY);
  // compute which cell you're in by the x/y
  let myX = Math.floor((e.clientX - 10)/cellSize)
  let myY = Math.floor((e.clientY - 80)/cellSize)
  // fill that cell with the active color; or red.
  gameState[myY][myX]=activeColor

  draw()
})

palette.forEach((colorBox, index) => {
  colorBox.addEventListener('click', (e) => {
    console.log('change active color to', colors[index])
    activeColor = index
  })
})
