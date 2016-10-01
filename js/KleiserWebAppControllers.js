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
    pageControllers.controller(`ContactListController`, function ($scope, contact, localStorage) {
        var localData = new PouchDB(`contactList`);
        $scope.newContact = {
            name: ``,
            email: ``,
            phone: ``,
            createdOn: new Date(),
            _id: ``
        };

        $scope.updateContacts = function(){
            localStorage.load(localData, function (data) {
                $scope.contacts = data;
            });
        }
        $scope.updateContacts()


        $scope.submit = function () {
            if (!$scope.newContact.name || !$scope.newContact.email || !$scope.newContact.phone){
                alert(`Please Fill Each Field`);
            }
            else {
                $scope.newContact.createdOn = new Date();

                localStorage.post($scope.newContact, localData)
                    .then(function (response) {
                        console.log(response);

                        $scope.contacts.push(response.data);
                        $scope.newContact = {
                            name: ``,
                            email: ``,
                            phone: ``,
                            createdOn: new Date()
                        };
                    })
                    .catch(function(response) {
                        console.log(response);
                    });
            }
        };
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