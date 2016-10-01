'use strict';
(function() {
    var kleiserWebApp = angular.module(`kleiserWebApp`, [
        `ui.router`,
        `ngAnimate`,
        `pageControllers`,
        `pageServices`,
        `contactListServices`,
        `pageDirectives`,
    ]);

    kleiserWebApp.config(function ($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise(`/intro`);
        $stateProvider
            .state(`intro`, {
            url: `/intro`,
            templateUrl: `partials/intro.html`,
            controller: `IntroController`,
            })
            .state(`work`, {
            url: `/work`,
            templateUrl: `partials/work.html`,
            controller: `WorkController`
            })
            .state(`work.contactlist`, {
                templateUrl: `partials/work.contactlist.html`,
                controller: `ContactListController`
            })
            .state(`about`, {
            url: `/about`,
            templateUrl: `partials/about.html`,
            controller: `AboutController`
            })
            .state(`contact`, {
            url: `/contact`,
            templateUrl: `partials/contact.html`,
            controller: `ContactController`
            })
    });
})();