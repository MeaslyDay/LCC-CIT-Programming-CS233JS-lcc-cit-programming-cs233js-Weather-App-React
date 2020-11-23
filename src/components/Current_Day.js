import React, {Component} from 'react';

import {getDate, getWeekday} from '../utitilies/dates';

class Current_Day extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const {city, forecast_day: day, timezone_offset} = this.props;
        const current = getDate(day.dt, timezone_offset);
        const weekday = getWeekday(current);
        return (
            <div className="current-day">
            <h1 className="day-header">{getWeekday(getDate(day.dt, timezone_offset))} in {city.name} {current.getMonth() + 1} / {current.getDate()}</h1>
                <div className="weather">
                <p>
                <img src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`} alt={day.weather[0].description}/>
                {day.weather[0].description}
                </p>
                </div>
                <div className="details flex-parent">
                    <div className="temperature-breakdown">
                        <p>Morning Temperature: {day.temp.morn}&deg;F</p>
                        <p>Day Temperature: {day.temp.day}&deg;F</p>
                        <p>Evening Temperature: {day.temp.eve}&deg;F</p>
                        <p>Night Temperature: {day.temp.night}&deg;F</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Current_Day;