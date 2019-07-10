// JavaScript Document - G227A│g227A_VideoCueAccessible.js
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
var g227A = NOU.namespace('NOU.modules.g227A');
//------------------------


//
g227A.timeCodeArr = [];
g227A.cardHtml = [];
g227A.cardObj = [];
g227A.cardTitleArr = [];
g227A.cardTextArr = [];

//1071225
g227A.cardPureTextArr = [];

g227A.prevCardIndex = -1;
g227A.currCardIndex = 0;
g227A.totalCard = 0;
g227A.mediaIndex = 0;

g227A.clickPosX = 0;
g227A.menuZoneCurrWidth = 0;
g227A._mediaObj = undefined;
g227A.mediaWidth = 0;
g227A.mediaHeight = 0;
g227A.mediaW2hRatio = 0;
g227A.xRatio = 0;
g227A.pageInitWidth = 0;
g227A.pageCurrWidth = 0;
g227A.pageWidthState = "original"; //"original_InitSmall"│"original"│"fullPage"




$('#preloader').css({'display':'block'});




//將HTML裡的 「cue_start提示點起始時間」、 「媒體長度total_time」 存入g227A.timeCodeArr二維陣列
//●g227A.timeCodeArr[區段起始時間, 區段結束時間, 所對應內容，目前是否處於出現狀態的旗標。(0：隱藏│1：出現)]
g227A.createTimeCodeArr = function(){  

	//※
	var totalTime = method.hmsToSecond( $('.total_time').text() );

	$('.g227A_card').each(function(index) { 
	
		//
		if( $('.g227A_card:eq(' + index + ') .cue_start').get(0) !== undefined ){ 
			
			
			if( index < $('.g227A_card').length-1 ){
				//
				g227A.timeCodeArr.push( [
							//1051103
							//●○●○●○主要問題需：修改tPlayer.js裡的 method.hmsToSecond()的內容。IE8轉換秒數材能正常。
							
							method.hmsToSecond( $('.g227A_card:eq(' + index + ') .cue_start').text() ), //起始點
							method.hmsToSecond( $('.g227A_card:eq(' + (index+1) + ') .cue_start').text() ), //結束點
							0 //所對應內容，目前是否處於出現狀態的旗標。0：隱藏│1：出現。
						] );
			
			}else if( index === ($('.g227A_card').length-1) ){
				//
				g227A.timeCodeArr.push( [
							method.hmsToSecond( $('.g227A_card:eq(' + index + ') .cue_start').text() ), //起始點
							totalTime, //媒體長度：媒體結束點
							0 //所對應內容，目前是否處於出現狀態的旗標。0：隱藏│1：出現。
						] );
			}
			
			
			//
			if( index === $('.g227A_card').length-1 ){ 
				//alert( g227A.timeCodeArr );
				//alert( method.hmsToSecond( $('.g227A_card:eq(' + 8 + ') .cue_start').text() ) );
				//alert($('.g227A_card').length-1);
			}
		
		}else {
			alert('請正確填寫.cue_start');
		}

    });
	
	//alert( g227A.timeCodeArr );

};


//●將所有.g227A_card資料存入g227A.cardHtml陣列 & 及其他處理
g227A.createCardTitleArrNElse = function(){  

	
	//●
	$('.g227A_card').each(function(index) { 
	
	
		//將所有.g227A_card的HTML資料存入g227A.cardHtml陣列。●但換頁功能沒用到此陣列。
		g227A.cardHtml[index] = '<div class="g227A_card">' + $('.g227A_card:eq(' + index + ')').html() + '</div>';
		//alert(g227A.cardHtml[index]);
		
		
		//存入.g227A_card的jQ物件，●但換頁功能沒用到。
		g227A.cardObj[index]= $('.g227A_card:eq(' + index + ')');
		
		
		//●●●將小標題.g227A_cardTitle存到g227A.cardTitleArr
		g227A.cardTitleArr[index] = $('.g227A_card:eq(' + index + ') .g227A_cardTitle').html(); 
		
		
		//●●●內文.g227A_text存到g227A.cardTextArr
		g227A.cardTextArr[index] = $('.g227A_card:eq(' + index + ') .g227A_text').html(); 
		// alert(g227A.cardTextArr[index]);

		//1071225
		g227A.cardPureTextArr[index] = $('.g227A_card:eq(' + index + ') .g227A_text').text();
		
		//取得總頁數g227A.totalCard
		if(index === $('.g227A_card').length-1){
			//
			g227A.totalCard = g227A.cardHtml.length; 
			//
			//alert(g227A.cardHtml[4]);
			//alert(g227A.totalCard);
			//alert(g227A.cardTitleArr);
		}
		
	

    });
	
	
	
	//延遲300毫秒之後，將所有的.g227A_card的display屬性值設為none，●○隱藏。
	setTimeout(function(){
		
		$('.g227A_card').each(function(index) { 
		
			//●○在上面存進陣列，setTimeout 300毫秒後，將所有.g227A_card隱藏。
			$('.g227A_card:eq(' + ((g227A.totalCard-1)-(index)) + ')').css({'visibility':'visible','display':'none'});
			//$('.g227A_card:eq(' + (0) + ')').css({'visibility':'visible','display':'none'});
			
			//alert((g227A.totalCard-1)-(index) + '/' + $('.g227A_card').length);
		});
		
	},300);
	


};



//目前沒用到
g227A.hideAllCard = function(){
	var cardLength = g227A.cardHtml.length; 
	
	$.each(g227A.timeCodeArr,function(index){
		//$('.g227A_card:eq(' + index + ')').css({'display':'none'});
		
		$('.g227A_card:eq(' + ((cardLength-1)-(index)) + ')').css({'display':'none'});
		g227A.timeCodeArr[(cardLength-1)-(index)][2] = 0;
		
	});
};


//1060105 - 
g227A.scrollControl = function(){
	
	//●○1060104 - 計算$('.g227A_menuZone')捲軸捲動距離，以及捲動
			//===========================================================
			var scrollTopOffset = 0;
			
			$('.g227A_card').each(function(index){ 
				
				if( index < g227A.currCardIndex ){
					scrollTopOffset += ( $('.g227A_menuItem:eq(' + index + ')').height() + parseInt($('.g227A_menuItem:eq(' + index + ')').css('padding-top')) + parseInt($('.g227A_menuItem:eq(' + index + ')').css('padding-bottom')) + parseInt($('.g227A_menuItem:eq(' + index + ')').css('border-bottom')));
				}
				
			});
			//alert(scrollTopOffset);
			
			//捲動
			$('.g227A_menuZone').animate({'scrollTop': scrollTopOffset},300);
			//===========================================================
	
};



//==========================================================================●》》》
//●●●○○○由tPlayer.js調用此處的method.updateCurrTime()
method.updateCurrTime = function(mediaIndex){
	
	
	//1050325 - ●只讓第一個媒體檔具備偵測timecode的能力
	if(g227A.mediaIndex === 0){
		
		//1051216 - 移到條件式內。本來在條件式上方。
		g227A.mediaIndex = mediaIndex;
		
		//
		$.each(g227A.timeCodeArr,function(timeCodeIndex){
			g227A.checkTimeCode(g227A.mediaIndex, timeCodeIndex);
		});
	}
	

};


