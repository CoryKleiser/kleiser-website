'use strict';
(function(){

    var pageControllers = angular.module(`pageControllers`, []);


    pageControllers.controller(`IntroController`, function ($scope) {
        //:  Loop thru greetings array to make initial greeting cycle through languages
        var greetings = [`Hello`, `Hola`, `Nǐ hǎo`, `Hallo`, `Bonjour`];

        var placeHolder = 0;

        function changeGreeting() {

            $scope.greeting = greetings[placeHolder];


            if (placeHolder == greetings.length - 1){
                placeHolder = 0;
            }
            else {
                placeHolder++;
            }

            setTimeout(function () {
                changeGreeting();
                $scope.$apply();
            }, 3000);
        }

        // function changeGreeting() {
        //     if (placeHolder == greetings.size){
        //         placeHolder = 0;
        //     }
        //     else {
        //         placeHolder++;
        //     }
        //
        //     $scope.greeting = greetings[placeHolder];
        //     setTimeout(function(){changeGreeting}, 2000);
        // }

        changeGreeting();


    });
    pageControllers.controller(`WorkController`, function ($scope) {
        //TODO: work controller logic
    });
    pageControllers.controller(`AboutController`, function ($scope) {
        //TODO: about controller logic
    });
    pageControllers.controller(`ContactController`, function ($scope, messageFactory) {
        //: contact controller logic
        $scope.contactData = {};


        $scope.submit = function() {

            $scope.contactData = messageFactory.post($scope.contactData);

        };

    });

})();