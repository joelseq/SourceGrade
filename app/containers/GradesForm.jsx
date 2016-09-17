import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import * as actions from '../actions';
import { connect } from 'react-redux';

//Styles for react-select
import 'react-select/dist/react-select.css';

class GradesForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      class: '',
      url: ''
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onIdChange = this.onIdChange.bind(this);
    this.handleClassChange = this.handleClassChange.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.getClasses();
  }

  onFormSubmit(e) {
    e.preventDefault();

    const { id, url } = this.state;

    if(id.length > 0 && url.length > 0) {
      this.context.router.push(`/grades?id=${id}&url=${url}`);
    }
  };

  onIdChange(e) {
    this.setState({
      id: e.target.value
    });
  }

  handleClassChange(val) {
    this.setState({
      class: val,
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
      <div id="grades-form" className="row">
        <div className="columns medium-6 small-centered">
          <h1 className="text-center">Welcome to SourceGrade</h1>
          <h3 className="text-center">Search for your grades</h3>
          <form onSubmit={this.onFormSubmit}>
            <input value={this.state.id} type="text" onChange={this.onIdChange} placeholder="Secret Number"/>
            <Select
              name="class-form"
              value={this.state.class}
              placeholder="Search for a Class"
              options={options}
              onChange={this.handleClassChange}
              className="select"
              clearable={false}
            />
            <button className="button expanded">Get Grades</button>
          </form>
        </div>
      </div>
    );

    return (
      <input value={this.state.url} type="text" onChange={this.onUrlChange} placeholder="Course URL"/>
    );
  }
}

function mapStateToProps(state) {
  return {
    classes: state.classes.classes,
  };
}

export default connect(mapStateToProps, actions)(GradesForm);
