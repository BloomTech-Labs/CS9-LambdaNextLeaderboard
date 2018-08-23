import React, { Component } from 'react';
import './ActivityFeed.css'

class ActivityFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="top-row">
                 <div className="top-cohort">CS24</div>

                <div className="top-activityFeed">
                    <h5>Activity Feed</h5> <br/>
                    Jone Doe applied a job! Number 6 this week and 17 total! <br/>
                    John Smith scheduled a phone interview! <br/>
                    Maria Martinez contributed to guthub! <br/>
                    Joe Chan got a job! <br/>
                    Jone Doe applied a job! Number 6 this week and 17 total! <br/>
                    John Smith scheduled a phone interview! <br/>
                    Jone Doe applied a job! Number 6 this week and 17 total! <br/>
                    John Smith scheduled a phone interview! <br/>
                    Maria Martinez contributed to guthub! <br/>
                    Joe Chan got a job! <br/>
                    Jone Doe applied a job! Number 6 this week and 17 total! <br/>
                    John Smith scheduled a phone interview! <br/>
                </div>

                <div className="top-hired">54/96</div>
                            </div>
         );
    }
}
 
export default ActivityFeed;