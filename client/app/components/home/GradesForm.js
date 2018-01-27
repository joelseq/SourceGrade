import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
} from 'react-bootstrap';

// Import styles for react-select
import 'react-select/dist/react-select.css';

import ClassSelect from './ClassSelect';
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
    /**
     * Boolean indicating whether form should be inline
     * @type {boolean}
     */
    inline: PropTypes.bool,
  }

  static defaultProps = {
    handleFormSubmit() {},
    buttonText: 'Submit',
    buttonClass: 'button',
    classes: [],
    getClasses() {},
    inline: false,
  }

  static getValidationState(val) {
    if (val && val.length) {
      return 'success';
    }
    return 'error';
  }

  constructor(props) {
    super(props);

    this.state = {
      id: '',
      currentClass: '',
      url: '',
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

    const { id, currentClass, url } = this.state;

    if (id.length > 0 && url.length) {
      this.props.handleFormSubmit(id, currentClass);
    }
  }

  onIdChange(e) {
    this.setState({
      id: e.target.value,
    });
  }

  onClassChange(val) {
    const currentClass = val || '';
    let url = '';

    if (currentClass) {
      url = currentClass.value;
    }

    this.setState({
      currentClass,
      url,
    });
  }

  render() {
    let options = [];
    const { classes, inline } = this.props;
    const { id, url, currentClass } = this.state;

    if (classes) {
      options = classes.map(current => ({
        value: current.url,
        label: current.courseName,
      })).reverse();
    }

    return (
      <Form inline={inline} onSubmit={this.onFormSubmit}>
        <FormGroup
          controlId="secretNumber"
          validationState={GradesForm.getValidationState(id)}
        >
          {!inline && <ControlLabel>Secret Number</ControlLabel>}
          <FormControl
            type="text"
            value={id}
            placeholder="Secret Number"
            onChange={this.onIdChange}
          />
        </FormGroup>
        <FormGroup
          controlId="course"
          validationState={GradesForm.getValidationState(url)}
        >
          {!inline && <ControlLabel>Class</ControlLabel>}
          <ClassSelect
            name="class-form"
            value={currentClass && currentClass.value}
            placeholder="Search for a Class"
            options={options}
            onChange={this.onClassChange}
            inline={inline}
          />
        </FormGroup>
        <Button
          bsStyle="primary"
          type="submit"
          className={this.props.buttonClass}
          block={!inline}
        >
          {this.props.buttonText}
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = state => (
  {
    classes: state.classes.classes,
  }
);

export default connect(mapStateToProps, { getClasses })(GradesForm);
