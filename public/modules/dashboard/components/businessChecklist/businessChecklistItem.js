/*
 *  Controller Setup
 */

function businessChecklistItemController($state) {
    var ctrl = this;
}

/*
 *    Component Setup
 */

angular.module('FreshEarth').component('businessChecklistItem', {
    templateUrl: 'modules/dashboard/templates/businessChecklist/businessChecklistItem.html',
    controller: businessChecklistItemController,
    bindings: {
        task: '<'
    }
});
