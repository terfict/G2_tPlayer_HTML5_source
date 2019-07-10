// JavaScript Document - G211A│g211A_SlideMultiMedia.js
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
var g211A =  NOU.namespace('NOU.modules.g211A');
//------------------------


g211A.cardHtml = [];
g211A.cardTitle = [];
g211A.rwdBtnHtml = '';
g211A.totalCard = 0;
g211A.currCard = -1;
g211A.menuOpen = false;





//媒體介面進場jQ動作 - 《 ※●○這覆蓋 jPlayer.js裡的method.entering = function(index){} 》
method.entering = function(index){
	//●○1041028 - 進場
	$('.mediaWrapper:eq('+index+') .mediaHeader').fadeOut(0);
	$('.mediaWrapper:eq('+index+') .mediaDiv, .mediaWrapper:eq('+index+') .mediaDiv > object').fadeOut(0);
	//$('.mediaWrapper:eq('+index+')').slideUp 改成 $('.mediaWrapper:eq('+index+')').fadeOut
	//
	$('.g211A_cardSet').fadeOut(280);
			
	$('.mediaWrapper:eq('+index+')').fadeOut(280,function(){
		$('.mediaWrapper:eq('+index+') .mediaHeader').fadeIn(280);
		$('.mediaWrapper:eq('+index+') .mediaDiv, .mediaWrapper:eq('+index+') .mediaDiv > object').fadeIn(280);
		$('.mediaWrapper:eq('+index+')').fadeIn(280);
		
		$('.g211A_cardSet').fadeIn(280);
	});	
};


//根據 視窗寬度 與 斷點 的關係，處理差異化
g211A.rwdFunc = function(){
	
	//normal
	if($(window).width() > param.breakpoint){
		
		if( !$('.pageWrapper').hasClass('g211A_prevBtn') ){
			$('.pageWrapper').append( $('.g211A_prevBtn') );
		}
		
		if( !$('.pageWrapper').hasClass('g211A_nextBtn') ){
			$('.pageWrapper').append( $('.g211A_nextBtn') );
		}
		
		if( !$('.g211A_headerStringOuter').hasClass('g211A_pageNum') ){
			$('.g211A_headerStringOuter').after($('.g211A_pageNum'));
		}
		
		if( $('.g211A_rwdNavDiv').get(0) !== undefined ){
			$('.g211A_rwdNavDiv').empty().remove();
		}
		
		
	//rwd小尺寸
	}else{
		
		if( $('.g211A_rwdNavDiv').get(0) === undefined ){
			
			$('.g211A_header').after(g211A.rwdBtnHtml); 
			//$('.g211A_rwdNavDiv').append( $('.g211A_prevBtn') + $('.g211A_pageNum') + $('.g211A_nextBtn') );
			$('.g211A_rwdNavDiv').append( $('.g211A_prevBtn') );
			$('.g211A_rwdNavDiv').append( $('.g211A_pageNum') );
			$('.g211A_rwdNavDiv').append( $('.g211A_nextBtn') );
			
		}
		
	}
	
		
};



//將$('.pageWrapper')舖滿頁面
g211A.pageWrapperFullWin = function(){ 
	$('.pageWrapper').width($(window).width()).height($(document).height());
	//$('.g211A_card').height($(window).height() - $('.g211A_header').height());
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
	g211A.pageWrapperFullWin();
		
	//
	g211A.rwdFunc();
	
	// IE6~IE8
	method.lessThenIE9Css();
	
});



//
g211A.mediaSetup = function(){
	
	//啟動媒體播放相關處理
	//===================================

	method.choosePlayMode();
	method.deployment();
	
	//
	$('.mediaWrapper').each(function(index) {
		//
		//param.mediaAutoPlayArr[index] = true;
		method.embedMedia(index);
		
		
		//●●●G211A就是無法使用tPlayer的控制方法，用了有error。
		//tPlayer.play(index);
		//tPlayer.pause(index);
		
		//
		if( utils.isMobile ){
			//●1050616- 必要 - 在這裡控制.slider_2、progressBar_2 回到0的位置
			$('.mediaWrapper:eq(' + index + ') .slider_2').animate({'left':-9},0);
			$('.mediaWrapper:eq(' + index + ') .progressBar_2>img, .mediaWrapper:eq(' + index + ') .progressBar_2').css({'width':0});
		}
		
	});
	
	//===================================
	
	
	
	
};


