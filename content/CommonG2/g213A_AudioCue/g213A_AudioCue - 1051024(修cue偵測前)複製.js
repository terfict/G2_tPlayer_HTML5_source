// JavaScript Document - G213A│g213A_AudioCue.js
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
var g213A = NOU.namespace('NOU.modules.g213A');
//------------------------


//
g213A.timeCodeArr = [];
g213A.cardHtml = [];
g213A.cardObj = [];
g213A.cardTitleArr = [];
g213A.prevCardIndex = -1;
g213A.currCardIndex = 0;
g213A.totalCard = 0;
g213A.mediaIndex = 0;



//1041208 - 需置於上方，method.lessThenIE9Css()才調用得到。
method.lessThenIE9Css = function(){
	// IE6~IE8
	if (!document.addEventListener) {
		//
		if($(window).width() <= param.breakpoint){
			method.rwdCss();
		}else if($(window).width() > param.breakpoint){
			method.normalCss();
		}
	}
};


//將inVideoQuiz暫停點時間存入timeCodeArr陣列
g213A.createTimeCodeArr = function(){  

	$('.g213A_card').each(function(index) { 
	
		//
		if( $('.g213A_card:eq(' + index + ') .timeCode_start').text()  && $('.g213A_card:eq(' + index + ') .timeCode_end').text() ){
			
			//
			g213A.timeCodeArr.push( [
						method.hmsToSecond( $('.g213A_card:eq(' + index + ') .timeCode_start').text() ), //起始點
						method.hmsToSecond( $('.g213A_card:eq(' + index + ') .timeCode_end').text() ), //結束點
						0 //所對應內容，目前是否處於出現狀態的旗標。0：隱藏│1：出現。
					] );
			
			//
			if( index === $('.g213A_card').length-1 ){ 
				//alert( g213A.timeCodeArr );
			}
			
		}

    });
	
	//alert( g213A.timeCodeArr );

};


//●將所有.g213A_card資料存入g213A.cardHtml陣列 & 及其他處理
g213A.createCardTitleArrNElse = function(){  

	//
	var menuButtonHtml = '<div class="g213A_menuButton"></div>';
	$('.g213A_numButtonGroup').append( menuButtonHtml );
	
	//
	var returnNumButtonHtml = '<div class="g213A_returnNumButton"></div>';
	$('.g213A_numButtonGroup').append( returnNumButtonHtml );
	
	
	//
	$('.g213A_card').each(function(index) { 
	
		//將所有.g213A_card的HTML資料存入g213A.cardHtml陣列。但換頁功能沒用到。
		g213A.cardHtml[index] = '<div class="g213A_card">' + $('.g213A_card:eq(' + index + ')').html() + '</div>';
		//alert(g213A.cardHtml[index]);
		
		
		//存入jQ物件，但換頁功能沒用到。
		g213A.cardObj[index]= $('.g213A_card:eq(' + index + ')');

		
		//●全部的.g213A_card，都append到.g213A_cardGroupShow裡
		$('.g213A_cardGroupShow').append( $('.g213A_card:eq(' + (index) + ')') );
		
		
		
		//●●●●●●1051014 - 附加數字按鈕
		//==============================================================
		var numButtonHtml = '<span class="g213A_numButton"></span>';
		$('.g213A_numButtonGroup').append( numButtonHtml );
		//
		$('.g213A_numButton:eq(' + index + ')').html(index+1);
		//==============================================================
		
		
		//●將小標題存到g213A.cardTitleArr
		g213A.cardTitleArr[index] = $('.g213A_cardTitle:eq(' + index + ')').html();
		
		
		
		//取得總頁數g213A.totalCard
		if(index === $('.g213A_card').length-1){
			//
			g213A.totalCard = g213A.cardHtml.length; 
			//
			//alert(g213A.cardHtml[4]);
			//alert(g213A.totalCard);
			//alert(g213A.cardTitleArr);
		}
		
	

    });
	
	
	
	//將所有的.g213A_card的display屬性值設為none，●○隱藏。
	setTimeout(function(){
		
		$('.g213A_card').each(function(index) { 
		
			//●○在上面存進陣列，setTimeout 300毫秒後，將所有.g213A_card隱藏。
			$('.g213A_card:eq(' + ((g213A.totalCard-1)-(index)) + ')').css({'visibility':'visible','display':'none'});
			
			//alert((g213A.totalCard-1)-(index) + '/' + $('.g213A_card').length);
		});
		
	},300);
	


};



