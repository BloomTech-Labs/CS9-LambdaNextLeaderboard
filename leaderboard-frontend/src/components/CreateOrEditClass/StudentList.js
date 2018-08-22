import React, { Component } from "react";
// import {connect} from "react-redux";
import { connectAsync } from "iguazu";
import { getClassStudentsAction, queryMyData } from "../../actions";

import "./StudentList.css";
import StudentsDisplay from "./StudentsDisplay";


class StudentList extends Component {
  constructor(props) {
    super(props);
  }

    componentDidMount() {
        if (localStorage.getItem("invalid")) {
            this.props.props.props.history.push('/')
        }
    }

    render() {
    if (this.props.isLoading()) {
      return <div>Loading...</div>;
    }

    if (this.props.loadedWithErrors()) {
      return <div>Oh no! Something went wrong</div>;
    }
    const classlist_students = this.props.myData;
    return (
      <div className="main">
        <h5 style={{ marginLeft: "1%" }}>StudentList</h5>
        {classlist_students.students.map((student_data, i) => {
          return (
            <StudentsDisplay
              key={student_data + i}
              student={student_data}
              class={classlist_students.className}
            />
          );
        })}
      </div>
    );
  }
}


function loadDataAsProps({ store, ownProps }) {
  const { dispatch, getState } = store;
  // console.log('ownProps', ownProps.props.props.match.path)
  let path = ownProps.props.props.match.params.name

  console.log('path', path);
  return {
    myData: () => dispatch(queryMyData(path))
  };
}

export default connectAsync({ loadDataAsProps })(StudentList);
