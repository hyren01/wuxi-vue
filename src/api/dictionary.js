const databaseType = [
  'HIVE2', 'ES', 'ODPS', 'Hbase', 'MySql', 'GBase'
];

const databaseCharaterSet = [
  'UTF-8', 'GBK', 'DEFAULT'
];

const databaseLocation = [
  {
    location: '无锡',
    code: 'WX'
  },
  {
    location: '北京',
    code: 'BJ'
  }

];

// const databaseDriverMap = () => {
//   let map = new Map();
//   map.set('HIVE2', '');
//   map.set('ES', '');
//   map.set('ODPS', '');
//   map.set('Hbase', '');
//   map.set('MySql', 'com.mysql.jdbc.Driver');
//   map.set('GBase', '');
//   return map;
// };

export {
  databaseType,
  // databaseDriverMap,
  databaseCharaterSet,
  databaseLocation,
};