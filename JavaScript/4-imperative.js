'use strict';

// Projection

const projection = meta => {
  const keys = Object.keys(meta);
  return obj => {
    const hash = {};
    keys.forEach(key => {
      const def = meta[key];
      const [field, fn] = def;
      const val = obj[field];
      hash[key] = fn ? fn(val) : val;
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

const md = {
  name: ['name'],
  place: ['city', s => `<${s.toUpperCase()}>`],
  age: ['born', year => (
    new Date().getFullYear() -
    new Date(year + '').getFullYear()
  )]
};

// Usage

const p1 = projection(md);
const data = persons.map(p1);
console.dir(data);
