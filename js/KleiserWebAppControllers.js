'use strict';
(function(){

    var pageControllers = angular.module(`pageControllers`, []);


    pageControllers.controller(`IntroController`, function ($scope) {
        //FIXME:  Loop thru greetings array to make initial greeting cycle through languages

        $scope.greeting = `Hello`;

        var greetings = [`Hello`, `Hola`, `Hallo`];

        var placeHolder = 0;
        var flag = true;

        function changeGreeting() {
            if (placeHolder == greetings.size){
                placeHolder = 0;
            }
            else {
                placeHolder++;
            }

            $scope.greeting = greetings[placeHolder];
            setTimeout(changeGreeting, 2000);
        }

        changeGreeting()


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