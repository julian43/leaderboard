import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import { PlayerList } from '../api/player.js';
import './body.html'


pl = PlayerList
console.log('Hello, Again?!');

//Localize helpers and events to leaderboard
//as opposed to the whole body
Template.leaderboard.helpers({
  player(){
    //return PlayerList.find({})
    return PlayerList.find({}, {sort: {score: -1, name:1}})
  },
  selectedClass(){
    var playerid = this._id;
    var selectedPlayer = Session.get('selectedPlayer');
    if(playerid == selectedPlayer){
        return "selected";
    }

  },

})

Template.leaderboard.events({
  'click .player'(event, instance){
    //console.log('you clicked on an item.');
    var playerid = this._id;
    Session.set('selectedPlayer',playerid);
    //var selectedPlayer = Session.get('selectedPlayer')
    //console.log(selectedPlayer);
  }
})

Template.body.helpers({
  selectedPlayer(){
    var selectedPlayer = Session.get('selectedPlayer');
    return PlayerList.findOne({_id:selectedPlayer});
  }
})

Template.body.events({
  'click .increment'(event, instance){
    console.log("in increment")
    var selectedPlayer = Session.get('selectedPlayer');
    //Creful with updates as the default operation is to replace the
    //entire document eith the new info. The value of the id is unchanged.
    //PlayerList.update({_id:selectedPlayer}, {score:5})
    PlayerList.update({_id:selectedPlayer},{$inc: {score:5}})
  },
  'click .decrement'(event, instance){
    console.log("in decrement")
    var selectedPlayer = Session.get('selectedPlayer');
    //console.log(`Decrementing ${selectedPlayer}`)
    PlayerList.update({_id:selectedPlayer},{$inc: {score: -5}})
  }
})
