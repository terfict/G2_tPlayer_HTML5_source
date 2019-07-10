// JavaScript Document - G227A│g227A_Overlay.js
////////////////////////////////////////////////////////
/******************************************************/
var NOU = NOU || {};
//-----------------------------------------------------

(function($){ //↓↓↓
//>>>=============================================================>>>
var tPlayer = NOU.namespace('NOU.modules.tPlayer');
//------------------------
var param = NOU.namespace('NOU.modules.tPlayer.param');
//------------------------
var method = NOU.namespace('NOU.modules.tPlayer.method');
//------------------------
var g227A =  NOU.namespace('NOU.modules.g227A');
//------------------------
param.G2ID = "G227A";
//------------------------

	
	//----------------------------------------------------------《《
	//◎◎◎●Video - 若賦值為　'streaming'　- 則連結遠端串流影音檔 │ 若賦值為　'local'　- 則連結近端影音檔
	//param.chooseSreamingOrLocalVideo = "streaming";
	//----------------------------------------------------------《《

	
	
	//1041208 - 《IE6~IE8》 設定轉換到RWD(小尺寸)的CSS 及 回到normal(大尺寸)的CSS
	//>>>-------------------------------------------->>>
	
	
	//小尺寸 - rwd
	method.rwdCss = function(){
		$('.pageWrapper').css({
			'width':'100%'
		});
		
		$('.g227A_header').css({
		});
		
		//
		$('.g227A_minus_plus').css({
			'display':'none'
		});
		
		//
		$('.g227A_controlBar').css({
			'display':'none'
		});
		
		$('.g227A_card').css({
		});

		$('.g227A_menuZone').css({
			'width':'100%'
		});
		
		$('.g227A_menuButton').css({
			'margin':'2px 0px 0px 10px'
		});
		
		$('.fontSizeSwitcher').css({
			'float':'none',
			'margin':'0 0 0 0',
			'position':'fixed',
			'bottom':'0px',
			'right':'0px'
		});


	};
		
	//>>>-------------------------------------------->>>
	
	
	//大尺寸 - normal
	method.normalCss = function(){
		$('.pageWrapper').css({
			'width':'800px'
		});
		
		$('.g227A_header').css({
		});
		
		//
		$('.g227A_minus_plus').css({
			'display':'table-cell'
		});
		
		//
		$('.g227A_controlBar').css({
			'display':'inline-block'
		});
		
		$('.g227A_card').css({
		});
		
		$('.g227A_menuZone').css({
			'width':'350px'
		});
		
		$('.g227A_menuButton').css({
			'margin':'2px 0px 2px 0px'
		});
		
		$('.fontSizeSwitcher').css({
			'float':'right',
			'margin':'-28px 16px 0 0',
			'position':'relative',
			'z-index':'10',
			'bottom':'auto',
			'right':'auto'

		});
		
	};
	
	
	
	
//>>>=============================================================>>>
})(jQuery); //↑↑↑














































