//  inspired by https://www.youtube.com/watch?v=znhd8FzVVds&t=395s

function plan() {
    console.time('plan');
    const sortedPlans = execute();
    console.timeEnd('plan');

    console.log('ids', sortedPlans);
}

function execute() {
    const leaves = {
        leaf: null,
        price: 10000
    };
    const startNode = new Gnode(undefined, undefined, worldState, 0);
    buildGraph(startNode, goals, actions, leaves);



    if (!leaves.leaf) {
        return [];
    }

    const planIds = extractOrderedPlan(leaves.leaf);

    return planIds;
}

/**
 * 
 * @param {Gnode} node 
 */
function extractOrderedPlan(node) {
    let currentNode = node;
    let planIds = [];

    while (currentNode) {
        if (currentNode.id) {
            planIds.push(currentNode.id);
        }
        currentNode = currentNode.fromNode;
    }

    return planIds.reverse();
}

class Gnode {
    /**
     * 
     * @param {Gnode} fromNode 
     * @param {*} state 
     * @param {number} runningCost 
     */
    constructor(fromNode, id, state, runningCost = 0) {
        this.fromNode = fromNode;
        this.id = id;
        this.state = state;
        this.runningCost = runningCost;
    }
}

/**
 * 
 * @param {Gnode} startNode 
 * @param {*} availableGoals 
 * @param {[key: string]: Action} availableActions 
 * @param {{leaf: Gnode, price: number}} leaves
 */
function buildGraph(startNode, availableGoals, availableActions, leaves) {
    for (const [key, action] of Object.entries(availableActions)) {
        if (action.preConditions(startNode.state)) {
            const cost = startNode.runningCost + action.cost;
            if (cost > leaves.price) {
                continue;
            }

            const nextState = { ...startNode.state };
            action.postConditions(nextState);

            const nextNode = new Gnode(startNode, key, nextState, cost);

            // matches goals
            if (availableGoals.some((goal) => goal.preConditions(nextState))) {
                if (leaves.price > cost) {
                    leaves.leaf = nextNode;
                    leaves.price = cost;
                }
            }
            else {
                const nextAvailableActions = { ...availableActions };
                delete nextAvailableActions[key];
                buildGraph(nextNode, availableGoals, nextAvailableActions, leaves);
            }
        }
    }
}
