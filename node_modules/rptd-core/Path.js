class Path {
  constructor(ID=0) {
    this.PrefabID = 500;
    this.ID = ID;
    this.Positions = [];
  }

  addPosition({ x, y }) {
    this.Positions.push({ x, y })
  }
}


module.exports = Path;
