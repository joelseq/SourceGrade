/**
 * Created by joelsequeira on 8/6/16.
 */

//==============================
// Module Dependencies
//==============================
const async = require('async');
const request = require('request');
const cheerio = require('cheerio');

const scrape = {
  scrapeData: scrapeData
};


/**
 * replaceUrl - Function to get the base url for the course
 * @param url - the entire url for the index page of the course
 * @returns string - base url
 */
function replaceUrl(url) {
  let str = url.substr(url.lastIndexOf('/') + 1) + '$';
  return url.replace( new RegExp(str), '' );
}

/**
 * scrapeData - Scrapes the user's data depending on the given id and url
 * @param id - the user's gradesource number
 * @param url - the course homepage
 * @returns grades - an array containing all the scores
 */
function scrapeData(id, url) {
  // Arrays of grade objects
  let grades = [];
  let csGrades = [];
  let asGrades = [];

  const baseUrl = replaceUrl(url);
  let coursestand, asLink;

  // Array of async functions
  let asyncTasks = [];
  // Boolean for if id is found
  var idFound = false;

  // Initial request to homepage
  request(url, (error, response, html) => {
    if(error) {
      return {error: 'Invalid URL'};
    }
    else {
      const $ = cheerio.load(html);
      let tables = $('center>table');
      let table;

      tables.each(() => {
        if($(this).attr('width', '50%'))
          table = $(this);
      });

      coursestand = baseUrl + 'coursestand.html';

      // Filter out the table to reach the anchor tags
      table.filter(() => {
        let table = $(this);
        // Get the tr containing the td we need
        let tr = table.children().last();
        // Get the td containing all the anchors we need
        let td = tr.children().last();
        // Find all the anchors
        let anchors = td.find('a');
        // For one assessment anchor
        let anchor;

        anchors.each((i, elem) => {
          let ahref = $(this).attr('href');
          if(ahref.includes('as')) {
            anchor = baseUrl + ahref;
            return false;
          }
        });

        asLink = anchor;
      });

      let success = getGrades(id, coursestand, asyncTasks, csGrades);
      getGrades(id, asLink, asyncTasks, asGrades);

      if(!success)
        return {error: 'Invalid ID'};

      async.parallel(asyncTasks, (err) => {
        if(err) {
          console.log(err);
        } else {
          csGrades.reverse();
          grades = csGrades.concat(asGrades);
          return grades;
        }
      });
    }
  });
}

/**
 * getGrades - gets all the grades for all the categories in that particular url
 * @param id - secret number of target student
 * @param url - url containing grades
 * @param tasksArray - array for async
 * @param gradesArray - array containing all the grades
 * @returns true on successful execution
 */
function getGrades(id, url, tasksArray, gradesArray) {
  tasksArray.push((done) => {
    request(url, (error, response, html) => {
      if(error) {
        return false;
      } else {
        let $ = cheerio.load(html);
        // Filter out the table containing the scores
        let tables = $('table');
        let table;
        let categories;

        tables.each(() => {
          if($(this).attr('cellpadding', '3'))
            table = $(this);
        });

        table.filter(() => {
          // Get the first row of that table
          let row = table.children().first();
          // Keep track of the number of categories/assessments
          categories = row.children().length - 2;
          // Start from the 3rd td in that row
          let td = row.children().first().next().next();

          // Loop through the entire row, store the info of each td
          for(let i = 0; i < categories; i++) {
            // Create grade object and push to grades array
            let grade = {
              numProps: td.attr('colspan'),
              name: td.text(),
              scores: []
            };
            gradesArray.push(grade);
            td = td.next();
          }

          // Variable for row with target id
          let targetRow;
          // Variable to keep track of the row as parsing through for grades
          let currentRow = row;
          // Keeps track of the row containing the labels
          let labelsRow = row.next();
          // Variable to keep track of label and grade tds
          let labelTd, gradeTd;
          let numLabels = labelsRow.children().length - 2;
          currentRow = currentRow.next().next().next(); // start from first secret number

          // Parse through rows to record all the students scores for each category
          for(let i = 0; i < table.children().length; i++) {
            if(currentRow.children().first().text() === id) {
              targetRow = currentRow;
            }
            // Get the labels td in position for the first label
            labelTd = labelsRow.children().first().next().next();
            // Get the grades td in position for the first grade
            gradeTd = currentRow.children().first().next().next();

            let index = 0;

            for(let j = 0; j < numLabels; j++) {
              if(labelTd.text() === "Score") {
                let score = parseInt(gradeTd.text(), 10);
                // Push the score of this student into the respective category
                gradesArray[index].scores.push(score);
                index++;
              }
              labelTd = labelTd.next();
              gradeTd = gradeTd.next();
            }

            if(currentRow.next())
              currentRow = currentRow.next();
          }

          // Get the second row of the table
          row = row.next();
          // Get row containing limits
          let limitsRow = row.next();

          // Td holding the property name
          td = row.children().first().next().next();
          // Tds holding property values and limits
          let targetTd = targetRow.children().first().next().next();
          let limitTd = limitsRow.children().first().next().next();

          // Variables used to get the properties for each grade
          let j = 0;
          let count = parseInt(gradesArray[0].numProps, 10);

          // Loop through the row getting the properties and their values and limits
          for(let i = 0; i < labels; i++) {
            if(count == 0) {
              j++;
              count = parseInt(gradesArray[j].numProps, 10);
            }
            let propName = td.text();
            let propValue = targetTd.text();
            // Check if text is not empty the JS way
            if(limitTd.text() != String.fromCharCode(160)) {
              propValue+= " / " + limitTd.text();
            }
            gradesArray[j][propName] = propValue;
            td = td.next();
            limitTd = limitTd.next();
            targetTd = targetTd.next();
            count--;
          }
        }); /* end of filter */

      } /* end of else */
      done();
    }, (err) => {
      return !err;
    });
  });
}

module.exports = scrape;