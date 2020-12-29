function doPath() {
    searchFromTo('c', 'e');
}

function searchFromTo(start, end) {
    console.time('--- Path find');
    const planner = new PathPlanner(in_vertexes, in_edgeCosts);
    const result = planner.execute(start, end)
    console.timeEnd('--- Path find');

    document.getElementById('graph').innerHTML = JSON.stringify(in_edgeCosts);

    document.getElementById('fromto').innerHTML = start + ' -> ' + end;

    console.log('shortest path', result);
    document.getElementById('result').innerHTML = result.join('<br>');
}