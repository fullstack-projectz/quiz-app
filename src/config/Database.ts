/**
 * Here the file to connect with
 * the Database
 *
 * @author
 */

import mysql from 'mysql2';
// import { classicNameResolver } from 'typescript';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'todo_app',
});

connection.connect((err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log('DB is connected');
});
