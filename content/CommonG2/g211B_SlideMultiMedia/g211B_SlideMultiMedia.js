// JavaScript Document - G211B│g211B_SlideMultiMedia.js
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
var g211B =  NOU.namespace('NOU.modules.g211B');
//------------------------



g211B.cardTitle = [];
g211B.cardPath = [];


g211B.rwdBtnHtml = '';
g211B.totalCard = 0;
g211B.currCard = -1;
g211B.menuOpen = false;





//媒體介面進場jQ動作 - 《 ※●○這覆蓋 jPlayer.js裡的method.entering = function(index){} 》
method.entering = function(index){
	//●○1041028 - 進場
	$('.mediaWrapper:eq('+index+') .mediaHeader').fadeOut(0);
	$('.mediaWrapper:eq('+index+') .mediaDiv, .mediaWrapper:eq('+index+') .mediaDiv > object').fadeOut(0);
	//$('.mediaWrapper:eq('+index+')').slideUp 改成 $('.mediaWrapper:eq('+index+')').fadeOut
	//
	$('.g211B_cardGroup').fadeOut(280);
			
	$('.mediaWrapper:eq('+index+')').fadeOut(280,function(){
		$('.mediaWrapper:eq('+index+') .mediaHeader').fadeIn(280);
		$('.mediaWrapper:eq('+index+') .mediaDiv, .mediaWrapper:eq('+index+') .mediaDiv > object').fadeIn(280);
		$('.mediaWrapper:eq('+index+')').fadeIn(280);
		
		$('.g211B_cardGroup').fadeIn(280);
	});	
};


//根據 視窗寬度 與 斷點 的關係，處理差異化
g211B.rwdFunc = function(){
	
	//normal
	if($(window).width() > param.breakpoint){
		
		if( !$('.pageWrapper').hasClass('g211B_prevBtn') ){
			$('.pageWrapper').append( $('.g211B_prevBtn') );
		}
		
		if( !$('.pageWrapper').hasClass('g211B_nextBtn') ){
			$('.pageWrapper').append( $('.g211B_nextBtn') );
		}
		
		if( !$('.g211B_headerStringOuter').hasClass('g211B_pageNum') ){
			$('.g211B_headerStringOuter').after($('.g211B_pageNum'));
		}
		
		if( $('.g211B_rwdNavDiv').get(0) !== undefined ){
			$('.g211B_rwdNavDiv').empty().remove();
		}
		
		
	//rwd小尺寸
	}else{
		
		if( $('.g211B_rwdNavDiv').get(0) === undefined ){
			
			$('.g211B_header').after(g211B.rwdBtnHtml); 
			//$('.g211B_rwdNavDiv').append( $('.g211B_prevBtn') + $('.g211B_pageNum') + $('.g211B_nextBtn') );
			$('.g211B_rwdNavDiv').append( $('.g211B_prevBtn') );
			$('.g211B_rwdNavDiv').append( $('.g211B_pageNum') );
			$('.g211B_rwdNavDiv').append( $('.g211B_nextBtn') );
			
		}
		
	}
	
		
};



//將$('.pageWrapper')舖滿頁面
g211B.pageWrapperFullWin = function(){ 
	$('.pageWrapper').width($(window).width()).height($(document).height());
	$('.g211B_iframeOuter').height( $('.pageWrapper').height() - $('.g211B_header').height() );
	
	/*if($(window).width() <= param.breakpoint){
		$('.pageWrapper').width($(window).width()).css({'height':'auto'});
		$('.g211B_iframeOuter').height( $('.pageWrapper').height() - $('.g211B_header').height() );
		
	}else if($(window).width() > param.breakpoint){
		$('.pageWrapper').width($(window).width()).height($(document).height());
		$('.g211B_iframeOuter').height( $('.pageWrapper').height() - $('.g211B_header').height() );
	}*/
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
	g211B.pageWrapperFullWin();
		
	//
	g211B.rwdFunc();
	
	//
	g211B.adjustIframeHeight();
	
	// IE6~IE8
	method.lessThenIE9Css();
	
});


