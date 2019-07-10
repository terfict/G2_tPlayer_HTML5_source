// JavaScript Document - G212A│g212A_AccordionMedia.js
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
var g212A =  NOU.namespace('NOU.modules.g212A');
//------------------------



g212A.cardTitle = [];
g212A.cardPath = [];
g212A.cardHeight = [];

g212A.contentFrameTag = '';
g212A.rwdBtnHtml = '';
g212A.totalCard = 0;
g212A.oldCard = -1;
g212A.currCard = -1;

g212A.itemKeepIndex = -1;
g212A.menuOpen = false;

g212A.prevNextEventOn = true;
g212A.prevOrNextClicked = "";





//媒體介面進場jQ動作 - 《 ※●○這覆蓋 jPlayer.js裡的method.entering = function(index){} 》
method.entering = function(index){
	//●○1041028 - 進場
	$('.mediaWrapper:eq('+index+') .mediaHeader').fadeOut(0);
	$('.mediaWrapper:eq('+index+') .mediaDiv, .mediaWrapper:eq('+index+') .mediaDiv > object').fadeOut(0);
	//$('.mediaWrapper:eq('+index+')').slideUp 改成 $('.mediaWrapper:eq('+index+')').fadeOut
	//
	$('.g212A_cardGroup').fadeOut(280);
			
	$('.mediaWrapper:eq('+index+')').fadeOut(280,function(){
		$('.mediaWrapper:eq('+index+') .mediaHeader').fadeIn(280);
		$('.mediaWrapper:eq('+index+') .mediaDiv, .mediaWrapper:eq('+index+') .mediaDiv > object').fadeIn(280);
		$('.mediaWrapper:eq('+index+')').fadeIn(280);
		
		$('.g212A_cardGroup').fadeIn(280);
	});	
};


//根據 視窗寬度 與 斷點 的關係，處理差異化。[主要是多頁介面Layout]
g212A.rwdFunc = function(){
	
	//normal
	if($(window).width() > param.breakpoint){
		
		if( !$('.g212A_headerStringOuter').hasClass('g212A_pageSwitchUi') ){
			$('.g212A_headerStringOuter').after($('.g212A_pageSwitchUi'));
		}
		
		if( !$('.g212A_pageSwitchUi').hasClass('g212A_prevBtn') ){
			$('.g212A_pageSwitchUi').append( $('.g212A_prevBtn') );
		}
		
		if( !$('.g212A_pageSwitchUi').hasClass('g212A_pageNumStr') ){
			$('.g212A_pageSwitchUi').append( $('.g212A_pageNumStr') );
		}
		
		if( !$('.g212A_pageSwitchUi').hasClass('g212A_nextBtn') ){
			$('.g212A_pageSwitchUi').append( $('.g212A_nextBtn') );
		}
		
		//.g212A_rwdNavDiv在大尺寸模式不存在
		if( $('.g212A_rwdNavDiv').get(0) !== undefined ){
			$('.g212A_rwdNavDiv').empty().remove();
		}
		
		$('.g212A_pageNumStr').html(g212A.currCard+1);
		
		
	//rwd小尺寸
	}else{
		
		if( $('.g212A_rwdNavDiv').get(0) === undefined ){
			////.g212A_rwdNavDiv在小尺寸模式出現
			$('.g212A_header').after(g212A.rwdBtnHtml); 
			//$('.g212A_rwdNavDiv').append( $('.g212A_prevBtn') + $('.g212A_pageSwitchUi') + $('.g212A_nextBtn') );
			$('.g212A_rwdNavDiv').append( $('.g212A_prevBtn') );
			$('.g212A_rwdNavDiv').append( $('.g212A_pageSwitchUi') );
			$('.g212A_rwdNavDiv').append( $('.g212A_nextBtn') );
			
		}
		
		$('.g212A_pageNumStr').html('第 ' + (g212A.currCard+1) + ' 頁' + '<span class="g212A_pageTotalStr"> / 共' + g212A.totalCard + '頁</span>');
		
	}
	
		
};


//
g212A.adjustIframeHeight = function(){
	
	//Chrome瀏覽本機版型，安全性考量，無法存取iframe框架內的html物件。線上則可。
	try {
			
		
		//●●●1050321 - 不能有這段落，否則Win10 edge、IE11瀏覽器會有問題●●●
		// (進入layout畫面，載入第一頁，但第一頁影音按鈕無法點擊，G212A版型所有按鈕都無法點擊)
		
		var iframeInnerDocHeight;
		
		//不是行動裝置 且 瀏覽器為IE
		/*if( !utils.isMobile && utils.currentBrowser === "msie"){
			
			//解決上述在ie會發生的問題
			//===========================================================================================
			var iframeObj = document.getElementsByClassName('g212A_contentFrame')[0]; 
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
			var $iFrame1 = $(".g212A_contentFrame") ;
			//alert($iFrame1);
			var $contents = $iFrame1.contents().find('.pageWrapper');
			//alert($contents);
			iframeInnerDocHeight = $contents.height();
			//alert(iframeInnerDocHeight);
			//=====================================================================
			
		}*/
		
		
		
		//iOS
		if(utils.isMobile && utils.isIOS){
			
			//iOS大尺寸 - 依給定的高度
			if( $(window).width() > param.breakpoint){
				$('.g212A_itemBody:eq(' + (g212A.currCard) + ')').css({'height': g212A.cardHeight[g212A.currCard] });
				$('.g212A_contentFrame').css({'height': g212A.cardHeight[g212A.currCard] });
				
				//●1050329-ok
					$('.pageWrapper').css({'overflow':'visible'});
					$('.g212A_accordionDiv').css({'height':'auto'});
	
				
			//iOS小尺寸，高度設成auto，可以自動抓取
			}else{
				$('.g212A_itemBody:eq(' + (g212A.currCard) + ')').css({'height':'auto'});
				$('.g212A_contentFrame').css({'height':'auto'});
				
				//●1050329-ok
					$('.pageWrapper').css({'overflow':'visible'});
					$('.g212A_accordionDiv').css({'height':'auto'});
			}
	
	
			
		//其他 - 必須依給定的高度 - 桌機 和 Androids
		}else{
			$('.g212A_itemBody:eq(' + (g212A.currCard) + ')').css({'height': g212A.cardHeight[g212A.currCard] });
			$('.g212A_contentFrame').css({'height': g212A.cardHeight[g212A.currCard] });
		}

		
		
		
	}catch(err) {
		//
	}
	
	
	
};


