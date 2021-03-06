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
            .state('work', {
                url: '/work',
                controller: 'WorkController',
                views: {
                    '': {
                        templateUrl: 'partials/work.html'
                    },
                    'feature0@work': {
                        templateUrl: `partials/work.fitnessgeek.html`
                    },
                    'feature1@work': {
                        templateUrl: `partials/work.tadoo.html`
                    },
                    'feature2@work' : {
                        templateUrl: 'partials/work.greatpicks.html'
                    },
                    'feature3@work': {
                        templateUrl: `partials/work.contactlist.html`,
                        controller: `ContactListController`
                    }
                }
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