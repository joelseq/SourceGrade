import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';

import TableRow from './TableRow';

import { selectClass } from '../../modules/grades-result';

class GradesTable extends React.Component {
  static propTypes = {
    /**
     * Array of grades objects for categories or assessments
     * @type {[object]}
     */
    grades: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      Rank: PropTypes.string,
      scores: PropTypes.arrayOf(PropTypes.number),
      Points: PropTypes.string,
      Score: PropTypes.string,
    })).isRequired,
    /**
     * Action creator to select an category/assessment to display scores of
     * @type {function}
     */
    selectClass: PropTypes.func,
  }

  static defaultProps = {
    selectClass() {},
  }

  constructor(props) {
    super(props);

    this.renderGrades = this.renderGrades.bind(this);
  }

  renderGrades(assessment) {
    function filterScore(score) {
      const scores = score.split('%');
      if (scores.length > 1) {
        return `${scores[0]}%`;
      }
      return scores[0];
    }

    return (
      <TableRow onClick={() => this.props.selectClass(assessment)} key={assessment.name}>
        <td>{assessment.name}</td>
        <td>{(assessment.Rank && `${assessment.Rank} / ${assessment.scores.length}`) || 'N/A'}</td>
        <td>{filterScore(assessment.Score)}</td>
        <td>{assessment.Points || 'N/A'}</td>
      </TableRow>
    );
  }

  render() {
    const { grades } = this.props;

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rank</th>
            <th>Score</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>{grades.map(this.renderGrades)}</tbody>
      </Table>
    );
  }
}

export default connect(null, { selectClass })(GradesTable);
