import React from 'react';
import {farenheitToCelsius} from '../helper';

class WeatherCard extends React.Component {
    
    render() {
        // const {status} = this.props;
        const {weather, some} = this.props;
        console.log(this.props);
        console.log(some);
        // console.log(`weather: ${weather} status: ${status} some: ${something}`);
        const temperature = farenheitToCelsius(weather.temperature);
        return(
            <div className="weather-card-parent">
                <div className="location">{weather.location}</div>
                <div id="description">{weather.description}</div>
                <div className="temperature">{temperature} <span className="temperature-unit"><sup><sup><span className="superscript">0</span></sup></sup>C</span></div>
            </div>
        );
    }
}

export default WeatherCard;