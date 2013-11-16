'use strict';

angular.module('dcomGallery', [])
    .directive('dcomGalleryPic',
        ['$rootScope', '$timeout',
            function($rootScope, $timeout) {
                return {
                    restrict: 'A',
                    replace: true,
                    //TODO isolate scope
                    template: '<div class="galleryPic">' +
                        '<img ng-src="{{resolvedPic}}" class="{{loaderClass}} {{orientation}}" />' +
                        '<div class="loader"></div>' +
                        '</div>',
                    link: function(scope, elem, attrs) {
                        scope.resolvedPic = null;
                        scope.loaderClass = null;

                        var image = new Image(),
                            link = "images/thumb/" +scope.pic+ ".jpg";
                        image.onload = function() {
                            scope.$apply(function(){
                                scope.orientation = image.width > image.height ? "landscapeImg" : "portraitImg";
                                scope.resolvedPic = link;
                            });
                        };
                        image.src = link;

                        scope.$watch('resolvedPic', function(val) {
                            if (val) scope.loaderClass = "loaded";
                        });

                        elem.bind('click', function() {
                            scope.$apply(function() {
                                $rootScope.hidePic = true;
                                $timeout(function(){
                                    $rootScope.fullSizeImg = scope.pic;
                                }, 500);
                            });
                        });
                    }
                    //TODO responsive width
                }
            }])
    .directive('dcomFullSizePic',
        ['$rootScope',
            function($rootScope) {
                return {
                    restrict: 'A',
                    replace: true,
                    template: '<img ng-src="images/gallery/{{fullSizeImg}}.jpg" class="maximizedImg" ng-class="{hiddenPic: hidePic}" />',
                    link: function(scope, elem, attrs) {
                        scope.$watch(function() {
                            return $(window).height();
                        }, function(val) {
                            elem.parent().css('height', val+'px');
                        });

                        $rootScope.$watch('fullSizeImg', function(val) {
                            var fullSizeImage = new Image,
                                fullSizeLink = "images/gallery/" +val+ ".jpg";
                            fullSizeImage.onload = function() {
                                scope.$apply(function() {
                                    $rootScope.hidePic = false;
                                });
                            };
                            fullSizeImage.src = fullSizeLink;
                        });

                        //disable right click
                        elem.bind('contextmenu rightclick', function(e) {
                            e.preventDefault();
                        });
                    }
                }
}]);