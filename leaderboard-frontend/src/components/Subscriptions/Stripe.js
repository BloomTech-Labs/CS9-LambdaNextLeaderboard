const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? process.env.STRIPE_PK_LIVE
  : process.env.STRIPE_PK_TEST;

export default STRIPE_PUBLISHABLE;