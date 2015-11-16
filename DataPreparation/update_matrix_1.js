//Set the connection details
var databaseurl = 'test';
var mongojs= require('mongojs');
var db = mongojs(databaseurl);
//var sessionCollection = db.collection('user_test');
var sessionCollection = db.collection('user_session_info');
var eventCollection = db.collection('user_event_info');
var hourlySessionCollection = db.collection('user_hourly_session_info');
var hourlyEventCollection = db.collection('user_hourly_event_info');

var recordType = 'Begin';
var activityEpoch = 1420204195 + (86400*315);
var resolution = '800*1200';
var deviceID = '1';
var orientation = 'potrait';
var deviceManufacturer = 'Apple';
var deviceType = 'Mobile';
var device = 'gt-2550';
var platform = 'Android';
var operatingSystemVersion = '1.0';
var appVersion = '2.0';
var IPAddress = '172.0.0.1';   //City to be calculated later
var carrier = 'Vodafone';
var network = 'wifi';          //Not updated

//For Event/Session Begin/Session End - derive day, week and month
var activityTime = new Date(0); // The 0 there is the key, which sets the date to the epoch
activityTime.setUTCSeconds(activityEpoch);

//Derive Day and Month
var dd = activityTime.getDate();
var mm = activityTime.getMonth()+1; //January is 0!
var yyyy = activityTime.getFullYear();
if(dd<10) {   dd='0'+dd};
if(mm<10) {   mm='0'+mm};

//Derive Week
var weekDate = new Date(activityTime);
var weekBegin = activityTime.getDate() - activityTime.getDay();
var weekEnd = weekBegin + 6; // last day is the first day + 6
var weekDay = new Date(weekDate.setDate(weekEnd));

var weekdd = weekDay.getDate();
var weekmm = weekDay.getMonth()+1; //January is 0!
var weekyyyy = weekDay.getFullYear();
if(weekdd<10) {   weekdd='0'+weekdd};
if(weekmm<10) {   weekmm='0'+weekmm};

//Derive Hour and Minutes
var hh = activityTime.getHours();
if (hh<10) {  hh='0'+hh};
var mi = activityTime.getMinutes();
if (mi<10) {  mi='0'+mi};

var hourFormat = yyyy + mm + dd + hh;
var dayFormat = yyyy + mm + dd;
var weekFormat = weekyyyy + weekmm + weekdd;
var monthFormat = yyyy + mm;

//For Session Begin
if (recordType == 'Begin')
{
  var sessionHour = 'SH'+ hourFormat;
  var sessionDay = 'SD' + dayFormat;
  var sessionWeek = 'SW' + weekFormat;
  var sessionMonth ='SM' + monthFormat;

  var incrementSessionQuery = {};
  incrementSessionQuery[sessionDay] = 1;
  incrementSessionQuery[sessionWeek] = 1;
  incrementSessionQuery[sessionMonth] = 1;

  var incrementHourlyQuery = {};
  incrementHourlyQuery[sessionHour] = 1;

  var updateSessionQuery = {};
  var updateHourlyQuery = {};

  function insertUser(){
    updateSessionQuery = {$inc : incrementSessionQuery
                          ,$set : {'lr' : resolution
                                  ,'lo' : orientation
                                  ,'lm' : deviceManufacturer
                                  ,'lt' : deviceType
                                  ,'ld' : device
                                  ,'lp' : platform
                                  ,'lov' : operatingSystemVersion
                                  ,'lav' : appVersion
                                  //,last city to be coded
                                  ,'lc' : carrier
                                  ,'ll' : activityTime
                                  //,'fl' : activityTime
                                  ,'flh' : hourFormat
                                  ,'fld' : dayFormat
                                  ,'flw' : weekFormat
                                  ,'flm' : monthFormat}};

    updateHourlyQuery = {$inc : incrementHourlyQuery
                        ,$set : {'lr' : resolution
                                ,'lo' : orientation
                                ,'lm' : deviceManufacturer
                                ,'lt' : deviceType
                                ,'ld' : device
                                ,'lp' : platform
                                ,'lov' : operatingSystemVersion
                                ,'lav' : appVersion
                                //,last city to be coded
                                ,'lc' : carrier
                                ,'ll' : activityTime
                                ,'flh' : hourFormat}};
    };

  function updateUser(){
    updateSessionQuery = {$inc : incrementSessionQuery
                          ,$set : {'lr' : resolution
                                  ,'lo' : orientation
                                  ,'lm' : deviceManufacturer
                                  ,'lt' : deviceType
                                  ,'ld' : device
                                  ,'lp' : platform
                                  ,'lov' : operatingSystemVersion
                                  ,'lav' : appVersion
                                  //,last city to be coded
                                  ,'lc' : carrier
                                  ,'ll' : activityTime}};

    updateHourlyQuery = {$inc : incrementHourlyQuery
                        ,$set : {'lr' : resolution
                                ,'lo' : orientation
                                ,'lm' : deviceManufacturer
                                ,'lt' : deviceType
                                ,'ld' : device
                                ,'lp' : platform
                                ,'lov' : operatingSystemVersion
                                ,'lav' : appVersion
                                //,last city to be coded
                                ,'lc' : carrier
                                ,'ll' : activityTime}};
    };

  sessionCollection.find({'_id' : deviceID},
    function (err , result){
      //console.log(result);
      // If the user doesn't exist then set first login time 'fl'
      if (result.length == 0) insertUser();
      //If the user exists then first login time is not changed
      else updateUser();

      sessionCollection.update({'_id' : deviceID},updateSessionQuery,{upsert:true});
      hourlySessionCollection.update({'_id' : deviceID},updateHourlyQuery,{upsert:true});
      db.close();
    }); // End of sessionCollection.find

}; //End of Session 'Begin' condition check

