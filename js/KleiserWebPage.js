const kleiserWebApp = angular.module(`kleiserWebApp`, [
    `ngRoute`,
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
            controller: `Contact Controller`
        }).
        otherwise({
            redirectTo: `/intro`
        });
    
}]);