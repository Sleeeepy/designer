'use strict';

angular.module('myblogApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/design', {
        templateUrl: 'app/design/design.html',
        controller: 'DesignCtrl'
      })
    .when('/design/view/:id', {
        templateUrl: 'app/design/design-view.html',
        controller: 'ViewDesignCtrl'
      })
	  .when('/design/new', {
        templateUrl: 'app/design/design-new.html',
        controller: 'NewDesignCtrl'
      });
  });
