import React, { Component } from "react";

import {
  getAdminOrganizations,
  addAdminOrganization
} from "../../actions/adminActions";
import { connect } from "react-redux";

class NewBackendTesting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newOrgName: "",
      organizations: []
    };
  }

  handleGetOrg = () => {
    this.props.getAdminOrganizations({ id: localStorage.getItem("adminID") });
  };

  handleInput = e => {
    this.setState({ newOrgName: e.target.value });
  };

  handleSubmit = () => {
    console.log(this.state);
    this.props.addAdminOrganization({
      name: this.state.newOrgName
    });
  };

  componentWillMount = () => {
    this.props.getAdminOrganizations({ id: localStorage.getItem("adminID") });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <button onClick={this.handleGetOrg}>Get Organizations</button>
        <h1>Current organizations: </h1>
        {this.props.organizations.map(org => {
          return <div>{org.name}</div>;
        })}
        <h1>Add a new organization:</h1>
        <div>
          <input type="text" onChange={this.handleInput} />
          <button onClick={this.handleSubmit}>Add</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    organizations: state.adminOrganizations
  };
};

export default connect(
  mapStateToProps,
  { getAdminOrganizations, addAdminOrganization }
)(NewBackendTesting);
