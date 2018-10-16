'use strict';

// Projection

const projection = meta => {
  const keys = Object.keys(meta);
  const mapper = obj => {
    const hash = {};
    for (const key of keys) {
      const def = meta[key];
      const [name, fn] = def;
      let val = obj[name];
      if (val) {
        if (fn) val = fn(val);
        hash[key] = val;
      }
    }
    return hash;
  };
  mapper.join = (key, projection) => {
    keys.push(key);
    meta[key] = [key, val => val.map(projection)];
    return mapper;
  };
  return mapper;
};

// Dataset

const persons = [
  { name: 'Marcus Aurelius', city: 'Rome', born: 121, places: [
    { name: 'Shanghai', population: 24256800, country: 'China' },
    { name: 'Beijing', population: 21516000, country: 'China' },
    { name: 'Delhi', population: 16787941, country: 'India' }
  ] },
  { name: 'Victor Glushkov', city: 'Rostov on Don', born: 1923, places: [
    { name: 'Lagos', population: 16060303, country: 'Nigeria' },
    { name: 'Delhi', population: 16787941, country: 'India' },
    { name: 'Tianjin', population: 15200000, country: 'China' }
  ] },
  { name: 'Ibn Arabi', city: 'Murcia', born: 1165, places: [
    { name: 'Beijing' }
  ] },
  { name: 'Mao Zedong', city: 'Shaoshan', born: 1893 },
  { name: 'Rene Descartes', city: 'La Haye en Touraine', born: 1596, places: [
    { name: 'Karachi', population: 14910352, country: 'Pakistan' },
    { name: 'Istanbul', population: 14160467, country: 'Turkey' },
    { name: 'Tianjin', population: 15200000, country: 'China' }
  ] },
];

// Metadata

const md1 = {
  name: ['name'],
  place: ['city', s => `<${s.toUpperCase()}>`],
  born: ['born'],
  age: ['born', year => (
    new Date().getFullYear() -
    new Date(year + '').getFullYear()
  )]
};

const md2 = {
  address: ['name', s => s.toUpperCase()],
  population: ['population']
};

// Usage

const p1 = projection(md1);
const p2 = projection(md2);
const p3 = p1.join('places', p2);
const data = persons.map(p3);
console.dir(data, { depth: 10 });
