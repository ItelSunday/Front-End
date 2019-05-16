import React, { Component } from 'react'
import axios from 'axios';
import Popup from 'reactjs-popup';
import GroupEdit from './group/GroupEdit'
import { withRouter } from 'react-router-dom';


export class MainSideBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      groupName: [],
      joinCode: [],
      group_id:[],
      modalOpen: false,
      templates:[]
    }
  }

  componentDidMount(){
    this.getGroup();
    // if(this.state.groupName.length < 0){
    //   window.location = '/'
    // }else{
    //   window.location = '/home'
    // }
  }
  
  getGroup = () => {
    let userId = localStorage.getItem('userId')
    axios.get(`${process.env.REACT_APP_API}/users/${userId}/groups`)
    .then(res => {
      this.setState({
        group_id:res.data[0].id,
        groupName: res.data[0].name,
        joinCode: res.data[0].joinCode,
      })

      
      window.localStorage.setItem("group_id", this.state.group_id)
    })
    .catch(err => {
      console.error(err)
    })
  }

  circleAddTemplate = () => {
    window.location = '/template'
  }

  toggleModal = () => {
    if(this.state.modalOpen === false){
      this.setState({
        modalOpen: true,
      })
    }else{
      this.setState({
        modalOpen:false
      })
    }
  }

  toggleSelectedTemplates = () => {
    if(null){

    }else{

    }
  }

  // takeMeToTemplate = (event) => {
  // let mikesEasy = event.target.attributes.value.value
  // console.log(event.target.attributes.value.value)
  // localStorage.setItem('template_id', mikesEasy)
  // window.location=`/template/calendr/${mikesEasy}`
  // }
  switchTemplate = (templateId) => {
    localStorage.setItem('template_id', templateId)
    this.props.history.push(`/template/calendr/${templateId}`)
  }

  render() {
    // console.log(this.props.templates)
    return (
      <>

        <div className="homePageStyles">
        <div className="groupNameTemplate">
          <h2 className="GroupName">{this.state.groupName}</h2>
          <i className="far fa-edit" onClick={this.toggleModal}/>
        </div>
          <h5 className='buttonTitles'>Group Members</h5>
        <div className='buttonBox'>
        <i className="fas fa-plus-circle" />
          <p className='buttonDescriptions'>Invite to groups<br/>Join Code {this.state.joinCode}</p>
        </div>
        <div className='buttonBox'>
        <i className="fas fa-plus-circle" onClick={this.circleAddTemplate}/>
          <p className='buttonDescriptions'>Add Template</p>
        </div>
           <h5 className='buttonTitles'>Templates</h5>
            <div>
                {this.props.templates.map(template => {return <div key={template.id} value = {template.id}>
                  <input
                  type="checkbox"
                  name={template.id}
                  check={template.isChecked}
                  value={template.id}
                  onClick={this.props.singleCheck}
                  />    
                  
                  <h5 onClick={() => {this.switchTemplate(template.id)}}>{template.title}</h5>
          
                </div>
                })} 
            </div>
      </div>
      <Popup open={this.state.modalOpen} id="groupEditPopup">
        <GroupEdit toggleModal={this.toggleModal} group_id={this.state.group_id}/>
      </Popup>
      </>
    )
  }
}

export default withRouter(MainSideBar)