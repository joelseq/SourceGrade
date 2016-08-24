import React, { PropTypes } from 'react';

const propTypes = {
  onSearch: PropTypes.func
}

const defaultProps = {
  onSearch() {}
};

export default class GradesForm extends React.Component {
  constructor(props) {
    super(props);
  }

  onFormSubmit = (e) => {
    e.preventDefault();

    let id = this.refs.id.value;
    let url = this.refs.url.value;

    if(id.length > 0 && url.length > 0) {
      this.refs.id.value = '';
      this.refs.url.value = '';
      this.props.onSearch(id, url);
    }
  };

  render() {
    return (
      <div className="row">
        <div className="columns medium-6 small-centered">
          <form onSubmit={this.onFormSubmit}>
            <input type="text" ref="id" placeholder="Secret Number"/>
            <input type="text" ref="url" placeholder="Course URL"/>
            <button className="button expanded hollow">Get Grades</button>
          </form>
        </div>
      </div>
    );
  }
}

GradesForm.propTypes = propTypes;
GradesForm.defaultProps = defaultProps;