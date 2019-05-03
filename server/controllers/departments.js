import db from '../database/db';
import queries from '../helpers/queries';

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
    db.query(queries.getOne('department', req.params.id), (error, results) => {
      if (error) {
        throw error;
      }
      if (results.length === 0) {
        return res.status(400).send({
          error: {
            status: 400,
            code: 'DEP_02',
            message: 'Dont exist department with this ID.',
            field: 'department_id',
          },
        });
      }
      return res.status(200).send(results);
    });
  }
}
export default Departments;