//●●●○○○由tPlayer.js調用此處的method.updateCurrTime()
method.updateCurrTime = function(mediaIndex){
	//
	g213A.mediaIndex = mediaIndex;
	//
	$.each(g213A.timeCodeArr,function(timeCodeIndex){
		g213A.checkTimeCode(g213A.mediaIndex, timeCodeIndex);
	});
	
};


//目前沒用到
g213A.hideAllCard = function(){
	var cardLength = g213A.cardHtml.length; 
	
	$.each(g213A.timeCodeArr,function(index){
		//$('.g213A_card:eq(' + index + ')').css({'display':'none'});
		
		$('.g213A_card:eq(' + ((cardLength-1)-(index)) + ')').css({'display':'none'});
		g213A.timeCodeArr[(cardLength-1)-(index)][2] = 0;
		
	});
};
	


//●○●○●○被method.updateCurrTime(){}所調用
g213A.checkTimeCode = function(mediaIndex, timeCodeIndex){
	
	//取得timeCode資訊
	var tStart = g213A.timeCodeArr[timeCodeIndex][0]; //一個區段的起始點
	var tEnd = g213A.timeCodeArr[timeCodeIndex][1]; //一個區段的結束點
	var currT = param.currTimeArr[mediaIndex]; //索引為mediaIndex的媒體檔的目前播放時間
	
	
	//※●○◎《《《《《《《《《《《《《《《《《
	//================================================================
	//《時間區段：●○進》
	if( currT >= tStart && currT < tEnd ){
		
		g213A.currCardIndex = timeCodeIndex;
		
		if( g213A.timeCodeArr[g213A.currCardIndex][2] === 0 ){
			g213A.timeCodeArr[g213A.currCardIndex][2] = 1;
			
			//=================================================
			//當g213A.prevCardIndex不等於初始賦值的-1
			if( g213A.prevCardIndex !== -1){
				g213A.timeCodeArr[g213A.prevCardIndex][2] = 0;
				//隱藏前一個.g213A_card
				$('.g213A_card:eq(' + g213A.prevCardIndex + ')').css({'display':'none'});
				
				//●○1051018
				$.each(g213A.timeCodeArr,function(index){
					$('.g213A_numButton:eq(' + index + ')').removeClass('g213A_numButton_keep');
				});
			}
			//=================================================
			
			//
			$('.g213A_card:eq(' + g213A.currCardIndex + ')').css({'display':'block','opacity':'0.0'});
			$('.g213A_card:eq(' + g213A.currCardIndex + ')').animate({'opacity':'1.0'},600,function(){
				
				//●○1051019
				//===============================================================================
				//Android Mobile Chrome不會自動播放，若按下第一個數字鈕，會反覆執行animate動畫出現
				//需在此多加一個 g213A.timeCodeArr[g213A.currCardIndex][2] = 1 ，讓條件式排除動畫的執行。
				g213A.timeCodeArr[g213A.currCardIndex][2] = 1;
				//===============================================================================
				
				
			});
			
			//●○1051018
			$('.g213A_numButton:eq(' + g213A.currCardIndex + ')').addClass('g213A_numButton_keep');
			
			//
			g213A.prevCardIndex = g213A.currCardIndex;
		}
		
		
		
		
		
		//※●○◎《《《《《《《《《《《《《《《《《
		//--------------------------------------------------
		//《時間區段：●○出》
		/*if( currT >= tEnd ){
		
			if( g213A.timeCodeArr[g213A.currCardIndex][2] === 1 ){
				g213A.timeCodeArr[g213A.currCardIndex][2] = 0;
				
				//g213A.hideAllCard();
				$('.g213A_card:eq(' + g213A.currCardIndex + ')').css({'display':'none'});
				
				//g213A.prevCardIndex = g213A.currCardIndex;
				
			}
			
		}*/
		//--------------------------------------------------
		
	}
	//================================================================
	
	
};


//消除.g213A_menuItem的滑鼠事件
g213A.offMenuItemMEvent = function(){
	//下方選單項目
	$.each(g213A.timeCodeArr, function(itemIndex) { 
		//mouseover
		$('.g213A_menuItem:eq('+ itemIndex + ')').off('mouseover');
		//mouseout
		$('.g213A_menuItem:eq('+ itemIndex + ')').off('mouseout');
		
		//mousedown
		$('.g213A_menuItem:eq('+ itemIndex + ')').off('mousedown');
	});
	
};


