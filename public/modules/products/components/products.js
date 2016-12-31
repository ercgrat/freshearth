/*
 *  Controller Setup
 */

function ProductsController(_, productManager) {
    var ctrl = this;

    ctrl.createCategory = function() {
        ctrl.newCategory = {
            name: ""
        };
    }

    ctrl.addCategory = function(category) {
        ctrl.newCategory = null;
        ctrl.businessData.categories.push(category);
    };

    ctrl.deleteCategory = function(category) {
        if (_.isNil(category)) {
            ctrl.newCategory = null;
            return;
        }
        return productManager.deleteCategory(category)
            .then(function() {
                var id = category.id;
                _.remove(ctrl.businessData.categories, function(x) {
                    return x.id == id;
                });
            });
    };
}

/*
 *    Component Setup
 */

angular.module('FreshEarth').component('products', {
    templateUrl: 'modules/products/templates/products.html',
    controller: ProductsController,
    bindings: {
        userIdentification: '<',
        toastNotification: '<',
        productManager: '<',
        businessData: '<'
    }
});

/*
 *    UI-Router Setup
 */

angular.module('FreshEarth').config(function($stateProvider) {
    $stateProvider.state('products', {
        url: '/products',
        parent: 'auth',
        component: 'products',
        resolve: {
            userIdentification: 'userIdentification',
            toastNotification: 'toastNotification',
            productManager: 'productManager',
            businessData: function(productManager, userIdentification, toastNotification) {
                return userIdentification.getBusiness()
                    .then(function(response) {
                        return productManager.getProducts(response.businessId);
                    })
                    .then(function(response) {
                        var data = {};
                        data.categories = response.categories;
                        data.products = {};
                        _.forEach(response.products, function(product) {
                            data.products[product.category] = data.products[product.category] || [];
                            data.products[product.category].push(product);
                        });
                        return data;
                    })
                    .catch(function(error) {
                        toastNotification.generalErrorMessage(error);
                        throw error;
                    });
            },
            isProducer: function(userIdentification, toastNotification) {
                return userIdentification.getBusiness()
                    .then(function(response) {
                        if (response.businessType != "Producer") {
                            throw new Error("Only producers may access this page.");
                        }
                        return true;
                    })
                    .catch(function(error) {
                        throw error;
                    });
            }
        }
    });
});
