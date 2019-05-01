import React, { Component } from 'react'
import "./Home.css"
import { Link } from 'react-router-dom'
import SideBar from './SideBar'
import Month from '../calendar/Month';
import GeneralCalendar from '../calendar/GeneralCalendar';

export class Home extends Component {
  render() {
    return (
      <div>
        <SideBar/>
        <Link className="buttonLink" to="/template">
        <button className="firstTemplateButton">Create your first template</button>
        </Link>
        <GeneralCalendar />
      </div>
    )
  }
}

export default Home