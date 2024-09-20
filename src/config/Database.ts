/**
 * Here the file to connect with
 * the Database
 *
 * @author
 */

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
// import { classicNameResolver } from 'typescript';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'todo_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
