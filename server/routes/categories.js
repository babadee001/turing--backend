import express from 'express';
import validator from '../helpers/validator';
import CategoriesController from '../controllers/categories';

const categoryRouter = express.Router();

categoryRouter.route('/').get(CategoriesController.getCategories);
categoryRouter.route('/:category_id').get(validator.checkId, CategoriesController.getCategory);
categoryRouter.route('/inProduct/:product_id').get(validator.checkId, CategoriesController.getCategoryInProduct);
categoryRouter.route('/inDepartment/:department_id').get(validator.checkId, CategoriesController.getCategoryInDepartment);


export default categoryRouter;
