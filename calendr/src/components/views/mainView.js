<<<<<<< HEAD
import React from "react";
// import MainNavBar from '../general/MainNavBar';
import Users from "../general/Users";
import Home from "../homePage/home/Home";
import Template from "../homePage/template/Template";
import { Route } from "react-router-dom";
import Group from "../homePage/group/Group";
import Event from "../homePage/event/Event";
// import moment from 'moment'
import GeneralCalendar from "../calendar/GeneralCalendar";
=======
import React from 'react';
// import MainNavBar from '../general/MainNavBar';
import Users from '../general/Users';
import Home from '../homePage/home/Home';
import MemberHome from '../homePage/member/MemberHome'
import Template from '../homePage/template/Template';
import TemplateEdit from '../homePage/template/TemplateEdit';
import { Route } from 'react-router-dom';
import Group from '../homePage/group/Group';
import Event from '../homePage/event/Event';
// import moment from 'moment'
import GeneralCalendar from '../calendar/GeneralCalendar';
>>>>>>> ad986b21826ffaee2870ecba59a0d56e58d7d6c6

class mainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Route
          path="/"
          exact
          render={(...props) => <Group logOff={this.props.logOff} {...props} />}
        />

        <Route
          path="/home"
          exact
          render={(...props) => <Home logOff={this.props.logOff} {...props} />}
        />

<<<<<<< HEAD
        <Route path="/users" component={Users} />
        <Route path="/template" component={Template} />
        <Route path="/event/" component={GeneralCalendar} />
        <Route path="/event/:date" component={Event} />
=======
       <Route path = "/memberhome" exact render = {(...props) => (<MemberHome 
            {...props} 
            />)}/>

       <Route path="/users" component={Users} />
       <Route exact path="/template" component={Template} />
       <Route path="/template/edit/:id" component={TemplateEdit} />
       <Route path="/event/" component={GeneralCalendar} />
       <Route path="/event/:date" component={Event} />
>>>>>>> ad986b21826ffaee2870ecba59a0d56e58d7d6c6
      </div>
    );
  }
}

export default mainView;
