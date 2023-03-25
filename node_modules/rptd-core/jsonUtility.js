const fs = require('fs')
const Level = require('./Level')

class JsonUtility {
  createLevelFromFile(file) {
    let obj = fs.readFileSync(file, 'utf8', (err, data) => {
        if (err) throw err
        return JSON.parse(data)
      }
    );
    obj = JSON.parse(obj)

    return new Level(obj)
  }
  
  writeLevelToFile(levelData, file) {
    levelData.channelsUsed = levelData.channelsUsed.filter(n => n)
    console.log(`tiles: ${levelData.tileCount}`)
    console.log(`entities: ${levelData.prefabCount}`)
    console.log(`logic gates: ${levelData.gateCount}`)
    console.log(`channels: ${levelData.channelsUsed.length}`)
    delete levelData.tileCount
    delete levelData.prefabCount
    delete levelData.gateCount
    delete levelData.channelsUsed

    let json = JSON.stringify(levelData)

    fs.writeFileSync(file, json, 'utf8', (err) => {
      if(err) throw err
    }); 
    console.log("file write successful")
  }

  readFile(file) {
    let obj = fs.readFileSync(file, 'utf8', (err, data) => {
        if (err) throw err
        return JSON.parse(data)
      }
    );
    obj = JSON.parse(obj)

    return obj
  }
}

module.exports = new JsonUtility()
