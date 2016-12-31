/*
 *    Google Maps
 */
function googleMapManager($q, $http, _) {

    var apiKey = 'AIzaSyDhA-jJMXZoKCmfQybl1MZUE1wHCPsuQVY';

    var defaultMapOptions = {
        zoom: 17,
        disableDefaultUI: true,
        mapTypeControl: false,
        rotateControl: false,
        scaleControl: false,
        scrollwheel: false,
        zoomControl: false,
        draggable: false,
        clickableIcons: false,
        disableDoubleClickZoom: true
    }

    /*
     *   Return Function
     */
    return {
        setAPIKey: setAPIKey,
        getAPIKey: getAPIKey,
        createBounds: createBounds,
        createLatLng: createLatLng,
        createMarker: createMarker,
        createInfoWindow: createInfoWindow,
        createMap: createMap,
        refreshMap: refreshMap,
        geocodeAddress: geocodeAddress,
        reverseGeocodeAddress: reverseGeocodeAddress
    };

    /*
     *    Set API Key
     */
    function setAPIKey(key) {
        apiKey = key;
    }

    /*
     *    Get API Key
     */
    function getAPIKey() {
        return apiKey;
    }

    /*
     *    Create Bounds Object
     */
    function createBounds(south, west, north, east) {
        return {
            south: south,
            west: west,
            north: north,
            east: east
        }
    }

    /*
     *    Create Latitude Longitude Object
     */
    function createLatLng(latitude, longitude) {
        return {
            lat: latitude,
            lng: longitude
        }
    }

    /*
     *    Create Map Marker
     *
     *    @args
     *      map: Map,
     *      position: LatLng
     */
    function createMarker(map, position) {
        return $q.resolve(map).then(function(response) {
            return $q.resolve(new google.maps.Marker({
                map: map,
                position: position
            }));
        }).catch(function(error) {
            return $q.reject(error);
        });
    }

    /*
     *    Create Info Windows
     *
     *    @args
     *      map: Map,
     *      position: LatLng,
     *      content: String
     */
    function createInfoWindow(map, position, label) {
        return $q.resolve(new google.maps.InfoWindow({
            map: map,
            position: position,
            label: label
        })).catch(function(error) {
            return $q.reject(error);
        });
    }

    /*
     *     Create Map
     *
     *    @args
     *      element: DOM element to make into Map
     *      options: Map Options
     */
    function createMap(element, options) {
        return $q.resolve(element).then(function(response) {
            return _.isElement(response) ? $q.resolve(response) : $q.reject('Element Undefined');
        }).then(function(response) {
            var valid = _.pick(_.omitBy(options, _.isEmpty), ['zoom', 'disableDefaultUI', 'mapTypeControl', 'rotateControl', 'scaleControl', 'scrollwheel', 'zoomControl', 'draggable', 'clickableIcons', 'disableDoubleClickZoom']);
            var defaults = _.partialRight(_.assignInWith, function(objValue, srcValue) {
                return _.isUndefined(objValue) ? srcValue : objValue;
            });
            return defaults(valid, defaultMapOptions);
        }).then(function(response) {
            return $q.resolve(new google.maps.Map(element, response));
        }).catch(function(error) {
            return $q.reject(error);
        });
    }

    /*
     *     Resize Map
     *
     *    @args
     *      element: DOM element that is the Map
     *
     */
    function refreshMap(element) {
        return $q.resolve(element).then(function() {
            return google.maps.event.trigger(element, 'resize');
        }).then(function(response) {
            return $q.resolve('Refreshed');
        }).catch(function(error) {
            return $q.reject(error);
        })
    }

    /*
     *     Geocode Address
     *
     *    @args
     *      options: Map Options
     *          ^address: String
     *          bounds: Object { south: ##.####, west: ##.####, north: ##.####, east: ##.#### }
     *          region: 'gb', 'de', 'fr', etc.,
     *          language: 'en', 'fr', 'de', etc.
     */
    function geocodeAddress(options) {
        return $q.resolve(options).then(function(response) {
            return _.isObjectLike(response) ? $q.resolve(response) : $q.reject('Invalid Argument Format');
        }).then(function(response) {
            var valid = _.pick(_.omitBy(response, _.isEmpty), ['address', 'bounds', 'region', 'language']);
            return _.has(valid, ['address']) ? $q.resolve(valid) : $q.reject('Required Argument Missing: address');
        }).then(function(response) {
            return $http.post(APIURL + '/maps/geocode', {
                v: response
            }).then(function(response) {
                return $q.resolve(response);
            }).catch(function(error) {
                return $q.reject(error);
            });
        }).catch(function(error) {
            return $q.reject(error);
        });
    }


    /*
     *     Reverse Geocode Address
     *
     *    @args
     *      options: Map Options
     *          ^latlng: LatLng Object,
     *            ** OR
     *          ^placeId: String,
     *          result_type: [ 'street_address', 'route', 'intersection', 'political', 'country', etc. ],
     *          location_type: String [ 'ROOFTOP', 'RANGE_INTERPOLATED', 'GEOMETRIC_CENTER', 'APPROXIMATE' ],
     *            ** If result_type and location_type are both specified only results that match both are returned
     *          language: 'en', 'fr', 'de', etc.
     */
    function reverseGeocodeAddress(options) {
        return $q.resolve(options).then(function(response) {
            return _.isObjectLike(response) ? $q.resolve(response) : $q.reject('Invalid Argument Format');
        }).then(function(response) {
            var valid = _.pick(_.omitBy(response, _.isEmpty), ['latlng', 'placeId', 'result_type', 'location_type', 'language']);
            return _.has(valid, 'latlng') || _.has(valid, 'placeId') ? $q.resolve(valid) : $q.reject('Required Argument Missing: latlng OR placeId');
        }).then(function(response) {
            return $http.post(APIURL + '/maps/reverseGeocode', {
                v: response
            }).then(function(response) {
                return $q.resolve(response);
            }).catch(function(error) {
                return $q.reject(error);
            });
        }).catch(function(error) {
            return $q.reject(error);
        });
    }
}

angular
    .module('FreshEarth')
    .factory('googleMapManager', googleMapManager);
