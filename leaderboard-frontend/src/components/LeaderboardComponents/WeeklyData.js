import React, {Component} from 'react';
import {connectAsync} from 'iguazu';
import {queryAllMyData, queryGithub, queryStudents} from "../../actions";
import {Container, Table} from "semantic-ui-react";


class WeeklyData extends Component {

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

                        <Table.Body>

                        </Table.Body>
                    </Table>
                </Container>
            </div>
        );
    }
}
export function loadDataAsProps({store, ownProps}) {
    const {dispatch } = store;

    const path = "/"; // Use the actual path when it's created as needed
    console.log(ownProps);
    return {
        classdata: () => dispatch(queryAllMyData(path)),
        students: () => dispatch(queryStudents()),
        github: () => dispatch(queryGithub())
    };
}


export default connectAsync({loadDataAsProps})(ClassList);
