import express from 'express';
import validator from '../helpers/validator';
import CustomersController from '../controllers/customers';

const customersRouter = express.Router();

customersRouter.route('/customers').post(validator.validateCustomer, CustomersController.registerCustomers);
customersRouter.route('/customer').get(CustomersController.getCustomerById);
customersRouter.route('/customer').put(validator.validateCustomerEdit, CustomersController.updateCustomer);
customersRouter.route('/customers/login').post(validator.validateLogin, CustomersController.loginCustomer);
customersRouter.route('/customers/address').put(validator.validateAddress, CustomersController.updateAddress);
customersRouter.route('/customers/creditCard').put(validator.validateCreditCard, CustomersController.updateCreditCard);
customersRouter.route('/customers/facebook').post(validator.validateFacebookToken, CustomersController.facebookAuthenticate);

export default customersRouter;