//
g211B.loadCardComm = function(){
	
	//更新頁碼
	$('.g211B_pageNumStr').html('第 ' + (g211B.currCard+1) + ' 頁' + '<span class="g211B_pageTotalStr"> / 共' + g211B.totalCard + '頁</span>');
	
	//●1050302 - 因為在IE9以下，小尺寸視窗，換頁時，g211B_pageTotalStr的顏色會跳到大尺寸視窗的顏色。所以，用$(window).trigger('resize')來補救。
	$(window).trigger('resize');
	
	//在$('.g211B_contentFrame')中載入第一頁.card的連結網頁
	
	//iframe使用src屬性換頁，
	//細談 location.href 與 location.replace 的差別與實務應用 - The Will Will Web
	//http://blog.miniasp.com/post/2009/03/25/location-href-and-location-replace-in-practice.aspx
	//透過 JavaScript 的 location.replace 傳入網址
	//瀏覽器不會送出 Referer 這個 HTTP Header
	//瀏覽器不會紀錄連結的歷史紀錄! ( 瀏覽器將無瀏覽歷史紀錄 )
	//$('.g211B_contentFrame').attr('src', g211B.cardPath[g211B.currCard]);
	
	//OK - 1050301
	//document.g211B_contentFrame.location.replace(g211B.cardPath[g211B.currCard]);
	
	
	//==========================================================================
	//不是行動裝置 且 瀏覽器為●pc firefox - 這換頁會有瀏覽歷史紀錄
	if( !utils.isMobile && utils.currentBrowser === "firefox"){
		$('.g211B_contentFrame').attr('src', g211B.cardPath[g211B.currCard]);
	
	//其他： 使用location.replace可以 換頁無瀏覽歷史紀錄 - 適合《旭聯智慧大師平台》Android app的運作。
	//--> 按下裝置回上一頁，不論目前本版型在哪一頁，都可回到選單頁。
	//但 ●pc firefox出現錯誤： TypeError: document.g211B_contentFrame is undefined
	}else{
		document.g211B_contentFrame.location.replace(g211B.cardPath[g211B.currCard]);
	}
	//==========================================================================
	
	
	
	//可以_self換頁，但無法在iframe換頁。
	//$(location).attr('href', g211B.cardPath[g211B.currCard]);
	
	//alert($('.g211B_contentFrame').contents().location.href);
	
	//
	$('.g211B_contentFrame').load(function(){
		g211B.adjustIframeHeight();
	});
	
	
	//●◎○●◎○強制操控.pageWrapper高度為視窗高度
	//=====================================================
	//$('.pageWrapper').css({'height':$(window).height()});
	//=====================================================
	
	
	
};


//g211B_nextBtn
g211B.loadCardNext = function(e){
	
	//
	if($(e.currentTarget).hasClass('g211B_nextBtn')){
		if(g211B.currCard < g211B.cardPath.length-1){
			//
			g211B.currCard ++; 
			g211B.loadCardComm();
			//
			$('.g211B_prevBtn').css({'opacity':g211B.prevNextBtnOpacity,'cursor':'pointer'});
			if(g211B.currCard >= g211B.cardPath.length-1){
				$('.g211B_nextBtn').css({'opacity':g211B.prevNextBtnEdgeOpacity,'cursor':'default'});
				$('.g211B_nextBtn').removeClass('g211B_nextBtnDown');
			}
		}
	}
};


//g211B_prevBtn
g211B.loadCardPrev = function(e){
			
	if($(e.currentTarget).hasClass('g211B_prevBtn')){
		if(g211B.currCard > 0){
			//
			g211B.currCard --; 
			g211B.loadCardComm();
			//
			$('.g211B_nextBtn').css({'opacity':g211B.prevNextBtnOpacity,'cursor':'pointer'});
			if(g211B.currCard <= 0){
				$('.g211B_prevBtn').css({'opacity':g211B.prevNextBtnEdgeOpacity,'cursor':'default'});
				$('.g211B_prevBtn').removeClass('g211B_prevBtnDown');
			}
		}
	}
};


