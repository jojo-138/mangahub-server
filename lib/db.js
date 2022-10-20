const mysql = require('mysql2/promise');
const config = require('../config');

const query = async(sql, params) => {
  const connection = await mysql.createConnection(config);
  const [ result,  ] = await connection.execute(sql, params);
  return result;
};

const transaction = async(tryCatch, obj) => {
  const connection = await mysql.createConnection(config);
  await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
  await connection.beginTransaction();
  return tryCatch(obj, connection);
}

module.exports = { query, transaction };