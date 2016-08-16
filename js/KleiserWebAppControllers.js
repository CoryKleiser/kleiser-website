'use strict';
(function(){

    var pageControllers = angular.module(`pageControllers`, [`ui.router`]);


    pageControllers.controller(`IntroController`, function ($rootScope, draw) {
        //TODO: intro controller logic
        $rootScope.$on(`$stateChangeSuccess`, draw.drawAnimation());
    });
    pageControllers.controller(`WorkController`, function ($scope) {
        //TODO: intro controller logic
    });
    pageControllers.controller(`AboutController`, function ($scope) {
        //TODO: intro controller logic
    });
    pageControllers.controller(`ContactController`, function ($scope) {
        //TODO: intro controller logic
    });

})();