//g211B事件處理
g211B.eventHandler = function(){

	//
	$('.g211B_prevBtn')
		.on('mouseover',function(){ //alert(g211B.currCard);
			if( (g211B.currCard <= g211B.cardPath.length-1) && (g211B.currCard > 0) ){
				$('.g211B_prevBtn > img').attr('src',param.mainPath + 'g211B_SlideMultiMedia/images/bigPrevBtn_over.png');
				$('.g211B_prevBtn').addClass('g211B_prevBtnOver');
				//$('.g211B_prevBtn').css({'cursor':'pointer'});
			}else{
				//$('.g211B_prevBtn').css({'cursor':'default'});
			}
		})
		.on('mouseout',function(){
			if( (g211B.currCard <= g211B.cardPath.length-1) && (g211B.currCard > 0) ){
				$('.g211B_prevBtn > img').attr('src', param.mainPath + 'g211B_SlideMultiMedia/images/bigPrevBtn.png');
				$('.g211B_prevBtn').removeClass('g211B_prevBtnOver');
				$('.g211B_prevBtn').removeClass('g211B_prevBtnDown');
			}
		})
		.on('mousedown',function(e){
			if( (g211B.currCard <= g211B.cardPath.length-1) && (g211B.currCard > 0) ){
				$('.g211B_prevBtn > img').attr('src', param.mainPath + 'g211B_SlideMultiMedia/images/bigPrevBtn_down.png');
				$('.g211B_prevBtn').removeClass('g211B_prevBtnOver');
				$('.g211B_prevBtn').addClass('g211B_prevBtnDown');
				
				//
				g211B.loadCardPrev(e);
				
				//延遲200毫秒換回.g211B_prevBtn預設底圖
				setTimeout(function(){
					$('.g211B_prevBtn > img').attr('src', param.mainPath + 'g211B_SlideMultiMedia/images/bigPrevBtn.png');
					$('.g211B_prevBtn').removeClass('g211B_prevBtnOver');
					$('.g211B_prevBtn').removeClass('g211B_prevBtnDown');
				},200);
				
			}
		});
		
	
	//
	$('.g211B_nextBtn')
		.on('mouseover',function(){
			if( (g211B.currCard < g211B.cardPath.length-1) && (g211B.currCard >= 0) ){
				$('.g211B_nextBtn > img').attr('src',param.mainPath + 'g211B_SlideMultiMedia/images/bigNextBtn_over.png');
				$('.g211B_nextBtn').addClass('g211B_nextBtnOver');
			}
		})
		.on('mouseout',function(){
			if( (g211B.currCard < g211B.cardPath.length-1) && (g211B.currCard >= 0) ){
				$('.g211B_nextBtn > img').attr('src', param.mainPath + 'g211B_SlideMultiMedia/images/bigNextBtn.png');
				$('.g211B_nextBtn').removeClass('g211B_nextBtnOver');
				$('.g211B_nextBtn').removeClass('g211B_nextBtnDown');
			}
		})
		.on('mousedown',function(e){
			if( (g211B.currCard < g211B.cardPath.length-1) && (g211B.currCard >= 0) ){
				
				$('.g211B_nextBtn > img').attr('src', param.mainPath + 'g211B_SlideMultiMedia/images/bigNextBtn_down.png');
				$('.g211B_nextBtn').removeClass('g211B_nextBtnOver');
				$('.g211B_nextBtn').addClass('g211B_nextBtnDown');
				
				//
				g211B.loadCardNext(e);
				
				//延遲200毫秒換回.g211B_nextBtn預設底圖
				setTimeout(function(){
					$('.g211B_nextBtn > img').attr('src', param.mainPath + 'g211B_SlideMultiMedia/images/bigNextBtn.png');
					$('.g211B_nextBtn').removeClass('g211B_nextBtnOver');
					$('.g211B_nextBtn').removeClass('g211B_nextBtnDown');
				},200);
				
			}
			
		});
		
		
		//開啟menu按鈕 事件處理
		//====================================
		g211B.menuBtnMouseEvent();
		//====================================
		
			
};

