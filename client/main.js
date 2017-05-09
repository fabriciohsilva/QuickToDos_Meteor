import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'

});//end Accounts.ui.config

Template.main.onCreated( function mainOnCreated(){

  Meteor.subscribe('todos');

});//end Template.main.onCreated( function mainOnCreated()

Template.main.helpers({
  
  title(){
    return 'QuickTodos';
  },
  todos(){
    const todos = Todos.find();
    return todos;
  }

});

Template.main.events({ 
  'submit .add-todo'(event){
    event.preventDefault();

    const text = event.target.text.value;
    const time = event.target.time.value;

    Meteor.call('todos.insert', text, time);

    event.target.text.value = '';
    event.target.time.value = '';

  }//end 'submit .add-todo'(event)
});//end Template.main.events

Template.todo.events({
  
  'click .toogle-checked'(event){

    Meteor.call('todos.setChecked', this._id, !this.checked);

  },//end 'click .toogle-checked'(event)
  'click .delete'(event){

      Meteor.call('todos.remove', this._id);
    
  },//end 'click .delete'(event)
  'click .toogle-private'(){
    Meteor.call('todos.setPrivate', this._id, !this.private);
  }

});//end Template.todo.events

Template.todo.helpers({

  isOwner(){
    return this.owner === Meteor.userId();
  }//end isOwner()

});//end Template.todo.helpers