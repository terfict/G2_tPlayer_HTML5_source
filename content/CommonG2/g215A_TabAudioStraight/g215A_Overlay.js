// JavaScript Document - G215A│g215A_Overlay.js
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
var g215A =  NOU.namespace('NOU.modules.g215A');
//------------------------
param.G2ID = "G215A";
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
			'height':'auto'
		});
		$('.g215A_header').css({
			'width':'100%'
		});
		$('.g215A_menuBtn').css({
		});
		$('.g215A_headerStringOuter').css({
			'padding':'3px 5px 3px 5px'
		});
		$('.g215A_headerString').css({
			'padding':'3px 15px 3px 0px',
			'font-size':'1.0em',
			'background':'transparent',
			'border':'none',
			'box-shadow':'none',
			'border-top-left-radius':'0px',
			'border-top-right-radius':'0px',
			'border-bottom-right-radius':'0px',
			'border-bottom-left-radius':'0px'
		});
		
		
		$('.g215A_rwdNavDiv').css({
			'display':'table',
			'width':'100%',
			'background':'#e3e3e3',
			'text-align':'center'
		});
		
		$('.prev_next_Btn_wrapper').css({
			'display':'none'
		});
		
		$('.g215A_prevBtn').css({
			'display':'inline-block',
			'float':'left',
			'width':'15%',
			'min-width':'10%'
		});
		$('.g215A_prevBtn > img').css({
		});
		$('.g215A_nextBtn').css({
			'display':'inline-block',
			'float':'right',
			'width':'15%',
			'min-width':'10%'
		});
		$('.g215A_nextBtn > img').css({
		});
		
		
		$('.g215A_pageNum').css({
			'display':'table',
			'margin':'0 auto 0 auto',
			'float':'left',
			'position':'static',
			'max-width':'80%',
			'width':'70%',
			'height':'42px'
		});
		$('.g215A_pageNumStr').css({
			'display':'table-cell',
			'height':'100%',
			'vertical-align':'middle',
			'background':'#553f65',
			'color':'#FFF',
			'border-top-left-radius':'3px',
			'border-top-right-radius':'3px',
			'border-bottom-right-radius':'3px',
			'border-bottom-left-radius':'3px'
		});
		$('.g215A_pageTotalStr').css({
			'color':'#AAA'
		});
		
		$('.g215A_horizon').css({
			'height':'0px'
		});
		$('.g215A_content').css({
			'width':'100%'
		});	
				
		$('.g215A_tabZone').css({
			'display':'none'
		});	
		
		$('.g215A_cardSet').css({
			'margin':'0px 0px 0px 0px',
			'width':'100%',
			'height':'auto'
		});
		$('.g215A_card').css({
			'width':'100%',
			'height':'auto'
		});
		
		
		$('.textPhoto').css({
			'height':'auto'
		});
		$('.textPhoto .inner').css({
			'padding':'20px 30px 36px 30px'
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
		$('.icon').css({
		});
		$('.mediaHeaderString').css({'width':'100%'});
		$('.buttons').css({'width':'0%'});
		$('.help').css({'display':'none'});
		$('.notebook').css({'display':'none'});
		
	};
	
	//>>>-------------------------------------------->>>
	
	//大尺寸 - normal
	method.normalCss = function(){
		$('.pageWrapper').css({
			'width':'800px',
			'height':'600px'
		});
		$('.g215A_header').css({
			'width':'800px'
		});
		$('.g215A_menuBtn').css({
		});
		$('.g215A_headerStringOuter').css({
			'padding':'0px 12px 2px 3px'
		});
		$('.g215A_headerString').css({
			'padding':'3px 15px 3px 15px',
			'font-size':'1.05em',
			'background':'#FFF',
			'border':'#666 1px solid',
			'box-shadow':'2px 1px 2px #fff',
			'border-top-left-radius':'18px',
			'border-top-right-radius':'18px',
			'border-bottom-right-radius':'18px',
			'border-bottom-left-radius':'18px'
		});
		
		
		$('.g215A_rwdNavDiv').css({
			'display':'none'
		});
		
		$('.prev_next_Btn_wrapper').css({
			'margin':'5px 10px 0 0',
			'width':'114px',
			'height':'43px',
			'display':'inline-block',
			'background':'url(' + param.mainPath + 'g215A_TabAudioStraight/images/prev_next_Btn_wrapper.png) no-repeat'
		});
		
		$('.g215A_prevBtn').css({
			'display':'table-cell',
			'float':'none',
			'width':'auto',
			'min-width':'none'
		});
		$('.g215A_prevBtn > img').css({
		});
		$('.g215A_nextBtn').css({
			'display':'table-cell',
			'float':'none',
			'width':'auto',
			'min-width':'none'
		});
		$('.g215A_nextBtn > img').css({
		});
		
		$('.g215A_pageNum').css({
			'display':'none',
			'margin':'0 0 0 0',
			'float':'none',
			'position':'absolute',
			'max-width':'none',
			'width':'10%',
			'height':'auto'
		});
		$('.g215A_pageNumStr').css({
			'display':'inline-block',
			'height':'auto',
			'vertical-align':'top',
			'background':'#cde2c5',
			'color':'#3c3b36',
			'border-top-left-radius':'5px',
			'border-top-right-radius':'0px',
			'border-bottom-right-radius':'0px',
			'border-bottom-left-radius':'5px'
		});
		$('.g215A_pageTotalStr').css({
			'color':'#3c3b36'
		});
		
		$('.g215A_horizon').css({
			'height':'3px'
		});
		$('.g215A_content').css({
			'width':'800px'
		});	
		
		$('.g215A_tabZone').css({
			'display':'inline-block'
		});
		
		$('.g215A_cardSet').css({
			'margin':'20px 0px 0px 0px',
			'width':'489px',
			'height':'457px'
		});
		$('.g215A_card').css({
			'width':'489px',
			'height':'457px'
		});
		
		
		$('.textPhoto').css({
			'height':'400px'
		});
		$('.textPhoto .inner').css({
			'padding':'20px 36px 36px 36px'
		});
		$('.textPhoto .inner .text').css({
		});
		$('.zoomIconSpan').css({
			'display':'block'
		});
		$('.fontSizeSwitcher').css({
			'background':'url(' + param.mainPath + 'tPlayer_CSS/images/fontSizeSwitcherBg.png) no-repeat'
		});
		
		
		$('.mediaHeader').css({
			'border-top-left-radius':'12px',
			'border-top-right-radius':'12px'
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














