//●○●○●○被method.updateCurrTime(){}所調用
g227A.checkTimeCode = function(mediaIndex, timeCodeIndex){
	
	//取得timeCode資訊
	var tStart = g227A.timeCodeArr[timeCodeIndex][0]; //一個區段的起始點
	//var tEnd = g227A.timeCodeArr[timeCodeIndex+1][0] !== undefined ? g227A.timeCodeArr[timeCodeIndex+1][0] : param.totalTimeArr[mediaIndex]; //一個區段的結束
	var tEnd = g227A.timeCodeArr[timeCodeIndex][1]; //一個區段的結束點點
	var currT = param.currTimeArr[mediaIndex]; //索引為mediaIndex的媒體檔的目前播放時間
	
	
	//※●○◎《《《《《《《《《《《《《《《《《
	//================================================================
	//《時間區段：●○進》
	if( currT >= tStart && currT < tEnd ){
		
		//
		g227A.currCardIndex = timeCodeIndex;
		
		
		if( g227A.timeCodeArr[g227A.currCardIndex][2] === 0 ){
			//
			g227A.timeCodeArr[g227A.currCardIndex][2] = 1;
			
			//=================================================
			//當g227A.prevCardIndex不等於初始賦值的-1
			if( g227A.prevCardIndex !== -1){
				
				//隱藏前一個.g227A_card
				$('.g227A_card:eq(' + g227A.prevCardIndex + ')').css({'display':'none'});
				g227A.timeCodeArr[g227A.prevCardIndex][2] = 0;
				
				//●○1051018
				//$.each(g227A.timeCodeArr,function(index){
					$('.g227A_numButton:eq(' + g227A.prevCardIndex + ')').removeClass('g227A_numButton_keep');
					
					
					//●○●○●○1070418
					//==============================================================
					//$('.g227A_menuItem:eq('+ g227A.prevCardIndex + ')').blur();
					//==============================================================
					
					
				//});
				
				
			}
			//=================================================
			
			//
			$('.g227A_card:eq(' + g227A.currCardIndex + ')').css({'display':'block','opacity':'0.0'});
			$('.g227A_card:eq(' + g227A.currCardIndex + ')').animate({'opacity':'1.0'},600,function(){
				
				//●○1051019
				//===============================================================================
				//Android Mobile Chrome不會自動播放，若按下第一個數字鈕，會反覆執行animate動畫出現
				//需在此多加一個 g227A.timeCodeArr[g227A.currCardIndex][2] = 1 ，讓條件式排除動畫的執行。
				g227A.timeCodeArr[g227A.currCardIndex][2] = 1;
				//===============================================================================
				
				
			});
			
			//●○1051018
			$('.g227A_numButton:eq(' + g227A.currCardIndex + ')').addClass('g227A_numButton_keep');
			
			
			//●○●○●○1070418
			//==============================================================
			$('.g227A_menuItem:eq('+ g227A.currCardIndex + ')').focus();
			//==============================================================
			
			
			
			
			//●○1060104 - 計算$('.g227A_menuZone')捲軸捲動距離
			//===========================================================
			var scrollTopOffset = 0;
			
			$('.g227A_card').each(function(index){ 
				
				if( index < timeCodeIndex ){
					scrollTopOffset += ( $('.g227A_menuItem:eq(' + index + ')').height() + parseInt($('.g227A_menuItem:eq(' + index + ')').css('padding-top')) + parseInt($('.g227A_menuItem:eq(' + index + ')').css('padding-bottom')) + parseInt($('.g227A_menuItem:eq(' + index + ')').css('border-bottom')));
				}
				
			});
			//alert(scrollTopOffset);
			
			//捲動
			$('.g227A_menuZone').animate({'scrollTop': scrollTopOffset},300);
			//===========================================================
			
			
			
		}
		
		
		//●○●○●○1070419
		//==========================================●
		//$('.g227A_menuItem:eq('+ g227A.currCardIndex + ')').focus();
		//alert($('.g227A_menuItem:eq('+ g227A.currCardIndex + ')').focus);
		//==========================================●
		/*if( !$('.g227A_menuItem:eq('+ g227A.currCardIndex + ')').focus ){
			$('.g227A_menuItem:eq('+ g227A.currCardIndex + ')').focus();
		}*/
		
		
		
		//●○1051103 - 除此之外，主要問題需：修改tPlayer.js裡的 method.hmsToSecond()的內容。IE8轉換秒數材能正常。
	}else{
		//
		g227A.prevCardIndex = g227A.currCardIndex;	
		
	}
	//================================================================
	
	
	
	$('.showInfo').html(
				'g227A.currCardIndex：' + g227A.currCardIndex + 
				'<br>' + 'g227A.prevCardIndex：' + g227A.prevCardIndex +
				'<br>' + 'g227A.timeCodeArr：' + g227A.timeCodeArr +
				'<br>' + 'g227A.timeCodeArr['+g227A.currCardIndex+'][2]+：' + g227A.timeCodeArr[g227A.currCardIndex][2] 
				);
				
				
};
//==========================================================================●》》》




//消除.g227A_menuItem的滑鼠事件 (沒用到)
g227A.offMenuItemMEvent = function(){
	//下方選單項目
	$.each(g227A.timeCodeArr, function(itemIndex) { 
		//mouseover
		$('.g227A_menuItem:eq('+ itemIndex + ')').off('mouseover');
		//mouseout
		$('.g227A_menuItem:eq('+ itemIndex + ')').off('mouseout');
		
		//mousedown
		$('.g227A_menuItem:eq('+ itemIndex + ')').off('mousedown');
	});
	
};


//1051026
//滑鼠按下數字按鈕的事件處理 《《《 按下.g227A_menuItem也調用此事件處理
g227A.numButtonMDownEvent = function(timeCodeIndex, arrangement){
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
		//alert(param.playingFlagArr[g227A.mediaIndex]);
		
		
		//●○1051019 - ●○有這碼，在Mobile裝置，尤其Android上，才能在一進入頁面尚未播放前，以點擊數字按鈕開始播。
		//============================================================
		if( utils.isMobile ){
			if( !param.playingFlagArr[g227A.mediaIndex] ){
				tPlayer.play(g227A.mediaIndex);
			}
		}
		//============================================================
		
		
		//
		$('.g227A_numButton:eq(' + timeCodeIndex + ')').removeClass('g227A_numButton_over');
		
		//
		//●○1051020 - 再加這行 - ●○1051201隱藏這行
		//$('.g227A_numButton:eq(' + timeCodeIndex + ')').addClass('g227A_numButton_keep');
		
		//
		//停止更新進度列
		tPlayer.pauseUpdateTimer(g227A.mediaIndex);
		//暫停播放
		if( param.playingFlagArr[g227A.mediaIndex] ){
			tPlayer.pause(g227A.mediaIndex);
		}
		
		//
		//g227A.prevCardIndex = g227A.currCardIndex;
		//g227A.currCardIndex =timeCodeIndex; //這裡不需
		
		//計算比例
		var currPercent = g227A.timeCodeArr[timeCodeIndex][0]/param.totalTimeArr[g227A.mediaIndex];
		
		//計算.track的長度
		var trackWidth = $('.mediaWrapper:eq(' + g227A.mediaIndex + ') .track').width();
		
		//移動.slider到定位 --- 水平位置減9，因為.slider預設x位置是-9。
		$('.mediaWrapper:eq(' + g227A.mediaIndex + ') .slider').animate({'left':trackWidth*currPercent-9},360);
		
		//伸縮.progressBar img的長度
		$('.mediaWrapper:eq(' + g227A.mediaIndex + ') .progressBar img').animate({'width':trackWidth*currPercent},360,function(){
			//繼續更新進度列、暫停播放
			tPlayer.resumeUpdateTimer(g227A.mediaIndex);
			//seek到定點 - ●●● 《《《《《《 g227A.seekFineTuning = 0.1 》》》》》》 設定於externalData.js ●●●
			tPlayer.seek( g227A.timeCodeArr[timeCodeIndex][0]+g227A.seekFineTuning, g227A.mediaIndex );
			
			//播放
			if( !param.playingFlagArr[g227A.mediaIndex] ){
				tPlayer.play(g227A.mediaIndex);
			}
			
			
			//1051111
			//------------------------------------------------------
			if( arrangement === 'list' ){ 
				//1051111 - 1051208
				//$('.g227A_returnNumButton').trigger('mousedown');
			}
			//------------------------------------------------------
			
		});
		
	}
			
	
	
};


//1051111
g227A.numButtonOverOut = function(){
	
	$.each(g227A.timeCodeArr,function(timeCodeIndex){
		
		//mouseover
		$('.g227A_numButton:eq(' + timeCodeIndex + ')').on('mouseover',function(){
			$('.g227A_numButton:eq(' + timeCodeIndex + ')').addClass('g227A_numButton_over');
			
			//.mediaHeaderString
			if( utils.isMobile ){
				$('.mediaHeaderString').html( g227A.cardTitleArr[timeCodeIndex] );
			}
			
			
		});
		
		//mouseout
		$('.g227A_numButton:eq(' + timeCodeIndex + ')').on('mouseout',function(){
			$('.g227A_numButton:eq(' + timeCodeIndex + ')').removeClass('g227A_numButton_over');
			
			//.mediaHeaderString
			if( utils.isMobile ){
				$('.mediaHeaderString').html( document.title );
			}
			
			
		});
		
		
	});
	
};

//未用到
g227A.numButtonOverOutOff = function(){
	//mouseover
	$('.g227A_numButton').off('mouseover');
	$('.g227A_numButton').off('mouseout');
};


//1051018
//數字按鈕.g227A_numButton、.g227A_menuButton開啟選單列表按鈕 的滑鼠事件處理
g227A.buttonsMouseEvent = function(){
	
	
	//●數字按鈕.g227A_numButton的滑鼠事件處理
	//==========================================================================
	$.each(g227A.timeCodeArr,function(timeCodeIndex){
		
		//1051111
		g227A.numButtonOverOut();
		
		
		//●○1051018 - 1070425●○●○●○ - 取消調用。
		//============================================
		//mousedown
		// $('.g227A_numButton:eq(' + timeCodeIndex + ')').on('mousedown',function(){
			
		// 	//
		// 	g227A.numButtonMDownEvent(timeCodeIndex, 'button'); //滑鼠按下數字按鈕的事件處理
			
						
		// });
		//============================================
		

	});
	//==========================================================================
	

	
};



