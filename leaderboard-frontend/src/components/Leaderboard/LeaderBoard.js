import React, {Component} from 'react';
import './LeaderBoard.css';
import '../LeaderboardComponents/ActivityFeed'
import ActivityFeed from "../LeaderboardComponents/ActivityFeed";
import WeeklyLeaderboard from '../LeaderboardComponents/WeeeklyLeaderboard';
import OverallLeaderboard from '../LeaderboardComponents/OverallLeaderboard';
import HotRightNow from '../LeaderboardComponents/HotRightNow';
import {connectAsync} from 'iguazu';
import {queryAllMyData, queryGithub, queryStudents} from '../../actions'

class LeaderBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [
                {name: "Maria Martinez", gitScore: 11, huntrScore: 13, Total: 72},
                {name: "Jane Doe", gitScore: 10, huntrScore: 11, Total: 56},
                {name: "John Smith", gitScore: 9, huntrScore: 10, Total: 44},
                {name: "Joe Chan", gitScore: 8, huntrScore: 9, Total: 43},
                {name: "Mike Moo", gitScore: 7, huntrScore: 10, Total: 41},
            ],
            loading: true,
            githubPush: 0,
            forkCount: 0,
            pullRequestCount: 0,
            createCount: 0
        }
    }
    handleTest = () => {
        console.log(this.props.classdata);
        console.log(this.props.students);
        console.log(this.props.github);
        console.log(this.state.githubPush, this.state.forkCount,this.state.pullRequestCount ,this.state.createCount)

    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.github && this.state.loading) {
            let pushCount = 0;
            let forkCount = 0;
            let pullRequestCount = 0;
            let createCount = 0;
            nextProps.github.stats.forEach((typed, i) => {
                if (typed === 'PushEvent') {
                    pushCount++
                } else if (typed === 'ForkEvent') {
                    forkCount++
                } else if (typed === 'PullRequestEvent') {
                    pullRequestCount++
                } else if (typed === 'CreateEvent') {
                    createCount++
                } else {

                }
                // return
                console.log({'pushCount': pushCount, 'forkCount': forkCount, 'pullRequestCount': pullRequestCount, 'createCount': createCount})
            })
            this.setState({
                loading: false,
                githubPush: pushCount,
                forkCount: forkCount,
                pullRequestCount: pullRequestCount,
                createCount: createCount
            })
        }
    }


    render() {
        if (localStorage.getItem("invalid")) {
            localStorage.removeItem("invalid");
            this.props.props.props.history.push('/')
        }

        if (this.props.isLoading()) {
            if (localStorage.getItem("invalid")) {
                localStorage.removeItem("token");
                localStorage.removeItem("invalid");
                this.props.props.props.history.push('/')
            }
            return <div>Loading...</div>
        }

        if (this.props.loadedWithErrors()) {
            return <div>Oh no! Something went wrong</div>
        }
        return (
            <div className="main-wrapper">
                <button onClick={this.handleTest}>Fire test</button>
                <ActivityFeed/>
                <div className="mid-row">
                    <WeeklyLeaderboard stats={this.state.githubPush} />
                    <OverallLeaderboard/>
                </div>
                <HotRightNow/>
            </div>
        );
    }
}


export function loadDataAsProps({store, ownProps}) {
    const {dispatch, getState, subscribe} = store;
    const path = "/"; // Use the actual path when it's created as needed
    console.log(ownProps);
    return {
        classdata: () => dispatch(queryAllMyData(path)),
        students: () => dispatch(queryStudents()),
        github: () => dispatch(queryGithub())
    };
}

export default connectAsync({loadDataAsProps})(LeaderBoard);
