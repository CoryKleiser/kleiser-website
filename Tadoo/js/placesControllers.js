angular.module(`tadooApp.controller`, [])


//Category Controller
    .controller(`CatController`, function ($scope, $location, locate) {

        //Set Up Google Map and Location
        //Calls findUser fn from the locate Service
        $scope.goList = function(hash){
            if (locate.userLocation != undefined){

                console.log(locate.userLocation);
                $location.path(hash);

            }
            else{
                alert(`Please wait while we locate you.`);
            }

        }
        locate
            .findUser()
            .then($scope.userLocation = locate.findUser);


    })

    //List Controller
    .controller(`ListController`, function ($scope, $routeParams, $location, locate, places) {

        //instantiate locations var
        $scope.locations = [];

        $scope.getLocations = function (){
            if($scope.radiusMiles==0 || $scope.radiusMiles==null){
                $scope.radiusMiles=2;
                $scope.getLocations();
            }
            else{
                $scope.radius = $scope.radiusMiles * 1609.34;

                const request = {
                    location: locate.userLocation,
                    radius: $scope.radius,
                    types: $scope.category
                };

                places
                    .findPlaces(request)
                    .then(function(locations) {
                        $scope.locations = locations;
                        console.log(locations);
                        $scope.$apply();
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            }
        };

        //finds itemId
        let itemId = $routeParams.itemId;
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
            radius: $scope.radius,
            types: $scope.category
        };


        $scope.getLocations();

    })

    .controller(`InfoController`, function($scope, $routeParams, places){

        $scope.goBack = function(){
            window.history.back();
        };


        //find selected Place
        let whichPlace = $routeParams.itemId;
        console.log(whichPlace);

        //pull place data from Places Service
        $scope.placeInfo = places.found[whichPlace];

        //: get review info and other info
        places.findDetails($scope.placeInfo.id)
            .then(function (details) {
                $scope.details = details;
                $scope.phone = places.formatPhoneNumber(details.international_phone_number);
                console.log($scope.details);
                $scope.$apply();
            })
            .catch(function (err) {
                //todo:handle err
                console.log(err);
            });

        console.log($scope.details);

    });
