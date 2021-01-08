function plan() {
    const leaves = [];
    const startNode = new Gnode(undefined, undefined, worldState, 0);
    buildGraph(startNode, goals, actions, leaves);

    if (leaves.length === 0) {
        return;
    }

    const sortedPlans = leaves.sort((a, b) => a.runningCost - b.runningCost);
    const planIds = extractOrderedPlan(sortedPlans[0]);
    console.log('----plan cost', sortedPlans[0].runningCost, '; ids', planIds);
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

class Action {
    /**
     * 
     * @param {*} preConditions 
     * @param {*} postConditions 
     * @param {number} cost 
     */
    constructor(preConditions, postConditions, cost) {
        this.preConditions = preConditions;
        this.postConditions = postConditions;
        this.cost = cost;
    }
}

/**
 * 
 * @param {Gnode} startNode 
 * @param {*} availableGoals 
 * @param {[key: string]: Action} availableActions 
 * @param {[Gnode]} leaves
 */
function buildGraph(startNode, availableGoals, availableActions, leaves) {
    for (const [goalKey, goalState] of Object.entries(availableGoals)) {
        for (const [key, action] of Object.entries(availableActions)) {
            const actionHasPreconditions = coversState(startNode.state, action.preConditions);

            if (actionHasPreconditions) {
                const nextState = { ...startNode.state, ...action.postConditions };
                const nextNode = new Gnode(startNode, key, nextState, startNode.runningCost + action.cost);
                const actionFitsGoal = coversState(nextState, goalState);

                if (actionFitsGoal) {
                    leaves.push(nextNode);
                } else {
                    const nextAvailableActions = { ...availableActions };
                    delete nextAvailableActions[key];

                    buildGraph(nextNode, availableGoals, nextAvailableActions, leaves);
                }
            }
        }
    }
}

function coversState(state, requiredState) {
    return Object.entries(requiredState).every(([key, value]) => {
        return state[key] === value;
    });
}