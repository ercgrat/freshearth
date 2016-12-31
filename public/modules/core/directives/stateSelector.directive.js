/*
 * State Selector Directive
 *
 * CORE Directive
 *    Simplifies the Angular Material Autocomplete directive for US State Selection
 *
 * @attribute
 *    <md-autocomplete state-selector hint="Optional Hint to Display" md-selected-item="ngModel" md-floating-label="Floating Label">
 *    </md-autocomplete>
 *
 * @function
 *    Must be an attribute on an md-autocomplete directive
 *
 *    Requires a Form to be a parent DOM element
 *
 *
 */
// function stateSelector($http, $q, $timeout, _) {
function stateSelector() {

    function link(scope, element, attrs, ctrl) {

        function loadAll() {
            var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';

            return allStates.split(/, +/g).map(function(state) {
                return {
                    value: state.toLowerCase(),
                    display: state
                };
            });
        };

        function querySearch(query) {
            return results = query ? this.states.filter(createFilterFor(query)) : this.states;
        };

        function createFilterFor(query) {
            var lowercaseQuery = query.toLowerCase();

            return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) === 0);
            };
        };

        attrs.mdSearchText = null;
        attrs.mdItems = 'state in $ctrl.stateSearch($ctrl.searchState)';
        attrs.mdItemText = 'A';
    }
    return {
        restrict: 'A',
        require: '^form',
        link: link
    };
}

angular
    .module('FreshEarth')
    .directive('stateSelector', stateSelector);
