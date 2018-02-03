import request from 'supertest';
import mongoose from 'mongoose';

import app from '../server';

let server;
const courseName = 'Math 20 - Spring, 2000';
const instructor = 'Instructor:Gary Smith';

describe('Test API', () => {
  beforeAll(async () => {
    server = await request(app);
  });

  afterAll(async () => {
    try {
      // Drop DB
      await mongoose.connection.db.dropDatabase();
      await mongoose.connection.close();
      // Close server
      // await server.close();
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
  });

  test('it scrapes grades from demo class', async () => {
    // URL from the demo class
    const demoURL = '/scrape?id=8010&url=http://www.gradesource.com/demo/example1/index.html';

    const response = await server.get(`/api${demoURL}`).send();
    expect(response.statusCode).toBe(200);
    expect(response.body.courseName).toBe(courseName);
    expect(response.body.instructor).toBe(instructor);
    // Check grades for user with ID 8010
    expect(response.body.csGrades[0].name).toBe('Course');
    expect(response.body.csGrades[0].Rank).toBe('9');
    expect(response.body.csGrades[0].Score).toBe('84.26% / 100%');
    expect(response.body.asGrades[0].name).toBe('Homework One');
    expect(response.body.asGrades[0].Rank).toBe('30');
    expect(response.body.asGrades[0].Score).toBe('33 / 40');
  });

  test('it successfully adds class given url', async () => {
    const url = 'http://www.gradesource.com/demo/example1/index.html';

    const response = await server.post('/api/classes').send({ url });
    expect(response.statusCode).toBe(201);
    expect(response.body.courseName).toBe(`${courseName} - ${instructor}`);
  });

  test('it fails if no url provided', async () => {
    const url = null;

    const response = await server.post('/api/classes').send({ url });
    expect(response.statusCode).toBe(422);
  });

  test('it fails to add class with invalid url', async () => {
    const url = 'some invalid url';

    const response = await server.post('/api/classes').send({ url });
    expect(response.statusCode).toBe(422);
  });

  test('it fails to add class if not found', async () => {
    const url = 'http://www.gradesource.com/non-existent-url.html';

    const response = await server.post('/api/classes').send({ url });
    expect(response.statusCode).toBe(404);
  });
});
