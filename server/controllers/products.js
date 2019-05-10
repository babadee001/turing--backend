/* eslint-disable camelcase */
import db from '../database/db';
import queries from '../helpers/queries';
import validate from '../helpers/customErrors';

class Products {
  static getProducts(req, res) {
    const { page, description_length, limit } = req.query;
    const offset = ((page * limit) - limit);
    const totalParam = `${description_length},${limit},${offset}`;
    db.query(queries.getProcedure('catalog_count_products_on_catalog'), (error, result) => {
      if (error) {
        throw error;
      }
      const totalCount = result[0][0].products_on_catalog_count;
      db.query(queries.getProcedure('catalog_get_products_on_catalog', totalParam), (err, results) => {
        if (error) {
          throw error;
        }
        return res.status(200).send({
          count: totalCount,
          rows: results[0],
        });
      });
    });
  }

  static searchProducts(req, res) {
    const {
      page, description_length, all_words, limit, query_string,
    } = req.query;
    const offset = ((page * limit) - limit);
    const totalParam = `"${query_string}",'${all_words}',${description_length},${limit},${offset}`;
    db.query(queries.getProcedure('catalog_search', totalParam), (error, results) => {
      if (error) {
        throw error;
      }
      return res.status(200).send({
        count: results[0].length,
        rows: results[0],
      });
    });
  }

  static getById(req, res) {
    db.query(queries.getProcedure('catalog_get_product_info', req.params.product_id), (error, results) => {
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

  static getByDetails(req, res) {
    db.query(queries.getProcedure('catalog_get_product_details', req.params.product_id), (error, results) => {
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

  static getByLocations(req, res) {
    db.query(queries.getProcedure('catalog_get_product_locations', req.params.product_id), (error, results) => {
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

  static getByReviews(req, res) {
    db.query(queries.getProcedure('catalog_get_product_reviews', req.params.product_id), (error, results) => {
      if (error) {
        throw error;
      }
      if (results.length === 0) {
        return res.status(400).send(
          validate.noExist('product'),
        );
      }
      return res.status(200).send(results);
    });
  }

  static postReviews(req, res) {
    const { review, rating, customer_id } = req.body;
    const { product_id } = req.params;
    const requiredPayload = `${customer_id},${product_id},"${review}",${rating}`;
    db.query(queries.getProcedure('catalog_create_product_review', requiredPayload), (error, results) => {
      if (error) {
        throw error;
      }
      return res.status(201).send(results);
    });
  }

  static getInCategory(req, res) {
    const { page, description_length, limit } = req.query;
    const offset = ((page * limit) - limit);
    const totalParam = `${req.params.category_id},${description_length},${limit},${offset}`;
    db.query(queries.getProcedure('catalog_get_products_in_category', totalParam), (error, results) => {
      if (error) {
        throw error;
      }
      return res.status(200).send({
        count: results[0].length,
        rows: results[0],
      });
    });
  }

  static getInDepartment(req, res) {
    const { page, description_length, limit } = req.query;
    const offset = ((page * limit) - limit);
    const totalParam = `${req.params.department_id},${description_length},${limit},${offset}`;
    db.query(queries.getProcedure('catalog_get_products_on_department', totalParam), (error, results) => {
      if (error) {
        throw error;
      }
      return res.status(200).send({
        count: results[0].length,
        rows: results[0],
      });
    });
  }
}
export default Products;
