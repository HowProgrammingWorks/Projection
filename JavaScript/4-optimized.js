'use strict';

const persons = [
  { name: 'Marcus Aurelius', city: 'Rome', born: 121 },
  { name: 'Victor Glushkov', city: 'Rostov on Don', born: 1923 },
  { name: 'Ibn Arabi', city: 'Murcia', born: 1165 },
  { name: 'Mao Zedong', city: 'Shaoshan', born: 1893 },
  { name: 'Rene Descartes', city: 'La Haye en Touraine', born: 1596 }
];

const md = {
  name: ['name'],
  place: ['city', s => '<' + upper(s) + '>'],
  age: ['born', age]
};

function projection(meta) {
  const keys = Object.keys(meta);
  return obj => {
    const hash = {};
    let def, val;
    keys.forEach(key => {
      def = meta[key];
      val = obj[def[0]];
      if (def.length > 1) val = def[1](val);
      hash[key] = val;
    });
    return hash;
  };
}

const p1 = projection(md);
const data = persons.map(p1);
console.dir(data);

function capitalize(s) {
  return s.replace(/\w+/g, (word) =>
     word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
  );
}

function upper(s) {
  return typeof(s) === 'string' ? s.toUpperCase() : '';
}

function age(year) {
  return new Date().getFullYear() - new Date(year + '').getFullYear();
}

function inc(x) {
  return ++x;
}