//1051018
g213A.clickButtonEvent = function(){
	
	
	//數字按鈕.g213A_numButton的滑鼠事件處理
	$.each(g213A.timeCodeArr,function(timeCodeIndex){
		
		//mouseover
		$('.g213A_numButton:eq(' + timeCodeIndex + ')').on('mouseover',function(){
			$('.g213A_numButton:eq(' + timeCodeIndex + ')').addClass('g213A_numButton_over');
		});
		
		//mouseout
		$('.g213A_numButton:eq(' + timeCodeIndex + ')').on('mouseout',function(){
			$('.g213A_numButton:eq(' + timeCodeIndex + ')').removeClass('g213A_numButton_over');
		});
		
		
		//●○1051018
		//==========================================================================
		//mousedown
		$('.g213A_numButton:eq(' + timeCodeIndex + ')').on('mousedown',function(){
			
			//alert(param.playingFlagArr[g213A.mediaIndex]);
			
			//●○1051019
			if( !param.playingFlagArr[g213A.mediaIndex] ){
				tPlayer.play(g213A.mediaIndex);
			}
			
			
			//
			$('.g213A_numButton:eq(' + timeCodeIndex + ')').removeClass('g213A_numButton_over');
			
			//
			//●○1051020 - 再加這行
			$('.g213A_numButton:eq(' + timeCodeIndex + ')').addClass('g213A_numButton_keep');
			
			//
			//停止更新進度列
			tPlayer.pauseUpdateTimer(g213A.mediaIndex);
			//暫停播放
			tPlayer.pause(g213A.mediaIndex);
			
			//
			g213A.prevCardIndex = g213A.currCardIndex;
			//g213A.currCardIndex =timeCodeIndex; //這裡不需
			
			//計算比例
			var currPercent = g213A.timeCodeArr[timeCodeIndex][0]/param.totalTimeArr[g213A.mediaIndex];
			//計算.track的長度
			var trackWidth = $('.mediaWrapper:eq(' + g213A.mediaIndex + ') .track').width();
			
			//移動.slider到定位 --- 水平位置減9，因為.slider預設x位置是-9。
			$('.mediaWrapper:eq(' + g213A.mediaIndex + ') .slider').animate({'left':trackWidth*currPercent-9},360);
			//伸縮.progressBar img的長度
			$('.mediaWrapper:eq(' + g213A.mediaIndex + ') .progressBar img').animate({'width':trackWidth*currPercent},360,function(){
				//繼續更新進度列、暫停播放
				tPlayer.resumeUpdateTimer(g213A.mediaIndex);
				//seek到定點
				tPlayer.seek( g213A.timeCodeArr[timeCodeIndex][0]+0.1, g213A.mediaIndex );
				
				//播放
				if( !param.playingFlagArr[g213A.mediaIndex] ){
					tPlayer.play(g213A.mediaIndex);
				}
				
			});
			
		});
		//==========================================================================
		

	});
	
	
	//.g213A_menuButton按鈕的滑鼠事件處理
	//==========================================================================
	//mouseover
	$('.g213A_menuButton').on('mouseover',function(){
		$('.g213A_menuButton').addClass('g213A_menuButton_over');
	});
	
	//mouseout
	$('.g213A_menuButton').on('mouseout',function(){
		$('.g213A_menuButton').removeClass('g213A_menuButton_over');
	});
	
	//mousedown
	$('.g213A_menuButton').on('mousedown',function(){
		$('.g213A_menuButton').removeClass('g213A_menuButton_over');
		//
		$('.g213A_menuButton').css({'display':'none'});
		$('.g213A_returnNumButton').css({'display':'inline-block'});
		//
		$('.g213A_menuZone').fadeIn(300).css({'display':'table'});
		
		
		
		//下方選單項目
		$.each(g213A.timeCodeArr, function(itemIndex) { 
		
			//
			var menuZoneHtml = '<div class="g213A_menuItem">'+
								'<span class="numOrder"></span>'+
								'<span class="titleStr"></span>'+
								'</div>';
			$('.g213A_menuZone').append(menuZoneHtml);
			
			
			//●○●○●○轉移.g213A_numButton到其他位置，(或隱藏display:none，都必須特殊處理)
			//
			$('.g213A_menuItem:eq(' + itemIndex + ') .numOrder').append( $('.g213A_numButton:eq(' + (0) + ')') );
			//
			$('.g213A_menuItem:eq('+ itemIndex + ') .titleStr').append( g213A.cardTitleArr[itemIndex] );
			
			
			
			//選單項目的滑鼠事件
			//==================================================================
			//mouseover
			$('.g213A_menuItem:eq('+ itemIndex + ')').on('mouseover',function(){
			});
			
			//mouseout
			$('.g213A_menuItem:eq('+ itemIndex + ')').on('mouseout',function(){
			});
			
			//mousedown
			$('.g213A_menuItem:eq('+ itemIndex + ')').on('mousedown',function(){
				
				
				//alert(param.playingFlagArr[g213A.mediaIndex]);
			
				//●○1051019
				if( !param.playingFlagArr[g213A.mediaIndex] ){
					tPlayer.play(g213A.mediaIndex);
				}
				
				//
				$('.g213A_numButton:eq(' + itemIndex + ')').removeClass('g213A_numButton_over');
				
				//
				//●○1051020 - 再加這行
				$('.g213A_numButton:eq(' + itemIndex + ')').addClass('g213A_numButton_keep');
				
				//
				//停止更新進度列
				tPlayer.pauseUpdateTimer(g213A.mediaIndex);
				//暫停播放
				tPlayer.pause(g213A.mediaIndex);
				
				//
				g213A.prevCardIndex = g213A.currCardIndex;
				//g213A.currCardIndex =itemIndex; //這裡不需
				
				//計算比例
				var currPercent = g213A.timeCodeArr[itemIndex][0]/param.totalTimeArr[g213A.mediaIndex];
				//計算.track的長度
				var trackWidth = $('.mediaWrapper:eq(' + g213A.mediaIndex + ') .track').width();
				
				//移動.slider到定位 --- 水平位置減9，因為.slider預設x位置是-9。
				$('.mediaWrapper:eq(' + g213A.mediaIndex + ') .slider').animate({'left':trackWidth*currPercent-9},360);
				//伸縮.progressBar img的長度
				$('.mediaWrapper:eq(' + g213A.mediaIndex + ') .progressBar img').animate({'width':trackWidth*currPercent},360,function(){
					//繼續更新進度列、暫停播放
					tPlayer.resumeUpdateTimer(g213A.mediaIndex);
					//seek到定點
					tPlayer.seek( g213A.timeCodeArr[itemIndex][0]+0.1, g213A.mediaIndex );
					
					//播放
					if( !param.playingFlagArr[g213A.mediaIndex] ){
						tPlayer.play(g213A.mediaIndex);
					}
					
				});
				
				
			});
			//==================================================================
			
			
		});
		
		//
		$('.g213A_numButtonGroup').addClass('g213A_numButtonGroup_list');
		//
		$('.g213A_numButton').addClass('g213A_numButton_list');
		
	});
	//==========================================================================
	
	
	
	//.g213A_returnNumButton按鈕的滑鼠事件處理
	//==========================================================================
	//mouseover
	$('.g213A_returnNumButton').on('mouseover',function(){
		$('.g213A_returnNumButton').addClass('g213A_returnNumButton_over');
	});
	
	//mouseout
	$('.g213A_returnNumButton').on('mouseout',function(){
		$('.g213A_returnNumButton').removeClass('g213A_returnNumButton_over');
	});
	
	//mousedown
	$('.g213A_returnNumButton').on('mousedown',function(){
		$('.g213A_returnNumButton').removeClass('g213A_returnNumButton_over');
		//
		$('.g213A_returnNumButton').css({'display':'none'});
		$('.g213A_menuButton').css({'display':'inline-block'});
		
		//
		//==============================
		g213A.offMenuItemMEvent();
		//==============================
		
		//
		$('.g213A_menuZone').fadeOut(300, function(){
			$('.g213A_menuZone').empty();
		});
		
		
		//
		$.each(g213A.timeCodeArr, function(itemIndex) { 
			//
			$('.g213A_numButtonGroup').append( $('.g213A_numButton:eq(' + (itemIndex) + ')') );
		});
		
		
		//
		$('.g213A_numButtonGroup').removeClass('g213A_numButtonGroup_list');
		//
		$('.g213A_numButton').removeClass('g213A_numButton_list');
	});
	//==========================================================================
	
	
};





//
$(document).ready(function(){
		
	
	//●整體縮放頁面 - 強迫設定為1.0，以避免播放控制失常
	//============================
	$('body').css('zoom','1.0');
	//============================
	
	
	//1050323
	g213A.createTimeCodeArr();
	//1051011
	g213A.createCardTitleArrNElse();
	
	
	
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
			//----------------------------
			g213A.clickButtonEvent();
			//----------------------------
		}
		
		
		
		
		
	});
	//===================================
	
	
	//點小圖跳大圖 - 這得在method.lessThenIE9Css()上方。
	method.createMagnifierIcon();
	
	//名詞解釋
	method.glossary();
	
	// IE6~IE8
	//method.lessThenIE9Css();

});

//1041202
$(window).on('resize', function(){
	// IE6~IE8
	//method.lessThenIE9Css();
});













//>>>=============================================================>>>
})(jQuery); //↑↑↑


























