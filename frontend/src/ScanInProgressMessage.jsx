import React from 'react';
import { __ } from "./i18n";

function ScanInProgressMessage(props) {
  return (
    <div className="m-5 text-center alert alert-warning" role="alert">
      {__("Sorry, there is another scan in progress. Please try again later.")}
    </div>
  );
};

export default ScanInProgressMessage;
