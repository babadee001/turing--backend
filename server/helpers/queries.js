module.exports = {
  getAll(table) {
    return `SELECT * FROM turing.${table};`;
  },

  getOneWhere(table, column, id) {
    return `SELECT category_id, name, description FROM turing.${table} WHERE ${column} = ${id};`;
  },

  getOne(table, id) {
    let column = table;
    if (table === 'product_category') {
      column = 'product';
    }
    return `SELECT * FROM turing.${table} WHERE ${column}_id = ${id} LIMIT 1;`;
  },
};
