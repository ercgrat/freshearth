/*
 *    Contact Manager
 */
function contactManager(_, $q, api, userIdentification) {

    return {
        createContact: createContact,
        getContactData: getContactData
    };
    
    function getContactData(businessId) {
        return userIdentification.getBusiness()
        .then(function(business) {
            return api.get('/contact/business/' + business.businessId, null, true);
        })
        .then(function(response) {
            console.log(response);
            var data = {};
            data.groups = response.groups;
            _.forEach(response.memberships, function(membership) {
                data.contacts[membership.group] = data.contacts[membership.group] || [];
                data.contacts[membership.group].push(_.find(response.contacts, function(contact) {
                    return contact.id == membership.contact;
                }));
            });
            return data;
        });
    }

    function createContact(name, email) {
        return api.post('/contact', null, true, {
            "name": name,
            "email": email
        });
    }
}

angular
    .module('FreshEarth')
    .factory('contactManager', contactManager);
