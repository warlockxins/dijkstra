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
    hasBomb: 'hasBomb'
}

const actions = {
    'search Weapon': {
        cost: 1,
        preConditions: {
            [C.hasWeapon]: false,
            [C.hasBomb]: false
        },
        postConditions: {
            [C.seeWeapon]: true
        }
    },
    // ------------
    'pickupWeapon': {
        cost: 1,
        preConditions: {
            [C.seeWeapon]: true,
            [C.hasWeapon]: false
        },
        postConditions: {
            [C.hasWeapon]: true,
            [C.seeWeapon]: false,
            [C.hasBomb]: false
        }
    },
    // ------------
    'search Ammo': {
        cost: 1,
        preConditions: {
            [C.hasWeapon]: true,
            [C.hasAmmo]: false,
        },
        postConditions: {
            [C.seeAmmo]: true,
        }
    },
    // ------------
    'pickup Ammo': {
        cost: 1,
        preConditions: {
            [C.hasWeapon]: true,
            [C.hasAmmo]: false,
            [C.seeAmmo]: true,
        },
        postConditions: {
            [C.hasAmmo]: true,
            [C.seeAmmo]: false,
        }
    },
    // ------------
    'scout with Weapon': {
        cost: 1,
        preConditions: {
            [C.hasWeapon]: true,
            [C.hasAmmo]: true,
            [C.seeEnemy]: false,
        },
        postConditions: {
            [C.seeEnemy]: true
        }
    },
    // ------------
    'Aiming': {
        cost: 1,
        preConditions: {
            [C.hasWeapon]: true,
            [C.hasAmmo]: true,
            [C.seeEnemy]: true,
            [C.onLineOfFire]: false
        },
        postConditions: {
            [C.onLineOfFire]: true
        }
    },

    // ------------
    'Attack with Weapon': {
        cost: 1,
        preConditions: {
            [C.hasWeapon]: true,
            [C.hasAmmo]: true,
            [C.seeEnemy]: true,
            [C.onLineOfFire]: true
        },
        postConditions: {
            [C.enemyAlive]: false,
            [C.seeEnemy]: false,
            [C.onLineOfFire]: false,
        }
    },


    // Alternative kill - suicidal

    'Attack with Blood': {
        cost: 5,
        preConditions: {
            [C.injured]: false,
            [C.seeEnemy]: true,
            [C.onLineOfFire]: true
        },
        postConditions: {
            [C.enemyAlive]: false,
            [C.seeEnemy]: false,
            [C.injured]: true,
        }
    },

    'Scout Suicidal': {
        cost: 2,
        preConditions: {
            [C.injured]: false,
            [C.seeEnemy]: false,
            [C.onLineOfFire]: false
        },
        postConditions: {
            [C.enemyAlive]: true,
            [C.seeEnemy]: true,
            [C.onLineOfFire]: true
        }
    },
};

const goals = {
    'Kill the enemy': {
        [C.enemyAlive]: false
    }
}

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
    [C.hasBomb]: false
}