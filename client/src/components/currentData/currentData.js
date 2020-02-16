import React from 'react';
import './currentData.css'
import Skycon from '../skycon/skycon'

export default function CurrentData(props) {

     if (props.loading) {
          return (
               <div id="spinner">
                    <div className="lds-dual-ring"></div>
               </div>
          )
     }
     else {
          const { summary, temperature, icon, time } = props.currentData
          return (
               <>
                    <section id="weather-status-container">
                         <div className="weather-status">{summary}</div>
                    </section>

                    <section id="temp-icon-container">
                         <div className="temp-large">{Math.round(temperature)}</div>
                         <div id="icon-large">
                              <Skycon icon={icon} />
                         </div>
                    </section>

                    <section id="time-container">
                         <div className="time">{unixConversionToTime(time)}</div>
                    </section>

                    <hr id="current-horizontal"></hr>

                    <section id="summary-container">
                         <div className="currentSummary">{props.summary[0].summary}</div>
                    </section>
               </>
          )
     }
}


function unixConversionToTime(timestamp) {
     const currentTime = new Date(timestamp * 1000).toLocaleTimeString("en-US")
     return currentTime
}
