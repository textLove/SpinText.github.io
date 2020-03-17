const functions = require('firebase-functions');
const firebase = require("firebase-admin");
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();

const MAX_COUNT = 500;

app.use(cors({ origin: true }));
app.use(bodyParser.json())

var firebaseConfig = {
    apiKey: "AIzaSyCvaTkp40OJu-1d9YPEPw6OPOtHIOUbBSE",
    authDomain: "spintext-a7452.firebaseapp.com",
    databaseURL: "https://spintext-a7452.firebaseio.com",
    projectId: "spintext-a7452",
    storageBucket: "spintext-a7452.appspot.com",
    messagingSenderId: "730955301627",
    appId: "1:730955301627:web:308f3f8898dee082f9a65e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

app.post('/processText', (req, res) => {
    const { uid, DATA } = req.body;

    const API_URL = 'http://35.193.179.215:80/spintext';
    var API_BODY = DATA;
    if (uid && API_BODY) {

        // firebase.database().ref(`/users/${uid}`).once('value').then(snap => {
        var count = 0 //snap.val().usage;
        console.log(API_URL, API_BODY);
        cont = parseInt(count);
        if (count < MAX_COUNT) {
            // UPDATE THE API URL HERE
            console.log(API_URL, API_BODY);
            axios.post(API_URL, API_BODY)
                .then((apiResponse) => {
                    const apiData = apiResponse.data
                    // firebase.database().ref(`/users/${uid}`)
                    //     .update({ usage: count + 1 })
                    //     .then(() => {

                    //AFTER UPDATING FIREBASE COUNT
                    // PROCESS RESPOSNSE AND SENDIT
                    //RESPOSNE : {data:[...list of image URL....]}



                    res.json({
                        data: apiData
                    })
                    // });
                }).catch(function (error) {
                    console.log("#ERROR",error.data);
                }); I

        } else {
            res.status(400).send('Max limit of the day reached');
        }
        // })
    } else {
        res.status(400).send();
    }
})

exports.api = functions.https.onRequest(app);

exports.UpdateUserData = functions.database.ref('/users/{userID}')
    .onCreate((snapshot, context) => {
        // Grab the current value of what was written to the Realtime Database.
        const data = snapshot.val();
        console.log('Setinglimit for', context.params.userID);

        // You must return a Promise when performing asynchronous tasks inside a Functions such as
        // writing to the Firebase Realtime Database.
        // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
        return snapshot.ref.parent.child(context.params.userID + '/usage').set(0);
    });