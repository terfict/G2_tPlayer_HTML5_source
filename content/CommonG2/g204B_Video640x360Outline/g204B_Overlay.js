// JavaScript Document - G204B│g204B_Overlay.js
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
var g204B =  NOU.namespace('NOU.modules.g204B');
//------------------------
param.G2ID = "G204B";
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
		//
		$('.g204B_outlineWrapper').css({
			'padding':'0 0 0 0',
			'position':'static',
			'width':'100%',
			'height':'auto',
			'display':'block',
			'background':'#FFF url()'
		});
		$('.g204B_outline').css({
			'padding':'0px 15px 5px 20px',
			'width':'100%',
			'height':'auto'
		});
		$('.g204B_subtitle').css({'margin':'-10px 0px 5px 5px'});
		$('.showHideOutlineBtnDiv').css({'display':'none'});
		//
		$('.fontSizeSwitcher').css({
			'background':'url()',
			'margin':'0px -5px 0px auto',
			'top':'12px'
		});
		//
		$('.zoomIconSpan').css({
			'display':'none'
		});
	};
	
	//>>>-------------------------------------------->>>
	
	//大尺寸
	method.normalCss = function(){
		$('.pageWrapper').css({
			'padding':'36px 0px 0px 0px',
			'width':'830px'
		});
		$('.mediaHeader').css({
			'border-top-left-radius':'6px',
			'border-top-right-radius':'6px'
		});
		$('.icon').css({'padding':'0 15px 0 23px'});
		$('.mediaHeaderString').css({'width':'82%'});
		$('.buttons').css({'width':'18%'});
		$('.help').css({'display':'table-cell'});
		$('.notebook').css({'display':'table-cell'});
		//
		$('.g204B_outlineWrapper').css({
			'padding':'30px 0 0 0',
			'position':'absolute',
			'width':'400px',
			'height':'405px',
			'display':'none',
			'background':'url(' + param.mainPath + 'g204B_Video640x360Outline/images/outlineZoneBg.png) no-repeat'
		});
		$('.g204B_outline').css({
			'padding':'0px 15px 5px 25px',
			'width':'383px',
			'height':'330px'
		});
		$('.g204B_subtitle').css({'margin':':0px 0px 12px 5px'});
		$('.showHideOutlineBtnDiv').css({'display':'block'});
		//
		$('.fontSizeSwitcher').css({
			'background':'url(' + param.mainPath + 'tPlayer_CSS/images/fontSizeSwitcherBg.png) no-repeat',
			'margin':'-15px -5px 0px auto',
			'top':'25px'
		});
		//
		$('.zoomIconSpan').css({
			'display':'block'
		});
	};
	
	//>>>-------------------------------------------->>>	
	
	
	
	
//>>>=============================================================>>>
})(jQuery); //↑↑↑














































