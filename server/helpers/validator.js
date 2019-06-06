import { check } from 'express-validator/check';

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
};
