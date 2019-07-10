// JavaScript Document - G217A│g217A_Overlay.js
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
var g217A =  NOU.namespace('NOU.modules.g217A');
//------------------------
param.G2ID = "G217A";
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
		$('.g217A_header').css({
		});
		//NOU Media圖示
		$('.g217A_nouIcon').css({
			'padding':'0 10px 0 20px'
		});
		$('.g217A_headerStringOuter').css({
		});
		$('.g217A_headerString').css({
			'padding':'3px 12px 3px 0px',
			'font-size':'1.0em'
		});
		
		//
		$('.g217A_rwdNavDiv').css({
			'display':'table',
			'width':'100%',
			'height':'auto',
			'background':'#FFF'
		});
		$('.g217A_prevBtn').css({
			'position':'static',
			'display':'inline-block',
			'float':'left',
			'text-align':'center',
			'width':'15%',
			'min-width':'10%'
		});
		$('.g217A_prevBtn > img').css({
			'width':'50px'
		});
		$('.g217A_nextBtn').css({
			'position':'static',
			'display':'inline-block',
			'float':'right',
			'text-align':'center',
			'width':'15%',
			'max-width':'10%'
		});
		$('.g217A_nextBtn > img').css({
			'width':'50px'
		});
		
		
		$('.g217A_pageNum').css({
			'display':'table',
			'margin':'0 auto 0 auto',
			'width':'80%',
			'height':'42px',
			'float':'left',
			'border-top-left-radius':'0px',
			'border-bottom-left-radius':'0px'
		});
		$('.g217A_pageNumStr').css({
			'display':'table-cell',
			'width':'100%',
			'height':'100%',
			'vertical-align':'middle',
			'border':'none'
		});
		
		
		$('.g217A_cardSet').css({
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
		
		$('.g217A_help').css({'display':'none'});
		
	};
	
	//>>>-------------------------------------------->>>
	
	//大尺寸 - normal
	method.normalCss = function(){
		$('.pageWrapper').css({
			'width':'800px'
		});
		$('.g217A_header').css({
		});
		//NOU Media圖示
		$('.g217A_nouIcon').css({
			'padding':'0 15px 0 90px'
		});
		$('.g217A_headerStringOuter').css({
		});
		$('.g217A_headerString').css({
			'padding':'3px 12px 3px 12px',
			'font-size':'1.1em'
		});
		
		//
		$('.g217A_rwdNavDiv').css({
			'display':'none'
		});
		$('.g217A_prevBtn').css({
			'position':'fixed',
			'display':'block',
			'float':'none',
			'text-align':'left',
			'width':'auto',
			'min-width':'none'
		});
		$('.g217A_prevBtn > img').css({
			'width':'70px'
		});
		$('.g217A_nextBtn').css({
			'position':'fixed',
			'display':'block',
			'float':'none',
			'text-align':'left',
			'width':'auto',
			'max-width':'none'
		});
		$('.g217A_nextBtn > img').css({
			'width':'70px'
		});

		$('.g217A_cardSet').css({
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
		
		$('.g217A_help').css({'display':'inline-block'});
		
	};	
	
	//>>>-------------------------------------------->>>
	
	
	
//>>>=============================================================>>>
})(jQuery); //↑↑↑














































