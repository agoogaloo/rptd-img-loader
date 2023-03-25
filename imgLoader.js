const { jsonUtility, Level } = require('rptd-core')
const fs = require('fs')
const { PNG } = require('pngjs')

//a list of all the tiles that can be selected from format is tileid, r,g,b values

const tiles = []

addTileType = (tile, type) => { 
    tile.push(type) 
    return tile
}
const hotTiles = require('./json/hotTiles.json').map((tile) => { return addTileType(tile, 0) })
const coldTiles = require('./json/coldTiles.json').map((tile) => { return addTileType(tile, 1) })
tiles.push(...hotTiles, ...coldTiles)

// returns tile id and whether the tile will be hot or cold
function pixelToTile(x ,y, pixel){
    //rgb values of the pixel
    const { r, g, b } = pixel
    //difference from actual pixel to tile colour
    let diff = 255*3
    let tile = -1 // index of the tile 
    let type = 0

    for(let i in tiles){
        const rDiff = Math.abs(r-tiles[i][1]) 
        const gDiff = Math.abs(g-tiles[i][2])
        const bDiff = Math.abs(b-tiles[i][3])

        if(diff>rDiff+gDiff+bDiff) {
            tile = tiles[i][0]
            diff = rDiff+gDiff+bDiff
            type = tiles[i][4]
        }
    }

    if(tile ===-1){
       console.log("something went wrong. pixel at "+x+","+y+" is -1 with r:"+r+" g:"+g+" b:"+b+" values per pixel:"+valuesperPixel )
    }

    return { tile, type }
}

async function convertImage(level, filepath) {
    const promise = new Promise(function(resolve, error) {
        const stream = fs.createReadStream(filepath).on('end', () => {
            resolve()
        }).pipe(
            new PNG({
                filterType: 4,
            })
        )
        .on('parsed', function () {
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    const idx = (this.width * y + x) << 2;
            
                    const r = this.data[idx]
                    const g = this.data[idx + 1]
                    const b = this.data[idx + 2]
            
                    const tileData = pixelToTile(x, y, { r, g, b });

                    switch(tileData.type) {
                        case 0:
                            level.addTile({ ID: tileData.tile, layer: "T0", x: x, y: -y });
                            break;
                        case 1:
                            level.addTile({ ID: tileData.tile, layer: "T0", x: x, y: -y+1000 });
                            break;
                    }
                }
            }
        })
    })
    
    await promise

    const levelObj = { ...level }

    delete level.tileCount
    delete level.prefabCount
    delete level.gateCount
    delete level.channelsUsed

    const levelString = JSON.stringify(level)
    return { levelObj, levelString }
}

module.exports = { convertImage }
