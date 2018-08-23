const paymentApi = require('../../billing/payment');

const configureRoutes = app => {
  paymentApi(app);
};

module.exports = configureRoutes;