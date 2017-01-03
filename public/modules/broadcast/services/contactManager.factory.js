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
            var data = {
                contacts: {},
                groups: response.groups
            };
            _.forEach(data.groups, function(group) {
                data.contacts[group.id] = [];
            });
            _.forEach(response.members, function(member) {
                data.contacts[member.group].push(_.find(response.contacts, function(contact) {
                    return contact.id == member.contactMember;
                }));
                data.contacts[member.group].push(_.find(response.businesses, function(business) {
                    return business.id == member.businessMember;
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
