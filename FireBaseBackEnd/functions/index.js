const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.testAPI = functions.https.onRequest((request, response) => {
    string_result = "Testing FireBase API Call \n"
        + "Call from IP: " + request.ip 
        + "\n request_baseUrl: " + request.baseUrl
        + "\n request_host: " + request.host
        + "\n request_hostname: " + request.hostname
        + "\n request_httpVersion: " + request.httpVersion
        + "\n request_protocol: " + request.protocol
        + "\n request_method: " + request.method;
        
    response.send(string_result);
    console.log("API call to /testAPI/ \n" + string_result);
});

// exports.posts = functions.https.onRequest((request, response) => {
//     response.send("Post num: " + request);
// });

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.getAllPosts = functions.https.onRequest((req, res) => {
    var postsRef = admin.database().ref('post');
    postsRef.once('value').then(function(snap) {
      res.status(200).json( snap.val()).end();
    });
});

exports.getAllPlaces = functions.https.onRequest((req, res) => {
    
    var userID = req.url.substring(req.url.lastIndexOf('/')+1);
    var postsRef = admin.database().ref('/places/{userID}');
    
    console.log("url " + url);
    postsRef.once('value').then(function(snap) {
        var places = snap.val();
       // console.log("places" + req.params.userID);
      res.status(200).json( places).end();
    });
});

//function as the router
//if the request contains a parameter(postID) call function getpost
exports.post = functions.https.onRequest((req, res) => {
    
    //Param 1: PID => Post ID
    var STATUS_404 = 404;
    var ERROR_404 = "Missing Resources";

    var MESSAGE = "";
    var STATUS = 0;

    if(req.method == "GET"){
        //Missing GET parameter
        if(pid === null){    
            STATUS = STATUS_404;
            MESSAGE = ERROR_404;

        } else if( isPID(pid) ){
            GET_post_ID(pid);
        }
    } else if(req.method == "PUT"){
        //similar to post
    } else if(req.method == "POST"){
        //Missing GET parameter
        if(pid === null){    
            STATUS = STATUS_404;
            MESSAGE = ERROR_404;

        } else if( isPID(pid) ){
        
        }
    } else if(req.method == "DELETE"){
        
    } else{
        STATUS = "505";
        MESSAGE = "Invalid request method";
        MESSAGE.concat("Request Method: " + req.method)
    }

    res.status(STATUS);
    res.send(MESSAGE);
});

function isPID(id){
    return typeof(id) === 'number';
}

function GET_post_ID(id){
    var result = "";

    for (i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }

    return JSON.stringify(result);
}

function PUT_post(id){
    var result = "";

    return JSON.stringify(result);
}

function POST_post(id){
    var result = "";

    return JSON.stringify(result);
}

//return boolean if it was successfult at removing the post from the DB
//'removing' -> 'permanent delete' or 'unaccessible'
function DELETE_post(id){

    if(sucessful_remove){
        return true;
    }else{
        //reattempt
        return false;
    }
}

//DB call
function DB_DELETE_post(id){
    if(sucessful_remove){
        return true;
    }else{
        //reattempt
        return false;
    }
}