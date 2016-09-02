var firebase = require("firebase/app");
               require("firebase/auth");
               require("firebase/database");

module.exports = (function(){

  // Initialize Firebase

var config = {
    apiKey: "AIzaSyCw_tIFTHmvqBxV_ppQBu3J-jN9nBB6dmc",
    authDomain: "fir-b8b02.firebaseapp.com",
    databaseURL: "https://fir-b8b02.firebaseio.com",
    storageBucket: "fir-b8b02.appspot.com",
  };

  return firebase.initializeApp(config);

}())
