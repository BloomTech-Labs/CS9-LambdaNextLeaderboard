//These imports are mandatory for all components created under ./subComponents
//If these aren't imported, than it'll break, as you're usin React, and SplitPane
// import { SplitPane } from "../../index";
import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "semantic-ui-react";

// import from './CreateEditClass.css'
import "./index.css";

//Components to be combined together for the specific framework, such as Leaderboard
import MenuBar from "../MenuBar/MenuBar";
// import LandingPage from "../LandingPage";
// import ClassCreateEdit from "./ClassCreateEdit";
import ClassList from "./ClassList";

function SplitPane(props) {
    return (
        <div className="SplitPane">
            <div className="SplitPane-left">{props.left}</div>
            <div className="SplitPane-right">{props.right}</div>
        </div>
    );
}

//Left Component
function LeftContent() {
    return (
        <div className="LeftContent" style={{ height: "100%" }}>
            <MenuBar />
        </div>
    );
}

//Right Component
function RightContent(props) {
    return (
        <div className="RightContent" style={{ height: "100%" }}>
            <ClassList/>
            {/*<div style={{ height: "52%" }}>*/}
                {/*<ClassCreateEdit props={props} />*/}
            {/*</div>*/}

            {/*<div className="ClassList" style={{ height: "48%" }}>*/}
                {/*<StudentList props={props} />*/}
            {/*</div>*/}
        </div>
    );
}

//These styles can go into a CSS file, such as HomeTemplate.css
//I did them this way because it's faster
const ClassList2 = props => {
    return (
        <div style={{ height: "100%" }}>
            <Breadcrumb size="large" style={{ height: "3%", marginLeft: "1%" }}>
                <Breadcrumb.Section href="/" link>
                    Home
                </Breadcrumb.Section>
                <Breadcrumb.Divider icon="right chevron" />
                <Breadcrumb.Section href="/classlist" link>
                    Classes
                </Breadcrumb.Section>
                <Breadcrumb.Divider icon="right chevron" />
                <Breadcrumb.Section active>Create or Edit Class</Breadcrumb.Section>
            </Breadcrumb>
            {/*<div style={linkBox} >*/}
            {/*<Link style={{marginRight: '8%', textDecoration: 'none' }} to="/class">*/}

            {/*Classes*/}
            {/*</Link>*/}
            {/*<Link style={{marginRight: '8%', textDecoration: 'none' }} to="/">*/}
            {/*Home*/}
            {/*</Link>*/}
            {/*<Link style={{marginRight: '8%', textDecoration: 'none' }} to="/signout">*/}
            {/*Sign Out*/}
            {/*</Link>*/}
            {/*</div>*/}
            {/*</div>*/}
            {/*<ClassCreateEdit/>*/}
            <SplitPane
                left={<LeftContent />}
                right={<RightContent props={props} />}
            />
        </div>
    );
};
export default ClassList2;
