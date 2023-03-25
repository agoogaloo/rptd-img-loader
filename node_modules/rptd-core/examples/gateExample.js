const { jsonUtility, Level } = require('rptd-core') //import components

// setup meta data
const level = new Level({LevelName: "gate example"}) 
level.createSection({LevelBounds:{x:-1000, y:1000, z:1000, w:-1000}})

// create a small floor to stand on
for(i = -5; i < 10; i++) {
  level.addTile({ ID: 12, x:i, y:-2 })
}

// define 2 channels for inputs
const [ch1, ch2] = [1, 2]

// create a button for each channel
level.addButton({ sectionId: 0, x: 1, y:-1, Channel: ch1 })
level.addButton({ sectionId: 0, x: 3, y:-1, Channel: ch2 })
level.addCrate({ x: 2, y:2 }) // create for buttons

// create an example of each logic gate using the input chnnels from above
// create a toggle wall to show the output of each gate given the inputs
const { InChannel1, InChannel2, OutChannel1 } = level.addAndGate({ x:2, y:5, InChannel1: ch1, InChannel2: ch2, OutChannel1: -2 })
level.addToggleWall({ x:2, y:6, Channel: OutChannel1 })

const channels = level.addOrGate({ x:4, y:5, InChannel1: ch1, InChannel2: ch2 })
level.addToggleWall({ x:4, y:6, Channel: channels.OutChannel1 })

let outputChannel = level.addNotGate({ x:6, y:5, InChannel1: ch1 }).OutChannel1
level.addToggleWall({ x:6, y:6, Channel: outputChannel })

outputChannel = level.addXorGate({ x:8, y:5, InChannel1: ch1, InChannel2: ch2 }).OutChannel1
level.addToggleWall({ x:8, y:6, Channel: outputChannel })

outputChannel = level.addClock({ x:10, y:5, OnTime: 1, OffTime: 0.5 }).OutChannel1
level.addToggleWall({ x:10, y:6, Channel: outputChannel })

outputChannel = level.addLatchGate({ x:12, y:5, OnChannel: ch1, OffChannel: ch2, OutChannel1: 100 }).OutChannel1
level.addToggleWall({ x:12, y:6, Channel: outputChannel })

outputChannel = level.addLatchGate({ x:14, y:5, OnChannel: ch1, TFF: true }).OutChannel1
level.addToggleWall({ x:14, y:6, Channel: outputChannel })

// write the level to a file
jsonUtility.writeLevelToFile(level, './json/output.json')
