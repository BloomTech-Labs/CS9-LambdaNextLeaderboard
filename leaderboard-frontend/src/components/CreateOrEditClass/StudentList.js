import React, {Component} from 'react';
// import {connect} from "react-redux";
import {connectAsync} from 'iguazu'
import {getClassStudentsAction, queryMyData} from "../../actions";

import  './StudentList.css'
import StudentsDisplay from "./StudentsDisplay";

//These are the builtin functions for iguazu
// function MyContainer({ isLoading, loadedWithErrors, myData }) {
//     if (isLoading()) {
//         return <div>Loading...</div>
//     }
//
//     if (loadedWithErrors()) {
//         return <div>Oh no! Something went wrong</div>
//     }
//     return (
//         <div>
//             < StudentList classlist_students={myData} />
//         </div>
//     )
// }

class StudentList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.isLoading()) {
            return <div>Loading...</div>
        }

        if (this.props.loadedWithErrors()) {
            return <div>Oh no! Something went wrong</div>
        }
        const classlist_students = this.props.myData
        return (
            <div className="main"  >
                {classlist_students.students.map((student_data, i) => {
                   return <StudentsDisplay key={student_data + i} student={student_data} class={classlist_students.className} />
                })}
            </div>
        );
    }
}

//
// const mapStateToProps = state => {
//     return {
//         classlist_students: state.classlist_students
//     }
// }
//
//
// // export default StudentList
// export default connect(mapStateToProps, {getClassStudentsAction})(StudentList)

function loadDataAsProps({ store, ownProps }) {
    const { dispatch, getState } = store;
    // console.log('ownProps', ownProps.props.props.match.path)
    // const path = ownProps.props.props.match.path
    const path = "CS9" // Use the actual path when it's created as needed
    //Have to pass props to Splitpane, then to Right Component (StudentDisplay), causing
    // the need for ownProps.props.props....
    console.log(ownProps)
    return {
        myData: () => dispatch(queryMyData(path))
        // updateNote: (obj, history) => dispatch(updateNote(obj, history))
    }
}

export default connectAsync({loadDataAsProps})(StudentList);
