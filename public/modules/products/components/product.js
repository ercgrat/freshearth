function ProductController(_, $timeout, $element, $scope, productManager, toastNotification) {
    var ctrl = this;
	ctrl.productBackup = {};
	
	function validateProduct() {
		if(_.isNil(ctrl.product.name) || ctrl.product.name.length == 0) {
			return false;
		}
		return true;
	}
	
	ctrl.$onInit = function() {
		if(!_.isNil(ctrl.product) && _.isNil(ctrl.product.id)) {
			ctrl.startEditing();
		}
		
		$element.bind("keypress", function (event) {
            if(event.which === 13) {
                ctrl.save();
                event.preventDefault();
            }
            return false;
        });
	};
	
	ctrl.startEditing = function() {
		ctrl.productBackup = _.clone(ctrl.product);
		ctrl.editing = true;
		$timeout(function() {
			angular.element($element.find('md-input-container')[0]).toggleClass("md-input-focused");
			$element.find('input')[0].focus();
			$element.find('input')[0].select();
		});
	};
	
	ctrl.save = function(showToast) {
		$timeout(function() {
			if(ctrl.productForm.$valid) {
				if(_.isNil(ctrl.product.id)) {
					return productManager.createProduct(ctrl.product)
					.then(function(id) {
						ctrl.product.id = id;
						ctrl.addProduct(_.clone(ctrl.product));
					})
					.catch(function(){});
				} else {
					return productManager.updateProduct(ctrl.product)
					.then(function() {
						ctrl.editing = false;
						ctrl.productBackup = _.clone(ctrl.product);
                        if(showToast) {
                            toastNotification.generalInfoMessage("Updated product availability.");
                        }
					});
				}
			}
		});
	};
	
	ctrl.cancel = function() {
		if(_.isNil(ctrl.product) || _.isNil(ctrl.product.id)) {
			ctrl.deleteProduct(ctrl.product);
		} else {
			ctrl.editing = false;
			ctrl.product = _.clone(ctrl.productBackup);
		}
	};
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