import React, {Component} from 'react';

import {getDate, getWeekday} from '../utitilies/dates';

class Weather_List_Item extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

        this.on_click = this.on_click.bind(this);
    }

    render() {
        const {forecast_day, timezone_offset} = this.props;
        const current = getDate(forecast_day.dt, timezone_offset);
        const weekday = getWeekday(current);
        return (
            <div className="weather-list-item" onClick={this.on_click}>
                <h2> {current.getMonth() + 1} / {current.getDate()} </h2>
                <div className="detailed">
                    <h3> {weekday}</h3>
                    <h3> {forecast_day.temp.max} &deg;F {forecast_day.temp.min} &deg;F</h3>
                </div>
            </div>
        );
    }

    on_click() {
        const {on_day_clicked, index} = this.props;
        on_day_clicked(index);
    }
}

export default Weather_List_Item;