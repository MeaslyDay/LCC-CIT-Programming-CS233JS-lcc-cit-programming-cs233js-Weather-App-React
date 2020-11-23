import React, {Component} from 'react';
import './App.css';

import {get} from 'axios';

import Zip_Form from './Zip_Form';
import Weather_List from './Weather_List';
import Current_Day from './Current_Day';
import getLocation from '../utitilies/googleMaps';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        zipcode: "",
        city: {name: "", lat: 0, lon: 0},
        forecast: [], 
        selected_date: null,
        timezone_offset: 0
      };
      this.url = "https://api.openweathermap.org/data/2.5/onecall?";
      this.apikey = "&exclude=minutely,hourly,current&units=imperial&appid=d75a5c74f261f1a2f96f6029afaa6e84";

      this.on_form_submit = this.on_form_submit.bind(this);
      this.on_day_clicked = this.on_day_clicked.bind(this);
  }

  render() {
    const {forecast, timezone_offset, city, selected_date} = this.state;
      return (    
      <div id="app-container">   
        <div className="app">
          <Zip_Form onSubmit={this.on_form_submit}/>
          <Weather_List forecast_days = {forecast} 
            timezone_offset = {timezone_offset}
            on_day_clicked = {this.on_day_clicked}/>
          {selected_date !== null && 
          <Current_Day forecast_day = {forecast[selected_date]}
            city = {city} timezone_offset = {timezone_offset}/>
          }
        </div>
      </div>
    );
  }

  on_form_submit(zipcode) {
    //this.setState({zipcode});
    getLocation(zipcode)
    .then(data => {
      const name = data.results[0].address_components[1].long_name;
      const lat = data.results[0].geometry.location.lat;
      const log = data.results[0].geometry.location.lng;
      get(`${this.url}lat=${lat}&lon=${log}${this.apikey}`)
        .then(({data}) => {  
          const timezone_offset = data.timezone_offset;
          // sometimes there are 8 days
          data.daily.splice(7);
          const forecast = data.daily;
          this.setState ({
            zipcode, forecast, timezone_offset, 
            selected_date: null,
            city: {name, lat, log}
          });
        })
        .catch(error => {
          alert('There was a problem getting weather info!'); 
        });
    })
    .catch(error => {
      alert('There was a problem getting location information!')
    });
  }

  on_day_clicked(day_index) {
    this.setState({selected_date: day_index});
  }
}

export default App;