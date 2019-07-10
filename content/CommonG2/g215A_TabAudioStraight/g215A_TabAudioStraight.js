// JavaScript Document - G215A│g215A_TabAudioStraight.js
////////////////////////////////////////////////////////
/******************************************************/
var NOU = NOU || {};
var tPlayer = NOU.namespace('NOU.modules.tPlayer');
//-----------------------------------------------------

(function($){ //↓↓↓
//>>>=============================================================>>>
var utils = NOU.namespace('NOU.modules.tPlayer.utils');
//------------------------
var urlObj = NOU.namespace('NOU.modules.tPlayer.urlObj');
//------------------------
var param = NOU.namespace('NOU.modules.tPlayer.param');
//------------------------
var method = NOU.namespace('NOU.modules.tPlayer.method');
//------------------------
var g215A =  NOU.namespace('NOU.modules.g215A');
//------------------------


g215A.cardHtml = [];
g215A.cardTitle = [];
g215A.rwdBtnHtml = '';
g215A.totalCard = 0;
g215A.currCard = -1;
g215A.menuOpen = false;





//媒體介面進場jQ動作 - 《 ※●○這覆蓋 jPlayer.js裡的method.entering = function(index){} 》
method.entering = function(index){
	//●○1041028 - 進場
	$('.mediaWrapper:eq('+index+') .mediaHeader').fadeOut(0);
	$('.mediaWrapper:eq('+index+') .mediaDiv, .mediaWrapper:eq('+index+') .mediaDiv > object').fadeOut(0);
	//$('.mediaWrapper:eq('+index+')').slideUp 改成 $('.mediaWrapper:eq('+index+')').fadeOut
	//
	$('.g215A_cardSet').fadeOut(280);
			
	$('.mediaWrapper:eq('+index+')').fadeOut(280,function(){
		$('.mediaWrapper:eq('+index+') .mediaHeader').fadeIn(280);
		$('.mediaWrapper:eq('+index+') .mediaDiv, .mediaWrapper:eq('+index+') .mediaDiv > object').fadeIn(280);
		$('.mediaWrapper:eq('+index+')').fadeIn(280);
		
		$('.g215A_cardSet').fadeIn(280);
	});	
};


//根據 視窗寬度 與 斷點 的關係，處理差異化
g215A.rwdFunc = function(){
	
	//normal
	if($(window).width() > param.breakpoint){
		
		if( !$('.prev_next_Btn_wrapper').hasClass('g215A_prevBtn') ){
			$('.prev_next_Btn_wrapper').append( $('.g215A_prevBtn') );
		}
		
		if( !$('.prev_next_Btn_wrapper').hasClass('g215A_nextBtn') ){
			$('.prev_next_Btn_wrapper').append( $('.g215A_nextBtn') );
		}
		
		if( !$('.g215A_headerStringOuter').hasClass('g215A_pageNum') ){
			$('.g215A_headerStringOuter').after($('.g215A_pageNum'));
		}
		
		if( $('.g215A_rwdNavDiv').get(0) !== undefined ){
			$('.g215A_rwdNavDiv').empty().remove();
		}
		
		
	//rwd小尺寸
	}else{
		
		if( $('.g215A_rwdNavDiv').get(0) === undefined ){
			
			$('.g215A_header').after(g215A.rwdBtnHtml); 
			//$('.g215A_rwdNavDiv').append( $('.g215A_prevBtn') + $('.g215A_pageNum') + $('.g215A_nextBtn') );
			$('.g215A_rwdNavDiv').append( $('.g215A_prevBtn') );
			$('.g215A_rwdNavDiv').append( $('.g215A_pageNum') );
			$('.g215A_rwdNavDiv').append( $('.g215A_nextBtn') );
			
		}
		
	}
	
		
};



//將$('.pageWrapper')舖滿頁面
g215A.pageWrapperFullWin = function(){ 
	$('.pageWrapper').width($(window).width()).height($(document).height());
	//$('.g215A_card').height($(window).height() - $('.g215A_header').height());
};


//1041208 - 需置於上方，method.lessThenIE9Css()才調用得到。
//IE6~IE8的CSS補救處理
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


//1041202
$(window).on('resize', function(){
	
	//1050127
	//g215A.pageWrapperFullWin();
		
	//
	g215A.rwdFunc();
	
	// IE6~IE8
	method.lessThenIE9Css();
	
});



//
g215A.mediaSetup = function(){
	
	//啟動媒體播放相關處理
	//===================================

	method.choosePlayMode();
	method.deployment();
	
	//
	$('.mediaWrapper').each(function(index) {
		//
		//param.mediaAutoPlayArr[index] = true;
		method.embedMedia(index);
		
		//●●●g215A就是無法使用tPlayer的播放控制方法，用了仍無法控制，且有error。
		//tPlayer.play(index);
		//tPlayer.pause(index);
		
		
		if( utils.isMobile ){
			//●1050616- 必要 - 在這裡控制.slider_2、progressBar_2 回到0的位置
			$('.mediaWrapper:eq(' + index + ') .slider_2').animate({'left':-9},0);
			$('.mediaWrapper:eq(' + index + ') .progressBar_2>img, .mediaWrapper:eq(' + index + ') .progressBar_2').css({'width':0});
		}
			   
	});
	
	//===================================
	
};


//換頁共用
g215A.loadCardComm = function(){
	
	//更新頁碼
	//$('.g215A_pageNumStr').html('Page ' + (g215A.currCard+1) + '');
	$('.g215A_pageNumStr').html('第 ' + (g215A.currCard+1) + ' 頁' + '<span class="g215A_pageTotalStr"> / 共' + g215A.totalCard + '頁</span>'); 
	
	
	
	//1050604 - 隱藏放大鏡圖示 (●針對 IE8(含)以下：換頁前先隱藏)
	$('.zoomIconSpan').css({'visibility':'hidden'});
	
	//
	$('.mediaWrapper').each(function(index) {
		//1050604 - 隱藏.track (●針對 IE8(含)以下：換頁前先隱藏)
		$('.mediaWrapper:eq(' + index + ') .track').css({'visibility':'hidden'});
		
	});
	
	
	//1050629
	//===========================================
	g215A.tabBtnState();
	//===========================================
	
	
	
	//1050604
	//********************************************************************
	$('.g215A_cardSet').animate({'opacity':0.0},240,function(){
	//********************************************************************
	
	
	
		//在$('.g215A_cardSet')中填入第一頁.card的內容上
		//=============================================================
		$('.g215A_cardSet').html(g215A.cardHtml[g215A.currCard]);
		//=============================================================
		
		//1050616
		if( !utils.isMobile ){
			g215A.mediaSetup(); 
		}
		
		
		//●◎○●◎○強制操控.pageWrapper高度為視窗高度
		//=====================================================
		//$('.pageWrapper').css({'height':$(window).height()});
		//=====================================================
		
		
		
		$('.g215A_tabBtn:eq(' + g215A.currCard + ')').trigger('mousedown');
		
		
		
		
		//延遲 300毫秒，讓CSS反應至網頁。
		//===================================================
		setTimeout(function(){
			//===================================================
			//調用tPlayer.js裡的「.toBigPic點小圖跳大圖」功能
			if($('.toBigPic').get(0) !== undefined){
				//點小圖跳大圖 - 這得在method.lessThenIE9Css()上方。
				method.createMagnifierIcon();
			}
			
			//調用tPlayer.js裡的「.normalPic無點小圖跳大圖」功能(主要為RWD處理)
			if($('.normalPic').get(0) !== undefined){
				method.normalPicUtils();
			}
			
			//名詞解釋
			method.glossary();
			//===================================================
			
			
			
		},300); 
		
		

		
		//●10500616 - Mobile + 小尺寸視窗 狀態下
		//g215A.mediaSetup()必須放在$('.g215A_cardSet')透明度1.0之後，換頁之後.slider_2和.progressBar_2才能正確
		//否則，.slider_2會停留在離開前一頁時的位置，.progressBar_2的長度會是離開前一頁時的長度。
	//********************************************************************	
		//1050604
		$('.g215A_cardSet').animate({'opacity':1.0},480, function(){
			////1050616
			//==============================
			if( utils.isMobile ){
				g215A.mediaSetup(); 
			}
			//==============================
			
			
		});
		
	});
	//********************************************************************
	
	
};


//g215A_nextBtn
g215A.loadCardNext = function(e){
	
	//
	if($(e.currentTarget).hasClass('g215A_nextBtn')){ 
		if(g215A.currCard < g215A.totalCard-1){
			//
			g215A.currCard ++; 
			g215A.loadCardComm();
			//
			$('.g215A_prevBtn').css({'opacity':g215A.prevNextBtnOpacity,'cursor':'pointer'});
			//
			if(g215A.currCard >= g215A.totalCard-1){
				$('.g215A_nextBtn').css({'opacity':g215A.prevNextBtnEdgeOpacity,'cursor':'default'});
				$('.g215A_nextBtn').removeClass('g215A_nextBtnDown');
			}
		}
	}
};


//g215A_prevBtn
g215A.loadCardPrev = function(e){
			
	if($(e.currentTarget).hasClass('g215A_prevBtn')){
		if(g215A.currCard > 0){
			//
			g215A.currCard --; 
			g215A.loadCardComm();
			//
			$('.g215A_nextBtn').css({'opacity':g215A.prevNextBtnOpacity,'cursor':'pointer'});
			//
			if(g215A.currCard <= 0){
				$('.g215A_prevBtn').css({'opacity':g215A.prevNextBtnEdgeOpacity,'cursor':'default'});
				$('.g215A_prevBtn').removeClass('g215A_prevBtnDown');
			}
		}
	}
};


//g215A事件處理
g215A.eventHandler = function(){

	//
	$('.g215A_prevBtn')
		.on('mouseover',function(){ //alert(g215A.currCard);
			if( (g215A.currCard <= g215A.totalCard-1) && (g215A.currCard > 0) ){
				$('.g215A_prevBtn > img').attr('src',param.mainPath + 'g215A_TabAudioStraight/images/prevBtn_over.png');
				$('.g215A_prevBtn').addClass('g215A_prevBtnOver');
			}
		})
		.on('mouseout',function(){
			if( (g215A.currCard <= g215A.totalCard-1) && (g215A.currCard > 0) ){
				$('.g215A_prevBtn > img').attr('src', param.mainPath + 'g215A_TabAudioStraight/images/prevBtn.png');
				$('.g215A_prevBtn').removeClass('g215A_prevBtnOver');
				$('.g215A_prevBtn').removeClass('g215A_prevBtnDown');
			}
		})
		.on('mousedown',function(e){
			if( (g215A.currCard <= g215A.totalCard-1) && (g215A.currCard > 0) ){
				$('.g215A_prevBtn > img').attr('src', param.mainPath + 'g215A_TabAudioStraight/images/prevBtn_down.png');
				$('.g215A_prevBtn').removeClass('g215A_prevBtnOver');
				$('.g215A_prevBtn').addClass('g215A_prevBtnDown');
				
				//
				g215A.loadCardPrev(e);
				
				//延遲200毫秒換回.g215A_prevBtn預設底圖
				setTimeout(function(){
					$('.g215A_prevBtn > img').attr('src', param.mainPath + 'g215A_TabAudioStraight/images/prevBtn.png');
					$('.g215A_prevBtn').removeClass('g215A_prevBtnOver');
					$('.g215A_prevBtn').removeClass('g215A_prevBtnDown');
				},200);
				
			}
		});
		
	
	//
	$('.g215A_nextBtn')
		.on('mouseover',function(){
			if( (g215A.currCard < g215A.totalCard-1) && (g215A.currCard >= 0) ){
				$('.g215A_nextBtn > img').attr('src', param.mainPath + 'g215A_TabAudioStraight/images/nextBtn_over.png');
				$('.g215A_nextBtn').addClass('g215A_nextBtnOver');
			}
		})
		.on('mouseout',function(){
			if( (g215A.currCard < g215A.totalCard-1) && (g215A.currCard >= 0) ){
				$('.g215A_nextBtn > img').attr('src', param.mainPath + 'g215A_TabAudioStraight/images/nextBtn.png');
				$('.g215A_nextBtn').removeClass('g215A_nextBtnOver');
				$('.g215A_nextBtn').removeClass('g215A_nextBtnDown');
			}
		})
		.on('mousedown',function(e){
			if( (g215A.currCard < g215A.totalCard-1) && (g215A.currCard >= 0) ){
				
				$('.g215A_nextBtn > img').attr('src', param.mainPath + 'g215A_TabAudioStraight/images/nextBtn_down.png');
				$('.g215A_nextBtn').removeClass('g215A_nextBtnOver');
				$('.g215A_nextBtn').addClass('g215A_nextBtnDown');
				
				//
				g215A.loadCardNext(e);
				
				//延遲200毫秒換回.g215A_nextBtn預設底圖
				setTimeout(function(){
					$('.g215A_nextBtn > img').attr('src', param.mainPath + 'g215A_TabAudioStraight/images/nextBtn.png');
					$('.g215A_nextBtn').removeClass('g215A_nextBtnOver');
					$('.g215A_nextBtn').removeClass('g215A_nextBtnDown');
				},200);
				
			}
			
		});
		
		
		//開啟menu按鈕 事件處理
		//====================================
		g215A.menuBtnMouseEvent();
		//====================================
		
			
};

//開啟menu按鈕 事件處理
g215A.menuBtnMouseEvent = function(){
	//
	$('.g215A_menuBtn')
	
		.on('mouseover',function(){
			$('.g215A_menuBtn > img').attr('src', param.mainPath + 'g215A_TabAudioStraight/images/menuBtn_over.png');
		})
		.on('mouseout',function(){
			$('.g215A_menuBtn > img').attr('src', param.mainPath + 'g215A_TabAudioStraight/images/menuBtn.png');
		})
		
		.on('mousedown',function(){
			//
			$('body').append('<div class="g215A_menuZone"></div>');
			
			//
			//$('.g215A_menuZone').css({'display':'block','opacity':0.0}).animate({'opacity':g215A.menuZoneOpacity},480);
			$('.g215A_menuZone').css({'opacity':g215A.menuZoneOpacity}).slideDown(250,function(){
				g215A.menuOpen = true;	
			});
			
			//
			$(this).off('mouseover');
			$(this).off('mouseout');
			$(this).off('mousedown');
			
			//
			$('.g215A_menuBtn').empty().remove();
			$('.g215A_menuBtnOuter').html('<div class="g215A_menuCloseBtn"></div>');
			$('.g215A_menuCloseBtn').append('<img src=' + param.mainPath + 'g215A_TabAudioStraight/images/menuCloseBtn.png' + '>');
			
			
			
			//
			g215A.createCardTitleMenu();
			
			//關閉menu按鈕 事件處理
			g215A.menuCloseBtnMouseEvent();
			
		});
};

//關閉menu按鈕 事件處理
g215A.menuCloseBtnMouseEvent = function(){
	//
	$('.g215A_menuCloseBtn')
		.on('mouseover',function(){
			$('.g215A_menuCloseBtn > img').attr('src', param.mainPath + 'g215A_TabAudioStraight/images/menuCloseBtn_over.png');
		})
		.on('mouseout',function(){
			$('.g215A_menuCloseBtn > img').attr('src', param.mainPath + 'g215A_TabAudioStraight/images/menuCloseBtn.png');
		})
		.on('mousedown',function(){
			//
			/*$('.g215A_menuZone').animate({'opacity':0.0},480,function(){
				$('.g215A_menuZone').remove();	
			});*/
			$('.g215A_menuZone').css({'opacity':1.0}).slideUp(250,function(){
				$('.g215A_menuZone').remove();	
			});
			
			//
			g215A.menuOpen = false;
			
			//
			$(this).off('mouseover');
			$(this).off('mouseout');
			$(this).off('mousedown');
			
			//
			$('.g215A_menuCloseBtn').empty().remove();
			$('.g215A_menuBtnOuter').html('<div class="g215A_menuBtn"></div>');
			$('.g215A_menuBtn').append('<img src=' + param.mainPath + 'g215A_TabAudioStraight/images/menuBtn.png' + '>');
			
			
			//開啟menu按鈕 事件處理
			g215A.menuBtnMouseEvent();
			
		});
};


//將網頁上的.g215A_cardTitle存入陣列g215A.cardTitle
g215A.cardTitleToArr = function(){
	//
	$('.g215A_cardTitle').each(function(index) {
        g215A.cardTitle[index] = $('.g215A_cardTitle:eq(' + index +  ')').html();
		//alert(g215A.cardTitle[index]);
    });
};


//將g215A.cardTitle陣列中的元素 - $('.g215A_cardTitle:eq(' + index +  ')').html()
//附加到$('.g215A_menuZone')
g215A.createCardTitleMenu = function(){
	
	
	//1050510 - 增加help按鈕 '<span class="help"></span>'
	$('.g215A_menuZone').append('<div class="g215A_menuHeader">' + g215A.menuHeader + '<span class="help"></span></div>');
	
	
	//新手上路 - 1050510
	//======================================================================
	if(param.hasHelpFlag){
		
		if(param.helpIconPath === undefined || param.helpIconPath === "" || typeof param.helpIconPath !== "string"){ 
			param.helpIconPath = param.tPlayer_CSSPath + "images/help.png";
			param.helpIconOverPath = param.tPlayer_CSSPath + "images/help_over.png";
		}
		
		$('.g215A_menuHeader .help')
				.append('<a><img src=' + param.helpIconPath + '></a>')
				.attr('title', param.helpComment); 
				
		//
		$('.g215A_menuHeader .help')
		
			.on('mouseover',function(){ 
					$('.g215A_menuHeader .help img').attr('src', param.helpIconOverPath); 
				})
			.on('mouseout',function(){
					$('.g215A_menuHeader .help img').attr('src', param.helpIconPath);
				})
			.on('mousedown',function(){
					//
					$('.g215A_menuCloseBtn').trigger('mousedown');
					//
					$('.g215A_menuHeader .help a').attr({'href':param.helpUrl,target:'_blank'});
					
				});
				
	}
	//======================================================================
	
	

	
	//
	$.each(g215A.cardTitle,function(index) { 
		
		
		//●○●○●○
		//******************************************************************************
		if( g215A.cardTitle[index] !== "" ){  
		//******************************************************************************
	
		
			//
			$('.g215A_menuZone').append(  
					'<div class="g215A_menuRow">' + 
						'<span class="g215A_menuRowOrder">' + (index+1) + '</span>' + 
						'<span class="g215A_menuRowItemOuter">' + 
							'<span class="g215A_menuRowItem">' + g215A.cardTitle[index] + '</span>' + 
						'</span>' + 
					'</div>' );
			
			//
			//g215A_menuRowOrder_current
			$('.g215A_menuRow:eq(' + g215A.currCard + ')').addClass('g215A_menuRow_current');
			$('.g215A_menuRow:eq(' + g215A.currCard + ') .g215A_menuRowOrder').addClass('g215A_menuRowOrder_current');
			$('.g215A_menuRow:eq(' + g215A.currCard + ') .g215A_menuRowItem').addClass('g215A_menuRowItem_current');
			
			
			
			//●○※
			$('.g215A_menuRow:eq(' + index + ')')
			
			
				.on('mouseover',function(){
					if(index !== g215A.currCard){
						$('.g215A_menuRow:eq(' + index + ')').addClass('g215A_menuRow_hover');
						$('.g215A_menuRowOrder:eq(' + index + ')').addClass('g215A_menuRowOrder_hover');
						
					}else{
						$('.g215A_menuRow:eq(' + index + ')').css({'cursor':'default'});
					}
				})
				.on('mouseout',function(){
					$('.g215A_menuRow:eq(' + index + ')').removeClass('g215A_menuRow_hover');
					$('.g215A_menuRowOrder:eq(' + index + ')').removeClass('g215A_menuRowOrder_hover');
				})
				
				//
				.on('mousedown',function(){
					
					//●
					if(index !== g215A.currCard){
						
						//
						$('.g215A_menuZone').css({'opacity':1.0}).slideUp(250,function(){
							
							$('.g215A_menuZone').remove();
							//
							$('.g215A_menuCloseBtn').trigger('mousedown');
							
							//指定序號換頁
							//====================================
							g215A.currCard = index;
							//
							g215A.nextNPrevBtnState();
							//
							g215A.loadCardComm(); 
							//====================================
							
						});
					
					}
					
				});
				
				
				
		//●●●●●●
		//******************************************************************************
		}else{ 
			//alert(index);
		}
		//******************************************************************************
		
				
		
    });
	//$.each()
	
	
	

	
	
	//點擊在body標籤上
		$('body').on('mousedown',function(e){ 
		
			//alert(e.target.className + '/' + e.target.tagName);
			if(g215A.menuOpen === true){
				if( e.target.tagName.toLowerCase() === "body"){ 
					$('.g215A_menuCloseBtn').trigger('mousedown');
					g215A.menuOpen = false;
				}
			}
		});
		
		//點擊在.pageWrapper上
		$('.pageWrapper').on('mousedown',function(){ 
			if(g215A.menuOpen === true){
				$('.g215A_menuCloseBtn').trigger('mousedown');
				g215A.menuOpen = false;
			}
		});
		
	
	
};


//依序號換頁時，檢查與調整g215A_nextBtn、prevBtn按鈕狀態
g215A.nextNPrevBtnState = function(){
	
	if(g215A.currCard > 0){
		$('.g215A_prevBtn').css({'opacity':g215A.prevNextBtnOpacity,'cursor':'pointer'});
	}else{
		$('.g215A_prevBtn').css({'opacity':g215A.prevNextBtnEdgeOpacity,'cursor':'default'});
	}
	
	if(g215A.currCard < g215A.totalCard-1){
		$('.g215A_nextBtn').css({'opacity':g215A.prevNextBtnOpacity,'cursor':'pointer'});
	}else{
		$('.g215A_nextBtn').css({'opacity':g215A.prevNextBtnEdgeOpacity,'cursor':'default'});
	}
	
	
};


//更新頁籤外觀狀態 - 1050629
//===========================================
g215A.tabBtnState = function(){
	
	$.each(g215A.cardTitle,function(index){
		
		//
		$.each(g215A.cardTitle, function(i){
			//$('.g215A_tabBtn:eq(' + i + ')').css({'background':'url(' + param.mainPath + 'g215A_TabAudioStraight/images/tab_A_big.png)'});
			//
			$('.g215A_tabBtn:eq(' + i + ')').removeClass('g215A_tabBtn_keep');
			//
			$('.g215A_tabBtn:eq(' + i + ') .g215A_tabTitle').removeClass('g215A_tabTitle_keep');
		});
	
	
		//$('.g215A_tabBtn:eq(' + g215A.currCard + ')').css({'background':'url(' + param.mainPath + 'g215A_TabAudioStraight/images/tab_A_big_keep.png)'});
		//
		$('.g215A_tabBtn:eq(' + g215A.currCard + ')').addClass('g215A_tabBtn_keep');
		$('.g215A_tabBtn:eq(' + g215A.currCard + ')').removeClass('g215A_tabBtn_over');
		//
		$('.g215A_tabBtn:eq(' + g215A.currCard + ') .g215A_tabTitle').addClass('g215A_tabTitle_keep');
		
		
	});
	
};



//建立頁籤 - 1050629
g215A.createTab = function(){
	
	//
	var tabBtnHtml = '<div class="g215A_tabBtn"><div class="g215A_tabTitle"></div></div>';
	
	
	//●●●●●●
	$.each(g215A.cardTitle,function(index){
		
		$('.g215A_tabZone').append(tabBtnHtml);
		$('.g215A_tabTitle:eq(' + index + ')').html(g215A.cardTitle[index]);
		
		
		//alert( $('.g215A_tabBtn:eq(' + index + ')').is('.blank') );
		//alert( $('.g215A_cardTitle:eq(' + index + ')').is('.blank') );
		
		//●○●○●○
		//******************************************************************************
		if( !$('.g215A_cardTitle:eq(' + index + ')').is('.blank') ){ 
		//******************************************************************************
		
		
		
		//●●●●●●
		//====================================================================
		$('.g215A_tabBtn:eq(' + index + ')')
		//====================================================================
		//
		.on('mouseover',function(){
			
			
				
			if( g215A.currCard !== index ){
				//$(this).css({'background':'url(' + param.mainPath + 'g215A_TabAudioStraight/images/tab_A_big_over.png)'});
				//
				$(this).addClass('g215A_tabBtn_over');
				//
				$(this).find('.g215A_tabTitle').addClass('g215A_tabTitle_over');
			}
			
			
		})
		//
		.on('mouseout',function(){
			if( g215A.currCard !== index ){
				//$(this).css({'background':'url(' + param.mainPath + 'g215A_TabAudioStraight/images/tab_A_big.png)'});
				//
				$(this).removeClass('g215A_tabBtn_over');
				//
				$(this).find('.g215A_tabTitle').removeClass('g215A_tabTitle_over');
				
			}
		})
		//
		.on('mousedown', function(){
			
			//
			if( g215A.currCard !== index ){
				
				//
				$.each(g215A.cardTitle, function(i){
					//$('.g215A_tabBtn:eq(' + i + ')').css({'background':'url(' + param.mainPath + 'g215A_TabAudioStraight/images/tab_A_big.png)'});
					//
					$('.g215A_tabBtn:eq(' + i + ')').removeClass('g215A_tabBtn_keep');
					//
					$('.g215A_tabBtn:eq(' + i + ') .g215A_tabTitle').removeClass('g215A_tabTitle_keep');
				});
			
			
				//$(this).css({'background':'url(' + param.mainPath + 'g215A_TabAudioStraight/images/tab_A_big_keep.png)'});
				//
				//$(this).css({'cursor':'default'});
				//$(this).find('.g215A_tabTitle').css({'cursor':'default'});
				//
				$(this).addClass('g215A_tabBtn_keep');
				$(this).removeClass('g215A_tabBtn_over');
				//
				$(this).find('.g215A_tabTitle').addClass('g215A_tabTitle_keep');
				
				
				//指定序號換頁
				//====================================
				g215A.currCard = index;
				//
				g215A.nextNPrevBtnState();
				//
				g215A.loadCardComm(); 
				//====================================
			
			
			}
		
			
			
		});
		
		
		
		
		//●●●●●●
		//******************************************************************************
		}else{ //alert(index);
			//.g215A_tabBtn裡面還有.g215A_tabTitle，cursor也設定為pointer
			//$('.g215A_tabBtn:eq(' + index + ')').empty().css({'cursor':'default'});
			$('.g215A_tabBtn:eq(' + index + '), .g215A_tabBtn:eq(' + index + ') .g215A_tabTitle').css({'cursor':'default'});
		}
		//******************************************************************************
		
		
		
		
		//1050630 必要操控 - - ●○配合g215A_tabBtn的數量，操控.g215A_content的高度。
		//------->>> ●○這得放在上面的條件式外面。。。。。。否則若有空白.tabBtn，index數值會減去空白按鈕的數量
		//-------------------------------------------------------------------
		//●●●1050629 - 加此操控才能使$('.g215A_content')隨著頁籤堆疊的高度縮放高度。
		if( g215A.cardTitle.length-1 === index ){ 
			
			//alert($('.g215A_tabBtn').height()*g215A.cardTitle.length);
			//alert($('.g215A_tabZone').height());
			//alert($('.g215A_content').height());
			
			if( index >= g215A.tabMinNumControlContentHeight ){ //五個頁籤按鈕以上(6個開始)，必須控制
				$('.g215A_content').height( $('.g215A_tabZone').height()+50 );
			}
			
		}
		//-------------------------------------------------------------------
		
		
	});
	
	
};



/*g215A HTML架構排板 - $('.pageWrapper')、*/
g215A.layout = function(){
	
	//
	$('.g215A_menuBtn').append('<img src=' + param.mainPath + 'g215A_TabAudioStraight/images/menuBtn.png' + '>');
	
	//
	$('.prev_next_Btn_wrapper').append('<span class="g215A_prevBtn"><img src=' + param.mainPath + 'g215A_TabAudioStraight/images/prevBtn.png' + '></span>');
	//
	$('.prev_next_Btn_wrapper').append('<span class="g215A_nextBtn"><img src=' + param.mainPath + 'g215A_TabAudioStraight/images/nextBtn.png' + '></span>');
	
	
	
	//※$('.g215A_prevBtn, .g215A_nextBtn')皆有作用時，透明度設為 g215A.prevNextBtnOpacity
	$('.g215A_prevBtn, .g215A_nextBtn').css({'opacity':g215A.prevNextBtnOpacity});	
	
	//第一頁，$('.g215A_prevBtn')必須標示無作用 - ※透明度設為 g215A.prevNextBtnEdgeOpacity
	$('.g215A_prevBtn').css({'opacity':g215A.prevNextBtnEdgeOpacity,'cursor':'default'});
	
	//若只有一頁時，$('.g215A_nextBtn')也必須標示無作用 - ※透明度設為 g215A.prevNextBtnEdgeOpacity
	if(g215A.totalCard <= 1){
		$('.nextBtn').css({'opacity':g215A.prevg215A_nextBtnEdgeOpacity,'cursor':'default'});
	}
	
	//alert($(document.body).children().length);
	//alert(jQuery.cssNumber.zIndex);
	
	//
	//$(document).children().each(function(index, element) {
        //alert($(this).css('z-index'));
   // });
	
};


//C.附加第1頁Html資料，使出現在頁面上
g215A.loadFirstCard = function(){

	
	//
	g215A.currCard = 0;
	
	//填入頁碼
	//$('.g215A_pageNumStr').html('Page ' + (g215A.currCard+1) + '');
	$('.g215A_pageNumStr').html('第 ' + (g215A.currCard+1) + ' 頁' + '<span class="g215A_pageTotalStr"> / 共' + g215A.totalCard + '頁</span>'); 
	
	
	//1050629
	//===========================================
	g215A.tabBtnState();
	//===========================================
	
	
	//●●●因為以html(g215A.cardHtml[g215A.currCard])方法，載入特定g215A_card，原本的內容就被取代了。
	$('.g215A_cardSet').html(g215A.cardHtml[g215A.currCard]);
	
	
	//1050701
	g215A.loadCardComm();
	

	
};


//A.將所有.g215A_card資料存入g215A.cardHtml陣列
//B.若已完成將所有.g215A_card資料存入g215A.cardHtml陣列，則刪除網頁上所有.g215A_card
g215A.createDataArr = function(){
	
	//
	$('.g215A_card').each(function(index) {
		
		//●將所有.g215A_card資料存入g215A.cardHtml陣列
		g215A.cardHtml[index] = '<div class="g215A_card">' + $('.g215A_card:eq(' + index + ')').html() + '</div>';
		
		//g215A.cardHtml[index] = $('.g215A_card:eq(' + index + ')');
		
		
		//若已完成將所有.g215A_card資料存入g215A.cardHtml陣列
		if(index === $('.g215A_card').length-1){
			
			//
			g215A.totalCard = g215A.cardHtml.length; //alert(g215A.totalCard);
			
			
			//則刪除網頁上所有.g215A_card
			//$('.g215A_card').each(function(i) {
				
				//$('.g215A_card:eq(' + ($('.g215A_card').length-1-i) + ')').empty().remove();
				
				//$('.g215A_card:eq(' + ($('.g215A_card').length-1-i) + ')').slideUp(0);
				//$('.g215A_card:eq(' + ($('.g215A_card').length-1-i) + ')').empty().remove();
				
				//$('.g215A_card:eq(' + ($('.g215A_card').length-1-i) + ')').css({'visibility':'hidden'});
				
				//alert(g215A.cardHtml);
				
			//});
			
			
		}
		
		
    });
};


//1050711 - test。必須再加上條件式
/*method.mediaCompleted = function(index){
	g215A.currCard ++; 
	g215A.loadCardComm();
};*/



//
//$(document).ready(function(){
$(document).ready(function(){

	//●整體縮放頁面 - 強迫設定為1.0，以避免播放控制失常
	//============================
	$('body').css('zoom','1.0');
	//============================	
	
	
	//將網頁上的.g215A_cardTitle存入陣列g215A.cardTitle
	//============================
	g215A.cardTitleToArr();
	//============================
	
	
	//小尺寸視窗時，會將.g215A_nextBtn、.g215A_prevBtn、.g215A_pageNum置入.g215A_rwdNavDiv
	//.g215A_rwdNavDiv則放在.g215A_header之後
	g215A.rwdBtnHtml = '<div class="g215A_rwdNavDiv"></div>';
	
	
	//●g215A
	//===================================
	g215A.createDataArr();
	//g215A.loadFirstCard();
	//===================================
	
	
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
	
	
	//●g215A 之 HTML架構排板
	g215A.layout();
	
	
	//●1050629
	g215A.createTab();
	
	
	//1050302 - ●嘗試移到這裡
	g215A.loadFirstCard();
	
	
	/*//
	method.choosePlayMode();
	method.deployment();
	//
	$('.mediaWrapper').each(function(index) {
		//param.mediaAutoPlayArr[index] = true;
		method.embedMedia(index);
		
		//媒體介面是否有進場jQ動作 ? 
		//●這一定要在 method.embedMedia(index) 之後調用，所以移到各版型主程式調用。
		if(param.hasEnteringMotion){
			//媒體介面進場jQ動作 
			method.entering(index);
		}
		
	});*/
	//===================================
	
		
	//●g215A
	//===================================
	//●g215A 之 HTML架構排板
	//g215A.layout();
	//●g215A
	g215A.eventHandler();
	//===================================
	
	
	//1050603 - 進入頁面就該檢查上一頁、下一頁按鈕的透明度狀態，
	// 是否再第一頁，或最後一頁。尤其只有一頁內容時。
	g215A.nextNPrevBtnState();
	

	
	// IE6~IE8
	method.lessThenIE9Css();
	
	
	//
	//setTimeout(function(){
		$(window).trigger('resize');
	//},200);
	
	
});




//>>>=============================================================>>>
})(jQuery); //↑↑↑








