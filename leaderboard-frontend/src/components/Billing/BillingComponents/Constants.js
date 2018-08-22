const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production'
  ? 'https://labs-next-leaderboard.herokuapp.com'
  : 'http://localhost:3000';

export default PAYMENT_SERVER_URL;