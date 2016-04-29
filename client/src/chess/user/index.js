module.exports = 'chess.user';

angular.module('chess.user', []).
factory('user', UserFactory);

UserFactory.$inject = ['$http','$rootScope'];
function UserFactory($http, $rootScope) {

  var factory = {
    userInfo: null,
    getUserInfo: getUserInfo,
    isLoggedIn: isLoggedIn,
    online: false,
    isOnline: isOnline,
    setOnline: setOnline,
    setOffline: setOffline
  };

  return factory;

  function getUserInfo() {
    return $http.get(process.env.API_URL + '/api/user/info', {withCredentials: true}).
      then(function(response) {
        factory.userInfo = response.data;
        $rootScope.$broadcast('Authorized');
      });
  }

  function isLoggedIn() {
    return Boolean(factory.userInfo);
  }

  function isOnline() {
    return Boolean(factory.online);
  }

  function setOnline() {
    factory.online = true;
  }

  function setOffline() {
    factory.online = false;
  }

}
