import { Meteor } from 'meteor/meteor';
/*
 * We need to import this module on the server (this creates the MongoDB collection
 * and sets up the plumbing to get the data to the client):
*/
import '../imports/api/player.js';

Meteor.startup(() => {
  // code to run on server at startup
  console.log('server Hello')
});

//console.log('server running code')