//.g227A_menuZone內容的建立
g227A.createMenuzone = function(){
	
	
	
	//●○◎※●○◎※●○◎※ mousedown ●○◎※●○◎※●○◎※

		
		
		//1051208 - 棄用。 (此解 .g227A_controlBar 放在 .g227A_menuZone 裡面。捲動卷軸時，會捲到範圍外而看不到)
		//==========================================================================《《《《《《
		/*var widthControlBarHtml = '<div class="g227A_controlBar">'+
										'<span class="g227A_controlBarPercent">'+
										'</span>'+
									'</div>'
									;
		$('.g227A_menuZone').append(widthControlBarHtml);*/
		//==========================================================================《《《《《《
		
		
		
		//●○◎※●○◎※ 1060105 - .g227A_controlBar 改為放在 .g227A_menuZone 上方 ●○◎※●○◎※
		//==========================================================================《《《《《《
		$('.g227A_controlBar').append('<span class="g227A_controlBarPercent"></span>');
		//==========================================================================《《《《《《
		
		
		var menuItemHeightSum = 0;
		
		
		//下方選單項目
		//==================================================《《《《《《
		$.each(g227A.timeCodeArr, function(itemIndex) { 
		//==================================================《《《《《《
		

			//
			var menuZoneHtml = '<div class="g227A_menuItem">'+
								'<span class="numOrder"><span class="g227A_numButton"></span></span>'+
								'<span class="titleStr"></span>'+
								'<div class="text"></div>'+
								'</div>';
			$('.g227A_menuZone').append(menuZoneHtml);
			
			
			
			
			//●○●○●○1070412 - 1070424 - keycode - A：65、B：66 ...
			//將數值轉為字S符tring.fromCharCode(x)
			//==========================================================●
			$('.g227A_menuItem:eq(' + itemIndex + ')').attr({'tabindex':itemIndex+1, 'accesskey':itemIndex+1});
			//==========================================================●

			//IE：按alt+h會聚焦到址列。
			//Chrome：alt+A... 在G227A版型無作用
			//==========================================================●
			//$('.g227A_menuItem:eq(' + itemIndex + ')').attr({'tabindex':itemIndex+1, 'accesskey':String.fromCharCode(65+itemIndex)});
			//==========================================================●
			
			
			
			//●○●○●○轉移.g227A_numButton到其他位置，(或隱藏display:none，都必須特殊處理)
			
			//數字按鈕 附加 序號
			$('.g227A_numButton:eq(' + itemIndex + ')').html(itemIndex+1);
			$('.g227A_numButton:eq(' + itemIndex + ')').attr({'alt':itemIndex+1});
			
			//選單項目 附加 小標題
			$('.g227A_menuItem:eq('+ itemIndex + ') .titleStr').addClass('fontSize').append( g227A.cardTitleArr[itemIndex] );
			//↑↑↑1060124 - 》》》 ●○在此附加.fontSize類別，以觸發字級縮放功能。
			//加入alt註解文字
			$('.g227A_menuItem:eq('+ itemIndex + ') .titleStr').attr({'alt':g227A.cardTitleArr[itemIndex]});
			
			
			// alert($('.g227A_card:eq('+ itemIndex + ') .g227A_text').html());

			//1060104 - .g227A_card增加內文，如果有.g227A_text的話
			//=============================================================
			
				
				$('.g227A_menuItem:eq('+ itemIndex + ') .text').addClass('fontSize').append( g227A.cardTextArr[itemIndex] );
				//↑↑↑1060124 - 》》》 ●○在此附加.fontSize類別，以觸發字級縮放功能。
				
				//★1071225 - alt註解，，寫法改為直接獲取 $('.g227A_card:eq(' + itemIndex + ') .g227A_text').text()
				$('.g227A_menuItem:eq('+ itemIndex + ') .text').attr({ 'alt': $('.g227A_card:eq(' + itemIndex + ') .g227A_text').text() }); 

				//★1071225 - 若使用此行，alt文字抓不到
				// $('.g227A_menuItem:eq('+ itemIndex + ') .text').attr({ 'alt': $(g227A.cardPureTextArr[itemIndex]) .text() }); 
		

			//1071225 - 如果$('.g227A_card:eq(' + itemIndex + ') .g227A_text')，是undefined，或是，去除空白字元後，字數為0
			//1071225 - ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
			if( $('.g227A_card:eq(' + itemIndex + ') .g227A_text').get(0) === undefined || $('.g227A_card:eq(' + itemIndex + ') .g227A_text').text().trim().length <= 0 ){
				// $('.g227A_menuItem:eq('+ itemIndex + ') .text').empty().remove();
				$('.g227A_menuItem:eq('+ itemIndex + ')').css({'border-bottom':'none'});
			}
			//1071225 - ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★


			//=============================================================

			// alert($('.g227A_card:eq(' + itemIndex + ') .g227A_text').text().length);

			//★★★ 1071225 - trim() - 去掉空白字元
			//1071225 - ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
			// alert( $('.g227A_card:eq(' + itemIndex + ') .g227A_text').text().trim().length );
			//1071225 - ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★

			// alert( $(g227A.cardPureTextArr[itemIndex]).text() );
			// alert($('.g227A_card:eq('+ itemIndex + ') .g227A_text').html().length);
			// alert($('.g227A_card:eq(' + itemIndex + ') .g227A_text').text());
			// alert( typeof($(g227A.cardPureTextArr[itemIndex]).text()) );



			
			
			//●1060120 - 設置.g227A_top捲動至頂端按鈕
			//=============================================================
			//累加所有.g227A_menuItem的高度
			if( itemIndex < g227A.totalCard ){
				//alert( $('.g227A_menuItem:eq('+ itemIndex + ')').height() );
				menuItemHeightSum += $('.g227A_menuItem:eq('+ itemIndex + ')').height();
				
			}
			
			//累加完成時，由$('.g227A_menuZone')將 '<div class="top"></div>' 予以 append
			if( itemIndex === g227A.totalCard-1 ){
				//alert( $('.g227A_menuZone').height() +'/' + menuItemHeightSum );
				
				//
				//if( $('.g227A_menuZone').height() < menuItemHeightSum ){ 
				
					//●○附加「捲動到頂端」.g227A_top按鈕
					$('.g227A_menuZone').append('<div class="g227A_top"></div>');


					//1070507 - 增加無障礙規格所需的全文下載按鈕
					//==========================================================
					$('.g227A_menuZone').append('<a><div class="g227A_fullTextDownloadBtn" alt="「全文下載」按鈕，請按「ENTER」鍵"></div></a>');
					//==========================================================
					//1070507 - 
					//==========================================================
					//g227A.totalCard
					$('.g227A_menuZone .g227A_fullTextDownloadBtn').attr({'tabindex':g227A.totalCard+1, 'accesskey':g227A.totalCard+1});
					//==========================================================
					
				//}
				
				
				//●○1060124 - 》》》 ●○將('<span class="fontSizeSwitcher"></span>')加到DOM
				//-----------------------------------------------------------------------
				$('.g227A_menuZone').after('<span class="fontSizeSwitcher"></span>');
				
				//1060124
				if($('.fontSizeSwitcher').get(0) !== undefined){
					//
					method.createFontSizeSwitcher();
				}
				//-----------------------------------------------------------------------
				
			}
			
			
			//
			$('.g227A_top').on('mousedown',function(){
				$('.g227A_menuZone').animate({'scrollTop':0},380);
			});
			//=============================================================

			
			
			
			
			
			
			
			//選單項目的滑鼠事件
			//---------------------------------
			//mouseover
			$('.g227A_menuItem:eq('+ itemIndex + ')').on('mouseover',function(){
				//$('.g227A_menuItem:eq('+ itemIndex + ')').focus();
			});
			
			//mouseout
			$('.g227A_menuItem:eq('+ itemIndex + ')').on('mouseout',function(){
				
			});
			
			//●○●○●○1070425
			//==================================================================
			//mousedown
			$('.g227A_menuItem:eq('+ itemIndex + ')').on('mousedown',function(e){
				
				//g227A.numButtonMDownEvent(itemIndex, 'list'); //滑鼠按下數字按鈕的事件處理
				
				//
				if(g227A.timeCodeArr[itemIndex][2] === 1){
					g227A.numButtonMDownEvent(itemIndex, 'list'); 
				}
				
				
			});
			//==================================================================
			//---------------------------------
			
			
		//==================================================《《《《《《
		});
		//==================================================《《《《《《
				

		
		//●○1060109 - 在.g227A_menuZone最下方添加空白，使較下方的選單項目可以向上捲動，否則會沒空間可以捲動。
		//=====================================================================================
		var oldHeight = $('.g227A_menuZone').height() - $('.g227A_menuItem:eq('+ (g227A.totalCard-1) + ')').height(); 
		//
		$('.g227A_menuZone').append('<div class="g227A_spacer"></div>');
		//
		$('.g227A_spacer').css({'width':'100%','height':oldHeight});
		//=====================================================================================
		
		
		
		//●○●○●○1070418
		//==========================================●
		$('.g227A_menuItem:eq('+ 0 + ')').focus();
		//==========================================●


	
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




//●○●○●○ 「初始寬度畫面」 及 「整頁全畫面」，當視窗resize時，調用此方法。 ●○●○●
//●○調用g227A.adjustWidth()前，需先計算g227A.pageCurrWidth、g227A.pageCurrWidth、g227A.mediaWidth
//●○因在★★★window.resize時調用，所以，媒體區塊的寬高 和 選單區塊g227A_menuZone的寬度 以非漸變方式改變。animate()方法的秒數需設為0微秒。
//============================================================================《《《《《《《《

g227A.adjustWidth = function(){
	
	//改變頁面容器.pageWrapper的寬度
	$('.pageWrapper').width(g227A.pageCurrWidth);
	
	//改變 選單區塊.g227A_menuZone、 寬度比力控制條.g227A_controlBar 的寬度
	$('.g227A_menuZone, .g227A_controlBar').animate({'width':g227A.menuZoneCurrWidth},0);
	
	//改變媒體檔容器.mediaDiv的寬度
	$('.mediaWrapper:eq(' + g227A.mediaIndex + ') .mediaDiv').animate({'width':g227A.mediaWidth,'height':g227A.mediaHeight},0);
	
	//改變 .mediaWrapper、 .mediaHeader、.playbackDiv 的寬度 
	$('.mediaWrapper:eq(' + g227A.mediaIndex + '), .mediaWrapper:eq(' + g227A.mediaIndex + ') .mediaHeader, .mediaWrapper:eq(' + g227A.mediaIndex + ') .playbackDiv').animate({'width':g227A.mediaWidth},0,function(){});
	
	
		//1040906 - 移進來 - 可能解決全畫面下視窗resize事件，拖曳播放頭部正常之問題 ???
		//
		var playbackDivHeight = parseInt($('.mediaWrapper:eq(' + g227A.mediaIndex + ') .playbackDiv').css('height'));
		if(isNaN(playbackDivHeight)){
			playbackDivHeight = 0;
		}
		//.mediaHeader的高度
		var headerHeight = parseInt($('.mediaWrapper:eq(' + g227A.mediaIndex + ') .mediaHeader').css('height'));
		if(isNaN(headerHeight)){
			headerHeight = 0;
		}
		

		//●○1040521 - 處理$('.mediaWrapper:eq(' + g227A.mediaIndex + ') .mediaDivOverlay')的 寬高 和 margin-top
		if(param.playModeArr[0] === "flash"){

			//●◎1040629
			//===================================================
			var mediaDivOverlay_marginTop;

			//●◎播放介面在影音上方
			if($('.mediaWrapper:eq(' + g227A.mediaIndex + ')>.playbackDiv').get(0) !== undefined){
				mediaDivOverlay_marginTop = -(g227A.mediaHeight);

			//◎播放介面在影音下方
			}else if($('.mediaDiv:eq(' + g227A.mediaIndex + ')>.playbackDiv').get(0) !== undefined){
				mediaDivOverlay_marginTop = -(g227A.mediaHeight);
			}
			//alert(mediaDivOverlay_marginTop);

			//alert($('.mediaDiv:eq(' + g227A.mediaIndex + ')>.playbackDiv').get(0) != undefined);
			$('.mediaWrapper:eq(' + g227A.mediaIndex + ') .mediaDivOverlay').css({'margin-top':mediaDivOverlay_marginTop,'opacity':param.mediaDivOverlayOpacity, 'width':g227A.mediaWidth, 'height':g227A.mediaHeight});

			//===================================================
		}



		//---------------------------------------------------------------
		$('.mediaWrapper:eq(' + g227A.mediaIndex + ') .slider').draggable("destroy");
		//==============================================
		method.caculateTrackWidth(g227A.mediaWidth,g227A.mediaIndex); 
		//==============================================
		method.jqUITouchPunchDrag(g227A.mediaIndex);
		//---------------------------------------------------------------
		
		//1041015
		if(param.layoutType[g227A.mediaIndex] === "normal"){
			//=====================
			method.removeDotSpan();
			method.putDot();
			//=====================
		}else if(param.layoutType[g227A.mediaIndex] === "normal"){
			//=====================
			method.removeDotSpan2();
			method.putDot2();
			//=====================
		}
			
			

		//●○1040630 - 必須有method.updateProgress(g227A.mediaIndex)，
		//全畫面時變更視窗大小(window.resize事件)，播放頭位置、播放進度列長度才能正確更新。否則不會更新
		//=====================
		method.updateProgress(g227A.mediaIndex);
		//=====================
		
		
		//●○1040923
		//======================================================================================
		param.trackX[g227A.mediaIndex] = $('.mediaWrapper:eq(' + g227A.mediaIndex + ') .track').offset().left;
		//======================================================================================
	
	
		//操控媒體物件寬高
		g227A._mediaObj.width = g227A.mediaWidth;
		g227A._mediaObj.height = g227A.mediaHeight;
	
	
	
		//
		$('.mediaWrapper:eq(' + g227A.mediaIndex + ') ').css({'height':'auto'});
		
		
		//●○●○●○ - 調整player圖示按鈕位置(居於媒體區中央)
		method.adjustCoverImgPos(g227A.mediaIndex,2);
	
};
//============================================================================《《《《



//●○初始寬度狀態下的視窗resize事件與處理。
//============================================================================《《《《
g227A.originalWinOnResize = function(){
	
	$(window).on('resize',function(){
		
		//
		if( $(window).width() <= param.breakpoint && g227A.pageWidthState === 'original' ){

			//
			g227A.mediaWidth = $(window).width();
			g227A.mediaHeight = g227A.mediaWidth/g227A.mediaW2hRatio;
			g227A.menuZoneCurrWidth = $(window).width();
			
			g227A.pageCurrWidth = $(window).width();
			
			//
			g227A.adjustWidth(); 
			
			//alert(g227A.mediaWidth+'/'+g227A.mediaHeight+'/'+g227A.menuZoneCurrWidth);
			
			
		//
		}else if( $(window).width() > param.breakpoint && g227A.pageWidthState === 'original' ){
			
			//
			g227A.mediaWidth = g227A.pageInitWidth*g227A.xRatio;
			g227A.mediaHeight = g227A.mediaWidth/g227A.mediaW2hRatio;
			g227A.menuZoneCurrWidth = g227A.pageInitWidth - g227A.mediaWidth ;
			
			g227A.pageCurrWidth = g227A.pageInitWidth; 
			//alert(g227A.pageCurrWidth+'/'+mediaWidth+'/'+g227A.menuZoneCurrWidth);
			
			//
			g227A.adjustWidth();
			
			//alert(g227A.pageInitWidth+'/'+g227A.mediaWidth+'/'+g227A.menuZoneCurrWidth);
			
		
		//1051228
		}else if( $(window).width() > param.breakpoint && g227A.pageWidthState === 'original_InitSmall' ){
			
			//
			g227A.mediaWidth = g227A.pageInitWidth*g227A.xRatio;
			g227A.mediaHeight = g227A.mediaWidth/g227A.mediaW2hRatio;
			g227A.menuZoneCurrWidth = g227A.pageInitWidth - g227A.mediaWidth ;
			
			g227A.pageCurrWidth = g227A.pageInitWidth; 
			//alert(g227A.pageCurrWidth+'/'+mediaWidth+'/'+g227A.menuZoneCurrWidth);
			
			//
			g227A.adjustWidth();
			
			
			
			//●○1051228
			g227A.xRatio = g227A.mediaWidth/g227A.pageInitWidth; 
			//alert(g227A.xRatio);
			
			//
			
			//var controlBarWidth = g227A.pageCurrWidth - g227A.mediaWidth;
			var controlBarWidth = parseInt( $('.pageWrapper').css('width') ) - g227A.mediaWidth;
			
			//
			$('.g227A_controlBar').animate({width:controlBarWidth-1},0);
			var mediaToPageWrapperRatio = g227A.mediaWidth/g227A.pageCurrWidth;
			//
			$('.g227A_controlBarPercent').delay(0).animate({'width':controlBarWidth*mediaToPageWrapperRatio},0);
			
			
		//1051228
		}else if( $(window).width() <= param.breakpoint && g227A.pageWidthState === 'original_InitSmall' ){
			
			//
			g227A.mediaWidth = $(window).width();
			g227A.mediaHeight = g227A.mediaWidth/g227A.mediaW2hRatio;
			g227A.menuZoneCurrWidth = $(window).width();
			
			g227A.pageCurrWidth = $(window).width();
			
			//
			g227A.adjustWidth(); 
			
			//alert(g227A.mediaWidth+'/'+g227A.mediaHeight+'/'+g227A.menuZoneCurrWidth);
			
		}
	
	
	});
	
};
//============================================================================《《《《



//滑鼠點擊.g227A_controlBar的事件處理
//=================================================================================《《《《《《
g227A.controlMouseDown = function(index){ 
	
	//1060123
	jQuery( ":animated" ).clearQueue();
	jQuery( ":animated" ).stop();
	
	
	
	//●
	if( g227A.xRatio > 0.80 ){
		g227A.xRatio = 0.80;
	}
	
	//
	if( g227A.xRatio < 0.05 ){
		g227A.xRatio = 0.05;
	}
	
	//
	g227A.mediaWidth = $('.pageWrapper').width()*g227A.xRatio;
	g227A.mediaHeight = g227A.mediaWidth/g227A.mediaW2hRatio;
	//
	g227A.menuZoneCurrWidth = $('.pageWrapper').width() - g227A.mediaWidth;
	
	
	//※※※1060106
	var controlBarW = g227A.menuZoneCurrWidth*g227A.xRatio;
	$('.g227A_controlBarPercent').animate({'width':0},200).delay(200).animate({'width':controlBarW},300);
	
	
	
	//定義一個數値，使g227A.xRatio小於其值時 (即：播放進度列太短)，則隱藏$('.playbackDiv')；
	// 反之，使$('.playbackDiv')出現。  --- ●○改用下面的條件式
	//-------------------------------------------------------
	/*if( g227A.xRatio < 0.36 ){
		$('.playbackDiv').css({'display':'none'});	
	}else{
		$('.playbackDiv').css({'display':'inline-block'});
	}*/
	//-------------------------------------------------------
	
	
	
	//●○●○●○1060123
	//整頁全畫面時： ●改為使用 g227A.mediaWidth 來判斷
	if( g227A.pageWidthState === 'fullPage' ){
		
		//●○1060123
		//==============================================================
		if( g227A.mediaWidth < 320){
			$('.playbackDiv').css({'display':'none'});	
			
		}else{
			$('.playbackDiv').css({'display':'inline-block'});
		}
		//==============================================================
		

	//一般畫面時： ●改為使用 g227A.mediaWidth 來判斷
	}else if( g227A.pageWidthState === 'original' ){
		
		//●○1060123
		//==============================================================
		if( g227A.mediaWidth < 280){
			$('.playbackDiv').css({'display':'none'});	
			
		}else{
			$('.playbackDiv').css({'display':'inline-block'});
		}
		//==============================================================
		
	}


	g227A._mediaObj.width = g227A.mediaWidth;
	g227A._mediaObj.height = g227A.mediaHeight;
	//alert(g227A._mediaObj.width+'/'+g227A._mediaObj.height);
	
	
	//
	$('.g227A_menuZone, .g227A_controlBar').animate({'width':g227A.menuZoneCurrWidth - g227A.widthOffset},360,function(){
		
		//●○◎※1060105
		g227A.scrollControl();
		
	});
	
	
	//
	$('.mediaWrapper:eq(' + index + ') .mediaDiv').animate({'width':g227A.mediaWidth,'height':g227A.mediaHeight},360);
	
	
	//※※※1060106
	var xxx = $('.mediaWrapper:eq(' + index + '), .mediaWrapper:eq(' + index + ') .mediaHeader, .mediaWrapper:eq(' + index + ') .playbackDiv');
	//
	xxx.animate({'width':g227A.mediaWidth},360);
	
	
	
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
				mediaDivOverlay_marginTop = -(g227A.mediaHeight);

			//◎播放介面在影音下方
			}else if($('.mediaDiv:eq(' + index + ')>.playbackDiv').get(0) !== undefined){
				mediaDivOverlay_marginTop = -(g227A.mediaHeight);
			}
			//alert(mediaDivOverlay_marginTop);

			//alert($('.mediaDiv:eq(' + index + ')>.playbackDiv').get(0) != undefined);
			$('.mediaWrapper:eq(' + index + ') .mediaDivOverlay').css({'margin-top':mediaDivOverlay_marginTop,'opacity':param.mediaDivOverlayOpacity, 'width':g227A.mediaWidth, 'height':g227A.mediaHeight});

			//===================================================
		}



		//---------------------------------------------------------------
		$('.mediaWrapper:eq(' + index + ') .slider').draggable("destroy");
		//==============================================
		method.caculateTrackWidth(g227A.mediaWidth,index); 
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
	//g227A._mediaObj.width = g227A.mediaWidth;
	//g227A._mediaObj.height = g227A.mediaHeight;
	//alert(g227A._mediaObj.width+'/'+g227A._mediaObj.height);
	
	
	//
	//● IE6~IE8 - 不可用程式操控.mediaWrapper的CSS - height為auto，否則此方法的功能會錯亂。(.g227A_menuZone會先往下掉)
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