//
g211A.loadCardComm = function(){
	
	//更新頁碼
	//$('.g211A_pageNumStr').html('Page ' + (g211A.currCard+1) + '');
	$('.g211A_pageNumStr').html('第 ' + (g211A.currCard+1) + ' 頁' + '<span class="g211A_pageTotalStr"> / 共' + g211A.totalCard + '頁</span>'); 
	
	
	
	
	//1050604 - 隱藏放大鏡圖示 (●針對 IE8(含)以下：換頁前先隱藏)
	$('.zoomIconSpan').css({'visibility':'hidden'});
	
	//
	$('.mediaWrapper').each(function(index) {
		//1050604 - 隱藏.track (●針對 IE8(含)以下：換頁前先隱藏)
		$('.mediaWrapper:eq(' + index + ') .track').css({'visibility':'hidden'});
		
	});
	
	
	
	
	
	//1050604
	//********************************************************************
	$('.g211A_cardSet').animate({'opacity':0.0},240,function(){
	//********************************************************************
	
	
	
		//在$('.g211A_cardSet')中填入第一頁.card的內容上
		$('.g211A_cardSet').html(g211A.cardHtml[g211A.currCard]);
		
		
		//1050616
		if( !utils.isMobile ){
			g211A.mediaSetup(); 
		}
		
		
		
		//●◎○●◎○強制操控.pageWrapper高度為視窗高度
		//=====================================================
		$('.pageWrapper').css({'height':$(window).height()});
		//=====================================================
		
		
		
		
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
		//g211A.mediaSetup()必須放在$('.g211A_cardSet')透明度1.0之後，換頁之後.slider_2和.progressBar_2才能正確
		//否則，.slider_2會停留在離開前一頁時的位置，.progressBar_2的長度會是離開前一頁
	//********************************************************************	
		//1050604
		$('.g211A_cardSet').animate({'opacity':1.0},480, function(){
			////1050616
			//==============================
			if( utils.isMobile ){ 
				g211A.mediaSetup(); 
			}
			//==============================
		});
	
	});
	//********************************************************************
	
	

};


//g211A_nextBtn
g211A.loadCardNext = function(e){
	
	//
	if($(e.currentTarget).hasClass('g211A_nextBtn')){ 
		if(g211A.currCard < g211A.cardHtml.length-1){
			//
			//$('.g211A_card:eq(' + (g211A.currCard) + ')').empty().remove();
			
			//
			g211A.currCard ++; 
			g211A.loadCardComm();
			//
			$('.g211A_prevBtn').css({'opacity':g211A.prevNextBtnOpacity,'cursor':'pointer'});
			//
			if(g211A.currCard >= g211A.cardHtml.length-1){
				$('.g211A_nextBtn').css({'opacity':g211A.prevNextBtnEdgeOpacity,'cursor':'default'});
				$('.g211A_nextBtn').removeClass('g211A_nextBtnDown');
			}
		}
	}
};


//g211A_prevBtn
g211A.loadCardPrev = function(e){
			
	if($(e.currentTarget).hasClass('g211A_prevBtn')){
		if(g211A.currCard > 0){
			//
			//$('.g211A_card:eq(' + (g211A.currCard) + ')').empty().remove();
			
			//
			g211A.currCard --; 
			g211A.loadCardComm();
			//
			$('.g211A_nextBtn').css({'opacity':g211A.prevNextBtnOpacity,'cursor':'pointer'});
			//
			if(g211A.currCard <= 0){
				$('.g211A_prevBtn').css({'opacity':g211A.prevNextBtnEdgeOpacity,'cursor':'default'});
				$('.g211A_prevBtn').removeClass('g211A_prevBtnDown');
			}
		}
	}
};


