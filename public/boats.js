var firebase = new Firebase('https://sail.firebaseio.com/');
var uid = null;
var me = null;
var connectionEstablished = false;

$(function(){
  $('#boat .controllable').change(function(){
    changes = {}
    changes[$(this).attr('id')] = $(this).val();
    me.update(changes);
  });
});

firebase.authAnonymously(function(error, auth){
  if (error) {
    alert('Authentication failed: ' + error);
  } else {
    uid = auth.uid;
    me = firebase.child('boats').child(uid);
    console.log('Authenticated as ', uid);
    $('body').removeClass('finding-server').addClass('connecting');
    imStillHere();
    me.on('value', function(data){
      boat = data.val();
      if(!connectionEstablished && boat.x){
        $('body').removeClass('connecting').addClass('connected');
        connectionEstablished = true;
      }
      $('#boat #x').val(boat.x);
      $('#boat #y').val(boat.y);
      $('#boat #angle').val(boat.angle);
      $('#boat #speed').val(boat.speed);
    });
  }
});

// Ping the server to let it know I'm still here
function imStillHere(){
  me.child('lastSeenAt').set(Firebase.ServerValue.TIMESTAMP);
  setTimeout(imStillHere, 5000);
}