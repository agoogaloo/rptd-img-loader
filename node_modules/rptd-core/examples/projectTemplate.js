const { jsonUtility, Level, Path } = require('rptd-core')

const level = new Level({LevelName: "example"})
level.createSection({LevelBounds:{x:-1000, y:1000, z:1000, w:-1000}})


jsonUtility.writeLevelToFile(level, './output.json')
