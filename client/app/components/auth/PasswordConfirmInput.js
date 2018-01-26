import React from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Alert,
} from 'react-bootstrap';

/* eslint-disable react/prop-types */
const PasswordConfirmInput = ({ input, meta: { touched, error }, ...custom }) => {
  let validationState = null;

  if (touched) {
    validationState = error ? 'error' : 'success';
  }

  return (
    <FormGroup
      controlId="passwordConfirm"
      validationState={validationState}
    >
      <ControlLabel>Confirm Password</ControlLabel>
      <FormControl
        type="password"
        placeholder="Confirm Password"
        required
        {...input}
        {...custom}
      />
      {touched && error && <Alert bsStyle="danger">{error}</Alert>}
    </FormGroup>
  );
};
/* eslint-enable react/prop-types */

export default PasswordConfirmInput;
