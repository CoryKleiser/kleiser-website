'use strict';
(function() {


    var tadooServices = angular.module(`tadooServices`, []);


        //This service locates the user
    tadooServices.service(`locate`, function(){
        const locate = this;
        locate.map;
        locate.userLocation;


        locate.geoLocate = function() {
            return new Promise(function (resolve, reject) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    locate.userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    console.log(`test user location \nlatval: ${locate.userLocation.lat} \nlngval: ${locate.userLocation.lng}`);
                    locate.map = new google.maps.Map($('#mapContainer'), {
                        center: locate.userLocation,
                        zoom: 14,
                    });
                });

                resolve(locate.userLocation);
                reject(console.log(`uh oh`));
            });
        };
    });


            //service to find places
    tadooServices.service(`places`, function($http, $location, locate) {

        const places = this;

        // function to find places
        places.findPlaces = function(request){
            return new Promise(function(resolve, reject) {

                const service = new google.maps.places.PlacesService(locate.map);

                //instantiates found array
                places.found = [];

                //performs search and filters content in for loop
                service.nearbySearch(request, function(results, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {

                        //: cycle through place results and filter needed information
                        //value to set spot in array
                        var j = 0;
                        for (var i = 0; i < results.length; i++) {
                            var place = results[i];

                            //set results
                            const genInfo = {
                                index: j,
                                id: place.place_id,
                                name: place.name,
                                googleRating: place.rating,
                                photo: place.icon,
                                //TODO: implement open now status to show under info
                                //openNow: place.opening_hours.open_now,
                                address: place.vicinity,
                                categories: place.types
                            };

                            if (place.rating == undefined){
                                genInfo.googleRating = `N/A`;
                            }

                            //:  filter logic to improve places found
                            if (place.rating >= 3.8 | place.types.includes(`gas_station`)) {

                                places.found.push(genInfo);
                                j++;

                            }

                        }

                        //test out places
                        resolve(places.found);
                        reject($location.hash(`#/categories/`));
                    }
                    //: Handle Error
                    else {
                        console.log(status);
                        alert(`Unable find your location!`);
                    }
                });


                //TODO: find details on specified place
                places.findDetails = function (id) {

                    function requestListener(){
                        console.log(this.responseText);
                    }

                    var xhr = new XMLHttpRequest();
                    console.log(xhr);
                    xhr.withCredentials = true;
                    xhr.addEventListener("load", requestListener);
                    xhr.open('GET', 'https://maps.googleapis.com/maps/api/place/details/json?placeid='+id+'&key=AIzaSyAJqkmPJs8LI71k7dSWc-KuYSi5zEoNpwk');
                    xhr.send();


                    // return $http({
                    //     method: 'GET',
                    //     url: 'https://maps.googleapis.com/maps/api/place/details/json?placeid='+id+'&key=AIzaSyAJqkmPJs8LI71k7dSWc-KuYSi5zEoNpwk'
                    // }).
                    // success(function(data, status) {
                    //     console.log(status);
                    //     var data = data;
                    //     alert(JSON.stringify(data));
                    // }).
                    // error(function(data, status) {
                    //     var data = data || "Request failed";
                    //     var status = status;
                    //     alert(data+status);
                    // });

                    // .then(function callbackSuccess (data) {
                    //     console.log(data);
                    // });
                }
            });
        };
    });
})();

