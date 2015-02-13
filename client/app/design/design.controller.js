'use strict';

angular.module('myblogApp')
.controller('DesignCtrl', function ($scope,design) {

  design.list(function(data){
    console.log(data);
  });
})
.controller('NewDesignCtrl',['$scope','design','Auth','$upload','$http',
 function ($scope,design,Auth, $upload,$http) {

  $scope.$on('$locationChangeStart', function( event ) {
    var answer = confirm('Are you sure you want to leave this page?\n\nUnsaved changes will be lost.');
    if (!answer) {
      event.preventDefault();
    }
  });

  $scope.colors      = ['red','blue','green','dark green','light green','mint green'];
  $scope.productTypes = ['Scarf','Hat','Glove'];
  $scope.designer = Auth.getCurrentUser().name;
  $scope.images=[];
  $scope.onFileSelect = function($files) {
     //$files: an array of files selected, each file has name, size, and type.
     for (var i = 0; i < $files.length; i++) {
       var $file = $files[i];
       $upload.upload({
         url: 'api/images',
         file: $file
       }).then(function(data, status, headers, config) {
         // file is uploaded successfully
         $scope.images.push(data.data.id);
       });
     }
   };
   $scope.removeImage = function(imageID){
     var remove = function(arr,item){
     for(var i = arr.length; i--;) {
          if(arr[i] === item) {
              arr.splice(i, 1);
          }
      }};
      $http.delete('/api/images/'+imageID).success(function(){
        remove($scope.images,imageID);
      });


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
