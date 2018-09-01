import React, { Component } from "react";
import { Container, Grid, Menu } from "semantic-ui-react";
import { connect } from "react-redux";

// components
import AddOrganization from "./AddOrganization";
import OrganizationView from "./OrganizationView";
import AddClass from "./AddClass";
import ClassView from "./ClassView";

// actions
import {
  getAdminOrganizations,
  addAdminOrganization
} from "../../actions/adminActions";
import {
  getOrganizationClasses,
  addOrganizationClass
} from "../../actions/organizationActions";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeOrg: "",
      activeClass: "",
      activeOrgName: "",
      activeClassName: ""
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

  handleOrgMenuClick = (e, { name, content }) => {
    this.setState({
      activeOrg: name,
      activeOrgName: content,
      activeClass: "",
      activeClassName: ""
    });
    this.props.newOrgErrors.name = "";
  };

  handleClassMenuClick = (e, { name, content }) => {
    this.setState({ activeClass: name, activeClassName: content });
    this.props.newClassErrors.name = "";
  };

  componentDidUpdate = (prevProps, prevState) => {
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

    // New Class created -> Updating Classes
    if (
      this.props.createdClass &&
      this.props.createdClass !== prevProps.createdClass
    ) {
      this.getClasses();
    }
  };

  componentDidMount = () => {
    this.getOrganizations();
  };

  render() {
    console.log(this.props.orgClasses.length);
    const { activeOrg, activeClass } = this.state;
    return (
      <Container>
        <Grid>
          <Grid.Column width={5}>
            <Menu size="massive" fluid vertical color="blue">
              <Menu.Item>
                <Menu.Header>
                  {this.props.organizations.length
                    ? "Organizations"
                    : "You aren't a part of any organizations yet"}
                </Menu.Header>
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
                  <Menu.Header>
                    {!this.props.orgClasses.length
                      ? `${this.state.activeOrgName} currently has no classes`
                      : "Classes"}
                  </Menu.Header>
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
                    <Menu.Item
                      content="Add a new class"
                      icon="add"
                      name="addClass"
                      active={activeClass === "addClass"}
                      onClick={this.handleClassMenuClick}
                    />
                  </Menu.Menu>
                </Menu.Item>
              ) : null}
            </Menu>
          </Grid.Column>
          <Grid.Column width={11}>
            {/* ADD ORGANIZATION VIEW */}
            {activeOrg === "addOrg" || !this.props.organizations.length ? (
              <AddOrganization
                addOrg={this.props.addAdminOrganization}
                addOrgErrors={this.props.newOrgErrors}
              />
            ) : null}

            {/* ORGANIZATION VIEW */}
            {activeOrg !== "" &&
            activeOrg !== "addOrg" &&
            activeClass === "" ? (
              <OrganizationView
                name={this.state.activeOrgName}
                numOfClasses={this.props.orgClasses.length}
              />
            ) : null}

            {/* ADD CLASS VIEW */}
            {activeClass === "addClass" ? (
              <AddClass
                orgId={this.state.activeOrg}
                orgName={this.state.activeOrgName}
                addClass={this.props.addOrganizationClass}
                addClassErrors={this.props.newClassErrors}
              />
            ) : null}

            {/* CLASS VIEW */}
            {activeClass !== "" && activeClass !== "addClass" ? (
              <ClassView
                classId={this.state.activeClass}
                className={this.state.activeClassName}
                props={this.props}
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

    orgClasses: state.organizationClasses,
    newClassErrors: state.newClassErrors,
    createdClass: state.createdClass
  };
};

export default connect(
  mapStateToProps,
  {
    getAdminOrganizations,
    addAdminOrganization,
    getOrganizationClasses,
    addOrganizationClass
  }
)(Dashboard);
