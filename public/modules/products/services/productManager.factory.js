/*
 *    Product Manager
 */
function productManager(_, $q, api) {

    return {
        createCategory: createCategory,
        deleteCategory: deleteCategory,
        updateCategory: updateCategory,
        createProduct: createProduct,
        deleteProduct: deleteProduct,
        updateProduct: updateProduct,
        getProducts: getProducts
    };

    /*
     *    Gets Business Information
     */
    function getProducts(businessId) {
        return api.get('/product/business/' + businessId, null, true);
    }

    function createCategory(name) {
        return api.post('/product/category', null, true, {
            "name": name
        }).then(function(response) {
            return response.id;
        });
    }

    function updateCategory(id, name) {
        return api.put('/product/category', null, true, {
            "id": id,
            "name": name
        });
    }

    function deleteCategory(category) {
        return api.del('/product/category/' + category.id, null, true);
    }

    function createProduct(product) {
        return api.post('/product', null, true, product)
        .then(function(response) {
            return response.id;
        });
    }

    function updateProduct(product) {
        return api.put('/product', null, true, product);
    }

    function deleteProduct(product) {
        if (_.isNil(product.id)) {
            return $q.resolve(true);
        } else {
            return api.del('/product/' + product.id, null, true);
        }
    }
}

angular
    .module('FreshEarth')
    .factory('productManager', productManager);
