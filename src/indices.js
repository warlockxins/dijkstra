var in_vertexes = [
  'start',
  'a',
  'b',
  'c',
  'd',
  'h',
  'f',
  'e',
  'g',
  'i',
  'j',
  'k',
  'l'
];

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
