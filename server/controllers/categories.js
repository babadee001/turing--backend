import db from '../database/db';
import queries from '../helpers/queries';
import validate from '../helpers/customErrors';

class Categories {
  static getCategories(req, res) {
    db.query(queries.getAll('category'), (error, results) => {
      if (error) {
        throw error;
      }
      return res.status(200).json({
        count: results.length,
        rows: results,
      });
    });
  }

  static getCategory(req, res) {
    db.query(queries.getOne('category', req.params.category_id), (error, results) => {
      if (error) {
        throw error;
      }
      if (results.length === 0) {
        return res.status(400).send(
          validate('category'),
        );
      }
      return res.status(200).send(results);
    });
  }

  static getCategoryInProduct(req, res) {
    db.query(queries.getOne('product_category', req.params.product_id), (error, results) => {
      if (error) {
        throw error;
      }
      if (results.length === 0) {
        return res.status(400).send(
          validate('product'),
        );
      }
      db.query(queries.getOne('category', results[0].category_id), (err, result) => {
        if (error) {
          throw err;
        } return res.status(200).send([{
          category_id: result[0].category_id,
          department_id: result[0].department_id,
          name: result[0].name,
        }]);
      });
    });
  }

  static getCategoryInDepartment(req, res) {
    db.query(queries.getOneWhere('category', 'department_id', req.params.department_id), (error, results) => {
      if (error) {
        throw error;
      }
      if (results.length === 0) {
        return res.status(400).send(
          validate('department'),
        );
      }
      return res.status(200).send(results);
    });
  }
}
export default Categories;