//將$('.pageWrapper')舖滿頁面
g212A.pageWrapperFullWin = function(){ 
	$('.pageWrapper').width($(window).width()).height($(document).height());
	//$('.g212A_iframeOuter').height( $('.pageWrapper').height() - $('.g212A_header').height() - $('.g212A_promptLine').height() );
	

	//●1050317=========================================================》》》
	if($(window).width() > param.breakpoint){
		$('.g212A_accordionDiv').height( $('.pageWrapper').height() - $('.g212A_header').height());
		
	}else if($(window).width() <= param.breakpoint){
		$('.g212A_accordionDiv').height( $(document).height() - $('.g212A_rwdNavDiv').height() - $('.g212A_header').height());
	}
	
	
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
	g212A.pageWrapperFullWin();
		
	//
	g212A.rwdFunc();
	
	//
	g212A.adjustIframeHeight();
	
	// IE6~IE8
	method.lessThenIE9Css();
	
});



//●載入第一頁內容。(附加第1頁Html資料，使出現在頁面上)
g212A.loadFirstCard = function(){

	//
	g212A.currCard = 0;
	//
	g212A.itemKeepIndex = -1;
	
	
	//填入頁碼
	//$('.g212A_pageNumStr').html('第 ' + (g212A.currCard+1) + ' 頁' + '<span class="g212A_pageTotalStr"> / 共' + g212A.totalCard + '頁</span>');
	
	if($(window).width() <= param.breakpoint){
		$('.g212A_pageNumStr').html('第 ' + (g212A.currCard+1) + ' 頁' + '<span class="g212A_pageTotalStr"> / 共' + g212A.totalCard + '頁</span>');
	}else{
		$('.g212A_pageNumStr').html(g212A.currCard+1);
	}
	
	
	//附加 目前焦點手風琴項目 的醒目標示CSS
	$('.g212A_itemUnit:eq(' + g212A.currCard + ') .g212A_itemHeader').addClass('g212A_itemHeader_current');
	$('.g212A_itemUnit:eq(' + g212A.currCard + ') .g212A_itemHeader_order').addClass('g212A_itemHeader_order_current');
	$('.g212A_itemUnit:eq(' + g212A.currCard + ') .g212A_itemHeader_title').addClass('g212A_itemHeader_title_current');
	
	
	//●1050315
	$('.g212A_itemBody:eq(' + (g212A.currCard) + ')').html(g212A.contentFrameTag);
	
	
	
	
	//●●●1050317===========這裡捕捉錯誤，避免連擊切換按鈕，造成的錯誤，出現錯誤訊息，破壞頁面
		try {
			
			//1050323
			var $g212A_contentFrame = $('.g212A_contentFrame');
			
			//1050323
			//$g212A_contentFrame.load(function(){
				//alert( $(window).width() + '/' + $g212A_contentFrame.width());
				//var target = $g212A_contentFrame.contents().find('.pageWrapper');
				//var w = $(target).width(); alert(w);
				
				//if( $g212A_contentFrame.width() > $(parent.window).width() ){
					//alert($g212A_contentFrame.width() + '/aa/' + $(window).width() + '/' + $(parent.window).width());
					//$g212A_contentFrame.width($(window).width());
					//$g212A_contentFrame.attr('width',$(window).width());
					
					//alert($g212A_contentFrame.contentWindow);
					
					//alert( $($('.g212A_contentFrame').get(0).contentWindow).width() );
					
					//●這可以改iframe視窗寬度
					//$($('.g212A_contentFrame').get(0).contentWindow).attr('width',760);
					//alert( $($('.g212A_contentFrame').get(0).contentWindow).attr('width') );
					
					//可以
					//$('.g212A_contentFrame').contents().find('.pageWrapper').css({'display':'none'});
					//alert($('.g212A_contentFrame').contents().find('.mediaWrapper:eq(' + g212A.currCard + ')').width());
					
					//沒有抓到
					//alert( $($('.g212A_contentFrame').get(0).contentWindow).param.mediaWidthArr[g212A.currCard] );
					
					//●這可調用到例如g205_Overlay.js裡的$(window).on('resize')，如果有的話。
					//$($('.g212A_contentFrame').get(0).contentWindow).trigger('resize');
					
					
					//$('.g212A_itemBody:eq(' + (g212A.currCard) + ') .g212A_contentFrame').attr('width',769);
					//alert( $('.g212A_itemBody:eq(' + (g212A.currCard) + ') .g212A_contentFrame').attr('width') );
					
					//$('.g212A_itemBody:eq(' + (g212A.currCard) + ') .g212A_contentFrame').width(769);
					//alert( $('.g212A_itemBody:eq(' + (g212A.currCard) + ') .g212A_contentFrame').width() );
					
					/*$('.g212A_contentFrame').contents().find('.pageWrapper').width(769);
					$('.g212A_contentFrame').contents().find('.mediaWrapper:eq(' + 0 + ')').width(769);
					alert($('.g212A_contentFrame').contents().find('.mediaWrapper:eq(' + 0 + ')').width());
					param.h5MediaObj[0].width = 769;*/
					
					//$($('.g212A_contentFrame').get(0).contentWindow).trigger('resize');
					
					
					//alert($g212A_contentFrame.width() + '/bb/' + $(window).width() + '/' + $(parent.window).width());
					
					//$g212A_contentFrame.contents().trigger('resize');
				//}
				
				
			//});
			
		
			//連結或導向新頁
			//==========================================================================
			//不是行動裝置 且 瀏覽器為●pc firefox - 這換頁會有瀏覽歷史紀錄
			if( !utils.isMobile && utils.currentBrowser === "firefox"){
				$g212A_contentFrame.attr('src', g212A.cardPath[g212A.currCard]);
			
			//其他： 使用location.replace可以 換頁無瀏覽歷史紀錄 - 適合《旭聯智慧大師平台》Android app的運作。
			//--> 按下裝置回上一頁，不論目前本版型在哪一頁，都可回到選單頁。
			//但 ●pc firefox出現錯誤： TypeError: document.g212A_contentFrame is undefined
			}else{
				//try {
					document.g212A_contentFrame.location.replace(g212A.cardPath[g212A.currCard]);
					//●
					//$g212A_contentFrame.attr('src', g212A.cardPath[g212A.currCard]);
					
				//}catch(err){
					//
				//}
				
			}
			//==========================================================================
		
		}catch(err){
		}

	
	
	//有作用
	//==============================================
	$('.g212A_contentFrame').load(function(){
		
		g212A.adjustIframeHeight();
		
		
		
	});
	//==============================================
	
	
	
	//●◎1050421 - ※根據g212A.openFirstPage，判斷進入頁面時，是否開啟第一頁
	//=================================================================
	if( !g212A.openFirstPage ){
		$('.g212A_itemUnit:eq(' + g212A.currCard + ') .g212A_itemHeader').trigger('mousedown');
	}
	//=================================================================
	
		
	
};


