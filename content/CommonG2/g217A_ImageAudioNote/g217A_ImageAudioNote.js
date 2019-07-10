// JavaScript Document - G217A│g217A_ImageAudioNote.js
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
var g217A =  NOU.namespace('NOU.modules.g217A');
//------------------------


g217A.cardHtml = [];
g217A.cardTitle = [];
g217A.rwdBtnHtml = '';
g217A.totalCard = 0;
g217A.currCard = -1;
g217A.menuOpen = false;





//媒體介面進場jQ動作 - 《 ※●○這覆蓋 jPlayer.js裡的method.entering = function(index){} 》
method.entering = function(index){
	//●○1041028 - 進場
	$('.mediaWrapper:eq('+index+') .mediaHeader').fadeOut(0);
	$('.mediaWrapper:eq('+index+') .mediaDiv, .mediaWrapper:eq('+index+') .mediaDiv > object').fadeOut(0);
	//$('.mediaWrapper:eq('+index+')').slideUp 改成 $('.mediaWrapper:eq('+index+')').fadeOut
	//
	$('.g217A_cardSet').fadeOut(280);

	$('.mediaWrapper:eq('+index+')').fadeOut(280,function(){
		$('.mediaWrapper:eq('+index+') .mediaHeader').fadeIn(280);
		$('.mediaWrapper:eq('+index+') .mediaDiv, .mediaWrapper:eq('+index+') .mediaDiv > object').fadeIn(280);
		$('.mediaWrapper:eq('+index+')').fadeIn(280);

		$('.g217A_cardSet').fadeIn(280);
	});
};


//根據 視窗寬度 與 斷點 的關係，處理差異化
g217A.rwdFunc = function(){

	//normal
	if($(window).width() > param.breakpoint){

		if( !$('.pageWrapper').hasClass('g217A_prevBtn') ){
			$('.pageWrapper').append( $('.g217A_prevBtn') );
		}

		if( !$('.pageWrapper').hasClass('g217A_nextBtn') ){
			$('.pageWrapper').append( $('.g217A_nextBtn') );
		}

		if( !$('.g217A_headerStringOuter').hasClass('g217A_pageNum') ){
			$('.g217A_cardSet').after($('.g217A_pageNum'));
		}

		if( $('.g217A_rwdNavDiv').get(0) !== undefined ){
			$('.g217A_rwdNavDiv').empty().remove();
		}


	//rwd小尺寸
	}else{

		if( $('.g217A_rwdNavDiv').get(0) === undefined ){

			$('.g217A_header').after(g217A.rwdBtnHtml);
			//$('.g217A_rwdNavDiv').append( $('.g217A_prevBtn') + $('.g217A_pageNum') + $('.g217A_nextBtn') );
			$('.g217A_rwdNavDiv').append( $('.g217A_prevBtn') );
			$('.g217A_rwdNavDiv').append( $('.g217A_pageNum') );
			$('.g217A_rwdNavDiv').append( $('.g217A_nextBtn') );

		}

	}


};



//將$('.pageWrapper')舖滿頁面
g217A.pageWrapperFullWin = function(){
	$('.pageWrapper').width($(window).width()).height($(document).height());
	//$('.g217A_card').height($(window).height() - $('.g217A_header').height());
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
	//g217A.pageWrapperFullWin();

	//
	g217A.rwdFunc();

	// IE6~IE8
	method.lessThenIE9Css();

});



