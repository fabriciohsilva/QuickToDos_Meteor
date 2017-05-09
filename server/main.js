import { Meteor } from 'meteor/meteor';

Meteor.publish('todos', function todoPublication(){
    return Todos.find({
      $or: [
        {private: {$ne: true}}
      , {owner: this.userId}
      ]
    });
});

Meteor.methods({

  'todos.insert'(text, time){

    if(!this.userId){
      throw new Meteor.Error('not-authorized');      
    }//end if(!this.userId())

     Todos.insert({
        text
      , time
      , owner: Meteor.userId()
      , username: Meteor.user().username
    });//end Todos.insert

  },//end 'todos.insert'(text, time)
  'todos.setChecked'(id, setChecked){

    Todos.update(id, {
        $set: {checked: setChecked}
      });

  },//end 'todos.setChecked'(id, setChecked)
  'todos.remove'(id){
    if (todo.owner !== this.userId){
      throw new Meteor.Error('Unauthorized');
    }
    
    Todos.remove(id);
  },//end 'todos.remove'(id)
  'todos.setPrivate'(id, setToPrivate){

    const todo = Todos.findOne(id);

    if (todo.owner !== this.userId){
      throw new Meteor.Error('Unauthorized');
    }

    Todos.update(id, {$set: {private: setToPrivate}});

  }//end 'todos.setPrivate'(id, setToPrivate)

});//end Meteor.methods