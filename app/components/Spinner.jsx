import React from 'react';
import FontAwesome from 'react-fontawesome';

export default function(props) {
  return (
    <div className="spinner-container">
      <FontAwesome
        className='loading-spinner'
        name='circle-o-notch'
        size='3x'
        spin
      />
    </div>
  );
}
