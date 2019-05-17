import React, { Component } from 'react'
import moment from 'moment'
import DayNames from "../../calendar/DayNames"
import MemberWeek from './MemberWeek'


export class MemberCalendar extends Component {
  state = {
    month: moment()
  }

  previous = () => {
    const { month } = this.state;

    this.setState({
      month: month.subtract(1, "month")
    });
  };

  next = () => {
    const { month } = this.state;

    this.setState({
      month: month.add(1, "month")
    });
  };
  renderMonthLabel() {
    const { month } = this.state;
    return (
      <span className="month-label">
        {month.startOf("month").format("MMMM YYYY")}
      </span>
    );
  }

  renderWeeks() {
    let weeks = [];
    let done = false;
    let date = this.state.month
      .clone()
      .startOf("month")
      .day("Sunday");
    let count = 0;
    let monthIndex = date.month();

    const { month } = this.state;

    while (!done) {
      weeks.push(<MemberWeek 
                  key={date} 
                  date={date.clone()} 
                  month={month}
                  events = {this.props.events}
                  templates = {this.props.events}
                  />);

      date.add(1, "week");

      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }
    return weeks;
  }


  render() {
    return (
      <div className="wholeCalendar">
        <div style={{ width: '45%', display: 'flex', marginLeft: "40%" }} className="month-display">
          <div className="arrow fa fa-angle-left" onClick={this.previous} />
          <div>{this.renderMonthLabel()}</div>
          <div className="arrow fa fa-angle-right" onClick={this.next} />
        </div>
        <DayNames />
        <div>{this.renderWeeks()}</div>
      </div>
    )
  }
}

export default MemberCalendar;
