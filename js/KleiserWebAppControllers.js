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
    });

    //feature3 controller
    pageControllers.controller(`ContactListController`, function ($rootScope, $scope, localStorage) {
        $rootScope.localData = new PouchDB(`contactList`);

        var emailValidate = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i;
        var phoneValidate = /^\+?[0-9]*(\([0-9]*\))?[0-9-]*[0-9]$/;

        $scope.newContact = {
            name: ``,
            email: ``,
            phone: ``,
            createdOn: new Date(),
            _id: ``
        };

        $scope.updateContacts = function () {
            localStorage.load(function (data) {
                $scope.contacts = data.rows;
            });
        }
        $scope.updateContacts()


        $scope.submit = function () {
            //TODO:: validation
            if (!$scope.newContact.name || !$scope.newContact.email || !$scope.newContact.phone) {
                alert(`Please Fill Every Field`);
            }
            else if(!emailValidate.test($scope.newContact.email)){
                alert(`Please enter a (semi) valid email address`);
            }
            else if(!phoneValidate.test($scope.newContact.phone)){
                alert(`please enter a ten digit phone number`);
            }
            else {
                $scope.newContact.createdOn = new Date();
                $scope.newContact._id = $scope.newContact.name;

                console.log($scope.newContact);

                localStorage.post($scope.newContact)

                    .catch(function () {
                        console.log(`something went wrong!`);
                        return;
                    });

                var newItem = {
                    doc: $scope.newContact
                };


                //update DOM
                $scope.contacts.push(newItem);

                console.log($scope.newContact);
                //clear Form
                $scope.newContact = {
                    name: ``,
                    email: ``,
                    phone: ``,
                    createdOn: new Date()
                };
            }
        }
    });

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