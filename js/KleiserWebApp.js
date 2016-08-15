'use strict'
var kleiserWebApp = angular.module(`kleiserWebApp`, [
    `ngRoute`,
    `pageControllers`,
    `pageServices`
]);

kleiserWebApp.config([`$routeProvider`, function ($routeProvider) {

    $routeProvider.
        when(`/intro`, {
            templateUrl: `partials/intro.html`,
            controller: `IntroController`
        }).
        when(`/work`, {
            templateUrl: `partials/work.html`,
            controller: `WorkController`
        }).
        when(`/about`, {
            templateUrl: `partials/about.html`,
            controller: `AboutController`
        }).
        when(`/contact`, {
            templateUrl: `partials/contact.html`,
            controller: `ContactController`
        }).
        otherwise({
            redirectTo: `/intro`
        });
    
}]);