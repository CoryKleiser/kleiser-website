'use strict';
(function(){

    var pageControllers = angular.module(`pageControllers`, []);


    pageControllers.controller(`IntroController`, function ($scope) {
        //TODO: intro controller logic
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