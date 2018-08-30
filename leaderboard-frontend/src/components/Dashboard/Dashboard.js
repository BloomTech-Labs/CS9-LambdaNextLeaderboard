import React, { Component } from "react";
import { Container, Grid, Menu } from "semantic-ui-react";
import { connect } from "react-redux";

// components
import AddOrganization from "./AddOrganization";

// actions
import {
  getAdminOrganizations,
  addAdminOrganization
} from "../../actions/adminActions";
import { getOrganizationClasses } from "../../actions/organizationActions";
import { Segment } from "../../../../node_modules/semantic-ui-react";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeOrg: "",
      activeClass: "",
      selectedOrgId: "",
      selectedOrgName: ""
    };
  }

  getOrganizations = () => {
    this.props.getAdminOrganizations({
      id: localStorage.getItem("adminID")
    });
  };

  getClasses = () => {
    this.props.getOrganizationClasses({ id: this.state.activeOrg });
  };

  handleOrgMenuClick = (e, { name }) => {
    this.setState({ activeOrg: name });
  };

  handleClassMenuClick = (e, { name }) => {
    this.setState({ activeClass: name });
  };

  componentWillUpdate = (nextProps, nextState) => {
    console.log("I am going to set the state for real", this.state);
  };

  componentDidUpdate = (prevProps, prevState) => {
    console.log("It changed", prevProps, this.props, prevState, this.state);
    // New Organization created -> Updating Organizations
    if (
      this.props.createdOrganization &&
      this.props.createdOrganization !== prevProps.createdOrganization
    ) {
      this.getOrganizations();
    }

    // Selected Organization was changed -> Updating Classes
    if (
      this.state.activeOrg &&
      this.state.activeOrg !== "addOrg" &&
      this.state.activeOrg !== prevState.activeOrg
    ) {
      this.getClasses();
    }
  };

  componentDidMount = () => {
    this.getOrganizations();
  };

  render() {
    const { activeOrg, activeClass } = this.state;
    return (
      <Container>
        <Grid>
          <Grid.Column width={5}>
            <Menu size="massive" fluid vertical inverted color="blue">
              <Menu.Item>
                <Menu.Header>Organizations</Menu.Header>
                <Menu.Menu>
                  {this.props.organizations.map((org, index) => {
                    return (
                      <Menu.Item
                        content={org.name}
                        key={index}
                        name={org._id}
                        active={activeOrg === org._id}
                        onClick={this.handleOrgMenuClick}
                      />
                    );
                  })}
                  {!this.props.organizations.length ? (
                    <Menu.Item
                      content={"You haven't created an organization yet!"}
                    />
                  ) : null}
                  <Menu.Item
                    content="Add a new organization"
                    icon="add"
                    name="addOrg"
                    active={activeOrg === "addOrg"}
                    onClick={this.handleOrgMenuClick}
                  />
                </Menu.Menu>
              </Menu.Item>
              {this.state.activeOrg && this.state.activeOrg !== "addOrg" ? (
                <Menu.Item>
                  <Menu.Header>Classes</Menu.Header>
                  <Menu.Menu>
                    {this.props.orgClasses.map((aClass, index) => {
                      return (
                        <Menu.Item
                          content={aClass.name}
                          key={index}
                          name={aClass._id}
                          active={activeClass === aClass._id}
                          onClick={this.handleClassMenuClick}
                        />
                      );
                    })}
                    {!this.props.orgClasses.length ? (
                      <Menu.Item
                        content={"That organization currently has no classes!"}
                      />
                    ) : null}
                    <Menu.Item content="Add a new class" icon="add" />
                  </Menu.Menu>
                </Menu.Item>
              ) : null}
            </Menu>
          </Grid.Column>
          <Grid.Column width={11}>
            {activeOrg === "" ? (
              <Segment>{"<-- select/create an organization"}</Segment>
            ) : null}
            {activeOrg === "addOrg" ? (
              <AddOrganization
                addOrg={this.props.addAdminOrganization}
                addOrgErrors={this.props.newOrgErrors}
              />
            ) : null}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    organizations: state.adminOrganizations,
    newOrgErrors: state.newOrganizationErrors,
    createdOrganization: state.createdOrganization,
    orgClasses: state.organizationClasses
  };
};

export default connect(
  mapStateToProps,
  { getAdminOrganizations, addAdminOrganization, getOrganizationClasses }
)(Dashboard);