//開啟menu按鈕 事件處理
g211B.menuBtnMouseEvent = function(){
	
	//====================================
	$('.g211B_menuBtn')
	//====================================
		//
		.on('mouseover',function(){
			$('.g211B_menuBtn > img').attr('src', param.mainPath + 'g211B_SlideMultiMedia/images/menuBtn_over.png');
		})
		//
		.on('mouseout',function(){
			$('.g211B_menuBtn > img').attr('src', param.mainPath + 'g211B_SlideMultiMedia/images/menuBtn.png');
		})
		
		//
		.on('mousedown',function(){
			//
			$('body').append('<div class="g211B_menuZone"></div>');
			
			//
			//$('.g211B_menuZone').css({'display':'block','opacity':0.0}).animate({'opacity':g211B.menuZoneOpacity},480);
			$('.g211B_menuZone').css({'opacity':g211B.menuZoneOpacity}).slideDown(250,function(){
				g211B.menuOpen = true;	
			});
			
			//
			$(this).off('mouseover');
			$(this).off('mouseout');
			$(this).off('mousedown');
			
			//
			$('.g211B_menuBtn').empty().remove();
			$('.g211B_menuBtnOuter').html('<div class="g211B_menuCloseBtn"></div>');
			$('.g211B_menuCloseBtn').append('<img src=' + param.mainPath + 'g211B_SlideMultiMedia/images/menuCloseBtn.png' + '>');
			
			
			//
			g211B.createCardTitleMenu();
			
			//關閉menu按鈕 事件處理
			g211B.menuCloseBtnMouseEvent();
			
			
		});
};


//關閉menu按鈕 事件處理
g211B.menuCloseBtnMouseEvent = function(){
	//
	$('.g211B_menuCloseBtn')
		.on('mouseover',function(){
			$('.g211B_menuCloseBtn > img').attr('src', param.mainPath + 'g211B_SlideMultiMedia/images/menuCloseBtn_over.png');
		})
		.on('mouseout',function(){
			$('.g211B_menuCloseBtn > img').attr('src', param.mainPath + 'g211B_SlideMultiMedia/images/menuCloseBtn.png');
		})
		.on('mousedown',function(){
			//
			/*$('.g211B_menuZone').animate({'opacity':0.0},480,function(){
				$('.g211B_menuZone').remove();	
			});*/
			$('.g211B_menuZone').css({'opacity':1.0}).slideUp(250,function(){
				$('.g211B_menuZone').remove();	
			});
			
			//
			g211B.menuOpen = false;
			
			//
			$(this).off('mouseover');
			$(this).off('mouseout');
			$(this).off('mousedown');
			
			//
			$('.g211B_menuCloseBtn').empty().remove();
			$('.g211B_menuBtnOuter').html('<div class="g211B_menuBtn"></div>');
			$('.g211B_menuBtn').append('<img src=' + param.mainPath + 'g211B_SlideMultiMedia/images/menuBtn.png' + '>');
			
			
			//開啟menu按鈕 事件處理
			g211B.menuBtnMouseEvent();
			
		});
};



