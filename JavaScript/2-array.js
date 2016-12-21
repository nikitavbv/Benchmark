const COUNT = 10000000;
const RETRY = 3;

var tests = [
  filterObjects,
  filterArrays
];

// Define Data Source

var data1 = [
  { name: 'Marcus Aurelius', birth: new Date('212-04-26'), city: 'Rome' },
  { name: 'Victor Glushkov', birth: new Date('1923-08-24'), city: 'Rostov on Don' },
  { name: 'Ibn Arabi', birth: new Date('1165-11-16'), city: 'Murcia' },
  { name: 'Mao Zedong', birth: new Date('1893-12-26'), city: 'Shaoshan' },
  { name: 'Rene Descartes', birth: new Date('1596-03-31'), city: 'La Haye en Touraine' }
];

let data2 = [
  ['Marcus Aurelius','212-04-26','Rome'],
  ['Victor Glushkov','1923-08-24','Rostov on Don'],
  ['Ibn Arabi','1165-11-16','Murcia'],
  ['Mao Zedong','1893-12-26','Shaoshan'],
  ['Rene Descartes','1596-03-31','La Haye en Touraine']
];

let metadata = {
  name: 'string',
  birth: 'Date',
  city: 'string',
  age: function() {
    let difference = new Date() - this.birth;
    return Math.floor(difference / 31536000000);
  }
};

function Person() {}

let index = 0;
for (let name in metadata) {
  buildGetter(Person.prototype, name, metadata[name], index++);
}

function buildGetter(proto, fieldName, fieldType, fieldIndex) {
  if (fieldType === 'Date') {
    Object.defineProperty(proto, fieldName, {
      get: function() {
        return new Date(this[fieldIndex]);
      }
    });
  } else if (typeof(fieldType) === 'function') {
    Object.defineProperty(proto, fieldName, { get: fieldType });
  } else {
    Object.defineProperty(proto, fieldName, {
      get: function() {
        return this[fieldIndex];
      }
    });
  }
}

let query = (person) => (
  person.name !== '' &&
  person.age > 18 &&
  person.city === 'Rome'
);

for (let k = 0; k < RETRY; k++) {
  //tests.sort(function() {
  //  return Math.random() - 0.5;
  //});
  tests.map(test);
  console.log('---');
}

function test(fn) {
  console.time(fn.name);
  let a = [];
  for (let i = 0; i < COUNT; i++) {
    a.push(fn());
  }
  fn();
  console.timeEnd(fn.name);
}


data2.forEach(person => person.__proto__ = Person.prototype);

let res = data.filter(query);
console.dir(res);




