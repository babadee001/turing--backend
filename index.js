import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import DepartmentRouter from './server/routes/departments';
import CategoriesRouter from './server/routes/categories';
import AttributesRouter from './server/routes/attributes';
import ProductRouter from './server/routes/products';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(validator());
app.use('/attributes', AttributesRouter);
app.use('/departments', DepartmentRouter);
app.use('/categories', CategoriesRouter);
app.use('/products', ProductRouter);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Welcome to tucommerce');
});

app.get('*', (req, res) => {
  res.status(404).send({
    message: 'Endpoint not found.',
  });
});

app.listen(port, () => {
  console.log('App listening on port', port);
});
