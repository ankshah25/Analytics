//This handles retrieving data and is used by controllers. 3 options (server, factory, provider) with 
//each doing the same thing just structuring the functions/data differently.
nameApp.service('analyticsService', function () {
  
    this.getCurrentOnlineUsers = function() {
        return parseInt(Math.random() * 1000)
     };

     this.getUserSessionData = function(start,end,selectedfrequency) {

      if(selectedfrequency == "Last 7 Days")
      {
       var data = [ 
            {date:"1-Oct-2015 00:00",totnumberofsessions:"628",avgnumberofsessions:"33"},
            {date:"2-Oct-2015 00:00",totnumberofsessions:"530",avgnumberofsessions:"27"},
            {date:"3-Oct-2015 00:00",totnumberofsessions:"456",avgnumberofsessions:"31"},
            {date:"4-Oct-2015 00:00",totnumberofsessions:"312",avgnumberofsessions:"29"},
            {date:"5-Oct-2015 00:00",totnumberofsessions:"567",avgnumberofsessions:"19"},
            {date:"6-Oct-2015 00:00",totnumberofsessions:"413",avgnumberofsessions:"13"},
            {date:"7-Oct-2015 00:00",totnumberofsessions:"300",avgnumberofsessions:"18"}
         ];
       }

      if(selectedfrequency == "Last 365 Days")
      {
       var data = [ 
            {date:"Oct-2014",totnumberofsessions:"628",avgnumberofsessions:"33"},
            {date:"Dec-2014",totnumberofsessions:"530",avgnumberofsessions:"27"},
            {date:"Feb-2015",totnumberofsessions:"456",avgnumberofsessions:"31"},
            {date:"Apr-2015",totnumberofsessions:"312",avgnumberofsessions:"29"},
            {date:"Aug-2015",totnumberofsessions:"567",avgnumberofsessions:"19"},
            {date:"Sep-2015",totnumberofsessions:"413",avgnumberofsessions:"13"},
            {date:"Oct-2015",totnumberofsessions:"300",avgnumberofsessions:"18"}
         ];
       }

      if((selectedfrequency == "Last 30 Days") || (selectedfrequency == "This Month") || (selectedfrequency == "Last Month"))
      {
       var data = [ 
              {date:"7-Sep-2015 00:00",totnumberofsessions:"500",avgnumberofsessions:"24"},
              {date:"12-Sep-2015 00:00",totnumberofsessions:"530",avgnumberofsessions:"27"},
              {date:"13-Sep-2015 00:00",totnumberofsessions:"456",avgnumberofsessions:"31"},
              {date:"15-Sep-2015 00:00",totnumberofsessions:"628",avgnumberofsessions:"33"},
              {date:"18-Sep-2015 00:00",totnumberofsessions:"312",avgnumberofsessions:"29"},
              {date:"19-Sep-2015 00:00",totnumberofsessions:"567",avgnumberofsessions:"19"},
              {date:"20-Sep-2015 00:00",totnumberofsessions:"300",avgnumberofsessions:"10"},
              {date:"25-Sep-2015 00:00",totnumberofsessions:"413",avgnumberofsessions:"13"},
              {date:"30-Sep-2015 00:00",totnumberofsessions:"300",avgnumberofsessions:"18"},
              {date:"07-Oct-2015 00:00",totnumberofsessions:"234",avgnumberofsessions:"45"}
           ];
      }

      if((selectedfrequency == "Today") || (selectedfrequency == "Yesterday"))
      {
       var data = [ 
              {date:"07-Oct-2015 00:00",totnumberofsessions:"500",avgnumberofsessions:"24"},
              {date:"07-Oct-2015 01:00",totnumberofsessions:"530",avgnumberofsessions:"27"},
              {date:"07-Oct-2015 03:00",totnumberofsessions:"456",avgnumberofsessions:"31"},
              {date:"07-Oct-2015 04:00",totnumberofsessions:"628",avgnumberofsessions:"33"},
              {date:"07-Oct-2015 07:00",totnumberofsessions:"312",avgnumberofsessions:"29"},
              {date:"07-Oct-2015 08:00",totnumberofsessions:"567",avgnumberofsessions:"19"},
              {date:"07-Oct-2015 09:00",totnumberofsessions:"300",avgnumberofsessions:"10"},
              {date:"07-Oct-2015 12:00",totnumberofsessions:"413",avgnumberofsessions:"13"},
              {date:"07-Oct-2015 18:00",totnumberofsessions:"300",avgnumberofsessions:"18"},
              {date:"07-Oct-2015 19:00",totnumberofsessions:"234",avgnumberofsessions:"45"}
           ];
      }
      if(selectedfrequency == "Yesterday")
      {
       var data = [ 
              {date:"07-Oct-2015 00:00",totnumberofsessions:"500",avgnumberofsessions:"24"},
              {date:"07-Oct-2015 01:00",totnumberofsessions:"530",avgnumberofsessions:"27"},
              {date:"07-Oct-2015 03:00",totnumberofsessions:"456",avgnumberofsessions:"31"},
              {date:"07-Oct-2015 04:00",totnumberofsessions:"628",avgnumberofsessions:"33"},
              {date:"07-Oct-2015 07:00",totnumberofsessions:"312",avgnumberofsessions:"29"},
              {date:"07-Oct-2015 08:00",totnumberofsessions:"567",avgnumberofsessions:"19"},
              {date:"07-Oct-2015 09:00",totnumberofsessions:"300",avgnumberofsessions:"10"},
              {date:"07-Oct-2015 12:00",totnumberofsessions:"413",avgnumberofsessions:"13"},
              {date:"07-Oct-2015 18:00",totnumberofsessions:"300",avgnumberofsessions:"18"},
              {date:"07-Oct-2015 19:00",totnumberofsessions:"234",avgnumberofsessions:"45"}
           ];
      }

    return data;

};

     this.getUserTimeSpentData = function(start,end,selectedfrequency) {

      if(selectedfrequency == "Last 7 Days")
      {
       var data = [ 
            {date:"1-Oct-2015 00:00",tottimespent:"628",avgtimespent:"33"},
            {date:"2-Oct-2015 00:00",tottimespent:"530",avgtimespent:"27"},
            {date:"3-Oct-2015 00:00",tottimespent:"456",avgtimespent:"31"},
            {date:"4-Oct-2015 00:00",tottimespent:"312",avgtimespent:"29"},
            {date:"5-Oct-2015 00:00",tottimespent:"567",avgtimespent:"19"},
            {date:"6-Oct-2015 00:00",tottimespent:"413",avgtimespent:"13"},
            {date:"7-Oct-2015 00:00",tottimespent:"300",avgtimespent:"18"}
         ];
       }

      if(selectedfrequency == "Last 365 Days")
      {
       var data = [ 
            {date:"Oct-2014",tottimespent:"628",avgtimespent:"33"},
            {date:"Dec-2014",tottimespent:"530",avgtimespent:"27"},
            {date:"Feb-2015",tottimespent:"456",avgtimespent:"31"},
            {date:"Apr-2015",tottimespent:"312",avgtimespent:"29"},
            {date:"Aug-2015",tottimespent:"567",avgtimespent:"19"},
            {date:"Sep-2015",tottimespent:"413",avgtimespent:"13"},
            {date:"Oct-2015",tottimespent:"300",avgtimespent:"18"}
         ];
       }

      if((selectedfrequency == "Last 30 Days") || (selectedfrequency == "This Month") || (selectedfrequency == "Last Month"))
      {
       var data = [ 
              {date:"7-Sep-2015 00:00",tottimespent:"500",avgtimespent:"24"},
              {date:"12-Sep-2015 00:00",tottimespent:"530",avgtimespent:"27"},
              {date:"13-Sep-2015 00:00",tottimespent:"456",avgtimespent:"31"},
              {date:"15-Sep-2015 00:00",tottimespent:"628",avgtimespent:"33"},
              {date:"18-Sep-2015 00:00",tottimespent:"312",avgtimespent:"29"},
              {date:"19-Sep-2015 00:00",tottimespent:"567",avgtimespent:"19"},
              {date:"20-Sep-2015 00:00",tottimespent:"300",avgtimespent:"10"},
              {date:"25-Sep-2015 00:00",tottimespent:"413",avgtimespent:"13"},
              {date:"30-Sep-2015 00:00",tottimespent:"300",avgtimespent:"18"},
              {date:"07-Oct-2015 00:00",tottimespent:"234",avgtimespent:"45"}
           ];
      }

      if((selectedfrequency == "Today") || (selectedfrequency == "Yesterday"))
      {
       var data = [ 
              {date:"07-Oct-2015 00:00",tottimespent:"500",avgtimespent:"24"},
              {date:"07-Oct-2015 01:00",tottimespent:"530",avgtimespent:"27"},
              {date:"07-Oct-2015 03:00",tottimespent:"456",avgtimespent:"31"},
              {date:"07-Oct-2015 04:00",tottimespent:"628",avgtimespent:"33"},
              {date:"07-Oct-2015 07:00",tottimespent:"312",avgtimespent:"29"},
              {date:"07-Oct-2015 08:00",tottimespent:"567",avgtimespent:"19"},
              {date:"07-Oct-2015 09:00",tottimespent:"300",avgtimespent:"10"},
              {date:"07-Oct-2015 12:00",tottimespent:"413",avgtimespent:"13"},
              {date:"07-Oct-2015 18:00",tottimespent:"300",avgtimespent:"18"},
              {date:"07-Oct-2015 19:00",tottimespent:"234",avgtimespent:"45"}
           ];
      }
      if(selectedfrequency == "Yesterday")
      {
       var data = [ 
              {date:"07-Oct-2015 00:00",tottimespent:"500",avgtimespent:"24"},
              {date:"07-Oct-2015 01:00",tottimespent:"530",avgtimespent:"27"},
              {date:"07-Oct-2015 03:00",tottimespent:"456",avgtimespent:"31"},
              {date:"07-Oct-2015 04:00",tottimespent:"628",avgtimespent:"33"},
              {date:"07-Oct-2015 07:00",tottimespent:"312",avgtimespent:"29"},
              {date:"07-Oct-2015 08:00",tottimespent:"567",avgtimespent:"19"},
              {date:"07-Oct-2015 09:00",tottimespent:"300",avgtimespent:"10"},
              {date:"07-Oct-2015 12:00",tottimespent:"413",avgtimespent:"13"},
              {date:"07-Oct-2015 18:00",tottimespent:"300",avgtimespent:"18"},
              {date:"07-Oct-2015 19:00",tottimespent:"234",avgtimespent:"45"}
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

    });