//●○滑鼠點擊在$('.g227A_controlBar')上，可依點擊位置比例，控制媒體寬度 和 選單區塊.g227A_menuZone的寬度
//●○媒體區塊的寬高 和 選單區塊g227A_menuZone的寬度 以漸變方式改變。animate()方法有一定微秒數。
g227A.controlWidth = function(index){
	
	//mousedown - 滑鼠點擊在$('.g227A_controlBar')
	//-----------------------------------------------------
	$('.g227A_controlBar').on('mousedown',function(e){
	//-----------------------------------------------------
	
	
	//●○1060106
	jQuery( ":animated" ).clearQueue();
  	jQuery( ":animated" ).stop();
	
		
		//●○1060105 - 為避免連擊.g227A_controlBar，造成g227A_mediaZone往下掉
		//=======================================================《《《《《《
		/*$('.g227A_controlBar').off('mousedown');
		setTimeout(function(){
			g227A.controlWidth(index);
		},1000);*/
		//=======================================================《《《《《《
		
		
		
		//先計算，最底下再調用g227A.controlMouseDown(index);
		//=============================================●○
		
		
		//$('.g227A_controlBar')的X位置
		var controlBarX = $('.g227A_controlBar').offset().left;
		
		//滑鼠點擊在$('.g227A_controlBar')上的相對位置
		g227A.clickPosX = e.pageX - controlBarX; 
		//alert(controlBarX +'/' + g227A.clickPosX);
		
		//取得媒體物件
		if(param.playModeArr[0] === "flash"){
			g227A._mediaObj = tPlayer.swfMediaObj[index];
			
		}else if(param.playModeArr[0] === "html5" || param.playModeArr[0] === "hlsHtml5"){
			g227A._mediaObj = tPlayer.h5MediaObj[index];
		}
		
		//取得媒體寬高
		g227A.mediaWidth = parseInt(g227A._mediaObj.width);
		g227A.mediaHeight = parseInt(g227A._mediaObj.height);
		//alert(g227A.mediaWidth+'/'+g227A.mediaHeight);
		
		//媒體檔(影音)之寬高比
		//g227A.mediaW2hRatio = g227A.mediaWidth/g227A.mediaHeight;
		//alert(g227A.mediaW2hRatio);
		
		//.g227A_menuZone的寬度 - .g227A_controlBar的寬度為100%，會跟隨.g227A_menuZone的寬度
		g227A.menuZoneCurrWidth = $('.g227A_menuZone').width();
		
		//
		g227A.xRatio = g227A.clickPosX/g227A.menuZoneCurrWidth;
		//alert(g227A.xRatio);
		
		//1051233
		$('.g227A_controlBar').css({'background-image':'none'});
		
		
		//●○
		g227A.controlMouseDown(index);
		
		
		
	
	
	//-----------------------------------------------------
	});
	//-----------------------------------------------------
	

};
//=================================================================================《《《《《《


