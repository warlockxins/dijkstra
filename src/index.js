function doPath() {
    // simplePath();
    pointCloudPath();
}

function simplePath() {
    searchFromTo('h', 'e', in_vertexes, in_edgeCosts);
}

function pointCloudPath() {

    console.time('points');
    const columns = pointsToTable();
    console.timeEnd('points');
    console.log(columns);


    const to = '24:14';
    const from = '29:18';
    searchFromTo(from, to, columns.inVertexes, columns.inEdges);
}

/**
 * 
 * @param {string} start
 * @param {string} end 
 * @param {Map} vertices 
 * @param {*} edges 
 */
function searchFromTo(start, end, vertices, edges) {
    console.time('--- Path find');
    const planner = new PathPlanner(vertices, edges);
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
    const inVertexes = new Map();
    const inEdges = {};

    const columns = {};

    // fill walkable tiles from waypoints
    points.forEach(p => {
        if (!columns[p.x])
            columns[p.x] = {};
        columns[p.x][p.y] = helpers.solid;

        const curVertexName = `${p.x}:${p.y}`;
        inVertexes.set(curVertexName, p);
    });


    // fill points for falling from current block to left and right ... safely
    const checkSides = [-1, 1];
    const keys = Object.keys(columns);
    for (let index = 0; index < keys.length; index++) {

        const curColumn = columns[keys[index]];

        for (const [curY, tileType] of Object.entries(curColumn)) {
            const curVertexName = `${keys[index]}:${curY}`;

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

                    if (columnCheck[upY]) {
                        continue;
                    }

                    // has neighbour tile, can stand on it
                    if (columnCheck[curY]) {
                        connectHorizontalTiles(inEdges, curVertexName, `${checkColumnKey}:${curY}`, 1);
                        continue
                    }
                    // check if can fall down to neighbour tile
                    const posBelow = columnWillLand(columnCheck, upY);
                    if (posBelow) {
                        const fromVertexKey = `${keys[index]}:${curY}`;
                        const toVertexKey = `${checkColumnKey}:${posBelow.y}`;
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
    return { columns, inVertexes, inEdges };
}

function connectHorizontalTiles(inEdges, curVertexName, toVertexName, cost) {
    if (!inEdges[curVertexName]) {
        inEdges[curVertexName] = [];
    }
    inEdges[curVertexName].push({ to: toVertexName, cost: cost });

}


function columnWillLand(column, belowStart) {
    let lowest = { y: belowStart, waypointType: -1 };
    for (const [y, waypointType] of Object.entries(column)) {
        if (waypointType === 1 && y > belowStart) {
            lowest = { y, waypointType }
        }
    }
    return lowest.waypointType === -1 ? undefined : lowest;
}
