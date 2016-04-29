var assert = require('assert');
var angular = require('angular');
require('angular-mocks');
require('../../../client/src/chess/settings');

describe('module: chess.settings', function () {
  beforeEach(angular.mock.module('chess.settings'));

  describe('settings factory', function () {
    describe('settings.changePassword()', function () {
      it('sould be a function', inject(function (Settings) {
        assert.equal(typeof Settings.changePassword, 'function');
      }));
      
      it('should call a server', inject(function (Settings, $httpBackend) {
        $httpBackend.expectPUT(process.env.API_URL + '/api/user/password').respond(200, {});
        Settings.changePassword('currentPassword', 'newPassword').
          then(
            function () { assert(true, '/settings/changePassword'); },
            function () { assert(false, '/settings/changePassword'); }
          );
        $httpBackend.flush();
      }));

      it('should handle server error', inject(function (Settings, $httpBackend) {
        $httpBackend.expectPUT(process.env.API_URL + '/api/user/password').respond(404, {});
        Settings.changePassword('currentPassword', 'newPassword').
          then(
            function () { assert(false, '/settings/changePassword'); },
            function () { assert(true, '/settings/changePassword'); }
          );
        $httpBackend.flush();
      }));
    });
  });
      
})