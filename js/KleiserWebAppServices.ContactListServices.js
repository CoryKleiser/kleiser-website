'use strict';
(function() {


    var contactListServices = angular.module(`contactListServices`, []);

    contactListServices.factory(`contact`, function () {
        return{
            /**
             * Creates new Contact Element
             *
             * @param contact
             * @returns {*|jQuery|HTMLElement}
             */
            createContact: function (contact) {
            // : Create li element and return
            const count = $(`li`).length;
            console.log(count);
            const li = $(`<li>&nbsp;&nbsp;</li>`);
            $(li).append(`<strong>${contact.name}</strong><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`);
            $(li).append(`${contact.phone}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`);
            $(li).append(`<em>${contact.email}</em>&nbsp;&nbsp;`);
            $(li).append(`<button id="${contact._id}">Delete</button>`);
            return li;
        }
        }
    });

    contactListServices.factory(`localStorage`, function (contact) {
        return{
            load: function (localData, callback) {
                //TODO:: take logs out after testing
                //load local data
                return localData.allDocs({
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
            post: function (newContact, localData){
                // post to local storage
                localData.put(newContact).then(function (result) {
                    console.log(`Successfully Posted to Offline Storage`);
                }).catch(function (err) {
                    console.log(`ERROR:: Did not Post to Offline Storage`);
                    console.log(err);
                });
            },
            delete: function (localData) {
                // :  pouch delete logic
                //todo: take logs out after testing
                console.log(`to be deleted: ${contactToDelete}`);
                localData.get(contactToDelete).then(function (doc) {
                    console.log(doc);
                    return localData.remove(doc._id, doc._rev);
                }).catch(function (er) {
                    console.log(er);
                    alert(`Error! Unable to delete contact!`);
                })
            }
        }
    });





})();

