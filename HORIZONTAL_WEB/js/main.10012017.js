// * INITIAL VARIABLES * //
var hColor="rgb(0,0,0)";
var black   = "rgb(0,0,0)";
var pink    = "rgb(125,0,0)";
var green   = "rgb(0, 125, 5)";
var blue    = "rgb(0, 0, 125)";
var white = "rgb(255,255,255)";
var yellow  = "rgb(25,125,0)";
var orange  = "rgb(125,5,50)";
var altGreen = "rgb(6, 125, 20)";
var scrlIdx=0;
var intervalId = null;
var intervalCount=0;
var clkPrsn=false;
var whichPrsn=0;
var prtrtInt=false;
var stopPlay=false;
var loopE=false;

var playVideo=false;
var itIsMobile=false;
var navMotion=20;
$(document).ready(function(){

    checkVerticality();
    callProfile();
    interactions();

    


 
    $("#nav-icon3 span").css("background",hColor);

    $('#menu-wrapper').click(function(){
      $('#nav-icon3').toggleClass('open');
      $("polygon.hamVL").toggleClass('open');
      $("#menu-overlay").toggleClass('open');
      $('header').toggleClass('open');
      $("#menu-overlay.open").css("background-color",hColor);
    });

    $('#menu-content').click(function(){
      stopPlay=!stopPlay;
      $("polygon.hamVL").toggleClass('open');
      $("#menu-overlay").toggleClass('open');
      $('header').toggleClass('open');
      $("#menu-overlay.open").css("background-color",hColor);
      $('#nav-icon3').toggleClass('open');
      colorInterval();
    });
    $('#logo-wrapper').click(function(){
      // $(".small .accent").removeClass('open');
      $("polygon.hamVL").removeClass('open');
      $("#menu-overlay").removeClass('open');
      $('header').removeClass('open');
      $("#menu-overlay.open").css("background-color",hColor);
      $('#nav-icon3').removeClass('open');
      navigationControls( 0 );
      stopPlay=false;
      colorInterval();
    });
    colors();
});


$(window).resize(function(){
    colorInterval();
    checkVerticality();
});

function kollektiv(){
    var goalPosition=$(".main-page-wrapper").width()/7 ;
    goalPosition=goalPosition* -2;
    navigationControls(goalPosition);
}
function service(){
    var goalPosition=$(".main-page-wrapper").width()/7 ;
    goalPosition=goalPosition* -3;
    navigationControls(goalPosition);
}
function projekte(){
    var goalPosition=$(".main-page-wrapper").width()/7 ;
    goalPosition=goalPosition* -4;
    navigationControls(goalPosition);
}
function friends(){
    var goalPosition=$(".main-page-wrapper").width()/7 ;
    goalPosition=goalPosition* -5;
    navigationControls(goalPosition);
}
function kontakt(){
    var goalPosition=$(".main-page-wrapper").width()/7 ;
    goalPosition=goalPosition* -6;
    navigationControls(goalPosition);
}



var forceReload=false;
function checkVerticality(){
    if($(window).width()< $(window).height()){
      

      if($(window).width()<=750){ // THIS CONDITION IS FOR MOBILE
        if(forceReload){
          window.location.reload(false);
        }
        prtrtInt=true;

        $('.profile-content .paragraph').css("display", "none");
        $(".on-horizontal-mobile").css("height", "0%");
        $(".on-horizontal-mobile h1.menu-title").css("opacity","0");
        itIsMobile=true;
        $("#nav-icon3 span").css("height" , "2px");
        navMotion=15;
      }
    }else{

      if($(window).height()<=750){
        if (/Mobi/.test(navigator.userAgent)) {
          
          $(".on-horizontal-mobile").css("height", "100%");
          $(".on-horizontal-mobile h1.menu-title").css("opacity","1");
          if(forceReload==false){forceReload=true;}
      }
      }else{
          itIsMobile=false;

          navMotion=30; 
          $(".on-horizontal-mobile").css("height", "0%");
          $(".on-horizontal-mobile h1.menu-title").css("opacity","0");
          $('.portrait-container').removeClass("down");
          $('.profile-content .paragraph').css("display", "initial");
          prtrtInt=false;
      }
    }
}

// ****************** NAVIGATION  CONTROL ******************* //

