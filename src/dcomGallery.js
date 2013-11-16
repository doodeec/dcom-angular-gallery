'use strict';

angular.module('dcomGallery', [])
    .directive('dcomGalleryPic',
        [
            function() {
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

                        var image = new Image(),
                            link = "images/thumb/" +scope.pic+ ".jpg";
                        image.onload = function() {
                            scope.$apply(function(){
                                scope.orientation = image.width > image.height ? "landscapeImg" : "portraitImg";
                                scope.resolvedPic = link;
                            });
                        };
                        image.src = link;

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