//●按下上一頁、下一頁按鈕，或按下從menu按鈕開啟的選單項目，或按下手風琴項目， 都會來此換頁。
g212A.loadCardComm = function(){
	
	//更新頁碼
	//$('.g212A_pageNumStr').html('第 ' + (g212A.currCard+1) + ' 頁' + '<span class="g212A_pageTotalStr"> / 共' + g212A.totalCard + '頁</span>');
	
	if($(window).width() <= param.breakpoint){
		$('.g212A_pageNumStr').html('第 ' + (g212A.currCard+1) + ' 頁' + '<span class="g212A_pageTotalStr"> / 共' + g212A.totalCard + '頁</span>');
	}else{
		$('.g212A_pageNumStr').html(g212A.currCard+1);
	}
	
	//移除 失去焦點手風琴項目 的醒目標示CSS
	$('.g212A_itemUnit:eq(' + g212A.oldCard + ') .g212A_itemHeader').removeClass('g212A_itemHeader_current');
	$('.g212A_itemUnit:eq(' + g212A.oldCard + ') .g212A_itemHeader_order').removeClass('g212A_itemHeader_order_current');
	$('.g212A_itemUnit:eq(' + g212A.oldCard + ') .g212A_itemHeader_title').removeClass('g212A_itemHeader_title_current');
	
	//附加 目前焦點手風琴項目 的醒目標示CSS
	$('.g212A_itemUnit:eq(' + g212A.currCard + ') .g212A_itemHeader').addClass('g212A_itemHeader_current');
	$('.g212A_itemUnit:eq(' + g212A.currCard + ') .g212A_itemHeader_order').addClass('g212A_itemHeader_order_current');
	$('.g212A_itemUnit:eq(' + g212A.currCard + ') .g212A_itemHeader_title').addClass('g212A_itemHeader_title_current');
	
	
	//●1050315
	//●1050317 - 這行移到下方了
	//$('.g212A_itemBody:eq(' + (g212A.oldCard) + ')').animate({'height':'0'},480,function(){
		
		
		//●※○●※○●※○●※○●※○●※○●※○ 在PC Windows：IE9、IE10有錯誤訊息。IE8不會出現錯誤訊息。Chrome、FF、Opera沒問題。Mobile沒問題。
		//==========================================================
		//SCRIPT5009: '__flash__removeCallback' 未經定義 
		//index.html, 行 1 字元 1
		
		//測試過程，主控台不小心出現
		//try { document.getElementById("tPlayer_0").SetReturnValue(__flash__toXML(tPlayer.updateCurrTime(0,0)) ); } catch (e) { document.getElementById("tPlayer_0").SetReturnValue("<undefined/>"); }
		
		//●__flash__removeCallback is undefined errors in IE9 while removing the dom element
		//http://stackoverflow.com/questions/15887284/flash-removecallback-is-undefined-errors-in-ie9-while-removing-the-dom-elemen
		//==========================================================
		try {
			//下面這行，在IE9、IE10一定會出現SCRIPT5009: '__flash__removeCallback' 未經定義。但以捕捉錯誤忽略。console雖有錯誤訊息，但仍可運作。
			//
			//$('.g212A_itemBody:eq(' + (g212A.oldCard) + ') .g212A_contentFrame').empty().remove(); 
			
			//$('.g212A_itemBody:eq(' + (g212A.oldCard) + ') .g212A_contentFrame').css({'display':'none'});
			
		}catch(err){
			//console.log(err);
			//return false;
			
		}
		//==========================================================
		

	//1050408
	$('.g212A_itemBody:eq(' + (g212A.currCard) + ')').removeClass('g212A_itemBody_keep');
	
		
		
	//●●●1050317 - 從上方移過來，讓$('.g212A_itemBody:eq(' + (g212A.oldCard) + ')先清空。避免animate還沒結束，又按下按鈕換頁，會造成一些切換瑕疵
	$('.g212A_itemBody:eq(' + (g212A.oldCard) + ')').animate({'height':'0'},360,function(){
		
		
		//1050323
		$('.g212A_itemBody:eq(' + (g212A.oldCard) + ') .g212A_contentFrame').empty(); 
		//$g212A_contentFrame.empty();
		
		
		if( g212A.prevOrNextClicked === "next" ){
			g212A.nextEvent();
		}else if( g212A.prevOrNextClicked === "prev" ){
			g212A.prevEvent();
		}
		
		
		
		//●●●1050317 - 看起來，換頁前清空，並把$('.pageWrapper')回歸文件高度，可避免最下方露出許多空白。
		//==================================================
		//$('.pageWrapper').height( $(document).height() );
		//==================================================
		
		
		
		//●○●○●○1050323 - 用append方式處理，且必定放在此處，animate()動畫結束後，才不會有下行所述錯誤發生。(載入某些頁面還是會有錯誤訊息出現)
			//SCRIPT5009: '__flash__removeCallback' 未經定義 
			//《《《《《《=========================================================《《《《《《
			try {
				//1050323
				$('.g212A_itemBody:eq(' + (g212A.currCard) + ')').append($('.g212A_itemBody:eq(' + (g212A.oldCard) + ') .g212A_contentFrame'));
			}catch(err){
				
			}
			//《《《《《《=========================================================《《《《《《
		
		
		//
		//$('.g212A_itemBody:eq(' + (g212A.currCard) + ')').html(g212A.contentFrameTag);
	
		
	
		//在$('.g212A_contentFrame')中載入第一頁.card的連結網頁
		
		//iframe使用src屬性換頁，
		//細談 location.href 與 location.replace 的差別與實務應用 - The Will Will Web
		//http://blog.miniasp.com/post/2009/03/25/location-href-and-location-replace-in-practice.aspx
		//透過 JavaScript 的 location.replace 傳入網址
		//瀏覽器不會送出 Referer 這個 HTTP Header
		//瀏覽器不會紀錄連結的歷史紀錄! ( 瀏覽器將無瀏覽歷史紀錄 )
		//$('.g212A_contentFrame').attr('src', g212A.cardPath[g212A.currCard]);
		
		//OK - 1050301
		//document.g212A_contentFrame.location.replace(g212A.cardPath[g212A.currCard]);
		
		
		//可以_self換頁，但無法在iframe換頁。
		//$(location).attr('href', g212A.cardPath[g212A.currCard]);
		//alert($('.g212A_contentFrame').contents().location.href);
		
		

		
		//●●●1050317===========這裡捕捉錯誤，避免連擊切換按鈕，造成的錯誤，出現錯誤訊息，破壞頁面
		try {
			
			
			//1050323
			$('.g212A_itemBody:eq(' + (g212A.currCard) + ') .g212A_contentFrame').load(function(){
				//alert( $(window).width() + '/' + $g212A_contentFrame.width());
				//var target = $g212A_contentFrame.contents().find('.pageWrapper');
				//var w = $(target).width(); alert(w);
				
				//alert($(window).width() + '/' + $(parent.window).width());
				
				//$('.g212A_itemBody:eq(' + (g212A.currCard) + ') .g212A_contentFrame').attr('width',769);
				//alert( $('.g212A_itemBody:eq(' + (g212A.currCard) + ') .g212A_contentFrame').attr('width') );
				
				//alert( $('.g212A_itemBody:eq(' + (g212A.currCard) + ') .g212A_contentFrame').width() );
				
				/*if( $('.g212A_itemBody:eq(' + (g212A.currCard) + ') .g212A_contentFrame').width() > $(parent.window).width() ){
					$('.g212A_itemBody:eq(' + (g212A.currCard) + ') .g212A_contentFrame').width($(parent.window).width());
				}*/
				
			});
			
			
		
			//連結或導向新頁
			//==========================================================================
			//不是行動裝置 且 瀏覽器為●pc firefox - 這換頁會有瀏覽歷史紀錄
			if( !utils.isMobile && utils.currentBrowser === "firefox"){
				$('.g212A_itemBody:eq(' + (g212A.currCard) + ') .g212A_contentFrame').attr('src', g212A.cardPath[g212A.currCard]);
			
			//其他： 使用location.replace可以 換頁無瀏覽歷史紀錄 - 適合《旭聯智慧大師平台》Android app的運作。
			//--> 按下裝置回上一頁，不論目前本版型在哪一頁，都可回到選單頁。
			//但 ●pc firefox出現錯誤： TypeError: document.g212A_contentFrame is undefined
			}else{
				//try {
					document.g212A_contentFrame.location.replace(g212A.cardPath[g212A.currCard]);
					//●
					//$('.g212A_itemBody:eq(' + (g212A.currCard) + ') .g212A_contentFrame').attr('src', g212A.cardPath[g212A.currCard]);
					
				//}catch(err){
					//
				//}
				
			}
			//==========================================================================
			
		
		}catch(err){
		}
		
		
	
	
		//有作用
		//==============================================
		$('.g212A_contentFrame').load(function(){
			
			g212A.adjustIframeHeight();

		});
		//==============================================
		
		
		
		
		//●●●1050316 - ●(g212A.currCard)*1.0 ： 微調之用
		//===========================================================================
		var scrolltopVaule = (g212A.currCard-1)*$('.g212A_itemUnit').height() + $('.g212A_promptLine').height() + (g212A.currCard)*1.0;
		
		//
		$('.g212A_accordionDiv').animate({'scrollTop': scrolltopVaule},600,function(){
			//
		});
		//===========================================================================
	
	
	
	
		//●◎○●◎○強制操控.pageWrapper高度為視窗高度--xxx
		//=====================================================
		//$('.pageWrapper').css({'overflow-y':'visible'});
		//=====================================================
	
	
	
		//●1050302 - 因為在IE9以下，小尺寸視窗，換頁時，g212A_pageTotalStr的顏色會跳到大尺寸視窗的顏色。所以，用$(window).trigger('resize')來補救。
		$(window).trigger('resize');
		
		
	});
	
};


