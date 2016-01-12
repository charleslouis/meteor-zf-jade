// METEOR TRAINING using meteorT-simpleTodos.js


/*****************************************************************
* Connection to Tasks collection meteorDB
*/
Tasks = new Mongo.Collection("tasks");


/*****************************************************************
* This code only runs on the server
*/

if (Meteor.isServer) {

	Meteor.publish("tasks", function () {
		return Tasks.find({
			$or: [
				{ private: {$ne: true} },
				{ owner: this.userId }
			]
		});
	});

}


/*****************************************************************
* This code only runs on the client
*/

if (Meteor.isClient) {

	Meteor.subscribe("tasks");
	
	// BODY template HELPERS
	Template.body.helpers({

		tasks: function () {
			if (Session.get("hideCompleted")) {
				// If hide completed is checked, filter tasks
				return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
			} else {
				// Otherwise, return all of the tasks
				return Tasks.find({}, {sort: {createdAt: -1}});
			}
		},

		hideCompleted: function () {
			return Session.get("hideCompleted");
		},

		incompleteCount: function () {
			return Tasks.find({checked: {$ne: true}}).count();
		}

	});


	// BODY template EVENTS
	Template.body.events({
		// This function is called when the new task form is submitted
		"submit .new-task": function (event) {
			
			// Prevent default browser form submit
			event.preventDefault();

			var text = event.target.text.value;

			// Insert a task in the collection
			Meteor.call("addTask", text);

			// Tasks.insert({
			// 	text: text,
			// 	createdAt: new Date(), // current time
			// 	owner: Meteor.userId(),  // _id of logged in user
		//  username: Meteor.user().username  // username of logged in user
			// });

			// Clear form
			event.target.text.value = "";
		},

		"change .hide-completed input": function (event) {
			Session.set("hideCompleted", event.target.checked);
		}

	});


	// TASK template HELPERS
	Template.task.helpers({
		isOwner: function () {
		  return this.owner === Meteor.userId();
		}
	});

	// TASK template EVENTS
	Template.task.events({
		
		// clic event on checked box
		"click .toggle-checked": function () {
			// Set the checked property to the opposite of its current value
			// Tasks.update(this._id, {
			// 	$set: {checked: ! this.checked}});
				 Meteor.call("setChecked", this._id, ! this.checked);
		},

	"click .toggle-private": function () {
	  Meteor.call("setPrivate", this._id, ! this.private);
		},

		// delete event
		"click .delete": function () {
			// Tasks.remove(this._id);
			Meteor.call("deleteTask", this._id);
		}

	});

	// ACCOUNTS config
	Accounts.ui.config({
		passwordSignupFields: "USERNAME_ONLY"
	});

}


/*****************************************************************
* METEOR Methods
*/

Meteor.methods({

	// INSERT A TASK
	addTask: function (text) {

		// Make sure the user is logged in before inserting a task
		if (! Meteor.userId()) {
		  throw new Meteor.Error("not-authorized");
		}

		Tasks.insert({
			text: text,
			createdAt: new Date(),
			owner: Meteor.userId(),
			username: Meteor.user().username
		});
	},

	// DELETE A TASK
	deleteTask: function (taskId) {

		var task = Tasks.findOne(taskId);
		// If the task is private, make sure only the owner can delete it
		//  if the task is private only the owner can see it!! ==> no test required on owner
		if (task.private && task.owner !== Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}

		Tasks.remove(taskId);
	},

	// CHECK (UPDATE) A TASK
	setChecked: function (taskId, setChecked) {
		var task = Tasks.findOne(taskId);
		// If the task is private, make sure only the owner can check it off
		if (task.private && task.owner !== Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}

		Tasks.update(taskId, { $set: { checked: setChecked} });
	},

	setPrivate: function (taskId, setToPrivate) {
		var task = Tasks.findOne(taskId);

		// Make sure only the task owner can make a task private
		if (task.owner !== Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}

		Tasks.update(taskId, { $set: { private: setToPrivate } });
	}

});
