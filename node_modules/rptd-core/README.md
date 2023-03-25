# rptd-core `v1.2.7`

rptd-core is a package that allows for generating ruptured levels using code

you can see he source code on github here: [rptd-core](https://github.com/samgcode/rptd-core)

## Installation

The only pre-requisite is that you have a version of [node.js](https://nodejs.org/en/) installed.

Then you can create a new project:
```bash
npm init
```
and install the package:
```bash
npm install rptd-core
```

## Usage
```javascript
// import the components
const { jsonUtility, Level, Path } = require('rptd-core')
// create a new level
const level = new Level({ LevelName: 'Example Level' })
// add a new section
level.createSection({ LevelBounds:{ x:-100, y:100, z:100, w:-100 }})
```
Now you can add tiles and prefabs using level.addTile(...), level.addBGTile(...) etc. ([more documentation on all these function below](#Documentation))

Finally you can write the level to a file:
```javascript
jsonUtility.writeLevelToFile(level, './example_level.json')
```
> Note: it is possible to write directly to a level in your Ruptured levels folder however this is not reccomended if you have the level editor open as it can cause the level loading to break untill you restart the game

# Documentation
 > This is a temporary location for the documentation but it will remain here untill I have time to make an actuall website
## jsonUtility
This object contains some helper functions for reading and writing json files and levels
### functions

| name | params | returns | description |
|---|---|---|---|
|`createLevelFromFile`|absoluteFilePath|Level object|Reads a pre-existing ruptured level from a json file converts it to a Level object.|
|`writeLevelToFile`|LevelObject, filePath|void|Writes the given level data to a json file that can be imported into Ruptured. Prints the number of tiles and entities in the level. |

# Level
A class that contains all of the data for a Ruptured level, as well as many functions for adding tiles and prefabs. Can be constructed directly using `new` or generated using `jsonUtility.createLevelFromFile(path)`.

### properties
|name|description|
|---|---|
|`nextFreeChannel`|Contains the lowest value channel that is not being used|

### constructor
Takes an object with the following properties (see [`rptd-core/examples`](https://github.com/samgcode/rptd-core/tree/main/examples/) to see how this works):

| param | default | description |
|---|---|---|
|`LevelName`|`""`|Name of the level|
|`Creator`|`""`|Name of level creator|
|`Description`|`""`|Level description|
|`Music`|`1`|Level music|
|`Slot0Gun`|`-1`|Default gun in the first slot|
|`Slot1Gun`|`-1`|Default gun in the second slot|
|`Slot2Gun`|`-1`|Default gun in the third slot|
|`InitialHealth`|`5`|Default max health of the player|
|`InitialEnergy`|`30`|Default max energy

## methods
> All of the following methods take an object with the listed properties as a parameter, see [`rptd-core/examples`](https://github.com/samgcode/rptd-core/tree/main/examples/) to see examples

### Level meta data methods
#### `setLevelData({ })`

Takes the same params as the constructor, and defaults to the current value of those properties

#### `createSection({ })`
Creates a new section in the level
> Sections are given ids based on the order they are added, starting at 0

| param | default | description |
|---|---|---|
|`Name`|`""`|Section name|
|`Music`|`1`|Section music|
|`LevelBounds`|`{x: 0, y: 0, z: 0, w: 0}`|An object containing the x = left wall, y = right wall, z = top wall, w = bottom wall|
|`spawnPointX`|`0`|X coord of the players default spawn point|
|`spawnPointY`|`0`|Y coord of the players default spawn point|
#### `addPath({ })`
Adds a path object to the specified section

| param | default | description |
|---|---|---|
|`sectionId`|`0`|Section to add the path to|
|`path`||Instance of the [`Path`](#Path) class|
### Tile utils
#### `addTile({ })`
Adds a tile on the specified section and layer

| param | default | description |
|---|---|---|
|`sectionId`|`0`|Section to add the tile on|
|`ID`|`0`|Id of the tile to be added|
|`layer`|`"T0"`|Layer to add the tile on can be one of `["T0", "D", "BG0", "SS", "H", "M"]`, see Apendices for what each of these mean|
|`x`||x position of the tile|
|`y`||y position of the tile|

### general methods
#### `addPrefab({ })`
> note: this function is used under the hood by all prefab utility methods, and it is not reccomended to use this directly, unless there is not yet an implemented method for the desired prefab

Creates a prefab with the specified parameters

| param | default | description |
|---|---|---|
|`sectionId`|`0`|Section to add prefab in|
|`ID`||Id of desired prefab|
|`x`||x position of prefab|
|`y`||y position of prefab|
|`Properties`|`{}`|Entity specific properties|


#### `addMovingPlatform({ })`
General function for adding prefabs that can move along a path

| param | default | description |
|---|---|---|
|`sectionId`|`0`|Section to add the prefab to|
|`ID`|`4`|Id of the platform type, the default (`4`) is what the game calls 'moving platform'|
|`x`||x position of the prefab|
|`y`||y position of the prefab|
|`Size`|`{x: 1, y: 1}`|An object containing the size of the moving platform|
|`Channel`|`-2`|Channel of the platform (see [Appendices](#Appendices) for more info), *does not support contolling if a platform moves or not*|
|`PathEnabled`|`false`|Weather or not the platform follows a path|
|`PathID`|`0`|Id of the path to follow|
|`InitialPointID`|`0`|Point along the path to start at|
|`Speed`|`3`|Speed of the plaform in tiles per second|
|`Reversed`|`false`|Weather or not the platform follows the path in reverse|
|`PauseDuration`|`0`|Amount of time that the platform pauses at each point|

#### `addLogicGate({ })`
General function for adding logic gates, not reccommended to use directly (see Logic gate methods)

returns the channels that were used as an object

see [`rptd-core/examples/gateExample.js`](https://github.com/samgcode/rptd-core/tree/main/examples/gateExample.js) for an example

| param | default | description |
|---|---|---|
|`sectionID`|`0`|Section to add the logic gate in|
|`ID`||id of the gate type|
|`x`||x position of the gate|
|`y`||y position of the gate|
|`Channels`|`{ }`|Object containing the channels of the gate|
|`Properties`|`{ }`|Any other properties of the gate|

### prefab utils
#### `addBooster({ })`

| param | default | description |
|---|---|---|
|`sectionId`|`0`|Section to add the prefab to|
|`x`||x position of the booster|
|`y`||y position of the booster|
|`Strength`|`30`|Strength of the booster in tiles per second|
|`Channel`|`-2`|Channel of the prefab (see [Appendices](#Appendices) for more info)|
|`StartActive`|`true`|Weather or not the booster is on when the level loads|
|`Direction`|`0`|`0` is up, `1` is left, `2` is down, `3` is right|

#### `addButton({ })`
| param | default | description |
|---|---|---|
|`sectionId`|`0`|Section to add the button to|
|`x`||x position of the button|
|`y`||y position of the button|
|`Channel`|`-2`|Channel of the booster (see [Appendices](#Appendices) for more info)|

#### `addCheckPoint({ })`

| param | default | description |
|---|---|---|
|`sectionId`|`0`|Section to add the check point to|
|`x`||x position of the check point|
|`y`||y position of the check point|
|`isLevelEnd`|`false`|Weather or not this checkpoint is a level end trigger|

#### `addCrate({ })`

| param | default | description |
|---|---|---|
|`sectionId`|`0`|Section to add the crate to|
|`x`||x position of the crate|
|`y`||y position of the crate|

### moving platform prefabs
#### `addToggleWall({ })`
General function for adding prefabs that can move along a path

| param | default | description |
|---|---|---|
|`sectionId`|`0`|Section to add the prefab to|
|`x`||x position of the prefab|
|`y`||y position of the prefab|
|`Size`|`{x: 1, y: 1}`|An object containing the size of the moving platform|
|`Channel`|`-2`|Channel of the platform (see [Appendices](#Appendices) for more info), *does not support contolling if a platform moves or not*|
|`PathEnabled`|`false`|Weather or not the platform follows a path|
|`PathID`|`0`|Id of the path to follow|
|`InitialPointID`|`0`|Point along the path to start at|
|`Speed`|`3`|Speed of the plaform in tiles per second|
|`Reversed`|`false`|Weather or not the platform follows the path in reverse|
|`PauseDuration`|`0`|Amount of time that the platform pauses at each point|

### Logic gate methods
#### `addAndGate({ })`,`addOrGate({ })`,`addXorGate({ })`
Functions for adding and, or, and xor, they all have the same parameters
returns the channels that were used as an object (eg: `{ InChannel1: 3, InChannel2: 4, OutChannel1: 5 }`)

| param | default | description |
|---|---|---|
|`sectionID`|`0`|Section to add the logic gate in|
|`x`||x position of the gate|
|`y`||y position of the gate|
|`InChannel1`|`-2`|First input channel|
|`InChannel2`|`-2`|Second input channel|
|`OutChannel1`|`-2`|Output channel|

#### `addNotGate({ })`
Function for adding  not gates
returns the channels that were used as an object (eg: `{ InChannel1: 3, OutChannel1: 4 }`)

| param | default | description |
|---|---|---|
|`sectionID`|`0`|Section to add the logic gate in|
|`x`||x position of the gate|
|`y`||y position of the gate|
|`InChannel1`|`-2`|First input channel|
|`OutChannel1`|`-2`|Output channel|

#### `addLatchGate({ })`
Function for adding latches and t-flip-flops (TFF)
returns the channels that were used as an object (eg: `{ OnChannel: 11, OffChannel: 12, OutChannel1: 13}`)

| param | default | description |
|---|---|---|
|`sectionID`|`0`|Section to add the logic gate in|
|`x`||x position of the gate|
|`y`||y position of the gate|
|`OnChannel`|`-2`|On input channel|
|`OffChannel`|`-2`|Off input channel|
|`OutChannel1`|`-2`|Output channel|
|`StartActive`|`false`|Wether the latch starts active or not|
|`TFF`|`false`|Wether the latch is a TFF or not|

#### `addClock({ })`
Function for adding clocks
returns the channel that was used as an object (eg: `{ OutChannel1: 16 }`)

| param | default | description |
|---|---|---|
|`sectionID`|`0`|Section to add the logic gate in|
|`x`||x position of the gate|
|`y`||y position of the gate|
|`Channel`|`-2`|Output channel|
|`StartActive`|`false`|Wether the latch starts active or not|
|`OnTime`|`0.1`|Amount of time the clock is on for|
|`OffTime`|`0.1`|Amount of time the clock is off for|

# Path
Represents a path that a moving platform can follow, to create a ne Path use `new Path(id)` and then use `path.addPosition({ x, y })` to add positions.
### constructor

| param | default | description |
|---|---|---|
|`ID`|0|The path id to be referenced by moving platforms|

## methods
#### `addPosition({ })`
takes an object containing the x and y position of the new point, points of a path are followed in order

| param | description |
|---|---|
|`x`|x position of the point|
|`y`|y position of the point|

# Appendices
### terminology
- Tile: any static tile with no properties, has an id which tells the game what flavor of tile it is, and a position
- Prefab: any entity with setable properties, (eg: buttons, enemies, triggers), these also have an id and position at bare minimum, as well as a "properties" attribute which contains all other entity specific information

### channels
- for any prefab utility function, setting the channel to `-1` will have the effect of giving it no channel
- setting the channel to `-2` (default most of the time) will use the next free channel
- all of these functions return the channels used

### layers

|name|description|
|---|---|
|`"T0"`|default layer for standard tiles|
|`"D"`|default layer for dark tiles (eg: 'map dark'|
|`"BG0"`|default layer for background tiles|
|`"SS"`|default layer for semi-solid tiles|
|`"H"`|default layer for hazard tiles|
|`"M"`|default layer for map tiles (eg: 'map transparent')|