//
//初始頁面時，計算與控制 .g227A_controlBar、.g227A_controlBarPercent的寬度
g227A.initControlWidth = function(index){
	
	//1051228
	if( $(window).width() <= param.breakpoint ){
		g227A.pageWidthState = 'original_InitSmall';
		
	}
	
	
	//取得媒體物件
	if(param.playModeArr[0] === "flash"){
		g227A._mediaObj = tPlayer.swfMediaObj[index];
		
	}else if(param.playModeArr[0] === "html5" || param.playModeArr[0] === "hlsHtml5"){
		g227A._mediaObj = tPlayer.h5MediaObj[index];
	}
	
	//取得媒體寬高
	//g227A.mediaWidth = parseInt(g227A._mediaObj.width);
	//g227A.mediaHeight = parseInt(g227A._mediaObj.height);
	g227A.mediaWidth = parseInt( $('.mediaWrapper:eq(' + index + ') .mediaWidth').text() );
	g227A.mediaHeight = parseInt( $('.mediaWrapper:eq(' + index + ') .mediaHeight').text() );
	
	//●○1051222
	g227A.xRatio = g227A.mediaWidth/g227A.pageInitWidth; 
	//alert(g227A.xRatio);
	
	//
	//g227A.mediaWidth = parseInt( param.mediaWidthArr[index] );
	
	//var controlBarWidth = $('.pageWrapper').width() - g227A.mediaWidth;
	var controlBarWidth = parseInt( $('.pageWrapper').css('width') ) - g227A.mediaWidth;
	
	//
	$('.g227A_controlBar').animate({width:controlBarWidth-1},360);
	var mediaToPageWrapperRatio = g227A.mediaWidth/$('.pageWrapper').width();
	
	
	//※※※1060106
	var controlBarW = controlBarWidth*mediaToPageWrapperRatio;
	//
	$('.g227A_controlBarPercent').delay(360).animate({'width':controlBarW},360);
	

	
};



