const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production'
  ? 'https://labs-next-leaderboard.herokuapp.com:4000/api/billing'
  : 'http://localhost:4000/api/billing';

export default PAYMENT_SERVER_URL;