import React, { Component } from 'react';
import './HotRightNow.css'

class WeeklyLeaderboard extends Component {
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
            <div className="mid-weekly">
                <h5>Weekly LeaderBoard</h5>
                <div className="mid-weekly__wrapper">
                    <div className="mid-title mid-top-title">
                        <div className="mid-weekly__name">Name</div>
                        <div className="mid-weekly__rest mid-title-name">Github</div>
                        <div className="mid-weekly__rest mid-title-name">Huntr</div>
                        <div className="mid-weekly__rest mid-title-name">Total</div>
                    </div>
                    <div className="mid-weekly__containers">
                        <div className="mid-weekly__nameContainer mid-weekly__name">{
                           this.state.students.map((student, i) => {
                                return(
                                    <div className="mid-title title">
                                        <div className="mid-weekly__name mid-list" key={i}>{student.name}</div>
                                        <div className="mid-weekly__rest mid-list" key={i}>{this.props.stats}</div>
                                        <div className="mid-weekly__rest mid-list"  key={i}>{student.huntrScore}</div>
                                        <div className="mid-weekly__rest mid-list"  key={i}>{student.Total}</div>
                                    </div>
                                )
                           })
                        }</div>

                    </div>
                </div>
            </div>
         );
    }
}

export default WeeklyLeaderboard;
