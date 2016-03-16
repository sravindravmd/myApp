angular.module('starter.services', []).constant('AUTH_EVENTS', {
    notAuthenticated: 'auth-not-authenticated'
  })

  .constant('API_ENDPOINT', {
    url: 'http://10.10.10.48/gulf_v1/webservices'
    //  For a simulator use: url: 'http://127.0.0.1:8080/api'
  })


.factory('brandstoryService', function ($http,$q) {
 return null
});

