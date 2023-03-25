const { jsonUtility, Level } = require('rptd-core') // import required components from rptd-core
const fs = require('fs') // package fro file I/O

const level = new Level({LevelName: "Bad Apple", Slot0Gun:1}) // create a new level
level.createSection({LevelBounds:{x:-100, y:300000, z:100, w:-100}}) // create a new section with the given bounds

// constants
const screenWidth = 28
const fps = 59.95 // don't judge my code ok
const tileID = 12 // tile to be used

// reads a json file and converts it to an object
function readFile(file) {
  let obj = fs.readFileSync(file, 'utf8', (err, data) => {
      if (err) throw err
    }
  );
  obj = JSON.parse(obj)

  return obj
}

// get tje frame data
data = readFile('./BadApple8x8.json')
data = data.map(frame => {
  return frame.split('')
})

// get only the first 8000 frames
data = data.slice(0, 8000)
console.log('frames: ' + data.length);

// create the moving platform system
level.addPrefab({ ID:202, x: -3, y: -1, Properties:{Channel:-2}}) // shoot switch
level.addBooster({ x:-3, y:-2, Strength:screenWidth*fps, Channel:-2, StartActive:false, Direction:3})
level.addMovingPlatform({ x:0, y:-2, Size:{x:5, y:1} })

// loop through all the frames and draw them
data.forEach((frame, frameNumber) => {
  drawFrame(frame, frameNumber)
});

function drawFrame(frame, frameNumber) {
  // loop thorugh all the pixels in the frame and add a tile if the pixel is a 1
  frame.forEach((pixel, index) => {
    if(pixel === '1') {
      level.addTile({ 
        ID: tileID, 
        x: 28*frameNumber+(index%8)-5 + (28*300),
        y: Math.floor(index/8)+1
      })
    }
  })
}


// write the level to a file
jsonUtility.writeLevelToFile(level, './badAppleLevel.json')
