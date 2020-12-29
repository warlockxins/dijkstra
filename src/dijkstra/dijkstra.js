class PathPlanner {
  constructor(vertexes, edges) {
    this.vertexes = vertexes;
    this.edges = edges;
    this.unvisited = [];
    this.pathTable = {};
    this.visited = [];
  }

  /**
   * 
   * @param {string} from vertex key
   * 
   * @returns {key:{number, from}}
   */
  createInitialTable(from) {
    return this.vertexes.reduce((accumulator, item) => {
      accumulator[item] = item === from ?
        { cost: 0, from: undefined }
        : { cost: Number.POSITIVE_INFINITY, from: undefined };
      return accumulator;
    }, {});
  }

  /**
   * @param {string} currentNode 
   */
  calculateNeighboursDistance(currentNode) {
    const neighbours = this.edges[currentNode];
    if (!neighbours || neighbours.length == 0) {
      return;
    }

    const distFrom = this.pathTable[currentNode].cost;

    neighbours.forEach((edge) => {
      if (this.visited.indexOf(edge.to) === -1) {
        this.unvisited.push(edge.to);
      }
      const elementTo = this.pathTable[edge.to];
      const cost = distFrom + edge.cost;

      if (elementTo.cost > cost) {
        elementTo.cost = cost;
        elementTo.from = currentNode;
      }
    });
  }

  pickNextVertexKey() {
    let smallest = Number.POSITIVE_INFINITY;
    let cheapCostKey = undefined;

    this.unvisited.forEach((vertexKey) => {
      if (this.visited.indexOf(vertexKey) === -1) {
        let item = this.pathTable[vertexKey];
        if (item.cost < smallest) {
          smallest = item.cost;
          cheapCostKey = vertexKey;
        }
      }
    });

    return cheapCostKey;
  }

  removeUnvisited(vertexKey) {
    var index = this.unvisited.indexOf(vertexKey);
    if (index != -1) {
      this.unvisited.splice(index, 1);
    }
  }

  extractPath(to) {
    let currentNode = to;
    let maxSteps = 10;
    const path = [];

    while (currentNode) {
      maxSteps--;
      if (maxSteps == 0) {
        return path;
      }
      path.push(currentNode);

      let item = this.pathTable[currentNode];
      currentNode = item.from;
    }
    return path;
  }

  execute(from, to) {
    let safetyCounter = 0;
    this.pathTable = this.createInitialTable(from);

    let currentNode = from;
    let searching = true;
    let found = false;

    while (searching && safetyCounter < 20) {
      safetyCounter++;
      if (currentNode === undefined) {
        searching = false;
      }
      else if (currentNode === to) {
        found = true;
        searching = false;
      } else {
        this.calculateNeighboursDistance(currentNode);

        this.visited.push(currentNode);
        this.removeUnvisited(currentNode);
        currentNode = this.pickNextVertexKey();
      }
    }
    console.log('safety counter - ', safetyCounter);

    if (found) {
      return this.extractPath(to);
    }
    return [];
  }
}
