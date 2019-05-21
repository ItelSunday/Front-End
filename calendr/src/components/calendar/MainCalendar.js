import React, { Component } from "react";
import moment from "moment";
import DayNames from "./DayNames";
import Week from "./Week";
import "../../App.scss";
import axios from "axios";
import MainSideBar from '../homePage/MainSideBar'
import MainNavBar from '../general/MainNavBar'
import { withRouter } from 'react-router-dom'
import { toast } from "react-toastify";

export class MainCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      month: moment(),
      events: [],
      template_id: [],
      templates: [],
      sortedStartTimes: [],

    };
  }
  
  componentDidMount() {
    this.getTemplateData();
  }

  // Get template by its corresponding group id
  getTemplateData = event => {
    let group_id = localStorage.getItem("group_id");
    axios
      .get(`${process.env.REACT_APP_API}/groups/${group_id}/templates`)
      .then(res => {
        //returns all templates
        let templates = res.data
        if(templates.length > 0 ){

        
        templates[0].isChecked = 1
        }
        console.log(templates)
        //returns the id of the very last template in the array
        let value = res.data[res.data.length - 1].id;
        //returns an array of all template IDS
        let tempIds = res.data.map(data => {
          return data.id;
        });

        this.setState({
          template_id: tempIds[tempIds.length - 1],
          templates: templates
        }, () => { if(this.state.templates.length > 0 ){
            this.selectEvents(this.state.templates[0].id)
        }
        });

        // this.getEvents(value);
        // this.getEvents(value).then(res => {
        //   this.setState({
        //     events: res
        //   })
        // }).catch(err => {
        //   console.error(err)
        // })
      })
      .catch(err => {
        console.error(err, 'error inside of get templates function');
      });
  };


    // Delete events 
  deleteEvent = (e, id) => {
    // e.preventDefault();
    let groupID = localStorage.getItem('group_id')
    axios
      .delete(`${process.env.REACT_APP_API}/events/${id}`)
      .then(res => {
        console.log("event deleted");
       let filteredStuffMikesIdea = this.state.events.filter(event => {
       return event.id !== id
       })
       
       this.setState({
        events: filteredStuffMikesIdea
       })
       toast.success('Event Deleted!')
        })
      .catch(err => {
        console.log(err);
      });
  };

  getEvents = value => {
    return new Promise ((resolve, reject) => { axios
      .get(`${process.env.REACT_APP_API}/templates/${value}/events`)
      .then(res => {
        let events = res.data
        // let eventTimes = res.data.map(event => {
        //   return event.startTime
        // })

        let sortedTime = events.sort((a, b) => {
          if(a.startTime > b.startTime){
            return 1
          } else if (a.startTime < b.startTime){
            return -1
          } else {
            return 0
          }
        })

        this.setState({
          events: sortedTime
        })
       
        resolve(events);
      })
      .catch(err => {
        reject(err)
      });
  })};

  // Gets all events for the template id. To be run when a toggle is clicked
  selectEvents = (id) => {
    return new Promise((resolve, reject) => { 
    axios
      .get(`${process.env.REACT_APP_API}/templates/${id}/events`)
      .then(res => {
      let events = res.data
      console.log(res.data)
      this.setState( previousState => {return {
        events: [...previousState.events, ...events].sort((a,b) => {
          if(a.startTime > b.startTime){
                      return 1
                    } else if (a.startTime < b.startTime){
                      return -1
                    } else {
                      return 0
                    }
        })
      }});
    })
    .catch(err => {
      reject(err);
    })});
  }

  // Takes in the selectEvents and confirms if a template isChecked or not
  singleCheck = event => {
    let eventsArray = [];
    let temps = this.state.templates

    temps.forEach((temp, i) => {
     if(temp.id == event.target.value && temp.isChecked == false){
        console.log('yola')
        temp.isChecked = 1;
        console.log(temp.isChecked, 'temp')
        this.selectEvents(temp.id).then(res => {
          console.log(res, "res")
          eventsArray.push(...res)
       
        }).catch(err => {
          console.error(err)
        })
        
      } else if(temp.id == event.target.value && temp.isChecked == true){
        console.log('yolu')
        temp.isChecked = 0
      } else if (temp.isChecked === 1){
        console.log('yolo')
        this.selectEvents(temp.id).then(res => {
          eventsArray.push(...res)
        }).catch(err => {
          console.error(err)
        })
      } 
      if(i === temps.length-1){
        this.setState (() => {
          return { events: eventsArray }
        })
         
      }
    })
  }
  
  // Renders all weeks that populate the calendr
  renderWeeks() {
    let weeks = [];
    let done = false;
    let date = moment(this.state.month)
      .clone()
      .startOf("month")
      .day("Sunday")
    let count = 0;
    let monthIndex = date.month();

    const { month } = this.state;

    // Pulls in weeks and loops over until calendar is complete 
    while (!done) {
      weeks.push(
        <Week
          events={this.state.events}
          templates = {this.state.templates}
          template_id={this.state.template_id}
          key={date}
          date={date.clone()}
          month={month}
          deleteEvent={this.deleteEvent}
          getEvents={this.getEvents}
        />
      );

      date.add(1, "week");

      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }
    return weeks;
  }

  // Previous month button function
  previous = () => {
    let { month } = this.state;
    this.setState({
      month: month.subtract(1, "month")
    });
  };
  
  // Next month button function
  next = () => {
    let { month } = this.state;
    this.setState({
      month: month.add(1, "month")
    });
  };

  renderMonthLabel() {
    const month = moment(this.state.month)
    return (
      <span className="month-label">
        {month.startOf("month").format("MMMM YYYY")}
      </span>
    );
  }

  render() {
    // console.log(this.state.events)
    // console.log(this.state.sortedStartTimes)
    return (
    <div>
      <MainNavBar logOff={this.props.logOff}/>
        <MainSideBar singleCheck = {this.singleCheck} templates = {this.state.templates}/>
      <div className="wholeCalendar">
      <div className='wholeCal'>
        <div className="padding"></div>
        <p>Click a date to add an event.</p>
      <div className="arrowsAndMonth">
        <div className="arrow fa fa-angle-left" onClick={this.previous}/>
        <div>{this.renderMonthLabel()}</div>
        <div className="arrow fa fa-angle-right" onClick={this.next} />
        </div>
        <DayNames />
        <div>{this.renderWeeks()}</div>
        </div>
      </div>
    </div>
    );
  }
}

export default withRouter(MainCalendar);
