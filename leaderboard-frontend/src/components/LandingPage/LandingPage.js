import React from "react";
import {
  Container,
  Grid,
  Header,
  Form,
  Input,
  Button
} from "semantic-ui-react";

import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="Landing">
      <div className="Landing__head">
        <Container>
          <Grid columns={2} stackable>
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
          </Grid>
        </Container>
      </div>
      <div className="Landing__content">Content</div>
    </div>
  );
};

export default LandingPage;
