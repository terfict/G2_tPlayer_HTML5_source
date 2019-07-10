// JavaScript Document - G211A│G211A_Overlay.js
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
var g211A =  NOU.namespace('NOU.modules.g211A');
//------------------------
param.G2ID = "G211A";
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
			'width':'100%',
			'height':'auto',
			'background':'url(' + param.mainPath + 'g211A_SlideMultiMedia/images/pattern-38657_1280.png)'
		});
		$('.g211A_header').css({
			'height':'60px',
			'background':'#7C8F52'
		});
		$('.g211A_menuBtn').css({
			'background':'transparent'
		});
		$('.g211A_headerStringOuter').css({
			'padding':'3px 5px 3px 5px',
			'background':'#7C8F52'
		});
		$('.g211A_headerString').css({
			'background':'transparent',
			'color':'#FFF',
			'box-shadow':'none'
		});
		
		
		$('.g211A_rwdNavDiv').css({
			'display':'table',
			'width':'100%',
			'height':'42px',
			'background':'#74c461'
		});
		$('.g211A_prevBtn').css({
			'position':'static',
			'display':'inline-block',
			'padding':'5px 9px 5px 9px',
			'width':'10%',
			'max-height':'42px',
			'float':'left',
			'text-align':'center',
			'cursor':'pointer',
			'background':'url(' + param.mainPath + 'g211A_SlideMultiMedia/images/pattern-38657_1280.png)',
			'border-top-right-radius':'0px',
			'border-bottom-right-radius':'0px'
		});
		$('.g211A_prevBtn > img').css({
			/**/
			'width':'20px',
			'max-height':'32px'
		});
		$('.g211A_nextBtn').css({
			'position':'static',
			'display':'inline-block',
			'padding':'5px 9px 5px 9px',
			'width':'10%',
			'max-height':'42px',
			'float':'right',
			'text-align':'center',
			'cursor':'pointer',
			'background':'url(' + param.mainPath + 'g211A_SlideMultiMedia/images/pattern-38657_1280.png)',
			'border-top-left-radius':'0px',
			'border-bottom-left-radius':'0px'
		});
		$('.g211A_nextBtn > img').css({
			/**/
			'width':'20px',
			'max-height':'32px'
		});
		
		
		$('.g211A_pageNum').css({
			'display':'table',
			'margin':'0 auto 0 auto',
			'width':'80%',
			'height':'42px',
			'float':'left',
			'border-top-left-radius':'0px',
			'border-bottom-left-radius':'0px'
		});
		$('.g211A_pageNumStr').css({
			'display':'table-cell',
			'width':'100%',
			'height':'100%',
			'background':'#74c461 url(' + param.mainPath + 'g211A_SlideMultiMedia/images/pattern-38657_1280.png)',
			'vertical-align':'middle',
			'border':'none'
		});
		
		
		$('.g211A_cardSet').css({
			'padding':'0px 0px 0px 0px',
			'width':'auto'
		});
		
		$('.textPhoto').css({
			'width':'100%'
		});
		$('.textPhoto .inner').css({
			'padding':'20px 30px 36px 30px'
		});
		$('.textPhoto .inner .text').css({
			'line-height':'1.7em'
		});
		$('.zoomIconSpan').css({
			'display':'none'
		});
		$('.fontSizeSwitcher').css({
			'background':'url()'
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
		
	};
	
	//>>>-------------------------------------------->>>
	
	//大尺寸 - normal
	method.normalCss = function(){
		$('.pageWrapper').css({
			'width':'auto',
			'height':'100%',
			'background':'#133E11 url()'
		});
		$('.g211A_header').css({
			'height':'56px',
			'background':'#1a1a1a url(' + param.mainPath + 'g211A_SlideMultiMedia/images/pattern-38657_1280.png) 0px 0px'
		});
		$('.g211A_menuBtn').css({
			'background':'transparent'
		});
		$('.g211A_headerStringOuter').css({
			'padding':'0px 12px 2px 3px',
			'background':'transparent'
		});
		$('.g211A_headerString').css({
			'background':'#21643a',
			'color':'#f9f95d',
			'box-shadow':'4px 4px 3px rgba(20%,20%,20%,0.5)',
			'box-shadow':'2px 2px 1px rgba(20%,20%,20%,0.5) inset',
			'box-shadow':'2px 2px 2px rgba(20%,20%,20%,0.6),4px 4px 6px rgba(20%,20%,20%,0.4),6px 6px 12px rgba(20%,20%,20%,0.4)'
		});
		
		
		/*$('.g211A_rwdNavDiv').css({
			'display':'none'
		});*/
		$('.g211A_prevBtn').css({
			'position':'fixed',
			'display':'block',
			'padding':'10px 18px 10px 18px',
			'width':'auto',
			'max-height':'none',
			'float':'none',
			'text-align':'center',
			'cursor':'pointer',
			'background':'#AB3B3C url()',
			'border-top-right-radius':'10px',
			'border-bottom-right-radius':'10px'
		});
		$('.g211A_prevBtn > img').css({
			'width':'38px',
			'max-height':'none'
		});
		$('.g211A_nextBtn').css({
			'position':'fixed',
			'display':'block',
			'padding':'10px 18px 10px 18px',
			'width':'auto',
			'max-height':'none',
			'float':'none',
			'text-align':'center',
			'cursor':'pointer',
			'background':'#AB3B3C url()',
			'border-top-left-radius':'10px',
			'border-bottom-left-radius':'10px'
		});
		$('.g211A_nextBtn > img').css({
			'width':'38px',
			'max-height':'none'
		});
		
		$('.g211A_pageNum').css({
			'display':'table-cell',
			'vertical-align':'middle',
			'margin':'0 0 0 0',
			'width':'10%',
			'height':'auto',
			'float':'none',
			'border-top-left-radius':'3px',
			'border-bottom-left-radius':'3px'
		});
		$('.g211A_pageNumStr').css({
			'display':'inline-block',
			'height':'auto',
			'background':'#74c461 url()',
			'vertical-align':'top',
			'border':':1px solid #A3C35A'
		});
		
		
		$('.g211A_cardSet').css({
			'padding':'30px 0px 60px 0px',
			'width':'100%'
		});
		
		$('.textPhoto').css({
			'width':'640px'
		});
		$('.textPhoto .inner').css({
			'padding':'20px 36px 36px 36px'
		});
		$('.textPhoto .inner .text').css({
			'line-height':'1.6em'
		});
		$('.zoomIconSpan').css({
			'display':'block'
		});
		$('.fontSizeSwitcher').css({
			'background':'url(' + param.mainPath + 'tPlayer_CSS/images/fontSizeSwitcherBg.png) no-repeat'
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
		
	};	
	
	//>>>-------------------------------------------->>>
	
	
//>>>=============================================================>>>
})(jQuery); //↑↑↑














































