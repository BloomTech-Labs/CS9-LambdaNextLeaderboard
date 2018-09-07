import React, { Component } from "react";
import {
  Segment,
  Card,
  List,
  Button,
  Modal,
  Form,
  Header
} from "semantic-ui-react";
import axios from "axios";
import SUBSCRIPTION from "../Subscriptions/Subscriptions";
// import CUSTOMERINFO from '../Subscriptions/CustomerInfo';
import {connect} from 'react-redux'
import {toggleSettings, cancelSubscription, getSubscriptionInfo} from '../../actions/organizationActions'
import Sub2 from "../Sub2/Sub2";

class OrganizationView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openEditModal: false,
      openConfirm: false,
      confirmationInput: ""
    };
  }

  openEditModal = () => {
    // this.props.toggleSettings(true)
    this.setState({ openEditModal: true });
  };

  closeEditModal = () => {
    this.setState({ openEditModal: false });
  };

  openConfirm = () => {
    this.setState({ openConfirm: true });
  };

  closeConfirm = () => {
    this.setState({ openConfirm: false });
  };

  handleInput = (e, { value }) => {
    this.setState({ confirmationInput: value });
  };

  handleDelete = () => {
    this.setState({
      openEditModal: false,
      openConfirm: false,
      confirmationInput: ""
    });
    this.props.delete({ id: this.props.id });
  };

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.toggle === true) {
      this.setState({openEditModal: false})
      this.props.toggleSettings(false)
      console.log('firing toggle', nextProps.toggleSettings.toString())
    }


    // if (nextProps.activeOrganization !== this.props.activeOrganization) {
    //   this.props.getSubscriptionInfo(nextProps.stripeCustomerID)
    // }
  }
  cancelSubscription = () => {
    this.props.cancelSubscription(this.props.getSubscriptionInfoData.subscriptionID, this.props.activeOrganization );
    this.setState({openEditModal: false});
  }


  orgInformation = () => {
    // axios.get()
    // TODO:  Organization settings
    // if(stripeCustomerID){
    //   return <CUSTOMERINFO />
    //   This is stripeCustomerID and info  ID, subscription end date, subscription type(premium/standard)
    //   Subscription upgrade button
    // } else {
    //   return <SUBSCRIPTION />
    //   start subscription stuff (this creates a stripeCustomerId)
    // }
  };

  render() {
    console.log(this.props.stripeCustomerID, this.props.toggle.toString())
    return (
      <Segment.Group>
        <Segment inverted color="blue">
          <Header as="h2" content="Organization View" textAlign="center" />
        </Segment>
        <Segment textAlign="center">
          <Header>{this.props.name}</Header>
          <List bulleted horizontal>
            <List.Item>Number of classes: {this.props.numOfClasses}</List.Item>
          </List>
        </Segment>
        <Segment textAlign="center">
          <Button
            name="openEditModal"
            icon="cog"
            content="Settings"
            inverted
            color="blue"
            size="large"
            onClick={this.openEditModal}
          />
        </Segment>
        <EditModal
          open={this.state.openEditModal}
          close={this.closeEditModal}
          openConfirm={this.openConfirm}
          stripeCustomerID={this.props.stripeCustomerID}
          getSubscriptionStatus={this.props.getSubscriptionStatus}
          getSubscriptionInfo={this.props.getSubscriptionInfoData}
          cancelSubscription={this.cancelSubscription}
          activeOrganization={this.props.activeOrganization}
        />
        <ConfirmDeleteModal
          open={this.state.openConfirm}
          close={this.closeConfirm}
          inputValue={this.state.confirmationInput}
          inputChange={this.handleInput}
          name={this.props.name}
          delete={this.handleDelete}
        />
      </Segment.Group>
    );
  }
}

const EditModal = props => {
  // If there is a stripeCustomerID on the org, display subscription info
  // else display a button to go subscribe.
  if (props.getSubscriptionStatus === true) {
    return (
      <Modal
        centered
        size="large"
        closeIcon
        open={props.open}
        onClose={props.close}
        dimmer="blurring"
      >
      <Modal.Header icon="cog" content="Organization Settings" />
      {/* <Modal.Content content="Billing options or current subscription details." /> */}
    <Modal.Content>
      <h1>You already have a subscription: {props.getSubscriptionInfo.nickname}</h1>
      <h2>Active subscription: {props.getSubscriptionStatus.toString()}</h2>
      <button onClick={props.cancelSubscription}>Cancel Subscription</button>
    </Modal.Content>
    <Modal.Actions>
    <Button
    color="red"
    icon="trash alternate"
    content="Delete this Organization"
    onClick={props.openConfirm}
    />
  </Modal.Actions>
  </Modal>
    )
  }
  if (props.stripeCustomerID !== null) {
    return (
      <Modal
        centered
        size="large"
        closeIcon
        open={props.open}
        onClose={props.close}
        dimmer="blurring"
      >
        <Modal.Header icon="cog" content="Organization Settings" />
        {/* <Modal.Content content="Billing options or current subscription details." /> */}
        <Modal.Content>
          <Sub2 />
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="red"
            icon="trash alternate"
            content="Delete this Organization"
            onClick={props.openConfirm}
          />
        </Modal.Actions>
      </Modal>
    );
  }
  return (
    <Modal
      centered
      size="large"
      closeIcon
      open={props.open}
      onClose={props.close}
      dimmer="blurring"
    >
      <Modal.Header icon="cog" content="Organization Settings" />
      {/* <Modal.Content content="Billing options or current subscription details." /> */}
      <Modal.Content>
        <SUBSCRIPTION />
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="red"
          icon="trash alternate"
          content="Delete this Organization"
          onClick={props.openConfirm}
        />
      </Modal.Actions>
    </Modal>
  );
};

const ConfirmDeleteModal = props => {
  return (
    <Modal
      centered
      size="tiny"
      closeIcon
      open={props.open}
      onClose={props.close}
    >
      <Modal.Header icon="trash" content="Are you absolutely sure?" />
      <Modal.Content>
        <Form>
          <Form.Input
            label="Deleting this organization will delete all of the organization's classes and
            students."
            placeholder="Enter the name of the organization to confirm."
            value={props.inputValue}
            onChange={props.inputChange}
            fluid
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="red"
          icon="trash alternate"
          content="Confirm Delete"
          disabled={props.inputValue !== props.name}
          onClick={props.delete}
        />
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    stripeCustomerID: state.stripeCustomerID,
    getSubscriptionStatus: state.getSubscriptionStatus,
    getSubscriptionInfoData: state.getSubscriptionInfo,
    toggle: state.toggleSettings,
    activeOrganization: state.activeOrganization
  }
}
export  default connect(mapStateToProps, {toggleSettings, cancelSubscription, getSubscriptionInfo})(OrganizationView)
