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

    ctrl.blastStats = [{
        title: 'Farm Blast Summer',
        date: Math.random() * 1000,
        sent: Math.random() * 100,
        opened: Math.random() * 10,
        orders: Math.random() * 10
    }, {
        title: 'Farm Blast Birthday Sale',
        date: Date.now() - Math.random() * 1000,
        sent: Math.random() * 100,
        opened: Math.random() * 10,
        orders: Math.random() * 10

    }, {
        title: 'Farm Blast Anniversary Update',
        // date: Date.now() - Math.random() * 1000,
        sent: Math.random() * 100,
        opened: Math.random() * 10,
        orders: Math.random() * 10

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
