import React, { Component } from 'react';
import './LeaderBoard.css';


class LeaderBoard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            students: [
                { name: "Maria Martinez", gitScore: 11, huntrScore: 13, Total: 72 },
                { name: "Jane Doe", gitScore: 10, huntrScore: 11, Total: 56 },
                { name: "John Smith", gitScore: 9, huntrScore: 10, Total: 44 },
                { name: "Joe Chan", gitScore: 8, huntrScore: 9, Total: 43 },
                { name: "Mike Moo", gitScore: 7, huntrScore: 10, Total: 41 },
            ]
            
         }
    }
    render() { 
        return ( 
            <div className="main-wrapper">
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
            </div>

            <div className="top-hired">54/96</div>
        </div>


        <div className="mid-row">
            <div className="mid-weekly"> 
                <h5>Weekly LeaderBoard</h5>
                <div className="mid-weekly__wrapper">
                    <div className="mid-title mid-top-title">
                        <div className="weekly__name">Name</div>
                        <div className="weekly__rest">Github</div>
                        <div className="weekly__rest">Huntr</div>
                        <div className="weekly__rest">Total</div>
                    </div>
                    <div className="mid-weekly__containers">
                        <div className="mid-weekly__nameContainer weekly__name">{
                           this.state.students.map((student, i) => {
                                return(
                                    <div className="mid-title title">
                                        <div className="weekly__name" key={i}>{student.name}</div>
                                        <div className="weekly__rest" key={i}>{student.gitScore}</div>
                                        <div className="weekly__rest"  key={i}>{student.huntrScore}</div>
                                        <div className="weekly__rest"  key={i}>{student.Total}</div>
                                    </div>
                                )
                           })
                        }</div>
                       
                    </div>
                </div>
            </div>


            <div className="mid-weekly">
                 <h5>Overall LeaderBoard</h5>
                 <div className="mid-weekly__wrapper">
                    <div className="mid-title">
                        <div className="weekly__name">Name</div>
                        <div className="weekly__rest">Github</div>
                        <div className="weekly__rest">Huntr</div>
                        <div className="weekly__rest">Total</div>
                    </div>
                    <div className="mid-weekly__containers">
                        <div className="mid-weekly__nameContainer weekly__name">name</div>
                        <div className="mid-weekly_githubContainer weekly__rest"></div>
                        <div className="mid-weekly__huntrContainer weekly__rest"></div>
                        <div className="mid-weekly__totalContainer weekly__rest"></div>
                    </div>
                </div>
            </div>
        </div>


        <div className="bottom-row">
            <div className="bottom-github">GITHUBLOGO:  Maria Martinez</div>
            <div className="bottom-huntr">HUNTR: Joe Chan</div>
        </div>


    </div>
         );
    }
}
 

export default LeaderBoard;