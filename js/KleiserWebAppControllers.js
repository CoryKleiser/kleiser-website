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

        changeGreeting();


    });

    pageControllers.controller(`WorkController`, function ($scope) {
        //: work controller logic
        $scope.contactList = false;
    });

    //TODO:: add work.contactlist controller
    pageControllers.controller(`WorkController.ContactList`, function ($scope, contactListServices) {
        //get values
        $scope.newContact = {
            name: ``,
            email: ``,
            phone: ``,
        };

        $scope.updateContacts = function(){
            contactListServices.localStorage.load(function (data) {
                $scope.contacts = data;
            });
        }
        $scope.updateContacts();


        $scope.submit = function (newContact) {
            newContact.createdOn = new Date();
            contactListServices.localStorage.post(newContact);
            contactListServices.contact.createContact(newContact);
            $scope.newContact = {
                name: ``,
                email: ``,
                phone: ``,
            }
        };
    })

    pageControllers.controller(`AboutController`, function ($scope) {
        //: about controller logic
    });
    pageControllers.controller(`ContactController`, function ($scope, messageFactory) {
        //: contact controller logic
        $scope.contactData = {};


        $scope.submit = function() {

            $scope.contactData = messageFactory.post($scope.contactData);

        };

    });

})();