'use strict';

angular.module('myblogApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/design', {
        templateUrl: 'app/design/design.html',
        controller: 'DesignCtrl'
      });
  });
