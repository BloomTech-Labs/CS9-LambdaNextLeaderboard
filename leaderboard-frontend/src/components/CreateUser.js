import React from 'react';
import { createUserAction } from '../actions/actions';
import { connect } from 'react-redux';
const mainStyle = {
    textAlign: 'center',
}
class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            usernameconfirm: '',
            password: '',
            passwordconfirm: '',
            message: '',
            delmessage: "Delete User",
            sentConfirm: false,
            sentFailedMessage: ''
        }

    };
    componentDidMount = () => {

    }

    componentWillUpdate = (nextProps) => {
        if (this.state.sentConfirm === true) {
            
            // console.log("Props for check update", this.props.updateCheck, nextProps.updateCheck);
            // console.log("message and sentconfirm", this.state.message, this.state.sentConfirm);
        } 
        if (this.state.sentConfirm === true && nextProps.updateCheck === true) {
            // console.log("Redirect")
            this.setState({sentConfirm : false});
            this.props.history.push('/login')
        
    }
    if (this.state.sentConfirm === true && this.props.updateCheck === false) { 
        this.setState({sentFailedMessage: "Update failed because the username has already been taken, please try a different username"})

        this.setState({sentConfirm : false});
    }
    }
    newCredentials = () => {
        let username = this.state.username;
        let password = this.state.password;
        const newObject = {
            username: username.toLowerCase().toString(),
            password: password,
            password: this.state.passwordconfirm, 
        };
        // The server is setup to get 2 passwords for registry.
        //It should only need one password, it's better to check in the client if they match.
        this.setState({ username: '',usernameconfirm: '' , password: '', passwordconfirm: '' });
        this.setState({ sentConfirm: true });
        this.props.createUserAction(newObject);
    }
    checkCredentials = () => {
        if (this.state.password === this.state.passwordconfirm && this.state.username === this.state.usernameconfirm && this.state.username !== '' && this.state.password !== '') {
            this.newCredentials();
        } else {
            this.setState({ username: '', password: '', passwordconfirm: '', username: '', usernameconfirm: '', message: "Update Failed, due to mismatch password or username, try again" });
        }
    }
    handleInput = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    render() {
        return (
            <div style={mainStyle} >
                <h3>CreateUser Component</h3>
                {this.state.message === '' ? <div></div> : <h3>{this.state.message}</h3>}
                {(this.props.updateCheck === false && this.state.sentConfirm === true) ? <div> <h3>Update failed because the username has already been taken, please try a different username</h3> </div>:<div></div>  }
                <form>
                    <input
                        type="text"
                        placeholder="Enter new username"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleInput}
                    />
                    <input
                        type="text"
                        placeholder="Confirm new username"
                        name="usernameconfirm"
                        value={this.state.usernameconfirm}
                        onChange={this.handleInput}
                    />
                    <input
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInput}
                    />
                    <input
                        type="password"
                        name="passwordconfirm"
                        placeholder="Confirm Password"
                        value={this.state.passwordconfirm}
                        onChange={this.handleInput}
                    />
                </form>
                <div>

                    <button onClick={this.checkCredentials} >Submit </button>
                </div>
            </div>
        )
    }

}
const mapStateToProps = state => {
    return {
        user: state.user,
        updateReceived: state.updateReceived,
        updateCheck: state.updateCheck,
        error: state.error
    }
}

export default connect(mapStateToProps, { createUserAction })(CreateUser)