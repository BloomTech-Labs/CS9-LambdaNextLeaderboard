import React from "react";

import { Link } from "react-router-dom";
import { Breadcrumb } from "semantic-ui-react";
import {connect} from 'react-redux'
import MenuBar from "../MenuBar/MenuBar";
import Settings from './Settings'
import './Setings.css'
import {getGithubDataAction} from "../../actions";
function SplitPane(props) {
    return (
        <div className="SplitPane2">
            <div className="SplitPane-left2">{props.left}</div>
            <div className="SplitPane-right2">{props.right}</div>
        </div>
    );
}

//Left Component
function LeftContent(props) {
    return (
        <div className="LeftContent2">
            <MenuBar />
        </div>
    );
}

//Right Component

function RightContent(props) {
    return (
        <div className="RightContent2">
                <Settings  />
        </div>
    );
}
const updateUser = (props) => {
    // render {

        return (
            <div className="main2" >
                <div className="Crumb">
                    <Breadcrumb  size="huge" >
                        <Breadcrumb.Section>
                            <Link to="/classlist">Home</Link>
                        </Breadcrumb.Section>
                        <Breadcrumb.Divider icon="right chevron" />
                        <Breadcrumb.Section active>Billing</Breadcrumb.Section>
                    </Breadcrumb>
                </div>

                <SplitPane left={<LeftContent/>} right={<RightContent/>} />
            </div>
        )
    // }

}
const mapStateToProps = state => {
    return {

    }
}
export default connect(mapStateToProps, {getGithubDataAction})(updateUser);
