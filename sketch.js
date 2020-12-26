// add your code here
var player1anim,player2anim,player1,player2;
var bgimg;
var database;
var position;
var gameState = 0;
var resetbutton;
var disp_text;
var element1,element2;
player1Score = 0;
player2Score = 0;


function preload(){
    player1anim = loadAnimation("assests/player1a.png","assests/player1b.png","assests/player1a.png");
    player2anim = loadAnimation("assests/player2a.png","assests/player2b.png","assests/player2a.png");
    bgimg = loadImage("assests/Kabaddi3.jpeg");
}


function setup(){

    createCanvas(500,500);
    database = firebase.database();


    player1 = createSprite(225,250,50,50);
    player1.addAnimation("moving1",player1anim);
    player1.scale= 0.3;
    player1.debug = true;
    player1.setCollider("circle",0,0,50);
    database.ref('player1/position').on("value",readPosition1,showError);



    player2 = createSprite(325,250,50,50);
    player2.addAnimation("moving2",player2anim);
    player2.scale = -0.3;
    player2.debug = true;
    player2.setCollider("circle",0,0,50);
    database.ref('player2/position').on("value",readPosition2,showError);

    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value",getState,showError);

    var player1ScoreRef = database.ref('player1Score');
    player1ScoreRef.on("value",readScore1,showError);
 
    var player2ScoreRef = database.ref('player2Score');
    player2ScoreRef.on("value",readScore2,showError);
 

    element1 = createElement('h1');
     element1.position(500,20);

     element2 = createElement('h1');
    element2.position(500,20);


    resetbutton = createButton('RESET');
    resetbutton.position(10,30);
    resetbutton.mousePressed(function(){
        database.ref('/').set({
            'player1Score' : 0,
            'player2Score' : 0,
                    
    });
    database.ref('player1/position').set({
        'x' : 100,
        'y' : 250,
                
});
    database.ref('player2/position').set({
        'x' : 400,
        'y' : 250,
            
});
    
    updatestate(0)
    })
}


function draw(){
                                background("#F4BA62");
                                text ("Player1Score  :  " + player1Score, 100,60);
                                text ("Player2Score  :  " + player2Score, 300,60);

                            // Draws the lines
                                        // central
                                    for(var i=0;i<500;i=i+20){
                                        line (250,i,250,i+10);
                                    }

                                        //left
                                    for(var i=0;i<500;i=i+20){
                                        stroke ("yellow");
                                        line (100,i,100,i+10);
                                    }

                                        //right
                                    for(var i=0;i<500;i=i+20){
                                        stroke ("red");
                                    line (400,i,400,i+10);
                                }

                                //getstate();
                                
                                   
                                        
                    if(gameState === 0 ){
                                        text("Press space to Toss", 200,30);
                                        //element1.hide();
                                        //element2.hide();
                                if(keyDown("space")){
                                            select_player = Math.round(random(1,2));
                                           // console.log(select_player);

                                        if(select_player === 1){
                                         //alert("REd RIDE");
                                    
                                            element1.html("RED RIDE");
                                            updatestate(1);
                                          //play1();
                                
                                        }
                                
                                        if (select_player === 2){
                                            // alert("Yellow RIDE");
                                   
                                            element2.html("YELLOW RIDE");
                                            updatestate(2);
                                            // play2();
                                        }
                                }
                            }
                                
                           
                                                        //calculating score

                                    

                                    

                            if (gameState === 1){
                                play1();
                               // element1.hide();
                               if(player1.x > 400 ){
                                   database.ref('/').update({
                                       'player1Score' : player1Score + 5,
                                       'player2Score' : player2Score - 5,
                                       
                                   });
                                 
                                  updatestate(0); 
                                  
                                }
                                //console.log("this is inside play1");

                                if(player1.isTouching(player2)){
                                    
                                    database.ref('/').update({
                                        'player1Score': player1Score - 5,
                                    // 'gameState' : 0,
                                        'player2Score':player2Score + 5 
                                    });
                                    
                          
                                textSize(20);
                                fill("black")
                                    textSize(20)
                                    text("yellow won",250,400);
                                    //break;
                                }
                                updatestate(0);
                            }


                         if (gameState === 2){
                                play2();
                              // element2.hide();
                                console.log("this is inside play2");

                                if(player2.x < 99 ){
                                          
                                    /*database.ref('player1Score').on("value",(data)=>{
                                         player1Score = data.val();*/
                                          
                                   // })

                                       database.ref('/').update({
                                           'player1Score' : player1Score -5,
                                           'player2Score' : player2Score + 5,
                                           
                                       })
                                     

                                      updatestate(0);
                                      

                                   }
                               

                                if(player2.isTouching(player1)){
                                   
                                    database.ref('/').update({
                                        'player1Score': player1Score + 5,
                                        //'gameState' : 0,
                                        'player2Score':player2Score - 5
                                    })
                                    //updatestate(0);
                                    /*database.ref('player1/position').set({
                                        'x' : 100,
                                        'y' : 250,
                                                
                                });
                                    database.ref('player2/position').set({
                                        'x' : 400,
                                        'y' : 250,
                                            
                                });*/
                                   
                                    fill("black")
                                    textSize(20)
                                text("red won",100,400)
                                }
                                updatestate(0);
                            }

                            /*if(gameState == 3){
                                textSize(20);
                                fill("black")
                                    textSize(20)
                                    text("yellow won",250,400);
                                text("press R to restart", 180 ,250);
                               // element1.hide();
                               if(keyDown("r")){
                                updatestate(0);
                            }
                        }

                            if(gameState === 4){
                                textSize(20);
                                fill("black")
                                    textSize(20)
                                    text("red won",250,400);
                                text("press R to restart", 180 ,250);
                                if(keyDown("r")){
                                    updatestate(0);
                               // element2.hide();
                                
                            }
                        }  */
                            

                                drawSprites();
}

