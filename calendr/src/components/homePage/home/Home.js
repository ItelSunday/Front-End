import React, { Component } from 'react'
import "./Home.scss"
import { Link } from 'react-router-dom'
import SideBar from '../SideBar'
import MainNavBar from '../../general/MainNavBar'
import axios from 'axios'

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {  
       value:false,
      templates: []
    }
  }

  componentDidMount(){
    this.getTemplate()
  }

  getTemplate = event => {
    let group_id = localStorage.getItem("group_id")
    console.log(group_id)
    axios
      .get(`http://localhost:3300/groups/${group_id}/templates` )
      .then(res => {
        console.log(res.data);
        this.setState({
          templates: res.data
        })
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    if(this.state.templates.length < 1){
    return (
      <div>
        <MainNavBar logOff = {this.props.logOff}/>
        <SideBar/>
        <Link className="buttonLink" to="/template">
        <button className="firstTemplateButton">Create your first template</button>
        </Link>
      </div>
    )
    }else{
      return(
        <div className="populatedTemplatePage">
          <MainNavBar logOff = {this.props.logOff}/>
          <SideBar/>
          <div className="allTemplates">
           {this.state.templates.map((template, index) => {
            return <div className="templateTag">
                    <div>
                      <h2 className="templateTitleTag" key = {index}>{template.title}</h2>
                      <i className="far fa-edit"/>
                      <i class="fas fa-trash"/>
                    </div>  
                    <h3 className="templateDescription">Description</h3>
                    <p className="templateDescriptionTag">{template.description}</p>
                  </div>
          })}</div>

        </div>
      )
    }
  }
}

export default Home