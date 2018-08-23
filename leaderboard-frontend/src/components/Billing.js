//________MODULES________
import React, { Component } from 'react'

//________STYLING________
import './Billing.css'


//________BILLING________
class Billing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ccnum1: '',
            ccnum2: '',
            ccnum3: '',
            ccnum4: '',
            ccexp: '',
            cvv: '',
            subType: '',
            sent: false
        };
    }

    handleInput = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };
    handleSubmit = () => {
        // TODO: API Code to send/rcv Stripe communications
        this.setState({ sent: true });
        this.setState({ ccnum1: '', ccnum2: '', ccnum3: '', ccnum4: '', ccexp: '', cvv: '', subType: '' });
      };

    render() {
        return (
            <div className="APP__BILLING">
                <h2 className="APP__BILLING__TITLE">Billing</h2>
                <div className="APP__BILLING__PAYMENTINFOBOX">
                    <p>Payment info</p>
                    {/* CREDIT CARD NUMBER */}
                    <div className="APP__BILLING__CCNUM">
                        <input
                            type="text"
                            placeholder="CC#"
                            name="ccnum1"
                            maxlength="4"
                            required="True"
                            value={this.state.ccnum1}
                            onChange={this.handleInput}
                            className="APP__BILLING__CCNUM1"
                        />
                        <input
                            type="text"
                            name="ccnum2"
                            maxlength="4"
                            required="True"
                            value={this.state.ccnum2}
                            onChange={this.handleInput}
                            className="APP__BILLING__CCNUM2"
                        />
                        <input
                            type="text"
                            name="ccnum3"
                            maxlength="4"
                            required="True"
                            value={this.state.ccnum3}
                            onChange={this.handleInput}
                            className="APP__BILLING__CCNUM3"
                        />
                        <input
                            type="text"
                            name="ccnum4"
                            maxlength="4"
                            required="True"
                            value={this.state.ccnum4}
                            onChange={this.handleInput}
                            className="APP__BILLING__CCNUM4"
                        />
                    </div>
                    {/* EXPIRATION DATE */}
                    <input
                        type="month"
                        placeholder="EXP"
                        name="ccexp"
                        required="True"
                        value={this.state.ccexp}
                        onChange={this.handleInput}
                        className="APP__BILLING__CCEXP"
                    />
                    {/* CVV SECURITY NUMBER */}
                    <input
                        type="text"
                        placeholder="CVV"
                        name="cvv"
                        maxlength="3"
                        required="True"
                        value={this.state.cvv}
                        onChange={this.handleInput}
                        className="APP__BILLING__CVV"
                    />
                </div>

                {/* SUBSCRIPTION TYPE */}
                <div className="APP__BILLING__SUBTYPE">
                    <input type="radio" name="subType" value="standard"/> 1 Year Subscription - $9.99<br/>
                    <input type="radio" name="subType" value="premium"/> 1 Year Premium Subscription - $29.99
                </div>
                {/* SUBMIT */}
                <button onClick={this.handleSubmit} className="APP__BILLING_BUTTON">Buy Now</button>
            </div>
        );
    };
};
        
//________EXPORT________
export default Billing;