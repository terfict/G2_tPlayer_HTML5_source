// JavaScript Document - G221A│g221A_Overlay.js
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
var g221A =  NOU.namespace('NOU.modules.g221A');
//------------------------
param.G2ID = "G221A";
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
			'padding':'0px 0px 60px 0px',
			'width':'100%'
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
		
		$('.linkToYoutube').css({'width':'100%'});
	};
	
	//>>>-------------------------------------------->>>
	
	//大尺寸
	method.normalCss = function(){
		$('.pageWrapper').css({
			'padding':'0px 0px 38px 0px',
			'width':'800px'
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
		
		$('.linkToYoutube').css({'width':'640px'});
	};
	
	//>>>-------------------------------------------->>>	
	
	
	
	
//>>>=============================================================>>>
})(jQuery); //↑↑↑














































