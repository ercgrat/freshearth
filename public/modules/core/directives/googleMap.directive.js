/*
 * Google Map Directive
 *
 * CORE Directive
 *    Uses Google Maps API for Javascript
 *    Inserts <div> Map into template where directive is included as an attribute
 *
 * @attribute
 *    <div google-map="{ object }></div>
 *
 * @function
 *    Attributes signify the following optional arguments:
 *
 *    interactive:
 *        If included the map can be manipulated. Default is STATIC MAP
 *
 *
 *
 */
function configureMap($http, $q, $timeout, _, googleMapManager) {

    function link(scope, element, attrs, ctrl) {

        var map, change, timeout, addressLabel;
        var mapObjects = [];

        /*
         *    Parse Address
         *
         *    args:
         *      values: Object
         */
        function parseAddress(values) {
            return $q.resolve(values).then(function(response) {
                return _.isEmpty(response) || !_.isObjectLike(response) ? $q.reject('Invalid Address Format: ' + response) : response;
            }).then(function(response) {
                var address = '';
                _.forIn(response, function(value, key) {
                    address += !_.isObject(value) && !_.isEmpty(_.toString(value)) ? value + ' ' : '';
                });
                return address ? $q.resolve(_.trim(address)) : $q.reject('Address Undefined');
            }).catch(function(error) {
                return $q.reject(error);
            });
        }

        // Prettify Address for infoWindow
        function prettifyAddress(address) {
            var split = [];
            _.forEach(_.split(address, ','), function(val) {
                split.push(_.trim(val) + ', ');
            });
            var fancyAddress = '<p>' + _.head(split) + '</p><p>';
            _.forEach(_.slice(split, 1, split.length), function(val) {
                fancyAddress += val;
            });
            return _.padEnd(_.trimEnd(fancyAddress, ', '), 4, '</p>');
        }

        // Expects LatLng Object
        function setMapCenter(latlng) {
            return $q.resolve(latlng).then(function() {
                return map.setCenter(latlng);
            }).then(function(response) {
                return $q.resolve(response);
            }).catch(function(error) {
                return $q.reject(error);
            });
        }

        // Removes Map Object(s)
        function removeMapObjects(object, objects) {
            if (object) {
                object.setMap(null);
            } else {
                _.each(objects, function(o) {
                    o.setMap(null);
                });
            }
        }

        // Expects LatLng Object
        function createMapMarker(latlng) {
            return googleMapManager.createMarker(map, latlng);
        }

        // Expects LatLng Object
        function createInfoWindow(latlng, content) {
            return googleMapManager.createInfoWindow(map, latlng, content);
        }

        // Expects String
        function geocodeAddress(address) {
            return $q.resolve(address).then(function(response) {
                return googleMapManager.geocodeAddress({
                    address: response
                });
            }).then(function(response) {
                return response.data[0] ? $q.resolve({
                    latlng: response.data[0].geometry.location,
                    address: response.data[0].formatted_address
                }) : $q.reject('No Location Found');
            }).catch(function(error) {
                return $q.reject(error);
            })
        }

        //
        function createMap() {
            return googleMapManager.createMap(element.children()[0]).then(function(response) {
                map = response;
                return;
            }).catch(function(error) {
                return $q.reject(error);
            });
        };

        scope.$on('geocodeAddress', function(e, args) {
            if (change == 1) {
                return geocodeAddress(address).then(function(response) {
                    addressLabel = prettifyAddress(response.address);
                    latlng = response.latlng;
                    return $q.resolve();
                }).then(function() {
                    removeMapObjects(undefined, mapObjects);
                    mapObjects = [];
                    return $q.resolve();
                }).then(function() {
                    return createMapMarker(latlng);
                }).then(function(response) {
                    mapObjects.push(response);
                    return createInfoWindow(latlng).then(function(infoWindow) {
                        mapObjects.push(infoWindow);
                        infoWindow.open(map, response);
                        return infoWindow.setContent(addressLabel);
                    });
                }).then(function() {
                    change = 0;
                    return $q.resolve();
                }).catch(function(error) {
                    console.log(error);
                });
            }
        });

        scope.$on('showMap', function(e, args) {
            $timeout(function() {
                return googleMapManager.refreshMap(map).then(function() {
                    return $q.resolve(latlng);
                }).then(function(response) {
                    return setMapCenter(latlng);
                }).catch(function(error) {
                    console.log(error);
                });
            }, 0);
        });

        // Watch Values
        scope.$watchCollection(attrs.ngModel, function(newValue, oldValue) {
            $timeout.cancel(timeout);
            timeout = $timeout(function() {
                return parseAddress(newValue).then(function(response) {
                    return address = response;
                }).then(function() {
                    return change = 1;
                }).catch(function(error) {
                    console.log(error);
                });
            }, 500);
        });

        // Initialize Map
        createMap();
    }
    return {
        restrict: 'E',
        template: ['<div class="map"></div>' +
            '<style>.map { height: 100%; min-height: 300px; }</style>'
        ].join('\n'),
        require: 'ngModel',
        link: link
    };
}

angular
    .module('FreshEarth')
    .directive('googleMap', configureMap);
