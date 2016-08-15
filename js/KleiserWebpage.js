const KleiserWebApp = angular.module(`kleiserWebApp`, [
    `ngRoute`,
]);

kleiserWebApp.config([`$routeProvider`, function ($routeProvider) {

    $routeProvider
        .when(`/intro/`, {
            templateUrl: `partials/intro.html`,
            controller: IntroController
        })
        .when(`/work/`, {
            templateUrl: `partials/work.html`
        })
        .when(`/about/`, {
            templateUrl: `partials/about.html`
        })
        .when(`/contact/`, {
            templateUrl: `partials/contact.html`
        })
        .otherwise({
            redirectTo: `/intro/`
        });
    
}]);