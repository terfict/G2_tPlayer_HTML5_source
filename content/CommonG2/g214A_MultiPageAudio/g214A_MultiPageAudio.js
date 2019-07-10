// JavaScript Document - G214A│g214A_MultiPageAudio.js
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
var g214A =  NOU.namespace('NOU.modules.g214A');
//------------------------


g214A.cardHtml = [];
g214A.cardTitle = [];
g214A.rwdBtnHtml = '';
g214A.totalCard = 0;
g214A.currCard = -1;
g214A.menuOpen = false;





//媒體介面進場jQ動作 - 《 ※●○這覆蓋 jPlayer.js裡的method.entering = function(index){} 》
method.entering = function(index){
	//●○1041028 - 進場
	$('.mediaWrapper:eq('+index+') .mediaHeader').fadeOut(0);
	$('.mediaWrapper:eq('+index+') .mediaDiv, .mediaWrapper:eq('+index+') .mediaDiv > object').fadeOut(0);
	//$('.mediaWrapper:eq('+index+')').slideUp 改成 $('.mediaWrapper:eq('+index+')').fadeOut
	//
	$('.g214A_cardSet').fadeOut(280);
			
	$('.mediaWrapper:eq('+index+')').fadeOut(280,function(){
		$('.mediaWrapper:eq('+index+') .mediaHeader').fadeIn(280);
		$('.mediaWrapper:eq('+index+') .mediaDiv, .mediaWrapper:eq('+index+') .mediaDiv > object').fadeIn(280);
		$('.mediaWrapper:eq('+index+')').fadeIn(280);
		
		$('.g214A_cardSet').fadeIn(280);
	});	
};


//根據 視窗寬度 與 斷點 的關係，處理差異化
g214A.rwdFunc = function(){
	
	//normal
	if($(window).width() > param.breakpoint){
		
		if( !$('.pageWrapper').hasClass('g214A_prevBtn') ){
			$('.pageWrapper').append( $('.g214A_prevBtn') );
		}
		
		if( !$('.pageWrapper').hasClass('g214A_nextBtn') ){
			$('.pageWrapper').append( $('.g214A_nextBtn') );
		}
		
		if( !$('.g214A_headerStringOuter').hasClass('g214A_pageNum') ){
			$('.g214A_headerStringOuter').after($('.g214A_pageNum'));
		}
		
		if( $('.g214A_rwdNavDiv').get(0) !== undefined ){
			$('.g214A_rwdNavDiv').empty().remove();
		}
		
		
	//rwd小尺寸
	}else{
		
		if( $('.g214A_rwdNavDiv').get(0) === undefined ){
			
			$('.g214A_header').after(g214A.rwdBtnHtml); 
			//$('.g214A_rwdNavDiv').append( $('.g214A_prevBtn') + $('.g214A_pageNum') + $('.g214A_nextBtn') );
			$('.g214A_rwdNavDiv').append( $('.g214A_prevBtn') );
			$('.g214A_rwdNavDiv').append( $('.g214A_pageNum') );
			$('.g214A_rwdNavDiv').append( $('.g214A_nextBtn') );
			
		}
		
	}
	
		
};



//將$('.pageWrapper')舖滿頁面
g214A.pageWrapperFullWin = function(){ 
	$('.pageWrapper').width($(window).width()).height($(document).height());
	//$('.g214A_card').height($(window).height() - $('.g214A_header').height());
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
	g214A.pageWrapperFullWin();
		
	//
	g214A.rwdFunc();
	
	// IE6~IE8
	method.lessThenIE9Css();
	
});



