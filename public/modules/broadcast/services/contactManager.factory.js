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
            var data = {
                contacts: {},
                groups: response.groups
            };
            data.groups = _.sortBy(data.groups, ['name']);
            _.forEach(data.groups, function(group) {
                data.contacts[group.id] = [];
                if(!group.custom) {
                    data.defaultGroup = group;
                }
            });
            _.forEach(response.members, function(member) {
                if(!_.isNil(member.contactMember)) {
                    data.contacts[member.group].push(_.find(response.contacts, function(contact) {
                        return contact.id == member.contactMember;
                    }));
                } else {
                    data.contacts[member.group].push(_.find(response.businesses, function(business) {
                        return business.id == member.businessMember;
                    }));
                }
            });
            return data;
        });
    }
    
    function createGroup(data, group) {
        return api.post('/contact/group', null, true, group)
        .then(function(response) {            
            group.id = response.id;
            group.custom = 1;
            data.groups.push(group);
            data.groups = _.sortBy(data.groups, ['name']);
            return group;
        });
    }
    
    function deleteGroup(data, group) {
        return api.del('/contact/group/' + group.id, null, true)
        .then(function() {
            var index = _.findIndex(data.groups, group);
            _.remove(data.groups, group);
            return index;
        });
    }

    function createContact(data, contact) {
        return api.post('/contact', null, true, contact)
        .then(function(response) {
            data.contacts[data.defaultGroup.id].push({
                id: response.id,
                name: contact.name,
                email: contact.email
            });
            data.contacts[data.defaultGroup.id] = _.sortBy(data.contacts[data.defaultGroup.id], ['name']);
        });
    }
    
    function deleteContact(data, contact) {
        return api.del('/contact/' + contact.id, null, true)
        .then(function() {
            var index 
        });
    }
}

angular
    .module('FreshEarth')
    .factory('contactManager', contactManager);
