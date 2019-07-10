// JavaScript Document - G200A│g200A_TeachingObjectives.js
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
var g200A =  NOU.namespace('NOU.modules.g200A');
//------------------------


g200A.cardHtml = [];
g200A.cardTitle = [];
g200A.rwdBtnHtml = '';
g200A.totalCard = 0;
g200A.currCard = -1;
g200A.menuOpen = false;

g200A.rwdSwitchPicPath = [];
g200A.initPicPath = [];





//媒體介面進場jQ動作 - 《 ※●○這覆蓋 jPlayer.js裡的method.entering = function(index){} 》
method.entering = function(index){
	//●○1041028 - 進場
	$('.mediaWrapper:eq('+index+') .mediaHeader').fadeOut(0);
	$('.mediaWrapper:eq('+index+') .mediaDiv, .mediaWrapper:eq('+index+') .mediaDiv > object').fadeOut(0);
	//$('.mediaWrapper:eq('+index+')').slideUp 改成 $('.mediaWrapper:eq('+index+')').fadeOut
	//
	$('.g200A_cardSet').fadeOut(280);

	$('.mediaWrapper:eq('+index+')').fadeOut(280,function(){
		$('.mediaWrapper:eq('+index+') .mediaHeader').fadeIn(280);
		$('.mediaWrapper:eq('+index+') .mediaDiv, .mediaWrapper:eq('+index+') .mediaDiv > object').fadeIn(280);
		$('.mediaWrapper:eq('+index+')').fadeIn(280);

		$('.g200A_cardSet').fadeIn(280);
	});
};


//根據 視窗寬度 與 斷點 的關係，處理差異化
g200A.rwdFunc = function(){

	//normal
	if($(window).width() > param.breakpoint){

		if( !$('.pageWrapper').hasClass('g200A_prevBtn') ){
			$('.pageWrapper').append( $('.g200A_prevBtn') );
		}

		if( !$('.pageWrapper').hasClass('g200A_nextBtn') ){
			$('.pageWrapper').append( $('.g200A_nextBtn') );
		}

		if( !$('.g200A_headerStringOuter').hasClass('g200A_pageNum') ){
			$('.g200A_cardSet').after($('.g200A_pageNum'));
		}

		if( $('.g200A_rwdNavDiv').get(0) !== undefined ){
			$('.g200A_rwdNavDiv').empty().remove();
		}


	//rwd小尺寸
	}else{

		if( $('.g200A_rwdNavDiv').get(0) === undefined ){

			$('.g200A_header').after(g200A.rwdBtnHtml);
			//$('.g200A_rwdNavDiv').append( $('.g200A_prevBtn') + $('.g200A_pageNum') + $('.g200A_nextBtn') );
			$('.g200A_rwdNavDiv').append( $('.g200A_prevBtn') );
			$('.g200A_rwdNavDiv').append( $('.g200A_pageNum') );
			$('.g200A_rwdNavDiv').append( $('.g200A_nextBtn') );

		}

	}


};



