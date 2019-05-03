export default {
  validateId(req, res, next) {
    req.checkParams({
      id: {
        notEmpty: true,
        isInt: true,
        errorMessage: {
          error: {
            status: 400,
            code: 'DEP_01',
            message: 'The ID is not a number.',
            field: 'department_id',
          },
        },
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
        .send(
          allErrors[0],
        );
    }
    next();
  },
  validateBody(req, res, next) {
    const { b } = req;
    res.send();
    next();
  },
};
