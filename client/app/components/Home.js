import React from 'react';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import { history } from '../store';

import GradesForm from './GradesForm';

class Home extends React.Component {
  static handleFormSubmit(id, currentClass) {
    history.push(`/grades?id=${id}&url=${currentClass.value}`);
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col md={6} sm={8} mdOffset={3} smOffset={2} className="text-center">
            <h1 className="text-center">Welcome to SourceGrade!</h1>
            <h3 className="text-center">Search for your grades</h3>
            <h4>For a demonstration, try:</h4>
            <p>Secret Number: 8010</p>
            <p>Class: Math 20 - Spring, 2000</p>
            <GradesForm
              handleFormSubmit={Home.handleFormSubmit}
              buttonText="Get Grades"
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Home;
