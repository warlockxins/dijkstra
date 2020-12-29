var in_vertexes = [
  'start',
  'a',
  'b',
  'c',
  'd',
  'h',
  'f'
];

var in_edgeCosts = {
  'start': [
    { to: 'a', cost: 7 },
    { to: 'b', cost: 2 },
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
  ],
  d: [
    { to: 'f', cost: 5 }
  ]
}
