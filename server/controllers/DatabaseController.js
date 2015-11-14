//Set the connection details
var databaseurl = 'test';
var mongojs= require('mongojs');
var db = mongojs(databaseurl);

function matchCriteria(startDate, endDate, frequency, key, type)
{
  var increment = 0;
  var matchCondition = [];

  for(var i = startDate; i<=endDate; i=i+increment)
  {
    var matchField = new Date(0); // The 0 there is the key, which sets the date to the epoch
    matchField.setUTCSeconds(i);

    //Derive Day and Month
    var dd = matchField.getDate();
    var mm = matchField.getMonth()+1; //January is 0!
    var yyyy = matchField.getFullYear();
    if(dd<10) {   dd='0'+dd};
    if(mm<10) {   mm='0'+mm};

    //Derive Week
    var weekDate = new Date(matchField);
    var weekBegin = matchField.getDate() - matchField.getDay();
    var weekEnd = weekBegin + 6; // last day is the first day + 6
    var weekDay = new Date(weekDate.setDate(weekEnd));

    var weekdd = weekDay.getDate();
    var weekmm = weekDay.getMonth()+1; //January is 0!
    var weekyyyy = weekDay.getFullYear();
    if(weekdd<10) {   weekdd='0'+weekdd};
    if(weekmm<10) {   weekmm='0'+weekmm};

    //Derive Hour and Minutes
    var hh = matchField.getHours();
    if (hh<10) {  hh='0'+hh};

    var hourKey = yyyy + mm + dd + hh;
    var dayKey = yyyy + mm + dd;
    var weekKey = weekyyyy + weekmm + weekdd;
    var monthKey = yyyy + mm;

    if (frequency == 'Hour') {
      increment = (60*60);
      matchCondition.push(hourKey);}
    else if (frequency == 'Day') {
      increment = (60*60*24);
      matchCondition.push(dayKey);}
    else if (frequency == 'Week') {
      increment = (60*60*24*7);
      matchCondition.push(weekKey);}
    else if (frequency == 'Month') {
      increment = (60*60*24*28);
      matchCondition.push(monthKey);}

  } //End of 'for' loop

  key['_id.key'] = {$in : matchCondition};
  type['_id.type'] = {$in : [frequency]};

} //end of function matchCriteria
function projectCriteria(startDate, endDate, frequency, projectQuery)
{
  var increment = 0;

  for(var i = startDate; i<=endDate; i=i+increment)
  {
    var matchField = new Date(0); // The 0 there is the key, which sets the date to the epoch
    matchField.setUTCSeconds(i);

    //Derive Day and Month
    var dd = matchField.getDate();
    var mm = matchField.getMonth()+1; //January is 0!
    var yyyy = matchField.getFullYear();
    if(dd<10) {   dd='0'+dd};
    if(mm<10) {   mm='0'+mm};

    //Derive Week
    var weekDate = new Date(matchField);
    var weekBegin = matchField.getDate() - matchField.getDay();
    var weekEnd = weekBegin + 6; // last day is the first day + 6
    var weekDay = new Date(weekDate.setDate(weekEnd));

    var weekdd = weekDay.getDate();
    var weekmm = weekDay.getMonth()+1; //January is 0!
    var weekyyyy = weekDay.getFullYear();
    if(weekdd<10) {   weekdd='0'+weekdd};
    if(weekmm<10) {   weekmm='0'+weekmm};

    //Derive Hour and Minutes
    var hh = matchField.getHours();
    if (hh<10) {  hh='0'+hh};

    var hourKey = yyyy + mm + dd + hh;
    var dayKey = yyyy + mm + dd;
    var weekKey = weekyyyy + weekmm + weekdd;
    var monthKey = yyyy + mm;

    if (frequency == 'Day') {
      increment = (60*60*24);
      projectQuery['value.' + dayKey] = 1;}
    else if (frequency == 'Week') {
      increment = (60*60*24*7);
      projectQuery['value.' + weekKey] = 1}
    else if (frequency == 'Month') {
      increment = (60*60*24*28);
      projectQuery['value.' + monthKey] = 1}

  } //End of 'for' loop
} //end of function matchCriteria


