import React, { Component } from 'react';
import ReportViewer from 'react-lighthouse-viewer';

import { __ } from "./i18n";

class Results extends Component {
  render() {
    const results = this.props.results;
    return (
      <div className="results mt-3">
        <div className="m-5 alert alert-success alert-dismissible fade show" role="alert">
          <h4 className="alert-heading">{__("✔ Scan done…")}</h4>
          <p>
            {__('… but don\'t take it too seriously, this is work in progress!')}
            {__("The calculated scores are somewhat arbirtrary and need more evaluation.")}
          </p>
          <button type="button" className="close" data-dismiss="alert" aria-label={__('Close')}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <ReportViewer json={results}/>
      </div>
    );
  };
}

export default Results;
