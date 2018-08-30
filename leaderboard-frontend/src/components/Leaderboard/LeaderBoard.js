import React, {Component} from 'react';
// import './LeaderBoard.css';

import '../LeaderboardComponents/ActivityFeed'
import ActivityFeed from '../LeaderboardComponents/ActivityFeed';
import WeeklyLeaderboard from '../LeaderboardComponents/WeeeklyLeaderboard';
import WeeklyData from '../LeaderboardComponents/WeeklyData'
import OverallLeaderboard from '../LeaderboardComponents/OverallLeaderboard';
import OverallData from "../LeaderboardComponents/OverallData";

class LeaderBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // students: [
            //     { name: "Maria Martinez", gitScore: 11, huntrScore: 13, Total: 72 },
            //     { name: "Jane Doe", gitScore: 10, huntrScore: 11, Total: 56 },
            //     { name: "John Smith", gitScore: 9, huntrScore: 10, Total: 44 },
            //     { name: "Joe Chan", gitScore: 8, huntrScore: 9, Total: 43 },
            //     { name: "Mike Moo", gitScore: 7, huntrScore: 10, Total: 41 },
            // ]
         }
    }
    render() {
        return (
            <div className="App">
              <p></p>
              <div>
                <ActivityFeed />
              </div>
              <div>
                {/*<WeeklyLeaderboard />*/}
                <WeeklyData props={this.props} />
              </div>
              <div class="ui horizontal divider"></div>
              <div>
                {/*<OverallLeaderboard />*/}
                <OverallData props={this.props}/>
              </div>

            </div>
          );
    }
}

export default LeaderBoard;
