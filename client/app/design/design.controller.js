'use strict';

var remove = function(arr,item){
  for(var i = arr.length; i--;) {
    if(arr[i] === item) {
      arr.splice(i, 1);
    }
  }
};

angular.module('myblogApp')
.controller('DesignCtrl', function ($scope,design) {

  design.list(function(data){
    console.log(data);
  });
})


.controller('NewDesignCtrl',['$scope','design','Auth','image',
function ($scope,design,Auth,image) {
  //$scope.design = new design();
  $scope.$on('$locationChangeStart', function( event ) {
    if ($scope.form.$dirty){
      var answer = confirm('Are you sure you want to leave this page?\n\nUnsaved changes will be lost.');
      if (!answer) {
        event.preventDefault();
      }
    }
  });

  $scope.colors      = ['red','blue','green','dark green','light green','mint green'];
  $scope.productTypes = ['Scarf','Hat','Glove'];
  $scope.designer = Auth.getCurrentUser().name;

  //images
  $scope.images=[];
  $scope.uploadImages = function($files) {
    image.uploadImages($files,function(imageID){
      $scope.images.push(imageID);
    });
  };
  $scope.destroyImage = function(imageID){
    var answer = confirm('Are you sure you want to permanently delete this image?\n\nLocal copies will not be affected.');
    if (!answer) {return;}
    image.destroy(imageID,function(imageID){
      remove($scope.images,imageID);
    });
  };
  $scope.imageURI = image.getURI;


  $scope.saveDesign = function(form){

  };


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


}]);
