// JavaScript Document - G222A│g222A_PPTExternalLinkVideo.js
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
	
	
		
	//●○1060428 - 按下外連Youtube影音的連結，版型頁面上的影音立即暫停
	//=====================================================
	$('.linkToYoutube').each(function(index) {
		//點擊任何一個.linkToYoutube裡面的<a>標籤 (※都外連到Youtube影音)
        $('.linkToYoutube:eq(' + index + ') a').on('mousedown', function(){
			
			//所有的影音都暫停播放
			$('.mediaWrapper').each(function(mediaIndex) {
                tPlayer.pause(mediaIndex);
            });
			
		});
    });
	//=====================================================
	
	
	
});

//1041202
$(window).on('resize', function(){
	// IE6~IE8
	method.lessThenIE9Css();
});








//>>>=============================================================>>>
})(jQuery); //↑↑↑


























