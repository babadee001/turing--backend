/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import passport from 'passport';
import db from '../database/db';
import queries from '../helpers/queries';
import validate from '../helpers/customErrors';
import { generate, isLoggedIn } from '../helpers/generateToken';

class Customers {
  static registerCustomers(req, res) {
    const {
      name, email, password,
    } = req.body;
    const queryPayload = `"${name}","${email}","${password}"`;
    db.query(queries.getProcedure('customer_add', queryPayload), (error, results) => {
      if (error) {
        if (error.errno === 1062) {
          return res.status(409).send(validate.customerErrors('USR_04', 'The email already exists', '409', 'Email'));
        }
        if (error.errno === 1062 && req.body.facebook) {
          return Customers.loginCustomer(req, res);
        }
        throw error;
      }
      const tokenPayload = {
        customer_id: results[0][0].id,
        name,
        email,
        role: 'customer',
      };
      const token = generate(tokenPayload);
      return res.status(201).send({
        customer: tokenPayload,
        accessToken: token,
        expiresIn: '24h',
      });
    });
  }

  static getCustomerById(req, res) {
    const verifyToken = isLoggedIn(req.headers['user-key']);
    if (!req.headers['user-key'] || !verifyToken || verifyToken.error) {
      return res.status(401).send(validate.customerErrors('AUT_02', 'Access Unauthorized', '401', 'NoAuth'));
    }
    db.query(queries.getProcedure('customer_get_customer', verifyToken), (error, results) => {
      if (error) {
        throw error;
      }
      return res.status(200).send(
        results[0][0],
      );
    });
  }

  static updateCustomer(req, res) {
    const verifyToken = isLoggedIn(req.headers['user-key']);
    if (!req.headers['user-key'] || !verifyToken || verifyToken.error) {
      return res.status(401).send(validate.customerErrors('AUT_02', 'Access Unauthorized', '401', 'NoAuth'));
    }
    db.query(queries.getProcedure('customer_get_customer', verifyToken), (error, results) => {
      if (error) {
        throw error;
      }
      const { name, email } = req.body;
      const password = req.body.password || results[0][0].password;
      const dayPhone = req.body.day_phone || results[0][0].day_phone;
      const evePhone = req.body.eve_phone || results[0][0].eve_phone;
      const mobPhone = req.body.mob_phone || results[0][0].mob_phone;
      const updateData = `${results[0][0].customer_id},"${name}","${email}","${password}","${dayPhone}","${evePhone}","${mobPhone}"`;
      db.query(queries.getProcedure('customer_update_account', updateData), (err) => {
        if (err) {
          throw err;
        }
        const stripCreditCard = `${'*'.repeat(results[0][0].credit_card.length - 4)}${results[0][0].credit_card.substr(results[0][0].credit_card.length - 4)}`;
        const returnedData = {
          customer_id: results[0][0].customer_id,
          name,
          email,
          address_1: results[0][0].address_1,
          address_2: results[0][0].address_2,
          city: results[0][0].city,
          region: results[0][0].region,
          postal_code: results[0][0].postal_code,
          country: results[0][0].country,
          credit_card: stripCreditCard,
          shipping_region_id: results[0][0].shipping_region_id,
          day_phone: dayPhone,
          eve_phone: evePhone,
          mob_phone: mobPhone,
        };
        return res.status(200).send(returnedData);
      });
    });
  }

  static loginCustomer(req, res) {
    const { email, password } = req.body;
    db.query(queries.getProcedure('customer_get_login_info', `"${email}"`), (error, results) => {
      if (error) {
        throw error;
      }
      if (results[0].length === 0) {
        return res.status(404).send(validate.customerErrors('USR_05', 'The email doesnt exist ', '404', 'email'));
      }
      db.query(queries.getProcedure('customer_get_customer', results[0][0].customer_id), (err, result) => {
        if (err) {
          throw err;
        }
        if (results[0][0].password !== password) {
          return res.status(400).send(validate.customerErrors('USR_01', 'Email or Password is invalid.', '404', 'password'));
        }
        const token = generate(result[0][0]);
        const response = { schema: result[0][0] };
        const responseData = req.body.facebook ? response : result[0][0];
        return res.status(200).send({
          customer: responseData,
          token,
          expiresIn: '24h',
        });
      });
    });
  }

