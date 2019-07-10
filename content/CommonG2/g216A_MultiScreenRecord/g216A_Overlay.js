// JavaScript Document - G216A│g216A_Overlay.js
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
var g216A =  NOU.namespace('NOU.modules.g216A');
//------------------------
param.G2ID = "G216A";
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
			'width':'100%',
			'height':'auto',
			'background-image':'none'
		});
		$('.g216A_verticalSpace').css({
			'display':'none'
		});
		$('.g216A_header').css({
		});
		$('.g216A_headerStr').css({
			'height':'48px',
			'font-size':'1.3em'
		});
		
		$('.g216A_prevNext').css({
			'position':'static',
			'width':'100%',
			'height':'55px',
			'background':'#aabbff'
		});
		$('.g216A_prevBtn').css({
			'width':'15%',
			'min-width':'10%'
		});
		$('.g216A_prevBtn > img').css({
			'width':'55px'
		});
		$('.g216A_nextBtn').css({
			'width':'15%',
			'min-width':'10%'
		});
		$('.g216A_nextBtn > img').css({
			'width':'55px'
		});
		
		$('.g216A_pageNum').css({
			'margin':'10px auto 0 auto',
			'float':'left',
			'max-width':'80%',
			'width':'70%'
		});
		$('.g216A_pageNumStr').css({
			'color':'#FFF'
		});
		
		$('.g216A_btnPageGroup').css({
			'margin':'0px auto 0 auto',
			'width':'100%',
			'height':'auto',
			'background':'#768eb8'
		});
		$('.g216A_btnPage').css({
			'width':'100%',
			'height':'auto',
			'background':'#eee'
		});
		
		$('.g216A_card').css({
			'margin':'0px auto 0px auto',
			'width':'100%'
		});
		
		$('.g216A_card > .mediaIconDiv').css({
			'display':'none'
		});
		
		$('.numButtonNReturnContainerDiv').css({
			'background':'#eee'
		});
		
		
		$('.mediaHeader').css({
			'padding':'3px 0 0 0'
		});
		$('.icon').css({'padding':'0px 10px 0px 17px'});
		$('.mediaHeaderString').css({'width':'100%'});
		$('.buttons').css({'width':'0%'});
		$('.help').css({'display':'none'});
		$('.notebook').css({'display':'none'});
	};
	
	//>>>-------------------------------------------->>>
	
	//大尺寸
	method.normalCss = function(){
		$('.pageWrapper').css({
			'width':'800px',
			'height':'600px',
			'background':'url(' + param.mainPath + 'g216A_MultiScreenRecord/images/bg.jpg) no-repeat'
		});
		
		$('.g216A_verticalSpace').css({
			
			'display':'block'
		});
		
		$('.g216A_header').css({
		});
		$('.g216A_headerStr').css({
			'height':'auto',
			'font-size':'1.5em'
		});
		
		$('.g216A_prevNext').css({
			'position':'absolute',
			'width':'800px',
			'height':'66px',
			'background':'none'
		});
		$('.g216A_prevBtn').css({
			'width':'auto',
			'min-width':'none'
		});
		$('.g216A_prevBtn > img').css({
			'width':'66px'
		});
		$('.g216A_nextBtn').css({
			'width':'auto',
			'min-width':'none'
		});
		$('.g216A_nextBtn > img').css({
			'width':'66px'
		});
		
		$('.g216A_pageNum').css({
			'margin':'20px auto 0 auto',
			'float':'none',
			'max-width':'none',
			'width':'200px'
		});
		$('.g216A_pageNumStr').css({
			'color':'#AAA'
		});
		
		$('.g216A_btnPageGroup').css({
			'margin':'38px auto 0 auto',
			'width':'700px',
			'height':'380px',
			'background':'none'
		});
		$('.g216A_btnPage').css({
			'width':'700px',
			'height':'380px',
			'background':'none'
		});
		
		$('.g216A_card').css({
			'margin':'10px 0 10px 46px',
			'width':'280px'
		});
		
		$('.g216A_card > .mediaIconDiv').css({
			'display':'table-cell'
		});
		
		$('.numButtonNReturnContainerDiv').css({
			'background':'#FFF'
		});

		
		$('.mediaHeader').css({
			'padding':'5px 0 5px 0'
		});
		$('.icon').css({'padding':'0px 10px 0px 23px'});
		$('.mediaHeaderString').css({'width':'82%'});
		$('.buttons').css({'width':'18%'});
		$('.help').css({'display':'table-cell'});
		$('.notebook').css({'display':'table-cell'});
	};
	
	//>>>-------------------------------------------->>>
	



	
	
//>>>=============================================================>>>
})(jQuery); //↑↑↑














