//●○●○●○1051220●○●○●○ - ※另類的整個頁面進入全畫面│回復一般畫面
g227A.pageWidthControlEvent = function(_toPageFlag){
	
	//●○1060106
	jQuery( ":animated" ).clearQueue();
  	jQuery( ":animated" ).stop();
	
		
		var pageWidth;
		
		//舊的pageWidth
		if(_toPageFlag === 'toFullPage'){
			//目前的pageWidth，還沒變換前
			pageWidth = g227A.pageInitWidth;
			//
			g227A.pageWidthState = 'fullPage';
			g227A.showHideBtn();
			
		}else if(_toPageFlag === 'toOriginal'){
			//目前的pageWidth，還沒變換前
			pageWidth = $(window).width();
			//
			g227A.pageWidthState = 'original';
			g227A.showHideBtn();
		}
		
		
		//取得目前媒體寬高
		g227A.mediaWidth = parseInt(g227A._mediaObj.width);
		g227A.mediaHeight = parseInt(g227A._mediaObj.height);
		//alert(g227A.mediaWidth+'/'+g227A.mediaHeight);
				
		//.g227A_menuZone 目前寬度 - ●○讓g227A.menuZoneCurrWidth
		g227A.menuZoneCurrWidth = $('.g227A_menuZone').width();
		
		//頁面寬度除以.g227A_menuZone寬度的比例 - 此處也是 目前的pageWidth，還沒變換前
		var pageToMenuZoneWidthRatio = pageWidth/g227A.menuZoneCurrWidth;
		
		//頁面寬度除以媒體寬度的比例 - 此處也是 目前的pageWidth，還沒變
		var pageToMediaWidthRatio = pageWidth/g227A.mediaWidth;
		
		
		
		//●○新的pageWidth
		//----------------------------------------------------------------------
		if(_toPageFlag === 'toFullPage'){
			//視窗寬度
			pageWidth = $(window).width();
		}else if(_toPageFlag === 'toOriginal'){
			//.pageWrapper原始寬度
			pageWidth = g227A.pageInitWidth;
		}
		
		//計算媒體[新寬高]
		g227A.mediaWidth = pageWidth/pageToMediaWidthRatio;
		g227A.mediaHeight = g227A.mediaWidth/g227A.mediaW2hRatio;
		//alert(g227A.mediaW2hRatio+'///'+g227A.mediaWidth+'/'+g227A.mediaHeight);
		
		//計算.g227A_menuZone新的寬度
		//g227A.menuZoneCurrWidth = pageWidth/pageToMenuZoneWidthRatio;
		g227A.menuZoneCurrWidth = pageWidth - g227A.mediaWidth;
		//----------------------------------------------------------------------
		

		
		
		//
		if(_toPageFlag === 'toFullPage'){
			$('.pageWrapper').animate({width:pageWidth},360);
			
			$('.g227A_menuZone, .g227A_controlBar').animate({'width':g227A.menuZoneCurrWidth},360);
			
			//●○1060105
			//$('.g227A_menuZone').height( $(window).height() - $('.g227A_header').height() - $('.g227A_controlBar').height() );
			
			$('.g227A_menuZone').animate( {
				'height':$(window).height() - $('.g227A_header').height() - $('.g227A_controlBar').height()},360, function(){
					//
					g227A.scrollControl();
					
					
					//1060124- 將字級+-模組插入到.g227A_minus_plus前面(左邊)，並附加修正用class - .fontSizeSwitcher_full

					// 1080115 - 隱藏 - 避免 fontSizeSwitcher 變半透明
					// $('.g227A_minus_plus').before( $('.fontSizeSwitcher') );

					$('.fontSizeSwitcher').addClass('fontSizeSwitcher_full');
					
				});
			
		}else if(_toPageFlag === 'toOriginal'){
			//●○1060105
			//$('.g227A_menuZone').height( parseInt($('.g227A_controlBar').css('min-height')) );
			
			$('.g227A_menuZone, .g227A_controlBar').animate({'width':g227A.menuZoneCurrWidth},360);
			//alert( parseInt($('.g227A_controlBar').css('height')) );
			
			$('.g227A_menuZone').animate( {
				'height': parseInt($('.g227A_controlBar').css('height'))},360, function(){
					
					g227A.scrollControl();
					
					
					//1060124- 將字級+-模組插入到.g227A_minus_plus前面(左邊)，並附加修正用class - .fontSizeSwitcher_full
					$('.g227A_menuZone').after( $('.fontSizeSwitcher') );
					$('.fontSizeSwitcher').removeClass('fontSizeSwitcher_full');
					
				});
			
			$('.pageWrapper').animate({width:pageWidth},500);
		}

		//※※※1060106
		var controlBarW = (g227A.menuZoneCurrWidth)/pageToMediaWidthRatio;
		$('.g227A_controlBarPercent').animate({'width':0},100).delay(200).animate({'width':controlBarW},360);
		
		
		
		
		//媒體寬高調整
		g227A._mediaObj.width = g227A.mediaWidth;
		g227A._mediaObj.height = g227A.mediaHeight;
		
		
		
		//
		$('.mediaWrapper:eq(' + g227A.mediaIndex + ') .mediaDiv').animate({'width':g227A.mediaWidth,'height':g227A.mediaHeight},360);
		
		//※※※1060106
		var xxx= $('.mediaWrapper:eq(' + g227A.mediaIndex + '), .mediaWrapper:eq(' + g227A.mediaIndex + ') .mediaHeader, .mediaWrapper:eq(' + g227A.mediaIndex + ') .playbackDiv');
		xxx.animate({'width':g227A.mediaWidth},500,function(){});
		
		
			//1040906 - 移進來 - 可能解決全畫面下視窗resize事件，拖曳播放頭部正常之問題 ???
			//
			var playbackDivHeight = parseInt($('.mediaWrapper:eq(' + g227A.mediaIndex + ') .playbackDiv').css('height'));
			if(isNaN(playbackDivHeight)){
				playbackDivHeight = 0;
			}
			//.mediaHeader的高度
			var headerHeight = parseInt($('.mediaWrapper:eq(' + g227A.mediaIndex + ') .mediaHeader').css('height'));
			if(isNaN(headerHeight)){
				headerHeight = 0;
			}
			
	
			//●○1040521 - 處理$('.mediaWrapper:eq(' + g227A.mediaIndex + ') .mediaDivOverlay')的 寬高 和 margin-top
			if(param.playModeArr[0] === "flash"){
	
				//●◎1040629
				//===================================================
				var mediaDivOverlay_marginTop;
	
				//●◎播放介面在影音上方
				if($('.mediaWrapper:eq(' + g227A.mediaIndex + ')>.playbackDiv').get(0) !== undefined){
					mediaDivOverlay_marginTop = -(g227A.mediaHeight);
	
				//◎播放介面在影音下方
				}else if($('.mediaDiv:eq(' + g227A.mediaIndex + ')>.playbackDiv').get(0) !== undefined){
					mediaDivOverlay_marginTop = -(g227A.mediaHeight);
				}
				//alert(mediaDivOverlay_marginTop);
	
				//alert($('.mediaDiv:eq(' + g227A.mediaIndex + ')>.playbackDiv').get(0) != undefined);
				$('.mediaWrapper:eq(' + g227A.mediaIndex + ') .mediaDivOverlay').css({'margin-top':mediaDivOverlay_marginTop,'opacity':param.mediaDivOverlayOpacity, 'width':g227A.mediaWidth, 'height':g227A.mediaHeight});
	
				//===================================================
			}
	
	
	
			//---------------------------------------------------------------
			$('.mediaWrapper:eq(' + g227A.mediaIndex + ') .slider').draggable("destroy");
			//==============================================
			method.caculateTrackWidth(g227A.mediaWidth, g227A.mediaIndex); 
			//==============================================
			method.jqUITouchPunchDrag(g227A.mediaIndex);
			//---------------------------------------------------------------
			
			//1041015
			if(param.layoutType[g227A.mediaIndex] === "normal"){
				//=====================
				method.removeDotSpan();
				method.putDot();
				//=====================
			}else if(param.layoutType[g227A.mediaIndex] === "normal"){
				//=====================
				method.removeDotSpan2();
				method.putDot2();
				//=====================
			}
				
				
	
			//●○1040630 - 必須有method.updateProgress(g227A.mediaIndex)，
			//全畫面時變更視窗大小(window.resize事件)，播放頭位置、播放進度列長度才能正確更新。否則不會更新
			//=====================
			method.updateProgress(g227A.mediaIndex);
			//=====================
			
			
			//●○1040923
			//======================================================================================
			param.trackX[g227A.mediaIndex] = $('.mediaWrapper:eq(' + g227A.mediaIndex + ') .track').offset().left;
			//======================================================================================
		
		
			//媒體寬高調整
			//g227A._mediaObj.width = g227A.mediaWidth;
			//g227A._mediaObj.height = g227A.mediaHeight;
			//alert(g227A._mediaObj.width+'/'+g227A._mediaObj.height);
		
		
		
		//
		//● IE6~IE8 - 不可用程式操控.mediaWrapper的CSS - height為auto，否則此方法的功能會錯亂。(.g227A_menuZone會先往下掉)
		//.mediaWrapper的CSS背景必須設為透明，即不能設底色
		//============================================================================
		if (!window.addEventListener) { 
			//
			
		//IE9及以上，
		}else{
			$('.mediaWrapper:eq(' + g227A.mediaIndex + ') ').css({'height':'auto'});	
		}
		//============================================================================
		
		
		
		
		//●○●○●○ - 調整位置
		method.adjustCoverImgPos(g227A.mediaIndex,2);
		
		
		

	
};


//●○整頁全畫面狀態下的視窗resize事件與處理。
g227A.fullPageWinOnResize = function(){ 
	
	$(window).on('resize',function(){
		
		//●○
		if( $(window).width() > param.breakpoint && g227A.pageWidthState === 'fullPage' ){

			
			g227A.pageCurrWidth = $(window).width(); 
			//
			g227A.mediaWidth = g227A.pageCurrWidth*g227A.xRatio; 
			g227A.mediaHeight = g227A.mediaWidth/g227A.mediaW2hRatio;
			g227A.menuZoneCurrWidth = g227A.pageCurrWidth - g227A.mediaWidth ;
			//alert(g227A.mediaWidth+'/'+g227A.menuZoneCurrWidth);
			
			$('.g227A_controlBarPercent').animate({'width':g227A.menuZoneCurrWidth*g227A.xRatio},0);
			
			
			//
			g227A.adjustWidth();
			
			
			//1060124- 將字級+-模組插入到.g227A_minus_plus前面(左邊)，並附加修正用class - .fontSizeSwitcher_full

			// 1080115 - 隱藏 - 避免 fontSizeSwitcher 變半透明
			// $('.g227A_minus_plus').before( $('.fontSizeSwitcher') );

			$('.fontSizeSwitcher').addClass('fontSizeSwitcher_full');
			
			
		
		//●○
		}else if( $(window).width() <= param.breakpoint && g227A.pageWidthState === 'fullPage' ){
			//
			//$(window).off('resize');
			//
			//g227A.pageWidthControlEvent('toOriginal');
			
			
			g227A.pageCurrWidth = $(window).width();
			//
			g227A.mediaWidth = g227A.pageCurrWidth;
			g227A.mediaHeight = g227A.mediaWidth/g227A.mediaW2hRatio;
			g227A.menuZoneCurrWidth = g227A.pageCurrWidth;
			
			//
			g227A.adjustWidth();
			
			
			//1060124- 將字級+-模組插入到.g227A_minus_plus前面(左邊)，並附加修正用class - .fontSizeSwitcher_full
			$('.g227A_menuZone').after( $('.fontSizeSwitcher') );
			$('.fontSizeSwitcher').removeClass('fontSizeSwitcher_full');
			
			
		}
	
		
	});
};


//控制.g227A_plus和.g227A_minus按鈕的切換(出現或隱藏)
g227A.showHideBtn = function(){
	//
	if( g227A.pageWidthState === "original" ){
		$('.g227A_minus').css({'display':'none'});
		$('.g227A_plus').css({'display':'table-cell'});
	}else if( g227A.pageWidthState === "fullPage" ){
		$('.g227A_minus').css({'display':'table-cell'});
		$('.g227A_plus').css({'display':'none'});
	}
};


//關閉.g227A_plus和.g227A_minus的按鈕事件偵聽。(沒用到)
g227A.plusMinusMouseEventOff = function(){
	//
	$('.g227A_plus').off('mouseover');
	$('.g227A_plus').off('mouseout');
	$('.g227A_plus').off('mousedown');
	//
	$('.g227A_minus').off('mouseover');
	$('.g227A_minus').off('mouseout');
	$('.g227A_minus').off('mousedown');
};


