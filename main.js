Webcam.set({

    width:350,
    height:300,
    image_format:'png',
    png_quality:90
    
});
camera=document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">';
    });
    
}

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/b3c2xzxa3/model.json',modelLoaded);

function modelLoaded(){

console.log("modelLoaded");


}

function speak(){
    var synth=window.speechSynthesis;

    speak_data_1="First Prediction Is"+prediction_1;
    speak_data_2="Second Prediction Is"+prediction_2;
    var utterthis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterthis);
}
function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img,gotResult);

}
function gotResult(error,results){

    if(error){console.log(error);}
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();
        if(results[0].label=="Thumbs Up"){
            document.getElementById("update_emoji").innerHTML='&#128077;';
        }
        if(results[0].label=="Amazing"){
            document.getElementById("update_emoji").innerHTML='&#128076;';
        }
        if(results[0].label=="Thumbs Down"){
            document.getElementById("update_emoji").innerHTML='&#128078;';
        }
        if(results[0].label=="Writing"){
            document.getElementById("update_emoji").innerHTML='&#9997;';
        }

        if(results[1].label=="Thumbs Up"){
            document.getElementById("update_emoji2").innerHTML='&#128077;';
        }
        if(results[1].label=="Amazing"){
            document.getElementById("update_emoji2").innerHTML='&#128076;';
        }
        if(results[1].label=="Thumbs Down"){
            document.getElementById("update_emoji2").innerHTML='&#128078;';
        }
        if(results[1].label=="Writing"){
            document.getElementById("update_emoji2").innerHTML='&#9997;';
        }


       
    }
}