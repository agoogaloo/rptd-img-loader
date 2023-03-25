class Level {
  constructor({ LevelName="", Creator="", Description="", Music=1, Slot0Gun=-1, Slot1Gun=-1, Slot2Gun=-1, InitialHealth=5, InitialEnergy=30, Sections=[] }) {
    this.LevelName = LevelName
    this.Creator = Creator
    this.Description = Description
    this.Music = Music
    this.Slot0Gun = Slot0Gun
    this.Slot1Gun = Slot1Gun
    this.Slot2Gun = Slot2Gun
    this.InitialHealth = InitialHealth
    this.InitialEnergy = InitialEnergy
    this.Sections = Sections
    this.tileCount = 0
    this.prefabCount = 0
    this.gateCount = 0
    this.channelsUsed = []
  }

  get nextFreeChannel() {
    let channel = -1
    for(let index = 0; index <= this.channelsUsed.length; index++) {
      if(this.channelsUsed[index] != index) {
        channel = index
        break
      }
    }
    return channel
  }

  setLevelData({ 
    LevelName=this.LevelName,Creator=this.Creator,Description=this.Description,Music=this.Music,Slot0Gun=this.Slot0Gun,
    Slot1Gun=this.Slot1Gun,Slot2Gun=this.Slot2Gun,InitialHealth=this.InitialHealth,InitialEnergy=this.InitialEnergy
  }) {
    this.LevelName = LevelName
    this.Creator = Creator
    this.Description = Description
    this.Music = Music
    this.Slot0Gun = Slot0Gun
    this.Slot1Gun = Slot1Gun
    this.Slot2Gun = Slot2Gun
    this.InitialHealth = InitialHealth
    this.InitialEnergy = InitialEnergy
  }

  createSection({ Name="", Music=1, LevelBounds={x:0, y:0, z:0, w:0}, spanwPointX=0, spawnPointY=0 }) {
    this.Sections.push({ 
      Name, 
      SpawnPoint: {x: spanwPointX, y: spawnPointY, magnitude: 0, sqrMagnitude: 0}, 
      LevelBounds, 
      Music, 
      T0: "", D: "", BG0: "", SS: "", H: "", M: "", 
      Prefabs: [], Paths: [] 
    })
  }

  useChannel(channel) {
    this.channelsUsed[channel] = channel
  }

  addTile({ sectionId=0, ID=0, layer="T0", x, y }) {
    this.tileCount++;
    this.Sections[sectionId][layer] += `${ID}(${x},${y})`
  }

  addPath({ sectionId=0, path }) {
    this.Sections[sectionId].Paths.push(path);
  }
    
  addPrefab({ sectionId=0, ID, x, y, Properties={} }) {
    let channel = Properties.Channel
    if(channel === -2) {
      channel = this.nextFreeChannel
    }
    this.channelsUsed[channel] = channel
    Properties.Channel = channel

    this.prefabCount++;
    this.Sections[sectionId].Prefabs.push({ID, Position: {x, y}, Properties})
    return channel
  }

  addBooster({ sectionId=0, x, y, Strength=30, Channel=-2, StartActive=true, Direction=0 }) {
    return this.addPrefab({ 
      sectionId, ID: 1, x, y, 
      Properties: {Strength, Channel, StartActive, Direction}
    })
  }
  
  addButton({ sectionId=0, x, y, Channel=-2 }) {
    return this.addPrefab({ sectionId, ID: 200, x, y, Properties: {Channel}})
  }

  addCheckPoint({ sectionId=0, x, y, isLevelEnd=false }) {
    if(!isLevelEnd) {
      this.addPrefab({ sectionId, ID: null, x, y})
    } else {
      this.addPrefab({ sectionId, ID: 7, x, y})
    }
  }


  addCrate({ sectionId=0, x, y }) {
    this.addPrefab({ sectionId, ID: 3, x, y, Properties: {}})
  }

  
  addMovingPlatform({ sectionId=0, ID=4, x, y, Size={x:1,y:1}, Channel=-2, StartActive=false, PathEnabled=false, PathID=0, InitialPointID=0, Speed=3, Reversed=false, PauseDuration=0 }) {
    return this.addPrefab({
      sectionId,
      ID,
      x, y,
      Properties: {
        Size,
        Channel,
        StartActive,
        PathEnabled, PathID, InitialPointID,
        Speed, Reversed, PauseDuration
      }
    })
  }

  addToggleWall({ sectionId=0, x, y, Size={x:1,y:1}, Channel=-2, StartActive=false, PathEnabled=false, PathID=0, InitialPointID=0, Speed=3, Reversed=false, PauseDuration=0 }) {
    return this.addMovingPlatform({
      sectionId,
      ID: 201,
      x, y, Size,
      Channel,
      StartActive,
      PathEnabled, PathID, InitialPointID,
      Speed, Reversed, PauseDuration
    })
  }

  addLogicGate({ sectionId=0, ID, x, y, Channels={}, Properties={} }) {
    this.gateCount++
    
    const channels = { ...Channels, Channel: Channels.OutChannel1 }
    
    for (const [key, value] of Object.entries(channels)) {  
      if(value === -2) {
        channels[key] = this.nextFreeChannel
      }
      this.channelsUsed[channels[key]] = channels[key]
    }

    this.Sections[sectionId].Prefabs.push({ID, Position: {x, y}, Properties: { ...channels, ...Properties}})
    return channels
  }

  addOrGate({ sectionId=0, x, y, InChannel1=-2, InChannel2=-2, OutChannel1=-2 }) {
    return this.addLogicGate({ sectionId, ID:203, x, y, Channels: { InChannel1, InChannel2, OutChannel1 }})
  }

  addAndGate({ sectionId=0, x, y, InChannel1=-2, InChannel2=-2, OutChannel1=-2 }) {
    return this.addLogicGate({ sectionId, ID: 204, x, y, Channels: { InChannel1, InChannel2, OutChannel1 }})
  }

  addNotGate({ sectionId=0, x, y, InChannel1=-2, OutChannel1=-2 }) {
    return this.addLogicGate({ sectionId, ID: 205, x, y, Channels: { InChannel: InChannel1, OutChannel1 }})
  }

  addXorGate({ sectionId=0, x, y, InChannel1=-2, InChannel2=-2, OutChannel1=-2 }) {
    return this.addLogicGate({ sectionId, ID: 206, x, y, Channels: { InChannel1, InChannel2, OutChannel1 }})
  }

  addClock({ sectionId=0, x, y, Channel=-2, StartActive=false, OnTime=0.1, OffTime=0.1 }) {
    return this.addLogicGate({ sectionId, ID: 208, x, y, Channels: { OutChannel1: Channel }, Properties: { StartActive, 'On Time': OnTime, 'Off Time': OffTime }})
  }

  addLatchGate({ sectionId=0, x, y, OnChannel=-2, OffChannel=-2, OutChannel1=-2, StartActive=false, TFF=false }) {
    const channels = { OnChannel, OffChannel, OutChannel1 }
    if(TFF) {
      if(channels.OnChannel === -2) {
        channels.OnChannel = this.nextFreeChannel
      }
      channels.OffChannel = channels.OnChannel
      this.channelsUsed[channels.OnChannel] = channels.OnChannel
    }
    return this.addLogicGate({ sectionId, ID: 209, x, y, Channels: channels, Properties: { StartActive }})
  }
}


module.exports = Level
