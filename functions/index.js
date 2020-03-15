const functions = require('firebase-functions');
const admin = require("firebase-admin");

admin.initializeApp();


var UpdateUserData = functions.database.ref('/users/{userID}')
    .onCreate((snapshot, context) => {
        // Grab the current value of what was written to the Realtime Database.
        const data = snapshot.val();
        console.log('Setinglimit for', context.params.userID);

        // You must return a Promise when performing asynchronous tasks inside a Functions such as
        // writing to the Firebase Realtime Database.
        // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
        return snapshot.ref.parent.child(context.params.userID + '/usage').set('0');
    });

exports.UpdateUserData = UpdateUserData;