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
                            scope.orientation = image.width > image.height ? "landscapeImg" : "portraitImg";
                            $timeout(function() {
                                scope.$apply(function(){
                                    scope.resolvedPic = link;
                                });
                            });
                        };
                        //TODO load thumbnails, not original pictures
                        image.src = link;

                        scope.$watch('resolvedPic', function(val) {
                            if (val) scope.loaderClass = "loaded";
                        });

                        //TODO loader of fullsize image
                        elem.bind('click', function() {
                            scope.$apply(function() {
                                $rootScope.hidePic = true;
                                $timeout(function(){
                                    $rootScope.fullSizeImg = scope.pic;
                                    $rootScope.hidePic = false;
                                }, 500);
                            });
                        });

                        //TODO responsive width, thumbnail max 200px?
                    }
                }
            }])
    .directive('dcomFullSizePic',
    function() {
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

                //disable right click
                elem.bind('contextmenu rightclick', function(e) {
                    e.preventDefault();
                });
            }
        }
    });