function ProductCategoryTitleController(_, $element, $timeout, productManager, toastNotification) {
    var ctrl = this;
    ctrl.previousName = "";

    ctrl.$onInit = function() {
        if (ctrl.category.name == "") {
            ctrl.enableEditing();
        }

        /*
         * Trigger the onBlur call to disableEditing
         */
        $element.bind("keypress", function(event) {
            if (event.which === 13) {
                $element.find('input')[0].blur();
                event.preventDefault();
            }
            return false;
        });
    };

    ctrl.disableEditing = function() {
        $timeout(function() {
            if (ctrl.categoryTitleForm.$valid) {
                if (ctrl.category.name.length == 0) {
                    if (_.isNil(ctrl.category.id)) {
                        ctrl.deleteCategory();
                    }
                    return;
                }

                if (!ctrl.category.id) {
                    return productManager.createCategory(ctrl.category.name)
                    .then(function(categoryId) {
                        ctrl.category.id = categoryId;
                        ctrl.addCategory(ctrl.category);
                    })
                    .catch(function() {
                        toastNotification.generalErrorMessage("Failed to create category.");
                    });
                } else {
                    ctrl.editing = false;
                    if (ctrl.previousName != ctrl.category.name) {
                        return productManager.updateCategory(ctrl.category.id, ctrl.category.name)
                        .catch(function() {
                            toastNotification.generalErrorMessage("Failed to update category name.");
                        });
                    }
                }
            }
        });
    };

    ctrl.enableEditing = function() {
        ctrl.editing = true;
        ctrl.previousName = ctrl.category.name;
        $timeout(function() {
            $element.find('md-input-container').toggleClass("md-input-focused");
            $element.find('input')[0].focus();
            $element.find('input')[0].select();
        });
    }
}

angular.module('FreshEarth').component('productCategoryTitle', {
    templateUrl: 'modules/products/templates/productCategoryTitle.html',
    controller: ProductCategoryTitleController,
    bindings: {
        category: '<',
        deleteCategory: '&',
        addCategory: '&'
    }
});
