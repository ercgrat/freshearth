/*
 *  Controller Setup
 */

function ContactsController(_, $timeout, $mdDialog, contactManager) {
    var ctrl = this;
    
    function focusEditor() {
        ctrl.editing = true;
        $timeout(function() {   
            var editor = document.getElementById("groupNameEditor");
            editor.focus();
            editor.select();
        });
    }
    
    ctrl.$onInit = function() {
        ctrl.defaultGroup = ctrl.contactData.defaultGroup;
        ctrl.lastSelectedGroup = ctrl.defaultGroup;
        ctrl.selectedGroup = ctrl.defaultGroup;
        ctrl.newContact = {
            name: "",
            email: ""
        };
		
        ctrl.confirmGroupDelete = $mdDialog.confirm()
		.title('Delete Contact Group')
		.textContent('Are you sure you want to delete this contact group? This action cannot be undone.')
		.ariaLabel('Delete Contact Group')
		.theme('deep-orange')
		.ok('Delete')
		.cancel('Cancel');
		
		ctrl.confirmContactDelete = $mdDialog.confirm()
		.title('Delete Contact')
		.textContent('Are you sure you want to delete this contact? This action cannot be undone.')
		.ariaLabel('Delete Contact')
		.theme('deep-orange')
		.ok('Delete')
		.cancel('Cancel');
        
        angular.element(document.getElementById("groupNameEditor"))
        .bind("keypress", function(event) {
            if(event.which === 13) {
                console.log("enter pressed");
                document.getElementById("groupNameEditor").blur();
                event.preventDefault();
            }
            return false;
        });
    };
    
    ctrl.enableEditing = function() {
        focusEditor();
    };
        
    ctrl.createGroup = function() {
        ctrl.lastSelectedGroup = ctrl.selectedGroup;
        var newGroup = { name: "" };
        ctrl.selectedGroup = newGroup;
        focusEditor();
    };
    
    ctrl.deleteGroup = function() {
        return contactManager.deleteGroup(ctrl.contactData, ctrl.selectedGroup)
        .then(function(index) {
            if(index == ctrl.contactData.groups.length) {
                index--;
            }
            ctrl.selectedGroup = ctrl.contactData.groups[index];            
        });
    };
    
    ctrl.saveGroupName = function() {
        $timeout(function() {
            if(ctrl.selectedGroup.name == "") {
                ctrl.editing = false;
                ctrl.selectedGroup = ctrl.lastSelectedGroup;
                return;
            } else if(ctrl.groupForm.$valid) {
                if(!_.isNil(ctrl.selectedGroup.id)) {
                    return contactManager.updateGroup(ctrl.contactData, ctrl.selectedGroup)
                    .then(function(group) {
                        ctrl.editing = false;
						console.log(group);
                        ctrl.selectedGroup = group;
                    });
                } else {
                    return contactManager.createGroup(ctrl.contactData, ctrl.selectedGroup)
                    .then(function(group) {
                        ctrl.editing = false;
                        ctrl.selectedGroup = group;
                    });
                }
            }
        });
    };
    
    ctrl.saveContact = function() {
        var formElement = angular.element(ctrl.contactForm.$$element[0]);
        var nameInput = formElement.find('input')[0];
        var emailInput = formElement.find('input')[1];
        $timeout(function() {
            if(ctrl.contactForm.$valid) {
                return contactManager.createContact(ctrl.contactData, ctrl.newContact)
                .then(function(contactId) {
                    ctrl.contactForm.name.$setPristine(true);
                    ctrl.contactForm.name.$setValidity();
                    ctrl.contactForm.email.$setPristine(true);
                    ctrl.contactForm.email.$setValidity();
                    ctrl.newContact.name = "";
                    ctrl.newContact.email = "";
                    nameInput.blur();
                    emailInput.blur();
                });
            }
        });
    };
    
    ctrl.addContact = function() {
        contactManager.addContactToGroup(ctrl.contactData, ctrl.selectedContact, ctrl.selectedGroup)
        .then(function() {
            ctrl.selectedContact = null;
        });
    };
    
    ctrl.deleteContact = function(contact) {
        if(ctrl.selectedGroup.custom) {
            contactManager.deleteContact(ctrl.contactData, ctrl.selectedGroup, contact);
		} else {
			$mdDialog.show(ctrl.confirmContactDelete).then(function() {
				contactManager.deleteContact(ctrl.contactData, ctrl.selectedGroup, contact);
			}, function() {
				// Cancelled
			});
		}
    };
    
    ctrl.selectableContacts = function(contact) {
        return !_.find(ctrl.contactData.contacts[ctrl.selectedGroup.id], contact);
    };
}

/*
 *    Component Setup
 */

angular.module('FreshEarth').component('contacts', {
    templateUrl: 'modules/broadcast/templates/contacts.html',
    controller: ContactsController,
    bindings: {
        userIdentification: '<',
        contactManager: '<',
        contactData: '<'
    }
});