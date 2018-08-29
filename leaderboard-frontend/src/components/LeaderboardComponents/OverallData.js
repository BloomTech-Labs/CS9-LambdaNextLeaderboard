import React, {Component} from 'react';
import {connectAsync} from 'iguazu';
import {queryAllMyData, queryGithub, queryStudents} from "../../actions";
import {Container, Table} from "semantic-ui-react";
import WeeklyDisplay from "./WeeklyDisplay";
import OverallDisplay from "./OverallDisplay";


class OverallData extends Component {

    render() {
        if (this.props.isLoading()) {
            if (localStorage.getItem("invalid")) {
                localStorage.removeItem("token");
                localStorage.removeItem("invalid");
                this.props.props.props.history.push('/')
            }
            return <div>Loading...</div>
        }

        if (this.props.loadedWithErrors()) {
            return <div>Oh no! Something went wrong</div>
        }
        console.log("We have data", this.props.data)
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

                        {this.props.data.gitData.map(each => {
                            return (
                                <div>
                                    <OverallDisplay github={each} huntr={this.props.data.huntr}/>
                                    {/*<WeeklyDisplay github={each} huntr={this.props.data.huntr} />*/}
                                </div>
                            )
                        })}
                    </Table>
                </Container>
            </div>
        );
    }
}

export function loadDataAsProps({store, ownProps}) {
    const {dispatch} = store;

    const path = "/"; // Use the actual path when it's created as needed
    console.log(ownProps);
    return {
        // classdata: () => dispatch(queryAllMyData(path)),
        // students: () => dispatch(queryStudents()),
        data: () => dispatch(queryGithub())
    };
}


export default connectAsync({loadDataAsProps})(OverallData);
