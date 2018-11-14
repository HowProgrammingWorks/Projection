'use strict';

// Projection

const id = x => x;

const projection = meta => src => meta.reduce(
  (dest, [name, fn = id, field = name]) =>
    (dest[name] = fn(src[field]), dest), {}
);

// Display

const max = (a, b) => (a > b ? a : b);

const render = meta => src => {
  const keys = meta.map(([name]) => name);
  const width = src.map(obj => keys.map(
    key => obj[key].toString().length
  ));
  const maxWidth = keys.map(
    (key, i) => width.reduce((a, b) => max(a, b[i]), 0)
  );
  const dest = src.map(obj => keys.map(
    (key, i) => obj[key].toString().padEnd(maxWidth[i] + 4)
  ));
  return dest.map(row => row.join('')).join('\n');
};

// Dataset

const persons = [
  { name: 'Marcus Aurelius', city: 'Rome', born: 121 },
  { name: 'Victor Glushkov', city: 'Rostov on Don', born: 1923 },
  { name: 'Ibn Arabi', city: 'Murcia', born: 1165 },
  { name: 'Mao Zedong', city: 'Shaoshan', born: 1893 },
  { name: 'Rene Descartes', city: 'La Haye en Touraine', born: 1596 },
];

// Metadata

const year = date => date.getFullYear();
const diff = y => year(new Date()) - year(new Date(y + ''));
const upper = s => s.toUpperCase();

const md = [
  ['name'],
  ['place', upper, 'city'],
  ['age', diff, 'born'],
];

// Usage

const pf = projection(md);
const data = persons.map(pf);

const renderer = render(md);
const res = renderer(data);
console.log('\n' + res + '\n');