//將$('.pageWrapper')舖滿頁面
g200A.pageWrapperFullWin = function(){
	$('.pageWrapper').width($(window).width()).height($(document).height());
	//$('.g200A_card').height($(window).height() - $('.g200A_header').height());
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


//※●○
g200A.switchForeSmallPic = function(){
	//
	if( g200A.switchForeSmallPicFlag ){ 
		
		if( $(window).width() > param.breakpoint ){
			
			$.each(g200A.initPicPath, function(index) { 
				$('.initPic:eq(' + index + ')').attr('src', g200A.initPicPath[index]);
			});
			
		}else if( $(window).width() <= param.breakpoint ){
			
			$.each(g200A.rwdSwitchPicPath, function(index) {
				$('.initPic:eq(' + index + ')').attr('src', g200A.rwdSwitchPicPath[index]);
			});
		
		}
		
		
	}
	
};


//1041202
$(window).on('resize', function(){

	//1050127
	//g200A.pageWrapperFullWin();

	//
	g200A.rwdFunc();
	
	//
	g200A.switchForeSmallPic();

	// IE6~IE8
	method.lessThenIE9Css();

});



//
g200A.mediaSetup = function(){

	//啟動媒體播放相關處理
	//===================================

	method.choosePlayMode();
	method.deployment();

	//
	$('.mediaWrapper').each(function(index) {
		//
		//param.mediaAutoPlayArr[index] = true;
		method.embedMedia(index);

		//●●●g200A就是無法使用tPlayer的控制方法，用了有error。
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
g200A.loadCardComm = function(){

	//更新頁碼
	//$('.g200A_pageNumStr').html('Page ' + (g200A.currCard+1) + '');
	$('.g200A_pageNumStr').html('第 ' + (g200A.currCard+1) + ' 頁' + '<span class="g200A_pageTotalStr"> / 共' + g200A.totalCard + '頁</span>');


	//1050816
	//===============================================
	g200A.pageBtnState(g200A.currCard);
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
	$('.g200A_cardSet').animate({'opacity':0.0},240,function(){
	//********************************************************************



		//在$('.g200A_cardSet')中填入第一頁.card的內容上
		//=============================================================
		$('.g200A_cardSet').html(g200A.cardHtml[g200A.currCard]);
		//=============================================================

		//1050616
		if( !utils.isMobile ){
			g200A.mediaSetup();
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
		//g200A.mediaSetup()必須放在$('.g200A_cardSet')透明度1.0之後，換頁之後.slider_2和.progressBar_2才能正確
		//否則，.slider_2會停留在離開前一頁時的位置，.progressBar_2的長度會是離開前一頁時的長度。
	//********************************************************************
		//1050604
		$('.g200A_cardSet').animate({'opacity':1.0},480, function(){
			////1050616
			//==============================
			if( utils.isMobile ){
				g200A.mediaSetup();
			}
			//==============================
		});

	});
	//********************************************************************


};


//g200A_nextBtn
g200A.loadCardNext = function(e){

	//
	if($(e.currentTarget).hasClass('g200A_nextBtn')){
		if(g200A.currCard < g200A.totalCard-1){
			//
			//$('.g200A_card:eq(' + (g200A.currCard) + ')').empty().remove();

			/*$('.mediaWrapper').each(function(index) {
               $('.mediaWrapper:eq(' + index + ') video').remove();
            });*/


			//
			g200A.currCard ++;
			g200A.loadCardComm();
			//
			$('.g200A_prevBtn').css({'opacity':g200A.prevNextBtnOpacity,'cursor':'pointer'});
			//
			if(g200A.currCard >= g200A.totalCard-1){
				$('.g200A_nextBtn').css({'opacity':g200A.prevNextBtnEdgeOpacity,'cursor':'default'});
				$('.g200A_nextBtn').removeClass('g200A_nextBtnDown');
			}
		}
	}
};


//g200A_prevBtn
g200A.loadCardPrev = function(e){

	if($(e.currentTarget).hasClass('g200A_prevBtn')){
		if(g200A.currCard > 0){
			//
			//$('.g200A_card:eq(' + (g200A.currCard) + ')').empty().remove();

			//
			g200A.currCard --;
			g200A.loadCardComm();
			//
			$('.g200A_nextBtn').css({'opacity':g200A.prevNextBtnOpacity,'cursor':'pointer'});
			//
			if(g200A.currCard <= 0){
				$('.g200A_prevBtn').css({'opacity':g200A.prevNextBtnEdgeOpacity,'cursor':'default'});
				$('.g200A_prevBtn').removeClass('g200A_prevBtnDown');
			}
		}
	}
};


//g200A事件處理
g200A.eventHandler = function(){

	//
	$('.g200A_prevBtn')
		.on('mouseover',function(){ //alert(g200A.currCard);
			if( (g200A.currCard <= g200A.totalCard-1) && (g200A.currCard > 0) ){
				$('.g200A_prevBtn > img').attr('src',param.mainPath + 'g200A_TeachingObjectives/images/prev_over.png');
				$('.g200A_prevBtn').addClass('g200A_prevBtnOver');
			}
		})
		.on('mouseout',function(){
			if( (g200A.currCard <= g200A.totalCard-1) && (g200A.currCard > 0) ){
				$('.g200A_prevBtn > img').attr('src', param.mainPath + 'g200A_TeachingObjectives/images/prev.png');
				$('.g200A_prevBtn').removeClass('g200A_prevBtnOver');
				$('.g200A_prevBtn').removeClass('g200A_prevBtnDown');
			}
		})
		.on('mousedown',function(e){
			if( (g200A.currCard <= g200A.totalCard-1) && (g200A.currCard > 0) ){
				$('.g200A_prevBtn > img').attr('src', param.mainPath + 'g200A_TeachingObjectives/images/prev_down.png');
				$('.g200A_prevBtn').removeClass('g200A_prevBtnOver');
				$('.g200A_prevBtn').addClass('g200A_prevBtnDown');

				//
				g200A.loadCardPrev(e);

				//延遲200毫秒換回.g200A_prevBtn預設底圖
				setTimeout(function(){
					$('.g200A_prevBtn > img').attr('src', param.mainPath + 'g200A_TeachingObjectives/images/prev.png');
					$('.g200A_prevBtn').removeClass('g200A_prevBtnOver');
					$('.g200A_prevBtn').removeClass('g200A_prevBtnDown');
				},200);

			}
		});


	//
	$('.g200A_nextBtn')
		.on('mouseover',function(){
			if( (g200A.currCard < g200A.totalCard-1) && (g200A.currCard >= 0) ){
				$('.g200A_nextBtn > img').attr('src',param.mainPath + 'g200A_TeachingObjectives/images/next_over.png');
				$('.g200A_nextBtn').addClass('g200A_nextBtnOver');
			}
		})
		.on('mouseout',function(){
			if( (g200A.currCard < g200A.totalCard-1) && (g200A.currCard >= 0) ){
				$('.g200A_nextBtn > img').attr('src', param.mainPath + 'g200A_TeachingObjectives/images/next.png');
				$('.g200A_nextBtn').removeClass('g200A_nextBtnOver');
				$('.g200A_nextBtn').removeClass('g200A_nextBtnDown');
			}
		})
		.on('mousedown',function(e){
			if( (g200A.currCard < g200A.totalCard-1) && (g200A.currCard >= 0) ){

				$('.g200A_nextBtn > img').attr('src', param.mainPath + 'g200A_TeachingObjectives/images/next_down.png');
				$('.g200A_nextBtn').removeClass('g200A_nextBtnOver');
				$('.g200A_nextBtn').addClass('g200A_nextBtnDown');

				//
				g200A.loadCardNext(e);

				//延遲200毫秒換回.g200A_nextBtn預設底圖
				setTimeout(function(){
					$('.g200A_nextBtn > img').attr('src', param.mainPath + 'g200A_TeachingObjectives/images/next.png');
					$('.g200A_nextBtn').removeClass('g200A_nextBtnOver');
					$('.g200A_nextBtn').removeClass('g200A_nextBtnDown');
				},200);

			}

		});


		//開啟menu按鈕 事件處理
		//====================================
		//g200A.menuBtnMouseEvent();
		//====================================


};

//開啟menu按鈕 事件處理
g200A.menuBtnMouseEvent = function(){
	//
	$('.g200A_menuBtn')

		.on('mouseover',function(){
			$('.g200A_menuBtn > img').attr('src', param.mainPath + 'g200A_TeachingObjectives/images/menuBtn_over.png');
		})
		.on('mouseout',function(){
			$('.g200A_menuBtn > img').attr('src', param.mainPath + 'g200A_TeachingObjectives/images/menuBtn.png');
		})

		.on('mousedown',function(){
			//
			$('body').append('<div class="g200A_menuZone"></div>');

			//
			//$('.g200A_menuZone').css({'display':'block','opacity':0.0}).animate({'opacity':g200A.menuZoneOpacity},480);
			$('.g200A_menuZone').css({'opacity':g200A.menuZoneOpacity}).slideDown(250,function(){
				g200A.menuOpen = true;
			});

			//
			$(this).off('mouseover');
			$(this).off('mouseout');
			$(this).off('mousedown');

			//
			$('.g200A_menuBtn').empty().remove();
			$('.g200A_menuBtnOuter').html('<div class="g200A_menuCloseBtn"></div>');
			$('.g200A_menuCloseBtn').append('<img src=' + param.mainPath + 'g200A_TeachingObjectives/images/menuCloseBtn.png' + '>');



			//
			g200A.createCardTitleMenu();

			//關閉menu按鈕 事件處理
			g200A.menuCloseBtnMouseEvent();

		});
};

//關閉menu按鈕 事件處理
g200A.menuCloseBtnMouseEvent = function(){
	//
	$('.g200A_menuCloseBtn')
		.on('mouseover',function(){
			$('.g200A_menuCloseBtn > img').attr('src', param.mainPath + 'g200A_TeachingObjectives/images/menuCloseBtn_over.png');
		})
		.on('mouseout',function(){
			$('.g200A_menuCloseBtn > img').attr('src', param.mainPath + 'g200A_TeachingObjectives/images/menuCloseBtn.png');
		})
		.on('mousedown',function(){
			//
			/*$('.g200A_menuZone').animate({'opacity':0.0},480,function(){
				$('.g200A_menuZone').remove();
			});*/
			$('.g200A_menuZone').css({'opacity':1.0}).slideUp(250,function(){
				$('.g200A_menuZone').remove();
			});

			//
			g200A.menuOpen = false;

			//
			$(this).off('mouseover');
			$(this).off('mouseout');
			$(this).off('mousedown');

			//
			$('.g200A_menuCloseBtn').empty().remove();
			$('.g200A_menuBtnOuter').html('<div class="g200A_menuBtn"></div>');
			$('.g200A_menuBtn').append('<img src=' + param.mainPath + 'g200A_TeachingObjectives/images/menuBtn.png' + '>');


			//開啟menu按鈕 事件處理
			//g200A.menuBtnMouseEvent();

		});
};


//將網頁上的.g200A_cardTitle存入陣列g200A.cardTitle
g200A.cardTitleToArr = function(){
	//
	$('.g200A_cardTitle').each(function(index) {
        g200A.cardTitle[index] = $('.g200A_cardTitle:eq(' + index +  ')').html();
		//alert(g200A.cardTitle[index]);
    });
};

//將g200A.cardTitle陣列中的元素 - $('.g200A_cardTitle:eq(' + index +  ')').html()
//附加到$('.g200A_menuZone')
g200A.createCardTitleMenu = function(){

	//1050510 - 增加help按鈕 '<span class="help"></span>'
	$('.g200A_menuZone').append('<div class="g200A_menuHeader">' + g200A.menuHeader + '<span class="help"></span></div>');


	//新手上路 - 1050510
	//======================================================================
	if(param.hasHelpFlag){

		if(param.helpIconPath === undefined || param.helpIconPath === "" || typeof param.helpIconPath !== "string"){
			param.helpIconPath = param.tPlayer_CSSPath + "images/help.png";
			param.helpIconOverPath = param.tPlayer_CSSPath + "images/help_over.png";
		}

		$('.g200A_menuHeader .help')
				.append('<a><img src=' + param.helpIconPath + '></a>')
				.attr('title', param.helpComment);

		//
		$('.g200A_menuHeader .help')

			.on('mouseover',function(){
					$('.g200A_menuHeader .help img').attr('src', param.helpIconOverPath);
				})
			.on('mouseout',function(){
					$('.g200A_menuHeader .help img').attr('src', param.helpIconPath);
				})
			.on('mousedown',function(){
					//
					$('.g200A_menuCloseBtn').trigger('mousedown');
					//
					$('.g200A_menuHeader .help a').attr({'href':param.helpUrl,target:'_blank'});

				});

	}
	//======================================================================


	//
	$.each(g200A.cardTitle,function(index) {

		//
        $('.g200A_menuZone').append(
				'<div class="g200A_menuRow">' +
					'<span class="g200A_menuRowOrder">' + (index+1) + '</span>' +
					'<span class="g200A_menuRowItemOuter">' +
						'<span class="g200A_menuRowItem">' + g200A.cardTitle[index] + '</span>' +
					'</span>' +
				'</div>' );

		//
		//g200A_menuRowOrder_current
		$('.g200A_menuRow:eq(' + g200A.currCard + ')').addClass('g200A_menuRow_current');
		$('.g200A_menuRow:eq(' + g200A.currCard + ') .g200A_menuRowOrder').addClass('g200A_menuRowOrder_current');
		$('.g200A_menuRow:eq(' + g200A.currCard + ') .g200A_menuRowItem').addClass('g200A_menuRowItem_current');



		//●○※
		$('.g200A_menuRow:eq(' + index + ')')

				.on('mouseover',function(){
					if(index !== g200A.currCard){
						$('.g200A_menuRow:eq(' + index + ')').addClass('g200A_menuRow_hover');
						$('.g200A_menuRowOrder:eq(' + index + ')').addClass('g200A_menuRowOrder_hover');

					}else{
						$('.g200A_menuRow:eq(' + index + ')').css({'cursor':'default'});
					}
				})
				.on('mouseout',function(){
					$('.g200A_menuRow:eq(' + index + ')').removeClass('g200A_menuRow_hover');
					$('.g200A_menuRowOrder:eq(' + index + ')').removeClass('g200A_menuRowOrder_hover');
				})

				//
				.on('mousedown',function(){

					//●
					if(index !== g200A.currCard){

						//
						$('.g200A_menuZone').css({'opacity':1.0}).slideUp(250,function(){

							$('.g200A_menuZone').remove();
							//
							$('.g200A_menuCloseBtn').trigger('mousedown');

							//指定序號換頁
							//====================================
							g200A.currCard = index;
							//
							g200A.nextNPrevBtnState();
							//
							g200A.loadCardComm();
							//====================================

						});

					}

				});


    });


	//點擊在body標籤上
		/*$('body').on('mousedown',function(e){

			//alert(e.target.className + '/' + e.target.tagName);
			if(g200A.menuOpen === true){
				if( e.target.tagName.toLowerCase() === "body"){
					$('.g200A_menuCloseBtn').trigger('mousedown');
					g200A.menuOpen = false;
				}
			}
		});*/

		//點擊在.pageWrapper上
		$('.pageWrapper').on('mousedown',function(){
			if(g200A.menuOpen === true){
				$('.g200A_menuCloseBtn').trigger('mousedown');
				g200A.menuOpen = false;
			}
		});



};

//依序號換頁時，檢查與調整g200A_nextBtn、prevBtn按鈕狀態
g200A.nextNPrevBtnState = function(){

	if(g200A.currCard > 0){
		$('.g200A_prevBtn').css({'opacity':g200A.prevNextBtnOpacity,'cursor':'pointer'});
	}else{
		$('.g200A_prevBtn').css({'opacity':g200A.prevNextBtnEdgeOpacity,'cursor':'default'});
	}

	if(g200A.currCard < g200A.totalCard-1){
		$('.g200A_nextBtn').css({'opacity':g200A.prevNextBtnOpacity,'cursor':'pointer'});
	}else{
		$('.g200A_nextBtn').css({'opacity':g200A.prevNextBtnEdgeOpacity,'cursor':'default'});
	}


};


/*g200A HTML架構排板 - $('.pageWrapper')、*/
g200A.layout = function(){

	//
	$('.g200A_menuBtn').append('<img src=' + param.mainPath + 'g200A_TeachingObjectives/images/menuBtn.png' + '>');
	//
	$('body').prepend('<span class="g200A_prevBtn"><img src=' + param.mainPath + 'g200A_TeachingObjectives/images/prev.png' + '></span>');
	//
	$('body').prepend('<span class="g200A_nextBtn"><img src=' + param.mainPath + 'g200A_TeachingObjectives/images/next.png' + '></span>');



	//※$('.g200A_prevBtn, .g200A_nextBtn')皆有作用時，透明度設為 g200A.prevNextBtnOpacity
	$('.g200A_prevBtn, .g200A_nextBtn').css({'opacity':g200A.prevNextBtnOpacity});

	//第一頁，$('.g200A_prevBtn')必須標示無作用 - ※透明度設為 g200A.prevNextBtnEdgeOpacity
	$('.g200A_prevBtn').css({'opacity':g200A.prevNextBtnEdgeOpacity,'cursor':'default'});

	//若只有一頁時，$('.g200A_nextBtn')也必須標示無作用 - ※透明度設為 g200A.prevNextBtnEdgeOpacity
	if(g200A.totalCard <= 1){
		$('.nextBtn').css({'opacity':g200A.prevg200A_nextBtnEdgeOpacity,'cursor':'default'});
	}

	//alert($(document.body).children().length);
	//alert(jQuery.cssNumber.zIndex);

	//
	//$(document).children().each(function(index, element) {
        //alert($(this).css('z-index'));
   // });

};


//C.附加第1頁Html資料，使出現在頁面上
g200A.loadFirstCard = function(){


	//
	g200A.currCard = 0;

	//填入頁碼
	//$('.g200A_pageNumStr').html('Page ' + (g200A.currCard+1) + '');
	$('.g200A_pageNumStr').html('第 ' + (g200A.currCard+1) + ' 頁' + '<span class="g200A_pageTotalStr"> / 共' + g200A.totalCard + '頁</span>');


	//●●●因為以html(g200A.cardHtml[g200A.currCard])方法，載入特定g200A_card，原本的內容就被取代了。
	$('.g200A_cardSet').html(g200A.cardHtml[g200A.currCard]);


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


//A.將所有.g200A_card資料存入g200A.cardHtml陣列
//B.若已完成將所有.g200A_card資料存入g200A.cardHtml陣列，則刪除網頁上所有.g200A_card
g200A.createDataArr = function(){

	//
	$('.g200A_card').each(function(index) {

		//●將所有.g200A_card資料存入g200A.cardHtml陣列
		g200A.cardHtml[index] = '<div class="g200A_card">' + $('.g200A_card:eq(' + index + ')').html() + '</div>';

		//g200A.cardHtml[index] = $('.g200A_card:eq(' + index + ')');


		//若已完成將所有.g200A_card資料存入g200A.cardHtml陣列
		if(index === $('.g200A_card').length-1){

			//
			g200A.totalCard = g200A.cardHtml.length; //alert(g200A.totalCard);


			//則刪除網頁上所有.g200A_card
			//$('.g200A_card').each(function(i) {

				//$('.g200A_card:eq(' + ($('.g200A_card').length-1-i) + ')').empty().remove();

				//$('.g200A_card:eq(' + ($('.g200A_card').length-1-i) + ')').slideUp(0);
				//$('.g200A_card:eq(' + ($('.g200A_card').length-1-i) + ')').empty().remove();

				//$('.g200A_card:eq(' + ($('.g200A_card').length-1-i) + ')').css({'visibility':'hidden'});

				//alert(g200A.cardHtml);

			//});


		}


    });
};


//g200A_help滑鼠事件
g200A.helpMouseEvent = function(){
	$('.g200A_help img').on('mouseover',function(){
		$(this).attr('src', param.helpIconOverPath);
	});
	$('.g200A_help img').on('mouseout',function(){
		$(this).attr('src', param.helpIconPath);
	});
	$('.g200A_help img').on('mousedown',function(){
		$('.g200A_help a').attr({'href':param.helpUrl,target:'_blank'});
		//alert(param.helpUrl);
	});
};


//
g200A.pageBtnState = function(index){
	//
	$.each(g200A.cardHtml, function(innerIndex){
		$('.g200A_pageBtn:eq(' + innerIndex + ')').removeClass('g200A_pageBtn_current');
	});
	//
	$('.g200A_pageBtn:eq(' + index + ')').addClass('g200A_pageBtn_current');
};


//
g200A.createPageBtn = function(){
	$.each(g200A.cardHtml, function(index){
		//
		$('.g200A_pageBtnWrapper').append('<span class="g200A_pageBtn">' + (index+1) + '</span>');

		//
		$('.g200A_pageBtn:eq(' + index + ')')
			//
			.on('mouseover',function(){
				if( g200A.currCard !== index ){
					$('.g200A_pageBtn:eq(' + index + ')').addClass('g200A_pageBtn_hover');
				}
			})
			//
			.on('mouseout',function(){
				if( g200A.currCard !== index ){
					$('.g200A_pageBtn:eq(' + index + ')').removeClass('g200A_pageBtn_hover');
				}
			})
			//
			.on('mousedown',function(){

				if( g200A.currCard !== index ){

					$('.g200A_pageBtn:eq(' + index + ')').removeClass('g200A_pageBtn_hover');
					//
					g200A.currCard = index;
					g200A.loadCardComm();
					//
					//===============================================
					g200A.nextNPrevBtnState();
					//===============================================
					//
					g200A.pageBtnState(index);

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


	//將網頁上的.g200A_cardTitle存入陣列g200A.cardTitle
	//============================
	g200A.cardTitleToArr();
	//============================
	
	
	//1050921
	//===============================================
	$('.rwdSwitchPic').each(function(index) {
        g200A.rwdSwitchPicPath[index] = $('.rwdSwitchPic:eq(' + index + ')').text(); //alert(g200A.rwdSwitchPicPath);
    });
	//
	$('.initPic').each(function(index) {
        g200A.initPicPath[index] = $('.initPic:eq(' + index + ')').attr('src'); //alert(g200A.initPicPath);
    });
	 //===============================================
	 


	//小尺寸視窗時，會將.g200A_nextBtn、.g200A_prevBtn、.g200A_pageNum置入.g200A_rwdNavDiv
	//.g200A_rwdNavDiv則放在.g200A_header之後
	g200A.rwdBtnHtml = '<div class="g200A_rwdNavDiv"></div>';


	//●g200A
	//===================================
	g200A.createDataArr();
	//g200A.loadFirstCard();
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


	//●g200A 之 HTML架構排板
	g200A.layout();


	//1050302 - ●嘗試移到這裡
	g200A.loadFirstCard();


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


	//●g200A
	//===================================
	//●g200A 之 HTML架構排板
	//g200A.layout();
	//●g200A
	g200A.eventHandler();
	//===================================


	//1050603 - 進入頁面就該檢查上一頁、下一頁按鈕的透明度狀態，
	// 是否再第一頁，或最後一頁。尤其只有一頁內容時。
	g200A.nextNPrevBtnState();


	//
	if( !param.hasHelpFlag ){
		$('.g200A_help').css({'display':'none'});
	}else{
		//g200A_help滑鼠事件
		g200A.helpMouseEvent();
	}

	//1050816
	if( g200A.hasPageBtn ){
		g200A.createPageBtn();
		g200A.pageBtnState(0);
	}



	// IE6~IE8
	method.lessThenIE9Css();


	//
	//setTimeout(function(){
		$(window).trigger('resize');
	//},200);


});




//>>>=============================================================>>>
})(jQuery); //↑↑↑








