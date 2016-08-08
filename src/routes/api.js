/**
 * Created by joelsequeira on 8/6/16.
 */

//==============================
// Module Dependencies
//==============================
const express = require('express');
const scrape = require('./utils/scrape');
const async = require('async');
const request = require('request');
const cheerio = require('cheerio');

const router = express.Router();

router.get('/', (req, res) => {
  res.send("Hello World!");
});

router.get('/scrape', (req, res) => {
  const id = req.query.id;
  const url = req.query.url;

  // Arrays of grade objects
  let grades = [];
  let csGrades = [];
  let asGrades = [];

  const baseUrl = replaceUrl(1, url);
  var coursestand, asLink;

  // Array of async functions
  let asyncTasks = [];

  // Initial request to homepage
  request(url, (error, response, html) => {
    if (error) {
      return {error: 'Invalid URL'};
    }
    var $ = cheerio.load(html);

    var baseUrl = replaceUrl(1, url); //The 1 is just for the paramater

    var tables = $('center>table');

    var table;

    tables.each(function() {
      if($(this).attr("width", "50%"))
        table = $(this);
    });

    coursestand = baseUrl + "coursestand.html";

    //Filter out the table to reach the anchor tags
    table.filter(function(){
      var table = $(this);
      //Get the tr containing the td we need
      var tr = table.children().last();
      //Get the td containing all the anchors we need
      var td = tr.children().last();
      //Find all the anchors
      var anchors = td.find("a");

      /* Get one assessment anchor */
      var anchor;

      anchors.each(function(i, elem){
        var ahref = $(this).attr("href");
        if(ahref.includes('as')) {
          anchor = baseUrl + ahref;
          return false;
        }
      });

      asLink = anchor;

    }); /* end of filter */

    asyncTasks.push(function(done) {
      request(coursestand, (error, response, html) => {
        if(error) {
          return false;
        } else {
          var $ = cheerio.load(html);
          // Filter out the table containing the scores
          var tables = $('table');
          var table;
          var categories;

          tables.each(function() {
            if($(this).attr('cellpadding', '3'))
              table = $(this);
          });

          table.filter(function() {
            // Get the first row of that table
            var row = table.children().first();
            // Keep track of the number of categories/assessments
            categories = row.children().length - 2;
            // Start from the 3rd td in that row
            var td = row.children().first().next().next();

            // Loop through the entire row, store the info of each td
            for(var i = 0; i < categories; i++) {
              // Create grade object and push to grades array
              var grade = {
                numProps: td.attr('colspan'),
                name: td.text(),
                scores: []
              };
              csGrades.push(grade);
              td = td.next();
            }

            // Variable for row with target id
            var targetRow;
            // Variable to keep track of the row as parsing through for grades
            var currentRow = row;
            // Keeps track of the row containing the labels
            var labelsRow = row.next();
            // Variable to keep track of label and grade tds
            var labelTd, gradeTd;
            var numLabels = labelsRow.children().length - 2;
            currentRow = currentRow.next().next().next(); // start from first secret number

            // Parse through rows to record all the students scores for each category
            for(var i = 0; i < table.children().length - 3; i++) {
              if(currentRow.children().first().text() === id) {
                targetRow = currentRow;
              }
              // Get the labels td in position for the first label
              labelTd = labelsRow.children().first().next().next();
              // Get the grades td in position for the first grade
              gradeTd = currentRow.children().first().next().next();

              var index = 0;

              for(var j = 0; j < numLabels; j++) {
                if(labelTd.text() === "Score") {
                  var score = parseFloat(gradeTd.text());
                  // Push the score of this student into the respective category
                  if(score) {
                    csGrades[index].scores.push(score);
                  }
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
            var limitsRow = row.next();

            // Td holding the property name
            td = row.children().first().next().next();
            // Tds holding property values and limits
            var targetTd = targetRow.children().first().next().next();
            var limitTd = limitsRow.children().first().next().next();

            // Variables used to get the properties for each grade
            var j = 0;
            var count = parseInt(csGrades[0].numProps, 10);

            // Loop through the row getting the properties and their values and limits
            for(var i = 0; i < numLabels; i++) {
              if(count == 0) {
                j++;
                count = parseInt(csGrades[j].numProps, 10);
              }
              var propName = td.text();
              var propValue = targetTd.text();
              // Check if text is not empty the JS way
              if(limitTd.text() != String.fromCharCode(160)) {
                propValue+= " / " + limitTd.text();
              }
              csGrades[j][propName] = propValue;
              td = td.next();
              limitTd = limitTd.next();
              targetTd = targetTd.next();
              count--;
            }

          }); /* end of filter */

        } /* end of else */
        done();
      }, function(err) {
        if(err) {
          console.log(err);
        }
      });
    });

    asyncTasks.push(function(done) {
      request(asLink, (error, response, html) => {
        if(error) {
          return false;
        } else {
          var $ = cheerio.load(html);
          // Filter out the table containing the scores
          var tables = $('table');
          var table;
          var categories;

          tables.each(function() {
            if($(this).attr('cellpadding', '3'))
              table = $(this);
          });

          table.filter(function() {
            // Get the first row of that table
            var row = table.children().first();
            // Keep track of the number of categories/assessments
            categories = row.children().length - 2;
            // Start from the 3rd td in that row
            var td = row.children().first().next().next();

            // Loop through the entire row, store the info of each td
            for(var i = 0; i < categories; i++) {
              // Create grade object and push to grades array
              var grade = {
                numProps: td.attr('colspan'),
                name: td.text(),
                scores: []
              };
              asGrades.push(grade);
              td = td.next();
            }

            // Variable for row with target id
            var targetRow;
            // Variable to keep track of the row as parsing through for grades
            var currentRow = row;
            // Keeps track of the row containing the labels
            var labelsRow = row.next();
            // Variable to keep track of label and grade tds
            var labelTd, gradeTd;
            var numLabels = labelsRow.children().length - 2;
            currentRow = currentRow.next().next().next(); // start from first secret number

            // Parse through rows to record all the students scores for each category
            for(var i = 0; i < table.children().length - 3; i++) {
              if(currentRow.children().first().text() === id) {
                targetRow = currentRow;
              }
              // Get the labels td in position for the first label
              labelTd = labelsRow.children().first().next().next();
              // Get the grades td in position for the first grade
              gradeTd = currentRow.children().first().next().next();

              var index = 0;

              for(var j = 0; j < numLabels; j++) {
                if(labelTd.text() === "Score") {
                  var score = parseFloat(gradeTd.text());
                  // Push the score of this student into the respective category
                  if(score) {
                    asGrades[index].scores.push(score);
                  }
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
            var limitsRow = row.next();

            // Td holding the property name
            td = row.children().first().next().next();
            // Tds holding property values and limits
            var targetTd = targetRow.children().first().next().next();
            var limitTd = limitsRow.children().first().next().next();

            // Variables used to get the properties for each grade
            var j = 0;
            var count = parseInt(asGrades[0].numProps, 10);

            // Loop through the row getting the properties and their values and limits
            for(var i = 0; i < numLabels; i++) {
              if(count == 0) {
                j++;
                count = parseInt(asGrades[j].numProps, 10);
              }
              var propName = td.text();
              var propValue = targetTd.text();
              // Check if text is not empty the JS way
              if(limitTd.text() != String.fromCharCode(160)) {
                propValue+= " / " + limitTd.text();
              }
              asGrades[j][propName] = propValue;
              td = td.next();
              limitTd = limitTd.next();
              targetTd = targetTd.next();
              count--;
            }

          }); /* end of filter */

        } /* end of else */
        done();
      }, function(err) {
        if(err) {
          console.log(err);
        }
      });
    });

    // Now we have an array of functions doing async tasks
    // Execute all async tasks in the asyncTasks array
    async.parallel(asyncTasks, function(err){
      if(err) {
        console.log(err);
      } else {
        // All tasks are done now
        csGrades.reverse();
        grades = csGrades.concat(asGrades);
        res.json(grades);
      }
    });

  });
});

/**
 * replaceUrl - Function to get the base url for the course
 * @param url - the entire url for the index page of the course
 * @returns string - base url
 */
function replaceUrl(i, url) {
  let str = url.substr(url.lastIndexOf('/') + 1) + '$';
  return url.replace( new RegExp(str), '' );
}


module.exports = router;