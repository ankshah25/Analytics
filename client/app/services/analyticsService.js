//This handles retrieving data and is used by controllers. 3 options (server, factory, provider) with 
//each doing the same thing just structuring the functions/data differently.
nameApp.service('analyticsService', ['$http', function ($http,$rootScope) {
  
    this.getCurrentOnlineUsers = function() {
        return parseInt(Math.random() * 1000)
     };

     this.getSessionCounts = function(start,end,selectedfrequency) {
 
      if(selectedfrequency == "Day")
      {
       var data = [ 
            {date:"20151001",totnumberofsessions:"628",avgnumberofsessions:"33"},
            {date:"20151002",totnumberofsessions:"530",avgnumberofsessions:"27"},
            {date:"20151003",totnumberofsessions:"456",avgnumberofsessions:"31"},
            {date:"20151004",totnumberofsessions:"312",avgnumberofsessions:"29"},
            {date:"20151005",totnumberofsessions:"567",avgnumberofsessions:"19"},
            {date:"20151006",totnumberofsessions:"413",avgnumberofsessions:"13"},
            {date:"20151007",totnumberofsessions:"300",avgnumberofsessions:"18"}
         ];
       }

      if(selectedfrequency == "Month")
      {
       var data = [ 
            {date:"201410",totnumberofsessions:"628",avgnumberofsessions:"33"},
            {date:"201412",totnumberofsessions:"530",avgnumberofsessions:"27"},
            {date:"201502",totnumberofsessions:"456",avgnumberofsessions:"31"},
            {date:"201504",totnumberofsessions:"312",avgnumberofsessions:"29"},
            {date:"201508",totnumberofsessions:"567",avgnumberofsessions:"19"},
            {date:"201509",totnumberofsessions:"413",avgnumberofsessions:"13"},
            {date:"201510",totnumberofsessions:"300",avgnumberofsessions:"18"}
         ];
       }

      if(selectedfrequency == "Week")
      {
       var data = [ 
              {date:"20150906",totnumberofsessions:"500",avgnumberofsessions:"24"},
              {date:"20150913",totnumberofsessions:"530",avgnumberofsessions:"27"},
              {date:"20150920",totnumberofsessions:"412",avgnumberofsessions:"27"},
              {date:"20150927",totnumberofsessions:"456",avgnumberofsessions:"31"},
              {date:"20151004",totnumberofsessions:"628",avgnumberofsessions:"33"},
              {date:"20151011",totnumberofsessions:"312",avgnumberofsessions:"29"},
              {date:"20151018",totnumberofsessions:"567",avgnumberofsessions:"19"},
              {date:"20151025",totnumberofsessions:"300",avgnumberofsessions:"10"},
              {date:"20151101",totnumberofsessions:"413",avgnumberofsessions:"13"}
           ];
      }

      if(selectedfrequency == "Hour")
      {
       var data = [ 
              {date:"2015100700",totnumberofsessions:"500",avgnumberofsessions:"24"},
              {date:"2015100701",totnumberofsessions:"530",avgnumberofsessions:"27"},
              {date:"2015100703",totnumberofsessions:"456",avgnumberofsessions:"31"},
              {date:"2015100704",totnumberofsessions:"628",avgnumberofsessions:"33"},
              {date:"2015100707",totnumberofsessions:"312",avgnumberofsessions:"29"},
              {date:"2015100708",totnumberofsessions:"567",avgnumberofsessions:"19"},
              {date:"2015100709",totnumberofsessions:"300",avgnumberofsessions:"10"},
              {date:"2015100712",totnumberofsessions:"413",avgnumberofsessions:"13"},
              {date:"2015100718",totnumberofsessions:"300",avgnumberofsessions:"18"},
              {date:"2015100719",totnumberofsessions:"234",avgnumberofsessions:"45"}
           ];
      }

    return data;

};

    this.getUserSplit = function(start,end,selectedfrequency) {

       //var data;
       return $http.get("/usersplit",{params:{"param1": start, "param2": end,"param3": selectedfrequency,"param4":0}})
        .success(function(response){
              console.log("I got the data");
              console.log(response);
              console.log("Control is passed in http response");
              return response;
             // return response;
        }).error(function(){
         alert("error");
         return null ;
      });
      //console.log("scope object:" + $scope);

    // console.log("Control is passed over here");
    // return data;
};


     this.getSessionDuration = function(start,end,selectedfrequency) {


     if(selectedfrequency == "Day")
      {
       var data = [ 
            {date:"20151001",tottimespent:"628",avgtimespent:"33"},
            {date:"20151002",tottimespent:"530",avgtimespent:"27"},
            {date:"20151003",tottimespent:"456",avgtimespent:"31"},
            {date:"20151004",tottimespent:"312",avgtimespent:"29"},
            {date:"20151005",tottimespent:"567",avgtimespent:"19"},
            {date:"20151006",tottimespent:"413",avgtimespent:"13"},
            {date:"20151007",tottimespent:"300",avgtimespent:"18"}
         ];
       }

      if(selectedfrequency == "Month")
      {
       var data = [ 
            {date:"201410",tottimespent:"628",avgtimespent:"33"},
            {date:"201412",tottimespent:"530",avgtimespent:"27"},
            {date:"201502",tottimespent:"456",avgtimespent:"31"},
            {date:"201504",tottimespent:"312",avgtimespent:"29"},
            {date:"201508",tottimespent:"567",avgtimespent:"19"},
            {date:"201509",tottimespent:"413",avgtimespent:"13"},
            {date:"201510",tottimespent:"300",avgtimespent:"18"}
         ];
       }

      if(selectedfrequency == "Week")
      {
       var data = [ 
              {date:"20150906",tottimespent:"500",avgtimespent:"24"},
              {date:"20150913",tottimespent:"530",avgtimespent:"27"},
              {date:"20150920",tottimespent:"412",avgtimespent:"27"},
              {date:"20150927",tottimespent:"456",avgtimespent:"31"},
              {date:"20151004",tottimespent:"628",avgtimespent:"33"},
              {date:"20151011",tottimespent:"312",avgtimespent:"29"},
              {date:"20151018",tottimespent:"567",avgtimespent:"19"},
              {date:"20151025",tottimespent:"300",avgtimespent:"10"},
              {date:"20151101",tottimespent:"413",avgtimespent:"13"}
           ];
      }

      if(selectedfrequency == "Hour")
      {
       var data = [ 
              {date:"2015100700",tottimespent:"500",avgtimespent:"24"},
              {date:"2015100701",tottimespent:"530",avgtimespent:"27"},
              {date:"2015100703",tottimespent:"456",avgtimespent:"31"},
              {date:"2015100704",tottimespent:"628",avgtimespent:"33"},
              {date:"2015100707",tottimespent:"312",avgtimespent:"29"},
              {date:"2015100708",tottimespent:"567",avgtimespent:"19"},
              {date:"2015100709",tottimespent:"300",avgtimespent:"10"},
              {date:"2015100712",tottimespent:"413",avgtimespent:"13"},
              {date:"2015100718",tottimespent:"300",avgtimespent:"18"},
              {date:"2015100719",tottimespent:"234",avgtimespent:"45"}
           ];
      }

    return data;

};


    this.getDeviceUsersbyCompanyData = function(start,end,selectedfrequency) {

      if((selectedfrequency == "Today") || (selectedfrequency == "Yesterday"))
      {
         var data = [ 
                    {label:"Samsung",usercount:"300"},
                    {label:"Sony",usercount:"250"},
                    {label:"Micromax",usercount:"100"},
                    {label:"Lava",usercount:"245"},
                    {label:"HTC",usercount:"123"}
                 ];
      }
      else
      {
           var data = [ 
              {label:"Samsung",usercount:"300"},
              {label:"Sony",usercount:"650"},
              {label:"Micromax",usercount:"400"},
              {label:"Lava",usercount:"456"},
           ];
      }
         return data;
     };


    this.getDeviceUsersbyCarriersData = function(start,end,selectedfrequency) {

      if((selectedfrequency == "Today") || (selectedfrequency == "Yesterday"))
      {
         var data = [ 
                    {label:"Vodafone",usercount:"300"},
                    {label:"Idea",usercount:"250"},
                    {label:"Airtel",usercount:"100"},
                    {label:"Aircel",usercount:"245"},
                    {label:"Docomo",usercount:"123"}
                 ];
      }
      else
      {
           var data = [ 
              {label:"Vodafone",usercount:"300"},
              {label:"Idea",usercount:"650"},
              {label:"Aircel",usercount:"400"},
              {label:"Docomo",usercount:"456"},
           ];
      }
         return data;
     };

    this.getDeviceUsersbyOSVersions = function(start,end,selectedfrequency) {

      if((selectedfrequency == "Today") || (selectedfrequency == "Yesterday"))
      {
         var data = [ 
                    {label:"4.4 Kitkat",usercount:"300"},
                    {label:"5.0 Lollipop",usercount:"250"},
                    {label:"6.0 Marshmallow",usercount:"100"},
                    {label:"2.3 Gingerbread",usercount:"245"},
                    {label:"2.0 Eclair",usercount:"123"},
                    {label:"4.5 Kitkat",usercount:"344"}
                 ];
      }
      else 
      {
           var data = [ 
              {label:"4.4 Kitkat",usercount:"300"},
              {label:"6.0 Marshmallow",usercount:"650"},
              {label:"2.3 Gingerbread",usercount:"400"},
              {label:"2.0 Eclair",usercount:"456"},
           ];
      }
         return data;
     };

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

    this.getUserRetentionData = function(start,end,selectedfrequency) {

      if((selectedfrequency == "Today") || (selectedfrequency == "Yesterday"))
      {
         var data = [ 
                    {"Sept 1 2014":{"totnumberofusers":"628","Less 1 week":"500","1 week":"402","2 week":"300","3 week":"25"}},
                    {"Sept 8 2014":{"totnumberofusers":"728","Less 1 week":"515","1 week":"412","2 week":"313","3 week":"88"}},
                    {"Sept 15 2014":{"totnumberofusers":"828","Less 1 week":"534","1 week":"434","2 week":"329","3 week":"89"}},
                    {"Sept 22 2014":{"totnumberofusers":"928","Less 1 week":"589","1 week":"467","2 week":"389","3 week":"101"}}
                 ];
      }
      else 
      {
           var data = [ 
                    {"Sept 2 2014":{"totnumberofusers":"628","Less 1 week":"500","1 week":"402","2 week":"300","3 week":"25"}},
                    {"Sept 9 2014":{"totnumberofusers":"728","Less 1 week":"515","1 week":"412","2 week":"313","3 week":"88"}},
                    {"Sept 16 2014":{"totnumberofusers":"828","Less 1 week":"534","1 week":"434","2 week":"329","3 week":"89"}},
                    {"Sept 23 2014":{"totnumberofusers":"928","Less 1 week":"589","1 week":"467","2 week":"389"}}
           ];
      }
         return data;
     };

    }]);
