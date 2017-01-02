/*
 *  Controller Setup
 */

function ContactsController(userIdentification, contactManager) {
    var ctrl = this;
    
    ctrl.$onInit = function() {
        console.log(contactManager);
        console.log(ctrl.contactData);
    };
}

/*
 *    Component Setup
 */

angular.module('FreshEarth').component('contacts', {
    templateUrl: 'modules/broadcast/templates/contacts.html',
    controller: ContactsController,
    bindings: {
        userIdentification: '<',
        contactManager: '<',
        contactData: '<'
    }
});