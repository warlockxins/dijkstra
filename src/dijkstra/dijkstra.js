class PathTableItem {
  constructor(cost, from) {
    this.cost = cost;
    this.from = from;
  }
}

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
   */
  resetPathTable(from) {
    this.vertexes.forEach((item) => {
      this.pathTable[item] =
        item === from ?
          new PathTableItem(0, undefined)
          : new PathTableItem(Number.POSITIVE_INFINITY, undefined)
    });
  }

  /**
   * @param {string} currentNode 
   */
  calculateNeighboursDistance(currentNode) {
    const neighbours = this.edges[currentNode];
    if (!neighbours || neighbours.length === 0) {
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
    const index = this.unvisited.indexOf(vertexKey);
    if (index != -1) {
      this.unvisited.splice(index, 1);
    }
  }

  extractPath(to) {
    let currentNode = to;
    const path = [];

    while (currentNode) {
      path.push(currentNode);
      currentNode = this.pathTable[currentNode].from;
    }

    return path.reverse();
  }

  execute(from, to) {
    this.resetPathTable(from);
    let currentNode = from;
    this.unvisited.push(from);

    while (currentNode) {
      if (currentNode === to) {
        return this.extractPath(to);
      }

      this.calculateNeighboursDistance(currentNode);

      this.visited.push(currentNode);
      this.removeUnvisited(currentNode);
      currentNode = this.pickNextVertexKey();
    }

    return [];
  }
}
