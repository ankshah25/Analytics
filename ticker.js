//Set the connection details
var databaseurl = 'test';
var mongojs= require('mongojs');
var db = mongojs(databaseurl);

var startDate = 1420204173 + (86400*167);

//var startDate = 1420204150 + (86400*167);
var endDate = startDate + (600);

//console.log(startDate);

var fromDate = {};
fromDate['_id'] = {$gt : startDate};

var toDate = {};
toDate['_id'] = {$lt : endDate};

//console.log(fromDate);
//console.log(toDate);

db.collection('real_time_data').find
  ({$and : [fromDate, toDate]}
   ,function (err , result) {
     if (err || !result) {
              console.log(err);
              db.close();
              return;} //end of function

     console.log(result);
     db.close();
  });

  // [ { _id: 1434632985, count: 1 },
  // { _id: 1434633000, count: 1 },
  // { _id: 1434633015, count: 1 },
  // { _id: 1434633030, count: 2 },
  // { _id: 1434633060, count: 1 },
  // { _id: 1434633075, count: 1 },
  // { _id: 1434633090, count: 1 },
  // { _id: 1434633105, count: 1 },
  // { _id: 1434633120, count: 1 },
  // { _id: 1434633135, count: 1 },
  // { _id: 1434633150, count: 1 },
  // { _id: 1434633165, count: 1 },
  // { _id: 1434633180, count: 1 },
  // { _id: 1434633195, count: 1 },
  // { _id: 1434633210, count: 1 },
  // { _id: 1434633225, count: 1 },
  // { _id: 1434633240, count: 2 },
  // { _id: 1434633255, count: 1 },
  // { _id: 1434633270, count: 2 },
  // { _id: 1434633285, count: 1 },
  // { _id: 1434633300, count: 1 },
  // { _id: 1434633315, count: 1 },
  // { _id: 1434633330, count: 1 },
  // { _id: 1434633345, count: 1 },
  // { _id: 1434633360, count: 1 },
  // { _id: 1434633375, count: 1 },
  // { _id: 1434633390, count: 1 },
  // { _id: 1434633405, count: 1 },
  // { _id: 1434633420, count: 1 } ]
