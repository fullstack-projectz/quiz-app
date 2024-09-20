/**
 * Here the file to connect with
 * the Database
 *
 * @author
 */
import mysql from 'mysql2/promise';

// Create a MySQL pool or connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'quiz_app',
});

export const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully');
    connection.release();
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

export default pool;
