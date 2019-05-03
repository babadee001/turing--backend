import mysql from 'mysql';

const client = mysql.createConnection({
  multipleStatements: true,
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});
client.connect((error) => {
  if (error) throw error;
});
export default client;
