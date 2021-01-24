class PathTableItem {
  /**
   * 
   * @param {number} cost 
   * @param {string} from 
   * @param {number} heuristic 
   */
  constructor(cost, from, heuristic = 0) {
    this.cost = cost;
    this.from = from;
    this.heuristic = heuristic;
  }
}

class PathPlanner {
  /**
   * 
   * @param {Map} vertexes 
   * @param {*} edges 
   */
  constructor(vertexes, edges) {
    this.vertexes = vertexes;
    this.edges = edges;
    this.unvisited = [];
    this.pathTable = {};
    this.visited = [];
  }

  /**
   * this needs should help calculate optimistic right direction, 
   * Must override per need
   * by default just 0
   * 
   * @param {*} fromNode vertex
   * @param {*} toNode vertex
   * @returns number
   */
  calculateHeuristic(fromNode, toNode) {
    return 0;
  }

  /**
   * @param {string} from vertex key
   */
  resetPathTable(from) {
    const fromNode = this.vertexes.get(from);
    for (const [key, node] of this.vertexes) {
      this.pathTable[key] =
        key === from ?
          new PathTableItem(0, undefined, 0)
          : new PathTableItem(Number.POSITIVE_INFINITY, undefined, this.calculateHeuristic(fromNode, this.vertexes.get(key)))
    }
  }

  calculateNeighboursDistance(currentNode) {
    const neighbours = this.edges[currentNode];
    if (!neighbours || neighbours.length === 0) {
      return;
    }

    const distFrom = this.pathTable[currentNode].cost;
    const heuristicFrom = this.pathTable[currentNode].heuristic;

    neighbours.forEach((edge) => {
      if (this.visited.indexOf(edge.to) === -1) {
        this.unvisited.push(edge.to);
      }
      const elementTo = this.pathTable[edge.to];

      const cost = distFrom + edge.cost;

      if (elementTo.cost + elementTo.heuristic > cost + heuristicFrom) {
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
    let counter = 0;
    this.resetPathTable(from);
    let currentNode = from;
    this.unvisited.push(from);

    while (currentNode) {
      counter++;
      if (currentNode === to) {
        console.log('======Counter', counter);
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
