'use strict';

/*
 * API Base URL for making API Calls
 */
var APIURL = 'http://45.55.250.153:8012/api';

var FreshEarth = angular.module('FreshEarth', ['ngMaterial',  'ngMessages', 'ngAnimate', 'ngCookies', 'ngAria', 'ui.router']);

/*
 *Material Design Theming
 * https://material.angularjs.org/latest/Theming/04_multiple_themes
 */
FreshEarth.config(function($mdThemingProvider) {

    $mdThemingProvider.theme('default')
        .primaryPalette('green')
        .accentPalette('orange')
        .warnPalette('deep-orange');

    $mdThemingProvider.theme('sidenav')
        .primaryPalette('green')
        .accentPalette('orange')
        .warnPalette('deep-orange')
        .backgroundPalette('background');

    $mdThemingProvider.definePalette('background', {
        '50': 'FAFAFA',
        '100': 'F5F5F5',
        '200': 'EEEEEE',
        '300': 'E0E0E0',
        '400': 'BDBDBD',
        '500': '9E9E9E',
        '600': '757575',
        '700': '616161',
        '800': '424242',
        '900': '212121',
        'A100': 'ffffff',
        'A200': 'fbfbfb',
        'A400': 'd4d4d4',
        'A700': '949494'
    });
});


/*
 * Material Design Icons
 * https://material.io/icons/
 *
 * Use Format
 *  <md-icon md-svg-src="ICON_SET_TITLE:ic_ICON_NAME_24px" aria-label="LABEL"></md-icon>
 * Example
 *  <md-icon md-svg-src="navigation:ic_close_24px" aria-label="Navigation Menu"></md-icon>
 */
FreshEarth.config(function($mdIconProvider) {
    $mdIconProvider
        .iconSet('action', '/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg', 24)
        .iconSet('alert', '/material-design-icons/sprites/svg-sprite/svg-sprite-alert.svg', 24)
        .iconSet('av', '/material-design-icons/sprites/svg-sprite/svg-sprite-av.svg', 24)
        .iconSet('communication', '/material-design-icons/sprites/svg-sprite/svg-sprite-communication.svg', 24)
        .iconSet('content', '/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg', 24)
        .iconSet('device', '/material-design-icons/sprites/svg-sprite/svg-sprite-device.svg', 24)
        .iconSet('editor', '/material-design-icons/sprites/svg-sprite/svg-sprite-editor.svg', 24)
        .iconSet('file', '/material-design-icons/sprites/svg-sprite/svg-sprite-file.svg', 24)
        .iconSet('hardware', '/material-design-icons/sprites/svg-sprite/svg-sprite-hardware.svg', 24)
        .iconSet('image', '/material-design-icons/sprites/svg-sprite/svg-sprite-image.svg', 24)
        .iconSet('maps', '/material-design-icons/sprites/svg-sprite/svg-sprite-maps.svg', 24)
        .iconSet('navigation', '/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg', 24)
        .iconSet('notification', '/material-design-icons/sprites/svg-sprite/svg-sprite-notification.svg', 24)
        .iconSet('places', '/material-design-icons/sprites/svg-sprite/svg-sprite-places.svg', 24)
        .iconSet('social', '/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg', 24)
        .iconSet('toggle', '/material-design-icons/sprites/svg-sprite/svg-sprite-toggle.svg', 24)
        .defaultIconSet('/material-design-icons/iconfont/MaterialIcons-Regular.svg', 24);
});

/*
 * Comment this out to remove the visualizer at the bottom
 */
FreshEarth.run(function() {
    var vis = window['ui-router-visualizer'];
});

/*
 * HTML5 Mode Configuration
 */
FreshEarth.config(function($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: true
    }).hashPrefix('*');
});