//
g214A.mediaSetup = function(){
	
	//啟動媒體播放相關處理
	//===================================

	method.choosePlayMode();
	method.deployment();
	
	//
	$('.mediaWrapper').each(function(index) {
		//
		//param.mediaAutoPlayArr[index] = true;
		method.embedMedia(index);
		
		//●●●G214A就是無法使用tPlayer的控制方法，用了有error。
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


//
g214A.loadCardComm = function(){
	
	//更新頁碼
	//$('.g214A_pageNumStr').html('Page ' + (g214A.currCard+1) + '');
	$('.g214A_pageNumStr').html('第 ' + (g214A.currCard+1) + ' 頁' + '<span class="g214A_pageTotalStr"> / 共' + g214A.totalCard + '頁</span>'); 
	
	
	
	//1050604 - 隱藏放大鏡圖示 (●針對 IE8(含)以下：換頁前先隱藏)
	$('.zoomIconSpan').css({'visibility':'hidden'});
	
	//
	$('.mediaWrapper').each(function(index) {
		//1050604 - 隱藏.track (●針對 IE8(含)以下：換頁前先隱藏)
		$('.mediaWrapper:eq(' + index + ') .track').css({'visibility':'hidden'});
		
	});
	
	
	
	//1050604
	//********************************************************************
	$('.g214A_cardSet').animate({'opacity':0.0},240,function(){
	//********************************************************************
	
	
	
		//在$('.g214A_cardSet')中填入第一頁.card的內容上
		//=============================================================
		$('.g214A_cardSet').html(g214A.cardHtml[g214A.currCard]);
		//=============================================================
		
		//1050616
		if( !utils.isMobile ){
			g214A.mediaSetup(); 
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
		//g214A.mediaSetup()必須放在$('.g214A_cardSet')透明度1.0之後，換頁之後.slider_2和.progressBar_2才能正確
		//否則，.slider_2會停留在離開前一頁時的位置，.progressBar_2的長度會是離開前一頁時的長度。
	//********************************************************************	
		//1050604
		$('.g214A_cardSet').animate({'opacity':1.0},480, function(){
			////1050616
			//==============================
			if( utils.isMobile ){
				g214A.mediaSetup(); 
			}
			//==============================
		});
		
	});
	//********************************************************************
	
	
};


//g214A_nextBtn
g214A.loadCardNext = function(e){
	
	//
	if($(e.currentTarget).hasClass('g214A_nextBtn')){ 
		if(g214A.currCard < g214A.totalCard-1){
			//
			//$('.g214A_card:eq(' + (g214A.currCard) + ')').empty().remove();
			
			/*$('.mediaWrapper').each(function(index) {
               $('.mediaWrapper:eq(' + index + ') video').remove();
            });*/
			
			
			//
			g214A.currCard ++; 
			g214A.loadCardComm();
			//
			$('.g214A_prevBtn').css({'opacity':g214A.prevNextBtnOpacity,'cursor':'pointer'});
			//
			if(g214A.currCard >= g214A.totalCard-1){
				$('.g214A_nextBtn').css({'opacity':g214A.prevNextBtnEdgeOpacity,'cursor':'default'});
				$('.g214A_nextBtn').removeClass('g214A_nextBtnDown');
			}
		}
	}
};


//g214A_prevBtn
g214A.loadCardPrev = function(e){
			
	if($(e.currentTarget).hasClass('g214A_prevBtn')){
		if(g214A.currCard > 0){
			//
			//$('.g214A_card:eq(' + (g214A.currCard) + ')').empty().remove();
			
			//
			g214A.currCard --; 
			g214A.loadCardComm();
			//
			$('.g214A_nextBtn').css({'opacity':g214A.prevNextBtnOpacity,'cursor':'pointer'});
			//
			if(g214A.currCard <= 0){
				$('.g214A_prevBtn').css({'opacity':g214A.prevNextBtnEdgeOpacity,'cursor':'default'});
				$('.g214A_prevBtn').removeClass('g214A_prevBtnDown');
			}
		}
	}
};


//g214A事件處理
g214A.eventHandler = function(){

	//
	$('.g214A_prevBtn')
		.on('mouseover',function(){ //alert(g214A.currCard);
			if( (g214A.currCard <= g214A.totalCard-1) && (g214A.currCard > 0) ){
				$('.g214A_prevBtn > img').attr('src',param.mainPath + 'g214A_MultiPageAudio/images/bigPrevBtn_over.png');
				$('.g214A_prevBtn').addClass('g214A_prevBtnOver');
			}
		})
		.on('mouseout',function(){
			if( (g214A.currCard <= g214A.totalCard-1) && (g214A.currCard > 0) ){
				$('.g214A_prevBtn > img').attr('src', param.mainPath + 'g214A_MultiPageAudio/images/bigPrevBtn.png');
				$('.g214A_prevBtn').removeClass('g214A_prevBtnOver');
				$('.g214A_prevBtn').removeClass('g214A_prevBtnDown');
			}
		})
		.on('mousedown',function(e){
			if( (g214A.currCard <= g214A.totalCard-1) && (g214A.currCard > 0) ){
				$('.g214A_prevBtn > img').attr('src', param.mainPath + 'g214A_MultiPageAudio/images/bigPrevBtn_down.png');
				$('.g214A_prevBtn').removeClass('g214A_prevBtnOver');
				$('.g214A_prevBtn').addClass('g214A_prevBtnDown');
				
				//
				g214A.loadCardPrev(e);
				
				//延遲200毫秒換回.g214A_prevBtn預設底圖
				setTimeout(function(){
					$('.g214A_prevBtn > img').attr('src', param.mainPath + 'g214A_MultiPageAudio/images/bigPrevBtn.png');
					$('.g214A_prevBtn').removeClass('g214A_prevBtnOver');
					$('.g214A_prevBtn').removeClass('g214A_prevBtnDown');
				},200);
				
			}
		});
		
	
	//
	$('.g214A_nextBtn')
		.on('mouseover',function(){
			if( (g214A.currCard < g214A.totalCard-1) && (g214A.currCard >= 0) ){
				$('.g214A_nextBtn > img').attr('src',param.mainPath + 'g214A_MultiPageAudio/images/bigNextBtn_over.png');
				$('.g214A_nextBtn').addClass('g214A_nextBtnOver');
			}
		})
		.on('mouseout',function(){
			if( (g214A.currCard < g214A.totalCard-1) && (g214A.currCard >= 0) ){
				$('.g214A_nextBtn > img').attr('src', param.mainPath + 'g214A_MultiPageAudio/images/bigNextBtn.png');
				$('.g214A_nextBtn').removeClass('g214A_nextBtnOver');
				$('.g214A_nextBtn').removeClass('g214A_nextBtnDown');
			}
		})
		.on('mousedown',function(e){
			if( (g214A.currCard < g214A.totalCard-1) && (g214A.currCard >= 0) ){
				
				$('.g214A_nextBtn > img').attr('src', param.mainPath + 'g214A_MultiPageAudio/images/bigNextBtn_down.png');
				$('.g214A_nextBtn').removeClass('g214A_nextBtnOver');
				$('.g214A_nextBtn').addClass('g214A_nextBtnDown');
				
				//
				g214A.loadCardNext(e);
				
				//延遲200毫秒換回.g214A_nextBtn預設底圖
				setTimeout(function(){
					$('.g214A_nextBtn > img').attr('src', param.mainPath + 'g214A_MultiPageAudio/images/bigNextBtn.png');
					$('.g214A_nextBtn').removeClass('g214A_nextBtnOver');
					$('.g214A_nextBtn').removeClass('g214A_nextBtnDown');
				},200);
				
			}
			
		});
		
		
		//開啟menu按鈕 事件處理
		//====================================
		g214A.menuBtnMouseEvent();
		//====================================
		
			
};

//開啟menu按鈕 事件處理
g214A.menuBtnMouseEvent = function(){
	//
	$('.g214A_menuBtn')
	
		.on('mouseover',function(){
			$('.g214A_menuBtn > img').attr('src', param.mainPath + 'g214A_MultiPageAudio/images/menuBtn_over.png');
		})
		.on('mouseout',function(){
			$('.g214A_menuBtn > img').attr('src', param.mainPath + 'g214A_MultiPageAudio/images/menuBtn.png');
		})
		
		.on('mousedown',function(){
			//
			$('body').append('<div class="g214A_menuZone"></div>');
			
			//
			//$('.g214A_menuZone').css({'display':'block','opacity':0.0}).animate({'opacity':g214A.menuZoneOpacity},480);
			$('.g214A_menuZone').css({'opacity':g214A.menuZoneOpacity}).slideDown(250,function(){
				g214A.menuOpen = true;	
			});
			
			//
			$(this).off('mouseover');
			$(this).off('mouseout');
			$(this).off('mousedown');
			
			//
			$('.g214A_menuBtn').empty().remove();
			$('.g214A_menuBtnOuter').html('<div class="g214A_menuCloseBtn"></div>');
			$('.g214A_menuCloseBtn').append('<img src=' + param.mainPath + 'g214A_MultiPageAudio/images/menuCloseBtn.png' + '>');
			
			
			
			//
			g214A.createCardTitleMenu();
			
			//關閉menu按鈕 事件處理
			g214A.menuCloseBtnMouseEvent();
			
		});
};

//關閉menu按鈕 事件處理
g214A.menuCloseBtnMouseEvent = function(){
	//
	$('.g214A_menuCloseBtn')
		.on('mouseover',function(){
			$('.g214A_menuCloseBtn > img').attr('src', param.mainPath + 'g214A_MultiPageAudio/images/menuCloseBtn_over.png');
		})
		.on('mouseout',function(){
			$('.g214A_menuCloseBtn > img').attr('src', param.mainPath + 'g214A_MultiPageAudio/images/menuCloseBtn.png');
		})
		.on('mousedown',function(){
			//
			/*$('.g214A_menuZone').animate({'opacity':0.0},480,function(){
				$('.g214A_menuZone').remove();	
			});*/
			$('.g214A_menuZone').css({'opacity':1.0}).slideUp(250,function(){
				$('.g214A_menuZone').remove();	
			});
			
			//
			g214A.menuOpen = false;
			
			//
			$(this).off('mouseover');
			$(this).off('mouseout');
			$(this).off('mousedown');
			
			//
			$('.g214A_menuCloseBtn').empty().remove();
			$('.g214A_menuBtnOuter').html('<div class="g214A_menuBtn"></div>');
			$('.g214A_menuBtn').append('<img src=' + param.mainPath + 'g214A_MultiPageAudio/images/menuBtn.png' + '>');
			
			
			//開啟menu按鈕 事件處理
			g214A.menuBtnMouseEvent();
			
		});
};


//將網頁上的.g214A_cardTitle存入陣列g214A.cardTitle
g214A.cardTitleToArr = function(){
	//
	$('.g214A_cardTitle').each(function(index) {
        g214A.cardTitle[index] = $('.g214A_cardTitle:eq(' + index +  ')').html();
		//alert(g214A.cardTitle[index]);
    });
};

//將g214A.cardTitle陣列中的元素 - $('.g214A_cardTitle:eq(' + index +  ')').html()
//附加到$('.g214A_menuZone')
g214A.createCardTitleMenu = function(){
	
	//1050510 - 增加help按鈕 '<span class="help"></span>'
	$('.g214A_menuZone').append('<div class="g214A_menuHeader">' + g214A.menuHeader + '<span class="help"></span></div>');
	
	
	//新手上路 - 1050510
	//======================================================================
	if(param.hasHelpFlag){
		
		if(param.helpIconPath === undefined || param.helpIconPath === "" || typeof param.helpIconPath !== "string"){ 
			param.helpIconPath = param.tPlayer_CSSPath + "images/help.png";
			param.helpIconOverPath = param.tPlayer_CSSPath + "images/help_over.png";
		}
		
		$('.g214A_menuHeader .help')
				.append('<a><img src=' + param.helpIconPath + '></a>')
				.attr('title', param.helpComment); 
				
		//
		$('.g214A_menuHeader .help')
		
			.on('mouseover',function(){ 
					$('.g214A_menuHeader .help img').attr('src', param.helpIconOverPath); 
				})
			.on('mouseout',function(){
					$('.g214A_menuHeader .help img').attr('src', param.helpIconPath);
				})
			.on('mousedown',function(){
					//
					$('.g214A_menuCloseBtn').trigger('mousedown');
					//
					$('.g214A_menuHeader .help a').attr({'href':param.helpUrl,target:'_blank'});
					
				});
				
	}
	//======================================================================
	
	
	//
	$.each(g214A.cardTitle,function(index) {
		
		//
        $('.g214A_menuZone').append(  
				'<div class="g214A_menuRow">' + 
					'<span class="g214A_menuRowOrder">' + (index+1) + '</span>' + 
					'<span class="g214A_menuRowItemOuter">' + 
						'<span class="g214A_menuRowItem">' + g214A.cardTitle[index] + '</span>' + 
					'</span>' + 
				'</div>' );
		
		//
		//g214A_menuRowOrder_current
		$('.g214A_menuRow:eq(' + g214A.currCard + ')').addClass('g214A_menuRow_current');
		$('.g214A_menuRow:eq(' + g214A.currCard + ') .g214A_menuRowOrder').addClass('g214A_menuRowOrder_current');
		$('.g214A_menuRow:eq(' + g214A.currCard + ') .g214A_menuRowItem').addClass('g214A_menuRowItem_current');
		
		
		
		//●○※
		$('.g214A_menuRow:eq(' + index + ')')
		
				.on('mouseover',function(){
					if(index !== g214A.currCard){
						$('.g214A_menuRow:eq(' + index + ')').addClass('g214A_menuRow_hover');
						$('.g214A_menuRowOrder:eq(' + index + ')').addClass('g214A_menuRowOrder_hover');
						
					}else{
						$('.g214A_menuRow:eq(' + index + ')').css({'cursor':'default'});
					}
				})
				.on('mouseout',function(){
					$('.g214A_menuRow:eq(' + index + ')').removeClass('g214A_menuRow_hover');
					$('.g214A_menuRowOrder:eq(' + index + ')').removeClass('g214A_menuRowOrder_hover');
				})
				
				//
				.on('mousedown',function(){
					
					//●
					if(index !== g214A.currCard){
						
						//
						$('.g214A_menuZone').css({'opacity':1.0}).slideUp(250,function(){
							
							$('.g214A_menuZone').remove();
							//
							$('.g214A_menuCloseBtn').trigger('mousedown');
							
							//指定序號換頁
							//====================================
							g214A.currCard = index;
							//
							g214A.nextNPrevBtnState();
							//
							g214A.loadCardComm(); 
							//====================================
							
						});
					
					}
					
				});
				
		
    });
	
	
	//點擊在body標籤上
		/*$('body').on('mousedown',function(e){ 
		
			//alert(e.target.className + '/' + e.target.tagName);
			if(g214A.menuOpen === true){
				if( e.target.tagName.toLowerCase() === "body"){ 
					$('.g214A_menuCloseBtn').trigger('mousedown');
					g214A.menuOpen = false;
				}
			}
		});*/
		
		//點擊在.pageWrapper上
		$('.pageWrapper').on('mousedown',function(){ 
			if(g214A.menuOpen === true){
				$('.g214A_menuCloseBtn').trigger('mousedown');
				g214A.menuOpen = false;
			}
		});
		
	
	
};

//依序號換頁時，檢查與調整g214A_nextBtn、prevBtn按鈕狀態
g214A.nextNPrevBtnState = function(){
	
	if(g214A.currCard > 0){
		$('.g214A_prevBtn').css({'opacity':g214A.prevNextBtnOpacity,'cursor':'pointer'});
	}else{
		$('.g214A_prevBtn').css({'opacity':g214A.prevNextBtnEdgeOpacity,'cursor':'default'});
	}
	
	if(g214A.currCard < g214A.totalCard-1){
		$('.g214A_nextBtn').css({'opacity':g214A.prevNextBtnOpacity,'cursor':'pointer'});
	}else{
		$('.g214A_nextBtn').css({'opacity':g214A.prevNextBtnEdgeOpacity,'cursor':'default'});
	}
	
	
};


/*g214A HTML架構排板 - $('.pageWrapper')、*/
g214A.layout = function(){
	
	//
	$('.g214A_menuBtn').append('<img src=' + param.mainPath + 'g214A_MultiPageAudio/images/menuBtn.png' + '>');
	//
	$('.pageWrapper').prepend('<span class="g214A_prevBtn"><img src=' + param.mainPath + 'g214A_MultiPageAudio/images/bigPrevBtn.png' + '></span>');
	//
	$('.pageWrapper').prepend('<span class="g214A_nextBtn"><img src=' + param.mainPath + 'g214A_MultiPageAudio/images/bigNextBtn.png' + '></span>');
	
	
	
	//※$('.g214A_prevBtn, .g214A_nextBtn')皆有作用時，透明度設為 g214A.prevNextBtnOpacity
	$('.g214A_prevBtn, .g214A_nextBtn').css({'opacity':g214A.prevNextBtnOpacity});	
	
	//第一頁，$('.g214A_prevBtn')必須標示無作用 - ※透明度設為 g214A.prevNextBtnEdgeOpacity
	$('.g214A_prevBtn').css({'opacity':g214A.prevNextBtnEdgeOpacity,'cursor':'default'});
	
	//若只有一頁時，$('.g214A_nextBtn')也必須標示無作用 - ※透明度設為 g214A.prevNextBtnEdgeOpacity
	if(g214A.totalCard <= 1){
		$('.nextBtn').css({'opacity':g214A.prevg214A_nextBtnEdgeOpacity,'cursor':'default'});
	}
	
	//alert($(document.body).children().length);
	//alert(jQuery.cssNumber.zIndex);
	
	//
	//$(document).children().each(function(index, element) {
        //alert($(this).css('z-index'));
   // });
	
};


//C.附加第1頁Html資料，使出現在頁面上
g214A.loadFirstCard = function(){

	
	//
	g214A.currCard = 0;
	
	//填入頁碼
	//$('.g214A_pageNumStr').html('Page ' + (g214A.currCard+1) + '');
	$('.g214A_pageNumStr').html('第 ' + (g214A.currCard+1) + ' 頁' + '<span class="g214A_pageTotalStr"> / 共' + g214A.totalCard + '頁</span>'); 
	
	
	//●●●因為以html(g214A.cardHtml[g214A.currCard])方法，載入特定g214A_card，原本的內容就被取代了。
	$('.g214A_cardSet').html(g214A.cardHtml[g214A.currCard]);
	
	
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


//A.將所有.g214A_card資料存入g214A.cardHtml陣列
//B.若已完成將所有.g214A_card資料存入g214A.cardHtml陣列，則刪除網頁上所有.g214A_card
g214A.createDataArr = function(){
	
	//
	$('.g214A_card').each(function(index) {
		
		//●將所有.g214A_card資料存入g214A.cardHtml陣列
		g214A.cardHtml[index] = '<div class="g214A_card">' + $('.g214A_card:eq(' + index + ')').html() + '</div>';
		
		//g214A.cardHtml[index] = $('.g214A_card:eq(' + index + ')');
		
		
		//若已完成將所有.g214A_card資料存入g214A.cardHtml陣列
		if(index === $('.g214A_card').length-1){
			
			//
			g214A.totalCard = g214A.cardHtml.length; //alert(g214A.totalCard);
			
			
			//則刪除網頁上所有.g214A_card
			//$('.g214A_card').each(function(i) {
				
				//$('.g214A_card:eq(' + ($('.g214A_card').length-1-i) + ')').empty().remove();
				
				//$('.g214A_card:eq(' + ($('.g214A_card').length-1-i) + ')').slideUp(0);
				//$('.g214A_card:eq(' + ($('.g214A_card').length-1-i) + ')').empty().remove();
				
				//$('.g214A_card:eq(' + ($('.g214A_card').length-1-i) + ')').css({'visibility':'hidden'});
				
				//alert(g214A.cardHtml);
				
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
	
	
	//將網頁上的.g214A_cardTitle存入陣列g214A.cardTitle
	//============================
	g214A.cardTitleToArr();
	//============================
	
	
	//小尺寸視窗時，會將.g214A_nextBtn、.g214A_prevBtn、.g214A_pageNum置入.g214A_rwdNavDiv
	//.g214A_rwdNavDiv則放在.g214A_header之後
	g214A.rwdBtnHtml = '<div class="g214A_rwdNavDiv"></div>';
	
	
	//●g214A
	//===================================
	g214A.createDataArr();
	//g214A.loadFirstCard();
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
	
	
	//●g214A 之 HTML架構排板
	g214A.layout();
	
	
	//1050302 - ●嘗試移到這裡
	g214A.loadFirstCard();
	
	
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
	
		
	//●g214A
	//===================================
	//●g214A 之 HTML架構排板
	//g214A.layout();
	//●g214A
	g214A.eventHandler();
	//===================================
	
	
	//1050603 - 進入頁面就該檢查上一頁、下一頁按鈕的透明度狀態，
	// 是否再第一頁，或最後一頁。尤其只有一頁內容時。
	g214A.nextNPrevBtnState();
	

	
	// IE6~IE8
	method.lessThenIE9Css();
	
	
	//
	//setTimeout(function(){
		$(window).trigger('resize');
	//},200);
	
	
});




//>>>=============================================================>>>
})(jQuery); //↑↑↑