//
g217A.mediaSetup = function(){

	//啟動媒體播放相關處理
	//===================================

	method.choosePlayMode();
	method.deployment();

	//
	$('.mediaWrapper').each(function(index) {
		//
		//param.mediaAutoPlayArr[index] = true;
		method.embedMedia(index);

		//●●●G217A就是無法使用tPlayer的控制方法，用了有error。
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
g217A.loadCardComm = function(){

	//更新頁碼
	//$('.g217A_pageNumStr').html('Page ' + (g217A.currCard+1) + '');
	$('.g217A_pageNumStr').html('第 ' + (g217A.currCard+1) + ' 頁' + '<span class="g217A_pageTotalStr"> / 共' + g217A.totalCard + '頁</span>');


	//1050816
	//===============================================
	g217A.pageBtnState(g217A.currCard);
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
	$('.g217A_cardSet').animate({'opacity':0.0},240,function(){
	//********************************************************************



		//在$('.g217A_cardSet')中填入第一頁.card的內容上
		//=============================================================
		$('.g217A_cardSet').html(g217A.cardHtml[g217A.currCard]);
		//=============================================================

		//1050616
		if( !utils.isMobile ){
			g217A.mediaSetup();
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
		//g217A.mediaSetup()必須放在$('.g217A_cardSet')透明度1.0之後，換頁之後.slider_2和.progressBar_2才能正確
		//否則，.slider_2會停留在離開前一頁時的位置，.progressBar_2的長度會是離開前一頁時的長度。
	//********************************************************************
		//1050604
		$('.g217A_cardSet').animate({'opacity':1.0},480, function(){
			////1050616
			//==============================
			if( utils.isMobile ){
				g217A.mediaSetup();
			}
			//==============================
		});

	});
	//********************************************************************


};


//g217A_nextBtn
g217A.loadCardNext = function(e){

	//
	if($(e.currentTarget).hasClass('g217A_nextBtn')){
		if(g217A.currCard < g217A.totalCard-1){
			//
			//$('.g217A_card:eq(' + (g217A.currCard) + ')').empty().remove();

			/*$('.mediaWrapper').each(function(index) {
               $('.mediaWrapper:eq(' + index + ') video').remove();
            });*/


			//
			g217A.currCard ++;
			g217A.loadCardComm();
			//
			$('.g217A_prevBtn').css({'opacity':g217A.prevNextBtnOpacity,'cursor':'pointer'});
			//
			if(g217A.currCard >= g217A.totalCard-1){
				$('.g217A_nextBtn').css({'opacity':g217A.prevNextBtnEdgeOpacity,'cursor':'default'});
				$('.g217A_nextBtn').removeClass('g217A_nextBtnDown');
			}
		}
	}
};


//g217A_prevBtn
g217A.loadCardPrev = function(e){

	if($(e.currentTarget).hasClass('g217A_prevBtn')){
		if(g217A.currCard > 0){
			//
			//$('.g217A_card:eq(' + (g217A.currCard) + ')').empty().remove();

			//
			g217A.currCard --;
			g217A.loadCardComm();
			//
			$('.g217A_nextBtn').css({'opacity':g217A.prevNextBtnOpacity,'cursor':'pointer'});
			//
			if(g217A.currCard <= 0){
				$('.g217A_prevBtn').css({'opacity':g217A.prevNextBtnEdgeOpacity,'cursor':'default'});
				$('.g217A_prevBtn').removeClass('g217A_prevBtnDown');
			}
		}
	}
};


//g217A事件處理
g217A.eventHandler = function(){

	//
	$('.g217A_prevBtn')
		.on('mouseover',function(){ //alert(g217A.currCard);
			if( (g217A.currCard <= g217A.totalCard-1) && (g217A.currCard > 0) ){
				$('.g217A_prevBtn > img').attr('src',param.mainPath + 'g217A_ImageAudioNote/images/prev_over.png');
				$('.g217A_prevBtn').addClass('g217A_prevBtnOver');
			}
		})
		.on('mouseout',function(){
			if( (g217A.currCard <= g217A.totalCard-1) && (g217A.currCard > 0) ){
				$('.g217A_prevBtn > img').attr('src', param.mainPath + 'g217A_ImageAudioNote/images/prev.png');
				$('.g217A_prevBtn').removeClass('g217A_prevBtnOver');
				$('.g217A_prevBtn').removeClass('g217A_prevBtnDown');
			}
		})
		.on('mousedown',function(e){
			if( (g217A.currCard <= g217A.totalCard-1) && (g217A.currCard > 0) ){
				$('.g217A_prevBtn > img').attr('src', param.mainPath + 'g217A_ImageAudioNote/images/prev_down.png');
				$('.g217A_prevBtn').removeClass('g217A_prevBtnOver');
				$('.g217A_prevBtn').addClass('g217A_prevBtnDown');

				//
				g217A.loadCardPrev(e);

				//延遲200毫秒換回.g217A_prevBtn預設底圖
				setTimeout(function(){
					$('.g217A_prevBtn > img').attr('src', param.mainPath + 'g217A_ImageAudioNote/images/prev.png');
					$('.g217A_prevBtn').removeClass('g217A_prevBtnOver');
					$('.g217A_prevBtn').removeClass('g217A_prevBtnDown');
				},200);

			}
		});


	//
	$('.g217A_nextBtn')
		.on('mouseover',function(){
			if( (g217A.currCard < g217A.totalCard-1) && (g217A.currCard >= 0) ){
				$('.g217A_nextBtn > img').attr('src',param.mainPath + 'g217A_ImageAudioNote/images/next_over.png');
				$('.g217A_nextBtn').addClass('g217A_nextBtnOver');
			}
		})
		.on('mouseout',function(){
			if( (g217A.currCard < g217A.totalCard-1) && (g217A.currCard >= 0) ){
				$('.g217A_nextBtn > img').attr('src', param.mainPath + 'g217A_ImageAudioNote/images/next.png');
				$('.g217A_nextBtn').removeClass('g217A_nextBtnOver');
				$('.g217A_nextBtn').removeClass('g217A_nextBtnDown');
			}
		})
		.on('mousedown',function(e){
			if( (g217A.currCard < g217A.totalCard-1) && (g217A.currCard >= 0) ){

				$('.g217A_nextBtn > img').attr('src', param.mainPath + 'g217A_ImageAudioNote/images/next_down.png');
				$('.g217A_nextBtn').removeClass('g217A_nextBtnOver');
				$('.g217A_nextBtn').addClass('g217A_nextBtnDown');

				//
				g217A.loadCardNext(e);

				//延遲200毫秒換回.g217A_nextBtn預設底圖
				setTimeout(function(){
					$('.g217A_nextBtn > img').attr('src', param.mainPath + 'g217A_ImageAudioNote/images/next.png');
					$('.g217A_nextBtn').removeClass('g217A_nextBtnOver');
					$('.g217A_nextBtn').removeClass('g217A_nextBtnDown');
				},200);

			}

		});


		//開啟menu按鈕 事件處理
		//====================================
		//g217A.menuBtnMouseEvent();
		//====================================


};

//開啟menu按鈕 事件處理
g217A.menuBtnMouseEvent = function(){
	//
	$('.g217A_menuBtn')

		.on('mouseover',function(){
			$('.g217A_menuBtn > img').attr('src', param.mainPath + 'g217A_ImageAudioNote/images/menuBtn_over.png');
		})
		.on('mouseout',function(){
			$('.g217A_menuBtn > img').attr('src', param.mainPath + 'g217A_ImageAudioNote/images/menuBtn.png');
		})

		.on('mousedown',function(){
			//
			$('body').append('<div class="g217A_menuZone"></div>');

			//
			//$('.g217A_menuZone').css({'display':'block','opacity':0.0}).animate({'opacity':g217A.menuZoneOpacity},480);
			$('.g217A_menuZone').css({'opacity':g217A.menuZoneOpacity}).slideDown(250,function(){
				g217A.menuOpen = true;
			});

			//
			$(this).off('mouseover');
			$(this).off('mouseout');
			$(this).off('mousedown');

			//
			$('.g217A_menuBtn').empty().remove();
			$('.g217A_menuBtnOuter').html('<div class="g217A_menuCloseBtn"></div>');
			$('.g217A_menuCloseBtn').append('<img src=' + param.mainPath + 'g217A_ImageAudioNote/images/menuCloseBtn.png' + '>');



			//
			g217A.createCardTitleMenu();

			//關閉menu按鈕 事件處理
			g217A.menuCloseBtnMouseEvent();

		});
};

//關閉menu按鈕 事件處理
g217A.menuCloseBtnMouseEvent = function(){
	//
	$('.g217A_menuCloseBtn')
		.on('mouseover',function(){
			$('.g217A_menuCloseBtn > img').attr('src', param.mainPath + 'g217A_ImageAudioNote/images/menuCloseBtn_over.png');
		})
		.on('mouseout',function(){
			$('.g217A_menuCloseBtn > img').attr('src', param.mainPath + 'g217A_ImageAudioNote/images/menuCloseBtn.png');
		})
		.on('mousedown',function(){
			//
			/*$('.g217A_menuZone').animate({'opacity':0.0},480,function(){
				$('.g217A_menuZone').remove();
			});*/
			$('.g217A_menuZone').css({'opacity':1.0}).slideUp(250,function(){
				$('.g217A_menuZone').remove();
			});

			//
			g217A.menuOpen = false;

			//
			$(this).off('mouseover');
			$(this).off('mouseout');
			$(this).off('mousedown');

			//
			$('.g217A_menuCloseBtn').empty().remove();
			$('.g217A_menuBtnOuter').html('<div class="g217A_menuBtn"></div>');
			$('.g217A_menuBtn').append('<img src=' + param.mainPath + 'g217A_ImageAudioNote/images/menuBtn.png' + '>');


			//開啟menu按鈕 事件處理
			//g217A.menuBtnMouseEvent();

		});
};


//將網頁上的.g217A_cardTitle存入陣列g217A.cardTitle
g217A.cardTitleToArr = function(){
	//
	$('.g217A_cardTitle').each(function(index) {
        g217A.cardTitle[index] = $('.g217A_cardTitle:eq(' + index +  ')').html();
		//alert(g217A.cardTitle[index]);
    });
};

//將g217A.cardTitle陣列中的元素 - $('.g217A_cardTitle:eq(' + index +  ')').html()
//附加到$('.g217A_menuZone')
g217A.createCardTitleMenu = function(){

	//1050510 - 增加help按鈕 '<span class="help"></span>'
	$('.g217A_menuZone').append('<div class="g217A_menuHeader">' + g217A.menuHeader + '<span class="help"></span></div>');


	//新手上路 - 1050510
	//======================================================================
	if(param.hasHelpFlag){

		if(param.helpIconPath === undefined || param.helpIconPath === "" || typeof param.helpIconPath !== "string"){
			param.helpIconPath = param.tPlayer_CSSPath + "images/help.png";
			param.helpIconOverPath = param.tPlayer_CSSPath + "images/help_over.png";
		}

		$('.g217A_menuHeader .help')
				.append('<a><img src=' + param.helpIconPath + '></a>')
				.attr('title', param.helpComment);

		//
		$('.g217A_menuHeader .help')

			.on('mouseover',function(){
					$('.g217A_menuHeader .help img').attr('src', param.helpIconOverPath);
				})
			.on('mouseout',function(){
					$('.g217A_menuHeader .help img').attr('src', param.helpIconPath);
				})
			.on('mousedown',function(){
					//
					$('.g217A_menuCloseBtn').trigger('mousedown');
					//
					$('.g217A_menuHeader .help a').attr({'href':param.helpUrl,target:'_blank'});

				});

	}
	//======================================================================


	//
	$.each(g217A.cardTitle,function(index) {

		//
        $('.g217A_menuZone').append(
				'<div class="g217A_menuRow">' +
					'<span class="g217A_menuRowOrder">' + (index+1) + '</span>' +
					'<span class="g217A_menuRowItemOuter">' +
						'<span class="g217A_menuRowItem">' + g217A.cardTitle[index] + '</span>' +
					'</span>' +
				'</div>' );

		//
		//g217A_menuRowOrder_current
		$('.g217A_menuRow:eq(' + g217A.currCard + ')').addClass('g217A_menuRow_current');
		$('.g217A_menuRow:eq(' + g217A.currCard + ') .g217A_menuRowOrder').addClass('g217A_menuRowOrder_current');
		$('.g217A_menuRow:eq(' + g217A.currCard + ') .g217A_menuRowItem').addClass('g217A_menuRowItem_current');



		//●○※
		$('.g217A_menuRow:eq(' + index + ')')

				.on('mouseover',function(){
					if(index !== g217A.currCard){
						$('.g217A_menuRow:eq(' + index + ')').addClass('g217A_menuRow_hover');
						$('.g217A_menuRowOrder:eq(' + index + ')').addClass('g217A_menuRowOrder_hover');

					}else{
						$('.g217A_menuRow:eq(' + index + ')').css({'cursor':'default'});
					}
				})
				.on('mouseout',function(){
					$('.g217A_menuRow:eq(' + index + ')').removeClass('g217A_menuRow_hover');
					$('.g217A_menuRowOrder:eq(' + index + ')').removeClass('g217A_menuRowOrder_hover');
				})

				//
				.on('mousedown',function(){

					//●
					if(index !== g217A.currCard){

						//
						$('.g217A_menuZone').css({'opacity':1.0}).slideUp(250,function(){

							$('.g217A_menuZone').remove();
							//
							$('.g217A_menuCloseBtn').trigger('mousedown');

							//指定序號換頁
							//====================================
							g217A.currCard = index;
							//
							g217A.nextNPrevBtnState();
							//
							g217A.loadCardComm();
							//====================================

						});

					}

				});


    });


	//點擊在body標籤上
		/*$('body').on('mousedown',function(e){

			//alert(e.target.className + '/' + e.target.tagName);
			if(g217A.menuOpen === true){
				if( e.target.tagName.toLowerCase() === "body"){
					$('.g217A_menuCloseBtn').trigger('mousedown');
					g217A.menuOpen = false;
				}
			}
		});*/

		//點擊在.pageWrapper上
		$('.pageWrapper').on('mousedown',function(){
			if(g217A.menuOpen === true){
				$('.g217A_menuCloseBtn').trigger('mousedown');
				g217A.menuOpen = false;
			}
		});



};

//依序號換頁時，檢查與調整g217A_nextBtn、prevBtn按鈕狀態
g217A.nextNPrevBtnState = function(){

	if(g217A.currCard > 0){
		$('.g217A_prevBtn').css({'opacity':g217A.prevNextBtnOpacity,'cursor':'pointer'});
	}else{
		$('.g217A_prevBtn').css({'opacity':g217A.prevNextBtnEdgeOpacity,'cursor':'default'});
	}

	if(g217A.currCard < g217A.totalCard-1){
		$('.g217A_nextBtn').css({'opacity':g217A.prevNextBtnOpacity,'cursor':'pointer'});
	}else{
		$('.g217A_nextBtn').css({'opacity':g217A.prevNextBtnEdgeOpacity,'cursor':'default'});
	}


};


/*g217A HTML架構排板 - $('.pageWrapper')、*/
g217A.layout = function(){

	//
	$('.g217A_menuBtn').append('<img src=' + param.mainPath + 'g217A_ImageAudioNote/images/menuBtn.png' + '>');
	//
	$('body').prepend('<span class="g217A_prevBtn"><img src=' + param.mainPath + 'g217A_ImageAudioNote/images/prev.png' + '></span>');
	//
	$('body').prepend('<span class="g217A_nextBtn"><img src=' + param.mainPath + 'g217A_ImageAudioNote/images/next.png' + '></span>');



	//※$('.g217A_prevBtn, .g217A_nextBtn')皆有作用時，透明度設為 g217A.prevNextBtnOpacity
	$('.g217A_prevBtn, .g217A_nextBtn').css({'opacity':g217A.prevNextBtnOpacity});

	//第一頁，$('.g217A_prevBtn')必須標示無作用 - ※透明度設為 g217A.prevNextBtnEdgeOpacity
	$('.g217A_prevBtn').css({'opacity':g217A.prevNextBtnEdgeOpacity,'cursor':'default'});

	//若只有一頁時，$('.g217A_nextBtn')也必須標示無作用 - ※透明度設為 g217A.prevNextBtnEdgeOpacity
	if(g217A.totalCard <= 1){
		$('.nextBtn').css({'opacity':g217A.prevg217A_nextBtnEdgeOpacity,'cursor':'default'});
	}

	//alert($(document.body).children().length);
	//alert(jQuery.cssNumber.zIndex);

	//
	//$(document).children().each(function(index, element) {
        //alert($(this).css('z-index'));
   // });

};


//C.附加第1頁Html資料，使出現在頁面上
g217A.loadFirstCard = function(){


	//
	g217A.currCard = 0;

	//填入頁碼
	//$('.g217A_pageNumStr').html('Page ' + (g217A.currCard+1) + '');
	$('.g217A_pageNumStr').html('第 ' + (g217A.currCard+1) + ' 頁' + '<span class="g217A_pageTotalStr"> / 共' + g217A.totalCard + '頁</span>');


	//●●●因為以html(g217A.cardHtml[g217A.currCard])方法，載入特定g217A_card，原本的內容就被取代了。
	$('.g217A_cardSet').html(g217A.cardHtml[g217A.currCard]);


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


//A.將所有.g217A_card資料存入g217A.cardHtml陣列
//B.若已完成將所有.g217A_card資料存入g217A.cardHtml陣列，則刪除網頁上所有.g217A_card
g217A.createDataArr = function(){

	//
	$('.g217A_card').each(function(index) {

		//●將所有.g217A_card資料存入g217A.cardHtml陣列
		g217A.cardHtml[index] = '<div class="g217A_card">' + $('.g217A_card:eq(' + index + ')').html() + '</div>';

		//g217A.cardHtml[index] = $('.g217A_card:eq(' + index + ')');


		//若已完成將所有.g217A_card資料存入g217A.cardHtml陣列
		if(index === $('.g217A_card').length-1){

			//
			g217A.totalCard = g217A.cardHtml.length; //alert(g217A.totalCard);


			//則刪除網頁上所有.g217A_card
			//$('.g217A_card').each(function(i) {

				//$('.g217A_card:eq(' + ($('.g217A_card').length-1-i) + ')').empty().remove();

				//$('.g217A_card:eq(' + ($('.g217A_card').length-1-i) + ')').slideUp(0);
				//$('.g217A_card:eq(' + ($('.g217A_card').length-1-i) + ')').empty().remove();

				//$('.g217A_card:eq(' + ($('.g217A_card').length-1-i) + ')').css({'visibility':'hidden'});

				//alert(g217A.cardHtml);

			//});


		}


    });
};


//g217A_help滑鼠事件
g217A.helpMouseEvent = function(){
	$('.g217A_help img').on('mouseover',function(){
		$(this).attr('src', param.helpIconOverPath);
	});
	$('.g217A_help img').on('mouseout',function(){
		$(this).attr('src', param.helpIconPath);
	});
	$('.g217A_help img').on('mousedown',function(){
		$('.g217A_help a').attr({'href':param.helpUrl,target:'_blank'});
		//alert(param.helpUrl);
	});
};


//
g217A.pageBtnState = function(index){
	//
	$.each(g217A.cardHtml, function(innerIndex){
		$('.g217A_pageBtn:eq(' + innerIndex + ')').removeClass('g217A_pageBtn_current');
	});
	//
	$('.g217A_pageBtn:eq(' + index + ')').addClass('g217A_pageBtn_current');
};


//
g217A.createPageBtn = function(){
	$.each(g217A.cardHtml, function(index){
		//
		$('.g217A_pageBtnWrapper').append('<span class="g217A_pageBtn">' + (index+1) + '</span>');

		//
		$('.g217A_pageBtn:eq(' + index + ')')
			//
			.on('mouseover',function(){
				if( g217A.currCard !== index ){
					$('.g217A_pageBtn:eq(' + index + ')').addClass('g217A_pageBtn_hover');
				}
			})
			//
			.on('mouseout',function(){
				if( g217A.currCard !== index ){
					$('.g217A_pageBtn:eq(' + index + ')').removeClass('g217A_pageBtn_hover');
				}
			})
			//
			.on('mousedown',function(){

				if( g217A.currCard !== index ){

					$('.g217A_pageBtn:eq(' + index + ')').removeClass('g217A_pageBtn_hover');
					//
					g217A.currCard = index;
					g217A.loadCardComm();
					//
					//===============================================
					g217A.nextNPrevBtnState();
					//===============================================
					//
					g217A.pageBtnState(index);

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


	//將網頁上的.g217A_cardTitle存入陣列g217A.cardTitle
	//============================
	g217A.cardTitleToArr();
	//============================


	//小尺寸視窗時，會將.g217A_nextBtn、.g217A_prevBtn、.g217A_pageNum置入.g217A_rwdNavDiv
	//.g217A_rwdNavDiv則放在.g217A_header之後
	g217A.rwdBtnHtml = '<div class="g217A_rwdNavDiv"></div>';


	//●g217A
	//===================================
	g217A.createDataArr();
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


	//●g217A 之 HTML架構排板
	g217A.layout();


	//1050302 - ●嘗試移到這裡
	g217A.loadFirstCard();


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


	//●g217A
	//===================================
	//●g217A事件處理
	g217A.eventHandler();
	//===================================


	//1050603 - 進入頁面就該檢查上一頁、下一頁按鈕的透明度狀態，
	// 是否再第一頁，或最後一頁。尤其只有一頁內容時。
	g217A.nextNPrevBtnState();


	//
	if( !param.hasHelpFlag ){
		$('.g217A_help').css({'display':'none'});
	}else{
		//g217A_help滑鼠事件
		g217A.helpMouseEvent();
	}

	//1050816
	if( g217A.hasPageBtn ){
		g217A.createPageBtn();
		g217A.pageBtnState(0);
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








