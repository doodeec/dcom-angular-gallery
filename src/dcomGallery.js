'use strict';

angular.module('dcomGallery', [])
    .directive('dcomGalleryPic',
        ['$window',
            function($window) {
                var isVisible = function(elem) {
                    var pos = elem.position().top,
                        winH = window.innerHeight,
                        scrollY = window.scrollY;

                    return (pos > scrollY && pos < winH + scrollY);
                };

                return {
                    restrict: 'A',
                    replace: true,
                    scope: true,
                    template: '<div class="galleryPic">' +
                        '<img ng-src="{{resolvedPic}}" ng-class="{loaded: resolvedPic}" class="{{orientation}}" />' +
                        '<div class="loader"></div>' +
                        '</div>',
                    link: function(scope, elem, attrs) {
                        scope.resolvedPic = null;
                        scope.orientation = null;

                        var loadingStarted = false;

                        var checkVisibility = function() {
                            if (isVisible(elem) && !loadingStarted) loadImage();
                        };

                        var loadImage = function() {
                            loadingStarted = true;
                            var image = new Image(),
                                link = "images/thumb/" +scope.pic+ ".jpg";
                            image.onload = function() {
                                scope.$apply(function(){
                                    scope.orientation = image.width > image.height ? "landscapeImg" : "portraitImg";
                                    scope.resolvedPic = link;
                                });
                            };
                            image.src = link;
                        };

                        checkVisibility();

                        angular.element($window).bind("scroll", checkVisibility);

                        elem.bind('click', function(e) {
                            e && e.preventDefault();
                            scope.changeImg(scope.pic);
                        });
                    }
                }
            }])
    .directive('dcomFullSizePic',
        ['$rootScope',
            function($rootScope) {
                return {
                    restrict: 'A',
                    replace: true,
                    template: '<img ng-src="images/gallery/{{fullSizeImg}}.jpg" class="maximizedImg"' +
                        'ng-class="{hiddenPic: hidePic}" />',
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