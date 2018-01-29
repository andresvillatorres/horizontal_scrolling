
// *********** GLOBAL VARIABLES *************** //
var x=0,
	oldx=0,
	deltax=0,
	wheeling,
	xFactor=13,
	xTouchFactor=1.49,
	obj,
	oldGlobalX=0, 
	globalX=0, 
	currentX=0,
	pastX=0,
	swipeDirection=0,
	swipeDelta=0,
	immediateX,
	curDown = false,
    curYPos = 0,
    curXPos = 0,
    oldXPos=0,
    oldYPos=0,
    difX=0,
    oldDifX=0,
    mainXPos=0,
	touchDown=false,
	goToMagnet=false,
	globalTarget=0;

// *********** GLOBAL VARIABLES *************** //



function interactions() {
  obj = document.getElementsByClassName("scroll-wrapper")[0];
  if(itIsMobile){

    manageTouchEvents();
  }else{

    detectWheelScrollStop();
    dragScroll();
  }
};



function detectWheelScrollStop(){
	$('body').on('mousewheel', function (e,delta) {
		if (!wheeling) {

		        if(goToMagnet==false){goToMagnet=true;}
		}
		x += delta;
		x=Math.round( x * 100 + Number.EPSILON ) / 100;
		deltax=Math.abs(x-oldx);
		  loopEnd();
		if(x>0 && !loopE){
	    	x=0;
	    }



		clearTimeout(wheeling);
		wheeling = setTimeout(function() {

		$(".main-page-wrapper").css("left",x*xFactor);
		mainXPos=x*xFactor;
		wheeling = undefined;
		oldXPos=x*xFactor;
		oldDifX=x*xFactor;
		if(goToMagnet){
     		goToMagnet=false;
      		magneticX(globalTarget);
      		
      		
    	}

		offsetScroll();
		}, 150);
		

		
		$(".main-page-wrapper").css("left",x*xFactor);
		mainXPos=x*xFactor;
		oldx=x*xFactor;
		oldDifX=x*xFactor;
	    offsetScroll();
	});

}

function dragScroll(){
	$(".scroll-wrapper").mousemove(function(mf){
		if(curDown === true){

			curYPos = mf.pageY;
			curXPos = mf.pageX;
			difX=oldDifX+(curXPos-oldXPos);
			loopEnd();
			if(difX>0 && !loopE){
				difX=0;
			}
			$(".main-page-wrapper").css("left",difX);
			mainXPos=difX;
			offsetScroll();
			if(difX>immediateX){swipeDirection=0;}else{swipeDirection=1;}
			swipeDelta=Math.abs(difX-immediateX);
			immediateX=difX;

		}
	});
	$(".scroll-wrapper").mousedown(function(m){
		clearTimeout(wheeling);

		if(goToMagnet==false){goToMagnet=true;} 
		curDown = true;
		oldXPos = m.pageX;
		offsetScroll();
	});
	$(".scroll-wrapper").mouseup(function(mm){
		curDown = false;
		loopEnd();
		oldDifX=difX;
		curYPos = 0,
		oldXPos = mm.pageX;
		x=difX/xFactor;
		offsetScroll();
		inertia2();
	});
};

var touchMoved=false;
function manageTouchEvents(){
	obj.addEventListener('touchstart', function(e1){
		if (e1.targetTouches.length == 1) {
			if(!touchDown){
				touchDown=true;
			}
			var touchA = e1.targetTouches[0];
			currentX = touchA.pageX;
			pastX=currentX;
			globalX=oldGlobalX+(-currentX+pastX);

			if(globalX>0 && !loopE){
				globalX=0;
			}

			if(goToMagnet==false){goToMagnet=true; tap=true;} 	
			$(".main-page-wrapper").css("left",globalX*xTouchFactor);
			mainXPos=globalX*xTouchFactor;
			oldGlobalX=globalX;
		}
	},false);
	
	obj.addEventListener('touchmove', function(e2) {
		event.preventDefault();
		if(!touchMoved){
			touchMoved=true;

		}

		if (e2.targetTouches.length == 1) {
			var touch = e2.targetTouches[0];
			currentX = touch.pageX;
			globalX=oldGlobalX+(currentX-pastX);

			if(globalX>0 && !loopE){
				globalX=0;
			}
			if( globalX*xTouchFactor  >  ((-$(".main-page-wrapper").width()/7)*6) ){
				$(".main-page-wrapper").css("left",globalX*xTouchFactor);
				mainXPos=globalX*xTouchFactor;
				$(".marker-info p").text("dev x : " + globalX);
				if(currentX>immediateX){swipeDirection=0;}else{swipeDirection=1;}
				swipeDelta=Math.abs(currentX-immediateX);
				immediateX=currentX;
				offsetScroll();

			}else{

				globalX=((-$(".main-page-wrapper").width()/7)*6)/xTouchFactor;
			}
		}
	}, false);

	obj.addEventListener('touchend', function(e3){
		
		if(touchMoved){
			if(touchDown){
			touchDown=false;			
			}
			oldGlobalX=globalX;
			pastX = e3.changedTouches[e3.changedTouches.length-1].pageX;

			if(oldGlobalX*xTouchFactor > (( -$(".main-page-wrapper").width()/7   )*6) ){
				$(".main-page-wrapper").css("left",oldGlobalX*xTouchFactor);
				mainXPos=oldGlobalX*xTouchFactor;
				offsetScroll();
				inertia();
			}else{
				oldGlobalX=((-$(".main-page-wrapper").width()/7)*6)/xTouchFactor;
			}
			touchMoved=false;
		}
		
		
		
	},false);
}


