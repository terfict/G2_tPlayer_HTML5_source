// JavaScript Document - G211B│G211B_Overlay.js
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
var g211B =  NOU.namespace('NOU.modules.g211B');
//------------------------
param.G2ID = "G211B";
//------------------------
	
	
	//----------------------------------------------------------《《
	//◎◎◎●Video - 若賦值為　'streaming'　- 則連結遠端串流影音檔 │ 若賦值為　'local'　- 則連結近端影音檔
	//param.chooseSreamingOrLocalVideo = "streaming";
	//----------------------------------------------------------《《


	
	//1041208 - 《IE6~IE8》 設定轉換到RWD(小尺寸)的CSS 及 回到normal(大尺寸)的CSS
	//>>>-------------------------------------------->>>
	
	//小尺寸 - rwd
	method.rwdCss = function(){
		/*頁面最大容器*/
		$('.pageWrapper').css({
		});
		
		/*最上方標題列 - 大容器*/
		$('.g211B_header').css({
			'height':'60px',
		});
		
		/*menu按鈕*/
		$('.g211B_menuBtn').css({
			'background':'transparent'
		});
		
		/*單元標題 - 標題字串g211B_headerString的容器*/
		$('.g211B_headerStringOuter').css({
			'padding':'3px 5px 3px 5px',
		});
		/*單元標題 - 標題字串*/
		$('.g211B_headerString').css({
			'background':'transparent',
			'color':'#f6ac6d',
			'box-shadow':'none'
		});
		
		/*小尺寸視窗會用到，包裹.g211B_prevBtn、.g211B_nextBtn、.g211B_pageNum*/
		$('.g211B_rwdNavDiv').css({
			'display':'table',
			'width':'100%',
			'height':'42px',
			'background':'#FFF'
		});
		
		/*上一頁按鈕*/
		$('.g211B_prevBtn').css({
			'position':'static',
			'display':'inline-block',
			'padding':'5px 9px 5px 9px',
			'width':'10%',
			'max-height':'42px',
			'float':'left',
			'text-align':'center'
		});
		$('.g211B_prevBtn > img').css({
			/**/
			'width':'20px',
			'max-height':'32px'
		});
		
		/*下一頁按鈕*/
		$('.g211B_nextBtn').css({
			'position':'static',
			'display':'inline-block',
			'padding':'5px 9px 5px 9px',
			'width':'10%',
			'max-height':'42px',
			'float':'right',
			'text-align':'center'
		});
		$('.g211B_nextBtn > img').css({
			/*IE9以下專用，與其他瀏覽器CSS不同*/
			'width':'20px',
			'max-height':'32px'
		});
		
		/*第幾頁/共幾頁 的容器*/
		$('.g211B_pageNum').css({
			'display':'table',
			'margin':'0 auto 0 auto',
			'width':'80%',
			'height':'42px',
			'float':'left'
			
		});
		/*第幾頁*/
		$('.g211B_pageNumStr').css({
			'display':'table-cell',
			'height':'100%',
			'background':'#88138F url(' + param.mainPath + 'g211B_SlideMultiMedia/images/red-pattern-texture-lines.jpg)',
			'vertical-align':'middle',
			'color':'#630211'
		});
		/*共幾頁*/
		$('.g211B_pageTotalStr').css({
			'font-size':'0.8em',
			'color':'#9d162c'
		});
		
		/*所有.g211B_card的容器*/
		$('.g211B_cardGroup').css({
		});
	
	};
	
	//>>>-------------------------------------------->>>
	
	//大尺寸 - normal
	method.normalCss = function(){
		/*頁面最大容器*/
		$('.pageWrapper').css({
		});
		
		$('.g211B_header').css({
			'height':'56px'
		});
		$('.g211B_menuBtn').css({
		});
		$('.g211B_menuCloseBtn > img').css({
		});
		$('.g211B_headerStringOuter').css({
			'padding':'0px 12px 2px 3px'
		});
		$('.g211B_headerString').css({
			'background':'#c7c67d',
			'color':'#605c6b',
			'box-shadow':'4px 4px 3px rgba(20%,20%,20%,0.3)'
		});
		
		/*小尺寸視窗會用到，包裹.g211B_prevBtn、.g211B_nextBtn、.g211B_pageNum*/
		$('.g211B_rwdNavDiv').css({
			'display':'none'
		});
		
		/*上一頁按鈕*/
		$('.g211B_prevBtn').css({
			'position':'fixed',
			'right':'0px',
			'top':'150px',
			'z-index':'2010',
			'padding':'10px 18px 10px 18px',
			'background':'#f00530',
			'cursor':'pointer',
			'width':'auto',
			'max-height':'none',
			'float':'none'
		});
		$('.g211B_prevBtn > img').css({
			'width':'38px',
			'max-height':'none'
		});
		
		/*下一頁按鈕*/
		$('.g211B_nextBtn').css({
			'position':'fixed',
			'right':'0px',
			'top':'245px',
			'z-index':'2010',
			'padding':'10px 18px 10px 18px',
			'background':'#f00530',
			'width':'auto',
			'max-height':'none',
			'float':'none'
		});
		$('.g211B_nextBtn > img').css({
			'width':'38px',
			'max-height':'none'
		});
		
		/*第幾頁/共幾頁 的容器*/
		$('.g211B_pageNum').css({
			'display':'table-cell',
			'vertical-align':'middle',
			'margin':'0 0 0 0',
			'width':'10%',
			'height':'auto',
			'float':'none'
		});
		/*第幾頁*/
		$('.g211B_pageNumStr').css({
			'display':'inline-block',
			'height':'auto',
			'background':'#88138F url()',
			'vertical-align':'middle',
			'color':'#DDD'
		});
		/*共幾頁*/
		$('.g211B_pageTotalStr').css({
			'font-size':'0.8em',
			'color':'#AAA'
		});
		
		/*所有.g211B_card的容器*/
		$('.g211B_cardGroup').css({
		});
		
		
	};	
	
	//>>>-------------------------------------------->>>
	
	
	
//>>>=============================================================>>>
})(jQuery); //↑↑↑














































