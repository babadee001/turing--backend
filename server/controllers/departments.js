import db from '../database/db';
import queries from '../helpers/queries';
import validate from '../helpers/customErrors';

class Departments {
  static getDepartments(req, res) {
    db.query(queries.getAll('department'), (error, results) => {
      if (error) {
        throw error;
      }
      return res.status(200).send(
        results,
      );
    });
  }

  static getDepartment(req, res) {
    db.query(queries.getOne('department', 'department_id', req.params.department_id), (error, results) => {
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
export default Departments;
