'use strict';

const curry = (fn, x) => (...args) => fn(x, ...args);

const projection = (fields, obj) => (
  Object.keys(obj)
    .filter(field => fields.includes(field))
    .reduce((hash, key) => (hash[key] = obj[key], hash), {})
);

// Dataset

const persons = [
  { name: 'Marcus Aurelius', city: 'Rome', born: 121 },
  { name: 'Victor Glushkov', city: 'Rostov on Don', born: 1923 },
  { name: 'Ibn Arabi', city: 'Murcia', born: 1165 },
  { name: 'Mao Zedong', city: 'Shaoshan', born: 1893 },
  { name: 'Rene Descartes', city: 'La Haye en Touraine', born: 1596 }
];

// Usage

const p1 = curry(projection, ['name', 'born']);
const p2 = curry(projection, ['name']);

const data = persons.map(p1).map(p2);
console.dir(data);
