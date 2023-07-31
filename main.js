song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
Song1Status= "";
Song2Status = "";

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}


function modelLoaded() {
    console.log('PoseNet is Initialized');
}

function gotPoses(results) {
    if(results.length > 0) 
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);
        
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY); 
    }

}

function draw() {
    image(video, 0, 0, 600, 500);

    SongStatus = song1.isPlaying(true);
    fill("#FF0000");
    stroke("#FF0000");

    
    circle(rightWristX, rightWristY, 20);
    song1.stop();
    if(Song2Status == false) {
        song2.isPlaying(true);
        document.getElementById("empty").innerHTML = "Other Song"

    }

    circle(leftWristX, leftWristY, 20);
    song2.stop();
    if(Song1Status == false) {
        song1.isPlaying(true);
        document.getElementById("empty").innerHTML = "Harry Potter Sound Track"

    }
}