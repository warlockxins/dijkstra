class PathPlannerHeuristicXY extends PathPlanner {
    calculateHeuristic(fromNode, toNode) {
        const xDiff = fromNode.x - toNode.x;
        const yDiff = fromNode.y - toNode.y;

        return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    }
}

function doPath() {
    // simplePath();
    pointCloudPath();
}

function simplePath() {
    searchFromTo('c', 'e', in_vertexes, in_edgeCosts, PathPlannerHeuristicXY);
}

function pointCloudPath() {

    console.time('points');
    const columns = pointsToTable();
    console.timeEnd('points');
    console.log(columns);


    const from = '23_14';
    const to = '34_18';
    searchFromTo(from, to, columns.inVertexes, columns.inEdges, PathPlanner);
}

/**
 * 
 * @param {string} start
 * @param {string} end 
 * @param {Map} vertices 
 * @param {*} edges 
 */
function searchFromTo(start, end, vertices, edges, plannerStrategy) {
    console.time('--- Path find');
    const planner = new plannerStrategy(vertices, edges);
    const result = planner.execute(start, end)
    console.timeEnd('--- Path find');

    document.getElementById('graph').innerHTML = JSON.stringify(in_edgeCosts);

    document.getElementById('fromto').innerHTML = start + ' -> ' + end;

    console.log('shortest path', result);
    document.getElementById('result').innerHTML = result.join('<br>');
}


const helpers = {
    solid: 1,
    wayPointGround: 2,
}

function pointsToTable() {
    // const inVertexes = new Set();
    const inVertexes = new Map();
    const inEdges = {};

    const columns = {};

    // fill walkable tiles from waypoints
    points.forEach(p => {
        if (!columns[p.x])
            columns[p.x] = {};
        columns[p.x][p.y] = helpers.solid;

        const curVertexName = `${p.x}_${p.y}`;
        // inVertexes.add(curVertexName); // set
        inVertexes.set(curVertexName, p);
    });


    // fill points for falling from current block to left and right ... safely
    const checkSides = [-1, 1];
    const keys = Object.keys(columns);
    for (let index = 0; index < keys.length; index++) {

        const curColumn = columns[keys[index]];

        for (const [curY, tileType] of Object.entries(curColumn)) {
            const curVertexName = `${keys[index]}_${curY}`;
            // inVertexes.add(curVertexName);

            const upY = (+curY) - 1;
            const curTileUp = curColumn[upY];

            // we can stand on this - don't have tile stacked above
            if (!curTileUp) {
                for (const offset of checkSides) {
                    const resIndex = index + offset;
                    if (resIndex < 0) continue;
                    if (resIndex >= keys.length) continue;

                    const checkColumnKey = keys[resIndex];
                    const columnCheck = columns[checkColumnKey];
                    const sideTileUp = columnCheck[upY];
                    const itemAtSide = columnCheck[curY];

                    if (itemAtSide && !sideTileUp) {
                        connectHorizontalTiles(inEdges, curVertexName, `${checkColumnKey}_${curY}`, 1);
                    }

                    // TODO - add to InEdges
                    if (!itemAtSide && !sideTileUp) {
                        const posBelow = columnWillLand(columnCheck, upY);
                        if (posBelow) {
                            const fromVertexKey = `${keys[index]}_${curY}`;
                            const toVertexKey = `${checkColumnKey}_${posBelow.y}`;
                            const diagonalCost = 1;
                            // jump down is possible = add to edges
                            connectHorizontalTiles(inEdges, fromVertexKey, toVertexKey, diagonalCost);

                            // Todo calculate if can jump up a tile (jump height dependency)
                            connectHorizontalTiles(inEdges, toVertexKey, fromVertexKey, diagonalCost);
                        }
                    }
                }
            }
        }
    }
    return { columns, inVertexes, inEdges };
}

function connectHorizontalTiles(inEdges, curVertexName, toVertexName, cost) {
    if (!inEdges[curVertexName]) {
        inEdges[curVertexName] = [];
    }
    inEdges[curVertexName].push({ to: toVertexName, cost: cost });

}


function columnWillLand(column, belowStart) {
    // filter by
    const orderedBelow = Object.entries(column)
        .filter((a) => {
            return a[1] === 1 && a[0] > belowStart
        })
        .sort(([a], [b]) => {
            return a - b;
        });

    return orderedBelow.length > 0 ? {
        y: orderedBelow[0][0],
        waypointType: orderedBelow[0][1]
    } : undefined;
}