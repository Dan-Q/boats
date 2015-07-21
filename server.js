var Firebase = require('firebase');
var firebase = new Firebase('https://sail.firebaseio.com/');
var lastTick = new Date();
var localBoats = null;

var playWidth = 1920;
var playHeight = 1080;

// clear all existing boats to begin with
firebase.child('boats').remove();

//firebase.child('boats').on('child_added', function(child) {
//  console.log(child.key() + ' added');
//});
//firebase.child('boats').on('child_removed', function(child) {
//  console.log(child.key() + ' removed');
//});
firebase.child('boats').on('value', function(boats) {
  localBoats = boats.val();
  console.log(boats.val());
});

function tick(){
  //console.log('tick: ');
  if(!localBoats) {
    //console.log('  no localBoats');
  } else {
    // advance the clock
    var timeSinceLastTick = new Date() - lastTick;
    lastTick = new Date();
    // check for any newly-spawned boats that need starting data
    Object.keys(localBoats).forEach(function(localBoatKey){
      localBoat = localBoats[localBoatKey];
      if(!localBoat.x){
        console.log('spawning ', localBoatKey);
        // spawning boat
        firebase.child('boats/'+localBoatKey).update({
          x: playWidth / 2,
          y: playHeight / 2,
          angle: Math.random() * 360,
          speed: 0,
          targetAngle: 0,
          targetSpeed: 0,
          anchor: 0,
          targetAnchor: 0
        });
      }
    });
    // move the boats
  }
  setTimeout(tick, 1000);
}
tick();