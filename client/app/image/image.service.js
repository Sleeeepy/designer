'use strict';

angular.module('myblogApp')
.factory('image', function ($http,$upload) {
  var baseURL = '/api/images/';
  //public API here
  return {

    destroy : function(imageID,callback){
      $http.delete(baseURL+imageID)
        .success(function(){
          callback(imageID);
        })
        .error(function(data,status,headers,config){
          console.log('error destroying image',data);
        });
    },

    uploadImages : function(files,callback) {
      //$files: an array of files selected, each file has name, size, and type.
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        //console.log('kb'+file.size/1024);
        $upload.upload({
          url: baseURL,
          file: file
        })
          .success(function(data, status, headers, config) {
            callback(data.id);
          })
          .error(function(data,status,headers,config){
            console.log('error uploading image',data);
          });
      }
    },

    getURI : function(imageID){
      return baseURL + imageID;
    }

};
// AngularJS will instantiate a singleton by calling "new" on this function
});
