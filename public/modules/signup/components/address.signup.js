function AddressSignupController(_) {
    var ctrl = this;
    
    ctrl.$onInit = function() {
        ctrl.items = loadAll();
        ctrl.searchText = null;
        ctrl.itemSearch = itemSearch;
        
        ctrl.signupRefresh();
    };

    function loadAll() {
        var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
            Florida, Georgia, Guam, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
            Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
            Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
            North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Puerto Rico, Rhode Island, South Carolina,\
            South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Virgin Islands, Washington, West Virginia,\
            Wisconsin, Wyoming';
        return allStates.split(/, +/g);
    };

    function itemSearch(query) {
        return results = query ? this.items.filter(createFilterFor(query)) : this.items;
    };

    function createFilterFor(query) {
        return function filterFn(item) {
            return (item.indexOf(_.startCase(query)) === 0);
        };
    };
};

angular.module('FreshEarth').component('addressSignup', {
    templateUrl: 'modules/signup/templates/address.signup.html',
    controller: AddressSignupController,
    bindings: {
        signupForward: '&',
        signupBackward: '&',
        signupRefresh: '&',
        signupCredentials: '=',
        signupValidators: '<',
        signupForm: '<'
    }
});
