import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();
const client = mysql.createConnection({
  multipleStatements: true,
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});
client.connect((error) => {
  if (error) { console.log(error); }
});
export default client;
