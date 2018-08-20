import React, { Component } from "react";
import { Button, Modal, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./Nav.css";

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: "",
      openModal: false
    };
  }

  handleOpenModal = (e, { content }) => {
    this.setState({ activeItem: content, openModal: true });
  };

  handleCloseModal = () => {
    this.setState({ activeItem: "", openModal: false });
  };

  handleMenuItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;

    return (
      <nav className="Nav">
        <div className="Nav__container">
          <Link to="/" className="Nav__link">
            <h1>Leaderboard</h1>
          </Link>
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
        </div>
        <Modal
          open={this.state.openModal}
          onClose={this.handleCloseModal}
          centered={false}
          dimmer={"blurring"}
        >
          <Modal.Header>
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
          </Modal.Header>
        </Modal>
      </nav>
    );
  }
}
