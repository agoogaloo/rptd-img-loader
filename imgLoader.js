const { jsonUtility, Level } = require('rptd-core') 
const PNG = require('png-js')

//a list of all the tiles that can be selected from format is tileid, r,g,b values
let hotTiles = [[0,96,74,74],[1,86,43,32],[3,84,19,7],[4,49,35,23],[5,135,61,55],[6,113,86,72],
    [7,73,75,60],[8,137,71,42],[9,102,94,88],[10,100,18,0],[11,25,35,37],[12,180,177,172],
    [200,58,44,46],[203,166,72,4],[206,127,64,62],[209,87,28,19]]

let coldTiles = [[0,44,51,67],[1,54,53,64],[3,24,26,42],[4,31,38,58],[5,71,75,104],[6,90,87,102],
    [7,53,64,63],[8,61,53,68],[9,73,75,77],[10,65,113,251],[11,25,34,37],[12,176,176,176],
    [200,43,47,61],[203,24,126,,227],[206,73,73,97],[209,36,57,89]]



function createImg(path = './images/testImg.png', level, finish){
    let img = PNG.load(path)
    console.log("image w",img.width,", h",img.height)

    
    img.decodePixels(function(pixels){
        console.log("len"+pixels.length)
        for(let y=0;y<img.height;y++){
            for(let x=0;x<img.width;x++){
                let tileInfo = pixelToTile(x,y,img,pixels)
                let tile = tileInfo[0]
                let hot = tileInfo[1]

                //we gotta flip the y axis
                if(hot){
                    level.addTile({ ID: tile, x:x, y:-y})
                }else{
                    level.addTile({ ID: tile, x:x, y:-y+1000})
                }
            }
        }
        finish()
    })

}

// returns tile id and whether the tile will be hot or cold
function pixelToTile(x ,y,img,pixels){
    let valuesperPixel = pixels.length/(img.width*img.height)//why do i need this
    //rgb values of the pixel
    let r = pixels[(y*img.width+x)*valuesperPixel]
    let g = pixels[(y*img.width+x)*valuesperPixel+1]
    let b = pixels[(y*img.width+x)*valuesperPixel+2]
    //difference from actual pixel to tile colour
    let diff = 255*3
    let tile = -1 // index of the tile 
    let hot = true

    for(let i in hotTiles){
        
        let rDiff = Math.abs(r-hotTiles[i][1]) 
        let gDiff = Math.abs(g-hotTiles[i][2])
        let bDiff = Math.abs(b-hotTiles[i][3])

        if(diff>rDiff+gDiff+bDiff){
            tile = hotTiles[i][0]
            diff = rDiff+gDiff+bDiff
        }
    }
    for(let i in coldTiles){
        
        let rDiff = Math.abs(r-coldTiles[i][1]) 
        let gDiff = Math.abs(g-coldTiles[i][2])
        let bDiff = Math.abs(b-coldTiles[i][3])

        if(diff>rDiff+gDiff+bDiff){
            tile = coldTiles[i][0]
            diff = rDiff+gDiff+bDiff
            hot = false
        }
    }
    if(tile ===-1){
       console.log("something went wrong. pixel at "+x+","+y+" is -1 with r:"+r+" g:"+g+" b:"+b+" values per pixel:"+valuesperPixel )
    }

    return [tile,hot]
}

module.exports = {createImg,hotTiles,coldTiles}
