// JavaScript Document - G210A│g210A_Overlay.js
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
var g210A =  NOU.namespace('NOU.modules.g210A');
//------------------------
param.G2ID = "G210A";
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
			'background-position':'50% 0px',
		});
		$('.g210_header').css({
			'height':'0px'
		});
		$('.textPhoto').css({
			'width':'100%',
			'height':'auto',
			'border':'0px',
			'padding':'20px 10px 10px 10px'
		});
		$('.textPhoto .inner').css({
			'padding':'20px 12px 20px 12px',
			'border':'solid #D5D5D5 1px'
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
			'width':'800px',
			'height':'600px',
			'padding':'0 0 0 0',
			'background-position':'0px 0px'
		});
		$('.g210_header').css({
		});
		$('.textPhoto').css({
			'width':'90%',
			'height':'440px',
			'border':'dotted #D5D5D5 2px',
			'padding':'5px 10px 10px 10px'
		});
		$('.textPhoto .inner').css({
			'padding':'20px 20px 20px 20px',
			'border':' dashed #adcd6c 0px'
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














































