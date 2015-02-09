'use strict';

angular.module('myblogApp')
  .controller('DesignCtrl', function ($scope,design) {
    
	design.list(function(data){
			//console.log(data);
	});
  })
  .controller('NewDesignCtrl', function ($scope,design,Auth) {
    
	design.list(function(data){
			$scope.product_types =["Scarf","Hat","Glove"];
			$scope.designer = Auth.getCurrentUser().name;
	});
	
	
	
	//datepicker
	$scope.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();

			$scope.opened = true;
	};
	  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();
	$scope.format='dd MMMM yyyy';
	 $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };


 });
