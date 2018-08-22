//________MODULES________
import React, { Component } from 'react';
import Checkout from './Checkout';

//________STYLING________
import './Billing.css'
import { Button, Modal } from "semantic-ui-react";

//________BILLING________
class Billing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subscriptionType: '',
            subscriptionAmount: '',
        };
    }


    // setCharges is run by the radio buttons, and sets the values to be sent to checkout.
    setCharges = (event) => {
        const values = event.target.value.split(', ');
        values[1] = values[1];

        this.setState({
            subscriptionType: values[0],
            subscriptionAmount: values[1]
        });
    };

    render() {
        return (
            <div className="APP__BILLING">
                <h2 className="APP__BILLING__TITLE">Billing</h2>

                {/* SUBSCRIPTION TYPE */}
                <div className="APP__BILLING__SUBTYPE">
                    <input type="radio" value="1 Year Subscription, 9.99" amount="9.99" checked={this.state.subscriptionType === "1 Year Subscription"} onChange={this.setCharges}/> 1 Year Subscription - $9.99<br/>
                    <input type="radio" value="1 Year Premium Subscription, 29.99" checked={this.state.subscriptionType === "1 Year Premium Subscription"} onChange={this.setCharges}/> 1 Year Premium Subscription - $29.99
                </div>
                
                {/* MODAL - Calls Checkout from the stripe api. */}
                <Modal trigger={<Button>Buy</Button>}>
                    <Modal.Header>Select a form of payment</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <p>{this.state.subscriptionType} - {this.state.subscriptionAmount}</p>
                            <Checkout name={"<APPLICATION NAME>"} description={this.state.subscriptionType} amount={parseInt(this.state.subscriptionAmount*100, 10)} />
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </div>
        );
    };
};
        
//________EXPORT________
export default Billing;