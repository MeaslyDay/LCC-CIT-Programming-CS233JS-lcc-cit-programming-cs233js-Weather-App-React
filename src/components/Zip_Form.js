import React, {Component} from 'react';

class Zip_Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zipcode: ""
        };

        this.input_changed = this.input_changed.bind(this);
        this.submit_zipcode = this.submit_zipcode.bind(this);
    }

    render() {
        return (       
        <div className="zip-form">
          <form id="zip_form" onSubmit={this.submit_zipcode}>
            <div className="flex-parent">
              <label htmlFor="zipcode">Zip</label>
              <input className="form-control" type="input" id="zipcode" name="zipcode" 
                value={this.state.zipcode} required onChange={this.input_changed}/>
              <button type="submit" className="btn btn-success"> Get the forcast!</button>
            </div>
          </form>
        </div>
      );
    }

    input_changed(event) {
        const {value} = event.target;
        this.setState({zipcode: value});
    }

    submit_zipcode(event) {
        event.preventDefault();
        const {zipcode} = this.state;
        const {onSubmit} = this.props;
        onSubmit(zipcode);
        this.setState({zipcode: ""});
    }

}

export default Zip_Form;