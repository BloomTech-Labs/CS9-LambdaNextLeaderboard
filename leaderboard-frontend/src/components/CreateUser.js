import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { createUserAction } from "../actions";

//________STYLING________
import "./CreateUser.css";

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      password2: ""
    };
  }

  handleInput = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    this.props.createUserAction(this.state);
    this.setState({ password: "", password2: "" });
  };

  render() {
    return (
      <div className="rgstr__container">
        <h2 className="rgstr__header">Register</h2>
        {/* USERNAME */}
        {this.props.error.username ? (
          <div className="rgstr__error">{this.props.error.username}</div>
        ) : null}
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={this.state.username}
          onChange={this.handleInput}
          className="rgstr__input"
        />

        {/* PASSWORD */}
        {this.props.error.password ? (
          <div className="rgstr__error">{this.props.error.password}</div>
        ) : null}
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={this.state.password}
          onChange={this.handleInput}
          className="rgstr__input"
        />

        {/* PASSWORD CONFIRMATION */}
        {this.props.error.password2 ? (
          <div className="rgstr__error">{this.props.error.password2}</div>
        ) : null}
        <input
          type="password"
          placeholder="Confirm Password"
          name="password2"
          value={this.state.password2}
          onChange={this.handleInput}
          className="rgstr__input"
        />

        {/* BUTTON */}
        <button onClick={this.handleSubmit} className="rgstr__btn">
          Sign Up
        </button>

        {/* SIGN IN */}
        <Link to="/login" className="rgstr__login">
          Already have an account? Sign in
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  { createUserAction }
)(CreateUser);
