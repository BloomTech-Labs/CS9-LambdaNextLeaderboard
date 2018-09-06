import React, { Component } from "react";
import { Container, Header, Grid, Card } from "semantic-ui-react";

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
          <Grid>
            <Grid.Column width={4}>
              <Segment>
                <Card />
              </Segment>
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment>
                <Card />
              </Segment>
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment>
                <Card />
              </Segment>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}
