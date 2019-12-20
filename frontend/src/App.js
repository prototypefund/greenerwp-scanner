import React, { Component } from 'react';
import './App.css';
import SearchBar from './SearchBar.js';
import Results from './Results.js';
import WelcomeMessage from './WelcomeMessage';
import LoadingMessage from './LoadingMessage';
import ErrorMessage from './ErrorMessage';
import ScanInProgressMessage from './ScanInProgressMessage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      isLoading: false,
      firstRun: true,
    };
  }

  handleSubmit(args) {
    this.setState( {
      scanInProgress: false,
      firstRun: false,
      results: null,
      isLoading: true,
      error: null,
    } );

		var encodedURL = encodeURIComponent( args.url );
		var encodedDevice = args.emulatedDevice ? encodeURIComponent( args.emulatedDevice ) : null;
		var historyState = {
			url: encodedURL,
		};
		if ( encodedDevice ) {
			historyState.device = encodedDevice;
		}
		history.replaceState( historyState, "", "?url=" + encodedURL + "&device=" + args.emulatedDevice );
    fetch( '/analyse?url=' + encodedURL + ( encodedDevice ? '&device=' + args.emulatedDevice : '' ) )
      .then(res => res.json())
      .then(res => {
        if ( res.success ) {
          this.setState({
            results: res.results,
            isLoading: false,
          });
        } else if (res.scanInProgress) {
          this.setState({
            scanInProgress: true,
            isLoading: false,
          });
        } else if (res.error) {
          this.setState({
            error: res.error,
            isLoading: false,
          });
        } else {
          this.setState({
            error: 'GENERAL',
            isLoading: false,
          });
        }
      } )
      .catch(error => this.setState({
        error: 'GENERAL',
        isLoading: false,
      }));
  }

  render() {
		var url = '';
		var device = '';
		if ( 'URLSearchParams' in window ) {
			var params = new URLSearchParams( document.location.search.substring( 1 ) );
			url = params.get( 'url' );
			device = params.get( 'device' );
		}
		return (
      <div className="App">
        <SearchBar url={url} device={device} onSubmit={(args) => this.handleSubmit(args)} isLoading={this.state.isLoading}/>
        {this.state.scanInProgress && <ScanInProgressMessage/>}
        {this.state.firstRun && <WelcomeMessage/>}
        {this.state.isLoading && <LoadingMessage/>}
        {this.state.error && <ErrorMessage error={this.state.error}/>}
        {this.state.results && <Results results={this.state.results}/>}
      </div>
    );
  }
}

export default App;
