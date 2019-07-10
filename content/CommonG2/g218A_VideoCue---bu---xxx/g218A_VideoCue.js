// JavaScript Document - G218A│g218A_VideoCue.js
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
g218A.cardTextArr = [];
g218A.prevCardIndex = -1;
g218A.currCardIndex = 0;
g218A.totalCard = 0;
g218A.mediaIndex = 0;
g218A.menuHasExpanded = false;

g218A.clickPosX = 0;
g218A.menuZoneCurrWidth = 0;
g218A._mediaObj = undefined;
g218A.mediaWidth = 0;
g218A.mediaHeight = 0;
g218A.mediaW2hRatio = 0;
g218A.xRatio = 0;
g218A.pageInitWidth = 0;
g218A.pageCurrWidth = 0;
g218A.pageWidthState = "original"; //"original_InitSmall"│"original"│"fullPage"





$('#preloader').css({'display':'block'});




//將HTML裡的 「cue_start提示點起始時間」、 「媒體長度total_time」 存入g218A.timeCodeArr二維陣列
//●g218A.timeCodeArr[區段起始時間, 區段結束時間, 所對應內容，目前是否處於出現狀態的旗標。(0：隱藏│1：出現)]
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

	//定義.g218A_menuButton的HTML字串，附加到.g218A_numButtonGroup裡面
	var menuButtonHtml = '<div class="g218A_menuButton" alt="切換為「條列選單」" title="切換為「條列選單」"></div>';
	$('.g218A_numButtonGroup').append( menuButtonHtml );
	
	//定義.g218A_returnNumButton的HTML字串，附加到.g218A_numButtonGroup裡面
	var returnNumButtonHtml = '<div class="g218A_returnNumButton" alt="切換為「按鈕選單」" title="切換為「按鈕選單」"></div>';
	$('.g218A_numButtonGroup').append( returnNumButtonHtml );
	
	
	
	//●全部的.g218A_card，都append到.g218A_cardGroupShow裡
	$('.g218A_card').each(function(index) { 
	
	
		//將所有.g218A_card的HTML資料存入g218A.cardHtml陣列。●但換頁功能沒用到此陣列。
		g218A.cardHtml[index] = '<div class="g218A_card">' + $('.g218A_card:eq(' + index + ')').html() + '</div>';
		//alert(g218A.cardHtml[index]);
		
		
		//存入.g218A_card的jQ物件，●但換頁功能沒用到。
		g218A.cardObj[index]= $('.g218A_card:eq(' + index + ')');

		
		//●全部的.g218A_card，都append到.g218A_cardGroupShow裡
		//$('.g218A_cardGroupShow').append( $('.g218A_card:eq(' + (index) + ')') );
		
		
		//●○●○●○1051130 - g218A_cardGroupShow於本版型用不著
		//---------------------------------------------------
		//$('.g218A_cardGroupShow').css({'display':'none'});
		//---------------------------------------------------
		
		
		
		//●●●1051014 - 附加數字按鈕
		//==============================================================
		var numButtonHtml = '<span class="g218A_numButton"></span>';
		$('.g218A_numButtonGroup').append( numButtonHtml );
		//
		$('.g218A_numButton:eq(' + index + ')').html(index+1);
		//==============================================================
		
		
		//●●●將小標題存到g218A.cardTitleArr
		g218A.cardTitleArr[index] = $('.g218A_card:eq(' + index + ') .g218A_cardTitle').html(); 
		
		
		//●●●將小標題存到g218A.cardTextArr
		g218A.cardTextArr[index] = $('.g218A_card:eq(' + index + ') .g218A_text').html(); 
		
		
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
	
	
	
	//延遲300毫秒之後，將所有的.g218A_card的display屬性值設為none，●○隱藏。
	setTimeout(function(){
		
		$('.g218A_card').each(function(index) { 
		
			//●○在上面存進陣列，setTimeout 300毫秒後，將所有.g218A_card隱藏。
			$('.g218A_card:eq(' + ((g218A.totalCard-1)-(index)) + ')').css({'visibility':'visible','display':'none'});
			//$('.g218A_card:eq(' + (0) + ')').css({'visibility':'visible','display':'none'});
			
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


//1060105
g218A.scrollControl = function(){
	
	//●○1060104 - 計算$('.g218A_menuZone')捲軸捲動距離
			//===========================================================
			var scrollTopOffset = 0;
			
			$('.g218A_card').each(function(index){ 
				
				if( index < g218A.currCardIndex ){
					scrollTopOffset += $('.g218A_menuItem:eq(' + index + ')').height();
				}
				
			});
			//alert(scrollTopOffset);
			
			//捲動
			$('.g218A_menuZone').animate({'scrollTop': scrollTopOffset},300);
			//===========================================================
	
};



//==========================================================================●》》》
//●●●○○○由tPlayer.js調用此處的method.updateCurrTime()
method.updateCurrTime = function(mediaIndex){
	
	
	//1050325 - ●只讓第一個媒體檔具備偵測timecode的能力
	if(g218A.mediaIndex === 0){
		
		//1051216 - 移到條件式內。本來在條件式上方。
		g218A.mediaIndex = mediaIndex;
		
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
			
			
			
			
			//●○1060104 - 計算$('.g218A_menuZone')捲軸捲動距離
			//===========================================================
			var scrollTopOffset = 0;
			
			$('.g218A_card').each(function(index){ 
				
				if( index < timeCodeIndex ){
					scrollTopOffset += $('.g218A_menuItem:eq(' + index + ')').height();
				}
				
			});
			//alert(scrollTopOffset);
			
			//捲動
			$('.g218A_menuZone').animate({'scrollTop': scrollTopOffset},300);
			//===========================================================
			
			
			
		}
		
		
		
		
		//●○1051103 - 除此之外，主要問題需：修改tPlayer.js裡的 method.hmsToSecond()的內容。IE8轉換秒數材能正常。
	}else{
		//
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
//==========================================================================●》》》




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
		if( utils.isMobile ){
			if( !param.playingFlagArr[g218A.mediaIndex] ){
				tPlayer.play(g218A.mediaIndex);
			}
		}
		//============================================================
		
		
		//
		$('.g218A_numButton:eq(' + timeCodeIndex + ')').removeClass('g218A_numButton_over');
		
		//
		//●○1051020 - 再加這行 - ●○1051201隱藏這行
		//$('.g218A_numButton:eq(' + timeCodeIndex + ')').addClass('g218A_numButton_keep');
		
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
		var currPercent = g218A.timeCodeArr[timeCodeIndex][0]/param.totalTimeArr[g218A.mediaIndex];
		
		//計算.track的長度
		var trackWidth = $('.mediaWrapper:eq(' + g218A.mediaIndex + ') .track').width();
		
		//移動.slider到定位 --- 水平位置減9，因為.slider預設x位置是-9。
		$('.mediaWrapper:eq(' + g218A.mediaIndex + ') .slider').animate({'left':trackWidth*currPercent-9},360);
		
		//伸縮.progressBar img的長度
		$('.mediaWrapper:eq(' + g218A.mediaIndex + ') .progressBar img').animate({'width':trackWidth*currPercent},360,function(){
			//繼續更新進度列、暫停播放
			tPlayer.resumeUpdateTimer(g218A.mediaIndex);
			//seek到定點 - ●●● 《《《《《《 g218A.seekFineTuning = 0.1 》》》》》》 設定於externalData.js ●●●
			tPlayer.seek( g218A.timeCodeArr[timeCodeIndex][0]+g218A.seekFineTuning, g218A.mediaIndex );
			
			//播放
			if( !param.playingFlagArr[g218A.mediaIndex] ){
				tPlayer.play(g218A.mediaIndex);
			}
			
			
			//1051111
			//------------------------------------------------------
			if( arrangement === 'list' ){ 
				//1051111 - 1051208
				//$('.g218A_returnNumButton').trigger('mousedown');
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
			
			//1051110 - 滑鼠移到數字按鈕上面，出現標題及標題底色 (G213A才有，G218A沒有)
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
//數字按鈕.g218A_numButton、.g218A_menuButton開啟選單列表按鈕、.g218A_returnNumButton返回純粹數字按鈕 的滑鼠事件處理
g218A.buttonsMouseEvent = function(){
	
	
	//●數字按鈕.g218A_numButton的滑鼠事件處理
	//==========================================================================
	$.each(g218A.timeCodeArr,function(timeCodeIndex){
		
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
	
	
	
	//●○◎※●○◎※●○◎※ mousedown ●○◎※●○◎※●○◎※
	$('.g218A_menuButton').on('mousedown',function(){
		
		//1051111
		g218A.menuHasExpanded = true;
		
		//1051111
		g218A.numButtonOverOutOff();
		
		
		$('.g218A_menuButton').removeClass('g218A_menuButton_over');
		//
		$('.g218A_menuButton').css({'display':'none'});
		$('.g218A_returnNumButton').css({'display':'inline-block'});

		
		//1051111
		$('.g218A_numButtonGroup').insertBefore($('.g218A_cardGroupShow'));
		$('.g218A_menuZone').insertAfter($('.g218A_numButtonGroup'));
		//$('.g218A_menuZone').fadeIn(300).css({'display':'table'});
		
		
		
		//1051208 - 棄用。 (此解 .g218A_controlBar 放在 .g218A_menuZone 裡面。捲動卷軸時，會捲到範圍外而看不到)
		//==========================================================================《《《《《《
		/*var widthControlBarHtml = '<div class="g218A_controlBar">'+
										'<span class="g218A_controlBarPercent">'+
										'</span>'+
									'</div>'
									;
		$('.g218A_menuZone').append(widthControlBarHtml);*/
		//==========================================================================《《《《《《
		
		
		
		//●○◎※●○◎※ 1060105 - .g218A_controlBar 改為放在 .g218A_menuZone 上方 ●○◎※●○◎※
		//==========================================================================《《《《《《
		$('.g218A_controlBar').append('<span class="g218A_controlBarPercent"></span>');
		//==========================================================================《《《《《《
		
		
		
		
		//下方選單項目
		$.each(g218A.timeCodeArr, function(itemIndex) { 
		

			//
			var menuZoneHtml = '<div class="g218A_menuItem">'+
								'<span class="numOrder"></span>'+
								'<span class="titleStr"></span>'+
								'<div class="text"></div>'+
								'</div>';
			$('.g218A_menuZone').append(menuZoneHtml);
			
			
			//●○●○●○轉移.g218A_numButton到其他位置，(或隱藏display:none，都必須特殊處理)
			//
			$('.g218A_menuItem:eq(' + itemIndex + ') .numOrder').append( $('.g218A_numButton:eq(' + (0) + ')') );
			//
			$('.g218A_menuItem:eq('+ itemIndex + ') .titleStr').append( g218A.cardTitleArr[itemIndex] );
			
			
			//1060104 - .g218A_card增加內文，如果有.g218A_text的話
			//=============================================================
			//●1060104 - 如果不是空白，也不是undefined
			if( $('.g218A_card:eq('+ itemIndex + ') .g218A_text').html() !== '' && $('.g218A_card:eq('+ itemIndex + ') .g218A_text').get(0) !== undefined ){
				$('.g218A_menuItem:eq('+ itemIndex + ') .text').append( g218A.cardTextArr[itemIndex] );
			
			//●
			}else/* if( $('.g218A_card:eq('+ itemIndex + ') .g218A_text').html() === '' || $('.g218A_card:eq('+ itemIndex + ') .g218A_text').get(0) === undefined )*/{
				$('.g218A_menuItem:eq('+ itemIndex + ') .text').empty().remove();
			}
			//=============================================================
			
			

			
			
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
		
		
		//●○1060109 - 在.g218A_menuZone最下方添加空白，使較下方的選單項目可以向上捲動，否則會沒空間可以捲動。
		//=====================================================================================
		var oldHeight = $('.g218A_menuZone').height() - $('.g218A_menuItem:eq('+ (g218A.totalCard-1) + ')').height(); 
		//
		$('.g218A_menuZone').append('<div class="g218A_spacer"></div>');
		//
		$('.g218A_spacer').css({'width':'100%','height':oldHeight});
		//=====================================================================================
			
			
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




//●○1051221 - 從tPlayer.js拷貝過來。完全沒變動。 因為不知為何調用不到tPlayer.js裡的method.caculateTrackWidth()。
//error訊息，說method.caculateTrackWidth不是Ｆunction。
//1051221--------------------------------------------------------------------●○
//●計算與賦值大尺寸 .barOuter 、 .track 寬度。 傳回 .barOuterWidth值 
method.caculateTrackWidth = function(_allWidth, index){

	var trackWidth = (_allWidth+
	
				  - parseInt($('.mediaWrapper:eq(' + index + ') .pbDivInner').css('padding-left'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .pbDivInner').css('padding-right'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .pbDivInner').css('margin-left'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .pbDivInner').css('margin-right'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .pbDivInner').css('border-left-width'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .pbDivInner').css('border-right-width'))+

				  - $('.mediaWrapper:eq(' + index + ') .pbLeft').width()+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .pbLeft').css('padding-left'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .pbLeft').css('padding-right'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .pbLeft').css('margin-left'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .pbLeft').css('margin-right'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .pbLeft').css('border-left-width'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .pbLeft').css('border-right-width'))+
				  - $('.mediaWrapper:eq(' + index + ') .pbRight').width()+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .pbRight').css('padding-left'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .pbRight').css('padding-right'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .pbRight').css('margin-left'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .pbRight').css('margin-right'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .pbRight').css('border-left-width'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .pbRight').css('border-right-width'))+
				  - $('.mediaWrapper:eq(' + index + ') .playPause').width()+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .playPause').css('padding-left'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .playPause').css('padding-right'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .playPause').css('margin-left'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .playPause').css('margin-right'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .playPause').css('border-left-width'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .playPause').css('border-right-width'))+
				  - $('.mediaWrapper:eq(' + index + ') .currTime').width()+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .currTime').css('padding-left'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .currTime').css('padding-right'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .currTime').css('margin-left'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .currTime').css('margin-right'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .currTime').css('border-left-width'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .currTime').css('border-right-width'))+
				  - $('.mediaWrapper:eq(' + index + ') .totalTime').width()+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .totalTime').css('padding-left'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .totalTime').css('padding-right'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .totalTime').css('margin-left'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .totalTime').css('margin-right'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .totalTime').css('border-left-width'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .totalTime').css('border-right-width'))+
				  - $('.mediaWrapper:eq(' + index + ') .fullNormalScreen').width()+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .fullNormalScreen').css('padding-left'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .fullNormalScreen').css('padding-right'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .fullNormalScreen').css('margin-left'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .fullNormalScreen').css('margin-right'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .fullNormalScreen').css('border-left-width'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .fullNormalScreen').css('border-right-width'))+

				  - parseInt($('.mediaWrapper:eq(' + index + ') .barOuter').css('padding-left'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .barOuter').css('padding-right'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .barOuter').css('margin-left'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .barOuter').css('margin-right'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .barOuter').css('border-left-width'))+
				  - parseInt($('.mediaWrapper:eq(' + index + ') .barOuter').css('border-right-width'))+
				  - 0 );


				 //alert($('.totalTime').width()+'/'+parseInt($('.totalTime').css('border-left-width'))+'/'+parseInt($('.totalTime').css('border-right-width')));

	//alert(_allWidth + '/' + trackWidth + '/' + $('.playPause').width() + '/' + parseInt($('.playPause').css('padding-left')) + '/' + parseInt($('.playPause').css('border-left')));

	//●○
	//================================
	$('.mediaWrapper:eq(' + index + ') .barOuter').width(trackWidth); //1040907 +18
	//================================
	$('.mediaWrapper:eq(' + index + ') .track').width(trackWidth-18); //●1040907
	//================================
	

	//$('.pbRight').css({'display':'none'});
	//alert($('.playPause').width() + '/' + parseInt($('.playPause').css('padding-left')));

	//
	return $('.mediaWrapper:eq(' + index + ') .barOuter').width();

};




//●○●○●○ 操控媒體區塊的寬高 ●○●○● - 按下.g218A_plus、.g218A_minus 按鈕接調用此方法。
//●○調用g218A.adjustWidth()前，需先計算g218A.pageCurrWidth、g218A.pageCurrWidth、g218A.mediaWidth
//●○因在★★★window.resize時調用，所以，媒體區塊的寬高 和 選單區塊g218A_menuZone的寬度 以非漸變方式改變。animate()方法的秒數需設為0微秒。
//============================================================================《《《《《《《《

g218A.adjustWidth = function(){
	
	//改變頁面容器.pageWrapper的寬度
	$('.pageWrapper').width(g218A.pageCurrWidth);
	
	//改變 選單區塊.g218A_menuZone、 寬度比力控制條.g218A_controlBar 的寬度
	$('.g218A_menuZone, .g218A_controlBar').animate({'width':g218A.menuZoneCurrWidth},0);
	
	//改變媒體檔容器.mediaDiv的寬度
	$('.mediaWrapper:eq(' + g218A.mediaIndex + ') .mediaDiv').animate({'width':g218A.mediaWidth,'height':g218A.mediaHeight},0);
	
	//改變 .mediaWrapper、 .mediaHeader、.playbackDiv 的寬度 
	$('.mediaWrapper:eq(' + g218A.mediaIndex + '), .mediaWrapper:eq(' + g218A.mediaIndex + ') .mediaHeader, .mediaWrapper:eq(' + g218A.mediaIndex + ') .playbackDiv').animate({'width':g218A.mediaWidth},0,function(){});
	
	
		//1040906 - 移進來 - 可能解決全畫面下視窗resize事件，拖曳播放頭部正常之問題 ???
		//
		var playbackDivHeight = parseInt($('.mediaWrapper:eq(' + g218A.mediaIndex + ') .playbackDiv').css('height'));
		if(isNaN(playbackDivHeight)){
			playbackDivHeight = 0;
		}
		//.mediaHeader的高度
		var headerHeight = parseInt($('.mediaWrapper:eq(' + g218A.mediaIndex + ') .mediaHeader').css('height'));
		if(isNaN(headerHeight)){
			headerHeight = 0;
		}
		

		//●○1040521 - 處理$('.mediaWrapper:eq(' + g218A.mediaIndex + ') .mediaDivOverlay')的 寬高 和 margin-top
		if(param.playModeArr[0] === "flash"){

			//●◎1040629
			//===================================================
			var mediaDivOverlay_marginTop;

			//●◎播放介面在影音上方
			if($('.mediaWrapper:eq(' + g218A.mediaIndex + ')>.playbackDiv').get(0) !== undefined){
				mediaDivOverlay_marginTop = -(g218A.mediaHeight);

			//◎播放介面在影音下方
			}else if($('.mediaDiv:eq(' + g218A.mediaIndex + ')>.playbackDiv').get(0) !== undefined){
				mediaDivOverlay_marginTop = -(g218A.mediaHeight);
			}
			//alert(mediaDivOverlay_marginTop);

			//alert($('.mediaDiv:eq(' + g218A.mediaIndex + ')>.playbackDiv').get(0) != undefined);
			$('.mediaWrapper:eq(' + g218A.mediaIndex + ') .mediaDivOverlay').css({'margin-top':mediaDivOverlay_marginTop,'opacity':param.mediaDivOverlayOpacity, 'width':g218A.mediaWidth, 'height':g218A.mediaHeight});

			//===================================================
		}



		//---------------------------------------------------------------
		$('.mediaWrapper:eq(' + g218A.mediaIndex + ') .slider').draggable("destroy");
		//==============================================
		method.caculateTrackWidth(g218A.mediaWidth,g218A.mediaIndex); 
		//==============================================
		method.jqUITouchPunchDrag(g218A.mediaIndex);
		//---------------------------------------------------------------
		
		//1041015
		if(param.layoutType[g218A.mediaIndex] === "normal"){
			//=====================
			method.removeDotSpan();
			method.putDot();
			//=====================
		}else if(param.layoutType[g218A.mediaIndex] === "normal"){
			//=====================
			method.removeDotSpan2();
			method.putDot2();
			//=====================
		}
			
			

		//●○1040630 - 必須有method.updateProgress(g218A.mediaIndex)，
		//全畫面時變更視窗大小(window.resize事件)，播放頭位置、播放進度列長度才能正確更新。否則不會更新
		//=====================
		method.updateProgress(g218A.mediaIndex);
		//=====================
		
		
		//●○1040923
		//======================================================================================
		param.trackX[g218A.mediaIndex] = $('.mediaWrapper:eq(' + g218A.mediaIndex + ') .track').offset().left;
		//======================================================================================
	
	
		//操控媒體物件寬高
		g218A._mediaObj.width = g218A.mediaWidth;
		g218A._mediaObj.height = g218A.mediaHeight;
	
	
	
		//
		$('.mediaWrapper:eq(' + g218A.mediaIndex + ') ').css({'height':'auto'});
		
		
		//●○●○●○ - 調整player圖示按鈕位置(居於媒體區中央)
		method.adjustCoverImgPos(g218A.mediaIndex,2);
	
};
//============================================================================《《《《



//●○
//============================================================================《《《《
g218A.originalWinOnResize = function(){
	
	$(window).on('resize',function(){
		
		//
		if( $(window).width() <= param.breakpoint && g218A.pageWidthState === 'original' ){

			//
			g218A.mediaWidth = $(window).width();
			g218A.mediaHeight = g218A.mediaWidth/g218A.mediaW2hRatio;
			g218A.menuZoneCurrWidth = $(window).width();
			
			g218A.pageCurrWidth = $(window).width();
			
			//
			g218A.adjustWidth(); 
			
			//alert(g218A.mediaWidth+'/'+g218A.mediaHeight+'/'+g218A.menuZoneCurrWidth);
			
			
		//
		}else if( $(window).width() > param.breakpoint && g218A.pageWidthState === 'original' ){
			
			//
			g218A.mediaWidth = g218A.pageInitWidth*g218A.xRatio;
			g218A.mediaHeight = g218A.mediaWidth/g218A.mediaW2hRatio;
			g218A.menuZoneCurrWidth = g218A.pageInitWidth - g218A.mediaWidth - 1;
			
			g218A.pageCurrWidth = g218A.pageInitWidth; 
			//alert(g218A.pageCurrWidth+'/'+mediaWidth+'/'+g218A.menuZoneCurrWidth);
			
			//
			g218A.adjustWidth();
			
			//alert(g218A.pageInitWidth+'/'+g218A.mediaWidth+'/'+g218A.menuZoneCurrWidth);
			
		
		//1051228
		}else if( $(window).width() > param.breakpoint && g218A.pageWidthState === 'original_InitSmall' ){
			
			//
			g218A.mediaWidth = g218A.pageInitWidth*g218A.xRatio;
			g218A.mediaHeight = g218A.mediaWidth/g218A.mediaW2hRatio;
			g218A.menuZoneCurrWidth = g218A.pageInitWidth - g218A.mediaWidth - 1;
			
			g218A.pageCurrWidth = g218A.pageInitWidth; 
			//alert(g218A.pageCurrWidth+'/'+mediaWidth+'/'+g218A.menuZoneCurrWidth);
			
			//
			g218A.adjustWidth();
			
			
			
			//●○1051228
			g218A.xRatio = g218A.mediaWidth/g218A.pageInitWidth; 
			//alert(g218A.xRatio);
			
			//
			
			//var controlBarWidth = g218A.pageCurrWidth - g218A.mediaWidth;
			var controlBarWidth = parseInt( $('.pageWrapper').css('width') ) - g218A.mediaWidth;
			
			//
			$('.g218A_controlBar').animate({width:controlBarWidth-1},0);
			var mediaToPageWrapperRatio = g218A.mediaWidth/g218A.pageCurrWidth;
			//
			$('.g218A_controlBarPercent').delay(0).animate({'width':controlBarWidth*mediaToPageWrapperRatio},0);
			
			
		//1051228
		}else if( $(window).width() <= param.breakpoint && g218A.pageWidthState === 'original_InitSmall' ){
			
			//
			g218A.mediaWidth = $(window).width();
			g218A.mediaHeight = g218A.mediaWidth/g218A.mediaW2hRatio;
			g218A.menuZoneCurrWidth = $(window).width();
			
			g218A.pageCurrWidth = $(window).width();
			
			//
			g218A.adjustWidth(); 
			
			//alert(g218A.mediaWidth+'/'+g218A.mediaHeight+'/'+g218A.menuZoneCurrWidth);
			
		}
	
	
	});
	
};
//============================================================================《《《《



//滑鼠點擊.g218A_controlBar的事件處理
//=================================================================================《《《《《《
g218A.controlMouseDown = function(index){ 

	//1060105
	//jQuery( ":animated" ).stop();
	
	
	//●
	if( g218A.xRatio > 0.80 ){
		g218A.xRatio = 0.80;
	}
	
	//
	if( g218A.xRatio < 0.05 ){
		g218A.xRatio = 0.05;
	}
	
	//
	g218A.mediaWidth = $('.pageWrapper').width()*g218A.xRatio;
	g218A.mediaHeight = g218A.mediaWidth/g218A.mediaW2hRatio;
	//
	g218A.menuZoneCurrWidth = $('.pageWrapper').width() - g218A.mediaWidth;
	
	
	//※※※1060106
	var controlBarW = g218A.menuZoneCurrWidth*g218A.xRatio;
	$('.g218A_controlBarPercent').animate({'width':0},200).delay(200).animate({'width':controlBarW},300);
	
	
	
	//定義一個數値，使g218A.xRatio小於其值時 (即：播放進度列太短)，則隱藏$('.playbackDiv')；
	// 反之，使$('.playbackDiv')出現。
	//-------------------------------------------------------
	if( g218A.xRatio < 0.36 ){
		$('.playbackDiv').css({'display':'none'});	
	}else{
		$('.playbackDiv').css({'display':'inline-block'});
	}
	//-------------------------------------------------------


	g218A._mediaObj.width = g218A.mediaWidth;
	g218A._mediaObj.height = g218A.mediaHeight;
	//alert(g218A._mediaObj.width+'/'+g218A._mediaObj.height);
	
	
	//
	$('.g218A_menuZone, .g218A_controlBar').animate({'width':g218A.menuZoneCurrWidth-3},360,function(){
		
		//●○◎※1060105
		g218A.scrollControl();
		
	});
	
	
	//
	$('.mediaWrapper:eq(' + index + ') .mediaDiv').animate({'width':g218A.mediaWidth,'height':g218A.mediaHeight},360);
	
	
	//※※※1060106
	var xxx = $('.mediaWrapper:eq(' + index + '), .mediaWrapper:eq(' + index + ') .mediaHeader, .mediaWrapper:eq(' + index + ') .playbackDiv');
	//
	xxx.animate({'width':g218A.mediaWidth},360);
	
	
	
		//1040906 - 移進來 - 可能解決全畫面下視窗resize事件，拖曳播放頭部正常之問題 ???
		//
		var playbackDivHeight = parseInt($('.mediaWrapper:eq(' + index + ') .playbackDiv').css('height'));
		if(isNaN(playbackDivHeight)){
			playbackDivHeight = 0;
		}
		//.mediaHeader的高度
		var headerHeight = parseInt($('.mediaWrapper:eq(' + index + ') .mediaHeader').css('height'));
		if(isNaN(headerHeight)){
			headerHeight = 0;
		}
		

		//●○1040521 - 處理$('.mediaWrapper:eq(' + index + ') .mediaDivOverlay')的 寬高 和 margin-top
		if(param.playModeArr[0] === "flash"){

			//●◎1040629
			//===================================================
			var mediaDivOverlay_marginTop;

			//●◎播放介面在影音上方
			if($('.mediaWrapper:eq(' + index + ')>.playbackDiv').get(0) !== undefined){
				mediaDivOverlay_marginTop = -(g218A.mediaHeight);

			//◎播放介面在影音下方
			}else if($('.mediaDiv:eq(' + index + ')>.playbackDiv').get(0) !== undefined){
				mediaDivOverlay_marginTop = -(g218A.mediaHeight);
			}
			//alert(mediaDivOverlay_marginTop);

			//alert($('.mediaDiv:eq(' + index + ')>.playbackDiv').get(0) != undefined);
			$('.mediaWrapper:eq(' + index + ') .mediaDivOverlay').css({'margin-top':mediaDivOverlay_marginTop,'opacity':param.mediaDivOverlayOpacity, 'width':g218A.mediaWidth, 'height':g218A.mediaHeight});

			//===================================================
		}



		//---------------------------------------------------------------
		$('.mediaWrapper:eq(' + index + ') .slider').draggable("destroy");
		//==============================================
		method.caculateTrackWidth(g218A.mediaWidth,index); 
		//==============================================
		method.jqUITouchPunchDrag(index);
		//---------------------------------------------------------------
		
		//1041015
		if(param.layoutType[index] === "normal"){
			//=====================
			method.removeDotSpan();
			method.putDot();
			//=====================
		}else if(param.layoutType[index] === "normal"){
			//=====================
			method.removeDotSpan2();
			method.putDot2();
			//=====================
		}
			
			

		//●○1040630 - 必須有method.updateProgress(index)，
		//全畫面時變更視窗大小(window.resize事件)，播放頭位置、播放進度列長度才能正確更新。否則不會更新
		//=====================
		method.updateProgress(index);
		//=====================
		
		
		//●○1040923
		//======================================================================================
		param.trackX[index] = $('.mediaWrapper:eq(' + index + ') .track').offset().left;
		//======================================================================================
	
	
	//
	//g218A._mediaObj.width = g218A.mediaWidth;
	//g218A._mediaObj.height = g218A.mediaHeight;
	//alert(g218A._mediaObj.width+'/'+g218A._mediaObj.height);
	
	
	//
	//● IE6~IE8 - 不可用程式操控.mediaWrapper的CSS - height為auto，否則此方法的功能會錯亂。(.g218A_menuZone會先往下掉)
	//.mediaWrapper的CSS背景必須設為透明，即不能設底色
	//============================================================================
	if (!window.addEventListener) { 
		//
		
	//IE9及以上，
	}else{
		$('.mediaWrapper:eq(' + index + ') ').css({'height':'auto'});	
	}
	//============================================================================
	
	
	
	//●○●○●○ - 調整位置
	method.adjustCoverImgPos(index,2);
	
	
	
	
};


//●○滑鼠點擊在$('.g218A_controlBar')上，可依點擊位置比例，控制媒體寬度 和 選單區塊.g218A_menuZone的寬度
//●○媒體區塊的寬高 和 選單區塊g218A_menuZone的寬度 以漸變方式改變。animate()方法有一定微秒數。
g218A.controlWidth = function(index){
	
	//mousedown - 滑鼠點擊在$('.g218A_controlBar')
	//-----------------------------------------------------
	$('.g218A_controlBar').on('mousedown',function(e){
	//-----------------------------------------------------
	
	
	//●○1060106
	jQuery( ":animated" ).clearQueue();
  	jQuery( ":animated" ).stop();
	
		
		//●○1060105 - 為避免連擊.g218A_controlBar，造成g218A_mediaZone往下掉
		//=======================================================《《《《《《
		/*$('.g218A_controlBar').off('mousedown');
		setTimeout(function(){
			g218A.controlWidth(index);
		},1000);*/
		//=======================================================《《《《《《
		
		
		
		//先計算，最底下再調用g218A.controlMouseDown(index);
		//=============================================●○
		
		
		//$('.g218A_controlBar')的X位置
		var controlBarX = $('.g218A_controlBar').offset().left;
		
		//滑鼠點擊在$('.g218A_controlBar')上的相對位置
		g218A.clickPosX = e.pageX - controlBarX; 
		//alert(controlBarX +'/' + g218A.clickPosX);
		
		//取得媒體物件
		if(param.playModeArr[0] === "flash"){
			g218A._mediaObj = tPlayer.swfMediaObj[index];
			
		}else if(param.playModeArr[0] === "html5"){
			g218A._mediaObj = tPlayer.h5MediaObj[index];
		}
		
		//取得媒體寬高
		g218A.mediaWidth = parseInt(g218A._mediaObj.width);
		g218A.mediaHeight = parseInt(g218A._mediaObj.height);
		//alert(g218A.mediaWidth+'/'+g218A.mediaHeight);
		
		//媒體檔(影音)之寬高比
		//g218A.mediaW2hRatio = g218A.mediaWidth/g218A.mediaHeight;
		//alert(g218A.mediaW2hRatio);
		
		//.g218A_menuZone的寬度 - .g218A_controlBar的寬度為100%，會跟隨.g218A_menuZone的寬度
		g218A.menuZoneCurrWidth = $('.g218A_menuZone').width();
		
		//
		g218A.xRatio = g218A.clickPosX/g218A.menuZoneCurrWidth;
		//alert(g218A.xRatio);
		
		//1051233
		$('.g218A_controlBar').css({'background-image':'none'});
		
		
		//●○
		g218A.controlMouseDown(index);
		
		
		//改到$(document).ready裡最下方
		//g218A.originalWinOnResize();
		
		
	
	
	//-----------------------------------------------------
	});
	//-----------------------------------------------------
	

};
//=================================================================================《《《《《《


//
//初始頁面時，計算與控制 .g218A_controlBar、.g218A_controlBarPercent的寬度
g218A.initControlWidth = function(index){
	
	//1051228
	if( $(window).width() <= param.breakpoint ){
		g218A.pageWidthState = 'original_InitSmall';
		
	}
	
	
	//取得媒體物件
	if(param.playModeArr[0] === "flash"){
		g218A._mediaObj = tPlayer.swfMediaObj[index];
		
	}else if(param.playModeArr[0] === "html5"){
		g218A._mediaObj = tPlayer.h5MediaObj[index];
	}
	
	//取得媒體寬高
	//g218A.mediaWidth = parseInt(g218A._mediaObj.width);
	//g218A.mediaHeight = parseInt(g218A._mediaObj.height);
	g218A.mediaWidth = parseInt( $('.mediaWrapper:eq(' + index + ') .mediaWidth').text() );
	g218A.mediaHeight = parseInt( $('.mediaWrapper:eq(' + index + ') .mediaHeight').text() );
	
	//●○1051222
	g218A.xRatio = g218A.mediaWidth/g218A.pageInitWidth; 
	//alert(g218A.xRatio);
	
	//
	//g218A.mediaWidth = parseInt( param.mediaWidthArr[index] );
	
	//var controlBarWidth = $('.pageWrapper').width() - g218A.mediaWidth;
	var controlBarWidth = parseInt( $('.pageWrapper').css('width') ) - g218A.mediaWidth;
	
	//
	$('.g218A_controlBar').animate({width:controlBarWidth-1},360);
	var mediaToPageWrapperRatio = g218A.mediaWidth/$('.pageWrapper').width();
	
	
	//※※※1060106
	var controlBarW = controlBarWidth*mediaToPageWrapperRatio;
	//
	$('.g218A_controlBarPercent').delay(360).animate({'width':controlBarW},360);
	

	
};



//●○●○●○1051220●○●○●○ - ※另類的整個頁面進入全畫面
g218A.pageWidthControlEvent = function(_toPageFlag){
	
	//●○1060106
	jQuery( ":animated" ).clearQueue();
  	jQuery( ":animated" ).stop();
	
		
		var pageWidth;
		
		//舊的pageWidth
		if(_toPageFlag === 'toFullPage'){
			//目前的pageWidth，還沒變換前
			pageWidth = g218A.pageInitWidth;
			//
			g218A.pageWidthState = 'fullPage';
			g218A.showHideBtn();
			
		}else if(_toPageFlag === 'toOriginal'){
			//目前的pageWidth，還沒變換前
			pageWidth = $(window).width();
			//
			g218A.pageWidthState = 'original';
			g218A.showHideBtn();
		}
		
		
		//取得目前媒體寬高
		g218A.mediaWidth = parseInt(g218A._mediaObj.width);
		g218A.mediaHeight = parseInt(g218A._mediaObj.height);
		//alert(g218A.mediaWidth+'/'+g218A.mediaHeight);
				
		//.g218A_menuZone 目前寬度 - ●○讓g218A.menuZoneCurrWidth-3
		g218A.menuZoneCurrWidth = $('.g218A_menuZone').width();
		
		//頁面寬度除以.g218A_menuZone寬度的比例 - 此處也是 目前的pageWidth，還沒變換前
		var pageToMenuZoneWidthRatio = pageWidth/g218A.menuZoneCurrWidth;
		
		//頁面寬度除以媒體寬度的比例 - 此處也是 目前的pageWidth，還沒變
		var pageToMediaWidthRatio = pageWidth/g218A.mediaWidth;
		
		
		
		//●○新的pageWidth
		//----------------------------------------------------------------------
		if(_toPageFlag === 'toFullPage'){
			//視窗寬度
			pageWidth = $(window).width();
		}else if(_toPageFlag === 'toOriginal'){
			//.pageWrapper原始寬度
			pageWidth = g218A.pageInitWidth;
		}
		
		//計算媒體[新寬高]
		g218A.mediaWidth = pageWidth/pageToMediaWidthRatio;
		g218A.mediaHeight = g218A.mediaWidth/g218A.mediaW2hRatio;
		//alert(g218A.mediaW2hRatio+'///'+g218A.mediaWidth+'/'+g218A.mediaHeight);
		
		//計算.g218A_menuZone新的寬度
		//g218A.menuZoneCurrWidth = pageWidth/pageToMenuZoneWidthRatio;
		g218A.menuZoneCurrWidth = pageWidth - g218A.mediaWidth;
		//----------------------------------------------------------------------
		

		
		
		//
		if(_toPageFlag === 'toFullPage'){
			$('.pageWrapper').animate({width:pageWidth},360);
			
			$('.g218A_menuZone, .g218A_controlBar').animate({'width':g218A.menuZoneCurrWidth-3},360);
			
			//●○1060105
			//$('.g218A_menuZone').height( $(window).height() - $('.g218A_header').height() - $('.g218A_controlBar').height() );
			
			$('.g218A_menuZone').animate( {
				'height':$(window).height() - $('.g218A_header').height() - $('.g218A_controlBar').height(),
				'width':g218A.menuZoneCurrWidth-3},360, function(){
					
					g218A.scrollControl();
					
				});
			
		}else if(_toPageFlag === 'toOriginal'){
			//●○1060105
			//$('.g218A_menuZone').height( parseInt($('.g218A_controlBar').css('min-height')) );
			
			$('.g218A_menuZone, .g218A_controlBar').animate({'width':g218A.menuZoneCurrWidth-3},360);
			
			$('.g218A_menuZone').animate( {
				'height': parseInt($('.g218A_controlBar').css('min-height')),
				'width':g218A.menuZoneCurrWidth-3},360, function(){
					
					g218A.scrollControl();
					
				});
			
			$('.pageWrapper').animate({width:pageWidth},500);
		}

		//※※※1060106
		var controlBarW = (g218A.menuZoneCurrWidth-3)/pageToMediaWidthRatio;
		$('.g218A_controlBarPercent').animate({'width':0},100).delay(200).animate({'width':controlBarW},360);
		
		
		
		
		//媒體寬高調整
		g218A._mediaObj.width = g218A.mediaWidth;
		g218A._mediaObj.height = g218A.mediaHeight;
		
		
		
		//
		$('.mediaWrapper:eq(' + g218A.mediaIndex + ') .mediaDiv').animate({'width':g218A.mediaWidth,'height':g218A.mediaHeight},360);
		
		//※※※1060106
		var xxx= $('.mediaWrapper:eq(' + g218A.mediaIndex + '), .mediaWrapper:eq(' + g218A.mediaIndex + ') .mediaHeader, .mediaWrapper:eq(' + g218A.mediaIndex + ') .playbackDiv');
		xxx.animate({'width':g218A.mediaWidth},500,function(){});
		
		
			//1040906 - 移進來 - 可能解決全畫面下視窗resize事件，拖曳播放頭部正常之問題 ???
			//
			var playbackDivHeight = parseInt($('.mediaWrapper:eq(' + g218A.mediaIndex + ') .playbackDiv').css('height'));
			if(isNaN(playbackDivHeight)){
				playbackDivHeight = 0;
			}
			//.mediaHeader的高度
			var headerHeight = parseInt($('.mediaWrapper:eq(' + g218A.mediaIndex + ') .mediaHeader').css('height'));
			if(isNaN(headerHeight)){
				headerHeight = 0;
			}
			
	
			//●○1040521 - 處理$('.mediaWrapper:eq(' + g218A.mediaIndex + ') .mediaDivOverlay')的 寬高 和 margin-top
			if(param.playModeArr[0] === "flash"){
	
				//●◎1040629
				//===================================================
				var mediaDivOverlay_marginTop;
	
				//●◎播放介面在影音上方
				if($('.mediaWrapper:eq(' + g218A.mediaIndex + ')>.playbackDiv').get(0) !== undefined){
					mediaDivOverlay_marginTop = -(g218A.mediaHeight);
	
				//◎播放介面在影音下方
				}else if($('.mediaDiv:eq(' + g218A.mediaIndex + ')>.playbackDiv').get(0) !== undefined){
					mediaDivOverlay_marginTop = -(g218A.mediaHeight);
				}
				//alert(mediaDivOverlay_marginTop);
	
				//alert($('.mediaDiv:eq(' + g218A.mediaIndex + ')>.playbackDiv').get(0) != undefined);
				$('.mediaWrapper:eq(' + g218A.mediaIndex + ') .mediaDivOverlay').css({'margin-top':mediaDivOverlay_marginTop,'opacity':param.mediaDivOverlayOpacity, 'width':g218A.mediaWidth, 'height':g218A.mediaHeight});
	
				//===================================================
			}
	
	
	
			//---------------------------------------------------------------
			$('.mediaWrapper:eq(' + g218A.mediaIndex + ') .slider').draggable("destroy");
			//==============================================
			method.caculateTrackWidth(g218A.mediaWidth, g218A.mediaIndex); 
			//==============================================
			method.jqUITouchPunchDrag(g218A.mediaIndex);
			//---------------------------------------------------------------
			
			//1041015
			if(param.layoutType[g218A.mediaIndex] === "normal"){
				//=====================
				method.removeDotSpan();
				method.putDot();
				//=====================
			}else if(param.layoutType[g218A.mediaIndex] === "normal"){
				//=====================
				method.removeDotSpan2();
				method.putDot2();
				//=====================
			}
				
				
	
			//●○1040630 - 必須有method.updateProgress(g218A.mediaIndex)，
			//全畫面時變更視窗大小(window.resize事件)，播放頭位置、播放進度列長度才能正確更新。否則不會更新
			//=====================
			method.updateProgress(g218A.mediaIndex);
			//=====================
			
			
			//●○1040923
			//======================================================================================
			param.trackX[g218A.mediaIndex] = $('.mediaWrapper:eq(' + g218A.mediaIndex + ') .track').offset().left;
			//======================================================================================
		
		
			//媒體寬高調整
			//g218A._mediaObj.width = g218A.mediaWidth;
			//g218A._mediaObj.height = g218A.mediaHeight;
			//alert(g218A._mediaObj.width+'/'+g218A._mediaObj.height);
		
		
		
		//
		//● IE6~IE8 - 不可用程式操控.mediaWrapper的CSS - height為auto，否則此方法的功能會錯亂。(.g218A_menuZone會先往下掉)
		//.mediaWrapper的CSS背景必須設為透明，即不能設底色
		//============================================================================
		if (!window.addEventListener) { 
			//
			
		//IE9及以上，
		}else{
			$('.mediaWrapper:eq(' + g218A.mediaIndex + ') ').css({'height':'auto'});	
		}
		//============================================================================
		
		
		
		
		//●○●○●○ - 調整位置
		method.adjustCoverImgPos(g218A.mediaIndex,2);
		
		
		

	
};


//《整頁全畫面》時，調整視窗大小的事件與處理
g218A.fullPageWinOnResize = function(){ 
	
	$(window).on('resize',function(){
		
		//●○
		if( $(window).width() > param.breakpoint && g218A.pageWidthState === 'fullPage' ){

			
			g218A.pageCurrWidth = $(window).width(); 
			//
			g218A.mediaWidth = g218A.pageCurrWidth*g218A.xRatio; 
			g218A.mediaHeight = g218A.mediaWidth/g218A.mediaW2hRatio;
			g218A.menuZoneCurrWidth = g218A.pageCurrWidth - g218A.mediaWidth - 1;
			//alert(g218A.mediaWidth+'/'+g218A.menuZoneCurrWidth);
			
			$('.g218A_controlBarPercent').animate({'width':g218A.menuZoneCurrWidth*g218A.xRatio},0);
			
			
			//
			g218A.adjustWidth();
			
		
		//●○
		}else if( $(window).width() <= param.breakpoint && g218A.pageWidthState === 'fullPage' ){
			//
			//$(window).off('resize');
			//
			//g218A.pageWidthControlEvent('toOriginal');
			
			
			g218A.pageCurrWidth = $(window).width();
			//
			g218A.mediaWidth = g218A.pageCurrWidth;
			g218A.mediaHeight = g218A.mediaWidth/g218A.mediaW2hRatio;
			g218A.menuZoneCurrWidth = g218A.pageCurrWidth;
			
			//
			g218A.adjustWidth();
			
			
		}
	
		
	});
};


//控制.g218A_plus和.g218A_minus按鈕的切換(出現或隱藏)
g218A.showHideBtn = function(){
	//
	if( g218A.pageWidthState === "original" ){
		$('.g218A_minus').css({'display':'none'});
		$('.g218A_plus').css({'display':'table-cell'});
	}else if( g218A.pageWidthState === "fullPage" ){
		$('.g218A_minus').css({'display':'table-cell'});
		$('.g218A_plus').css({'display':'none'});
	}
};


//關閉.g218A_plus和.g218A_minus的按鈕事件偵聽。(沒用到)
g218A.plusMinusMouseEventOff = function(){
	//
	$('.g218A_plus').off('mouseover');
	$('.g218A_plus').off('mouseout');
	$('.g218A_plus').off('mousedown');
	//
	$('.g218A_minus').off('mouseover');
	$('.g218A_minus').off('mouseout');
	$('.g218A_minus').off('mousedown');
};


//$('.g218A_plus')按鈕，將.pageWrapper寬度放大到視窗寬度。另類的全畫面功能。
//$('.g218A_minus')按鈕，將.pageWrapper寬度縮至初始寬度。
g218A.plusMinusMouseEvent = function(){
	
	//
	$('.g218A_plus').on('mouseover',function(){
		$('.g218A_plus img').attr('src',param.mainPath + 'g218A_VideoCue/images/plusBtnImg_over.png');
	});
	
	//
	$('.g218A_plus').on('mouseout',function(){
		$('.g218A_plus img').attr('src',param.mainPath + 'g218A_VideoCue/images/plusBtnImg.png');
	});
	
	//$('.g218A_plus')按鈕，將.pageWrapper寬度放大到視窗寬度。另類的全畫面功能。
	$('.g218A_plus').on('mousedown',function(){
		$('.g218A_plus img').attr('src',param.mainPath + 'g218A_VideoCue/images/plusBtnImg.png');
		
		//
		g218A.pageWidthState = 'fullPage';
		g218A.showHideBtn();
		
		//
		g218A.pageWidthControlEvent('toFullPage');
		
		//改到$(document).ready裡最下方
		//g218A.fullPageWinOnResize();
		
	});
	
	//============================================================================↑↑↑●○↓↓↓
	
	//
	$('.g218A_minus').on('mouseover',function(){
		$('.g218A_minus img').attr('src',param.mainPath + 'g218A_VideoCue/images/minusBtnImg_over.png');
	});
	
	//
	$('.g218A_minus').on('mouseout',function(){
		$('.g218A_minus img').attr('src',param.mainPath + 'g218A_VideoCue/images/minusBtnImg.png');
	});
	
	//$('.g218A_minus')按鈕，將.pageWrapper寬度縮至初始寬度
	$('.g218A_minus').on('mousedown',function(){
		$('.g218A_minus img').attr('src',param.mainPath + 'g218A_VideoCue/images/minusBtnImg.png');
		
		//
		g218A.pageWidthState = 'original';
		g218A.showHideBtn();
		
		//
		g218A.pageWidthControlEvent('toOriginal');
		
	});
	
};


//help滑鼠事件
g218A.helpMouseEvent = function(){
	$('.g218A_help img').on('mouseover',function(){
		$(this).attr('src', param.mainPath + 'g218A_VideoCue/images/help_over.png');
	});
	$('.g218A_help img').on('mouseout',function(){
		$(this).attr('src', param.mainPath + 'g218A_VideoCue/images/help.png');
	});
	$('.g218A_help img').on('mousedown',function(){
		$(this).attr('src', param.mainPath + 'g218A_VideoCue/images/help.png');
		$('.g218A_help a').attr({'href':param.helpUrl,target:'_blank'});
	});
};


//載入標題列的一些圖檔
g218A.createImg = function(){
	//
	$('.g218A_nouIcon').html('<img src="' + param.mainPath + 'g218A_VideoCue/images/nou_media@g218A.png" alt="NOU Media Icon.">');
	//
	$('.g218A_minus').html('<img src="' + param.mainPath + 'g218A_VideoCue/images/minusBtnImg.png" alt="縮小頁面">');
	//
	$('.g218A_plus').html('<img src="' + param.mainPath + 'g218A_VideoCue/images/plusBtnImg.png" alt="加大頁面">');
	//
	$('.g218A_help').html('<a><img src="' + param.mainPath + 'g218A_VideoCue/images/help.png" alt="加大頁面"></a>');
	
	//
	if( g218A.pageWidthState === "original" ){
		$('.g218A_minus').css({'display':'none'});
	}
	
	
};



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


//1041202
$(window).on('resize', function(){
	// IE6~IE8 - ※IE9在此處對window.attachEvent 則有反應
	method.lessThenIE9Css();
});


//預載控制 - 從HTML移過來。
//1051104 - 從$(document).ready裡面調用
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
	
	//1051104 - 延遲300毫秒再調用 - 預載方法method.preloaderFadeOut()
	//--------------------------------------------
	//setTimeout( method.preloaderFadeOut, 300);
	setTimeout( method.preloaderFadeOut, 300);
	//--------------------------------------------
		
	
	//●整體縮放頁面 - 強迫設定為1.0，以避免播放控制失常
	//============================
	$('body').css('zoom','1.0');
	//============================
	
	
	//載入標題列的一些圖檔影像
	g218A.createImg();
	
	//新手上路按鈕事件與處理
	g218A.helpMouseEvent();
	
	
	//1050323 - 將timecode資訊存入g218A.timeCodeArr二維陣列
	g218A.createTimeCodeArr();
	
	//1051011 - 
	//●將所有.g218A_card資料存入g218A.cardHtml陣列 & 及其他處理
	//●全部的.g218A_card，都append到.g218A_cardGroupShow裡
	//●將小標題存到g218A.cardTitleArr
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
		
		//param.mediaAutoPlayArr[mediaIndex] = true;
		method.embedMedia(mediaIndex);
		
		//是否有？
		if(param.hasEnteringMotion){
			//媒體介面進場jQ動作 
			method.entering(mediaIndex);
		}
		
		
		
		//1050325 - ●只讓第一個媒體檔具備偵測timecode的能力
		if(mediaIndex === 0){
			
			//1051216
			g218A.mediaIndex = mediaIndex;
			
			//取得資料
			//==================================================
			//取得.pageWrapper初始寬度
			//g218A.pageInitWidth = $('.pageWrapper').width();
			
			//1051228 - 
			//●◎注意：HTML裡，在.pageWrapper增加屬性 ●○「data-pageWidth="800"」。做為.pageWrapper的頁面寬度。
			//這在以小視窗進入頁面時必要存取，才能在resize進入大視窗時正確RWD。
			//=======================================================================●
			g218A.pageInitWidth = parseInt($('.pageWrapper').attr('data-pageWidth'));
			//=======================================================================●
			//alert(g218A.pageInitWidth);
			
			//●目前的頁面寬度
			g218A.pageCurrWidth = $('.pageWrapper').width();
			
			//
			//取得媒體初始寬高
			g218A.mediaWidth = param.mediaWidthArr[g218A.mediaIndex];
			g218A.mediaHeight = param.mediaHeightArr[g218A.mediaIndex];
			
			//計算媒體寬高比
			g218A.mediaW2hRatio = g218A.mediaWidth/g218A.mediaHeight;
			//==================================================
			
			
			
			//●○●○●○1051108 - ●○計算操控mediaWrapper的高度，
			//解決：mediaWrapper過高所產生的mediaWrapper和g218A_cardGroupShow之間可能產生的10px間隙。
			//G218A版型從G213A轉製而來，G213A有上述問題。G218A也許沒有？？？
			//=====================================================================
			/*var tmpHeight = $('.mediaWrapper:eq(' + g218A.mediaIndex + ') .mediaHeader').height() + $('.mediaWrapper:eq(' + g218A.mediaIndex + ') .playbackDiv').height() + $('.mediaWrapper:eq(' + g218A.mediaIndex + ') .mediaDiv').height();
			$('.mediaWrapper:eq(' + g218A.mediaIndex + ')').css({'height':tmpHeight});*/
			//=====================================================================
			
			
			//●●●//數字按鈕.g218A_numButton、.g218A_menuButton開啟選單列表按鈕、.g218A_returnNumButton返回純粹數字按鈕 的滑鼠事件處理
			//----------------------------
			g218A.buttonsMouseEvent();
			//----------------------------
			
			
			
			//1051208 - G218A版型由G213A轉製而成，但G218A沒有純粹按鈕選單的狀態，
			//所以直接觸發$('.g218A_menuButton')的mousedown事件，進入列表選單的狀態。
			//並隱藏$('.g218A_numButtonGroup')。 .g218A_numButtonGrou為所有.numButton的容器。
			//========================================================
			//========================================================
			$('.g218A_menuButton').trigger('mousedown');
			$('.g218A_numButtonGroup').css({'display':'none'});
			//========================================================
			//========================================================
			
			
			 
			 //●○初始頁面時，計算與控制 .g218A_controlBar、.g218A_controlBarPercent的寬度
			 //=============================================================
			 g218A.initControlWidth(g218A.mediaIndex);
			 //=============================================================
			 
			 
			 //●○滑鼠點擊在$('.g218A_controlBar')上，可依點擊位置比例，控制媒體寬度 和 選單區塊.g218A_menuZone的寬度
			 //=============================================================
			 g218A.controlWidth(g218A.mediaIndex);
			 //=============================================================
			 
				
			
		}
		
		
		
		//●○1051229 - 在Mobile(Android、iOS)媒體檔不會自動播放，點擊Play按鈕開始播放後，影音區塊會遮到下方[列表選單]的第一個[選單項目]。
		//所以，藉由HTML5影音物件的durationchange事件偵聽，當觸發時，去trigger　window的resize事件。可重新計算與處理媒體寬高。
		//==========================================================================
		//==========================================================================
		$(tPlayer.h5MediaObj[g218A.mediaIndex]).on('durationchange',function(){//durationchange：媒體資料的長度變更了(發生於取得說明資料時)
			//
			$(window).trigger('resize');
			
		});
		//==========================================================================
		//==========================================================================
		
		
		
		
	});
	//===================================
	

	
	//點小圖跳大圖 - 這得在method.lessThenIE9Css()上方。
	method.createMagnifierIcon();
	
	//名詞解釋
	method.glossary();
	
	// IE6~IE8 - ※IE9在此處對window.attachEvent 沒有反應
	method.lessThenIE9Css();
	
	
	
	//集中到此
	//
	g218A.plusMinusMouseEvent();
	//
	g218A.originalWinOnResize();
	//
	g218A.fullPageWinOnResize();
	
	
	//需再測試 - 注意IE8？
	$(window).trigger('resize');
	
	
	
	

});




//>>>=============================================================>>>
})(jQuery); //↑↑↑


