if (recordType == 'End')
{
  var timeSpent = 100;

  //Derive fields to be updated
  var durationHour = 'DH'+ hourFormat;
  var durationDay = 'DD' + dayFormat;
  var durationWeek = 'DW' + weekFormat;
  var durationMonth ='DM' + monthFormat;

  //increment the fields with time spent during the session
  var incrementSessionQuery = {};
  incrementSessionQuery[durationDay] = timeSpent;
  incrementSessionQuery[durationWeek] = timeSpent;
  incrementSessionQuery[durationMonth] = timeSpent;

  var incrementHourlyQuery = {};
  incrementHourlyQuery[durationHour] = timeSpent;

  //update the time spent during the session
  sessionCollection.update({'_id' : deviceID }, {$inc : incrementSessionQuery});
  hourlySessionCollection.update({'_id' : deviceID }, {$inc : incrementHourlyQuery});
  db.close();
} //End of Session 'End' condition check

if (recordType == 'Event')
{
  var eventName = 'Image/Download';

  var eventHour = 'EH' + hourFormat;
  var eventDay = 'ED' + dayFormat;
  var eventWeek = 'EW' + weekFormat;
  var eventMonth = 'EM' + monthFormat;

  var updateQuery = {};

  //Form findQuery to select the Event Day, Week and Month columns only
  var findQuery = {};
  findQuery[eventDay] = 1;
  findQuery[eventWeek] = 1;
  findQuery[eventMonth] = 1;

  eventCollection.find(
    {'_id' : deviceID}
    ,findQuery
    ,function (err , result) {
       if (err || !result) {
           console.log(err);
           db.close();
           return;}

       readResult(result);
    }); //End of eventCollection.find

  function readResult(result) {
    var dayArray = new Array();
    var weekArray = new Array();
    var monthArray = new Array();

    function addEvent(){
      var eventRecord = {};
      eventRecord['name'] = eventName;
      eventRecord['value'] = 1;
      return eventRecord;
      } // end of function addEvent

    function buildArray(eventArray){
      var eventFound = 0;
      var newArray = new Array();

      for (var i=0; i<eventArray.length; i++) {
        var eventRecord = eventArray[i];

        if (eventRecord.name == eventName) {
          eventFound = 1;
          //console.log('Found');
          var updateRecord = {};
          updateRecord['name'] = eventRecord.name;
          updateRecord['value'] = eventRecord.value + 1;
          newArray.push(updateRecord);  }
        else newArray.push(eventRecord);
        } // end of FOR loop

      if (eventFound == 0) newArray.push(addEvent());

      return newArray;
      } // end of function buildArray

    if (result.length == 0) {
      dayArray.push(addEvent());
      weekArray.push(addEvent());
      monthArray.push(addEvent());
      } // end of IF condition to check if the result is empty
    else {
      if (typeof(result[0][eventDay]) == 'undefined') dayArray.push(addEvent());
      else dayArray = buildArray(result[0][eventDay]);

      if (typeof(result[0][eventWeek]) == 'undefined') weekArray.push(addEvent());
      else weekArray = buildArray(result[0][eventWeek]);

      if (typeof(result[0][eventMonth]) == 'undefined') monthArray.push(addEvent());
      else monthArray = buildArray(result[0][eventMonth]);
      } // end of ELSE condition to check if the result is empty

    updateQuery[eventDay] = dayArray;
    updateQuery[eventWeek] = weekArray;
    updateQuery[eventMonth] = monthArray;

    updateQuery['lr'] = resolution;
    updateQuery['lo'] = orientation;
    updateQuery['lm'] = deviceManufacturer;
    updateQuery['lt'] = deviceType;
    updateQuery['ld'] = device;
    updateQuery['lp'] = platform;
    updateQuery['lov'] = operatingSystemVersion;
    updateQuery['lav'] = appVersion;
    //last city to be coded
    updateQuery['lc'] = carrier;

    eventCollection.update(
      {'_id' : deviceID}
      ,{$set : updateQuery}
      ,{upsert : true}
      ); //End of eventCollection.update
    db.close();
  } //end of function readResult
} //end of IF condition for 'Event' record