module.exports.usersplit = function(req,res){

 var start,end,selectedfrequency,istest;
 var data;
  console.log("usersplit code is called");
  start = req.query["param1"];
  end = req.query["param2"];
  selectedfrequency = req.query["param3"];
  istest = req.query["param4"];
  console.log("istest value:" + istest);
  var key = {};
  var type = {};

  if(istest == 0)
  {
  	 start = 1420204195 + (86400*150);
	 end = start + (86400*30);
	 selectedfrequency = 'Day';

	  matchCriteria(start,end,selectedfrequency,key,type);

	  db.collection('agg_session_data').aggregate(
	     {$match : {$and : [key,type]}}
	     ,{$unwind : '$value'}
	     ,{$group : {'_id' : '$value._id.key'
	                 ,'New_User_Count' : {$sum : '$value.New_User_Count'}
	                 ,'Unique_User_Count' : {$sum : '$value.Unique_User_Count'}
	                 
	                }}
	    ,{$sort : {'_id' : 1}}
	           ,function (err , result) {
	              if (err || !result) {
	                  console.log(err);
	                  db.close();
	                  return;} //end of function
                  data = result;
	              console.log(result);
	              db.close();
	              return res.json(result);
	          });

	  // console.log("database is called");
	  // console.log(data);
    }
    else
    {
	   if(selectedfrequency == "Day")
	      {
	        data = [ 
	            {_id:"20151001",New_User_Count:"628",Unique_User_Count:"33"},
	            {_id:"20151002",New_User_Count:"530",Unique_User_Count:"27"},
	            {_id:"20151003",New_User_Count:"456",Unique_User_Count:"31"},
	            {_id:"20151004",New_User_Count:"312",Unique_User_Count:"29"},
	            {_id:"20151005",New_User_Count:"567",Unique_User_Count:"19"},
	            {_id:"20151006",New_User_Count:"413",Unique_User_Count:"13"},
	            {_id:"20151007",New_User_Count:"300",Unique_User_Count:"18"}
	         ];
	       }

	      if(selectedfrequency == "Month")
	      {
	        data = [ 
	            {_id:"201410",New_User_Count:"628",Unique_User_Count:"33"},
	            {_id:"201412",New_User_Count:"530",Unique_User_Count:"27"},
	            {_id:"201502",New_User_Count:"456",Unique_User_Count:"31"},
	            {_id:"201504",New_User_Count:"312",Unique_User_Count:"29"},
	            {_id:"201508",New_User_Count:"567",Unique_User_Count:"19"},
	            {_id:"201509",New_User_Count:"413",Unique_User_Count:"13"},
	            {_id:"201510",New_User_Count:"300",Unique_User_Count:"18"}
	         ];
	       }

	      if(selectedfrequency == "Week")
	      {
	        data = [ 
	              {_id:"20150906",New_User_Count:"500",Unique_User_Count:"24"},
	              {_id:"20150913",New_User_Count:"530",Unique_User_Count:"27"},
	              {_id:"20150920",New_User_Count:"412",Unique_User_Count:"27"},
	              {_id:"20150927",New_User_Count:"456",Unique_User_Count:"31"},
	              {_id:"20151004",New_User_Count:"628",Unique_User_Count:"33"},
	              {_id:"20151011",New_User_Count:"312",Unique_User_Count:"29"},
	              {_id:"20151018",New_User_Count:"567",Unique_User_Count:"19"},
	              {_id:"20151025",New_User_Count:"300",Unique_User_Count:"10"},
	              {_id:"20151101",New_User_Count:"413",Unique_User_Count:"13"}
	           ];
	      }

	      if(selectedfrequency == "Hour")
	      {
	        data = [ 
	              {_id:"2015100700",New_User_Count:"500",Unique_User_Count:"24"},
	              {_id:"2015100701",New_User_Count:"530",Unique_User_Count:"27"},
	              {_id:"2015100703",New_User_Count:"456",Unique_User_Count:"31"},
	              {_id:"2015100704",New_User_Count:"628",Unique_User_Count:"33"},
	              {_id:"2015100707",New_User_Count:"312",Unique_User_Count:"29"},
	              {_id:"2015100708",New_User_Count:"567",Unique_User_Count:"19"},
	              {_id:"2015100709",New_User_Count:"300",Unique_User_Count:"10"},
	              {_id:"2015100712",New_User_Count:"413",Unique_User_Count:"13"},
	              {_id:"2015100718",New_User_Count:"300",Unique_User_Count:"18"},
	              {_id:"2015100719",New_User_Count:"234",Unique_User_Count:"45"}
	           ];
	      }
	      res.json(data);
	  }

}