import express from 'express';
import validator from '../helpers/validator';
import AttributesController from '../controllers/attributes';

const attributeRouter = express.Router();

attributeRouter.route('/').get(AttributesController.getAttributes);
attributeRouter.route('/:attribute_id').get(validator.checkId, AttributesController.getAttribute);
attributeRouter.route('/values/:attribute_id').get(validator.checkId, AttributesController.getValuesAttribute);
attributeRouter.route('/inProduct/:product_id').get(validator.checkId, AttributesController.getAttributesInProduct);

export default attributeRouter;