//將g211B.cardTitle陣列中的元素 - $('.g211B_cardTitle:eq(' + index +  ')').html()
//附加到$('.g211B_menuZone')
g211B.createCardTitleMenu = function(){
	
	//1050510 - 新增help - '<span class="help"></span></div>'
	$('.g211B_menuZone').append('<div class="g211B_menuHeader">' + g211B.menuHeader + '<span class="help"></span></div>');
	
	
	//新手上路 - 1050510
	//======================================================================
	if(param.hasHelpFlag){
		
		//1050510 - tPlayer_CSSPath本來在tPlayer.js裡面有給值了，但在這版型抓不到，所以在$(document).ready()重新給一次。
		if(param.helpIconPath === undefined || param.helpIconPath === "" || typeof param.helpIconPath !== "string"){ 
			param.helpIconPath = param.tPlayer_CSSPath + "images/help.png"; 
			param.helpIconOverPath = param.tPlayer_CSSPath + "images/help_over.png";
			//alert(param.tPlayer_CSSPath);
		}
		
		$('.g211B_menuHeader .help')
				.append('<a><img src=' + param.helpIconPath + '></a>')
				.attr('title', param.helpComment);  
				
		//
		$('.g211B_menuHeader .help')
		
			.on('mouseover',function(){ 
					$('.g211B_menuHeader .help img').attr('src', param.helpIconOverPath); 
				})
			.on('mouseout',function(){
					$('.g211B_menuHeader .help img').attr('src', param.helpIconPath);
				})
			.on('mousedown',function(){
					//
					$('.g211B_menuCloseBtn').trigger('mousedown');
					//
					$('.g211B_menuHeader .help a').attr({'href':param.helpUrl,target:'_blank'});
					
				});
				
	}
	//======================================================================
	
	

	
	//
	$.each(g211B.cardTitle,function(index) {
		
		//
        $('.g211B_menuZone').append(  
				'<div class="g211B_menuRow">' + 
					'<span class="g211B_menuRowOrder">' + (index+1) + '</span>' + 
					'<span class="g211B_menuRowItemOuter">' + 
						'<span class="g211B_menuRowItem">' + g211B.cardTitle[index] + '</span>' + 
					'</span>' + 
				'</div>' );
		
		//
		//g211B_menuRowOrder_current
		$('.g211B_menuRow:eq(' + g211B.currCard + ')').addClass('g211B_menuRow_current');
		$('.g211B_menuRow:eq(' + g211B.currCard + ') .g211B_menuRowOrder').addClass('g211B_menuRowOrder_current');
		$('.g211B_menuRow:eq(' + g211B.currCard + ') .g211B_menuRowItem').addClass('g211B_menuRowItem_current');
		
		
		
		//●○※ g211B_menuRow的滑鼠事件處理
		$('.g211B_menuRow:eq(' + index + ')')
		
				.on('mouseover',function(){
					if(index !== g211B.currCard){
						$('.g211B_menuRow:eq(' + index + ')').addClass('g211B_menuRow_hover');
						$('.g211B_menuRowOrder:eq(' + index + ')').addClass('g211B_menuRowOrder_hover');
						
					}else{
						$('.g211B_menuRow:eq(' + index + ')').css({'cursor':'default'});
					}
				})
				.on('mouseout',function(){
					$('.g211B_menuRow:eq(' + index + ')').removeClass('g211B_menuRow_hover');
					$('.g211B_menuRowOrder:eq(' + index + ')').removeClass('g211B_menuRowOrder_hover');
				})
				
				//
				.on('mousedown',function(){
					
					//●
					if(index !== g211B.currCard){
						
						//
						$('.g211B_menuZone').css({'opacity':1.0}).slideUp(250,function(){
							
							$('.g211B_menuZone').remove();
							//
							$('.g211B_menuCloseBtn').trigger('mousedown');
							
							//指定序號換頁
							//====================================
							g211B.currCard = index;
							//
							g211B.nextNPrevBtnState();
							//
							g211B.loadCardComm(); 
							//====================================
							
						});
					
					}
					
				});
				
		
    });
	
	
	
	//●○※ 當menu (.g211B_menuZone) 開啟時，點擊G211B頁面，與點iframe所連結頁面，自動關閉選單
	//●○※●○※●○※●○※●○※●○※●○※●○※●○※●○※●○※●○※●○※●○※
	//*********************************************************************
	//點擊在body標籤上
	/*$('body').on('mousedown',function(e){ 
	
		//alert(e.target.className + '/' + e.target.tagName);
		if(g211B.menuOpen === true){
			if( e.target.tagName.toLowerCase() === "body"){ 
				$('.g211B_menuCloseBtn').trigger('mousedown');
			}
		}
	});*/
	
	
	//點擊在.pageWrapper上
	$('.pageWrapper').on('mousedown',function(e){ 
	
		//alert(e.target.className + '/' + e.target.tagName);
	
		if(g211B.menuOpen === true){
			$('.g211B_menuCloseBtn').trigger('mousedown');
			g211B.menuOpen = false;
		}
	});
	
	
	//●○※ 處理iframe所連結的網頁內容被點擊的滑鼠事件處理
	//============================================================			
	try{ 
		//●Chrome本機端無法存取iframe裡面的網頁物件(會有ERROR)，線上則可以。
		//Uncaught SecurityError: Failed to read the 'contentDocument' property from 'HTMLIFrameElement':
		// Blocked a frame with origin "null" from accessing a frame with origin "null". Protocols, domains, and ports must match.
					
		//var iFrame1=document.getElementsByClassName("g211B_contentFrame") ;
		
		var $iFrame1 = $(".g211B_contentFrame") ;
		//alert($iFrame1);
		var $contents = $iFrame1.contents();
		//alert($contents);
		
		
		//●●●○○○1050225
		//==============================================================
		$contents.on('mousedown',function(e){
			//
			if(e){
				//alert(e.target.className + '/' + e.target.tagName);
			}
			
			
			if(g211B.menuOpen === true){
				$('.g211B_menuCloseBtn').trigger('mousedown');
				g211B.menuOpen = false;
				
				//1050226 - 新增
				$contents.off('mousedown');
			}
		});
		//==============================================================
		
		
		
		//==============================================================
		/*var $clickTarget_1 = $contents.find('.mediaWrapper'); 
		var $clickTarget_2 = $contents.find('.mediaDivOverlay'); 
		var $clickTarget_3 = $contents.find('.pageWrapper'); 
		var $clickTarget_4 = $contents.find('body'); 
		
		$clickTarget_1.on('mousedown',function(e){
			//alert(e.target.className + '/' + e.target.tagName);
			if(g211B.menuOpen === true){
				$('.g211B_menuCloseBtn').trigger('mousedown');
				g211B.menuOpen = false;
			}
		});
		
		$clickTarget_2.on('mousedown',function(e){
			//alert(e.target.className + '/' + e.target.tagName);
			if(g211B.menuOpen === true){
				$('.g211B_menuCloseBtn').trigger('mousedown');
				g211B.menuOpen = false;
			}
		});
		
		$clickTarget_3.on('mousedown',function(e){
			//alert(e.target.className + '/' + e.target.tagName);
			if(g211B.menuOpen === true){
				$('.g211B_menuCloseBtn').trigger('mousedown');
				g211B.menuOpen = false;
			}
		});
		
		$clickTarget_4.on('mousedown',function(e){
			//alert(e.target.className + '/' + e.target.tagName);
			if(g211B.menuOpen === true){
				$('.g211B_menuCloseBtn').trigger('mousedown');
				g211B.menuOpen = false;
			}
		});*/
		//==============================================================
		
		

	}catch(error){
		//console.log(error);
	}
		
	//============================================================	
		
	//*********************************************************************
	//●○※●○※●○※●○※●○※●○※●○※●○※●○※●○※●○※●
	
};

