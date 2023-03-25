const { jsonUtility, Level } = require('rptd-core') 
const img = require('./imgLoader')

const level = new Level({LevelName: "Image",Creator:"", Description:"Image"}) 
level.createSection({Name:"Image",LevelBounds:{x:0,y:60,z:1,w:-60},spawnPointY:1})

img.createImg('./images/omega.png', level, function(){
        
    //outputting file
    jsonUtility.writeLevelToFile(level, './output.json')
    console.log("outputed file")
})


