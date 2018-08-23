import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginAction } from "../actions";

//________STYLING________
import "./Login.css";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: "",
      sent: false
    };
  }
  handleInput = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSubmit = () => {
    this.props.loginAction(this.state, this.props.history);
    this.setState({ sent: true });
    this.setState({ password: "" });
  };

  render() {
    return (
      <div className="login__container">
        <div className="login__message">
          <h2 className="login__welcome">Welcome!</h2>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
          dapibus aliquet nibh sit amet vulputate. Fusce tortor nisi, dapibus
          non enim in, consectetur eleifend nisl.
        </div>
        <div className="login__form">
          {/* USERNAME */}
          <div className="login__labelcontainer">
            {/* <label className="login__label">Username</label> */}
            {this.props.error.username ? (
              <div className="login__error">{this.props.error.username}</div>
            ) : null}
          </div>
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            value={this.state.username}
            onChange={this.handleInput}
            className="login__input"
          />

          {/* PASSWORD */}
          <div className="login__labelcontainer">
            {/* <label className="login__label">Password</label> */}
            {this.props.error.password ? (
              <div className="login__error">{this.props.error.password}</div>
            ) : null}
          </div>
          <input
            type="password"
            value={this.state.password}
            name="password"
            placeholder="Enter password"
            onChange={this.handleInput}
            className="login__input"
          />

          {/* BUTTON */}
          <button onClick={this.handleSubmit} className="login__btn">
            Login
          </button>

          {/* REGISTER */}
          <Link to="/register" className="login__register">
            Don't have an account? Register
          </Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    error: state.error
  };
};
export default connect(
  mapStateToProps,
  { loginAction }
)(Login);