//g212A_nextBtn
g212A.loadCardNext = function(e){
	
	//
	if($(e.currentTarget).hasClass('g212A_nextBtn')){
		if(g212A.currCard < g212A.totalCard-1){
			
			//●1050315
			//===================================
			g212A.oldCard = g212A.currCard;
			//===================================
			//
			g212A.currCard ++; 
			
			//
			g212A.openItemKeep(g212A.currCard);
			
			
			g212A.loadCardComm();
			//
			$('.g212A_prevBtn').css({'opacity':g212A.prevNextBtnOpacity,'cursor':'pointer'});
			if(g212A.currCard >= g212A.totalCard-1){
				$('.g212A_nextBtn').css({'opacity':g212A.prevNextBtnEdgeOpacity,'cursor':'default'});
				$('.g212A_nextBtn').removeClass('g212A_nextBtnDown');
			}
		}
	}
};


//g212A_prevBtn
g212A.loadCardPrev = function(e){
			
	if($(e.currentTarget).hasClass('g212A_prevBtn')){
		if(g212A.currCard > 0){
			
			//●1050315
			//===================================
			g212A.oldCard = g212A.currCard;
			//===================================
			//
			g212A.currCard --; 
			
			//
			g212A.openItemKeep(g212A.currCard);
			
			
			g212A.loadCardComm();
			//
			$('.g212A_nextBtn').css({'opacity':g212A.prevNextBtnOpacity,'cursor':'pointer'});
			if(g212A.currCard <= 0){
				$('.g212A_prevBtn').css({'opacity':g212A.prevNextBtnEdgeOpacity,'cursor':'default'});
				$('.g212A_prevBtn').removeClass('g212A_prevBtnDown');
			}
		}
	}
};


//g212A - 下一頁按鈕、上一頁按鈕事件處理
g212A.prevEvent = function(){


	//上一頁
	$('.g212A_prevBtn')
		.on('mouseover',function(){ //alert(g212A.currCard);
			if( (g212A.currCard <= g212A.totalCard-1) && (g212A.currCard > 0) ){
				$('.g212A_prevBtn > img').attr('src',param.mainPath + 'g212A_AccordionMedia/images/leftBtn_over.png');
				$('.g212A_prevBtn').addClass('g212A_prevBtnOver');
				//$('.g212A_prevBtn').css({'cursor':'pointer'});
			}else{
				//$('.g212A_prevBtn').css({'cursor':'default'});
			}
		})
		.on('mouseout',function(){
			if( (g212A.currCard <= g212A.totalCard-1) && (g212A.currCard > 0) ){
				$('.g212A_prevBtn > img').attr('src', param.mainPath + 'g212A_AccordionMedia/images/leftBtn.png');
				$('.g212A_prevBtn').removeClass('g212A_prevBtnOver');
				$('.g212A_prevBtn').removeClass('g212A_prevBtnDown');
			}
		})
		.on('mousedown',function(e){
			
			//
			g212A.prevOrNextClicked = "prev";
			
			
			if( (g212A.currCard <= g212A.totalCard-1) && (g212A.currCard > 0) ){
				
				if( g212A.prevNextEventOn ){
					//1050408 - 關閉上一頁、下一頁按鈕的滑鼠事件
					//================================
					g212A.prevEventOff();
					//================================
				}
				
				
				$('.g212A_prevBtn > img').attr('src', param.mainPath + 'g212A_AccordionMedia/images/leftBtn_down.png');
				$('.g212A_prevBtn').removeClass('g212A_prevBtnOver');
				$('.g212A_prevBtn').addClass('g212A_prevBtnDown');
				
				//
				g212A.loadCardPrev(e);
				
				//延遲200毫秒換回.g212A_prevBtn預設底圖
				setTimeout(function(){
					$('.g212A_prevBtn > img').attr('src', param.mainPath + 'g212A_AccordionMedia/images/leftBtn.png');
					$('.g212A_prevBtn').removeClass('g212A_prevBtnOver');
					$('.g212A_prevBtn').removeClass('g212A_prevBtnDown');
				},200);
				
			}
			
			//
			/*if(g212A.currCard === 0){
				$('.g212A_prevBtn > img').attr('src', param.mainPath + 'g212A_AccordionMedia/images/leftBtn.png');
			}*/
		
		});
		

			
};



