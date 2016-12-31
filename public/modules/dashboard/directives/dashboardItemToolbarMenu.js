/*
 * Dashboard Item FAB Toolbar Directive Component
 *
 *
 */
function configureItemToolbarMenuController($mdMedia) {
    var ctrl = this;

    /*
     *  Core Functionality
     */
    ctrl.isOpen = false;

    ctrl.toggleOpen = function() {
        !ctrl.isOpen;
    }
    ctrl.hide = function() {
        ctrl.itemToolbarMenu.hidden = true;
    }
    ctrl.minMaxToggle = function() {
        ctrl.itemToolbarMenu.minimized = !ctrl.itemToolbarMenu.minimized;
    }
    ctrl.lowerPriority = function() {
        ctrl.itemToolbarMenu.priority--;
    }
    ctrl.increasePriority = function() {
        ctrl.itemToolbarMenu.priority++;
    }
    ctrl.hideLabel = function() {
        ctrl.itemToolbarMenu.hideLabel = $mdMedia(ctrl.hideLabelSize) && ctrl.isOpen;
        return $mdMedia(ctrl.hideLabelSize);
    }
}

/*
 *    Component Setup
 */
angular.module('FreshEarth').component('dashboardItemToolbarMenu', {
    templateUrl: '/modules/dashboard/directives/dashboardItemToolbarMenu.html',
    controller: configureItemToolbarMenuController,
    bindings: {
        itemToolbarMenu: '=',
        hideLabelSize: '<'
    }
});
