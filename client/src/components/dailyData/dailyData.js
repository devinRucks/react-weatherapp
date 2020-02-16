import React from 'react';
import './dailyData.css'
import Day from '../dailyData/daily'

export default function DailyData(props) {

     // If retrieving data, display loading symbol in each day container
     if (props.loading) {
          const days = []

          for (let i = 1; i < 6; i++) {
               days.push(<Day key={i} loading={props.loading} />)
          }

          return (days)
     } else {
          const days = []
          for (let i = 1; i < 6; i++) {
               days.push(<Day
                    key={i}
                    time={unixConversionToDay(props.dailyData[i].time)}
                    temperatureHigh={Math.round(props.dailyData[i].temperatureHigh)}
                    temperatureLow={Math.round(props.dailyData[i].temperatureLow)}
                    icon={props.dailyData[i].icon}
               />)
          }

          return (days)
     }
}


function unixConversionToDay(timestamp) {
     const time = timestamp;
     const date = new Date(time * 1000);
     const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

     let currentDay = days[date.getDay()]
     return currentDay.toUpperCase();
}
