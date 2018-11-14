'use strict';

// Projection

const id = x => x;

const projection = meta => src => meta.reduce(
  (dest, [name, fn = id, field = name]) =>
    (dest[name] = fn(src[field]), dest), {}
);

// Display

const max = items => Math.max(...items);
const maxProp = key => items => max(items.map(x => x[key]));
const maxLength = maxProp('length');
const col = (name, data) => data.map(obj => obj[name].toString());

const render = meta => src => {
  const keys = meta.map(([name]) => name);
  const maxWidth = keys.map(key => maxLength(col(key, src)));
  const dest = src.map(obj => maxWidth.map(
    (width, i) => obj[keys[i]].toString().padEnd(width + 4)
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
