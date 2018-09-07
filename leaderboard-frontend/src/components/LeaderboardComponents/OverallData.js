import React, { Component } from "react";
import { Container, Header, Image, Table } from "semantic-ui-react";
// import WeeklyDisplay from "./WeeklyDisplay";
import OverallDisplay from "./OverallDisplay";


class OverallData extends Component {
    render() {
        let count = [];
        return (
            <div>
                <Container>
                    <Table className="overall" celled inverted selectable>
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
                                // <div>
                                //     <OverallDisplay
                                //         github={each.Git}
                                //         count={each.Huntr.count}
                                //         huntr={each.Huntr}
                                //     />
                                // </div>
                                <Table.Row >
                                <Table.Cell>
                                <Header as="h4" image>
                                  <Image
                                    src="https://avatars3.githubusercontent.com/u/35821558?s=460&v=4"
                                    rounded
                                    size="mini"
                                  />
                                  <Header.Content>{each.Git.FullName} </Header.Content>
                                </Header>
                              </Table.Cell>
                              <Table.Cell>
                                {each.Git.commitsByUser + each.Git.pushCount}
                              </Table.Cell>
                              <Table.Cell>
                                {each.Huntr.count === "none"
                                  ? this.state.huntrDefault
                                  : each.Huntr.count}
                                {/*{this.state.huntrDefault}*/}
                              </Table.Cell>
                              <Table.Cell>
                                {each.Huntr.count === "none"
                                  ? this.state.huntrDefault +
                                    each.Git.commitsByUser +
                                    each.Git.pushCount
                                  : each.Huntr.count +
                                    each.Git.commitsByUser +
                                    each.Git.pushCount}
                                {/*{this.state.huntrDefault + this.props.github.commitsByUser + this.props.github.commitsByUser + this.props.github.pushCount}*/}
                              </Table.Cell>
                              </Table.Row>
                            );
                        })}
                    </Table>
                </Container>
            </div>
        );
    }
}

export default OverallData;
