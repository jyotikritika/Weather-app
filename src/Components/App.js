import React from 'react';
import '../App.css';
import axios from 'axios';
import WeatherCard from './WeatherCard';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      city : "",
      cityEntered: false,
      weatherData: null,
      gotResults: false,
      weatherDetails: {
        location: "",
        description: "",
        temperature: null
      },
      apiKey: "b54539429aa0738c012f73c9f6f12b3a"
    }
    // this.didReceiveValue = this.didReceiveValue.bind(this);
  }

  didReceiveValue = (e) => {
    let cityName = e.target.value;
    console.log("cityName: ", cityName);
    if(cityName !== "") {
      this.setState({city: cityName, cityEntered: true});
      console.log("city: ", this.state.city);
    }
    else {
      this.setState({cityEntered: false});
    }
  }

  searchWithCityName = (e) => {
    e.preventDefault();
    if(this.state.cityEntered) {
      console.log("calling api!");
      axios.get("http://api.openweathermap.org/data/2.5/weather?q="+this.state.city+"&appid="+this.state.apiKey)
      .then(
        (res) => {
          console.log(res);
          const data = res.data;
          this.setState(
            {
              weatherData: data,
              gotResults: true, 
              cityEntered: false, 
              city: ""
            }
          )
          console.log(`weather data: ${this.state.weatherData} results status: ${this.state.gotResults}`);
          this.getDetailsFromWeatherData(data);
        }
      )
      .catch(err=>{
        console.log({err});
        alert("Couldn't find your location. Please try again!");
      });
    } else {
      console.log("no city entered!")
    }
  }

  getDetailsFromWeatherData = (data) => {
    console.log(`location: ${data.name} description: ${data.weather[0].main}`);
    const obj = this.state.weatherDetails;
    obj.location = data.name;
    obj.description = data.weather[0].main;
    obj.temperature = data.main.temp
    this.setState({weatherDetails: obj});
    console.log(this.state.weatherDetails);
  }

  render() {
    let weatherCard;
    if(this.state.gotResults) {
      weatherCard = <WeatherCard 
        weather = {this.state.weatherDetails}
        displayStatus = {this.state.gotResults}
      />;
    }

    return (
      <div className="ParentApp">
        <div className="App-header centered">
          <span>Weather Forecast</span>
        </div>
        <div className="searchbar centered">
          <img src="location.png" alt="search" className="imageLocation"></img>
          <form onSubmit={this.searchWithCityName}>
            <input 
              className="searchInput" 
              value = {this.state.city}
              placeholder="enter your location here.."
              onChange = {this.didReceiveValue}
            >
            </input>
          </form>
        </div>
       {/* {weatherCard} */}
        {this.state.gotResults && <WeatherCard 
            displayStatus = {this.state.gotResults}
            weather = {this.state.weatherDetails}
            some = "here"
          />
        }
      </div>
    );
  }
}

export default App;