//$('.g227A_plus')按鈕，將.pageWrapper寬度放大到視窗寬度。另類的全畫面功能。
//$('.g227A_minus')按鈕，將.pageWrapper寬度縮至初始寬度。
g227A.plusMinusMouseEvent = function(){
	
	//
	$('.g227A_plus').on('mouseover',function(){
		$('.g227A_plus img').attr('src',param.mainPath + 'g227A_VideoCueAccessible/images/plusBtnImg_over.png');
	});
	
	//
	$('.g227A_plus').on('mouseout',function(){
		$('.g227A_plus img').attr('src',param.mainPath + 'g227A_VideoCueAccessible/images/plusBtnImg.png');
	});
	
	//$('.g227A_plus')按鈕，將.pageWrapper寬度放大到視窗寬度。另類的全畫面功能。
	$('.g227A_plus').on('mousedown',function(){
		$('.g227A_plus img').attr('src',param.mainPath + 'g227A_VideoCueAccessible/images/plusBtnImg.png');
		
		//
		g227A.pageWidthState = 'fullPage';
		g227A.showHideBtn();
		
		//
		g227A.pageWidthControlEvent('toFullPage');
		
		//改到$(document).ready裡最下方
		//g227A.fullPageWinOnResize();
		
	});
	
	//============================================================================↑↑↑●○↓↓↓
	
	//
	$('.g227A_minus').on('mouseover',function(){
		$('.g227A_minus img').attr('src',param.mainPath + 'g227A_VideoCueAccessible/images/minusBtnImg_over.png');
	});
	
	//
	$('.g227A_minus').on('mouseout',function(){
		$('.g227A_minus img').attr('src',param.mainPath + 'g227A_VideoCueAccessible/images/minusBtnImg.png');
	});
	
	//$('.g227A_minus')按鈕，將.pageWrapper寬度縮至初始寬度
	$('.g227A_minus').on('mousedown',function(){
		$('.g227A_minus img').attr('src',param.mainPath + 'g227A_VideoCueAccessible/images/minusBtnImg.png');
		
		//
		g227A.pageWidthState = 'original';
		g227A.showHideBtn();
		
		//
		g227A.pageWidthControlEvent('toOriginal');
		
	});
	
};


//help滑鼠事件
g227A.helpMouseEvent = function(){
	$('.g227A_help img').on('mouseover',function(){
		$(this).attr('src', param.mainPath + 'g227A_VideoCueAccessible/images/help_over.png');
	});
	$('.g227A_help img').on('mouseout',function(){
		$(this).attr('src', param.mainPath + 'g227A_VideoCueAccessible/images/help.png');
	});
	$('.g227A_help img').on('mousedown',function(){
		$(this).attr('src', param.mainPath + 'g227A_VideoCueAccessible/images/help.png');
		$('.g227A_help a').attr({'href':param.helpUrl,target:'_blank'});
	});
};


