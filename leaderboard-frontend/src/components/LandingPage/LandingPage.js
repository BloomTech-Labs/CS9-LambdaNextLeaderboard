import React, { Component } from "react";
import {
  Container,
  Grid,
  Header,
  Form,
  Input,
  Button,
  Icon
} from "semantic-ui-react";

import DesktopContainer from "./LandingPageComponents/DesktopContainer";

import "./LandingPage.css";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (localStorage.getItem("invalid")) {
      localStorage.removeItem("token");
      localStorage.removeItem("invalid");
    }
    if (localStorage.getItem("token")) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (localStorage.getItem("invalid")) {
      localStorage.removeItem("token");
      localStorage.removeItem("invalid");
    }
  }

  render() {
    return (
      <div className="Landing">
        <div className="Landing__head">
        <Container text>
    <Header
      as='h1'
      content='Next Steps'
      inverted
      style={{
        fontSize:'4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop:'3em',
      }}
    />
    <Header
      as='h2'
      content='Easily track student job progress.'
      inverted
      style={{
        fontSize:'1.7em',
        fontWeight: 'normal',
        marginTop:'1.5em',
      }}
    />
    <Button primary size='huge'>
      Get Started
      <Icon name='right arrow' />
    </Button>
  </Container>
            
            {/* <Grid columns={2} stackable>
              <Grid.Column verticalAlign="middle">
                <Header as="h1" size="huge" color="olive">
                  Keep track of work and progress with NextSteps
                </Header>
                <Header as="h2">
                  It's a fun and competitive way to gain experience.
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Form size="large">
                  <Form.Field>
                    <Input
                      name="RegisterUsername"
                      icon="user"
                      iconPosition="left"
                      placeholder="Pick a username"
                      type="text"
                    />
                  </Form.Field>
                  <Form.Field>
                    <Input
                      name="RegisterEmail"
                      icon="mail"
                      iconPosition="left"
                      placeholder="Your email address"
                      type="text"
                      disabled
                    />
                  </Form.Field>
                  <Form.Field>
                    <Input
                      name="RegisterPassword"
                      icon="lock"
                      iconPosition="left"
                      placeholder="Create a password"
                      type="password"
                    />
                  </Form.Field>
                  <Form.Field>
                    <Input
                      name="RegisterPassword2"
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
                    size="large"
                  />
                </Form>
              </Grid.Column>
            </Grid> */}
          {/* </Container> */}
        </div>
        <div className="Landing__content">Content</div>
      </div>
    );
  }
}

export default LandingPage;
