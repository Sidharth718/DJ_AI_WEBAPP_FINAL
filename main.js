
song = "";
lwx = "";
lwy = "";
rwx = "";
rwy = "";
scorelw = 0;
scorerw = 0;


function preload(){
song = loadSound("music.mp3")
}

function setup(){
canvas = createCanvas(600,500);
canvas.position(420, 200);
video = createCapture(VIDEO);
video.hide();
posenet = ml5.poseNet(video, modelLoaded)
posenet.on('pose', gotPoses);

}

function modelLoaded(){
    console.log('Posenet is loaded!');
}

function draw(){
image(video, 0, 0, 600, 500);
fill("blue");
stroke("blue");
if(scorelw > 0.1){
    circle(lwx, lwy, 20);
    lwy_value = Number(lwy);
    dec_value = floor(lwy_value);
    volume = dec_value / 500;
    document.getElementById("volume_value").innerHTML = volume;
    song.setVolume(volume);
}
if(scorerw > 0.1){
fill("green");
stroke("green");
circle(rwx, rwy, 20)
if(rwy > 0 && rwy <= 100){
song.rate(0.5);
document.getElementById("speed_value").innerHTML = "The speed is 0.5x";
}
else if(rwy > 100 && rwy <=200){
song.rate(1.0);
document.getElementById("speed_value").innerHTML = "The speed is 1.0x";
}
else if(rwy > 200 && rwy <=300){
song.rate(1.5);
document.getElementById("speed_value").innerHTML = "The speed is 1.5x";
}
else if(rwy > 300 && rwy <=400){
song.rate(2.0);
document.getElementById("speed_value").innerHTML = "The speed is 2.0x";
}
else if(rwy > 400 && rwy <=500){
song.rate(2.5);
document.getElementById("speed_value").innerHTML = "The speed is 2.5x";
}
}
}

function Music_button(){
song.play();
song.setVolume(1.0)
song.rate(1.0)
}

function gotPoses(results){

    if(results.length > 0){
    console.log(results);
    lwx = results[0].pose.leftWrist.x;
    lwy = results[0].pose.leftWrist.y;
    console.log("Left Wrist X = " + lwx + " and Left Wrist Y = " + lwy);
    scorelw = results[0].pose.keypoints[9].score;
    rwx = results[0].pose.rightWrist.x
    rwy = results[0].pose.rightWrist.y
    console.log("Right Wrist X = " + rwx + " and Right Wrist Y = " + rwy);
    scorerw = results[0].pose.keypoints[10].score;

    }
}