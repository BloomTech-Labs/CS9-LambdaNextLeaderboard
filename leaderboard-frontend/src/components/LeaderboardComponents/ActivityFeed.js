import React, { Component } from "react";

class ActivityFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
        <Container>
          <div class="ui column divided grid">
            <div class="row">
              <div class="three wide column">
                <Header as="h2" icon>
                  <Icon name="ui users circular image" color="purple" />
                  CS 9
                </Header>
              </div>
              <div class="nine wide column">
                <p />
                <b>ACTIVITY FEED</b>
                <Segment color="purple">
                  <p>Jane Bernard has applied to three gigs.</p>
                  <p>Tim Kelly has two second round interviews.</p>
                  <p>Steve Bonano made 17 new connections.</p>
                </Segment>
              </div>
              <div class="four wide column">
                <div class="ui horizontal statistics">
                  <div class="statistic color purple">
                    <div class="value">34/48</div>
                    <div class="label">Have Landed Gigs!</div>
                  </div>
                  <div>
                    <div class="ui horizontal divider">
                      <i class="orange fire icon" /> HOT RIGHT NOW!
                    </div>
                    <i class="github icon" />
                    Mary Jones &nbsp;| &nbsp;
                    <b>h</b> James Jameson
                  </div>
                  <p />
                </div>
              </div>
              <div class="row">
                <div class="column">
                  <p />
                </div>
                <div class="column">
                  <p />
                </div>
                <div class="column">
                  <p />
                </div>
              </div>
            </div>
            <div />
          </div>
        </Container>
    );
  }
}

export default ActivityFeed;