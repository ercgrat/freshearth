/*
 *  Controller Setup
 */

function AlertsListItemController($state) {
    var ctrl = this;
}

/*
 *    Component Setup
 */

angular.module('FreshEarth').component('alertsListItem', {
    templateUrl: 'modules/dashboard/templates/alerts/alertsListItem.html',
    controller: AlertsListItemController,
    bindings: {
        alert: '<'
    }
});