//G211A事件處理
g211A.eventHandler = function(){

	//
	$('.g211A_prevBtn')
		.on('mouseover',function(){ //alert(g211A.currCard);
			if( (g211A.currCard <= g211A.cardHtml.length-1) && (g211A.currCard > 0) ){
				$('.g211A_prevBtn > img').attr('src',param.mainPath + 'g211A_SlideMultiMedia/images/bigPrevBtn_over.png');
				$('.g211A_prevBtn').addClass('g211A_prevBtnOver');
			}
		})
		.on('mouseout',function(){
			if( (g211A.currCard <= g211A.cardHtml.length-1) && (g211A.currCard > 0) ){
				$('.g211A_prevBtn > img').attr('src', param.mainPath + 'g211A_SlideMultiMedia/images/bigPrevBtn.png');
				$('.g211A_prevBtn').removeClass('g211A_prevBtnOver');
				$('.g211A_prevBtn').removeClass('g211A_prevBtnDown');
			}
		})
		.on('mousedown',function(e){
			if( (g211A.currCard <= g211A.cardHtml.length-1) && (g211A.currCard > 0) ){
				$('.g211A_prevBtn > img').attr('src', param.mainPath + 'g211A_SlideMultiMedia/images/bigPrevBtn_down.png');
				$('.g211A_prevBtn').removeClass('g211A_prevBtnOver');
				$('.g211A_prevBtn').addClass('g211A_prevBtnDown');
				
				//
				g211A.loadCardPrev(e);
				
				//延遲200毫秒換回.g211A_prevBtn預設底圖
				setTimeout(function(){
					$('.g211A_prevBtn > img').attr('src', param.mainPath + 'g211B_SlideMultiMedia/images/bigPrevBtn.png');
					$('.g211A_prevBtn').removeClass('g211A_prevBtnOver');
					$('.g211A_prevBtn').removeClass('g211A_prevBtnDown');
				},200);
				
			}
		});
		
	
	//
	$('.g211A_nextBtn')
		.on('mouseover',function(){
			if( (g211A.currCard < g211A.cardHtml.length-1) && (g211A.currCard >= 0) ){
				$('.g211A_nextBtn > img').attr('src',param.mainPath + 'g211A_SlideMultiMedia/images/bigNextBtn_over.png');
				$('.g211A_nextBtn').addClass('g211A_nextBtnOver');
			}
		})
		.on('mouseout',function(){
			if( (g211A.currCard < g211A.cardHtml.length-1) && (g211A.currCard >= 0) ){
				$('.g211A_nextBtn > img').attr('src', param.mainPath + 'g211A_SlideMultiMedia/images/bigNextBtn.png');
				$('.g211A_nextBtn').removeClass('g211A_nextBtnOver');
				$('.g211A_nextBtn').removeClass('g211A_nextBtnDown');
			}
		})
		.on('mousedown',function(e){
			if( (g211A.currCard < g211A.cardHtml.length-1) && (g211A.currCard >= 0) ){
				
				$('.g211A_nextBtn > img').attr('src', param.mainPath + 'g211A_SlideMultiMedia/images/bigNextBtn_down.png');
				$('.g211A_nextBtn').removeClass('g211A_nextBtnOver');
				$('.g211A_nextBtn').addClass('g211A_nextBtnDown');
				
				//
				g211A.loadCardNext(e);
				
				//延遲200毫秒換回.g211A_nextBtn預設底圖
				setTimeout(function(){
					$('.g211A_nextBtn > img').attr('src', param.mainPath + 'g211B_SlideMultiMedia/images/bigNextBtn.png');
					$('.g211A_nextBtn').removeClass('g211A_nextBtnOver');
					$('.g211A_nextBtn').removeClass('g211A_nextBtnDown');
				},200);
				
			}
			
		});
		
		
		//開啟menu按鈕 事件處理
		//====================================
		g211A.menuBtnMouseEvent();
		//====================================
		
			
};

//開啟menu按鈕 事件處理
g211A.menuBtnMouseEvent = function(){
	//
	$('.g211A_menuBtn')
	
		.on('mouseover',function(){
			$('.g211A_menuBtn > img').attr('src', param.mainPath + 'g211A_SlideMultiMedia/images/menuBtn_over.png');
		})
		.on('mouseout',function(){
			$('.g211A_menuBtn > img').attr('src', param.mainPath + 'g211A_SlideMultiMedia/images/menuBtn.png');
		})
		
		.on('mousedown',function(){
			//
			$('body').append('<div class="g211A_menuZone"></div>');
			
			//
			//$('.g211A_menuZone').css({'display':'block','opacity':0.0}).animate({'opacity':g211A.menuZoneOpacity},480);
			$('.g211A_menuZone').css({'opacity':g211A.menuZoneOpacity}).slideDown(250,function(){
				g211A.menuOpen = true;	
			});
			
			//
			$(this).off('mouseover');
			$(this).off('mouseout');
			$(this).off('mousedown');
			
			//
			$('.g211A_menuBtn').empty().remove();
			$('.g211A_menuBtnOuter').html('<div class="g211A_menuCloseBtn"></div>');
			$('.g211A_menuCloseBtn').append('<img src=' + param.mainPath + 'g211A_SlideMultiMedia/images/menuCloseBtn.png' + '>');
			
			
			
			//
			g211A.createCardTitleMenu();
			
			//關閉menu按鈕 事件處理
			g211A.menuCloseBtnMouseEvent();
			
		});
};

