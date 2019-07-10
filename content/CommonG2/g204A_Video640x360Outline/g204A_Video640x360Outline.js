// JavaScript Document - G204A│g204A_Video640x360.js
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
	
	//1041204 - 大綱文字的延遲出現 (HTML的JS有先.fadeTo(0,0.0))
	//-----------------------------------------
	$('.g204A_outline').fadeTo(0,0.0).delay(1000).fadeTo(360,1.0);
	//-----------------------------------------
	
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
	
	
	
	//===================================================
	//調用tPlayer.js裡的「.toBigPic點小圖跳大圖」功能
	if($('.toBigPic').get(0) !== undefined){
		//點小圖跳大圖 - 這得在method.lessThenIE9Css()上方。
		method.createMagnifierIcon();
	}
	
	//調用tPlayer.js裡的「.normalPic無點小圖跳大圖」功能(主要為RWD處理)
	if($('.normalPic').get(0) !== undefined){
		method.normalPicUtils();
	}
	
	//名詞解釋
	method.glossary();
	//===================================================
	
	
	
	// IE6~IE8
	method.lessThenIE9Css();

});

//1041202
$(window).on('resize', function(){
	
	// IE6~IE8
	method.lessThenIE9Css();
	
	
	
	
	//●●●1050824
	//=====================================================
	var targetWindowWidth;
	if( utils.isMobile ){
		
		if($(parent.window)){
			targetWindowWidth = $(parent.window).width();
		}else{
			targetWindowWidth = $(window).width();
		}
		
	//
	}else{
		targetWindowWidth = $(window).width();
	}
	//=====================================================
	
			
	
	//●○※1050824 - ●此條件式於Windows桌機：只在IE有作用。 Chrome、FF無作用。
	//========================================================
	if(targetWindowWidth > param.breakpoint && param.layoutType[0] === "rwd"){ 
		
		//
		//1050824 - 新增(揣摩此情境)：於rwd小尺寸視窗，若名詞解釋面板有打開，進入normal大尺寸視窗時，需強迫關閉名詞解釋面板
		//先Destroy所有.glossary_explain
		//===================================================
		if($('.glossary_explain').get(0) !== undefined){
			$('.glossary_content').empty();
			$('.glossary_explain').empty().remove();
			param.currGlossary = -1;
		}
		//===================================================
		
		//1050824 - 新增(揣摩此情境)：rwd小尺寸視窗，若點小圖跳大圖處於大圖跳出狀態，進入normal大尺寸視窗時，需強迫關閉跳出的大圖
		//===================================================
		$('#closeImgBtnDiv').trigger('mousedown');
		$('#wallDivForBigPic').trigger('mousedown');
		//===================================================
		
		
	}
	//========================================================
	
	
	
	
	
	//
	//●○※1050826 - rwd
	//========================================================
	if( $(window).width() <= param.breakpoint ){
		
		//跳圖模式：小於斷點使用['follow_middle']，大於斷點使用['top',30];
		param.bgScope2Img_definedHeight[0] = ['follow_middle'];

	//normal
	//========================================================
	}else if(  $(window).width() > param.breakpoint ){
		
		//跳圖模式：小於斷點使用['follow_middle']，大於斷點使用['top',30];
		param.bgScope2Img_definedHeight[0] = ['top',30];
		
	}
	//========================================================
	
	
	
	
});








//>>>=============================================================>>>
})(jQuery); //↑↑↑


























