'use strict';

angular.module('myblogApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
	/*
	{
      'title': 'Home',
      'link': '/'
    },
	*/
	{
		'title': 'Designs',
		'link': '/design'
	},
	{
		'title': 'Samples',
		'link': '/sample'
	},
{
		'title': 'Lines',
		'link': '/line'
	}	
	
	];

    $scope.isCollapsed = false;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });