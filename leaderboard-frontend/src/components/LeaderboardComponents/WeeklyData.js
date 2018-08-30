import React, {Component} from 'react';
import {connectAsync} from 'iguazu';
import {queryAllMyData, queryGithub, queryStudents} from "../../actions";
import {Container, Table} from "semantic-ui-react";
import WeeklyDisplay from "./WeeklyDisplay";


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
        console.log("We have data", this.props.props.match.params.classname)
        let count = []
        const studentsObject = [];
        this.props.students.forEach((each, i) => {
            if (each.classname === this.props.props.match.params.classname) {
                studentsObject.push({
                    each
                })
            }

        })
        const gitObject = [];
        this.props.data.gitData.forEach((git, x) => {
            studentsObject.forEach(student => {
                if (git.FullName === student.each.firstname + ' ' + student.each.lastname) {
                    gitObject.push(git)
                }
            })
        })
        if (gitObject.length === 0) {
            return (
                <div>
                    <h1>No Students</h1>
                </div>
            )
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
                            {gitObject.map((each, x) => {
                                this.props.data.huntr.forEach(hunt => {
                                    if (each.FullName === hunt.givenNameArr + ' ' + hunt.familyName) {
                                        count[x] = hunt.count;
                                    }
                                })
                               return (
                                   <div>
                                       <WeeklyDisplay github={each} count={count[x]} huntr={this.props.data.huntr} />
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
        students: () => dispatch(queryStudents()),
        data: () => dispatch(queryGithub())
    };
}


export default connectAsync({loadDataAsProps})(WeeklyData);
