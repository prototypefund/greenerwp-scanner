import React from 'react';
import { __ } from "./i18n";

function ErrorMessage(props) {
  return (
    <div className="m-5 text-center alert alert-warning" role="alert">
      {props.error === 'INVALID_URL' && __('The URL you have provided appears to be invalid.')}
      {props.error === 'GENERAL' && __('Could not scan the given URL. Please try again later.')}
    </div>
  );
};

export default ErrorMessage;
