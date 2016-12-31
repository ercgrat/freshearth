/*
 *  Controller Setup
 */

function BlastStatsController() {
    var ctrl = this;

    ctrl.itemToolbarMenu = {
        minimized: false,
        priority: undefined,
        hidden: false
    };

    ctrl.parseDate = function(obj) {
        var date = obj === Number(obj) ? new Date(obj) : undefined;
        return date ? date.getUTCMonth() + '/' + date.getUTCDate() + '/' + date.getUTCFullYear() : 'Invalid Date Format';
    };

    ctrl.blastStats = [{
        id: Math.floor(Math.random() * 100),
        type: 'order',
        title: 'YOUR FARM Summer Sale',
        date: Date.now() - Math.floor(Math.random() * 1000000000),
        sent: Math.floor(Math.random() * 100),
        opened: Math.floor(Math.random() * 10),
        orders: Math.floor(Math.random() * 10)
    }, {
        id: Math.floor(Math.random() * 100),
        type: 'order',
        title: 'YOUR FARM Birthday Sale',
        date: Date.now() - Math.floor(Math.random() * 1000000000),
        sent: Math.floor(Math.random() * 100),
        opened: Math.floor(Math.random() * 10),
        orders: Math.floor(Math.random() * 10)
    }, {
        id: Math.floor(Math.random() * 100),
        type: 'info',
        title: 'YOUR FARM Anniversary Update',
        date: Date.now() - Math.floor(Math.random() * 1000000000),
        sent: Math.floor(Math.random() * 100),
        opened: Math.floor(Math.random() * 10)
    }];
};

/*
 *    Component Setup
 */

angular.module('FreshEarth').component('blastStats', {
    templateUrl: 'modules/dashboard/templates/blastStats/blastStats.html',
    controller: BlastStatsController,
    bindings: {
        userIdentification: '<',
        toastNotification: '<'
    }
});
