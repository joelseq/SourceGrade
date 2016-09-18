import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import * as actions from '../actions';
import { connect } from 'react-redux';

//Styles for react-select
import 'react-select/dist/react-select.css';

// PropTypes expected from parent component
const propTypes = {
  handleFormSubmit: PropTypes.func,
  buttonText: PropTypes.string,
  buttonClass: PropTypes.string
};

// Default props if none are given from parent
const defaultProps = {
  handleFormSubmit() {},
  buttonText: 'Submit',
  buttonClass: 'button'
};

class GradesForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      currentClass: '',
      url: ''
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onIdChange = this.onIdChange.bind(this);
    this.onClassChange = this.onClassChange.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.getClasses();
  }

  onFormSubmit(e) {
    e.preventDefault();

    const { id, url, currentClass } = this.state;

    if(id.length > 0 && url.length > 0) {
      // handleFormSubmit needs to be passed in from parent
      this.props.handleFormSubmit(id, currentClass);
    }
  };

  onIdChange(e) {
    this.setState({
      id: e.target.value
    });
  }

  onClassChange(val) {
    this.setState({
      currentClass: val,
      url: val.value
    });
  }

  render() {
    let options = [];

    if(this.props.classes) {
      options = this.props.classes.map(current => {
        return {
          value: current.url,
          label: current.courseName
        };
      });
    }

    return (
      <form onSubmit={this.onFormSubmit}>
        <input value={this.state.id} type="text" onChange={this.onIdChange} placeholder="Secret Number"/>
        <Select
          name="class-form"
          value={this.state.currentClass}
          placeholder="Search for a Class"
          options={options}
          onChange={this.onClassChange}
          className="select"
          clearable={false}
        />
      <button className={this.props.buttonClass}>{this.props.buttonText}</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    classes: state.classes.classes,
  };
}

GradesForm.propTypes = propTypes;
GradesForm.defaultProps = defaultProps;

export default connect(mapStateToProps, actions)(GradesForm);