//關閉menu按鈕 事件處理
g211A.menuCloseBtnMouseEvent = function(){
	//
	$('.g211A_menuCloseBtn')
		.on('mouseover',function(){
			$('.g211A_menuCloseBtn > img').attr('src', param.mainPath + 'g211A_SlideMultiMedia/images/menuCloseBtn_over.png');
		})
		.on('mouseout',function(){
			$('.g211A_menuCloseBtn > img').attr('src', param.mainPath + 'g211A_SlideMultiMedia/images/menuCloseBtn.png');
		})
		.on('mousedown',function(){
			//
			/*$('.g211A_menuZone').animate({'opacity':0.0},480,function(){
				$('.g211A_menuZone').remove();	
			});*/
			$('.g211A_menuZone').css({'opacity':1.0}).slideUp(250,function(){
				$('.g211A_menuZone').remove();	
			});
			
			//
			g211A.menuOpen = false;
			
			//
			$(this).off('mouseover');
			$(this).off('mouseout');
			$(this).off('mousedown');
			
			//
			$('.g211A_menuCloseBtn').empty().remove();
			$('.g211A_menuBtnOuter').html('<div class="g211A_menuBtn"></div>');
			$('.g211A_menuBtn').append('<img src=' + param.mainPath + 'g211A_SlideMultiMedia/images/menuBtn.png' + '>');
			
			
			//開啟menu按鈕 事件處理
			g211A.menuBtnMouseEvent();
			
		});
};


//將網頁上的.g211A_cardTitle存入陣列g211A.cardTitle
g211A.cardTitleToArr = function(){
	//
	$('.g211A_cardTitle').each(function(index) {
        g211A.cardTitle[index] = $('.g211A_cardTitle:eq(' + index +  ')').html();
		//alert(g211A.cardTitle[index]);
    });
};

