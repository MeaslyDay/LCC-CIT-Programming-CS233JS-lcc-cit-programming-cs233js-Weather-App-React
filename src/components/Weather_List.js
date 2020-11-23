import React, {Component} from 'react';

import Weather_List_Item from './Weather_List_Item';

class Weather_List extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const {forecast_days, timezone_offset, on_day_clicked} = this.props;
        return (
            <div className="weather-list flex-parent"> 
                {forecast_days.map((forecast_day, index) =>
                    <Weather_List_Item key={forecast_day.dt} 
                    forecast_day = {forecast_day} index = {index}
                    timezone_offset = {timezone_offset}
                    on_day_clicked = {on_day_clicked}/>
                )}
            </div>
        );
    }

}

export default Weather_List;