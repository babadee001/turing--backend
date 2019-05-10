module.exports = {
  noExist(table) {
    let code;
    const abbreviations = {
      department: 'DEP',
      category: 'CAT',
      product: 'PRO',
      attribute: 'ATT',
      customer: 'CUS',
    };
    if (table in abbreviations) {
      code = (abbreviations[table]);
    }
    const error = {
      error: {
        status: 400,
        code: `${code}_02`,
        message: `Dont exist ${table} with this ID.`,
        field: `${table}_id`,
      },
    };
    return error;
  },

  customerErrors(code, message, status, field) {
    const error = {
      error: {
        status: `${status}`,
        code: `${code}`,
        message: `${message}`,
        field: `${field}`,
      },
    };
    return error;
  },

};
