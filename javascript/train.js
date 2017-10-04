
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAHGfuKdjUKhcVbCp1Gz9tiI1FrcHpVeBw",
    authDomain: "train-schedule-f2141.firebaseapp.com",
    databaseURL: "https://train-schedule-f2141.firebaseio.com",
    projectId: "train-schedule-f2141",
    storageBucket: "train-schedule-f2141.appspot.com",
    messagingSenderId: "664133355348"
  };
  firebase.initializeApp(config);

  //Declaring a variable that will hold the firebase database
  var database = firebase.database(); 

  //Creating initial values in variables. Might not use all of them
  var trainName = '';
  var destination = '';
  var frequency = '';
  var firstTrainTime = '';
  var minutesAway = '';
  var nextArrival = ''; 
  var convertOne = '';
  var timeNow = '';
  var differTime = '';
  var timeRemain = '';
  var nextTrain = '';
  var nextStop = '';
  var converTime = '';

  $("#add-input").on("click", function() {
  	//Getting the inputs from the user
    trainName = $("#train-input").val().trim();
  	destination = $("#dest-input").val().trim();
  	firstTrainTime = moment($('#time-input').val().trim(), "HH:mm").subtract(1, "years");
  	frequency = $("#freq-input").val().trim();
      
      /*convertOne = moment(firstTrainTime, "hh:mm").subtrac(10, "years");
      console.log(convertOne);
      
      timeNow = moment();
      console.log("Time Now: " + moment(timeNow).format("hh:mm"));
      
      differTime = moment().diff(moment(convertOne), "minutes");
      console.log("Time Difference: " + differTime);
      
      timeRemain = differTime % frequency;
      console.log(timeRemain); 
      
      nextTrain = frequency - timeRemain;
      console.log("Next Train Arrives in : " + nextTrain + " mins");
      
      nextStop = moment().add(nextTrain, "minutes");
      converTime = moment(nextStop).format("hh:mm"); */

      //Pushing the data onto firebase
      database.ref().push({
        trainLine: trainName,
        destination: destination,
        firstTime: firstTrainTime,
        timeFrame: frequency,
      });

      //Clearing the input boxes after hitting submit button
      $("#train-input").val(" ");
      $("#dest-input").val(" ");
      $("#time-input").val(" ");
      $("#freq-input").val(" ");

      return false;
  });

  database.ref().on("child_added", function(childSnapshot){
    //Assigning variables to childSnapshot
    var trainLine = childSnapshot.val().trainLine;
    var direction = childSnapshot.val().destination; 
    var trainStart = childSnapshot.val().firstTime;
    var timeFrequency = childSnapshot.val().timeFrame; 
    
    differTime = moment().diff(moment(trainStart), "minutes");

    timeRemain = differTime % timeFrequency

    nextTrain = timeFrequency - timeRemain; 

    nextStop = moment().add(nextTrain, "minutes").format("hh:mm");

    console.log(trainLine);
    console.log(direction);
    console.log(timeFrequency);
    console.log(nextStop);
    console.log(nextTrain);

    //Append variables onto train schedule
    $("#trainData").append("<tr><td>" + trainLine + "</td><td>" + direction + "</td><td>" + timeFrequency + "</td><td>" + nextStop + "</td><td>" + nextTrain + "</td></tr>");
   
    });





