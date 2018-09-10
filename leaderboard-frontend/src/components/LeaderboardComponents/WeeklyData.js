import React, {Component} from 'react';
import {Container, Table, Header, Image } from "semantic-ui-react";
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
                        {/* <Table.Body > */}
                            {/* <Table.Row >
                                <Table.HeaderCell colSpan="4"> */}
                        {this.props.data.map((each, x) => {
                            // this.props.data.huntr.forEach(hunt => {
                            //     if (each.FullName === hunt.givenNameArr + ' ' + hunt.familyName) {
                            //         count[x] = hunt.count;
                            //     }
                            // })
                            return (
        <Table.Row>
                                    {/* // <WeeklyDisplay github={each.Git} count={each.Huntr.count} huntr={each.Huntr} /> */}
            <Table.Cell>
              <Header as="h4" image>
                <Image
                  src="https://avatars3.githubusercontent.com/u/35821558?s=460&v=4"
                  rounded
                  size="mini"
                />
                <Header.Content >{each.Git.FullName}</Header.Content>
              </Header>
            </Table.Cell >
            <Table.Cell >{each.Git.commitsByUser}</Table.Cell>
            <Table.Cell >
              {each.Huntr.count === "none"
                ? this.state.huntrDefault
                : each.Huntr.count}
            </Table.Cell>
            <Table.Cell >
              {each.Huntr.count === "none"
                ? this.state.huntrDefault + each.Git.commitsByUser
                : each.Huntr.count + each.Git.commitsByUser}
            </Table.Cell>
        </Table.Row>
                            )
                        })}
                                {/* </Table.HeaderCell>
                            </Table.Row> */}
                        {/* </Table.Body> */}
                    </Table>
                </Container>
            </div>
        );
    }
}




export default WeeklyData
