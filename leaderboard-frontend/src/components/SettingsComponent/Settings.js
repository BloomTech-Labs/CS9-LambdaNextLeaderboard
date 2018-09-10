// import React, { Component } from "react";
// import { Container, Segment } from "semantic-ui-react";
// import "./Settings.css";
//
// export default class Settings extends Component {
//   render() {
//     return (
//       <Container className="Settings__Container">
//         <Segment />
//       </Container>
//     );
//   }
// }

import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {updateUserAction} from '../../actions'
import  {setSettingsAction} from '../../actions'
import {updateAdminAction} from '../../actions/adminActions'
import './Settings.css'
let organizationIDs = []

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      organization: '',
      username: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      message: ''
    }
  }

  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  handleSave = () => {
    // const organization = localStorage.getItem("organization")
    const updateAdmin = {
      "username": this.state.username,
      "oldPassword": this.state.oldPassword,
      "password": this.state.newPassword,
      "email": this.state.email,
      "organization": organizationIDs,
      // "_id": localStorage.getItem("adminID")
    }
    console.log('Saved', this.state)
    console.log("org", organizationIDs)
    this.props.updateAdminAction(updateAdmin)
    this.props.setSettingsAction(false)

  }
  checkCredentials = () => {

    if (this.state.newPassword === this.state.confirmPassword &&  this.state.password !== '') {
      this.handleSave();
    } else {
      this.setState({email: '', oldPassword: '', newPassword: '', confirmPassword: '', message: "Update Failed, due to mismatch password, try again" });
    }
  }
  render() {
    organizationIDs = []

    this.props.adminOrganizations.forEach(each => {
      if (each._id) {
        organizationIDs.push(each._id)
      }
    })
    return (
      <div className="InputWrapper">
        {this.state.message ? <h1>{this.state.message}</h1> : <div></div>}
        <div>
          <div>
            <div>
              <h3 className="headerField">Username:</h3>
              <input
                type="text"
                name="username"
                className="inputVal"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleInput}
                align="right"
              />
            </div>
          </div>
          <div>
            <div>
              <h3 className="headerField">Old Password:</h3>
              <input
                type="password"
                name="oldPassword"
                className="inputVal"
                placeholder="******"
                value={this.state.oldPassword}
                onChange={this.handleInput}
                align="right"
              />
            </div>
          </div>
          <div>
            <div>
              <h3 className="headerField">New Password:</h3>
              <input
                type="password"
                name="newPassword"
                className="inputVal"
                placeholder="*******"
                value={this.state.newPassword}
                onChange={this.handleInput}
                align="right"
              />
            </div>
          </div>
          <div>
            <div>
              <h3 className="headerField">Confirm Password:</h3>
              <input
                type="password"
                name="confirmPassword"
                className="inputVal"
                placeholder="*******"
                value={this.state.confirmPassword}
                onChange={this.handleInput}
                align="right"
              />
            </div>
          </div>
          <div>
            <div>
              <h3 className="headerField">Email:</h3>
              <input
                type="text"
                name="email"
                className="inputVal"
                placeholder="user@gmail.com"
                value={this.state.email}
                onChange={this.handleInput}
                align="right"
              />
            </div>
          </div>
          <div>
            <div>
              <h3 className="headerField">Organization:</h3>
              <input
                type="text"
                name="organization"
                className="inputVal"
                placeholder="*******"
                value={this.state.organization}
                onChange={this.handleInput}
                align="right"
              />
            </div>
          </div>
        </div>

        <button className="BtnSave" onClick={this.checkCredentials}>Save</button>
      </div>
    );
  }
}
const maptStateToProps = state => {
  return {
    updateAdmin: state.updateAdmin,
    adminOrganizations: state.adminOrganizations
  }
}
export default connect(maptStateToProps, {setSettingsAction, updateAdminAction})(Settings)
