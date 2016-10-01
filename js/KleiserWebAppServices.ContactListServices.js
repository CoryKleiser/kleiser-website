'use strict';
(function() {


    var contactListServices = angular.module(`contactListServices`, []);

    contactListServices.factory(`localStorage`, function ($rootScope) {
        return{
            load: function (callback) {
                //TODO:: take logs out after testing
                //load local data

                return $rootScope.localData.allDocs({
                    include_docs: true,
                    attachments: true
                }).then(function (result) {
                    console.log(result);
                    callback(result);
                }).catch(function (err) {
                    console.log(`error loading saved contacts`);
                    console.log(err);
                });
            },
            post: function (newContact){
                // post to local storage
                return  $rootScope.localData.put(newContact)
                        .then(function (result) {console.log(`Successfully Posted to Offline Storage`);})
                        .catch(function (err) {
                            console.log(`ERROR:: Did not Post to Offline Storage`);
                            console.log(err);
                        });

            },
            delete: function (contactToDelete) {
                // :  pouch delete logic
                //todo: take logs out after testing
                console.log(`to be deleted: ${contactToDelete}`);
                $rootScope.localData.get(contactToDelete).then(function (doc) {
                    console.log(doc);
                    return $rootScope.localData.remove(doc._id, doc._rev);
                }).catch(function (er) {
                    console.log(er);
                    alert(`Error! Unable to delete contact!`);
                })
            }
        }
    });





})();

