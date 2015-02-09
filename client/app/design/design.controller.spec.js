'use strict';

describe('Controller: DesignCtrl', function () {

  // load the controller's module
  beforeEach(module('myblogApp'));

  var DesignCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DesignCtrl = $controller('DesignCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
