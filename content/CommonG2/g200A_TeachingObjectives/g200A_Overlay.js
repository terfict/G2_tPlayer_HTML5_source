// JavaScript Document - G200A│g200A_Overlay.js
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
var g200A =  NOU.namespace('NOU.modules.g200A');
//------------------------
param.G2ID = "G200A";
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
		$('.g200A_header').css({
		});
		//NOU Media圖示
		$('.g200A_nouIcon').css({
			'padding':'0 10px 0 20px'
		});
		$('.g200A_headerStringOuter').css({
		});
		$('.g200A_headerString').css({
			'padding':'3px 12px 3px 0px',
			'font-size':'1.0em'
		});
		
		//
		$('.g200A_rwdNavDiv').css({
			'display':'table',
			'display':'none',
			'width':'100%',
			'height':'auto',
			'background':'#FFF'
		});
		$('.g200A_prevBtn').css({
			'position':'static',
			'display':'inline-block',
			'float':'left',
			'text-align':'center',
			'width':'15%',
			'min-width':'10%'
		});
		$('.g200A_prevBtn > img').css({
			'width':'50px'
		});
		$('.g200A_nextBtn').css({
			'position':'static',
			'display':'inline-block',
			'float':'right',
			'text-align':'center',
			'width':'15%',
			'max-width':'10%'
		});
		$('.g200A_nextBtn > img').css({
			'width':'50px'
		});
		
		
		$('.g200A_pageNum').css({
			'display':'table',
			'margin':'0 auto 0 auto',
			'width':'80%',
			'height':'42px',
			'float':'left',
			'border-top-left-radius':'0px',
			'border-bottom-left-radius':'0px'
		});
		$('.g200A_pageNumStr').css({
			'display':'table-cell',
			'width':'100%',
			'height':'100%',
			'vertical-align':'middle',
			'border':'none'
		});
		
		
		$('.g200A_cardSet').css({
			'padding':'0px 0px 0px 0px',
			'width':'auto'
		});
		
		$('.textPhoto').css({
		});
		$('.textPhoto .inner').css({
		});
		$('.textPhoto .inner .title').css({
		});
		$('.textPhoto .inner .text').css({
		});
		$('.zoomIconSpan').css({
			'display':'none'
		});
		$('.fontSizeSwitcher').css({
			'background':'none'
		});

		$('.mediaHeader').css({
			'border-top-left-radius':'0px',
			'border-top-right-radius':'0px'
		});
		//$('.icon').css({});
		$('.mediaHeaderString').css({'width':'100%'});
		$('.buttons').css({'width':'0%'});
		//$('.help').css({'display':'none'});
		$('.notebook').css({'display':'none'});
		
		$('.g200A_help').css({'display':'none'});
		
	};
	
	//>>>-------------------------------------------->>>
	
	//大尺寸 - normal
	method.normalCss = function(){
		$('.pageWrapper').css({
			'width':'800px'
		});
		$('.g200A_header').css({
		});
		//NOU Media圖示
		$('.g200A_nouIcon').css({
			'padding':'0 5px 0 40px'
		});
		$('.g200A_headerStringOuter').css({
		});
		$('.g200A_headerString').css({
			'padding':'3px 12px 3px 12px',
			'font-size':'1.1em'
		});
		
		//
		$('.g200A_rwdNavDiv').css({
			'display':'none'
		});
		$('.g200A_prevBtn').css({
			'position':'fixed',
			//'display':'block',
			'display':'none',
			'float':'none',
			'text-align':'left',
			'width':'auto',
			'min-width':'none'
		});
		$('.g200A_prevBtn > img').css({
			'width':'70px'
		});
		$('.g200A_nextBtn').css({
			'position':'fixed',
			//'display':'block',
			'display':'none',
			'float':'none',
			'text-align':'left',
			'width':'auto',
			'max-width':'none'
		});
		$('.g200A_nextBtn > img').css({
			'width':'70px'
		});

		$('.g200A_cardSet').css({
		});
		
		$('.textPhoto').css({
		});
		$('.textPhoto .inner').css({
		});
		$('.textPhoto .inner .title').css({
		});
		$('.textPhoto .inner .text').css({
		});
		
		$('.zoomIconSpan').css({
			'display':'block'
		});
		
		$('.mediaHeader').css({
			'border-top-left-radius':'6px',
			'border-top-right-radius':'6px'
		});
		//$('.icon').css({});
		$('.mediaHeaderString').css({'width':'82%'});
		$('.buttons').css({'width':'18%'});
		//$('.help').css({'display':'table-cell'});
		$('.notebook').css({'display':'table-cell'});
		
		$('.g200A_help').css({'display':'inline-block'});
		
	};	
	
	//>>>-------------------------------------------->>>
	
	
	
//>>>=============================================================>>>
})(jQuery); //↑↑↑














































