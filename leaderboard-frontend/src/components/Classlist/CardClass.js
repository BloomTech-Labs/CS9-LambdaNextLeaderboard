import React, {Component} from 'react'
import {Link} from "react-router-dom";
import {connect} from 'react-redux'
import {redirectDataClass} from '../../actions'
import './ClassList.css'
import { Button, Segment } from 'semantic-ui-react'
class CardClass extends Component {
    constructor(props) {
        super(props)
    }
    redirectEdit = () => {
        console.log(this.props.props.history)
        this.props.props.history.push(`/classlist/${this.props.classname}`)
        this.props.redirectDataClass()

    }
    redirectLeaderboard = () => {

    }

    render() {
        let countHired = 0;
        let notHired = 0;
        for (let i = 0; this.props.students.length > i; i++) {
            // console.log(this.props.students[i].hired.toString())
            if (this.props.students[i].hired.toString() === 'true') {
                countHired += 1;
            }
            if (this.props.students[i].hired.toString() === 'false') {
                notHired += 1;
            }
        }
        return (
            <div className="APP__CLASSCARD">
                <h5 >{this.props.classname}</h5>
                <p >Students: {this.props.students.length}</p>
                <p >Participation (Total): {}%</p>
                <p >Hired: {countHired}, Not Hired: {notHired}</p>
                <Button className="BtnEdit" onClick={this.redirectEdit}  inverted color='blue'>
                    Edit
                </Button>
                {/*<button className="BtnEdit" onClick={this.redirectEdit} >Edit</button>*/}
                <Button className="BtnLeaderboard" onClick={this.redirectLeaderboard} inverted color='yellow'>
                    Leaderboard
                </Button>
                {/*<button className="BtnLeaderboard" onClick={this.redirectLeaderboard}>Leaderboard</button>*/}
            </div>
        );
    }
}
const mapStateToProps = state => {
    errors: state.errors
}
export default connect(mapStateToProps, {redirectDataClass})(CardClass)
