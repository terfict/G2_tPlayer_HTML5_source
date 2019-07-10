// JavaScript Document - G200C2│g200C2_WebTextPhoto.js
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
var g200C2 =  NOU.namespace('NOU.modules.g200C2');
//------------------------



g200C2.itemName = "";
g200C2.itemValue = "";



//1041208 - 需置於上方，method.lessThenIE9Css()才調用得到。
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


//1041202
$(window).on('resize', function(){
	
	// IE6~IE8
	method.lessThenIE9Css();

	
	//
	//大尺寸視窗
	if( $(window).width() > param.breakpoint ){ //alert($('.insertPic').hasClass('item_pic'));
		
		if( $('.tr_name .insertPic .teacherPicTable').get(0) !== undefined ){
			
			$('.tr_name .item_pic').append( $('.teacherPicTable') );
			$('.tr_name .item_pic').css({'display':'table-cell'});
			$('.tr_name .item_name').html( g200C2.itemName );
			$('.tr_name .item_value').html( g200C2.itemValue );
			
			
		}
		
	//小尺寸視窗
	}else if( $(window).width() <= param.breakpoint ){
		
		if( $('.tr_name .insertPic .teacherPicTable').get(0) === undefined ){
			
			$('.tr_name .insertPic').html( $('.teacherPicTable') );
			$('.tr_name .item_pic').css({'display':'none'});
			$('.tr_name .item_name').html( g200C2.itemValue );
			
			
		}
		
	}
	
	
});



$(document).ready(function(){


	//●整體縮放頁面 - 強迫設定為1.0，以避免播放控制失常
	//============================
	$('body').css('zoom','1.0');
	//============================	
	
	//1050512 - 擷取「名稱」值，和「老師姓名」值
	//===================================
	g200C2.itemName = $('.tr_name .item_name').text();
	g200C2.itemValue = $('.tr_name .item_value').text();
	//===================================
	
	
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
	
	
	//點小圖跳大圖 - 這得在method.lessThenIE9Css()上方。
	method.createMagnifierIcon();
	
	//名詞解釋
	method.glossary();
	
	// IE6~IE8
	method.lessThenIE9Css();
	
	
	//1050512 - 必須先執行一次window的resize事件處理函式
	//以小視窗載入網頁時，才能觸發小視窗的各種程式處理
	//===============================
	$(window).trigger('resize');
	//===============================
	
});










//>>>=============================================================>>>
})(jQuery); //↑↑↑


























