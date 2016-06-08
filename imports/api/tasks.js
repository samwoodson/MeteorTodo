import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);

    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    let $user = Meteor.users.findOne(this.userId)
    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: $user.username || $user.profile.name,
    });
  },

  'tasks.remove'(taskId) {
    check(taskId, String);

    Tasks.remove(taskId);
  },

  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    Tasks.update(taskId, { $set: { checked: setChecked } });
  },
});