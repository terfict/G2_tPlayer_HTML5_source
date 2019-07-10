// JavaScript Document - G200B│g200B_Overlay.js
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
var g200B =  NOU.namespace('NOU.modules.g200B');
//------------------------
param.G2ID = "G200B";
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
		
		$('.teacherInfo').css({
			'width':'100%'
		});
		$('td.item_name').css({
			'width':'20%'
		});
		$('td.item_value').css({
			'width':'80%'
		});
		$('.teacherPicTable img').css({
			'width':'100%'
		});
		
		$('.fontSizeSwitcher').css({
			'background':'url()'
		});
		
	};
	
	//>>>-------------------------------------------->>>
	
	//大尺寸 - normal
	method.normalCss = function(){
		$('.pageWrapper').css({
			'width':'800px'
		});
		
		$('.teacherInfo').css({
			'width':'93%'
		});
		$('td.item_name').css({
			'min-width':'100px'
		});
		$('td.item_value').css({
			'min-width':'100px'
		});
		$('.teacherPicTable img').css({
			'width':'auto'
		});
		
		$('.fontSizeSwitcher').css({
			'background':'url(' + param.mainPath + 'tPlayer_CSS/images/fontSizeSwitcherBg.png) no-repeat'
		});

	};	
	
	//>>>-------------------------------------------->>>
	
	
//>>>=============================================================>>>
})(jQuery); //↑↑↑














































