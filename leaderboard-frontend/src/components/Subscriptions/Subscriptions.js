import React from 'react';
import {StripeProvider} from 'react-stripe-elements';
import MyStoreCheckout from './MyStoreCheckout';

const Subscriptions = () => {
    return (
        <StripeProvider apiKey='pk_test_Fie4DdiXkLIkoZSul4CsqlYo'>
            <MyStoreCheckout />
        </StripeProvider>
    );
};

export default Subscriptions;