//將g211A.cardTitle陣列中的元素 - $('.g211A_cardTitle:eq(' + index +  ')').html()
//附加到$('.g211A_menuZone')
g211A.createCardTitleMenu = function(){
	
	//1050510 - 增加help按鈕 '<span class="help"></span>'
	$('.g211A_menuZone').append('<div class="g211A_menuHeader">' + g211A.menuHeader + '<span class="help"></span></div>');
	
	
	//新手上路 - 1050510
	//======================================================================
	if(param.hasHelpFlag){
		
		if(param.helpIconPath === undefined || param.helpIconPath === "" || typeof param.helpIconPath !== "string"){ 
			param.helpIconPath = param.tPlayer_CSSPath + "images/help.png";
			param.helpIconOverPath = param.tPlayer_CSSPath + "images/help_over.png";
		}
		
		$('.g211A_menuHeader .help')
				.append('<a><img src=' + param.helpIconPath + '></a>')
				.attr('title', param.helpComment); 
				
		//
		$('.g211A_menuHeader .help')
		
			.on('mouseover',function(){ 
					$('.g211A_menuHeader .help img').attr('src', param.helpIconOverPath); 
				})
			.on('mouseout',function(){
					$('.g211A_menuHeader .help img').attr('src', param.helpIconPath);
				})
			.on('mousedown',function(){
					//
					$('.g211A_menuCloseBtn').trigger('mousedown');
					//
					$('.g211A_menuHeader .help a').attr({'href':param.helpUrl,target:'_blank'});
					
				});
				
	}
	//======================================================================
	
	
	//
	$.each(g211A.cardTitle,function(index) {
		
		//
        $('.g211A_menuZone').append(  
				'<div class="g211A_menuRow">' + 
					'<span class="g211A_menuRowOrder">' + (index+1) + '</span>' + 
					'<span class="g211A_menuRowItemOuter">' + 
						'<span class="g211A_menuRowItem">' + g211A.cardTitle[index] + '</span>' + 
					'</span>' + 
				'</div>' );
		
		//
		//g211A_menuRowOrder_current
		$('.g211A_menuRow:eq(' + g211A.currCard + ')').addClass('g211A_menuRow_current');
		$('.g211A_menuRow:eq(' + g211A.currCard + ') .g211A_menuRowOrder').addClass('g211A_menuRowOrder_current');
		$('.g211A_menuRow:eq(' + g211A.currCard + ') .g211A_menuRowItem').addClass('g211A_menuRowItem_current');
		
		
		
		//●○※
		$('.g211A_menuRow:eq(' + index + ')')
		
				.on('mouseover',function(){
					if(index !== g211A.currCard){
						$('.g211A_menuRow:eq(' + index + ')').addClass('g211A_menuRow_hover');
						$('.g211A_menuRowOrder:eq(' + index + ')').addClass('g211A_menuRowOrder_hover');
						
					}else{
						$('.g211A_menuRow:eq(' + index + ')').css({'cursor':'default'});
					}
				})
				.on('mouseout',function(){
					$('.g211A_menuRow:eq(' + index + ')').removeClass('g211A_menuRow_hover');
					$('.g211A_menuRowOrder:eq(' + index + ')').removeClass('g211A_menuRowOrder_hover');
				})
				
				//
				.on('mousedown',function(){
					
					//●
					if(index !== g211A.currCard){
						
						//
						$('.g211A_menuZone').css({'opacity':1.0}).slideUp(250,function(){
							
							$('.g211A_menuZone').remove();
							//
							$('.g211A_menuCloseBtn').trigger('mousedown');
							
							//指定序號換頁
							//====================================
							g211A.currCard = index;
							//
							g211A.nextNPrevBtnState();
							//
							g211A.loadCardComm(); 
							//====================================
							
						});
					
					}
					
				});
				
		
    });
	
	
	//點擊在body標籤上
		/*$('body').on('mousedown',function(e){ 
		
			//alert(e.target.className + '/' + e.target.tagName);
			if(g211A.menuOpen === true){
				if( e.target.tagName.toLowerCase() === "body"){ 
					$('.g211A_menuCloseBtn').trigger('mousedown');
					g211A.menuOpen = false;
				}
			}
		});*/
		
		//點擊在.pageWrapper上
		$('.pageWrapper').on('mousedown',function(){ 
			if(g211A.menuOpen === true){
				$('.g211A_menuCloseBtn').trigger('mousedown');
				g211A.menuOpen = false;
			}
		});
		
	
	
};

//依序號換頁時，檢查與調整g211A_nextBtn、prevBtn按鈕狀態
g211A.nextNPrevBtnState = function(){
	
	if(g211A.currCard > 0){
		$('.g211A_prevBtn').css({'opacity':g211A.prevNextBtnOpacity,'cursor':'pointer'});
	}else{
		$('.g211A_prevBtn').css({'opacity':g211A.prevNextBtnEdgeOpacity,'cursor':'default'});
	}
	
	if(g211A.currCard < g211A.cardHtml.length-1){
		$('.g211A_nextBtn').css({'opacity':g211A.prevNextBtnOpacity,'cursor':'pointer'});
	}else{
		$('.g211A_nextBtn').css({'opacity':g211A.prevNextBtnEdgeOpacity,'cursor':'default'});
	}
	
	
};


/*G211A HTML架構排板 - $('.pageWrapper')、*/
g211A.layout = function(){
	
	//
	$('.g211A_menuBtn').append('<img src=' + param.mainPath + 'g211A_SlideMultiMedia/images/menuBtn.png' + '>');
	//
	$('.pageWrapper').prepend('<span class="g211A_prevBtn"><img src=' + param.mainPath + 'g211A_SlideMultiMedia/images/bigPrevBtn.png' + '></span>');
	//
	$('.pageWrapper').prepend('<span class="g211A_nextBtn"><img src=' + param.mainPath + 'g211A_SlideMultiMedia/images/bigNextBtn.png' + '></span>');
	
	
	
	//※$('.g211A_prevBtn, .g211A_nextBtn')皆有作用時，透明度設為 g211A.prevNextBtnOpacity
	$('.g211A_prevBtn, .g211A_nextBtn').css({'opacity':g211A.prevNextBtnOpacity});	
	
	//第一頁，$('.g211A_prevBtn')必須標示無作用 - ※透明度設為 g211A.prevNextBtnEdgeOpacity
	$('.g211A_prevBtn').css({'opacity':g211A.prevNextBtnEdgeOpacity,'cursor':'default'});
	
	//若只有一頁時，$('.g211A_nextBtn')也必須標示無作用 - ※透明度設為 g211A.prevNextBtnEdgeOpacity
	if(g211A.totalCard <= 1){
		$('.nextBtn').css({'opacity':g211A.prevg211A_nextBtnEdgeOpacity,'cursor':'default'});
	}
	
	//alert($(document.body).children().length);
	//alert(jQuery.cssNumber.zIndex);
	
	//
	//$(document).children().each(function(index, element) {
        //alert($(this).css('z-index'));
   // });
	
};


