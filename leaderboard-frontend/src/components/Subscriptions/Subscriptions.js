import React from 'react';
import {StripeProvider} from 'react-stripe-elements';
import MyStoreCheckout from './MyStoreCheckout';

const Subscriptions = () => {
    return (
        <StripeProvider apiKey='pk_test_wPrk3cSltJhH1yFL94jTizxg'>
            <MyStoreCheckout />
        </StripeProvider>
    );
};

export default Subscriptions;
