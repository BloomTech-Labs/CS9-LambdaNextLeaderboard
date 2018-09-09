import React, {Component} from 'react';
import {Container, Table, Header, Image} from "semantic-ui-react";
import WeeklyDisplay from "./WeeklyDisplay";


class WeeklyData extends Component {
  render() {
    let count = []
    return (
      <div>
        <Container>
          <Table color={"teal"} celled inverted sortable selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="4">Weekly Leaderboard</Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Github</Table.HeaderCell>
                <Table.HeaderCell>Huntr</Table.HeaderCell>
                <Table.HeaderCell>Total</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {this.props.data.map((each, x) => {

              return (
                <Table.Row>
                  {/* // <WeeklyDisplay github={each.Git} count={each.Huntr.count} huntr={each.Huntr} /> */}
                  <Table.Cell>
                    <Header as="h4" image>
                      <Image
                        src={each.Git.avatar}
                        rounded
                        size="mini"
                      />
                      <Header.Content>{each.Git.FullName}</Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{each.Git.commitsByUser}</Table.Cell>
                  <Table.Cell>
                    {each.Huntr.count === "none"
                      ? this.state.huntrDefault
                      : each.Huntr.count}
                  </Table.Cell>
                  <Table.Cell>
                    {each.Huntr.count === "none"
                      ? this.state.huntrDefault + each.Git.commitsByUser
                      : each.Huntr.count + each.Git.commitsByUser}
                  </Table.Cell>
                </Table.Row>
              )
            })}

          </Table>
        </Container>
      </div>
    );
  }
}


export default WeeklyData
