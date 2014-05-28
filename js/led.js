/*RGB-Tester Scripts*/

var LEDS = [];
var PBVS = [];
var TLEDS = 0;
var T=0;
var GLOBAL_STOP = 1;
var LC_W = 0;
var LC_H = 0;
var SIZECLASS = [5,10,15,20,25,30,35,40,45,50,100,200,400,600,800];
var LCLASS = 11;
var GLOBAL_TIMEOUT = null;

function init(numleds){
	TLEDS = numleds;
	for(var ln = 1; ln<=numleds; ln++){
		window["led"+ln.toString()] = document.getElementById("led"+ln.toString());
		LEDS[ln]=RGB(0,0,0);
	}
	return 1;
}

function RGB(r,g,b){
	this.r=r;
	this.g=g;
	this.b=b;
	return this;
}

function CSSRGB(rgb){
	rstr="rgb("+Math.floor(rgb.r.toString())+","+Math.floor(rgb.g.toString())+","+Math.floor(rgb.b.toString())+")";
	return rstr;
}

function RS(array,value){
	console.log(array);
	for(var ai=(array.length-2);ai>=0;ai--){
		array[ai+1]=array[ai];
	}
	array[0]=value;
	console.log(array);
	return array;
}

function LS(array,value){
	console.log(array);
	for(var ai=0;ai<(array.length-1);ai++){
		array[ai]=array[ai+1];
	}
	array[(array.length-1)]=value;
	console.log(array);
	return array;
}

var gray=new RGB(64,64,64);
var purple=new RGB(200,60,250);

function RGBLog(rgb){
	console.log(rgb.r+","+rgb.g+","+rgb.b);
}

function vBright(rgb,bright){
	//console.log(rgb.r+","+rgb.g+","+rgb.b);
	//console.log(bright);
	rgb.r=rgb.r*(bright/255);
	rgb.g=rgb.g*(bright/255);
	rgb.b=rgb.b*(bright/255);
	//console.log(rgb.r+","+rgb.g+","+rgb.b);
	return rgb;
}

function LEDSet(ledarray){
	//console.log("Setting LEDs");
	for(var ln=1;ln<=TLEDS;ln++){
		tv=CSSRGB(vBright(RGB(200,60,250),(255-24*Math.sqrt(30+30*Math.sin((ln*(Math.PI/16))+(T/5))))));
		//RGBLog(tv);
		window["led"+ln.toString()].style.backgroundColor=tv;
		//console.log(ln);
		//RGBLog(ledarray[ln.toString()]);
	}
	return ledarray;
}

function LEDTick(){
	LEDs=[purple,purple,purple,purple,purple,purple,purple,purple];
	//console.log("Ticking LEDs");
	for(var ln=1;ln<=TLEDS;ln++){
		//console.log(ln);
		tv=vBright(RGB(200,60,250),(255*Math.random()));
		//RGBLog(tv);
		LEDs[ln]=tv;
		//RGBLog(LEDs[(ln+0)]);
		//if(ln>1){RGBLog(LEDs[(ln-1)]);}
	}
	LEDSet(LEDs);
	/*if(GLOBAL_STOP == 0){
		if(GLOBAL_RUN == 0){
			setTimeout((function(){GLOBAL_RUN=0;}),32);
			setTimeout(LEDTick, 33);
		}
	}else{
		GLOBAL_STOP = 0;
	}*/
	GLOBAL_TIMEOUT = setTimeout(LEDTick, 33);
	T++;
	return 1;
}

function StartTick(){
	if(GLOBAL_STOP == 1){
		GLOBAL_STOP = 0;
		setTimeout(LEDTick,33);
	}
}

function StopTick(){
	GLOBAL_STOP = 1;
	clearTimeout(GLOBAL_TIMEOUT);
}

function updateDims(){
	WnewI = document.getElementById("Winput");
	HnewI = document.getElementById("Hinput");
	Wnew = WnewI.value;
	Hnew = HnewI.value;
	if(LC_W==Wnew && LC_H==Hnew){return;}
	TLEDS = Wnew*Hnew;
	Cont = document.getElementById("leds");
	ledCont = document.getElementById("contentMain");
	bigCont = document.getElementById("content");
	header = document.getElementById("header");
	pLCLASS = null;
	while(LCLASS != pLCLASS){
		pLCLASS = LCLASS;
		/*console.log(LCLASS);
		console.log(Wnew);
		console.log(Hnew);
		console.log(Wnew*SIZECLASS[LCLASS]);
		console.log(Hnew*SIZECLASS[LCLASS]);
		console.log(window.innerWidth);
		console.log(Cont.clientHeight);*/
		if(Wnew*SIZECLASS[LCLASS]<(window.innerWidth-50)){
			//console.log("Tested for SIZECLASS too small for width.");
			LCLASS++;
			if(Wnew*SIZECLASS[LCLASS]>(window.innerWidth-50)){
				//console.log("Rejected SIZECLASS too small for width.");
				LCLASS--;
			}
		}
		if(Wnew*SIZECLASS[LCLASS]>(window.innerWidth-50)){
			//console.log("Tested for SIZECLASS too large for width.");
			LCLASS--;
			//if(Wnew*SIZECLASS[LCLASS]<(window.innerWidth-50)){
			//	LCLASS++;
			//}
		}
		if(Hnew*SIZECLASS[LCLASS]>(Cont.clientHeight-25)){
			//console.log("Tested for SIZECLASS too large for height.");
			LCLASS--;
			if(Hnew*SIZECLASS[LCLASS]>(Cont.clientHeight-25)){
				//console.log("Shitty code powers... ACTIVATED");
				LCLASS--;
			}
		}
	}
	bigCont.style.top=(((Cont.clientHeight-(Hnew*SIZECLASS[LCLASS]))/2));
	bigCont.style.height=Hnew*SIZECLASS[LCLASS];
	bigCont.style.width=Wnew*SIZECLASS[LCLASS];
	LC_H=Hnew;
	LC_W=Wnew;
	while (ledCont.firstChild) {
		ledCont.removeChild(ledCont.firstChild);
	}
	cln=1;
	for(var cy=1;cy<=Hnew;cy++){
		for(var cx=1;cx<=Wnew;cx++){
			cled = document.createElement("div");
			cled.setAttribute("id","led"+cln.toString());
			cled.setAttribute("class","ledx");
			cled.style.height=SIZECLASS[LCLASS];
			cled.style.width=SIZECLASS[LCLASS];
			cled.style.top=(cy-1)*SIZECLASS[LCLASS];
			cled.style.left=(cx-1)*SIZECLASS[LCLASS];
			ledCont.appendChild(cled);
			cln++
		}
	}
}