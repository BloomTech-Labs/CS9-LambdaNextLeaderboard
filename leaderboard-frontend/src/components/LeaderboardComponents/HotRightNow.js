import React, { Component } from 'react';
import github from './img/github.svg';
import hotlogo from './img/hunter.png'

class HotRightNow extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
                <div className="bottom-row">
                    <div className="bottom-github"> <img src={github} height="100rem" alt="github logo"/>  Maria Martinez</div>
                    <div className="bottom-huntr"><img src={hotlogo} height="100rem" alt="huntr logo"/> Joe Chan</div>
                </div>
         );
    }
}
 
export default HotRightNow;