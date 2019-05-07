module.exports = {
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
};
