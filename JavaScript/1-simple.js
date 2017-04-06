'use strict';

Function.prototype.curry = function(...args) {
  return this.bind(null, ...args);
};

const projection = (fields, obj) => (Object
  .keys(obj).filter(field => fields.includes(field))
  .reduce((hash, key) => (hash[key] = obj[key], hash), {})
);

const persons = [
  { name: 'Marcus Aurelius', city: 'Rome', born: 121 },
  { name: 'Victor Glushkov', city: 'Rostov on Don', born: 1923 },
  { name: 'Ibn Arabi', city: 'Murcia', born: 1165 },
  { name: 'Mao Zedong', city: 'Shaoshan', born: 1893 },
  { name: 'Rene Descartes', city: 'La Haye en Touraine', born: 1596 }
];

const p1 = projection.curry(['name', 'born']);
const p2 = projection.curry(['name']);

const data = persons.map(p2).map(p2);
console.dir(data);
