const { jsonUtility, Level } = require('rptd-core') 
const img = require('./imgLoader')

const level = new Level({LevelName: "Cool Tech",Creator:"Agoogaloo", Description:"check this out!"}) 
level.createSection({Name:"gottem lol",LevelBounds:{"x":0.0,"y":60.0,"z":1.0,"w":-60.0},spawnPointY:1})


/*for(let x=0;x<5;x++){

    level.addTile({ID:0,x:x,y:0})
    level.addTile({ID:1,x:x,y:1})
    level.addTile({ID:3,x:x,y:3})
    level.addTile({ID:4,x:x,y:4})
    level.addTile({ID:5,x:x,y:5})
    level.addTile({ID:6,x:x,y:6})
    level.addTile({ID:7,x:x,y:7})
    level.addTile({ID:8,x:x,y:8})
    level.addTile({ID:9,x:x,y:9})
    level.addTile({ID:10,x:x,y:10})
    level.addTile({ID:11,x:x,y:11})
    level.addTile({ID:12,x:x,y:12})
    level.addTile({ID:200,x:x,y:13})
    level.addTile({ID:203,x:x,y:14})
    level.addTile({ID:206,x:x,y:15})
    level.addTile({ID:209,x:x,y:16})
  
}*/

img.createImg('omega.png', level, function(){
        
    //outputting file
    jsonUtility.writeLevelToFile(level, 'C:/Program Files (x86)/Steam/steamapps/common/Ruptured/Ruptured_Data/Data/Levels/Cool Tech.json')
    console.log("outputed file")
})

//jsonUtility.writeLevelToFile(level, 'C:/Program Files (x86)/Steam/steamapps/common/Ruptured/Ruptured_Data/Data/Levels/Cool Tech.json')
 //   console.log("outputed file")


