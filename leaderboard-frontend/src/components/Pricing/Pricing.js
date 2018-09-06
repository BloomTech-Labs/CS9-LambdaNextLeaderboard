import React, { Component } from "react";
import { Container, Header, Grid, Card, List } from "semantic-ui-react";

class Pricing extends Component {
  constructor(props) {
    super(props);
    this.state = "";
  }

  render() {
    return (
      <div>
        <Container>
          <Header
            as="h1"
            content="pricing"
            textAlign="center"
            style={{
              fontSize: "4em",
              fontWeight: "normal",
              marginBottom: 0,
              marginTop: "3em"
            }}
          />
          <Header
            as="h2"
            content="Pricing plans for everyone."
            inverted
            textAlign="center"
            style={{
              fontSize: "1.7em",
              fontWeight: "normal",
              marginTop: "1.5em"
            }}
          />
          <Grid container centered>
            <Grid.Column width={5}>
              <Card>
                <Card.Content header="FREE" textAlign="center" />
                <Card.Content>
                  <List divided relaxed size="huge">
                    <List.Item>
                      <List.Content>
                        <List.Header as="h5">$0/month</List.Header>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Content>
                        <List.Description>1 Admin User</List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Content>
                        <List.Description>1 Class</List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Content>
                        <List.Description>Up to 50 Students</List.Description>
                      </List.Content>
                    </List.Item>
                  </List>
                </Card.Content>
                <Card.Content extra>'Choose this plan'</Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={5}>
              <Card>
                <Card.Content header="STANDARD" textAlign="center" />
                <Card.Content>
                  <List divided relaxed size="huge">
                    <List.Item>
                      <List.Content>
                        <List.Header as="h5">$10/month</List.Header>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Content>
                        <List.Description>5 Admin Users</List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Content>
                        <List.Description>10 Classes</List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Content>
                        <List.Description>Up to 500 Students</List.Description>
                      </List.Content>
                    </List.Item>
                  </List>
                </Card.Content>
                <Card.Content extra>'Choose this plan'</Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={5}>
              <Card>
                <Card.Content header="PREMIUM" textAlign="center" />
                <Card.Content>
                  <List divided relaxed size="huge">
                    <List.Item>
                      <List.Content>
                        <List.Header as="h5">$15/month</List.Header>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Content>
                        <List.Description>
                          Unlimited Admin Users
                        </List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Content>
                        <List.Description>Unlimited Classes</List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Content>
                        <List.Description>Unlimited Students</List.Description>
                      </List.Content>
                    </List.Item>
                  </List>
                </Card.Content>
                <Card.Content extra>'Choose this plan'</Card.Content>
              </Card>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Pricing;
