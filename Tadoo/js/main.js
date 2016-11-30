//: Initialize Angular Module
const tadooApp = angular.module(`tadooApp`, [
    `ngRoute`,
    `tadooApp.service`,
    `tadooApp.controller`
]);

tadooApp.config([`$routeProvider`, function ($routeProvider) {
    $routeProvider.
    when(`/categories/`, {
            templateUrl: `partials/categories.html`,
            controller: `CatController`
    }).
    when(`/list/:itemId`, {
        templateUrl: `partials/list.html`,
        controller: `ListController`
    }).
    when(`/info/:itemId`, {
        templateUrl: `partials/info.html`,
        controller: `InfoController`,
    }).
    otherwise({
        redirectTo: `/categories/`
    });
}]);