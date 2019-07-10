// JavaScript Document - G200A2│g200A2_TeachingObjectives.js
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
var g200A2 =  NOU.namespace('NOU.modules.g200A2');
//------------------------


g200A2.cardHtml = [];
g200A2.cardTitle = [];
g200A2.rwdBtnHtml = '';
g200A2.totalCard = 0;
g200A2.currCard = -1;
g200A2.menuOpen = false;

g200A2.rwdSwitchPicPath = [];
g200A2.initPicPath = [];





//媒體介面進場jQ動作 - 《 ※●○這覆蓋 jPlayer.js裡的method.entering = function(index){} 》
method.entering = function(index){
	//●○1041028 - 進場
	$('.mediaWrapper:eq('+index+') .mediaHeader').fadeOut(0);
	$('.mediaWrapper:eq('+index+') .mediaDiv, .mediaWrapper:eq('+index+') .mediaDiv > object').fadeOut(0);
	//$('.mediaWrapper:eq('+index+')').slideUp 改成 $('.mediaWrapper:eq('+index+')').fadeOut
	//
	$('.g200A2_cardSet').fadeOut(280);

	$('.mediaWrapper:eq('+index+')').fadeOut(280,function(){
		$('.mediaWrapper:eq('+index+') .mediaHeader').fadeIn(280);
		$('.mediaWrapper:eq('+index+') .mediaDiv, .mediaWrapper:eq('+index+') .mediaDiv > object').fadeIn(280);
		$('.mediaWrapper:eq('+index+')').fadeIn(280);

		$('.g200A2_cardSet').fadeIn(280);
	});
};


//根據 視窗寬度 與 斷點 的關係，處理差異化
g200A2.rwdFunc = function(){

	//normal
	if($(window).width() > param.breakpoint){

		if( !$('.pageWrapper').hasClass('g200A2_prevBtn') ){
			$('.pageWrapper').append( $('.g200A2_prevBtn') );
		}

		if( !$('.pageWrapper').hasClass('g200A2_nextBtn') ){
			$('.pageWrapper').append( $('.g200A2_nextBtn') );
		}

		if( !$('.g200A2_headerStringOuter').hasClass('g200A2_pageNum') ){
			$('.g200A2_cardSet').after($('.g200A2_pageNum'));
		}

		if( $('.g200A2_rwdNavDiv').get(0) !== undefined ){
			$('.g200A2_rwdNavDiv').empty().remove();
		}


	//rwd小尺寸
	}else{

		if( $('.g200A2_rwdNavDiv').get(0) === undefined ){

			$('.g200A2_header').after(g200A2.rwdBtnHtml);
			//$('.g200A2_rwdNavDiv').append( $('.g200A2_prevBtn') + $('.g200A2_pageNum') + $('.g200A2_nextBtn') );
			$('.g200A2_rwdNavDiv').append( $('.g200A2_prevBtn') );
			$('.g200A2_rwdNavDiv').append( $('.g200A2_pageNum') );
			$('.g200A2_rwdNavDiv').append( $('.g200A2_nextBtn') );

		}

	}


};



//將$('.pageWrapper')舖滿頁面
g200A2.pageWrapperFullWin = function(){
	$('.pageWrapper').width($(window).width()).height($(document).height());
	//$('.g200A2_card').height($(window).height() - $('.g200A2_header').height());
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
	//g200A2.pageWrapperFullWin();

	//
	g200A2.rwdFunc();
	
	// IE6~IE8
	method.lessThenIE9Css();

});



