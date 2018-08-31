//________MODULES________
import React, { Component } from "react";
import {Link} from 'react-router-dom'

//________STYLING________
import "./MenuBar.css";
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react';

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
     <div>
      <div>
     <Sidebar.Pushable as={Segment}>
     <Sidebar as={Menu} animation='overlay' icon='labeled' inverted vertical visible width='thin'>
       <Menu.Item as='a'>
         <Icon name='home' />
         Home
       </Menu.Item>
       <Menu.Item as='a'>
         <Icon name='gamepad' />
         Games
       </Menu.Item>
       <Menu.Item as='a'>
         <Icon name='camera' />
         Channels
       </Menu.Item>
     </Sidebar>
 
     <Sidebar.Pusher>
       <Segment basic>
         <Header as='h3'>Application Content</Header>
         <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
       </Segment>
     </Sidebar.Pusher>
   </Sidebar.Pushable>
    </div>


      <div className="Menu-Bar">
          <Link to="/classlist">
              <div className="Menu-Item">Classes</div>

          </Link>
          <Link to="/billing">
              <div className="Menu-Item">Billing</div>
          </Link>
          <Link to="/settings">
              <div className="Menu-Item">Settings</div>
          </Link>
      </div>
      </div>
    );
  }
}

export default MenuBar;
