/*
 *  Controller Setup
 */

function ContactsController(_, contactManager) {
    var ctrl = this;
    
    ctrl.$onInit = function() {
        ctrl.defaultGroup = _.find(ctrl.contactData.groups, function(group) {
            return group.custom == 0;
        });
        ctrl.selectedGroup = ctrl.defaultGroup;
        console.log(contactManager);
        console.log(ctrl.contactData);
        console.log(ctrl.defaultGroup);
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