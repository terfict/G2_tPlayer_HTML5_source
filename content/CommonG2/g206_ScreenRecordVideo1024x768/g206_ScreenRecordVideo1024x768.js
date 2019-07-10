// JavaScript Document - G206│g206_ScreenRecordVideo1024x768.js
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



//1041124 - 儘早修改HTML中的.mediaWidth和.mediaHeight，避免html物件與影音已經載入。所以需放在document.ready事件處理函式之外
//===================================================
//需先取得utils.isMobile屬性
utils.userAgentProp();
//---------------------
utils.detectBrowserVersion();

	
//1041124 - param.G2ID === "G206"時(螢幕錄製影音1024x768)，若遇到行動裝置，將1024x768改為800x600
method.changeG206WHOnMobi = function(){
	
	if( utils.isMobile && param.G2ID === "G206" ){
		
		$('.pageWrapper').css({
			'width':800,
			'height':'auto'
		});
		
		$('.mediaWrapper').each(function(index) {
		
			if($('.mediaWrapper:eq('+index+') .mediaWidth').text() === "1024" && $('.mediaWrapper:eq('+index+') .mediaHeight').text() === "768"){
				
				$('.mediaWrapper:eq('+index+') .mediaWidth').text("800");
				$('.mediaWrapper:eq('+index+') .mediaHeight').text("600");
				
				$('.mediaWrapper:eq(' + index + ')').css({
					'width':800,
					'height':'auto'
				});
				
				$('.mediaDiv:eq(' + index + ')').css({
					'width':800,
					'height':600
				});
			}
		
		});
	}
};

//
if(param.change1024x768To800x600OnMobile){
	method.changeG206WHOnMobi();
}
//===================================================



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
}

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
	method.choosePlayMode();
	method.deployment();
	
	//
	$('.mediaWrapper').each(function(index) {
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


























