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

    //work.contactlist controller
    pageControllers.controller(`ContactListController`, function ($rootScope, $scope, localStorage) {
        $rootScope.localData = new PouchDB(`contactList`);
        $scope.newContact = {
            name: ``,
            email: ``,
            phone: ``,
            createdOn: new Date(),
            _id: ``
        };

        $scope.updateContacts = function () {
            localStorage.load(function (data) {
                console.log(data);
                $scope.contacts = data.rows;
                console.log(data.rows);
                console.log(data.rows[0].doc);
            });
        }
        $scope.updateContacts()


        $scope.submit = function () {
            //TODO:: validation
            if (!$scope.newContact.name || !$scope.newContact.email || !$scope.newContact.phone) {
                alert(`Please Fill Each Field`);
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