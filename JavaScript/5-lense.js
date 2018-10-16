'use strict';

// Lens

const view = (lens, obj) => lens.get(obj);

const lens = (source, destination = source) => ({
  get: obj => obj[source],
  set: (val, obj) => ({ ...obj, [destination]: val })
});

const id = x => x;

const field = (name, map = id) => obj => map(view(lens(name), obj));

// Projection

const projection = meta => {
  const keys = Object.keys(meta);
  return obj => {
    const hash = {};
    keys.forEach(key => {
      const field = meta[key];
      hash[key] = field(obj);
    });
    return hash;
  };
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

const age = year =>
  new Date().getFullYear() -
  new Date(year + '').getFullYear();

const upper = s => s.toUpperCase();

const md = {
  name: field('name'),
  place: field('city', upper),
  age: field('born', age)
};

// Usage

const p1 = projection(md);
const data = persons.map(p1);
console.dir(data);
