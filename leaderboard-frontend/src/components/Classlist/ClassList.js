//________MODULES________
import React, {Component} from 'react'
import Fetch from './FetchData'
import {Link} from 'react-router-dom';
import {connectAsync} from "iguazu";
import {connect} from 'react-redux'
import {queryAllMyData, getClassesStudentsAction} from "../../actions";
//________STYLING________
import './ClassList.css'
import CardClass from "./CardClass";
import AddClass from "./AddClass";


//________DUMMY DATA________
// classes: [
//     { cName: "CS9", cPop: 52, cPart: 74.05, cHired: 22 },
//     { cName: "CS10", cPop: 72, cPart: 87.25, cHired: 44 },
//     { cName: "ML3", cPop: 13, cPart: 51.23, cHired: 7 }
// ],

// classes: props.classes,


function MyContainer({isLoading, loadedWithErrors, myData}) {
    if (isLoading()) {
        return <div>Loading...</div>
    }

    if (loadedWithErrors()) {
        return <div>Oh no! Something went wrong</div>
    }
    return (
        < ClassList myData={myData}/>
    )
}

//________CLASSLIST________
class ClassList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // classes: props.classes,
            classes: [],
            loading: true

            // classes: [
            //     {cName: "CS9", cPop: 52, cPart: 74.05, cHired: 22},
            //     {cName: "CS10", cPop: 72, cPart: 87.25, cHired: 44},
            //     {cName: "ML3", cPop: 13, cPart: 51.23, cHired: 7}
            // ],
        };
    }

    componentDidMount() {
        this.props.getClassesStudentsAction('/')
    }



    fetchData = () => {
        this.setState({loading: true})
        this.props.getClassesStudentsAction('/')
        // console.log(this.props)
        // connectAsync({loadDataAsProps})(MyContainer)
        // console.log(status)
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("nextState", nextState)
        console.log("nextProps", nextProps)
        if (this.props.allClasses !== nextProps.allClasses && nextProps.fetchClasses === true) {
            this.setState({classes: nextProps.allClasses, loading: false})
        }
    }


    render() {

        if (this.props.allClasses === null) {
            return <div>Loading...</div>
        }
        if (this.state.loading) {
            return <div>Loading...</div>
        }
        if (this.state.classes && this.state.loading === true) {
            return <div>Loading...</div>
        }
        if (this.state.classes && this.state.loading === false) {
            console.log(this.props.allClasses)
            return (
                <div className="APP__CLASSLIST">
                    {this.state.classes.map((myData, index) => {
                        return (
                            <div key={myData + index}>
                                <CardClass fetchData={this.fetchData} props={this.props.props.props} classname={myData.name}
                                           students={myData.students}/>
                            </div>
                        );
                    })}
                    <AddClass fetchData={this.fetchData} solo={"no"}/>

                </div>
            );
        } else {  // Highlight "Add a new class", if there are no classes
            return <AddClass fetchData={this.fetchData} solo={"yes"}/>
        }
    }
};

const mapStateToProps = state => {
    return {
        error: state.error,
        allClasses: state.allClasses,
        fetchClasses: state.fetchClasses
    }
}

//________EXPORT________
// export default ClassList;
export function loadDataAsProps({store, ownProps}) {
    const {dispatch, getState, subscribe} = store;
    const path = "/"; // Use the actual path when it's created as needed
    console.log(ownProps);
    return {
        myData: () => dispatch(queryAllMyData(path)),
        // classDataFunc: () => subscribe(getClassStudentsAction(path))
    };
}


// export default connectAsync({loadDataAsProps})(MyContainer);
export default connect(mapStateToProps , {getClassesStudentsAction })(ClassList)
