import React, { Component } from "react";
import { Container, Grid, Menu, Icon } from "semantic-ui-react";
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
      active: "",
      selectedOrgId: "",
      selectedOrgName: "",
      organizations: null
    };
  }

  getOrganizations = () => {
    this.props.getAdminOrganizations({
      id: localStorage.getItem("adminID")
    });
  };

  handleMenuClick = (e, { name }) => {
    this.setState({ active: name });
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    console.log(
      "hello, scu",
      nextProps.orgClasses === this.props.orgClasses,
      nextProps.orgClasses,
      this.props.orgClasses
    );
    if (this.props.organizations !== nextProps.organizations) return true;
    if (this.props.orgClasses !== nextProps.orgClasses) return true;
    return false;
  };

  componentWillUpdate = (nextProps, nextState) => {
    if (nextState.active && nextState.active !== "addOrg") {
      this.props.getOrganizationClasses({ id: nextState.active });
    }
  };

  componentDidMount = () => {
    this.getOrganizations();
  };

  render() {
    const { active } = this.state;
    return (
      <Container>
        <Grid>
          <Grid.Column width={5}>
            <Menu size="massive" fluid vertical inverted color="blue">
              <Menu.Item>
                <Menu.Header>
                  Organizations
                  {!this.props.organizations.length ? (
                    <Icon loading name="spinner" />
                  ) : null}
                </Menu.Header>
                <Menu.Menu>
                  {this.props.organizations.map((org, index) => {
                    return (
                      <Menu.Item
                        content={org.name}
                        key={index}
                        name={org._id}
                        active={active === org._id}
                        onClick={this.handleMenuClick}
                      />
                    );
                  })}
                  <Menu.Item
                    content="Add a new organization"
                    icon="add"
                    name="addOrg"
                    active={active === "addOrg"}
                    onClick={this.handleMenuClick}
                  />
                </Menu.Menu>
              </Menu.Item>
              {this.state.active && this.state.active !== "addOrg" ? (
                <Menu.Item>
                  <Menu.Header>
                    Classes
                    {!this.props.orgClasses.length ? (
                      <Icon loading name="spinner" />
                    ) : null}
                  </Menu.Header>
                  <Menu.Menu>
                    {this.props.orgClasses.map((aClass, index) => {
                      return (
                        <Menu.Item
                          content={aClass.name}
                          key={index}
                          name={aClass._id}
                        />
                      );
                    })}
                    <Menu.Item content="Add a new class" icon="add" />
                  </Menu.Menu>
                </Menu.Item>
              ) : null}
            </Menu>
          </Grid.Column>
          <Grid.Column width={11}>
            {active === "" ? (
              <Segment>{"<-- select/create an org"}</Segment>
            ) : null}
            {active === "addOrg" ? (
              <AddOrganization addOrg={this.props.addAdminOrganization} />
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
    orgClasses: state.organizationClasses
  };
};

export default connect(
  mapStateToProps,
  { getAdminOrganizations, addAdminOrganization, getOrganizationClasses }
)(Dashboard);
