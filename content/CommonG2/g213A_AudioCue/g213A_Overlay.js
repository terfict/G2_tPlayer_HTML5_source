// JavaScript Document - G213A│g213A_Overlay.js
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
var g213A =  NOU.namespace('NOU.modules.g213A');
//------------------------
param.G2ID = "G213A";
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
		
		$('.g213A_header').css({
			'height':'0px'
		});
		
		$('.g213A_cardGroupShow').css({
			'width':'100%',
			'margin-bottom':'0px auto -10px auto'
		});
		
		$('.g213A_card').css({
		});
		
		$('.g213A_numButtonGroup').css({
			'width':'100%',
			/*●margin-top設為-10px：因在小視窗，.g213A_cardGroupShow和.g213A_numButtonGroup之間會出現水平間隙，補救用*/
			'margin':'-10px auto 0 auto'  //原css為margin:0 auto 0 auto
		});
		
		$('.g213A_showCueTitle').css({
			'width':'100%'
		});
		
		$('.g213A_menuZone').css({
			'width':'100%'
		});
		
		$('.g213A_menuButton').css({
			'margin':'2px 0px 0px 10px'
		});
		
		
		$('.mediaHeader').css({
		});
		$('.icon').css({
			'padding':'0 10px 0 15px'
		});
		$('.mediaHeaderString').css({
			'width':'100%'
		});
		$('.buttons').css({
		});
		$('.help').css({
			'display':'none'
		});
		$('.notebook').css({
			'display':'none'
		});
		
		
		
		
	};
		
	//>>>-------------------------------------------->>>
	
	
	//大尺寸 - normal
	method.normalCss = function(){
		$('.pageWrapper').css({
			'width':'800px'
		});
		
		$('.g213A_header').css({
			'height':'20px'
		});
		
		$('.g213A_cardGroupShow').css({
			'width':'640px',
			'margin':'0px auto 0px auto'
		});
		
		$('.g213A_card').css({
		});
		
		$('.g213A_numButtonGroup').css({
			'width':'640px',
			//為IE8微調
			'margin':'0 auto 0 auto'
		});
		
		$('.g213A_showCueTitle').css({
			'width':'640px'
		});
		
		$('.g213A_menuZone').css({
			'width':'640px'
		});
		
		$('.g213A_menuButton').css({
			'margin':'2px 0px 2px 0px'
		});
		
		
		$('.mediaHeader').css({
		});
		$('.icon').css({
			'padding':'0 10px 0 23px'
		});
		$('.mediaHeaderString').css({
			'width':'，82%'
		});
		$('.buttons').css({
		});
		$('.help').css({
			'display':'table-cell'
		});
		$('.notebook').css({
			'display':'table-cell'
		});
		
		
		
		
	};
	
	
	
	
//>>>=============================================================>>>
})(jQuery); //↑↑↑














































