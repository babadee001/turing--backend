import express from 'express';
import validator from '../helpers/validator';
import DepartmentsController from '../controllers/departments';

const router = express.Router();

router.route('/').get(DepartmentsController.getDepartments);
router.route('/:department_id').get(validator.checkId, DepartmentsController.getDepartment);

export default router;
