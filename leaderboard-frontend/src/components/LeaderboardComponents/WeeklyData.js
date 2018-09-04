import React, {Component} from 'react';
import {Container, Table} from "semantic-ui-react";
import WeeklyDisplay from "./WeeklyDisplay";


class WeeklyData extends Component {
    render() {
        let count = []
        return (
            <div>
                <Container>
                    <Table color={"teal"} celled inverted selectable>
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
                        <Table.Body >
                            <Table.Row >
                                <Table.HeaderCell colSpan="4">
                        {this.props.data.map((each, x) => {
                            // this.props.data.huntr.forEach(hunt => {
                            //     if (each.FullName === hunt.givenNameArr + ' ' + hunt.familyName) {
                            //         count[x] = hunt.count;
                            //     }
                            // })
                            return (

                                    <WeeklyDisplay github={each.Git} count={each.Huntr.count} huntr={each.Huntr} />

                            )
                        })}
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Container>
            </div>
        );
    }
}




export default WeeklyData