//C.附加第1頁Html資料，使出現在頁面上
g211A.loadFirstCard = function(){

	
	//
	g211A.currCard = 0;
	
	//填入頁碼
	//$('.g211A_pageNumStr').html('Page ' + (g211A.currCard+1) + '');
	$('.g211A_pageNumStr').html('第 ' + (g211A.currCard+1) + ' 頁' + '<span class="g211A_pageTotalStr"> / 共' + g211A.totalCard + '頁</span>'); 
	
	
	//
	$('.g211A_cardSet').html(g211A.cardHtml[g211A.currCard]);
	
	
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
		
	},0);
	

	
};


//A.將所有.g211A_card資料存入g211A.cardHtml陣列
//B.若已完成將所有.g211A_card資料存入g211A.cardHtml陣列，則刪除網頁上所有.g211A_card
g211A.createDataArr = function(){
	
	//
	$('.g211A_card').each(function(index) {
		
		//●將所有.g211A_card資料存入g211A.cardHtml陣列
		g211A.cardHtml[index] = '<div class="g211A_card">' + $('.g211A_card:eq(' + index + ')').html() + '</div>';
		
		//g211A.cardHtml[index] = $('.g211A_card:eq(' + index + ')');
		
		
		//若已完成將所有.g211A_card資料存入g211A.cardHtml陣列
		if(index === $('.g211A_card').length-1){
			
			//
			g211A.totalCard = g211A.cardHtml.length; //alert(g211A.totalCard);
			
			
			//則刪除網頁上所有.g211A_card
			//$('.g211A_card').each(function(i) {
				
				//$('.g211A_card:eq(' + ($('.g211A_card').length-1-i) + ')').empty().remove();
				
				//$('.g211A_card:eq(' + ($('.g211A_card').length-1-i) + ')').slideUp(0);
				//$('.g211A_card:eq(' + ($('.g211A_card').length-1-i) + ')').empty().remove();
				
				//$('.g211A_card:eq(' + ($('.g211A_card').length-1-i) + ')').css({'visibility':'hidden'});
				
				//alert(g211A.cardHtml);
				
			//});
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
	
	
	//將網頁上的.g211A_cardTitle存入陣列g211A.cardTitle
	//============================
	g211A.cardTitleToArr();
	//============================
	
	
	//小尺寸視窗時，會將.g211A_nextBtn、.g211A_prevBtn、.g211A_pageNum置入.g211A_rwdNavDiv
	//.g211A_rwdNavDiv則放在.g211A_header之後
	g211A.rwdBtnHtml = '<div class="g211A_rwdNavDiv"></div>';
	
	
	//●G211A
	//===================================
	g211A.createDataArr();
	//g211A.loadFirstCard();
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
	
	
	//●G211A 之 HTML架構排板
	g211A.layout();
	
	
	//1050302 - ●嘗試移到這裡
	g211A.loadFirstCard();
	
	
	//
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
	});
	//===================================
	
		
	//●G211A
	//===================================
	//●G211A 之 HTML架構排板
	//g211A.layout();
	//●G211A
	g211A.eventHandler();
	//===================================
	
	
	//1050603 - 進入頁面就該檢查上一頁、下一頁按鈕的透明度狀態，
	// 是否再第一頁，或最後一頁。尤其只有一頁
	g211A.nextNPrevBtnState();
	
	
	// IE6~IE8
	method.lessThenIE9Css();
	
	
	//
	//setTimeout(function(){
		$(window).trigger('resize');
	//},200);
	
	
});




//>>>=============================================================>>>
})(jQuery); //↑↑↑


























