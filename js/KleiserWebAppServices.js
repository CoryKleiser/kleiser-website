'use strict';
(function() {


    var pageServices = angular.module(`pageServices`, []);


    pageServices.factory(`messageFactory`, function ($http) {
/*      PHP service !!TODO: fix (low on scope)
        var sendEmail = this;
        sendEmail.send = function(contactData) {
                $http.post('scripts/contact.php', contactData)
                    .success(alert(`YAAAYYY!!!`))
                    .error(alert(`NOOOOOOOO!`));
        };
*/


        return{
            get: function(callback){
                return $http.get(`http://localhost:3000/message`)
                    .success(function (data){
                        callback(data);
                    });
            },
            post: function(contactData){
                var emailValidate = /^(\S+@)([a-z0-9_\-]+)\.([a-z]{2,5})$/i;
                new Promise(function (resolve, reject) {


                    if (!contactData.name) {
                        alert(`please enter your name.`);
                    }
                    else if (!emailValidate.test(contactData.email)) {
                        alert(`please enter a valid email address`);
                    }
                    else if (!contactData.subject) {
                        alert(`please enter a subject for your message`);
                    }
                    else if (!contactData.message) {
                        alert(`looks like you forgot your message!`);
                    }
                    else {
                        $http.post(`http://localhost:3000/message`, contactData);
                        return contactData = {};
                    }

                    return contactData;

                });

            }
        }

    });



})();

