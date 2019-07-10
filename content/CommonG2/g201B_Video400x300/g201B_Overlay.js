// JavaScript Document - G201B│g201B_Overlay.js
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
var g201B =  NOU.namespace('NOU.modules.g201B');
//------------------------
param.G2ID = "G201B";
//------------------------

	
	//----------------------------------------------------------《《
	//◎◎◎●Video - 若賦值為　'streaming'　- 則連結遠端串流影音檔 │ 若賦值為　'local'　- 則連結近端影音檔
	//param.chooseSreamingOrLocalVideo = "streaming";
	//----------------------------------------------------------《《
	
	
	//1041202 - 設定轉換到RWD(小尺寸)的CSS 及 回到normal(大尺寸)的CSS
	//>>>-------------------------------------------->>>
	
	//小尺寸
	method.rwdCss = function(){
		$('.pageWrapper').css({
			'width':'100%',
			'background-position':'98% bottom'
		});
		//
		$('.g201B_header').css({'margin':'0 0 0px 0'});
		$('.g201B_headerString').css({
			'color':'#5e5e5e',
			'opacity':'1.0'
		});
		//
		$('.mediaHeader').css({
			'border-top-left-radius':'0px',
			'border-top-right-radius':'0px',
			'padding':'5px 0px 5px 0px'
		});
		$('.icon').css({'padding':'0px 10px 0px 23px'});
		$('.mediaHeaderString').css({'width':'100%'});
		$('.buttons').css({'width':'0%'});
		$('.help').css({'display':'none'});
		$('.notebook').css({'display':'none'});
	};
	
	//>>>-------------------------------------------->>>
	
	//大尺寸
	method.normalCss = function(){
		$('.pageWrapper').css({
			'width':'916px',
			'background-position':'center bottom '
		});
		//
		$('.g201B_header').css({'margin':'0 0 25px '});
		$('.g201B_headerString').css({
			'color':'#000',
			'opacity':'0.6'
		});
		//
		$('.mediaHeader').css({
			'border-top-left-radius':'6px',
			'border-top-right-radius':'6px',
			'padding':'2px 0px 2px 0px'
		});
		$('.icon').css({'padding':'0px 18px 0px 23px'});
		$('.mediaHeaderString').css({'width':'82%'});
		$('.buttons').css({'width':'18%'});
		$('.help').css({'display':'table-cell'});
		$('.notebook').css({'display':'table-cell'});
	};
	
	//>>>-------------------------------------------->>>






//>>>=============================================================>>>
})(jQuery); //↑↑↑














































