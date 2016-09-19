import React, { Component } from 'react';

export default class Alert extends Component {
  render() {
    const { message, className, onClose } = this.props;

    return (
      <div id="alert" className={`callout ${className}`} data-closable>
        {message}
        <button onClick={onClose} className="close-button" aria-label="Dismiss alert" type="button" data-close>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
}
