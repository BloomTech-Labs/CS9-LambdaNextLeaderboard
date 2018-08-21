import React, {Component} from 'react';
import {connect} from "react-redux";
import {Dropdown, Menu, Button, Modal} from 'semantic-ui-react'


class StudentsDisplay extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            modal_remove: false,
            modal_hired: false,
            open: false

            // students: [
            //     {name :"ASmith"}, {name :"BSmith"}, {name :"CSmit"}, {name :"DSmith"}, {name :"ESmith"}, {name :"FSmith"}, {name :"GSmith"}, {name :"HSmith"}, {name :"ISmith"}, {name :"JSmit"}
            // ]
        };
    }
    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
    }

    close = () => this.setState({ open: false })

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    toggleDelete = () => {
        console.log("Fired delete")
        // this.closeConfigShow(true, false)
        // console.log(this.props.name.name)
        // this.setState({
        //     modal_remove: !this.state.modal_remove
        // });
    }
    toggleHired = () => {
        console.log("fired hired")
        // console.log(this.props.name.name)
        this.closeConfigShow(true, false)
        // this.setState({
        //     modal_hired: !this.state.modal_hired
        // });
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
   

    render() {
        const { open, closeOnEscape, closeOnDimmerClick } = this.state
        return (
            <div className="Toggle">
                {/*<div style={{paddingBottom: "2%"}}>*/}
                    <h5 style={{ marginLeft: "1%"}} >StudentList</h5>

                {/*</div>*/}

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
                <Menu style={{marginTop: "10%",background: "#eeee", padding: "2%"}} >
                    <Dropdown text={this.props.student.firstname + ' ' + this.props.student.lastname}>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={this.closeConfigShow(true, false)} text="Student Hired" />
                            <Dropdown.Item onClick={this.closeConfigShow(true, false)} text="Remove Student" />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu>
                {/**/}
                {/*<Button onClick={this.closeConfigShow(false, true)}>No Close on Escape</Button>*/}
                {/*<Button onClick={this.closeConfigShow(true, false)}>No Close on Dimmer Click</Button>*/}
                <Modal
                    open={open}
                    closeOnEscape={closeOnEscape}
                    closeOnDimmerClick={closeOnDimmerClick}
                    onClose={this.close}
                >
                    <Modal.Header>Delete Your Account</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure you want to delete your account</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.close} negative>
                            No
                        </Button>
                        <Button
                            onClick={this.close}
                            positive
                            labelPosition='right'
                            icon='checkmark'
                            content='Yes'
                        />
                    </Modal.Actions>
                </Modal>

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
