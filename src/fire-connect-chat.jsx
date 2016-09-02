var firebase = require("firebase/app");
               require("firebase/auth");
               require("firebase/database");

module.exports = (function(){

   // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDMuxSk0zYQqx2Clf_9dHqXiASFDXVxcEo",
    authDomain: "chatapp-6ee89.firebaseapp.com",
    databaseURL: "https://chatapp-6ee89.firebaseio.com",
    storageBucket: "",
  };
  return firebase.initializeApp(config);

}())

