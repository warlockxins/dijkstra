function doPath() {
    console.time('--- Path find');
    const planner = new PathPlanner(in_vertexes, in_edgeCosts);
    const result = planner.execute('start', 'e')
    console.timeEnd('--- Path find');

    document.getElementById('graph').innerHTML = JSON.stringify(in_edgeCosts);

    console.log('shortest path', result);
    document.getElementById('result').innerHTML = result.join('<br>');
}