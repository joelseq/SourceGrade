// Module Dependencies
const async = require('async');
const cheerio = require('cheerio');
const axios = require('axios');
const Class = require('../../models/class');

/**
 * replaceUrl - Function to get the base url for the course
 * @param url - the entire url for the index page of the course
 * @returns string - base url
 */
function replaceUrl(url) {
  const str = `${url.substr(url.lastIndexOf('/') + 1)}$`;
  return url.replace(new RegExp(str), '');
}

/**
 * scrapeClass - scrapes the url given to get the class info
 * @param  req - the request object
 * @param  res - the response object
 * @param  next - to pass errors on to the error handler
 */
function scrapeClass(req, res, next) {
  const { url } = req.body;

  if (!url) {
    res.status(422).json({ error: 'URL must be provided' });
  }

  let courseName;
  let instructor;

  axios(url)
    .then((response) => {
      const $ = cheerio.load(response.data);

      const tables = $('center>table');

      const courseNameTable = tables.first();
      courseName = courseNameTable.find('b').text();
      const linksTable = courseNameTable.next();
      instructor = linksTable.find('font').first().text();

      // If course name or instructor name cannot be parsed, throw error
      if (!courseName || !instructor) {
        return next({ error: 'Could not find course' });
      }

      const courseString = `${courseName} - ${instructor}`;
      return Class.create({ courseName: courseString, url }, (err, created) => {
        if (err) {
          return next({ error: 'Class already exists' });
        }
        return res.status(201).json(created);
      });
    })
    .catch(err => next(err));
}

/**
 * getGrades - gets all the grades for all the categories in that particular url
 * @param data - object containing id, url, and array to store grades
 * @param callback - callback function once done
 * @returns true on successful execution
 */
function getGrades(data, callback) {
  axios(data.url)
    .then((response) => {
      const $ = cheerio.load(response.data);
      // Filter out the table containing the scores
      const tables = $('table');
      let table;
      let categories;

      tables.each(function needThis() {
        if ($(this).attr('cellpadding', '3')) {
          table = $(this);
        }
      });

      /* eslint-disable array-callback-return */
      table.filter(() => {
        // Get the first row of that table
        let row = table.children().first();
        // Keep track of the number of categories/assessments
        categories = row.children().length - 2;
        // Start from the 3rd td in that row
        let td = row.children().first().next().next();

        // Loop through the entire row, store the info of each td
        for (let i = 0; i < categories; i++) {
          // Create grade object and push to grades array
          const grade = {
            numProps: td.attr('colspan') || 1,
            name: td.text(),
            scores: [],
          };
          data.grades.push(grade);
          td = td.next();
        }

        // Variable for row with target id
        let targetRow;
        // Variable to keep track of the row as parsing through for grades
        let currentRow = row;
        // Keeps track of the row containing the labels
        const labelsRow = row.next();
        // Variable to keep track of label and grade tds
        let labelTd;
        let gradeTd;
        const numLabels = labelsRow.children().length - 2;
        currentRow = currentRow.next().next().next(); // start from first secret number

        // Parse through rows to record all the students scores for each category
        for (let i = 0; i < table.children().length - 3; i++) {
          if (currentRow.children().first().text() === data.id) {
            targetRow = currentRow;
          }
          // Get the labels td in position for the first label
          labelTd = labelsRow.children().first().next().next();
          // Get the grades td in position for the first grade
          gradeTd = currentRow.children().first().next().next();

          let index = 0;

          for (let j = 0; j < numLabels; j++) {
            if (labelTd.text() === 'Score') {
              const score = parseFloat(gradeTd.text());
              // Push the score of this student into the respective category
              if (score >= 0) {
                data.grades[index].scores.push(score);
              }
              index++;
            }
            labelTd = labelTd.next();
            gradeTd = gradeTd.next();
          }

          if (currentRow.next()) {
            currentRow = currentRow.next();
          }
        }

        // Get the second row of the table
        row = row.next();
        // Get row containing limits
        const limitsRow = row.next();

        // Td holding the property name
        td = row.children().first().next().next();
        // Tds holding property values and limits
        let targetTd = targetRow.children().first().next().next();
        let limitTd = limitsRow.children().first().next().next();

        // Variables used to get the properties for each grade
        let j = 0;
        let count = parseInt(data.grades[0].numProps, 10);

        // Loop through the row getting the properties and their values and limits
        for (let i = 0; i < numLabels; i++) {
          if (count === 0) {
            j++;
            count = parseInt(data.grades[j].numProps, 10);
          }
          const propName = td.text();
          let propValue = targetTd.text();
          // Check if text is not empty the JS way
          if (limitTd.text() !== String.fromCharCode(160)) {
            propValue += ` / ${limitTd.text()}`;
          }
          data.grades[j][propName] = propValue; // eslint-disable-line
          td = td.next();
          limitTd = limitTd.next();
          targetTd = targetTd.next();
          count--;
        }
      }); /* end of filter */
      callback();
    })
    .catch(err => callback(err));
}

/**
 * scrapeData - Scrapes the user's data depending on the given id and url
 * @param req - the request object
 * @param res - the response object
 * @param next - to pass errors on to the error handler
 */
function scrapeData(req, res, next) {
  const { id, url } = req.query;

  let grades = {};
  let csGrades = [];
  let asGrades = [];
  let courseName;
  let instructor;

  const baseUrl = replaceUrl(url);
  let coursestand;
  let asLink;

  axios(url)
    .then((response) => {
      const $ = cheerio.load(response.data);

      const tables = $('center>table');

      const courseNameTable = tables.first();
      courseName = courseNameTable.find('b').text();
      const linksTable = courseNameTable.next();

      coursestand = `${baseUrl}coursestand.html`;

      // TODO: Figure out why I'm 'filtering' here as well and then remove disables
      // Filter out the table to reach the anchor tags
      /* eslint-disable array-callback-return */
      /* eslint-disable consistent-return */
      linksTable.filter(function needThis() {
        const table = $(this);
        instructor = table.find('font').first().text();
        // Get the tr containing the td we need
        const tr = table.children().last();
        // Get the td containing all the anchors we need
        const td = tr.children().last();
        // Find all the anchors
        const anchors = td.find('a');

        // Get one assessment anchor
        let anchor;

        anchors.each(function needThisAlso() {
          const ahref = $(this).attr('href');
          if (ahref.includes('as')) {
            anchor = baseUrl + ahref;
            return false;
          }
        });

        asLink = anchor;

        if (!asLink) {
          return next({ error: 'Invalid URL' });
        }
      }); /* end of filter */

      const csData = {
        id,
        url: coursestand,
        grades: csGrades,
      };

      const asData = {
        id,
        url: asLink,
        grades: asGrades,
      };

      const dataArrays = [csData, asData];

      async.each(dataArrays, getGrades, (err) => {
        if (err) {
          next(err);
        } else {
          csGrades.reverse();
          grades = {
            courseName,
            instructor,
            csGrades,
            asGrades,
          };
          res.json(grades);
        }
      });
    })
    .catch(err => next(err));
}

const scraper = {
  scrapeClass,
  scrapeData,
};

module.exports = scraper;