//依序號換頁時，檢查與調整g211B_nextBtn、g211B_prevBtn按鈕狀態
g211B.nextNPrevBtnState = function(){
	
	if(g211B.currCard > 0){
		$('.g211B_prevBtn').css({'opacity':g211B.prevNextBtnOpacity,'cursor':'pointer'});
	}else{
		$('.g211B_prevBtn').css({'opacity':g211B.prevNextBtnEdgeOpacity,'cursor':'default'});
	}
	
	if(g211B.currCard < g211B.cardPath.length-1){
		$('.g211B_nextBtn').css({'opacity':g211B.prevNextBtnOpacity,'cursor':'pointer'});
	}else{
		$('.g211B_nextBtn').css({'opacity':g211B.prevNextBtnEdgeOpacity,'cursor':'default'});
	}
	
	
};


/*g211B HTML架構排板 - $('.pageWrapper')、*/
g211B.layout = function(){
		//
	$('.g211B_menuBtn').append('<img src=' + param.mainPath + 'g211B_SlideMultiMedia/images/menuBtn.png' + '>');
	//
	$('.pageWrapper').prepend('<span class="g211B_prevBtn"><img src=' + param.mainPath + 'g211B_SlideMultiMedia/images/bigPrevBtn.png' + '></span>');
	//
	$('.pageWrapper').prepend('<span class="g211B_nextBtn"><img src=' + param.mainPath + 'g211B_SlideMultiMedia/images/bigNextBtn.png' + '></span>');
	
	
	
	//※$('.g211B_prevBtn, .g211B_nextBtn')皆有作用時，透明度設為 g211B.prevNextBtnOpacity
	$('.g211B_prevBtn, .g211B_nextBtn').css({'opacity':g211B.prevNextBtnOpacity});	
	
	//第一頁，$('.g211B_prevBtn')必須標示無作用 - ※透明度設為 g211B.prevNextBtnEdgeOpacity
	$('.g211B_prevBtn').css({'opacity':g211B.prevNextBtnEdgeOpacity,'cursor':'default'});
	
	//若只有一頁時，$('.g211B_nextBtn')也必須標示無作用 - ※透明度設為 g211B.prevNextBtnEdgeOpacity
	if(g211B.totalCard <= 1){
		$('.g211B_nextBtn').css({'opacity':g211B.prevNextBtnEdgeOpacity,'cursor':'default'});
	}
	
	//alert($(document.body).children().length);
	//alert(jQuery.cssNumber.zIndex);
	
	//
	//$(document).children().each(function(index, element) {
        //alert($(this).css('z-index'));
   // });
	
};