//g212A - 下一頁按鈕、上一頁按鈕事件處理
g212A.nextEvent = function(){
	

	//下一頁
	$('.g212A_nextBtn')
		.on('mouseover',function(){
			if( (g212A.currCard < g212A.totalCard-1) && (g212A.currCard >= 0) ){
				$('.g212A_nextBtn > img').attr('src',param.mainPath + 'g212A_AccordionMedia/images/rightBtn_over.png');
				$('.g212A_nextBtn').addClass('g212A_nextBtnOver');
			}
		})
		.on('mouseout',function(){
			if( (g212A.currCard < g212A.totalCard-1) && (g212A.currCard >= 0) ){
				$('.g212A_nextBtn > img').attr('src', param.mainPath + 'g212A_AccordionMedia/images/rightBtn.png');
				$('.g212A_nextBtn').removeClass('g212A_nextBtnOver');
				$('.g212A_nextBtn').removeClass('g212A_nextBtnDown');
			}
		})
		.on('mousedown',function(e){
			
			//
			g212A.prevOrNextClicked = "next";
			
			
			if( (g212A.currCard < g212A.totalCard-1) && (g212A.currCard >= 0) ){
				
				
				if( g212A.prevNextEventOn ){
					//1050408 - 關閉上一頁、下一頁按鈕的滑鼠事件
					//================================
					g212A.nextEventOff();
					//================================
				}
				
				
				$('.g212A_nextBtn > img').attr('src', param.mainPath + 'g212A_AccordionMedia/images/rightBtn_down.png');
				$('.g212A_nextBtn').removeClass('g212A_nextBtnOver');
				$('.g212A_nextBtn').addClass('g212A_nextBtnDown');
				
				//
				g212A.loadCardNext(e);
				
				//延遲200毫秒換回.g212A_nextBtn預設底圖
				setTimeout(function(){
					$('.g212A_nextBtn > img').attr('src', param.mainPath + 'g212A_AccordionMedia/images/rightBtn.png');
					$('.g212A_nextBtn').removeClass('g212A_nextBtnOver');
					$('.g212A_nextBtn').removeClass('g212A_nextBtnDown');
				},200);
				
				//alert(g212A.currCard);
				
			}
			
			//
			/*if(g212A.currCard === g212A.totalCard-1){
				$('.g212A_nextBtn > img').attr('src', param.mainPath + 'g212A_AccordionMedia/images/rightBtn.png');
			}*/
			
		});
		
	
			
};


//1050408 - 關閉上一頁、下一頁按鈕的滑鼠事件
g212A.prevEventOff = function(){
	//
	$('.g212A_prevBtn').off('mouseout');
	$('.g212A_prevBtn').off('mousedown');
	$('.g212A_prevBtn').off('mouseout');
};

//1050408 - 關閉上一頁、下一頁按鈕的滑鼠事件
g212A.nextEventOff = function(){
	//
	$('.g212A_nextBtn').off('mouseover');
	$('.g212A_nextBtn').off('mousedown');
	$('.g212A_nextBtn').off('mouseout');
};





//●頁面左上角 menu按鈕 事件處理
g212A.menuBtnMouseEvent = function(){
	
	//====================================
	$('.g212A_menuBtn')
	//====================================
		//
		.on('mouseover',function(){
			$('.g212A_menuBtn > img').attr('src', param.mainPath + 'g212A_AccordionMedia/images/menuBtn_over.png');
		})
		//
		.on('mouseout',function(){
			$('.g212A_menuBtn > img').attr('src', param.mainPath + 'g212A_AccordionMedia/images/menuBtn.png');
		})
		
		//
		.on('mousedown',function(){
			$('.g212A_menuBtn > img').attr('src', param.mainPath + 'g212A_AccordionMedia/images/menuBtn.png');
			//
			$('body').append('<div class="g212A_menuZone"></div>');
			
			//
			//$('.g212A_menuZone').css({'display':'block','opacity':0.0}).animate({'opacity':g212A.menuZoneOpacity},480);
			$('.g212A_menuZone').css({'opacity':g212A.menuZoneOpacity}).slideDown(250,function(){
				g212A.menuOpen = true;	
			});
			
			//
			$(this).off('mouseover');
			$(this).off('mouseout');
			$(this).off('mousedown');
			
			//
			$('.g212A_menuBtn').empty().remove();
			$('.g212A_menuBtnOuter').html('<div class="g212A_menuCloseBtn"></div>');
			$('.g212A_menuCloseBtn').append('<img src=' + param.mainPath + 'g212A_AccordionMedia/images/menuCloseBtn.png' + '>');
			
			
			//
			g212A.createCardTitleMenu();
			
			//關閉menu按鈕 事件處理
			g212A.menuCloseBtnMouseEvent();
			
			
		});
};


//頁面左上角 關閉menu按鈕 事件處理 - 可關閉選單區塊
g212A.menuCloseBtnMouseEvent = function(){
	//
	$('.g212A_menuCloseBtn')
		.on('mouseover',function(){
			$('.g212A_menuCloseBtn > img').attr('src', param.mainPath + 'g212A_AccordionMedia/images/menuCloseBtn_over.png');
		})
		.on('mouseout',function(){
			$('.g212A_menuCloseBtn > img').attr('src', param.mainPath + 'g212A_AccordionMedia/images/menuCloseBtn.png');
		})
		.on('mousedown',function(){
			//
			/*$('.g212A_menuZone').animate({'opacity':0.0},480,function(){
				$('.g212A_menuZone').remove();	
			});*/
			$('.g212A_menuZone').css({'opacity':1.0}).slideUp(250,function(){
				$('.g212A_menuZone').remove();	
			});
			
			//
			g212A.menuOpen = false;
			
			//
			$(this).off('mouseover');
			$(this).off('mouseout');
			$(this).off('mousedown');
			
			//
			$('.g212A_menuCloseBtn').empty().remove();
			$('.g212A_menuBtnOuter').html('<div class="g212A_menuBtn"></div>');
			$('.g212A_menuBtn').append('<img src=' + param.mainPath + 'g212A_AccordionMedia/images/menuBtn.png' + '>');
			
			
			//開啟menu按鈕 事件處理
			g212A.menuBtnMouseEvent();
			
		});
};



