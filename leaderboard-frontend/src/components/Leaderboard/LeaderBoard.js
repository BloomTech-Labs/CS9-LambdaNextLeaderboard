import React, { Component } from "react";
import ActivityFeed from "./LeaderboardComponents/ActivityFeed";
import WeeklyLeaderboard from "./LeaderboardComponents/WeeeklyLeaderboard";
import OverallLeaderboard from "./LeaderboardComponents/OverallLeaderboard";

class LeaderBoard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <p />
        <div>
          <ActivityFeed />
        </div>
        <div>
          <WeeklyLeaderboard />
        </div>
        <div class="ui horizontal divider" />
        <div>
          <OverallLeaderboard />
        </div>
      </div>
    );
  }
}

export default LeaderBoard;
