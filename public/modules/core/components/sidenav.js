/*
 *  Controller Setup
 */

function SidenavController($mdSidenav, $timeout, _, userIdentification) {
    var ctrl = this;


    getBusinessName();

    function getBusinessName() {
        userIdentification.getBusinessName().then(function(response) {
            ctrl.businessName = _.isUndefined(response) ? 'Your Business' : response;
        });
    };

    ctrl.isAuthenticated = function() {
        return userIdentification.isAuthenticated();
    }

    ctrl.isSidenavLockedOpen = function() {
        return $mdSidenav('left').isLockedOpen();
    }

    ctrl.closeSidenav = function() {
        $mdSidenav('left').close();
    };

};

/*
 *    Component Setup
 */

angular.module('FreshEarth').component('sidenav', {
    templateUrl: 'modules/core/templates/sidenav.html',
    controller: SidenavController
});