//●建立下拉menu：
//將g212A.cardTitle陣列中的元素 - $('.g212A_cardTitle:eq(' + index +  ')').html()
//附加到$('.g212A_menuZone')
g212A.createCardTitleMenu = function(){
	
	//1050510 - 新增help - '<span class="help"></span>'
	$('.g212A_menuZone').append('<div class="g212A_menuHeader">' + g212A.menuHeader + '<span class="help"></span></div>');
	
	
	//新手上路 - 1050510
	//======================================================================
	if(param.hasHelpFlag){
		
		//1050510 - tPlayer_CSSPath本來在tPlayer.js裡面有給值了，但在這版型抓不到，所以在$(document).ready()重新給一次。
		if(param.helpIconPath === undefined || param.helpIconPath === "" || typeof param.helpIconPath !== "string"){ 
			param.helpIconPath = param.tPlayer_CSSPath + "images/help.png"; 
			param.helpIconOverPath = param.tPlayer_CSSPath + "images/help_over.png";
			//alert(param.tPlayer_CSSPath);
		}
		
		$('.g212A_menuHeader .help')
				.append('<a><img src=' + param.helpIconPath + '></a>')
				.attr('title', param.helpComment);  
				
		//
		$('.g212A_menuHeader .help')
		
			.on('mouseover',function(){ 
					$('.g212A_menuHeader .help img').attr('src', param.helpIconOverPath); 
				})
			.on('mouseout',function(){
					$('.g212A_menuHeader .help img').attr('src', param.helpIconPath);
				})
			.on('mousedown',function(){
					//
					$('.g212A_menuCloseBtn').trigger('mousedown');
					//
					$('.g212A_menuHeader .help a').attr({'href':param.helpUrl,target:'_blank'});
					
				});
				
	}
	//======================================================================
	
	
	
	
	
	//
	$.each(g212A.cardTitle,function(index) {
		
		//
        $('.g212A_menuZone').append(  
				'<div class="g212A_menuRow">' + 
					'<span class="g212A_menuRowOrder">' + (index+1) + '</span>' + 
					'<span class="g212A_menuRowItemOuter">' + 
						'<span class="g212A_menuRowItem">' + g212A.cardTitle[index] + '</span>' + 
					'</span>' + 
				'</div>' );
		
		//
		//g212A_menuRowOrder_current
		$('.g212A_menuRow:eq(' + g212A.currCard + ')').addClass('g212A_menuRow_current');
		$('.g212A_menuRow:eq(' + g212A.currCard + ') .g212A_menuRowOrder').addClass('g212A_menuRowOrder_current');
		$('.g212A_menuRow:eq(' + g212A.currCard + ') .g212A_menuRowItem').addClass('g212A_menuRowItem_current');
		
		
		
		//●○※ g212A_menuRow的滑鼠事件處理
		$('.g212A_menuRow:eq(' + index + ')')
		
				.on('mouseover',function(){
					if(index !== g212A.currCard){
						$('.g212A_menuRow:eq(' + index + ')').addClass('g212A_menuRow_hover');
						$('.g212A_menuRowOrder:eq(' + index + ')').addClass('g212A_menuRowOrder_hover');
						$('.g212A_menuRowItem:eq(' + index + ')').addClass('g212A_menuRowItem_hover');
						
					}else{
						$('.g212A_menuRow:eq(' + index + ')').css({'cursor':'default'});
					}
				})
				.on('mouseout',function(){
					$('.g212A_menuRow:eq(' + index + ')').removeClass('g212A_menuRow_hover');
					$('.g212A_menuRowOrder:eq(' + index + ')').removeClass('g212A_menuRowOrder_hover');
					$('.g212A_menuRowItem:eq(' + index + ')').removeClass('g212A_menuRowItem_hover');
				})
				
				//
				.on('mousedown',function(){
					
					//
					g212A.prevOrNextClicked = "";
					
					
					//●
					if(index !== g212A.currCard){
						
						//●1050315
						//===================================
						g212A.oldCard = g212A.currCard;
						//===================================
						
						
						//
						$('.g212A_menuZone').css({'opacity':1.0}).slideUp(250,function(){
							
							$('.g212A_menuZone').remove();
							//
							$('.g212A_menuCloseBtn').trigger('mousedown');
							
							//指定序號換頁
							//====================================
							g212A.currCard = index;
							
							//
							g212A.openItemKeep(g212A.currCard);
							
							//
							g212A.nextNPrevBtnState();
							//
							g212A.loadCardComm(); 
							//====================================
							
						});
					
					}
					
				});
				
		
    });
	
	
	
	//●○※ 當menu (.g212A_menuZone) 開啟時，點擊G212A頁面，與點iframe所連結頁面，自動關閉選單
	//●○※●○※●○※●○※●○※●○※●○※●○※●○※●○※●○※●○※●○※●○※
	//*********************************************************************
	//點擊在body標籤上
	/*$('body').on('mousedown',function(e){ 
	
		//alert(e.target.className + '/' + e.target.tagName);
		if(g212A.menuOpen === true){
			if( e.target.tagName.toLowerCase() === "body"){ 
				$('.g212A_menuCloseBtn').trigger('mousedown');
			}
		}
	});*/
	
	
	//點擊在.pageWrapper上
	$('.pageWrapper').on('mousedown',function(e){ 
	
		//alert(e.target.className + '/' + e.target.tagName);
	
		if(g212A.menuOpen === true){
			$('.g212A_menuCloseBtn').trigger('mousedown');
			g212A.menuOpen = false;
		}
	});
	
	
	//●○※ 處理iframe所連結的網頁內容被點擊的滑鼠事件處理
	//============================================================			
	try{ 
		//●Chrome本機端無法存取iframe裡面的網頁物件(會有ERROR)，線上則可以。
		//Uncaught SecurityError: Failed to read the 'contentDocument' property from 'HTMLIFrameElement':
		// Blocked a frame with origin "null" from accessing a frame with origin "null". Protocols, domains, and ports must match.
					
		//var iFrame1=document.getElementsByClassName("g212A_contentFrame") ;
		
		var $iFrame1 = $(".g212A_contentFrame") ;
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
			
			
			if(g212A.menuOpen === true){
				$('.g212A_menuCloseBtn').trigger('mousedown');
				g212A.menuOpen = false;
				
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
			if(g212A.menuOpen === true){
				$('.g212A_menuCloseBtn').trigger('mousedown');
				g212A.menuOpen = false;
			}
		});
		
		$clickTarget_2.on('mousedown',function(e){
			//alert(e.target.className + '/' + e.target.tagName);
			if(g212A.menuOpen === true){
				$('.g212A_menuCloseBtn').trigger('mousedown');
				g212A.menuOpen = false;
			}
		});
		
		$clickTarget_3.on('mousedown',function(e){
			//alert(e.target.className + '/' + e.target.tagName);
			if(g212A.menuOpen === true){
				$('.g212A_menuCloseBtn').trigger('mousedown');
				g212A.menuOpen = false;
			}
		});
		
		$clickTarget_4.on('mousedown',function(e){
			//alert(e.target.className + '/' + e.target.tagName);
			if(g212A.menuOpen === true){
				$('.g212A_menuCloseBtn').trigger('mousedown');
				g212A.menuOpen = false;
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

//依序號換頁時，檢查與調整g212A_nextBtn、g212A_prevBtn按鈕狀態
g212A.nextNPrevBtnState = function(){
	
	if(g212A.currCard > 0){
		$('.g212A_prevBtn').css({'opacity':g212A.prevNextBtnOpacity,'cursor':'pointer'});
	}else{
		$('.g212A_prevBtn').css({'opacity':g212A.prevNextBtnEdgeOpacity,'cursor':'default'});
	}
	
	if(g212A.currCard < g212A.totalCard-1){
		$('.g212A_nextBtn').css({'opacity':g212A.prevNextBtnOpacity,'cursor':'pointer'});
	}else{
		$('.g212A_nextBtn').css({'opacity':g212A.prevNextBtnEdgeOpacity,'cursor':'default'});
	}
	
	
};


/*g212A (多頁版型) HTML架構排板 - $('.pageWrapper')、*/
g212A.layout = function(){
		//
	$('.g212A_menuBtn').html('<img src=' + param.mainPath + 'g212A_AccordionMedia/images/menuBtn.png' + '>');
	//
	$('.g212A_prevBtn').html('<img src=' + param.mainPath + 'g212A_AccordionMedia/images/leftBtn.png' + '>');
	//
	$('.g212A_nextBtn').html('<img src=' + param.mainPath + 'g212A_AccordionMedia/images/rightBtn.png' + '>');
	
	
	
	//※$('.g212A_prevBtn, .g212A_nextBtn')皆有作用時，透明度設為 g212A.prevNextBtnOpacity
	$('.g212A_prevBtn, .g212A_nextBtn').css({'opacity':g212A.prevNextBtnOpacity});	
	
	//第一頁，$('.g212A_prevBtn')必須標示無作用 - ※透明度設為 g212A.prevNextBtnEdgeOpacity
	$('.g212A_prevBtn').css({'opacity':g212A.prevNextBtnEdgeOpacity,'cursor':'default'});
	
	//若只有一頁時，$('.g212A_nextBtn')也必須標示無作用 - ※透明度設為 g212A.prevNextBtnEdgeOpacity
	if(g212A.totalCard <= 1){
		$('.g212A_nextBtn').css({'opacity':g212A.prevNextBtnEdgeOpacity,'cursor':'default'});
	}
	
	//alert($(document.body).children().length);
	//alert(jQuery.cssNumber.zIndex);
	
	//
	//$(document).children().each(function(index, element) {
        //alert($(this).css('z-index'));
   // });
	
};



//●●●佈署 手風琴版面 & ●●●滑鼠事件
g212A.createAccordion = function(){
	
	//var accordionTag = '<div class="g212A_accordionDiv"></div>';
	
	var itemGroupTag = '<div class="g212A_itemGroupDiv"></div>';
	
	var itemUnit = '<div class="g212A_itemUnit">' + 
						'<div class="g212A_itemHeader">' + 
							'<span class="g212A_itemHeader_order"></span>' + 
							'<span class="g212A_itemHeader_title"></span>' + 
						'</div>' + 
						'<div class="g212A_itemBody"></div>' + 
					'</div>';
					
	//
	$('.g212A_accordionDiv').html(itemGroupTag);
	
	//
	var promptMessageTag = 
		'<div class="g212A_promptLine">' + 
			'<span class="g212A_promptMessageIcon"><img></span>' + 
			'<span class="g212A_promptMessageString">' + 
			g212A.promptMessageStr + 
			'</span>' + 
		'</div>';
		
	//
	$('.g212A_itemGroupDiv').append(promptMessageTag);
	$('.g212A_promptMessageIcon > img').attr('src', param.mainPath + 'g212A_AccordionMedia/images/arrow_right.png');
	
	//
	$.each(g212A.cardTitle,function(index){
		$('.g212A_itemGroupDiv').append(itemUnit);
		$('.g212A_itemHeader_order:eq(' + index + ')').append((index+1));
		$('.g212A_itemHeader_title:eq(' + index + ')').append(g212A.cardTitle[index]);
		
		
		//●mouseover
		//====================================================================
		$('.g212A_itemUnit:eq(' + index + ') .g212A_itemHeader').on('mouseover',function(){
			//●
			if(index !== g212A.currCard){
				$('.g212A_itemHeader:eq(' + index + ')').addClass('g212A_itemHeader_hover');
			}
		});
		
		
		//●mouseout
		//====================================================================
		$('.g212A_itemUnit:eq(' + index + ') .g212A_itemHeader').on('mouseout',function(){
			//●
			if(index !== g212A.currCard){
				$('.g212A_itemHeader:eq(' + index + ')').removeClass('g212A_itemHeader_hover');
			}
		});
		
		
		//●●●mousedown - (index !== g212A.currCard)
		//====================================================================
		//====================================================================
		$('.g212A_itemUnit:eq(' + index + ') .g212A_itemHeader').on('mousedown',function(){
			
			//
			g212A.prevOrNextClicked = "";
			
			
			
			//●
			if(index !== g212A.currCard){
				
				//mousedown之前會有一個mouseover事件觸發附加了class：g212A_itemHeader_hover。
				//所以，mousedown之後，必須移除這class。
				//否則，再點擊其他手風琴項目，會發現剛離開焦點的項目會處於mouseover的class外觀。
				$('.g212A_itemHeader:eq(' + index + ')').removeClass('g212A_itemHeader_hover');
				
				
				//if(g212A.itemKeepIndex !== g212A.currCard){
				
					//●1050315
					//===================================
					g212A.oldCard = g212A.currCard;
					//===================================
					
					//
					//$('.g212A_menuZone').css({'opacity':1.0}).slideUp(250,function(){
						
						//$('.g212A_menuZone').remove();
						//
						//$('.g212A_menuCloseBtn').trigger('mousedown');
						
						//指定序號換頁
						//====================================
						g212A.currCard = index;
						//
						g212A.nextNPrevBtnState();
						//
						g212A.loadCardComm(); 
						//====================================
						
					//});
				
				//}
			
			
			
			//●1050407 - ●●●點墼的手風琴項目的索引(index) === 作用中(開啟)的手風琴項目的索引(g212A.currCard)
			//====================================================================
			}else if(index === g212A.currCard){
				
				//點墼的手風琴項目的索引(index) 不等於 ※○已闔起來的作用中手風琴的索引，即作用中手風琴項目並未闔起來。
				if(g212A.itemKeepIndex !== index){
					
					//點墼後，作用中手風琴會闔起來，g212A.itemKeepIndex索引設為作用中手風琴項目的索引g212A.currCard
					g212A.itemKeepIndex = g212A.currCard; 
					
					
					//.g212A_itemBody的高度設為0，就闔起來了。
					$('.g212A_itemBody:eq(' + (g212A.currCard) + ')').animate({'height':'0'},360,function(){
						
						//作用中且開啟的手風琴項目，若被點擊，會闔起來。此時，.g212A_itemBody會被附加.g212A_itemBody_keep 所串接
						//當被打開，或非作用中時。.g212A_itemBody_keep會被移除
						$('.g212A_itemBody:eq(' + (g212A.currCard) + ')').addClass('g212A_itemBody_keep');
						
						$('.g212A_itemBody:eq(' + (g212A.currCard) + ') .g212A_contentFrame').empty().remove(); 
						$('.g212A_itemBody:eq(' + (g212A.currCard) + ')').html(g212A.contentFrameTag);
						  
					});
					
				
				//點墼的手風琴項目的索引(index) 等於 ※○已闔起來的作用中手風琴的索引
				//g212A.itemKeepIndex：※○已闔起來的作用中手風琴 的 索引
				}else if(g212A.itemKeepIndex === index){
					//
					g212A.itemKeepIndex = -1; //點墼後，已合起來的作用中手風琴會張開，其索引號 設為-1
					
					////作用中且開啟的手風琴項目，若被點擊，會闔起來。此時，.g212A_itemBody會被附加.g212A_itemBody_keep 所串接
						//當被打開，或非作用中時。.g212A_itemBody_keep會被移除
					$('.g212A_itemBody:eq(' + (g212A.currCard) + ')').removeClass('g212A_itemBody_keep');
					
					//$('.g212A_itemBody:eq(' + (g212A.currCard) + ')').html(g212A.contentFrameTag);
					
					g212A.oldCard = g212A.currCard;
					
					g212A.loadCardComm();
				
				}
				
					
				
			}
			//====================================================================
			
			
			
		});
		
		
		
		
		
	});
	
	//1050316
	//$('.g212A_itemGroupDiv').append('<div class="g212A_itemGroupBottom"></div>');
	
};


//
g212A.openItemKeep = function(index){
	
	if(g212A.itemKeepIndex === index){
		
		$('.g212A_itemBody:eq(' + (index) + ')').removeClass('g212A_itemBody_keep');
		
		//$('.g212A_itemBody:eq(' + (g212A.currCard) + ')').html(g212A.contentFrameTag);
		
		//g212A.currCard = index;
		//g212A.oldCard = g212A.currCard;
		
		//
		g212A.itemKeepIndex = -1;
		
	}
	
};




//A.將所有.g212A_card資料存入g212A.cardPath陣列
//B.若已完成將所有.g212A_card資料存入g212A.cardPath陣列，則刪除網頁上所有.g212A_card
g212A.createDataArr = function(){
	//
	$('.g212A_card').each(function(index) {
		
		//●將所有.g212A_card資料存入g212A.cardPath陣列
		g212A.cardTitle[index] = $('.g212A_card:eq(' + index + ') .title').text();
		g212A.cardPath[index] = $('.g212A_card:eq(' + index + ') .path').text();
		g212A.cardHeight[index] = parseInt($('.g212A_card:eq(' + index + ') .height').text());
		
		
		//若已完成將所有.g212A_card資料存入g212A.cardPath陣列
		if(index === $('.g212A_card').length-1){
			//alert(g212A.cardPath[0]);
			//alert(g212A.cardPath.length);
		}
		
		
    });
};


//1041028
//抓取第一個擁有class名為 topic 的jQuery物件的 text()內容，做為html文件的標題。相當於<title></title>內容。
method.addDocumentTitle = function(){
	//A
	//document.title = $('.topic:eq(0)').text();
	
	//B - 1041119
	if(document.title !== ""){
		$('.topic:eq(0)').text(document.title);
		//alert($('.topic:eq(0)').html());
	}
	
};






//
//$(document).ready(function(){
$(document).ready(function(){

	//●整體縮放頁面 - 強迫設定為1.0，以避免播放控制失常
	//============================
	$('body').css('zoom','1.0');
	//============================
	
	
	//alert( $(window).width() );
	
	
	//啟動媒體播放相關處理
	//===================================
	//
	method.addDocumentTitle();

	//
	utils.userAgentProp();
	utils.detectBrowserVersion();
	//===================================
	
	
	//●g212A
	//===================================
	g212A.createDataArr();
	//
	g212A.totalCard = g212A.cardPath.length; //alert(g212A.totalCard);
	//===================================
	
	
	//
	g212A.contentFrameTag = '<iframe class="g212A_contentFrame" name="g212A_contentFrame" frameborder="0"></iframe>';
	
	
	//小尺寸視窗時，會將.g212A_nextBtn、.g212A_prevBtn、.g212A_pageSwitchUi置入.g212A_rwdNavDiv
	//.g212A_rwdNavDiv則放在.g212A_header之後
	g212A.rwdBtnHtml = '<div class="g212A_rwdNavDiv"></div>';
	
	
	//1050510 - tPlayer_CSSPath本來在tPlayer.js裡面有給值了，但在這版型抓不到，所以重新給一次。
	/*--------------------------------------------*/
	param.commong2Index = param.mainPath.lastIndexOf('/'); //alert(param.commong2Index);
	param.tPlayerPath = param.mainPath.substring(0,param.commong2Index+1) + "tPlayer/"; //alert(param.tPlayerPath);
	param.tPlayer_CSSPath = param.mainPath.substring(0,param.commong2Index+1) + "tPlayer_CSS/"; //alert(param.tPlayer_CSSPath);
	/*--------------------------------------------*/
	
	
		
	//●g212A
	//===================================
	//●g212A 之 HTML架構排板
	g212A.layout();
	//===================================
	
	
	
	g212A.createAccordion(); 
	
	
	g212A.loadFirstCard();
	
	
	
	//●g212A
	//g212A.prevNextEvent();
	g212A.prevEvent();
	g212A.nextEvent();
	
	
	
	//開啟menu按鈕 事件處理
	//====================================
	g212A.menuBtnMouseEvent();
	//====================================

	
	// IE6~IE8
	method.lessThenIE9Css();
	
	
	//
	$(window).trigger('resize');
	
	
	
	
});




//>>>=============================================================>>>
})(jQuery); //↑↑↑


