function inertia() {
	var move = 10;
	var id = setInterval(frame, 15);
	var inertialVal=swipeDelta*1.25;
	function frame() {
		if(touchDown){
			clearInterval(id);
		}else{
			if ( (swipeDelta <3 || move < 1)  ) {
				pastX=oldGlobalX;
				if(goToMagnet ){
     					goToMagnet=false;
      					magneticX(globalTarget);
    			}
				clearInterval(id);
			} else {

				inertialVal= inertialVal *0.93;
				inertialVal=Math.round(inertialVal*100 + Number.EPSILON )/100;
				move--;
				if(swipeDirection==0){
					oldGlobalX=oldGlobalX+inertialVal;

					if(oldGlobalX>0 && !loopE){
						oldGlobalX=0;
					}
					if( oldGlobalX*xTouchFactor  >  ((-$(".main-page-wrapper").width()/7)*6) ){

						$(".main-page-wrapper").css("left",(oldGlobalX)*xTouchFactor);
						mainXPos=oldGlobalX*xTouchFactor;
					}else{
						oldGlobalX=((-$(".main-page-wrapper").width()/7)*6)/xTouchFactor;
					}
				}else{
					oldGlobalX=oldGlobalX-inertialVal;
					if(oldGlobalX>0 && !loopE){
						oldGlobalX=0;
					}

					if( oldGlobalX*xTouchFactor  >  ((-$(".main-page-wrapper").width()/7)*6) ){

						$(".main-page-wrapper").css("left",(oldGlobalX)*xTouchFactor);
				
						mainXPos=oldGlobalX*xTouchFactor;
					}else{
						oldGlobalX=((-$(".main-page-wrapper").width()/7)*6)/xTouchFactor;
					}
				}
				offsetScroll();
				if(move<5){
					if(goToMagnet ){
						pastX=oldGlobalX;
     					goToMagnet=false;
      					magneticX(globalTarget);
      					clearInterval(id);
    				}
				}
				
			}
		}
	}
}

function inertia2() {

	var move = 15;
  	var id = setInterval(frame, 5);
 	var inertialVal=swipeDelta;
	function frame() {
	    if (swipeDelta <3 || move < 1) {
	    	x=oldDifX/xFactor;
	    	oldx=oldDifX;
	    	if(goToMagnet){
     				goToMagnet=false;
      				magneticX(globalTarget);
    		}
	    	clearInterval(id);
	    }else {

    		inertialVal= inertialVal *0.93;
    		inertialVal=Math.round(inertialVal*100 + Number.EPSILON )/100;
    		move--;
	    	if(swipeDirection==0){
	    		oldDifX=oldDifX+inertialVal;
	    		loopEnd();
	    		if(oldDifX>0 && !loopE){
	    			oldDifX=0;
	    		}
	      		$(".main-page-wrapper").css("left",(oldDifX));
	      		mainXPos=oldDifX;
	  		}else{
	  			oldDifX=oldDifX-inertialVal;
	  			loopEnd();
	  			if(oldDifX>0 && !loopE){
	    			oldDifX=0;
	    		}
	  			$(".main-page-wrapper").css("left",(oldDifX));
	  			mainXPos=oldDifX;
	  		}
	  		offsetScroll();
	  		if(move<5){
	  			if(goToMagnet){
     				goToMagnet=false;
      				magneticX(globalTarget);
    			}
    			clearInterval(id);
	  		}
	  		

    	}
	}
}


// REFERENCES
//MouseWheel Library Reference
//https://github.com/jquery/jquery-mousewheel

// click and drag/scroll
//https://codepen.io/JTParrett/pen/uzGvy

//TOUCH INTERACTIONS
//https://www.html5rocks.com/en/mobile/touch/







