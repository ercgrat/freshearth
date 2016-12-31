function ProductCategoryController(_, $element, productManager) {
    var ctrl = this;

    ctrl.$onInit = function() {
        ctrl.products = ctrl.products || [];
        ctrl.newProduct = null;
    };

    ctrl.createProduct = function() {
        ctrl.newProduct = {
            category: ctrl.category.id,
            name: "",
            unit: "lbs",
            quantityAvailable: null,
            available: true,
            allowFloatValues: false,
            infinite: false,
            description: ""
        };
    };

    ctrl.addProduct = function(product) {
        ctrl.products.push(product);
        ctrl.newProduct = null;
    };

    ctrl.deleteProduct = function(product) {
        if (_.isNil(product)) {
            ctrl.newProduct = null;
            return;
        }
        return productManager.deleteProduct(product)
            .then(function() {
                _.remove(ctrl.products, function(x) {
                    return x.id == product.id;
                });
            });
    };
}

angular.module('FreshEarth').component('productCategory', {
    templateUrl: 'modules/products/templates/productCategory.html',
    controller: ProductCategoryController,
    bindings: {
        category: '<',
        products: '<',
        deleteCategory: '&',
        addCategory: '&'
    }
});
