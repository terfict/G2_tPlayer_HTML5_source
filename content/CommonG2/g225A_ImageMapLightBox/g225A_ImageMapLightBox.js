// JavaScript Document - G225A│g225A_ImageMapLightBox.js
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
var g225A = NOU.namespace('NOU.modules.g225A');
//------------------------



//================================================
g225A.data = [];
//================================================ 



//================================================
$('#preloader').css({'display':'block'});
//================================================




//1041208 - 需置於上方，method.lessThenIE9Css()才調用得到。
method.lessThenIE9Css = function(){
	// IE6~IE8
	if (!window.addEventListener) { 
		//
		if($(window).width() <= param.breakpoint){
			method.rwdCss();
		}else if($(window).width() > param.breakpoint){
			method.normalCss();
		}
	}
	
	//
	//------------------------------------------------------
	//var xxx;
	
	//IE9及以上支援 window.addEventListener - // DOM2 standard
	//xxx = window.addEventListener;
	//if( xxx ){ alert( xxx ); }
	
	//IE5 quirks、IE7、8、9、quirks、10皆有支援 window.attachEvent - // Microsoft's precursor to it, IE8 and earlier
	//xxx = window.attachEvent;
	//if( xxx ){ alert( xxx ); }
	
	//IE5 quirks、7、8、9、quirks、10皆未支援 window.onload - // Some pre-1999 browser
	//xxx = window.onload; alert( xxx );
	//if( xxx ){ alert( xxx ); }
	//------------------------------------------------------
	
	
};




/*ColorBox*/
function openBox(_targetPath,_w,_h){
	/*$(document).ready(function(){
	//Examples of how to assign the ColorBox event to elements
	//alert(_targetPath);
	top.$.colorbox({href:_targetPath , width:_w, height:_h, iframe:true});

	});*/
	
	$.colorbox({href:_targetPath , width:_w, height:_h, iframe:true});
	
	
	
	
	//1050527 - colorbox燈箱
	//=============================================
	$(window).on('resize',function(){
		//
		if( $(window).width() <= param.breakpoint ){
			
			//擷取colorbox所跳出燈箱的下緣$('#cboxBottomCenter')高度
			var cboxBottomCenterHeight = $('#cboxBottomCenter').height();
			if( !cboxBottomCenterHeight ){
				cboxBottomCenterHeight = 0;
			}
			
			//
			var $win;
			if( $(top.window) ) {
				$win = $(top.window);
			}else{
				$win = $(window);
			}
			
			$.colorbox.resize({ 'innerWidth':'100%','innerHeight':$win.height()-cboxBottomCenterHeight*1.5 });
		}else{
			$.colorbox.resize({'width':_w,'height':_h});
		}
		
	});
	//=============================================
	$(window).trigger('resize');
	
	
}




//取得HTML裡面的資料。 
g225A.getData = function(){
	
	$('.linkDataZone .set').each(function(index) {

		g225A.data.push([
						$('.linkDataZone .set:eq(' + index + ') .linkData').text(), 
						$('.linkDataZone .set:eq(' + index + ') .width').text(), 
						$('.linkDataZone .set:eq(' + index + ') .height').text()
						]);
						
						
      /*  g225A.data[index][0] = $('.linkDataZone .set:eq(' + index + ') .linkData').text();
		  g225A.data[index][1] = $('.linkDataZone .set:eq(' + index + ') .width').text();
		    g225A.data[index][2] = $('.linkDataZone .set:eq(' + index + ') .height').text();*/
			
			
		//alert(g225A.data);
			
			
    });
	
	
};


g225A.initPage = function(){
};



g225A.jumpOut = function(){
	
	$('.innerDiv map area').each(function(index) {
		
        $('.innerDiv map area:eq(' + index + ')').on('mousedown', function(){
			openBox( g225A.data[index][0], g225A.data[index][1], g225A.data[index][2] );
		});
		
    });
	
};



//help滑鼠事件
g225A.helpMouseEvent = function(){
	
	//
	$('.help a img').attr('src', param.mainPath + 'g225A_ImageMapLightBox/images/help.png');
	
	
	//
	$('.help').on('mouseover',function(){
		$('.help a img').attr('src', param.mainPath + 'g225A_ImageMapLightBox/images/help_over.png');
	});
	$('.help').on('mouseout',function(){
		$('.help a img').attr('src', param.mainPath + 'g225A_ImageMapLightBox/images/help.png');
	});
	$('.help').on('mousedown',function(){
		$('.help a img').attr('src', param.mainPath + 'g225A_ImageMapLightBox/images/help.png');
		$('.help a').attr({'href':param.helpUrl,target:'_blank'});
	});
	
};



//1041202
$(window).on('resize', function(){
	
	// IE6~IE8 - ※IE9在此處對window.attachEvent 則有反應
	method.lessThenIE9Css();
	
	
	//●○1060425 - G225A - 
	if($(window).width() <= param.breakpoint){
		
		
	}else if($(window).width() > param.breakpoint){
		
		
	}
	
});


//預載控制 - 從HTML移過來。
//1051104 - 從$(document).ready裡面調用
method.preloaderFadeOut = function(){
	//不設window.load
	//$(window).load(function() { // makes sure the whole site is loaded
	
		//$('#status').fadeOut(600); // will first fade out the loading animation
		$('#preloader').fadeOut(600,function(){// will fade out the white DIV that covers the website.
			$('body').css({'overflow':'auto','display':'block'});
		});
		 
	//});
};




//
$(document).ready(function(){
	
	//1051104 - 延遲300毫秒再調用 - 預載方法method.preloaderFadeOut()
	//--------------------------------------------
	//setTimeout( method.preloaderFadeOut, 300);
	setTimeout( method.preloaderFadeOut, 300);
	//--------------------------------------------

	
	//●整體縮放頁面 - 強迫設定為1.0，以避免播放控制失常
	//============================
	$('body').css('zoom','1.0');
	//============================
	
	
	method.addDocumentTitle();
	
	
	//●
	g225A.getData();
	//
	g225A.initPage();
	
	
	//
	//●○
	$('img[usemap]').rwdImageMaps();
	

	//啟動媒體播放相關處理
	//===================================
	//
	//method.getPath();
	//
	//method.pageInit();
	//
	//method.init();
	//
	utils.userAgentProp();
	utils.detectBrowserVersion();
	//
	//method.choosePlayMode();
	//method.deployment();
	
	//
	/*$('.mediaWrapper').each(function(index) {
		method.embedMedia(index);
		
		//媒體介面是否有進場jQ動作 ? 
		//●這一定要在 method.embedMedia(index) 之後調用，所以移到各版型主程式調用。
		if(param.hasEnteringMotion){
			//媒體介面進場jQ動作 
			method.entering(index);
		}


	});*/
	//===================================
	
	
	g225A.helpMouseEvent();
	
	
	g225A.jumpOut();
	

});




//>>>=============================================================>>>
})(jQuery); //↑↑↑


























