function ProductController(_, $q, $timeout, $element, $scope, productManager, toastNotification) {
    var ctrl = this;

    ctrl.productBackup = {};

    // function validateProduct() {
    //     if (_.isNil(ctrl.product.name) || ctrl.product.name.length == 0) {
    //         return false;
    //     }
    //     return true;
    // }

    ctrl.$onInit = function() {
        console.log('Initializing ProductBackup');
        ctrl.productBackup = _.clone(ctrl.product);
    }

    // ctrl.$onInit = function() {
    //     if (!_.isNil(ctrl.product) && _.isNil(ctrl.product.id)) {
    //         ctrl.startEditing();
    //     }
    //
    //     $element.bind("keypress", function(event) {
    //         if (event.which === 13) {
    //             $element.find('input').blur(); // If name was edited last, triggers blur event and updates model
    //             ctrl.save();
    //             event.preventDefault();
    //         }
    //         return false;
    //     });
    // };

    // ctrl.startEditing = function() {
    //     ctrl.productBackup = _.clone(ctrl.product);
    //     ctrl.editing = true;
    // $timeout(function() {
    //     angular.element($element.find('md-input-container')[0]).toggleClass("md-input-focused");
    //     $element.find('input')[0].focus();
    //     $element.find('input')[0].select();
    // });
    // };

    ctrl._toggleEditing = function() {
        ctrl.editing = !ctrl.editing;
    }

    ctrl._addProduct = function() {
        return $q.resolve().then(function() {
            return productManager.createProduct(ctrl.product);
        }).then(function(response) {
            ctrl.productBackup = _.clone(ctrl.product);
            ctrl.product.id = response;
            return ctrl._toggleEditing();
        }).catch(function(error) {
            console.log(error);
            return error;
        });
    }

    ctrl._updateProduct = function() {
        return $q.resolve().then(function() {
            return productManager.updateProduct(ctrl.product);
        }).then(function(response) {
            ctrl.productBackup = _.clone(ctrl.product);
            return ctrl._toggleEditing();
        }).catch(function(error) {
            console.log(error);
            return error;
        });
    };

    ctrl._cancel = function() {
        return $q.resolve().then(function() {
            ctrl.product = _.clone(ctrl.productBackup);
            return ctrl._toggleEditing();
        }).catch(function(error) {
            console.log(error);
            return error;
        })
    };

    // ctrl.save = function() {
    //     $timeout(function() {
    //         if (ctrl.productForm.$valid) {
    //             if (_.isNil(ctrl.product.id)) {
    //                 return productManager.createProduct(ctrl.product)
    //                     .then(function(id) {
    //                         ctrl.product.id = id;
    //                         ctrl.addProduct(_.clone(ctrl.product));
    //                     })
    //                     .catch(function() {});
    //             } else {
    //                 console.log(ctrl.product);
    //                 console.log(ctrl.productBackup);
    //                 return productManager.updateProduct(ctrl.product)
    //                     .then(function() {
    //                         ctrl.editing = false;
    //                         ctrl.productBackup = _.clone(ctrl.product);
    //                     });
    //             }
    //         }
    //     });
    // };

    // ctrl.cancel = function() {
    //     if (_.isNil(ctrl.product) || _.isNil(ctrl.product.id)) {
    //         ctrl.deleteProduct(ctrl.product);
    //     } else {
    //         ctrl.editing = false;
    //         ctrl.product = _.clone(ctrl.productBackup);
    //     }
    // };
}

angular.module('FreshEarth').component('product', {
    templateUrl: 'modules/products/templates/product.html',
    controller: ProductController,
    bindings: {
        product: '<',
        deleteProduct: '&',
        addProduct: '&'
    }
});
