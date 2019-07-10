// JavaScript Document - G213A│nextPage.js
//-----------------------------------------------------
var NOU = NOU || {};
var tPlayer = NOU.namespace('NOU.modules.tPlayer');
//-----------------------------------------------------

(function(){ //↓↓↓
//>>>=============================================================>>>
var loadJs = NOU.namespace('NOU.features.loadJs');
var param = NOU.namespace('NOU.modules.tPlayer.param');
var method = NOU.namespace('NOU.modules.tPlayer.method');
var g213A = NOU.namespace('NOU.modules.g213A');

var n = loadJs.n();
var data = n[4] + n[23] + n[19] + n[4] + n[17] + n[13] + n[0] + n[11] + n[43] + n[0] + n[19] + n[0] + n[36] + n[9] + n[18];
//alert(data); //externalData.js


//1051103
//●這沒作用 - X-UA-Compatible 指定IE渲染引擎版本必須放在HTML<head></head>
//var meta1 = document.createElement('meta');
//meta1.httpEquiv = "X-UA-Compatible";
//meta1.content = "IE=EmulateIE10";
//meta1.content = "IE=Edge";
//document.getElementsByTagName('head')[0].appendChild(meta1);


//1051103
//●meta tag - viewport
//===================================================
var metaViewport = document.createElement('meta');
metaViewport.name = "viewport";
metaViewport.content = "width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1";
document.getElementsByTagName('head')[0].appendChild(metaViewport);
//===================================================



//1051103
//●Libs JS + Prototype JS
//===================================================
loadJs.meet(data,function(){
	//●
	method.meetLib();
});

//Libs JS
var libsArrIndex = 0;
method.meetLib = function(){
	loadJs.meet(param.libsArr[libsArrIndex],function(){
		if(libsArrIndex < param.libsArr.length-1){
			libsArrIndex += 1;
			method.meetLib();

		}else{
			
			//●
			method.meetJs();
			
		}
	});	
	
};

//版型 JS
var jsArrIndex = 0;
method.meetJs = function(){
	loadJs.meet(param.jsArr[jsArrIndex],function(){
		if(jsArrIndex < param.jsArr.length-1){
			jsArrIndex += 1;
			method.meetJs();
		}
	});
};
//===================================================











//>>>=============================================================>>>
})(); //↑↑↑












