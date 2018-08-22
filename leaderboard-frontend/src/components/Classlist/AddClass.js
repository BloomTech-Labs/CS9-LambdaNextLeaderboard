import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {addClass} from "../../actions";

'./ClassList.css'

class AddClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addNew: false,
            class_name: ''
        }
    }
    handleInput = e => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
        console.log(this.state.class_name)
    }
    handleSubmit = () => {
        const obj = {
            name: this.state.class_name.toUpperCase()
        }
        console.log(this.state.class_name)
        this.props.addClass(obj)
        this.setState({addNew: false, class_name: ''})
    }
    addNew = () => {
        this.setState({addNew: true})
    }

    render() {
        if (this.props.solo === "no" && this.state.addNew === false) {
            return (
                <div className="APP__ADDCLASS__CARD">
                    {/*<AddClass />*/}
                    <p>Add a new class</p>
                    <button onClick={this.addNew} className="APP__ADDCLASS_ADDBUTTON">+</button>
                </div>
            )
        } else if (this.props.solo === "no" && this.state.addNew === true) {
          return  (<div className="APP__ADDCLASS__CARD">
                <p>Enter new class name</p>
                    <input
                        type="text"
                        placeholder="Enter classname"
                        name="class_name"
                        className="Add_Input"
                        value={this.state.class_name}
                        onChange={this.handleInput}
                    />
                <button onClick={this.handleSubmit} className="Add_Submit">Submit</button>
            </div>)
        }
        else
            return (
                <div>

                    <div className="APP__ADDCLASS__SOLO">
                        <button className="APP__ADDCLASS_ADDBUTTON">+</button>
                    </div>
                </div>
            );
    }

}
const mapStateToProps = state => {
    return {
        error: state.error
    }
}
export default connect(mapStateToProps, {addClass})(AddClass)
