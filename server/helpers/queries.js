module.exports = {
  getAllProducts(table, limit, page, descriptionLength) {
    return `SELECT ${table}_id, name, price, discounted_price, image, image_2, thumbnail, display, SUBSTRING(description, 1, ${descriptionLength}) FROM turing.${table} WHERE ${table}_id >= ${page} ORDER BY ${table}_id LIMIT ${limit};`;
  },
  getAll(table) {
    return `SELECT * FROM turing.${table};`;
  },

  getOneWhere(table, column, id, queries) {
    if (!queries) {
      queries = '*';
    }
    return `SELECT ${queries} FROM turing.${table} WHERE ${column} = ${id};`;
  },

  getOne(table, param, paramValue) {
    return `SELECT * FROM turing.${table} WHERE ${param} = ${paramValue} LIMIT 1;`;
  },

  getProcedure(procedure, param) {
    if (!param) {
      return `CALL ${procedure}()`;
    }
    return `CALL ${procedure}(${param})`;
  },
  count(table) {
    return `SELECT COUNT(*) AS total FROM turing.${table} ORDER BY ${table}_id`;
  },
};