//載入標題列的一些圖檔
g227A.createImg = function(){
	//
	$('.g227A_nouIcon').html('<img src="' + param.mainPath + 'g227A_VideoCueAccessible/images/nou_media.png" alt="NOU Media Icon.">');
	//
	$('.g227A_minus').html('<img src="' + param.mainPath + 'g227A_VideoCueAccessible/images/minusBtnImg.png" alt="縮小頁面">');
	//
	$('.g227A_plus').html('<img src="' + param.mainPath + 'g227A_VideoCueAccessible/images/plusBtnImg.png" alt="加大頁面">');
	//
	$('.g227A_help').html('<a><img src="' + param.mainPath + 'g227A_VideoCueAccessible/images/help.png" alt="加大頁面"></a>');
	
	//
	if( g227A.pageWidthState === "original" ){
		$('.g227A_minus').css({'display':'none'});
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



//●○●○●○1070417
method.menuItemFocus = function(){
	

	//●○●○●○1070412
	//=========================================================●
	$('.g227A_menuItem').each(function(index, element) {
		
		
		$('.g227A_menuItem:eq(' + index + ')').on('focusin',function(e){
			
			//●○●○●○1070420
			//=========================================《《《《《《
			if(g227A.timeCodeArr[index][2] !== 1){
				g227A.numButtonMDownEvent(index, 'list'); //滑鼠按下數字按鈕的事件處理
			}
			//=========================================《《《《《《
			
		});
		
	});
	//=========================================================●


	//1070507
	$('.g227A_fullTextDownloadBtn').on('focus', function(){
		//g227A.totalCard+1
		//alert();

		$(document).keydown(function(e){ 
			//alert(e.keyCode);
			//ENTER鍵
			if(e.keyCode === 13){
				//alert(e.keyCode);

				$('.g227A_fullTextDownloadBtn').parent().attr({'href':g227A.downloadFullText, 'target':'_blank'});
			}
		});

	});


};


//●○●○●○1070424
 g227A.addShortcut = function(){

 	$('.g227A_menuItem').each(function(index){

 		//組合鍵：使用 e.ctrlKey、e.altKey
 		//1：49、2：50　...  上方數字鍵
 		//1：97、2：98 ...  右側數字鍵盤
 		$(document).keydown(function(e){ 
 			//alert(e.keyCode);
 			//============================================================
 			//1：49、2：50　...  上方數字鍵+alt
			if(!e.altKey && e.keyCode === (49+index)){
				g227A.numButtonMDownEvent(index, 'list');

			}else if(e.altKey && e.keyCode === (49+index)){
				//●○●○●○1070427 - 隱藏這行，按alt+數字鍵，才不會再開頭處反覆播放數次
				if(!utils.isMobile && utils.currentBrowser !== 'msie'){
					g227A.numButtonMDownEvent(index, 'list');
				}
				//
			}

			//1：97、2：98 ...  右側數字鍵盤+alt
			if(!e.altKey && e.keyCode === (97+index)){
		    	g227A.numButtonMDownEvent(index, 'list');

			}else if(e.altKey && e.keyCode === (97+index)){
				g227A.numButtonMDownEvent(index, 'list');
			}
			//============================================================

		});

 	});
 	//============================================================


 	//1070507 - 以下不需放在迴圈中
 	$(document).keydown(function(e){ //alert(e.keyCode);

 			//▼▼▼ 1080307 - ★移到主程式tPlayer.js

			//按 P 鍵：play、pause 播放鍵、暫停鍵 切換
			// if(e.keyCode === 80){ 
			// 	//alert(param.playingFlagArr[0]);
		 //    	$('.mediaWrapper:eq(' + 0 + ') .playPause').trigger('mousedown');
			// }
			//============================================================



			//利用 jQuery 將 DOM 元素聚焦 focus() 的六個版本 (保哥)
			//https://blog.miniasp.com/post/2009/10/29/The-six-versions-that-let-DOM-focus-using-jQuery.aspx
			//$('.g227A_fullTextDownloadBtn').setfocus();

			//1070507
			//按 t 鍵：跳出全文
			// if(e.keyCode === 84){ 
			// 	$('.g227A_fullTextDownloadBtn').focus();
		 //    	$('.g227A_fullTextDownloadBtn').trigger('mousedown');
		 //    	$(":focus").click();
			// }


			//按 0 鍵：跳出全文
			if(e.keyCode === 48 || e.keyCode === 96){ 
				$('.g227A_fullTextDownloadBtn').focus();
				$('.g227A_fullTextDownloadBtn').trigger('mousedown');
				$(":focus").click();
			}

			//1070522
			//按 b 鍵：焦點到body標籤
			if(e.keyCode === 66){ 
				$(document.body).focus();
			}

			//
			//if(e.keyCode === 77){ 
				//var targetObject = top.document.getElementsByClassName('box1')[0];
				//var targetObject = $('top .box1');
				//targetObject.focus();
				//alert(targetObject);
			//}


			
			


			//1：49、2：50 ...  上方數字鍵。 若有g227A.totalCard個節點，則(49 + g227A.totalCard)之數字鍵為跳出全文。
			// if(!e.altKey && e.keyCode === (49 + g227A.totalCard)){
			// 	$('.g227A_fullTextDownloadBtn').focus();
		 //    	$('.g227A_fullTextDownloadBtn').trigger('mousedown');
		 //    	$(":focus").click();

			// }else if(e.altKey && e.keyCode === (49 + g227A.totalCard)){
			// 	$('.g227A_fullTextDownloadBtn').focus();
			// 	$('.g227A_fullTextDownloadBtn').trigger('mousedown');
			// 	$(":focus").click();
			// }

			//1：97、2：98 ...  右側數字鍵盤。 若有g227A.totalCard個節點，則(97 + g227A.totalCard)之數字鍵為跳出全文。
			// if(!e.altKey && e.keyCode === (97 + g227A.totalCard)){
			// 	$('.g227A_fullTextDownloadBtn').focus();
		 //    	$('.g227A_fullTextDownloadBtn').trigger('mousedown');
		 //    	$(":focus").click();

			// }else if(e.altKey && e.keyCode === (97 + g227A.totalCard)){
			// 	$('.g227A_fullTextDownloadBtn').focus();
			// 	$('.g227A_fullTextDownloadBtn').trigger('mousedown');
			// 	$(":focus").click();
			// }

		

	});


 };


 g227A.fullTextDownloadMouseEvent = function(){

 	$('.g227A_fullTextDownloadBtn').parent('a').attr({'href':g227A.downloadFullText, 'target':'_blank'});

 };



//1080105
// =============================================================================★★★★★★★★★★★★★★★★
 //
method.createFontSizeSwitcher = function(){
	
	//取得初始字型大小 - 會擷取為px字串，再parseInt()為整數
	var getInitfontSize = [];
	$('.fontSize').each(function(index) { 
		//alert( $('.fontSize:eq(' + index + ')').css('font-size') );
        getInitfontSize[index] = parseInt( $('.fontSize:eq(' + index + ')').css('font-size') );
    });
	
	
	
	var switcherHtml = 
		'<span class="word"><img src=' + param.mainPath + "g227A_VideoCueAccessible/fontSizeSwitcher/fontSizeWord.png" + ' alt="恢復字級" title="恢復字級"></span>' + 
		'<span class="reduce"><img src=' + param.mainPath + "g227A_VideoCueAccessible/fontSizeSwitcher/fontSizeReduce.png" + ' alt="減小字級" title="減小字級"></span>' + 
		'<span class="increase"><img src=' + param.mainPath + "g227A_VideoCueAccessible/fontSizeSwitcher/fontSizeIncrease.png" + ' alt="加大字級" title="加大字級"></span>';
	
	
	//附加控制元件
	//---------------------------------------------------
	$('.fontSizeSwitcher').prepend(switcherHtml);
	

	//1051115
	//1070507 - 為無障礙版型G227A，新增param.fontSizeOffsetMax、param.fontSizeOffsetMin
	//定義在 G227A的external.js。當然也可定義在 g227A_Overlay.js裡。
	var fontSizeOffsetMax = param.fontSizeOffsetMax || 8;
	var fontSizeOffsetMin = param.fontSizeOffsetMin || -6;
	

	var fontSizeOffset = [];
	
	//1051115
	$('.fontSize').each(function(index) {
		fontSizeOffset[index] = 0;
	});
	
	
	//減小字級
	//---------------------------------------------------
	$('.fontSizeSwitcher .reduce')
			.on('mouseover',function(){
				$('.fontSizeSwitcher .reduce img').attr('src', param.mainPath + "g227A_VideoCueAccessible/fontSizeSwitcher/fontSizeReduce_over.png");
			})
			.on('mouseout',function(){
				$('.fontSizeSwitcher .reduce img').attr('src', param.mainPath + "g227A_VideoCueAccessible/fontSizeSwitcher/fontSizeReduce.png");
			});
	
	$('.fontSizeSwitcher .reduce').on('mousedown',function(){
		$('.fontSize').each(function(index) {
			//1051115
			if( fontSizeOffset[index] > fontSizeOffsetMin ){
				//
            	$('.fontSize:eq(' + index + ')').css('font-size', parseInt($('.fontSize:eq(' + index + ')').css('font-size')) - 1);
				fontSizeOffset[index] -- ;
				//alert( fontSizeOffset[index] );
			}
        });
	});
	
	
	//加大字級
	//---------------------------------------------------
	$('.fontSizeSwitcher .increase')
			.on('mouseover',function(){
				$('.fontSizeSwitcher .increase img').attr('src', param.mainPath + "g227A_VideoCueAccessible/fontSizeSwitcher/fontSizeIncrease_over.png");
			})
			.on('mouseout',function(){
				$('.fontSizeSwitcher .increase img').attr('src', param.mainPath + "g227A_VideoCueAccessible/fontSizeSwitcher/fontSizeIncrease.png");
			});

	
	$('.fontSizeSwitcher .increase').on('mousedown',function(){
		$('.fontSize').each(function(index) {
			//1051115
			if( fontSizeOffset[index] < fontSizeOffsetMax ){
				//
				$('.fontSize:eq(' + index + ')').css('font-size', parseInt($('.fontSize:eq(' + index + ')').css('font-size')) + 1);
				fontSizeOffset[index] ++ ;
				//alert( fontSizeOffset[index] );
			}
			
        });
		
	});
	
	
	//恢復原字級
	//---------------------------------------------------
	$('.fontSizeSwitcher .word')
			.on('mouseover',function(){
				$('.fontSizeSwitcher .word img').attr('src', param.mainPath + "g227A_VideoCueAccessible/fontSizeSwitcher/fontSizeWord_over.png");
			})
			.on('mouseout',function(){
				$('.fontSizeSwitcher .word img').attr('src', param.mainPath + "g227A_VideoCueAccessible/fontSizeSwitcher/fontSizeWord.png");
			});

	
	$('.fontSizeSwitcher .word').on('mousedown',function(){
		$('.fontSize').each(function(index) {
            $('.fontSize:eq(' + index + ')').css('font-size', getInitfontSize[index]);
			//1051115
			$('.fontSize').each(function(index) {
				fontSizeOffset[index] = 0;
			});
        });
		
	});
	
};
// =============================================================================★★★★★★★★★★★★★★★★




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


	//1070508 - 取得全文下載(連結)網址
	g227A.downloadFullText = $('.mediaWrapper .downloadFullText').text();
	//alert(g227A.downloadFullText);
	
	
	//載入標題列的一些圖檔影像
	g227A.createImg();
	
	//新手上路按鈕事件與處理
	g227A.helpMouseEvent();
	
	
	//1050323 - 將timecode資訊存入g227A.timeCodeArr二維陣列
	g227A.createTimeCodeArr();
	
	//1051011 - 
	//●將所有.g227A_card資料存入g227A.cardHtml陣列 & 及其他處理
	//●將小標題存到g227A.cardTitleArr
	g227A.createCardTitleArrNElse();
	
	
	
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
			g227A.mediaIndex = mediaIndex;
			
			//取得資料
			//==================================================
			//取得.pageWrapper初始寬度
			//g227A.pageInitWidth = $('.pageWrapper').width();
			
			//1051228 - 
			//●◎注意：HTML裡，在.pageWrapper增加屬性 ●○「data-pageWidth="800"」。做為.pageWrapper的頁面寬度。
			//這在以小視窗進入頁面時必要存取，才能在resize進入大視窗時正確RWD。
			//=======================================================================●
			g227A.pageInitWidth = parseInt($('.pageWrapper').attr('data-pageWidth'));
			//=======================================================================●
			//alert(g227A.pageInitWidth);
			
			//●目前的頁面寬度
			g227A.pageCurrWidth = $('.pageWrapper').width();
			
			//
			//取得媒體初始寬高
			g227A.mediaWidth = param.mediaWidthArr[g227A.mediaIndex];
			g227A.mediaHeight = param.mediaHeightArr[g227A.mediaIndex];
			
			//計算媒體寬高比
			g227A.mediaW2hRatio = g227A.mediaWidth/g227A.mediaHeight;
			//==================================================
			
			

			//●○1060112
			//----------------------------
			g227A.createMenuzone();
			//----------------------------
			
			
			//●●●//數字按鈕.g227A_numButton、.g227A_menuButton開啟選單列表按鈕、.g227A_returnNumButton返回純粹數字按鈕 的滑鼠事件處理
			//----------------------------
			g227A.buttonsMouseEvent();
			//----------------------------

			
			 
			 //●○初始頁面時，計算與控制 .g227A_controlBar、.g227A_controlBarPercent的寬度
			 //=============================================================
			 g227A.initControlWidth(g227A.mediaIndex);
			 //=============================================================
			 
			 
			 //●○滑鼠點擊在$('.g227A_controlBar')上，可依點擊位置比例，控制媒體寬度 和 選單區塊.g227A_menuZone的寬度
			 //=============================================================
			 g227A.controlWidth(g227A.mediaIndex);
			 //=============================================================
			 
			 

			 //●○●○●○1070424
			 g227A.addShortcut();
 
				
			
		}
		
		
		
		//●○1051229 - 在Mobile(Android、iOS)媒體檔不會自動播放，點擊Play按鈕開始播放後，影音區塊會遮到下方[列表選單]的第一個[選單項目]。
		//所以，藉由HTML5影音物件的durationchange事件偵聽，當觸發時，去trigger　window的resize事件。可重新計算與處理媒體寬高。
		//==========================================================================
		//==========================================================================
		$(tPlayer.h5MediaObj[g227A.mediaIndex]).on('durationchange',function(){//durationchange：媒體資料的長度變更了(發生於取得說明資料時)
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
	
	//$('.g227A_plus')按鈕，將.pageWrapper寬度放大到視窗寬度。另類的全畫面功能。
	//$('.g227A_minus')按鈕，將.pageWrapper寬度縮至初始寬度。
	g227A.plusMinusMouseEvent();
	
	//●○初始寬度狀態下的視窗resize事件與處理。
	g227A.originalWinOnResize();
	
	//●○整頁全畫面狀態下的視窗resize事件與處理。
	g227A.fullPageWinOnResize();
	
	
	//需再測試 - 注意IE8？
	//$(window).trigger('resize');
	
	

	

	
	//●○●○●○1070417
	//=========================================================●
	method.menuItemFocus();
	//=========================================================●
	
	
$('.g227A_fullTextDownloadBtn').on('mousedown', function(){
		 g227A.fullTextDownloadMouseEvent();
	});
});




//>>>=============================================================>>>
})(jQuery); //↑↑↑





//利用 jQuery 將 DOM 元素聚焦 focus() 的六個版本 (保哥)
//https://blog.miniasp.com/post/2009/10/29/The-six-versions-that-let-DOM-focus-using-jQuery.aspx
(function($){

    jQuery.fn.setfocus = function()
    {
        return this.each(function()
        {
            var dom = this;
            setTimeout(function()
            {
                try { dom.focus(); } catch (e) { } 
            }, 0);
        });
    };
    
})(jQuery);





















