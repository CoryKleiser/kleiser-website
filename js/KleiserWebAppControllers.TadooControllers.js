'use strict';
(function(){

//: Set up Locations Controller
    var TadooControllers = angular.module(`TadooControllers`, []);

        // TadooControllers.controller(`TadooMainController`, function ($rootScope) {
        //     $rootScope.tadooView = `cat`;
        // });

    //Category Controller
        TadooControllers.controller(`CatController`, function ($rootScope, $scope, locate) {
            $rootScope.tadooView = `cat`;
            // $scope.goList = function(hash){
            //     if (locate.userLocation != undefined){
            //
            //         console.log(`test goList`, locate.userLocation);
            //
            //         console.log($scope.userLocation);
            //
            //         $rootScope.tadooView = `list`;
            //     }
            //     else{
            //         alert(`Please wait while we locate you.`);
            //     }
            //
            // }
            //Set Up Google Map and Location
            //Calls findUser fn from the locate Service
            $scope.userLocation = locate.geoLocate();


        });

        //List Controller
        TadooControllers.controller(`ListController`, function ($scope, $stateParams, $location, locate, places) {

            //instantiate locations var
            $scope.locations = [];

            //finds itemId
            let itemId = $stateParams.item;
            if (itemId == 0){
                $scope.category = [`restaurant`];
                $scope.catHeader = `TaEat`;
            }
            else if (itemId == 1){
                $scope.category = [`amusement_park`,
                    `aquarium`,
                    `campground`,
                    `park`];
                $scope.catHeader = `TaGo`;
            }
            else if (itemId == 2){
                $scope.category = [`shopping_mall`,
                    `clothing_store`,
                    `department_store`,
                    `shoe_store`];
                $scope.catHeader = `TaShop`;
            }
            else if (itemId == 3){
                $scope.category = [`gas_station`];
                $scope.catHeader = `TaFuel`;
            }
            else if (itemId == 4){
                $scope.category = [`art_gallery`,
                    `cafe`,
                    `night_club`];
                $scope.catHeader = `TaChill`;
            }
            else if (itemId == 5){
                $scope.category = [`park`];
                $scope.catHeader = `TaPlay`;
            }

            let request = {
                location: locate.userLocation,
                radius: `5000`,
                types: $scope.category
            };


            places
                .findPlaces(request)
                .then(function(locations) {
                    $scope.locations = locations;
                    $scope.$apply();
                })
                .catch(function(err) {
                    console.log(err);
                });

        });

        TadooControllers.controller(`InfoController`, function($scope, $routeParams, places){

            $scope.goBack = function(){
                window.history.back();
            };


            //find selected Place
            let whichPlace = $routeParams.itemId;
            console.log(whichPlace);

            //pull place data from Places Service
            $scope.placeInfo = places.found[whichPlace];

            console.log($scope.placeInfo);
            console.log($scope.placeInfo.id);

            //TODO: get review info and other info
            // $scope.specDetails = places.findDetails($scope.placeInfo.id);
            // console.log($scope.specDetails);



        });
})();