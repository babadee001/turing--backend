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
  validateBody(req, res, next) {
    const { b } = req;
    res.send();
    next();
  },
};