//
g211B.adjustIframeHeight = function(){
	
	//Chrome瀏覽本機版型，安全性考量，無法存取iframe框架內的html物件。線上則可。
	try {
		
		var iframeInnerDocHeight;
		
		//不是行動裝置 且 瀏覽器為IE
		if( !utils.isMobile && utils.currentBrowser === "msie"){
			
			//解決上述在ie會發生的問題
			//===========================================================================================
			var iframeObj = document.getElementsByClassName('g211B_contentFrame')[0]; 
			//alert(iframeObj);
			var contentsObj= iframeObj.contentWindow.document.getElementsByClassName('pageWrapper')[0];
			//alert(contentsObj.className);
			iframeInnerDocHeight = parseInt(contentsObj.style.height); 
			//alert(iframeInnerDocHeight);
			//===========================================================================================
		
		//其他
		}else{
		
			//IE下的“SCRIPT70: 没有权限”的错误
			//http://blog.5ibc.net/p/6360.html
			//这个原因我是在iframe中遇到的，当子页面操作父级页面的元素是，操作多次就会遇到这个问题。
			//●Jacy注：使用jQuery操作本身頁面的iframe內元素就會發生“SCRIPT70: 没有权限”。
			//需改成原生JS來撰寫。
			//=====================================================================
			var $iFrame1 = $(".g211B_contentFrame") ;
			//alert($iFrame1);
			var $contents = $iFrame1.contents().find('.pageWrapper');
			//alert($contents);
			iframeInnerDocHeight = $contents.height();
			//alert(iframeInnerDocHeight);
			//=====================================================================
			
		}
		
		
		
		
		//大尺寸normal狀態，於Mobile，例如iPad，必須做這些處置，否則 iframe裡面的內容會被 .pageWrapper框線住。
		if(param.breakpoint < $(window).width()){
			//==================================================================================================
			//
			if(utils.isMobile){
				$('.g211B_contentFrame, .g211B_iframeOuter, .g211B_cardGroup, .pageWrapper').height($(window).height());
				
				//.pageWrapper不在此強制處理。而在CSS設定為overflow:visible - ※又改回來
				$('.g211B_contentFrame, .g211B_iframeOuter, .g211B_cardGroup, .pageWrapper').css({'overflow':'visible'});
				//$('.pageWrapper').css({'overflow':'visible'});
			
			//Android
			//}else if(utils.isMobile && utils.isAndroid){
				//$('.g211B_contentFrame, .g211B_iframeOuter, .g211B_cardGroup').height(iframeInnerDocHeight);
				//$('.g211B_contentFrame, .g211B_iframeOuter, .g211B_cardGroup').css({'overflow':'visible'});
				//$('.pageWrapper').css({'overflow':'auto'});
				
			//}else{
				//
				
			}
			//==================================================================================================
			
		//小尺寸視窗
		}else {
			//
			if(utils.isMobile){
				//A.
				//$('.g211B_contentFrame, .g211B_iframeOuter, .g211B_cardGroup').height($(window).height());
				//$('.pageWrapper').css({'overflow':'visible'});
				
				//B.手機橫式時，可能受框架影響，不易滑動至較佳位置。
				//$('.g211B_contentFrame, .g211B_iframeOuter, .g211B_cardGroup, .pageWrapper').height($(window).height());
				//$('.g211B_contentFrame, .g211B_iframeOuter, .g211B_cardGroup, .pageWrapper').css({'overflow':'visible'});
				
				//C.手機橫式時，較易瀏覽。
				$('.g211B_contentFrame').height(iframeInnerDocHeight);
				$('.g211B_iframeOuter, .g211B_cardGroup, .pageWrapper').height($(window).height());
				$('.g211B_contentFrame, .g211B_iframeOuter, .g211B_cardGroup, .pageWrapper').css({'overflow':'visible'});
			}
		}
		
	}catch(err) {
		//
	}
	
	
	
};


