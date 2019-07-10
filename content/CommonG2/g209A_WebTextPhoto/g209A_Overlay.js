// JavaScript Document - G209A│g209A_Overlay.js
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
var g209A =  NOU.namespace('NOU.modules.g209A');
//------------------------
param.G2ID = "G209A";
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
			'width':'100%',
			'height':'auto',
			'padding':'0 0 30px 0',
			'background-position':'50% 0px'
		});
		$('.textPhoto').css({
			'width':'95%',
			'height':'auto'
		});
		$('.zoomIconSpan').css({
			'display':'none'
		});
		$('.fontSizeSwitcher').css({
			'background':'url()'
		});
		$('.buttons').css({
			'display':'none'
		});

	};
	
	//>>>-------------------------------------------->>>
	
	//大尺寸 - normal
	method.normalCss = function(){
		$('.pageWrapper').css({
			'width':'800px',
			'height':'600px',
			'padding':'0 0 0 0',
			'background-position':'0px 0px'
		});
		$('.textPhoto').css({
			'width':'90%',
			'height':'440px'
		});
		$('.zoomIconSpan').css({
			'display':'block'
		});
		$('.fontSizeSwitcher').css({
			'background':'url(' + param.mainPath + 'tPlayer_CSS/images/fontSizeSwitcherBg.png) no-repeat'
		});
		$('.buttons').css({
			'display':'block'
		});
		
	};	
	
	//>>>-------------------------------------------->>>
	
	
	
	
	
//>>>=============================================================>>>
})(jQuery); //↑↑↑














































