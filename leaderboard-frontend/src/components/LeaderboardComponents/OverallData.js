import React, { Component } from "react";
import { Container, Table } from "semantic-ui-react";
// import WeeklyDisplay from "./WeeklyDisplay";
import OverallDisplay from "./OverallDisplay";

class OverallData extends Component {
  render() {
    let count = [];
    return (
      <div>
        <Container>
          <Table color={"grey"} celled inverted selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="4">
                  Overall Leaderboard
                </Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Github</Table.HeaderCell>
                <Table.HeaderCell>Huntr</Table.HeaderCell>
                <Table.HeaderCell>Total</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            {this.props.data.map((each, x) => {
              // this.props.data.huntr.forEach(hunt => {
              //   if (
              //     each.FullName ===
              //     hunt.givenNameArr + " " + hunt.familyName
              //   ) {
              //     count[x] = hunt.count;
              //   }
              // });
              return (
                <div>
                  <OverallDisplay
                    github={each.Git}
                    count={each.Huntr.count}
                    huntr={each.Huntr}
                  />
                </div>
              );
            })}
          </Table>
        </Container>
      </div>
    );
  }
}

export default OverallData;
