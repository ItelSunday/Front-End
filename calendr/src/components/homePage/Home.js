import React, { Component } from 'react'
import "./Home.css"
import { Link } from 'react-router-dom'
import SideBar from './SideBar'
import GeneralCalendar from '../calendar/GeneralCalendar';
import MainNavBar from '../general/MainNavBar'

export class Home extends Component {
  render() {
    return (
      <div>
        <MainNavBar/>
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