//
g200A2.mediaSetup = function(){

	//啟動媒體播放相關處理
	//===================================

	method.choosePlayMode();
	method.deployment();

	//
	$('.mediaWrapper').each(function(index) {
		//
		//param.mediaAutoPlayArr[index] = true;
		method.embedMedia(index);

		//●●●g200A2就是無法使用tPlayer的控制方法，用了有error。
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
g200A2.loadCardComm = function(){

	//更新頁碼
	//$('.g200A2_pageNumStr').html('Page ' + (g200A2.currCard+1) + '');
	$('.g200A2_pageNumStr').html('第 ' + (g200A2.currCard+1) + ' 頁' + '<span class="g200A2_pageTotalStr"> / 共' + g200A2.totalCard + '頁</span>');


	//1050816
	//===============================================
	g200A2.pageBtnState(g200A2.currCard);
	//===============================================


	//1050604 - 隱藏放大鏡圖示 (●針對 IE8(含)以下：換頁前先隱藏)
	$('.zoomIconSpan').css({'visibility':'hidden'});

	//
	$('.mediaWrapper').each(function(index) {
		//1050604 - 隱藏.track (●針對 IE8(含)以下：換頁前先隱藏)
		$('.mediaWrapper:eq(' + index + ') .track').css({'visibility':'hidden'});

	});



	//1050604
	//********************************************************************
	$('.g200A2_cardSet').animate({'opacity':0.0},240,function(){
	//********************************************************************



		//在$('.g200A2_cardSet')中填入第一頁.card的內容上
		//=============================================================
		$('.g200A2_cardSet').html(g200A2.cardHtml[g200A2.currCard]);
		//=============================================================

		//1050616
		if( !utils.isMobile ){
			g200A2.mediaSetup();
		}


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
		//g200A2.mediaSetup()必須放在$('.g200A2_cardSet')透明度1.0之後，換頁之後.slider_2和.progressBar_2才能正確
		//否則，.slider_2會停留在離開前一頁時的位置，.progressBar_2的長度會是離開前一頁時的長度。
	//********************************************************************
		//1050604
		$('.g200A2_cardSet').animate({'opacity':1.0},480, function(){
			////1050616
			//==============================
			if( utils.isMobile ){
				g200A2.mediaSetup();
			}
			//==============================
		});

	});
	//********************************************************************


};


//g200A2_nextBtn
g200A2.loadCardNext = function(e){

	//
	if($(e.currentTarget).hasClass('g200A2_nextBtn')){
		if(g200A2.currCard < g200A2.totalCard-1){
			//
			//$('.g200A2_card:eq(' + (g200A2.currCard) + ')').empty().remove();

			/*$('.mediaWrapper').each(function(index) {
               $('.mediaWrapper:eq(' + index + ') video').remove();
            });*/


			//
			g200A2.currCard ++;
			g200A2.loadCardComm();
			//
			$('.g200A2_prevBtn').css({'opacity':g200A2.prevNextBtnOpacity,'cursor':'pointer'});
			//
			if(g200A2.currCard >= g200A2.totalCard-1){
				$('.g200A2_nextBtn').css({'opacity':g200A2.prevNextBtnEdgeOpacity,'cursor':'default'});
				$('.g200A2_nextBtn').removeClass('g200A2_nextBtnDown');
			}
		}
	}
};


//g200A2_prevBtn
g200A2.loadCardPrev = function(e){

	if($(e.currentTarget).hasClass('g200A2_prevBtn')){
		if(g200A2.currCard > 0){
			//
			//$('.g200A2_card:eq(' + (g200A2.currCard) + ')').empty().remove();

			//
			g200A2.currCard --;
			g200A2.loadCardComm();
			//
			$('.g200A2_nextBtn').css({'opacity':g200A2.prevNextBtnOpacity,'cursor':'pointer'});
			//
			if(g200A2.currCard <= 0){
				$('.g200A2_prevBtn').css({'opacity':g200A2.prevNextBtnEdgeOpacity,'cursor':'default'});
				$('.g200A2_prevBtn').removeClass('g200A2_prevBtnDown');
			}
		}
	}
};


//g200A2事件處理
g200A2.eventHandler = function(){

	//
	$('.g200A2_prevBtn')
		.on('mouseover',function(){ //alert(g200A2.currCard);
			if( (g200A2.currCard <= g200A2.totalCard-1) && (g200A2.currCard > 0) ){
				$('.g200A2_prevBtn > img').attr('src',param.mainPath + 'g200A2_TeachingObjectives/images/prev_over.png');
				$('.g200A2_prevBtn').addClass('g200A2_prevBtnOver');
			}
		})
		.on('mouseout',function(){
			if( (g200A2.currCard <= g200A2.totalCard-1) && (g200A2.currCard > 0) ){
				$('.g200A2_prevBtn > img').attr('src', param.mainPath + 'g200A2_TeachingObjectives/images/prev.png');
				$('.g200A2_prevBtn').removeClass('g200A2_prevBtnOver');
				$('.g200A2_prevBtn').removeClass('g200A2_prevBtnDown');
			}
		})
		.on('mousedown',function(e){
			if( (g200A2.currCard <= g200A2.totalCard-1) && (g200A2.currCard > 0) ){
				$('.g200A2_prevBtn > img').attr('src', param.mainPath + 'g200A2_TeachingObjectives/images/prev_down.png');
				$('.g200A2_prevBtn').removeClass('g200A2_prevBtnOver');
				$('.g200A2_prevBtn').addClass('g200A2_prevBtnDown');

				//
				g200A2.loadCardPrev(e);

				//延遲200毫秒換回.g200A2_prevBtn預設底圖
				setTimeout(function(){
					$('.g200A2_prevBtn > img').attr('src', param.mainPath + 'g200A2_TeachingObjectives/images/prev.png');
					$('.g200A2_prevBtn').removeClass('g200A2_prevBtnOver');
					$('.g200A2_prevBtn').removeClass('g200A2_prevBtnDown');
				},200);

			}
		});


	//
	$('.g200A2_nextBtn')
		.on('mouseover',function(){
			if( (g200A2.currCard < g200A2.totalCard-1) && (g200A2.currCard >= 0) ){
				$('.g200A2_nextBtn > img').attr('src',param.mainPath + 'g200A2_TeachingObjectives/images/next_over.png');
				$('.g200A2_nextBtn').addClass('g200A2_nextBtnOver');
			}
		})
		.on('mouseout',function(){
			if( (g200A2.currCard < g200A2.totalCard-1) && (g200A2.currCard >= 0) ){
				$('.g200A2_nextBtn > img').attr('src', param.mainPath + 'g200A2_TeachingObjectives/images/next.png');
				$('.g200A2_nextBtn').removeClass('g200A2_nextBtnOver');
				$('.g200A2_nextBtn').removeClass('g200A2_nextBtnDown');
			}
		})
		.on('mousedown',function(e){
			if( (g200A2.currCard < g200A2.totalCard-1) && (g200A2.currCard >= 0) ){

				$('.g200A2_nextBtn > img').attr('src', param.mainPath + 'g200A2_TeachingObjectives/images/next_down.png');
				$('.g200A2_nextBtn').removeClass('g200A2_nextBtnOver');
				$('.g200A2_nextBtn').addClass('g200A2_nextBtnDown');

				//
				g200A2.loadCardNext(e);

				//延遲200毫秒換回.g200A2_nextBtn預設底圖
				setTimeout(function(){
					$('.g200A2_nextBtn > img').attr('src', param.mainPath + 'g200A2_TeachingObjectives/images/next.png');
					$('.g200A2_nextBtn').removeClass('g200A2_nextBtnOver');
					$('.g200A2_nextBtn').removeClass('g200A2_nextBtnDown');
				},200);

			}

		});


		//開啟menu按鈕 事件處理
		//====================================
		//g200A2.menuBtnMouseEvent();
		//====================================


};

//開啟menu按鈕 事件處理
g200A2.menuBtnMouseEvent = function(){
	//
	$('.g200A2_menuBtn')

		.on('mouseover',function(){
			$('.g200A2_menuBtn > img').attr('src', param.mainPath + 'g200A2_TeachingObjectives/images/menuBtn_over.png');
		})
		.on('mouseout',function(){
			$('.g200A2_menuBtn > img').attr('src', param.mainPath + 'g200A2_TeachingObjectives/images/menuBtn.png');
		})

		.on('mousedown',function(){
			//
			$('body').append('<div class="g200A2_menuZone"></div>');

			//
			//$('.g200A2_menuZone').css({'display':'block','opacity':0.0}).animate({'opacity':g200A2.menuZoneOpacity},480);
			$('.g200A2_menuZone').css({'opacity':g200A2.menuZoneOpacity}).slideDown(250,function(){
				g200A2.menuOpen = true;
			});

			//
			$(this).off('mouseover');
			$(this).off('mouseout');
			$(this).off('mousedown');

			//
			$('.g200A2_menuBtn').empty().remove();
			$('.g200A2_menuBtnOuter').html('<div class="g200A2_menuCloseBtn"></div>');
			$('.g200A2_menuCloseBtn').append('<img src=' + param.mainPath + 'g200A2_TeachingObjectives/images/menuCloseBtn.png' + '>');



			//
			g200A2.createCardTitleMenu();

			//關閉menu按鈕 事件處理
			g200A2.menuCloseBtnMouseEvent();

		});
};

//關閉menu按鈕 事件處理
g200A2.menuCloseBtnMouseEvent = function(){
	//
	$('.g200A2_menuCloseBtn')
		.on('mouseover',function(){
			$('.g200A2_menuCloseBtn > img').attr('src', param.mainPath + 'g200A2_TeachingObjectives/images/menuCloseBtn_over.png');
		})
		.on('mouseout',function(){
			$('.g200A2_menuCloseBtn > img').attr('src', param.mainPath + 'g200A2_TeachingObjectives/images/menuCloseBtn.png');
		})
		.on('mousedown',function(){
			//
			/*$('.g200A2_menuZone').animate({'opacity':0.0},480,function(){
				$('.g200A2_menuZone').remove();
			});*/
			$('.g200A2_menuZone').css({'opacity':1.0}).slideUp(250,function(){
				$('.g200A2_menuZone').remove();
			});

			//
			g200A2.menuOpen = false;

			//
			$(this).off('mouseover');
			$(this).off('mouseout');
			$(this).off('mousedown');

			//
			$('.g200A2_menuCloseBtn').empty().remove();
			$('.g200A2_menuBtnOuter').html('<div class="g200A2_menuBtn"></div>');
			$('.g200A2_menuBtn').append('<img src=' + param.mainPath + 'g200A2_TeachingObjectives/images/menuBtn.png' + '>');


			//開啟menu按鈕 事件處理
			//g200A2.menuBtnMouseEvent();

		});
};


//將網頁上的.g200A2_cardTitle存入陣列g200A2.cardTitle
g200A2.cardTitleToArr = function(){
	//
	$('.g200A2_cardTitle').each(function(index) {
        g200A2.cardTitle[index] = $('.g200A2_cardTitle:eq(' + index +  ')').html();
		//alert(g200A2.cardTitle[index]);
    });
};

//將g200A2.cardTitle陣列中的元素 - $('.g200A2_cardTitle:eq(' + index +  ')').html()
//附加到$('.g200A2_menuZone')
g200A2.createCardTitleMenu = function(){

	//1050510 - 增加help按鈕 '<span class="help"></span>'
	$('.g200A2_menuZone').append('<div class="g200A2_menuHeader">' + g200A2.menuHeader + '<span class="help"></span></div>');


	//新手上路 - 1050510
	//======================================================================
	if(param.hasHelpFlag){

		if(param.helpIconPath === undefined || param.helpIconPath === "" || typeof param.helpIconPath !== "string"){
			param.helpIconPath = param.tPlayer_CSSPath + "images/help.png";
			param.helpIconOverPath = param.tPlayer_CSSPath + "images/help_over.png";
		}

		$('.g200A2_menuHeader .help')
				.append('<a><img src=' + param.helpIconPath + '></a>')
				.attr('title', param.helpComment);

		//
		$('.g200A2_menuHeader .help')

			.on('mouseover',function(){
					$('.g200A2_menuHeader .help img').attr('src', param.helpIconOverPath);
				})
			.on('mouseout',function(){
					$('.g200A2_menuHeader .help img').attr('src', param.helpIconPath);
				})
			.on('mousedown',function(){
					//
					$('.g200A2_menuCloseBtn').trigger('mousedown');
					//
					$('.g200A2_menuHeader .help a').attr({'href':param.helpUrl,target:'_blank'});

				});

	}
	//======================================================================


	//
	$.each(g200A2.cardTitle,function(index) {

		//
        $('.g200A2_menuZone').append(
				'<div class="g200A2_menuRow">' +
					'<span class="g200A2_menuRowOrder">' + (index+1) + '</span>' +
					'<span class="g200A2_menuRowItemOuter">' +
						'<span class="g200A2_menuRowItem">' + g200A2.cardTitle[index] + '</span>' +
					'</span>' +
				'</div>' );

		//
		//g200A2_menuRowOrder_current
		$('.g200A2_menuRow:eq(' + g200A2.currCard + ')').addClass('g200A2_menuRow_current');
		$('.g200A2_menuRow:eq(' + g200A2.currCard + ') .g200A2_menuRowOrder').addClass('g200A2_menuRowOrder_current');
		$('.g200A2_menuRow:eq(' + g200A2.currCard + ') .g200A2_menuRowItem').addClass('g200A2_menuRowItem_current');



		//●○※
		$('.g200A2_menuRow:eq(' + index + ')')

				.on('mouseover',function(){
					if(index !== g200A2.currCard){
						$('.g200A2_menuRow:eq(' + index + ')').addClass('g200A2_menuRow_hover');
						$('.g200A2_menuRowOrder:eq(' + index + ')').addClass('g200A2_menuRowOrder_hover');

					}else{
						$('.g200A2_menuRow:eq(' + index + ')').css({'cursor':'default'});
					}
				})
				.on('mouseout',function(){
					$('.g200A2_menuRow:eq(' + index + ')').removeClass('g200A2_menuRow_hover');
					$('.g200A2_menuRowOrder:eq(' + index + ')').removeClass('g200A2_menuRowOrder_hover');
				})

				//
				.on('mousedown',function(){

					//●
					if(index !== g200A2.currCard){

						//
						$('.g200A2_menuZone').css({'opacity':1.0}).slideUp(250,function(){

							$('.g200A2_menuZone').remove();
							//
							$('.g200A2_menuCloseBtn').trigger('mousedown');

							//指定序號換頁
							//====================================
							g200A2.currCard = index;
							//
							g200A2.nextNPrevBtnState();
							//
							g200A2.loadCardComm();
							//====================================

						});

					}

				});


    });


	//點擊在body標籤上
		/*$('body').on('mousedown',function(e){

			//alert(e.target.className + '/' + e.target.tagName);
			if(g200A2.menuOpen === true){
				if( e.target.tagName.toLowerCase() === "body"){
					$('.g200A2_menuCloseBtn').trigger('mousedown');
					g200A2.menuOpen = false;
				}
			}
		});*/

		//點擊在.pageWrapper上
		$('.pageWrapper').on('mousedown',function(){
			if(g200A2.menuOpen === true){
				$('.g200A2_menuCloseBtn').trigger('mousedown');
				g200A2.menuOpen = false;
			}
		});



};

//依序號換頁時，檢查與調整g200A2_nextBtn、prevBtn按鈕狀態
g200A2.nextNPrevBtnState = function(){

	if(g200A2.currCard > 0){
		$('.g200A2_prevBtn').css({'opacity':g200A2.prevNextBtnOpacity,'cursor':'pointer'});
	}else{
		$('.g200A2_prevBtn').css({'opacity':g200A2.prevNextBtnEdgeOpacity,'cursor':'default'});
	}

	if(g200A2.currCard < g200A2.totalCard-1){
		$('.g200A2_nextBtn').css({'opacity':g200A2.prevNextBtnOpacity,'cursor':'pointer'});
	}else{
		$('.g200A2_nextBtn').css({'opacity':g200A2.prevNextBtnEdgeOpacity,'cursor':'default'});
	}


};


/*g200A2 HTML架構排板 - $('.pageWrapper')、*/
g200A2.layout = function(){

	//
	$('.g200A2_menuBtn').append('<img src=' + param.mainPath + 'g200A2_TeachingObjectives/images/menuBtn.png' + '>');
	//
	$('body').prepend('<span class="g200A2_prevBtn"><img src=' + param.mainPath + 'g200A2_TeachingObjectives/images/prev.png' + '></span>');
	//
	$('body').prepend('<span class="g200A2_nextBtn"><img src=' + param.mainPath + 'g200A2_TeachingObjectives/images/next.png' + '></span>');



	//※$('.g200A2_prevBtn, .g200A2_nextBtn')皆有作用時，透明度設為 g200A2.prevNextBtnOpacity
	$('.g200A2_prevBtn, .g200A2_nextBtn').css({'opacity':g200A2.prevNextBtnOpacity});

	//第一頁，$('.g200A2_prevBtn')必須標示無作用 - ※透明度設為 g200A2.prevNextBtnEdgeOpacity
	$('.g200A2_prevBtn').css({'opacity':g200A2.prevNextBtnEdgeOpacity,'cursor':'default'});

	//若只有一頁時，$('.g200A2_nextBtn')也必須標示無作用 - ※透明度設為 g200A2.prevNextBtnEdgeOpacity
	if(g200A2.totalCard <= 1){
		$('.nextBtn').css({'opacity':g200A2.prevg200A2_nextBtnEdgeOpacity,'cursor':'default'});
	}

	//alert($(document.body).children().length);
	//alert(jQuery.cssNumber.zIndex);

	//
	//$(document).children().each(function(index, element) {
        //alert($(this).css('z-index'));
   // });

};


//C.附加第1頁Html資料，使出現在頁面上
g200A2.loadFirstCard = function(){


	//
	g200A2.currCard = 0;

	//填入頁碼
	//$('.g200A2_pageNumStr').html('Page ' + (g200A2.currCard+1) + '');
	$('.g200A2_pageNumStr').html('第 ' + (g200A2.currCard+1) + ' 頁' + '<span class="g200A2_pageTotalStr"> / 共' + g200A2.totalCard + '頁</span>');


	//●●●因為以html(g200A2.cardHtml[g200A2.currCard])方法，載入特定g200A2_card，原本的內容就被取代了。
	$('.g200A2_cardSet').html(g200A2.cardHtml[g200A2.currCard]);


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


//A.將所有.g200A2_card資料存入g200A2.cardHtml陣列
//B.若已完成將所有.g200A2_card資料存入g200A2.cardHtml陣列，則刪除網頁上所有.g200A2_card
g200A2.createDataArr = function(){

	//
	$('.g200A2_card').each(function(index) {

		//●將所有.g200A2_card資料存入g200A2.cardHtml陣列
		g200A2.cardHtml[index] = '<div class="g200A2_card">' + $('.g200A2_card:eq(' + index + ')').html() + '</div>';

		//g200A2.cardHtml[index] = $('.g200A2_card:eq(' + index + ')');


		//若已完成將所有.g200A2_card資料存入g200A2.cardHtml陣列
		if(index === $('.g200A2_card').length-1){

			//
			g200A2.totalCard = g200A2.cardHtml.length; //alert(g200A2.totalCard);


			//則刪除網頁上所有.g200A2_card
			//$('.g200A2_card').each(function(i) {

				//$('.g200A2_card:eq(' + ($('.g200A2_card').length-1-i) + ')').empty().remove();

				//$('.g200A2_card:eq(' + ($('.g200A2_card').length-1-i) + ')').slideUp(0);
				//$('.g200A2_card:eq(' + ($('.g200A2_card').length-1-i) + ')').empty().remove();

				//$('.g200A2_card:eq(' + ($('.g200A2_card').length-1-i) + ')').css({'visibility':'hidden'});

				//alert(g200A2.cardHtml);

			//});


		}


    });
};


//g200A2_help滑鼠事件
g200A2.helpMouseEvent = function(){
	$('.g200A2_help img').on('mouseover',function(){
		$(this).attr('src', param.helpIconOverPath);
	});
	$('.g200A2_help img').on('mouseout',function(){
		$(this).attr('src', param.helpIconPath);
	});
	$('.g200A2_help img').on('mousedown',function(){
		$('.g200A2_help a').attr({'href':param.helpUrl,target:'_blank'});
		//alert(param.helpUrl);
	});
};


//
g200A2.pageBtnState = function(index){
	//
	$.each(g200A2.cardHtml, function(innerIndex){
		$('.g200A2_pageBtn:eq(' + innerIndex + ')').removeClass('g200A2_pageBtn_current');
	});
	//
	$('.g200A2_pageBtn:eq(' + index + ')').addClass('g200A2_pageBtn_current');
};


//
g200A2.createPageBtn = function(){
	$.each(g200A2.cardHtml, function(index){
		//
		$('.g200A2_pageBtnWrapper').append('<span class="g200A2_pageBtn">' + (index+1) + '</span>');

		//
		$('.g200A2_pageBtn:eq(' + index + ')')
			//
			.on('mouseover',function(){
				if( g200A2.currCard !== index ){
					$('.g200A2_pageBtn:eq(' + index + ')').addClass('g200A2_pageBtn_hover');
				}
			})
			//
			.on('mouseout',function(){
				if( g200A2.currCard !== index ){
					$('.g200A2_pageBtn:eq(' + index + ')').removeClass('g200A2_pageBtn_hover');
				}
			})
			//
			.on('mousedown',function(){

				if( g200A2.currCard !== index ){

					$('.g200A2_pageBtn:eq(' + index + ')').removeClass('g200A2_pageBtn_hover');
					//
					g200A2.currCard = index;
					g200A2.loadCardComm();
					//
					//===============================================
					g200A2.nextNPrevBtnState();
					//===============================================
					//
					g200A2.pageBtnState(index);

				}else{

				}

			});

	});
};



//
$(document).ready(function(){

	//●整體縮放頁面 - 強迫設定為1.0，以避免播放控制失常
	//============================
	$('body').css('zoom','1.0');
	//============================


	//將網頁上的.g200A2_cardTitle存入陣列g200A2.cardTitle
	//============================
	g200A2.cardTitleToArr();
	//============================
	
	
	//1050921
	//===============================================
	$('.rwdSwitchPic').each(function(index) {
        g200A2.rwdSwitchPicPath[index] = $('.rwdSwitchPic').text(); //alert(g200A2.rwdSwitchPicPath);
    });
	//
	$('.initPic').each(function(index) {
        g200A2.initPicPath[index] = $('.initPic').attr('src'); //alert(g200A2.initPicPath);
    });
	 //===============================================
	 


	//小尺寸視窗時，會將.g200A2_nextBtn、.g200A2_prevBtn、.g200A2_pageNum置入.g200A2_rwdNavDiv
	//.g200A2_rwdNavDiv則放在.g200A2_header之後
	g200A2.rwdBtnHtml = '<div class="g200A2_rwdNavDiv"></div>';


	//●g200A2
	//===================================
	g200A2.createDataArr();
	//g200A2.loadFirstCard();
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


	//●g200A2 之 HTML架構排板
	g200A2.layout();


	//1050302 - ●嘗試移到這裡
	g200A2.loadFirstCard();


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


	//●g200A2
	//===================================
	//●g200A2 之 HTML架構排板
	//g200A2.layout();
	//●g200A2
	g200A2.eventHandler();
	//===================================


	//1050603 - 進入頁面就該檢查上一頁、下一頁按鈕的透明度狀態，
	// 是否再第一頁，或最後一頁。尤其只有一頁內容時。
	g200A2.nextNPrevBtnState();


	//
	if( !param.hasHelpFlag ){
		$('.g200A2_help').css({'display':'none'});
	}else{
		//g200A2_help滑鼠事件
		g200A2.helpMouseEvent();
	}

	//1050816
	if( g200A2.hasPageBtn ){
		g200A2.createPageBtn();
		g200A2.pageBtnState(0);
	}



	// IE6~IE8
	method.lessThenIE9Css();


	//
	//setTimeout(function(){
		$(window).trigger('resize');
	//},200);




	//★★★ 1071220
	//=============================================★
	var wwwidth = [];
	$('.focus').each(function(index){
		wwwidth[index] = $(this).width();
	});
	// alert(wwwidth);

	$('.focus').each(function(index){
		$(this).on('focusin',function(e){
			$(this).css({
				'opacity':'0.5',
				'width':wwwidth[index]+40,
				'transition':'width 0.5s',
				'background':'rgb(255,255,255,0.3)'
			});
		});
	})

	
	


	$('.focus').each(function(index){
		$(this).on('focusout',function(e){
			$(this).css({
				'opacity':'1.0',
				'width':wwwidth[index],
				'transition':'width 0.5s',
				'background':'rgb(255,255,255,0)'
			});
		});
	})
	//=============================================★




});




//>>>=============================================================>>>
})(jQuery); //↑↑↑








