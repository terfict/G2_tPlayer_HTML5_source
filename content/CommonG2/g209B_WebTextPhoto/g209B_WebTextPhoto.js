﻿// JavaScript Document - G209B│g209B_WebTextPhoto.js
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


//
//連結(旭聯平台)筆記本(個人筆記)按鈕事件
method.noebookMouseEvent = function(index){
	$('.notebook img').on('mouseover',function(){
		$(this).attr('src', param.notebookIconOverPath);
	});
	$('.notebook img').on('mouseout',function(){
		$(this).attr('src', param.notebookIconPath);
	});
	$('.notebook img').on('mousedown',function(){
		$('.notebook a').attr({'href':param.notebookUrl,target:'_blank'});
	});
};
//
//help滑鼠事件
method.helpMouseEvent = function(){
	$('.help img').on('mouseover',function(){
		$(this).attr('src', param.helpIconOverPath);
	});
	$('.help img').on('mouseout',function(){
		$(this).attr('src', param.helpIconPath);
	});
	$('.help img').on('mousedown',function(){
		$('.help a').attr({'href':param.helpUrl,target:'_blank'});
	});
};



$(document).ready(function(){


	//●整體縮放頁面 - 強迫設定為1.0，以避免播放控制失常
	//============================
	$('body').css('zoom','1.0');
	//============================	
	
	
	//
	//旭聯平台/筆記本
	//=======================================================================
		if(param.hasNotebookFlag){
					
			if(param.notebookIconPath === undefined || param.notebookIconPath === "" || typeof param.notebookIconPath !== "string"){
				param.notebookIconPath = param.mainPath + "tPlayer_CSS/images/notebook.png";
				param.notebookIconOverPath = param.mainPath + "tPlayer_CSS/images/notebook_over.png";
			}
			
			$('.notebook')
					.append('<a><img src=' + param.notebookIconPath + '></a>')
					.attr('title', param.notebookComment);
					
					
			//連結(旭聯平台)筆記本(個人筆記)按鈕事件
			method.noebookMouseEvent();

		}
	//=======================================================================
	
	
	//G209A - 新手上路
	//=======================================================================
		if(param.hasHelpFlag){
			
			if(param.helpIconPath === undefined || param.helpIconPath === "" || typeof param.helpIconPath !== "string"){ 
				param.helpIconPath = param.mainPath + "tPlayer_CSS/images/help.png";
				param.helpIconOverPath = param.mainPath + "tPlayer_CSS/images/help_over.png"; 
			}
			
			$('.help')
					.append('<a><img src=' + param.helpIconPath + '></a>')
					.attr('title', param.helpComment); 
			
			
			//help滑鼠事件
			method.helpMouseEvent();
					
					
		}
		
	//=======================================================================
	
	
	
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
});







//>>>=============================================================>>>
})(jQuery); //↑↑↑


























