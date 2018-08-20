import React, {Component} from 'react';
import {connect} from "react-redux";
import {Dropdown, Menu} from 'semantic-ui-react'


class StudentsDisplay extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            modal_remove: false,
            modal_hired: false,
            // students: [
            //     {name :"ASmith"}, {name :"BSmith"}, {name :"CSmit"}, {name :"DSmith"}, {name :"ESmith"}, {name :"FSmith"}, {name :"GSmith"}, {name :"HSmith"}, {name :"ISmith"}, {name :"JSmit"}
            // ]
        };
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    toggleDelete = () => {
        console.log("Fired delete")
        // console.log(this.props.name.name)
        this.setState({
            modal_remove: !this.state.modal_remove
        });
    }
    toggleHired = () => {
        console.log("fired hired")
        // console.log(this.props.name.name)
        this.setState({
            modal_hired: !this.state.modal_hired
        });
    }
    delete = () => {

        console.log('delete ', this.props.name.name)
        this.setState({
            modal_remove: !this.state.modal_remove
        });
    }

    hired = () => {

        console.log('hired ', this.props.name.name)
        this.setState({
            modal_remove: !this.state.modal_hired
        });
    }
    cancel = () => {
        this.setState({
            modal_remove: !this.state.modal_remove
        })
    }
    rejected = () => {
        this.setState({
            modal_hired: !this.state.modal_hired
        })
    }
    testing = () => {
        console.log("testing 1")
    }
    testing2 = () => {
        console.log("Testin 2")
    }

    render() {
        const options = [
            {key: 1, text: 'Student Hired', value: 1},
            {key: 2, text: 'Remove Student', value: 2},
            // { key: 3, text: 'Choice 3', value: 3 },
        ]
        return (
            <div className="Toggle">
                {/*<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>*/}
                {/*<DropdownToggle caret>*/}
                {/*{this.props.student.firstname + ' ' + this.props.student.lastname}*/}
                {/*</DropdownToggle>*/}
                {/*<DropdownMenu>*/}
                {/*<DropdownItem header>Update Student</DropdownItem>*/}
                {/*/!*<DropdownItem disabled>Action</DropdownItem>*!/*/}
                {/*<DropdownItem color="danger" onClick={this.toggleDelete} >Remove Student</DropdownItem>*/}

                {/*<DropdownItem divider />*/}
                {/*<DropdownItem onClick={this.toggleHired} >Student Hired</DropdownItem>*/}
                {/*</DropdownMenu>*/}
                {/*</Dropdown>*/}
                {/**/}
                {/*<div className="ui selection dropdown">*/}
                {/*<input type="hidden" name="gender">*/}
                {/*<i className="dropdown icon"> </i>*/}
                {/*<div className="default text">{this.props.student.firstname + ' ' + this.props.student.lastname}</div>*/}
                {/*<div className="menu">*/}
                {/*<div className="item" data-value="1" onClick={this.toggleDelete} >Remove Student</div>*/}
                {/*<div className="item" data-value="0" onClick={this.toggleHired}>Student Hired</div>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*<Dropdown text={this.props.student.firstname + ' ' + this.props.student.lastname} simple item >*/}
                    {/*<Dropdown.Menu>*/}
                        {/*<Dropdown.Item text='Student Hired' />*/}

                        {/*<Dropdown.Divider/>*/}
                        {/*<Dropdown.Item text='Remove Student'/>*/}

                    {/*</Dropdown.Menu>*/}
                {/*</Dropdown>*/}
                <Menu >
                    <Dropdown text="Shawn Stewart">
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={this.testing} text="Student Hired" />
                            <Dropdown.Item onClick={this.testing2} text="Remove Student" />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu>
                {/**/}

                {/*<Modal isOpen={this.state.modal_remove} className={this.props.className}>*/}
                {/*/!*<ModalHeader toggle={this.toggleDelete} charCode="Y">Modal title</ModalHeader>*!/*/}
                {/*<ModalBody>*/}
                {/*Lorem ipsum REMOVED dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.*/}
                {/*</ModalBody>*/}
                {/*<ModalFooter>*/}
                {/*<Button color="primary" onClick={this.delete}>Delete Student</Button>{' '}*/}
                {/*<Button color="secondary" onClick={this.cancel}>Cancel</Button>*/}
                {/*</ModalFooter>*/}
                {/*</Modal>*/}

                {/*<Modal isOpen={this.state.modal_hired} className={this.props.className}>*/}
                {/*/!*<ModalHeader toggle={this.toggleDelete} charCode="Y">Modal title</ModalHeader>*!/*/}
                {/*<ModalBody>*/}
                {/*Lorem ipsum HIRED dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.*/}
                {/*</ModalBody>*/}
                {/*<ModalFooter>*/}
                {/*<Button color="primary" onClick={this.hired}>Hired Student</Button>{' '}*/}
                {/*<Button color="secondary" onClick={this.rejected}>Cancel</Button>*/}
                {/*</ModalFooter>*/}
                {/*</Modal>*/}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {}
}

export default StudentsDisplay
