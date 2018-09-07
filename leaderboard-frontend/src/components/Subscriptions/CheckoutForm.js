// CheckoutForm.js
import React from 'react';
import {injectStripe} from 'react-stripe-elements';

// import AddressSection from './AddressSection';
import CardSection from './CardSection';
import {connect} from 'react-redux';
import {toggleSettings, activeOrganization} from '../../actions/organizationActions'
import {getAdminOrganizations} from '../../actions/adminActions'
import jwt from "jsonwebtoken";

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // getSnapshotBeforeUpdate = (nextProps) => {
  //   console.log(nextProps.stripeCustomerID)
  //   if(nextProps.stripeCustomerID !== null) {
  //     this.props.getSubscriptionInfo(nextProps.stripeCustomerID);
  //     this.props.toggleSettings(true)
  //
  //   }
  // }
  handleSubmit(ev) {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    // this.props.stripe.createToken({}).then(({token}) => {
    //   console.log('Received Stripe token:', token);

    this.props.stripe.createToken({}).then(({token}) => {
      console.log('Received Stripe token:', token);
      if (token) {
        fetch('http://localhost:4000/api/customer/create', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: token.id,
            id: this.props.activeOrganizationID
          })
        }).then((res) => res.json()).then((response) => {
          console.log('response', response)
          const id = jwt.decode(localStorage.token.split(" ")[1]).id;
          this.props.activeOrganization(this.props.activeOrganizationID, response.stripeCustomerID)
          this.props.getAdminOrganizations({ id });
          console.log('response customerID', response.stripeCustomerID)
          this.props.toggleSettings(true)
        })
      }

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
    activeOrganizationID: state.activeOrganization,
    stripeCustomerID: state.stripeCustomerID
  };
};

export default connect(mapStateToProps, {toggleSettings,activeOrganization, getAdminOrganizations})(injectStripe(CheckoutForm));
