var in_vertexesBase = [
  ['start', {
    x: 1,
    y: 0
  }],
  ['a', {
    x: 0, y: 1
  }],
  ['b', { x: 1, y: 1 }],
  ['c', { x: 3, y: 0 }],
  ['d', { x: 0, y: 2 }],
  ['h', { x: 1, y: 2 }],
  ['f', { x: 0, y: 3 }],
  ['e', { x: 3, y: 4 }],
  ['g', { x: 2, y: 3 }],
  ['i', { x: 3, y: 2 }],
  ['j', { x: 4, y: 2 }],
  ['k', { x: 3.5, y: 3 }],
  ['l', { x: 3.5, y: 1 }]
];

var in_vertexes = new Map(in_vertexesBase)

var in_edgeCosts = {
  'start': [
    { to: 'a', cost: 7 },
    { to: 'b', cost: 2 },
    { to: 'c', cost: 3 }
  ],
  'a': [
    { to: 'start', cost: 7 },
    { to: 'b', cost: 3 },
    { to: 'd', cost: 4 }
  ],
  'b': [
    { to: 'start', cost: 2 },
    { to: 'h', cost: 1 },
    { to: 'd', cost: 4 }
  ],
  h: [
    { to: 'f', cost: 3 },
    { to: 'g', cost: 2 }
  ],
  d: [
    { to: 'f', cost: 5 }
  ],
  g: [
    { to: 'e', cost: 2 }
  ],
  // right branch
  c: [
    { to: 'l', cost: 2 },
    { to: 'start', cost: 1 }
  ],
  l: [
    { to: 'i', cost: 4 },
    { to: 'j', cost: 4 }
  ],
  i: [
    { to: 'l', cost: 4 },
    { to: 'j', cost: 6 },
    { to: 'k', cost: 4 }
  ],
  j: [
    { to: 'l', cost: 4 },
    { to: 'i', cost: 6 },
    { to: 'k', cost: 4 }
  ],
  k: [
    { to: 'e', cost: 5 }
  ]
}
