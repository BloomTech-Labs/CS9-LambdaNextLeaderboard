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
  Popup,
  GridRow,
  Container
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
      RegisterUsername: "",
      RegisterEmail: "",
      RegisterPassword: "",
      RegisterPassword2: "",
      SignInEmail: "",
      SignInPassword: "",
      SignedIn: false
    };
  }

  handleOpenModal = (e, { content }) => {
    this.setState({ activeItem: content, openModal: true });
  };

  handleCloseModal = () => {
    this.setState({ activeItem: "", openModal: false });
    // this.props.registerErrors.username = "";
    // this.props.registerErrors.email = "";
    // this.props.registerErrors.password = "";
    // this.props.registerErrors.password2 = "";
    // this.props.loginErrors.username = "";
    // this.props.loginErrors.password = "";
  };

  handleMenuItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    // this.props.registerErrors.username = "";
    // this.props.registerErrors.email = "";
    // this.props.registerErrors.password = "";
    // this.props.registerErrors.password2 = "";
    // this.props.loginErrors.username = "";
    // this.props.loginErrors.password = "";
  };

  handleInput = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmitRegister = () => {
    this.props.createUserAction({
      username: this.state.RegisterUsername,
      email: this.state.RegisterEmail,
      password: this.state.RegisterPassword,
      password2: this.state.RegisterPassword2
    });

    this.setState({ RegisterPassword: "", RegisterPassword2: "" });
  };

  handleSubmitLogin = () => {
    this.props.loginAction({
      email: this.state.SignInEmail,
      password: this.state.SignInPassword
    });

    this.setState({ SignInPassword: "", SignInUsername: "" });
  };

  handleLogout = () => {
    this.props.logoutAction();
    this.setState({ SignedIn: false });
    localStorage.removeItem("token");
    this.props.history.push("/");
  };

  componentWillUpdate = nextProps => {
    if (
      nextProps.successfulLogin &&
      (this.state.openModal || (!this.state.Modal && !this.state.SignedIn))
    ) {
      this.setState({ SignInEmail: "", SignedIn: true, openModal: false });
      this.props.history.push("/classlist");
    }

    // if (
    //   nextProps.successfulRegister &&
    //   this.state.openModal &&
    //   this.state.activeItem === "Register"
    // ) {
    //   this.setState({
    //     activeItem: "Sign In",
    //     RegisterUsername: "",
    //     RegisterEmail: ""
    //   });
    // }
  };

  render() {
    const { activeItem } = this.state;

    return (
      <nav className="Nav">
        <Container>
          <div className="Nav__container">
            <Link to="/classlist" className="Nav__link">
              <h1>Leaderboard</h1>
            </Link>
            {!localStorage.getItem("token") ? (
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
        </Container>
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
            <Grid divided>
              <GridRow stretched>
                <GridColumn width={9}>
                  {this.state.activeItem === "Sign In" ? (
                    <Form size="large">
                      <Form.Field
                        error={Boolean(
                          this.props.loginErrors.invalidLogin ||
                            this.props.loginErrors.email
                        )}
                      >
                        {this.props.loginErrors.invalidLogin ||
                        this.props.loginErrors.email ? (
                          <Label
                            color="red"
                            pointing="below"
                            content={
                              this.props.loginErrors.invalidLogin ||
                              this.props.loginErrors.email
                            }
                          />
                        ) : null}
                        <Input
                          name="SignInEmail"
                          value={this.state.SignInEmail}
                          onChange={this.handleInput}
                          icon="mail"
                          iconPosition="left"
                          placeholder="Your email address"
                          type="text"
                        />
                      </Form.Field>
                      <Form.Field
                        error={Boolean(
                          this.props.loginErrors.invalidLogin ||
                            this.props.loginErrors.password
                        )}
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
                          placeholder="Your password"
                          type="password"
                        />
                      </Form.Field>
                      <Form.Field>
                        <Button
                          fluid
                          color="green"
                          content="Sign In"
                          onClick={this.handleSubmitLogin}
                          size="large"
                        />
                      </Form.Field>
                      <Popup
                        trigger={
                          <div className="ForgotPassword">
                            <Link to="/">Forgot your password?</Link>
                          </div>
                        }
                        content="Not implemented yet. Sorry!"
                        position="bottom center"
                        size="small"
                      />
                    </Form>
                  ) : (
                    <Form size="large">
                      <Form.Field
                        error={Boolean(this.props.registerErrors.username)}
                      >
                        {this.props.registerErrors.username ? (
                          <Label
                            color="red"
                            pointing="below"
                            content={this.props.registerErrors.username}
                          />
                        ) : null}
                        <Input
                          name="RegisterUsername"
                          value={this.state.RegisterUsername}
                          onChange={this.handleInput}
                          icon="user"
                          iconPosition="left"
                          placeholder="Pick a username"
                          type="text"
                        />
                      </Form.Field>
                      <Form.Field
                        error={Boolean(this.props.registerErrors.email)}
                      >
                        {this.props.registerErrors.email ? (
                          <Label
                            color="red"
                            pointing="below"
                            content={this.props.registerErrors.email}
                          />
                        ) : null}
                        <Input
                          name="RegisterEmail"
                          value={this.state.RegisterEmail}
                          onChange={this.handleInput}
                          icon="mail"
                          iconPosition="left"
                          placeholder="Your email address"
                          type="text"
                        />
                      </Form.Field>
                      <Form.Field
                        error={Boolean(this.props.registerErrors.password)}
                      >
                        {this.props.registerErrors.password ? (
                          <Label
                            color="red"
                            pointing="below"
                            content={this.props.registerErrors.password}
                          />
                        ) : null}
                        <Input
                          name="RegisterPassword"
                          value={this.state.RegisterPassword}
                          onChange={this.handleInput}
                          icon="lock"
                          iconPosition="left"
                          placeholder="Create a password"
                          type="password"
                        />
                      </Form.Field>
                      <Form.Field
                        error={Boolean(this.props.registerErrors.password2)}
                      >
                        {this.props.registerErrors.password2 ? (
                          <Label
                            color="red"
                            pointing="below"
                            content={this.props.registerErrors.password2}
                          />
                        ) : null}
                        <Input
                          name="RegisterPassword2"
                          value={this.state.RegisterPassword2}
                          onChange={this.handleInput}
                          icon="lock"
                          iconPosition="left"
                          placeholder="Confirm password"
                          type="password"
                        />
                      </Form.Field>
                      <Button
                        fluid
                        color="green"
                        content="Create My Account"
                        onClick={this.handleSubmitRegister}
                        size="large"
                      />
                    </Form>
                  )}
                </GridColumn>
                <GridColumn width={7}>OAuth here...</GridColumn>
              </GridRow>
            </Grid>
          </Modal.Content>
          <Modal.Actions />
        </Modal>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginErrors: state.loginErrors,
    registerErrors: state.registerErrors,
    successfulLogin: state.successfulLogin,
    successfulRegister: state.successfulRegister
  };
};

export default connect(
  mapStateToProps,
  { createUserAction, loginAction, logoutAction }
)(Nav);
