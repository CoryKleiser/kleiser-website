'use strict';
(function() {


    var contactListServices = angular.module(`contactListServices`, []);

    contactListServices.factory(`contact`, function () {
        return{
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
            load: function () {
                //TODO:: take logs out after testing
                localData.allDocs({
                    include_docs: true,
                    attachments: true
                }).then(function (result) {
                    console.log(result);
                    console.log(result.rows.length);

                    //load local data
                    $(result.rows).each(function () {
                        // : Create contacts for each record
                        const savedContact = contact.createContact(this.doc);
                        // : Append contacts (li elements) to ul#contactList
                        $(`#contactList`).append(savedContact);
                    });

                    //style buttons
                    $(`button`).addClass(`btn btn-default btn-xs btn-danger delete`);
                    //attach delete handler
                    $(`.delete`).on(`click`, handleContactDelete);
                }).catch(function (err) {
                    console.log(`error loading saved contacts`);
                    console.log(err);
                });
            },
            post: function (newContact){
                var phoneValidate = /^\+?[0-9]*(\([0-9]*\))?[0-9-]*[0-9]$/;
                var emailValidate = /^(\S+@)([a-z0-9_\-]+)\.([a-z]{2,5})$/i;

                //validate
                if (!newContact.name) {
                    alert(`Please enter your name.`);
                }
                else if (!emailValidate.test(newContact.email)) {
                    alert(`Please enter valid email address.`);
                }
                else if (!phoneValidate.test(newContact.phone)) {
                    alert(`Please enter a valid phone number`);
                }
                else {
                    // post to local storage
                    localData.put(newContact).then(function (result) {
                        console.log(`Successfully Posted to Offline Storage`);
                    }).catch(function (err) {
                        console.log(`ERROR:: Did not Post to Offline Storage`);
                        console.log(err);
                    });
                }
            },
            delete: function () {
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

