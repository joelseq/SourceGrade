import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from 'react-redux';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
} from 'react-bootstrap';

// Import styles for react-select
import 'react-select/dist/react-select.css';

import { getClasses } from '../../modules/home';

class GradesForm extends React.Component {
  static propTypes = {
    /**
     * Event handler for form submit passed in from parent
     * @type {function}
     */
    handleFormSubmit: PropTypes.func,
    /**
     * Text to display on the submit button
     * @type {string}
     */
    buttonText: PropTypes.string,
    /**
     * Optional class for button
     * @type {string}
     */
    buttonClass: PropTypes.string,
    /**
     * Saved classes from redux store
     * @type {array}
     */
    classes: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string,
      courseName: PropTypes.string,
    })),
    /**
     * Action creator to get classes from API
     * @type {function}
     */
    getClasses: PropTypes.func,
  }

  static defaultProps = {
    handleFormSubmit() {},
    buttonText: 'Submit',
    buttonClass: 'button',
    classes: [],
    getClasses() {},
  }

  static getValidationState(val) {
    const len = val.length;
    if (len) return 'success';
    return 'error';
  }

  constructor(props) {
    super(props);

    this.state = {
      id: '',
      currentClass: {
        value: '',
      },
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onIdChange = this.onIdChange.bind(this);
    this.onClassChange = this.onClassChange.bind(this);
  }

  componentWillMount() {
    this.props.getClasses();
  }

  onFormSubmit(e) {
    e.preventDefault();

    const { id, currentClass } = this.state;

    if (id.length > 0 && currentClass.value.length) {
      this.props.handleFormSubmit(id, currentClass);
    }
  }

  onIdChange(e) {
    this.setState({
      id: e.target.value,
    });
  }

  onClassChange(val) {
    if (val) {
      this.setState({
        currentClass: val,
      });
    }
  }

  render() {
    let options = [];

    if (this.props.classes) {
      options = this.props.classes.map(current => (
        {
          value: current.url,
          label: current.courseName,
        }
      )).reverse();
    }

    return (
      <form onSubmit={this.onFormSubmit}>
        <FormGroup
          controlId="secretNumber"
          validationState={this.constructor.getValidationState(this.state.id)}
        >
          <ControlLabel>Secret Number</ControlLabel>
          <FormControl
            type="text"
            value={this.state.id}
            placeholder="Secret Number"
            onChange={this.onIdChange}
          />
        </FormGroup>
        <FormGroup
          controlId="course"
          validationState={this.constructor.getValidationState(this.state.currentClass.value)}
        >
          <ControlLabel>Class</ControlLabel>
          <Select
            name="class-form"
            value={this.state.currentClass}
            placeholder="Search for a Class"
            options={options}
            onChange={this.onClassChange}
            className="select"
            clearable={false}
          />
        </FormGroup>
        <Button bsStyle="primary" type="submit" className={this.props.buttonClass} block>{this.props.buttonText}</Button>
      </form>
    );
  }
}

const mapStateToProps = state => (
  {
    classes: state.classes.classes,
  }
);

export default connect(mapStateToProps, { getClasses })(GradesForm);
