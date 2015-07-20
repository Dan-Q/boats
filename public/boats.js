var firebase = new Firebase('https://sail.firebaseio.com/');
var uid = null;
var me = null;
firebase.authAnonymously(function(error, auth){
  if (error) {
    alert('Authentication failed: ' + error);
  } else {
    uid = auth.uid;
    me = firebase.child('boats').child(uid);
    console.log('Authenticated as ', uid);
    imStillHere();
  }
});

// Ping the server to let it know I'm still here
function imStillHere(){
  me.child('lastSeenAt').set(Firebase.ServerValue.TIMESTAMP);
  setTimeout(imStillHere, 5000);
}