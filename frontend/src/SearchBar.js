import React, { Component } from 'react';

import { __ } from "./i18n";

class SearchBar extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      url: props.url,
      emulatedDevice: props.device || 'mobile',
    };
    this.handleInputChange = this.handleInputChange.bind( this );
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleInputChange( event ) {
    this.setState( {
      [event.target.name]: event.target.value
    } );
  };

  handleSubmit( event ) {
    event.preventDefault();
    this.props.onSubmit( {
      url: this.state.url,
      emulatedDevice: this.state.emulatedDevice,
    } );
  };

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <form className="search-bar" method="get" onSubmit={this.handleSubmit}>
						<div className="input-group mb-2">
							<div className="input-group-prepend">
								<label className="input-group-text" htmlFor="search-bar__device-select">{ __( 'Scan for use with' ) }</label>
							</div>
							<select disabled={this.props.isLoading}
								name="emulatedDevice"
								className="custom-select" id="search-bar__device-select"
								onChange={this.handleInputChange}
								value={this.state.emulatedDevice}>
								<option value="mobile">📱 { __( 'Mobiles (Smartphones, Tablets)' ) }</option>
								<option value="desktop">🖥 { __( 'Desktops (Laptops, Desktop-PCs)' ) }</option>
							</select>
						</div>
            <div className="input-group">
              <input className="form-control" type="url" value={this.state.url}
							name="url"
							onChange={this.handleInputChange} required
							placeholder={__('Enter website URL (e.g. https://greenerwp.net)')}/>

              <span className="input-group-append">
                <button disabled={this.props.isLoading} className="btn btn-secondary" type="submit">
									{ __( 'Start scan' ) } <span className="search-bar__icon">👩🏽‍🔬</span>
								</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    );
  };
}

export default SearchBar;
