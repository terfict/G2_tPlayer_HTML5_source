// JavaScript Document - G212A│g212A_Overlay.js
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
var g212A =  NOU.namespace('NOU.modules.g212A');
//------------------------
param.G2ID = "G212A";
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
		$('.g212A_header').css({
			'padding':'0 5px 0 0',
			'background':'#354360'
		});
		
		/*menu按鈕外圍容器*/
		$('.g212A_menuBtnOuter').css({
			'width':'75px',
			'min-width':'inherit'
		});
		
		/*menu按鈕*/
		$('.g212A_menuBtn').css({
		});
		
		/*單元標題 - 標題字串g212A_headerString的容器*/
		$('.g212A_headerStringOuter').css({
			'padding':'0px 0px 0px 0px',
			'background':'none',
			'text-align':'left',
			'width':'auto',
			'max-width':'none',
			'min-width':'inherit',
			'overflow':'visible'
		});
		/*單元標題 - 標題字串*/
		$('.g212A_headerString').css({
			'width':'100%',
			'font-weight':'600',
			'white-space':'normal',
			'word-wrap':' break-word',
			'word-break':'break-all'
		});
		
		/*小尺寸視窗會用到，包裹.g212A_prevBtn、.g212A_nextBtn、.g212A_pageNum*/
		$('.g212A_rwdNavDiv').css({
			'display':'table',
			'width':'100%',
			'height':'42px',
			'background':'#FFF',
			'border-bottom':'#C5C5C5 1px dashed'
		});
		
		/*上一頁按鈕*/
		$('.g212A_prevBtn').css({
			'margin':'0 0 0 0',
			'width':'10%',
			'max-height':'38px',
			'text-align':'center'
		});
		$('.g212A_prevBtn > img').css({
			'width':'38px',
			'max-height':'38px'
		});
		
		/*下一頁按鈕*/
		$('.g212A_nextBtn').css({
			'margin':'0 0 0 0',
			'width':'10%',
			'max-height':'38px',
			'text-align':'center',
			'float':'right'
		});
		$('.g212A_nextBtn > img').css({
			/*IE9以下專用，與其他瀏覽器CSS不同*/
			'width':'38px',
			'max-height':'38px'
		});
		
		/*.g212A_pageSwitchUi：g212A_prevBtn、g212A_nextBtn、g212A_pageNumStr的容器*/
		$('.g212A_pageSwitchUi').css({
			'display':'table',
			'margin':'0 auto 0 auto',
			'width':'80%',
			'height':'42px',
			'float':'left'
		});
		/*第幾頁*/
		$('.g212A_pageNumStr').css({
			'width':'100%',
			'height':'100%',
			'background':'none',
			'font-size':'1.4em'
		});
		/*共幾頁*/
		$('.g212A_pageTotalStr').css({
			'font-size':'0.8em',
			'color':'#717f9d'
		});

	
	};
	
	//>>>-------------------------------------------->>>
	
	//大尺寸 - normal
	method.normalCss = function(){
		/*頁面最大容器*/
		$('.pageWrapper').css({
		});
		
		$('.g212A_header').css({
			'padding':'0 0 0 0',
			'background':'url(' + param.mainPath + 'g212A_AccordionMedia/images/g212A_headerBg.png)'
		});
		
		$('.g212A_menuBtnOuter').css({
			'width':'90px',
			'min-width':'85px'
		});
		$('.g212A_menuBtn').css({
		});
		$('.g212A_menuCloseBtn > img').css({
		});
		
		$('.g212A_headerStringOuter').css({
			'padding':'0px 10px 0px 10px',
			'background':'url(' + param.mainPath + 'g212A_AccordionMedia/images/g212A_headerStringBg.png) left center no-repeat',
			'text-align':'center',
			'width':'555px',
			'max-width':'555px',
			'min-width':'555px',
			'overflow':'hidden'
		});
		$('.g212A_headerString').css({
			'width':'540px',
			'font-weight':'500',
			'white-space':'nowrap',
			'word-wrap':'normal',
			'word-break':':keep-all'
		});
		
		/*小尺寸視窗會用到，包裹.g212A_prevBtn、.g212A_nextBtn、.g212A_pageNum*/
		$('.g212A_rwdNavDiv').css({
			'display':'none',
			'width':'auto',
			'height':'auto',
			'background':'none',
			'border-bottom':'none'
		});
		
		/*上一頁按鈕*/
		$('.g212A_prevBtn').css({
			'margin':'6px 3px 0 15px',
			'width':'auto',
			'max-height':'none'
		});
		$('.g212A_prevBtn > img').css({
			'width':'38px',
			'max-width':'none'
		});
		
		/*下一頁按鈕*/
		$('.g212A_nextBtn').css({
			'margin':'6px 0 0 3px',
			'width':'auto',
			'max-height':'none',
			'float':'left'
		});
		$('.g212A_nextBtn > img').css({
			'width':'38px',
			'max-height':'none'
		});
		
		/*.g212A_pageSwitchUi：g212A_prevBtn、g212A_nextBtn、g212A_pageNumStr的容器*/
		$('.g212A_pageSwitchUi').css({
			'display':'table-cell',
			'margin':'0 0 0 0',
			'width':'auto',
			'height':'auto',
			'float':'none'
		});
		/*第幾頁*/
		$('.g212A_pageNumStr').css({
			'width':'48px',
			'height':'48px',
			'background':'url(' + param.mainPath + 'g212A_AccordionMedia/images/pageNumDivBg.png) no-repeat',
			'font-size':'1.8em'
		});
		/*共幾頁*/
		$('.g212A_pageTotalStr').css({
			'font-size':'0.8em',
			'color':'#AAA'
		});
		
		
		
	};	
	
	
	
	
	
//>>>=============================================================>>>
})(jQuery); //↑↑↑














































