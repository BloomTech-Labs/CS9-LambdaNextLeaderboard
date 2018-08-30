import React, {Component} from 'react';
import "./Setings.css"

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            message: null
        }
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    handleSave = () => {
        console.log('Saved', this.state)
    }
    checkCredentials = () => {

        if (this.state.newPassword === this.state.confirmPassword &&  this.state.password !== '') {
            this.handleSave();
        } else {
            this.setState({email: '', oldPassword: '', newPassword: '', confirmPassword: '', message: "Update Failed, due to mismatch password, try again" });
        }
    }

    render() {
        return (
            <div className="InputWrapper">
                {this.state.message ? <h1>{this.state.message}</h1> : <div></div>}
                <div>
                    <div>
                        <div>
                            <h3 className="headerField">Username/Email:</h3>
                            <input
                                type="text"
                                name="email"
                                className="inputVal"
                                placeholder="user@gmail.com"
                                value={this.state.email}
                                onChange={this.handleInput}
                                align="right"
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <h3 className="headerField">Old Password:</h3>
                            <input
                                type="text"
                                name="oldPassword"
                                className="inputVal"
                                placeholder="******"
                                value={this.state.oldPassword}
                                onChange={this.handleInput}
                                align="right"
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <h3 className="headerField">New Password:</h3>
                            <input
                                type="text"
                                name="newPassword"
                                className="inputVal"
                                placeholder="*******"
                                value={this.state.newPassword}
                                onChange={this.handleInput}
                                align="right"
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <h3 className="headerField">Confirm Password:</h3>
                            <input
                                type="text"
                                name="confirmPassword"
                                className="inputVal"
                                placeholder="*******"
                                value={this.state.confirmPassword}
                                onChange={this.handleInput}
                                align="right"
                            />
                        </div>
                    </div>
                </div>

                <button className="BtnSave" onClick={this.checkCredentials}>Save</button>
            </div>
        );
    }
}

export default Settings
