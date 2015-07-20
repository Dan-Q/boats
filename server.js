var Firebase = require('firebase');
var firebase = new Firebase('https://sail.firebaseio.com/');
var lastTick = new Date();

firebase.child('boats').on('child_added', function(child) {
  console.log(child.key() + ' added');
});
firebase.child('boats').on('child_removed', function(child) {
  console.log(child.key() + ' removed');
});
firebase.child('boats').on('child_changed', function(child) {
  console.log(child.key() + ' changed:');
  console.log(child.val());
});

function tick(){
  // advance the clock
  var timeSinceLastTick = new Date() - lastTick;
  lastTick = new Date();
  // move the boats
  
  setTimeout(tick, 1);
}
tick();