/* eslint-disable camelcase */
import validator from './customErrors';

export default {
  checkId(req, res, next) {
    const suppliedParams = Object.keys(req.params);
    if (suppliedParams[0] === 'department_id' && /[\D]/.test(req.params[suppliedParams])) {
      const error = {
        error: {
          status: 400,
          code: 'DEP_01',
          message: 'The ID is not a number',
          field: suppliedParams[0],
        },
      };
      return res.status(400).send(error);
    }
    if (!req.params[suppliedParams] || /[\D]/.test(req.params[suppliedParams])) {
      const error = {
        error: {
          status: 400,
          code: 'USR_02',
          message: `The field ${suppliedParams} is empty or invalid.`,
          field: suppliedParams[0],
        },
      };
      return res.status(400).send(error);
    }
    next();
  },
  validateQuery(req, res, next) {
    if (!req.query.all_words) {
      req.query.all_words = 'on';
    }
    if (!req.query.page) {
      req.query.page = 1;
    }
    if (!req.query.limit) {
      req.query.limit = 20;
    }
    if (!req.query.description_length) {
      req.query.description_length = 200;
    }
    req.checkQuery({
      page: {
        isInt: true,
        errorMessage: 'Enter a valid page number',
      },
      limit: {
        isInt: true,
        errorMessage: 'Enter a valid limit',
      },
      description_length: {
        isInt: true,
        errorMessage: 'Enter a valid description length',
      },
    });
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        const errorMessage = error.msg;
        allErrors.push(errorMessage);
      });
      return res.status(400)
        .json({
          message: allErrors[0],
        });
    }
    next();
  },
  validateString(req, res, next) {
    if (!req.query.all_words) {
      req.query.all_words = 'on';
    }
    req.checkQuery({
      query_string: {
        notEmpty: true,
        errorMessage: 'Enter a valid query string',
      },
      all_words: {
        notEmpty: true,
        isAlpha: true,
      },
    });
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        const errorMessage = error.msg;
        allErrors.push(errorMessage);
      });
      return res.status(400)
        .json({
          message: allErrors[0],
        });
    }
    next();
  },

  validateCustomer(req, res, next) {
    req.checkBody(
      {
        email: {
          isEmail: true,
          notEmpty: true,
          errorMessage: validator.customerErrors('USR_02', 'The email field is required with a valid email address.', '400', 'email'),
        },
        name: {
          notEmpty: true,
          isLength: {
            options: [{ min: 2 }],
            errorMessage: validator.customerErrors('USR_02', 'The name field is required with minimum of two characters.', '400', 'name'),
          },
          errorMessage: validator.customerErrors('USR_02', 'The name field is required.', '400', 'name'),
        },
        password: {
          notEmpty: true,
          isLength: {
            options: [{ min: 4 }],
            errorMessage: validator.customerErrors('USR_02', 'The password field is requuired to be a minimum of 4 characters.', '400', 'password'),
          },
          errorMessage: validator.customerErrors('USR_02', 'The password field is required.', '400', 'password'),
        },
      },
    );
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        const errorMessage = error.msg;
        allErrors.push(errorMessage);
      });
      return res.status(400)
        .json({
          message: allErrors[0],
        });
    }
    next();
  },

  validateCustomerEdit(req, res, next) {
    req.checkBody(
      {
        email: {
          isEmail: true,
          notEmpty: true,
          errorMessage: validator.customerErrors('USR_02', 'The email field is required with a valid email address.', '400', 'email'),
        },
        name: {
          notEmpty: true,
          isLength: {
            options: [{ min: 2 }],
            errorMessage: validator.customerErrors('USR_02', 'The name field is required with minimum of two characters.', '400', 'name'),
          },
          errorMessage: validator.customerErrors('USR_02', 'The name field is required.', '400', 'name'),
        },
      },
    );
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        const errorMessage = error.msg;
        allErrors.push(errorMessage);
      });
      return res.status(400)
        .json({
          message: allErrors[0],
        });
    }
    next();
  },
  validateLogin(req, res, next) {
    req.checkBody(
      {
        email: {
          isEmail: true,
          notEmpty: true,
          errorMessage: validator.customerErrors('USR_02', 'The email field is required with a valid email address.', '400', 'email'),
        },
        password: {
          notEmpty: true,
          isLength: {
            options: [{ min: 2 }],
            errorMessage: validator.customerErrors('USR_02', 'The password field is required with minimum of two characters.', '400', 'password'),
          },
          errorMessage: validator.customerErrors('USR_02', 'The password field is required.', '400', 'password'),
        },
      },
    );
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        const errorMessage = error.msg;
        allErrors.push(errorMessage);
      });
      return res.status(400)
        .json({
          message: allErrors[0],
        });
    }
    next();
  },
  validateAddress(req, res, next) {
    const requiredFields = ['address_1', 'city', 'region', 'postal_code', 'country', 'shipping_region_id'];
    const missingField = [];
    requiredFields.forEach((field) => {
      if (req.body[field] === undefined) {
        missingField.push(field);
      }
    });
    if (missingField.length !== 0) {
      return res.status(400).send(validator.customerErrors('USR_02', 'The field(s) are/is required.', '400', `${missingField}`));
    }
    next();
  },
  validateCreditCard(req, res, next) {
    if (req.body.credit_card === undefined) {
      return res.status(400).send(validator.customerErrors('USR_02', 'The field(s) are/is required.', '400', 'credit_card'));
    }
    req.checkBody({
      credit_card: {
        isCreditCard: true,
        errorMessage: validator.customerErrors('USR_08', 'this is an invalid Credit Card.', '400', 'credit_card'),
      },
    });
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        const errorMessage = error.msg;
        allErrors.push(errorMessage);
      });
      return res.status(400)
        .json({
          message: allErrors[0],
        });
    }
    next();
  },
  validateFacebookToken(req, res, next) {
    if (!req.body.access_token) {
      return res.status(400).send(validator.customerErrors('USR_02', 'The field access_token is empty.', '400', 'access_token'));
    }
    next();
  },
};
