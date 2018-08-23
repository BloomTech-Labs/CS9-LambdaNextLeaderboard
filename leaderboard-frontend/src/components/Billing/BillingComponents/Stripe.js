const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_live_tM1JZa3zHrGjRQyRAo04eLD3'
  : 'pk_test_vepX8zel8zaFKGN7encalvN7';

export default STRIPE_PUBLISHABLE;