//________MODULES________
import React, {Component} from 'react'
import Fetch from './FetchData'
import {Link} from 'react-router-dom';
import {connectAsync} from "iguazu";
import {queryAllMyData} from "../../actions";
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

//________CLASSLIST________
class ClassList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // classes: props.classes,
            random: false,

            // classes: [
            //     {cName: "CS9", cPop: 52, cPart: 74.05, cHired: 22},
            //     {cName: "CS10", cPop: 72, cPart: 87.25, cHired: 44},
            //     {cName: "ML3", cPop: 13, cPart: 51.23, cHired: 7}
            // ],
        };
    }
    componentWillUpdate = nextProps => {
        console.log(nextProps)
    }



    render() {
        console.log(this.props)
        if (this.props.isLoading()) {
            return <div>Loading...</div>
        }

        if (this.props.loadedWithErrors()) {
            return <div>Oh no! Something went wrong</div>
        }

        if (this.props.myData) {
            return (
                <div className="APP__CLASSLIST">
                    {/*Map through classes and make a card for each one.*/}
                    {this.props.myData.map((myData, index) => {
                        return (
                            <div key={myData + index}>
                                {/*<ClassCard classID={cID} />*/}
                                <CardClass props={this.props.props.props} classname={myData.name} students={myData.students}/>
                            </div>
                        );
                    })}
                    {/* Button to add a new class */}
                    <AddClass solo={"no"} />
                    {/*<div className="APP__ADDCLASS__CARD">*/}
                    {/*/!*<AddClass />*!/*/}
                    {/*<p>Add a new class</p>*/}
                    {/*<button className="APP__ADDCLASS_ADDBUTTON">+</button>*/}
                    {/*</div>*/}
                </div>
            );
        } else {  // Highlight "Add a new class", if there are no classes
            return <AddClass solo={"yes"}/>
        }
    }
};



//________EXPORT________
// export default ClassList;
export function loadDataAsProps({store, ownProps}) {
    const {dispatch, getState} = store;
    // console.log('ownProps', ownProps.props.props.match.path)
    // const path = ownProps.props.props.match.path
    const path = "/"; // Use the actual path when it's created as needed
    //Have to pass props to Splitpane, then to Right Component (StudentDisplay), causing
    // the need for ownProps.props.props....
    console.log(ownProps);
    return {
        myData: () => dispatch(queryAllMyData(path)),
        classData: () => dispatch(queryAllMyData(getState().path))
        // classData: () => dispatch(getState().queryAllMyData(path))
        // logOut: () => dispatch
        // updateNote: (obj, history) => dispatch(updateNote(obj, history))
    };
}

export default connectAsync({loadDataAsProps})(ClassList);
