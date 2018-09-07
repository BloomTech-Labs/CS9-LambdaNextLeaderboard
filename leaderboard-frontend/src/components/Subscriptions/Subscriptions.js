import React from 'react';
import {StripeProvider} from 'react-stripe-elements';
import MyStoreCheckout from './MyStoreCheckout';

const Subscriptions = () => {
    return (
        <StripeProvider apiKey={process.env.REACT_APP_API_KEY}>
            <MyStoreCheckout />
        </StripeProvider>
    );
};

export default Subscriptions;
