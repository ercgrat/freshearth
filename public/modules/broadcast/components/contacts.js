/*
 *  Controller Setup
 */

function ContactsController(_, contactManager, $timeout) {
    var ctrl = this;
    
    ctrl.$onInit = function() {
        ctrl.defaultGroup = _.find(ctrl.contactData.groups, function(group) {
            return group.custom == 0;
        });
        ctrl.lastSelectedGroup = ctrl.defaultGroup;
        ctrl.selectedGroup = ctrl.defaultGroup;
        
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
    
    ctrl.createGroup = function() {
        ctrl.lastSelectedGroup = ctrl.selectedGroup;
        var newGroup = { name: "" };
        ctrl.selectedGroup = newGroup;
        ctrl.editing = true;
        $timeout(function() {
            var editor = document.getElementById("groupNameEditor");
            editor.focus();
            editor.select();
        });
    };
    
    ctrl.deleteGroup = function() {
        return contactManager.deleteGroup(ctrl.selectedGroup)
        .then(function() {
            var index = _.findIndex(ctrl.contactData.groups, ctrl.selectedGroup);
            index = (index == ctrl.contactData.groups.length - 1) ? index - 1 : index;
            _.remove(ctrl.contactData.groups, ctrl.selectedGroup);
            ctrl.selectedGroup = ctrl.contactData.groups[index];
        });
    };
    
    ctrl.saveGroupName = function() {
        $timeout(function() {
            if(ctrl.selectedGroup.name == "") {
                ctrl.editing = false;
                ctrl.selectedGroup = ctrl.lastSelectedGroup;
                return;
            } else {
                return contactManager.createGroup(ctrl.selectedGroup)
                .then(function(groupId) {
                    ctrl.editing = false;
                    ctrl.selectedGroup.id = groupId;
                    ctrl.selectedGroup.custom = 1;
                    ctrl.contactData.groups.push(ctrl.selectedGroup);
                });
            }
        });
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