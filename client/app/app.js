/// <reference path="../Scripts/angular-1.1.4.js" />

/*#######################################################################
  
  Dan Wahlin
  http://twitter.com/DanWahlin
  http://weblogs.asp.net/dwahlin
  http://pluralsight.com/training/Authors/Details/dan-wahlin

  Normally like to break AngularJS apps into the following folder structure
  at a minimum:

  /app
      /controllers      
      /directives
      /services
      /partials
      /views

  #######################################################################*/

//var app = angular.module('customersApp', ['ngRoute']);
var nameApp = angular.module('nameApp', ['ngRoute','ngResource']);

//This configures the routes and associates each route with a view and a controller
nameApp.config(function ($routeProvider) {
    $routeProvider
        .when('/',
        {
            //controller: 'DashboardPageCtrl',
            templateUrl: '/app/views/analytics.html'
            
        })
        .when('/device',
        {
            //controller: 'DashboardPageCtrl',
            templateUrl: '/app/views/device.html'
            
        })
        .when('/cities',
        {
            //controller: 'DashboardPageCtrl',
            templateUrl: '/app/views/countrymap.html'
            
        })
        .when('/userretention',
        {
            //controller: 'DashboardPageCtrl',
            templateUrl: '/app/views/userretention.html'
            
        })
        .when('/events',
        {
            //controller: 'DashboardPageCtrl',
            templateUrl: '/app/views/events.html'
            
        })
        .when('/eventscompare',
        {
            //controller: 'DashboardPageCtrl',
            templateUrl: '/app/views/eventscompare.html'
            
        })
        // .when('/analytics/device',
        // {
        //     //controller: 'DashboardPageCtrl',
        //     templateUrl: '/app/views/device.html'
            
        // })
        // .when('/analytics',
        //     {
        //         templateUrl: '/app/views/analytics.html',
        //         controller: 'DashboardPageCtrl'
        //     })
        // .when('/analytics/analytics',
        //     {
        //         templateUrl: '/app/views/analytics.html',
        //         controller: 'DashboardPageCtrl'
        //     })
        // //Define a route that has a route parameter in it (:customerID)
        // .when('/customerorders/:customerID',
        //     {
        //         controller: 'CustomerOrdersController',
        //         templateUrl: '/app/partials/customerOrders.html'
        //     })
        // //Define a route that has a route parameter in it (:customerID)
        // .when('/orders',
        //     {
        //         controller: 'OrdersController',
        //         templateUrl: '/app/partials/orders.html'
        //     })
        .otherwise({ redirectTo: '/' });
});




