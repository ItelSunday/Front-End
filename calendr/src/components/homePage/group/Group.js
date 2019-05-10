import React, { Component } from 'react'
import "./Group.scss"
import axios from 'axios'

export class Group extends Component {
  constructor(props){
    super(props);
    this.state={
        joinCode: '',
        createdCode: '',
        name: ''
    }
  }


    joinGroup = event => {
      event.preventDefault();
      let user_id = localStorage.getItem('userId')
      axios
        .post(`https://calendrserver.herokuapp.com/groups/getBy/${user_id}`, {
          joinCode: this.state.joinCode
        }).then(res => {
          console.log(res.data.id)
          window.localStorage.setItem('memberId', res.data.group_id)
          window.location = '/memberhome'
        }).catch(err => {
          console.error(err, 'there was an error')
        })
    }
    
    postGroup = e => {
      e.preventDefault();
      let { name, joinCode } = this.state
      let user_id = localStorage.getItem('userId')
      axios
        .post(` https://calendrserver.herokuapp.com/users/${user_id}/groups`, { user_id, name, joinCode })
        .then(res => {
          console.log(res.data);
          if(this.state.joinCode !== null && this.state.name !== null){
            window.location='/home'
          }else{
            alert('Fill out all fields')
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    

handleInputChange = event => {
  this.setState({
      [event.target.name]: event.target.value
  })
}

  render() {
    return (
      <>
      <div className = "groupHeader">
          <button onClick = {this.props.logOff}> Let me Out</button>
      </div>
      <div className="groupContainer">
        <div className="createGroup boxing">
            <h2 className="joinCreateGroup">Create Group</h2>
            <p className="groupDescription">You must be a Gold Tier Member to create a group</p>
          <form className="formGroup">
            <h3>Enter Group Name</h3>
            <input
            className="groupInput"
            onChange={this.handleInputChange}
            placeholder="Group name..."
            value={this.state.name}
            name="name"
            type="text"
            />
            <h3>Create 4 digit Join Code</h3>
            <input
            className="groupInput"
            onChange={this.handleInputChange}
            placeholder="Join code..."
            value={this.state.createdCode}
            name="createdCode"
            type="number"
            />
            <button onClick={this.postGroup} className="formButton">Create</button>
          </form>
        </div>

        {/* JOINING A GROUP SECTION STARTS */}
        <div className="joinGroup boxing">

            <h2 className="joinCreateGroup">Join Group</h2>
            <p className="groupDescription">After you join a group you will be able to see all events created by the owner of that group</p>

           <form className="formGroup">
              <h3>Enter 4 digit Join Code</h3>
                <input
                className="groupInput"
                onChange={this.handleInputChange}
                placeholder="Join code..."
                value={this.state.joinCode}
                name="joinCode" 
                type="number"
                />
                <button onClick = {this.joinGroup} className="formButton">Join</button>
                
           </form>
        </div>
      </div>
      </>
    )
  }
}

export default Group