function navigationControls(goal){

  var move=navMotion;    
  
  var idNav = setInterval(frame, 10);
  var minusPart=Math.abs(mainXPos-goal)/move;
  function frame() {
      if (move < 1) {
        offsetScroll();
        $("polygon.hamVL").css("stroke",hColor);
        clearInterval(idNav);
      }else {

        if(mainXPos!=goal){
            if(mainXPos<goal){
              mainXPos=mainXPos+minusPart;
              pastX=mainXPos/xTouchFactor;
              oldGlobalX=mainXPos/xTouchFactor;
              oldXPos=mainXPos;
              oldDifX=mainXPos;
              difX=mainXPos;
              x=mainXPos/xFactor; 
            }else{
              mainXPos=mainXPos-minusPart;
              pastX=mainXPos/xTouchFactor;
              oldGlobalX=mainXPos/xTouchFactor;
              oldXPos=mainXPos;
              oldDifX=mainXPos;
              difX=mainXPos;
              x=mainXPos/xFactor; 
            }
        }
        move--;


        $(".main-page-wrapper").css("left",mainXPos);
        if(move<5){

          offsetScroll();
          $("polygon.hamVL").css("stroke",hColor);
        }
      }
  }
}

// ****************** MAGNETIC POSITION ******************* //
function magneticX(goalMagneticX){
  var id = setInterval(frame, 15);
  var move=10;
  var distanceToMagnetX=Math.abs(mainXPos-goalMagneticX);
  var step=distanceToMagnetX/move;  
    function frame(){
      if(move<1){
        clearInterval(id);
      }else{


        if(distanceToMagnetX>2){
          if(mainXPos>goalMagneticX){
              mainXPos=mainXPos-step;
              pastX=mainXPos/xTouchFactor;
              oldGlobalX=mainXPos/xTouchFactor;
              oldXPos=mainXPos;
              oldDifX=mainXPos;
              difX=mainXPos;
              x=mainXPos/xFactor; 
          }else{
              mainXPos=mainXPos+step;
              pastX=mainXPos/xTouchFactor;
              oldGlobalX=mainXPos/xTouchFactor;
              oldXPos=mainXPos;
              oldDifX=mainXPos;
              difX=mainXPos;
              x=mainXPos/xFactor; 
          }
        }else{
          mainXPos=goalMagneticX;
        }
        move--;
        $(".main-page-wrapper").css("left",mainXPos);

      }
    }

}

function colorInterval(){
  intervalCount=0;
  intervalId = setInterval(setColor, 5);   
}
var scrollGlobal=0;
function offsetScroll(){

      var p = $( ".main-page-wrapper" );
      var offset = p.offset();
      
      scrollGlobal=$(".main-page-wrapper").width() + offset.left;
      if(scrollGlobal / $("section").width()>6.3  && scrollGlobal / $("section").width()< 7.0){
        scrlIdx=0;
      }
      if(scrollGlobal / $("section").width()>5.3  && scrollGlobal / $("section").width()< 6.3){
        scrlIdx=1;
      }
      if(scrollGlobal / $("section").width()>4.3  && scrollGlobal / $("section").width()< 5.3){
        scrlIdx=2;
      }
      if(scrollGlobal / $("section").width()>3.3  && scrollGlobal / $("section").width()< 4.3){
        scrlIdx=3;
      }
      if(scrollGlobal / $("section").width()>2.3  && scrollGlobal / $("section").width()< 3.3){
        scrlIdx=4;
      }
      if(scrollGlobal / $("section").width()>1.3  && scrollGlobal / $("section").width()< 2.3){
        scrlIdx=5;
      }
      if(scrollGlobal / $("section").width()>0.3  && scrollGlobal / $("section").width()< 1.3){
        scrlIdx=6;
      }
      if(scrollGlobal / $("section").width()> 0.0  && scrollGlobal / $("section").width()< 0.3){
        scrlIdx=0;
      }

      colors();
    

}

function loopEnd(){
      var limiteRight= ((-$(".main-page-wrapper").width())/7) * 6.8;
      var resetX=(($(".main-page-wrapper").width())/7);
      var p = $( ".main-page-wrapper" );
      var offset = p.offset();
      
      var scrllGlobal=offset.left;
      
      if(!itIsMobile){
          if(scrllGlobal < limiteRight && !loopE){         
            mainXPos=resetX;
            pastX=mainXPos/xTouchFactor;
            oldGlobalX=mainXPos/xTouchFactor;
            oldXPos=mainXPos;
            oldDifX=mainXPos;
            difX=mainXPos;
            x=mainXPos/xFactor; 
            loopE=true;
          }else{
            if(mainXPos<100 || mainXPos >resetX){
              loopE=false;
            }
          }        
      }

}

