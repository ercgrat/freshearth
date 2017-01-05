/*
 *    Contact Manager
 */
function contactManager(_, $q, api, userIdentification) {

    return {
        createContact: createContact,
        createGroup: createGroup,
        deleteGroup: deleteGroup,
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
    
    function createGroup(group) {
        return api.post('/contact/group', null, true, group)
        .then(function(response) {
            return response.id;
        });
    }
    
    function deleteGroup(group) {
        return api.del('/contact/group/' + group.id, null, true);
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
