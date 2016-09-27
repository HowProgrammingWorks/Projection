Function.prototype.curry = function(...args) {
  return this.bind(null, ...args);
};

let projection = (fields, obj) => (Object
  .keys(obj).filter(field => fields.indexOf(field) >= 0)
  .reduce((hash, key) => (hash[key] = obj[key], hash), {})
);

let persons = [
  { name: 'Marcus Aurelius', city: 'Rome', born: 121 },
  { name: 'Victor Glushkov', city: 'Rostov on Don', born: 1923 },
  { name: 'Ibn Arabi', city: 'Murcia', born: 1165 },
  { name: 'Mao Zedong', city: 'Shaoshan', born: 1893 },
  { name: 'Rene Descartes', city: 'La Haye en Touraine', born: 1596 }
];

let p1 = projection.curry(['name', 'born']);
let p2 = projection.curry(['name']);

let data = persons.map(p1).map(p2);
console.dir(data);