function play1(){

  
    if(keyDown("LEFT_ARROW")){
      writePosition1(-1,0);
    }
    else if(keyDown("RIGHT_ARROW")){
      writePosition1(1,0);
    }
    else if(keyDown("UP_ARROW")){
      writePosition1(0,-1);
    }
    else if(keyDown("DOWN_ARROW")){
      writePosition1(0,1);
    }
    else if(keyDown("a")){
      writePosition2(-1,0);
    }
    else if(keyDown("d")){
      writePosition2(1,0);
    }
}
    

  
  function play2(){
     


    if(keyDown("a")){
      writePosition2(-1,0);
    }
    else if(keyDown("d")){
      writePosition2(1,0);
    }
    else if(keyDown("w")){
      writePosition2(0,-1);
    }
    else if(keyDown("s")){
      writePosition2(0,+1);
    }
    else if(keyDown("LEFT_ARROW")){
      writePosition1(-1,0);
    }
    else if(keyDown("RIGHT_ARROW")){
      writePosition1(1,0);
    }

    
  }


function readPosition1(data1){
    position1 = data1.val();
    player1.x = position1.x;
    player1.y = position1.y;
    //console.log("hi1")
}

function readPosition2(data2){
    position2 = data2.val();
    player2.x = position2.x;
    player2.y = position2.y;
   // console.log("hi2")
}

function writePosition1(x1,y1){
    database.ref('player1/position').set({
        'x':position1.x + x1,
        'y':position1.y + y1
        
    })
   // console.log("hi3")
}

function writePosition2(x2,y2){
    database.ref('player2/position').set({
        'x':position2.x + x2,
        'y':position2.y + y2
    })
    //console.log("hi4")
}

function getState(gsdata){
   
        gameState = gsdata.val();
      
   
}

function updatestate(state){
    database.ref('/').update({
        'gameState': state
    })
}

function readScore1(data1){
    player1Score = data1.val();
}

function readScore2(data2){
    player2Score = data2.val();
}

function showError(){
    console.log("Reading Failed");
}