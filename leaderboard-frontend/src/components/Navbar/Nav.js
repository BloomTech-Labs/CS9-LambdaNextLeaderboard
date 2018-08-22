import React, { Component } from "react";
import {
  Button,
  Modal,
  Menu,
  Grid,
  GridColumn,
  Form,
  Input,
  Label,
  Popup
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginAction, createUserAction, logoutAction } from "../../actions";

import "./Nav.css";

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: "",
      openModal: false,
      SignInUsername: "",
      SignInPassword: "",
      SignedIn: false
    };
  }

    componentDidMount() {
if (localStorage.getItem('token') !== null) {
        this.props.history.push('/classlist')
        }
    }


    handleOpenModal = (e, { content }) => {
    this.setState({ activeItem: content, openModal: true });
  };

  handleCloseModal = () => {
    this.setState({ activeItem: "", openModal: false });
    this.props.loginErrors.username = "";
    this.props.loginErrors.password = "";
  };

  handleMenuItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  handleInput = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmitLogin = () => {
    this.props.loginAction({
      username: this.state.SignInUsername,
      password: this.state.SignInPassword
    });

    this.setState({ SignInPassword: "" });
  };

  handleLogout = () => {
    this.props.logoutAction();
    this.setState({ SignedIn: false });
    localStorage.removeItem("token");
      this.props.history.push('/')
  };

  componentWillUpdate = nextProps => {
    if (nextProps.successfulLogin && (this.state.openModal || (!this.state.Modal && !this.state.SignedIn))) {

      this.setState({ SignInUsername: "", SignedIn: true, openModal: false });
        // if (localStorage.getItem('token') !== null) {
            this.props.history.push('/classlist')
        // }
    }

  };

  render() {
    const { activeItem } = this.state;
    console.log(this.state);

    return (
      <nav className="Nav">
        <div className="Nav__container">
          <Link to="/" className="Nav__link">
            <h1>Leaderboard</h1>
          </Link>
          { !localStorage.getItem('token') ? (
            <div>
              <Button
                size="small"
                color="linkedin"
                content="Sign In"
                onClick={this.handleOpenModal}
              />
              <Button
                size="small"
                color="linkedin"
                content="Register"
                onClick={this.handleOpenModal}
              />
            </div>
          ) : (
            <div>
              <Button
                size="small"
                color="red"
                content="Log Out"
                onClick={this.handleLogout}
              />
            </div>
          )}
        </div>
        <Modal
          open={this.state.openModal}
          onClose={this.handleCloseModal}
          centered={false}
          // dimmer={"blurring"}
          size="small"
        >
          <Modal.Content>
            <Menu tabular>
              <Menu.Item
                name="Sign In"
                active={activeItem === "Sign In"}
                onClick={this.handleMenuItemClick}
              />
              <Menu.Item
                name="Register"
                active={activeItem === "Register"}
                onClick={this.handleMenuItemClick}
              />
            </Menu>
            <Grid columns={2} divided>
              <GridColumn>
                {this.state.activeItem === "Sign In" ? (
                  <Form>
                    <Form.Field
                      error={Boolean(this.props.loginErrors.username)}
                    >
                      {this.props.loginErrors.username ? (
                        <Label
                          color="red"
                          pointing="below"
                          content={this.props.loginErrors.username}
                        />
                      ) : null}
                      <Input
                        name="SignInUsername"
                        value={this.state.SignInUsername}
                        onChange={this.handleInput}
                        icon="user"
                        iconPosition="left"
                        placeholder="Username"
                        type="text"
                      />
                    </Form.Field>
                    <Form.Field
                      error={Boolean(this.props.loginErrors.password)}
                    >
                      {this.props.loginErrors.password ? (
                        <Label
                          color="red"
                          pointing="below"
                          content={this.props.loginErrors.password}
                        />
                      ) : null}
                      <Input
                        name="SignInPassword"
                        value={this.state.SignInPassword}
                        onChange={this.handleInput}
                        icon="lock"
                        iconPosition="left"
                        placeholder="Password"
                        type="password"
                      />
                    </Form.Field>
                    <Button
                      fluid
                      color="green"
                      content="Sign In"
                      onClick={this.handleSubmitLogin}
                    />
                    <Popup
                      trigger={
                        <div className="ForgotPassword">
                          <Link to="/">Forgot your password?</Link>
                        </div>
                      }
                      content="Not implemented yet. Sorry!"
                      position="bottom center"
                      size="mini"
                    />
                  </Form>
                ) : null}
              </GridColumn>
              <GridColumn>OAuth here...</GridColumn>
            </Grid>
          </Modal.Content>
        </Modal>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginErrors: state.loginErrors,
    registerErrors: state.registerErrors,
    successfulLogin: state.successfulLogin
  };
};

export default connect(
  mapStateToProps,
  { loginAction, logoutAction }
)(Nav);
