'use strict';

// Projection

const transforms = {
  string: name => d => d[name],
  function: fn => d => fn(d),
  object: name => proj => d => {
    const data = d[name];
    if (!data) return data;
    return data.map(projection(proj));
  }
};

const projection = (metadata) => {
  const meta = {};
  let item, key, type, transform;
  for (item of metadata) {
    type = typeof(item);
    transform = transforms[type];
    if (type === 'string') key = item;
    if (type === 'object') transform = transform(key);
    meta[key] = transform(item);
  }
  const keys = Object.keys(meta);
  const mapper = obj => {
    const hash = {};
    let key, value, transform;
    for (key of keys) {
      transform = meta[key];
      value = transform(obj);
      if (value) hash[key] = value;
    }
    return hash;
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
    { name: 'Beijing', population: 21516000, country: 'China' },
  ] },
  { name: 'Mao Zedong', city: 'Shaoshan', born: 1893 },
  { name: 'Rene Descartes', city: 'La Haye en Touraine', born: 1596, places: [
    { name: 'Karachi', population: 14910352, country: 'Pakistan' },
    { name: 'Istanbul', population: 14160467, country: 'Turkey' },
    { name: 'Tianjin', population: 15200000, country: 'China' }
  ] }
];

// Metadata

const md = [
  'name',
  'places', [
    'address', d => (d.country.toUpperCase() + ', '+ d.name),
    'population'
  ],
  'place', d => '<' + d.city.toUpperCase() + '>',
  'born',
  'age', d => (
    new Date().getFullYear() -
    new Date(d.born + '').getFullYear()
  )
];

// Usage

const p = projection(md);
const data = persons.map(p);
console.dir(data, { depth: 10 });
