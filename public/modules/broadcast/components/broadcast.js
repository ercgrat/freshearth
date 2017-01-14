/*
 *  Controller Setup
 */

function BroadcastController() {
    var ctrl = this;
    
    ctrl.testSendEmail = function() {
        ctrl.broadcastManager.sendBroadcast(ctrl.contactData.contacts[ctrl.contactData.selectedGroup.id]);
    };
}

/*
 *    Component Setup
 */

angular.module('FreshEarth').component('broadcast', {
    templateUrl: 'modules/broadcast/templates/broadcast.html',
    controller: BroadcastController,
    bindings: {
        broadcastManager: '<',
        contactManager: '<',
        contactData: '<'
    }
});

/*
 *    UI-Router Setup
 */

angular.module('FreshEarth').config(function($stateProvider) {
    $stateProvider.state('broadcast', {
        url: '/broadcast',
        parent: 'auth',
        component: 'broadcast',
        resolve: {
            businessTypeCheck: function(userIdentification) {
                return userIdentification.isBusinessType(['Producer']);
            },
            broadcastManager: 'broadcastManager',
            contactManager: 'contactManager',
            contactData: function(contactManager) {
                return contactManager.getContactData();
            }
        }
    });
});
