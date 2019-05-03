import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import DepartmentRouter from './server/routes/departments';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(validator());
app.use('/departments', DepartmentRouter);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Welcome to tucommerce');
});

app.listen(port, () => {
  console.log('App listening on port', port);
});
