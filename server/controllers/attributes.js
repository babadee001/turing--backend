import db from '../database/db';
import queries from '../helpers/queries';
import validate from '../helpers/customErrors';

class Attributes {
  static getAttributes(req, res) {
    db.query(queries.getProcedure('catalog_get_attributes'), (error, results) => {
      if (error) {
        throw error;
      }
      return res.status(200).send(
        results[0],
      );
    });
  }

  static getAttribute(req, res) {
    db.query(queries.getOne('attribute', 'attribute_id', req.params.attribute_id), (error, results) => {
      if (error) {
        throw error;
      }
      if (results.length === 0) {
        return res.status(400).send(
          validate.noExist('attribute'),
        );
      }
      return res.status(200).send(results);
    });
  }

  static getValuesAttribute(req, res) {
    db.query(queries.getProcedure('catalog_get_attribute_values', req.params.attribute_id), (error, results) => {
      if (error) {
        throw error;
      }
      if (results[0].length === 0) {
        return res.status(400).send(
          validate.noExist('attribute'),
        );
      }
      return res.status(200).send(results[0]);
    });
  }

  static getAttributesInProduct(req, res) {
    db.query(queries.getProcedure('catalog_get_product_attributes', req.params.product_id), (error, results) => {
      if (error) {
        throw error;
      }
      if (results[0].length === 0) {
        return res.status(400).send(
          validate.noExist('product'),
        );
      }
      return res.status(200).send(results[0]);
    });
  }
}
export default Attributes;
