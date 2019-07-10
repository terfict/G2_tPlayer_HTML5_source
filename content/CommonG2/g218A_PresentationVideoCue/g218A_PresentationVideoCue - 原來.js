// JavaScript Document - G218A│g218A_PresentationVideoCue.js
////////////////////////////////////////////////////////
/******************************************************/
var NOU = NOU || {};
//-----------------------------------------------------

(function($){ //↓↓↓
//>>>=============================================================>>>
var tPlayer = NOU.namespace('NOU.modules.tPlayer');
//------------------------
var utils = NOU.namespace('NOU.modules.tPlayer.utils');
//------------------------
var urlObj = NOU.namespace('NOU.modules.tPlayer.urlObj');
//------------------------
var param = NOU.namespace('NOU.modules.tPlayer.param');
//------------------------
var method = NOU.namespace('NOU.modules.tPlayer.method');
//------------------------
var g218A = NOU.namespace('NOU.modules.g218A');
//------------------------


//
g218A.timeCodeArr = [];
g218A.cardHtml = [];
g218A.cardObj = [];
g218A.cardTitleArr = [];
g218A.prevCardIndex = -1;
g218A.currCardIndex = 0;
g218A.totalCard = 0;
g218A.mediaIndex = 0;
g218A.menuHasExpanded = false;


$('#preloader').css({'display':'block'});


//1041208 - 需置於上方，method.lessThenIE9Css()才調用得到。
method.lessThenIE9Css = function(){
	// IE6~IE8
	if (!window.addEventListener) { 
		//
		if($(window).width() <= param.breakpoint){
			method.rwdCss();
		}else if($(window).width() > param.breakpoint){
			method.normalCss();
		}
	}
	
	
	//
	//------------------------------------------------------
	//var xxx;
	
	//IE9及以上支援 window.addEventListener - // DOM2 standard
	//xxx = window.addEventListener;
	//if( xxx ){ alert( xxx ); }
	
	//IE5 quirks、IE7、8、9、quirks、10皆有支援 window.attachEvent - // Microsoft's precursor to it, IE8 and earlier
	//xxx = window.attachEvent;
	//if( xxx ){ alert( xxx ); }
	
	//IE5 quirks、7、8、9、quirks、10皆未支援 window.onload - // Some pre-1999 browser
	//xxx = window.onload; alert( xxx );
	//if( xxx ){ alert( xxx ); }
	//------------------------------------------------------
	
	
};


//將inVideoQuiz暫停點時間存入timeCodeArr陣列
g218A.createTimeCodeArr = function(){  

	//※
	var totalTime = method.hmsToSecond( $('.total_time').text() );

	$('.g218A_card').each(function(index) { 
	
		//
		if( $('.g218A_card:eq(' + index + ') .cue_start').get(0) !== undefined ){ 
			
			if( index < $('.g218A_card').length-1 ){
				//
				g218A.timeCodeArr.push( [
							//1051103
							//●○●○●○主要問題需：修改tPlayer.js裡的 method.hmsToSecond()的內容。IE8轉換秒數材能正常。
							
							method.hmsToSecond( $('.g218A_card:eq(' + index + ') .cue_start').text() ), //起始點
							method.hmsToSecond( $('.g218A_card:eq(' + (index+1) + ') .cue_start').text() ), //結束點
							0 //所對應內容，目前是否處於出現狀態的旗標。0：隱藏│1：出現。
						] );
			
			}else if( index === ($('.g218A_card').length-1) ){
				//
				g218A.timeCodeArr.push( [
							method.hmsToSecond( $('.g218A_card:eq(' + index + ') .cue_start').text() ), //起始點
							totalTime, //媒體長度：媒體結束點
							0 //所對應內容，目前是否處於出現狀態的旗標。0：隱藏│1：出現。
						] );
			}
			
			//
			if( index === $('.g218A_card').length-1 ){ 
				//alert( g218A.timeCodeArr );
				//alert( method.hmsToSecond( $('.g218A_card:eq(' + 8 + ') .cue_start').text() ) );
				//alert($('.g218A_card').length-1);
			}
		
		}else {
			alert('請正確填寫.cue_start');
		}

    });
	
	//alert( g218A.timeCodeArr );

};


//●將所有.g218A_card資料存入g218A.cardHtml陣列 & 及其他處理
g218A.createCardTitleArrNElse = function(){  

	//
	var menuButtonHtml = '<div class="g218A_menuButton" alt="切換為「條列選單」" title="切換為「條列選單」"></div>';
	$('.g218A_numButtonGroup').append( menuButtonHtml );
	
	//
	var returnNumButtonHtml = '<div class="g218A_returnNumButton" alt="切換為「按鈕選單」" title="切換為「按鈕選單」"></div>';
	$('.g218A_numButtonGroup').append( returnNumButtonHtml );
	
	
	//
	$('.g218A_card').each(function(index) { 
	
		//將所有.g218A_card的HTML資料存入g218A.cardHtml陣列。但換頁功能沒用到。
		g218A.cardHtml[index] = '<div class="g218A_card">' + $('.g218A_card:eq(' + index + ')').html() + '</div>';
		//alert(g218A.cardHtml[index]);
		
		
		//存入jQ物件，但換頁功能沒用到。
		g218A.cardObj[index]= $('.g218A_card:eq(' + index + ')');

		
		//●全部的.g218A_card，都append到.g218A_cardGroupShow裡
		$('.g218A_cardGroupShow').append( $('.g218A_card:eq(' + (index) + ')') );
		
		
		
		//●●●1051014 - 附加數字按鈕
		//==============================================================
		var numButtonHtml = '<span class="g218A_numButton"></span>';
		$('.g218A_numButtonGroup').append( numButtonHtml );
		//
		$('.g218A_numButton:eq(' + index + ')').html(index+1);
		//==============================================================
		
		
		//●●●將小標題存到g218A.cardTitleArr
		g218A.cardTitleArr[index] = $('.g218A_cardTitle:eq(' + index + ')').html();
		
		
		
		//取得總頁數g218A.totalCard
		if(index === $('.g218A_card').length-1){
			//
			g218A.totalCard = g218A.cardHtml.length; 
			//
			//alert(g218A.cardHtml[4]);
			//alert(g218A.totalCard);
			//alert(g218A.cardTitleArr);
		}
		
	

    });
	
	
	
	//將所有的.g218A_card的display屬性值設為none，●○隱藏。
	setTimeout(function(){
		
		$('.g218A_card').each(function(index) { 
		
			//●○在上面存進陣列，setTimeout 300毫秒後，將所有.g218A_card隱藏。
			$('.g218A_card:eq(' + ((g218A.totalCard-1)-(index)) + ')').css({'visibility':'visible','display':'none'});
			
			//alert((g218A.totalCard-1)-(index) + '/' + $('.g218A_card').length);
		});
		
	},300);
	


};



//目前沒用到
g218A.hideAllCard = function(){
	var cardLength = g218A.cardHtml.length; 
	
	$.each(g218A.timeCodeArr,function(index){
		//$('.g218A_card:eq(' + index + ')').css({'display':'none'});
		
		$('.g218A_card:eq(' + ((cardLength-1)-(index)) + ')').css({'display':'none'});
		g218A.timeCodeArr[(cardLength-1)-(index)][2] = 0;
		
	});
};



//●●●○○○由tPlayer.js調用此處的method.updateCurrTime()
method.updateCurrTime = function(mediaIndex){
	//
	g218A.mediaIndex = mediaIndex;
	
	
	//1050325 - ●只讓第一個媒體檔具備偵測timecode的能力
	if(g218A.mediaIndex === 0){
		//
		$.each(g218A.timeCodeArr,function(timeCodeIndex){
			g218A.checkTimeCode(g218A.mediaIndex, timeCodeIndex);
		});
	}
	

};


//●○●○●○被method.updateCurrTime(){}所調用
g218A.checkTimeCode = function(mediaIndex, timeCodeIndex){
	
	//取得timeCode資訊
	var tStart = g218A.timeCodeArr[timeCodeIndex][0]; //一個區段的起始點
	//var tEnd = g218A.timeCodeArr[timeCodeIndex+1][0] !== undefined ? g218A.timeCodeArr[timeCodeIndex+1][0] : param.totalTimeArr[mediaIndex]; //一個區段的結束
	var tEnd = g218A.timeCodeArr[timeCodeIndex][1]; //一個區段的結束點點
	var currT = param.currTimeArr[mediaIndex]; //索引為mediaIndex的媒體檔的目前播放時間
	
	
	//※●○◎《《《《《《《《《《《《《《《《《
	//================================================================
	//《時間區段：●○進》
	if( currT >= tStart && currT < tEnd ){
		
		//
		g218A.currCardIndex = timeCodeIndex;
		
		
		if( g218A.timeCodeArr[g218A.currCardIndex][2] === 0 ){
			//
			g218A.timeCodeArr[g218A.currCardIndex][2] = 1;
			
			//=================================================
			//當g218A.prevCardIndex不等於初始賦值的-1
			if( g218A.prevCardIndex !== -1){
				
				//隱藏前一個.g218A_card
				$('.g218A_card:eq(' + g218A.prevCardIndex + ')').css({'display':'none'});
				g218A.timeCodeArr[g218A.prevCardIndex][2] = 0;
				
				//●○1051018
				//$.each(g218A.timeCodeArr,function(index){
					$('.g218A_numButton:eq(' + g218A.prevCardIndex + ')').removeClass('g218A_numButton_keep');
				//});
				
				
			}
			//=================================================
			
			//
			$('.g218A_card:eq(' + g218A.currCardIndex + ')').css({'display':'block','opacity':'0.0'});
			$('.g218A_card:eq(' + g218A.currCardIndex + ')').animate({'opacity':'1.0'},600,function(){
				
				//●○1051019
				//===============================================================================
				//Android Mobile Chrome不會自動播放，若按下第一個數字鈕，會反覆執行animate動畫出現
				//需在此多加一個 g218A.timeCodeArr[g218A.currCardIndex][2] = 1 ，讓條件式排除動畫的執行。
				g218A.timeCodeArr[g218A.currCardIndex][2] = 1;
				//===============================================================================
				
				
			});
			
			//●○1051018
			$('.g218A_numButton:eq(' + g218A.currCardIndex + ')').addClass('g218A_numButton_keep');
			
			
			
			
		}
		
		
		
		
		//●○1051103 - 除此之外，主要問題需：修改tPlayer.js裡的 method.hmsToSecond()的內容。IE8轉換秒數材能正常。
	}else{
		g218A.prevCardIndex = g218A.currCardIndex;
	}
	//================================================================
	
	
	
	$('.showInfo').html(
				'g218A.currCardIndex：' + g218A.currCardIndex + 
				'<br>' + 'g218A.prevCardIndex：' + g218A.prevCardIndex +
				'<br>' + 'g218A.timeCodeArr：' + g218A.timeCodeArr +
				'<br>' + 'g218A.timeCodeArr['+g218A.currCardIndex+'][2]+：' + g218A.timeCodeArr[g218A.currCardIndex][2] 
				);
				
				
};


//消除.g218A_menuItem的滑鼠事件
g218A.offMenuItemMEvent = function(){
	//下方選單項目
	$.each(g218A.timeCodeArr, function(itemIndex) { 
		//mouseover
		$('.g218A_menuItem:eq('+ itemIndex + ')').off('mouseover');
		//mouseout
		$('.g218A_menuItem:eq('+ itemIndex + ')').off('mouseout');
		
		//mousedown
		$('.g218A_menuItem:eq('+ itemIndex + ')').off('mousedown');
	});
	
};


//1051026
//滑鼠按下數字按鈕的事件處理
g218A.numButtonMDownEvent = function(timeCodeIndex, arrangement){
	//alert(arrangement);
	
	
	if( arrangement === 'list' ){ 
	
		var $body = (window.opera) ? (document.compatMode === "CSS1Compat" ? $('html') : $('body')) : $('html,body');
		$body.animate({'scrollTop': 0},250, function(){
			
	//1051111
		//$('.g218A_cardGroupShow').insertBefore($('.g218A_numButtonGroup'));
		
			
		});
		xxx();
		
		//
		/*$('html, body').animate({'scrollTop': 0},250, function(){
			xxx();
		});*/
		
		
		
	}else if( arrangement === 'button' ){
		xxx();
	}
		
		
	//●○1051108 - ●○此處按下數字按鈕的事件處理，把所有媒體檔索引直接都設為0。只讓第一個媒體檔與數字按鈕交互作用。
	function xxx(){
		
		//alert(timeCodeIndex);
		//alert(param.playingFlagArr[g218A.mediaIndex]);
		
		
		//●○1051019 - ●○有這碼，在Mobile裝置，尤其Android上，才能在一進入頁面尚未播放前，以點擊數字按鈕開始播。
		//============================================================
		//if( utils.isMobile ){
			if( !param.playingFlagArr[g218A.mediaIndex] ){
				tPlayer.play(g218A.mediaIndex);
			}
		//}
		//============================================================
		
		
		//
		$('.g218A_numButton:eq(' + timeCodeIndex + ')').removeClass('g218A_numButton_over');
		
		//
		//●○1051020 - 再加這行
		$('.g218A_numButton:eq(' + timeCodeIndex + ')').addClass('g218A_numButton_keep');
		
		//
		//停止更新進度列
		tPlayer.pauseUpdateTimer(g218A.mediaIndex);
		//暫停播放
		if( param.playingFlagArr[g218A.mediaIndex] ){
			tPlayer.pause(g218A.mediaIndex);
		}
		
		//
		//g218A.prevCardIndex = g218A.currCardIndex;
		//g218A.currCardIndex =timeCodeIndex; //這裡不需
		
		//計算比例
		var currPercent = g218A.timeCodeArr[timeCodeIndex][0]/param.totalTimeArr[0];
		//計算.track的長度
		var trackWidth = $('.mediaWrapper:eq(' + g218A.mediaIndex + ') .track').width();
		
		//移動.slider到定位 --- 水平位置減9，因為.slider預設x位置是-9。
		$('.mediaWrapper:eq(' + g218A.mediaIndex + ') .slider').animate({'left':trackWidth*currPercent-9},360);
		//伸縮.progressBar img的長度
		$('.mediaWrapper:eq(' + g218A.mediaIndex + ') .progressBar img').animate({'width':trackWidth*currPercent},360,function(){
			//繼續更新進度列、暫停播放
			tPlayer.resumeUpdateTimer(g218A.mediaIndex);
			//seek到定點 - ●●● 《《《《《《 g218A.seekFineTuning = 0.1 》》》》》》 設定於externalData.js ●●●
			tPlayer.seek( g218A.timeCodeArr[timeCodeIndex][0]+g218A.seekFineTuning, 0 );
			
			//播放
			if( !param.playingFlagArr[g218A.mediaIndex] ){
				tPlayer.play(g218A.mediaIndex);
			}
			
			
			//1051111
			//------------------------------------------------------
			if( arrangement === 'list' ){ 
				//1051111
				$('.g218A_returnNumButton').trigger('mousedown');
			}
			//------------------------------------------------------
			
		});
		
	}
			
	
	
};


//1051111
g218A.numButtonOverOut = function(){
	
	$.each(g218A.timeCodeArr,function(timeCodeIndex){
		
		//mouseover
		$('.g218A_numButton:eq(' + timeCodeIndex + ')').on('mouseover',function(){
			$('.g218A_numButton:eq(' + timeCodeIndex + ')').addClass('g218A_numButton_over');
			
			//.mediaHeaderString
			if( utils.isMobile ){
				$('.mediaHeaderString').html( g218A.cardTitleArr[timeCodeIndex] );
			}
			
			//1051110
			//.g218A_showCueTitle
			if( !utils.isMobile ){
				$(document.body).append('<div class="g218A_showCueTitle"></div>');
				$('.g218A_showCueTitle').html( g218A.cardTitleArr[timeCodeIndex] );
				
				var posLeft = $('.g218A_numButtonGroup').offset().left;
				var posTop = $('.g218A_numButtonGroup').offset().top - $('.g218A_showCueTitle').height() - parseInt($('.g218A_showCueTitle').css('padding-top')) - parseInt($('.g218A_showCueTitle').css('padding-bottom'));
				$('.g218A_showCueTitle')
					.css({'left':posLeft, 'top':posTop, 'display':'block'})
					;
			}
			
		});
		
		//mouseout
		$('.g218A_numButton:eq(' + timeCodeIndex + ')').on('mouseout',function(){
			$('.g218A_numButton:eq(' + timeCodeIndex + ')').removeClass('g218A_numButton_over');
			
			//.mediaHeaderString
			if( utils.isMobile ){
				$('.mediaHeaderString').html( document.title );
			}
			
			$('.g218A_showCueTitle').empty().remove();
			
		});
		
		
	});
	
};

g218A.numButtonOverOutOff = function(){
	//mouseover
	$('.g218A_numButton').off('mouseover');
	$('.g218A_numButton').off('mouseout');
};


//1051018
//數字按鈕.g218A_numButton、.g218A_menuButton開啟選單列表按鈕、.g218A_returnNumButton回純粹數字按鈕 的滑鼠事件處理
g218A.buttonsMouseEvent = function(){
	
	
	//●數字按鈕.g218A_numButton的滑鼠事件處理
	//==========================================================================
	$.each(g218A.timeCodeArr,function(timeCodeIndex){
		
		/*//mouseover
		$('.g218A_numButton:eq(' + timeCodeIndex + ')').on('mouseover',function(){
			$('.g218A_numButton:eq(' + timeCodeIndex + ')').addClass('g218A_numButton_over');
			
			//.mediaHeaderString
			if( utils.isMobile ){
				$('.mediaHeaderString').html( g218A.cardTitleArr[timeCodeIndex] );
			}
			
			//1051110
			//.g218A_showCueTitle
			if( !utils.isMobile ){
				$(document.body).append('<div class="g218A_showCueTitle"></div>');
				$('.g218A_showCueTitle').html( g218A.cardTitleArr[timeCodeIndex] );
				
				var posLeft = $('.g218A_numButtonGroup').offset().left;
				var posTop = $('.g218A_numButtonGroup').offset().top - $('.g218A_showCueTitle').height() - parseInt($('.g218A_showCueTitle').css('padding-top')) - parseInt($('.g218A_showCueTitle').css('padding-bottom'));
				$('.g218A_showCueTitle')
					.css({'left':posLeft, 'top':posTop, 'display':'block'})
					;
			}
			
		});
		
		//mouseout
		$('.g218A_numButton:eq(' + timeCodeIndex + ')').on('mouseout',function(){
			$('.g218A_numButton:eq(' + timeCodeIndex + ')').removeClass('g218A_numButton_over');
			
			//.mediaHeaderString
			if( utils.isMobile ){
				$('.mediaHeaderString').html( document.title );
			}
			
			$('.g218A_showCueTitle').empty().remove();
			
		});*/
		
		
		//1051111
		g218A.numButtonOverOut();
		
		
		//●○1051018
		//============================================
		//mousedown
		$('.g218A_numButton:eq(' + timeCodeIndex + ')').on('mousedown',function(){
			
			//1051111 - @Android Mobile - 點擊數字按鈕後，隨即關閉$('.g218A_showCueTitle')，避免小標題文字持續停留在畫面上
			//--------------------------------------------------------------
			if( !utils.isMobile ){
				if( $('.g218A_showCueTitle').get(0) !== undefined ){
					$('.g218A_showCueTitle').empty().remove();
				}
			}
			//--------------------------------------------------------------
			
			//
			g218A.numButtonMDownEvent(timeCodeIndex, 'button'); //滑鼠按下數字按鈕的事件處理
			
						
		});
		//============================================
		

	});
	//==========================================================================
	
	
	
	
	//●.g218A_menuButton按鈕的滑鼠事件處理
	//==========================================================================
	
	//mouseover
	$('.g218A_menuButton').on('mouseover',function(){
		$('.g218A_menuButton').addClass('g218A_menuButton_over');
	});
	
	//mouseout
	$('.g218A_menuButton').on('mouseout',function(){
		$('.g218A_menuButton').removeClass('g218A_menuButton_over');
	});
	
	
	//mousedown
	$('.g218A_menuButton').on('mousedown',function(){
		
		//1051111
		g218A.menuHasExpanded = true;
		
		//1051111
		g218A.numButtonOverOutOff();
		
		
		$('.g218A_menuButton').removeClass('g218A_menuButton_over');
		//
		$('.g218A_menuButton').css({'display':'none'});
		$('.g218A_returnNumButton').css({'display':'inline-block'});
		
		
		//
		//$('.g218A_menuZone').fadeIn(300).css({'display':'table'});
		
		
		//1051111
		/*if( param.playingFlagArr[g218A.mediaIndex] ){
			tPlayer.pause(g218A.mediaIndex);
		}*/

		
		//1051111
		/*var currLeft = $('.g218A_numButtonGroup').offset().left;
		var currTop = $('.g218A_numButtonGroup').offset().top;
		//alert(currLeft +'/' + currTop);
		var targetLeft = $('.g218A_cardGroupShow').offset().left;
		var targetTop = $('.g218A_cardGroupShow').offset().top + 10;*/
		
		
		//1051111
		/*$('.g218A_numButtonGroup').css({'position':'absolute','left':currLeft,'top':currTop});
		$('.g218A_numButtonGroup')
			.fadeIn(300,function(){
				//
				$('.g218A_numButtonGroup').animate({'left':targetLeft ,'top':targetTop+$('.g218A_menuZone').height()},360);
			});*/
		
		//1051111
		/*targetTop = targetTop + $('.g218A_numButtonGroup').height() + 20;
		$('.g218A_menuZone').css({'display':'table','position':'absolute','left':currLeft,'top':currTop});
		$('.g218A_menuZone')
			.fadeIn(300,function(){
				//
				$('.g218A_menuZone').animate({'left':targetLeft ,'top':targetTop},360);
			});*/
		
		
		//1051111
		$('.g218A_numButtonGroup').insertBefore($('.g218A_cardGroupShow'));
		$('.g218A_menuZone').insertAfter($('.g218A_numButtonGroup'));
		$('.g218A_menuZone').fadeIn(300).css({'display':'table'});
		
		
		
		//下方選單項目
		$.each(g218A.timeCodeArr, function(itemIndex) { 
		
			//
			var menuZoneHtml = '<div class="g218A_menuItem">'+
								'<span class="numOrder"></span>'+
								'<span class="titleStr"></span>'+
								'</div>';
			$('.g218A_menuZone').append(menuZoneHtml);
			
			
			//●○●○●○轉移.g218A_numButton到其他位置，(或隱藏display:none，都必須特殊處理)
			//
			$('.g218A_menuItem:eq(' + itemIndex + ') .numOrder').append( $('.g218A_numButton:eq(' + (0) + ')') );
			//
			$('.g218A_menuItem:eq('+ itemIndex + ') .titleStr').append( g218A.cardTitleArr[itemIndex] );
			
			
			
			//選單項目的滑鼠事件
			//---------------------------------
			//mouseover
			$('.g218A_menuItem:eq('+ itemIndex + ')').on('mouseover',function(){
			});
			
			//mouseout
			$('.g218A_menuItem:eq('+ itemIndex + ')').on('mouseout',function(){
			});
			
			//==================================================================
			//mousedown
			$('.g218A_menuItem:eq('+ itemIndex + ')').on('mousedown',function(){
				g218A.numButtonMDownEvent(itemIndex, 'list'); //滑鼠按下數字按鈕的事件處理
			});
			//==================================================================
			//---------------------------------
			
			
			
		});
		
		//
		$('.g218A_numButtonGroup').addClass('g218A_numButtonGroup_list');
		//
		$('.g218A_numButton').addClass('g218A_numButton_list');
		
	});
	//==========================================================================
	
	
	
	
	//●.g218A_returnNumButton按鈕的滑鼠事件處理
	//==========================================================================
	//mouseover
	$('.g218A_returnNumButton').on('mouseover',function(){
		$('.g218A_returnNumButton').addClass('g218A_returnNumButton_over');
	});
	
	//mouseout
	$('.g218A_returnNumButton').on('mouseout',function(){
		$('.g218A_returnNumButton').removeClass('g218A_returnNumButton_over');
	});
	
	//mousedown
	$('.g218A_returnNumButton').on('mousedown',function(){
		
		//1051111
		g218A.menuHasExpanded = false;
		
		//1051111
		g218A.numButtonOverOut();
		
		
		$('.g218A_returnNumButton').removeClass('g218A_returnNumButton_over');
		//
		$('.g218A_returnNumButton').css({'display':'none'});
		$('.g218A_menuButton').css({'display':'inline-block'});
		
		//
		//==============================
		g218A.offMenuItemMEvent();
		//==============================
		
		//
		$('.g218A_menuZone').fadeOut(300, function(){
			$('.g218A_menuZone').empty();
		});
		
		
		//
		$.each(g218A.timeCodeArr, function(itemIndex) { 
			//
			$('.g218A_numButtonGroup').append( $('.g218A_numButton:eq(' + (itemIndex) + ')') );
		});
		
		
		//
		$('.g218A_numButtonGroup').removeClass('g218A_numButtonGroup_list');
		//
		$('.g218A_numButton').removeClass('g218A_numButton_list');
		
		
		//1051111
		$('.g218A_cardGroupShow').insertBefore($('.g218A_numButtonGroup'));
		//
		//1051111
		/*if( !param.playingFlagArr[g218A.mediaIndex] ){
			tPlayer.play(g218A.mediaIndex);
		}*/
		
		
	});
	//==========================================================================
	
	
	
};


//
//1051104
method.preloaderFadeOut = function(){
	//不設window.load
	//$(window).load(function() { // makes sure the whole site is loaded
	
		//$('#status').fadeOut(600); // will first fade out the loading animation
		$('#preloader').fadeOut(600,function(){// will fade out the white DIV that covers the website.
			$('body').css({'overflow':'auto','display':'block'});
		});
		 
	//});
};


//
$(document).ready(function(){
	
	//1051104
	//--------------------------------------------
	//setTimeout( method.preloaderFadeOut,300);
	setTimeout( method.preloaderFadeOut,300);
	//--------------------------------------------
		
	
	//●整體縮放頁面 - 強迫設定為1.0，以避免播放控制失常
	//============================
	$('body').css('zoom','1.0');
	//============================
	
	
	//1050323
	g218A.createTimeCodeArr();
	//1051011
	g218A.createCardTitleArrNElse();
	
	
	
	//啟動媒體播放相關處理
	//===================================
	//
	method.addDocumentTitle();
	//
	method.getPath();
	//
	method.pageInit();
	//
	method.init();
	//
	utils.userAgentProp();
	utils.detectBrowserVersion();
	//
	method.choosePlayMode();
	method.deployment();
	
	
	//
	$('.mediaWrapper').each(function(mediaIndex) {
		
		//param.mediaAutoPlayArr[index] = true;
		method.embedMedia(mediaIndex);
		
		
		
		//1050325 - ●只讓第一個媒體檔具備偵測timecode的能力
		if(mediaIndex === 0){
			
			
			//●○●○●○1051108 - ●○計算操控mediaWrapper的高度，
			//解決：mediaWrapper過高所產生的mediaWrapper和g218A_cardGroupShow之間可能產生的10px間隙。
			//=====================================================================
			var tmpHeight = $('.mediaWrapper:eq(' + mediaIndex + ') .mediaHeader').height() + $('.mediaWrapper:eq(' + mediaIndex + ') .playbackDiv').height() + $('.mediaWrapper:eq(' + mediaIndex + ') .mediaDiv').height();
			$('.mediaWrapper:eq(' + mediaIndex + ')').css({'height':tmpHeight});
			//=====================================================================
			
			
			//●●●
			//----------------------------
			g218A.buttonsMouseEvent();
			//----------------------------
		}
		
		
		
		
		
	});
	//===================================
	
	
	//點小圖跳大圖 - 這得在method.lessThenIE9Css()上方。
	method.createMagnifierIcon();
	
	//名詞解釋
	method.glossary();
	
	// IE6~IE8 - ※IE9在此處對window.attachEvent 沒有反應
	method.lessThenIE9Css();

});

//1041202
$(window).on('resize', function(){
	// IE6~IE8 - ※IE9在此處對window.attachEvent 則有反應
	method.lessThenIE9Css();
});











//>>>=============================================================>>>
})(jQuery); //↑↑↑


