  static updateAddress(req, res) {
    const verifyToken = isLoggedIn(req.headers['user-key']);
    if (!req.headers['user-key'] || !verifyToken || verifyToken.error) {
      return res.status(401).send(validate.customerErrors('AUT_02', 'Access Unauthorized', '401', 'NoAuth'));
    }
    db.query(queries.getProcedure('customer_get_customer', verifyToken), (error, results) => {
      if (error) {
        throw error;
      }
      const {
        address_1, city, region, postal_code, country, shipping_region_id,
      } = req.body;
      const address_2 = req.body.address_2 || results[0][0].address_2;
      const updateData = `${verifyToken},"${address_1}","${address_2}","${city}","${region}","${postal_code}","${country}",${shipping_region_id}`;
      db.query(queries.getProcedure('customer_update_address', updateData), (err) => {
        if (err) {
          throw err;
        }
        const stripCreditCard = `${'*'.repeat(results[0][0].credit_card.length - 4)}${results[0][0].credit_card.substr(results[0][0].credit_card.length - 4)}`;
        const returnedData = {
          customer_id: results[0][0].customer_id,
          name: results[0][0].name,
          email: results[0][0].email,
          address_1,
          address_2,
          city,
          region,
          postal_code,
          country,
          credit_card: stripCreditCard,
          shipping_region_id,
          day_phone: results[0][0].day_phone,
          eve_phone: results[0][0].eve_phone,
          mob_phone: results[0][0].mob_phone,
        };
        return res.status(200).send(returnedData);
      });
    });
  }

  static updateCreditCard(req, res) {
    const verifyToken = isLoggedIn(req.headers['user-key']);
    if (!req.headers['user-key'] || !verifyToken || verifyToken.error) {
      return res.status(401).send(validate.customerErrors('AUT_02', 'Access Unauthorized', '401', 'NoAuth'));
    }
    db.query(queries.getProcedure('customer_get_customer', verifyToken), (error, results) => {
      if (error) {
        throw error;
      }
      const { credit_card } = req.body;
      const updateData = `${verifyToken},"${credit_card}"`;
      db.query(queries.getProcedure('customer_update_credit_card', updateData), (err) => {
        if (err) {
          throw err;
        }
        const stripCreditCard = `${'*'.repeat(credit_card.length - 4)}${credit_card.substr(credit_card.length - 4)}`;
        const returnedData = {
          customer_id: results[0][0].customer_id,
          name: results[0][0].name,
          email: results[0][0].email,
          address_1: results[0][0].address_1,
          address_2: results[0][0].address_2,
          city: results[0][0].city,
          region: results[0][0].region,
          postal_code: results[0][0].postal_code,
          country: results[0][0].country,
          credit_card: stripCreditCard,
          shipping_region_id: results[0][0].shipping_region_id,
          day_phone: results[0][0].day_phone,
          eve_phone: results[0][0].eve_phone,
          mob_phone: results[0][0].mob_phone,
        };
        return res.status(200).send(returnedData);
      });
    });
  }

  static facebookAuthenticate(req, res) {
    passport.authenticate('facebook-token', (err, user) => {
      if (err) {
        if (err.oauthError) {
          const oauthError = JSON.parse(err.oauthError.data);
          return res.status(401).send(validate.customerErrors('USR_01', `${oauthError.error.message}`, '400', 'access_token'));
        }
        return res.status(400).send(err);
      }
      req.body.name = user._json.first_name,
      req.body.password = user._json.id;
      req.body.facebook = true;
      let email = user.emails[0].value;
      if (!user.emails[0].value || user.emails[0].value.length === 0) {
        email = `${user._json.last_name}.${user._json.id}@facebookuser.com`;
      }
      req.body.email = email;
      db.query(queries.getProcedure('customer_get_login_info', `"${email}"`), (error, results) => {
        if (error) {
          throw error;
        } else if (results[0].length === 0) {
          return Customers.registerCustomers(req, res);
        }
        return Customers.loginCustomer(req, res);
      });
    })(req, res);
  }
}
export default Customers;
