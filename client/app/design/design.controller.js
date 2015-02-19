'use strict';

var remove = function(arr,item){
  for(var i = arr.length; i--;) {
    if(arr[i] === item) {
      arr.splice(i, 1);
    }
  }
};



angular.module('myblogApp')
  .controller('ViewDesignCtrl', function ($scope,$routeParams,design,image) {
    
    $scope.imageURI = image.getURI;
    design.get({id:$routeParams.id},function(result){
      $scope.design = result;
      console.log($scope.design);
    });


  })
  .controller('DesignCtrl', function ($scope,$location,$routeParams,design,image) {
    design.query(function(data){
      $scope.designs = data;
    });

    $scope.sort = function(field){
      $scope.sort.field = field;
      $scope.sort.order = !$scope.sort.order;
    };
    $scope.sort.order = false;
    $scope.sort.field = 'design.created';

    $scope.show = function(id){
      $location.url('/design/view/'+id);
    };
    $scope.imageURI = image.getURI;
  })


  .controller('NewDesignCtrl',['$scope','$location','design','Auth','image',
  function ($scope,$location,design,Auth,image) {
    $scope.design = new design();
    $scope.design.designer  = Auth.getCurrentUser().name;
    $scope.design.company   = Auth.getCurrentUser().company;
    $scope.lines       = Auth.getCurrentUser().department;
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


    $scope.saveDesign = function(form){
      $scope.design.images = $scope.images;
      console.log('saving',$scope.design);
      $scope.design.$save(function(response){
          console.log('response',response);
          $scope.form.$dirty = false;
          $location.url('/design/');
      });
    };


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
