/*
 *  Controller Setup
 */

function BroadcastController() {
    var ctrl = this;
    
    
}

/*
 *    Component Setup
 */

angular.module('FreshEarth').component('broadcast', {
    templateUrl: 'modules/broadcast/templates/broadcast.html',
    controller: BroadcastController,
    bindings: {
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
            contactManager: 'contactManager',
            businessTypeCheck: function(userIdentification) {
                return userIdentification.isBusinessType(['Producer']);
            },
            contactData: function(contactManager) {
                return contactManager.getContactData();
            }
        }
    });
});
