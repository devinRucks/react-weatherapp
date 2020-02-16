import React from 'react';
import ReactAnimatedWeather from 'react-animated-weather';

function Skycon(props) {

     // props.icon = partly-cloudy-night
     // NEED: PARTLY_CLOUDY_NIGHT
     const originalIcon = props.icon.toUpperCase()
     const regex = /-/gi;
     const modifiedIcon = originalIcon.replace(regex, '_')

     return (
          <ReactAnimatedWeather
               icon={modifiedIcon}
               color='white'
               size={120}
               animate={true}
          />
     )
}

export default Skycon