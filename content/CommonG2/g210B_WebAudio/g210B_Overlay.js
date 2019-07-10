// JavaScript Document - G210B│G210B_Overlay.js
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
var g210B =  NOU.namespace('NOU.modules.g210B');
//------------------------
param.G2ID = "G210B";
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

		$('.textPhoto .inner').css({
			'padding':'20px 30px 36px 30px'
		});
		$('.textPhoto .inner .text').css({
			'line-height':'1.7em'
		});
		$('.zoomIconSpan').css({
			'display':'none'
		});
		$('.fontSizeSwitcher').css({
			'background':'url()'
		});
		
		
		$('.mediaHeader').css({
			'border-top-left-radius':'0px',
			'border-top-right-radius':'0px'
		});
		$('.icon').css({'padding':'0 10px 0 17px'});
		$('.mediaHeaderString').css({'width':'100%'});
		$('.buttons').css({'width':'0%'});
		$('.help').css({'display':'none'});
		$('.notebook').css({'display':'none'});
		
	};
	
	//>>>-------------------------------------------->>>
	
	//大尺寸 - normal
	method.normalCss = function(){
		
		$('.pageWrapper').css({
			'width':'800px'
		});

		$('.textPhoto .inner').css({
			'padding':'20px 36px 36px 36px'
		});
		$('.textPhoto .inner .text').css({
			'line-height':'1.6em'
		});
		$('.zoomIconSpan').css({
			'display':'block'
		});
		$('.fontSizeSwitcher').css({
			'background':'url(' + param.mainPath + 'tPlayer_CSS/images/fontSizeSwitcherBg.png) no-repeat'
		});
		
		
		$('.mediaHeader').css({
			'border-top-left-radius':'6px',
			'border-top-right-radius':'6px'
		});
		$('.icon').css({'padding':'0 10px 0 23px'});
		$('.mediaHeaderString').css({'width':'82%'});
		$('.buttons').css({'width':'18%'});
		$('.help').css({'display':'table-cell'});
		$('.notebook').css({'display':'table-cell'});
		
	};	
	
	//>>>-------------------------------------------->>>
	
	
//>>>=============================================================>>>
})(jQuery); //↑↑↑














































