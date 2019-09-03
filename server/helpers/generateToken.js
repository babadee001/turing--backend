import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export const generate = (customer) => {
  const token = jwt.sign(
    { customer }, process.env.secret, { expiresIn: '24h' },
  );
  return `Bearer ${token}`;
};
export const isLoggedIn = (token) => {
  const err = {
    error: {
      status: 401,
      code: 'AUT_02',
      message: 'Access Unauthorized',
      field: 'NoAuth',
    },
  };
  if (!token) {
    return err;
  }
  let customerId;
  if (!token.startsWith('Bearer ')) {
    return err;
  }
  const sliceToken = token.slice(7, token.length).trimLeft();
  const decoded = jwt.decode(sliceToken);
  jwt.verify(sliceToken, process.env.secret, (error) => {
    if (error) {
      return (err);
    }
    customerId = decoded.customer.customer_id;
  });
  return customerId;
};
