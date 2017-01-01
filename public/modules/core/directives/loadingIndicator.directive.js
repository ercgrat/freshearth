/*
 * Loading Indicator Directive
 *
 *
 * CORE Directive
 *    User Angular Material Progress Linear and Progress Circular
 *    Inserts <md-progress-xxx> into DOM with potential one-way scope inheritance on attributes
 *
 * @attribute
 *    <loading-indicator loading-style="linear" progress-mode="indeterminate" theme="md-accent"></loading-indicator>
 *
 * @function
 *    Attributes signify the following optional arguments:
 *
 *    loading-style:
 *        Specifies linear or circular progress indicator
 *    disabled:
 *        Disables the progress indicator using ng-disabled
 *    progress-mode:
 *        indeterminate: Continous progress indication [linear, circular]
 *        determinate: Int value indicates progress between 1-100 [linear, circular]
 *        buffer: Two Int values control separate progress indicators between 1-100 [linear]
 *        query: Indeterminate progress indication [linear]
 *    progress-multiplier:
 *        Int value acts as a multiplier to span progress from 0-100
 *    progress-value-ref:
 *        One-way Scope binding of this value to the isolated <loading-indicator> scope
 *        Allows reference to parent component which can supply values to be used as progress-value in the progress indicator
 *    progress-value:
 *        Int value indicating progress
 *    progress-buffer-ref [linear]:
 *        One-way Scope binding of this secondary progress indicator value to the isolated <loading-indicator> scope
 *        Allows reference to parent component which can supply values to be used as secondary progress-value in the progress indicator
 *    progress-buffer [linear]:
 *        Int secondary value indicating progress
 *    circular-diameter [circular]:
 *        Int designating the width in pixels the circular progress indicator should span
 *    theme:
 *        Corresponds to the class reference of the <md-progress-xxxxx> DOM element
 *        e.g. theme="md-accent md-hue-2"
 *
 */
function loadingIndicator($rootScope, _) {

    function template(element, attrs) {
        switch (attrs.loadingStyle) {
            case 'linear':
                return '<md-progress-linear ng-disabled="{{disabled}}" md-mode="{{progressMode}}" value="{{progressValue}}" md-buffer-value="{{progressBuffer}}" class="{{theme}}"></md-progress-linear>';
                break;
            case 'circular':
                return '<md-progress-circular ng-disabled="{{disabled}}" md-mode="{{progressMode}}" value="{{progressValue}}" md-diameter="{{circularDiameter}}" class="{{theme}}"></md-progress-circular>';
                break;
            default:
                return '<md-progress-linear></md-progress-linear>'
        }
    }

    function link(scope, element, attrs, ctrl) {

        scope.disabled = _.has(attrs, 'disabled') ? true : null;
        scope.progressMode = _.has(attrs, 'progressMode') ? attrs.progressMode : null;
        scope.progressMultiplier = _.has(attrs, 'progressMultiplier') ? parseFloat(attrs.progressMultiplier) : 1;
        scope.progressValue = _.has(attrs, 'progressValueRef') ? (scope.progressValueRef * scope.progressMultiplier) : parseInt(attrs.progressValue) || null;
        scope.progressBuffer = _.has(attrs, 'progressBufferRef') ? (scope.progressBufferRef * scope.progressMultiplier) : parseInt(attrs.progressBuffer) || null;
        scope.circularDiameter = _.has(attrs, 'circularDiameter') ? parseInt(attrs.circularDiameter) : null;
        scope.theme = _.has(attrs, 'theme') ? attrs.theme : null;

        scope.$watch('progressValueRef', function(newVal, oldVal) {
            scope.progressValue = _.isNil(scope.progressValueRef) ? scope.progressValue : scope.progressValueRef * scope.progressMultiplier;
        })
        scope.$watch('progressBufferRef', function(newVal, oldVal) {
            scope.progressBuffer = _.isNil(scope.progressBufferRef) ? scope.progressBuffer : scope.progressBufferRef * (scope.progressMultiplier + _.random(10, true));
        })
    }

    return {
        restrict: 'E',
        template: template,
        scope: {
            progressValueRef: '<?progressValueRef',
            progressBufferRef: '<?progressBufferRef'
        },
        link: {
            pre: link
        }
    };
}

/*
 * Circular Progress Service Configuration
 */
function circularProgressConfiguration($mdProgressCircularProvider) {
    $mdProgressCircularProvider.configure({
        progressSize: 50,
        strokeWidth: 10,
        duration: 800,
        durationIndeterminate: 800,
    });
}


angular
    .module('FreshEarth')
    .config(circularProgressConfiguration)
    .directive('loadingIndicator', loadingIndicator);
