import React from 'react';
import {
  FormControl,
  FormGroup,
  ControlLabel,
  Alert,
} from 'react-bootstrap';

/* eslint-disable react/prop-types */
const UsernameInput = ({ input, meta: { touched, error }, ...custom }) => {
  let validationState = null;

  if (touched) {
    validationState = error ? 'error' : 'success';
  }

  return (
    <FormGroup
      controlId="username"
      validationState={validationState}
    >
      <ControlLabel>Username</ControlLabel>
      <FormControl
        type="text"
        placeholder="Username"
        required
        {...input}
        {...custom}
      />
      {touched && error && <Alert bsStyle="danger">{error}</Alert>}
    </FormGroup>
  );
};
/* eslint-enable react/prop-types */

export default UsernameInput;
