// Condition Name Constants
const C = {
    alive: 'Alive',
    injured: 'Injured',
    enemyAlive: 'enemyAlive',
    seeWeapon: 'seeWeapon',
    seeAmmo: 'SeeAmmo',
    seeBomb: 'seebomb',
    seeHeal: 'seeHeal',
    seeEnemy: 'seeEnemy',
    onLineOfFire: 'onlineOfFire',
    nearEnemy: 'nearEnemy',
    hasWeapon: 'hasWeapon',
    hasAmmo: 'hasAmmo',
    hasBomb: 'hasBomb',

    readyForPeace: 'readyForPeace',
    foundPeace: 'findPeace',
    snackBars: 5
}

const actions = {
    'search Weapon': {
        cost: 1,
        preConditions: (prevState) => {
            return prevState[C.hasWeapon] === false &&
                prevState[C.hasBomb] === false;
        },
        postConditions: (state) => {
            state[C.seeWeapon] = true;
        }
    },
    // ------------
    'pickupWeapon': {
        cost: 1,
        preConditions: (prevState) => {
            return prevState[C.seeWeapon] === true &&
                prevState[C.hasWeapon] === false
        },
        postConditions: (state) => {
            state[C.hasWeapon] = true;
            state[C.seeWeapon] = false;
            state[C.hasBomb] = false;
        }
    },
    // ------------
    'search Ammo': {
        cost: 1,
        preConditions: (prevState) => {
            return prevState[C.hasWeapon] === true &&
                prevState[C.hasAmmo] === false;
        },
        postConditions: (state) => {
            state[C.seeAmmo] = true;
        }
    },
    // ------------
    'pickup Ammo': {
        cost: 1,
        preConditions: (prevState) => {
            return prevState[C.hasWeapon] === true &&
                prevState[C.hasAmmo] === false &&
                prevState[C.seeAmmo] === true;
        },
        postConditions: (state) => {
            state[C.hasAmmo] = true;
            state[C.seeAmmo] = false;
        }
    },
    // ------------
    'scout with Weapon': {
        cost: 1,
        preConditions: (prevState) => {
            return prevState[C.hasWeapon] === true &&
                prevState[C.hasAmmo] === true &&
                prevState[C.seeEnemy] === false;
        },
        postConditions: (state) => {
            state[C.seeEnemy] = true;
        }
    },
    // ------------
    'Aiming': {
        cost: 1,
        preConditions: (prevState) => {
            return prevState[C.hasWeapon] === true &&
                prevState[C.hasAmmo] === true &&
                prevState[C.seeEnemy] === true &&
                prevState[C.onLineOfFire] === false;
        },
        postConditions: (state) => {
            state[C.onLineOfFire] = true;
        }
    },

    // ------------
    'Attack with Weapon': {
        cost: 2,
        preConditions: (prevState) => {
            return prevState[C.hasWeapon] === true &&
                prevState[C.hasAmmo] === true &&
                prevState[C.seeEnemy] === true &&
                prevState[C.onLineOfFire] === true;
        },
        postConditions: (state) => {
            state[C.enemyAlive] = false;
            state[C.seeEnemy] = false;
            state[C.onLineOfFire] = false;
        }
    },
    // Alternative kill - suicidal

    'Attack with Blood': {
        cost: 10,
        preConditions: (prevState) => {
            return prevState[C.injured] === false
                && prevState[C.seeEnemy] === true
                && prevState[C.enemyAlive] === true
        },
        postConditions: (prevState) => {
            prevState[C.enemyAlive] = false;
            prevState[C.seeEnemy] = false;
            prevState[C.injured] = true;
        }
    },

    'Scout Suicidal': {
        cost: 1,
        preConditions: (prevState) => {
            return prevState[C.injured] === false
                && prevState[C.seeEnemy] === false;
        },
        postConditions: (prevState) => {
            prevState[C.seeEnemy] = true;
        }
    },


    // Find peace
    'Change mood': {
        cost: 40,
        preConditions: (prevState) => {
            return prevState[C.readyForPeace] === true
        },
        postConditions: (prevState) => {
            prevState[C.foundPeace] = true;
        }
    }
};

const goals = [
    {
        name: 'Kill the enemy',
        preConditions(state) {
            return state[C.enemyAlive] === false;
        }
    },
    {
        name: 'Be peaceful',
        preConditions(state) {
            return state[C.foundPeace] === true
        }
    }
]

const worldState = {
    [C.alive]: true,
    [C.injured]: false,
    [C.enemyAlive]: true,
    [C.seeWeapon]: false,
    [C.seeAmmo]: false,
    [C.seeBomb]: false,
    [C.seeHeal]: false,
    [C.seeEnemy]: false,
    [C.onLineOfFire]: false,
    [C.nearEnemy]: false,
    [C.hasWeapon]: false,
    [C.hasAmmo]: false,
    [C.hasBomb]: false,
    [C.foundPeace]: false,
    [C.readyForPeace]: true
}