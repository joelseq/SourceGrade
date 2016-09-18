'use strict';

/**
 * Created by joelsequeira on 8/6/16.
 */

//==============================
// Module Dependencies
//==============================
var async = require('async');
var request = require('request');
var cheerio = require('cheerio');
var axios = require('axios');
var Class = require('../../models/class');

var scraper = {
  scrapeClass: scrapeClass,
  scrapeData: scrapeData
};

/**
 * replaceUrl - Function to get the base url for the course
 * @param url - the entire url for the index page of the course
 * @returns string - base url
 */
function replaceUrl(url) {
  var str = url.substr(url.lastIndexOf('/') + 1) + '$';
  return url.replace(new RegExp(str), '');
}

/**
 * scrapeClass - scrapes the url given to get the class info
 * @param  req - the request object
 * @param  res - the response object
 * @param  next - to pass errors on to the error handler
 */
function scrapeClass(req, res, next) {
  var url = req.body.url;

  var courseName = void 0;
  var instructor = void 0;

  axios(url).then(function (response) {
    var $ = cheerio.load(response.data);

    var tables = $('center>table');

    var courseNameTable = tables.first();
    courseName = courseNameTable.find("b").text();
    var linksTable = courseNameTable.next();

    //Filter out the table to reach the anchor tags
    linksTable.filter(function () {
      var table = $(this);
      instructor = table.find("font").first().text();
    }); /* end of filter */

    if (courseName && instructor) {
      var courseString = courseName + ' - ' + instructor;
      Class.create({ courseName: courseString, url: url }, function (err, created) {
        if (err) {
          return next({ error: 'Class already exists' });
        }
        return res.json({ message: 'Successfully added class' });
      });
    } else {
      next({ error: 'Could not find course' });
    }
  }).catch(function (err) {
    return next(err);
  });
}

/**
 * scrapeData - Scrapes the user's data depending on the given id and url
 * @param req - the request object
 * @param res - the response object
 * @param next - to pass errors on to the error handler
 */
function scrapeData(req, res, next) {
  var id = req.query.id;
  var url = req.query.url;

  var grades = {};
  var csGrades = [];
  var asGrades = [];
  var courseName = void 0;
  var instructor = void 0;

  var baseUrl = replaceUrl(url);
  var coursestand = void 0,
      asLink = void 0;

  // Array of async functions
  var asyncTasks = [];

  axios(url).then(function (response) {
    var $ = cheerio.load(response.data);

    var tables = $('center>table');

    var courseNameTable = tables.first();
    courseName = courseNameTable.find("b").text();
    var linksTable = courseNameTable.next();

    coursestand = baseUrl + "coursestand.html";

    //Filter out the table to reach the anchor tags
    linksTable.filter(function () {
      var table = $(this);
      instructor = table.find("font").first().text();
      //Get the tr containing the td we need
      var tr = table.children().last();
      //Get the td containing all the anchors we need
      var td = tr.children().last();
      //Find all the anchors
      var anchors = td.find("a");

      //Get one assessment anchor
      var anchor;

      anchors.each(function (i, elem) {
        var ahref = $(this).attr("href");
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

    var csData = {
      id: id,
      url: coursestand,
      grades: csGrades
    };

    var asData = {
      id: id,
      url: asLink,
      grades: asGrades
    };

    var dataArrays = [csData, asData];

    async.each(dataArrays, getGrades, function (err) {
      if (err) {
        next(err);
      } else {
        csGrades.reverse();
        grades = {
          courseName: courseName,
          instructor: instructor,
          csGrades: csGrades,
          asGrades: asGrades
        };
        res.json(grades);
      }
    });
  }).catch(function (err) {
    return next(err);
  });
}

/**
 * getGrades - gets all the grades for all the categories in that particular url
 * @param data - object containing id, url, and array to store grades
 * @param callback - callback function once done
 * @returns true on successful execution
 */
function getGrades(data, callback) {
  axios(data.url).then(function (response) {
    var $ = cheerio.load(response.data);
    // Filter out the table containing the scores
    var tables = $('table');
    var table;
    var categories;

    tables.each(function () {
      if ($(this).attr('cellpadding', '3')) table = $(this);
    });

    table.filter(function () {
      // Get the first row of that table
      var row = table.children().first();
      // Keep track of the number of categories/assessments
      categories = row.children().length - 2;
      // Start from the 3rd td in that row
      var td = row.children().first().next().next();

      // Loop through the entire row, store the info of each td
      for (var i = 0; i < categories; i++) {
        // Create grade object and push to grades array
        var grade = {
          numProps: td.attr('colspan') || 1,
          name: td.text(),
          scores: []
        };
        data.grades.push(grade);
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
      for (var i = 0; i < table.children().length - 3; i++) {
        if (currentRow.children().first().text() === data.id) {
          targetRow = currentRow;
        }
        // Get the labels td in position for the first label
        labelTd = labelsRow.children().first().next().next();
        // Get the grades td in position for the first grade
        gradeTd = currentRow.children().first().next().next();

        var index = 0;

        for (var j = 0; j < numLabels; j++) {
          if (labelTd.text() === "Score") {
            var score = parseFloat(gradeTd.text());
            // Push the score of this student into the respective category
            if (score >= 0) {
              data.grades[index].scores.push(score);
            }
            index++;
          }
          labelTd = labelTd.next();
          gradeTd = gradeTd.next();
        }

        if (currentRow.next()) currentRow = currentRow.next();
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
      var count = parseInt(data.grades[0].numProps, 10);

      // Loop through the row getting the properties and their values and limits
      for (var i = 0; i < numLabels; i++) {
        if (count == 0) {
          j++;
          count = parseInt(data.grades[j].numProps, 10);
        }
        var propName = td.text();
        var propValue = targetTd.text();
        // Check if text is not empty the JS way
        if (limitTd.text() != String.fromCharCode(160)) {
          propValue += " / " + limitTd.text();
        }
        data.grades[j][propName] = propValue;
        td = td.next();
        limitTd = limitTd.next();
        targetTd = targetTd.next();
        count--;
      }
    }); /* end of filter */
    callback();
  }).catch(function (err) {
    return callback(err);
  });
}

module.exports = scraper;