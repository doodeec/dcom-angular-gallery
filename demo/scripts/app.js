'use strict';

angular.module('angularGalleryApp', ['dcomGallery'])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'galleryCtrl',
        reloadOnSearch: false
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
