// JavaScript Document - G220A│g220A_Overlay.js
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
var g220A =  NOU.namespace('NOU.modules.g220A');
//------------------------
param.G2ID = "G220A";
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
		
		
		
		


	};
		
	//>>>-------------------------------------------->>>
	
	
	//大尺寸 - normal
	method.normalCss = function(){
		$('.pageWrapper').css({
			'width':'800px'
		});
		
		
		
		
		
	};
	
	
	
	
//>>>=============================================================>>>
})(jQuery); //↑↑↑














































