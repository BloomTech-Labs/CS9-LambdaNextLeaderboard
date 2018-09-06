import React, { Component } from "react";
import {
  Container,
  Header,
  Grid,
  Card,
  List,
  Button,
  Icon
} from "semantic-ui-react";

import "./Pricing.css";

class Pricing extends Component {
  constructor(props) {
    super(props);
    this.state = "";
  }

  handleCTAClick = () => {
    this.props.handleCTAClick();
  };

  render() {
    return (
      <div>
        <Container>
          <Header
            as="h1"
            content="Pricing"
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
            content="Plans to accomodate all class sizes."
            textAlign="center"
            style={{
              fontSize: "1.7em",
              fontWeight: "normal",
              marginTop: "1.5em"
            }}
          />
          <Grid container centered>
            <Grid.Column width={5}>
              <Card className="Pricing__card">
                <Card.Content as="h2" header="FREE" textAlign="center" />
                <Card.Content>
                  <List divided relaxed size="huge">
                    <List.Item>
                      <List.Content>
                        <List.Header as="h3" className=".Pricing__cardHeader">
                          $0/month
                        </List.Header>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Content>
                        <List.Description>
                          <strong>1</strong> Admin User
                        </List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Content>
                        <List.Description>
                          <strong>1</strong> Class
                        </List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Content>
                        <List.Description>
                          <strong>50</strong> Students
                        </List.Description>
                      </List.Content>
                    </List.Item>
                  </List>
                </Card.Content>
                <Card.Content extra>
                  <Button primary size="large" onClick={this.handleCTAClick}>
                    Get Started
                    <Icon name="right arrow" />
                  </Button>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={5}>
              <Card className="Pricing__card">
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
                        <List.Description>
                          <strong>5</strong> Admin Users
                        </List.Description>
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
                <Card.Content extra>
                  <Button primary size="large" onClick={this.handleCTAClick}>
                    Get Started
                    <Icon name="right arrow" />
                  </Button>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={5}>
              <Card className="Pricing__card">
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
                <Card.Content extra>
                  <Button primary size="large" onClick={this.handleCTAClick}>
                    Get Started
                    <Icon name="right arrow" />
                  </Button>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Pricing;
