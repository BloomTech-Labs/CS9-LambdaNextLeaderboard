import React, { Component } from "react";
// import './LeaderBoard.css';

import "../LeaderboardComponents/ActivityFeed";
import ActivityFeed from "../LeaderboardComponents/ActivityFeed";
// import WeeklyLeaderboard from '../LeaderboardComponents/WeeeklyLeaderboard';
import WeeklyData from "../LeaderboardComponents/WeeklyData";
// import OverallLeaderboard from '../LeaderboardComponents/OverallLeaderboard';
import OverallData from "../LeaderboardComponents/OverallData";
import { connectAsync } from "iguazu";
import { queryGithub, queryStudents } from "../../actions";

class LeaderBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // students: [
      //     { name: "Maria Martinez", gitScore: 11, huntrScore: 13, Total: 72 },
      //     { name: "Jane Doe", gitScore: 10, huntrScore: 11, Total: 56 },
      //     { name: "John Smith", gitScore: 9, huntrScore: 10, Total: 44 },
      //     { name: "Joe Chan", gitScore: 8, huntrScore: 9, Total: 43 },
      //     { name: "Mike Moo", gitScore: 7, huntrScore: 10, Total: 41 },
      // ]
    };
  }
  render() {
    if (localStorage.getItem("invalid")) {
      localStorage.removeItem("invalid");
      this.props.props.props.history.push("/");
    }

    if (this.props.isLoading()) {
      if (localStorage.getItem("invalid")) {
        localStorage.removeItem("token");
        localStorage.removeItem("invalid");
        this.props.props.props.history.push("/");
      }
      return <div>Loading...</div>;
    }

    if (this.props.loadedWithErrors()) {
      return <div>Oh no! Something went wrong</div>;
    }
    // let count = []
    const studentsObject = [];
    this.props.students.forEach((each, i) => {
      if (each.classname === this.props.match.params.classname) {
        studentsObject.push({
          each
        });
      }
    });
    const gitObject = [];
    this.props.data.gitData.forEach((git, x) => {
      studentsObject.forEach(student => {
        //GitHub sometimes returns a null value
        //This is due to some requests having a valid handle
        //but github fails to return the users data
        //the .then response is a null object
        //because it's a null object, git.FullName will crash the application
        //the quick solution is (git !== null)
        if (git !== null) {
          if (
            git.FullName ===
            student.each.firstname + " " + student.each.lastname
          ) {
            gitObject.push(git);
          }
        }
      });
    });
    if (gitObject.length === 0) {
      return (
        <div>
          <h1>No Students</h1>
        </div>
      );
    }
    return (
      <div className="App">
        <p />
        <div>
          <ActivityFeed />
        </div>
        <div>
          {/*<WeeklyLeaderboard />*/}
          <WeeklyData
            props={this.props}
            gitObject={gitObject}
            data={this.props.data}
            students={this.props.students}
          />
        </div>
        <div class="ui horizontal divider" />
        <div>
          {/*<OverallLeaderboard />*/}
          <OverallData
            props={this.props}
            gitObject={gitObject}
            data={this.props.data}
            students={this.props.students}
          />
        </div>
      </div>
    );
  }
}
export function loadDataAsProps({ store, ownProps }) {
  const { dispatch } = store;

  // const path = "/"; // Use the actual path when it's created as needed
  console.log(ownProps);
  return {
    // classdata: () => dispatch(queryAllMyData(path)),
    students: () => dispatch(queryStudents()),
    data: () => dispatch(queryGithub())
  };
}

export default connectAsync({ loadDataAsProps })(LeaderBoard);