//C.附加第1頁Html資料，使出現在頁面上
g211B.loadFirstCard = function(){

	//
	g211B.totalCard = g211B.cardPath.length; //alert(g211B.totalCard);
	//
	g211B.currCard = 0;
	
	//填入頁碼
	$('.g211B_pageNumStr').html('第 ' + (g211B.currCard+1) + ' 頁' + '<span class="g211B_pageTotalStr"> / 共' + g211B.totalCard + '頁</span>');
	
	
	//在$('.g211B_contentFrame')中載入第一頁.card的連結網頁
	$('.g211B_contentFrame').attr('src', g211B.cardPath[g211B.currCard]);
	
	//
	$('.g211B_contentFrame').load(function(){
		g211B.adjustIframeHeight();
	});
	
	
	
	//alert($('.g209_textPhoto').get(0) !== undefined);
	//
	if($('.g209_textPhoto').get(0) !== undefined){
		
		//================================================
		//名詞解釋
		method.glossary();
		
		//點小圖跳大圖 - 這得在method.lessThenIE9Css()上方。
		method.createMagnifierIcon();
		//================================================
		
	}
	
};


//A.將所有.g211B_card資料存入g211B.cardPath陣列
//B.若已完成將所有.g211B_card資料存入g211B.cardPath陣列，則刪除網頁上所有.g211B_card
g211B.createDataArr = function(){
	//
	$('.g211B_card').each(function(index) {
		
		//●將所有.g211B_card資料存入g211B.cardPath陣列
		g211B.cardTitle[index] = $('.g211B_card:eq(' + index + ') .title').text();
		g211B.cardPath[index] = $('.g211B_card:eq(' + index + ') .path').text();
		
		
		//若已完成將所有.g211B_card資料存入g211B.cardPath陣列
		if(index === $('.g211B_card').length-1){
			//alert(g211B.cardPath[0]);
		}
		
    });
};



//
//$(document).ready(function(){
$(document).ready(function(){

	//●整體縮放頁面 - 強迫設定為1.0，以避免播放控制失常
	//============================
	$('body').css('zoom','1.0');
	//============================	

	//.g211B_iframeOuter原本隱藏，此處加以顯示。
	$('.g211B_iframeOuter').css({'display':'block'});
	
	
	//小尺寸視窗時，會將.g211B_nextBtn、.g211B_prevBtn、.g211B_pageNum置入.g211B_rwdNavDiv
	//.g211B_rwdNavDiv則放在.g211B_header之後
	g211B.rwdBtnHtml = '<div class="g211B_rwdNavDiv"></div>';
	
	
	//1050510 - tPlayer_CSSPath本來在tPlayer.js裡面有給值了，但在這版型抓不到，所以重新給一次。
	/*--------------------------------------------*/
	param.commong2Index = param.mainPath.lastIndexOf('/'); //alert(param.commong2Index);
	param.tPlayerPath = param.mainPath.substring(0,param.commong2Index+1) + "tPlayer/"; //alert(param.tPlayerPath);
	param.tPlayer_CSSPath = param.mainPath.substring(0,param.commong2Index+1) + "tPlayer_CSS/"; //alert(param.tPlayer_CSSPath);
	/*--------------------------------------------*/
	
	
	//●g211B
	//===================================
	g211B.createDataArr();
	g211B.loadFirstCard();
	//===================================
	
	
	//啟動媒體播放相關處理
	//===================================
	//
	method.addDocumentTitle();

	//
	utils.userAgentProp();
	utils.detectBrowserVersion();

	//===================================
	
		
	//●g211B
	//===================================
	//●g211B 之 HTML架構排板
	g211B.layout();
	//●g211B
	g211B.eventHandler();
	//===================================
	

	
	// IE6~IE8
	method.lessThenIE9Css();
	
	
	//
	$(window).trigger('resize');
	
	
	
	
});




//>>>=============================================================>>>
})(jQuery); //↑↑↑


























