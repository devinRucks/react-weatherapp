import React from 'react';
import './dailyData.css'
import Skycon from '../skycon/skycon'

export default class Day extends React.Component {
     constructor(props) {
          super(props)
          this.state = {
               loading: true
          }
     }

     componentDidMount() {
          this.setState({ loading: false })
     }

     render() {
          const { loading, time, icon, temperatureHigh, temperatureLow } = this.props;
          if (loading) {
               return (
                    <div className="day-container">
                         <div id="spinner">
                              <div className="lds-dual-ring"></div>
                         </div>
                    </div>
               )
          } else {
               return (
                    <div className="day-container">
                         <h3 className="day-title">{time}</h3>
                         <hr id="daily-horizontal"></hr>
                         <div id="day-icon">
                              <Skycon icon={icon} />
                         </div>
                         <hr id="daily-horizontal"></hr>
                         <div id="temp-container">
                              <h3 className="day-temp-high">{temperatureHigh}</h3>
                              <h3 className="day-temp-low">{temperatureLow}</h3>
                         </div>
                    </div>
               )
          }
     }
}

