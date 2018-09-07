//________MODULES________
import React, { Component } from "react";
import Checkout from "./Checkout";
// import axios from 'axios';

//________STYLING________
import { Button, Modal, List, Container, Icon, Radio } from "semantic-ui-react";

//________BILLING________
class Billing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriptionType: "",
      subscriptionAmount: ""
    };
  }

  // setCharges is run by the radio buttons, and sets the values to be sent to checkout.
  setCharges = (e, { value }) => {
    const values = value.split(", ");

    this.setState({
      subscriptionType: values[0],
      subscriptionAmount: values[1]
    });
  };

  render() {
    return (
      <div className="APP__BILLING">
        <Container>
          <h2 className="APP__BILLING__TITLE">Billing</h2>

          {/* SUBSCRIPTION TYPE */}
          <div className="APP__BILLING__SUBTYPE">
            <List divided very relaxed>
              <List.Item as="a">
                <Icon name="right triangle" />
                <List.Content>
                  <List.Header>Free</List.Header>
                  <List.Description>1 Admin User</List.Description>
                  <List.Description>1 Class</List.Description>
                  <List.Description>Up to 50 Students</List.Description>
                </List.Content>
              </List.Item>
              <List.Item as="a">
                <Icon name="right triangle" />
                <List.Content>
                  <List.Header>Standard</List.Header>
                  <List.Description>5 Admin Users</List.Description>
                  <List.Description>10 Classes</List.Description>
                  <List.Description>Up to 500 Students</List.Description>
                  <List.Description>
                    {/* <input */}
                    <Radio
                      label="1 Year Subscription - $9.99"
                      type="radio"
                      value="1 Year Subscription, 9.99"
                      amount="9.99"
                      checked={
                        this.state.subscriptionType === "1 Year Subscription"
                      }
                      onChange={this.setCharges}
                    />
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item as="a">
                <Icon name="right triangle" />
                <List.Content>
                  <List.Header>Premium</List.Header>
                  <List.Description>Unlimited Admin Users</List.Description>
                  <List.Description>Unlimited Classes</List.Description>
                  <List.Description>Unlimited Students</List.Description>
                  <List.Description>
                    <Radio
                      label="1 Year Premium Subscription - $29.99"
                      type="radio"
                      value="1 Year Premium Subscription, 29.99"
                      checked={
                        this.state.subscriptionType ===
                        "1 Year Premium Subscription"
                      }
                      onChange={this.setCharges}
                    />
                  </List.Description>
                </List.Content>
              </List.Item>
            </List>
          </div>

          {/* MODAL - Calls Checkout from the stripe api. */}
          <Modal trigger={<Button>Buy</Button>}>
            <Modal.Header>Select a form of payment</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <p>
                  {this.state.subscriptionType} -{" "}
                  {this.state.subscriptionAmount}
                </p>
                <Checkout
                  name={"NextSteps"}
                  description={this.state.subscriptionType}
                  amount={parseInt(this.state.subscriptionAmount * 100, 10)}
                />
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </Container>
      </div>
    );
  }
}

//________EXPORT________
export default Billing;
