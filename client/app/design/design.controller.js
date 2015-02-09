'use strict';

angular.module('myblogApp')
  .controller('DesignCtrl', function ($scope,design) {
    
	design.list(function(data){
			//console.log(data);
	});
  });
