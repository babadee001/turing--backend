import express from 'express';
import validator from '../helpers/validator';
import ProductsController from '../controllers/products';

const productRouter = express.Router();

productRouter.route('/').get(validator.validateQuery, ProductsController.getProducts);
productRouter.route('/search').get(validator.validateQuery, validator.validateString, ProductsController.searchProducts);
productRouter.route('/:product_id').get(validator.checkId, ProductsController.getById);
productRouter.route('/:product_id/details').get(validator.checkId, ProductsController.getByDetails);
productRouter.route('/:product_id/locations').get(validator.checkId, ProductsController.getByLocations);
productRouter.route('/:product_id/reviews').get(validator.checkId, ProductsController.getByReviews);
productRouter.route('/:product_id/reviews').post(ProductsController.postReviews);
productRouter.route('/inCategory/:category_id').get(validator.validateQuery, validator.checkId, ProductsController.getInCategory);
productRouter.route('/inDepartment/:department_id').get(validator.validateQuery, validator.checkId, ProductsController.getInDepartment);
export default productRouter;
