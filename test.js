const { jsonUtility, Level } = require('rptd-core') 
const img = require('./imgLoader')

const level = new Level({LevelName: "Image",Creator:"", Description:"Image"}) 
level.createSection({Name:"Image",LevelBounds:{x:0,y:60,z:1,w:-60},spawnPointY:1})

const fileName = 'omega.png'

async function createImage() {
    const data = await img.convertImage(level, `./images/${fileName}`)
    console.log(data.levelString)
    jsonUtility.writeLevelToFile(data.levelObj, './output.json')
}

createImage()
