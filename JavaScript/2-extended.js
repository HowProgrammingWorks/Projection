'use strict';

const curry = (fn, x) => (...args) => fn(x, ...args);

const persons = [
  { name: 'Marcus Aurelius', city: 'Rome', born: 121 },
  { name: 'Victor Glushkov', city: 'Rostov on Don', born: 1923 },
  { name: 'Ibn Arabi', city: 'Murcia', born: 1165 },
  { name: 'Mao Zedong', city: 'Shaoshan', born: 1893 },
  { name: 'Rene Descartes', city: 'La Haye en Touraine', born: 1596 }
];

const md = {
  name: ['name'],
  place: ['city', upper, s => '<' + s + '>'],
  age: ['born', age]
};

const projection = (meta, obj) => (
  Object.keys(meta).reduce((hash, key) => (
    hash[key] = meta[key].reduce(
      (val, fn, i) => (i === 0 ? obj[fn] : fn(val)), null
    ), hash
  ), {})
);

const p1 = curry(projection, md);
const data = persons.map(p1);
console.dir(data);

function upper(s) {
  return typeof(s) === 'string' ? s.toUpperCase() : '';
}

function age(year) {
  return new Date().getFullYear() - new Date(year + '').getFullYear();
}
