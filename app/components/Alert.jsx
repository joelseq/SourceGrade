import React from 'react';

export default function(props) {
  const { message, className, onClose } = props;

  return (
    <div id="alert" className={`callout ${className}`} data-closable>
      {message}
      <button onClick={onClose} className="close-button" aria-label="Dismiss alert" type="button" data-close>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}
