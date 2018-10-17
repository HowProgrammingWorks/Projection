'use strict';

// Projection

const id = x => x;

const projection = meta => src => meta.reduce(
  (dest, [name, fn = id, field = name]) =>
    (dest[name] = fn(src[field]), dest), {}
);

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

const p1 = projection(md);
const data = persons.map(p1);
console.dir(data);
