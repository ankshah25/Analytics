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
  //    this.getMonthlyUserSessionData = function() {
	 // var data = [ 
		//          {date:"31-Aug-15",totnumberofsessions:"300",avgnumberofsessions:"10"},
		//           {date:"1-Sep-15",totnumberofsessions:"628",avgnumberofsessions:"49"},
		//           {date:"2-Sep-15",totnumberofsessions:"530",avgnumberofsessions:"27"},
		//           {date:"3-Sep-15",totnumberofsessions:"456",avgnumberofsessions:"59"},
		//          {date:"4-Sep-15",totnumberofsessions:"312",avgnumberofsessions:"29"},
		//          {date:"5-Sep-15",totnumberofsessions:"567",avgnumberofsessions:"19"},
		//          {date:"6-Sep-15",totnumberofsessions:"413",avgnumberofsessions:"13"}
		//        ];
  //        return data;
  //    };

    this.getDeviceUsersbyCompanyData = function() {
   var data = [ 
              {companyname:"Samsung",usercount:"300"},
              {companyname:"Sony",usercount:"250"},
              {companyname:"Micromax",usercount:"100"},
              {companyname:"Lava",usercount:"245"},
              {companyname:"HTC",usercount:"123"}
           ];
         return data;
     };
    });
// app.service('customersService', function () {
//     this.getCustomers = function () {
//         return customers;
//     };

//     this.insertCustomer = function (firstName, lastName, city) {
//         var topID = customers.length + 1;
//         customers.push({
//             id: topID,
//             firstName: firstName,
//             lastName: lastName,
//             city: city
//         });
//     };

//     this.deleteCustomer = function (id) {
//         for (var i = customers.length - 1; i >= 0; i--) {
//             if (customers[i].id === id) {
//                 customers.splice(i, 1);
//                 break;
//             }
//         }
//     };

//     this.getCustomer = function (id) {
//         for (var i = 0; i < customers.length; i++) {
//             if (customers[i].id === id) {
//                 return customers[i];
//             }
//         }
//         return null;
//     };

//     var customers = [
//         {
//             id: 1, firstName: 'Lee', lastName: 'Carroll', address: '1234 Anywhere St.', city: 'Phoenix',
//             orders: [
//                 { product: 'Basket', price: 29.99, quantity: 1, orderTotal: 29.99 },
//                 { product: 'Yarn', price: 9.99, quantity: 1, orderTotal: 39.96 },
//                 { product: 'Needes', price: 5.99, quantity: 1, orderTotal: 5.99 }
//             ]
//         },
//         {
//             id: 2, firstName: 'Jesse', lastName: 'Hawkins', address: '89 W. Center St.', city: 'Atlanta',
//             orders: [
//                 { product: 'Table', price: 329.99, quantity: 1, orderTotal: 329.99 },
//                 { product: 'Chair', price: 129.99, quantity: 4, orderTotal: 519.96 },
//                 { product: 'Lamp', price: 89.99, quantity: 5, orderTotal: 449.95 },
//             ]
//         },
//         {
//             id: 3, firstName: 'Charles', lastName: 'Sutton', address: '455 7th Ave.', city: 'Quebec',
//             orders: [
//                 { product: 'Call of Duty', price: 59.99, quantity: 1, orderTotal: 59.99 },
//                 { product: 'Controller', price: 49.99, quantity: 1, orderTotal: 49.99 },
//                 { product: 'Gears of War', price: 49.99, quantity: 1, orderTotal: 49.99 },
//                 { product: 'Lego City', price: 49.99, quantity: 1, orderTotal: 49.99 }
//             ]
//         },
//         {
//             id: 4, firstName: 'Albert', lastName: 'Einstein', address: '8966 N. Crescent Dr.', city: 'New York City',
//             orders: [
//                 { product: 'Baseball', price: 9.99, quantity: 5, orderTotal: 49.95 },
//                 { product: 'Bat', price: 19.99, quantity: 1, orderTotal: 19.99 }
//             ]
//         },
//         {
//             id: 5, firstName: 'Sonya', lastName: 'Williams', address: '55 S. Hollywood Blvd', city: 'Los Angeles'
//         },
//         {
//             id: 6, firstName: 'Victor', lastName: 'Bryan', address: '563 N. Rainier St.', city: 'Seattle',
//             orders: [
//                 { product: 'Speakers', price: 499.99, quantity: 1, orderTotal: 499.99 },
//                 { product: 'iPod', price: 399.99, quantity: 1, orderTotal: 399.99 }
//             ]
//         },
//         {
//             id: 7, firstName: 'Lynette', lastName: 'Gonzalez', address: '25624 Main St.', city: 'Albuquerque',
//             orders: [
//                 { product: 'Statue', price: 429.99, quantity: 1, orderTotal: 429.99 },
//                 { product: 'Picture', price: 1029.99, quantity: 1, orderTotal: 1029.99 }
//             ]
//         },
//         {
//             id: 8, firstName: 'Erick', lastName: 'Pittman', address: '33 S. Lake Blvd', city: 'Chicago',
//             orders: [
//                 { product: 'Book: AngularJS Development', price: 39.99, quantity: 1, orderTotal: 39.99 },
//                 { product: 'Book: Basket Weaving Made Simple', price: 19.99, quantity: 1, orderTotal: 19.99 }
//             ]
//         },
//         {
//             id: 9, firstName: 'Alice', lastName: 'Price', address: '3354 Town', city: 'Cleveland',
//             orders: [
//                 { product: 'Webcam', price: 85.99, quantity: 1, orderTotal: 85.99 },
//                 { product: 'HDMI Cable', price: 39.99, quantity: 2, orderTotal: 79.98 }
//             ]
//         },
//         {
//             id: 10, firstName: 'Gerard', lastName: 'Tucker', address: '6795 N. 53 W. Bills Dr.', city: 'Buffalo',
//             orders: [
//                 { product: 'Fan', price: 49.99, quantity: 4, orderTotal: 199.96 },
//                 { product: 'Remote Control', price: 109.99, quantity: 1, orderTotal: 109.99 }
//             ]
//         },
//         {
//             id: 11, firstName: 'Shanika', lastName: 'Passmore', address: '459 S. International Dr.', city: 'Orlando'
//         }
//     ];

// });