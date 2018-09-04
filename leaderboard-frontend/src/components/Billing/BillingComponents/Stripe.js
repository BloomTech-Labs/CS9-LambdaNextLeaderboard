const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_live_DWMFimYZmOPT6DeB9mozkW8z'
  : 'pk_test_Fie4DdiXkLIkoZSul4CsqlYo';

export default STRIPE_PUBLISHABLE;