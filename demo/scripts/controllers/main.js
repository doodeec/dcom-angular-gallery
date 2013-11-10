'use strict';

angular.module('angularGalleryApp')
    .controller('galleryCtrl',
        ['$scope', '$rootScope', '$timeout', '$location',
            function ($scope, $rootScope, $timeout, $location) {
                var gallery = {
                    Cat1: ['IMG_2378 - kopie','IMG_2378','IMG_2386','IMG_2419','IMG_2420','IMG_2426','IMG_2428','IMG_2449'],
                    Cat2: ['IMG_2458','IMG_2459','IMG_2460','IMG_2474','IMG_2476','IMG_2477','IMG_2483',
                        'IMG_2488','IMG_2489','IMG_2494','IMG_2503','IMG_2510','IMG_2513','IMG_2515'],
                    Cat3: ['IMG_2529','IMG_2559','IMG_2567','IMG_2580','IMG_2589','IMG_2613','IMG_2620'],
                    Cat4: ['IMG_2620','IMG_2630','IMG_2638','IMG_2647','IMG_2652','IMG_2659','IMG_2669',
                        'IMG_2674','IMG_2683','IMG_2697','IMG_2698','IMG_2707','IMG_2709']
                };
                var paramImg = $location.search().foto || null;

                $scope.galleries = [];
                $scope.changeCat = function(cat) {
                    $scope.category = cat;
                    $scope.gallery = gallery[cat];
                };

                for (var cat in gallery) {
                    $scope.galleries.push(cat);
                    if (gallery[cat].indexOf(paramImg) != -1) {
                        $scope.changeCat(cat);
                        $rootScope.fullSizeImg = paramImg;
                    }
                }

                //initial gallery loading, if url param not defined or not from any galleries
                if (!$scope.category) $scope.changeCat("Cat1");

                //TODO cleanup
                $scope.$watch('gallery', function(val) {
                    if (val.length && (val.indexOf($rootScope.fullSizeImg) === -1)) {
                        $rootScope.hidePic = true;
                        $timeout(function(){
                            $rootScope.fullSizeImg = $scope.gallery[0];
                            $rootScope.hidePic = false;
                        }, 500);
                    }
                });

                $rootScope.$watch('fullSizeImg', function(val) {
                    if (val) $location.search({foto: val});
                });

                //TODO gallery name in path
            }]);
