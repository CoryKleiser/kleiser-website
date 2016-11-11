
angular.module(`tadooApp.service`, [])


//This service locates the user
    .service(`locate`, function(){
        const locate = this;
        locate.map;
        locate.userLocation;

        locate.findUser = function(){
            return new Promise(function (resolve, reject) {

                navigator.geolocation.getCurrentPosition(function (position) {
                    locate.userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                });
                locate.map = new google.maps.Map($('#mapContainer'), {
                    center: locate.userLocation,
                    zoom: 14,
                });

                console.log(locate.userLocation);
                resolve(locate.userLocation);
                return (locate.userLocation);
            });
        };
    })


    //service to find places
    .service(`places`, function($http, $location, locate) {

        const places = this;
        const service = new google.maps.places.PlacesService(locate.map);


        // function to find places
        places.findPlaces = function(request){
            return new Promise(function(resolve, reject) {


                //instantiates found array
                places.found = [];

                //performs search and filters content in for loop
                service.nearbySearch(request, function(results, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {

                        console.log(results);
                        //: cycle through place results and filter needed information
                        //value to set spot in array
                        for (var i = 0; i < results.length; i++) {
                            var place = results[i];

                            //set results
                            const genInfo = {
                                index: i,
                                id: place.place_id,
                                name: place.name,
                                googleRating: place.rating,
                                photo: place.icon,
                                //openNow: place.opening_hours.open_now,
                                address: place.vicinity,
                                categories: place.types
                            };

                            if (place.rating == undefined){
                                genInfo.googleRating = `N/A`;
                            }

                                places.found.push(genInfo);


                        }

                        //test out places
                        resolve(places.found);
                    }
                    //: Handle Error
                    else {
                        console.log(status);
                        alert(`Unable find your location!`);
                        reject($location.hash(`#/categories/`));
                    }
                });
            });
        };

                //: find details on specified place
                places.findDetails = function (id) {
                    return new Promise(function (resolve, reject) {

//TODO:: resolve no website issue

                        places.details = {};

                        var request = {
                            placeId: id
                        };

                        service.getDetails(request, callback);

                        function callback(place, status) {
                            if (status == google.maps.places.PlacesServiceStatus.OK) {

                                places.details = place;
                                resolve(places.details);

                            }
                            else{
                                //TODO:: handle error
                                reject();
                            }
                        }

                    });



                };

        places.formatPhoneNumber = function (num) {

            let phone = num;
            phone.replace(/\s+/g, '-');
            console.log(phone);
            return phone;

        }
    });