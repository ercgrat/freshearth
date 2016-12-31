/*
 *  Controller Setup
 */

function businessChecklistController($state, _) {
    var ctrl = this;

    ctrl.itemToolbarMenu = {
        minimized: false,
        priority: undefined,
        hidden: false
    };

    ctrl.tasks = [{
        title: 'Write a Business Biography',
        priority: Math.floor(Math.random() * 3),
        url: 'profile'
    }, {
        title: 'Add a Product to your Inventory',
        priority: Math.floor(Math.random() * 3),
        url: 'products'
    }, {
        title: 'Configure your supported Delivery Methods',
        priority: Math.floor(Math.random() * 3),
        url: 'profile'
    }, {
        title: 'Add a Customer Contact',
        priority: Math.floor(Math.random() * 3),
        url: 'contacts'
    }, {
        title: 'Process an Order',
        priority: Math.floor(Math.random() * 3),
        url: 'orders'
    }, {
        title: 'Complete an Order Delivery',
        priority: Math.floor(Math.random() * 3),
        url: 'orders'
    }, {
        title: 'Add a Certification to your Profile',
        priority: Math.floor(Math.random() * 3),
        url: 'profile'
    }];

}

/*
 *    Component Setup
 */

angular.module('FreshEarth').component('businessChecklist', {
    templateUrl: 'modules/dashboard/templates/businessChecklist/businessChecklist.html',
    controller: businessChecklistController,
    bindings: {
        userIdentification: '<',
        toastNotification: '<'
    }
});
