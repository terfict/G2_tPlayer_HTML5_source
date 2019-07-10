// JavaScript Document - G203│g203_Overlay.js
////////////////////////////////////////////////////////
/******************************************************/
var NOU = NOU || {};
//-----------------------------------------------------

(function($){ //↓↓↓
//>>>=============================================================>>>
var utils = NOU.namespace('NOU.modules.tPlayer.utils');
//------------------------
var urlObj = NOU.namespace('NOU.modules.tPlayer.urlObj');
//------------------------
var param = NOU.namespace('NOU.modules.tPlayer.param');
//------------------------
var method = NOU.namespace('NOU.modules.tPlayer.method');
//------------------------
var g203 =  NOU.namespace('NOU.modules.g203');
//------------------------
param.G2ID = "G203";
//------------------------
	
	
	//----------------------------------------------------------《《
	//◎◎◎●Video - 若賦值為　'streaming'　- 則連結遠端串流影音檔 │ 若賦值為　'local'　- 則連結近端影音檔
	//param.chooseSreamingOrLocalVideo = "streaming";
	//----------------------------------------------------------《《


	
	//1041202 - 設定轉換到RWD(小尺寸)的CSS 及 回到normal(大尺寸)的CSS
	//>>>-------------------------------------------->>>
	
	//小尺寸
	method.rwdCss = function(){
		$('body').css({'background':'#FFF'});
		$('.pageWrapper').css({
			'padding':'0px 0px 60px 0px',
			'width':'100%'
		});
		$('.g203_header').css({'margin':'0px 0px 0px 0px'});
		$('.mediaWrapper').css({'margin':'0px 0px 0px 0px'});
		$('.mediaHeader').css({
			'border-top-left-radius':'0px',
			'border-top-right-radius':'0px',
			'padding':'5px 0px 5px 0px'
		});
		$('.mediaHeaderString').css({'width':'100%'});
		$('.icon').css({'padding':'0 10px 0 23px'});
		$('.buttons').css({'width':'0%'});
		$('.help').css({'display':'none'});
		$('.notebook').css({'display':'none'});
		$('.g203_outline').css({
			'margin':'0px 0px 0px 0px',
			'padding':'20px 9px 3px 12px',
			'width':'100%',
			'height':'auto',
			'background':'#FFF'
		});
		
		//
		$('.fontSizeSwitcher').css({
			'background':'url()',
			'margin':'-10px auto 5px -2px'
		});
		//
		$('.zoomIconSpan').css({
			'display':'none'
		});
	};
	
	//>>>-------------------------------------------->>>
	
	//大尺寸
	method.normalCss = function(){
		$('body').css({'background':'#B39B82'});
		$('.pageWrapper').css({
			'padding':'0px 0px 0px 0px',
			'width':'800px'
		});
		$('.g203_header').css({'margin':'0px 0px 50px 0px'});
		$('.mediaWrapper').css({'margin':'0px 0px 0px 80px'});
		$('.mediaWrapper_fullScreen').css({'margin':'0px 0px 0px 0px'});
		$('.mediaHeader').css({
			'border-top-left-radius':'6px',
			'border-top-right-radius':'6px',
			'padding':'2px 0px 2px 0px'
		});
		$('.mediaHeaderString').css({'width':'82%'});
		$('.icon').css({'padding':'0 18px 0 15p'});
		$('.buttons').css({'width':'18%'});
		$('.help').css({'display':'table-cell'});
		$('.notebook').css({'display':'table-cell'});
		$('.g203_outline').css({
			'margin':'0px 0px 0px 23px',
			'padding':'15px 9px 3px 8px',
			'width':'310px',
			'height':'330px',
			'background':'transparent'
		});
		//
		$('.fontSizeSwitcher').css({
			'background':'url(' + param.mainPath + 'tPlayer_CSS/images/fontSizeSwitcherBg.png) no-repeat',
			'margin':'-10px 0px 5px auto'
		});
		//
		$('.zoomIconSpan').css({
			'display':'block'
		});
	};
	
	//>>>-------------------------------------------->>>




//>>>=============================================================>>>
})(jQuery); //↑↑↑














































