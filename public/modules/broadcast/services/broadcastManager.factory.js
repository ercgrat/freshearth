/*
 *    Broadcast Manager
 */
function broadcastManager(_, $q, api, userIdentification) {

    return {
        sendBroadcast: sendBroadcast
    };
    
    function sendBroadcast(recipients) {
        return api.post('/broadcast/send', null, true, {
            'recipients': recipients
        });
    }
}

angular
    .module('FreshEarth')
    .factory('broadcastManager', broadcastManager);