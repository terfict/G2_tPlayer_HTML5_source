﻿// JavaScript Document - G223A│g223A_Overlay.js
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
var g223A =  NOU.namespace('NOU.modules.g223A');
//------------------------
param.G2ID = "G223A";
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
		
	};
	
	//>>>-------------------------------------------->>>
	
	//大尺寸
	method.normalCss = function(){
		$('.pageWrapper').css({
			'padding':'0px 0px 30px 0px',
			'width':'800px'
		});
		
	};
	
	//>>>-------------------------------------------->>>






//>>>=============================================================>>>
})(jQuery); //↑↑↑













































