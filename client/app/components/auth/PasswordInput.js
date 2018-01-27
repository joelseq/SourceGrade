import React from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Alert,
} from 'react-bootstrap';

/* eslint-disable react/prop-types */
const PasswordInput = ({ input, meta: { touched, error }, ...custom }) => {
  let validationState = null;

  if (touched) {
    validationState = error ? 'error' : 'success';
  }

  return (
    <FormGroup
      controlId="password"
      validationState={validationState}
    >
      <ControlLabel>Password</ControlLabel>
      <FormControl
        type="password"
        placeholder="Password"
        required
        {...input}
        {...custom}
      />
      {touched && error && <Alert bsStyle="danger">{error}</Alert>}
    </FormGroup>
  );
};
/* eslint-enable react/prop-types */

export default PasswordInput;
