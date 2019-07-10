// JavaScript Document - G202│g202_Video640x360.js
////////////////////////////////////////////////////////
/******************************************************/
var NOU = NOU || {};
//-----------------------------------------------------

(function($){ //↓↓↓
//>>>=============================================================>>>
var tPlayer = NOU.namespace('NOU.modules.tPlayer');
//------------------------
var utils = NOU.namespace('NOU.modules.tPlayer.utils');
//------------------------
var urlObj = NOU.namespace('NOU.modules.tPlayer.urlObj');
//------------------------
var param = NOU.namespace('NOU.modules.tPlayer.param');
//------------------------
var method = NOU.namespace('NOU.modules.tPlayer.method');
//------------------------



//1041202 - 需置於上方，method.lessThenIE9Css()才調用得到。
method.lessThenIE9Css = function(){
	// IE6~IE8
	if (!document.addEventListener) {
		//
		if($(window).width() <= param.breakpoint){
			method.rwdCss();
		}else if($(window).width() > param.breakpoint){
			method.normalCss();
		}
	}
};


//●○●○●○1050420 - 
//約從jPlayer.js之行3740~~~3750的tPlayer.completed = function(_flag, index){}裡面調用method.mediaCompleted(index)。
method.mediaCompleted = function(){
	//alert('mediaCompleted');
};


$(document).ready(function(){
	
	//●整體縮放頁面 - 強迫設定為1.0，以避免播放控制失常
	//============================
	$('body').css('zoom','1.0');
	//============================
	
	/*method.addDocumentTitle();

	method.getPath();
	method.pageInit();
	method.init();*/
	
	
	//啟動媒體播放相關處理
	//===================================
	//
	method.addDocumentTitle();
	//
	method.getPath();
	//
	method.pageInit();
	//
	method.init();
	//
	utils.userAgentProp();
	utils.detectBrowserVersion();
	//
	method.choosePlayMode(); //●○●○●○1061123-[較正確的 - method.choosePlayMode()改到method.deployment()的下方。才抓得到 urlObj]
	method.deployment();
	
	
	//
	$('.mediaWrapper').each(function(index) { urlObj = method.getStreamingData(index);
		//param.mediaAutoPlayArr[index] = true;
		method.embedMedia(index);
		
		//媒體介面是否有進場jQ動作 ? 
		//●這一定要在 method.embedMedia(index) 之後調用，所以移到各版型主程式調用。
		if(param.hasEnteringMotion){
			//媒體介面進場jQ動作 
			method.entering(index);
		}
	});
	//===================================
	
	
	// IE6~IE8
	method.lessThenIE9Css();
	
	

});



//1041202
$(window).on('resize', function(){
	// IE6~IE8
	method.lessThenIE9Css();
});







//>>>=============================================================>>>
})(jQuery); //↑↑↑


























