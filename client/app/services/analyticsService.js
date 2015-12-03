//This handles retrieving data and is used by controllers. 3 options (server, factory, provider) with 
//each doing the same thing just structuring the functions/data differently.
nameApp.service('analyticsService', ['$http', function ($http,$rootScope) {
  
    this.getCurrentOnlineUsers = function() {
        return parseInt(Math.random() * 1000)
     };

     this.getSessionCounts = function(start,end,selectedfrequency) {
 
 
      console.log(start,end,selectedfrequency);
       //var data;
       return $http.get("/database/sessioncounts",{params:{"param1": start, "param2": end,"param3": selectedfrequency,"param4":1}})
        .success(function(response){
              console.log("I got the data for sessioncounts");
              console.log(response);
              return response;
             // return response;
        }).error(function(){
         alert("error");
         return null ;
      });

};

    this.getUserSplit = function(start,end,selectedfrequency) {

      console.log(start,end,selectedfrequency);
       //var data;
       return $http.get("/database/usersplit",{params:{"param1": start, "param2": end,"param3": selectedfrequency,"param4":0}})
        .success(function(response){
              console.log("I got the data for usersplits");
              console.log(response);
              return response;
             // return response;
        }).error(function(){
         alert("error");
         return null ;
      });

};



     this.getEventsComparisionData = function(start,end,selectedfrequency,selectedevents) {

      console.log(start,end,selectedfrequency,selectedevents);
       //var data;
       return $http.get("/database/eventscomparisiondata",{params:{"param1": start, "param2": end,"param3": selectedfrequency,"param4":1}})
        .success(function(response){
              console.log("I got the data for geteventscomparisiondata");
              console.log(response);
              return response;
             // return response;
        }).error(function(){
         alert("error");
         return null ;
      });

};

     this.getSessionDuration = function(start,end,selectedfrequency) {

      console.log(start,end,selectedfrequency);
       //var data;
       return $http.get("/database/sessionduration",{params:{"param1": start, "param2": end,"param3": selectedfrequency,"param4":0}})
        .success(function(response){
              console.log("I got the data for sessionduration");
              console.log(response);
              return response;
             // return response;
        }).error(function(){
         alert("error");
         return null ;
      });

};

     this.getDevicePieCharts = function(start,end,selectedfrequency) {

      console.log(start,end,selectedfrequency);
       //var data;
       return $http.get("/database/devicepiecharts",{params:{"param1": start, "param2": end,"param3": selectedfrequency,"param4":0}})
        .success(function(response){
              console.log("I got the data for devicepiecharts");
              console.log(response);
              return response;
             // return response;
        }).error(function(){
         alert("error");
         return null ;
      });

};

    // this.getDeviceUsersbyCompanyData = function(start,end,selectedfrequency) {

    //   if((selectedfrequency == "Today") || (selectedfrequency == "Yesterday"))
    //   {
    //      var data = [ 
    //                 {label:"Samsung",usercount:"300"},
    //                 {label:"Sony",usercount:"250"},
    //                 {label:"Micromax",usercount:"100"},
    //                 {label:"Lava",usercount:"245"},
    //                 {label:"HTC",usercount:"123"}
    //              ];
    //   }
    //   else
    //   {
    //        var data = [ 
    //           {label:"Samsung",usercount:"300"},
    //           {label:"Sony",usercount:"650"},
    //           {label:"Micromax",usercount:"400"},
    //           {label:"Lava",usercount:"456"},
    //        ];
    //   }
    //      return data;
    //  };


    // this.getDeviceUsersbyCarriersData = function(start,end,selectedfrequency) {

    //   if((selectedfrequency == "Today") || (selectedfrequency == "Yesterday"))
    //   {
    //      var data = [ 
    //                 {label:"Vodafone",usercount:"300"},
    //                 {label:"Idea",usercount:"250"},
    //                 {label:"Airtel",usercount:"100"},
    //                 {label:"Aircel",usercount:"245"},
    //                 {label:"Docomo",usercount:"123"}
    //              ];
    //   }
    //   else
    //   {
    //        var data = [ 
    //           {label:"Vodafone",usercount:"300"},
    //           {label:"Idea",usercount:"650"},
    //           {label:"Aircel",usercount:"400"},
    //           {label:"Docomo",usercount:"456"},
    //        ];
    //   }
    //      return data;
    //  };

    // this.getDeviceUsersbyOSVersions = function(start,end,selectedfrequency) {

    //   if((selectedfrequency == "Today") || (selectedfrequency == "Yesterday"))
    //   {
    //      var data = [ 
    //                 {label:"4.4 Kitkat",usercount:"300"},
    //                 {label:"5.0 Lollipop",usercount:"250"},
    //                 {label:"6.0 Marshmallow",usercount:"100"},
    //                 {label:"2.3 Gingerbread",usercount:"245"},
    //                 {label:"2.0 Eclair",usercount:"123"},
    //                 {label:"4.5 Kitkat",usercount:"344"}
    //              ];
    //   }
    //   else 
    //   {
    //        var data = [ 
    //           {label:"4.4 Kitkat",usercount:"300"},
    //           {label:"6.0 Marshmallow",usercount:"650"},
    //           {label:"2.3 Gingerbread",usercount:"400"},
    //           {label:"2.0 Eclair",usercount:"456"},
    //        ];
    //   }
    //      return data;
    //  };

     this.getDeviceUsersbyCitiesData = function(start,end,selectedfrequency) {

      if((selectedfrequency == "Today") || (selectedfrequency == "Yesterday"))
      {
         var data = [ 
                     {"cityname":"Delhi","totnumberofusers":"628","lat":"28.6","lon":"77.2"},
                     {"cityname":"Mumbai","totnumberofusers":"530","lat":"18.975","lon":"72.825833"},
                    {"cityname":"Pune","totnumberofusers":"3450","lat":"28.01","lon":"75.38"},
                    {"cityname":"Bangalore","totnumberofusers":"1530","lat":"12.983333","lon":"77.583333"},
                    {"cityname":"Chennai","totnumberofusers":"900","lat":"13.083333","lon":"80.283333"},
                    {"cityname":"Kolkatta","totnumberofusers":"1030","lat":"22.569722","lon":"88.369722"}
                 ];
      }
      else 
      {
           var data = [ 
                     {"cityname":"Delhi","totnumberofusers":"628","lat":"28.6","lon":"77.2"},
                     {"cityname":"Mumbai","totnumberofusers":"530","lat":"18.975","lon":"72.825833"},
                    {"cityname":"Pune","totnumberofusers":"3450","lat":"28.01","lon":"75.38"},
                    {"cityname":"Udaipur","totnumberofusers":"1530","lat":"23.533333","lon":"91.483333"},
                    {"cityname":"Rajkot","totnumberofusers":"900","lat":"25.731111","lon":"80.283333"}
           ];
      }
         return data;
     };

    this.getTickerData = function(start) {

      console.log(start);
       //var data;
       return $http.get("/database/ticker",{params:{"param1": start}})
        .success(function(response){
              console.log("I got the data for ticker");
              console.log(response);
              return response;
             // return response;
        }).error(function(){
         alert("error");
         return null ;
      });

    };

    this.getReturningUserRetentionData = function(start,end,selectedfrequency) {

      console.log(start,end,selectedfrequency);
       //var data;
       return $http.get("/database/returninguserretention",{params:{"param1": start, "param2": end,"param3": selectedfrequency,"param4":0}})
        .success(function(response){
              console.log("I got the data for returning user retention");
              console.log(response);
              return response;
             // return response;
        }).error(function(){
         alert("error");
         return null ;
      });

     };

    this.getNewUserRetentionData = function(start,end,selectedfrequency) {

      console.log(start,end,selectedfrequency);
       //var data;
       return $http.get("/database/newuserretention",{params:{"param1": start, "param2": end,"param3": selectedfrequency,"param4":0}})
        .success(function(response){
              console.log("I got the data for new user retention");
              console.log(response);
              return response;
             // return response;
        }).error(function(){
         alert("error");
         return null ;
      });

     };


    this.getEventsData = function(start,end,selectedfrequency) {

      console.log(start,end,selectedfrequency);
       //var data;
       return $http.get("/database/eventsdata",{params:{"param1": start, "param2": end,"param3": selectedfrequency,"param4":1}})
        .success(function(response){
              console.log("I got the data for eventsdata");
              console.log(response);
              return response;
             // return response;
        }).error(function(){
         alert("error");
         return null ;
      });

    };

  this.loadevents = function() {

      console.log();
       //var data;
       return $http.get("/database/events",{params:{"param4":1}})
        .success(function(response){
              console.log("I got the data for loadevents");
              //console.log(response);
              return response;
             // return response;
        }).error(function(){
         alert("error");
         return null ;
      });

    };

    }]);
