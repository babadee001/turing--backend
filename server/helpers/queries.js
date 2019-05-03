module.exports = {
  getAll(table) {
    return `SELECT * FROM turing.${table};`;
  },

  getOne(table, id) {
    return `SELECT * FROM turing.${table} WHERE department_id = ${id} LIMIT 1;`;
  },
};
