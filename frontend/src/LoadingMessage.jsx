import React from 'react';
import { __ } from "./i18n";

function LoadingMessage(props) {
  return (
    <div className="text-center mt-3 loading">
      <p className="m-5 alert alert-info">
        {__("⏳ Scan in progress, this may take half a minute.")}
      </p>
      <div className="text-info m-5 p-5 spinner-border" role="status">
        <span className="sr-only">{__("Analyzing...")}</span>
      </div>
    </div>
  );
};

export default LoadingMessage;
