/*
 *    Product Manager
 */
function productManager(_, $q, $http, userIdentification) {

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
        return userIdentification.getToken().then(function(response) {
            return $http.get(APIURL + '/product/business/' + businessId, {
                headers: {
                    Authorization: response.token
                }
            });
        }).then(function(response) {
            return response.data;
        }).catch(function(error) {
            throw error;
        });
    }

    function createCategory(name) {
        return userIdentification.getToken()
            .then(function(response) {
                return $http.post(APIURL + '/product/category', {
                    v: {
                        "name": name
                    }
                }, {
                    headers: {
                        Authorization: response.token
                    }
                });
            }).then(function(response) {
                console.log(response);
                return response.data.id;
            }).catch(function(error) {
                throw error;
            });
    }

    function updateCategory(id, name) {
        return userIdentification.getToken()
            .then(function(response) {
                return $http.put(APIURL + '/product/category', {
                    v: {
                        "id": id,
                        "name": name
                    }
                }, {
                    headers: {
                        Authorization: response.token
                    }
                });
            })
            .catch(function(error) {
                throw error;
            });
    }

    function deleteCategory(category) {
        return userIdentification.getToken()
            .then(function(response) {
                return $http.delete(APIURL + '/product/category/' + category.id, {
                    headers: {
                        Authorization: response.token
                    }
                });
            })
            .catch(function(error) {
                throw error;
            });
    }

    function createProduct(product) {
        return userIdentification.getToken()
            .then(function(response) {
                return $http.post(APIURL + '/product', {
                    v: product
                }, {
                    headers: {
                        Authorization: response.token
                    }
                });
            })
            .then(function(response) {
                return response.data.id;
            })
            .catch(function(error) {
                throw error;
            });
    }

    function updateProduct(product) {
        return userIdentification.getToken()
            .then(function(response) {
                return $http.put(APIURL + '/product', {
                    v: product
                }, {
                    headers: {
                        Authorization: response.token
                    }
                });
            })
            .then(function() {
                return product;
            })
            .catch(function(error) {
                throw error;
            });
    }

    function deleteProduct(product) {
        if (_.isNil(product.id)) {
            return $q.resolve(true);
        } else {
            return userIdentification.getToken()
                .then(function(response) {
                    return $http.delete(APIURL + '/product/' + product.id, {
                        headers: {
                            Authorization: response.token
                        }
                    });
                })
                .catch(function(error) {
                    throw error;
                });
        }
    }
}

angular
    .module('FreshEarth')
    .factory('productManager', productManager);
