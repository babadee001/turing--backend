import mysql from 'mysql';
import dotenv from 'dotenv';
import initQuery from './initTables';

dotenv.config();
const pool = mysql.createPool({
  multipleStatements: true,
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});
const initTables = () => {
  pool.query(initQuery, (error) => {
    if (error) throw error;
    console.log('Tables created');
  });
};
initTables();
export default pool;
