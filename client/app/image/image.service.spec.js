'use strict';

describe('Service: image', function () {

  // load the service's module
  beforeEach(module('myblogApp'));

  // instantiate service
  var image;
  beforeEach(inject(function (_image_) {
    image = _image_;
  }));

  it('should do something', function () {
    expect(!!image).toBe(true);
  });

});