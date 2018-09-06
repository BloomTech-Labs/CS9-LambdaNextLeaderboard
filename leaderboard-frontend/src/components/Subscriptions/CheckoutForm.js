// CheckoutForm.js
import React from "react";
import { injectStripe } from "react-stripe-elements";
// import axios from 'axios';

// import AddressSection from './AddressSection';
import CardSection from "./CardSection";
import { connect } from "react-redux";

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(ev) {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    // this.props.stripe.createToken({}).then(({token}) => {
    //   console.log('Received Stripe token:', token);

    this.props.stripe.createToken({}).then(({ token }) => {
      console.log("Received Stripe token:", token);
      fetch("http://localhost:4000/api/customer/create", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: token.id,
          id: this.props.activeOrganization
        })
      })
        .then(res => res.json())
        .then(response => {
          console.log("response", response);
          // TODO: set organization stripeCustomerId
        })
        .then(res => res.json())
        .then(response => {
          console.log("response", response);
        });
    });

    // However, this line of code will do the same thing:
    //
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});

    // You can also use createSource to create Sources. See our Sources
    // documentation for more: https://stripe.com/docs/stripe-js/reference#stripe-create-source
    //
    // this.props.stripe.createSource({type: 'card', name: 'Jenny Rosen'});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/*<AddressSection />*/}
        <CardSection />
        <button>Confirm order</button>
      </form>
    );
  }
}
const mapStateToProps = state => {
  return {
    activeOrganization: state.activeOrganization,
    stripeCustomerID: state.stripeCustomerID
  };
};

export default connect(
  mapStateToProps,
  {}
)(injectStripe(CheckoutForm));
