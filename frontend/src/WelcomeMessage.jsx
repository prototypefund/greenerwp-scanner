import React from 'react';
import { __ } from "./i18n";

function WelcomeMessage(props) {
  return (
    <div className="m-5 text-center alert alert-info" role="alert">
      {__("This tool allows you to analyse your site in respect to sustainability. Enter an URL and start the scan!")}
    </div>
  );
};

export default WelcomeMessage;
