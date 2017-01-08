/*
 *    Contact Manager
 */
function contactManager(_, $q, api, userIdentification) {

    return {
        createContact: createContact,
        addContactToGroup: addContactToGroup,
		deleteContact: deleteContact,
        createGroup: createGroup,
        deleteGroup: deleteGroup,
		updateGroup: updateGroup,
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
            console.log(response);
            _.forEach(data.groups, function(group) {
                data.contacts[group.id] = [];
                if(!group.custom) {
                    data.defaultGroup = group;
                }
            });
            _.forEach(response.members, function(member) {
                if(!_.isNil(member.contactMember)) {
                    data.contacts[member.group].push(_.find(response.contacts, function(contact) {
                        if(contact.id == member.contactMember) {
                            console.log(contact);
                            console.log(member);
                            return true;
                        }
                        return false;
                    }));
                } else {
                    data.contacts[member.group].push(_.find(response.businesses, function(business) {
                        return business.id == member.businessMember;
                    }));
                }
            });
            console.log(data);
            return data;
        });
    }
    
    function createGroup(data, group) {
        return api.post('/contact/group', null, true, group)
        .then(function(response) {            
            group.id = response.id;
            group.custom = 1;
            data.groups.push(group);
            return group;
        });
    }
	
	function updateGroup(data, group) {
		return api.put('/contact/group', null, true, group)
		.then(function() {
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
        });
    }
    
    function addContactToGroup(data, contact, group) {
        return api.post('/contact/member', null, true, {
            contactMember: contact.id,
            group: group.id
        })
        .then(function() {
            data.contacts[group.id].push(contact);
        });
    }
    
    function deleteContact(data, group, contact) {
        return api.del('/contact/member?contactMember=' + contact.id + '&group=' + group.id, null, true)
        .then(function() {
			if(group.custom) {
				_.remove(data.contacts[group.id], contact);
			} else {
				_.forEach(data.contacts, function(members) {
					_.remove(members, contact);
				});
			}
        });
    }
}

angular
    .module('FreshEarth')
    .factory('contactManager', contactManager);