//Set the connection details
var databaseurl = 'test';
var mongojs= require('mongojs');
var db = mongojs(databaseurl);

//var startDateEpoch = 1448180625;
var startDateEpoch = 1448417490;

var currentTime = new Date();
//var currentTimeEpoch = startDateEpoch + 60*10;
var currentTimeEpoch = Math.round(currentTime.getTime()/1000);
console.log(currentTimeEpoch);

var resultSet = [];

db.collection('real_time_data').find
  ().sort({ '_id' : 1}
   ,function (err , result) {
     if (err || !result) {
              console.log(err);
              db.close();
              return;}

     db.close();
     returnresult(result);
  });

function returnresult(result) {
  var arrayItem = {};

  for (var i=0; i<result.length; i++){
    if (i !=0) result[i].count = result[i-1].count + result[i].count;
    arrayItem[result[i]._id] = result[i].count;
  }

  //console.log(arrayItem);

  for (var i=startDateEpoch; i<=currentTimeEpoch; i = i+15){
    if (i == startDateEpoch) {
      if (!arrayItem[i]) arrayItem[i] = 0;
    }
    else {
      if (!arrayItem[i]) arrayItem[i] = arrayItem[i-15];
    }}

  console.log(arrayItem);

} //end of function returnresult
