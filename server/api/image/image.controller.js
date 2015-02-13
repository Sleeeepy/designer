'use strict';

var _         = require('lodash'),
    Busboy    = require('busboy'),
    Image     = require('./image.model'),
    mongoose  = require('mongoose'),
    GridStr   = require('gridfs-stream');

var gridStr = new GridStr(mongoose.connection.db, mongoose.mongo);

// Get list of images
exports.index = function(req, res) {
  Image.find(function (err, images) {
    if(err) { return handleError(res, err); }
    return res.json(200, images);
  });
};

// Get a single image
exports.show = function(req, res) {

  var imageID = new mongoose.Types.ObjectId(req.params.id);

  var options = {
    _id: imageID, // MongoDb ObjectId
    mode: 'r', // default value: w+, possible options: w, w+ or r, see [GridStore](http://mongodb.github.com/node-mongodb-native/api-generated/gridstore.html)
    root: 'my_collection',
  };
  gridStr.exist(options,function(err,found){
    if(err){ return handleError(res, err); }
    if(!found){ return res.send(404); }
    var readstream = gridStr.createReadStream(options);
    readstream.pipe(res);

  });


  /*
  Image.findById(req.params.id, function (err, image) {
  if(err) { return handleError(res, err); }
  if(!image) { return res.send(404); }
  return res.json(image);
});*/
};



// Creates a new image in the DB.
exports.upload = function(req, res) {
  var busboy = new Busboy({
    headers: req.headers
  });

  busboy.on('error', function(err) {
    console.log(err);
  });

  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {


    var imageID = mongoose.Types.ObjectId();
    var options = {
      _id: imageID, // MongoDb ObjectId
      filename: filename,
      mode: 'w', // default value: w+, possible options: w, w+ or r, see [GridStore](http://mongodb.github.com/node-mongodb-native/api-generated/gridstore.html)
      chunkSize: 1024*1024,
      root: 'my_collection',
      metadata: {}
      //content_type: 'plain/text', // For content_type to work properly, set "mode"-option to "w" too!
    };

    var writestream = gridStr.createWriteStream(options);
    //fs.createReadStream(saveTo).pipe(writestream);
    file.pipe(writestream);

    writestream.on('close',function(){
      res.json(200,{id:imageID});
    });

  });

  busboy.on('finish', function() {
    console.log('finish');
  });

  req.pipe(busboy);


  /*
  Image.create(req.body, function(err, image) {
  if(err) { return handleError(res, err); }
  return res.json(201, image);
});*/
};


// Deletes a image from the DB.
exports.destroy = function(req, res) {
  var grid = new mongoose.mongo.Grid(mongoose.connection.db,'my_collection');
  var imageID = new mongoose.Types.ObjectId(req.params.id);
  var options = {
    _id: imageID, // MongoDb ObjectId
    //mode: 'r', // default value: w+, possible options: w, w+ or r, see [GridStore](http://mongodb.github.com/node-mongodb-native/api-generated/gridstore.html)
    root: 'my_collection',
  };

  grid.delete(imageID,function(err,success){
    if(err){ return handleError(res, err); }
    res.send(200,success);
  });


  /*
  Image.findById(req.params.id, function (err, image) {
    if(err) { return handleError(res, err); }
    if(!image) { return res.send(404); }
    image.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });*/
};

function handleError(res, err) {
  return res.send(500, err);
}