function colors(){
      var goalPosition=$(".main-page-wrapper").width()/7;
      
      if(scrlIdx==0){
        $(".main-page-wrapper").css("background-color", "transparent");       
        hColor=black;
        globalTarget=0;
        for(var i=0; i< 7; i++){
          $('#t0'+i).removeClass('ffxV');
        }
       }
       if(scrlIdx==1){
        $(".main-page-wrapper").css("background-color", "transparent");         
        hColor=black;
        globalTarget=goalPosition*-1;
        for(var i=0; i< 7; i++){
          $('#t0'+i).removeClass('ffxV');
        
        }
           if(!stopPlay){
          } 
       }
       if(scrlIdx==2){
        $(".main-page-wrapper").css("background-color", "transparent");         
        hColor=pink;
        globalTarget=goalPosition*-2;
        for(var i=0; i< 7; i++){
          $('#t0'+i).removeClass('ffxV');          
        }
        $('#t0'+scrlIdx).addClass('ffxV');
      }else{
        if(clkPrsn){
            clkPrsn=false;
            $(".profile#p-trgt-"+whichPrsn).removeClass('prflvsbl');
            $(".content-sub-section").removeClass('gone');
          }
      }
      if(scrlIdx==3){
        $(".main-page-wrapper").css("background-color", "transparent");
        hColor=green;
        globalTarget=goalPosition*-3;
        for(var i=0; i< 7; i++){
          $('#t0'+i).removeClass('ffxV');          
        }
        $('#t0'+scrlIdx).addClass('ffxV');
      }
      if(scrlIdx==4){
        $(".main-page-wrapper").css("background-color", "transparent");
        hColor=blue;
        globalTarget=goalPosition*-4;
        for(var i=0; i< 7; i++){
          $('#t0'+i).removeClass('ffxV');          
        }
        $('#t0'+scrlIdx).addClass('ffxV');
      }
      if(scrlIdx==5){
        $(".main-page-wrapper").css("background-color", "transparent");
        hColor=yellow;
        globalTarget=goalPosition*-5;
        for(var i=0; i< 7; i++){
          $('#t0'+i).removeClass('ffxV');          
        }
        $('#t0'+scrlIdx).addClass('ffxV');
      }
      if(scrlIdx==6){
        $(".main-page-wrapper").css("background-color", "transparent");
        hColor=orange;
        globalTarget=goalPosition*-6;
        for(var i=0; i< 7; i++){
          $('#t0'+i).removeClass('ffxV');          
        }
        $('#t0'+scrlIdx).addClass('ffxV');
      }
      $(".main-color").css("color",hColor);
      $(".rotate.small .accent").css("color",hColor);
      $(".main-color").css("stroke",hColor);
      $("a").css("color", hColor);
      $(".main-background").css("background-color",hColor); 
      $("#nav-icon1 span, #nav-icon3 span, #nav-icon4 span").css("background",hColor);
      $("#menu-overlay.open").css("background-color",hColor);


}


var setColor= function(){
  if(intervalCount<10){  
    colors();
    intervalCount++;
  }else{
    clearInterval(intervalId);
  }

}

function callProfile(){
  for(var i = 0; i < 5 ; i ++){

      $("#0"+i).click(function(){
        var idx=$(this).attr('id');
        if(!clkPrsn){
          $(".profile#p-trgt-"+idx).toggleClass('prflvsbl');
          $(".content-sub-section").toggleClass('gone');
          whichPrsn=idx;
          $('.portrait-container').removeClass("down");
          if(prtrtInt==true){
            $('.profile-content .paragraph').css("display", "none");
          }else{
            $('.profile-content .paragraph').css("display", "initial");
          }
          clkPrsn=true;
        }
      });
  }


  $(".closeX").click(function(){
    if(clkPrsn){
      clkPrsn=false;
      $(".profile#p-trgt-"+whichPrsn).removeClass('prflvsbl');
      $(".content-sub-section").removeClass('gone');
      if(prtrtInt==true){
        $('.profile-content .paragraph').css("display", "none");
      }else{
        $('.profile-content .paragraph').css("display", "initial");
      }
      $('.portrait-container').removeClass("down");
    }
  });

  $("img.portrait").click(function(){
    

    if(clkPrsn){
      if(prtrtInt==false){
          $(".profile#p-trgt-"+whichPrsn).removeClass('prflvsbl');
          $(".content-sub-section").removeClass('gone');
          clkPrsn=false;
      }
      if(prtrtInt==true){
        $('.profile-content .paragraph').css("display", "initial");
        $('.portrait-container').toggleClass("down");
      }
    }
  });

}


