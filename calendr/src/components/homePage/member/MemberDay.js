import React from 'react'
import { withRouter, Route } from 'react-router-dom';
import moment from 'moment';
import Popup from 'reactjs-popup';
// import Event from '../homePage/event/Event';
import MemberEvents from './MemberEvents';
import EventBox from '../event/EventBox';


class MemberDay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      check: moment(this.props.day.date._d).format('YYYY-MM-DD')
    }
  }

  toggleOpen = (e) => {
    e.preventDefault();
    this.props.history.push(`/memberhome/${moment.parseZone(this.props.day.date._d).format("YYYY-MM-DD")}`);
 
  }

  render() {

    // for making sure that the date an event is created for populates the correct date
    const filteredEvent = this.props.events.filter(event => {
      if (moment.parseZone(this.props.day.date._d).format("YYYY-MM-DD") === moment.parseZone(event.date).format('YYYY-MM-DD')) {
        return event;
      }
    });

    const { day: { date, number } } = this.props;
    return (
      <>
        <div className="day" key={date.toString()} onClick={this.toggleOpen}>
          <div className="eventInfo">

            {filteredEvent.map(event => (
              <p key={event.id} style={{ fontSize: "12px" }}> {event.startTime} - {event.title}</p>
            ))}

          </div>
          <div className="dayNumber">
            {number}
          </div>

        </div>
        <Route 
          path={`/memberhome/${this.state.check}`}
          render={() => (
            <div className="popup-overlay">
            <div className="popup-content modal-popup" 
              open={true}
              onClose={() => this.props.history.push(`/memberhome/${localStorage.getItem('template_id')}`)}
              position="right center"
              >

              <MemberEvents events = {this.props.events} />
            
            </div>
            </div>
          )}
        />


      </>
    );
  }
}

export default withRouter(MemberDay);

