// JavaScript Document - G2│tPlayer.js
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
var c21Quiz = NOU.namespace('NOU.modules.c21Quiz');
//------------------------
var loadJs = NOU.namespace('NOU.features.loadJs');


//===================================================
utils.userAgent = navigator.userAgent.toLowerCase();
utils.version = 0;
utils.isMobile = false;
utils.isIOS = false;
utils.isAndroid = false;
utils.isIE10 = false;
utils.currentBrowser = "";
//
utils.orientation = "";
utils.browserWH = {};
//===================================================

//---------------------------------
urlObj.rtmpMediaURLArr = [];
urlObj.iosMediaURLArr = [];
urlObj.rtspMediaURLArr = [];
urlObj.progressiveMediaURLArr = [];
urlObj.pcHttpMediaURLArr = [];
//---------------------------------

//---------------------------------
//Streaming時，所採用通訊協定 - #新增
param.rtmpProtocol = 'rtmp';
param.appleHlsProtocol = 'http';
param.rtspProtocol = 'rtsp';
param.localProtocol = "";
param.httpProtocol = 'http';
//播放技術 -
param.playModeArr = [];
//媒體檔在HTML主檔定義的[路徑(章/)+檔名]
param.mediaURLArr = [];
param.mediaFileExtArr = [];
param.mediaAutoPlayArr = [];
//param.currMediaURL = "";
//狀態旗標
param.jsReady = false;
param.flashReady = false;
param.playingFlagArr = [];
param.updateTimerFlagArr = [];
param.fullScreenFlagArr = [];
/*只要有一個媒體檔處於全畫面狀態就為true，全部非全畫面，為false*/
param.fullScreenAdjustFlag = false;
param.order = [];
param.currMediaIndex = -1;
//
param.loadedArr = [];
//
param.mediaWidthArr = [];
param.mediaHeightArr = [];
param.beforeOrAfter = []; //播放介面在上還是在下
//
param.totalTimeArr = [];
param.currTimeArr = [];
param.endingFlagArr = [];
//
param.initInfo = {};
param.initInfo.initPosXArr = [];
param.initInfo.initPosYArr = [];
//
//儲存timeCode的陣列 - timeCode在HTML裡面設定
param.timeCodeArr = [];
//---------------------------------
//
//●●●1050406 - 在IE，不可使用param.swfMediaObj做為swf的物件屬性，有可能是param物件與swf的Html param衝突到了
tPlayer.swfMediaObj = []; //tPlayer.swfMediaObj[index] - swf(媒體)物件的●參照
tPlayer.h5MediaObj = []; //h5MediaObj - Html5 media物件●參照
//
param.mediaParent = [];
param.mediaNextTagObj = [];
//
param.h5MediaObjId = '';
//
param.h5FullScreen = false;

param.commong2Index = 0; 
param.commonG2Path = "";
param.tPlayerPath = ""; 
param.tPlayer_CSSPath = ""; 
param.mainSwfPath = "";
param.playerUIPrefixPath = "";

//排版模式：有兩種。normal ↑ rwd。
param.layoutType = [];
//
param.trackX = [];
//
//程式初始化時，會抓取.pageWrapper的width和min-height的字串值並存入
//這是為了當由rwd模式回到normal模式，需要將.pageWrappe的恢復到初始尺寸
param.currW = '';
//param.currH = '';
//是否有.mediaHeader
param.hasMediaHeader = [];

//是否處於點小圖放大圖狀態
param.isBig = false;

//上層寬度
param.parentWidth = 0;
//各個上層元素的margin-left、margin-right、padding-left、padding-right、border-left-width、border-right-width之加總，用來微調媒體寬度：
param.parentWidthAdjust = 0;





//●○●○●○1040819 - 移到g207v10_InVideoQuiz.js
//======================================
/*$(window).load(function(){
	//●整體縮放頁面 - 強迫設定為1.0，以避免播放控制失常
	//============================
	$('body').css('zoom','1.0');
	//============================

	//alert(typeof(NOU.modules.tPlayer.method.getPath));
	//alert(typeof(method.getPath));
	
	//已經移到 g207v10_InVideoQuiz.js
	method.getPath();
	method.pageInit();
	method.init();

});*/
//======================================


//縮放頁面
/*$(function() {
	var r = document.body.offsetWidth / window.screen.availWidth;
	$(document.body).css("-webkit-transform","scale(" + r + ")");
});

$(window).resize(function() {
	var r = document.body.offsetWidth / window.screen.availWidth;
	$(document.body).css("-webkit-transform","scale(" + r + ")");
	$(document.body).css("-moz-transform","scale(" + r + ")");
	$(document.body).css("transform","scale(" + r + ")");
});*/


//=-==========================================================
/*! Copyright 2011, Ben Lin (http://dreamerslab.com/)
* Licensed under the MIT License (LICENSE.txt).
*
* Version: 1.0.3
*
* Requires: jQuery 1.2.3+
*/
$.preload = function(){
	var imgs = Object.prototype.toString.call( arguments[ 0 ]) === '[object Array]' ? arguments[ 0 ] : arguments;
	
	var tmp = [];
	var i   = imgs.length;
	
	// reverse loop run faster
	for( ; i-- ; ){
		tmp.push( $( '<img />' ).attr( 'src', imgs[ i ]));
	}
};
//=-==========================================================


//
method.getPath = function(){ //alert(getPath);
	/*--------------------------------------------*/
	param.commong2Index = param.mainPath.lastIndexOf('/'); //alert(param.commong2Index);
	param.tPlayerPath = param.mainPath.substring(0,param.commong2Index+1) + "tPlayer/"; //alert(param.tPlayerPath);
	param.tPlayer_CSSPath = param.mainPath.substring(0,param.commong2Index+1) + "tPlayer_CSS/"; //alert(param.tPlayer_CSSPath);
	/*--------------------------------------------*/

	//
	param.mainSwfPath = param.tPlayerPath + 'tPlayer.swf'; //alert(param.mainSwfPath);
	//
	param.playerUIPrefixPath = param.tPlayer_CSSPath; //alert(param.tPlayer_CSSPath);
	
	//----------------------------------------------------------《《《
		//設定為「不自動播放」時，會出現「播放按鈕圖示」，按下即可開始播放，此為其圖檔路徑。
		param.coverPlayIconPrefixPath = param.tPlayer_CSSPath + "playerUI/"; //alert(param.coverPlayIconPrefixPath);
		//「播放按鈕圖示」圖檔檔名。
		param.coverPlayIconName = "coverPlayIcon.png";
	//----------------------------------------------------------《《《
		
	//
	method.getLocalMediaPath();
	
	//
	method.preloadPhoto();

};
//
method.getLocalMediaPath = function(){
	//●○Flash和HTML5所認知的本機路徑不同
	switch(param.playModeArr[0]) {
		case 'flash': //從「Common/tPlayer/」目錄裡的tPlayer.swf 指向localMedia目錄的路徑
			param.localDirectoryRoot = "../../localMedia/";
		break;
		case 'html5': //html5 使用param.localDirectoryRoot 所指定的路徑
			//
		break;
		default:
			//console.log('');
		break;
	}
};

//1041112 - ●○預載圖檔
method.preloadPhoto = function(){
	//1041021 coverPlayIcon_over.png
	//=-==============================================
	$.preload(param.coverPlayIconPrefixPath + param.coverPlayIconName, param.coverPlayIconPrefixPath + 'coverPlayIcon_over.png');
	//=-==============================================
};


method.pageInit = function() {
   param.jsReady = true;
};

method.init = function(){
	//---------------------
	//utils.userAgentProp();
	//---------------------
	//utils.detectBrowserVersion(); 
	//utils.detectBrowser(); //目前不是這種寫法
	//---------------------
	//method.choosePlayMode();
	//---------------------
	utils.getBrowserWH();
	//---------------------

	//---------------------
	
	//1041113 - ◎○◎ 在此判斷為行動裝置後，載入 jquery.mobile.custom.min.js
	//----------------------------------------------------------------
	/*if(utils.isMobile){
		loadJs.meet(param.jQMobilePath, function(){
			//utils.getOrientation();	
		});
	}*/
	//----------------------------------------------------------------
	
	//
	method.initData();

	//================
	//method.deployment();
	//================


	//控制('#info')資訊顯示區塊的位置
	$(window).on('scroll',function(){
		//
		$('#info').animate({'top':$(document).scrollTop()},0);
		
	});


	//●跳出「導學」或稱「想一想」面板(以燈箱跳出) - ●●●延遲0.5秒跳出
	if($('#promptDiv').get(0) !== undefined){
		setTimeout(method.guidingPrompt,500);
	}
	

};


//
/*utils.getOrientation = function(){
	//$(document).on("pagecreate",function(event){
		$(window).on("orientationchange",function(event){
			//alert("Orientation changed to: " + event.orientation + '/WinW- : ' + document.documentElement.clientWidth + '/winH- : ' + document.documentElement.clientHeight);
			//alert("Orientation changed to: " + event.orientation + '/WinW- : ' + $(window).width() + '/winH- : ' + $(window).height());
			utils.orientation = event.orientation;
			alert("Orientation changed to: " + utils.orientation + '/WinW- : ' + $(window).width() + '/winH- : ' + $(window).height());
		});
	//});
};*/


//
method.initData = function(){
	
	//---> 10503 - 如此CSS中，Media Query小尺寸，就可把.pageWrapper寬度設為100%
	//●●●初始化頁面時，若為大尺寸視窗，則擷取CSS檔中的$('.pageWrapper')的寬度。若為小尺寸視窗，則不擷取。
	//大約在行2624~2626，當視窗從小尺寸拉大到大尺寸時，會以param.currW的數值重新控制$('.pageWrapper')的寬度
	if( $(window).width() > param.breakpoint){
		//param.currW最為大尺寸視窗初始化頁面時，紀錄$('.pageWrapper')的寬度。
		param.currW = $('.pageWrapper').css('width');
		//param.currH = $('.pageWrapper').css('min-height');
		//alert(param.currW+'/'+param.currH);
		
	}
	
	
};

//----------------------------------------------
utils.getBrowserWH = function(){
	utils.browserWH.w = $(window).width();
	utils.browserWH.h = $(window).height();
};
//----------------------------------------------


//暫存 - 顯示資訊測試用
utils.showUtils = function(){
	//●
	//------------------------------------------------
	jQuery.each( jQuery.browser, function( i, val ) {
	  $( "<div>" + i + " : <span>" + val + "</span>" + "</br>")
	  .appendTo($('#info'));
	});

	$('#info').append('======================</br>');
	$('#info').append(utils.userAgent+'</br>');
	//------------------------------------------------

	/*alert('utils.isMobile: ' + utils.isMobile + '\n' +
			'utils.isIOS: ' + utils.isIOS + '\n' +
			'utils.isAndroid: ' + utils.isAndroid + '\n' +
			'utils.currentBrowser: ' + utils.currentBrowser + '\n' +
			'utils.userAgent: ' + utils.userAgent + '\n'
		);*/
};


//◎沒用到。  ●改變處理方式 ->> ●在normal和rwd狀態下，皆以父層寬度做為.mediaWrapper(媒體檔)的寬度。但父層為.pageWrapper則處理方式不同
//===========================================================================================
//●◎1050118 - 雖然在HTML裡面已經設定媒體寬度，但因應.mediaWrapper外圍仍可能有容器，且可能有設定margin、padding、border-width
//所以必須預防性叛斷處理此問題。
//===========================================================================================
method.mediaWidthAjust = function(_currParent){
	
	//param.parentWidthAdjust = 0;
	
	var tmpW = parseInt(_currParent.css('padding-left')) +
			  parseInt(_currParent.css('padding-right')) +
			  parseInt(_currParent.css('margin-left')) +
			  parseInt(_currParent.css('margin-right')) +
			  parseInt(_currParent.css('border-left-width')) +
			  parseInt(_currParent.css('border-right-width'));
	
	//param.parentWidthAdjust += tmpW;
	param.parentWidthAdjust = tmpW;
	//alert(param.parentWidthAdjust);
				
};
//=================================================================
//=================================================================



//●○●○●○ 佈署 ●○●○●○
method.deployment = function(){
	
	//針對：●InVideoQuiz而處理
	//==========================================
	//1050323 - 加入條件式
	if($('.quizSet').get(0) !== undefined){
		
		//●○將HTML裡面的TimeCode資料取出存入param.timeCodeArr陣列
		//-------------------------------------------------
		method.createTimeCodeArr();
		//-------------------------------------------------
		
	}
	//==========================================
	
	
	

	//●○●○●○ 取得媒體後半段路徑與檔名 + 選取播放模式 + 選擇嵌入媒體
	//--------------------------------------------------------------------------
	$('.mediaWrapper').each(function(index) {

		//param.mediaURLArr[index]：媒體檔在HTML主檔定義的[路徑(章/)+檔名]
        param.mediaURLArr[index] = $('.mediaWrapper:eq('+index+') .mediaTarget').text();
		$('#info').append(param.mediaURLArr[index]+'</br>');
		
		
		
		//===========================================================================================
		//●◎1050118 - 雖然在HTML裡面已經設定媒體寬度，但因應.mediaWrapper外圍仍可能有容器，且可能有設定margin、padding、border-width
		//所以必須預防性叛斷處理此問題。
		//===========================================================================================
		
		//alert($('.mediaWrapper:eq('+index+')').parentsUntil('.pageWrapper').length);
		//alert($('.mediaWrapper:eq('+index+')').parentsUntil('body').length);
		//$('.mediaWrapper:eq('+index+')').parentsUntil('body') ---> ●不包括body
		//alert($('.mediaWrapper:eq('+index+')').parents().get(2).className); //pageWrapper
		//alert($('.mediaWrapper:eq('+index+')').parents().get(3).tagName); //BODY
		//alert($('.mediaWrapper:eq('+index+')').parents().get(0)); //●為HTML標籤
		//●到body之前，有多少父層
		//var parentCount = $('.mediaWrapper:eq('+index+')').parentsUntil('body').length;
		
		//if(parentCount > 0){
			
			/*for(var i=0; i<=parentCount; i++){
				//●◎
				method.mediaWidthAjust( $( $('.mediaWrapper:eq('+index+')').parents().get(i) ) );
				//alert(param.parentWidthAdjust);
			}*/
			
			/*if($('.mediaWrapper:eq('+index+')').parent().get(0).tagName !== "BODY"){
				param.parentWidth = $('.mediaWrapper:eq('+index+')').parent().width();
			}else{
				//alert('上層不可為BODY');
			}*/
			
			
			//●在normal和rwd狀態下，皆以父層寬度做為.mediaWrapper(媒體檔)的寬度。但父層為.pageWrapper則處理方式不同
			//●1050120 - 先以HTML中的寬高設定值，存入寬高的陣列當中
			param.mediaWidthArr[index] = parseInt($('.mediaWrapper:eq('+index+') .mediaWidth').text()); 
			param.mediaHeightArr[index] = parseInt($('.mediaWrapper:eq('+index+') .mediaHeight').text());
			
			
			//媒體檔(影音)之寬高比
			var mediaW2hRatio;
			
			
			//取得寬高比mediaW2hRatio
			if(param.mediaHeightArr[index] === 0){
				mediaW2hRatio = param.mediaWidthArr[index]/1;
			}else{
				mediaW2hRatio = param.mediaWidthArr[index]/param.mediaHeightArr[index];
			}
			
			
			//●●●●●● 1050127 - 1050420
			//=======================================================
			var autoWidth = false;
			//
			if( $('.mediaWrapper:eq('+index+') .full').get(0) ){
				autoWidth = true;	
			}
			//
			param.parentWidth = $('.mediaWrapper:eq('+index+')').parent().width();
			
			//
			if(autoWidth){
				param.mediaWidthArr[index] = param.parentWidth; 
			}else{
				//
			}
			//=======================================================
			
			
			
			//=========================================================
			//○○○1050328 - ●●● 必要 - G205、G206在iOS中，小尺寸RWD才能作用 ●●●
			//=========================================================
			//if(utils.isMobile && utils.isIOS){
				
				/*if(param.mediaWidthArr[index] > param.breakpoint){
					//param.mediaWidthArr[index] = param.breakpoint;
					param.mediaWidthArr[index] = $(window).width();
				}*/
				
				
				//alert($(window).width() + '' + $(parent.window).width() + '' + param.breakpoint);
				
				
				//if(param.G2ID === "G205" || param.G2ID === "G206"){
				
					/*if($(window).width() <= param.breakpoint){
						param.mediaWidthArr[index] = $(window).width();
					}
					
					if($(parent.window).width() <= param.breakpoint){
						param.mediaWidthArr[index] = $(parent.window).width();
					}*/
				
				//}
				
			
			//}
			//=========================================================
			//另於CSS中：
			//●iOS必要處理 - 在小尺寸RWD必須將.mediaWrapper、.mediaDiv固定數字且大於param.breakpoint(Media Query斷點)的寬設為auto，或小於斷點
			//=========================================================
			

			//
			param.mediaHeightArr[index] = param.mediaWidthArr[index]/mediaW2hRatio;
			
			
		//}
		
		//===========================================================================================
		//===========================================================================================	
		
		
		
								
		//1040911 - 擷取播放介面在上(before)或在下(after)的設定資訊，存入陣列。
		param.beforeOrAfter[index] = $('.mediaWrapper:eq('+index+') .beforeOrAfter').text();

		//●○擷取副檔名，存進param.mediaFileExtArr陣列
		//method.getMediaFileExtention(param.mediaURLArr[index], index);
		param.mediaFileExtArr[index] = param.mediaURLArr[index].slice(-4);


		//1040513修改 - 是否自動播放，改為在HTML裡設定(.mediaAutoPlay)
		if($('.mediaWrapper:eq('+index+') .mediaAutoPlay').text() === "true"){
			param.mediaAutoPlayArr[index] = true;
		}else if($('.mediaWrapper:eq('+index+') .mediaAutoPlay').text() === "false"){
			param.mediaAutoPlayArr[index] = false;
		}
		$('#info').append('第' + index + '個媒體檔，' + '是否自動播放? : ' + param.mediaAutoPlayArr[index]+'</br>');
		
		
		//1041106 - ●是否有 .mediaHeader
		if($('.mediaWrapper:eq(' + index + ') .mediaHeader').get(0) === undefined){
			param.hasMediaHeader[index] = false;
		}else if($('.mediaWrapper:eq(' + index + ') .mediaHeader').get(0) !== undefined){
			param.hasMediaHeader[index] = true;
		}
		
		//
		param.playingFlagArr[index] = false;
		
		//1051019
		param.loadedArr[index] = false;
		
		

		//NOU Media Icon圖檔、個人筆記notebook圖檔、新手上路help圖檔載入
		//---------------------------------------------------
		//NOU Media Icon
		if(param.hasNOUMediaIconFlag){
			//加入nou_media.png圖形
			
			//如果externaldData.js的param.nouMediaIconPath不是空字串，就使用param.nouMediaIconPath的路徑檔名定義，
			//否則用tPlayer/images/裡面的nou_media.png
			if(param.nouMediaIconPath === undefined || param.nouMediaIconPath === "" || typeof param.nouMediaIconPath !== "string"){
				param.nouMediaIconPath = param.tPlayer_CSSPath + "images/nou_media.png";
			}
		
			$('.mediaWrapper:eq('+index+') .icon').append('<img src=' + param.nouMediaIconPath + '>')
						.attr('title', param.nouMediaComment); 
						//alert(param.nouMediaIconPath);
			
		}
		
		//旭聯平台/筆記本
		if(param.hasNotebookFlag){
					
			if(param.notebookIconPath === undefined || param.notebookIconPath === "" || typeof param.notebookIconPath !== "string"){
				param.notebookIconPath = param.tPlayer_CSSPath + "images/notebook.png";
				param.notebookIconOverPath = param.tPlayer_CSSPath + "images/notebook_over.png";
			}
			
			$('.mediaWrapper:eq('+index+') .notebook')
					.append('<a><img src=' + param.notebookIconPath + '></a>')
					.attr('title', param.notebookComment);

		}
		
		//新手上路
		if(param.hasHelpFlag){
			
			if(param.helpIconPath === undefined || param.helpIconPath === "" || typeof param.helpIconPath !== "string"){ 
				param.helpIconPath = param.tPlayer_CSSPath + "images/help.png";
				param.helpIconOverPath = param.tPlayer_CSSPath + "images/help_over.png"; 
			}
			
			$('.mediaWrapper:eq('+index+') .help')
					.append('<a><img src=' + param.helpIconPath + '></a>')
					.attr('title', param.helpComment); 
					
					
		}
		//---------------------------------------------------
		//連結(旭聯平台)筆記本(個人筆記)按鈕事件
		method.noebookMouseEvent(index);
		//help滑鼠事件
		method.helpMouseEvent(index);
		//---------------------------------------------------

		
		//賦值給 urlObj (urlObj：媒體連結網址物件)
		//●method.getStreamingData(index)會回傳所有通訊協定的[特定索引]媒體網址 的上層物件，
		urlObj = method.getStreamingData(index);
		//$('#info').append(urlObj.rtmpMediaURLArr[index]+'</br>');
		


		//●●●1050129 - 《●此處隱藏，改到各本版型處理。●》
		//============================
		//method.embedMedia(index);
		//============================
		
		
		//媒體介面是否有進場jQ動作 ? 
		//●這一定要在 method.embedMedia(index) 之後調用，移到各版型主程式調用。
		//===================================●
		/*if(param.hasEnteringMotion){
			//媒體介面進場jQ動作 
			method.entering(index);
		}*/
		//===================================●
		
		
    });
	//↑↑↑↑↑↑ each() ↑↑↑↑↑↑
	//--------------------------------------------------------------------------
	
	
	//●○●○●○1041015移到此處 - method.deployment()方法裡面。
	//==============================
	method.winOnResize();
	//==============================
	
	
	
	
	if($('.fontSizeSwitcher').get(0) !== undefined){
		//
		method.createFontSizeSwitcher();
	}
	
	
	
	/*if($('.glossary').get(0) !== undefined){
		method.glossary();
		
	}*/
	
	/*if($('.toBigPic').get(0) !== undefined){
		method.createMagnifierIcon();
	}*/
	
	/*$(window).on('orientationchange',function(e){
		alert(e.orientation);
	});
	
	$(window).trigger('orientationchange');*/
	
	
	
	//1050402
	if(utils.isMobile){
		loadJs.meet(param.jQMobilePath, function(){
			//alert("jQMobile loaded");
			
			utils.getOrientation();
			
		});
	}
	
	
	
	
};


utils.getOrientation = function(){
					
		$(window).on("orientationchange",function(event){
			//
			utils.orientation = event.orientation;
			
			//
			try {
				//alert("Orientation changed to: " + utils.orientation + '/WinW- : ' + $(parent.window).width() + '/winH- : ' + $(parent.window).height());
			}catch(err){
			}
			
			//
			//setTimeout(function(){
				$(window).trigger('resize');
			//},180);
			
			
			
			//○● 1050512
			if( param.fullScreenFlagArr[param.currMediaIndex] ){
				
				
				//○● - 關閉全畫面
				//---------------------------------------
				if(param.playModeArr[0] === "flash"){
					tPlayer.swfMediaObj[param.currMediaIndex] = document.getElementById("tPlayer_"+param.currMediaIndex.toString());
					method.normalScreenObjAjust(tPlayer.swfMediaObj[param.currMediaIndex],param.mediaWidthArr[param.currMediaIndex],param.mediaHeightArr[param.currMediaIndex], param.currMediaIndex);
			
				}else if(param.playModeArr[0] === "html5"){
					method.normalScreenObjAjust(tPlayer.h5MediaObj[param.currMediaIndex],param.mediaWidthArr[param.currMediaIndex],param.mediaHeightArr[param.currMediaIndex], param.currMediaIndex);
			
				}
				//---------------------------------------
			
			}
			
			
		});
		
};



//
method.createFontSizeSwitcher = function(){
	
	//取得初始字型大小 - 會擷取為px字串，再parseInt()為整數
	var getInitfontSize = [];
	$('.fontSize').each(function(index) { 
		//alert( $('.fontSize:eq(' + index + ')').css('font-size') );
        getInitfontSize[index] = parseInt( $('.fontSize:eq(' + index + ')').css('font-size') );
    });
	
	
	
	var switcherHtml = 
		'<span class="word"><img src=' + param.mainPath + "tPlayer_CSS/fontSizeSwitcher/fontSizeWord.png" + ' alt="恢復字級" title="恢復字級"></span>' + 
		'<span class="reduce"><img src=' + param.mainPath + "tPlayer_CSS/fontSizeSwitcher/fontSizeReduce.png" + ' alt="減小字級" title="減小字級"></span>' + 
		'<span class="increase"><img src=' + param.mainPath + "tPlayer_CSS/fontSizeSwitcher/fontSizeIncrease.png" + ' alt="加大字級" title="加大字級"></span>';
	
	
	//附加控制元件
	//---------------------------------------------------
	$('.fontSizeSwitcher').prepend(switcherHtml);
	
	//1051115
	var fontSizeOffsetMax = 8;
	var fontSizeOffsetMin = -6;
	var fontSizeOffset = [];
	
	//1051115
	$('.fontSize').each(function(index) {
		fontSizeOffset[index] = 0;
	});
	
	
	//減小字級
	//---------------------------------------------------
	$('.fontSizeSwitcher .reduce')
			.on('mouseover',function(){
				$('.fontSizeSwitcher .reduce img').attr('src', param.mainPath + "tPlayer_CSS/fontSizeSwitcher/fontSizeReduce_over.png");
			})
			.on('mouseout',function(){
				$('.fontSizeSwitcher .reduce img').attr('src', param.mainPath + "tPlayer_CSS/fontSizeSwitcher/fontSizeReduce.png");
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
				$('.fontSizeSwitcher .increase img').attr('src', param.mainPath + "tPlayer_CSS/fontSizeSwitcher/fontSizeIncrease_over.png");
			})
			.on('mouseout',function(){
				$('.fontSizeSwitcher .increase img').attr('src', param.mainPath + "tPlayer_CSS/fontSizeSwitcher/fontSizeIncrease.png");
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
				$('.fontSizeSwitcher .word img').attr('src', param.mainPath + "tPlayer_CSS/fontSizeSwitcher/fontSizeWord_over.png");
			})
			.on('mouseout',function(){
				$('.fontSizeSwitcher .word img').attr('src', param.mainPath + "tPlayer_CSS/fontSizeSwitcher/fontSizeWord.png");
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


//媒體介面進場jQ動作
method.entering = function(index){
	//●○1041028 - 進場
	$('.mediaWrapper:eq('+index+') .mediaHeader').slideUp(0);
	$('.mediaWrapper:eq('+index+') .mediaDiv, .mediaWrapper:eq('+index+') .mediaDiv > object').fadeOut(0);
	$('.mediaWrapper:eq('+index+')').slideUp(320,function(){
		$('.mediaWrapper:eq('+index+') .mediaHeader').slideDown(360);
		$('.mediaWrapper:eq('+index+') .mediaDiv, .mediaWrapper:eq('+index+') .mediaDiv > object').fadeIn(0);
		$('.mediaWrapper:eq('+index+')').slideDown(280);
	});
};


//連結(旭聯平台)筆記本(個人筆記)按鈕事件
method.noebookMouseEvent = function(index){
	$('.mediaWrapper:eq('+index+') .notebook img').on('mouseover',function(){
		$(this).attr('src', param.notebookIconOverPath);
	});
	$('.mediaWrapper:eq('+index+') .notebook img').on('mouseout',function(){
		$(this).attr('src', param.notebookIconPath);
	});
	$('.mediaWrapper:eq('+index+') .notebook img').on('mousedown',function(){
		$('.mediaWrapper:eq('+index+') .notebook a').attr({'href':param.notebookUrl,target:'_blank'});
	});
};

//help滑鼠事件
method.helpMouseEvent = function(index){
	$('.mediaWrapper:eq('+index+') .help img').on('mouseover',function(){
		$(this).attr('src', param.helpIconOverPath);
	});
	$('.mediaWrapper:eq('+index+') .help img').on('mouseout',function(){
		$(this).attr('src', param.helpIconPath);
	});
	$('.mediaWrapper:eq('+index+') .help img').on('mousedown',function(){
		$('.mediaWrapper:eq('+index+') .help a').attr({'href':param.helpUrl,target:'_blank'});
	});
};

//沒用到
method.getMediaFileExtention = function(_mediaTargetStr, index){
	param.mediaFileExtArr[index] = _mediaTargetStr.slice(-4);

	/*switch(captureStr){
		case '.mp4':
		break;
		case '.mp3':
		break;
		case 'm4a':
		break;
		default:
		break;
	}*/

	//return param.mediaFileExtArr;
};


//●選擇嵌入何種播放技術
//=================================================
method.embedMedia = function(index){
	switch(param.playModeArr[0]) {
		case 'flash':
			//param.currMediaURL = param.playModeArr[1];
			//method.embedFlashMedia(index);

			//
			//●○●○●○
			switch(param.mediaFileExtArr[index]){
				case ".mp4":
					method.embedFlashMedia(index);
					break;
				case ".m4a":
					method.embedFlashMedia(index);
					break;
				case ".mp3": //.mp3這裡準備開始用Sound來寫。
					//embedFlashSound(index);
					method.embedFlashMedia(index);
					break;
				default:
					break;
			}

		break;
		case 'html5':
			//param.currMediaURL = param.playModeArr[1];
			method.embedH5Media(index);

		break;

		case 'hlsHtml5':
			//param.currMediaURL = param.playModeArr[1];
			method.embedHlsJsH5Media(index);

		break;

		default:
			//console.log('只能選擇「method.embedFlashMedia()」，或「embedHtml5()」');
		break;
	}
};
//=================================================



//embedFlashMedia
method.embedFlashMedia = function(index){
	
	//
	param.mediaParent[index] = $('.mediaWrapper:eq(' + index + ') ').parent().get(0).className;
	//
	var swfObjId = "tPlayer_" + index.toString();
	//var swfName = "01/tPlayer" + '.swf'; //alert(swfName);

	//●○
	//------------------------------------------------
	//alert(isNaN(param.mediaWidthArr[index]));
	//alert(isNaN(param.mediaWidthArr[index]));

	//param.mediaWidthArr儲存HTML裡的寬度設定
	//如果HTML中的媒體寬度設定值param.mediaWidthArr[index]，不是Number型態，
	//就將externalData.js中的param.swfScopeWidth指定給param.mediaWidthArr[index]
	if(isNaN(param.mediaWidthArr[index])){
		param.mediaWidthArr[index] = param.swfScopeWidth;
	}else if(isNaN(param.mediaWidthArr[index])){
		//
	}
	//param.mediaWidthArr儲存HTML裡的高度設定
	if(isNaN(param.mediaHeightArr[index])){
		param.mediaHeightArr[index] = param.swfScopeHeight;
	}else{
		//
	}
	//------------------------------------------------

	var embedFlashMediaHtml =
	'<object id=' + swfObjId + '  name=' + swfObjId + ' type="application/x-shockwave-flash" data=' + param.mainSwfPath + ' width="' + param.mediaWidthArr[index] + '" height="' + param.mediaHeightArr[index] + '">'+
		'<param name="movie" value=' + param.mainSwfPath + '>'+
		'<param name="quality" value="high">'+
		'<param name="wmode" value="transparent" />'+
		'<param name="allowScriptAccess" value="always">'+
		'<param name="allowFullScreen" value="true" />'+
		'<param name="allowsFullScreenInteractive" value="true" />'+

		'<embed src=' + param.mainSwfPath + ' width="' + param.mediaWidthArr[index] + '" height="' + param.mediaHeightArr[index] + '" quality="high" wmode="transparent" type="application/x-shockwave-flash" allowScriptAccess="always" allowFullScreen="true">'+
			'<noembed>'+
				'<img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player">'+
			'</noembed>'+
		'</embed>'+

		'<a href="http://www.adobe.com/go/getflash"></a>'+
	'</object>';

	//alert(embedFlashMediaHtml);

	//●●●
	$('.mediaDiv:eq(' + index + ')').prepend(embedFlashMediaHtml);



	//●●●1050406 - 在IE，不可使用param.swfMediaObj做為swf的物件屬性，有可能是param物件與swf的Html param衝突到了
	//==================================================================
	tPlayer.swfMediaObj[index] = document.getElementById("tPlayer_"+index.toString());
	//==================================================================
	//alert(tPlayer.swfMediaObj[index].id);
	
	

	//1040518●○
	//-----------------------------
	param.order[index] = index;
	//-----------------------------
	param.currMediaIndex = index;
	


	//此處不需設定$('.mediaDiv:eq(' + index + ')')的高度，CSS中.mediaDiv已設定高度為auto，因此.mediaDiv會隨影音高度縮張，
	//$('.mediaDiv:eq(' + index + ')').width('100%')/*.height(as3VideoScopeHeight)*/;

	//1040519 - ●○.mediaDiv的初始寬度已在css設為100%，所以會遵循.mediaWrapper的寬度 ???
	$('.mediaWrapper:eq(' + index + ')').width(param.mediaWidthArr[index]);
	$('.mediaDiv:eq(' + index + ')').height(param.mediaHeightArr[index]);


	//1040519 - ●○ 不可用 display:hidden 隱藏 swf，有些瀏覽器會無法播放
	//播放Bar的高度
	/*var playbackDivHeight = parseInt($('.mediaWrapper:eq(' + index + ') .playbackDiv').css('height')); 
	//alert(playbackDivHeight);
	if(isNaN(playbackDivHeight)){
		playbackDivHeight = 0;
	}*/
	//.mediaHeader的高度
	/*var headerHeight = parseInt($('.mediaWrapper:eq(' + index + ') .mediaHeader').css('height'));
	if(isNaN(headerHeight)){
		headerHeight = 0;
	}*/



	//●○●○●○1040521 - 處理：多個Flash媒體檔播放，滑鼠在flash上方，mousemove時，播放頭和進度條來回閃爍之異狀 問題。 (IE有問題，IE8沒問題)
	//策略是做一個透明色塊壓在flash上，如此是可以避免異狀發生。
	//*******************************************************************************************************
	$('.mediaDiv:eq(' + index + ')').append('<span class="mediaDivOverlay"></span>');


	//●○1040629 - $('.mediaWrapper:eq(' + index + ') .mediaDivOverlay')的屬性控制
	//===================================================
	var mediaDivOverlay_marginTop;

	//●◎播放介面在影音上方
	if(param.beforeOrAfter[index] === "before"){
		mediaDivOverlay_marginTop = -(param.mediaHeightArr[index]);

	//◎播放介面在影音下方
	}else if(param.beforeOrAfter[index] === "after"){
		mediaDivOverlay_marginTop = -(param.mediaHeightArr[index]);
	}
	//alert(mediaDivOverlay_marginTop);

	//alert($('.mediaDiv:eq(' + index + ')>.playbackDiv').get(0) != undefined);
	$('.mediaWrapper:eq(' + index + ') .mediaDivOverlay').css({'margin-top':mediaDivOverlay_marginTop,'opacity':param.mediaDivOverlayOpacity, 'width':param.mediaWidthArr[index], 'height':param.mediaHeightArr[index]});
	//===================================================


	//*******************************************************************************************************
	
	
	if(param.hasCustomControls){
	
		if($(window).width() > param.breakpoint){
			param.layoutType[index] = "normal";
			
			//1041012
			method.createPbHtml(index);
			method.getPlaybackUI(index);
			
			method.mouseVisualState(index);
			method.playbackMouseEvent(index);
			
			
		}else if($(window).width() <= param.breakpoint){
			param.layoutType[index] = "rwd";
			
			//1041012
			method.createPbLessThenBPHtml(index);
			method.getPlaybackUILessThenBP(index);
			
			method.mouseVisualState(index);
			method.playbackMouseEvent_2(index);
		}
		
		
		
	}else{
		$('.mediaWrapper:eq(' + index + ') .playbackDiv').height(0).css({'display':'none'});
		
		//1041209
		if($(window).width() > param.breakpoint){
			param.layoutType[index] = "normal";
			
		}else{
			param.layoutType[index] = "rwd";
			
			
			//●○1041210 - 這裏若不使用$(window).trigger('resize')，以小尺寸視窗進入頁面，會沒有啟動rwd。直到調整視窗大小才觸發rwd。
			//●○1041210 - 這裏若不使用setTimeout，$(window).trigger('resize')會沒作用
			//=================================================
			setTimeout(function(){
				$(window).trigger('resize');
			},180);
			//=================================================
			
			
		}
		
	}
	

};



//
//《★》Hls.js《★》
//embedHlsJsH5Media
method.embedHlsJsH5Media = function(index){
	//
	$($('.mediaWrapper:eq(' + index + ') ').next().get(0)).addClass('currMediaNextTag');
	param.mediaNextTagObj[index] = $('.currMediaNextTag:eq(' + index + ')');
	//alert($(param.mediaNextTagObj[index]).get(0).tagName);
	//alert($(param.mediaNextTagObj[index]).get(0).className);
	
	//
	param.mediaParent[index] = $('.mediaWrapper:eq(' + index + ') ').parent().get(0).className;
	
	
	//
	param.h5MediaObjId = "html5Media" + index.toString();



	var embedH5MediaHtml =
	'<video id="' + param.h5MediaObjId + '">'+
	/*'<source class="source" type="video/mp4" />'+ */
	'您的瀏覽器不支援 HTML5 Video Tag，所以無法播放本單元教材，請嘗試更換瀏覽器以解決無法瀏覽問題。'+
	'</video>';
	//
	//alert(embedH5MediaHtml);

	//●●●
	$('.mediaDiv:eq(' + index + ')').prepend(embedH5MediaHtml);
	//
	

	if (Hls.isSupported()) {
		//alert('HLS');

		//var video = document.getElementById(param.h5MediaObjId);
		tPlayer.h5MediaObj[index] = document.getElementById( param.h5MediaObjId );
	//alert(tPlayer.h5MediaObj[index].id);


      	var hls = new Hls();
     	 // bind them together
		  hls.attachMedia(tPlayer.h5MediaObj[index]);
		  

		  //Html5 Media各種內建事件
			//-------------------------
			method.attachH5MediaEvent(index);
			//-------------------------

		  
      	hls.on(Hls.Events.MEDIA_ATTACHED, function () {
			console.log("video and hls.js are now bound together !");


			//
			tPlayer.h5MediaObj[index].width = param.mediaWidthArr[index];
			tPlayer.h5MediaObj[index].height = param.mediaHeightArr[index];

			//1040520 - ●○.mediaDiv的初始寬度已在css設為100%，所以會遵循.mediaWrapper的寬度
			$('.mediaWrapper:eq(' + index + ')').width(param.mediaWidthArr[index]);

			//1040520 -
			//播放Bar的高度
			var playbackDivHeight = parseInt($('.mediaWrapper:eq(' + index + ') .playbackDiv').css('height'));
			if(isNaN(playbackDivHeight)){
				playbackDivHeight = 0;
			}
			//.mediaHeader的高度
			var headerHeight = parseInt($('.mediaWrapper:eq(' + index + ') .mediaHeader').css('height'));
			if(isNaN(headerHeight)){
				headerHeight = 0;
			}

		
			//●◎○1070119 - 開啟Wowza Streaming Engine 4.7.3之後，在PC Chrome可播放
			//hls.loadSource("http://192.192.49.223:1935/vod/_definst_/5298/mp4:g202/5-1.mp4/playlist.m3u8");
			
			//空大COD的串流媒體 - 可播放。
			//hls.loadSource("http://codc.nou.edu.tw/Segments/HLS_TS/segsrc/300816/300816_01.m3u8");
			//hls.loadSource("http://codc.nou.edu.tw/Segments/HLS_TS/segsrc/300816/300k/300816_01.mp4-20140101-000000.m3u8");
			//hls.loadSource("http://codc.nou.edu.tw/Segments/HLS_TS/segsrc/300816/500k/300816_01.mp4-20140101-000000.m3u8");
			hls.loadSource("http://codc.nou.edu.tw/Segments/HLS_TS/segsrc/300816/800k/300816_01.mp4-20140101-000000.m3u8");
			
			
			//空大的串流網址卻不行
			//hls.loadSource("http://lodm.nou.edu.tw:1935/vod/_definst_/5298/mp4:g202/5-1.mp4/playlist.m3u8");
			
			//http://g33ktricks.blogspot.tw/2016/04/list-of-hls-streaming-video-sample-test.html所提供串流網址
			//Apple
			//hls.loadSource("http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8");
		
			hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
				console.log("manifest loaded, found " + data.levels.length + " quality level");
				//tPlayer.h5MediaObj[index].play();

				if( param.mediaAutoPlayArr[index] ){
		
					//1051019
					//===========================================
					try {
						tPlayer.h5MediaObj[index].play();
					}catch(err){
					}
					//===========================================
					
					
				}else{
					tPlayer.setPlayFlag(false, index);
				}


		 	
	
	
	//1040518●○
	//-----------------------------
	param.order[index] = index;
	//-----------------------------
	param.currMediaIndex = index;
	

	//param.mediaURLArr
	//============================================
	//var h5MediaSourceObj = document.getElementsByTagName("source")[index];
	//h5MediaSourceObj.src = param.playModeArr[1][index]; //alert(h5MediaSourceObj.src);
	//============================================
	
	//tPlayer.h5MediaObj[index].src = param.playModeArr[1][index];
	
	
	
	

	

	

	//是否自動播放之處置
	//1040504 - 增加tPlayer.setPlayFlag(true, index) 和 tPlayer.setPlayFlag(false, index) - 處理HTML5 Media初始的按鈕狀態
	//param.mediaAutoPlayArr[index] ? (/*tPlayer.setPlayFlag(true, index) & */tPlayer.h5MediaObj[index].play()) : tPlayer.setPlayFlag(false, index);
	
	//1051019將上方條件式簡寫，改寫：
	// if( param.mediaAutoPlayArr[index] ){
		
	// 	//1051019
	// 	//===========================================
	// 	try {
	// 		tPlayer.h5MediaObj[index].play();
	// 	}catch(err){
	// 	}
	// 	//===========================================
		
		
	// }else{
	// 	tPlayer.setPlayFlag(false, index);
	// }
	
	
	//●○●○●○ 1040824
	//-----------------------------------------------------------------
	//是否使用自訂播放介面與控制
	/*param.hasCustomControls
	? (method.getPlaybackUI(index) & method.mouseVisualState(index) & method.playbackMouseEvent(index)) : null;*/
	
	
	//●○●○●○在此根據 斷點param.breakpoint 分派排版型態，並賦值給 param.layoutType[index]
	if(param.hasCustomControls){
		//
		if($(window).width() > param.breakpoint){
			param.layoutType[index] = "normal";
			
			//1041012
			method.createPbHtml(index);
			method.getPlaybackUI(index);
			
			method.mouseVisualState(index);
			method.playbackMouseEvent(index);
			
			
		}else if($(window).width() <= param.breakpoint){
			param.layoutType[index] = "rwd";
			
			//1041012
			method.createPbLessThenBPHtml(index);
			method.getPlaybackUILessThenBP(index);
			
			method.mouseVisualState(index);
			method.playbackMouseEvent_2(index);
		}
		
	}else{
		$('.mediaWrapper:eq(' + index + ') .playbackDiv').height(0).css({'display':'none'});
		
		//1041209
		if($(window).width() > param.breakpoint){
			param.layoutType[index] = "normal";
			
		}else{
			param.layoutType[index] = "rwd";
			
			
			//●○1041210 - 這裏若不使用$(window).trigger('resize')，以小尺寸視窗進入頁面，會沒有啟動rwd。直到調整視窗大小才觸發rwd。
			//●○1041210 - 這裏若不使用setTimeout，$(window).trigger('resize')會沒作用
			//=================================================
			setTimeout(function(){
				$(window).trigger('resize');
			},180);
			//=================================================
			
			
		}
		
	}
	
	//-----------------------------------------------------------------
	

	

	//1040504 - 增加 - 處理HTML5 Media初始的按鈕狀態
	//method.updatePbBtnState(index);

	

	//alert($('.mediaDiv:eq(' + index + ')').height()+'/'+$('.playbackDiv').height());
	
	
});
});

}

};



//embedH5Media
method.embedH5Media = function(index){
	//
	$($('.mediaWrapper:eq(' + index + ') ').next().get(0)).addClass('currMediaNextTag');
	param.mediaNextTagObj[index] = $('.currMediaNextTag:eq(' + index + ')');
	//alert($(param.mediaNextTagObj[index]).get(0).tagName);
	//alert($(param.mediaNextTagObj[index]).get(0).className);
	
	//
	param.mediaParent[index] = $('.mediaWrapper:eq(' + index + ') ').parent().get(0).className;
	
	
	//
	param.h5MediaObjId = "html5Media" + index.toString();


	//●○
	//------------------------------------------------
	//alert(isNaN(param.mediaWidthArr[index]));
	//alert(isNaN(param.mediaWidthArr[index]));

	//param.mediaWidthArr儲存HTML裡的寬度設定
	//如果HTML中的媒體寬度設定值param.mediaWidthArr[index]，不是Number型態，
	//就將externalData.js中的param.swfScopeWidth指定給param.mediaWidthArr[index]
	/*if(isNaN(param.mediaWidthArr[index])){
		param.mediaWidthArr[index] = param.h5VideoScopeWidth;
	}else if(isNaN(param.mediaWidthArr[index])){
		//
	}*/
	//param.mediaWidthArr儲存HTML裡的高度設定
	/*if(isNaN(param.mediaHeightArr[index])){
		param.mediaHeightArr[index] = param.h5VideoScopeHeight;
	}else{
		//
	}*/
	//------------------------------------------------
	

	var embedH5MediaHtml =
	/*'<video controls width='640' height='360' poster='images/poster.jpg'>'+*/
	/*'<video id='html5AudioPlayer' width='320px' height='240px' controls preload='auto'>'+*/
	'<video id=' + param.h5MediaObjId + ' preload="metadata">'+
	/*'<source class="source" type="video/mp4" />'+ */
	'您的瀏覽器不支援 HTML5 Video Tag，所以無法播放本單元教材，請嘗試更換瀏覽器以解決無法瀏覽問題。'+
	/*'<embed height='32' width='640' src=" + param.mediaURLArr[index] + "'>'+*/
	'</video>';

	//●●●
	$('.mediaDiv:eq(' + index + ')').prepend(embedH5MediaHtml);
	//
	tPlayer.h5MediaObj[index] = document.getElementById( param.h5MediaObjId );
	
	
	//1040518●○
	//-----------------------------
	param.order[index] = index;
	//-----------------------------
	param.currMediaIndex = index;
	

	//param.mediaURLArr
	//============================================
	//var h5MediaSourceObj = document.getElementsByTagName("source")[index];
	//h5MediaSourceObj.src = param.playModeArr[1][index]; //alert(h5MediaSourceObj.src);
	//============================================
	
	tPlayer.h5MediaObj[index].src = param.playModeArr[1][index];
	
	
	//1041027---●○ 加這行，使Android Chrome 及 Android 預設瀏覽器 可以開始(或重新)載入Video。
	//----------->>> ●○才能藉由loadedmetadata事件，補獲tPlayer.h5MediaObj[index]的duration媒體長度 - ???
	//1041028 - 
	//●媒體檔在串流端，就算有●行1148： tPlayer.h5MediaObj[index].load()，Android播放之前都抓不到duration，
	//在local端，不用●行1148： tPlayer.h5MediaObj[index].load()，也能在播放前就抓到duration
	//================================================================
	tPlayer.h5MediaObj[index].load();
	//================================================================
	

	//
	tPlayer.h5MediaObj[index].width = param.mediaWidthArr[index];
	tPlayer.h5MediaObj[index].height = param.mediaHeightArr[index];

	//1040520 - ●○.mediaDiv的初始寬度已在css設為100%，所以會遵循.mediaWrapper的寬度
	$('.mediaWrapper:eq(' + index + ')').width(param.mediaWidthArr[index]);

	//1040520 -
	//播放Bar的高度
	var playbackDivHeight = parseInt($('.mediaWrapper:eq(' + index + ') .playbackDiv').css('height'));
	if(isNaN(playbackDivHeight)){
		playbackDivHeight = 0;
	}
	//.mediaHeader的高度
	var headerHeight = parseInt($('.mediaWrapper:eq(' + index + ') .mediaHeader').css('height'));
	if(isNaN(headerHeight)){
		headerHeight = 0;
	}


	//●○微調控制$('.mediaDiv:eq(' + index + ')')的高度
	//若為語音，包括.mp3、.m4a
	//-------------------------------------------------------
	/*if( param.mediaFileExtArr[index] == '.mp3' || param.mediaFileExtArr[index] == '.m4a' ){

		//●如果HTML上的媒體檔高度設定值 小於 播放Bar高度
		if(param.mediaHeightArr[index] < playbackDivHeight){
			//param.mediaHeightArr[index] = playbackDivHeight;
			$('.mediaDiv:eq(' + index + ')').height(playbackDivHeight);
			//alert(param.mediaHeightArr[index] +'/' + playbackDivHeight + '/' + $('.mediaDiv:eq(' + index + ')').height());

			//●○為何需加3
			$('.mediaWrapper:eq(' + index + ') .playbackDiv').css({'top':-playbackDivHeight+3}); //※

		//●如果HTML上的媒體檔高度設定值 大於等於 播放Bar高度
		}else{
			$('.mediaDiv:eq(' + index + ')').height(param.mediaHeightArr[index]);

			//●○為何需加0
			$('.mediaWrapper:eq(' + index + ') .playbackDiv').css({'top':-playbackDivHeight+0}); //※
		}


		//$('.mediaWrapper:eq(' + index + ')').css({'height':'auto'});
		//$('.mediaWrapper:eq(' + index + ')').css({'height':playbackDivHeight});

	//若為影音
	}else{
		$('.mediaDiv:eq(' + index + ')').height(param.mediaHeightArr[index] + playbackDivHeight);

		//$('.mediaDiv:eq(' + index + ')').css({'height':'auto'});
		$('.mediaWrapper:eq(' + index + ') .playbackDiv').css({'top':0});
		//$('.mediaWrapper:eq(' + index + ') .playbackDiv').css({'opacity':1.0});
		//$('.mediaWrapper:eq(' + index + ')').height(param.mediaHeightArr[index] + playbackDivHeight + headerHeight);
	}*/
	//-------------------------------------------------------
	

	//是否自動播放之處置
	//1040504 - 增加tPlayer.setPlayFlag(true, index) 和 tPlayer.setPlayFlag(false, index) - 處理HTML5 Media初始的按鈕狀態
	//param.mediaAutoPlayArr[index] ? (/*tPlayer.setPlayFlag(true, index) & */tPlayer.h5MediaObj[index].play()) : tPlayer.setPlayFlag(false, index);
	
	//1051019將上方條件式簡寫，改寫：
	if( param.mediaAutoPlayArr[index] ){
		
		//1051019
		//===========================================
		try {
			tPlayer.h5MediaObj[index].play();
		}catch(err){
		}
		//===========================================
		
		
	}else{
		tPlayer.setPlayFlag(false, index);
	}
	
	
	//●○●○●○ 1040824
	//-----------------------------------------------------------------
	//是否使用自訂播放介面與控制
	/*param.hasCustomControls
	? (method.getPlaybackUI(index) & method.mouseVisualState(index) & method.playbackMouseEvent(index)) : null;*/
	
	
	//●○●○●○在此根據 斷點param.breakpoint 分派排版型態，並賦值給 param.layoutType[index]
	if(param.hasCustomControls){
		//
		if($(window).width() > param.breakpoint){
			param.layoutType[index] = "normal";
			
			//1041012
			method.createPbHtml(index);
			method.getPlaybackUI(index);
			
			method.mouseVisualState(index);
			method.playbackMouseEvent(index);
			
			
		}else if($(window).width() <= param.breakpoint){
			param.layoutType[index] = "rwd";
			
			//1041012
			method.createPbLessThenBPHtml(index);
			method.getPlaybackUILessThenBP(index);
			
			method.mouseVisualState(index);
			method.playbackMouseEvent_2(index);
		}
		
	}else{
		$('.mediaWrapper:eq(' + index + ') .playbackDiv').height(0).css({'display':'none'});
		
		//1041209
		if($(window).width() > param.breakpoint){
			param.layoutType[index] = "normal";
			
		}else{
			param.layoutType[index] = "rwd";
			
			
			//●○1041210 - 這裏若不使用$(window).trigger('resize')，以小尺寸視窗進入頁面，會沒有啟動rwd。直到調整視窗大小才觸發rwd。
			//●○1041210 - 這裏若不使用setTimeout，$(window).trigger('resize')會沒作用
			//=================================================
			setTimeout(function(){
				$(window).trigger('resize');
			},180);
			//=================================================
			
			
		}
		
	}
	
	//-----------------------------------------------------------------
	

	

	//1040504 - 增加 - 處理HTML5 Media初始的按鈕狀態
	//method.updatePbBtnState(index);

	//Html5 Media各種內建事件
	//-------------------------
	method.attachH5MediaEvent(index);
	//-------------------------

	//alert($('.mediaDiv:eq(' + index + ')').height()+'/'+$('.playbackDiv').height());
	
	
	
	//●○●○●○ 1061128 - HTML5的全螢幕：點擊(click)影音區塊，轉為全螢幕，按esc恢復一般畫面。
	//===========================================================《《《《《《
	$('.mediaWrapper').each(function(index) {
		
		$('#html5Media'+index.toString()).on('dblclick',function(){
		
            //var t = document.getElementById( 'html5Media'+index.toString() );
			
			//
			//tPlayer.h5GoFullScreen(t);
			
			//●1070115
			//tPlayer.toggleFullScreen(t);
        });
		
		
		
		
		
		/*document.addEventListener("keydown", function(e) {
		if (e.keyCode === 13) {
			
			setTimeout(function(){
				//
			$('#html5Media'+index.toString()).attr('controls',false);
			},500);
		  	
			
		}
	  }, false);*/
		
	});
	//===========================================================《《《《
	
	 

};



//建立大尺寸播放介面 Html
method.createPbHtml = function(index){
	
	var playbackHtmlStruc =
	'<div class="pbDivInner">'+
		'<span class="pbLeft"></span>'+
		'<span class="playPause"><img></span>'+
		'<span class="currTime">00:00</span>'+
		//------------------------------------------------------------------------
		'<span class="barOuter">'+
			'<span class="track"><img>'+
				'<span class="progressBar"><img></span>'+
				'<span class="slider"><img></span>'+
			'</span>'+
		'</span>'+
		//------------------------------------------------------------------------
		'<span class="totalTime">00:00</span>'+
		'<span class="fullNormalScreen"><img></span>'+
		'<span class="pbRight"></span>'+
	'</div>';

	//1040911
	var playbackDivHtml = '<div class="playbackDiv"></div>';
	$('.mediaWrapper:eq(' + index + ')').append(playbackDivHtml);
	$('.mediaWrapper:eq(' + index + ') .playbackDiv').html(playbackHtmlStruc);
	
	//
	$('.mediaWrapper:eq(' + index + ') .playPause>img').attr('src',param.playerUIPrefixPath+'playerUI/play.png');
	$('.mediaWrapper:eq(' + index + ') .track>img').attr('src',param.playerUIPrefixPath+'playerUI/track.png');
	$('.mediaWrapper:eq(' + index + ') .progressBar>img').attr('src',param.playerUIPrefixPath+'playerUI/progressBar.png');
	$('.mediaWrapper:eq(' + index + ') .slider>img').attr('src',param.playerUIPrefixPath+'playerUI/slider.png');
	$('.mediaWrapper:eq(' + index + ') .fullNormalScreen>img').attr('src',param.playerUIPrefixPath+'playerUI/fullScreen.png');
};


//建立大尺寸播放介面
method.getPlaybackUI = function(index){

	
	//●○1040911
	//====================================================================================
	//1040519 - ●○ 不可用 display:hidden 隱藏 swf，有些瀏覽器會無法播放
	//播放Bar的高度
	var playbackDivHeight = parseInt($('.mediaWrapper:eq(' + index + ') .playbackDiv').css('height'));
	if(isNaN(playbackDivHeight)){
		playbackDivHeight = 0;
	}
	//.mediaHeader的高度
	var headerHeight = parseInt($('.mediaWrapper:eq(' + index + ') .mediaHeader').css('height'));
	if(isNaN(headerHeight)){
		headerHeight = 0;
	}
	
	
	//1050414 - xxx原在此位置
	
	
	
	//1050420 - 媒體檔(影音)之寬高比
	var mediaW2hRatio = param.mediaWidthArr[index]/param.mediaHeightArr[index];

	
	//●●●●●● 1050127 - 1050420
			//=======================================================
			var autoWidth = false;
			//
			if( $('.mediaWrapper:eq('+index+') .full').get(0) ){
				autoWidth = true;	
			}
			//
			param.parentWidth = $('.mediaWrapper:eq('+index+')').parent().width();
			
			//
			if(autoWidth){
				param.mediaWidthArr[index] = param.parentWidth; 
				param.mediaHeightArr[index] = param.parentWidth/mediaW2hRatio; 
			}else{
				//
			}
			//=======================================================
	
	
	
	
	//
	$('.mediaWrapper:eq(' + index + ') .mediaHeader').width(param.mediaWidthArr[index]);
	
	
	//===============================
	//非 自動播放 - 1041029 - 採HTML5播放技術，考慮行動裝置無法進入頁面就自動播放之因素，所以需增加條件判斷
	if( !param.mediaAutoPlayArr[index] || (param.mediaAutoPlayArr[index] && utils.isMobile) ){
		//●○1041013切換播放介面時，避免『尚未播放，.coverPlayIcon已經存在，又產生一個』的問題。
		if($('.mediaDiv:eq(' + index + ') .coverPlayIcon').get(0) === undefined){
			method.insertCoverImg(index);
		}
	}
	
	
	//====================================================================================
	
	
	//●○1041014 - 必要控制
	//---------------------------------------
	var _mediaObj;
	if(param.playModeArr[0] === "flash"){
		_mediaObj = tPlayer.swfMediaObj[index];

	}else if(param.playModeArr[0] === "html5"){
		_mediaObj = tPlayer.h5MediaObj[index];
	}
	//alert(param.mediaHeightArr[index]);
	_mediaObj.width = param.mediaWidthArr[index];
	
	
	//●●●●●●●1041110 - 當_mediaObj為Flash時，以 Windows IE、FireFox 等「非」Web-kit瀏覽器執行 
	//在HTML中設定mediaHeight高度為0，指定給_mediaObj.height時會擲出例外。SCRIPT87: 不正確的引數。 
	//(Web-kit瀏覽器則可正常執行)
	//所以，加上try...catch來解決。
	//=================================================
	try {
		_mediaObj.height = param.mediaHeightArr[index];
	}catch(err){
		//
	}
	//=================================================
	
	
	//---------------------------------------
	$('.mediaDiv:eq(' + index + ')').width(param.mediaWidthArr[index]);
	$('.mediaDiv:eq(' + index + ')').height(param.mediaHeightArr[index]);
	$('.mediaWrapper:eq(' + index + ')').width(param.mediaWidthArr[index]);
	$('.mediaWrapper:eq(' + index + ') .mediaHeader').width(param.mediaWidthArr[index]);
	//---------------------------------------
	
	
	
	//1050414 - xxx從上方移到此處
	//========================================================
	//●○1040911 - 播放介面在上。
	if(param.beforeOrAfter[index] === "before"){
		$('.mediaWrapper:eq(' + index + ') .playbackDiv').insertBefore($('.mediaDiv:eq(' + index + ')'));
		$('.mediaDiv:eq(' + index + ')').height(param.mediaHeightArr[index]);
		$('.mediaWrapper:eq(' + index + ')').height(param.mediaHeightArr[index] + headerHeight + playbackDivHeight); 
		//alert( $('.mediaWrapper:eq(' + index + ')').height() );
		
	//●○1040911 - 播放介面在下。
	}else if(param.beforeOrAfter[index] === "after"){
		$('.mediaWrapper:eq(' + index + ') .playbackDiv').insertAfter($('.mediaDiv:eq(' + index + ')'));
		$('.mediaDiv:eq(' + index + ')').height(param.mediaHeightArr[index]);
		$('.mediaWrapper:eq(' + index + ')').height(param.mediaHeightArr[index] + headerHeight + playbackDivHeight); 
		//alert( $('.mediaWrapper:eq(' + index + ')').height() );
	}
	
	//alert($('.mediaWrapper:eq(' + index + ')').height());
	//alert(param.mediaHeightArr[index] + '/' + headerHeight + '/' + playbackDivHeight + '///' + $('.mediaWrapper:eq(' + index + ')').height());
	
	
	
		
	//●○1040911 - 留著參考。
	function old(){
		
	//●○※●○※●○※1040911====================================================================================
	//alert($('.mediaDiv:eq(' + index + ')').next('.playbackDiv').get(0).className === "playbackDiv");
	//alert($('.mediaDiv:eq(' + index + ')').nextAll('.playbackDiv').length);
	//alert($('.mediaDiv:eq(' + index + ')').next('.playbackDiv').get(0));
	//alert($('.mediaDiv:eq(' + index + ')').hasClass('playbackDiv'));
	//alert($('.mediaDiv:eq(' + index + ')>.playbackDiv').get(0));

	//●◎播放介面在語音上方 《●.playbackDiv在.mediaWrapper之內的第一層子系，但不在.mediaDiv下方》
	if($('.mediaWrapper:eq(' + index + ')>.playbackDiv').get(0) !== undefined && $('.mediaDiv:eq(' + index + ')').nextAll('.playbackDiv').get(0) === undefined){
		//alert();
		$('.mediaDiv:eq(' + index + ')').height(param.mediaHeightArr[index]);
		$('.mediaWrapper:eq(' + index + ')').height(param.mediaHeightArr[index] + headerHeight + playbackDivHeight);
		
		
	//◎若播放介面.playbackDiv放在.mediaHeader裡面  《●則將.playbackDiv移到.mediaDiv下方》
	}else if($('.mediaWrapper:eq(' + index + ') .mediaHeader .playbackDiv').get(0) !== undefined){
		$('.mediaWrapper:eq(' + index + ') .mediaHeader .playbackDiv').insertBefore($('.mediaDiv:eq(' + index + ')'));
		$('.mediaDiv:eq(' + index + ')').height(param.mediaHeightArr[index]);
		$('.mediaWrapper:eq(' + index + ')').height(param.mediaHeightArr[index] + headerHeight + playbackDivHeight);
		

	//◎若播放介面.playbackDiv放在.mediaDiv裡面  《●則將.playbackDiv移到.mediaDiv下方》
	}else if($('.mediaDiv:eq(' + index + ') .playbackDiv').get(0) !== undefined){
		
		$('.mediaWrapper:eq(' + index + ') .playbackDiv').insertAfter($('.mediaDiv:eq(' + index + ')'));
		$('.mediaDiv:eq(' + index + ')').height(param.mediaHeightArr[index]);
		$('.mediaWrapper:eq(' + index + ')').height(param.mediaHeightArr[index] + headerHeight + playbackDivHeight);
			
		
	//1040910------◎播放介面在語音下方 《●.playbackDiv在.mediaDiv之外的的下方》
	}else if($('.mediaDiv:eq(' + index + ')').nextAll('.playbackDiv').get(0) !== undefined){
		//alert($('.mediaDiv:eq(' + index + ')').nextAll('.playbackDiv').length);
		$('.mediaDiv:eq(' + index + ')').height(param.mediaHeightArr[index]);
		$('.mediaWrapper:eq(' + index + ')').height(param.mediaHeightArr[index] + headerHeight + playbackDivHeight);
		//
	}
	
	//===============================
	//method.insertCoverImg(index);

	//●○※●○※●○※1040911===================================================================================
	
	}
	

	//若為語音，包括.mp3、.m4a - 存留參考
	//------------------------------------------------------------------
	//if( param.mediaFileExtArr[index] === '.mp3' || param.mediaFileExtArr[index] === '.m4a' ){
		//
	//若為影音
	//}else{
		//
	//}
	//------------------------------------------------------------------



	//====================================================================================
	//●但.mediaDiv高度會稍高，和.playbackDiv之間出現縫隙，露出底色。可透過操控height解決 - 沒採用
	//$('.mediaDiv:eq(' + index + ')').width('100%').height(as3VideoScopeHeight);

	//●後來發現：
	//object在CSS Reset之vertical-align屬性值被設為baseline
	//造成.mediaDiv的高度稍高，下方露白
	//●得到解決方案為：
	//在CSS修正object的vertical-align屬性值為top或bottom或middle，解決露白
	//====================================================================================


	//
	$('.mediaWrapper:eq(' + index + ') .slider').css({'left':-9,'display':'block'});
	$('.mediaWrapper:eq(' + index + ') .slider img').css({'opacity':0.8});
	
	
	
	//●●●
	//======================================
	//$('.mediaWrapper:eq(' + index + ') .playbackDiv').width(param.playbackWidth);
	//1040519
	$('.mediaWrapper:eq(' + index + ') .playbackDiv').width(param.mediaWidthArr[index]);
	//alert($('.playbackDiv').width());

	if($('.mediaWrapper:eq(' + index + ') .playbackDiv').width() > $('.mediaDiv:eq(' + index + ')').width()){
		$('.mediaWrapper:eq(' + index + ') .playbackDiv').width($('.mediaDiv:eq(' + index + ')'));
	}
	//======================================



	//●●●
	//==============================================
	method.caculateTrackWidth($('.mediaWrapper:eq(' + index + ') .playbackDiv').width(), index);
	//==============================================
	
	//1040923
	//======================================================================================
	param.trackX[index] = $('.mediaWrapper:eq(' + index + ') .track').offset().left;
	//======================================================================================



	//●○●○●○ - 1040717頁面載入後，直接開啟全畫面 或 隱藏全畫面按鈕
	//------------------------------------------------------------------《《《《《《
	//------------------------------------------------------------------《《《《《《

	//alert($('.mediaWrapper:eq(' + index + ') ').css('position'));
	//alert($('.mediaWrapper:eq(' + index + ') .barOuter').offset().left);

	

};


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

}





//建立小尺寸播放介面 Html
method.createPbLessThenBPHtml = function(index){
	//建立播放介面 - ●○.barOuter、.slider、.playPause、.currTime、.totalTime 需與第一組共用
	var playbackHtmlStruc =
	//------------------------------------------------------------------------
	
		//------------------------------------------------------------------------
		'<div class="barOuter">'+ //
			'<span class="track"><img>'+
				'<span class="progressBar"><img></span>'+
				'<span class="slider"><img></span>'+ //
			'</span>'+
		'</div>'+
		//------------------------------------------------------------------------
		'<div class="pbDivInner">'+
			'<span class="pbLeft"></span>'+
			'<span class="playPause"><img></span>'+ //
			'<span class="currTime">00:00</span>'+
			//------------------------------------------------------------------------
			'<span class="totalTime">00:00</span>'+
			'<span class="pbRight"></span>'+
		'<div>';
		//------------------------------------------------------------------------
		
	//------------------------------------------------------------------------
	
	
	//=========================================================
	//●○1040915 - '<div class="playbackDiv"></div>' 在此定義.playbackDiv的html結構，及其在html中的位置。
	//(原本.playbackDiv在HTML定義，並根據其相對位置決定播放控制Bar在上或在下)，以改成在程式中定義。
	var playbackDivHtml = '<div class="playbackDiv"></div>';
	//●○1040915 - 小尺寸視窗.playbackDiv播放控制Bar皆放在.mediaDiv上方。
	$(playbackDivHtml).insertBefore($('.mediaWrapper:eq(' + index + ') .mediaDiv'));
	$('.mediaWrapper:eq(' + index + ') .playbackDiv').html(playbackHtmlStruc);
	//=========================================================
	
	
	//圖檔
	$('.mediaWrapper:eq(' + index + ') .playPause>img').attr('src',param.playerUIPrefixPath+'playerUI/playPause.png');
	$('.mediaWrapper:eq(' + index + ') .track>img').attr('src',param.playerUIPrefixPath+'playerUI/track_1.png');
	$('.mediaWrapper:eq(' + index + ') .progressBar>img').attr('src',param.playerUIPrefixPath+'playerUI/progressBar_1.png');
	$('.mediaWrapper:eq(' + index + ') .slider>img').attr('src',param.playerUIPrefixPath+'playerUI/slider.png');
	//$('.mediaWrapper:eq(' + index + ') .fullNormalScreen>img').attr('src',param.playerUIPrefixPath+'playerUI/fullScreen.png');
	
	
	//●1050112-取消。皆由CSS、Media Query處理。
	//●1041106-小尺寸時，多附加一個.mediaHeader到.mediaWrapper裡面頂端，.barOuter_2上方。以增加實際.mediaHeader與.barOuter_2的間距
	//================================================================
	/*if( !param.hasMediaHeader[index] ){
		$('<div class="mediaHeader"></div>').prependTo($('.mediaWrapper:eq(' + index + ')'));
		//G202：高度改在CSS - Media Query裡面設定padding-top、padding-bottom  - @media screen and (max-width:640px) {}
	}*/
	//================================================================
	
	
	//1050119
	/*var parentCount = $('.mediaWrapper:eq('+index+')').parentsUntil('body').length;
	for(var i=0; i<=parentCount; i++){
		//●◎
		method.mediaWidthAjust( $( $('.mediaWrapper:eq('+index+')').parents().get(i) ) );
		
	}*/
	
	
	//1050119
	//alert(  $('.mediaWrapper:eq('+index+')').parents().get(0).className );
	//method.mediaWidthAjust( $( $('.mediaWrapper:eq('+index+')').parents().get(0) ) );
	
	
};


//建立小尺寸播放介面
//●○●○●○1040824 - 小尺寸視窗使用，沒有全畫面按鈕 (根據param.breakPoint為斷點，小於等於斷點判斷為小尺寸，則取用此介面應用)
method.getPlaybackUILessThenBP = function(index){
	
	//.slider
	$('.mediaWrapper:eq(' + index + ') .slider').css({'left':-9,'display':'block'});
	$('.mediaWrapper:eq(' + index + ') .slider img').css({'opacity':0.9});
	
	//
	//CSS - 添加新的class
	$('.mediaWrapper:eq(' + index + ') .playbackDiv').addClass('playbackDiv_2');
	//--------------------------------------------------------
	$('.mediaWrapper:eq(' + index + ') .barOuter').addClass('barOuter_2');
	$('.mediaWrapper:eq(' + index + ') .track').addClass('track_2');
	$('.mediaWrapper:eq(' + index + ') .track>img').addClass('track_2>img');
	$('.mediaWrapper:eq(' + index + ') .progressBar').addClass('progressBar_2');
	$('.mediaWrapper:eq(' + index + ') .slider').addClass('slider_2');
	//--------------------------------------------------------
	$('.mediaWrapper:eq(' + index + ') .pbDivInner').addClass('pbDivInner_2');
	$('.mediaWrapper:eq(' + index + ') .pbLeft').addClass('pbLeft_2');
	$('.mediaWrapper:eq(' + index + ') .playPause').addClass('playPause_2');
	$('.mediaWrapper:eq(' + index + ') .currTime').addClass('currTime_2');
	$('.mediaWrapper:eq(' + index + ') .totalTime').addClass('totalTime_2');
	$('.mediaWrapper:eq(' + index + ') .pbRight').addClass('pbRight_2');
	$('.mediaWrapper:eq(' + index + ') .dotSpan').addClass('dotSpan_2');
	
	//
	//這裡也可以添加css屬性
	$('.mediaWrapper:eq(' + index + ') .playbackDiv_2').css({});
	//--------------------------------------------------------
	$('.mediaWrapper:eq(' + index + ') .barOuter_2').css({'opacity':1.0});
	$('.mediaWrapper:eq(' + index + ') .track_2').css({});
	$('.mediaWrapper:eq(' + index + ') .track_2>img').css({});
	$('.mediaWrapper:eq(' + index + ') .progressBar_2').css({});
	$('.mediaWrapper:eq(' + index + ') .slider_2').css({});
	//--------------------------------------------------------
	$('.mediaWrapper:eq(' + index + ') .pbDivInner_2').css({'opacity':1.0});
	$('.mediaWrapper:eq(' + index + ') .pbControl_2').css({});
	$('.mediaWrapper:eq(' + index + ') .pbLeft_2').css({});
	$('.mediaWrapper:eq(' + index + ') .playPause_2').css({});
	$('.mediaWrapper:eq(' + index + ') .currTime_2').css({});
	$('.mediaWrapper:eq(' + index + ') .totalTime_2').css({});
	$('.mediaWrapper:eq(' + index + ') .pbRight_2').css({});
	$('.mediaWrapper:eq(' + index + ') .dotSpan_2').css({});
	
	
	//●○1040911 - 小尺寸視窗，播放介面一定在.mediaDiv媒體區塊上方。
	
	
	////////////////////////////////////////////////////////
	/******************************************************/
	
	//●method.caculateSmallWindows(index) 傳回 [barOuter寬度,媒體寬度,媒體高度]
	//----------------------------------------------------------------
	var mediaAttrs = method.caculateSmallWindows(index);
	//----------------------------------------------------------------
	//●mediaAttrs[0]：barOuter寬度│mediaAttrs[1]：媒體寬度│mediaAttrs[2]：媒體高度
	
	
	//---------------------------------------
	var _mediaObj;
	if(param.playModeArr[0] === "flash"){
		_mediaObj = tPlayer.swfMediaObj[index];

	}else if(param.playModeArr[0] === "html5"){
		_mediaObj = tPlayer.h5MediaObj[index];
	}
	
	
	//
	_mediaObj.width = mediaAttrs[1];
	
	
	//●◎1041208 - 高度設為0，或1，等較小數字，在IE以Flash播放(切換的小尺寸時)可能會產生Error。
	try {
		_mediaObj.height = mediaAttrs[2];
	}catch(err){
		//
	}
	
	//---------------------------------------
	
	
	//1040918 - 必要
	$('.pageWrapper').css({'width':mediaAttrs[3]});
	
	
	
	//●◎1040629 - .mediaDivOverlay位置、尺寸控制
	//===================================================
	var mediaDivOverlay_marginTop;

	//●◎播放介面在影音上方
	if(param.beforeOrAfter[index] === "before"){
		//
		mediaDivOverlay_marginTop = -(mediaAttrs[2]);

	//◎播放介面在影音下方
	}else if(param.beforeOrAfter[index] === "after"){
		//
		mediaDivOverlay_marginTop = -(mediaAttrs[2]);
		
		//●○●○●○1040911 - 位置才正確 - ●○1040915 - 不適合用這個方法
		//$('.mediaWrapper:eq(' + index + ') .playbackDiv').appendTo($('.mediaDiv:eq(' + index + ')'));
		
	}

	//alert($('.mediaDiv:eq(' + index + ')>.playbackDiv').get(0) != undefined);
	$('.mediaWrapper:eq(' + index + ') .mediaDivOverlay').css({'margin-top':mediaDivOverlay_marginTop,'opacity':param.mediaDivOverlayOpacity, 'width':mediaAttrs[1], 'height':mediaAttrs[2]});
	//===================================================
	
	

	//1040904 - 轉移位置至此
	////////////////////////////////////////////////////////
	/******************************************************/
	method.jqUITouchPunchDrag_2(index);	////////////////////////////////////////////////////////
	/******************************************************/
	
	
	//---------------------------------------------------------
	//●○●○●○1040902
	//================================================
	method.adjustInSmallWindows(index);
	//================================================
	
	
	//===============================
	//非 自動播放 - 1041029 - 採HTML5播放技術，考慮行動裝置無法進入頁面就自動播放之因素，所以需增加條件判斷
	if( !param.mediaAutoPlayArr[index] || (param.mediaAutoPlayArr[index] && utils.isMobile) ){
		//●○1041013切換播放介面時，避免『尚未播放，.coverPlayIcon已經存在，又產生一個』的問題。
		if($('.mediaDiv:eq(' + index + ') .coverPlayIcon').get(0) === undefined){
			method.insertCoverImg(index);
		}
	}
	
	
	
	//●○1040923
	//======================================================================================
	param.trackX[index] = $('.mediaWrapper:eq(' + index + ') .track_2').offset().left;
	//======================================================================================
	

	

};


//調整小尺寸視窗
method.adjustInSmallWindows = function(index){
	
	//
	//播放Bar的高度 --> .barOuter_2高度 + .pbDivInner_2高度
	var playbackDivHeight = parseInt($('.mediaWrapper:eq(' + index + ') .barOuter_2').css('height')) + parseInt($('.mediaWrapper:eq(' + index + ') .pbDivInner_2').css('height')); 
	if(isNaN(playbackDivHeight)){
		playbackDivHeight = 0;
	}
	
	//.mediaHeader的高度
	var headerHeight = parseInt($('.mediaWrapper:eq(' + index + ') .mediaHeader').css('height'));
	if(isNaN(headerHeight)){
		headerHeight = 0;
	}
	//alert(playbackDivHeight + '/' + headerHeight);
	
	
	////////////////////////////////////////////////////////
	/******************************************************/
	
	//●method.caculateSmallWindows(index) 傳回 [barOuter寬度,媒體寬度,媒體高度]
	//----------------------------------------------------------------
	var mediaAttrs = method.caculateSmallWindows(index);
	//----------------------------------------------------------------
	//●mediaAttrs[0]：barOuter寬度│mediaAttrs[1]：媒體寬度│mediaAttrs[1]：媒體高度
	
	
	//---------------------------------------
	var _mediaObj;
	if(param.playModeArr[0] === "flash"){
		_mediaObj = tPlayer.swfMediaObj[index];

	}else if(param.playModeArr[0] === "html5"){
		_mediaObj = tPlayer.h5MediaObj[index];
	}
	
	
	
	//●◎1041208 - 高度設為0，或1，等較小數字，在IE以Flash播放(切換的小尺寸時)可能會產生Error。
	try {
		//
		_mediaObj.width = mediaAttrs[1];
		_mediaObj.height = mediaAttrs[2];
	}catch(err){
		//
	}
	//---------------------------------------
	
	//
	$('.mediaWrapper:eq(' + index + '), .mediaWrapper:eq(' + index + ') .mediaDiv,  .mediaWrapper:eq(' + index + ') .mediaHeader').width(mediaAttrs[1]);
	$('.mediaWrapper:eq(' + index + ') .mediaDiv').height(mediaAttrs[2]);
	//alert(mediaAttrs[2]);
	//
	//1040918 - 必要
	$('.pageWrapper').css({'width':mediaAttrs[3]});
	//$('.pageWrapper').width(mediaAttrs[3]);
	
	
	//●
	//$('.showInfo').append(mediaAttrs[1] +'/' + mediaAttrs[3] + '/' + param.parentWidthAdjust + '<br>');
	
	
	
	
	//●◎1040629 - .mediaDivOverlay位置、尺寸控制
	//===================================================
	var mediaDivOverlay_marginTop;

	//●◎播放介面在影音上方
	if(param.beforeOrAfter[index] === "before"){
		//
		mediaDivOverlay_marginTop = -(mediaAttrs[2]);

	//◎播放介面在影音下方
	}else if(param.beforeOrAfter[index] === "after"){
		//
		mediaDivOverlay_marginTop = -(mediaAttrs[2]);
		
		//●○●○●○1040911 - 位置才正確 - ●○1040915 - 不適合用這個方法
		//$('.mediaWrapper:eq(' + index + ') .playbackDiv').appendTo($('.mediaDiv:eq(' + index + ')'));
		
	}

	//alert($('.mediaDiv:eq(' + index + ')>.playbackDiv').get(0) != undefined);
	$('.mediaWrapper:eq(' + index + ') .mediaDivOverlay').css({'margin-top':mediaDivOverlay_marginTop,'opacity':param.mediaDivOverlayOpacity, 'width':mediaAttrs[1], 'height':mediaAttrs[2]});
	//===================================================
	
	
	//
	$('.mediaWrapper:eq(' + index + ') .slider_2').draggable("destroy"); //1040930
	//==============================================
	$('.mediaWrapper:eq(' + index + ') .barOuter_2').width(mediaAttrs[0]);
	$('.mediaWrapper:eq(' + index + ') .track_2').width(mediaAttrs[0]-18);
	//==============================================
	//
	method.jqUITouchPunchDrag_2(index);
	

	//
	//=====================
	method.removeDotSpan2();
	method.putDot2();
	//=====================


	//●○1040630 - 全螢幕狀態中暫停時，跳回一般狀態，必須有method.updateProgress(index)，
	//才能更新播放位置，否則播放頭位置與進度列長度會不正確
	//=====================
	method.updateProgress(index);
	//=====================
	
	
	
	//●○必要控制，否則兩個媒體播放區塊之間會失去空隙
	//※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※
	$('.mediaDiv:eq(' + index + ')').height(mediaAttrs[2]);
	$('.mediaWrapper:eq(' + index + ')').height(mediaAttrs[2] + headerHeight + playbackDivHeight);
	//※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※
	
	
	//●○●○●○1040915 - 全畫面狀態下，遇到暫停點，.mediaDiv的高度會撐得很大，把.playbackDiv(播放控制列)往下帶到很底端，超出頁面所以看不到。
	//●○●○●○所以，必須設定mediaDiv的高度，且將.mediaDiv的css屬性overflow設為hidden。
	//=======================================================================================
	$('.mediaWrapper:eq(0) .mediaDiv').css({'overflow':'hidden'});
	//=======================================================================================
	
	
	//調整位置：大play圖示按鈕。
	method.adjustCoverImgPos(index,2);
		

	//
	//●○微調控制：評量、小反思...等的屬性
	//-------------------------------------------------------
	
	
	//1040915 - ●○1040917
	//《《《《《《《《《《《《===========================================《《《《《《《
	//
	method.quizAdjust();
	//
	method.reflectionAdjust();
	
	

	
};

//計算小尺寸視窗 寬高 、barOuterWidth 、 param.trackX[index]
//●○※●○※●○※●○※●○※●○※●○※●○※●○※●○※
method.caculateSmallWindows = function(index){
	
	//媒體檔(影音)之寬高比
	var mediaW2hRatio = param.mediaWidthArr[index]/param.mediaHeightArr[index];
	
	/*if( utils.currentBrowser === "msie" ){
		
	}*/
	
	
	//●●●1050120 - 擷取$('.mediaWrapper:eq('+index+')')的父層寬度，做為其寬度
	param.parentWidth = $('.mediaWrapper:eq('+index+')').parent().width();
	//alert( $('.mediaWrapper:eq('+index+')').parent() );
	//alert( parseInt($('.mediaWrapper:eq('+index+')').css('margin-left')) + '/' + parseInt($('.mediaWrapper:eq('+index+')').css('padding-left')) + '/' + parseInt($('.mediaWrapper:eq('+index+')').css('border-left-width')));
	
	
	/*var $tmpParent = $('.mediaWrapper:eq('+index+')').parent();
	var tmpParentWidth= $('.mediaWrapper:eq('+index+')').parent().width();*/
	
	//alert( parseInt($('.mediaWrapper:eq('+index+')').parent().css('margin-left')) + '/' + parseInt($('.mediaWrapper:eq('+index+')').parent().css('padding-left')) + '/' + parseInt($('.mediaWrapper:eq('+index+')').parent().css('border-left-width')));
	
	/*param.parentWidth = tmpParentWidth - 
		parseInt($tmpParent.css('padding-left')) - 
		parseInt($tmpParent.css('padding-right')) - 
		parseInt($tmpParent.css('border-left-width')) - 
		parseInt($tmpParent.css('border-right-width'));*/
			
	//===================================
	//取得視窗寬高
	utils.getBrowserWH();
	//指定視窗寬高
	var _winW = utils.browserWH.w;
	var _winH = utils.browserWH.h;
	//alert(_winW + '/' + _winH);
	//===================================
	
	
	//●計算小尺寸視窗使用的 mediaWidth 和 mediaHeight 的值
	var mediaWidth;
	var mediaHeight;
	//================================================================
		//mediaWidth = param.parentWidth; //●●●1050120 - 上面有擷取$('.mediaWrapper:eq('+index+')')的父層寬度，做為其寬度
		//mediaHeight = mediaWidth/mediaW2hRatio;
	//================================================================
	//alert(mediaWidth+'/'+mediaHeight);
	
	
	//1050402 - 
	//●1050420 - ●小尺寸視窗，包括iOS上，只需設定mediaWidth = param.parentWidth，再換算高度即可。
	//param.parentWidth為父層的寬度，父層寬度在小尺寸視窗正常狀態下都應該是100%，若有內外間距也自然留白了。
	//================================================================
	try {
		//●●●小尺寸視窗下：媒體檔寬度預設以父層的視窗寬度 
		//●●●假設媒體檔頁面在iframe框架內，若不是，則$(parent.window)會被當作$(window)
		
		//
		//if( utils.isMobile ){ 
		
		  /*if($(parent.window)){
			  mediaWidth = $(parent.window).width(); //●●●1050402
		  }else{
			  mediaWidth = $(window).width();
		  }*/
		  //alert(mediaWidth);
		
		//
		//}else{
			//mediaWidth = $(window).width();
		//}
		
		  
		  //●●●若媒體檔寬度有附加class="full" (代表：媒體寬度會佔滿其上一層容器的寬度)
			  //if( $('.mediaWrapper:eq('+index+') .full').get(0) ){ 
				 //mediaWidth = param.parentWidth; 
			 // }
			 
		
		//●※○1050504 - 修改。因為發現iphone旋轉裝置時，無法正確rwd。第一次旋轉(由直式到橫式)可以，第2次(由橫式到直式)旋轉卻不行。
		//如此OK。 但有牽涉到內文排版裡面的影音檔RWD問題。後續再研究。
		//=====================================================================================================
		if( utils.isMobile ){ 
			
			if($(parent.window)){
				mediaWidth = $(parent.window).width(); //●●●1050402
			}else{
				mediaWidth = $(window).width();
			}
			
			
			//●●●1050513 - 處理內文排版具有影音檔的情形，在Mobile小尺寸視窗時，使影音寬度符合其父層寬度
			//====================================================
			//====================================================
			if( $('.mediaWrapper:eq(' + index + ')').parent().get(0).className !== 'pageWrapper' ){
				//alert('not pageWrapper');
				mediaWidth = param.parentWidth; 
			}
			//====================================================
			//====================================================
			
			
			//alert(mediaWidth);
		
		}else{
			mediaWidth = param.parentWidth; 
		}
		//=====================================================================================================
		
		
		//1050504之前使用這行。
		//mediaWidth = param.parentWidth; 
		
			  
		  mediaHeight = mediaWidth/mediaW2hRatio;
		  
	
	}catch(err){
		//
	}
	//================================================================
	
	
	
	
	//●○
	var barOuterWidth = mediaWidth - parseInt($('.mediaWrapper:eq(' + index + ') .barOuter_2').css('margin-left')) - parseInt($('.mediaWrapper:eq(' + index + ') .barOuter_2').css('margin-right'));
	
	//$('.mediaWrapper:eq(' + index + ') .barOuter_2').width(barOuterWidth);
	
	
	
	//●○●○●○1040923 - 配合Android Chrome(Webkit核心)的問題(兩指放大後，點擊不正常)，在Android不能重新給值
	//======================================================================================
	if(!utils.isAndroid){
		try{
			param.trackX[index] = $('.mediaWrapper:eq(' + index + ') .track_2').offset().left;
		}catch(err){
			//	
		}
	}
	//======================================================================================
	
	
	//$('.showInfo').append(mediaWidth +'/' + _winW + '<br>');
	
	
	
	//●○●○●○
	//return [barOuterWidth,mediaWidth,mediaHeight, _winW];
	
	try {
		var parentWinWidth;
		
		if( utils.isMobile ){
			
			if($(parent.window)){
				  parentWinWidth = $(parent.window).width(); //●●●1050402
			  }else{
				  parentWinWidth = $(window).width();
			}
			
		//
		}else{
			parentWinWidth = $(window).width();
		}
		
	
		//1050402
		return [barOuterWidth,mediaWidth,mediaHeight, parentWinWidth];
		
		
	
	}catch(err){
		//
	}
	
	
};



//1040618 - 加入大Play圖示，安排其位置
method.insertCoverImg = function(index){
	
	//非 自動播放
	//if( !param.mediaAutoPlayArr[index] ){

		$('.mediaDiv:eq(' + index + ')').append(
				'<span class="coverPlayIcon">' +
					'<img src=' + param.coverPlayIconPrefixPath + param.coverPlayIconName + '>' +
				'</span>'
		);
		
		//1041029
		$('.mediaWrapper:eq(' + index + ') .coverPlayIcon').css({'display':'block'});
		//
		$('.mediaWrapper:eq(' + index + ') .coverPlayIcon').animate({'opacity':0.0},0,function(){
				
			
			//調整位置
			//●○●○●○1040916
			
			//mouse event必須放在load事件之內，即圖檔必須載入之後才能取得位置，否則chrome，圖檔位置不正常
			//$('.mediaDiv:eq(' + index + ') .coverPlayIcon > img').load(function(){
				
				
				//●○●○●○1040916 - 調整位置
				//========================================
				method.adjustCoverImgPos(index,1);
				//========================================
				
				
				//mouse event
				$('.mediaDiv:eq(' + index + ') .coverPlayIcon').on('mouseover',function(){
					$('.mediaWrapper:eq(' + index + ') .coverPlayIcon > img').attr('src', param.coverPlayIconPrefixPath + "coverPlayIcon_over.png");
				});
				
				$('.mediaDiv:eq(' + index + ') .coverPlayIcon').on('mouseout',function(){
					$('.mediaWrapper:eq(' + index + ') .coverPlayIcon > img').attr('src', param.coverPlayIconPrefixPath + param.coverPlayIconName);
				});
	
				//mousedown事件處理，不要放在 load事件之內，否則IE不正常
				$('.mediaDiv:eq(' + index + ') .coverPlayIcon').on('mousedown',function(){
					$('.mediaWrapper:eq(' + index + ') .coverPlayIcon').empty().remove();
					tPlayer.play(index);
				});
		
				
			//});
			
		});
	
	//}

};


//調整封面大Play按鈕位置
method.adjustCoverImgPos = function(index,count){
	
	
	//●○1040713 - 定要使用 .mediaWrapper才抓得到值 --> $('.mediaWrapper:eq(' + index + ') .playbackDiv') ???
	var playbackDivHeight = parseInt($('.mediaWrapper:eq(' + index + ') .playbackDiv').css('height'));
	if(isNaN(playbackDivHeight)){
		playbackDivHeight = 0;
	}
	
	var _mediaObj;
	if(param.playModeArr[0] === "flash"){
		_mediaObj = tPlayer.swfMediaObj[index];

	}else if(param.playModeArr[0] === "html5"){
		_mediaObj = tPlayer.h5MediaObj[index];
	}
	//
	var mediaW = _mediaObj.width;
	var mediaH = _mediaObj.height;
	
	
	//
	var coverPlayIconWidth, coverPlayIconHeight;
	coverPlayIconWidth = $('.mediaWrapper:eq(' + index + ') .coverPlayIcon>img').width();
	coverPlayIconHeight = $('.mediaWrapper:eq(' + index + ') .coverPlayIcon>img').height();
	//alert(mediaW + '/' + mediaH + '///' + coverPlayIconWidth + '/' + coverPlayIconHeight);
	
	//
	var coverPosX, coverPosY; 
	coverPosX = mediaW*0.5 - coverPlayIconWidth*0.5;
	coverPosY = -mediaH*0.5 - coverPlayIconHeight*0.5;
	
	
	//●○●○●○1040826 - 判斷大play圖形按鈕何時可出現
	//如果媒體的高度大於或等於.coverPlayIcon>img的高度，大play圖形按鈕才會出現
	//----------------------------------------------------------------------------------
	if(mediaH >= coverPlayIconHeight/* && !param.playingFlagArr[index]*/){
	//----------------------------------------------------------------------------------
		
			//alert(param.playingFlagArr[index]);
			
				
				//剛插入.coverPlayIcon時，使用此段
				if(count === 1){
					
					$('.mediaWrapper:eq(' + index + ') .coverPlayIcon').animate({'left':coverPosX, 'top':coverPosY},0,function(){
						$('.mediaWrapper:eq(' + index + ') .coverPlayIcon').delay(700).animate({'opacity':1.0},1000);
						//alert(count);
					});
					
				//視窗大小變動等因素下，針對已經存在的,coverPlayIcon調整位置
				}else if(count === 2) {
					
					//1041118 - 關鍵：●●●如果在播放中，則移除.coverPlayIcon，否則從normal到rwd，或rwd到normal，播放中媒體仍會出現.coverPlayIcon
					if(param.playingFlagArr[index]){
						$('.mediaWrapper:eq(' + index + ') .coverPlayIcon').empty().remove();
					}
					
					$('.mediaWrapper:eq(' + index + ') .coverPlayIcon').animate({'left':coverPosX, 'top':coverPosY},0,function(){});
					//alert(count);
					//
					
				}
				
			
		
	
	}else{
		//$('.mediaWrapper:eq(' + index + ') .coverPlayIcon').empty().remove();
		
	}
	//----------------------------------------------------------------------------------

	
};







// ●●● JS 被 Flash 主動調用的 Function
//↓↓↓==============================================
//
//---------------------------------
tPlayer.isJsReadyFunc = function() {
	//●●●回存==================================●似乎不需回存
	//tPlayer.param = param;
	return param.jsReady;
};

//※●○※●○※●○※●○ 1040417 - 從AS3調用tPlayer.currIndexFunc()，傳值給param.currIndex
tPlayer.currIndexFunc = function(_swfCurrIndex){
	param.currIndex = _swfCurrIndex;
	//alert(param.currIndex);
};

//
tPlayer.receiveFlashOk = function(info){
	var responseStr = "Js say： 收到Flash通知： 「" + info + '」';

	//
	$('#info').append(responseStr + '</br>');
	return responseStr;
};

//
tPlayer.alert2 = function(info){
	var responseStr = "Js say： 收到Flash通知： 「" + info + '」';
	alert(responseStr);
};

//●○●○●○ 給Flash 媒體所使用的參數
//AS3 getParametersFmJs()方法會調用此function以取得tPlayer.param物件
tPlayer.parametersForTPlayer = function(){
	//●●●回存==================================●似乎不需回存
	//tPlayer.param = param;
	//alert(param.jsReady);
	return tPlayer.param;
};

//●○●○●○ AS3 getUrlFmJs()方法會調用此function，取得urlObj.rtspMediaURLArr陣列
//Flash專用rtmpMediaURL
tPlayer.urlForTPlayer = function(){
	//tPlayer.urlObj = method.getStreamingData(); //上面已經調用，並指定給param.currMediaURL
	//alert(tPlayer.urlObj.rtmpMediaURLArr);
	//●param.currMediaURL

	//●●●回存==================================●似乎不需回存
	//tPlayer.param = param;
	//alert(param.currMediaURL);

	return param.playModeArr[1]; //即urlObj.rtmpMediaURLArr。 這在method.choosePlayMode()中定義
};


//○●注意
//----------------------------------------------------------

//○●○●○● 從flash as3 (初始)主動播放或停止時，傳回true或false給param.playingFlagArr[index]
//在AS3中會根據param.flashVideoAutoPlay，決定是否自動播放，之後調用JS的tPlayer.setPlayFlag()，傳入true 或 false
tPlayer.setPlayFlag = function(_flag, index){
	param.playingFlagArr[index] = _flag;
	//
	$('#info').append('param.playingFlagArr[index] : ' + index + '/' + param.playingFlagArr[index] + '</br>');
	//
	method.updatePbBtnState(index);
};


		//○●○●○● JS專用 - JS不能使用tPlayer.setPlayFlag()，
		//否則IE之外瀏覽器會出現error訊息： 『 tPlayer.setPlayFlag()不是Function 』，不懂為甚麼???
		function setPlayFlag(_flag, index){
			param.playingFlagArr[index] = _flag;
			//
			$('#info').append('param.playingFlagArr[index] : ' + index + '/' + param.playingFlagArr[index] + '</br>');
			//
			method.updatePbBtnState(index);
		}

//----------------------------------------------------------



//-------------------------------------------------------------
//○●○●○● AS3 onMetaDataHandler事件被觸發時，主動調用JS的updateTotalTime()，初始化顯示媒體長度
//-------------------------------------------------------------
//●HTML5 media的loadedmetadata事件觸發時，也調用此方法。
//-------------------------------------------------------------
var countUpdateTotalTime = 0;
tPlayer.updateTotalTime = function(_totalTime, index){ 
		
		
	//1041001__●○解決『Android Chrome在播放前，媒體長度會出現infinity:NaN』之問題。
	//===================================================================
	//alert(Number(_totalTime)); //Infinity
	//-----------------------------------●
	if(utils.isAndroid && utils.currentBrowser === "chrome" && Number(_totalTime) === Infinity){
	//-----------------------------------●
		//alert(Number(_totalTime));
	}else{
		param.totalTimeArr[index] = _totalTime;
		$('.mediaWrapper:eq(' + index + ') .totalTime').text(method.minuteSecond(_totalTime));
		$('#info').append('@tPlayer.updateTotalTime : ' + index + '/' + method.minuteSecond(_totalTime) + '</br>');
	}
	//===================================================================
	
	
	
	//●○●○●○ tPlayer.updateTotalTime可能會重複被HTML5或Flash影音觸發，所以加上次數控制
	if(countUpdateTotalTime < 2){
	//-----------------------------------------
		
		//●○●○●○ 1040827 - 加上index === 0的條件式，以避免可能多餘的putDot出現在影音一開始處
		//-----------------------------------------
		if(index === 0){ //method.putDot()在這裡OK
			
			//●○●○●○1040904新增 - 1040930
			//===============================================================
			//●○●○●○ 1040930 - 若用param.breakpoint來區分，會造成：  ●○●○●○
			//小尺寸狀態下寬度拉大超過param.breakpoint，多出現大尺寸的dot。兩種dot都出現。
			//大尺寸狀態下寬度拉小窄於param.breakpoint，多出現小尺寸的dot。兩種dot都出現。
			//所以必須用param.layoutType[index]來做條件區分。
			//---------------------------------------------------------------
			//if(utils.browserWH.w > param.breakpoint){
			if(param.layoutType[index] === "normal"){
				method.removeDotSpan();
				method.putDot();
			
			//●○●○●○視窗尺寸小於param.breakpoint
			//}else if(utils.browserWH.w <= param.breakpoint){
			}else if(param.layoutType[index] === "rwd"){
				method.removeDotSpan2();
				method.putDot2();
			}
			//===============================================================
		}
		//-----------------------------------------
		//alert(param.timeCodeArr);
		//countUpdateTotalTime ++;

	}
	//-----------------------------------------


};


//●這會形成loop - 當AS3影音開始播放(或暫停)，即調用updateCurrTime()方法
//updateCurrTime()方法裡的updateCurrTimeTimer物件(Timer類別)持續更新調用此處tPlayer.updateCurrTime
//-------------------------------------------------------------
//●HTML5 media的timeupdate事件觸發時，也調用此方法
tPlayer.updateCurrTime = function(_currTime, index){
	//$('#info').append(parseInt($('body').css('zoom'))/100+'</br>');
	param.currTimeArr[index] = _currTime;
	//$('#info').html(param.currTimeArr[index]);

	//持續更新$('.progressBar img, .progressBar')、$('.slider')
	//●●●==================
	method.updateProgress(index);
	//●●●==================

	//持續更新顯示目前播放時間
	$('.mediaWrapper:eq(' + index + ') .currTime').text(method.minuteSecond(param.currTimeArr[index]));
	//$('#info').html(method.minuteSecond(param.currTimeArr[index]));
	
	
	//●○1041112 - 隱藏 - 以避免《playPause按鈕圖檔持續載入問題》，因為位於tPlayer.updateCurrTime函式之內
	//持續更新play/pause按鈕的顯示狀態
	//method.updatePbBtnState(index);
	

	//
	if(param.updateTimerFlagArr[index] === false){
		param.updateTimerFlagArr[index] = true;
	}



	//》》》》》》》》》》》》》》》》》》 In-Video Quiz專用
	//●○●○●○1040701 - 目前只有第一組影音可以執行 In-Video Quiz - 在此排除其他影音，避免進入$.each()
	//●○●○●○1041105 - 過濾是否有.quizSet ， 有才調用method.pauseNQuiz(indexNum)
	//-------------------------------------------------
	if(index === 0 && $('.quizSet:eq(0)').get(0) !== undefined){

		//
		//==================================
		//迭代輪詢$('.quizSet')
		//$('#questionsData .quizSet').each(function(index,element){
		$.each(param.timeCodeArr, function(indexNum){

			//檢查timeCode停止點是否符合與處置，傳入目前索引為引數
			//if(param.currTimeArr[0] <= param.timeCodeArr[indexNum]){
				method.pauseNQuiz(indexNum);
				//console.log('index=0');
			//}

		});
		//==================================


	}
	//-------------------------------------------------
	
	
	
	
	//》》》》》》》》》》》》》》》》》》 若需要用到tPlayer.updateCurrTime()
	//可在各版型主程式檔，加入method.updateCurrTime()方法
	//●○●○●○●○●○●○●○●○●○●○●○●○
	//======================================
	//======================================
	if(method.updateCurrTime){ 
		method.updateCurrTime(index);
	}
	//======================================
	//======================================
	//●○●○●○●○●○●○●○●○●○●○●○●○
	
	



};


//●○●○●○ 被AS3和JS調用
tPlayer.updateCurrTimeOnly = function(_currTime, index){
	//$('#info').append(parseInt($('body').css('zoom'))/100+'</br>');
	param.currTimeArr[index] = _currTime;
	//$('#info').html(param.currTimeArr[index]);

	//持續更新顯示目前播放時間
	$('.mediaWrapper:eq(' + index + ') .currTime').text(method.minuteSecond(param.currTimeArr[index]));

	//持續更新play/pause按鈕的顯示狀態
	//method.updatePbBtnState(index);

};

//↑↑↑==============================================



//●●●更新播放進度列、播放頭
//============================================
method.updateProgress = function(index){
	//var per = Math.ceil(((param.currTimeArr[index]/param.totalTimeArr[index])*100))/100;
	var per = Math.ceil((param.currTimeArr[index]/param.totalTimeArr[index])*10000)/10000;
	//$('#info').html(per*100);

	//更新$('.progressBar img, .progressBar')寬度
	$('.mediaWrapper:eq(' + index + ') .progressBar img, .mediaWrapper:eq(' + index + ') .progressBar').width(per*$('.mediaWrapper:eq(' + index + ') .track img').width());

	//●更新$('.slider')水平位置
	var newPosLeft = per*$('.mediaWrapper:eq(' + index + ') .track img').width()-9; //●○1040907 由-8改為-9
	$('.mediaWrapper:eq(' + index + ') .slider').css({'left':newPosLeft});

};
//============================================



// ●●● 從 JS 調用 Flash 的 Method
//↓↓↓=======================================================

//沒用到
function sendToActionScript(value) {
	document.getElementById("tPlayer").sendToActionScript(value);
}



//1041012
//================================================●
method.winOnResize = function(){ 

	//
	$(window).on('resize',function(){ 
	
					//1041016
					method.adjustLightBox();
					//
					method.quizAdjust();
					//
					method.reflectionAdjust();
					
					
					//
					//1080824 - 新增●○◎●○◎●○◎
					// IE6~IE8
					//------------------------------------------------------------------------
					if (!document.addEventListener) {
						
						//1050824 - 新增(揣摩此情境)： IE8(含)以下若 《名詞解釋面板》 有打開，改變視窗寬高(window resize)時，需強迫關閉名詞解釋面板
						//先Destroy所有.glossary_explain
						//===================================================
						if($('.glossary_explain').get(0) !== undefined){
							$('.glossary_content').empty();
							$('.glossary_explain').empty().remove();
							param.currGlossary = -1;
						}
						//===================================================
					
					}
					//------------------------------------------------------------------------
					
	
	
		
		//輪詢
		$('.mediaWrapper').each(function(index){
			
			
			//此媒體本身，※◎非全畫面狀態
			if( !param.fullScreenFlagArr[index] ){
				//============================================================================
				//alert(param.fullScreenAdjustFlag);
				
				
				//此媒體本身非全畫面狀(上方條件式)，且當所有煤體檔皆無全畫面狀態時
				if( !param.fullScreenAdjustFlag ){
					
					//○●=================================
					param.mediaRWDWork(index);
					//○●=================================
					
				}
				
			
			//此媒體本身，※◎全畫面狀態
			}else if( param.fullScreenFlagArr[index] ){
				
				var _mediaObj;
				if(param.playModeArr[0] === "flash"){
					_mediaObj = tPlayer.swfMediaObj[index];
					
				}else if(param.playModeArr[0] === "html5"){
					_mediaObj = tPlayer.h5MediaObj[index];
				}
				
				
				//@@@
				method.fullScreenWinOnResize(_mediaObj,_mediaObj.width,_mediaObj.height, index);
				//param.mediaRWDWork(index);
				
				
				//
				//flash
				if(param.playModeArr[0] === "flash"){
					
					$('#quizDiv').css({'left':0,'top':-tPlayer.swfMediaObj[index].height,'width':'100%','height':tPlayer.swfMediaObj[index].height});
					$('#reflectionDiv').css({'left':0,'top':-tPlayer.swfMediaObj[index].height,'width':'100%','height':tPlayer.swfMediaObj[index].height});
			
					
					//●○●○●○1040915 - 全畫面狀態下，遇到暫停點，.mediaDiv的高度會撐得很大，把.playbackDiv(播放控制列)往下帶到很底端，超出頁面所以看不到。
					//●○●○●○所以，必須設定mediaDiv的高度，且將.mediaDiv的css屬性overflow設為hidden。
					//=======================================================================================
					$('.mediaWrapper:eq(' + index + ') .mediaDiv').css({'height':tPlayer.swfMediaObj[index].height,'overflow':'hidden'});
					//=======================================================================================
					
				//html5
				}else if(param.playModeArr[0] === "html5"){
					
					$('#quizDiv').css({'left':0,'top':-tPlayer.h5MediaObj[index].height,'width':'100%','height':tPlayer.h5MediaObj[index].height});
					$('#reflectionDiv').css({'left':0,'top':-tPlayer.h5MediaObj[index].height,'width':'100%','height':tPlayer.h5MediaObj[index].height});
					
					//=======================================================================================
					$('.mediaWrapper:eq(' + index + ') .mediaDiv').css({'height':tPlayer.h5MediaObj[index].height,'overflow':'hidden'});
					//=======================================================================================
					
				}
				
				
			}
			
		
		});

	});
	
};


//《●○《●○《●○《●○《●○《●○》 ↑↑↑↑↑↑ 承上 ↓↓↓↓↓↓
//*******************************************************************************************
param.mediaRWDWork = function(index){
//*******************************************************************************************
				
				
			//●●●1050407
			//=====================================================
			var targetWindowWidth;
			if( utils.isMobile ){
				
				if($(parent.window)){
					targetWindowWidth = $(parent.window).width();
				}else{
					targetWindowWidth = $(window).width();
				}
				
			//
			}else{
				targetWindowWidth = $(window).width();
			}
			//=====================================================
			
			
				
			try {
				
				//切換 - ●○由大至小
				//================================================================================》》》
				if(targetWindowWidth <= param.breakpoint && param.layoutType[index] === "normal"){
				//================================================================================》》》
					
					param.layoutType[index] = "rwd";

					//
					var bigTotalTime = $('.mediaWrapper:eq(' + index + ') .totalTime').text();
					
					
					
					//●○●○●○1041210 - 如果有自訂播放介面↓
					//================================================================
					if(param.hasCustomControls){
						
					
						//destroy
						//=======================================
						//清除滑鼠事件
						method.clearPbMouseEvent(index);
						//清除滑鼠狀態事件
						method.clearMouseVisualState(index);
						//清除原來的播放介面
						$('.mediaWrapper:eq(' + index + ') .playbackDiv').empty().remove();
						//=======================================
						
						//create
						//=======================================
						//
						//建立小尺寸視窗 播放介面
						method.createPbLessThenBPHtml(index);
						method.getPlaybackUILessThenBP(index);
						method.mouseVisualState(index);
						method.playbackMouseEvent_2(index);
						$('.mediaWrapper:eq(' + index + ') .totalTime_2').text(bigTotalTime);
						//=======================================
						
						
						//●○●○●○1050421
						//更新顯示目前播放時間
						if( !isNaN(param.currTimeArr[index]) ){
							$('.mediaWrapper:eq(' + index + ') .currTime_2').text(method.minuteSecond(param.currTimeArr[index]));
						}
					
					
					
					//●○●○●○1041210 - 如果無自訂播放介面↑
					//================================================================
					}else{
						
						
					}
					
					
					//●1050112-取消。皆由CSS、Media Query處理。
					//●1041106-小尺寸時，多附加一個.mediaHeader到.mediaWrapper裡面頂端，.barOuter_2上方。以增加實際.mediaHeader與.barOuter_2的間距
					//================================================================
					/*if( !param.hasMediaHeader[index] ){
						//加一行條件式，避免重複插入.mediaHeader
						if($('.mediaWrapper:eq(' + index + ') .mediaHeader').get(0) === undefined){
							$('<div class="mediaHeader"></div>').prependTo($('.mediaWrapper:eq(' + index + ')'));
							//G202：高度改在CSS - Media Query裡面設定padding-top、padding-bottom  - @media screen and (max-width:640px) {}
						}
					}*/
					//================================================================
					
					
					//
					if($('.mediaWrapper:eq(' + index + ') .coverPlayIcon').get(0) !== undefined){
						method.adjustCoverImgPos(index,2);
					}
					
					
					//1041230
					/*$('.toBigPic').each(function(i) {
						var smallPic = $('.toBigPic:eq(' + i + ')>img');
						$('.toBigPic:eq(' + i + ')').after(smallPic);
						
                        $('.toBigPic:eq(' + i + ')').empty().remove();
                    });
					*/
					
					
										
					
					
				
				//●○●○●○ 小尺寸之內 - 縮放視窗 
				//1041215 - 對$(window).on('resize')的調用集中至method.winOnResize()方法裡面，才能正常運作
				//================================================================================》》》
				}else if(targetWindowWidth <= param.breakpoint && param.layoutType[index] === "rwd"){
				//================================================================================》》》
					//
					method.adjustInSmallWindows(index);
				
				
				
					
					
				//切換 - ●○●○●○由小至大
				//================================================================================》》》
				}else if(targetWindowWidth > param.breakpoint && param.layoutType[index] === "rwd"){
				//================================================================================》》》
				
					param.layoutType[index] = "normal";
					
					//
					var smallTotalTime = $('.mediaWrapper:eq(' + index + ') .totalTime').text();
					
					
					
					//●○●○●○1041210 - 如果有自訂播放介面
					//================================================================
					if(param.hasCustomControls){
						
						
						
					
						//destroy
						//=======================================
						//清除滑鼠事件
						method.clearPbMouseEvent_2(index);
						//清除滑鼠狀態事件
						method.clearMouseVisualState(index);
						//清除原來的播放介面
						$('.mediaWrapper:eq(' + index + ') .playbackDiv_2').empty().remove();
						//=======================================
						
						//create
						//=======================================
						//
						//建立大尺寸視窗 播放介面
						method.createPbHtml(index);
						method.getPlaybackUI(index);
						
						method.mouseVisualState(index);
						method.playbackMouseEvent(index);
						
						$('.mediaWrapper:eq(' + index + ') .totalTime').text(smallTotalTime);
						
						
						//●○●○●○1050421
						//更新顯示目前播放時間
						if( !isNaN(param.currTimeArr[index]) ){
							$('.mediaWrapper:eq(' + index + ') .currTime').text(method.minuteSecond(param.currTimeArr[index]));
						}
						
						
						
						//●●●
						//==============================================
						//method.caculateTrackWidth($('.mediaWrapper:eq(' + index + ') .playbackDiv').width(), index);
						//==============================================
						//param.trackX[index] = $('.mediaWrapper:eq(' + index + ') .track').offset().left;
						//==============================================
						method.removeDotSpan();
						method.putDot();
						//==============================================
						
						
						
						
						//●▲★1050610 - (★★★Mobile 暫停狀態下，若無此段，從小尺寸轉到大尺寸，.slider會在0的位置，而不在正確位置)
						
						//《《《《《《《《《《《《*********************************************************************************
						//●▲★1050610 - 再修改。因(iPad)尚未開始播放的狀態下，從大尺寸進入小尺寸，影片會跳到最尾端，目前播放時間變成媒體長度。
						//---》必須重覆按Play鈕，才能從頭開始播放。 
						//---》難怪之前發現以ipad 使用旭聯iOS APP進入UU平台(非自動播放狀態)，會發生上述情形。還以為是旭聯APP的問題。ㄜ。
						//---》旭聯iOS APP已可以支援媒體檔自動播放。會依G2教材HTML所設定的mediaAutoPlay自動播放與否，決定是否自動播放。
						//《《《《《《《《《《《《*********************************************************************************
						
						//=====================================================================
						var currPercent;
						
						//************************************《《《《《《《《《《《《
						if( param.currTimeArr[index] !== undefined ){
							currPercent = param.currTimeArr[index]/param.totalTimeArr[index]; 
						}else{
							currPercent = 0;
						}
						//************************************《《《《《《《《《《《《
						
						//影片若還未開始播放，param.currTimeArr[index]會為undefined、currPercent會為NaN。
						//alert(param.currTimeArr[index] + '/' + currPercent); 
						
						//var trackWidth = $('.mediaWrapper:eq(' + index + ') .track').width();
						
						if( !param.playingFlagArr[index] ){
							tPlayer.seek(param.totalTimeArr[index]*currPercent, index);
						}
						//=====================================================================
						
	
						
						
						//※1041016 - 再控制一次 .mediaWrapper 的高度。 避免高度過大，黑色底跑出來見人。
						//-----------------------------------------
						//播放Bar的高度
						var playbackDivHeight = parseInt($('.mediaWrapper:eq(' + index + ') .playbackDiv').css('height'));
						if(isNaN(playbackDivHeight)){
							playbackDivHeight = 0;
						}
						
						//.mediaHeader的高度
						var headerHeight = parseInt($('.mediaWrapper:eq(' + index + ') .mediaHeader').css('height'));
						if(isNaN(headerHeight)){
							headerHeight = 0;
						}
						//※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※
						$('.mediaWrapper:eq(' + index + ')').height(param.mediaHeightArr[index] + headerHeight + playbackDivHeight);
						//※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※
						//-----------------------------------------
					
					
					
					//●○●○●○1041210 - 如果無自訂播放介面
					//================================================================
					}else{
						
						
						
						//
						//●○1041014 - 必要控制
						//---------------------------------------
						var _mediaObj;
						if(param.playModeArr[0] === "flash"){
							_mediaObj = tPlayer.swfMediaObj[index];
					
						}else if(param.playModeArr[0] === "html5"){
							_mediaObj = tPlayer.h5MediaObj[index];
						}
						//alert(param.mediaHeightArr[index]);
						_mediaObj.width = param.mediaWidthArr[index];
						
						
						//●●●●●●●1041110 - 當_mediaObj為Flash時，以 Windows IE、FireFox 等「非」Web-kit瀏覽器執行 
						//在HTML中設定mediaHeight高度為0，指定給_mediaObj.height時會擲出例外。SCRIPT87: 不正確的引數。 
						//(Web-kit瀏覽器則可正常執行)
						//所以，加上try...catch來解決。
						//=================================================
						try {
							_mediaObj.height = param.mediaHeightArr[index];
						}catch(err){
							//
						}
						//=================================================
						
						
						//---------------------------------------
						$('.mediaDiv:eq(' + index + ')').width(param.mediaWidthArr[index]);
						$('.mediaDiv:eq(' + index + ')').height(param.mediaHeightArr[index]);
						$('.mediaWrapper:eq(' + index + ')').width(param.mediaWidthArr[index]);
						$('.mediaWrapper:eq(' + index + ') .mediaHeader').width(param.mediaWidthArr[index]);
						//---------------------------------------
					
					
					}
					//●○●○●○1041210
					//================================================================
					
					
					
					
					
					
					//《《《《《《 ※※※ 》》》》》》》 1050714 - 
					//解決：「1050714之前，從小尺寸切換到大尺寸，.mediaDivOverlay沒有準確恢復大尺寸時媒體檔寬高」問題。
					//●○●○●○1040521 - 處理$('.mediaWrapper:eq(' + index + ') .mediaDivOverlay')的 寬高 和 margin-top
					//*****************************************************************************************
					if(param.playModeArr[0] === "flash"){
			
						//●◎1040629
						//===================================================
						var mediaDivOverlay_marginTop;
			
						//●◎播放介面在影音上方
						if($('.mediaWrapper:eq(' + index + ')>.playbackDiv').get(0) !== undefined){
							mediaDivOverlay_marginTop = -(param.mediaHeightArr[index]);
			
						//◎播放介面在影音下方
						}else if($('.mediaDiv:eq(' + index + ')>.playbackDiv').get(0) !== undefined){
							mediaDivOverlay_marginTop = -(param.mediaHeightArr[index]);
						}
						//alert(mediaDivOverlay_marginTop);
			
						//alert($('.mediaDiv:eq(' + index + ')>.playbackDiv').get(0) != undefined);
						$('.mediaWrapper:eq(' + index + ') .mediaDivOverlay').css({'margin-top':mediaDivOverlay_marginTop,'opacity':param.mediaDivOverlayOpacity, 'width':param.mediaWidthArr[index], 'height':param.mediaHeightArr[index]});
			
						//===================================================
					}
					//*****************************************************************************************
					
					
					
					
					
					
					
					//●1050112-取消。皆由CSS、Media Query處理。
					//●1041106-小尺寸時，多附加一個.mediaHeader到.mediaWrapper裡面頂端，.barOuter_2上方。以增加實際.mediaHeader與.barOuter_2的間距
					// 此處回到大尺寸，因此需刪除.mediaHeader
					//================================================================
					/*if( !param.hasMediaHeader[index] ){
						$('.mediaWrapper:eq(' + index + ') .mediaHeader').empty().remove();
					}*/
					//================================================================
					
					//
					if($('.mediaWrapper:eq(' + index + ') .coverPlayIcon').get(0) !== undefined){
						method.adjustCoverImgPos(index,2);
					}
					
					//
					$('.pageWrapper').css({
						'width':param.currW
						//'min-height':param.currH
					});
					
					
					
					
				//●○ 大尺寸之內 - 縮放視窗
				//================================================================================》》》
				}else if(targetWindowWidth > param.breakpoint && param.layoutType[index] === "normal"){
				//================================================================================》》》
					//method.adjustCoverImgPos(index,2);
				}
				
				
				
			//
			}catch(err){
				//
			}
				
				
//*******************************************************************************************
};
//*******************************************************************************************



//滑鼠mouseover、mouseout按鈕互動狀態
//==============================================
method.mouseVisualState = function(index){

	//○●Flash as3 media是否自動播放，根據as3裡 media初始播放或暫停，
	//調用JS的tPlayer.setPlayFlag()，並傳入true或false參數於此函式，指定給param.playingFlagArr[index]
	//之後在此method.mouseVisualState()方法中，決定滑鼠按鈕互動狀態

	param.playingFlagArr[index] ? $('.mediaWrapper:eq(' + index + ') .playPause > img').attr('src',param.playerUIPrefixPath+'playerUI/pause.png') : $('.mediaWrapper:eq(' + index + ') .playPause > img').attr('src',param.playerUIPrefixPath+'playerUI/play.png');
	//●初始化按鈕狀態，根據是否自動播放============================


	$('.mediaWrapper:eq(' + index + ') .playPause').on('mouseover',function(){
		param.playingFlagArr[index] ? $('.mediaWrapper:eq(' + index + ') .playPause > img').attr('src',param.playerUIPrefixPath+'playerUI/pause_over.png') : $('.mediaWrapper:eq(' + index + ') .playPause > img').attr('src',param.playerUIPrefixPath+'playerUI/play_over.png');
	});

	$('.mediaWrapper:eq(' + index + ') .playPause').on('mouseout',function(){
		param.playingFlagArr[index] ? $('.mediaWrapper:eq(' + index + ') .playPause > img').attr('src',param.playerUIPrefixPath+'playerUI/pause.png') : $('.mediaWrapper:eq(' + index + ') .playPause > img').attr('src',param.playerUIPrefixPath+'playerUI/play.png');
	});

	//
	$('.mediaWrapper:eq(' + index + ') .fullNormalScreen').on('mouseover',function(){
		param.fullScreenFlagArr[index] ? $('.mediaWrapper:eq(' + index + ') .fullNormalScreen > img').attr('src',param.playerUIPrefixPath+'playerUI/normalScreen_over.png') : $('.mediaWrapper:eq(' + index + ') .fullNormalScreen > img').attr('src',param.playerUIPrefixPath+'playerUI/fullScreen_over.png');
	});

	$('.mediaWrapper:eq(' + index + ') .fullNormalScreen').on('mouseout',function(){
		param.fullScreenFlagArr[index] ? $('.mediaWrapper:eq(' + index + ') .fullNormalScreen > img').attr('src',param.playerUIPrefixPath+'playerUI/normalScreen.png') : $('.mediaWrapper:eq(' + index + ') .fullNormalScreen > img').attr('src',param.playerUIPrefixPath+'playerUI/fullScreen.png');
	});
};
//==============================================

//
method.clearMouseVisualState = function(index){
	$('.mediaWrapper:eq(' + index + ') .playPause').off('mouseover');
	$('.mediaWrapper:eq(' + index + ') .playPause').off('mouseout');
	$('.mediaWrapper:eq(' + index + ') .fullNormalScreen').off('mouseover');
	$('.mediaWrapper:eq(' + index + ') .fullNormalScreen').off('mouseout');
};


//
//==============================================
method.updatePbBtnState = function(index){
	
	//param.playingFlagArr[index] ? $('.mediaWrapper:eq(' + index + ') .playPause > img').attr('src',param.playerUIPrefixPath+'playerUI/pause.png') & $('.mediaDiv:eq(' + index + ') .coverPlayIcon').empty().remove() : $('.mediaWrapper:eq(' + index + ') .playPause > img').attr('src',param.playerUIPrefixPath+'playerUI/play.png');
	
	if(param.playingFlagArr[index]){
		$('.mediaWrapper:eq(' + index + ') .playPause > img').attr('src',param.playerUIPrefixPath+'playerUI/pause.png');
		$('.mediaDiv:eq(' + index + ') .coverPlayIcon').empty().remove();
		
	}else{
		$('.mediaWrapper:eq(' + index + ') .playPause > img').attr('src',param.playerUIPrefixPath+'playerUI/play.png');
	}
	
};
//==============================================



//播放控制滑鼠事件
//=======================================================
method.playbackMouseEvent = function(index){

	//play & pause
	//-----------------------------------------------------------
	$('.mediaWrapper:eq(' + index + ') .playPause').on('mousedown',function(){
		if(param.playingFlagArr[index]){
			$('.mediaWrapper:eq(' + index + ') .playPause > img').attr('src',param.playerUIPrefixPath+'playerUI/play.png');
			/*param.playingFlagArr[index] = */tPlayer.pause(index);
		}else{
			$('.mediaWrapper:eq(' + index + ') .playPause > img').attr('src',param.playerUIPrefixPath+'playerUI/pause.png');
			/*param.playingFlagArr[index] = */tPlayer.play(index);
		}
	});
	//-----------------------------------------------------------

	//fullScreen & normalScreen
	//-----------------------------------------------------------
	$('.mediaWrapper:eq(' + index + ') .fullNormalScreen').on('mousedown',function(){

		//
		fullScreenCounter = 0;



		//================●○●○●○
		//-----------------------------------------------------------------
		if(!param.fullScreenFlagArr[index]){
			//tPlayer.enterH5FullScreen($('.mediaWrapper'));
			//tPlayer.enterH5FullScreen(document.getElementsByClassName('mediaWrapper'));
			tPlayer.enterH5FullScreen(index);
		}else{
			//tPlayer.leaveH5FullScreen($('.mediaWrapper'));
			//tPlayer.leaveH5FullScreen(document.getElementsByClassName('mediaWrapper'));
			tPlayer.leaveH5FullScreen(index);
		}
		//-----------------------------------------------------------------


	});
	//-----------------------------------------------------------
	
	
	//●○●○●○為解決Android Chrome等webkit瀏覽器，手勢Gesture放大時，點擊.track，
	//.track位置不準確問題，造成currPercent也不準確，播放位置不準確，無法移到後半段播放。
	//==============================================================================●
	var clickedMouseX, trackX, trackWidth;
	var trackXCount = 0;
	//==============================================================================●
	

	//滑鼠點擊 進度列容器 - $('.barOuter')
	//-----------------------------------------------------------》》》》》》》》》》》》》》》》》》
	//●●●滑鼠指標點擊$('.barOuter')上，更新播放位置
	//●○1040907 - 將.barOuter改為.track。 css裡也有修改。
	$('.mediaWrapper:eq(' + index + ') .track').on('mousedown',function(e){

		
		//●○1040430
		param.endingFlagArr[index] = false;
		
		
		var currPercent;
		//●○●○●○1040916 - flash和html5兩種播放技，點擊.track時，所對應的播放時間計算方式不同。
		//======================================================================
		//Flash
		if(param.playModeArr[0] === "flash"){
			trackWidth = $('.mediaWrapper:eq(' + index + ') .track').width()/* + 9*/; //1040916
			clickedMouseX = e.pageX/* + 9*/; //1040916
			//
			//$('.mediaWrapper:eq(' + index + ') .slider').offset().left = clickedMouseX;
		
		//html5
		}else if(param.playModeArr[0] === "html5"){
			trackWidth = $('.mediaWrapper:eq(' + index + ') .track').width(); //1040916
			clickedMouseX = e.pageX; //1040916
			
		}
		//======================================================================
		//●○●○●○1040916
		
		
		//●○1041012 - 當全畫面狀態，需重新取得param.trackX[index] (.track的x位置)，在旭聯 LMS中，點擊.track才能正確運作
		//*******************************************************************************************●
		if(param.fullScreenFlagArr){
			//●○1041012
			//========================================================================
			param.trackX[index] = $('.mediaWrapper:eq(' + index + ') .track').offset().left;
			//========================================================================
		}
		//*******************************************************************************************●


		//小數比例 - 1040923 - 改param.trackX[index]
		//======================================================================================
		currPercent = (clickedMouseX - param.trackX[index]) / trackWidth; 
		//alert(clickedMouseX+'/'+trackX+'/'+trackWidth);
		//======================================================================================

		//
		//tPlayer.pauseUpdateTimer(index);
		//●1040821 - 這裡若有這行pause()，會導致IE10點擊.barOuter後，無法繼續播放。 --- ???
		//●○1041008 - 有pause，後面就要有play
		//tPlayer.pause(index);
		
		//●1040821 - 桌機的chrome則有tPlayer.pause()，會較順(smooth)，否則進度列頓頓的
		/*if(!utils.isMobile && utils.currentBrowser === 'chrome'){
			tPlayer.pause(index);
		}*/


		//1040521 - 增加 - 播放頭控制 <--- 應該不加此行較好 ??? 。
		//$('.mediaWrapper:eq(' + index + ') .slider').animate({'left':trackWidth*currPercent},0);
		
		//
		$('.mediaWrapper:eq(' + index + ') .progressBar img').animate({'width':trackWidth*currPercent},0,function(){
			//
			tPlayer.seek(param.totalTimeArr[index]*currPercent, index);

			//tPlayer.resumeUpdateTimer(index);
			
			//1041008 - ●○IE10在前有pause，後有play，且resumeUpdateTimer的狀態下，點擊.track，只有第一次點擊會update進度列與播放頭位置。
			if( !param.playingFlagArr[index] ){
				//●○1041008 - 前面若無pause，這裡就不要有play，否則某些瀏覽器，會重複play，造成跳耀。
				tPlayer.play(index);
			}

		});


		//●○●○●○●○●○●○1040703 =========================================================

		//$('#quizDiv, quizContainer').css({'display':'none'});

		//●○●○●○●○●○●○1040703 =========================================================




	});


	//1040904 - 轉移位置
	////////////////////////////////////////////////////////
	/******************************************************/
	//if(utils.browserWH.w > param.breakpoint){
		method.jqUITouchPunchDrag(index);
	//}
	////////////////////////////////////////////////////////
	/******************************************************/
	

	

};

//
method.clearPbMouseEvent = function(index){
	$('.mediaWrapper:eq(' + index + ') .playPause').off('mousedown');
	$('.mediaWrapper:eq(' + index + ') .fullNormalScreen').off('mousedown');
	$('.mediaWrapper:eq(' + index + ') .track').off('mousedown');
	$('.mediaWrapper:eq(' + index + ') .slider').draggable("destroy");
};
//
method.clearPbMouseEvent_2 = function(index){
	$('.mediaWrapper:eq(' + index + ') .playPause_2').off('mousedown');
	//$('.mediaWrapper:eq(' + index + ') .fullNormalScreen_2').off('mousedown');
	$('.mediaWrapper:eq(' + index + ') .track_2').off('mousedown');
	$('.mediaWrapper:eq(' + index + ') .slider_2').draggable("destroy");
};


//
//播放控制滑鼠事件
//=======================================================
method.playbackMouseEvent_2 = function(index){

	//play & pause
	//-----------------------------------------------------------
	$('.mediaWrapper:eq(' + index + ') .playPause').on('mousedown',function(){
		if(param.playingFlagArr[index]){
			$('.mediaWrapper:eq(' + index + ') .playPause > img').attr('src',param.playerUIPrefixPath+'playerUI/play.png');
			/*param.playingFlagArr[index] = */tPlayer.pause(index);
		}else{
			$('.mediaWrapper:eq(' + index + ') .playPause > img').attr('src',param.playerUIPrefixPath+'playerUI/pause.png');
			/*param.playingFlagArr[index] = */tPlayer.play(index);
		}
	});
	//-----------------------------------------------------------

	
	
	
	//●○●○●○為解決Android Chrome等webkit瀏覽器，手勢Gesture放大時，點擊.track，
	//.track位置不準確問題，造成currPercent也不準確，播放位置不準確，無法移到後半段播放。
	//==============================================================================●
	var clickedMouseX, trackX, trackWidth;
	var trackXCount = 0;
	//==============================================================================●
	

	//滑鼠點擊 進度列容器 - $('.barOuter')
	//-----------------------------------------------------------》》》》》》》》》》》》》》》》》》
	//●●●滑鼠指標點擊$('.barOuter')上，更新播放位置
	//●○1040907 - 將.barOuter改為.track。 css裡也有修改。
	$('.mediaWrapper:eq(' + index + ') .track_2').on('mousedown',function(e){

		
		
		
		//●○1040430
		param.endingFlagArr[index] = false;
		
		//==============================================================================●
		//if(trackXCount <= 0){
			//trackX = $('.mediaWrapper:eq(' + index + ') .track').offset().left;
			//var trackY = $('.mediaWrapper:eq(' + index + ') .track').offset().top;
		//}
		//trackXCount++;
		//==============================================================================●
		
		var currPercent;
		//●○●○●○1040916 - flash和html5兩種播放技，點擊.track時，所對應的播放時間計算方式不同。
		//======================================================================
		//Flash
		if(param.playModeArr[0] === "flash"){
			trackWidth = $('.mediaWrapper:eq(' + index + ') .track_2').width()/* + 9*/; //1040916
			clickedMouseX = e.pageX/* + 9*/; //1040916
			//
			//$('.mediaWrapper:eq(' + index + ') .slider_2').offset().left = clickedMouseX;
		
		//html5
		}else if(param.playModeArr[0] === "html5"){
			trackWidth = $('.mediaWrapper:eq(' + index + ') .track_2').width(); //1040916
			clickedMouseX = e.pageX; //1040916
			
		}
		//======================================================================
		//●○●○●○1040916
		
		
		//●○1041013 - (●○●○●○非Android的Webkit瀏覽器：Chrome...etc.)
		//---> 當全畫面狀態，需重新取得param.trackX[index] (.track的x位置)，在旭聯 LMS中，點擊.track才能正確運作
		//*******************************************************************************************●
		if(!utils.isAndroid){
			//●○1041012
			//========================================================================
			param.trackX[index] = $('.mediaWrapper:eq(' + index + ') .track').offset().left;
			//========================================================================
		}
		//*******************************************************************************************●


		//小數比例 - 1040923 - 改param.trackX[index]
		//======================================================================================
		currPercent = (clickedMouseX - param.trackX[index]) / trackWidth; 
		//alert(clickedMouseX+'/'+trackX+'/'+trackWidth);
		//======================================================================================

		//
		//tPlayer.pauseUpdateTimer(index);
		//●1040821 - 這裡若有這行pause()，會導致IE10點擊.barOuter後，無法繼續播放。 ???
		//●○1040930必須pause，否則在uuc播streaming會導致典及某位置後，play中，又play一次
		//tPlayer.pause(index);
		
		//●1040821 - 桌機的chrome則有tPlayer.pause()，會較順(smooth)，否則進度列頓頓的
		/*if(!utils.isMobile && utils.currentBrowser === 'chrome'){
			tPlayer.pause(index);
		}*/


		//1040521 - 增加 - 播放頭控制 <--- 應該不加此行較好 ??? 。
		//$('.mediaWrapper:eq(' + index + ') .slider').animate({'left':trackWidth*currPercent},0);
		
		//
		$('.mediaWrapper:eq(' + index + ') .progressBar_2 img').animate({'width':trackWidth*currPercent},0,function(){
			//
			tPlayer.seek(param.totalTimeArr[index]*currPercent, index);

			//tPlayer.resumeUpdateTimer(index);
			
			//1041008 - ●○IE10在前有pause，後有play，且resumeUpdateTimer的狀態下，點擊.track，只有第一次點擊會update進度列與播放頭位置。
			if( !param.playingFlagArr[index] ){
				//●○1041008 - 前面若無pause，這裡就不要有play，否則某些瀏覽器，會重複play，造成跳耀。
				tPlayer.play(index);
			}


		});


		//●○●○●○●○●○●○1040703 =========================================================

		//$('#quizDiv, quizContainer').css({'display':'none'});

		//●○●○●○●○●○●○1040703 =========================================================




	});


	//1040904 - 轉移位置
	////////////////////////////////////////////////////////
	/******************************************************/
	//if(utils.browserWH.w > param.breakpoint){
		method.jqUITouchPunchDrag_2(index);
	//}
	////////////////////////////////////////////////////////
	/******************************************************/
	


};




//●◎使用中 - jquery-ui-1.11.4.min.js + jquery.ui.touch-punch.min.js
method.jqUITouchPunchDrag = function(index){
	//$('.mediaWrapper:eq(' + index + ') .slider').draggable();


	//拖曳 $(slider) 播放頭
	if($('.mediaWrapper:eq(' + index + ') .slider').draggable){

		var per;
		var sliderPosX;
		var sliderPosY = $('.mediaWrapper:eq(' + index + ') .slider').offset().top; //.slider的y位置
		var barOuterPosX = $('.mediaWrapper:eq(' + index + ') .barOuter').offset().left; //.barOuter的x位置
		var barOuterWidth = $('.mediaWrapper:eq(' + index + ') .track').width(); //●●●這裡務必是.track的寬度


		//調用jQuery UI的draggable()方法
		$('.mediaWrapper:eq(' + index + ') .slider').draggable({
			//
			axis: "x",
			//containment:[(barOuterPosX-8),sliderPosY,(barOuterPosX+barOuterWidth-8),sliderPosY], 
			containment:$('.mediaWrapper:eq(' + index + ') .barOuter'),
			opacity: 1.0,
			cursor: "pointer",
			/*refreshPositions: true,*/
			/*distance: 0.1,*/
			/*scrollSensitivity: 100,*/

			start:function(){

				tPlayer.pauseUpdateTimer(index);
				tPlayer.pause(index);

			},

			drag:function(){

				sliderPosX = $('.mediaWrapper:eq(' + index + ') .slider').offset().left; //1040907由8改為9

				//●○1040717 - barOuterPosX務必在此更新
				barOuterPosX = $('.mediaWrapper:eq(' + index + ') .barOuter').offset().left;

				//小數比例
				per = Math.ceil(((sliderPosX-barOuterPosX)/barOuterWidth)*100)/100;


				$('.mediaWrapper:eq(' + index + ') .progressBar>img, .mediaWrapper:eq(' + index + ') .progressBar').css({'width':(per*barOuterWidth)});


				//
				//tPlayer.pause(index);
				tPlayer.seek(param.totalTimeArr[index]*per, index);
				//tPlayer.resumeUpdateTimer(index);


				//○○○●●●
				//--------------------------------------------------
				if(param.playModeArr[0] === "flash"){
					tPlayer.swfMediaObj[index] = document.getElementById("tPlayer_"+index.toString());

					//這需經過Flash，再由Flash操作JS
					//-------------------------------------------------
					//tPlayer.swfMediaObj[index].as3_updateTimerOnlyCallback(index);
					//-------------------------------------------------
					//1040623 - 這直接更新顯示拖曳時的目前播放時間 - 根據.slider再.tracker上的位置
					tPlayer.updateCurrTimeOnly(param.totalTimeArr[index]*per,index);
					//-------------------------------------------------

				}else if(param.playModeArr[0] === "html5"){

					//-------------------------------------------------
					tPlayer.updateCurrTimeOnly(param.totalTimeArr[index]*per,index);
					//-------------------------------------------------

				}else{
					//
				}
				//--------------------------------------------------


				//tPlayer.pauseUpdateTimer(index);

				//更新play/pause按鈕的顯示狀態
				//method.updatePbBtnState(index);


			},

			stop:function(){

				//這是為了，當拖曳到影音終止處，避免HTML5擋掉
				if(param.currTimeArr[index] >= param.totalTimeArr[index]){
					tPlayer.completed(false,index);
					$('#info').append('param.currTimeArr[index] : ' + param.currTimeArr[index] + '</br>');
					$('#info').append('param.totalTimeArr[index] : ' + param.totalTimeArr[index] + '</br>');
					//tPlayer.pause(index);
					tPlayer.seek(param.totalTimeArr[index], index);
					//tPlayer.resumeUpdateTimer(index);

				}else{
					sliderPosX = $('.mediaWrapper:eq(' + index + ') .slider').offset().left; //1040907由8改為9
					//●○1040717 - barOuterPosX務必在此更新
					barOuterPosX = $('.mediaWrapper:eq(' + index + ') .barOuter').offset().left;
					per = Math.ceil(((sliderPosX-barOuterPosX)/barOuterWidth)*100)/100;

					//tPlayer.pause(index);
					//tPlayer.pauseUpdateTimer(index);
					tPlayer.seek(param.totalTimeArr[index]*per, index);
					//1041001 - 這裡必須有tPlayer.resumeUpdateTimer(index)，iOS Chrome放掉拖曳後，才能更新播放頭與進度列。
					tPlayer.resumeUpdateTimer(index);
					tPlayer.play(index);

				}


				//更新play/pause按鈕的顯示狀態
				method.updatePbBtnState(index);



			}

		});

	}
};


//
method.jqUITouchPunchDrag_2 = function(index){
	//$('.mediaWrapper:eq(' + index + ') .slider').draggable();
	
	/*$('.mediaWrapper:eq(' + index + ') .slider img').load(function(){
		alert($('.mediaWrapper:eq(' + index + ') .slider').css('top'));
	});*/
	//alert($('.mediaWrapper:eq(' + index + ') .playbackDiv .slider_2 img'));
	

	//拖曳 $(slider) 播放頭
	if($('.mediaWrapper:eq(' + index + ') .slider_2').draggable){

		var per;
		var sliderPosX;
		var sliderPosY;
		var barOuterPosX;
		var barOuterWidth;
		
		if($('.mediaWrapper:eq(' + index + ') .slider_2').get(0) !== undefined){
			sliderPosY = $('.mediaWrapper:eq(' + index + ') .slider_2').offset().top; //.slider的y位置
		}
		
		if($('.mediaWrapper:eq(' + index + ') .barOuter_2').get(0) !== undefined){
			barOuterPosX = $('.mediaWrapper:eq(' + index + ') .barOuter_2').offset().left; //.barOuter的x位置
			barOuterWidth = $('.mediaWrapper:eq(' + index + ') .track_2').width(); //●●●這裡務必是.track_2的寬度
		}


		//調用jQuery UI的draggable()方法
		$('.mediaWrapper:eq(' + index + ') .slider_2').draggable({
			//
			axis: "x",
			//containment:[(barOuterPosX-8),sliderPosY,(barOuterPosX+barOuterWidth-8),sliderPosY],
			containment:$('.mediaWrapper:eq(' + index + ') .barOuter_2'),
			opacity: 1.0,
			cursor: "pointer",
			/*refreshPositions: true,*/
			/*distance: 0.1,*/
			/*scrollSensitivity: 100,*/

			start:function(){

				tPlayer.pauseUpdateTimer(index);
				tPlayer.pause(index);

			},

			drag:function(){

				sliderPosX = $('.mediaWrapper:eq(' + index + ') .slider_2').offset().left;

				//●○1040717 - barOuterPosX務必在此更新
				barOuterPosX = $('.mediaWrapper:eq(' + index + ') .barOuter_2').offset().left;

				//小數比例
				per = Math.ceil(((sliderPosX-barOuterPosX)/barOuterWidth)*100)/100;


				$('.mediaWrapper:eq(' + index + ') .progressBar_2>img, .mediaWrapper:eq(' + index + ') .progressBar_2').css({'width':(per*barOuterWidth)});


				//
				//tPlayer.pause(index);
				tPlayer.seek(param.totalTimeArr[index]*per, index);
				//tPlayer.resumeUpdateTimer(index);


				//○○○●●●
				//--------------------------------------------------
				if(param.playModeArr[0] === "flash"){
					tPlayer.swfMediaObj[index] = document.getElementById("tPlayer_"+index.toString());

					//這需經過Flash，再由Flash操作JS
					//-------------------------------------------------
					//tPlayer.swfMediaObj[index].as3_updateTimerOnlyCallback(index);
					//-------------------------------------------------
					//1040623 - 這直接更新顯示拖曳時的目前播放時間 - 根據.slider再.tracker上的位置
					tPlayer.updateCurrTimeOnly(param.totalTimeArr[index]*per,index);
					//-------------------------------------------------

				}else if(param.playModeArr[0] === "html5"){

					//-------------------------------------------------
					tPlayer.updateCurrTimeOnly(param.totalTimeArr[index]*per,index);
					//-------------------------------------------------

				}else{
					//
				}
				//--------------------------------------------------


				//tPlayer.pauseUpdateTimer(index);

				//更新play/pause按鈕的顯示狀態
				//method.updatePbBtnState(index);


			},

			stop:function(){

				//這是為了，當拖曳到影音終止處，避免HTML5擋掉
				if(param.currTimeArr[index] >= param.totalTimeArr[index]){
					tPlayer.completed(false,index);
					$('#info').append('param.currTimeArr[index] : ' + param.currTimeArr[index] + '</br>');
					$('#info').append('param.totalTimeArr[index] : ' + param.totalTimeArr[index] + '</br>');
					//tPlayer.pause(index);
					tPlayer.seek(param.totalTimeArr[index], index);
					//tPlayer.resumeUpdateTimer(index);

				}else{
					sliderPosX = $('.mediaWrapper:eq(' + index + ') .slider_2').offset().left;
					//●○1040717 - barOuterPosX務必在此更新
					barOuterPosX = $('.mediaWrapper:eq(' + index + ') .barOuter_2').offset().left;
					per = Math.ceil(((sliderPosX-barOuterPosX)/barOuterWidth)*100)/100;

					//tPlayer.pause(index);
					//tPlayer.pauseUpdateTimer(index);
					tPlayer.seek(param.totalTimeArr[index]*per, index);
					//1041001 - 這裡必須有tPlayer.resumeUpdateTimer(index)，iOS Chrome放掉拖曳後，才能更新播放頭與進度列。
					tPlayer.resumeUpdateTimer(index);
					tPlayer.play(index);

				}


				//更新play/pause按鈕的顯示狀態
				method.updatePbBtnState(index);



			}

		});

	}
};

//↑↑↑=======================================================








//●●● tPlayer API ●●●
//↓↓↓=======================================================├┤├┤├┤
//●○
tPlayer.play = function(index){


	//●○●○●○1040513 - 暫停所有媒體檔
	//===============================
	method.pauseAllMedia(index);
	//===============================
	//●○●○●○1040513 - 暫停所有媒體檔


	//●○1040430 - 已在tPlayer.completed()設定 param.endingFlagArr[index] = true
	if(param.endingFlagArr[index]){

		$('#info').append('param.endingFlagArr[index] : ' + param.endingFlagArr[index] + '</br>');
		//
		tPlayer.seek(0, index);
		//
		param.endingFlagArr[index] = false;


	}

	//◎◎◎
	if(param.playModeArr[0] === "flash"){
		//
		tPlayer.swfMediaObj[index] = document.getElementById("tPlayer_"+index.toString());
		//
		param.playingFlagArr[index] = tPlayer.swfMediaObj[index].as3_playVideo();

	//◎◎◎
	}else if(param.playModeArr[0] === "html5"){
		param.playingFlagArr[index] = method.h5_playVideo(index);

	}else{
		//
	}
	
	
	//●○1041112 - 隱藏 [行1873左右]的method.updatePbBtnState(index)之後，移到此處補足。
	method.updatePbBtnState(index);


	//這是為了全螢幕變回一般畫面時的處置 ?????? 不只啦 ???
	//●○遇到暫停點時，按下「play」鈕，或評量的「繼續播放」鈕，繼續播放時，必須有這段code，才能同步播放頭。
	if(param.updateTimerFlagArr[index] === false){
		param.updateTimerFlagArr[index] = tPlayer.resumeUpdateTimer(index);
	}
	
	//
	$('.mediaDiv:eq(' + index + ') .coverPlayIcon').empty().remove();
	
	
	//播放時，若有評量、小反思，則加以清除或隱藏
	//●○●○●○●○●○●○1040703 =========================================================
	
	$('#quizDiv').css({'display':'none'}).empty().remove();
	$('#quizDiv, quizContainer').css({'display':'none'});
	//------------------------------------------------------------------
	$('#reflectionDiv').css({'display':'none'}).empty().remove();
	$('#reflectionDiv, #reflectionContainer').css({'display':'none'});

	//●○●○●○●○●○●○1040703 =========================================================


	return param.playingFlagArr[index];

};

		//
		method.h5_playVideo = function(index){
			
			//1051019 - 加上try...catch
			//========================================
			try {
				tPlayer.h5MediaObj[index].play();
			}catch(err){
			}
			//========================================

			return true;
		};


//●○1040513 - 暫停所有媒體檔
//------------------------
method.pauseAllMedia = function(_currIndex){
	$('.mediaWrapper').each(function(index) {
		if(_currIndex !== index){
			//1051117 - 增加條件式
			if( param.playingFlagArr[index] ){
				tPlayer.pause(index);
			}
		}
	});
};
//------------------------


//●○
tPlayer.pause = function(index){
	if(param.playModeArr[0] === "flash"){
		tPlayer.swfMediaObj[index] = document.getElementById("tPlayer_"+index.toString());
		param.playingFlagArr[index] = tPlayer.swfMediaObj[index].as3_pauseVideo();

	}else if(param.playModeArr[0] === "html5"){
		//alert(index + '/' +param.playingFlagArr[index]);
		tPlayer.h5MediaObj[index] = document.getElementById("html5Media"+index.toString());
		param.playingFlagArr[index] = method.h5_pauseVideo(index);
		//alert(index + '/' +param.playingFlagArr[index]);

	}else{
		//
	}
	
	//===============================
	//1041029
	//●○1041013切換播放介面時，避免『尚未播放，.coverPlayIcon已經存在，又產生一個』的問題。
	if($('.mediaDiv:eq(' + index + ') .coverPlayIcon').get(0) === undefined){
		method.insertCoverImg(index);
	}
	
	//1041118 - 新增
	method.updatePbBtnState(index);

	//tPlayer.pauseUpdateTimer(index);
	return param.playingFlagArr[index];
};

		//
		method.h5_pauseVideo = function(index){
			//alert(index + '/' +param.playingFlagArr[index]); //為何這裡抓不到tPlayer.h5MediaObj[index]
			//tPlayer.h5MediaObj[index] = document.getElementById("html5Media"+index.toString());//alert(index);
			tPlayer.h5MediaObj[index].pause();
			
			//1041118 - 新增
			method.updatePbBtnState(index);

			//tPlayer.pauseUpdateTimer(index);
			return false;
		};

//●○
tPlayer.seek = function(_targetTime, index){
	if(param.playModeArr[0] === "flash"){
		//tPlayer.swfMediaObj[index] = document.getElementById("tPlayer_"+index.toString());
		tPlayer.swfMediaObj[index].as3_seek(_targetTime);
	}else if(param.playModeArr[0] === "html5"){
		
		//●○●○●○1051019加上try...catch可解決： 在Mobile上按.track不播放問題。
		//=======================================================
		try {
			//alert(tPlayer.h5MediaObj[index].currentTime);
			tPlayer.h5MediaObj[index].currentTime = _targetTime;
		}catch(err){
		}
		//=======================================================
		
	}else{
		//
	}
};

//似乎目前未調用
tPlayer.step = function(_frames, index){
	if(param.playModeArr[0] === "flash"){
		//tPlayer.swfMediaObj[index] = document.getElementById("tPlayer_"+index.toString());
		tPlayer.swfMediaObj[index].as3_step(_frames);

	}else if(param.playModeArr[0] === "html5"){
		//tPlayer.h5MediaObj[index].currentTime = _targetTime;
	}else{
		//
	}
};

//似乎目前未調用
tPlayer.totalTime = function(){
	var totalTime;
	if(param.playModeArr[0] === "flash"){
		totalTime = param.totalTimeArr;
	}else if(param.playModeArr[0] === "html5"){
		//
	}else{
		//
	}
	return totalTime;
};

//似乎目前未調用
tPlayer.currTime = function(index){
	var currTime;
	if(param.playModeArr[0] === "flash"){
		//currTime = param.currTimeArr[index];
		currTime = tPlayer.swfMediaObj[index].as3_getCurrTime();

	}else if(param.playModeArr[0] === "html5"){
		currTime = tPlayer.h5MediaObj[index].currentTime;
	}else{
		//
	}
	return currTime;
};

//●○ OK
tPlayer.pauseUpdateTimer = function(index){
	if(param.playModeArr[0] === "flash"){
		tPlayer.swfMediaObj[index] = document.getElementById("tPlayer_"+index.toString());
		tPlayer.swfMediaObj[index].as3_pauseUpdateTimer();

	}else if(param.playModeArr[0] === "html5"){
		//
		$(tPlayer.h5MediaObj[index]).off('timeupdate');

	}else{
		//
	}

	param.updateTimerFlagArr[index] = false;
	return param.updateTimerFlagArr[index];
};

//●○ OK
tPlayer.resumeUpdateTimer= function(index){
	if(param.playModeArr[0] === "flash"){
		tPlayer.swfMediaObj[index] = document.getElementById("tPlayer_"+index.toString());
		tPlayer.swfMediaObj[index].as3_resumeUpdateTimer();

	}else if(param.playModeArr[0] === "html5"){
		//
		$(tPlayer.h5MediaObj[index]).on('timeupdate',function(e){//timeupdate：播放中，會重複發生多次
			//$('#info').append(e.type + ' / ');
			//******
			tPlayer.updateCurrTime(tPlayer.h5MediaObj[index].currentTime, index);
		});

		//●●●1040819 - IE10 必須加上 trigger('timeupdate') ，滑鼠指標點擊.barouter之後，才能更新播放頭位置。---XXX
		//●○●○●1040821 - 發現不是這個問題，而是[行766]有tPlayer.pause(index)，所造成。
		//----------------------------------------------------------------------------------------------
		//$(tPlayer.h5MediaObj[index]).trigger('timeupdate');
		//----------------------------------------------------------------------------------------------

	}else{
		//
	}

	param.updateTimerFlagArr[index] = true;
	return param.updateTimerFlagArr[index];
};

//1040429 - HTML5 & Flash 媒體播放完成。
tPlayer.completed = function(_flag, index){
	//alert('tPlayer.completed');
	param.playingFlagArr[index] = _flag; //false
	param.endingFlagArr[index] = true;
	$('#info').append('param.playingFlagArr[index] : ' + index + '/' + param.playingFlagArr[index] + '</br>');
	method.updatePbBtnState(index);
	
	
	
	//》》》》》》》》》》》》》》》》》》 若需要用到tPlayer.completed()
	//可在各版型主程式檔，加入method.mediaCompleted()方法
	//●○●○●○●○●○●○●○●○●○●○●○●○
	//======================================
	//======================================
	if(method.mediaCompleted){ 
		method.mediaCompleted(index);
	}
	//======================================
	//======================================
	//●○●○●○●○●○●○●○●○●○●○
	
	

};

//尚未用到
//Flash安全性措施，無法從Flash外部調用Flash全螢幕功能
tPlayer.toFullScreen = function(index){
	if(param.playModeArr[0] === "flash"){
		tPlayer.swfMediaObj[index] = document.getElementById("tPlayer_"+index.toString());
		tPlayer.swfMediaObj[index].as3_toFullScreen();
	}else if(param.playModeArr[0] === "html5"){
		//
	}else{
		//
	}
};
//尚未用到
//Flash安全性措施，無法從Flash外部調用Flash全螢幕功能
tPlayer.toNormalScreen = function(index){
	if(param.playModeArr[0] === "flash"){
		tPlayer.swfMediaObj[index] = document.getElementById("tPlayer_"+index.toString());
		tPlayer.swfMediaObj[index].as3_toNormalScreen();
	}else if(param.playModeArr[0] === "html5"){
		//
	}else{
		//
	}
};


//1061128
tPlayer.h5GoFullScreen = function(element){
	// go full-screen
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();
	} else if (element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if (element.msRequestFullscreen) {
		element.msRequestFullscreen();
	}
};


//未用到
//MDN - Using fullscreen mode
//https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode
tPlayer.toggleFullScreen = function (elem) {
	
	
	var videoTagObj = document.getElementById( param.h5MediaObjId ); 
	
	
	//
	if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {
		
		//●
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		} else if (elem.msRequestFullscreen) {
			elem.msRequestFullscreen();
		} else if (elem.mozRequestFullScreen) {
			elem.mozRequestFullScreen();
		} else if (elem.webkitRequestFullscreen) {
			elem.webkitRequestFullscreen();
		}
		
		param.h5FullScreen = true;
		
		//●
		//setTimeout(function(){
			//videoTagObj.setAttribute("controls","controls");
		//},1000);
		
		
	} else {
		
		//●
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
		
		param.h5FullScreen = false;
		
		//●
		//setTimeout(function(){
			//videoTagObj.removeAttribute('controls');
		//},1000);
	}
	
	
	//●
	document.addEventListener("keydown", function(e) { 
		
		//
		if (e.keyCode === 13) {
			

			
				
		}
	
	}, false);
	
	
	//
			/*//●
				if( videoTagObj.hasAttribute('controls') && !param.h5FullScreen ){
					
					videoTagObj.addEventListener('mousemove', function() { 
						videoTagObj.removeAttribute('controls');
					}, false);
						
					
				}*/
				
				/*$(document).mousemove(function(e){
					if( videoTagObj.hasAttribute('controls') && !param.h5FullScreen ){
					
						videoTagObj.addEventListener('mousemove', function() { 
							videoTagObj.removeAttribute('controls');
						}, false);
						
					
					}
				});*/

};




//●○●○●○全畫面、一般畫面切換 <--- 用這方法
// Find the right method, call on correct element
//========================================================
tPlayer.enterH5FullScreen = function(index/*element*/) {

	//---------------------------------------
	/*if(element.requestFullscreen) {
		element.requestFullscreen();

	} else if(element.mozRequestFullScreen) {
		element.mozRequestFullScreen();

	} else if(element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();

	} else if(element.msRequestFullscreen) {
		element.msRequestFullscreen();

	}*/

	//dumpFullscreen();
	//---------------------------------------

	//○●判斷是flash播放的全螢幕，還是html5播放的全螢幕
	//調用method.fullScreenObjAjust()時，帶入相應參數
	//---------------------------------------
	if(param.playModeArr[0] === "flash"){
		tPlayer.swfMediaObj[index] = document.getElementById("tPlayer_"+index.toString());
		method.fullScreenObjAjust(tPlayer.swfMediaObj[index],param.mediaWidthArr[index],param.mediaHeightArr[index], index);

	}else if(param.playModeArr[0] === "html5"){
		//alert(index +'/' + tPlayer.h5MediaObj[index]);
		//tPlayer.h5MediaObj[index] = document.getElementById("html5Media"+index.toString());
		//alert(index + '/' + tPlayer.h5MediaObj[index]);
		method.fullScreenObjAjust(tPlayer.h5MediaObj[index],param.mediaWidthArr[index],param.mediaHeightArr[index], index);
	}
	//---------------------------------------


};


function dumpFullscreen() {
	console.log("全螢幕Element: ", document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
}
//========================================================




//↑↑↑=======================================================├┤├┤├┤
//●TPlay API





//1040331__●●●
//==================================================================
method.attachH5MediaEvent = function(index) {

	$(tPlayer.h5MediaObj[index]).on('emptied',function(e){//emptied：於讀取開始時發生，為最初產生的事件
		//$('#info').append(e.type + ' / ');
	});

	$(tPlayer.h5MediaObj[index]).on('waiting',function(e){//waiting：等待下載下個影格
		//$('#info').append(e.type + ' / ');;
	});

	$(tPlayer.h5MediaObj[index]).on('loadstart',function(e){//loadstart：開始讀取資料
		//$('#info').append(e.type + ' / ');
	});
	
	
	//1041028 - 
	//●媒體檔在串流端，就算有●行700： tPlayer.h5MediaObj[index].load()，Android播放之前都抓不到duration，
	//在local端，不用●行700： tPlayer.h5MediaObj[index].load()，也能在播放前就抓到duration
	//=============================================================
	$(tPlayer.h5MediaObj[index]).on('durationchange',function(e){//durationchange：媒體資料的長度變更了(發生於取得說明資料時)
		//$('#info').append(e.type + ' / ');
		
		//●此處為桌機 和 iOS裝置，不可缺。
		//●其實有了tPlayer.h5MediaObj[index].load()，則Android的Chrome等瀏覽器，就可抓到媒體長度
		//******************************************************************
		tPlayer.updateTotalTime(tPlayer.h5MediaObj[index].duration, index);
		//******************************************************************
		//alert(tPlayer.h5MediaObj[index].duration);
		//alert(e.target.duration);
		//alert(e.currentTarget.duration);
	});
	
	//○○○
	$(tPlayer.h5MediaObj[index]).on('loadedmetadata',function(e){//loadedmetadata：讀取了媒體的說明資料(播放時間、影片的寬度高度)
		//$('#info').append(e.type + ' / ');
		
		//******此處只有為了 Android Chrome 和 Android 預設瀏覽器
		//需搭配 ●行700： tPlayer.h5MediaObj[index].load();
		//●但其實有了tPlayer.h5MediaObj[index].load()，藉由durationchange事件，Android Chrome等就可抓到媒體長度。
		//--->>> ●桌機和iOS則不能藉由 loadedmetadata事件，抓取媒體長度。
		tPlayer.updateTotalTime(tPlayer.h5MediaObj[index].duration, index);
		//alert(e.target.duration);
		//alert(e.currentTarget.duration);
		
	});
	//=============================================================
	

	$(tPlayer.h5MediaObj[index]).on('loadeddata',function(e){//loadeddata：讀取了媒體資料
		//$('#info').append(e.type + ' / ');
	});

	//
	$(tPlayer.h5MediaObj[index]).on('progress',function(e){//progress：資料讀取中(會重複多次產生)
		//$('#info').append(e.type + ' / ');
	});

	$(tPlayer.h5MediaObj[index]).on('canplay',function(e){//canplay：可開始播放(資料讀取已達某個程度)
		//$('#info').append(e.type + ' / ');
	});

	$(tPlayer.h5MediaObj[index]).on('canplaythrough',function(e){//canplaythrough：若維持目前的下載速度可播到最後(資料讀取已達某個程度)
		//$('#info').append(e.type + ' / ');
	});

	$(tPlayer.h5MediaObj[index]).on('load',function(e){//load：資料已下載完成
		//$('#info').append(e.type + ' / ');
	});

	$(tPlayer.h5MediaObj[index]).on('play',function(e){//play：於播放開始時發生，為最初產生的事件
		//$('#info').append(e.type + ' / ');

		//1040620
		//------------------------------
		tPlayer.setPlayFlag(true, index);
		//------------------------------

	});

	$(tPlayer.h5MediaObj[index]).on('playing',function(e){//開使播放
		//$('#info').append(e.type + ' / ');
	});

	//○○○
	$(tPlayer.h5MediaObj[index]).on('timeupdate',function(e){//timeupdate：播放中，會重複發生多次
		//$('#info').append(e.type + ' / ');

		//******************************************************************
		tPlayer.updateCurrTime(tPlayer.h5MediaObj[index].currentTime, index);
		//******************************************************************

	});

	$(tPlayer.h5MediaObj[index]).on('pause',function(e){//pause：播放暫停
		//$('#info').append(e.type + ' / ');
		tPlayer.setPlayFlag(false, index);
	});

	$(tPlayer.h5MediaObj[index]).on('seeking',function(e){//seeking：往指定的播放位置移動
		//$('#info').append(e.type + ' / ');
	});

	$(tPlayer.h5MediaObj[index]).on('seeked',function(e){//seeked：移到了指定的播放位置
		//$('#info').append(e.type + ' / ');
	});

	$(tPlayer.h5MediaObj[index]).on('ratechange',function(e){//ratechange：變更了播放速度
		//$('#info').append(e.type + ' / ');
	});

	$(tPlayer.h5MediaObj[index]).on('volumechange',function(e){//volumechange：音量變更了
		//$('#info').append(e.type + ' / ');
	});

	/*------------------------------------------*/

	$(tPlayer.h5MediaObj[index]).on('stalled',function(e){//stalled：資料的下載變慢
		//$('#info').append(e.type + ' / ');
	});

	$(tPlayer.h5MediaObj[index]).on('error',function(e){//error：發生錯誤
		//$('#info').append(e.type + ' / ');
	});

	$(tPlayer.h5MediaObj[index]).on('abort',function(e){//abort：資料下載因錯誤而中止
		//$('#info').append(e.type + ' / ');
	});


	$(tPlayer.h5MediaObj[index]).on('suspend',function(e){//suspend：資料下載中止(沒有發生錯誤) or 当浏览器刻意不获取媒体数据时
		//$('#info').append(e.type + ' / ');
	});

	$(tPlayer.h5MediaObj[index]).on('loadend',function(e){//loadend:資料的讀取(因某些理由)結束。於load、abort、error之後發生。
		//$('#info').append(e.type + ' / ');
	});

	/*------------------------------------------*/

	//HTML5 Video播放結束的事件註冊
	$(tPlayer.h5MediaObj[index]).on('ended',function(e){
		//$('#info').append(e.type + ' / ');

		//●1040512
		//-------------------------------
		tPlayer.completed(false,index);
		//-------------------------------

	});



	//●○●○●○改變右鍵選單
	/*---------------------------------------*/
	$(tPlayer.h5MediaObj[index]).on('mousedown',function(e){
		method.showDropdown(e,this,index);
	});
	/*---------------------------------------*/



};
//==================================================================





//●○※全畫面、全畫面resize、一般畫面 處理 - 1041012移到這裡
//-------------------------------------------
var fullScreenCounter = 0;
//-------------------------------------------
//●○●○●○(_mediaObj,_mediaW,_mediaH)：(播放技術物件,媒體寬度,媒體高度)
method.fullScreenObjAjust = function(_mediaObj,_mediaW,_mediaH, index){
	//alert(_mediaW+'/'+_mediaH);

	//
	//$('.mediaDiv:eq(' + index + ') .coverPlayIcon').empty().remove();
	
	
	//●○●○●○1041103
	/*if(param.playModeArr[0] === "flash"){
		tPlayer.swfMediaObj[index].as3_stageScaleModeToExactFit();
	}*/
	
	
	//
	$(document.body).css({'overflow':'hidden'});
	//
	//tPlayer.pause(index);
	
	

	//
	//媒體檔(影音)之寬高比
	var mediaW2hRatio = _mediaW/_mediaH;

	//取得視窗寬高
	utils.getBrowserWH();

	//指定視窗寬高
	var _winW = utils.browserWH.w;
	var _winH = utils.browserWH.h;
	//alert(_winW + '/' + _winH);

	
	//●計算放大時使用的 mediaWidth 和 mediaHeight 的值
	var mediaWidth;
	var mediaHeight;
	//================================================================
		//若視窗寬度大於等於高度
		if(_winW >= _winH){
			//計算全畫面時，媒體檔的寬高，下方留10px空白
			mediaHeight = _winH - $('.mediaWrapper:eq(' + index + ') .playbackDiv').height() - $('.mediaWrapper:eq(' + index + ') .mediaHeader').height() - 10;

			mediaWidth = mediaHeight*mediaW2hRatio;

				//若寬度大於視窗寬度
				if(mediaWidth > _winW){
					mediaWidth = _winW;
					mediaHeight = mediaWidth/mediaW2hRatio;
				}

			$('#info').append('mediaWidth : '+mediaWidth+' / '+'mediaHeight : '+mediaHeight+'\n'+'_winW : '+_winW+' / '+'_winH : '+_winH+'</br>');

		//若視窗寬度小於高度
		}else if((_winW < _winH)){
			mediaWidth = _winW;
			mediaHeight = mediaWidth/mediaW2hRatio;
			$('#info').append('mediaWidth : '+mediaWidth+' / '+'mediaHeight : '+mediaHeight+'\n'+'_winW : '+_winW+' / '+'_winH : '+_winH+'</br>');

		}
	//================================================================
	//alert(mediaWidth+'/'+mediaHeight);

	//-------------------------------------------
	//### css有作用
	//$(tPlayer.swfMediaObj[index]).css({'width':mediaWidth,'height':mediaHeight});
	//### animate無作用
	//$(tPlayer.swfMediaObj[index]).animate({'width':mediaWidth,'height':mediaHeight},200);

	//### 不需調用swf的方法修改stageWidth和stageHeight
	//tPlayer.swfMediaObj[index].as3_adjustSwfWH(mediaWidth,mediaHeight);


	//放大前，記錄原始位置
	param.initInfo.initPosXArr[index] = $('.mediaWrapper:eq(' + index + ') ').offset().left;
	param.initInfo.initPosYArr[index] = $('.mediaWrapper:eq(' + index + ') ').offset().top;
	//放大前，記錄捲軸位置
	param.initInfo.initScrollPosY = $(document).scrollTop();
	
	//alert(param.initInfo.initPosXArr[index] + '/' + param.initInfo.initPosYArr[index]);
	
	//
	//alert($('.mediaWrapper:eq(' + index + ') ').parent().get(0).className);


	//-----------------------------------------------------
	//●○.mediaWrapper的css - position屬性改為absolute
	$('.mediaWrapper:eq(' + index + ') ').css({'position':'absolute','z-index':2150});
	//●○之後馬上定位到param.initInfo.initPosXArr[index]，param.initInfo.initPosYArr[index]
	$('.mediaWrapper:eq(' + index + ') ').animate({left:param.initInfo.initPosXArr[index],top:param.initInfo.initPosYArr[index]},0);
	//-----------------------------------------------------


	//●放大後的捲軸位置 !!! 為何是如此 ???
	var scrollPosY = $(document).scrollTop();
	
	
	//1041209
	//●◎需要擷取居中位置 - 例：G203。媒體位置不是居中狀態下，跳至全畫面，位置會有偏差。
	//-----------------------------------------------------
	//tPlayer,css有.mediaWrapper_fullScreen。 ●G203需另將.mediaWrapper_fullScreen加入g203_Overlay.css。
	//-----------------------------------------------------●
	//.mediaWrapper的margin-left在全畫面與全畫面resize時設為0，以addClass()取用.mediaWrapper_fullScreen的css，
	// 回到一般畫面時，移除.mediaWrapper_fullScreen
	//-----------------------------------------------------●
	$('.mediaWrapper:eq(' + index + ') ').addClass('mediaWrapper_fullScreen');
	//-----------------------------------------------------
	
	
	//●◎1041209 - 處理IE8(含)以下不居中 - ok
	if( !document.addEventListener ){
		$('.mediaWrapper:eq(' + index + ') ').css({'margin-left':'auto','margin-right':'auto'});
	}
	
	
	var centerPosW = $(window).width()/2 - mediaWidth/2;
	var centerPosH = $(window).height()/2 - mediaHeight/2;
	//alert(centerPosW);
	//-----------------------------------------------------
	//-----------------------------------------------------
	

	//
	var playbackDivHeight = parseInt($('.mediaWrapper:eq(' + index + ') .playbackDiv').css('height'));
	if(isNaN(playbackDivHeight)){
		playbackDivHeight = 0;
	}
	//.mediaHeader的高度
	var headerHeight = $('.mediaWrapper:eq(' + index + ') .mediaHeader').height();
	if(isNaN(headerHeight)){
		headerHeight = 0;
	}
	//alert(headerHeight);


	//1040507 - ●全畫面時，初始化建構遮檔下方物件之用的DIV
	//-----------------------------------------------------
	var mediaWallHtml = '<div id="mediaWall"></div>';
	$(document.body).append(mediaWallHtml);

	//
	$('#mediaWall').animate({'width':$(document).width(),'height':$(document).height(),'opacity':0},0,function(){
		$('#mediaWall').animate({'opacity':param.mediaWallOpacity},200,function(){
			
			
			//按下$('#mediaWall')的事件處理 - 附加關掉全畫面的事件
			$('#mediaWall').on('click',function(){
				//-----------------------------------------------------------------
				if(param.fullScreenFlagArr[index]){
					//tPlayer.leaveH5FullScreen($('.mediaWrapper'));
					//tPlayer.leaveH5FullScreen(document.getElementsByClassName('mediaWrapper'));
					
					//
					tPlayer.leaveH5FullScreen(index);
					
					//
					$('#mediaWall').off('click');
				}
				//-----------------------------------------------------------------
			});
			
		
		});
	});
	//-----------------------------------------------------




	//●1040616
	//$('.mediaWrapper:eq(' + index + ') ').animate({left:centerPosW,top:centerPosH,'width':mediaWidth,'heigt':mediaHeight},0);
	//●top:scrollPosY - 對應行925的 var scrollPosY = $(document).scrollTop();
	$('.mediaWrapper:eq(' + index + ') ').animate({left:centerPosW,top:scrollPosY,'width':mediaWidth/*,'height':mediaHeight + playbackDivHeight + headerHeight*/},200,function(){
	});



	//《HTML5媒體物件可用jQuery animate處理承動畫縮放
	//alert(_mediaObj);
	//$(_mediaObj).animate({'width':mediaWidth,'height':mediaHeight},0);
	//●用這調整swf寬高 - 無法用jQuery animate處理成連貫縮放
	//
	_mediaObj.width = mediaWidth;
	
	//●○1041208
	try {
		_mediaObj.height = mediaHeight;
	}catch(err){
		//
	}
	//-------------------------------------------
	//alert(tPlayer.h5MediaObj[index]);
	//alert(tPlayer.h5MediaObj[index].width+'/'+tPlayer.h5MediaObj[index].height);

	//●○
	$('.mediaDiv:eq(' + index + ') ').css({'width':mediaWidth,'height':mediaHeight});
	//1040702
	$('.mediaWrapper:eq(' + index + ') ').css({'height':'auto'});
	
	
	//●○●○●○1040922 - 調整位置
	method.adjustCoverImgPos(index,2);




	$('.mediaWrapper:eq(' + index + ') .mediaHeader, .mediaWrapper:eq(' + index + ') .playbackDiv').animate({'width':mediaWidth},200,function(){

		//
		$('.mediaWrapper:eq(' + index + ') .slider').draggable("destroy");
		//==============================================
		method.caculateTrackWidth(mediaWidth, index);
		//==============================================
		method.jqUITouchPunchDrag(index);


		//1040630 - 從上方移到此位置，在method.caculateTrackWidth()之後
		//=====================
		method.removeDotSpan();
		method.putDot();
		//=====================


		//●○1040630 - 全螢幕狀態中暫停時，跳回一般狀態，必須有method.updateProgress(index)，
		//才能更新播放位置，否則播放頭位置與進度列長度會不正確
		//=====================
		method.updateProgress(index);
		//=====================
		
		//●○1040923
		//======================================================================================
		param.trackX[index] = $('.mediaWrapper:eq(' + index + ') .track').offset().left;
		//======================================================================================


		//IE之外的瀏覽器(Chromme、FF、Opera)需要兩次全螢幕處理才能達到滿效果
		//
		fullScreenCounter ++;
		/*if(fullScreenCounter < 2){
			method.fullScreenObjAjust(_mediaObj,_mediaW,_mediaH, index);
		}*/


		//●◎1040629 - .mediaDivOverlay位置、尺寸控制
		//===================================================
		var mediaDivOverlay_marginTop;

		//●◎播放介面在影音上方
		if(param.beforeOrAfter[index] === "before"){
			//
			mediaDivOverlay_marginTop = -(mediaHeight);

		//◎播放介面在影音下方
		}else if(param.beforeOrAfter[index] === "after"){
			//
			mediaDivOverlay_marginTop = -(mediaHeight);
			
			//●○●○●○1040911 - 位置才正確 - ●○1040915 - 不適合用這個方法
			//$('.mediaWrapper:eq(' + index + ') .playbackDiv').appendTo($('.mediaDiv:eq(' + index + ')'));
			
			
		}

		//alert($('.mediaDiv:eq(' + index + ')>.playbackDiv').get(0) != undefined);
		$('.mediaWrapper:eq(' + index + ') .mediaDivOverlay').css({'margin-top':mediaDivOverlay_marginTop,'opacity':param.mediaDivOverlayOpacity, 'width':mediaWidth, 'height':mediaHeight});
		//===================================================

		
		//
		param.fullScreenFlagArr[index] = true;
		$('.mediaWrapper:eq(' + index + ') .fullNormalScreen > img').attr('src',param.playerUIPrefixPath+'playerUI/normalScreen.png');


	});

	
	//處理 評量、小反思。
	//flash
	if(param.playModeArr[0] === "flash"){
		
		$('#quizDiv').css({'left':0,'top':-tPlayer.swfMediaObj[0].height,'width':'100%','height':tPlayer.swfMediaObj[0].height});
		$('#reflectionDiv').css({'left':0,'top':-tPlayer.swfMediaObj[0].height,'width':'100%','height':tPlayer.swfMediaObj[0].height});

		
		//●○●○●○1040915 - 全畫面狀態下，遇到暫停點，.mediaDiv的高度會撐得很大，把.playbackDiv(播放控制列)往下帶到很底端，超出頁面所以看不到。
		//●○●○●○所以，必須設定mediaDiv的高度，且將.mediaDiv的css屬性overflow設為hidden。
		//=======================================================================================
		$('.mediaWrapper:eq(0) .mediaDiv').css({'height':tPlayer.swfMediaObj[0].height,'overflow':'hidden'});
		//=======================================================================================
		
	//html5
	}else if(param.playModeArr[0] === "html5"){
		
		$('#quizDiv').css({'left':0,'top':-tPlayer.h5MediaObj[0].height,'width':'100%','height':tPlayer.h5MediaObj[0].height});
		$('#reflectionDiv').css({'left':0,'top':-tPlayer.h5MediaObj[0].height,'width':'100%','height':tPlayer.h5MediaObj[0].height});
		
		//=======================================================================================
		$('.mediaWrapper:eq(0) .mediaDiv').css({'height':tPlayer.h5MediaObj[0].height,'overflow':'hidden'});
		//=======================================================================================
		
	}
	


};
//-------------------------------------------



//*****************************************************
method.fullScreenWinOnResize = function(_mediaObj,_mediaW,_mediaH, index){
//*****************************************************

	//
	param.fullScreenAdjustFlag = true;


	//媒體檔(影音)之寬高比
	var mediaW2hRatio = _mediaW/_mediaH;

	//取得視窗寬高
	utils.getBrowserWH();
	//指定視窗寬高
	var _winW = utils.browserWH.w;
	var _winH = utils.browserWH.h;
	//alert(_winW + '/' + _winH);

	var mediaWidth;
	var mediaHeight;


	//●計算放大時使用的 mediaWidth 和 mediaHeight 的值
	//================================================================
	//若視窗寬度大於等於高度
	if(_winW >= _winH){
		//計算全畫面時，媒體檔的寬高，下方留10px空白
		mediaHeight = _winH - $('.mediaWrapper:eq(' + index + ') .playbackDiv').height() - $('.mediaWrapper:eq(' + index + ') .mediaHeader').height() - 10;
		mediaWidth = mediaHeight*mediaW2hRatio;
		//若寬度大於視窗寬度
		if(mediaWidth > _winW){
			mediaWidth = _winW;
			mediaHeight = mediaWidth/mediaW2hRatio;
		}
		//$('#info').append('mediaWidth : '+mediaWidth+' / '+'mediaHeight : '+mediaHeight+'\n'+'_winW : '+_winW+' / '+'_winH : '+_winH+'</br>');

	//若視窗寬度小於高度
	}else if((_winW < _winH)){
		mediaWidth = _winW;
		mediaHeight = mediaWidth/mediaW2hRatio;
		//$('#info').append('mediaWidth : '+mediaWidth+' / '+'mediaHeight : '+mediaHeight+'\n'+'_winW : '+_winW+' / '+'_winH : '+_winH+'</br>');

	}
	//================================================================
	


	//
	if(param.fullScreenFlagArr[index]){
		//
		$('#mediaWall').animate({'width':$(document).width(),'height':$(document).height()},0);

		//
		//$(_mediaObj).animate({'width':mediaWidth,'height':mediaHeight},0);
			//
			_mediaObj.width = mediaWidth;
			
			//●○1041208
			try {
				_mediaObj.height = mediaHeight;
			}catch(err){
				//
			}

		//1040702
		$('.mediaWrapper:eq(' + index + ') ').css({'height':'auto'});
		
		
		//●○●○●○1040922 - 調整位置
		method.adjustCoverImgPos(index,2);

		
		
		//
		$('.mediaWrapper:eq(' + index + '), .mediaWrapper:eq(' + index + ') .mediaHeader, .mediaWrapper:eq(' + index + ') .playbackDiv').animate({'width':mediaWidth},0,function(){});
		
		
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
					mediaDivOverlay_marginTop = -(mediaHeight);
	
				//◎播放介面在影音下方
				}else if($('.mediaDiv:eq(' + index + ')>.playbackDiv').get(0) !== undefined){
					mediaDivOverlay_marginTop = -(mediaHeight);
				}
				//alert(mediaDivOverlay_marginTop);
	
				//alert($('.mediaDiv:eq(' + index + ')>.playbackDiv').get(0) != undefined);
				$('.mediaWrapper:eq(' + index + ') .mediaDivOverlay').css({'margin-top':mediaDivOverlay_marginTop,'opacity':param.mediaDivOverlayOpacity, 'width':mediaWidth, 'height':mediaHeight});
	
				//===================================================
			}
	
	
			$('.mediaDiv:eq(' + index + ')').css({'width':mediaWidth,'height':'auto'});
	
	
			//---------------------------------------------------------------
			$('.mediaWrapper:eq(' + index + ') .slider').draggable("destroy");
			//$('.slider').draggable( "disable" );
			//delete $('.slider').draggable;
			//==============================================
			method.caculateTrackWidth(mediaWidth, index); 
			//method.caculateTrackWidth(mediaWidth, index);
			//==============================================
			//$('.slider').draggable( "enable" );
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
	
			
			//1041209
			//●◎需要擷取居中位置 - 例：G203。媒體位置不是居中狀態下，跳至全畫面，位置會有偏差。
			//-----------------------------------------------------
			//tPlayer,css有.mediaWrapper_fullScreen。 ●G203需另將.mediaWrapper_fullScreen加入g203_Overlay.css。
			//-----------------------------------------------------●
			//.mediaWrapper的margin-left在全畫面與全畫面resize時設為0，以addClass()取用.mediaWrapper_fullScreen的css，
			// 回到一般畫面時，移除.mediaWrapper_fullScreen
			//-----------------------------------------------------●
			$('.mediaWrapper:eq(' + index + ') ').addClass('mediaWrapper_fullScreen');
			//-----------------------------------------------------
			
			
			//計算水平居中位置，垂直置頂
			var centerPosW = _winW/2 - mediaWidth/2;
			//-----------------------------------------------------
			//-----------------------------------------------------
			
			//
			if(_winW > mediaWidth){
				$('.mediaWrapper:eq(' + index + ')').animate({'left':centerPosW,'top':$(document).scrollTop()},0);
			}else{
				$('.mediaWrapper:eq(' + index + ')').animate({'left':0,'top':$(document).scrollTop()},0);
			}
			
			
			


	}
	
	
//*****************************************************
};
//*****************************************************





//========================================================

tPlayer.leaveH5FullScreen = function(index/*element*/) {

	//---------------------------------------
	/*if(element.cancelFullScreen) {
		element.cancelFullScreen();

	} else if(element.mozCancelFullScreen) {
		element.mozCancelFullScreen();

	} else if(element.webkitCancelFullScreen) {
		element.webkitCancelFullScreen();

	} else if(element.msCancelFullScreen) {
		element.msCancelFullScreen();

	}*/
	//---------------------------------------


	//○●
	//---------------------------------------
	if(param.playModeArr[0] === "flash"){
		tPlayer.swfMediaObj[index] = document.getElementById("tPlayer_"+index.toString());
		method.normalScreenObjAjust(tPlayer.swfMediaObj[index],param.mediaWidthArr[index],param.mediaHeightArr[index], index);

	}else if(param.playModeArr[0] === "html5"){
		method.normalScreenObjAjust(tPlayer.h5MediaObj[index],param.mediaWidthArr[index],param.mediaHeightArr[index], index);

	}
	//---------------------------------------

};

//
method.normalScreenObjAjust = function(_mediaObj,_mediaW,_mediaH, index){
	
	
	//●○●○●○1041103
	/*if(param.playModeArr[0] === "flash"){
		tPlayer.swfMediaObj[index].as3_stageScaleModeToNoScale();
	}*/


	//1040507 - 恢復一般畫面時，對遮檔用的$('#mediaWall')做destroy處理
	//-------------------------------------------------------------
	$('#mediaWall').animate({'opacity':0},300,function(){
	//$('#mediaWall').animate({'width':0,'height':0},200,function(){
		$('#mediaWall').empty().remove();
	});
	//
	$(document.body).css({'overflow':'auto'});
	//-------------------------------------------------------------


	var currPosX = param.initInfo.initPosXArr[index];
	var currPosY = param.initInfo.initPosYArr[index];
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
	
	
	//●○ 1041201 - 必須放這理，動作時間200
	var newHeight = _mediaH + playbackDivHeight + headerHeight;
	$('.mediaWrapper:eq(' + index + ') ').animate({'left':currPosX,'top':currPosY,'width':_mediaW,'height':newHeight},100,function(){});


	//==========================================================================

	//《HTML5媒體物件可用jQuery animate處理承動畫縮放
	//$(_mediaObj).animate({'width':_mediaW,'height':_mediaH},100);
	//●用這調整《swf》寬高 - 無法用jQuery animate處理成動畫縮放
		//
		_mediaObj.width = _mediaW;
		
		//1041208
		try {
			_mediaObj.height = _mediaH;
		}catch(err){
			//
		}
		
		
		
	//●○●○●○1040922 - 調整位置
	method.adjustCoverImgPos(index,2);



	//●○ 1040616 - 1040629
	//--------------------------------------------------------------------------------------
	var mediaNewHeight;

	//●◎播放介面在影音上方
	if(param.beforeOrAfter[index] === "before"){
		mediaNewHeight = _mediaH;

	//◎播放介面在影音下方
	}else if(param.beforeOrAfter[index] === "after"){
		mediaNewHeight = _mediaH/* + playbackDivHeight*/;
	}

	$('.mediaDiv:eq(' + index + ') ').animate({'width':_mediaW,'height':mediaNewHeight},100);


	//--------------------------------------------------------------------------------------
	
		
		//●○※1040906 - 挪到這裡可解決：.mediaWrapper的margin-left、margin-right設為auto時，
		//●○※從全螢幕回到一般畫面時，拖曳播放頭不正常之問題。
		//###
		$('.mediaWrapper:eq(' + index + ') .mediaHeader, .mediaWrapper:eq(' + index + ') .playbackDiv').animate({'width':_mediaW},0,function(){
			
			//
			param.fullScreenAdjustFlag = false;
			//
			param.fullScreenFlagArr[index] = false;
			$('.mediaWrapper:eq(' + index + ') .fullNormalScreen > img').attr('src',param.playerUIPrefixPath+'playerUI/fullScreen.png');
	
	
			//↑↑↑●●● 1040616
			//---------------------------------------------------------------
			$('.mediaWrapper:eq(' + index + ') ').css({'position':'static'});
			//---------------------------------------------------------------
			
			//1040912 - 用不著這行。本來要用來修正 - 『從全畫面回到一般畫面，.mediaWrapper會壓到下一個影音.mediaWrapper』
			//$('.mediaWrapper:eq(' + index + ') ').insertBefore(param.mediaNextTagObj[index]);
			//alert($('.mediaWrapper:eq(' + index + ') ').next().get(0).tagName);
			
			
			//●◎●◎●●◎●◎●●◎●◎●◎1041208 - 取消這裏的destroy
			//==============================================================
			//--->>> 以避免IE8(含)以下，全畫面下縮放視窗進入'rwd'狀態時，再從全畫面進入一般畫面，出現jQuery lib的錯誤，
			//--->>> 並導致後續的錯誤。如，在這之後縮放視窗寬度，進入'normal'狀態，播放控制介面會多出一組，媒體長度也多出一組。
			
			// ◎IE6~IE8 - 不支援document.addEventListener
			//alert(document.addEventListener);
			
			if (!document.addEventListener) {
				//$('.mediaWrapper:eq(' + index + ') .slider').draggable("destroy");
			}else{
				$('.mediaWrapper:eq(' + index + ') .slider').draggable("destroy");
			}
			//==============================================================
			//●◎●◎●◎●◎●◎●●◎●◎●1041208
			
			
			//==============================================
			method.caculateTrackWidth(_mediaW, index); 
			//==============================================
			//●◎1041208
			method.jqUITouchPunchDrag(index);
	
	
			//=====================
			method.removeDotSpan();
			method.putDot();
			//=====================
	
	
			//●○1040630 - 全螢幕狀態中暫停時，跳回一般狀態，必須有method.updateProgress(index)，
			//才能更新播放位置，否則播放頭位置與進度列長度會不正確
			//=====================
			method.updateProgress(index);
			//=====================
			
			
			//●○1040923
			//======================================================================================
			param.trackX[index] = $('.mediaWrapper:eq(' + index + ') .track').offset().left;
			//======================================================================================
	
	
			//flash
			if(param.playModeArr[0] === "flash"){
				
				$('#quizDiv').css({'left':0,'top':-tPlayer.swfMediaObj[0].height,'width':'100%','height':tPlayer.swfMediaObj[0].height});
				$('#reflectionDiv').css({'left':0,'top':-tPlayer.swfMediaObj[0].height,'width':'100%','height':tPlayer.swfMediaObj[0].height});
		
				
				//●○●○●○1040915 - 全畫面狀態下，遇到暫停點，.mediaDiv的高度會撐得很大，把.playbackDiv(播放控制列)往下帶到很底端，超出頁面所以看不到。
				//●○●○●○所以，必須設定mediaDiv的高度，且將.mediaDiv的css屬性overflow設為hidden。
				//=======================================================================================
				$('.mediaWrapper:eq(0) .mediaDiv').css({'height':tPlayer.swfMediaObj[0].height,'overflow':'hidden'});
				//=======================================================================================
				
			//html5
			}else if(param.playModeArr[0] === "html5"){
				
				$('#quizDiv').css({'left':0,'top':-tPlayer.h5MediaObj[0].height,'width':'100%','height':tPlayer.h5MediaObj[0].height});
				$('#reflectionDiv').css({'left':0,'top':-tPlayer.h5MediaObj[0].height,'width':'100%','height':tPlayer.h5MediaObj[0].height});
				
				//=======================================================================================
				$('.mediaWrapper:eq(0) .mediaDiv').css({'height':tPlayer.h5MediaObj[0].height,'overflow':'hidden'});
				//=======================================================================================
				
			}
			
			
			
			//1041209
			//●◎需要擷取居中位置 - 例：G203。媒體位置不是居中狀態下，跳至全畫面，位置會有偏差。
			//-----------------------------------------------------
			//tPlayer,css有.mediaWrapper_fullScreen。 ●G203需另將.mediaWrapper_fullScreen加入g203_Overlay.css。
			//-----------------------------------------------------●
			//.mediaWrapper的margin-left在全畫面與全畫面resize時設為0，以addClass()取用.mediaWrapper_fullScreen的css，
			// 回到一般畫面時，移除.mediaWrapper_fullScreen
			//-----------------------------------------------------●
			$('.mediaWrapper:eq(' + index + ') ').removeClass('mediaWrapper_fullScreen');
			//-----------------------------------------------------
	

	
	
		});
		

		
		
	
	//--------------------------------------------------------------------------------------
	//●○ 1040616 - 
	//●●●1040912 - 不可有下面這行。 .mediaWrapper的高度不可設為auto。否則 『從全畫面回到一般畫面，.mediaWrapper會壓到下一個影音.mediaWrapper』
	//$('.mediaWrapper:eq(' + index + ') ').css({'height':'auto'});
	//--------------------------------------------------------------------------------------


	//●○1040521 - 處理$('.mediaWrapper:eq(' + index + ') .mediaDivOverlay')的 寬高 和 margin-top
	//if(param.playModeArr[0] == "flash"){
		//--------------------------------------------------
		//$('.mediaWrapper:eq(' + index + ') .mediaDivOverlay').css({'margin-top':-(_mediaH+playbackDivHeight),'opacity':param.mediaDivOverlayOpacity, 'width':_mediaW, 'height':_mediaH});


		//●◎1040629
		//===================================================
		var mediaDivOverlay_marginTop;

		//●◎播放介面在影音上方
		if(param.beforeOrAfter[index] === "before"){
			mediaDivOverlay_marginTop = -(_mediaH);

		//◎播放介面在影音下方
		}else if(param.beforeOrAfter[index] === "after"){
			mediaDivOverlay_marginTop = -(_mediaH);
		}
		//alert(mediaDivOverlay_marginTop);

		//alert($('.mediaDiv:eq(' + index + ')>.playbackDiv').get(0) != undefined);
		$('.mediaWrapper:eq(' + index + ') .mediaDivOverlay').css({'margin-top':mediaDivOverlay_marginTop,'opacity':param.mediaDivOverlayOpacity, 'width':_mediaW, 'height':_mediaH});
		//===================================================

	//}


	//●◎●◎●◎1041209
	//※※※G207-InVideoQuiz：以IE8(含)以下瀏覽，回到一般畫面，若寬度低於斷點，cuepoint的標示icon需清除掉。否則會有兩種icon(rwd和normal的icon同時存在)。
	if( !document.addEventListener ){
		method.removeDotSpan();
	}
	
	
	//●◎●◎●◎1041209 - 回到一般畫面，trigger觸發$(window).on('resize')事件處理，可依據視窗寬度，調整頁面排版(rwd或normal)。
	//==========================================================================
	setTimeout(function(){
		$(window).trigger('resize');
	},360);
	



};

//========================================================







//●
//==============================================
method.getStreamingData = function(index){

	/*urlObj.rtmpMediaURLArr = 'rtmp://lodm.nou.edu.tw/vod/_definst_/990113/mp3:01.mp3';*/
	
	//若賦值為　'streaming'　- 則連結遠端串流影音檔
	if(tPlayer.param.chooseSreamingOrLocalVideo === 'streaming'){

		//●Flash所使用的rtmp完整路徑
		//urlObj.rtmpMediaURLArr[index] = 'rtmp://' + param.streamingURLPrefix + param.courseCode +'/' + 'mp4:' + param.mediaURLArr[index];

		//------------------------------------------------------------------
		//●但Flash播放技術NetStream.play()需要的為 --> 「課程編碼」+後續的路徑與檔名
		//其「param.rtmpProtocol + '://' + param.streamingURLPrefix」則在as3中組合，並由NetConnection.connect()調用;
		//as3中程式碼： this.targetURLPrefix = this.ncProtocol + "://" + this.streamingURLPrefix;

		//.mp4
		if(param.mediaFileExtArr[index] === ".mp4"){
				
				//
				urlObj.rtmpMediaURLArr[index] = param.courseCode +'/' + 'mp4:' + param.mediaURLArr[index];
				
				
				//●○1061123
				//======================================================================
				urlObj.pcHttpMediaURLArr[index] = param.httpProtocol + '://' + param.httpURLPrefix + param.courseCode +'/' + param.mediaURLArr[index];
				//alert(urlObj.pcHttpMediaURLArr);
		
		
			
			

		//.mp3
		}else if(param.mediaFileExtArr[index] === ".mp3"){
			
			
				urlObj.rtmpMediaURLArr[index] = param.courseCode +'/' + 'mp3:' + param.mediaURLArr[index];
				
				//●○1061123
				//======================================================================
				urlObj.pcHttpMediaURLArr[index] = param.httpProtocol + '://' + param.httpURLPrefix + param.courseCode +'/' + param.mediaURLArr[index];
				
				//alert(urlObj.pcHttpMediaURLArr);
			
			
			
			//alert(urlObj.rtmpMediaURLArr[index]);
		//.m4a - ●不知是否可行 ? - 尚未測試驗證。
		//Using RTMP Streaming
		//http://support.jwplayer.com/customer/portal/articles/1430358-using-rtmp-streaming
		//An mp4: prefix is also required for M4A/F4A/AAC audio files:
		//●根據jWplayer網頁上說明：.m4a需要加上"mp4前綴"
		
		}else if(param.mediaFileExtArr[index] === ".m4a"){
			
			
				urlObj.rtmpMediaURLArr[index] = param.courseCode +'/' + 'mp4:' + param.mediaURLArr[index];
				
				//●○1061123
				//======================================================================
				urlObj.pcHttpMediaURLArr[index] = param.httpProtocol + '://' + param.httpURLPrefix + param.courseCode +'/' + param.mediaURLArr[index];
				
				//alert(urlObj.pcHttpMediaURLArr[index]);
			
			
		}
		//alert(urlObj.rtmpMediaURLArr[index]);

		//如果要播mp3(串流)，此處必須標示mp3，且不能有.mp3延伸檔名。
		//urlObj.rtmpMediaURLArr[index] = param.courseCode +'/' + 'mp3:' + param.mediaURLArr[index];
		//------------------------------------------------------------------
		
		
		
		//
		urlObj.rtspMediaURLArr[index] = param.rtspProtocol + '://' + param.streamingURLPrefix + param.courseCode +'/' + param.mediaURLArr[index];
		urlObj.iosMediaURLArr[index] = param.appleHlsProtocol + '://' + param.streamingURLPrefix + param.courseCode +'/' + param.mediaURLArr[index] + "/playlist.m3u8";

		//
		urlObj.progressiveMediaURLArr[index] = param.localDirectoryRoot + param.mediaURLArr[index];
		
		
	
	
	//若賦值為　'local'　- 則連結近端影音檔
	}else if(param.chooseSreamingOrLocalVideo === 'local'){

		urlObj.rtmpMediaURLArr[index] = param.localDirectoryRoot + param.mediaURLArr[index];
		//alert(urlObj.rtmpMediaURLArr[index]);
		urlObj.rtspMediaURLArr[index] = param.localDirectoryRoot + param.mediaURLArr[index];
		urlObj.iosMediaURLArr[index] = param.localDirectoryRoot + param.mediaURLArr[index];
		urlObj.progressiveMediaURLArr[index] = param.localDirectoryRoot + param.mediaURLArr[index];
		
		//●○1061123
		//======================================================================
		urlObj.pcHttpMediaURLArr[index] = param.localDirectoryRoot + param.mediaURLArr[index];
		//alert(urlObj.pcHttpMediaURLArr);
	
	
	//若為"else" - 可連結任意完整有效網址：需在HTML的mediaTarget設定完整有效網址。
	}else if(param.chooseSreamingOrLocalVideo === 'else'){
		
		urlObj.rtmpMediaURLArr[index] = param.mediaURLArr[index];
		urlObj.rtspMediaURLArr[index] = param.mediaURLArr[index];
		urlObj.iosMediaURLArr[index] = param.mediaURLArr[index];
		urlObj.progressiveMediaURLArr[index] = param.mediaURLArr[index];
		
		//●○1061123
		//======================================================================
		urlObj.pcHttpMediaURLArr[index] = param.mediaURLArr[index];
		//alert(urlObj.pcHttpMediaURLArr);
	
	}else{
		alert('只能使用streaming或local或else');
	}

	//alert(urlObj.rtmpMediaURLArr+'\n\n'+urlObj.rtspMediaURLArr+'\n\n'+urlObj.iosMediaURLArr+'\n\n'+urlObj.progressiveMediaURLArr+'\n\n');

	//●return urlObj Object
	return urlObj;

};
//==============================================

//
//==============================================
method.choosePlayMode = function(){ 

	//alert(utils.currentBrowser);

	if(utils.isMobile === true && utils.isIOS === true){
		/*以下為 Apple ios 行動裝置*/

		if(utils.currentBrowser === "safari"){

			param.playModeArr = ["html5",urlObj.iosMediaURLArr];

		}else if(utils.currentBrowser === "chrome"){
			/* ios puffin 瀏覽器 一開始偵測為"chrome", 後來又變成"safari" ?????? */
			//ios puffin瀏覽器可以跑HTML5 Video Tag (Apple HLS mp4) / 也可以跑Flash mp4 rtmp, 但在目前程式下Flash畫面頓頓的, 1011003__testVideo.html則不會.
			//清除暫存檔後,似乎清不乾淨, 會不穩定的有時跑HTML%影音,有時跑Flash mp4

			param.playModeArr = ["html5",urlObj.iosMediaURLArr];

		}else{

			param.playModeArr = ["html5",urlObj.iosMediaURLArr];

		}

		/*直接(將iosAudioPath)Apple http live streaming 的 URL 丟給 ios 裝置*/
		/*location.href = iosAudioPath;*/

	}else if(utils.isMobile === true && utils.isAndroid === true){
		/*以下非ios 行動裝置 - Browser, 例:Android - Chrome*/

		if(utils.currentBrowser === "chrome"){
			//Android Chrome 與 Android 預設瀏覽器都被判讀為chrome
			
			/*Android版Chrome不支援Flash Player, 現在沒有,以後也不會有Flash Player*/
			/*目前測試,Android版Chrome跑HTML5 Audio Tag + 串流mp3, 似乎跑不出來, mp3走 web server漸進式則可*/

			/*Android os上, Chrome無Flash Player，可用HTML5 Video Tag播rtsp串流mp4，或播近端mp4*/
			/*但1021101發現Android Chrome 無法吃 rtsp 串流，從Wowza官網技術文件找到資訊 → 可以吃 Apple HLS 串流*/

			param.playModeArr = ["html5",urlObj.iosMediaURLArr];

		}else if(utils.currentBrowser === "firefox"){
			 //mozilla FF - 有Flash Player - 1040624不知如何安裝
			 //●●●1031009 Flash Video 需串流mp4才能播放，漸進式下載不能播

			//param.playModeArr = ["flash",urlObj.rtmpMediaURLArr];
			param.playModeArr = ["html5",urlObj.iosMediaURLArr];

		}else if(utils.currentBrowser === "safari"){
			//XXX - Android 預設瀏覽器, 有Flash Player。但許多新mobile裝置不支援
			//Android 預設瀏覽已經不會偵測為"safari"，而是偵測為"chrome"

			//param.playModeArr = ["flash",urlObj.rtmpMediaURLArr];
			param.playModeArr = ["html5",urlObj.iosMediaURLArr];

		}else if(utils.currentBrowser === "opera"){
			param.playModeArr = ["html5",urlObj.iosMediaURLArr];

		}else{
			param.playModeArr = ["html5",urlObj.iosMediaURLArr];

		}


	}else if(utils.isMobile === false){

		/*以下桌機上瀏覽器 - (非mobile) - 只在pc上測試過 / ***未能有http串流, 所以只好用Flash */

		if(utils.currentBrowser === "msie"){
			//param.playModeArr = ["flash",urlObj.rtmpMediaURLArr];
			//param.playModeArr = ["html5",urlObj.iosMediaURLArr];
			
			//param.playModeArr = ["html5",urlObj.pcHttpMediaURLArr];
			//alert(urlObj.pcHttpMediaURLArr);
			param.playModeArr = ["hlsHtml5",urlObj.pcHttpMediaURLArr];

		}else if(utils.currentBrowser === "chrome"){
			//param.playModeArr = ["flash",urlObj.rtmpMediaURLArr];
			//param.playModeArr = ["html5",urlObj.iosMediaURLArr];
			
			//param.playModeArr = ["html5",urlObj.pcHttpMediaURLArr];
			//alert(urlObj.pcHttpMediaURLArr[0]);
			param.playModeArr = ["hlsHtml5",urlObj.pcHttpMediaURLArr];

		}else if(utils.currentBrowser === "safari"){
			//param.playModeArr = ["flash",urlObj.rtmpMediaURLArr];
			//↓↓↓桌機筆電Windows的Safari 5.1.7版本，無法播放HTML5 Video
			//param.playModeArr = ["html5",urlObj.iosMediaURLArr];
			
			param.playModeArr = ["html5",urlObj.pcHttpMediaURLArr];
			//alert(urlObj.pcHttpMediaURLArr[0]);

		}else if(utils.currentBrowser === "firefox"){
			//param.playModeArr = ["flash",urlObj.rtmpMediaURLArr];
			//param.playModeArr = ["html5",urlObj.iosMediaURLArr];
			
			param.playModeArr = ["html5",urlObj.pcHttpMediaURLArr];
			//alert(urlObj.pcHttpMediaURLArr[0]);

		}else if(utils.currentBrowser === "opera"){
			//param.playModeArr = ["flash",urlObj.rtmpMediaURLArr];
			//param.playModeArr = ["html5",urlObj.iosMediaURLArr];
			
			param.playModeArr = ["html5",urlObj.pcHttpMediaURLArr];
			//alert(urlObj.pcHttpMediaURLArr[0]);

		}else{
			//param.playModeArr = ["flash",urlObj.rtmpMediaURLArr];
			//param.playModeArr = ["html5",urlObj.iosMediaURLArr];
			
			//param.playModeArr = ["html5",urlObj.pcHttpMediaURLArr];
			//alert(urlObj.pcHttpMediaURLArr[0]);
			param.playModeArr = ["hlsHtml5",urlObj.pcHttpMediaURLArr];

		}

	/*}else if(utils.isIE10 == true){
		//ie10

		*/
	}else{
		//param.playModeArr = ["flash",urlObj.rtmpMediaURLArr];
		//param.playModeArr = ["html5",urlObj.iosMediaURLArr];
		
		param.playModeArr = ["html5",urlObj.pcHttpMediaURLArr];
		//alert(urlObj.pcHttpMediaURLArr[0]);

	}
};
//==============================================





//●
//==============================================
utils.userAgentProp = function(){
	/**/
	/**************************************************************/
	var browser={
	versions:function(){
		var u = navigator.userAgent, app = navigator.appVersion;
		return {//移动终端浏览器版本信息
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
			iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') === -1, //是否web应该程序，没有头部与底部
			/**/
			ie8: u.indexOf('MSIE 8.0') > -1, //ie8
			ie10: u.indexOf('MSIE 10.0') > -1 //ie10
		};
	}(),

	language:(navigator.browserLanguage || navigator.language).toLowerCase()
	};
	/*doccument.writeln(" 是否为移动终端: "+browser.versions.mobile+"<p />");
	document.writeln(" ios终端: "+browser.versions.ios+"<p />");
	document.writeln(" android终端: "+browser.versions.android+"<p />");
	document.writeln(" 是否为iPhone: "+browser.versions.iPhone+"<p />");
	document.writeln(" 是否iPad: "+browser.versions.iPad+"<p />");
	document.writeln(navigator.userAgent);*/


	if(browser.versions.ios || browser.versions.iPhone || +browser.versions.iPad){
		utils.isIOS = true;
	}

	if(browser.versions.android){
		utils.isAndroid = true;
	}

	if(browser.versions.ie10){
		utils.isIE10 = true;
		/*alert("browser.versions.ie10 : " + browser.versions.ie10);*/
	}

	/*if(browser.versions.ie8){
		alert("browser.versions.ie8 : " + browser.versions.ie8);
	}*/

	//alert("navigator.userAgent : " + navigator.userAgent);

	/**************************************************************/


	/**************************************************************/
	var mobiles = new Array
			(
				"midp", "j2me", "avant", "docomo", "novarra", "palmos", "palmsource",
				"240x320", "opwv", "chtml", "pda", "windows ce", "mmp/",
				"blackberry", "mib/", "symbian", "wireless", "nokia", "hand", "mobi",
				"phone", "cdm", "up.b", "audio", "sie-", "sec-", "samsung", "htc",
				"mot-", "mitsu", "sagem", "sony", "alcatel", "lg", "eric", "vx",
				"NEC", "philips", "mmm", "xx", "panasonic", "sharp", "wap", "sch",
				"rover", "pocket", "benq", "java", "pt", "pg", "vox", "amoi",
				"bird", "compal", "kg", "voda", "sany", "kdd", "dbt", "sendo",
				"sgh", "gradi", "jb", "dddi", "moto", "iphone", "android",
				"iPod", "incognito", "webmate", "dream", "cupcake", "webos",
				"s8000", "bada", "googlebot-mobile"
			);

	var ua = navigator.userAgent.toLowerCase();
	utils.isMobile = false;

	for (var i = 0; i < mobiles.length; i++) {
		if (ua.indexOf(mobiles[i]) > 0) {
			utils.isMobile = true;
			break;
		}
	}
	/**************************************************************/

	/*alert("utils.isMobile : " + utils.isMobile);*/


};
//==============================================


//●判斷劉覽器種類 - 目前未用到
utils.detectBrowser = function(){
	$.browser.msie ? utils.currentBrowser = "msie" : null;
	$.browser.chrome ? utils.currentBrowser = "chrome" : null;
	$.browser.safari ? utils.currentBrowser = "safari" : null;
	$.browser.mozilla ? utils.currentBrowser = "mozilla" : null;
	$.browser.webkit ? utils.currentBrowser = "webkit" : null;

	return utils.currentBrowser;
};


//●判斷劉覽器種類&版本
//==============================================
utils.detectBrowserVersion = function(){

	/*一定要加這行,否則,Android Chrome會偵測為"Safari" ??? */
	//$.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());

	// Is this a version of IE?
	if($.browser.msie){
	  utils.version = utils.userAgent.substring(utils.userAgent.indexOf('msie')+5, utils.userAgent.indexOf('msie')+8);
	  utils.version = utils.version.substring(0,utils.version.indexOf('.'));
	  utils.currentBrowser = "msie";
	}

	// Is this a version of Opera?
	if(utils.userAgent.indexOf('opr/') !== -1){
	  utils.version = utils.userAgent.substring(utils.userAgent.indexOf('opr/') +4);
	  utils.version = utils.version.substring(0,utils.version.indexOf('.'));
	  $.browser.chrome = false; //必要
	  utils.currentBrowser = "opera";
	}

	// Is this a version of Chrome?
	if($.browser.chrome){ 
	//alert(utils.userAgent.substring(utils.userAgent.indexOf('chrome/')));
	  utils.version = utils.userAgent.substring(utils.userAgent.indexOf('chrome/') +7); 
	  utils.version = utils.version.substring(0,utils.version.indexOf('.'));
	  // If it is chrome then jQuery thinks it's safari so we have to tell it it isn't
	  $.browser.safari = false;
	  utils.currentBrowser = "chrome"; 
	}

	// Is this a version of Safari?
	if($.browser.safari){
	  utils.version = utils.userAgent.substring(utils.userAgent.indexOf('safari/') +7);
	  utils.version = utils.version.substring(0,utils.version.indexOf('.'));
	  utils.currentBrowser = "safari";
	}
	
	// Is this a version of 《●iOS Chrome》 ? - 1041020 - ●專門偵測iOS的Chrome
	/*if(utils.userAgent.substring(utils.userAgent.indexOf('crios/')) !== -1){ 
	//alert(utils.userAgent.substring(utils.userAgent.indexOf('crios/')));
	  utils.version = utils.userAgent.substring(utils.userAgent.indexOf('crios/') +6);
	  utils.version = utils.version.substring(0,utils.version.indexOf('.'));
	  // If it is chrome then jQuery thinks it's safari so we have to tell it it isn't
	  $.browser.safari = false;
	  utils.currentBrowser = "chrome";
	  
	}else if(utils.userAgent.substring(utils.userAgent.indexOf('safari/')) !== -1){
	  utils.version = utils.userAgent.substring(utils.userAgent.indexOf('safari/') +7);
	  utils.version = utils.version.substring(0,utils.version.indexOf('.'));
	  utils.currentBrowser = "safari";
	}*/

	// Is this a version of Mozilla?
	if($.browser.mozilla){
	//Is it Firefox?
	  if(navigator.userAgent.toLowerCase().indexOf('firefox') !== -1){
		utils.version = utils.userAgent.substring(utils.userAgent.indexOf('firefox/') +8);
		utils.version = utils.version.substring(0,utils.version.indexOf('.'));
		//utils.currentBrowser = "mozilla";
		utils.currentBrowser = "firefox";
	  }
	  // If not then it must be another Mozilla
	  else{
	  }
	}

	//●●●console.log - 在IE8會有問題，可能產生一些奇怪的錯誤
	//console.log(utils.currentBrowser+' '+utils.version+'\n'+utils.userAgent);
	//alert(utils.currentBrowser+' '+utils.version + '/'+$(window).width()+'px' +'\n'+utils.userAgent);
};
//==============================================


//
//==============================================
/*function loadJS(url, success) {
  var domScript = document.createElement('script');
  domScript.src = url;
  success = success || function(){};
  domScript.onload = domScript.onreadystatechange = function() {
    if (!this.readyState || 'loaded' === this.readyState || 'complete' === this.readyState) {
      success();
      this.onload = this.onreadystatechange = null;
      this.parentNode.removeChild(this);
    }
  }
  document.getElementsByTagName('head')[0].appendChild(domScript);
}*/
//==============================================


//傳入總秒數, 轉換為 分:秒格式, 並傳回
//==============================================
method.minuteSecond = function(_totalSec){

	var _tmpMitute = Math.floor(_totalSec / 60);
	var _tmpSec = Math.ceil(_totalSec % 60);

	var _tmpMituteStr;
	var _tmpSecStr;

	_tmpMituteStr = String(_tmpMitute);
	_tmpSecStr = String(_tmpSec);

	if(_tmpSec <= 9){
		_tmpSecStr = '0' + _tmpSecStr;
	}

	if(_tmpSec === 60){
		_tmpMituteStr = String(_tmpMitute+1);
		_tmpSecStr = '00';
	}

	if(_tmpMitute <= 9){
		_tmpMituteStr = '0' + _tmpMituteStr;
	}

	return _tmpMituteStr +':'+_tmpSecStr;
};


//1041028 -●○ 『 時：分：秒 』 轉換為 『 秒數 』 - 『 時：分：秒 』 例： "00:06:05.000"
//===========================================================================
method.hmsToSecond = function(_hmsStr){
	var hmsArr = _hmsStr.split(":");
	//alert(hmsArr[0]+' 時 '+hmsArr[1]+' 分 '+hmsArr[2]+' 秒 ');
	
	var sec = parseFloat(Math.floor(hmsArr[0]))*60*60 + parseFloat(Math.floor(hmsArr[1]))*60 + parseFloat(hmsArr[2]);
	//alert(sec);
	
	return sec;
};
//
//var hms = "01:06:05.250";
//method.hmsToSecond(hms);
//===========================================================================


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




//==============================================

//未用到吧
method.formatSecond = function(secs){          
	 var hr = Math.floor(secs / 3600);
	 var min = Math.floor((secs - (hr * 3600)) / 60);
	 var sec = parseInt( secs - (hr * 3600) - (min * 60));

	 while (min.length < 2) { min = '0' + min; }
	 while (sec.length < 2) { sec = '0' + min; }
	 if (hr) {
		 hr += ':';
	 }
	 return hr + min + ':' + sec;
};



//●○●○●○改變右鍵選單
//==============================================
method.showDropdown = function(e, obj, index){

	var rightClicked;
	e = e || window.event;
	if (e.which)       // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
		rightClicked = e.which == 3;

	else if (e.button)  // IE, Opera
		rightClicked = e.button == 2;

	if(!rightClicked)  return;

	obj.oncontextmenu = function(e){
		if(e && e.stopPropagation){
			e.preventDefault();
			e.stopPropagation();
		}else{
			e = window.event;
			e.returnValue = false;  //for IE
			e.cancelBubble = true;
		}

		//implement new menu show up
		method.showMenu(e, obj, index);

	};
};

//顯示自訂的右鍵選單
method.showMenu = function(e, obj, index){

	//
	var menuHtmlStr = '<span id="contextMenuContainer"></span>';
	var menuItemHtmlStr = '<span class="contextMenuItem"></span>';

	//destroy
	if($('#contextMenuContainer')){
		$('#contextMenuContainer').empty().remove();
		$(document).off('mousedown');
		$('.contextMenuItem:eq(0)').off('mouseover');
		$('.contextMenuItem:eq(1)').off('mouseover');
		$('.contextMenuItem:eq(0)').off('mouseout');
		$('.contextMenuItem:eq(1)').off('mouseout');
		$('.contextMenuItem:eq(0)').off('mousedown');
		$('.contextMenuItem:eq(1)').off('mousedown');
	}

	$('.mediaWrapper:eq(' + index + ')').append(menuHtmlStr);

	$(document).on('mousedown',function(){
		$('#contextMenuContainer').empty().remove();
	});

	$('#contextMenuContainer').append(menuItemHtmlStr);
	$('#contextMenuContainer').append(menuItemHtmlStr);


	//●○ 一般畫面 - 右鍵選單出現位置
	var menuPosX;
	var menuPosY;
	if(!param.fullScreenFlagArr[index]){
		//1040504 - 放此位置，menuPosY才能正確(#contextMenuContainer)
		//---------------------------------------------------------------------------
		menuPosX = $('.mediaDiv:eq(' + index + ')').offset().left + e.pageX - $('.mediaDiv:eq(' + index + ')').offset().left - parseInt($('#contextMenuContainer').css('width'))/2;
		menuPosY = $('.mediaDiv:eq(' + index + ')').offset().top + e.pageY - $('.mediaDiv:eq(' + index + ')').offset().top - parseInt($('#contextMenuContainer').css('height'));
		//alert(menuPosX + ' / ' + menuPosY + ' / ' + e.pageY);
		//---------------------------------------------------------------------------

	//●○ 全畫面 - 右鍵選單出現位置
	}else{
		menuPosX = e.pageX - $('.mediaDiv:eq(' + index + ')').offset().left - parseInt($('#contextMenuContainer').css('width'))/2;
		menuPosY = e.pageY - $('.mediaDiv:eq(' + index + ')').offset().top - parseInt($('#contextMenuContainer').css('height'))/2;
	}


	$('#contextMenuContainer').css({'left':menuPosX,'top':menuPosY});

	//if(obj.paused){
	if(!param.playingFlagArr[index]){
		$('.contextMenuItem:eq(0)').html('<span><img></span><span></span>');
		$('.contextMenuItem:eq(0) img').attr('src',param.playerUIPrefixPath + "playerUI/rightButton_play.png");
	}else{
		$('.contextMenuItem:eq(0)').html('<span><img></span><span></span>');
		$('.contextMenuItem:eq(0) img').attr('src',param.playerUIPrefixPath + "playerUI/rightButton_pause.png");
	}

	if(obj.muted){
		$('.contextMenuItem:eq(1)').html('<span><img></span><span></span>');
		$('.contextMenuItem:eq(1) img').attr('src',param.playerUIPrefixPath + "playerUI/rightButton_muted.png");
	}else{
		$('.contextMenuItem:eq(1)').html('<span><img></span><span></span>');
		$('.contextMenuItem:eq(1) img').attr('src',param.playerUIPrefixPath + "playerUI/rightButton_withSound.png");
	}

	var tmpbgColor = $('.contextMenuItem:eq(0)').css('background-color');
	//alert(tmpbgColor);
	$('.contextMenuItem:eq(0)').on('mouseover',function(){
		$(this).css({'background':'#AAA'});
	});

	$('.contextMenuItem:eq(0)').on('mouseout',function(){
		$(this).css({'background':tmpbgColor});
	});

	//1040512●○
	$('.contextMenuItem:eq(0)').on('mousedown',function(){
		//if(obj.paused){
		if(!param.playingFlagArr[index]){
			obj.play();
			tPlayer.setPlayFlag(true, index);

		}else{
			obj.pause();
			tPlayer.setPlayFlag(false, index);
		}

		//更新play/pause按鈕的顯示狀態
		method.updatePbBtnState(index);

	});


	$('.contextMenuItem:eq(1)').on('mouseover',function(){
		$(this).css({'background':'#AAA'});
	});

	$('.contextMenuItem:eq(1)').on('mouseout',function(){
		$(this).css({'background':tmpbgColor});
	});

	$('.contextMenuItem:eq(1)').on('mousedown',function(){
		if(obj.muted){
			obj.muted = false;
		}else{
			obj.muted = true;
		}
	});

};
//==============================================





//↓↓↓↓↓↓↓↓●○●○●○ In-Video Quiz ●○●○●○↓↓↓↓↓↓↓↓
//==============================================================================

//將inVideoQuiz暫停點時間存入timeCodeArr陣列
method.createTimeCodeArr = function(){

	$('.quizSet').each(function(index, element) {
		//
		if($('.quizSet:eq(' + index + ') .timeCode').text() !== "undefined"){
			//alert($('.quizSet:eq(' + index + ') .timeCode').text());
			param.timeCodeArr.push(method.hmsToSecond($('.quizSet:eq(' + index + ') .timeCode').text()));
		}
		
		//●○●○●○1040827 - method.putDot() - 在這裡可能不合適
		//if($('.quizSet:eq(' + index + ') .timeCode').length === index){
			//=====================
			//method.removeDotSpan();
			//method.putDot();
		//=====================
		//}

    });
	//alert(param.timeCodeArr);
	
	

};

//一般模式下的putDot
method.putDot = function(){

	var thisQuizTimeCode;
	var currentX;
	var dotHtml;
	
	dotHtml = '<span class="dotSpan"></span>';

	var quizDotRatio;
	var dotSpanWidth;
	var preQuizDotRatio;
	var currBarOuterWidth;
	var currTrackWidth; //1040907

	//迭代
	//$('#questionsData .quizSet').each(function(index,element){
	$.each(param.timeCodeArr,function(index,element){

		//取得第index個暫停點timeCode字串，轉換成浮點數
		//thisQuizTimeCode = parseFloat($('#questionsData .quizSet:eq(' + index + ') .timeCode').text());
		
		
		//●○1041023 - 暫停點需小於或等於媒體長度，才可附加 .dotSpan
		//=============================================================================
		if( param.timeCodeArr[index] <= param.totalTimeArr[0] ){
		//=============================================================================
		
			
			preQuizDotRatio = param.timeCodeArr[index]/param.totalTimeArr[0];
			//alert(param.timeCodeArr[index] + '/' + param.totalTimeArr[0]);
			//alert(preQuizDotRatio);
	
			//◎quiz暫停時間點相對於媒體長度的比例，且取為 小數點以下x位數
			quizDotRatio = parseFloat(preQuizDotRatio);
			//alert(quizDotRatio);
	
	
	
			//●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○
			//●○●○●○1040630 - 必須有這行-即時計算 .playbackDiv寬度，再調用method.caculateTrackWidth()
			//否則，全畫面時，點即.barOuter，播放器介面會縮回一般畫面寬度，拖曳播放頭時，播放時間會不準確。
			//=============================================================================
			var currMediaWidth = $('.mediaWrapper:eq(' + 0 + ') .playbackDiv').width();
			//=============================================================================
	
			//
			currBarOuterWidth = method.caculateTrackWidth(currMediaWidth, 0);
			//alert(currBarOuterWidth);
			
			//●○●○●○1040907
			currTrackWidth = $('.mediaWrapper:eq(' + 0 + ') .track').width();
	
	
			//將.dotSpan加入$('#seekBar')
			$('.mediaWrapper:eq(0) .track').append(dotHtml);
	
			//取得.dotSpan的寬度 - 目前好像沒用到 - 本來是要微調.dotSpan的left位置
			dotSpanWidth = $('.mediaWrapper:eq(0) .track .dotSpan:eq(' + index + ')').width();
			//alert(dotSpanWidth);
			
			
			//◎取得video暫停，跳出quiz的left位置 - ●seekBarWidth*(quizDotRatio)
			//currentX = Math.floor(currBarOuterWidth*(quizDotRatio)*100)/100 - Math.floor(dotSpanWidth/2);
			
			//●1040907-改為currTrackWidth
			currentX = Math.floor(currTrackWidth*(quizDotRatio)*100)/100 - Math.floor(dotSpanWidth/2); 
			//alert(currentX);
	
			//◎根據currentX，控制目前.dotSpan的CSS left位置
			
			$('.mediaWrapper:eq(0) .track .dotSpan:eq(' + index + ')').css({'left':currentX});
	
	
			//alert($('.mediaWrapper:eq(0) .track .dotSpan:eq(' + index + ')').css('left'));
			//alert($('.mediaWrapper:eq(0) .track').offset().left);
			//alert($('.mediaWrapper:eq(0) .track .dotSpan:eq(' + index + ')').css('left') + ' / ' +$('.mediaWrapper:eq(0) .track .dotSpan:eq(' + index + ')').css('top'));
			
		//=============================================================================
		}
		//=============================================================================
		
	});

};


//RWD模式下的putDot2
method.putDot2 = function(){

	var thisQuizTimeCode;
	var currentX;
	var dotHtml;
	var currTrackWidth;
	
	dotHtml = '<span class="dotSpan_2"></span>';

	var quizDotRatio;
	var dotSpanWidth;
	var preQuizDotRatio;
	var currBarOuterWidth;

	//迭代
	//$('#questionsData .quizSet').each(function(index,element){
	$.each(param.timeCodeArr,function(index,element){

		//取得第index個暫停點timeCode字串，轉換成浮點數
		//thisQuizTimeCode = parseFloat($('#questionsData .quizSet:eq(' + index + ') .timeCode').text());
		
		
		//●○1041023 - 暫停點需小於或等於媒體長度，才可附加 .dotSpan
		//=============================================================================
		if( param.timeCodeArr[index] <= param.totalTimeArr[0] ){
		//=============================================================================
		

		preQuizDotRatio = param.timeCodeArr[index]/param.totalTimeArr[0];
		//alert(param.timeCodeArr[index] + '/' + param.totalTimeArr[0]);
		//alert(preQuizDotRatio);

		//◎quiz暫停時間點相對於媒體長度的比例，且取為 小數點以下x位數
		quizDotRatio = parseFloat(preQuizDotRatio);
		//alert(quizDotRatio);



		//●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○
		//●○●○●○1040630 - 必須有這行-即時計算 .playbackDiv寬度，再調用method.caculateTrackWidth()
		//否則，全畫面時，點即.barOuter，播放器介面會縮回一般畫面寬度，拖曳播放頭時，播放時間會不準確。
		//=============================================================================
		var currMediaWidth = $('.mediaWrapper:eq(' + 0 + ') .playbackDiv_2').width();
		//=============================================================================

		//
		currBarOuterWidth = method.caculateTrackWidth(currMediaWidth, 0);
		//alert(currBarOuterWidth);
		
		//●○●○●○1040907
		currTrackWidth = $('.mediaWrapper:eq(' + 0 + ') .track_2').width();


		//將.dotSpan加入$('#seekBar')
		$('.mediaWrapper:eq(0) .track_2').append(dotHtml);

		//取得.dotSpan的寬度 - 目前好像沒用到 - 本來是要微調.dotSpan的left位置
		dotSpanWidth = $('.mediaWrapper:eq(0) .track_2 .dotSpan_2:eq(' + index + ')').width();


		//alert(dotSpanWidth);
		
		//◎取得video暫停，跳出quiz的left位置 - ●seekBarWidth*(quizDotRatio)
		//currentX = Math.floor(currBarOuterWidth*(quizDotRatio)*100)/100 - Math.floor(dotSpanWidth/3);
		
		//
		//●1040907-改為currTrackWidth
		currentX = Math.floor(currTrackWidth*(quizDotRatio)*100)/100 - Math.floor(dotSpanWidth/2); 
		//alert(currentX);

		//◎根據currentX，控制目前.dotSpan的CSS left位置
		$('.mediaWrapper:eq(0) .track_2 .dotSpan_2:eq(' + index + ')').css({'left':currentX});
		
		

		//alert($('.mediaWrapper:eq(0) .track .dotSpan:eq(' + index + ')').css('left'));
		//alert($('.mediaWrapper:eq(0) .track').offset().left);
		//alert($('.mediaWrapper:eq(0) .track .dotSpan:eq(' + index + ')').css('left') + ' / ' +$('.mediaWrapper:eq(0) .track .dotSpan:eq(' + index + ')').css('top'));
		
		//=============================================================================
		}
		//=============================================================================
		
	});

};

//
method.removeDotSpan = function(){
	//迭代$('#seekBar .dotSpan')，加以移除。
			
	$('.mediaWrapper:eq(0) .track .dotSpan').each(function(index,element){
		$(this).empty().remove();
	});

	
};

//
method.removeDotSpan2 = function(){
	//迭代$('#seekBar .dotSpan_2')，加以移除。
			
	$('.mediaWrapper:eq(0) .track_2 .dotSpan_2').each(function(index,element){
		$(this).empty().remove();
	});

	
};




//●●●暫停播放影音&出現評量題 - 從tPlayer.updateCurrTime(){}調用 method.pauseNQuiz()
//=====================================================================================
//=====================================================================================
//=====================================================================================
method.pauseNQuiz = function(indexNum){ //●○此處index，為param.timeCodeArr的index

	//取得timeCode資訊
	var t1 = param.timeCodeArr[indexNum];
	var currT = param.currTimeArr[0];
	//$('#info').append('<' + t1 + '│' + param.currTimeArr[0] + '><br>');

	//檢查timeCode停止點是否符合與處置
	//----------------------------------

	if(currT >= (t1-0.5) && currT <= t1){

		//tmpHtml5VideoVolume = html5Video.volume;
		//html5Video.volume = 0.0;

		//●○●○●○ 1040807 ●○●○●○
		var _pauseDelayTime;
		if(param.playModeArr[0] === 'flash'){
			_pauseDelayTime = param.pauseDelayTime;

		}else if(param.playModeArr[0] === 'html5'){
			if(utils.isAndroid){
				_pauseDelayTime = param.pauseDelayTime;

			}else{
				_pauseDelayTime = param.pauseDelayTime;
			}

		}else{
			_pauseDelayTime = param.pauseDelayTime;
		}

		/*if(seekNum >= param.totalTimeArr[0]){
			seekNum = param.totalTimeArr[0];
			tPlayer.completed(false,0);
		}*/
		
		
		
		
		
		
		//●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○
		//---------------------------------------------------------------
		//---------------------------------------------------------------
		//●○1040807 --- 偵測到暫停點，延遲_pauseDelayTime毫秒(預設300)，再暫停。
		setTimeout(function(){
			
			//
			tPlayer.pause(0);
			//更新play/pause按鈕的顯示狀態
			method.updatePbBtnState(0);
			

		}, _pauseDelayTime);

		//
		param.updateTimerFlagArr[0] = tPlayer.pauseUpdateTimer(0);
		//---------------------------------------------------------------
		//---------------------------------------------------------------
		//alert(_pauseDelayTime);



		//@@@@@@ In-video Quiz 在此調用評量、小反思、段落說明、回收「補救學習建議面板」 @@@@@@
		//-------------------------------------------------------------------------
		//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
		//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


		//●○1040922 - 如果前一個「quiz暫停點」，因答錯而出現「補救學習建議面板」，則在此處做回收。
		//method.clearSuggestionZoneDiv();
		//c21Quiz.clearSuggestionZoneDiv(); //1040930 - 移到tPlayer_InVideoQuizV20Quiz.js
		//※但似乎不必要調用此方法。就已清除回收#suggestionZoneDiv。

		//●○1040922 - 建立「●段落內容整理」功能
		method.createFocus(indexNum);

		//●○1040922 - 建立評量
		method.createQuiz(indexNum);
		
		//建立小反思
		method.createReflection(indexNum);

		
		//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
		//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
		//-------------------------------------------------------------------------
		

	}else {
		//
	}

};
//=====================================================================================
//=====================================================================================
//=====================================================================================





//●跳出 「導學||想一想」 面板(燈箱跳出)。這不需Timecode，進入頁面就跳出。
method.guidingPrompt = function(){
	//●●●1031124 - 增加「●導學」功能。(燈箱跳出)
	//------------------------------------------------------------------●
	//alert(typeof($('.quizSet:eq(' + index + ') .focusDiv')));
	//alert($('.quizSet:eq(' + index + ')').children('.focusDiv').get(0));

	//alert($('#promptDiv').get(0));
	if($('#promptDiv').get(0) !== undefined){
		
		//1041016
		param.targetJqObject = $('#promptDiv');
		//※※※
		param.lightBoxInitW = parseInt(param.targetJqObject.css('width'));
		param.lightBoxInitH = parseInt(param.targetJqObject.css('height'));
		

		var autoPlayFlag = $('#promptDiv').hasClass('continue');
		//alert(autoPlayFlag);

		//●●●method.filterDivice()會再行調用method.showWall()
		method.filterDivice(0, $('#promptDiv'), autoPlayFlag);
	}
	//------------------------------------------------------------------●
};



//清除 「補救學習建議面板」 - 
//1040930 - 移到tPlayer_InVideoQuizV20Quiz.js，改為c21Quiz.clearSuggestionZoneDiv()
//※但似乎不必要調用此方法。就已清除回收#suggestionZoneDiv。
method.clearSuggestionZoneDiv = function(){
	//如果前一個「quiz暫停點」，因答錯而出現「補救學習建議面板」，則在此處做回收。
	/********************************************************/
	if($('#suggestionZoneDiv')){
		//alert('zzz');
		$('#suggestionZoneDiv').empty().remove();
	}
	/********************************************************/
};



//建立「●段落說明」功能
method.createFocus = function(indexNum){
	
	//●●●1031127 - 增加「●段落說明」功能。(燈箱跳出)
	//《 ◎段落內容整理 》
	//------------------------------------------------------------------●
	//alert(typeof($('.quizSet:eq(' + indexNum + ') .focusDiv')));
	//alert($('.quizSet:eq(' + indexNum + ')').children('.focusDiv').get(0));

	if($('.quizSet:eq(' + indexNum + ')').children('.focusDiv').get(0) !== undefined){
		
		//1041016
		param.targetJqObject = $('.quizSet:eq(' + indexNum + ')').children('.focusDiv');
		//※※※
		param.lightBoxInitW = parseInt(param.targetJqObject.css('width'));
		param.lightBoxInitH = parseInt(param.targetJqObject.css('height'));
		
		
		//如果有continue這個class
		var autoPlayFlag = $('.quizSet:eq(' + indexNum + ') .focusDiv').hasClass('continue');

		//●●●method.filterDivice()會再行調用method.showWall()
		method.filterDivice(indexNum, $('.quizSet:eq(' + indexNum + ') .focusDiv'), autoPlayFlag);
	}
	//------------------------------------------------------------------●
	
};


//跳出燈箱。
//=====================================================================
//決定 - 哪種裝置跳出提示方塊
method.filterDivice = function(indexNum,_targetJqObject, _autoPlayFlag){

	//※※※
	//param.lightBoxInitW = parseInt(_targetJqObject.css('width'));
	//param.lightBoxInitH = parseInt(_targetJqObject.css('height'));
	

	switch(param.targetCondition){

		case 'all':
		//alert(_targetJqObject.get(0));
		//alert("param.lightBoxInitW/param.lightBoxInitH : " + param.lightBoxInitW +'/' + param.lightBoxInitH);
		if(_targetJqObject.get(0) !== undefined){
			method.showWall(indexNum,param.lightBoxInitW,param.lightBoxInitH,_targetJqObject,_autoPlayFlag);
		}

		break;

		case 'mobile':
			if(utils.isMobile){
				method.showWall(indexNum,param.lightBoxInitW,param.lightBoxInitH,_targetJqObject,_autoPlayFlag);
			}
		break;

		case 'ios':
			if(utils.isIOS){
				method.showWall(indexNum,param.lightBoxInitW,param.lightBoxInitH,_targetJqObject,_autoPlayFlag);
			}
		break;

		case 'android':
			if(utils.isAndroid){
				method.showWall(indexNum,param.lightBoxInitW,param.lightBoxInitH,_targetJqObject,_autoPlayFlag);
			}
		break;

	}
};


//●●●
method.showWall = function(indexNum,_w,_h,lightBoxJqObj,_autoPlayFlag){

	$(document.body).append('<div id="wallDiv"></div>');

	//$('#wallDiv')的初始位置、寬高尺寸
	$('#wallDiv').css({'left':0,'top':0,'width':30,'height':30,'opacity':'0.0','display':'block'});

	//$('#wallDiv')展開至滿版文件大小
	$('#wallDiv').animate({width:$(document).width(),height:$(document).height(),opacity:param.opacityValue},300,function(){
		
		//
		var getPosX,getPosY,getWidth,getHeight;
		//
		if(param.layoutType[0] === "normal"){
			
			//●●●1031125
			getWidth = _w;
			getHeight = _h;
	
			//●●●1031125
			if(getWidth < $(window).width()){
				getPosX = $(window).width()/2 - getWidth/2;
			}else{
				getPosX = 0;
			}
	
			if(getHeight < $(window).height()){
				//1040715
				getPosY = param.lightboxOuterHeightScope/2 - getHeight/2;
	
			}else{
				getPosY = 0;
			}

		
		//●○1040923 - 小尺寸視窗
		}else if(param.layoutType[0] === "rwd"){
			//
			var lightBoxDimension = method.getLightBoxJqObjSize();
			getWidth = lightBoxDimension[0];
			getHeight = lightBoxDimension[1];
			getPosX = lightBoxDimension[2];
			getPosY = lightBoxDimension[3];
			
		}

		$('#wallDiv').css({width:$(window.document).width(),height:$(window.document).height(),opacity:param.opacityValue});
		//
		lightBoxJqObj.appendTo($(document.body));
		//
		lightBoxJqObj.css({'width':0,'height':0,'opacity':'0.0','display':'block'});
		lightBoxJqObj.animate({width:getWidth,height:getHeight,opacity:1.0,left:getPosX,top:getPosY},300,function(){
			
			
			//附加關閉按鈕
			method.attachCloseIcon(indexNum,_w,_h,lightBoxJqObj,_autoPlayFlag);
			//alert(parseInt($('#closeBtn').css('width'))/2);
				
			//●○
			method.adjustLightBox();



		});


	});

};

//1041016
method.adjustLightBox = function(){
	
	//※※※ 共用 x,y 位置
	var lightBoxX, lightBoxY;
	//※※※ rwd - 寬高
	var lightBoxW, lightBoxH;
	//※※※ normal - 初始寬高
	//param.lightBoxInitW;
	//param.lightBoxInitH;
	
	
	//●○1041016 - 大尺寸視窗
	if(param.layoutType[0] === "normal"){
		
		//param.lightBoxInitW = parseInt(param.targetJqObject.css('width'));
		//param.lightBoxInitH = parseInt(param.targetJqObject.css('height'));
					
		//●●●1031125
		if(param.lightBoxInitW < ($(window).width())){
			lightBoxX = $(window).width()/2 - param.lightBoxInitW/2;
		}else{
			lightBoxX = 0;
		}

		if(param.lightBoxInitH < ($(window).height()) && param.lightBoxInitH < param.lightboxOuterHeightScope){
			lightBoxY = param.lightboxOuterHeightScope/2 - param.lightBoxInitH/2;
			
		}else if(param.lightBoxInitH < ($(window).height()) && param.lightBoxInitH >= param.lightboxOuterHeightScope){
			lightBoxY = $(window).height()/2 - param.lightBoxInitH/2;


		}else{
			lightBoxY = 0;
		}
		
		//
		if(param.targetJqObject){
			param.targetJqObject.css({'width':param.lightBoxInitW,'height':param.lightBoxInitH,'left':lightBoxX,'top':lightBoxY});
		
			$('#wallDiv').css({width:$(window.document).width(),height:$(window.document).height(),opacity:param.opacityValue});
			//
			$('#closeBtn').css({'left':param.lightBoxInitW+param.lightboxCloseBtnOffsetX, 'top':-param.lightBoxInitH-$('#closeBtn').height()+param.lightboxCloseBtnOffsetY});
		}	
				
	//●○1041016 - 小尺寸視窗
	}else if(param.layoutType[0] === "rwd"){
		//
		var lightBoxDimension = method.getLightBoxJqObjSize();
		lightBoxW = lightBoxDimension[0];
		lightBoxH = lightBoxDimension[1];
		lightBoxX = lightBoxDimension[2];
		lightBoxY = lightBoxDimension[3];
		
		//
		if(param.targetJqObject){
			param.targetJqObject.css({'width':lightBoxW,'height':lightBoxH,'left':lightBoxX,'top':lightBoxY});
			$('#wallDiv').css({width:$(window.document).width(),height:$(window.document).height(),opacity:param.opacityValue});
			//
			$('#closeBtn').css({'left':lightBoxDimension[0]+param.lightboxCloseBtnOffsetX, 'top':-lightBoxDimension[1]-$('#closeBtn').height()+param.lightboxCloseBtnOffsetY});
		}
	}
				
	
};

//小尺寸視窗 - 設定燈箱的寬高與位置，並回傳為陣列
method.getLightBoxJqObjSize = function(){
	
	var lightBoxWidth,lightBoxHeight,lightBoxPosX,lightBoxPosY;
	
	lightBoxWidth = $(window).width() - $(window).width()*0.08;
	lightBoxHeight = $(window).height() - $(window).height()*0.12;
	lightBoxPosX = $(window).width()/2 - lightBoxWidth/2;
	lightBoxPosY = $(window).height()/2 - lightBoxHeight/2;
	
	return [lightBoxWidth,lightBoxHeight,lightBoxPosX,lightBoxPosY];
	
};

//附加關閉按鈕
method.attachCloseIcon = function(indexNum,_w,_h,lightBoxJqObj,_autoPlayFlag){
	//
	lightBoxJqObj.append('<span id="closeBtn"></span>');
	
	//
	/*if(param.layoutType[0] === "normal"){
		$('#closeBtn').css({'left':param.lightBoxInitW-param.lightboxCloseBtnOffsetX, 'top':-param.lightBoxInitH-$('#closeBtn').height()+param.lightboxCloseBtnOffsetY});
	
	//小尺寸
	}else if(param.layoutType[0] === "rwd"){
		//
		var lightBoxDimension = method.getLightBoxJqObjSize();
		$('#closeBtn').css({'left':lightBoxDimension[0]-param.lightboxCloseBtnOffsetX, 'top':-lightBoxDimension[1]-$('#closeBtn').height()+param.lightboxCloseBtnOffsetY});
		
	}*/
	
	//
	$('#wallDiv').on('mousedown',function(){
		$('#closeBtn').remove();
		method.hideWall(indexNum,_w,_h,lightBoxJqObj,_autoPlayFlag);

	});

	$('#closeBtn').on('mousedown',function(){
		$('#closeBtn').remove();
		method.hideWall(indexNum,_w,_h,lightBoxJqObj,_autoPlayFlag);
		
	});
	
};

//
method.hideWall = function(indexNum,_w,_h,lightBoxJqObj,_autoPlayFlag){

	lightBoxJqObj.animate({width:0,height:0,opacity:0.0},300,function(){

		$('#wallDiv').animate({width:0,height:0,opacity:0.0},300,function(){

			$('#wallDiv').empty().remove();
			
			//●○1040924把燈箱(.focusDiv)隱藏後，再.appendTo($('.quizSet:eq(' + indexNum + ')'))，才能第二次使用。
			//因為燈箱(.focusDiv)的資料都包含在其內。
			lightBoxJqObj.css({'display':'none','width':_w,'height':_h}).appendTo($('.quizSet:eq(' + indexNum + ')'));
			
			//●○1040924
			//小尺寸視窗：有燈箱和布幕時，會出現捲軸。隱藏燈箱和布幕時，就會露出捲軸原本執用的空間為空白。
			//因此需再調用一次method.adjustInSmallWindows(0)，調整媒體和播放介面尺寸
			if(param.layoutType[0] === "rwd"){
				method.adjustInSmallWindows(0);
			}
			
		});
		
		//●○關閉燈箱後，是否自動播 - 段落內容整理(.focusDiv)
		//●○燈箱目前使用於一開始進入頁面時的導學(想一想)(#promptDiv)，段落內容整理(.focusDiv)
		if(_autoPlayFlag){
			if(utils.isMobile){
				//$('.mediaWrapper:eq(' + index + ') .playPause').trigger('mousedown');
				if(lightBoxJqObj.hasClass('focusDiv')){
					tPlayer.play(0);
				}
			}else{
				tPlayer.play(0);
			}
		}

	});
};
//=====================================================================



//建立「評量」
method.createQuiz = function(indexNum){
	
	//●●●1031127 - 影音暫停點可選擇出現「●評量」或「●小反思」功能，只能選擇其一。寬度與影音寬度相同。
		//《 ◎評量 》
		if($('.quizSet:eq(' + indexNum + ') .quizzing').get(0) !== undefined){
			//alert($('.quizSet:eq(' + indexNum + ')').children('.quizzing'));

			//$('#info').html('quizDiv');

			//●1031127 - 改為放到此處
			//加入評量 / $('#quizDiv')被加入到$('.mediaDiv')
			/*********************************************************************/
			$('.mediaDiv:eq(0)').append('<div id="quizDiv"></div>');
			//@@@評量的HTML架構
			$('#quizDiv').append('<div class="quizContainer"></div>');
			$('.quizContainer').append('<div alt="內容" id="quizArea"></div>');
			$('.quizContainer').append('<div id="interactiveArea"></div>');
			$('.quizContainer').append('<div id="tmpInfo"></div>');
			//--------------------------------------------------------------
			
			//顯示 -
			//1040721 - ●○$('#quizDiv')的display屬性，若設為block，下方若有其他影音物件，位置會被往下擠
			$('#quizDiv').css({'display':'inline-block'}); //原本預設為none (在tPlayer.js)
			$('.quizContainer').css({'display':'block'}); //原本預設為none (在tPlayer_Quiz.js)
			/*********************************************************************/

			//顯示評量 - ●1031127註解：#quizDiv在C21_Video.css - ●.quizContainer在C21_Quiz.css
			/*********************************************************************/
			
			
			
			//1040915 - ●○1040917
			//《《《《《《《《《《《《===========================================《《《《《《《
			method.quizAdjust();
			
	
				
			//●調用評量
			/********************************************************/
			//●●●調用cwmd21_VideoQuizV10QuizV10.js裡的c21Quiz.initQuiz()方法，建立	in Video Quiz
			/********************************/
			//quizzingFRNumArr = []; //改在 tPlayer_InVideoQuizV20Quiz.js 的 c21Quiz.initQuiz 初始化
			c21Quiz.initQuiz(indexNum);
			/********************************/
			//alert(indexNum);
			/********************************************************/
			
			
			/*$(document).on('mousedown',function(e){
				alert(e.target.nodeName);
			});*/
			

			//alert('評量');
		}else{
			//alert('沒有評量');
		}
		
	
};

//調整「評量」的位置、寬高，使符合,影音區塊或mediaDiv的大小
method.quizAdjust = function(){
	
	//1040915 - ●○1040917
	//《《《《《《《《《《《《===========================================《《《《《《《
	//alert($(window).width());
	
	var _mediaObj;
	if(param.playModeArr[0] === "flash"){
		_mediaObj = tPlayer.swfMediaObj[0];
		
	}else if(param.playModeArr[0] === "html5"){
		_mediaObj = tPlayer.h5MediaObj[0];
	}
	
	
	//排版型態param.layoutType[0]為normal
	if(param.layoutType[0] === "normal"){
		
		//●○●○●○1040916 - 小視窗狀態，處理評量區塊 (根據評量斷點param.breakpointQuiz)
		//==============================================================
		if($(window).width() < param.breakpointQuiz){ //alert($(window).width());
			$('#quizDiv').css({'left':0,'top':-_mediaObj.height,'width':'100%','height':_mediaObj.height});
			
		}else{
			$('#quizDiv').css({'left':0,'top':-_mediaObj.height,'width':'100%','height':_mediaObj.height});
			
		}
		//==============================================================
		
		
		//●○●○●○1040915 - 全畫面狀態下，遇到暫停點，.mediaDiv的高度會撐得很大，把.playbackDiv(播放控制列)往下帶到很底端，超出頁面所以看不到。
		//●○●○●○所以，必須設定mediaDiv的高度，且將.mediaDiv的css屬性overflow設為hidden。
		//=======================================================================================
		$('.mediaWrapper:eq(0) .mediaDiv').css({'height':_mediaObj.height,'overflow':'hidden'});
		//=======================================================================================
		
	
	//排版型態param.layoutType[0]為rwd
	}else if(param.layoutType[0] === "rwd"){
		
		
		//●○●○●○1040916 - 小視窗狀態，處理評量區塊 (根據評量斷點param.breakpoint)
		//==============================================================
		if($(window).width() < param.breakpointQuiz){
			
			//●○
			//=======================================================
			$('#quizDiv').insertAfter($('.mediaDiv:eq(0)'));
			//=======================================================
			$('#quizDiv').css({'left':0,'top':-_mediaObj.height,'width':'100%','height':'auto'});
			
			//●○1040917 - ○↓針對小裝置所設評量寬度斷點，寬度低於此數字，#quizDiv的高度會設為100%，讓評量可以一內容高度伸展。
			//但在某些寬度，有時評量的高度會小於#quizDiv高度，
			//alert($('#quizDiv').height() + '/' + _mediaObj.height);
			
			//1040918 - 1050120 - ●會妨礙到$('.pageWrapper')在rwd狀態下的寬度，無法剛好塞滿小尺寸視窗
			//$('.pageWrapper').css({'width':_mediaObj.width});
			//改為：
			$('.pageWrapper').css({'width':$(window).width()});
			
			//1040918
			/*if($('#quizDiv').height() < _mediaObj.height){
				$('#quizDiv').css({'left':0,'top':-_mediaObj.height,'width':_mediaObj.width,'height':_mediaObj.height});
			}*/
			
		//
		}else{
			$('#quizDiv').css({'left':0,'top':-_mediaObj.height,'width':_mediaObj.width,'height':_mediaObj.height});
			
		}
		//==============================================================
		
		
		//=======================================================================================
		$('.mediaWrapper:eq(0) .mediaDiv').css({'height':_mediaObj.height,'overflow':'hidden'});
		//=======================================================================================
		
	}
	
};



//建立 「小反思」
method.createReflection = function(indexNum){
	
	//●1031127
	//《 ◎小反思 》
	//======================================================================
	if($('.quizSet:eq(' + indexNum + ') .reflection').get(0) !== undefined){
		
		//
		param.targetJqObject = $('.quizSet:eq(' + indexNum + ') .reflection');
		//※※※
		param.lightBoxInitW = parseInt(param.targetJqObject.css('width'));
		param.lightBoxInitH = parseInt(param.targetJqObject.css('height'));
		
		
		//●1031127 - 改為放到此處
		//加入「小反思」 / $('#reflectionDiv')被加入到$('.mediaDiv')
		/*********************************************************************/
		$('.mediaDiv:eq(0)').append('<div id="reflectionDiv"></div>');
		//@@@小反思reflectionDiv的HTML結構
		$('#reflectionDiv').append('<div id="reflectionContainer"></div>');
		//
		$('#reflectionContainer').html($('.quizSet:eq(' + indexNum + ') .reflection').html());
		//--------------------------------------------------------------
		
		//顯示 -
		//1040721 - ●○$('#quizDiv')的display屬性，若設為block，下方若有其他影音物件，位置會被往下擠
		$('#reflectionDiv').css({'display':'inline-block'}); //原本預設為none (在tPlayer.js)
		$('#reflectionContainer').css({'display':'block'}); //原本預設為none (在tPlayer_Quiz.js)
			/*********************************************************************/
			
		//●●●1031127 - 小反思
		method.reflectionAdjust();
		//alert('小反思');
		
	}else{
		//alert('沒有小反思');
	}

	//alert($('.quizSet:eq(' + indexNum + ')').children('.reflectionDiv'));
	
};


//●●●1031127 - 小反思
method.reflectionAdjust = function(){

	//1040915 - 小反思(#reflectionDiv)
	//《《《《《《《《《《《《===========================================《《《《《《《
	
	var _mediaObj;
	if(param.playModeArr[0] === "flash"){
		_mediaObj = tPlayer.swfMediaObj[0];
		
	}else if(param.playModeArr[0] === "html5"){
		_mediaObj = tPlayer.h5MediaObj[0];
	}
	
	
	//排版型態param.layoutType[0]為normal
	if(param.layoutType[0] === "normal"){
		
		//●○●○●○1040916 - 小視窗狀態，處理評量區塊 (根據評量斷點param.breakpointQuiz)
		//==============================================================
		if($(window).width() < param.breakpointQuiz){ //alert($(window).width());
			$('#reflectionDiv').css({'left':0,'top':-_mediaObj.height,'width':'100%','height':_mediaObj.height});
			$('#reflectionContainer').css({'width':'100%','height':'100%'});

		}else{
			$('#reflectionDiv').css({'left':0,'top':-_mediaObj.height,'width':'100%','height':_mediaObj.height});
			$('#reflectionContainer').css({'width':'100%','height':'100%'});
			
		}
		//==============================================================
		
		//●○●○●○1040915 - 全畫面狀態下，遇到暫停點，.mediaDiv的高度會撐得很大，把.playbackDiv(播放控制列)往下帶到很底端，超出頁面所以看不到。
		//●○●○●○所以，必須設定mediaDiv的高度，且將.mediaDiv的css屬性overflow設為hidden。
		//=======================================================================================
		$('.mediaWrapper:eq(0) .mediaDiv').css({'height':_mediaObj.height,'overflow':'hidden'});
		//=======================================================================================
		
	
	//排版型態param.layoutType[0]為rwd
	}else if(param.layoutType[0] === "rwd"){
		
		
		//●○●○●○1040916 - 小視窗狀態，處理評量區塊 (根據評量斷點param.breakpoint)
		//==============================================================
		if($(window).width() < param.breakpointQuiz){
			//
			$('#reflectionDiv').insertAfter($('.mediaDiv:eq(0)'));
			//
			$('#reflectionDiv').css({'left':0,'top':-_mediaObj.height,'width':'100%','height':'100%','min-height':_mediaObj.height});
			$('#reflectionContainer').css({'width':'100%','height':'auto','min-height':_mediaObj.height});
			
			//●○1040917 - ○↓針對小裝置所設評量寬度斷點，寬度低於此數字，#quizDiv的高度會設為100%，讓評量可以一內容高度伸展。
			//但在某些寬度，有時評量的高度會小於#quizDiv高度，
			//alert($('#reflectionContainer').height() + '/' + _mediaObj.height);
			
			
			//1040918 - 1050120 - ●會妨礙到$('.pageWrapper')在rwd狀態下的寬度，無法剛好塞滿小尺寸視窗
			//$('.pageWrapper').css({'width':_mediaObj.width});
			//改為：
			$('.pageWrapper').css({'width':$(window).width()});
			
			
			//1040918 - @1040929ok
			if($('#reflectionContainer').height() < _mediaObj.height){
				$('#reflectionDiv').css({'left':0,'top':-_mediaObj.height,'width':_mediaObj.width,'height':_mediaObj.height});
				$('#reflectionContainer').css({'width':'100%','height':_mediaObj.height});
			
			}
			
		//
		}else{
			$('#reflectionDiv').css({'left':0,'top':-_mediaObj.height,'width':_mediaObj.width,'height':_mediaObj.height});
			$('#reflectionContainer').css({'width':'100%','height':_mediaObj.height});
			
		}
		//==============================================================
		
		
		//=======================================================================================
		$('.mediaWrapper:eq(0) .mediaDiv').css({'height':_mediaObj.height,'overflow':'hidden'});
		//=======================================================================================
		
	}
	

};




//==============================================================================
//↑↑↑↑↑↑↑↑●○●○●○ In-Video Quiz ●○●○●○↑↑↑↑↑↑↑↑







/*************************『●○無』點小圖跳大圖之圖檔之取值計算、RWD大小尺寸************************/


method.normalPicUtils = function(){
	
	//
	var normalPicCssFloat = [];
	//
	var normalPicCssIniMargin = {};
	normalPicCssIniMargin.top = [];
	normalPicCssIniMargin.right = [];
	normalPicCssIniMargin.bottom = [];
	normalPicCssIniMargin.left = [];
	//
	var normalPicCssIniPadding = {};
	normalPicCssIniPadding.top = [];
	normalPicCssIniPadding.right = [];
	normalPicCssIniPadding.bottom = [];
	normalPicCssIniPadding.left = [];
	//
	var normalPicWH = {};
	normalPicWH.w = [];
	normalPicWH.h = [];
	
	
	$('.normalPic').each(function(index, element) {
		var thisW = parseInt($('.normalPic:eq(' + index + ') > img').attr('width'));
		var thisH = parseInt($('.normalPic:eq(' + index + ') > img').css('height'));
		//alert(thisW + '/' + thisH);
		
		//normalPicWH[index] = [thisW, thisH];
		normalPicWH.w[index] = thisW;
		normalPicWH.h[index] = thisH;
		//alert(normalPicWH.w[index] + '/' + normalPicWH.h[index]);
		
		normalPicCssFloat[index] = $('.normalPic:eq(' + index + ')').css('float');
		//alert($('.normalPic:eq(' + index + ')').css('float'));
		
		normalPicCssIniMargin.top[index] = $('.normalPic:eq(' + index + ')').css('margin-top');
		normalPicCssIniMargin.right[index] = $('.normalPic:eq(' + index + ')').css('margin-right');
		normalPicCssIniMargin.bottom[index] = $('.normalPic:eq(' + index + ')').css('margin-bottom');
		normalPicCssIniMargin.left[index] = $('.normalPic:eq(' + index + ')').css('margin-left');
		//alert( normalPicCssIniMargin.top[index] +'/' + normalPicCssIniMargin.right[index] + '/' + normalPicCssIniMargin.bottom[index] + '/' + normalPicCssIniMargin.left[index]);
		
		normalPicCssIniPadding.top[index] = $('.normalPic:eq(' + index + ')').css('padding-top');
		normalPicCssIniPadding.right[index] = $('.normalPic:eq(' + index + ')').css('padding-right');
		normalPicCssIniPadding.bottom[index] = $('.normalPic:eq(' + index + ')').css('padding-bottom');
		normalPicCssIniPadding.left[index] = $('.normalPic:eq(' + index + ')').css('padding-left');
		//alert( normalPicCssIniPadding.top[index] +'/' + normalPicCssIniPadding.right[index] + '/' + normalPicCssIniPadding.bottom[index] + '/' + normalPicCssIniPadding.left[index]);
		
	});
	
	
	
	
	//◎●○◎●○◎●○ RWD排版處理 ◎●○◎●○◎●○
	$(window).on('resize',function(){
		
		
		//◎● 《《《《《《===》》》》》》 進入小尺寸
		if( $(window).width() <= param.breakpoint ){
			
		
			//※※※1050819 - 決定.normalPic不以程式設定大尺寸、小尺寸視窗時的圖形寬高變化
			//●◎●◎●◎1050818
			$('.normalPic').each(function(index) {
				
				$('.normalPic:eq(' + index + ')').css({
					//●○◎小尺寸時，需讓.normalPic的高設定為auto，【 normalPic > img 】之width設為100%，才能有作用
					'width':param.rwdSmallWindowImgPercent,
					'height':'auto',
					//float需取消。
					'float':'none', 
					//左右居中，下外距param.rwdPicMargin.bottom
					'margin-top':param.rwdPicMargin.top, 
					'margin-right':param.rwdPicMargin.right,
					'margin-bottom':param.rwdPicMargin.bottom,
					'margin-left':param.rwdPicMargin.left
				});
				
				
				//「.normalPic > img」小圖本身寬度設為100%，寬度大小比例由「.normalPic」的寬度來決定
				$('.normalPic:eq(' + index + ') > img').css({
					'width':'100%' 
				});
				
			});
					
		
		
		//◎● 《《《《《《===》》》》》》 進入大尺寸
		}else if( $(window).width() > param.breakpoint ) {
			
			
			//※※※1050819 - 決定.normalPic不以程式設定大尺寸、小尺寸視窗時的圖形寬高變化
			//●◎●◎●◎1050818
			$('.normalPic').each(function(index) {
				
				$('.normalPic:eq(' + index + ')').css({
					'width':normalPicWH.w[index],
					'height':normalPicWH.h[index], 
					'float':normalPicCssFloat[index],
					'margin-top':normalPicCssIniMargin.top[index],
					'margin-right':normalPicCssIniMargin.right[index],
					'margin-bottom':normalPicCssIniMargin.bottom[index],
					'margin-left':normalPicCssIniMargin.left[index],
					'padding-top':normalPicCssIniPadding.top[index],
					'padding-right':normalPicCssIniPadding.right[index],
					'padding-bottom':normalPicCssIniPadding.bottom[index],
					'padding-left':normalPicCssIniPadding.left[index]
				});
				
			});
			
			
		}
		
		
	});
	
	$(window).trigger('resize');
	
	
	
};

/*************************無點小圖跳大圖之圖檔之取值計算、RWD大小尺寸************************/





/*************************處理放大鏡圖示************************/

method.createMagnifierIcon = function(){
	 
	//
	var toBigPicCssFloat = [];
	//
	var toBigPicWH = {};
	toBigPicWH.w = [];
	toBigPicWH.h = [];
	//
	var toBigPicCssIniMargin = {};
	toBigPicCssIniMargin.top = [];
	toBigPicCssIniMargin.right = [];
	toBigPicCssIniMargin.bottom = [];
	toBigPicCssIniMargin.left = [];
	//
	var toBigPicCssIniPadding = {};
	toBigPicCssIniPadding.top = [];
	toBigPicCssIniPadding.right = [];
	toBigPicCssIniPadding.bottom = [];
	toBigPicCssIniPadding.left = [];
	//
	var oriW2HRatio = [];
	//
	var bigPicWidth = [];
	var bigPicHeight = [];
	 

	//alert($('.toBigPic').length);
	
	/************************************************************************/
	/*如果有調用method.clickSmallToBig() 「點小圖跳出大圖功能」，則小圖上動態添加放大鏡圖示*/
	/************************************************************************/
	
	
	
	$('.toBigPic').each(function(index, element) {
		
		//$('.toBigPic:eq(' + index + ') img').wrap('<span class="imgOuter"></span>');
		$('.toBigPic:eq(' + index + ')').append('<span class="zoomIconSpan"><img src=' + param.mainPath + "tPlayer_CSS/images/magnifier_40x40.png" + ' title="點擊小圖可跳出大圖"></span>');
		
		
		var thisW = parseInt($('.toBigPic:eq(' + index + ') > img').attr('width'));
		var thisH = parseInt($('.toBigPic:eq(' + index + ') > img').css('height'));
		//alert(thisW +'/'+thisH);
		
		//
		oriW2HRatio[index] = thisW/thisH;
		//alert(oriW2HRatio[index]);
		
		//
		toBigPicWH.w[index] = thisW;
		toBigPicWH.h[index] = thisH;
		//alert(toBigPicWH.w[index] + '/' + toBigPicWH.h[index]);
		
		
		//●○◎●○◎精確設定.toBigPic的寬高，才不會超出圖片寬高，而露出底色。
		$('.toBigPic:eq(' + index + ')').css({'width':thisW,'height':thisH});
		
		//
		var zoomIconW = parseInt($('.toBigPic:eq(' + index + ') .zoomIconSpan > img').css('width'));
		var zoomIconH = parseInt($('.toBigPic:eq(' + index + ') .zoomIconSpan > img').css('height'));
		//alert(zoomIconW + '/' + zoomIconH);
		
		
		//●◎●◎●◎ - 放大鏡圖示的位置控制
		$('.zoomIconSpan:eq(' + index + ')').css({'position':'relative','left':thisW-zoomIconW,'top':-thisH});
		
		
		//1041230 - 擷取 大視窗：小圖排版時，CSS ->> float屬性
		toBigPicCssFloat[index] = $('.toBigPic:eq(' + index + ')').css('float');
		//alert(toBigPicCssFloat[index]);
		
		
		//1050103 - 擷取 大視窗：小圖排版時，CSS ->> margin屬性
		//在windows10｜IE11、Edge瀏覽器，不能僅藉由margin擷取其top、right、bottom、left屬性，必須分開擷取，如margin-top。
		//toBigPicCssIniMargin[index] = [ $('.toBigPic:eq(' + index + ')').css('margin-top'), $('.toBigPic:eq(' + index + ')').css('margin-right'), $('.toBigPic:eq(' + index + ')').css('margin-bottom'), $('.toBigPic:eq(' + index + ')').css('margin-left') ];
		
		toBigPicCssIniMargin.top[index] = $('.toBigPic:eq(' + index + ')').css('margin-top');
		toBigPicCssIniMargin.right[index] = $('.toBigPic:eq(' + index + ')').css('margin-right');
		toBigPicCssIniMargin.bottom[index] = $('.toBigPic:eq(' + index + ')').css('margin-bottom');
		toBigPicCssIniMargin.left[index] = $('.toBigPic:eq(' + index + ')').css('margin-left');
		//alert( toBigPicCssIniMargin.top[index] +'/' + toBigPicCssIniMargin.right[index] + '/' + toBigPicCssIniMargin.bottom[index] + '/' + toBigPicCssIniMargin.left[index]);
		
		
		//1050103 - 擷取 大視窗：小圖排版時，CSS ->> padding屬性
		//在windows10｜IE11、Edge瀏覽器，不能僅藉由padding擷取其top、right、bottom、left屬性，必須分開擷取，如padding-top。
		//toBigPicCssIniPadding[index] = [ $('.toBigPic:eq(' + index + ')').css('padding-top'), $('.toBigPic:eq(' + index + ')').css('padding-right'), $('.toBigPic:eq(' + index + ')').css('padding-bottom'), $('.toBigPic:eq(' + index + ')').css('padding-left') ];
		
		toBigPicCssIniPadding.top[index] = $('.toBigPic:eq(' + index + ')').css('padding-top');
		toBigPicCssIniPadding.right[index] = $('.toBigPic:eq(' + index + ')').css('padding-right');
		toBigPicCssIniPadding.bottom [index]= $('.toBigPic:eq(' + index + ')').css('padding-bottom');
		toBigPicCssIniPadding.left[index] = $('.toBigPic:eq(' + index + ')').css('padding-left');
		//alert( toBigPicCssIniPadding.top[index] +'/' + toBigPicCssIniPadding.right[index] + '/' + toBigPicCssIniPadding.bottom[index] + '/' + toBigPicCssIniPadding.left[index]);
		
		
		
		
		//old - 需擷取HTML所設大圖高度
		//method.triggerToBig(index, parseInt($('.toBigPic:eq(' + index + ') .bigImgWidth').text()), parseInt($('.toBigPic:eq(' + index + ') .bigImgHeight').text()));
		
		//
		bigPicWidth[index] = parseInt($('.toBigPic:eq(' + index + ') .bigImgWidth').text());
		bigPicHeight[index] = bigPicWidth[index]/oriW2HRatio[index];
		//alert(bigPicWidth[index] + '/' + bigPicHeight[index]);
		
		
		//1050429 - ●不需擷取HTML所設大圖高度
		method.triggerToBig(index, bigPicWidth[index], bigPicHeight[index]);
		
		
	});
	
	
	
	
	//◎●○◎●○◎●○ RWD排版處理 ◎●○◎●○◎●○
	$(window).on('resize',function(){
		
		//◎● 《《《《《《===》》》》》》 進入小尺寸
		if( $(window).width() <= param.breakpoint ){
			//alert($('.toBigPic').length);
			
			//
			$('.toBigPic').each(function(index) {

				//====================================================================
				$('.toBigPic:eq(' + index + ')').css({
					//●○◎小尺寸時，需讓.toBigPic的高設定為auto，寬度依據externalData.js的param.rwdSmallWindowImgPercent
					'width':param.rwdSmallWindowImgPercent,
					'height':'auto',
					//float需取消。
					'float':'none', 
					//左右居中，下外距param.rwdPicMargin.bottom
					'margin-top':param.rwdPicMargin.top, 
					'margin-right':param.rwdPicMargin.right,
					'margin-bottom':param.rwdPicMargin.bottom,
					'margin-left':param.rwdPicMargin.left
				});
				
				
				//「.toBigPic > img」小圖本身寬度設為100%，寬度由「.toBigPic」的寬度來決定
				$('.toBigPic:eq(' + index + ') > img').css({
					'width':'100%' 
				});
				
				//====================================================================

				
				//●◎●◎●◎1051011修改為.zoomIconSpan在js裡動態隱藏(display:none)(小尺寸)，因為與CSS在斷點時無法同步
				$('.toBigPic:eq(' + index + ') .zoomIconSpan').css({'display':'none'});
				
			});
	
		
		
		
		//◎● 《《《《《《===》》》》》》 進入大尺寸
		}else if( $(window).width() > param.breakpoint ) {
			//alert($('.toBigPic').length);
			
			//
			$('.toBigPic').each(function(index) { 
	
				$('.toBigPic:eq(' + index + ')').css({
					'float':toBigPicCssFloat[index],
					'width':toBigPicWH.w[index],
					'height':toBigPicWH.h[index], 
					'margin-top':toBigPicCssIniMargin.top[index],
					'margin-right':toBigPicCssIniMargin.right[index],
					'margin-bottom':toBigPicCssIniMargin.bottom[index],
					'margin-left':toBigPicCssIniMargin.left[index],
					'padding-top':toBigPicCssIniPadding.top[index],
					'padding-right':toBigPicCssIniPadding.right[index],
					'padding-bottom':toBigPicCssIniPadding.bottom[index],
					'padding-left':toBigPicCssIniPadding.left[index]
				});
				
				
				var zoomIconW = parseInt($('.toBigPic:eq(' + index + ') .zoomIconSpan > img').css('width'));
				var zoomIconH = parseInt($('.toBigPic:eq(' + index + ') .zoomIconSpan > img').css('height'));
				//alert(zoomIconW);
				//alert($('.toBigPic:eq(' + index + ')').css('height'));
				
				
				//●◎●◎●◎1051011修改為.zoomIconSpan在js裡動態出現(display:block)(大尺寸)，因為與CSS在斷點時無法同步
				$('.toBigPic:eq(' + index + ') .zoomIconSpan').css({'display':'block','position':'relative','left':toBigPicWH.w[index]-zoomIconW,'top':-toBigPicWH.h[index]});
				
			});

			
			
		}
		
		
	});
	
	$(window).trigger('resize');

};

/*************************處理放大鏡圖示************************/



/*************************點小圖跳出大圖************************/

method.triggerToBig = function(_imgIndex,_w,_h){
	
	var imgTag = $('.toBigPic:eq(' + _imgIndex + ') > img');
	$(imgTag).on('mousedown',function(){
		method.clickSmallToBig(imgTag,_w,_h);
		return false;
	});
	
	$('.toBigPic:eq(' + _imgIndex + ') .zoomIconSpan > img').on('mousedown',function(){
		method.clickSmallToBig(imgTag,_w,_h);
	});
	
};

method.clickSmallToBig = function(_imgTag,_w,_h){	
	/* 取得圖檔相對網址(小圖與大圖為同一圖檔)*/
	var imgSrc = $(_imgTag).attr('src');
	
	/*建立盛載跳大圖的DIV組合*/
	var bigDivHtml = '<div id="bigDiv"></div>';
	$(document.body).append(bigDivHtml);
	
	/*將目標圖檔appendTo進入bigDiv*/
	var $imgDomObj = $('<img src=' + imgSrc/* + ' width=' + _w + ' height=' + _h*/ + '>');
	$('#bigDiv').html($imgDomObj);
	
	//
	if(param.isBig === false){
		
		var halfExpandW = parseInt($('#bigDiv').css('padding-left'));
		var halfExpandH = parseInt($('#bigDiv').css('padding-top'));
		
		/*計算DIV在800x600px範圍的中心點*/
		var initX = 800/2-(_w+halfExpandW*2)/2;
		var initY = 600/2-(_h+halfExpandH*2)/2;
		
		$('#bigDiv').css({left:initX,top:initY});
		/*alert($('#bigDivOut').offset().left);*/
		
		//1050823取消
		//$imgDomObj.css({'position':'relative','left':halfExpandW,'top':halfExpandH/*,'width':_w,'height':'_h'*/});
		
		$imgDomObj.animate({'width':_w,/*'height':_h,*/'opacity':'0.0'},0,function(){
			//●○◎●○◎1050826
			$('#bigDiv').height( _h );
		});
		
		
		/*DIV被指定的放大寬高 + 外擴值*/
		var bigDivWidth = _w + halfExpandW*2;
		var bigDivHeight = _h + halfExpandH*2;
		
		//alert(_w + '/' + _h + '***' +bigDivWidth +'/' + bigDivHeight);
		
		
		
		/*控制跳出大圖的位置*/
		var targetX;
		var targetY;
		/*------------------------------------------------------------------------------*/
		if(param.bgScope2Img_definedWidth === 0){
			if($(window).width() > bigDivWidth){
				targetX = $(window).width()/2-bigDivWidth/2 + param.bigImagePosOffsetX;
			}else{
				targetX = 0;
			}
			
		}else{
			targetX = param.bgScope2Img_definedWidth/2-bigDivWidth/2 + param.bigImagePosOffsetX;
		}
		

		//垂直控制
		//1041231 - ●○◎取得垂直捲軸捲動距離
		var scrollYOffset = $(document).scrollTop();
		
		if(param.bgScope2Img_definedHeight[0][0] === 'middle'){
			targetY = param.bgScope2Img_definedHeight[0][1]/2 - bigDivHeight/2 + param.bigImagePosOffsetY + scrollYOffset;
			
		}else if(param.bgScope2Img_definedHeight[0][0] === 'top'){
			targetY = param.bgScope2Img_definedHeight[0][1] + param.bigImagePosOffsetY + scrollYOffset;
			
		}else if(param.bgScope2Img_definedHeight[0][0] === 'follow'){ //alert($(_imgTag).position().top);
			targetY = $(_imgTag).position().top + param.bgScope2Img_definedHeight[0][1] + param.bigImagePosOffsetY;
			
		}else if( (param.bgScope2Img_definedHeight[0][0] === 'follow_middle') ){ //alert($(_imgTag).position().top);
			targetY = $(_imgTag).position().top + $(_imgTag).height()/2 - bigDivHeight/2 + param.bigImagePosOffsetY;
		}
		/*------------------------------------------------------------------------------*/
		//alert(bigDivHeight);
		
		
		/**/
		method.addWall();
		
		
		
		
		/*動態放大，加入關閉按鈕*/
		$('#bigDiv').animate({'left':targetX,'top':targetY,'width':bigDivWidth/*,'height':bigDivHeight*/},200,function(){
			//↑↑↑↑↑↑ 圖片放大 ↑↑↑↑↑↑
			
			//1050824 - 1050826
			//===================================================
			//取得$('#bigDiv')的高度
			//●○◎●○◎
			$('#bigDiv').height($imgDomObj.height());
			
			
			/*加入關閉鈕 - 1050824 - ●●●需加在此位置 - iPad才抓得到$('#bigDiv')的高度，才能計算放大鏡圖示的垂直位置*/
			//---------------------------
			method.addCloseBtn();
			//---------------------------
			
			//===================================================
			
			
			/*圖片透明度到1.0*/
			$imgDomObj.animate({'opacity':'1.0'},200, function(){
			});
			
			
			/*旗標：放大狀態：true*/
			param.isBig = true;
			/**/
			//$imgDomObj.css({'border-style':'dashed','border-width':'1','border-color':'#666666'});
			//1050823修改。並於tPlayer.css增加.bigImageStyle class選擇器
			$imgDomObj.addClass('bigImageStyle');
		});
		
		
		//
		$(window).on('resize',function(){
			
			//
			$('#wallDivForBigPic').css({'opacity':'0.8','width':$(document).width(),'height':$(document).height()},0);
			
			//水平控制
			/*------------------------------------------------------------------------------*/
			if(param.bgScope2Img_definedWidth === 0){
				if($(window).width() > bigDivWidth){
					targetX = $(window).width()/2-bigDivWidth/2 + param.bigImagePosOffsetX;
				}else{
					targetX = 0;
				}
				
			}else{
				targetX = param.bgScope2Img_definedWidth/2-bigDivWidth/2 + param.bigImagePosOffsetX;
			}
			
			
			//垂直控制
			if(param.bgScope2Img_definedHeight[0][0] === 'middle'){
				targetY = param.bgScope2Img_definedHeight[0][1]/2 - bigDivWidth/2 + param.bigImagePosOffsetY;
			}else if(param.bgScope2Img_definedHeight[0][0] === 'top'){
				targetY = param.bgScope2Img_definedHeight[0][1] + param.bigImagePosOffsetY;
			}
			/*------------------------------------------------------------------------------*/
			
			//
			$('#bigDiv').css({'left':targetX,'top':targetY});
			
		});
		
		
	}
};

method.addCloseBtn = function(){

	//關閉按鈕位於大圖右下角
	/*var closeBtnOffsetX = 12;
	var closeBtnOffsetY = -12;
	$('#bigDiv').append('<div id="closeImgBtnDiv"></div>');
	var closeImgBtnDivPosX = $('#bigDiv').width() - $('#closeImgBtnDiv').width() + closeBtnOffsetX;
	var closeImgBtnDivPosY = $('#bigDiv').height() - $('#closeImgBtnDiv').height();
	$('#closeImgBtnDiv').css({'left':closeImgBtnDivPosX,'top':closeBtnOffsetY});*/
	
	//關閉按鈕位於大圖右上角
	/*var closeBtnOffsetX = 17;
	var closeBtnOffsetY = 10;
	
	$('#bigDiv').append('<div id="closeImgBtnDiv"></div>');
	var closeImgBtnDivPosX = $('#bigDiv').width() - $('#closeImgBtnDiv').width() + closeBtnOffsetX;
	var closeImgBtnDivPosY = -$('#bigDiv').height() + closeBtnOffsetY;
	$('#closeImgBtnDiv').css({'left':closeImgBtnDivPosX,'top':closeImgBtnDivPosY});*/
	
	//1050823 - 修改
	//=================================================================================
	var closeBtnOffsetX = 0;
	var closeBtnOffsetY = 0;
	
	$('#bigDiv').append('<div id="closeImgBtnDiv"></div>');
	var closeImgBtnDivPosX = $('#bigDiv').width() - $('#closeImgBtnDiv').width()*0.3 + closeBtnOffsetX;
	var closeImgBtnDivPosY = -$('#bigDiv').height() - $('#closeImgBtnDiv').height()*0.7 + closeBtnOffsetY;
	$('#closeImgBtnDiv').css({'left':closeImgBtnDivPosX,'top':closeImgBtnDivPosY});
	//alert($('#bigDiv').width() + '/' + $('#bigDiv').height());
	//=================================================================================
	
	
	/**/
	method.addCloseBtnClickHandler();
};

method.addWall = function(){
	var wallDivHtmlStr = '<div id="wallDivForBigPic"></div>';
	$(document.body).append(wallDivHtmlStr);
	
	$('#wallDivForBigPic').css({'opacity':0.0});
	$('#wallDivForBigPic').animate({'opacity':'0.8','width':$(document).width(),'height':$(document).height(),'left':0,'top':0},300);
};

method.removeWall = function(){
	$('#wallDivForBigPic').animate({'opacity':'0.0'},300,function(){
		$('#wallDivForBigPic').fadeOut(0);
		$('#wallDivForBigPic').remove();
		//$(document.body).remove($('#wallDiv'));
		
	});
	
};

method.addCloseBtnClickHandler = function(){
	$('#closeImgBtnDiv').on('mousedown',method.closeBtnClickHandler);
	$('#wallDivForBigPic').on('mousedown',method.closeBtnClickHandler);
};

method.closeBtnClickHandler = function(){
	/**/
	param.isBig = false;
	method.removeWall();
	
	$('#closeImgBtnDiv').empty().remove();
	$('#bigDiv').empty().remove();
	$('#bigDivOut').empty().remove();
	//$(document.body).remove($('#bigDivOut'));
};

/*************************點小圖跳出大圖************************/




/*--------↓ 「名詞解釋：glossary」 ↓--------*/
method.glossary = function(){
	
	param.currGlossary = -1;
	param.glossaryContent = [];
	
	//擷取網頁上的名詞解釋資料
	$('.glossary').each(function(index) {
		param.glossaryContent[index] = $('.glossary_data:eq(' + index + ') .glossary_content').html();
	});
	
	
	//
	$('.glossary').each(function(index) {
		
		
		//●○1060202 - 解決：點擊「名詞解釋」.glossary，造成觸發選單的mousedown事件。
		//==================================================================
		$('.glossary:eq(' + index + ')').on('mousedown',function(e){ 
			return false;
		});
		//==================================================================
		
		
		//1060207
		$('.glossary:eq(' + index + ')').on('mouseover',function(e){ 
			//在目前滑鼠hover其上的.glosary附加.glossary_hover class
			$('.glossary:eq(' + index + ')').addClass('glossary_hover');
		});
		
		//1060207
		$('.glossary:eq(' + index + ')').on('mouseout',function(e){ 
			$('.glossary:eq(' + index + ')').removeClass('glossary_hover');
		});
		
		
		
		//.glossary的mouseoup。--- ●必須用mouseover或mouseup，不可用mousedown
		// 因mousedown會觸發$('.pageWrapper').on('mousedown')，刪除$('.glossary_explain')
		// 但因Android chrome對mouseover事件，無感。無法觸發，所以只好用mouseup。
        $('.glossary:eq(' + index + ')').on('mouseup',function(e){ 
		
			
			
			
			//如果目前跳出的名詞解釋面板的序號，不等於滑鼠指標所點擊的.glossary的index
			if(param.currGlossary !== index){
				 
			 
				//先取消所有的.glossary_hover class
				$('.glossary').each(function(i) {
					$('.glossary:eq(' + i + ')').removeClass('glossary_hover');
				});
				
				//在目前滑鼠hover其上的.glosary附加.glossary_hover class
				$('.glossary:eq(' + index + ')').addClass('glossary_hover');
			
			
				//先Destroy所有.glossary_explain
				if($('.glossary_explain').get(0) !== undefined){
					$('.glossary_content').empty();
					$('.glossary_explain').empty().remove();
				}
				
				
				//再建立
				var glossary_explain_Html = method.makeGlossary();
				//●○
				method.showGlossary(index, glossary_explain_Html);
				
				
				
				//點擊在.glossary_closeBtn上
				$('.glossary_closeBtn').on('mousedown',function(e){ 
					$('.glossary_explain').empty().remove();
					$('.glossary:eq(' + index + ')').removeClass('glossary_hover');
					
					param.currGlossary = -1;
				});
				
				//.glossary_closeBtn的mouseover事件處理
				$('.glossary_closeBtn').on('mouseover',function(e){ 
					$('.glossary_closeBtn > img').attr('src', param.tPlayer_CSSPath + 'glossaryUI/glossary_closeBtn_over.png');
				});
				//..glossary_closeBtn的mouseout事件處理
				$('.glossary_closeBtn').on('mouseout',function(e){ 
					$('.glossary_closeBtn > img').attr('src', param.tPlayer_CSSPath + 'glossaryUI/glossary_closeBtn.png');
				});
				
				
				//◎param.currGlossary
				param.currGlossary = index;
				
				
				//$(window).on('resize')
				//====================================
				$(window).on('resize',function(){
					method.showGlossary(index, null);
				});
				//====================================
				
				
				
			
			}
			
			
		});
		
		
		//點擊在body標籤上
		$('body').on('mousedown',function(e){ 
		
			//alert(e.target.className + '/' + e.target.tagName);
		
			if( e.target.tagName.toLowerCase() === "body"){ 
				//alert(e.target.tagName);
				$('.glossary_explain').empty().remove();
				$('.glossary:eq(' + index + ')').removeClass('glossary_hover');
				
				//◎param.currGlossary
				param.currGlossary = -1;
				//e.cancelBubble();
			}
		});
		
		//點擊在.pageWrapper上
		$('.pageWrapper').on('mousedown',function(e){ 
			$('.glossary_explain').empty().remove();
			$('.glossary:eq(' + index + ')').removeClass('glossary_hover');
			
			//◎param.currGlossary
			param.currGlossary = -1;
			//e.cancelBubble();
		});
		
		
		

    });
	
	
	
	
};

//
method.makeGlossary = function(){
	var glossary_explain_Html = 
		'<div class="glossary_explain">'+
			'<div class="glossary_title">'+
				'<span class="glossary_icon"></span>'+
				'<span class="glossary_titleName">名詞解釋</span>'+
				'<span class="glossary_closeBtn"><img src="' + param.tPlayer_CSSPath + 'glossaryUI/glossary_closeBtn.png' + '"></span>'+
			'</div>'+
			'<div class="glossary_content">'+
			'</div>'+
		'</div>';
		
	return glossary_explain_Html;
};

//
method.showGlossary = function(index, glossary_explain_Html){
	
	var currW,currH;
	
	//
	if($('.glossary_data:eq(' + index + ') .glossary_width').text() !== undefined){
		if($('.glossary_data:eq(' + index + ') .glossary_width').text() === "auto"){
			currW = "auto";
		}else{
			currW = parseInt($('.glossary_data:eq(' + index + ') .glossary_width').text());
		}
	}else{
		currW = "auto";
	}
	
	//
	if($('.glossary_data:eq(' + index + ') .glossary_height').text() !== undefined){
		if($('.glossary_data:eq(' + index + ') .glossary_height').text() === "auto"){
			currH = "auto";
		}else{
			currH = parseInt($('.glossary_data:eq(' + index + ') .glossary_height').text()); 
		}
	}else{
		currH = "auto";
	}
	
	var offsetX = parseInt($('.glossary_data:eq(' + index + ') .glossary_offsetX').text());
	var offsetY = parseInt($('.glossary_data:eq(' + index + ') .glossary_offsetY').text());
	
	
	//計算$('.glossary_explain')的x,y位置
	//==========================================================
	var currX,currY;
	
	//大尺寸視窗
	if($(window).width() > param.breakpoint){
		
		//alert($('.glossary:eq(' + index + ')').offset().left);
		
		//1050217 - 加這條件式，否則有ERROR。 包括IE各版本、Chrome、FF各大瀏覽器。
		//--> SCRIPT5007: 無法取得未定義或 Null 參考的屬性 'left' 
		//--> tPlayer.js, 行 6783 字元 3
		if($('.glossary:eq(' + index + ')').get(0) !== undefined){
			currX = $('.glossary:eq(' + index + ')').offset().left + $('.glossary:eq(' + index + ')').width() + offsetX;
			currY = $('.glossary:eq(' + index + ')').offset().top - $('.glossary:eq(' + index + ')').height() + offsetY;
		}
	
	//小尺寸視窗	
	}else{
		
		//●1050413 - 增加此條件式
		//=======================================================
		if(param.rwdSmallWindowGlossaryWidthPercent === 1){
			currX = 0;
			
		}else if(param.rwdSmallWindowGlossaryWidthPercent < 1 && param.rwdSmallWindowGlossaryWidthPercent > 0){
			currX = $(window).width()*0.5 -  $(window).width()*param.rwdSmallWindowGlossaryWidthPercent*0.5;
			
		}else if(param.rwdSmallWindowGlossaryWidthPercent <= 0 || param.rwdSmallWindowGlossaryWidthPercent === undefined){
			param.rwdSmallWindowGlossaryWidthPercent = 1;
			currX = 0;
		}
		//=======================================================
		
		
		//1050217 - 加這條件式，否則有ERROR。 包括IE各版本、Chrome、FF各大瀏覽器。
		if($('.glossary:eq(' + index + ')').get(0) !== undefined){
			currY = $('.glossary:eq(' + index + ')').offset().top + $('.glossary:eq(' + index + ')').height() + 10;
		}
		
		currW = $(window).width()*param.rwdSmallWindowGlossaryWidthPercent;
		currH = "auto";
		
	}
	//==========================================================
	
	
	//1050118
	if($('.glossary_explain').get(0) === undefined){
		$(document.body).append(glossary_explain_Html);
	}
	
	
	$('.glossary_content').html(param.glossaryContent[index]);
	
	//1050118 - 寬高、位置。
	if( !glossary_explain_Html ){
		$('.glossary_explain').css({'display':'block','left':currX,'top':currY,'width':currW,'height':currH}).fadeOut(0,function(){
			$('.glossary_explain').fadeIn(0);
		});
	}else{
		$('.glossary_explain').css({'display':'block','left':currX,'top':currY,'width':currW,'height':currH}).fadeOut(0,function(){
			$('.glossary_explain').fadeIn(300);
		});
	}
	
			
};

/*--------↑ 「名詞解釋：glossary」 ↑--------*/






//@@@未用到
function embedFlash__old(){

	var embedFlashHtml =
	'<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="640" height="540" id="MediaPlayer" name="MediaPlayer" align="middle">'+
		'<param name="movie" value="MediaPlayer_1.swf" />'+
		'<param name="quality" value="high" />'+
		'<param name="bgcolor" value="#ffffff" />'+
		'<param name="play" value="true" />'+
		'<param name="loop" value="true" />'+
		'<param name="wmode" value="transparent" />'+
		'<param name="scale" value="showall" />'+
		'<param name="menu" value="true" />'+
		'<param name="devicefont" value="false" />'+
		'<param name="salign" value="" />'+
		'<param name="allowScriptAccess" value="always" />'+
		'<param name="allowFullScreen" value="true" />'+
		'<!--[if !IE]>-->'+
		'<object name="MediaPlayer" type="application/x-shockwave-flash" data="MediaPlayer_1.swf" width="640" height="540">'+
		  '<param name="movie" value="MediaPlayer_1.swf" />'+
		  '<param name="quality" value="high" />'+
		  '<param name="bgcolor" value="#ffffff" />'+
		  '<param name="play" value="true" />'+
		  '<param name="loop" value="true" />'+
		  '<param name="wmode" value="transparent" />'+
		  '<param name="scale" value="showall" />'+
		  '<param name="menu" value="true" />'+
		  '<param name="devicefont" value="false" />'+
		  '<param name="salign" value="" />'+
		  '<param name="allowScriptAccess" value="always" />'+
		  '<param name="allowFullScreen" value="true" />'+
		  '<!--<![endif]-->'+
		  '<a href="http://www.adobe.com/go/getflash"><img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="取得 Adobe Flash 播放程式" /> </a>'+
		  '<!--[if !IE]>-->'+
	  '</object>'+
		'<!--<![endif]-->'+
	'</object>';


	//alert(embedFlashHtml);

	//
	$('.mediaDiv').append(embedFlashHtml);

	//此處不需設定$('.mediaDiv')高度，CSS中.mediaDiv已設定高度為auto，因此.mediaDiv會隨影音高度縮張，
	$('.mediaDiv').width('100%')/*.height(as3VideoScopeHeight)*/;

	//●但.mediaDiv高度會稍高，和.playbackDiv之間出現縫隙，露出底色。可透過操控height解決 - 沒採用
	//$('.mediaDiv').width('100%').height(as3VideoScopeHeight);

	//●後來發現：
	//object在CSS Reset之vertical-align屬性值被設為baseline
	//造成.mediaDiv的高度稍高，下方露白
	//●得到解決方案為：
	//在CSS修正object的vertical-align屬性值為top或bottom或middle，解決露白


	/*$(document).on('mousedown',function(){
		document.getElementById('MediaPlayer').testJsCallAS3('JS調用了AS3的testJsCallAS3方法');
	});*/

	/*document.onclick = function(){
		document.getElementById('MediaPlayer').testJsCallAS3("JS調用了AS3的testJsCallAS3方法");
	}*/

}


/*----------------------------------------*/
//A.取得目前網址
//var currentURL = document.location.href;
//alert(currentURL);
//B.取代HTML檔名
//var targetURL = currentURL.replace(iniHtmlName,mainHtmlName);
/*----------------------------------------*/

//----------------------------------------------------
/*function loadCss(_src){
	var headID = document.getElementsByTagName("head")[0];
	var newCss = document.createElement('link');
	newCss.type = 'text/css';
	newCss.rel = "stylesheet";
	newCss.href = _src;
	headID.appendChild(newCss);
}*/
//----------------------------------------------------


//jQUIJsPath - jquery-ui-1.9.1.custom.min.js
/*----------------------------------------*/
//var jQUIJsIndex = firstJsPath.indexOf('Common') + 'Common/'.length; //alert(jQUIJsIndex);
//var jQUIJsPath = firstJsPath.substring(0,jQUIJsIndex) + 'lib/' + "jquery-ui-1.9.1.custom.min.js"; //alert(jQUIJsPath);
/*----------------------------------------*/













//>>>=============================================================>>>
})(jQuery); //↑↑↑







!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Hls=e():t.Hls=e()}(this,function(){return function(t){function e(i){if(r[i])return r[i].exports;var a=r[i]={i:i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,e),a.l=!0,a.exports}var r={};return e.m=t,e.c=r,e.d=function(t,r,i){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=8)}([function(t,e,r){"use strict";function i(){}function a(t,e){return e="["+t+"] > "+e}function n(t){var e=self.console[t];return e?function(){for(var r=arguments.length,i=Array(r),n=0;n<r;n++)i[n]=arguments[n];i[0]&&(i[0]=a(t,i[0])),e.apply(self.console,i)}:i}function o(t){for(var e=arguments.length,r=Array(e>1?e-1:0),i=1;i<e;i++)r[i-1]=arguments[i];r.forEach(function(e){u[e]=t[e]?t[e].bind(t):n(e)})}r.d(e,"a",function(){return d}),r.d(e,"b",function(){return h});var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},l={trace:i,debug:i,log:i,warn:i,info:i,error:i},u=l,d=function(t){if(!0===t||"object"===(void 0===t?"undefined":s(t))){o(t,"debug","log","info","warn","error");try{u.log()}catch(t){u=l}}else u=l},h=u},function(t,e,r){"use strict";e.a={MEDIA_ATTACHING:"hlsMediaAttaching",MEDIA_ATTACHED:"hlsMediaAttached",MEDIA_DETACHING:"hlsMediaDetaching",MEDIA_DETACHED:"hlsMediaDetached",BUFFER_RESET:"hlsBufferReset",BUFFER_CODECS:"hlsBufferCodecs",BUFFER_CREATED:"hlsBufferCreated",BUFFER_APPENDING:"hlsBufferAppending",BUFFER_APPENDED:"hlsBufferAppended",BUFFER_EOS:"hlsBufferEos",BUFFER_FLUSHING:"hlsBufferFlushing",BUFFER_FLUSHED:"hlsBufferFlushed",MANIFEST_LOADING:"hlsManifestLoading",MANIFEST_LOADED:"hlsManifestLoaded",MANIFEST_PARSED:"hlsManifestParsed",LEVEL_SWITCH:"hlsLevelSwitch",LEVEL_SWITCHING:"hlsLevelSwitching",LEVEL_SWITCHED:"hlsLevelSwitched",LEVEL_LOADING:"hlsLevelLoading",LEVEL_LOADED:"hlsLevelLoaded",LEVEL_UPDATED:"hlsLevelUpdated",LEVEL_PTS_UPDATED:"hlsLevelPtsUpdated",AUDIO_TRACKS_UPDATED:"hlsAudioTracksUpdated",AUDIO_TRACK_SWITCH:"hlsAudioTrackSwitch",AUDIO_TRACK_SWITCHING:"hlsAudioTrackSwitching",AUDIO_TRACK_SWITCHED:"hlsAudioTrackSwitched",AUDIO_TRACK_LOADING:"hlsAudioTrackLoading",AUDIO_TRACK_LOADED:"hlsAudioTrackLoaded",SUBTITLE_TRACKS_UPDATED:"hlsSubtitleTracksUpdated",SUBTITLE_TRACK_SWITCH:"hlsSubtitleTrackSwitch",SUBTITLE_TRACK_LOADING:"hlsSubtitleTrackLoading",SUBTITLE_TRACK_LOADED:"hlsSubtitleTrackLoaded",SUBTITLE_FRAG_PROCESSED:"hlsSubtitleFragProcessed",INIT_PTS_FOUND:"hlsInitPtsFound",FRAG_LOADING:"hlsFragLoading",FRAG_LOAD_PROGRESS:"hlsFragLoadProgress",FRAG_LOAD_EMERGENCY_ABORTED:"hlsFragLoadEmergencyAborted",FRAG_LOADED:"hlsFragLoaded",FRAG_DECRYPTED:"hlsFragDecrypted",FRAG_PARSING_INIT_SEGMENT:"hlsFragParsingInitSegment",FRAG_PARSING_USERDATA:"hlsFragParsingUserdata",FRAG_PARSING_METADATA:"hlsFragParsingMetadata",FRAG_PARSING_DATA:"hlsFragParsingData",FRAG_PARSED:"hlsFragParsed",FRAG_BUFFERED:"hlsFragBuffered",FRAG_CHANGED:"hlsFragChanged",FPS_DROP:"hlsFpsDrop",FPS_DROP_LEVEL_CAPPING:"hlsFpsDropLevelCapping",ERROR:"hlsError",DESTROYING:"hlsDestroying",KEY_LOADING:"hlsKeyLoading",KEY_LOADED:"hlsKeyLoaded",STREAM_STATE_TRANSITION:"hlsStreamStateTransition"}},function(t,e,r){"use strict";r.d(e,"b",function(){return i}),r.d(e,"a",function(){return a});var i={NETWORK_ERROR:"networkError",MEDIA_ERROR:"mediaError",MUX_ERROR:"muxError",OTHER_ERROR:"otherError"},a={MANIFEST_LOAD_ERROR:"manifestLoadError",MANIFEST_LOAD_TIMEOUT:"manifestLoadTimeOut",MANIFEST_PARSING_ERROR:"manifestParsingError",MANIFEST_INCOMPATIBLE_CODECS_ERROR:"manifestIncompatibleCodecsError",LEVEL_LOAD_ERROR:"levelLoadError",LEVEL_LOAD_TIMEOUT:"levelLoadTimeOut",LEVEL_SWITCH_ERROR:"levelSwitchError",AUDIO_TRACK_LOAD_ERROR:"audioTrackLoadError",AUDIO_TRACK_LOAD_TIMEOUT:"audioTrackLoadTimeOut",FRAG_LOAD_ERROR:"fragLoadError",FRAG_LOOP_LOADING_ERROR:"fragLoopLoadingError",FRAG_LOAD_TIMEOUT:"fragLoadTimeOut",FRAG_DECRYPT_ERROR:"fragDecryptError",FRAG_PARSING_ERROR:"fragParsingError",REMUX_ALLOC_ERROR:"remuxAllocError",KEY_LOAD_ERROR:"keyLoadError",KEY_LOAD_TIMEOUT:"keyLoadTimeOut",BUFFER_ADD_CODEC_ERROR:"bufferAddCodecError",BUFFER_APPEND_ERROR:"bufferAppendError",BUFFER_APPENDING_ERROR:"bufferAppendingError",BUFFER_STALLED_ERROR:"bufferStalledError",BUFFER_FULL_ERROR:"bufferFullError",BUFFER_SEEK_OVER_HOLE:"bufferSeekOverHole",BUFFER_NUDGE_ON_STALL:"bufferNudgeOnStall",INTERNAL_EXCEPTION:"internalException"}},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}r.d(e,"b",function(){return n});var a=function(){function t(){i(this,t)}return t.isHeader=function(t,e){return e+10<=t.length&&73===t[e]&&68===t[e+1]&&51===t[e+2]&&t[e+3]<255&&t[e+4]<255&&t[e+6]<128&&t[e+7]<128&&t[e+8]<128&&t[e+9]<128},t.isFooter=function(t,e){return e+10<=t.length&&51===t[e]&&68===t[e+1]&&73===t[e+2]&&t[e+3]<255&&t[e+4]<255&&t[e+6]<128&&t[e+7]<128&&t[e+8]<128&&t[e+9]<128},t.getID3Data=function(e,r){for(var i=r,a=0;t.isHeader(e,r);){a+=10;a+=t._readSize(e,r+6),t.isFooter(e,r+10)&&(a+=10),r+=a}if(a>0)return e.subarray(i,i+a)},t._readSize=function(t,e){var r=0;return r=(127&t[e])<<21,r|=(127&t[e+1])<<14,r|=(127&t[e+2])<<7,r|=127&t[e+3]},t.getTimeStamp=function(e){for(var r=t.getID3Frames(e),i=0;i<r.length;i++){var a=r[i];if(t.isTimeStampFrame(a))return t._readTimeStamp(a)}},t.isTimeStampFrame=function(t){return t&&"PRIV"===t.key&&"com.apple.streaming.transportStreamTimestamp"===t.info},t._getFrameData=function(e){var r=String.fromCharCode(e[0],e[1],e[2],e[3]),i=t._readSize(e,4);return{type:r,size:i,data:e.subarray(10,10+i)}},t.getID3Frames=function(e){for(var r=0,i=[];t.isHeader(e,r);){var a=t._readSize(e,r+6);r+=10;for(var n=r+a;r+8<n;){var o=t._getFrameData(e.subarray(r)),s=t._decodeFrame(o);s&&i.push(s),r+=o.size+10}t.isFooter(e,r)&&(r+=10)}return i},t._decodeFrame=function(e){return"PRIV"===e.type?t._decodePrivFrame(e):"T"===e.type[0]?t._decodeTextFrame(e):"W"===e.type[0]?t._decodeURLFrame(e):void 0},t._readTimeStamp=function(t){if(8===t.data.byteLength){var e=new Uint8Array(t.data),r=1&e[3],i=(e[4]<<23)+(e[5]<<15)+(e[6]<<7)+e[7];return i/=45,r&&(i+=47721858.84),Math.round(i)}},t._decodePrivFrame=function(e){if(!(e.size<2)){var r=t._utf8ArrayToStr(e.data,!0),i=new Uint8Array(e.data.subarray(r.length+1));return{key:e.type,info:r,data:i.buffer}}},t._decodeTextFrame=function(e){if(!(e.size<2)){if("TXXX"===e.type){var r=1,i=t._utf8ArrayToStr(e.data.subarray(r));r+=i.length+1;var a=t._utf8ArrayToStr(e.data.subarray(r));return{key:e.type,info:i,data:a}}var n=t._utf8ArrayToStr(e.data.subarray(1));return{key:e.type,data:n}}},t._decodeURLFrame=function(e){if("WXXX"===e.type){if(e.size<2)return;var r=1,i=t._utf8ArrayToStr(e.data.subarray(r));r+=i.length+1;var a=t._utf8ArrayToStr(e.data.subarray(r));return{key:e.type,info:i,data:a}}var n=t._utf8ArrayToStr(e.data);return{key:e.type,data:n}},t._utf8ArrayToStr=function(t){for(var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=t.length,i=void 0,a=void 0,n=void 0,o="",s=0;s<r;){if(0===(i=t[s++])&&e)return o;if(0!==i&&3!==i)switch(i>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:o+=String.fromCharCode(i);break;case 12:case 13:a=t[s++],o+=String.fromCharCode((31&i)<<6|63&a);break;case 14:a=t[s++],n=t[s++],o+=String.fromCharCode((15&i)<<12|(63&a)<<6|(63&n)<<0)}}return o},t}(),n=a._utf8ArrayToStr;e.a=a},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var s=function(){function t(e,r){i(this,t),this.subtle=e,this.aesIV=r}return t.prototype.decrypt=function(t,e){return this.subtle.decrypt({name:"AES-CBC",iv:this.aesIV},e,t)},t}(),l=s,u=function(){function t(e,r){a(this,t),this.subtle=e,this.key=r}return t.prototype.expandKey=function(){return this.subtle.importKey("raw",this.key,{name:"AES-CBC"},!1,["encrypt","decrypt"])},t}(),d=u,h=function(){function t(){n(this,t),this.rcon=[0,1,2,4,8,16,32,64,128,27,54],this.subMix=[new Uint32Array(256),new Uint32Array(256),new Uint32Array(256),new Uint32Array(256)],this.invSubMix=[new Uint32Array(256),new Uint32Array(256),new Uint32Array(256),new Uint32Array(256)],this.sBox=new Uint32Array(256),this.invSBox=new Uint32Array(256),this.key=new Uint32Array(0),this.initTable()}return t.prototype.uint8ArrayToUint32Array_=function(t){for(var e=new DataView(t),r=new Uint32Array(4),i=0;i<4;i++)r[i]=e.getUint32(4*i);return r},t.prototype.initTable=function(){var t=this.sBox,e=this.invSBox,r=this.subMix,i=r[0],a=r[1],n=r[2],o=r[3],s=this.invSubMix,l=s[0],u=s[1],d=s[2],h=s[3],c=new Uint32Array(256),f=0,p=0,g=0;for(g=0;g<256;g++)c[g]=g<128?g<<1:g<<1^283;for(g=0;g<256;g++){var v=p^p<<1^p<<2^p<<3^p<<4;v=v>>>8^255&v^99,t[f]=v,e[v]=f;var y=c[f],m=c[y],b=c[m],E=257*c[v]^16843008*v;i[f]=E<<24|E>>>8,a[f]=E<<16|E>>>16,n[f]=E<<8|E>>>24,o[f]=E,E=16843009*b^65537*m^257*y^16843008*f,l[v]=E<<24|E>>>8,u[v]=E<<16|E>>>16,d[v]=E<<8|E>>>24,h[v]=E,f?(f=y^c[c[c[b^y]]],p^=c[c[p]]):f=p=1}},t.prototype.expandKey=function(t){for(var e=this.uint8ArrayToUint32Array_(t),r=!0,i=0;i<e.length&&r;)r=e[i]===this.key[i],i++;if(!r){this.key=e;var a=this.keySize=e.length;if(4!==a&&6!==a&&8!==a)throw new Error("Invalid aes key size="+a);var n=this.ksRows=4*(a+6+1),o=void 0,s=void 0,l=this.keySchedule=new Uint32Array(n),u=this.invKeySchedule=new Uint32Array(n),d=this.sBox,h=this.rcon,c=this.invSubMix,f=c[0],p=c[1],g=c[2],v=c[3],y=void 0,m=void 0;for(o=0;o<n;o++)o<a?y=l[o]=e[o]:(m=y,o%a==0?(m=m<<8|m>>>24,m=d[m>>>24]<<24|d[m>>>16&255]<<16|d[m>>>8&255]<<8|d[255&m],m^=h[o/a|0]<<24):a>6&&o%a==4&&(m=d[m>>>24]<<24|d[m>>>16&255]<<16|d[m>>>8&255]<<8|d[255&m]),l[o]=y=(l[o-a]^m)>>>0);for(s=0;s<n;s++)o=n-s,m=3&s?l[o]:l[o-4],u[s]=s<4||o<=4?m:f[d[m>>>24]]^p[d[m>>>16&255]]^g[d[m>>>8&255]]^v[d[255&m]],u[s]=u[s]>>>0}},t.prototype.networkToHostOrderSwap=function(t){return t<<24|(65280&t)<<8|(16711680&t)>>8|t>>>24},t.prototype.decrypt=function(t,e,r){for(var i,a,n=this.keySize+6,o=this.invKeySchedule,s=this.invSBox,l=this.invSubMix,u=l[0],d=l[1],h=l[2],c=l[3],f=this.uint8ArrayToUint32Array_(r),p=f[0],g=f[1],v=f[2],y=f[3],m=new Int32Array(t),b=new Int32Array(m.length),E=void 0,T=void 0,R=void 0,A=void 0,S=void 0,L=void 0,_=void 0,w=void 0,D=void 0,I=void 0,k=void 0,O=void 0,C=this.networkToHostOrderSwap;e<m.length;){for(D=C(m[e]),I=C(m[e+1]),k=C(m[e+2]),O=C(m[e+3]),S=D^o[0],L=O^o[1],_=k^o[2],w=I^o[3],i=4,a=1;a<n;a++)E=u[S>>>24]^d[L>>16&255]^h[_>>8&255]^c[255&w]^o[i],T=u[L>>>24]^d[_>>16&255]^h[w>>8&255]^c[255&S]^o[i+1],R=u[_>>>24]^d[w>>16&255]^h[S>>8&255]^c[255&L]^o[i+2],A=u[w>>>24]^d[S>>16&255]^h[L>>8&255]^c[255&_]^o[i+3],S=E,L=T,_=R,w=A,i+=4;E=s[S>>>24]<<24^s[L>>16&255]<<16^s[_>>8&255]<<8^s[255&w]^o[i],T=s[L>>>24]<<24^s[_>>16&255]<<16^s[w>>8&255]<<8^s[255&S]^o[i+1],R=s[_>>>24]<<24^s[w>>16&255]<<16^s[S>>8&255]<<8^s[255&L]^o[i+2],A=s[w>>>24]<<24^s[S>>16&255]<<16^s[L>>8&255]<<8^s[255&_]^o[i+3],i+=3,b[e]=C(E^p),b[e+1]=C(A^g),b[e+2]=C(R^v),b[e+3]=C(T^y),p=D,g=I,v=k,y=O,e+=4}return b.buffer},t.prototype.destroy=function(){this.key=void 0,this.keySize=void 0,this.ksRows=void 0,this.sBox=void 0,this.invSBox=void 0,this.subMix=void 0,this.invSubMix=void 0,this.keySchedule=void 0,this.invKeySchedule=void 0,this.rcon=void 0},t}(),c=h,f=r(2),p=r(0),g=function(){function t(e,r){o(this,t),this.observer=e,this.config=r,this.logEnabled=!0;try{var i=crypto||self.crypto;this.subtle=i.subtle||i.webkitSubtle}catch(t){}this.disableWebCrypto=!this.subtle}return t.prototype.isSync=function(){return this.disableWebCrypto&&this.config.enableSoftwareAES},t.prototype.decrypt=function(t,e,r,i){var a=this;if(this.disableWebCrypto&&this.config.enableSoftwareAES){this.logEnabled&&(p.b.log("JS AES decrypt"),this.logEnabled=!1);var n=this.decryptor;n||(this.decryptor=n=new c),n.expandKey(e),i(n.decrypt(t,0,r))}else{this.logEnabled&&(p.b.log("WebCrypto AES decrypt"),this.logEnabled=!1);var o=this.subtle;this.key!==e&&(this.key=e,this.fastAesKey=new d(o,e)),this.fastAesKey.expandKey().then(function(n){new l(o,r).decrypt(t,n).catch(function(n){a.onWebCryptoError(n,t,e,r,i)}).then(function(t){i(t)})}).catch(function(n){a.onWebCryptoError(n,t,e,r,i)})}},t.prototype.onWebCryptoError=function(t,e,r,i,a){this.config.enableSoftwareAES?(p.b.log("WebCrypto Error, disable WebCrypto API"),this.disableWebCrypto=!0,this.logEnabled=!0,this.decrypt(e,r,i,a)):(p.b.error("decrypting error : "+t.message),this.observer.trigger(Event.ERROR,{type:f.b.MEDIA_ERROR,details:f.a.FRAG_DECRYPT_ERROR,fatal:!0,reason:t.message}))},t.prototype.destroy=function(){var t=this.decryptor;t&&(t.destroy(),this.decryptor=void 0)},t}();e.a=g},function(t,e){function r(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function i(t){return"function"==typeof t}function a(t){return"number"==typeof t}function n(t){return"object"==typeof t&&null!==t}function o(t){return void 0===t}t.exports=r,r.EventEmitter=r,r.prototype._events=void 0,r.prototype._maxListeners=void 0,r.defaultMaxListeners=10,r.prototype.setMaxListeners=function(t){if(!a(t)||t<0||isNaN(t))throw TypeError("n must be a positive number");return this._maxListeners=t,this},r.prototype.emit=function(t){var e,r,a,s,l,u;if(this._events||(this._events={}),"error"===t&&(!this._events.error||n(this._events.error)&&!this._events.error.length)){if((e=arguments[1])instanceof Error)throw e;var d=new Error('Uncaught, unspecified "error" event. ('+e+")");throw d.context=e,d}if(r=this._events[t],o(r))return!1;if(i(r))switch(arguments.length){case 1:r.call(this);break;case 2:r.call(this,arguments[1]);break;case 3:r.call(this,arguments[1],arguments[2]);break;default:s=Array.prototype.slice.call(arguments,1),r.apply(this,s)}else if(n(r))for(s=Array.prototype.slice.call(arguments,1),u=r.slice(),a=u.length,l=0;l<a;l++)u[l].apply(this,s);return!0},r.prototype.addListener=function(t,e){var a;if(!i(e))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",t,i(e.listener)?e.listener:e),this._events[t]?n(this._events[t])?this._events[t].push(e):this._events[t]=[this._events[t],e]:this._events[t]=e,n(this._events[t])&&!this._events[t].warned&&(a=o(this._maxListeners)?r.defaultMaxListeners:this._maxListeners)&&a>0&&this._events[t].length>a&&(this._events[t].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[t].length),"function"==typeof console.trace&&console.trace()),this},r.prototype.on=r.prototype.addListener,r.prototype.once=function(t,e){function r(){this.removeListener(t,r),a||(a=!0,e.apply(this,arguments))}if(!i(e))throw TypeError("listener must be a function");var a=!1;return r.listener=e,this.on(t,r),this},r.prototype.removeListener=function(t,e){var r,a,o,s;if(!i(e))throw TypeError("listener must be a function");if(!this._events||!this._events[t])return this;if(r=this._events[t],o=r.length,a=-1,r===e||i(r.listener)&&r.listener===e)delete this._events[t],this._events.removeListener&&this.emit("removeListener",t,e);else if(n(r)){for(s=o;s-- >0;)if(r[s]===e||r[s].listener&&r[s].listener===e){a=s;break}if(a<0)return this;1===r.length?(r.length=0,delete this._events[t]):r.splice(a,1),this._events.removeListener&&this.emit("removeListener",t,e)}return this},r.prototype.removeAllListeners=function(t){var e,r;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[t]&&delete this._events[t],this;if(0===arguments.length){for(e in this._events)"removeListener"!==e&&this.removeAllListeners(e);return this.removeAllListeners("removeListener"),this._events={},this}if(r=this._events[t],i(r))this.removeListener(t,r);else if(r)for(;r.length;)this.removeListener(t,r[r.length-1]);return delete this._events[t],this},r.prototype.listeners=function(t){return this._events&&this._events[t]?i(this._events[t])?[this._events[t]]:this._events[t].slice():[]},r.prototype.listenerCount=function(t){if(this._events){var e=this._events[t];if(i(e))return 1;if(e)return e.length}return 0},r.listenerCount=function(t,e){return t.listenerCount(e)}},function(t,e,r){!function(e){var r=/^((?:[^\/;?#]+:)?)(\/\/[^\/\;?#]*)?(.*?)??(;.*?)?(\?.*?)?(#.*?)?$/,i=/^([^\/;?#]*)(.*)$/,a=/(?:\/|^)\.(?=\/)/g,n=/(?:\/|^)\.\.\/(?!\.\.\/).*?(?=\/)/g,o={buildAbsoluteURL:function(t,e,r){if(r=r||{},t=t.trim(),!(e=e.trim())){if(!r.alwaysNormalize)return t;var a=this.parseURL(t);if(!s)throw new Error("Error trying to parse base URL.");return a.path=o.normalizePath(a.path),o.buildURLFromParts(a)}var n=this.parseURL(e);if(!n)throw new Error("Error trying to parse relative URL.");if(n.scheme)return r.alwaysNormalize?(n.path=o.normalizePath(n.path),o.buildURLFromParts(n)):e;var s=this.parseURL(t);if(!s)throw new Error("Error trying to parse base URL.");if(!s.netLoc&&s.path&&"/"!==s.path[0]){var l=i.exec(s.path);s.netLoc=l[1],s.path=l[2]}s.netLoc&&!s.path&&(s.path="/");var u={scheme:s.scheme,netLoc:n.netLoc,path:null,params:n.params,query:n.query,fragment:n.fragment};if(!n.netLoc&&(u.netLoc=s.netLoc,"/"!==n.path[0]))if(n.path){var d=s.path,h=d.substring(0,d.lastIndexOf("/")+1)+n.path;u.path=o.normalizePath(h)}else u.path=s.path,n.params||(u.params=s.params,n.query||(u.query=s.query));return null===u.path&&(u.path=r.alwaysNormalize?o.normalizePath(n.path):n.path),o.buildURLFromParts(u)},parseURL:function(t){var e=r.exec(t);return e?{scheme:e[1]||"",netLoc:e[2]||"",path:e[3]||"",params:e[4]||"",query:e[5]||"",fragment:e[6]||""}:null},normalizePath:function(t){for(t=t.split("").reverse().join("").replace(a,"");t.length!==(t=t.replace(n,"")).length;);return t.split("").reverse().join("")},buildURLFromParts:function(t){return t.scheme+t.netLoc+t.path+t.params+t.query+t.fragment}};t.exports=o}()},function(t,e,r){"use strict";function i(t,e,r,i){var a,n,o,s,l,u=navigator.userAgent.toLowerCase(),d=i,h=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350];return a=1+((192&e[r+2])>>>6),(n=(60&e[r+2])>>>2)>h.length-1?void t.trigger(Event.ERROR,{type:L.b.MEDIA_ERROR,details:L.a.FRAG_PARSING_ERROR,fatal:!0,reason:"invalid ADTS sampling index:"+n}):(s=(1&e[r+2])<<2,s|=(192&e[r+3])>>>6,w.b.log("manifest codec:"+i+",ADTS data:type:"+a+",sampleingIndex:"+n+"["+h[n]+"Hz],channelConfig:"+s),/firefox/i.test(u)?n>=6?(a=5,l=new Array(4),o=n-3):(a=2,l=new Array(2),o=n):-1!==u.indexOf("android")?(a=2,l=new Array(2),o=n):(a=5,l=new Array(4),i&&(-1!==i.indexOf("mp4a.40.29")||-1!==i.indexOf("mp4a.40.5"))||!i&&n>=6?o=n-3:((i&&-1!==i.indexOf("mp4a.40.2")&&(n>=6&&1===s||/vivaldi/i.test(u))||!i&&1===s)&&(a=2,l=new Array(2)),o=n)),l[0]=a<<3,l[0]|=(14&n)>>1,l[1]|=(1&n)<<7,l[1]|=s<<3,5===a&&(l[1]|=(14&o)>>1,l[2]=(1&o)<<7,l[2]|=8,l[3]=0),{config:l,samplerate:h[n],channelCount:s,codec:"mp4a.40."+a,manifestCodec:d})}function a(t,e){return 255===t[e]&&240==(246&t[e+1])}function n(t,e){return 1&t[e+1]?7:9}function o(t,e){return(3&t[e+3])<<11|t[e+4]<<3|(224&t[e+5])>>>5}function s(t,e){return!!(e+1<t.length&&a(t,e))}function l(t,e){if(e+1<t.length&&a(t,e)){var r=n(t,e),i=r;e+5<t.length&&(i=o(t,e));var s=e+i;if(s===t.length||s+1<t.length&&a(t,s))return!0}return!1}function u(t,e,r,a,n){if(!t.samplerate){var o=i(e,r,a,n);t.config=o.config,t.samplerate=o.samplerate,t.channelCount=o.channelCount,t.codec=o.codec,t.manifestCodec=o.manifestCodec,w.b.log("parsed codec:"+t.codec+",rate:"+o.samplerate+",nb channel:"+o.channelCount)}}function d(t){return 9216e4/t}function h(t,e,r,i,a){var s,l,u,d=t.length;if(s=n(t,e),l=o(t,e),(l-=s)>0&&e+s+l<=d)return u=r+i*a,{headerLength:s,frameLength:l,stamp:u}}function c(t,e,r,i,a){var n=d(t.samplerate),o=h(e,r,i,a,n);if(o){var s=o.stamp,l=o.headerLength,u=o.frameLength,c={unit:e.subarray(r+l,r+l+u),pts:s,dts:s};return t.samples.push(c),t.len+=u,{sample:c,length:u+l}}}function f(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function p(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function g(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function v(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function y(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function m(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function b(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function E(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function T(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function R(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function A(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var S=r(1),L=r(2),_=r(4),w=r(0),D=r(3),I=function(){function t(e,r,i){f(this,t),this.observer=e,this.config=i,this.remuxer=r}return t.prototype.resetInitSegment=function(t,e,r,i){this._audioTrack={container:"audio/adts",type:"audio",id:0,sequenceNumber:0,isAAC:!0,samples:[],len:0,manifestCodec:e,duration:i,inputTimeScale:9e4}},t.prototype.resetTimeStamp=function(){},t.probe=function(t){if(!t)return!1;for(var e=D.a.getID3Data(t,0)||[],r=e.length,i=t.length;r<i;r++)if(l(t,r))return w.b.log("ADTS sync word found !"),!0;return!1},t.prototype.append=function(t,e,r,i){for(var a=this._audioTrack,n=D.a.getID3Data(t,0)||[],o=D.a.getTimeStamp(n),l=o?90*o:9e4*e,d=0,h=l,f=t.length,p=n.length,g=[{pts:h,dts:h,data:n}];p<f-1;)if(s(t,p)&&p+5<f){u(a,this.observer,t,p,a.manifestCodec);var v=c(a,t,p,l,d);if(!v){w.b.log("Unable to parse AAC frame");break}p+=v.length,h=v.sample.pts,d++}else D.a.isHeader(t,p)?(n=D.a.getID3Data(t,p),g.push({pts:h,dts:h,data:n}),p+=n.length):p++;this.remuxer.remux(a,{samples:[]},{samples:g,inputTimeScale:9e4},{samples:[]},e,r,i)},t.prototype.destroy=function(){},t}(),k=I,O=Math.pow(2,32)-1,C=function(){function t(e,r){p(this,t),this.observer=e,this.remuxer=r}return t.prototype.resetTimeStamp=function(t){this.initPTS=t},t.prototype.resetInitSegment=function(e,r,i,a){if(e&&e.byteLength){var n=this.initData=t.parseInitSegment(e);null==r&&(r="mp4a.40.5"),null==i&&(i="avc1.42e01e");var o={};n.audio&&n.video?o.audiovideo={container:"video/mp4",codec:r+","+i,initSegment:a?e:null}:(n.audio&&(o.audio={container:"audio/mp4",codec:r,initSegment:a?e:null}),n.video&&(o.video={container:"video/mp4",codec:i,initSegment:a?e:null})),this.observer.trigger(S.a.FRAG_PARSING_INIT_SEGMENT,{tracks:o})}else r&&(this.audioCodec=r),i&&(this.videoCodec=i)},t.probe=function(e){return t.findBox({data:e,start:0,end:Math.min(e.length,16384)},["moof"]).length>0},t.bin2str=function(t){return String.fromCharCode.apply(null,t)},t.readUint32=function(t,e){t.data&&(e+=t.start,t=t.data);var r=t[e]<<24|t[e+1]<<16|t[e+2]<<8|t[e+3];return r<0?4294967296+r:r},t.writeUint32=function(t,e,r){t.data&&(e+=t.start,t=t.data),t[e]=r>>24,t[e+1]=r>>16&255,t[e+2]=r>>8&255,t[e+3]=255&r},t.findBox=function(e,r){var i,a,n,o,s,l,u,d=[];if(e.data?(l=e.start,o=e.end,e=e.data):(l=0,o=e.byteLength),!r.length)return null;for(i=l;i<o;)a=t.readUint32(e,i),n=t.bin2str(e.subarray(i+4,i+8)),u=a>1?i+a:o,n===r[0]&&(1===r.length?d.push({data:e,start:i+8,end:u}):(s=t.findBox({data:e,start:i+8,end:u},r.slice(1)),s.length&&(d=d.concat(s)))),i=u;return d},t.parseInitSegment=function(e){var r=[];return t.findBox(e,["moov","trak"]).forEach(function(e){var i=t.findBox(e,["tkhd"])[0];if(i){var a=i.data[i.start],n=0===a?12:20,o=t.readUint32(i,n),s=t.findBox(e,["mdia","mdhd"])[0];if(s){a=s.data[s.start],n=0===a?12:20;var l=t.readUint32(s,n),u=t.findBox(e,["mdia","hdlr"])[0];if(u){var d=t.bin2str(u.data.subarray(u.start+8,u.start+12)),h={soun:"audio",vide:"video"}[d];if(h){var c=t.findBox(e,["mdia","minf","stbl","stsd"]);if(c.length){c=c[0];var f=t.bin2str(c.data.subarray(c.start+12,c.start+16));w.b.log("MP4Demuxer:"+h+":"+f+" found")}r[o]={timescale:l,type:h},r[h]={timescale:l,id:o}}}}}}),r},t.getStartDTS=function(e,r){var i,a,n;return i=t.findBox(r,["moof","traf"]),a=[].concat.apply([],i.map(function(r){return t.findBox(r,["tfhd"]).map(function(i){var a,n;return a=t.readUint32(i,4),n=e[a].timescale||9e4,t.findBox(r,["tfdt"]).map(function(e){var r,i;return r=e.data[e.start],i=t.readUint32(e,4),1===r&&(i*=Math.pow(2,32),i+=t.readUint32(e,8)),i})[0]/n})})),n=Math.min.apply(null,a),isFinite(n)?n:0},t.offsetStartDTS=function(e,r,i){t.findBox(r,["moof","traf"]).map(function(r){return t.findBox(r,["tfhd"]).map(function(a){var n=t.readUint32(a,4),o=e[n].timescale||9e4;t.findBox(r,["tfdt"]).map(function(e){var r=e.data[e.start],a=t.readUint32(e,4);if(0===r)t.writeUint32(e,4,a-i*o);else{a*=Math.pow(2,32),a+=t.readUint32(e,8),a-=i*o,a=Math.max(a,0);var n=Math.floor(a/(O+1)),s=Math.floor(a%(O+1));t.writeUint32(e,4,n),t.writeUint32(e,8,s)}})})})},t.prototype.append=function(e,r,i,a){var n=this.initData;n||(this.resetInitSegment(e,this.audioCodec,this.videoCodec),n=this.initData);var o=void 0,s=this.initPTS;if(void 0===s){var l=t.getStartDTS(n,e);this.initPTS=s=l-r,this.observer.trigger(S.a.INIT_PTS_FOUND,{initPTS:s})}t.offsetStartDTS(n,e,s),o=t.getStartDTS(n,e),this.remuxer.remux(n.audio,n.video,null,null,o,i,a,e)},t.prototype.destroy=function(){},t}(),P=C,x={BitratesMap:[32,64,96,128,160,192,224,256,288,320,352,384,416,448,32,48,56,64,80,96,112,128,160,192,224,256,320,384,32,40,48,56,64,80,96,112,128,160,192,224,256,320,32,48,56,64,80,96,112,128,144,160,176,192,224,256,8,16,24,32,40,48,56,64,80,96,112,128,144,160],SamplingRateMap:[44100,48e3,32e3,22050,24e3,16e3,11025,12e3,8e3],SamplesCoefficients:[[0,72,144,12],[0,0,0,0],[0,72,144,12],[0,144,144,12]],BytesInSlot:[0,1,1,4],appendFrame:function(t,e,r,i,a){if(!(r+24>e.length)){var n=this.parseHeader(e,r);if(n&&r+n.frameLength<=e.length){var o=9e4*n.samplesPerFrame/n.sampleRate,s=i+a*o,l={unit:e.subarray(r,r+n.frameLength),pts:s,dts:s};return t.config=[],t.channelCount=n.channelCount,t.samplerate=n.sampleRate,t.samples.push(l),t.len+=n.frameLength,{sample:l,length:n.frameLength}}}},parseHeader:function(t,e){var r=t[e+1]>>3&3,i=t[e+1]>>1&3,a=t[e+2]>>4&15,n=t[e+2]>>2&3,o=t[e+2]>>1&1;if(1!==r&&0!==a&&15!==a&&3!==n){var s=3===r?3-i:3===i?3:4,l=1e3*x.BitratesMap[14*s+a-1],u=3===r?0:2===r?1:2,d=x.SamplingRateMap[3*u+n],h=t[e+3]>>6==3?1:2,c=x.SamplesCoefficients[r][i],f=x.BytesInSlot[i],p=8*c*f;return{sampleRate:d,channelCount:h,frameLength:parseInt(c*l/d+o,10)*f,samplesPerFrame:p}}},isHeaderPattern:function(t,e){return 255===t[e]&&224==(224&t[e+1])&&0!=(6&t[e+1])},isHeader:function(t,e){return!!(e+1<t.length&&this.isHeaderPattern(t,e))},probe:function(t,e){if(e+1<t.length&&this.isHeaderPattern(t,e)){var r=this.parseHeader(t,e),i=4;r&&r.frameLength&&(i=r.frameLength);var a=e+i;if(a===t.length||a+1<t.length&&this.isHeaderPattern(t,a))return!0}return!1}},F=x,N=function(){function t(e){g(this,t),this.data=e,this.bytesAvailable=e.byteLength,this.word=0,this.bitsAvailable=0}return t.prototype.loadWord=function(){var t=this.data,e=this.bytesAvailable,r=t.byteLength-e,i=new Uint8Array(4),a=Math.min(4,e);if(0===a)throw new Error("no bytes available");i.set(t.subarray(r,r+a)),this.word=new DataView(i.buffer).getUint32(0),this.bitsAvailable=8*a,this.bytesAvailable-=a},t.prototype.skipBits=function(t){var e;this.bitsAvailable>t?(this.word<<=t,this.bitsAvailable-=t):(t-=this.bitsAvailable,e=t>>3,t-=e>>3,this.bytesAvailable-=e,this.loadWord(),this.word<<=t,this.bitsAvailable-=t)},t.prototype.readBits=function(t){var e=Math.min(this.bitsAvailable,t),r=this.word>>>32-e;return t>32&&w.b.error("Cannot read more than 32 bits at a time"),this.bitsAvailable-=e,this.bitsAvailable>0?this.word<<=e:this.bytesAvailable>0&&this.loadWord(),e=t-e,e>0&&this.bitsAvailable?r<<e|this.readBits(e):r},t.prototype.skipLZ=function(){var t;for(t=0;t<this.bitsAvailable;++t)if(0!=(this.word&2147483648>>>t))return this.word<<=t,this.bitsAvailable-=t,t;return this.loadWord(),t+this.skipLZ()},t.prototype.skipUEG=function(){this.skipBits(1+this.skipLZ())},t.prototype.skipEG=function(){this.skipBits(1+this.skipLZ())},t.prototype.readUEG=function(){var t=this.skipLZ();return this.readBits(t+1)-1},t.prototype.readEG=function(){var t=this.readUEG();return 1&t?1+t>>>1:-1*(t>>>1)},t.prototype.readBoolean=function(){return 1===this.readBits(1)},t.prototype.readUByte=function(){return this.readBits(8)},t.prototype.readUShort=function(){return this.readBits(16)},t.prototype.readUInt=function(){return this.readBits(32)},t.prototype.skipScalingList=function(t){var e,r,i=8,a=8;for(e=0;e<t;e++)0!==a&&(r=this.readEG(),a=(i+r+256)%256),i=0===a?i:a},t.prototype.readSPS=function(){var t,e,r,i,a,n,o,s=0,l=0,u=0,d=0,h=this.readUByte.bind(this),c=this.readBits.bind(this),f=this.readUEG.bind(this),p=this.readBoolean.bind(this),g=this.skipBits.bind(this),v=this.skipEG.bind(this),y=this.skipUEG.bind(this),m=this.skipScalingList.bind(this);if(h(),t=h(),c(5),g(3),h(),y(),100===t||110===t||122===t||244===t||44===t||83===t||86===t||118===t||128===t){var b=f();if(3===b&&g(1),y(),y(),g(1),p())for(n=3!==b?8:12,o=0;o<n;o++)p()&&m(o<6?16:64)}y();var E=f();if(0===E)f();else if(1===E)for(g(1),v(),v(),e=f(),o=0;o<e;o++)v();y(),g(1),r=f(),i=f(),a=c(1),0===a&&g(1),g(1),p()&&(s=f(),l=f(),u=f(),d=f());var T=[1,1];if(p()&&p()){switch(h()){case 1:T=[1,1];break;case 2:T=[12,11];break;case 3:T=[10,11];break;case 4:T=[16,11];break;case 5:T=[40,33];break;case 6:T=[24,11];break;case 7:T=[20,11];break;case 8:T=[32,11];break;case 9:T=[80,33];break;case 10:T=[18,11];break;case 11:T=[15,11];break;case 12:T=[64,33];break;case 13:T=[160,99];break;case 14:T=[4,3];break;case 15:T=[3,2];break;case 16:T=[2,1];break;case 255:T=[h()<<8|h(),h()<<8|h()]}}return{width:Math.ceil(16*(r+1)-2*s-2*l),height:(2-a)*(i+1)*16-(a?2:4)*(u+d),pixelRatio:T}},t.prototype.readSliceType=function(){return this.readUByte(),this.readUEG(),this.readUEG()},t}(),M=N,U=function(){function t(e,r,i,a){v(this,t),this.decryptdata=i,this.discardEPB=a,this.decrypter=new _.a(e,r)}return t.prototype.decryptBuffer=function(t,e){this.decrypter.decrypt(t,this.decryptdata.key.buffer,this.decryptdata.iv.buffer,e)},t.prototype.decryptAacSample=function(t,e,r,i){var a=t[e].unit,n=a.subarray(16,a.length-a.length%16),o=n.buffer.slice(n.byteOffset,n.byteOffset+n.length),s=this;this.decryptBuffer(o,function(n){n=new Uint8Array(n),a.set(n,16),i||s.decryptAacSamples(t,e+1,r)})},t.prototype.decryptAacSamples=function(t,e,r){for(;;e++){if(e>=t.length)return void r();if(!(t[e].unit.length<32)){var i=this.decrypter.isSync();if(this.decryptAacSample(t,e,r,i),!i)return}}},t.prototype.getAvcEncryptedData=function(t){for(var e=16*Math.floor((t.length-48)/160)+16,r=new Int8Array(e),i=0,a=32;a<=t.length-16;a+=160,i+=16)r.set(t.subarray(a,a+16),i);return r},t.prototype.getAvcDecryptedUnit=function(t,e){e=new Uint8Array(e);for(var r=0,i=32;i<=t.length-16;i+=160,r+=16)t.set(e.subarray(r,r+16),i);return t},t.prototype.decryptAvcSample=function(t,e,r,i,a,n){var o=this.discardEPB(a.data),s=this.getAvcEncryptedData(o),l=this;this.decryptBuffer(s.buffer,function(s){a.data=l.getAvcDecryptedUnit(o,s),n||l.decryptAvcSamples(t,e,r+1,i)})},t.prototype.decryptAvcSamples=function(t,e,r,i){for(;;e++,r=0){if(e>=t.length)return void i();for(var a=t[e].units;!(r>=a.length);r++){var n=a[r];if(!(n.length<=48||1!==n.type&&5!==n.type)){var o=this.decrypter.isSync();if(this.decryptAvcSample(t,e,r,i,n,o),!o)return}}}},t}(),B=U,G={video:0,audio:1,id3:2,text:3},j=function(){function t(e,r,i,a){y(this,t),this.observer=e,this.config=i,this.typeSupported=a,this.remuxer=r,this.sampleAes=null}return t.prototype.setDecryptData=function(t){null!=t&&null!=t.key&&"SAMPLE-AES"===t.method?this.sampleAes=new B(this.observer,this.config,t,this.discardEPB):this.sampleAes=null},t.probe=function(e){var r=t._syncOffset(e);return!(r<0)&&(r&&w.b.warn("MPEG2-TS detected but first sync word found @ offset "+r+", junk ahead ?"),!0)},t._syncOffset=function(t){for(var e=Math.min(1e3,t.length-564),r=0;r<e;){if(71===t[r]&&71===t[r+188]&&71===t[r+376])return r;r++}return-1},t.createTrack=function(t,e){return{container:"video"===t||"audio"===t?"video/mp2t":void 0,type:t,id:G[t],pid:-1,inputTimeScale:9e4,sequenceNumber:0,samples:[],len:0,dropped:"video"===t?0:void 0,isAAC:"audio"===t||void 0,duration:"audio"===t?e:void 0}},t.prototype.resetInitSegment=function(e,r,i,a){this.pmtParsed=!1,this._pmtId=-1,this._avcTrack=t.createTrack("video",a),this._audioTrack=t.createTrack("audio",a),this._id3Track=t.createTrack("id3",a),this._txtTrack=t.createTrack("text",a),this.aacOverFlow=null,this.aacLastPTS=null,this.avcSample=null,this.audioCodec=r,this.videoCodec=i,this._duration=a},t.prototype.resetTimeStamp=function(){},t.prototype.append=function(e,r,i,a){var n,o,s,l,u,d=e.length,h=!1;this.contiguous=i;var c=this.pmtParsed,f=this._avcTrack,p=this._audioTrack,g=this._id3Track,v=f.pid,y=p.pid,m=g.pid,b=this._pmtId,E=f.pesData,T=p.pesData,R=g.pesData,A=this._parsePAT,_=this._parsePMT,D=this._parsePES,I=this._parseAVCPES.bind(this),k=this._parseAACPES.bind(this),O=this._parseMPEGPES.bind(this),C=this._parseID3PES.bind(this),P=t._syncOffset(e);for(d-=(d+P)%188,n=P;n<d;n+=188)if(71===e[n]){if(o=!!(64&e[n+1]),s=((31&e[n+1])<<8)+e[n+2],(48&e[n+3])>>4>1){if((l=n+5+e[n+4])===n+188)continue}else l=n+4;switch(s){case v:o&&(E&&(u=D(E))&&I(u,!1),E={data:[],size:0}),E&&(E.data.push(e.subarray(l,n+188)),E.size+=n+188-l);break;case y:o&&(T&&(u=D(T))&&(p.isAAC?k(u):O(u)),T={data:[],size:0}),T&&(T.data.push(e.subarray(l,n+188)),T.size+=n+188-l);break;case m:o&&(R&&(u=D(R))&&C(u),R={data:[],size:0}),R&&(R.data.push(e.subarray(l,n+188)),R.size+=n+188-l);break;case 0:o&&(l+=e[l]+1),b=this._pmtId=A(e,l);break;case b:o&&(l+=e[l]+1);var x=_(e,l,!0===this.typeSupported.mpeg||!0===this.typeSupported.mp3,null!=this.sampleAes);v=x.avc,v>0&&(f.pid=v),y=x.audio,y>0&&(p.pid=y,p.isAAC=x.isAAC),m=x.id3,m>0&&(g.pid=m),h&&!c&&(w.b.log("reparse from beginning"),h=!1,n=P-188),c=this.pmtParsed=!0;break;case 17:case 8191:break;default:h=!0}}else this.observer.trigger(S.a.ERROR,{type:L.b.MEDIA_ERROR,details:L.a.FRAG_PARSING_ERROR,fatal:!1,reason:"TS packet did not start with 0x47"});E&&(u=D(E))?(I(u,!0),f.pesData=null):f.pesData=E,T&&(u=D(T))?(p.isAAC?k(u):O(u),p.pesData=null):(T&&T.size&&w.b.log("last AAC PES packet truncated,might overlap between fragments"),p.pesData=T),R&&(u=D(R))?(C(u),g.pesData=null):g.pesData=R,null==this.sampleAes?this.remuxer.remux(p,f,g,this._txtTrack,r,i,a):this.decryptAndRemux(p,f,g,this._txtTrack,r,i,a)},t.prototype.decryptAndRemux=function(t,e,r,i,a,n,o){if(t.samples&&t.isAAC){var s=this;this.sampleAes.decryptAacSamples(t.samples,0,function(){s.decryptAndRemuxAvc(t,e,r,i,a,n,o)})}else this.decryptAndRemuxAvc(t,e,r,i,a,n,o)},t.prototype.decryptAndRemuxAvc=function(t,e,r,i,a,n,o){if(e.samples){var s=this;this.sampleAes.decryptAvcSamples(e.samples,0,0,function(){s.remuxer.remux(t,e,r,i,a,n,o)})}else this.remuxer.remux(t,e,r,i,a,n,o)},t.prototype.destroy=function(){this._initPTS=this._initDTS=void 0,this._duration=0},t.prototype._parsePAT=function(t,e){return(31&t[e+10])<<8|t[e+11]},t.prototype._parsePMT=function(t,e,r,i){var a,n,o,s,l={audio:-1,avc:-1,id3:-1,isAAC:!0};for(a=(15&t[e+1])<<8|t[e+2],n=e+3+a-4,o=(15&t[e+10])<<8|t[e+11],e+=12+o;e<n;){switch(s=(31&t[e+1])<<8|t[e+2],t[e]){case 207:if(!i){w.b.log("unkown stream type:"+t[e]);break}case 15:-1===l.audio&&(l.audio=s);break;case 21:-1===l.id3&&(l.id3=s);break;case 219:if(!i){w.b.log("unkown stream type:"+t[e]);break}case 27:-1===l.avc&&(l.avc=s);break;case 3:case 4:r?-1===l.audio&&(l.audio=s,l.isAAC=!1):w.b.log("MPEG audio found, not supported in this browser for now");break;case 36:w.b.warn("HEVC stream type found, not supported for now");break;default:w.b.log("unkown stream type:"+t[e])}e+=5+((15&t[e+3])<<8|t[e+4])}return l},t.prototype._parsePES=function(t){var e,r,i,a,n,o,s,l,u=0,d=t.data;if(!t||0===t.size)return null;for(;d[0].length<19&&d.length>1;){var h=new Uint8Array(d[0].length+d[1].length);h.set(d[0]),h.set(d[1],d[0].length),d[0]=h,d.splice(1,1)}if(e=d[0],1===(e[0]<<16)+(e[1]<<8)+e[2]){if((i=(e[4]<<8)+e[5])&&i>t.size-6)return null;r=e[7],192&r&&(o=536870912*(14&e[9])+4194304*(255&e[10])+16384*(254&e[11])+128*(255&e[12])+(254&e[13])/2,o>4294967295&&(o-=8589934592),64&r?(s=536870912*(14&e[14])+4194304*(255&e[15])+16384*(254&e[16])+128*(255&e[17])+(254&e[18])/2,s>4294967295&&(s-=8589934592),o-s>54e5&&(w.b.warn(Math.round((o-s)/9e4)+"s delta between PTS and DTS, align them"),o=s)):s=o),a=e[8],l=a+9,t.size-=l,n=new Uint8Array(t.size);for(var c=0,f=d.length;c<f;c++){e=d[c];var p=e.byteLength;if(l){if(l>p){l-=p;continue}e=e.subarray(l),p-=l,l=0}n.set(e,u),u+=p}return i&&(i-=a+3),{data:n,pts:o,dts:s,len:i}}return null},t.prototype.pushAccesUnit=function(t,e){if(t.units.length&&t.frame){var r=e.samples,i=r.length;!this.config.forceKeyFrameOnDiscontinuity||!0===t.key||e.sps&&(i||this.contiguous)?(t.id=i,r.push(t)):e.dropped++}t.debug.length&&w.b.log(t.pts+"/"+t.dts+":"+t.debug)},t.prototype._parseAVCPES=function(t,e){var r,i,a,n=this,o=this._avcTrack,s=this._parseAVCNALu(t.data),l=this.avcSample,u=!1,d=this.pushAccesUnit.bind(this),h=function(t,e,r,i){return{key:t,pts:e,dts:r,units:[],debug:i}};t.data=null,l&&s.length&&!o.audFound&&(d(l,o),l=this.avcSample=h(!1,t.pts,t.dts,"")),s.forEach(function(e){switch(e.type){case 1:i=!0,l||(l=n.avcSample=h(!0,t.pts,t.dts,"")),l.frame=!0;var s=e.data;if(u&&s.length>4){var c=new M(s).readSliceType();2!==c&&4!==c&&7!==c&&9!==c||(l.key=!0)}break;case 5:i=!0,l||(l=n.avcSample=h(!0,t.pts,t.dts,"")),l.key=!0,l.frame=!0;break;case 6:i=!0,r=new M(n.discardEPB(e.data)),r.readUByte();for(var f=0,p=0,g=!1,v=0;!g&&r.bytesAvailable>1;){f=0;do{v=r.readUByte(),f+=v}while(255===v);p=0;do{v=r.readUByte(),p+=v}while(255===v);if(4===f&&0!==r.bytesAvailable){g=!0;if(181===r.readUByte()){if(49===r.readUShort()){if(1195456820===r.readUInt()){if(3===r.readUByte()){var y=r.readUByte(),m=r.readUByte(),b=31&y,E=[y,m];for(a=0;a<b;a++)E.push(r.readUByte()),E.push(r.readUByte()),E.push(r.readUByte());n._insertSampleInOrder(n._txtTrack.samples,{type:3,pts:t.pts,bytes:E})}}}}}else if(p<r.bytesAvailable)for(a=0;a<p;a++)r.readUByte()}break;case 7:if(i=!0,u=!0,!o.sps){r=new M(e.data);var T=r.readSPS();o.width=T.width,o.height=T.height,o.pixelRatio=T.pixelRatio,o.sps=[e.data],o.duration=n._duration;var R=e.data.subarray(1,4),A="avc1.";for(a=0;a<3;a++){var S=R[a].toString(16);S.length<2&&(S="0"+S),A+=S}o.codec=A}break;case 8:i=!0,o.pps||(o.pps=[e.data]);break;case 9:i=!1,o.audFound=!0,l&&d(l,o),l=n.avcSample=h(!1,t.pts,t.dts,"");break;case 12:i=!1;break;default:i=!1,l&&(l.debug+="unknown NAL "+e.type+" ")}if(l&&i){l.units.push(e)}}),e&&l&&(d(l,o),this.avcSample=null)},t.prototype._insertSampleInOrder=function(t,e){var r=t.length;if(r>0){if(e.pts>=t[r-1].pts)t.push(e);else for(var i=r-1;i>=0;i--)if(e.pts<t[i].pts){t.splice(i,0,e);break}}else t.push(e)},t.prototype._getLastNalUnit=function(){var t=this.avcSample,e=void 0;if(!t||0===t.units.length){var r=this._avcTrack,i=r.samples;t=i[i.length-1]}if(t){var a=t.units;e=a[a.length-1]}return e},t.prototype._parseAVCNALu=function(t){var e,r,i,a,n,o=0,s=t.byteLength,l=this._avcTrack,u=l.naluState||0,d=u,h=[],c=-1;for(-1===u&&(c=0,n=31&t[0],u=0,o=1);o<s;)if(e=t[o++],u)if(1!==u)if(e)if(1===e){if(c>=0)i={data:t.subarray(c,o-u-1),type:n},h.push(i);else{var f=this._getLastNalUnit();if(f&&(d&&o<=4-d&&f.state&&(f.data=f.data.subarray(0,f.data.byteLength-d)),(r=o-u-1)>0)){var p=new Uint8Array(f.data.byteLength+r);p.set(f.data,0),p.set(t.subarray(0,r),f.data.byteLength),f.data=p}}o<s?(a=31&t[o],c=o,n=a,u=0):u=-1}else u=0;else u=3;else u=e?0:2;else u=e?0:1;if(c>=0&&u>=0&&(i={data:t.subarray(c,s),type:n,state:u},h.push(i)),0===h.length){var g=this._getLastNalUnit();if(g){var v=new Uint8Array(g.data.byteLength+t.byteLength);v.set(g.data,0),v.set(t,g.data.byteLength),g.data=v}}return l.naluState=u,h},t.prototype.discardEPB=function(t){for(var e,r,i=t.byteLength,a=[],n=1;n<i-2;)0===t[n]&&0===t[n+1]&&3===t[n+2]?(a.push(n+2),n+=2):n++;if(0===a.length)return t;e=i-a.length,r=new Uint8Array(e);var o=0;for(n=0;n<e;o++,n++)o===a[0]&&(o++,a.shift()),r[n]=t[o];return r},t.prototype._parseAACPES=function(t){var e,r,i,a,n,o=this._audioTrack,l=t.data,h=t.pts,f=this.aacOverFlow,p=this.aacLastPTS;if(f){var g=new Uint8Array(f.byteLength+l.byteLength);g.set(f,0),g.set(l,f.byteLength),l=g}for(i=0,n=l.length;i<n-1&&!s(l,i);i++);if(i){var v,y;if(i<n-1?(v="AAC PES did not start with ADTS header,offset:"+i,y=!1):(v="no ADTS header found in AAC PES",y=!0),w.b.warn("parsing error:"+v),this.observer.trigger(S.a.ERROR,{type:L.b.MEDIA_ERROR,details:L.a.FRAG_PARSING_ERROR,fatal:y,reason:v}),y)return}if(u(o,this.observer,l,i,this.audioCodec),r=0,e=d(o.samplerate),f&&p){var m=p+e;Math.abs(m-h)>1&&(w.b.log("AAC: align PTS for overlapping frames by "+Math.round((m-h)/90)),h=m)}for(;i<n;)if(s(l,i)&&i+5<n){var b=c(o,l,i,h,r);if(!b)break;i+=b.length,a=b.sample.pts,r++}else i++;f=i<n?l.subarray(i,n):null,this.aacOverFlow=f,this.aacLastPTS=a},t.prototype._parseMPEGPES=function(t){for(var e=t.data,r=e.length,i=0,a=0,n=t.pts;a<r;)if(F.isHeader(e,a)){var o=F.appendFrame(this._audioTrack,e,a,n,i);if(!o)break;a+=o.length,i++}else a++},t.prototype._parseID3PES=function(t){this._id3Track.samples.push(t)},t}(),H=j,K=function(){function t(e,r,i){m(this,t),this.observer=e,this.config=i,this.remuxer=r}return t.prototype.resetInitSegment=function(t,e,r,i){this._audioTrack={container:"audio/mpeg",type:"audio",id:-1,sequenceNumber:0,isAAC:!1,samples:[],len:0,manifestCodec:e,duration:i,inputTimeScale:9e4}},t.prototype.resetTimeStamp=function(){},t.probe=function(t){var e,r,i=D.a.getID3Data(t,0);if(i&&void 0!==D.a.getTimeStamp(i))for(e=i.length,r=Math.min(t.length-1,e+100);e<r;e++)if(F.probe(t,e))return w.b.log("MPEG Audio sync word found !"),!0;return!1},t.prototype.append=function(t,e,r,i){for(var a=D.a.getID3Data(t,0),n=D.a.getTimeStamp(a),o=n?90*n:9e4*e,s=a.length,l=t.length,u=0,d=0,h=this._audioTrack,c=[{pts:o,dts:o,data:a}];s<l;)if(F.isHeader(t,s)){var f=F.appendFrame(h,t,s,o,u);if(!f)break;s+=f.length,d=f.sample.pts,u++}else D.a.isHeader(t,s)?(a=D.a.getID3Data(t,s),c.push({pts:d,dts:d,data:a}),s+=a.length):s++;this.remuxer.remux(h,{samples:[]},{samples:c,inputTimeScale:9e4},{samples:[]},e,r,i)},t.prototype.destroy=function(){},t}(),W=K,V=function(){function t(){b(this,t)}return t.getSilentFrame=function(t,e){switch(t){case"mp4a.40.2":if(1===e)return new Uint8Array([0,200,0,128,35,128]);if(2===e)return new Uint8Array([33,0,73,144,2,25,0,35,128]);if(3===e)return new Uint8Array([0,200,0,128,32,132,1,38,64,8,100,0,142]);if(4===e)return new Uint8Array([0,200,0,128,32,132,1,38,64,8,100,0,128,44,128,8,2,56]);if(5===e)return new Uint8Array([0,200,0,128,32,132,1,38,64,8,100,0,130,48,4,153,0,33,144,2,56]);if(6===e)return new Uint8Array([0,200,0,128,32,132,1,38,64,8,100,0,130,48,4,153,0,33,144,2,0,178,0,32,8,224]);break;default:if(1===e)return new Uint8Array([1,64,34,128,163,78,230,128,186,8,0,0,0,28,6,241,193,10,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,94]);if(2===e)return new Uint8Array([1,64,34,128,163,94,230,128,186,8,0,0,0,0,149,0,6,241,161,10,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,94]);if(3===e)return new Uint8Array([1,64,34,128,163,94,230,128,186,8,0,0,0,0,149,0,6,241,161,10,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,94])}return null},t}(),Y=V,z=Math.pow(2,32)-1,X=function(){function t(){E(this,t)}return t.init=function(){t.types={avc1:[],avcC:[],btrt:[],dinf:[],dref:[],esds:[],ftyp:[],hdlr:[],mdat:[],mdhd:[],mdia:[],mfhd:[],minf:[],moof:[],moov:[],mp4a:[],".mp3":[],mvex:[],mvhd:[],pasp:[],sdtp:[],stbl:[],stco:[],stsc:[],stsd:[],stsz:[],stts:[],tfdt:[],tfhd:[],traf:[],trak:[],trun:[],trex:[],tkhd:[],vmhd:[],smhd:[]};var e;for(e in t.types)t.types.hasOwnProperty(e)&&(t.types[e]=[e.charCodeAt(0),e.charCodeAt(1),e.charCodeAt(2),e.charCodeAt(3)]);var r=new Uint8Array([0,0,0,0,0,0,0,0,118,105,100,101,0,0,0,0,0,0,0,0,0,0,0,0,86,105,100,101,111,72,97,110,100,108,101,114,0]),i=new Uint8Array([0,0,0,0,0,0,0,0,115,111,117,110,0,0,0,0,0,0,0,0,0,0,0,0,83,111,117,110,100,72,97,110,100,108,101,114,0]);t.HDLR_TYPES={video:r,audio:i};var a=new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,12,117,114,108,32,0,0,0,1]),n=new Uint8Array([0,0,0,0,0,0,0,0]);t.STTS=t.STSC=t.STCO=n,t.STSZ=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0]),t.VMHD=new Uint8Array([0,0,0,1,0,0,0,0,0,0,0,0]),t.SMHD=new Uint8Array([0,0,0,0,0,0,0,0]),t.STSD=new Uint8Array([0,0,0,0,0,0,0,1]);var o=new Uint8Array([105,115,111,109]),s=new Uint8Array([97,118,99,49]),l=new Uint8Array([0,0,0,1]);t.FTYP=t.box(t.types.ftyp,o,l,o,s),t.DINF=t.box(t.types.dinf,t.box(t.types.dref,a))},t.box=function(t){for(var e,r=Array.prototype.slice.call(arguments,1),i=8,a=r.length,n=a;a--;)i+=r[a].byteLength;for(e=new Uint8Array(i),e[0]=i>>24&255,e[1]=i>>16&255,e[2]=i>>8&255,e[3]=255&i,e.set(t,4),a=0,i=8;a<n;a++)e.set(r[a],i),i+=r[a].byteLength;return e},t.hdlr=function(e){return t.box(t.types.hdlr,t.HDLR_TYPES[e])},t.mdat=function(e){return t.box(t.types.mdat,e)},t.mdhd=function(e,r){r*=e;var i=Math.floor(r/(z+1)),a=Math.floor(r%(z+1));return t.box(t.types.mdhd,new Uint8Array([1,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,3,e>>24&255,e>>16&255,e>>8&255,255&e,i>>24,i>>16&255,i>>8&255,255&i,a>>24,a>>16&255,a>>8&255,255&a,85,196,0,0]))},t.mdia=function(e){return t.box(t.types.mdia,t.mdhd(e.timescale,e.duration),t.hdlr(e.type),t.minf(e))},t.mfhd=function(e){return t.box(t.types.mfhd,new Uint8Array([0,0,0,0,e>>24,e>>16&255,e>>8&255,255&e]))},t.minf=function(e){return"audio"===e.type?t.box(t.types.minf,t.box(t.types.smhd,t.SMHD),t.DINF,t.stbl(e)):t.box(t.types.minf,t.box(t.types.vmhd,t.VMHD),t.DINF,t.stbl(e))},t.moof=function(e,r,i){return t.box(t.types.moof,t.mfhd(e),t.traf(i,r))},t.moov=function(e){for(var r=e.length,i=[];r--;)i[r]=t.trak(e[r]);return t.box.apply(null,[t.types.moov,t.mvhd(e[0].timescale,e[0].duration)].concat(i).concat(t.mvex(e)))},t.mvex=function(e){for(var r=e.length,i=[];r--;)i[r]=t.trex(e[r]);return t.box.apply(null,[t.types.mvex].concat(i))},t.mvhd=function(e,r){r*=e;var i=Math.floor(r/(z+1)),a=Math.floor(r%(z+1)),n=new Uint8Array([1,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,3,e>>24&255,e>>16&255,e>>8&255,255&e,i>>24,i>>16&255,i>>8&255,255&i,a>>24,a>>16&255,a>>8&255,255&a,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255]);return t.box(t.types.mvhd,n)},t.sdtp=function(e){var r,i,a=e.samples||[],n=new Uint8Array(4+a.length);for(i=0;i<a.length;i++)r=a[i].flags,n[i+4]=r.dependsOn<<4|r.isDependedOn<<2|r.hasRedundancy;return t.box(t.types.sdtp,n)},t.stbl=function(e){return t.box(t.types.stbl,t.stsd(e),t.box(t.types.stts,t.STTS),t.box(t.types.stsc,t.STSC),t.box(t.types.stsz,t.STSZ),t.box(t.types.stco,t.STCO))},t.avc1=function(e){var r,i,a,n=[],o=[];for(r=0;r<e.sps.length;r++)i=e.sps[r],a=i.byteLength,n.push(a>>>8&255),n.push(255&a),n=n.concat(Array.prototype.slice.call(i));for(r=0;r<e.pps.length;r++)i=e.pps[r],a=i.byteLength,o.push(a>>>8&255),o.push(255&a),o=o.concat(Array.prototype.slice.call(i));var s=t.box(t.types.avcC,new Uint8Array([1,n[3],n[4],n[5],255,224|e.sps.length].concat(n).concat([e.pps.length]).concat(o))),l=e.width,u=e.height,d=e.pixelRatio[0],h=e.pixelRatio[1];return t.box(t.types.avc1,new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,l>>8&255,255&l,u>>8&255,255&u,0,72,0,0,0,72,0,0,0,0,0,0,0,1,18,100,97,105,108,121,109,111,116,105,111,110,47,104,108,115,46,106,115,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,17,17]),s,t.box(t.types.btrt,new Uint8Array([0,28,156,128,0,45,198,192,0,45,198,192])),t.box(t.types.pasp,new Uint8Array([d>>24,d>>16&255,d>>8&255,255&d,h>>24,h>>16&255,h>>8&255,255&h])))},t.esds=function(t){var e=t.config.length;return new Uint8Array([0,0,0,0,3,23+e,0,1,0,4,15+e,64,21,0,0,0,0,0,0,0,0,0,0,0,5].concat([e]).concat(t.config).concat([6,1,2]))},t.mp4a=function(e){var r=e.samplerate;return t.box(t.types.mp4a,new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,e.channelCount,0,16,0,0,0,0,r>>8&255,255&r,0,0]),t.box(t.types.esds,t.esds(e)))},t.mp3=function(e){var r=e.samplerate;return t.box(t.types[".mp3"],new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,e.channelCount,0,16,0,0,0,0,r>>8&255,255&r,0,0]))},t.stsd=function(e){return"audio"===e.type?e.isAAC||"mp3"!==e.codec?t.box(t.types.stsd,t.STSD,t.mp4a(e)):t.box(t.types.stsd,t.STSD,t.mp3(e)):t.box(t.types.stsd,t.STSD,t.avc1(e))},t.tkhd=function(e){var r=e.id,i=e.duration*e.timescale,a=e.width,n=e.height,o=Math.floor(i/(z+1)),s=Math.floor(i%(z+1));return t.box(t.types.tkhd,new Uint8Array([1,0,0,7,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,3,r>>24&255,r>>16&255,r>>8&255,255&r,0,0,0,0,o>>24,o>>16&255,o>>8&255,255&o,s>>24,s>>16&255,s>>8&255,255&s,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,a>>8&255,255&a,0,0,n>>8&255,255&n,0,0]))},t.traf=function(e,r){var i=t.sdtp(e),a=e.id,n=Math.floor(r/(z+1)),o=Math.floor(r%(z+1));return t.box(t.types.traf,t.box(t.types.tfhd,new Uint8Array([0,0,0,0,a>>24,a>>16&255,a>>8&255,255&a])),t.box(t.types.tfdt,new Uint8Array([1,0,0,0,n>>24,n>>16&255,n>>8&255,255&n,o>>24,o>>16&255,o>>8&255,255&o])),t.trun(e,i.length+16+20+8+16+8+8),i)},t.trak=function(e){return e.duration=e.duration||4294967295,t.box(t.types.trak,t.tkhd(e),t.mdia(e))},t.trex=function(e){var r=e.id;return t.box(t.types.trex,new Uint8Array([0,0,0,0,r>>24,r>>16&255,r>>8&255,255&r,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1]))},t.trun=function(e,r){var i,a,n,o,s,l,u=e.samples||[],d=u.length,h=12+16*d,c=new Uint8Array(h);for(r+=8+h,c.set([0,0,15,1,d>>>24&255,d>>>16&255,d>>>8&255,255&d,r>>>24&255,r>>>16&255,r>>>8&255,255&r],0),i=0;i<d;i++)a=u[i],n=a.duration,o=a.size,s=a.flags,l=a.cts,c.set([n>>>24&255,n>>>16&255,n>>>8&255,255&n,o>>>24&255,o>>>16&255,o>>>8&255,255&o,s.isLeading<<2|s.dependsOn,s.isDependedOn<<6|s.hasRedundancy<<4|s.paddingValue<<1|s.isNonSync,61440&s.degradPrio,15&s.degradPrio,l>>>24&255,l>>>16&255,l>>>8&255,255&l],12+16*i);return t.box(t.types.trun,c)},t.initSegment=function(e){t.types||t.init();var r,i=t.moov(e);return r=new Uint8Array(t.FTYP.byteLength+i.byteLength),r.set(t.FTYP),r.set(i,t.FTYP.byteLength),r},t}(),q=X,Q=function(){function t(e,r,i,a){T(this,t),this.observer=e,this.config=r,this.typeSupported=i;var n=navigator.userAgent;this.isSafari=a&&a.indexOf("Apple")>-1&&n&&!n.match("CriOS"),this.ISGenerated=!1}return t.prototype.destroy=function(){},t.prototype.resetTimeStamp=function(t){this._initPTS=this._initDTS=t},t.prototype.resetInitSegment=function(){this.ISGenerated=!1},t.prototype.remux=function(t,e,r,i,a,n,o){if(this.ISGenerated||this.generateIS(t,e,a),this.ISGenerated){var s=t.samples.length,l=e.samples.length,u=a,d=a;if(s&&l){var h=(t.samples[0].dts-e.samples[0].dts)/e.inputTimeScale;u+=Math.max(0,h),d+=Math.max(0,-h)}if(s){t.timescale||(w.b.warn("regenerate InitSegment as audio detected"),this.generateIS(t,e,a));var c=this.remuxAudio(t,u,n,o);if(l){var f=void 0;c&&(f=c.endPTS-c.startPTS),e.timescale||(w.b.warn("regenerate InitSegment as video detected"),this.generateIS(t,e,a)),this.remuxVideo(e,d,n,f,o)}}else{var p=void 0;l&&(p=this.remuxVideo(e,d,n,o)),p&&t.codec&&this.remuxEmptyAudio(t,u,n,p)}}r.samples.length&&this.remuxID3(r,a),i.samples.length&&this.remuxText(i,a),this.observer.trigger(S.a.FRAG_PARSED)},t.prototype.generateIS=function(t,e,r){var i,a,n=this.observer,o=t.samples,s=e.samples,l=this.typeSupported,u="audio/mp4",d={},h={tracks:d},c=void 0===this._initPTS;if(c&&(i=a=1/0),t.config&&o.length&&(t.timescale=t.samplerate,w.b.log("audio sampling rate : "+t.samplerate),t.isAAC||(l.mpeg?(u="audio/mpeg",t.codec=""):l.mp3&&(t.codec="mp3")),d.audio={container:u,codec:t.codec,initSegment:!t.isAAC&&l.mpeg?new Uint8Array:q.initSegment([t]),metadata:{channelCount:t.channelCount}},c&&(i=a=o[0].pts-t.inputTimeScale*r)),e.sps&&e.pps&&s.length){var f=e.inputTimeScale;e.timescale=f,d.video={container:"video/mp4",codec:e.codec,initSegment:q.initSegment([e]),metadata:{width:e.width,height:e.height}},c&&(i=Math.min(i,s[0].pts-f*r),a=Math.min(a,s[0].dts-f*r),this.observer.trigger(S.a.INIT_PTS_FOUND,{initPTS:i}))}Object.keys(d).length?(n.trigger(S.a.FRAG_PARSING_INIT_SEGMENT,h),this.ISGenerated=!0,c&&(this._initPTS=i,this._initDTS=a)):n.trigger(S.a.ERROR,{type:L.b.MEDIA_ERROR,details:L.a.FRAG_PARSING_ERROR,fatal:!1,reason:"no audio/video samples found"})},t.prototype.remuxVideo=function(t,e,r,i,a){var n,o,s,l,u,d,h,c=8,f=t.timescale,p=t.samples,g=[],v=p.length,y=this._PTSNormalize,m=this._initDTS,b=this.nextAvcDts,E=this.isSafari;E&&(r|=p.length&&b&&(a&&Math.abs(e-b/f)<.1||Math.abs(p[0].pts-b-m)<f/5)),r||(b=e*f),p.forEach(function(t){t.pts=y(t.pts-m,b),t.dts=y(t.dts-m,b)}),p.sort(function(t,e){var r=t.dts-e.dts,i=t.pts-e.pts;return r||(i||t.id-e.id)});var T=p.reduce(function(t,e){return Math.max(Math.min(t,e.pts-e.dts),-18e3)},0);if(T<0){w.b.warn("PTS < DTS detected in video samples, shifting DTS by "+Math.round(T/90)+" ms to overcome this issue");for(var R=0;R<p.length;R++)p[R].dts+=T}var A=p[0];u=Math.max(A.dts,0),l=Math.max(A.pts,0);var _=Math.round((u-b)/90);r&&_&&(_>1?w.b.log("AVC:"+_+" ms hole between fragments detected,filling it"):_<-1&&w.b.log("AVC:"+-_+" ms overlapping between fragments detected"),u=b,p[0].dts=u,l=Math.max(l-_,b),p[0].pts=l,w.b.log("Video/PTS/DTS adjusted: "+Math.round(l/90)+"/"+Math.round(u/90)+",delta:"+_+" ms")),A=p[p.length-1],h=Math.max(A.dts,0),d=Math.max(A.pts,0,h),E&&(n=Math.round((h-u)/(p.length-1)));for(var D=0,I=0,k=0;k<v;k++){for(var O=p[k],C=O.units,P=C.length,x=0,F=0;F<P;F++)x+=C[F].data.length;I+=x,D+=P,O.length=x,O.dts=E?u+k*n:Math.max(O.dts,u),O.pts=Math.max(O.pts,O.dts)}var N=I+4*D+8;try{o=new Uint8Array(N)}catch(t){return void this.observer.trigger(S.a.ERROR,{type:L.b.MUX_ERROR,details:L.a.REMUX_ALLOC_ERROR,fatal:!1,bytes:N,reason:"fail allocating video mdat "+N})}var M=new DataView(o.buffer);M.setUint32(0,N),o.set(q.types.mdat,4);for(var U=0;U<v;U++){for(var B=p[U],G=B.units,j=0,H=void 0,K=0,W=G.length;K<W;K++){var V=G[K],Y=V.data,z=V.data.byteLength;M.setUint32(c,z),c+=4,o.set(Y,c),c+=z,j+=4+z}if(E)H=Math.max(0,n*Math.round((B.pts-B.dts)/n));else{if(U<v-1)n=p[U+1].dts-B.dts;else{var X=this.config,Q=B.dts-p[U>0?U-1:U].dts;if(X.stretchShortVideoTrack){var J=X.maxBufferHole,$=X.maxSeekHole,Z=Math.floor(Math.min(J,$)*f),tt=(i?l+i*f:this.nextAudioPts)-B.pts;tt>Z?(n=tt-Q,n<0&&(n=Q),w.b.log("It is approximately "+tt/90+" ms to the next segment; using duration "+n/90+" ms for the last video frame.")):n=Q}else n=Q}H=Math.round(B.pts-B.dts)}g.push({size:j,duration:n,cts:H,flags:{isLeading:0,isDependedOn:0,hasRedundancy:0,degradPrio:0,dependsOn:B.key?2:1,isNonSync:B.key?0:1}})}this.nextAvcDts=h+n;var et=t.dropped;if(t.len=0,t.nbNalu=0,t.dropped=0,g.length&&navigator.userAgent.toLowerCase().indexOf("chrome")>-1){var rt=g[0].flags;rt.dependsOn=2,rt.isNonSync=0}t.samples=g,s=q.moof(t.sequenceNumber++,u,t),t.samples=[];var it={data1:s,data2:o,startPTS:l/f,endPTS:(d+n)/f,startDTS:u/f,endDTS:this.nextAvcDts/f,type:"video",nb:g.length,dropped:et};return this.observer.trigger(S.a.FRAG_PARSING_DATA,it),it},t.prototype.remuxAudio=function(t,e,r,i){var a,n,o,s,l,u,d,h=t.inputTimeScale,c=t.timescale,f=h/c,p=t.isAAC?1024:1152,g=p*f,v=this._PTSNormalize,y=this._initDTS,m=!t.isAAC&&this.typeSupported.mpeg,b=t.samples,E=[],T=this.nextAudioPts;if(r|=b.length&&T&&(i&&Math.abs(e-T/h)<.1||Math.abs(b[0].pts-T-y)<20*g),b.forEach(function(t){t.pts=t.dts=v(t.pts-y,e*h)}),b=b.filter(function(t){return t.pts>=0}),0!==b.length){if(r||(T=i?e*h:b[0].pts),t.isAAC)for(var R=this.config.maxAudioFramesDrift,A=0,_=T;A<b.length;){var D,I=b[A],k=I.pts;D=k-_;var O=Math.abs(1e3*D/h);if(D<=-R*g)w.b.warn("Dropping 1 audio frame @ "+(_/h).toFixed(3)+"s due to "+Math.round(O)+" ms overlap."),b.splice(A,1),t.len-=I.unit.length;else if(D>=R*g&&O<1e4&&_){var C=Math.round(D/g);w.b.warn("Injecting "+C+" audio frame @ "+(_/h).toFixed(3)+"s due to "+Math.round(1e3*D/h)+" ms gap.");for(var P=0;P<C;P++){var x=Math.max(_,0);o=Y.getSilentFrame(t.manifestCodec||t.codec,t.channelCount),o||(w.b.log("Unable to get silent frame for given audio codec; duplicating last frame instead."),o=I.unit.subarray()),b.splice(A,0,{unit:o,pts:x,dts:x}),t.len+=o.length,_+=g,A++}I.pts=I.dts=_,_+=g,A++}else Math.abs(D),I.pts=I.dts=_,_+=g,A++}for(var F=0,N=b.length;F<N;F++){var M=b[F],U=M.unit,B=M.pts;if(void 0!==d)n.duration=Math.round((B-d)/f);else{var G=Math.round(1e3*(B-T)/h),j=0;if(r&&t.isAAC&&G){if(G>0&&G<1e4)j=Math.round((B-T)/g),w.b.log(G+" ms hole between AAC samples detected,filling it"),j>0&&(o=Y.getSilentFrame(t.manifestCodec||t.codec,t.channelCount),o||(o=U.subarray()),t.len+=j*o.length);else if(G<-12){w.b.log("drop overlapping AAC sample, expected/parsed/delta:"+(T/h).toFixed(3)+"s/"+(B/h).toFixed(3)+"s/"+-G+"ms"),t.len-=U.byteLength;continue}B=T}if(u=B,!(t.len>0))return;var H=m?t.len:t.len+8;a=m?0:8;try{s=new Uint8Array(H)}catch(t){return void this.observer.trigger(S.a.ERROR,{type:L.b.MUX_ERROR,details:L.a.REMUX_ALLOC_ERROR,fatal:!1,bytes:H,reason:"fail allocating audio mdat "+H})}if(!m){new DataView(s.buffer).setUint32(0,H),s.set(q.types.mdat,4)}for(var K=0;K<j;K++)o=Y.getSilentFrame(t.manifestCodec||t.codec,t.channelCount),o||(w.b.log("Unable to get silent frame for given audio codec; duplicating this frame instead."),o=U.subarray()),s.set(o,a),a+=o.byteLength,n={size:o.byteLength,cts:0,duration:1024,flags:{isLeading:0,isDependedOn:0,hasRedundancy:0,degradPrio:0,dependsOn:1}},E.push(n)}s.set(U,a);var W=U.byteLength;a+=W,n={size:W,cts:0,duration:0,flags:{isLeading:0,isDependedOn:0,hasRedundancy:0,degradPrio:0,dependsOn:1}},E.push(n),d=B}var V=0,z=E.length;if(z>=2&&(V=E[z-2].duration,n.duration=V),z){this.nextAudioPts=T=d+f*V,t.len=0,t.samples=E,l=m?new Uint8Array:q.moof(t.sequenceNumber++,u/f,t),t.samples=[];var X=u/h,Q=T/h,J={data1:l,data2:s,startPTS:X,endPTS:Q,startDTS:X,endDTS:Q,type:"audio",nb:z};return this.observer.trigger(S.a.FRAG_PARSING_DATA,J),J}return null}},t.prototype.remuxEmptyAudio=function(t,e,r,i){var a=t.inputTimeScale,n=t.samplerate?t.samplerate:a,o=a/n,s=this.nextAudioPts,l=(void 0!==s?s:i.startDTS*a)+this._initDTS,u=i.endDTS*a+this._initDTS,d=1024*o,h=Math.ceil((u-l)/d),c=Y.getSilentFrame(t.manifestCodec||t.codec,t.channelCount);if(w.b.warn("remux empty Audio"),!c)return void w.b.trace("Unable to remuxEmptyAudio since we were unable to get a silent frame for given audio codec!");for(var f=[],p=0;p<h;p++){var g=l+p*d;f.push({unit:c,pts:g,dts:g}),t.len+=c.length}t.samples=f,this.remuxAudio(t,e,r)},t.prototype.remuxID3=function(t,e){var r,i=t.samples.length,a=t.inputTimeScale,n=this._initPTS,o=this._initDTS;if(i){for(var s=0;s<i;s++)r=t.samples[s],r.pts=(r.pts-n)/a,r.dts=(r.dts-o)/a;this.observer.trigger(S.a.FRAG_PARSING_METADATA,{samples:t.samples})}t.samples=[],e=e},t.prototype.remuxText=function(t,e){t.samples.sort(function(t,e){return t.pts-e.pts});var r,i=t.samples.length,a=t.inputTimeScale,n=this._initPTS;if(i){for(var o=0;o<i;o++)r=t.samples[o],r.pts=(r.pts-n)/a;this.observer.trigger(S.a.FRAG_PARSING_USERDATA,{samples:t.samples})}t.samples=[],e=e},t.prototype._PTSNormalize=function(t,e){var r;if(void 0===e)return t;for(r=e<t?-8589934592:8589934592;Math.abs(t-e)>4294967296;)t+=r;return t},t}(),J=Q,$=function(){function t(e){R(this,t),this.observer=e}return t.prototype.destroy=function(){},t.prototype.resetTimeStamp=function(){},t.prototype.resetInitSegment=function(){},t.prototype.remux=function(t,e,r,i,a,n,o,s){var l=this.observer,u="";t&&(u+="audio"),e&&(u+="video"),l.trigger(S.a.FRAG_PARSING_DATA,{data1:s,startPTS:a,startDTS:a,type:u,nb:1,dropped:0}),l.trigger(S.a.FRAG_PARSED)},t}(),Z=$,tt=function(){function t(e,r,i,a){A(this,t),this.observer=e,this.typeSupported=r,this.config=i,this.vendor=a}return t.prototype.destroy=function(){var t=this.demuxer;t&&t.destroy()},t.prototype.push=function(t,e,r,i,a,n,o,s,l,u,d,h){if(t.byteLength>0&&null!=e&&null!=e.key&&"AES-128"===e.method){var c=this.decrypter;null==c&&(c=this.decrypter=new _.a(this.observer,this.config));var f,p=this;try{f=performance.now()}catch(t){f=Date.now()}c.decrypt(t,e.key.buffer,e.iv.buffer,function(t){var c;try{c=performance.now()}catch(t){c=Date.now()}p.observer.trigger(S.a.FRAG_DECRYPTED,{stats:{tstart:f,tdecrypt:c}}),p.pushDecrypted(new Uint8Array(t),e,new Uint8Array(r),i,a,n,o,s,l,u,d,h)})}else this.pushDecrypted(new Uint8Array(t),e,new Uint8Array(r),i,a,n,o,s,l,u,d,h)},t.prototype.pushDecrypted=function(t,e,r,i,a,n,o,s,l,u,d,h){var c=this.demuxer;if(!c||o&&!this.probe(t)){for(var f=this.observer,p=this.typeSupported,g=this.config,v=[{demux:H,remux:J},{demux:P,remux:Z},{demux:k,remux:J},{demux:W,remux:J}],y=0,m=v.length;y<m;y++){var b=v[y],E=b.demux.probe;if(E(t)){var T=this.remuxer=new b.remux(f,g,p,this.vendor);c=new b.demux(f,T,g,p),this.probe=E;break}}if(!c)return void f.trigger(S.a.ERROR,{type:L.b.MEDIA_ERROR,details:L.a.FRAG_PARSING_ERROR,fatal:!0,reason:"no demux matching with content found"});this.demuxer=c}var R=this.remuxer;(o||s)&&(c.resetInitSegment(r,i,a,u),R.resetInitSegment()),o&&(c.resetTimeStamp(h),R.resetTimeStamp(h)),"function"==typeof c.setDecryptData&&c.setDecryptData(e),c.append(t,n,l,d)},t}();e.a=tt},function(t,e,r){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){var r=jt[e];return!!r&&!0===r[t.slice(0,4)]}function o(t,e){return MediaSource.isTypeSupported((e||"video")+'/mp4;codecs="'+t+'"')}function s(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function l(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function d(t,e){if(!t)return null;for(var r=null,i=0;i<t.length;i++){var a=t[i];a.id===e&&(r=a)}return r}function h(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function c(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function f(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function p(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function g(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function v(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function y(){if("undefined"!=typeof window)return window.MediaSource||window.WebKitMediaSource}function m(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function b(t,e,r){var i=t[e],a=t[r],n=a.startPTS;isNaN(n)?a.start=r>e?i.start+i.duration:Math.max(i.start-a.duration,0):r>e?(i.duration=n-i.start,i.duration<0&&Pt.b.warn("negative duration computed for frag "+i.sn+",level "+i.level+", there should be some duration drift between playlist and fragment!")):(a.duration=i.start-n,a.duration<0&&Pt.b.warn("negative duration computed for frag "+a.sn+",level "+a.level+", there should be some duration drift between playlist and fragment!"))}function E(t,e,r,i,a,n){var o=r;if(!isNaN(e.startPTS)){var s=Math.abs(e.startPTS-r);isNaN(e.deltaPTS)?e.deltaPTS=s:e.deltaPTS=Math.max(s,e.deltaPTS),o=Math.max(r,e.startPTS),r=Math.min(r,e.startPTS),i=Math.max(i,e.endPTS),a=Math.min(a,e.startDTS),n=Math.max(n,e.endDTS)}var l=r-e.start;e.start=e.startPTS=r,e.maxStartPTS=o,e.endPTS=i,e.startDTS=a,e.endDTS=n,e.duration=i-r;var u=e.sn;if(!t||u<t.startSN||u>t.endSN)return 0;var d,h,c;for(d=u-t.startSN,h=t.fragments,h[d]=e,c=d;c>0;c--)b(h,c,c-1);for(c=d;c<h.length-1;c++)b(h,c,c+1);return t.PTSKnown=!0,l}function T(t,e){var r,i=Math.max(t.startSN,e.startSN)-e.startSN,a=Math.min(t.endSN,e.endSN)-e.startSN,n=e.startSN-t.startSN,o=t.fragments,s=e.fragments,l=0;if(a<i)return void(e.PTSKnown=!1);for(var u=i;u<=a;u++){var d=o[n+u],h=s[u];h&&d&&(l=d.cc-h.cc,isNaN(d.startPTS)||(h.start=h.startPTS=d.startPTS,h.endPTS=d.endPTS,h.duration=d.duration,h.backtracked=d.backtracked,h.dropped=d.dropped,r=h))}if(l)for(Pt.b.log("discontinuity sliding from playlist, take drift into account"),u=0;u<s.length;u++)s[u].cc+=l;if(r)E(e,r,r.startPTS,r.endPTS,r.startDTS,r.endDTS);else if(n>=0&&n<o.length){var c=o[n].start;for(u=0;u<s.length;u++)s[u].start+=c}e.PTSKnown=t.PTSKnown}function R(t,e){for(var r=null,i=0;i<t.length;i+=1){var a=t[i];if(a&&a.cc===e){r=a;break}}return r}function A(t,e){return re.search(t,function(t){return t.cc<e?1:t.cc>e?-1:0})}function S(t,e,r){var i=!1;return e&&e.details&&r&&(r.endCC>r.startCC||t&&t.cc<r.startCC)&&(i=!0),i}function L(t,e){var r=t.fragments,i=e.fragments;if(!i.length||!r.length)return void Pt.b.log("No fragments to align");var a=R(r,i[0].cc);return!a||a&&!a.startPTS?void Pt.b.log("No frag in previous level to align on"):a}function _(t,e){e.fragments.forEach(function(e){if(e){var r=e.start+t;e.start=e.startPTS=r,e.endPTS=r+e.duration}}),e.PTSKnown=!0}function w(t,e,r){if(S(t,e,r)){var i=L(e.details,r);i&&(Pt.b.log("Adjusting PTS using last level due to CC increase within current level"),_(i.start,r))}if(!1===r.PTSKnown&&e&&e.details){var a=e.details.programDateTime,n=r.programDateTime,o=(n-a)/1e3+e.details.fragments[0].start;isNaN(o)||(Pt.b.log("adjusting PTS using programDateTime delta, sliding:"+o.toFixed(3)),_(o,r))}}function D(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function I(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function k(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function O(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function C(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function P(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function x(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function F(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function N(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function M(){var t=y(),e=window.SourceBuffer||window.WebKitSourceBuffer,r=t&&"function"==typeof t.isTypeSupported&&t.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'),i=!e||e.prototype&&"function"==typeof e.prototype.appendBuffer&&"function"==typeof e.prototype.remove;return!!r&&!!i}function U(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function B(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function G(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function j(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function H(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function K(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function W(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function V(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function Y(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function z(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function X(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function q(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Q(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function J(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function $(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Z(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function tt(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function et(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function rt(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function it(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function at(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function nt(){this.window=window,this.state="INITIAL",this.buffer="",this.decoder=new Qe,this.regionList=[]}function ot(t){function e(t,e,r,i){return 3600*(0|t)+60*(0|e)+(0|r)+(0|i)/1e3}var r=t.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);return r?r[3]?e(r[1],r[2],r[3].replace(":",""),r[4]):r[1]>59?e(r[1],r[2],0,r[4]):e(0,r[1],r[2],r[4]):null}function st(){this.values=Object.create(null)}function lt(t,e,r,i){var a=i?t.split(i):[t];for(var n in a)if("string"==typeof a[n]){var o=a[n].split(r);if(2===o.length){var s=o[0],l=o[1];e(s,l)}}}function ut(t,e,r){function i(){var e=ot(t);if(null===e)throw new Error("Malformed timestamp: "+n);return t=t.replace(/^[^\sa-zA-Z-]+/,""),e}function a(){t=t.replace(/^\s+/,"")}var n=t;if(a(),e.startTime=i(),a(),"--\x3e"!==t.substr(0,3))throw new Error("Malformed time stamp (time stamps must be separated by '--\x3e'): "+n);t=t.substr(3),a(),e.endTime=i(),a(),function(t,e){var i=new st;lt(t,function(t,e){switch(t){case"region":for(var a=r.length-1;a>=0;a--)if(r[a].id===e){i.set(t,r[a].region);break}break;case"vertical":i.alt(t,e,["rl","lr"]);break;case"line":var n=e.split(","),o=n[0];i.integer(t,o),i.percent(t,o)&&i.set("snapToLines",!1),i.alt(t,o,["auto"]),2===n.length&&i.alt("lineAlign",n[1],["start",$e,"end"]);break;case"position":n=e.split(","),i.percent(t,n[0]),2===n.length&&i.alt("positionAlign",n[1],["start",$e,"end","line-left","line-right","auto"]);break;case"size":i.percent(t,e);break;case"align":i.alt(t,e,["start",$e,"end","left","right"])}},/:/,/\s/),e.region=i.get("region",null),e.vertical=i.get("vertical","");var a=i.get("line","auto");"auto"===a&&-1===Je.line&&(a=-1),e.line=a,e.lineAlign=i.get("lineAlign","start"),e.snapToLines=i.get("snapToLines",!0),e.size=i.get("size",100),e.align=i.get("align",$e);var n=i.get("position","auto");"auto"===n&&50===Je.position&&(n="start"===e.align||"left"===e.align?0:"end"===e.align||"right"===e.align?100:50),e.position=n}(t,e)}function dt(t){return t.replace(/<br(?: \/)?>/gi,"\n")}function ht(t,e,r,i){for(var a,n,o,s,l,u=window.VTTCue||window.TextTrackCue,d=0;d<i.rows.length;d++)if(a=i.rows[d],o=!0,s=0,l="",!a.isEmpty()){for(var h=0;h<a.chars.length;h++)a.chars[h].uchar.match(/\s/)&&o?s++:(l+=a.chars[h].uchar,o=!1);a.cueStartTime=e,e===r&&(r+=1e-4),n=new u(e,r,dt(l.trim())),s>=16?s--:s++,navigator.userAgent.match(/Firefox\//)?n.line=d+1:n.line=d>7?d-2:d+1,n.align="left",n.position=Math.max(0,Math.min(100,s/32*100+(navigator.userAgent.match(/Firefox\//)?50:0))),t.addCue(n)}}function ct(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function ft(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function pt(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function gt(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function vt(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function yt(t){if(t&&t.cues)for(;t.cues.length>0;)t.removeCue(t.cues[0])}function mt(t,e){return t&&t.label===e.name&&!(t.textTrack1||t.textTrack2)}function bt(t,e,r,i){return Math.min(e,i)-Math.max(t,r)}function Et(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Tt(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function Rt(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function At(t){for(var e=[],r=0;r<t.length;r++)"subtitles"===t[r].kind&&e.push(t[r]);return e}function St(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Lt(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function _t(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function wt(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var Dt={};r.d(Dt,"newCue",function(){return ht});var It=r(6),kt=r.n(It),Ot=r(1),Ct=r(2),Pt=r(0),xt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ft=function(){function t(e){i(this,t),this.hls=e,this.onEvent=this.onEvent.bind(this);for(var r=arguments.length,a=Array(r>1?r-1:0),n=1;n<r;n++)a[n-1]=arguments[n];this.handledEvents=a,this.useGenericHandler=!0,this.registerListeners()}return t.prototype.destroy=function(){this.unregisterListeners()},t.prototype.isEventHandler=function(){return"object"===xt(this.handledEvents)&&this.handledEvents.length&&"function"==typeof this.onEvent},t.prototype.registerListeners=function(){this.isEventHandler()&&this.handledEvents.forEach(function(t){if("hlsEventGeneric"===t)throw new Error("Forbidden event name: "+t);this.hls.on(t,this.onEvent)},this)},t.prototype.unregisterListeners=function(){this.isEventHandler()&&this.handledEvents.forEach(function(t){this.hls.off(t,this.onEvent)},this)},t.prototype.onEvent=function(t,e){this.onEventGeneric(t,e)},t.prototype.onEventGeneric=function(t,e){var r=function(t,e){var r="on"+t.replace("hls","");if("function"!=typeof this[r])throw new Error("Event "+t+" has no generic handler in this "+this.constructor.name+" class (tried "+r+")");return this[r].bind(this,e)};try{r.call(this,t,e).call()}catch(e){Pt.b.error("internal error happened while processing "+t+":"+e.message),this.hls.trigger(Ot.a.ERROR,{type:Ct.b.OTHER_ERROR,details:Ct.a.INTERNAL_EXCEPTION,fatal:!1,event:t,err:e})}},t}(),Nt=Ft,Mt=/^(\d+)x(\d+)$/,Ut=/\s*(.+?)\s*=((?:\".*?\")|.*?)(?:,|$)/g,Bt=function(){function t(e){a(this,t),"string"==typeof e&&(e=t.parseAttrList(e));for(var r in e)e.hasOwnProperty(r)&&(this[r]=e[r])}return t.prototype.decimalInteger=function(t){var e=parseInt(this[t],10);return e>Number.MAX_SAFE_INTEGER?1/0:e},t.prototype.hexadecimalInteger=function(t){if(this[t]){var e=(this[t]||"0x").slice(2);e=(1&e.length?"0":"")+e;for(var r=new Uint8Array(e.length/2),i=0;i<e.length/2;i++)r[i]=parseInt(e.slice(2*i,2*i+2),16);return r}return null},t.prototype.hexadecimalIntegerAsNumber=function(t){var e=parseInt(this[t],16);return e>Number.MAX_SAFE_INTEGER?1/0:e},t.prototype.decimalFloatingPoint=function(t){return parseFloat(this[t])},t.prototype.enumeratedString=function(t){return this[t]},t.prototype.decimalResolution=function(t){var e=Mt.exec(this[t]);if(null!==e)return{width:parseInt(e[1],10),height:parseInt(e[2],10)}},t.parseAttrList=function(t){var e,r={};for(Ut.lastIndex=0;null!==(e=Ut.exec(t));){var i=e[2];0===i.indexOf('"')&&i.lastIndexOf('"')===i.length-1&&(i=i.slice(1,-1)),r[e[1]]=i}return r},t}(),Gt=Bt,jt={audio:{a3ds:!0,"ac-3":!0,"ac-4":!0,alac:!0,alaw:!0,dra1:!0,"dts+":!0,"dts-":!0,dtsc:!0,dtse:!0,dtsh:!0,"ec-3":!0,enca:!0,g719:!0,g726:!0,m4ae:!0,mha1:!0,mha2:!0,mhm1:!0,mhm2:!0,mlpa:!0,mp4a:!0,"raw ":!0,Opus:!0,samr:!0,sawb:!0,sawp:!0,sevc:!0,sqcp:!0,ssmv:!0,twos:!0,ulaw:!0},video:{avc1:!0,avc2:!0,avc3:!0,avc4:!0,avcp:!0,drac:!0,dvav:!0,dvhe:!0,encv:!0,hev1:!0,hvc1:!0,mjp2:!0,mp4v:!0,mvc1:!0,mvc2:!0,mvc3:!0,mvc4:!0,resv:!0,rv60:!0,s263:!0,svc1:!0,svc2:!0,"vc-1":!0,vp08:!0,vp09:!0}},Ht=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),Kt=/#EXT-X-STREAM-INF:([^\n\r]*)[\r\n]+([^\r\n]+)/g,Wt=/#EXT-X-MEDIA:(.*)/g,Vt=new RegExp([/#EXTINF:\s*(\d*(?:\.\d+)?)(?:,(.*)\s+)?/.source,/|(?!#)(\S+)/.source,/|#EXT-X-BYTERANGE:*(.+)/.source,/|#EXT-X-PROGRAM-DATE-TIME:(.+)/.source,/|#.*/.source].join(""),"g"),Yt=/(?:(?:#(EXTM3U))|(?:#EXT-X-(PLAYLIST-TYPE):(.+))|(?:#EXT-X-(MEDIA-SEQUENCE): *(\d+))|(?:#EXT-X-(TARGETDURATION): *(\d+))|(?:#EXT-X-(KEY):(.+))|(?:#EXT-X-(START):(.+))|(?:#EXT-X-(ENDLIST))|(?:#EXT-X-(DISCONTINUITY-SEQ)UENCE:(\d+))|(?:#EXT-X-(DIS)CONTINUITY))|(?:#EXT-X-(VERSION):(\d+))|(?:#EXT-X-(MAP):(.+))|(?:(#)(.*):(.*))|(?:(#)(.*))(?:.*)\r?\n?/,zt=function(){function t(){u(this,t),this.method=null,this.key=null,this.iv=null,this._uri=null}return Ht(t,[{key:"uri",get:function(){return!this._uri&&this.reluri&&(this._uri=kt.a.buildAbsoluteURL(this.baseuri,this.reluri,{alwaysNormalize:!0})),this._uri}}]),t}(),Xt=function(){function t(){u(this,t),this._url=null,this._byteRange=null,this._decryptdata=null,this.tagList=[]}return t.prototype.createInitializationVector=function(t){for(var e=new Uint8Array(16),r=12;r<16;r++)e[r]=t>>8*(15-r)&255;return e},t.prototype.fragmentDecryptdataFromLevelkey=function(t,e){var r=t;return t&&t.method&&t.uri&&!t.iv&&(r=new zt,r.method=t.method,r.baseuri=t.baseuri,r.reluri=t.reluri,r.iv=this.createInitializationVector(e)),r},t.prototype.cloneObj=function(t){return JSON.parse(JSON.stringify(t))},Ht(t,[{key:"url",get:function(){return!this._url&&this.relurl&&(this._url=kt.a.buildAbsoluteURL(this.baseurl,this.relurl,{alwaysNormalize:!0})),this._url},set:function(t){this._url=t}},{key:"programDateTime",get:function(){return!this._programDateTime&&this.rawProgramDateTime&&(this._programDateTime=new Date(Date.parse(this.rawProgramDateTime))),this._programDateTime}},{key:"byteRange",get:function(){if(!this._byteRange){var t=this._byteRange=[];if(this.rawByteRange){var e=this.rawByteRange.split("@",2);if(1===e.length){var r=this.lastByteRangeEndOffset;t[0]=r||0}else t[0]=parseInt(e[1]);t[1]=parseInt(e[0])+t[0]}}return this._byteRange}},{key:"byteRangeStartOffset",get:function(){return this.byteRange[0]}},{key:"byteRangeEndOffset",get:function(){return this.byteRange[1]}},{key:"decryptdata",get:function(){return this._decryptdata||(this._decryptdata=this.fragmentDecryptdataFromLevelkey(this.levelkey,this.sn)),this._decryptdata}}]),t}(),qt=function(t){function e(r){u(this,e);var i=s(this,t.call(this,r,Ot.a.MANIFEST_LOADING,Ot.a.LEVEL_LOADING,Ot.a.AUDIO_TRACK_LOADING,Ot.a.SUBTITLE_TRACK_LOADING));return i.loaders={},i}return l(e,t),e.prototype.destroy=function(){for(var t in this.loaders){var e=this.loaders[t];e&&e.destroy()}this.loaders={},Nt.prototype.destroy.call(this)},e.prototype.onManifestLoading=function(t){this.load(t.url,{type:"manifest"})},e.prototype.onLevelLoading=function(t){this.load(t.url,{type:"level",level:t.level,id:t.id})},e.prototype.onAudioTrackLoading=function(t){this.load(t.url,{type:"audioTrack",id:t.id})},e.prototype.onSubtitleTrackLoading=function(t){this.load(t.url,{type:"subtitleTrack",id:t.id})},e.prototype.load=function(t,e){var r=this.loaders[e.type];if(void 0!==r){var i=r.context;if(i&&i.url===t)return void Pt.b.trace("playlist request ongoing");Pt.b.warn("abort previous loader for type:"+e.type),r.abort()}var a=this.hls.config,n=void 0,o=void 0,s=void 0,l=void 0;"manifest"===e.type?(n=a.manifestLoadingMaxRetry,o=a.manifestLoadingTimeOut,s=a.manifestLoadingRetryDelay,l=a.manifestLoadingMaxRetryTimeout):"level"===e.type?(n=0,o=a.levelLoadingTimeOut):(n=a.levelLoadingMaxRetry,o=a.levelLoadingTimeOut,s=a.levelLoadingRetryDelay,l=a.levelLoadingMaxRetryTimeout,Pt.b.log("loading playlist for "+e.type+" "+(e.level||e.id))),r=this.loaders[e.type]=e.loader=void 0!==a.pLoader?new a.pLoader(a):new a.loader(a),e.url=t,e.responseType="";var u=void 0,d=void 0;u={timeout:o,maxRetry:n,retryDelay:s,maxRetryDelay:l},d={onSuccess:this.loadsuccess.bind(this),onError:this.loaderror.bind(this),onTimeout:this.loadtimeout.bind(this)},r.load(e,u,d)},e.prototype.resolve=function(t,e){return kt.a.buildAbsoluteURL(e,t,{alwaysNormalize:!0})},e.prototype.parseMasterPlaylist=function(t,e){var r=[],i=void 0;for(Kt.lastIndex=0;null!=(i=Kt.exec(t));){var a={},o=a.attrs=new Gt(i[1]);a.url=this.resolve(i[2],e);var s=o.decimalResolution("RESOLUTION");s&&(a.width=s.width,a.height=s.height),a.bitrate=o.decimalInteger("AVERAGE-BANDWIDTH")||o.decimalInteger("BANDWIDTH"),a.name=o.NAME,function(t,e){["video","audio"].forEach(function(r){var i=t.filter(function(t){return n(t,r)});if(i.length){var a=i.filter(function(t){return 0===t.lastIndexOf("avc1",0)||0===t.lastIndexOf("mp4a",0)});e[r+"Codec"]=a.length>0?a[0]:i[0],t=t.filter(function(t){return-1===i.indexOf(t)})}}),e.unknownCodecs=t}([].concat((o.CODECS||"").split(/[ ,]+/)),a),a.videoCodec&&-1!==a.videoCodec.indexOf("avc1")&&(a.videoCodec=this.avc1toavcoti(a.videoCodec)),r.push(a)}return r},e.prototype.parseMasterPlaylistMedia=function(t,e,r){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],a=void 0,n=[],o=0;for(Wt.lastIndex=0;null!==(a=Wt.exec(t));){var s={},l=new Gt(a[1]);if(l.TYPE===r){if(s.groupId=l["GROUP-ID"],s.name=l.NAME,s.type=r,s.default="YES"===l.DEFAULT,s.autoselect="YES"===l.AUTOSELECT,s.forced="YES"===l.FORCED,l.URI&&(s.url=this.resolve(l.URI,e)),s.lang=l.LANGUAGE,s.name||(s.name=s.lang),i.length){var u=d(i,s.groupId);s.audioCodec=u?u.codec:i[0].codec}s.id=o++,n.push(s)}}return n},e.prototype.avc1toavcoti=function(t){var e,r=t.split(".");return r.length>2?(e=r.shift()+".",e+=parseInt(r.shift()).toString(16),e+=("000"+parseInt(r.shift()).toString(16)).substr(-4)):e=t,e},e.prototype.parseLevelPlaylist=function(t,e,r,i){var a,n,o=0,s=0,l={type:null,version:null,url:e,fragments:[],live:!0,startSN:0},u=new zt,d=0,h=null,c=new Xt;for(Vt.lastIndex=0;null!==(a=Vt.exec(t));){var f=a[1];if(f){c.duration=parseFloat(f);var p=(" "+a[2]).slice(1);c.title=p||null,c.tagList.push(p?["INF",f,p]:["INF",f])}else if(a[3]){if(!isNaN(c.duration)){var g=o++;c.type=i,c.start=s,c.levelkey=u,c.sn=g,c.level=r,c.cc=d,c.baseurl=e,c.relurl=(" "+a[3]).slice(1),l.fragments.push(c),h=c,s+=c.duration,c=new Xt}}else if(a[4]){if(c.rawByteRange=(" "+a[4]).slice(1),h){var v=h.byteRangeEndOffset;v&&(c.lastByteRangeEndOffset=v)}}else if(a[5])c.rawProgramDateTime=(" "+a[5]).slice(1),c.tagList.push(["PROGRAM-DATE-TIME",c.rawProgramDateTime]),void 0===l.programDateTime&&(l.programDateTime=new Date(new Date(Date.parse(a[5]))-1e3*s));else{for(a=a[0].match(Yt),n=1;n<a.length&&void 0===a[n];n++);var y=(" "+a[n+1]).slice(1),m=(" "+a[n+2]).slice(1);switch(a[n]){case"#":c.tagList.push(m?[y,m]:[y]);break;case"PLAYLIST-TYPE":l.type=y.toUpperCase();break;case"MEDIA-SEQUENCE":o=l.startSN=parseInt(y);break;case"TARGETDURATION":l.targetduration=parseFloat(y);break;case"VERSION":l.version=parseInt(y);break;case"EXTM3U":break;case"ENDLIST":l.live=!1;break;case"DIS":d++,c.tagList.push(["DIS"]);break;case"DISCONTINUITY-SEQ":d=parseInt(y);break;case"KEY":var b=y,E=new Gt(b),T=E.enumeratedString("METHOD"),R=E.URI,A=E.hexadecimalInteger("IV");T&&(u=new zt,R&&["AES-128","SAMPLE-AES"].indexOf(T)>=0&&(u.method=T,u.baseuri=e,u.reluri=R,u.key=null,u.iv=A));break;case"START":var S=y,L=new Gt(S),_=L.decimalFloatingPoint("TIME-OFFSET");isNaN(_)||(l.startTimeOffset=_);break;case"MAP":var w=new Gt(y);c.relurl=w.URI,c.rawByteRange=w.BYTERANGE,c.baseurl=e,c.level=r,c.type=i,c.sn="initSegment",l.initSegment=c,c=new Xt;break;default:Pt.b.warn("line parsed but not handled: "+a)}}}return c=h,c&&!c.relurl&&(l.fragments.pop(),s-=c.duration),l.totalduration=s,l.averagetargetduration=s/l.fragments.length,l.endSN=o-1,l.startCC=l.fragments[0]?l.fragments[0].cc:0,l.endCC=d,l},e.prototype.loadsuccess=function(t,e,r){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,a=t.data,n=t.url,o=r.type,s=r.id,l=r.level,u=this.hls;if(this.loaders[o]=void 0,void 0!==n&&0!==n.indexOf("data:")||(n=r.url),e.tload=performance.now(),0===a.indexOf("#EXTM3U"))if(a.indexOf("#EXTINF:")>0){var d="audioTrack"!==o&&"subtitleTrack"!==o,h=isNaN(l)?isNaN(s)?0:s:l,c=this.parseLevelPlaylist(a,n,h,"audioTrack"===o?"audio":"subtitleTrack"===o?"subtitle":"main");c.tload=e.tload,"manifest"===o&&u.trigger(Ot.a.MANIFEST_LOADED,{levels:[{url:n,details:c}],audioTracks:[],url:n,stats:e,networkDetails:i}),e.tparsed=performance.now(),c.targetduration?d?u.trigger(Ot.a.LEVEL_LOADED,{details:c,level:l||0,id:s||0,stats:e,networkDetails:i}):"audioTrack"===o?u.trigger(Ot.a.AUDIO_TRACK_LOADED,{details:c,id:s,stats:e,networkDetails:i}):"subtitleTrack"===o&&u.trigger(Ot.a.SUBTITLE_TRACK_LOADED,{details:c,id:s,stats:e,networkDetails:i}):u.trigger(Ot.a.ERROR,{type:Ct.b.NETWORK_ERROR,details:Ct.a.MANIFEST_PARSING_ERROR,fatal:!0,url:n,reason:"invalid targetduration",networkDetails:i})}else{var f=this.parseMasterPlaylist(a,n);if(f.length){var p=f.map(function(t){return{id:t.attrs.AUDIO,codec:t.audioCodec}}),g=this.parseMasterPlaylistMedia(a,n,"AUDIO",p),v=this.parseMasterPlaylistMedia(a,n,"SUBTITLES");if(g.length){var y=!1;g.forEach(function(t){t.url||(y=!0)}),!1===y&&f[0].audioCodec&&!f[0].attrs.AUDIO&&(Pt.b.log("audio codec signaled in quality level, but no embedded audio track signaled, create one"),g.unshift({type:"main",name:"main"}))}u.trigger(Ot.a.MANIFEST_LOADED,{levels:f,audioTracks:g,subtitles:v,url:n,stats:e,networkDetails:i})}else u.trigger(Ot.a.ERROR,{type:Ct.b.NETWORK_ERROR,details:Ct.a.MANIFEST_PARSING_ERROR,fatal:!0,url:n,reason:"no level found in manifest",networkDetails:i})}else u.trigger(Ot.a.ERROR,{type:Ct.b.NETWORK_ERROR,details:Ct.a.MANIFEST_PARSING_ERROR,fatal:!0,url:n,reason:"no EXTM3U delimiter",networkDetails:i})},e.prototype.loaderror=function(t,e){var r,i,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=e.loader;switch(e.type){case"manifest":r=Ct.a.MANIFEST_LOAD_ERROR,i=!0;break;case"level":r=Ct.a.LEVEL_LOAD_ERROR,i=!1;break;case"audioTrack":r=Ct.a.AUDIO_TRACK_LOAD_ERROR,i=!1}n&&(n.abort(),this.loaders[e.type]=void 0),this.hls.trigger(Ot.a.ERROR,{type:Ct.b.NETWORK_ERROR,details:r,fatal:i,url:n.url,loader:n,response:t,context:e,networkDetails:a})},e.prototype.loadtimeout=function(t,e){var r,i,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=e.loader;switch(e.type){case"manifest":r=Ct.a.MANIFEST_LOAD_TIMEOUT,i=!0;break;case"level":r=Ct.a.LEVEL_LOAD_TIMEOUT,i=!1;break;case"audioTrack":r=Ct.a.AUDIO_TRACK_LOAD_TIMEOUT,i=!1}n&&(n.abort(),this.loaders[e.type]=void 0),this.hls.trigger(Ot.a.ERROR,{type:Ct.b.NETWORK_ERROR,details:r,fatal:i,url:n.url,loader:n,context:e,networkDetails:a})},e}(Nt),Qt=qt,Jt=function(t){function e(r){h(this,e);var i=c(this,t.call(this,r,Ot.a.FRAG_LOADING));return i.loaders={},i}return f(e,t),e.prototype.destroy=function(){var t=this.loaders;for(var e in t){var r=t[e];r&&r.destroy()}this.loaders={},Nt.prototype.destroy.call(this)},e.prototype.onFragLoading=function(t){var e=t.frag,r=e.type,i=this.loaders[r],a=this.hls.config;e.loaded=0,i&&(Pt.b.warn("abort previous fragment loader for type:"+r),i.abort()),i=this.loaders[r]=e.loader=void 0!==a.fLoader?new a.fLoader(a):new a.loader(a);var n=void 0,o=void 0,s=void 0;n={url:e.url,frag:e,responseType:"arraybuffer",progressData:!1};var l=e.byteRangeStartOffset,u=e.byteRangeEndOffset;isNaN(l)||isNaN(u)||(n.rangeStart=l,n.rangeEnd=u),o={timeout:a.fragLoadingTimeOut,maxRetry:0,retryDelay:0,maxRetryDelay:a.fragLoadingMaxRetryTimeout},s={onSuccess:this.loadsuccess.bind(this),onError:this.loaderror.bind(this),onTimeout:this.loadtimeout.bind(this),onProgress:this.loadprogress.bind(this)},i.load(n,o,s)},e.prototype.loadsuccess=function(t,e,r){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,a=t.data,n=r.frag;n.loader=void 0,this.loaders[n.type]=void 0,this.hls.trigger(Ot.a.FRAG_LOADED,{payload:a,frag:n,stats:e,networkDetails:i})},e.prototype.loaderror=function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=e.loader;i&&i.abort(),this.loaders[e.type]=void 0,this.hls.trigger(Ot.a.ERROR,{type:Ct.b.NETWORK_ERROR,details:Ct.a.FRAG_LOAD_ERROR,fatal:!1,frag:e.frag,response:t,networkDetails:r})},e.prototype.loadtimeout=function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=e.loader;i&&i.abort(),this.loaders[e.type]=void 0,this.hls.trigger(Ot.a.ERROR,{type:Ct.b.NETWORK_ERROR,details:Ct.a.FRAG_LOAD_TIMEOUT,fatal:!1,frag:e.frag,networkDetails:r})},e.prototype.loadprogress=function(t,e,r){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,a=e.frag;a.loaded=t.loaded,this.hls.trigger(Ot.a.FRAG_LOAD_PROGRESS,{frag:a,stats:t,networkDetails:i})},e}(Nt),$t=Jt,Zt=function(t){function e(r){p(this,e);var i=g(this,t.call(this,r,Ot.a.KEY_LOADING));return i.loaders={},i.decryptkey=null,i.decrypturl=null,i}return v(e,t),e.prototype.destroy=function(){for(var t in this.loaders){var e=this.loaders[t];e&&e.destroy()}this.loaders={},Nt.prototype.destroy.call(this)},e.prototype.onKeyLoading=function(t){var e=t.frag,r=e.type,i=this.loaders[r],a=e.decryptdata,n=a.uri;if(n!==this.decrypturl||null===this.decryptkey){var o=this.hls.config;i&&(Pt.b.warn("abort previous key loader for type:"+r),i.abort()),e.loader=this.loaders[r]=new o.loader(o),this.decrypturl=n,this.decryptkey=null;var s=void 0,l=void 0,u=void 0;s={url:n,frag:e,responseType:"arraybuffer"},l={timeout:o.fragLoadingTimeOut,maxRetry:o.fragLoadingMaxRetry,retryDelay:o.fragLoadingRetryDelay,maxRetryDelay:o.fragLoadingMaxRetryTimeout},u={onSuccess:this.loadsuccess.bind(this),onError:this.loaderror.bind(this),onTimeout:this.loadtimeout.bind(this)},e.loader.load(s,l,u)}else this.decryptkey&&(a.key=this.decryptkey,this.hls.trigger(Ot.a.KEY_LOADED,{frag:e}))},e.prototype.loadsuccess=function(t,e,r){var i=r.frag;this.decryptkey=i.decryptdata.key=new Uint8Array(t.data),i.loader=void 0,this.loaders[i.type]=void 0,this.hls.trigger(Ot.a.KEY_LOADED,{frag:i})},e.prototype.loaderror=function(t,e){var r=e.frag,i=r.loader;i&&i.abort(),this.loaders[e.type]=void 0,this.hls.trigger(Ot.a.ERROR,{type:Ct.b.NETWORK_ERROR,details:Ct.a.KEY_LOAD_ERROR,fatal:!1,frag:r,response:t})},e.prototype.loadtimeout=function(t,e){var r=e.frag,i=r.loader;i&&i.abort(),this.loaders[e.type]=void 0,this.hls.trigger(Ot.a.ERROR,{type:Ct.b.NETWORK_ERROR,details:Ct.a.KEY_LOAD_TIMEOUT,fatal:!1,frag:r})},e}(Nt),te=Zt,ee={search:function(t,e){for(var r=0,i=t.length-1,a=null,n=null;r<=i;){a=(r+i)/2|0,n=t[a];var o=e(n);if(o>0)r=a+1;else{if(!(o<0))return n;i=a-1}}return null}},re=ee,ie={isBuffered:function(t,e){try{if(t)for(var r=t.buffered,i=0;i<r.length;i++)if(e>=r.start(i)&&e<=r.end(i))return!0}catch(t){}return!1},bufferInfo:function(t,e,r){try{if(t){var i,a=t.buffered,n=[];for(i=0;i<a.length;i++)n.push({start:a.start(i),end:a.end(i)});return this.bufferedInfo(n,e,r)}}catch(t){}return{len:0,start:e,end:e,nextStart:void 0}},bufferedInfo:function(t,e,r){var i,a,n,o,s,l=[];for(t.sort(function(t,e){var r=t.start-e.start;return r||e.end-t.end}),s=0;s<t.length;s++){var u=l.length;if(u){var d=l[u-1].end;t[s].start-d<r?t[s].end>d&&(l[u-1].end=t[s].end):l.push(t[s])}else l.push(t[s])}for(s=0,i=0,a=n=e;s<l.length;s++){var h=l[s].start,c=l[s].end;if(e+r>=h&&e<c)a=h,n=c,i=n-e;else if(e+r<h){o=h;break}}return{len:i,start:a,end:n,nextStart:o}}},ae=ie,ne=r(7),oe=r(5),se=r.n(oe),le=r(9),ue=r.n(le),de=y(),he=function(){function t(e,r){m(this,t),this.hls=e,this.id=r;var i=this.observer=new se.a,a=e.config;i.trigger=function(t){for(var e=arguments.length,r=Array(e>1?e-1:0),a=1;a<e;a++)r[a-1]=arguments[a];i.emit.apply(i,[t,t].concat(r))},i.off=function(t){for(var e=arguments.length,r=Array(e>1?e-1:0),a=1;a<e;a++)r[a-1]=arguments[a];i.removeListener.apply(i,[t].concat(r))};var n=function(t,r){r=r||{},r.frag=this.frag,r.id=this.id,e.trigger(t,r)}.bind(this);i.on(Ot.a.FRAG_DECRYPTED,n),i.on(Ot.a.FRAG_PARSING_INIT_SEGMENT,n),i.on(Ot.a.FRAG_PARSING_DATA,n),i.on(Ot.a.FRAG_PARSED,n),i.on(Ot.a.ERROR,n),i.on(Ot.a.FRAG_PARSING_METADATA,n),i.on(Ot.a.FRAG_PARSING_USERDATA,n),i.on(Ot.a.INIT_PTS_FOUND,n);var o={mp4:de.isTypeSupported("video/mp4"),mpeg:de.isTypeSupported("audio/mpeg"),mp3:de.isTypeSupported('audio/mp4; codecs="mp3"')},s=navigator.vendor;if(a.enableWorker&&"undefined"!=typeof Worker){Pt.b.log("demuxing in webworker");var l=void 0;try{l=this.w=ue()(10),this.onwmsg=this.onWorkerMessage.bind(this),l.addEventListener("message",this.onwmsg),l.onerror=function(t){e.trigger(Ot.a.ERROR,{type:Ct.b.OTHER_ERROR,details:Ct.a.INTERNAL_EXCEPTION,fatal:!0,event:"demuxerWorker",err:{message:t.message+" ("+t.filename+":"+t.lineno+")"}})},l.postMessage({cmd:"init",typeSupported:o,vendor:s,id:r,config:JSON.stringify(a)})}catch(t){Pt.b.error("error while initializing DemuxerWorker, fallback on DemuxerInline"),l&&URL.revokeObjectURL(l.objectURL),this.demuxer=new ne.a(i,o,a,s),this.w=void 0}}else this.demuxer=new ne.a(i,o,a,s)}return t.prototype.destroy=function(){var t=this.w;if(t)t.removeEventListener("message",this.onwmsg),t.terminate(),this.w=null;else{var e=this.demuxer;e&&(e.destroy(),this.demuxer=null)}var r=this.observer;r&&(r.removeAllListeners(),this.observer=null)},t.prototype.push=function(t,e,r,i,a,n,o,s){var l=this.w,u=isNaN(a.startDTS)?a.start:a.startDTS,d=a.decryptdata,h=this.frag,c=!(h&&a.cc===h.cc),f=!(h&&a.level===h.level),p=h&&a.sn===h.sn+1,g=!f&&p;if(c&&Pt.b.log(this.id+":discontinuity detected"),f&&Pt.b.log(this.id+":switch detected"),this.frag=a,l)l.postMessage({cmd:"demux",data:t,decryptdata:d,initSegment:e,audioCodec:r,videoCodec:i,timeOffset:u,discontinuity:c,trackSwitch:f,contiguous:g,duration:n,accurateTimeOffset:o,defaultInitPTS:s},t instanceof ArrayBuffer?[t]:[]);else{var v=this.demuxer;v&&v.push(t,d,e,r,i,u,c,f,g,n,o,s)}},t.prototype.onWorkerMessage=function(t){var e=t.data,r=this.hls;switch(e.event){case"init":URL.revokeObjectURL(this.w.objectURL);break;case Ot.a.FRAG_PARSING_DATA:e.data.data1=new Uint8Array(e.data1),e.data2&&(e.data.data2=new Uint8Array(e.data2));default:e.data=e.data||{},e.data.frag=this.frag,e.data.id=this.id,r.trigger(e.event,e.data)}},t}(),ce=he,fe={toString:function(t){for(var e="",r=t.length,i=0;i<r;i++)e+="["+t.start(i).toFixed(3)+","+t.end(i).toFixed(3)+"]";return e}},pe=fe,ge=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),ve={STOPPED:"STOPPED",IDLE:"IDLE",KEY_LOADING:"KEY_LOADING",FRAG_LOADING:"FRAG_LOADING",FRAG_LOADING_WAITING_RETRY:"FRAG_LOADING_WAITING_RETRY",WAITING_LEVEL:"WAITING_LEVEL",PARSING:"PARSING",PARSED:"PARSED",BUFFER_FLUSHING:"BUFFER_FLUSHING",ENDED:"ENDED",ERROR:"ERROR"},ye=function(t){function e(r){D(this,e);var i=I(this,t.call(this,r,Ot.a.MEDIA_ATTACHED,Ot.a.MEDIA_DETACHING,Ot.a.MANIFEST_LOADING,Ot.a.MANIFEST_PARSED,Ot.a.LEVEL_LOADED,Ot.a.KEY_LOADED,Ot.a.FRAG_LOADED,Ot.a.FRAG_LOAD_EMERGENCY_ABORTED,Ot.a.FRAG_PARSING_INIT_SEGMENT,Ot.a.FRAG_PARSING_DATA,Ot.a.FRAG_PARSED,Ot.a.ERROR,Ot.a.AUDIO_TRACK_SWITCHING,Ot.a.AUDIO_TRACK_SWITCHED,Ot.a.BUFFER_CREATED,Ot.a.BUFFER_APPENDED,Ot.a.BUFFER_FLUSHED));return i.config=r.config,i.audioCodecSwap=!1,i.ticks=0,i._state=ve.STOPPED,i.ontick=i.tick.bind(i),i}return k(e,t),e.prototype.destroy=function(){this.stopLoad(),this.timer&&(clearInterval(this.timer),this.timer=null),Nt.prototype.destroy.call(this),this.state=ve.STOPPED},e.prototype.startLoad=function(t){if(this.levels){var e=this.lastCurrentTime,r=this.hls;if(this.stopLoad(),this.timer||(this.timer=setInterval(this.ontick,100)),this.level=-1,this.fragLoadError=0,!this.startFragRequested){var i=r.startLevel;-1===i&&(i=0,this.bitrateTest=!0),this.level=r.nextLoadLevel=i,this.loadedmetadata=!1}e>0&&-1===t&&(Pt.b.log("override startPosition with lastCurrentTime @"+e.toFixed(3)),t=e),this.state=ve.IDLE,this.nextLoadPosition=this.startPosition=this.lastCurrentTime=t,this.tick()}else this.forceStartLoad=!0,this.state=ve.STOPPED},e.prototype.stopLoad=function(){var t=this.fragCurrent;t&&(t.loader&&t.loader.abort(),this.fragCurrent=null),this.fragPrevious=null,this.demuxer&&(this.demuxer.destroy(),this.demuxer=null),this.state=ve.STOPPED,this.forceStartLoad=!1},e.prototype.tick=function(){1===++this.ticks&&(this.doTick(),this.ticks>1&&setTimeout(this.tick,1),this.ticks=0)},e.prototype.doTick=function(){switch(this.state){case ve.ERROR:break;case ve.BUFFER_FLUSHING:this.fragLoadError=0;break;case ve.IDLE:this._doTickIdle();break;case ve.WAITING_LEVEL:var t=this.levels[this.level];t&&t.details&&(this.state=ve.IDLE);break;case ve.FRAG_LOADING_WAITING_RETRY:var e=performance.now(),r=this.retryDate;(!r||e>=r||this.media&&this.media.seeking)&&(Pt.b.log("mediaController: retryDate reached, switch back to IDLE state"),this.state=ve.IDLE);break;case ve.ERROR:case ve.STOPPED:case ve.FRAG_LOADING:case ve.PARSING:case ve.PARSED:case ve.ENDED:}this._checkBuffer(),this._checkFragmentChanged()},e.prototype._doTickIdle=function(){var t=this.hls,e=t.config,r=this.media;if(void 0!==this.levelLastLoaded&&(r||!this.startFragRequested&&e.startFragPrefetch)){var i=void 0;i=this.loadedmetadata?r.currentTime:this.nextLoadPosition;var a=t.nextLoadLevel,n=this.levels[a];if(n){var o=n.bitrate,s=void 0;s=o?Math.max(8*e.maxBufferSize/o,e.maxBufferLength):e.maxBufferLength,s=Math.min(s,e.maxMaxBufferLength);var l=ae.bufferInfo(this.mediaBuffer?this.mediaBuffer:r,i,e.maxBufferHole),u=l.len;if(!(u>=s)){Pt.b.trace("buffer length of "+u.toFixed(3)+" is below max of "+s.toFixed(3)+". checking for more payload ..."),this.level=t.nextLoadLevel=a;var d=n.details;if(void 0===d||!0===d.live&&this.levelLastLoaded!==a)return void(this.state=ve.WAITING_LEVEL);var h=this.fragPrevious;if(!d.live&&h&&!h.backtracked&&h.sn===d.endSN&&!l.nextStart){if(Math.min(r.duration,h.start+h.duration)-Math.max(l.end,h.start)<=Math.max(.2,h.duration)){var c={};return this.altAudio&&(c.type="video"),this.hls.trigger(Ot.a.BUFFER_EOS,c),void(this.state=ve.ENDED)}}this._fetchPayloadOrEos(i,l,d)}}}},e.prototype._fetchPayloadOrEos=function(t,e,r){var i=this.fragPrevious,a=this.level,n=r.fragments,o=n.length;if(0!==o){var s=n[0].start,l=n[o-1].start+n[o-1].duration,u=e.end,d=void 0;if(r.initSegment&&!r.initSegment.data)d=r.initSegment;else if(r.live){var h=this.config.initialLiveManifestSize;if(o<h)return void Pt.b.warn("Can not start playback of a level, reason: not enough fragments "+o+" < "+h);if(null===(d=this._ensureFragmentAtLivePoint(r,u,s,l,i,n,o)))return}else u<s&&(d=n[0]);d||(d=this._findFragment(s,i,o,n,u,l,r)),d&&this._loadFragmentOrKey(d,a,r,t,u)}},e.prototype._ensureFragmentAtLivePoint=function(t,e,r,i,a,n,o){var s=this.hls.config,l=this.media,u=void 0,d=void 0!==s.liveMaxLatencyDuration?s.liveMaxLatencyDuration:s.liveMaxLatencyDurationCount*t.targetduration;if(e<Math.max(r-s.maxFragLookUpTolerance,i-d)){var h=this.liveSyncPosition=this.computeLivePosition(r,t);Pt.b.log("buffer end: "+e.toFixed(3)+" is located too far from the end of live sliding playlist, reset currentTime to : "+h.toFixed(3)),e=h,l&&l.readyState&&l.duration>h&&(l.currentTime=h),this.nextLoadPosition=h}if(t.PTSKnown&&e>i&&l&&l.readyState)return null;if(this.startFragRequested&&!t.PTSKnown){if(a){var c=a.sn+1;if(c>=t.startSN&&c<=t.endSN){var f=n[c-t.startSN];a.cc===f.cc&&(u=f,Pt.b.log("live playlist, switching playlist, load frag with next SN: "+u.sn))}u||(u=re.search(n,function(t){return a.cc-t.cc}))&&Pt.b.log("live playlist, switching playlist, load frag with same CC: "+u.sn)}u||(u=n[Math.min(o-1,Math.round(o/2))],Pt.b.log("live playlist, switching playlist, unknown, load middle frag : "+u.sn))}return u},e.prototype._findFragment=function(t,e,r,i,a,n,o){var s=this.hls.config,l=void 0,u=void 0,d=s.maxFragLookUpTolerance,h=e?i[e.sn-i[0].sn+1]:void 0,c=function(t){var e=Math.min(d,t.duration+(t.deltaPTS?t.deltaPTS:0));return t.start+t.duration-e<=a?1:t.start-e>a&&t.start?-1:0};if(a<n?(a>n-d&&(d=0),u=h&&!c(h)?h:re.search(i,c)):u=i[r-1],u){l=u;var f=l.sn-o.startSN,p=e&&l.level===e.level,g=i[f-1],v=i[f+1];if(e&&l.sn===e.sn)if(p&&!l.backtracked)if(l.sn<o.endSN){var y=e.deltaPTS;y&&y>s.maxBufferHole&&e.dropped&&f?(l=g,Pt.b.warn("SN just loaded, with large PTS gap between audio and video, maybe frag is not starting with a keyframe ? load previous one to try to overcome this"),e.loadCounter--):(l=v,Pt.b.log("SN just loaded, load next one: "+l.sn))}else l=null;else l.backtracked&&(v&&v.backtracked?(Pt.b.warn("Already backtracked from fragment "+v.sn+", will not backtrack to fragment "+l.sn+". Loading fragment "+v.sn),l=v):(Pt.b.warn("Loaded fragment with dropped frames, backtracking 1 segment to find a keyframe"),l.dropped=0,g?(g.loadCounter&&g.loadCounter--,l=g,l.backtracked=!0):f&&(l=null)))}return l},e.prototype._loadFragmentOrKey=function(t,e,r,i,a){var n=this.hls,o=n.config;if(!t.decryptdata||null==t.decryptdata.uri||null!=t.decryptdata.key){if(Pt.b.log("Loading "+t.sn+" of ["+r.startSN+" ,"+r.endSN+"],level "+e+", currentTime:"+i.toFixed(3)+",bufferEnd:"+a.toFixed(3)),void 0!==this.fragLoadIdx?this.fragLoadIdx++:this.fragLoadIdx=0,t.loadCounter){t.loadCounter++;var s=o.fragLoadingLoopThreshold;if(t.loadCounter>s&&Math.abs(this.fragLoadIdx-t.loadIdx)<s)return void n.trigger(Ot.a.ERROR,{type:Ct.b.MEDIA_ERROR,details:Ct.a.FRAG_LOOP_LOADING_ERROR,fatal:!1,frag:t})}else t.loadCounter=1;return t.loadIdx=this.fragLoadIdx,t.autoLevel=n.autoLevelEnabled,t.bitrateTest=this.bitrateTest,this.fragCurrent=t,this.startFragRequested=!0,isNaN(t.sn)||t.bitrateTest||(this.nextLoadPosition=t.start+t.duration),n.trigger(Ot.a.FRAG_LOADING,{frag:t}),this.demuxer||(this.demuxer=new ce(n,"main")),void(this.state=ve.FRAG_LOADING)}Pt.b.log("Loading key for "+t.sn+" of ["+r.startSN+" ,"+r.endSN+"],level "+e),this.state=ve.KEY_LOADING,n.trigger(Ot.a.KEY_LOADING,{frag:t})},e.prototype.getBufferedFrag=function(t){return re.search(this._bufferedFrags,function(e){return t<e.startPTS?-1:t>e.endPTS?1:0})},e.prototype.followingBufferedFrag=function(t){return t?this.getBufferedFrag(t.endPTS+.5):null},e.prototype._checkFragmentChanged=function(){var t,e,r=this.media;if(r&&r.readyState&&!1===r.seeking&&(e=r.currentTime,e>r.playbackRate*this.lastCurrentTime&&(this.lastCurrentTime=e),ae.isBuffered(r,e)?t=this.getBufferedFrag(e):ae.isBuffered(r,e+.1)&&(t=this.getBufferedFrag(e+.1)),t)){var i=t;if(i!==this.fragPlaying){this.hls.trigger(Ot.a.FRAG_CHANGED,{frag:i});var a=i.level;this.fragPlaying&&this.fragPlaying.level===a||this.hls.trigger(Ot.a.LEVEL_SWITCHED,{level:a}),this.fragPlaying=i}}},e.prototype.immediateLevelSwitch=function(){if(Pt.b.log("immediateLevelSwitch"),!this.immediateSwitch){this.immediateSwitch=!0;var t=this.media,e=void 0;t?(e=t.paused,t.pause()):e=!0,this.previouslyPaused=e}var r=this.fragCurrent;r&&r.loader&&r.loader.abort(),this.fragCurrent=null,void 0!==this.fragLoadIdx&&(this.fragLoadIdx+=2*this.config.fragLoadingLoopThreshold),this.flushMainBuffer(0,Number.POSITIVE_INFINITY)},e.prototype.immediateLevelSwitchEnd=function(){var t=this.media;t&&t.buffered.length&&(this.immediateSwitch=!1,ae.isBuffered(t,t.currentTime)&&(t.currentTime-=1e-4),this.previouslyPaused||t.play())},e.prototype.nextLevelSwitch=function(){var t=this.media;if(t&&t.readyState){var e=void 0,r=void 0,i=void 0;if(void 0!==this.fragLoadIdx&&(this.fragLoadIdx+=2*this.config.fragLoadingLoopThreshold),r=this.getBufferedFrag(t.currentTime),r&&r.startPTS>1&&this.flushMainBuffer(0,r.startPTS-1),t.paused)e=0;else{var a=this.hls.nextLoadLevel,n=this.levels[a],o=this.fragLastKbps;e=o&&this.fragCurrent?this.fragCurrent.duration*n.bitrate/(1e3*o)+1:0}if((i=this.getBufferedFrag(t.currentTime+e))&&(i=this.followingBufferedFrag(i))){var s=this.fragCurrent;s&&s.loader&&s.loader.abort(),this.fragCurrent=null,this.flushMainBuffer(i.maxStartPTS,Number.POSITIVE_INFINITY)}}},e.prototype.flushMainBuffer=function(t,e){this.state=ve.BUFFER_FLUSHING;var r={startOffset:t,endOffset:e};this.altAudio&&(r.type="video"),this.hls.trigger(Ot.a.BUFFER_FLUSHING,r)},e.prototype.onMediaAttached=function(t){var e=this.media=this.mediaBuffer=t.media;this.onvseeking=this.onMediaSeeking.bind(this),this.onvseeked=this.onMediaSeeked.bind(this),this.onvended=this.onMediaEnded.bind(this),e.addEventListener("seeking",this.onvseeking),e.addEventListener("seeked",this.onvseeked),e.addEventListener("ended",this.onvended);var r=this.config;this.levels&&r.autoStartLoad&&this.hls.startLoad(r.startPosition)},e.prototype.onMediaDetaching=function(){var t=this.media;t&&t.ended&&(Pt.b.log("MSE detaching and video ended, reset startPosition"),this.startPosition=this.lastCurrentTime=0);var e=this.levels;e&&e.forEach(function(t){t.details&&t.details.fragments.forEach(function(t){t.loadCounter=void 0,t.backtracked=void 0})}),t&&(t.removeEventListener("seeking",this.onvseeking),t.removeEventListener("seeked",this.onvseeked),t.removeEventListener("ended",this.onvended),this.onvseeking=this.onvseeked=this.onvended=null),this.media=this.mediaBuffer=null,this.loadedmetadata=!1,this.stopLoad()},e.prototype.onMediaSeeking=function(){var t=this.media,e=t?t.currentTime:void 0,r=this.config;isNaN(e)||Pt.b.log("media seeking to "+e.toFixed(3));var i=this.mediaBuffer?this.mediaBuffer:t,a=ae.bufferInfo(i,e,this.config.maxBufferHole);if(this.state===ve.FRAG_LOADING){var n=this.fragCurrent;if(0===a.len&&n){var o=r.maxFragLookUpTolerance,s=n.start-o,l=n.start+n.duration+o;e<s||e>l?(n.loader&&(Pt.b.log("seeking outside of buffer while fragment load in progress, cancel fragment load"),n.loader.abort()),this.fragCurrent=null,this.fragPrevious=null,this.state=ve.IDLE):Pt.b.log("seeking outside of buffer but within currently loaded fragment range")}}else this.state===ve.ENDED&&(0===a.len&&(this.fragPrevious=0),this.state=ve.IDLE);t&&(this.lastCurrentTime=e),this.state!==ve.FRAG_LOADING&&void 0!==this.fragLoadIdx&&(this.fragLoadIdx+=2*r.fragLoadingLoopThreshold),this.loadedmetadata||(this.nextLoadPosition=this.startPosition=e),this.tick()},e.prototype.onMediaSeeked=function(){var t=this.media,e=t?t.currentTime:void 0;isNaN(e)||Pt.b.log("media seeked to "+e.toFixed(3)),this.tick()},e.prototype.onMediaEnded=function(){Pt.b.log("media ended"),this.startPosition=this.lastCurrentTime=0},e.prototype.onManifestLoading=function(){Pt.b.log("trigger BUFFER_RESET"),this.hls.trigger(Ot.a.BUFFER_RESET),this._bufferedFrags=[],this.stalled=!1,this.startPosition=this.lastCurrentTime=0},e.prototype.onManifestParsed=function(t){var e,r=!1,i=!1;t.levels.forEach(function(t){(e=t.audioCodec)&&(-1!==e.indexOf("mp4a.40.2")&&(r=!0),-1!==e.indexOf("mp4a.40.5")&&(i=!0))}),this.audioCodecSwitch=r&&i,this.audioCodecSwitch&&Pt.b.log("both AAC/HE-AAC audio found in levels; declaring level codec as HE-AAC"),this.levels=t.levels,this.startFragRequested=!1;var a=this.config;(a.autoStartLoad||this.forceStartLoad)&&this.hls.startLoad(a.startPosition)},e.prototype.onLevelLoaded=function(t){var e=t.details,r=t.level,i=this.levels[this.levelLastLoaded],a=this.levels[r],n=e.totalduration,o=0;if(Pt.b.log("level "+r+" loaded ["+e.startSN+","+e.endSN+"],duration:"+n),e.live){var s=a.details;s&&e.fragments.length>0?(T(s,e),o=e.fragments[0].start,this.liveSyncPosition=this.computeLivePosition(o,s),e.PTSKnown&&!isNaN(o)?Pt.b.log("live playlist sliding:"+o.toFixed(3)):(Pt.b.log("live playlist - outdated PTS, unknown sliding"),w(this.fragPrevious,i,e))):(Pt.b.log("live playlist - first load, unknown sliding"),e.PTSKnown=!1,w(this.fragPrevious,i,e))}else e.PTSKnown=!1;if(a.details=e,this.levelLastLoaded=r,this.hls.trigger(Ot.a.LEVEL_UPDATED,{details:e,level:r}),!1===this.startFragRequested){if(-1===this.startPosition||-1===this.lastCurrentTime){var l=e.startTimeOffset;isNaN(l)?e.live?(this.startPosition=this.computeLivePosition(o,e),Pt.b.log("configure startPosition to "+this.startPosition)):this.startPosition=0:(l<0&&(Pt.b.log("negative start time offset "+l+", count from end of last fragment"),l=o+n+l),Pt.b.log("start time offset found in playlist, adjust startPosition to "+l),this.startPosition=l),this.lastCurrentTime=this.startPosition}this.nextLoadPosition=this.startPosition}this.state===ve.WAITING_LEVEL&&(this.state=ve.IDLE),this.tick()},e.prototype.onKeyLoaded=function(){this.state===ve.KEY_LOADING&&(this.state=ve.IDLE,this.tick())},e.prototype.onFragLoaded=function(t){var e=this.fragCurrent,r=t.frag;if(this.state===ve.FRAG_LOADING&&e&&"main"===r.type&&r.level===e.level&&r.sn===e.sn){var i=t.stats,a=this.levels[e.level],n=a.details;if(Pt.b.log("Loaded  "+e.sn+" of ["+n.startSN+" ,"+n.endSN+"],level "+e.level),this.bitrateTest=!1,this.stats=i,!0===r.bitrateTest&&this.hls.nextLoadLevel)this.state=ve.IDLE,this.startFragRequested=!1,i.tparsed=i.tbuffered=performance.now(),this.hls.trigger(Ot.a.FRAG_BUFFERED,{stats:i,frag:e,id:"main"}),this.tick();else if("initSegment"===r.sn)this.state=ve.IDLE,i.tparsed=i.tbuffered=performance.now(),n.initSegment.data=t.payload,this.hls.trigger(Ot.a.FRAG_BUFFERED,{stats:i,frag:e,id:"main"}),this.tick();else{this.state=ve.PARSING;var o=n.totalduration,s=e.level,l=e.sn,u=this.config.defaultAudioCodec||a.audioCodec;this.audioCodecSwap&&(Pt.b.log("swapping playlist audio codec"),void 0===u&&(u=this.lastAudioCodec),u&&(u=-1!==u.indexOf("mp4a.40.5")?"mp4a.40.2":"mp4a.40.5")),this.pendingBuffering=!0,this.appended=!1,Pt.b.log("Parsing "+l+" of ["+n.startSN+" ,"+n.endSN+"],level "+s+", cc "+e.cc);var d=this.demuxer;d||(d=this.demuxer=new ce(this.hls,"main"));var h=this.media,c=h&&h.seeking,f=!c&&(n.PTSKnown||!n.live),p=n.initSegment?n.initSegment.data:[];d.push(t.payload,p,u,a.videoCodec,e,o,f,void 0)}}this.fragLoadError=0},e.prototype.onFragParsingInitSegment=function(t){var e=this.fragCurrent,r=t.frag;if(e&&"main"===t.id&&r.sn===e.sn&&r.level===e.level&&this.state===ve.PARSING){var i,a,n=t.tracks;if(n.audio&&this.altAudio&&delete n.audio,a=n.audio){var o=this.levels[this.level].audioCodec,s=navigator.userAgent.toLowerCase();o&&this.audioCodecSwap&&(Pt.b.log("swapping playlist audio codec"),o=-1!==o.indexOf("mp4a.40.5")?"mp4a.40.2":"mp4a.40.5"),this.audioCodecSwitch&&1!==a.metadata.channelCount&&-1===s.indexOf("firefox")&&(o="mp4a.40.5"),-1!==s.indexOf("android")&&"audio/mpeg"!==a.container&&(o="mp4a.40.2",Pt.b.log("Android: force audio codec to "+o)),a.levelCodec=o,a.id=t.id}a=n.video,a&&(a.levelCodec=this.levels[this.level].videoCodec,a.id=t.id),this.hls.trigger(Ot.a.BUFFER_CODECS,n);for(i in n){a=n[i],Pt.b.log("main track:"+i+",container:"+a.container+",codecs[level/parsed]=["+a.levelCodec+"/"+a.codec+"]");var l=a.initSegment;l&&(this.appended=!0,this.pendingBuffering=!0,this.hls.trigger(Ot.a.BUFFER_APPENDING,{type:i,data:l,parent:"main",content:"initSegment"}))}this.tick()}},e.prototype.onFragParsingData=function(t){var e=this,r=this.fragCurrent,i=t.frag;if(r&&"main"===t.id&&i.sn===r.sn&&i.level===r.level&&("audio"!==t.type||!this.altAudio)&&this.state===ve.PARSING){var a=this.levels[this.level],n=r;if(isNaN(t.endPTS)&&(t.endPTS=t.startPTS+r.duration,t.endDTS=t.startDTS+r.duration),Pt.b.log("Parsed "+t.type+",PTS:["+t.startPTS.toFixed(3)+","+t.endPTS.toFixed(3)+"],DTS:["+t.startDTS.toFixed(3)+"/"+t.endDTS.toFixed(3)+"],nb:"+t.nb+",dropped:"+(t.dropped||0)),"video"===t.type)if(n.dropped=t.dropped,n.dropped)if(n.backtracked)Pt.b.warn("Already backtracked on this fragment, appending with the gap");else{var o=a.details;if(!o||n.sn!==o.startSN)return Pt.b.warn("missing video frame(s), backtracking fragment"),n.backtracked=!0,this.nextLoadPosition=t.startPTS,this.state=ve.IDLE,this.fragPrevious=n,void this.tick();Pt.b.warn("missing video frame(s) on first frag, appending with gap")}else n.backtracked=!1;var s=E(a.details,n,t.startPTS,t.endPTS,t.startDTS,t.endDTS),l=this.hls;l.trigger(Ot.a.LEVEL_PTS_UPDATED,{details:a.details,level:this.level,drift:s,type:t.type,start:t.startPTS,end:t.endPTS}),[t.data1,t.data2].forEach(function(r){r&&r.length&&e.state===ve.PARSING&&(e.appended=!0,e.pendingBuffering=!0,l.trigger(Ot.a.BUFFER_APPENDING,{type:t.type,data:r,parent:"main",content:"data"}))}),this.tick()}},e.prototype.onFragParsed=function(t){var e=this.fragCurrent,r=t.frag;e&&"main"===t.id&&r.sn===e.sn&&r.level===e.level&&this.state===ve.PARSING&&(this.stats.tparsed=performance.now(),this.state=ve.PARSED,this._checkAppendedParsed())},e.prototype.onAudioTrackSwitching=function(t){var e=!!t.url,r=t.id;if(!e){if(this.mediaBuffer!==this.media){Pt.b.log("switching on main audio, use media.buffered to schedule main fragment loading"),this.mediaBuffer=this.media;var i=this.fragCurrent;i.loader&&(Pt.b.log("switching to main audio track, cancel main fragment load"),i.loader.abort()),this.fragCurrent=null,this.fragPrevious=null,this.demuxer&&(this.demuxer.destroy(),this.demuxer=null),this.state=ve.IDLE}var a=this.hls;a.trigger(Ot.a.BUFFER_FLUSHING,{startOffset:0,endOffset:Number.POSITIVE_INFINITY,type:"audio"}),a.trigger(Ot.a.AUDIO_TRACK_SWITCHED,{id:r}),this.altAudio=!1}},e.prototype.onAudioTrackSwitched=function(t){var e=t.id,r=!!this.hls.audioTracks[e].url;if(r){var i=this.videoBuffer;i&&this.mediaBuffer!==i&&(Pt.b.log("switching on alternate audio, use video.buffered to schedule main fragment loading"),this.mediaBuffer=i)}this.altAudio=r,this.tick()},e.prototype.onBufferCreated=function(t){var e=t.tracks,r=void 0,i=void 0,a=!1;for(var n in e){var o=e[n];"main"===o.id?(i=n,r=o,"video"===n&&(this.videoBuffer=e[n].buffer)):a=!0}a&&r?(Pt.b.log("alternate track found, use "+i+".buffered to schedule main fragment loading"),this.mediaBuffer=r.buffer):this.mediaBuffer=this.media},e.prototype.onBufferAppended=function(t){if("main"===t.parent){var e=this.state;e!==ve.PARSING&&e!==ve.PARSED||(this.pendingBuffering=t.pending>0,this._checkAppendedParsed())}},e.prototype._checkAppendedParsed=function(){if(!(this.state!==ve.PARSED||this.appended&&this.pendingBuffering)){var t=this.fragCurrent;if(t){var e=this.mediaBuffer?this.mediaBuffer:this.media;Pt.b.log("main buffered : "+pe.toString(e.buffered));var r=this._bufferedFrags.filter(function(t){return ae.isBuffered(e,(t.startPTS+t.endPTS)/2)});r.push(t),this._bufferedFrags=r.sort(function(t,e){return t.startPTS-e.startPTS}),this.fragPrevious=t;var i=this.stats;i.tbuffered=performance.now(),this.fragLastKbps=Math.round(8*i.total/(i.tbuffered-i.tfirst)),this.hls.trigger(Ot.a.FRAG_BUFFERED,{stats:i,frag:t,id:"main"}),this.state=ve.IDLE}this.tick()}},e.prototype.onError=function(t){var e=t.frag||this.fragCurrent;if(!e||"main"===e.type){var r=!!this.media&&ae.isBuffered(this.media,this.media.currentTime)&&ae.isBuffered(this.media,this.media.currentTime+.5);switch(t.details){case Ct.a.FRAG_LOAD_ERROR:case Ct.a.FRAG_LOAD_TIMEOUT:case Ct.a.KEY_LOAD_ERROR:case Ct.a.KEY_LOAD_TIMEOUT:if(!t.fatal)if(this.fragLoadError+1<=this.config.fragLoadingMaxRetry){var i=Math.min(Math.pow(2,this.fragLoadError)*this.config.fragLoadingRetryDelay,this.config.fragLoadingMaxRetryTimeout);e.loadCounter=0,Pt.b.warn("mediaController: frag loading failed, retry in "+i+" ms"),this.retryDate=performance.now()+i,this.loadedmetadata||(this.startFragRequested=!1,this.nextLoadPosition=this.startPosition),this.fragLoadError++,this.state=ve.FRAG_LOADING_WAITING_RETRY}else Pt.b.error("mediaController: "+t.details+" reaches max retry, redispatch as fatal ..."),t.fatal=!0,this.state=ve.ERROR;break;case Ct.a.FRAG_LOOP_LOADING_ERROR:t.fatal||(r?(this._reduceMaxBufferLength(e.duration),this.state=ve.IDLE):e.autoLevel&&0!==e.level||(t.fatal=!0,this.state=ve.ERROR));break;case Ct.a.LEVEL_LOAD_ERROR:case Ct.a.LEVEL_LOAD_TIMEOUT:this.state!==ve.ERROR&&(t.fatal?(this.state=ve.ERROR,Pt.b.warn("streamController: "+t.details+",switch to "+this.state+" state ...")):t.levelRetry||this.state!==ve.WAITING_LEVEL||(this.state=ve.IDLE));break;case Ct.a.BUFFER_FULL_ERROR:"main"!==t.parent||this.state!==ve.PARSING&&this.state!==ve.PARSED||(r?(this._reduceMaxBufferLength(this.config.maxBufferLength),this.state=ve.IDLE):(Pt.b.warn("buffer full error also media.currentTime is not buffered, flush everything"),this.fragCurrent=null,this.flushMainBuffer(0,Number.POSITIVE_INFINITY)))}}},e.prototype._reduceMaxBufferLength=function(t){var e=this.config;e.maxMaxBufferLength>=t&&(e.maxMaxBufferLength/=2,Pt.b.warn("main:reduce max buffer length to "+e.maxMaxBufferLength+"s"),void 0!==this.fragLoadIdx&&(this.fragLoadIdx+=2*e.fragLoadingLoopThreshold))},e.prototype._checkBuffer=function(){var t=this.media,e=this.config;if(t&&t.readyState){var r=t.currentTime,i=this.mediaBuffer?this.mediaBuffer:t,a=i.buffered;if(!this.loadedmetadata&&a.length){this.loadedmetadata=!0;var n=t.seeking?r:this.startPosition,o=ae.isBuffered(i,n),s=a.start(0),l=!o&&Math.abs(n-s)<e.maxSeekHole;(r!==n||l)&&(Pt.b.log("target start position:"+n),l&&(n=s,Pt.b.log("target start position not buffered, seek to buffered.start(0) "+n)),Pt.b.log("adjust currentTime from "+r+" to "+n),t.currentTime=n)}else if(this.immediateSwitch)this.immediateLevelSwitchEnd();else{var u=ae.bufferInfo(t,r,0),d=!(t.paused||t.ended||0===t.buffered.length),h=r!==this.lastCurrentTime;if(h)this.stallReported&&(Pt.b.warn("playback not stuck anymore @"+r+", after "+Math.round(performance.now()-this.stalled)+"ms"),this.stallReported=!1),this.stalled=void 0,this.nudgeRetry=0;else if(d){var c=performance.now(),f=this.hls;if(this.stalled){var p=c-this.stalled,g=u.len,v=this.nudgeRetry||0;if(g<=.5&&p>1e3*e.lowBufferWatchdogPeriod){this.stallReported||(this.stallReported=!0,Pt.b.warn("playback stalling in low buffer @"+r),f.trigger(Ot.a.ERROR,{type:Ct.b.MEDIA_ERROR,details:Ct.a.BUFFER_STALLED_ERROR,fatal:!1,buffer:g}));var y=u.nextStart,m=y-r;if(y&&m<e.maxSeekHole&&m>0){this.nudgeRetry=++v;var b=v*e.nudgeOffset;Pt.b.log("adjust currentTime from "+t.currentTime+" to next buffered @ "+y+" + nudge "+b),t.currentTime=y+b,this.stalled=void 0,f.trigger(Ot.a.ERROR,{type:Ct.b.MEDIA_ERROR,details:Ct.a.BUFFER_SEEK_OVER_HOLE,fatal:!1,hole:y+b-r})}}else if(g>.5&&p>1e3*e.highBufferWatchdogPeriod)if(this.stallReported||(this.stallReported=!0,Pt.b.warn("playback stalling in high buffer @"+r),f.trigger(Ot.a.ERROR,{type:Ct.b.MEDIA_ERROR,details:Ct.a.BUFFER_STALLED_ERROR,fatal:!1,buffer:g})),this.stalled=void 0,this.nudgeRetry=++v,v<e.nudgeMaxRetry){var E=t.currentTime,T=E+v*e.nudgeOffset;Pt.b.log("adjust currentTime from "+E+" to "+T),t.currentTime=T,f.trigger(Ot.a.ERROR,{type:Ct.b.MEDIA_ERROR,details:Ct.a.BUFFER_NUDGE_ON_STALL,fatal:!1})}else Pt.b.error("still stuck in high buffer @"+r+" after "+e.nudgeMaxRetry+", raise fatal error"),f.trigger(Ot.a.ERROR,{type:Ct.b.MEDIA_ERROR,details:Ct.a.BUFFER_STALLED_ERROR,fatal:!0})}else this.stalled=c,this.stallReported=!1}}}},e.prototype.onFragLoadEmergencyAborted=function(){this.state=ve.IDLE,this.loadedmetadata||(this.startFragRequested=!1,this.nextLoadPosition=this.startPosition),this.tick()},e.prototype.onBufferFlushed=function(){var t=this.mediaBuffer?this.mediaBuffer:this.media;this._bufferedFrags=this._bufferedFrags.filter(function(e){return ae.isBuffered(t,(e.startPTS+e.endPTS)/2)}),void 0!==this.fragLoadIdx&&(this.fragLoadIdx+=2*this.config.fragLoadingLoopThreshold),this.state=ve.IDLE,this.fragPrevious=null},e.prototype.swapAudioCodec=function(){this.audioCodecSwap=!this.audioCodecSwap},e.prototype.computeLivePosition=function(t,e){var r=void 0!==this.config.liveSyncDuration?this.config.liveSyncDuration:this.config.liveSyncDurationCount*e.targetduration;return t+Math.max(0,e.totalduration-r)},ge(e,[{key:"state",set:function(t){if(this.state!==t){var e=this.state;this._state=t,Pt.b.log("main stream:"+e+"->"+t),this.hls.trigger(Ot.a.STREAM_STATE_TRANSITION,{previousState:e,nextState:t})}},get:function(){return this._state}},{key:"currentLevel",get:function(){var t=this.media;if(t){var e=this.getBufferedFrag(t.currentTime);if(e)return e.level}return-1}},{key:"nextBufferedFrag",get:function(){var t=this.media;return t?this.followingBufferedFrag(this.getBufferedFrag(t.currentTime)):null}},{key:"nextLevel",get:function(){var t=this.nextBufferedFrag;return t?t.level:-1}},{key:"liveSyncPosition",get:function(){return this._liveSyncPosition},set:function(t){this._liveSyncPosition=t}}]),e}(Nt),me=ye,be=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),Ee=function(t){function e(r){O(this,e);var i=C(this,t.call(this,r,Ot.a.MANIFEST_LOADED,Ot.a.LEVEL_LOADED,Ot.a.FRAG_LOADED,Ot.a.ERROR));return i.canload=!1,i.currentLevelIndex=null,i.manualLevelIndex=-1,i.timer=null,i}return P(e,t),e.prototype.destroy=function(){this.cleanTimer(),this.manualLevelIndex=-1},e.prototype.cleanTimer=function(){null!==this.timer&&(clearTimeout(this.timer),this.timer=null)},e.prototype.startLoad=function(){var t=this._levels;this.canload=!0,this.levelRetryCount=0,t&&t.forEach(function(t){t.loadError=0;var e=t.details;e&&e.live&&(t.details=void 0)}),null!==this.timer&&this.loadLevel()},e.prototype.stopLoad=function(){this.canload=!1},e.prototype.onManifestLoaded=function(t){var e=[],r=void 0,i={},a=null,n=!1,s=!1,l=/chrome|firefox/.test(navigator.userAgent.toLowerCase()),u=[];if(t.levels.forEach(function(t){t.loadError=0,t.fragmentError=!1,n=n||!!t.videoCodec,s=s||!!t.audioCodec||!(!t.attrs||!t.attrs.AUDIO),!0===l&&t.audioCodec&&-1!==t.audioCodec.indexOf("mp4a.40.34")&&(t.audioCodec=void 0),a=i[t.bitrate],void 0===a?(t.url=[t.url],t.urlId=0,i[t.bitrate]=t,e.push(t)):a.url.push(t.url)}),!0===n&&!0===s&&(e=e.filter(function(t){return!!t.videoCodec})),e=e.filter(function(t){var e=t.audioCodec,r=t.videoCodec;return(!e||o(e))&&(!r||o(r))}),t.audioTracks&&(u=t.audioTracks.filter(function(t){return!t.audioCodec||o(t.audioCodec,"audio")})),e.length>0){r=e[0].bitrate,e.sort(function(t,e){return t.bitrate-e.bitrate}),this._levels=e;for(var d=0;d<e.length;d++)if(e[d].bitrate===r){this._firstLevel=d,Pt.b.log("manifest loaded,"+e.length+" level(s) found, first bitrate:"+r);break}this.hls.trigger(Ot.a.MANIFEST_PARSED,{levels:e,audioTracks:u,firstLevel:this._firstLevel,stats:t.stats,audio:s,video:n,altAudio:u.length>0})}else this.hls.trigger(Ot.a.ERROR,{type:Ct.b.MEDIA_ERROR,details:Ct.a.MANIFEST_INCOMPATIBLE_CODECS_ERROR,fatal:!0,url:this.hls.url,reason:"no level with compatible codecs found in manifest"})},e.prototype.setLevelInternal=function(t){var e=this._levels,r=this.hls;if(t>=0&&t<e.length){if(this.cleanTimer(),this.currentLevelIndex!==t){Pt.b.log("switching to level "+t),this.currentLevelIndex=t;var i=e[t];i.level=t,r.trigger(Ot.a.LEVEL_SWITCH,i),r.trigger(Ot.a.LEVEL_SWITCHING,i)}var a=e[t],n=a.details;if(!n||!0===n.live){var o=a.urlId;r.trigger(Ot.a.LEVEL_LOADING,{url:a.url[o],level:t,id:o})}}else r.trigger(Ot.a.ERROR,{type:Ct.b.OTHER_ERROR,details:Ct.a.LEVEL_SWITCH_ERROR,level:t,fatal:!1,reason:"invalid level idx"})},e.prototype.onError=function(t){if(!0===t.fatal)return void(t.type===Ct.b.NETWORK_ERROR&&this.cleanTimer());var e=!1,r=!1,i=void 0;switch(t.details){case Ct.a.FRAG_LOAD_ERROR:case Ct.a.FRAG_LOAD_TIMEOUT:case Ct.a.FRAG_LOOP_LOADING_ERROR:case Ct.a.KEY_LOAD_ERROR:case Ct.a.KEY_LOAD_TIMEOUT:i=t.frag.level,r=!0;break;case Ct.a.LEVEL_LOAD_ERROR:case Ct.a.LEVEL_LOAD_TIMEOUT:i=t.context.level,e=!0;break;case Ct.a.REMUX_ALLOC_ERROR:i=t.level,e=!0}void 0!==i&&this.recoverLevel(t,i,e,r)},e.prototype.recoverLevel=function(t,e,r,i){var a=this,n=this.hls.config,o=t.details,s=this._levels[e],l=void 0,u=void 0,d=void 0;if(s.loadError++,s.fragmentError=i,!0===r){if(!(this.levelRetryCount+1<=n.levelLoadingMaxRetry))return Pt.b.error("level controller, cannot recover from "+o+" error"),this.currentLevelIndex=null,this.cleanTimer(),void(t.fatal=!0);u=Math.min(Math.pow(2,this.levelRetryCount)*n.levelLoadingRetryDelay,n.levelLoadingMaxRetryTimeout),this.timer=setTimeout(function(){return a.loadLevel()},u),t.levelRetry=!0,this.levelRetryCount++,Pt.b.warn("level controller, "+o+", retry in "+u+" ms, current retry count is "+this.levelRetryCount)}!0!==r&&!0!==i||(l=s.url.length,l>1&&s.loadError<l?(Pt.b.warn("level controller, "+o+" for level "+e+": switching to redundant stream id "+s.urlId),s.urlId=(s.urlId+1)%l,s.details=void 0):-1===this.manualLevelIndex?(d=0===e?this._levels.length-1:e-1,Pt.b.warn("level controller, "+o+": switch to "+d),this.hls.nextAutoLevel=this.currentLevelIndex=d):!0===i&&(Pt.b.warn("level controller, "+o+": reload a fragment"),this.currentLevelIndex=null))},e.prototype.onFragLoaded=function(t){var e=t.frag;if(void 0!==e&&"main"===e.type){var r=this._levels[e.level];void 0!==r&&(r.fragmentError=!1,r.loadError=0,this.levelRetryCount=0)}},e.prototype.onLevelLoaded=function(t){var e=this,r=t.level;if(r===this.currentLevelIndex){var i=this._levels[r];!1===i.fragmentError&&(i.loadError=0,this.levelRetryCount=0);var a=t.details;if(a.live){var n=1e3*(a.averagetargetduration?a.averagetargetduration:a.targetduration),o=i.details;o&&a.endSN===o.endSN&&(n/=2,Pt.b.log("same live playlist, reload twice faster")),n-=performance.now()-t.stats.trequest,n=Math.max(1e3,Math.round(n)),Pt.b.log("live playlist, reload in "+n+" ms"),this.timer=setTimeout(function(){return e.loadLevel()},n)}else this.cleanTimer()}},e.prototype.loadLevel=function(){var t=void 0,e=void 0;null!==this.currentLevelIndex&&!0===this.canload&&void 0!==(t=this._levels[this.currentLevelIndex])&&t.url.length>0&&(e=t.urlId,this.hls.trigger(Ot.a.LEVEL_LOADING,{url:t.url[e],level:this.currentLevelIndex,id:e}))},be(e,[{key:"levels",get:function(){return this._levels}},{key:"level",get:function(){return this.currentLevelIndex},set:function(t){var e=this._levels;e&&(t=Math.min(t,e.length-1),this.currentLevelIndex===t&&void 0!==e[t].details||this.setLevelInternal(t))}},{key:"manualLevel",get:function(){return this.manualLevelIndex},set:function(t){this.manualLevelIndex=t,void 0===this._startLevel&&(this._startLevel=t),-1!==t&&(this.level=t)}},{key:"firstLevel",get:function(){return this._firstLevel},set:function(t){this._firstLevel=t}},{key:"startLevel",get:function(){if(void 0===this._startLevel){var t=this.hls.config.startLevel;return void 0!==t?t:this._firstLevel}return this._startLevel},set:function(t){this._startLevel=t}},{key:"nextLoadLevel",get:function(){return-1!==this.manualLevelIndex?this.manualLevelIndex:this.hls.nextAutoLevel},set:function(t){this.level=t,-1===this.manualLevelIndex&&(this.hls.nextAutoLevel=t)}}]),e}(Nt),Te=Ee,Re=r(3),Ae=function(t){function e(r){x(this,e);var i=F(this,t.call(this,r,Ot.a.MEDIA_ATTACHED,Ot.a.MEDIA_DETACHING,Ot.a.FRAG_PARSING_METADATA));return i.id3Track=void 0,i.media=void 0,i}return N(e,t),e.prototype.destroy=function(){Nt.prototype.destroy.call(this)},e.prototype.onMediaAttached=function(t){this.media=t.media,this.media},e.prototype.onMediaDetaching=function(){this.media=void 0},e.prototype.onFragParsingMetadata=function(t){var e=t.frag,r=t.samples;this.id3Track||(this.id3Track=this.media.addTextTrack("metadata","id3"),this.id3Track.mode="hidden");for(var i=window.WebKitDataCue||window.VTTCue||window.TextTrackCue,a=0;a<r.length;a++){var n=Re.a.getID3Frames(r[a].data);if(n){var o=r[a].pts,s=a<r.length-1?r[a+1].pts:e.endPTS;o===s&&(s+=1e-4);for(var l=0;l<n.length;l++){var u=n[l];if(!Re.a.isTimeStampFrame(u)){var d=new i(o,s,"");d.value=u,this.id3Track.addCue(d)}}}}},e}(Nt),Se=Ae,Le=function(){function t(e){U(this,t),this.alpha_=e?Math.exp(Math.log(.5)/e):0,this.estimate_=0,this.totalWeight_=0}return t.prototype.sample=function(t,e){var r=Math.pow(this.alpha_,t);this.estimate_=e*(1-r)+r*this.estimate_,this.totalWeight_+=t},t.prototype.getTotalWeight=function(){return this.totalWeight_},t.prototype.getEstimate=function(){if(this.alpha_){var t=1-Math.pow(this.alpha_,this.totalWeight_);return this.estimate_/t}return this.estimate_},t}(),_e=Le,we=function(){function t(e,r,i,a){B(this,t),this.hls=e,this.defaultEstimate_=a,this.minWeight_=.001,this.minDelayMs_=50,this.slow_=new _e(r),this.fast_=new _e(i)}return t.prototype.sample=function(t,e){t=Math.max(t,this.minDelayMs_);var r=8e3*e/t,i=t/1e3;this.fast_.sample(i,r),this.slow_.sample(i,r)},t.prototype.canEstimate=function(){var t=this.fast_;return t&&t.getTotalWeight()>=this.minWeight_},t.prototype.getEstimate=function(){return this.canEstimate()?Math.min(this.fast_.getEstimate(),this.slow_.getEstimate()):this.defaultEstimate_},t.prototype.destroy=function(){},t}(),De=we,Ie=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),ke=function(t){function e(r){G(this,e);var i=j(this,t.call(this,r,Ot.a.FRAG_LOADING,Ot.a.FRAG_LOADED,Ot.a.FRAG_BUFFERED,Ot.a.ERROR));return i.lastLoadedFragLevel=0,i._nextAutoLevel=-1,i.hls=r,i.timer=null,i._bwEstimator=null,i.onCheck=i._abandonRulesCheck.bind(i),i}return H(e,t),e.prototype.destroy=function(){this.clearTimer(),Nt.prototype.destroy.call(this)},e.prototype.onFragLoading=function(t){var e=t.frag;if("main"===e.type){if(this.timer||(this.timer=setInterval(this.onCheck,100)),!this._bwEstimator){var r=this.hls,i=t.frag.level,a=r.levels[i].details.live,n=r.config,o=void 0,s=void 0;a?(o=n.abrEwmaFastLive,s=n.abrEwmaSlowLive):(o=n.abrEwmaFastVoD,s=n.abrEwmaSlowVoD),this._bwEstimator=new De(r,s,o,n.abrEwmaDefaultEstimate)}this.fragCurrent=e}},e.prototype._abandonRulesCheck=function(){var t=this.hls,e=t.media,r=this.fragCurrent,i=r.loader,a=t.minAutoLevel;if(!i||i.stats&&i.stats.aborted)return Pt.b.warn("frag loader destroy or aborted, disarm abandonRules"),this.clearTimer(),void(this._nextAutoLevel=-1);var n=i.stats;if(e&&n&&(!e.paused&&0!==e.playbackRate||!e.readyState)&&r.autoLevel&&r.level){var o=performance.now()-n.trequest,s=Math.abs(e.playbackRate);if(o>500*r.duration/s){var l=t.levels,u=Math.max(1,n.bw?n.bw/8:1e3*n.loaded/o),d=l[r.level],h=d.realBitrate?Math.max(d.realBitrate,d.bitrate):d.bitrate,c=n.total?n.total:Math.max(n.loaded,Math.round(r.duration*h/8)),f=e.currentTime,p=(c-n.loaded)/u,g=(ae.bufferInfo(e,f,t.config.maxBufferHole).end-f)/s;if(g<2*r.duration/s&&p>g){var v=void 0,y=void 0;for(y=r.level-1;y>a;y--){var m=l[y].realBitrate?Math.max(l[y].realBitrate,l[y].bitrate):l[y].bitrate;if((v=r.duration*m/(6.4*u))<g)break}v<p&&(Pt.b.warn("loading too slow, abort fragment loading and switch to level "+y+":fragLoadedDelay["+y+"]<fragLoadedDelay["+(r.level-1)+"];bufferStarvationDelay:"+v.toFixed(1)+"<"+p.toFixed(1)+":"+g.toFixed(1)),t.nextLoadLevel=y,this._bwEstimator.sample(o,n.loaded),i.abort(),this.clearTimer(),t.trigger(Ot.a.FRAG_LOAD_EMERGENCY_ABORTED,{frag:r,stats:n}))}}}},e.prototype.onFragLoaded=function(t){var e=t.frag;if("main"===e.type&&!isNaN(e.sn)){if(this.clearTimer(),this.lastLoadedFragLevel=e.level,this._nextAutoLevel=-1,this.hls.config.abrMaxWithRealBitrate){var r=this.hls.levels[e.level],i=(r.loaded?r.loaded.bytes:0)+t.stats.loaded,a=(r.loaded?r.loaded.duration:0)+t.frag.duration;r.loaded={bytes:i,duration:a},r.realBitrate=Math.round(8*i/a)}if(t.frag.bitrateTest){var n=t.stats;n.tparsed=n.tbuffered=n.tload,this.onFragBuffered(t)}}},e.prototype.onFragBuffered=function(t){var e=t.stats,r=t.frag;if(!(!0===e.aborted||1!==r.loadCounter||"main"!==r.type||isNaN(r.sn)||r.bitrateTest&&e.tload!==e.tbuffered)){var i=e.tparsed-e.trequest;Pt.b.log("latency/loading/parsing/append/kbps:"+Math.round(e.tfirst-e.trequest)+"/"+Math.round(e.tload-e.tfirst)+"/"+Math.round(e.tparsed-e.tload)+"/"+Math.round(e.tbuffered-e.tparsed)+"/"+Math.round(8*e.loaded/(e.tbuffered-e.trequest))),this._bwEstimator.sample(i,e.loaded),e.bwEstimate=this._bwEstimator.getEstimate(),r.bitrateTest?this.bitrateTestDelay=i/1e3:this.bitrateTestDelay=0}},e.prototype.onError=function(t){switch(t.details){case Ct.a.FRAG_LOAD_ERROR:case Ct.a.FRAG_LOAD_TIMEOUT:this.clearTimer()}},e.prototype.clearTimer=function(){clearInterval(this.timer),this.timer=null},e.prototype._findBestLevel=function(t,e,r,i,a,n,o,s,l){for(var u=a;u>=i;u--){var d=l[u],h=d.details,c=h?h.totalduration/h.fragments.length:e,f=!!h&&h.live,p=void 0;p=u<=t?o*r:s*r;var g=l[u].realBitrate?Math.max(l[u].realBitrate,l[u].bitrate):l[u].bitrate,v=g*c/p;if(Pt.b.trace("level/adjustedbw/bitrate/avgDuration/maxFetchDuration/fetchDuration: "+u+"/"+Math.round(p)+"/"+g+"/"+c+"/"+n+"/"+v),p>g&&(!v||f&&!this.bitrateTestDelay||v<n))return u}return-1},Ie(e,[{key:"nextAutoLevel",get:function(){var t=this._nextAutoLevel,e=this._bwEstimator;if(!(-1===t||e&&e.canEstimate()))return t;var r=this._nextABRAutoLevel;return-1!==t&&(r=Math.min(t,r)),r},set:function(t){this._nextAutoLevel=t}},{key:"_nextABRAutoLevel",get:function(){var t=this.hls,e=t.maxAutoLevel,r=t.levels,i=t.config,a=t.minAutoLevel,n=t.media,o=this.lastLoadedFragLevel,s=this.fragCurrent?this.fragCurrent.duration:0,l=n?n.currentTime:0,u=n&&0!==n.playbackRate?Math.abs(n.playbackRate):1,d=this._bwEstimator?this._bwEstimator.getEstimate():i.abrEwmaDefaultEstimate,h=(ae.bufferInfo(n,l,i.maxBufferHole).end-l)/u,c=this._findBestLevel(o,s,d,a,e,h,i.abrBandWidthFactor,i.abrBandWidthUpFactor,r);if(c>=0)return c;Pt.b.trace("rebuffering expected to happen, lets try to find a quality level minimizing the rebuffering");var f=s?Math.min(s,i.maxStarvationDelay):i.maxStarvationDelay,p=i.abrBandWidthFactor,g=i.abrBandWidthUpFactor;if(0===h){var v=this.bitrateTestDelay;if(v){f=(s?Math.min(s,i.maxLoadingDelay):i.maxLoadingDelay)-v,Pt.b.trace("bitrate test took "+Math.round(1e3*v)+"ms, set first fragment max fetchDuration to "+Math.round(1e3*f)+" ms"),p=g=1}}return c=this._findBestLevel(o,s,d,a,e,h+f,p,g,r),Math.max(c,0)}}]),e}(Nt),Oe=ke,Ce=y(),Pe=function(t){function e(r){K(this,e);var i=W(this,t.call(this,r,Ot.a.MEDIA_ATTACHING,Ot.a.MEDIA_DETACHING,Ot.a.MANIFEST_PARSED,Ot.a.BUFFER_RESET,Ot.a.BUFFER_APPENDING,Ot.a.BUFFER_CODECS,Ot.a.BUFFER_EOS,Ot.a.BUFFER_FLUSHING,Ot.a.LEVEL_PTS_UPDATED,Ot.a.LEVEL_UPDATED));return i._msDuration=null,i._levelDuration=null,i._live=null,i._objectUrl=null,i.onsbue=i.onSBUpdateEnd.bind(i),i.onsbe=i.onSBUpdateError.bind(i),i.pendingTracks={},i.tracks={},i}return V(e,t),e.prototype.destroy=function(){Nt.prototype.destroy.call(this)},e.prototype.onLevelPtsUpdated=function(t){var e=t.type,r=this.tracks.audio;if("audio"===e&&r&&"audio/mpeg"===r.container){var i=this.sourceBuffer.audio;if(Math.abs(i.timestampOffset-t.start)>.1){var a=i.updating;try{i.abort()}catch(t){a=!0,Pt.b.warn("can not abort audio buffer: "+t)}a?this.audioTimestampOffset=t.start:(Pt.b.warn("change mpeg audio timestamp offset from "+i.timestampOffset+" to "+t.start),i.timestampOffset=t.start)}}},e.prototype.onManifestParsed=function(t){var e=t.audio,r=t.video||t.levels.length&&t.audio,i=0;t.altAudio&&(e||r)&&(i=(e?1:0)+(r?1:0),Pt.b.log(i+" sourceBuffer(s) expected")),this.sourceBufferNb=i},e.prototype.onMediaAttaching=function(t){var e=this.media=t.media;if(e){var r=this.mediaSource=new Ce;this.onmso=this.onMediaSourceOpen.bind(this),this.onmse=this.onMediaSourceEnded.bind(this),this.onmsc=this.onMediaSourceClose.bind(this),r.addEventListener("sourceopen",this.onmso),r.addEventListener("sourceended",this.onmse),r.addEventListener("sourceclose",this.onmsc),e.src=URL.createObjectURL(r),this._objectUrl=e.src}},e.prototype.onMediaDetaching=function(){Pt.b.log("media source detaching");var t=this.mediaSource;if(t){if("open"===t.readyState)try{t.endOfStream()}catch(t){Pt.b.warn("onMediaDetaching:"+t.message+" while calling endOfStream")}t.removeEventListener("sourceopen",this.onmso),t.removeEventListener("sourceended",this.onmse),t.removeEventListener("sourceclose",this.onmsc),this.media&&(URL.revokeObjectURL(this._objectUrl),this.media.src===this._objectUrl?(this.media.removeAttribute("src"),this.media.load()):Pt.b.warn("media.src was changed by a third party - skip cleanup")),this.mediaSource=null,this.media=null,this._objectUrl=null,this.pendingTracks={},this.tracks={},this.sourceBuffer={},this.flushRange=[],this.segments=[],this.appended=0}this.onmso=this.onmse=this.onmsc=null,this.hls.trigger(Ot.a.MEDIA_DETACHED)},e.prototype.onMediaSourceOpen=function(){Pt.b.log("media source opened"),this.hls.trigger(Ot.a.MEDIA_ATTACHED,{media:this.media});var t=this.mediaSource;t&&t.removeEventListener("sourceopen",this.onmso),this.checkPendingTracks()},e.prototype.checkPendingTracks=function(){var t=this.pendingTracks,e=Object.keys(t).length;e&&(this.sourceBufferNb<=e||0===this.sourceBufferNb)&&(this.createSourceBuffers(t),this.pendingTracks={},this.doAppending())},e.prototype.onMediaSourceClose=function(){Pt.b.log("media source closed")},e.prototype.onMediaSourceEnded=function(){Pt.b.log("media source ended")},e.prototype.onSBUpdateEnd=function(){if(this.audioTimestampOffset){var t=this.sourceBuffer.audio;Pt.b.warn("change mpeg audio timestamp offset from "+t.timestampOffset+" to "+this.audioTimestampOffset),t.timestampOffset=this.audioTimestampOffset,delete this.audioTimestampOffset}this._needsFlush&&this.doFlush(),this._needsEos&&this.checkEos(),this.appending=!1;var e=this.parent,r=this.segments.reduce(function(t,r){return r.parent===e?t+1:t},0);this.hls.trigger(Ot.a.BUFFER_APPENDED,{parent:e,pending:r}),this._needsFlush||this.doAppending(),this.updateMediaElementDuration()},e.prototype.onSBUpdateError=function(t){Pt.b.error("sourceBuffer error:",t),this.hls.trigger(Ot.a.ERROR,{type:Ct.b.MEDIA_ERROR,details:Ct.a.BUFFER_APPENDING_ERROR,fatal:!1})},e.prototype.onBufferReset=function(){var t=this.sourceBuffer;for(var e in t){var r=t[e];try{this.mediaSource.removeSourceBuffer(r),r.removeEventListener("updateend",this.onsbue),r.removeEventListener("error",this.onsbe)}catch(t){}}this.sourceBuffer={},this.flushRange=[],this.segments=[],this.appended=0},e.prototype.onBufferCodecs=function(t){if(0===Object.keys(this.sourceBuffer).length){for(var e in t)this.pendingTracks[e]=t[e];var r=this.mediaSource;r&&"open"===r.readyState&&this.checkPendingTracks()}},e.prototype.createSourceBuffers=function(t){var e=this.sourceBuffer,r=this.mediaSource;for(var i in t)if(!e[i]){var a=t[i],n=a.levelCodec||a.codec,o=a.container+";codecs="+n;Pt.b.log("creating sourceBuffer("+o+")");try{var s=e[i]=r.addSourceBuffer(o);s.addEventListener("updateend",this.onsbue),s.addEventListener("error",this.onsbe),this.tracks[i]={codec:n,container:a.container},a.buffer=s}catch(t){Pt.b.error("error while trying to add sourceBuffer:"+t.message),this.hls.trigger(Ot.a.ERROR,{type:Ct.b.MEDIA_ERROR,details:Ct.a.BUFFER_ADD_CODEC_ERROR,fatal:!1,err:t,mimeType:o})}}this.hls.trigger(Ot.a.BUFFER_CREATED,{tracks:t})},e.prototype.onBufferAppending=function(t){this._needsFlush||(this.segments?this.segments.push(t):this.segments=[t],this.doAppending())},e.prototype.onBufferAppendFail=function(t){Pt.b.error("sourceBuffer error:",t.event),this.hls.trigger(Ot.a.ERROR,{type:Ct.b.MEDIA_ERROR,details:Ct.a.BUFFER_APPENDING_ERROR,fatal:!1})},e.prototype.onBufferEos=function(t){var e=this.sourceBuffer,r=t.type;for(var i in e)r&&i!==r||e[i].ended||(e[i].ended=!0,Pt.b.log(i+" sourceBuffer now EOS"));this.checkEos()},e.prototype.checkEos=function(){var t=this.sourceBuffer,e=this.mediaSource;if(!e||"open"!==e.readyState)return void(this._needsEos=!1);for(var r in t){var i=t[r];if(!i.ended)return;if(i.updating)return void(this._needsEos=!0)}Pt.b.log("all media data available, signal endOfStream() to MediaSource and stop loading fragment");try{e.endOfStream()}catch(t){Pt.b.warn("exception while calling mediaSource.endOfStream()")}this._needsEos=!1},e.prototype.onBufferFlushing=function(t){this.flushRange.push({start:t.startOffset,end:t.endOffset,type:t.type}),this.flushBufferCounter=0,this.doFlush()},e.prototype.onLevelUpdated=function(t){var e=t.details;e.fragments.length>0&&(this._levelDuration=e.totalduration+e.fragments[0].start,this._live=e.live,this.updateMediaElementDuration())},e.prototype.updateMediaElementDuration=function(){var t=this.hls.config,e=void 0;if(null!==this._levelDuration&&this.media&&this.mediaSource&&this.sourceBuffer&&0!==this.media.readyState&&"open"===this.mediaSource.readyState){for(var r in this.sourceBuffer)if(!0===this.sourceBuffer[r].updating)return;e=this.media.duration,null===this._msDuration&&(this._msDuration=this.mediaSource.duration),!0===this._live&&!0===t.liveDurationInfinity?(Pt.b.log("Media Source duration is set to Infinity"),this._msDuration=this.mediaSource.duration=1/0):(this._levelDuration>this._msDuration&&this._levelDuration>e||e===1/0||isNaN(e))&&(Pt.b.log("Updating Media Source duration to "+this._levelDuration.toFixed(3)),this._msDuration=this.mediaSource.duration=this._levelDuration)}},e.prototype.doFlush=function(){for(;this.flushRange.length;){var t=this.flushRange[0];if(!this.flushBuffer(t.start,t.end,t.type))return void(this._needsFlush=!0);this.flushRange.shift(),this.flushBufferCounter=0}if(0===this.flushRange.length){this._needsFlush=!1;var e=0,r=this.sourceBuffer;try{for(var i in r)e+=r[i].buffered.length}catch(t){Pt.b.error("error while accessing sourceBuffer.buffered")}this.appended=e,this.hls.trigger(Ot.a.BUFFER_FLUSHED)}},e.prototype.doAppending=function(){var t=this.hls,e=this.sourceBuffer,r=this.segments;if(Object.keys(e).length){if(this.media.error)return this.segments=[],void Pt.b.error("trying to append although a media error occured, flush segment and abort");if(this.appending)return;if(r&&r.length){var i=r.shift();try{var a=i.type,n=e[a];n?n.updating?r.unshift(i):(n.ended=!1,this.parent=i.parent,n.appendBuffer(i.data),this.appendError=0,this.appended++,this.appending=!0):this.onSBUpdateEnd()}catch(e){Pt.b.error("error while trying to append buffer:"+e.message),r.unshift(i);var o={type:Ct.b.MEDIA_ERROR,parent:i.parent};if(22===e.code)return this.segments=[],o.details=Ct.a.BUFFER_FULL_ERROR,o.fatal=!1,void t.trigger(Ot.a.ERROR,o);if(this.appendError?this.appendError++:this.appendError=1,o.details=Ct.a.BUFFER_APPEND_ERROR,this.appendError>t.config.appendErrorMaxRetry)return Pt.b.log("fail "+t.config.appendErrorMaxRetry+" times to append segment in sourceBuffer"),r=[],o.fatal=!0,void t.trigger(Ot.a.ERROR,o);o.fatal=!1,t.trigger(Ot.a.ERROR,o)}}}},e.prototype.flushBuffer=function(t,e,r){var i,a,n,o,s,l,u=this.sourceBuffer;if(Object.keys(u).length){if(Pt.b.log("flushBuffer,pos/start/end: "+this.media.currentTime.toFixed(3)+"/"+t+"/"+e),this.flushBufferCounter<this.appended){for(var d in u)if(!r||d===r){if(i=u[d],i.ended=!1,i.updating)return Pt.b.warn("cannot flush, sb updating in progress"),!1;try{for(a=0;a<i.buffered.length;a++)if(n=i.buffered.start(a),o=i.buffered.end(a),-1!==navigator.userAgent.toLowerCase().indexOf("firefox")&&e===Number.POSITIVE_INFINITY?(s=t,l=e):(s=Math.max(n,t),l=Math.min(o,e)),Math.min(l,o)-s>.5)return this.flushBufferCounter++,Pt.b.log("flush "+d+" ["+s+","+l+"], of ["+n+","+o+"], pos:"+this.media.currentTime),i.remove(s,l),!1}catch(t){Pt.b.warn("exception while accessing sourcebuffer, it might have been removed from MediaSource")}}}else Pt.b.warn("abort flushing too many retries");Pt.b.log("buffer flushed")}return!0},e}(Nt),xe=Pe,Fe=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),Ne=function(t){function e(r){return Y(this,e),z(this,t.call(this,r,Ot.a.FPS_DROP_LEVEL_CAPPING,Ot.a.MEDIA_ATTACHING,Ot.a.MANIFEST_PARSED))}return X(e,t),e.prototype.destroy=function(){this.hls.config.capLevelToPlayerSize&&(this.media=this.restrictedLevels=null,this.autoLevelCapping=Number.POSITIVE_INFINITY,this.timer&&(this.timer=clearInterval(this.timer)))},e.prototype.onFpsDropLevelCapping=function(t){e.isLevelAllowed(t.droppedLevel,this.restrictedLevels)&&this.restrictedLevels.push(t.droppedLevel)},e.prototype.onMediaAttaching=function(t){this.media=t.media instanceof HTMLVideoElement?t.media:null},e.prototype.onManifestParsed=function(t){var e=this.hls;this.restrictedLevels=[],e.config.capLevelToPlayerSize&&(this.autoLevelCapping=Number.POSITIVE_INFINITY,this.levels=t.levels,e.firstLevel=this.getMaxLevel(t.firstLevel),clearInterval(this.timer),this.timer=setInterval(this.detectPlayerSize.bind(this),1e3),this.detectPlayerSize())},e.prototype.detectPlayerSize=function(){if(this.media){var t=this.levels?this.levels.length:0;if(t){var e=this.hls;e.autoLevelCapping=this.getMaxLevel(t-1),e.autoLevelCapping>this.autoLevelCapping&&e.streamController.nextLevelSwitch(),this.autoLevelCapping=e.autoLevelCapping}}},e.prototype.getMaxLevel=function(t){var r=this;if(!this.levels)return-1;var i=this.levels.filter(function(i,a){return e.isLevelAllowed(a,r.restrictedLevels)&&a<=t});return e.getMaxLevelByMediaSize(i,this.mediaWidth,this.mediaHeight)},e.isLevelAllowed=function(t){return-1===(arguments.length>1&&void 0!==arguments[1]?arguments[1]:[]).indexOf(t)},e.getMaxLevelByMediaSize=function(t,e,r){if(!t||t&&!t.length)return-1;for(var i=t.length-1,a=0;a<t.length;a+=1){var n=t[a];if((n.width>=e||n.height>=r)&&function(t,e){return!e||(t.width!==e.width||t.height!==e.height)}(n,t[a+1])){i=a;break}}return i},Fe(e,[{key:"mediaWidth",get:function(){var t=void 0,r=this.media;return r&&(t=r.width||r.clientWidth||r.offsetWidth,t*=e.contentScaleFactor),t}},{key:"mediaHeight",get:function(){var t=void 0,r=this.media;return r&&(t=r.height||r.clientHeight||r.offsetHeight,t*=e.contentScaleFactor),t}}],[{key:"contentScaleFactor",get:function(){var t=1;try{t=window.devicePixelRatio}catch(t){}return t}}]),e}(Nt),Me=Ne,Ue=function(t){function e(r){return q(this,e),Q(this,t.call(this,r,Ot.a.MEDIA_ATTACHING))}return J(e,t),e.prototype.destroy=function(){this.timer&&clearInterval(this.timer),this.isVideoPlaybackQualityAvailable=!1},e.prototype.onMediaAttaching=function(t){var e=this.hls.config;if(e.capLevelOnFPSDrop){"function"==typeof(this.video=t.media instanceof HTMLVideoElement?t.media:null).getVideoPlaybackQuality&&(this.isVideoPlaybackQualityAvailable=!0),clearInterval(this.timer),this.timer=setInterval(this.checkFPSInterval.bind(this),e.fpsDroppedMonitoringPeriod)}},e.prototype.checkFPS=function(t,e,r){var i=performance.now();if(e){if(this.lastTime){var a=i-this.lastTime,n=r-this.lastDroppedFrames,o=e-this.lastDecodedFrames,s=1e3*n/a,l=this.hls;if(l.trigger(Ot.a.FPS_DROP,{currentDropped:n,currentDecoded:o,totalDroppedFrames:r}),s>0&&n>l.config.fpsDroppedMonitoringThreshold*o){var u=l.currentLevel;Pt.b.warn("drop FPS ratio greater than max allowed value for currentLevel: "+u),u>0&&(-1===l.autoLevelCapping||l.autoLevelCapping>=u)&&(u-=1,l.trigger(Ot.a.FPS_DROP_LEVEL_CAPPING,{level:u,droppedLevel:l.currentLevel}),l.autoLevelCapping=u,l.streamController.nextLevelSwitch())}}this.lastTime=i,this.lastDroppedFrames=r,this.lastDecodedFrames=e}},e.prototype.checkFPSInterval=function(){var t=this.video;if(t)if(this.isVideoPlaybackQualityAvailable){var e=t.getVideoPlaybackQuality();this.checkFPS(t,e.totalVideoFrames,e.droppedVideoFrames)}else this.checkFPS(t,t.webkitDecodedFrameCount,t.webkitDroppedFrameCount)},e}(Nt),Be=Ue,Ge=function(){function t(e){$(this,t),e&&e.xhrSetup&&(this.xhrSetup=e.xhrSetup)}return t.prototype.destroy=function(){this.abort(),this.loader=null},t.prototype.abort=function(){var t=this.loader;t&&4!==t.readyState&&(this.stats.aborted=!0,t.abort()),window.clearTimeout(this.requestTimeout),this.requestTimeout=null,window.clearTimeout(this.retryTimeout),this.retryTimeout=null},t.prototype.load=function(t,e,r){this.context=t,this.config=e,this.callbacks=r,this.stats={trequest:performance.now(),retry:0},this.retryDelay=e.retryDelay,this.loadInternal()},t.prototype.loadInternal=function(){var t,e=this.context;t=this.loader=new XMLHttpRequest;var r=this.stats;r.tfirst=0,r.loaded=0;var i=this.xhrSetup;try{if(i)try{i(t,e.url)}catch(r){t.open("GET",e.url,!0),i(t,e.url)}t.readyState||t.open("GET",e.url,!0)}catch(r){return void this.callbacks.onError({code:t.status,text:r.message},e,t)}e.rangeEnd&&t.setRequestHeader("Range","bytes="+e.rangeStart+"-"+(e.rangeEnd-1)),t.onreadystatechange=this.readystatechange.bind(this),t.onprogress=this.loadprogress.bind(this),t.responseType=e.responseType,this.requestTimeout=window.setTimeout(this.loadtimeout.bind(this),this.config.timeout),t.send()},t.prototype.readystatechange=function(t){var e=t.currentTarget,r=e.readyState,i=this.stats,a=this.context,n=this.config;if(!i.aborted&&r>=2)if(window.clearTimeout(this.requestTimeout),0===i.tfirst&&(i.tfirst=Math.max(performance.now(),i.trequest)),4===r){var o=e.status;if(o>=200&&o<300){i.tload=Math.max(i.tfirst,performance.now());var s=void 0,l=void 0;"arraybuffer"===a.responseType?(s=e.response,l=s.byteLength):(s=e.responseText,l=s.length),i.loaded=i.total=l;var u={url:e.responseURL,data:s};this.callbacks.onSuccess(u,i,a,e)}else i.retry>=n.maxRetry||o>=400&&o<499?(Pt.b.error(o+" while loading "+a.url),this.callbacks.onError({code:o,text:e.statusText},a,e)):(Pt.b.warn(o+" while loading "+a.url+", retrying in "+this.retryDelay+"..."),this.destroy(),this.retryTimeout=window.setTimeout(this.loadInternal.bind(this),this.retryDelay),this.retryDelay=Math.min(2*this.retryDelay,n.maxRetryDelay),i.retry++)}else this.requestTimeout=window.setTimeout(this.loadtimeout.bind(this),n.timeout)},t.prototype.loadtimeout=function(){Pt.b.warn("timeout while loading "+this.context.url),this.callbacks.onTimeout(this.stats,this.context,null)},t.prototype.loadprogress=function(t){var e=t.currentTarget,r=this.stats;r.loaded=t.loaded,t.lengthComputable&&(r.total=t.total);var i=this.callbacks.onProgress;i&&i(r,this.context,null,e)},t}(),je=Ge,He=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),Ke=function(t){function e(r){Z(this,e);var i=tt(this,t.call(this,r,Ot.a.MANIFEST_LOADING,Ot.a.MANIFEST_PARSED,Ot.a.AUDIO_TRACK_LOADED,Ot.a.ERROR));return i.ticks=0,i.ontick=i.tick.bind(i),i}return et(e,t),e.prototype.destroy=function(){this.cleanTimer(),Nt.prototype.destroy.call(this)},e.prototype.cleanTimer=function(){this.timer&&(clearTimeout(this.timer),this.timer=null)},e.prototype.tick=function(){1===++this.ticks&&(this.doTick(),this.ticks>1&&setTimeout(this.tick,1),this.ticks=0)},e.prototype.doTick=function(){this.updateTrack(this.trackId)},e.prototype.onError=function(t){t.fatal&&t.type===Ct.b.NETWORK_ERROR&&this.cleanTimer()},e.prototype.onManifestLoading=function(){this.tracks=[],this.trackId=-1},e.prototype.onManifestParsed=function(t){var e=this,r=t.audioTracks||[],i=!1;this.tracks=r,this.hls.trigger(Ot.a.AUDIO_TRACKS_UPDATED,{audioTracks:r});var a=0;r.forEach(function(t){if(t.default&&!i)return e.audioTrack=a,void(i=!0);a++}),!1===i&&r.length&&(Pt.b.log("no default audio track defined, use first audio track as default"),this.audioTrack=0)},e.prototype.onAudioTrackLoaded=function(t){t.id<this.tracks.length&&(Pt.b.log("audioTrack "+t.id+" loaded"),this.tracks[t.id].details=t.details,t.details.live&&!this.timer&&(this.timer=setInterval(this.ontick,1e3*t.details.targetduration)),!t.details.live&&this.timer&&this.cleanTimer())},e.prototype.setAudioTrackInternal=function(t){if(t>=0&&t<this.tracks.length){this.cleanTimer(),this.trackId=t,Pt.b.log("switching to audioTrack "+t);var e=this.tracks[t],r=this.hls,i=e.type,a=e.url,n={id:t,type:i,url:a};r.trigger(Ot.a.AUDIO_TRACK_SWITCH,n),r.trigger(Ot.a.AUDIO_TRACK_SWITCHING,n);var o=e.details;!a||void 0!==o&&!0!==o.live||(Pt.b.log("(re)loading playlist for audioTrack "+t),r.trigger(Ot.a.AUDIO_TRACK_LOADING,{url:a,id:t}))}},e.prototype.updateTrack=function(t){if(t>=0&&t<this.tracks.length){this.cleanTimer(),this.trackId=t,Pt.b.log("updating audioTrack "+t);var e=this.tracks[t],r=e.url,i=e.details;!r||void 0!==i&&!0!==i.live||(Pt.b.log("(re)loading playlist for audioTrack "+t),this.hls.trigger(Ot.a.AUDIO_TRACK_LOADING,{url:r,id:t}))}},He(e,[{key:"audioTracks",get:function(){return this.tracks}},{key:"audioTrack",get:function(){return this.trackId},set:function(t){this.trackId===t&&void 0!==this.tracks[t].details||this.setAudioTrackInternal(t)}}]),e}(Nt),We=Ke,Ve=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),Ye={STOPPED:"STOPPED",STARTING:"STARTING",IDLE:"IDLE",PAUSED:"PAUSED",KEY_LOADING:"KEY_LOADING",FRAG_LOADING:"FRAG_LOADING",FRAG_LOADING_WAITING_RETRY:"FRAG_LOADING_WAITING_RETRY",WAITING_TRACK:"WAITING_TRACK",PARSING:"PARSING",PARSED:"PARSED",BUFFER_FLUSHING:"BUFFER_FLUSHING",ENDED:"ENDED",ERROR:"ERROR",WAITING_INIT_PTS:"WAITING_INIT_PTS"},ze=function(t){function e(r){rt(this,e);var i=it(this,t.call(this,r,Ot.a.MEDIA_ATTACHED,Ot.a.MEDIA_DETACHING,Ot.a.AUDIO_TRACKS_UPDATED,Ot.a.AUDIO_TRACK_SWITCHING,Ot.a.AUDIO_TRACK_LOADED,Ot.a.KEY_LOADED,Ot.a.FRAG_LOADED,Ot.a.FRAG_PARSING_INIT_SEGMENT,Ot.a.FRAG_PARSING_DATA,Ot.a.FRAG_PARSED,Ot.a.ERROR,Ot.a.BUFFER_RESET,Ot.a.BUFFER_CREATED,Ot.a.BUFFER_APPENDED,Ot.a.BUFFER_FLUSHED,Ot.a.INIT_PTS_FOUND));return i.config=r.config,i.audioCodecSwap=!1,i.ticks=0,i._state=Ye.STOPPED,i.ontick=i.tick.bind(i),i.initPTS=[],i.waitingFragment=null,i.videoTrackCC=null,i}return at(e,t),e.prototype.destroy=function(){this.stopLoad(),this.timer&&(clearInterval(this.timer),this.timer=null),Nt.prototype.destroy.call(this),this.state=Ye.STOPPED},e.prototype.onInitPtsFound=function(t){var e=t.id,r=t.frag.cc,i=t.initPTS;"main"===e&&(this.initPTS[r]=i,this.videoTrackCC=r,Pt.b.log("InitPTS for cc:"+r+" found from video track:"+i),this.state===Ye.WAITING_INIT_PTS&&this.tick())},e.prototype.startLoad=function(t){if(this.tracks){var e=this.lastCurrentTime;this.stopLoad(),this.timer||(this.timer=setInterval(this.ontick,100)),this.fragLoadError=0,e>0&&-1===t?(Pt.b.log("audio:override startPosition with lastCurrentTime @"+e.toFixed(3)),this.state=Ye.IDLE):(this.lastCurrentTime=this.startPosition?this.startPosition:t,this.state=Ye.STARTING),this.nextLoadPosition=this.startPosition=this.lastCurrentTime,this.tick()}else this.startPosition=t,this.state=Ye.STOPPED},e.prototype.stopLoad=function(){var t=this.fragCurrent;t&&(t.loader&&t.loader.abort(),this.fragCurrent=null),this.fragPrevious=null,this.demuxer&&(this.demuxer.destroy(),this.demuxer=null),this.state=Ye.STOPPED},e.prototype.tick=function(){1===++this.ticks&&(this.doTick(),this.ticks>1&&setTimeout(this.tick,1),this.ticks=0)},e.prototype.doTick=function(){var t,e,r,i=this.hls,a=i.config;switch(this.state){case Ye.ERROR:case Ye.PAUSED:case Ye.BUFFER_FLUSHING:break;case Ye.STARTING:this.state=Ye.WAITING_TRACK,this.loadedmetadata=!1;break;case Ye.IDLE:var n=this.tracks;if(!n)break;if(!this.media&&(this.startFragRequested||!a.startFragPrefetch))break;if(this.loadedmetadata)t=this.media.currentTime;else if(void 0===(t=this.nextLoadPosition))break;var o=this.mediaBuffer?this.mediaBuffer:this.media,s=this.videoBuffer?this.videoBuffer:this.media,l=ae.bufferInfo(o,t,a.maxBufferHole),u=ae.bufferInfo(s,t,a.maxBufferHole),d=l.len,h=l.end,c=this.fragPrevious,f=Math.max(a.maxBufferLength,u.len),p=this.audioSwitch,g=this.trackId;if((d<f||p)&&g<n.length){if(void 0===(r=n[g].details)){this.state=Ye.WAITING_TRACK;break}if(!p&&!r.live&&c&&c.sn===r.endSN&&!l.nextStart&&(!this.media.seeking||this.media.duration-h<c.duration/2)){this.hls.trigger(Ot.a.BUFFER_EOS,{type:"audio"}),this.state=Ye.ENDED;break}var v=r.fragments,y=v.length,m=v[0].start,b=v[y-1].start+v[y-1].duration,E=void 0;if(p)if(r.live&&!r.PTSKnown)Pt.b.log("switching audiotrack, live stream, unknown PTS,load first fragment"),h=0;else if(h=t,r.PTSKnown&&t<m){if(!(l.end>m||l.nextStart))return;Pt.b.log("alt audio track ahead of main track, seek to start of alt audio track"),this.media.currentTime=m+.05}if(r.initSegment&&!r.initSegment.data)E=r.initSegment;else if(h<=m){if(E=v[0],null!==this.videoTrackCC&&E.cc!==this.videoTrackCC&&(E=A(v,this.videoTrackCC)),r.live&&E.loadIdx&&E.loadIdx===this.fragLoadIdx){var T=l.nextStart?l.nextStart:m;return Pt.b.log("no alt audio available @currentTime:"+this.media.currentTime+", seeking @"+(T+.05)),void(this.media.currentTime=T+.05)}}else{var R=void 0,S=a.maxFragLookUpTolerance,L=c?v[c.sn-v[0].sn+1]:void 0,_=function(t){var e=Math.min(S,t.duration);return t.start+t.duration-e<=h?1:t.start-e>h&&t.start?-1:0};h<b?(h>b-S&&(S=0),R=L&&!_(L)?L:re.search(v,_)):R=v[y-1],R&&(E=R,m=R.start,c&&E.level===c.level&&E.sn===c.sn&&(E.sn<r.endSN?(E=v[E.sn+1-r.startSN],Pt.b.log("SN just loaded, load next one: "+E.sn)):E=null))}if(E)if(E.decryptdata&&null!=E.decryptdata.uri&&null==E.decryptdata.key)Pt.b.log("Loading key for "+E.sn+" of ["+r.startSN+" ,"+r.endSN+"],track "+g),this.state=Ye.KEY_LOADING,i.trigger(Ot.a.KEY_LOADING,{frag:E});else{if(Pt.b.log("Loading "+E.sn+", cc: "+E.cc+" of ["+r.startSN+" ,"+r.endSN+"],track "+g+", currentTime:"+t+",bufferEnd:"+h.toFixed(3)),void 0!==this.fragLoadIdx?this.fragLoadIdx++:this.fragLoadIdx=0,E.loadCounter){E.loadCounter++;var w=a.fragLoadingLoopThreshold;if(E.loadCounter>w&&Math.abs(this.fragLoadIdx-E.loadIdx)<w)return void i.trigger(Ot.a.ERROR,{type:Ct.b.MEDIA_ERROR,details:Ct.a.FRAG_LOOP_LOADING_ERROR,fatal:!1,frag:E})}else E.loadCounter=1;E.loadIdx=this.fragLoadIdx,this.fragCurrent=E,this.startFragRequested=!0,isNaN(E.sn)||(this.nextLoadPosition=E.start+E.duration),i.trigger(Ot.a.FRAG_LOADING,{frag:E}),this.state=Ye.FRAG_LOADING}}break;case Ye.WAITING_TRACK:e=this.tracks[this.trackId],e&&e.details&&(this.state=Ye.IDLE);break;case Ye.FRAG_LOADING_WAITING_RETRY:var D=performance.now(),I=this.retryDate;o=this.media;var k=o&&o.seeking;(!I||D>=I||k)&&(Pt.b.log("audioStreamController: retryDate reached, switch back to IDLE state"),this.state=Ye.IDLE);break;case Ye.WAITING_INIT_PTS:var O=this.videoTrackCC;if(void 0===this.initPTS[O])break;var C=this.waitingFragment;if(C){var P=C.frag.cc;O!==P?(e=this.tracks[this.trackId],e.details&&e.details.live&&(Pt.b.warn("Waiting fragment CC ("+P+") does not match video track CC ("+O+")"),this.waitingFragment=null,this.state=Ye.IDLE)):(this.state=Ye.FRAG_LOADING,this.onFragLoaded(this.waitingFragment),this.waitingFragment=null)}else this.state=Ye.IDLE;break;case Ye.STOPPED:case Ye.FRAG_LOADING:case Ye.PARSING:case Ye.PARSED:case Ye.ENDED:}},e.prototype.onMediaAttached=function(t){var e=this.media=this.mediaBuffer=t.media;this.onvseeking=this.onMediaSeeking.bind(this),this.onvended=this.onMediaEnded.bind(this),e.addEventListener("seeking",this.onvseeking),e.addEventListener("ended",this.onvended);var r=this.config;this.tracks&&r.autoStartLoad&&this.startLoad(r.startPosition)},e.prototype.onMediaDetaching=function(){var t=this.media;t&&t.ended&&(Pt.b.log("MSE detaching and video ended, reset startPosition"),this.startPosition=this.lastCurrentTime=0);var e=this.tracks;e&&e.forEach(function(t){t.details&&t.details.fragments.forEach(function(t){t.loadCounter=void 0})}),t&&(t.removeEventListener("seeking",this.onvseeking),t.removeEventListener("ended",this.onvended),this.onvseeking=this.onvseeked=this.onvended=null),this.media=this.mediaBuffer=this.videoBuffer=null,this.loadedmetadata=!1,this.stopLoad()},e.prototype.onMediaSeeking=function(){this.state===Ye.ENDED&&(this.state=Ye.IDLE),this.media&&(this.lastCurrentTime=this.media.currentTime),void 0!==this.fragLoadIdx&&(this.fragLoadIdx+=2*this.config.fragLoadingLoopThreshold),this.tick()},e.prototype.onMediaEnded=function(){this.startPosition=this.lastCurrentTime=0},e.prototype.onAudioTracksUpdated=function(t){Pt.b.log("audio tracks updated"),this.tracks=t.audioTracks},e.prototype.onAudioTrackSwitching=function(t){var e=!!t.url;this.trackId=t.id,this.fragCurrent=null,this.state=Ye.PAUSED,this.waitingFragment=null,e?this.timer||(this.timer=setInterval(this.ontick,100)):this.demuxer&&(this.demuxer.destroy(),this.demuxer=null),e&&(this.audioSwitch=!0,this.state=Ye.IDLE,void 0!==this.fragLoadIdx&&(this.fragLoadIdx+=2*this.config.fragLoadingLoopThreshold)),this.tick()},e.prototype.onAudioTrackLoaded=function(t){var e=t.details,r=t.id,i=this.tracks[r],a=e.totalduration,n=0;if(Pt.b.log("track "+r+" loaded ["+e.startSN+","+e.endSN+"],duration:"+a),e.live){var o=i.details;o&&e.fragments.length>0?(T(o,e),n=e.fragments[0].start,e.PTSKnown?Pt.b.log("live audio playlist sliding:"+n.toFixed(3)):Pt.b.log("live audio playlist - outdated PTS, unknown sliding")):(e.PTSKnown=!1,Pt.b.log("live audio playlist - first load, unknown sliding"))}else e.PTSKnown=!1;if(i.details=e,!this.startFragRequested){if(-1===this.startPosition){var s=e.startTimeOffset;isNaN(s)?this.startPosition=0:(Pt.b.log("start time offset found in playlist, adjust startPosition to "+s),this.startPosition=s)}this.nextLoadPosition=this.startPosition}this.state===Ye.WAITING_TRACK&&(this.state=Ye.IDLE),this.tick()},e.prototype.onKeyLoaded=function(){this.state===Ye.KEY_LOADING&&(this.state=Ye.IDLE,this.tick())},e.prototype.onFragLoaded=function(t){var e=this.fragCurrent,r=t.frag;if(this.state===Ye.FRAG_LOADING&&e&&"audio"===r.type&&r.level===e.level&&r.sn===e.sn){var i=this.tracks[this.trackId],a=i.details,n=a.totalduration,o=e.level,s=e.sn,l=e.cc,u=this.config.defaultAudioCodec||i.audioCodec||"mp4a.40.2",d=this.stats=t.stats;if("initSegment"===s)this.state=Ye.IDLE,d.tparsed=d.tbuffered=performance.now(),a.initSegment.data=t.payload,this.hls.trigger(Ot.a.FRAG_BUFFERED,{stats:d,frag:e,id:"audio"}),this.tick();else{this.state=Ye.PARSING,this.appended=!1,this.demuxer||(this.demuxer=new ce(this.hls,"audio"));var h=this.initPTS[l],c=a.initSegment?a.initSegment.data:[];if(a.initSegment||void 0!==h){this.pendingBuffering=!0,Pt.b.log("Demuxing "+s+" of ["+a.startSN+" ,"+a.endSN+"],track "+o);this.demuxer.push(t.payload,c,u,null,e,n,!1,h)}else Pt.b.log("unknown video PTS for continuity counter "+l+", waiting for video PTS before demuxing audio frag "+s+" of ["+a.startSN+" ,"+a.endSN+"],track "+o),this.waitingFragment=t,this.state=Ye.WAITING_INIT_PTS}}this.fragLoadError=0},e.prototype.onFragParsingInitSegment=function(t){var e=this.fragCurrent,r=t.frag;if(e&&"audio"===t.id&&r.sn===e.sn&&r.level===e.level&&this.state===Ye.PARSING){var i=t.tracks,a=void 0;if(i.video&&delete i.video,a=i.audio){a.levelCodec=a.codec,a.id=t.id,this.hls.trigger(Ot.a.BUFFER_CODECS,i),Pt.b.log("audio track:audio,container:"+a.container+",codecs[level/parsed]=["+a.levelCodec+"/"+a.codec+"]");var n=a.initSegment;if(n){var o={type:"audio",data:n,parent:"audio",content:"initSegment"};this.audioSwitch?this.pendingData=[o]:(this.appended=!0,this.pendingBuffering=!0,this.hls.trigger(Ot.a.BUFFER_APPENDING,o))}this.tick()}}},e.prototype.onFragParsingData=function(t){var e=this,r=this.fragCurrent,i=t.frag;if(r&&"audio"===t.id&&"audio"===t.type&&i.sn===r.sn&&i.level===r.level&&this.state===Ye.PARSING){var a=this.trackId,n=this.tracks[a],o=this.hls;isNaN(t.endPTS)&&(t.endPTS=t.startPTS+r.duration,t.endDTS=t.startDTS+r.duration),Pt.b.log("parsed "+t.type+",PTS:["+t.startPTS.toFixed(3)+","+t.endPTS.toFixed(3)+"],DTS:["+t.startDTS.toFixed(3)+"/"+t.endDTS.toFixed(3)+"],nb:"+t.nb),E(n.details,r,t.startPTS,t.endPTS);var s=this.audioSwitch,l=this.media,u=!1;if(s&&l)if(l.readyState){var d=l.currentTime;Pt.b.log("switching audio track : currentTime:"+d),d>=t.startPTS&&(Pt.b.log("switching audio track : flushing all audio"),this.state=Ye.BUFFER_FLUSHING,o.trigger(Ot.a.BUFFER_FLUSHING,{startOffset:0,endOffset:Number.POSITIVE_INFINITY,type:"audio"}),u=!0,this.audioSwitch=!1,o.trigger(Ot.a.AUDIO_TRACK_SWITCHED,{id:a}))}else this.audioSwitch=!1,o.trigger(Ot.a.AUDIO_TRACK_SWITCHED,{id:a});var h=this.pendingData;this.audioSwitch||([t.data1,t.data2].forEach(function(e){e&&e.length&&h.push({type:t.type,data:e,parent:"audio",content:"data"})}),!u&&h.length&&(h.forEach(function(t){e.state===Ye.PARSING&&(e.pendingBuffering=!0,e.hls.trigger(Ot.a.BUFFER_APPENDING,t))}),this.pendingData=[],this.appended=!0)),this.tick()}},e.prototype.onFragParsed=function(t){var e=this.fragCurrent,r=t.frag;e&&"audio"===t.id&&r.sn===e.sn&&r.level===e.level&&this.state===Ye.PARSING&&(this.stats.tparsed=performance.now(),this.state=Ye.PARSED,this._checkAppendedParsed())},e.prototype.onBufferReset=function(){this.mediaBuffer=this.videoBuffer=null,this.loadedmetadata=!1},e.prototype.onBufferCreated=function(t){var e=t.tracks.audio;e&&(this.mediaBuffer=e.buffer,this.loadedmetadata=!0),t.tracks.video&&(this.videoBuffer=t.tracks.video.buffer)},e.prototype.onBufferAppended=function(t){if("audio"===t.parent){var e=this.state;e!==Ye.PARSING&&e!==Ye.PARSED||(this.pendingBuffering=t.pending>0,this._checkAppendedParsed())}},e.prototype._checkAppendedParsed=function(){if(!(this.state!==Ye.PARSED||this.appended&&this.pendingBuffering)){var t=this.fragCurrent,e=this.stats,r=this.hls;if(t){this.fragPrevious=t,e.tbuffered=performance.now(),r.trigger(Ot.a.FRAG_BUFFERED,{stats:e,frag:t,id:"audio"});var i=this.mediaBuffer?this.mediaBuffer:this.media;Pt.b.log("audio buffered : "+pe.toString(i.buffered)),this.audioSwitch&&this.appended&&(this.audioSwitch=!1,r.trigger(Ot.a.AUDIO_TRACK_SWITCHED,{id:this.trackId})),this.state=Ye.IDLE}this.tick()}},e.prototype.onError=function(t){var e=t.frag;if(!e||"audio"===e.type)switch(t.details){case Ct.a.FRAG_LOAD_ERROR:case Ct.a.FRAG_LOAD_TIMEOUT:if(!t.fatal){var r=this.fragLoadError;r?r++:r=1;var i=this.config;if(r<=i.fragLoadingMaxRetry){this.fragLoadError=r,e.loadCounter=0;var a=Math.min(Math.pow(2,r-1)*i.fragLoadingRetryDelay,i.fragLoadingMaxRetryTimeout);Pt.b.warn("audioStreamController: frag loading failed, retry in "+a+" ms"),this.retryDate=performance.now()+a,this.state=Ye.FRAG_LOADING_WAITING_RETRY}else Pt.b.error("audioStreamController: "+t.details+" reaches max retry, redispatch as fatal ..."),t.fatal=!0,this.state=Ye.ERROR}break;case Ct.a.FRAG_LOOP_LOADING_ERROR:case Ct.a.AUDIO_TRACK_LOAD_ERROR:case Ct.a.AUDIO_TRACK_LOAD_TIMEOUT:case Ct.a.KEY_LOAD_ERROR:case Ct.a.KEY_LOAD_TIMEOUT:this.state!==Ye.ERROR&&(this.state=t.fatal?Ye.ERROR:Ye.IDLE,Pt.b.warn("audioStreamController: "+t.details+" while loading frag,switch to "+this.state+" state ..."));break;case Ct.a.BUFFER_FULL_ERROR:if("audio"===t.parent&&(this.state===Ye.PARSING||this.state===Ye.PARSED)){var n=this.mediaBuffer,o=this.media.currentTime;if(n&&ae.isBuffered(n,o)&&ae.isBuffered(n,o+.5)){var s=this.config;s.maxMaxBufferLength>=s.maxBufferLength&&(s.maxMaxBufferLength/=2,Pt.b.warn("audio:reduce max buffer length to "+s.maxMaxBufferLength+"s"),this.fragLoadIdx+=2*s.fragLoadingLoopThreshold),this.state=Ye.IDLE}else Pt.b.warn("buffer full error also media.currentTime is not buffered, flush audio buffer"),this.fragCurrent=null,this.state=Ye.BUFFER_FLUSHING,this.hls.trigger(Ot.a.BUFFER_FLUSHING,{startOffset:0,endOffset:Number.POSITIVE_INFINITY,type:"audio"})}}},e.prototype.onBufferFlushed=function(){var t=this,e=this.pendingData;e&&e.length?(Pt.b.log("appending pending audio data on Buffer Flushed"),e.forEach(function(e){t.hls.trigger(Ot.a.BUFFER_APPENDING,e)}),this.appended=!0,this.pendingData=[],this.state=Ye.PARSED):(this.state=Ye.IDLE,this.fragPrevious=null,this.tick())},Ve(e,[{key:"state",set:function(t){if(this.state!==t){var e=this.state;this._state=t,Pt.b.log("audio stream:"+e+"->"+t)}},get:function(){return this._state}}]),e}(Nt),Xe=ze,qe=function(){function t(t){return"string"==typeof t&&(!!n[t.toLowerCase()]&&t.toLowerCase())}function e(t){return"string"==typeof t&&(!!o[t.toLowerCase()]&&t.toLowerCase())}function r(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var i in r)t[i]=r[i]}return t}function i(i,n,o){var s=this,l=function(){if("undefined"!=typeof navigator)return/MSIE\s8\.0/.test(navigator.userAgent)}(),u={};l?s=document.createElement("custom"):u.enumerable=!0,s.hasBeenReset=!1;var d="",h=!1,c=i,f=n,p=o,g=null,v="",y=!0,m="auto",b="start",E=50,T="middle",R=50,A="middle";if(Object.defineProperty(s,"id",r({},u,{get:function(){return d},set:function(t){d=""+t}})),Object.defineProperty(s,"pauseOnExit",r({},u,{get:function(){return h},set:function(t){h=!!t}})),Object.defineProperty(s,"startTime",r({},u,{get:function(){return c},set:function(t){if("number"!=typeof t)throw new TypeError("Start time must be set to a number.");c=t,this.hasBeenReset=!0}})),Object.defineProperty(s,"endTime",r({},u,{get:function(){return f},set:function(t){if("number"!=typeof t)throw new TypeError("End time must be set to a number.");f=t,this.hasBeenReset=!0}})),Object.defineProperty(s,"text",r({},u,{get:function(){return p},set:function(t){p=""+t,this.hasBeenReset=!0}})),Object.defineProperty(s,"region",r({},u,{get:function(){return g},set:function(t){g=t,this.hasBeenReset=!0}})),Object.defineProperty(s,"vertical",r({},u,{get:function(){return v},set:function(e){var r=t(e);if(!1===r)throw new SyntaxError("An invalid or illegal string was specified.");v=r,this.hasBeenReset=!0}})),Object.defineProperty(s,"snapToLines",r({},u,{get:function(){return y},set:function(t){y=!!t,this.hasBeenReset=!0}})),Object.defineProperty(s,"line",r({},u,{get:function(){return m},set:function(t){if("number"!=typeof t&&t!==a)throw new SyntaxError("An invalid number or illegal string was specified.");m=t,this.hasBeenReset=!0}})),Object.defineProperty(s,"lineAlign",r({},u,{get:function(){return b},set:function(t){var r=e(t);if(!r)throw new SyntaxError("An invalid or illegal string was specified.");b=r,this.hasBeenReset=!0}})),Object.defineProperty(s,"position",r({},u,{get:function(){return E},set:function(t){if(t<0||t>100)throw new Error("Position must be between 0 and 100.");E=t,this.hasBeenReset=!0}})),Object.defineProperty(s,"positionAlign",r({},u,{get:function(){return T},set:function(t){var r=e(t);if(!r)throw new SyntaxError("An invalid or illegal string was specified.");T=r,this.hasBeenReset=!0}})),Object.defineProperty(s,"size",r({},u,{get:function(){return R},set:function(t){if(t<0||t>100)throw new Error("Size must be between 0 and 100.");R=t,this.hasBeenReset=!0}})),Object.defineProperty(s,"align",r({},u,{get:function(){return A},set:function(t){var r=e(t);if(!r)throw new SyntaxError("An invalid or illegal string was specified.");A=r,this.hasBeenReset=!0}})),s.displayState=void 0,l)return s}if("undefined"!=typeof window&&window.VTTCue)return window.VTTCue;var a="auto",n={"":!0,lr:!0,rl:!0},o={start:!0,middle:!0,end:!0,left:!0,right:!0};return i.prototype.getCueAsHTML=function(){return window.WebVTT.convertCueToDOMTree(window,this.text)},i}(),Qe=function(){return{decode:function(t){if(!t)return"";if("string"!=typeof t)throw new Error("Error - expected string data.");return decodeURIComponent(encodeURIComponent(t))}}};st.prototype={set:function(t,e){this.get(t)||""===e||(this.values[t]=e)},get:function(t,e,r){return r?this.has(t)?this.values[t]:e[r]:this.has(t)?this.values[t]:e},has:function(t){return t in this.values},alt:function(t,e,r){for(var i=0;i<r.length;++i)if(e===r[i]){this.set(t,e);break}},integer:function(t,e){/^-?\d+$/.test(e)&&this.set(t,parseInt(e,10))},percent:function(t,e){return!!(e.match(/^([\d]{1,3})(\.[\d]*)?%$/)&&(e=parseFloat(e))>=0&&e<=100)&&(this.set(t,e),!0)}};var Je=new qe(0,0,0),$e="middle"===Je.align?"middle":"center";nt.prototype={parse:function(t){function e(){var t=r.buffer,e=0;for(t=dt(t);e<t.length&&"\r"!==t[e]&&"\n"!==t[e];)++e;var i=t.substr(0,e);return"\r"===t[e]&&++e,"\n"===t[e]&&++e,r.buffer=t.substr(e),i}var r=this;t&&(r.buffer+=r.decoder.decode(t,{stream:!0}));try{var i;if("INITIAL"===r.state){if(!/\r\n|\n/.test(r.buffer))return this;i=e();var a=i.match(/^(ï»¿)?WEBVTT([ \t].*)?$/);if(!a||!a[0])throw new Error("Malformed WebVTT signature.");r.state="HEADER"}for(var n=!1;r.buffer;){if(!/\r\n|\n/.test(r.buffer))return this;switch(n?n=!1:i=e(),r.state){case"HEADER":/:/.test(i)?function(t){lt(t,function(t,e){switch(t){case"Region":console.log("parse region",e)}},/:/)}(i):i||(r.state="ID");continue;case"NOTE":i||(r.state="ID");continue;case"ID":if(/^NOTE($|[ \t])/.test(i)){r.state="NOTE";break}if(!i)continue;if(r.cue=new qe(0,0,""),r.state="CUE",-1===i.indexOf("--\x3e")){r.cue.id=i;continue}case"CUE":try{ut(i,r.cue,r.regionList)}catch(t){r.cue=null,r.state="BADCUE";continue}r.state="CUETEXT";continue;case"CUETEXT":var o=-1!==i.indexOf("--\x3e");if(!i||o&&(n=!0)){r.oncue&&r.oncue(r.cue),r.cue=null,r.state="ID";continue}r.cue.text&&(r.cue.text+="\n"),r.cue.text+=i;continue;case"BADCUE":i||(r.state="ID");continue}}}catch(t){"CUETEXT"===r.state&&r.cue&&r.oncue&&r.oncue(r.cue),r.cue=null,r.state="INITIAL"===r.state?"BADWEBVTT":"BADCUE"}return this},flush:function(){var t=this;try{if(t.buffer+=t.decoder.decode(),(t.cue||"HEADER"===t.state)&&(t.buffer+="\n\n",t.parse()),"INITIAL"===t.state)throw new Error("Malformed WebVTT signature.")}catch(t){throw t}return t.onflush&&t.onflush(),this}};var Ze=nt,tr={42:225,92:233,94:237,95:243,96:250,123:231,124:247,125:209,126:241,127:9608,128:174,129:176,130:189,131:191,132:8482,133:162,134:163,135:9834,136:224,137:32,138:232,139:226,140:234,141:238,142:244,143:251,144:193,145:201,146:211,147:218,148:220,149:252,150:8216,151:161,152:42,153:8217,154:9473,155:169,156:8480,157:8226,158:8220,159:8221,160:192,161:194,162:199,163:200,164:202,165:203,166:235,167:206,168:207,169:239,170:212,171:217,172:249,173:219,174:171,175:187,176:195,177:227,178:205,179:204,180:236,181:210,182:242,183:213,184:245,185:123,186:125,187:92,188:94,189:95,190:124,191:8764,192:196,193:228,194:214,195:246,196:223,197:165,198:164,199:9475,200:197,201:229,202:216,203:248,204:9487,205:9491,206:9495,207:9499},er=function(t){var e=t;return tr.hasOwnProperty(t)&&(e=tr[t]),String.fromCharCode(e)},rr=15,ir=100,ar={17:1,18:3,21:5,22:7,23:9,16:11,19:12,20:14},nr={17:2,18:4,21:6,22:8,23:10,19:13,20:15},or={25:1,26:3,29:5,30:7,31:9,24:11,27:12,28:14},sr={25:2,26:4,29:6,30:8,31:10,27:13,28:15},lr=["white","green","blue","cyan","red","yellow","magenta","black","transparent"],ur={verboseFilter:{DATA:3,DEBUG:3,INFO:2,WARNING:2,TEXT:1,ERROR:0},time:null,verboseLevel:0,setTime:function(t){this.time=t},log:function(t,e){var r=this.verboseFilter[t];this.verboseLevel>=r&&console.log(this.time+" ["+t+"] "+e)}},dr=function(t){for(var e=[],r=0;r<t.length;r++)e.push(t[r].toString(16));return e},hr=function(){function t(e,r,i,a,n){ct(this,t),this.foreground=e||"white",this.underline=r||!1,this.italics=i||!1,this.background=a||"black",this.flash=n||!1}return t.prototype.reset=function(){this.foreground="white",this.underline=!1,this.italics=!1,this.background="black",this.flash=!1},t.prototype.setStyles=function(t){for(var e=["foreground","underline","italics","background","flash"],r=0;r<e.length;r++){var i=e[r];t.hasOwnProperty(i)&&(this[i]=t[i])}},t.prototype.isDefault=function(){return"white"===this.foreground&&!this.underline&&!this.italics&&"black"===this.background&&!this.flash},t.prototype.equals=function(t){return this.foreground===t.foreground&&this.underline===t.underline&&this.italics===t.italics&&this.background===t.background&&this.flash===t.flash},t.prototype.copy=function(t){this.foreground=t.foreground,this.underline=t.underline,this.italics=t.italics,this.background=t.background,this.flash=t.flash},t.prototype.toString=function(){return"color="+this.foreground+", underline="+this.underline+", italics="+this.italics+", background="+this.background+", flash="+this.flash},t}(),cr=function(){function t(e,r,i,a,n,o){ct(this,t),this.uchar=e||" ",this.penState=new hr(r,i,a,n,o)}return t.prototype.reset=function(){this.uchar=" ",this.penState.reset()},t.prototype.setChar=function(t,e){this.uchar=t,this.penState.copy(e)},t.prototype.setPenState=function(t){this.penState.copy(t)},t.prototype.equals=function(t){return this.uchar===t.uchar&&this.penState.equals(t.penState)},t.prototype.copy=function(t){this.uchar=t.uchar,this.penState.copy(t.penState)},t.prototype.isEmpty=function(){return" "===this.uchar&&this.penState.isDefault()},t}(),fr=function(){function t(){ct(this,t),this.chars=[];for(var e=0;e<ir;e++)this.chars.push(new cr);this.pos=0,this.currPenState=new hr}return t.prototype.equals=function(t){for(var e=!0,r=0;r<ir;r++)if(!this.chars[r].equals(t.chars[r])){e=!1;break}return e},t.prototype.copy=function(t){for(var e=0;e<ir;e++)this.chars[e].copy(t.chars[e])},t.prototype.isEmpty=function(){for(var t=!0,e=0;e<ir;e++)if(!this.chars[e].isEmpty()){t=!1;break}return t},t.prototype.setCursor=function(t){this.pos!==t&&(this.pos=t),this.pos<0?(ur.log("ERROR","Negative cursor position "+this.pos),this.pos=0):this.pos>ir&&(ur.log("ERROR","Too large cursor position "+this.pos),this.pos=ir)},t.prototype.moveCursor=function(t){var e=this.pos+t;if(t>1)for(var r=this.pos+1;r<e+1;r++)this.chars[r].setPenState(this.currPenState);this.setCursor(e)},t.prototype.backSpace=function(){this.moveCursor(-1),this.chars[this.pos].setChar(" ",this.currPenState)},t.prototype.insertChar=function(t){t>=144&&this.backSpace();var e=er(t);if(this.pos>=ir)return void ur.log("ERROR","Cannot insert "+t.toString(16)+" ("+e+") at position "+this.pos+". Skipping it!");this.chars[this.pos].setChar(e,this.currPenState),this.moveCursor(1)},t.prototype.clearFromPos=function(t){var e;for(e=t;e<ir;e++)this.chars[e].reset()},t.prototype.clear=function(){this.clearFromPos(0),this.pos=0,this.currPenState.reset()},t.prototype.clearToEndOfRow=function(){this.clearFromPos(this.pos)},t.prototype.getTextString=function(){for(var t=[],e=!0,r=0;r<ir;r++){var i=this.chars[r].uchar;" "!==i&&(e=!1),t.push(i)}return e?"":t.join("")},t.prototype.setPenStyles=function(t){this.currPenState.setStyles(t),this.chars[this.pos].setPenState(this.currPenState)},t}(),pr=function(){function t(){ct(this,t),this.rows=[];for(var e=0;e<rr;e++)this.rows.push(new fr);this.currRow=rr-1,this.nrRollUpRows=null,this.reset()}return t.prototype.reset=function(){for(var t=0;t<rr;t++)this.rows[t].clear();this.currRow=rr-1},t.prototype.equals=function(t){for(var e=!0,r=0;r<rr;r++)if(!this.rows[r].equals(t.rows[r])){e=!1;break}return e},t.prototype.copy=function(t){for(var e=0;e<rr;e++)this.rows[e].copy(t.rows[e])},t.prototype.isEmpty=function(){for(var t=!0,e=0;e<rr;e++)if(!this.rows[e].isEmpty()){t=!1;break}return t},t.prototype.backSpace=function(){this.rows[this.currRow].backSpace()},t.prototype.clearToEndOfRow=function(){this.rows[this.currRow].clearToEndOfRow()},t.prototype.insertChar=function(t){this.rows[this.currRow].insertChar(t)},t.prototype.setPen=function(t){this.rows[this.currRow].setPenStyles(t)},t.prototype.moveCursor=function(t){this.rows[this.currRow].moveCursor(t)},t.prototype.setCursor=function(t){ur.log("INFO","setCursor: "+t),this.rows[this.currRow].setCursor(t)},t.prototype.setPAC=function(t){ur.log("INFO","pacData = "+JSON.stringify(t));var e=t.row-1;if(this.nrRollUpRows&&e<this.nrRollUpRows-1&&(e=this.nrRollUpRows-1),this.nrRollUpRows&&this.currRow!==e){for(var r=0;r<rr;r++)this.rows[r].clear();var i=this.currRow+1-this.nrRollUpRows,a=this.lastOutputScreen;if(a){var n=a.rows[i].cueStartTime;if(n&&n<ur.time)for(var o=0;o<this.nrRollUpRows;o++)this.rows[e-this.nrRollUpRows+o+1].copy(a.rows[i+o])}}this.currRow=e;var s=this.rows[this.currRow];if(null!==t.indent){var l=t.indent,u=Math.max(l-1,0);s.setCursor(t.indent),t.color=s.chars[u].penState.foreground}var d={foreground:t.color,underline:t.underline,italics:t.italics,background:"black",flash:!1};this.setPen(d)},t.prototype.setBkgData=function(t){ur.log("INFO","bkgData = "+JSON.stringify(t)),this.backSpace(),this.setPen(t),this.insertChar(32)},t.prototype.setRollUpRows=function(t){this.nrRollUpRows=t},t.prototype.rollUp=function(){if(null===this.nrRollUpRows)return void ur.log("DEBUG","roll_up but nrRollUpRows not set yet");ur.log("TEXT",this.getDisplayText());var t=this.currRow+1-this.nrRollUpRows,e=this.rows.splice(t,1)[0];e.clear(),this.rows.splice(this.currRow,0,e),ur.log("INFO","Rolling up")},t.prototype.getDisplayText=function(t){t=t||!1;for(var e=[],r="",i=-1,a=0;a<rr;a++){var n=this.rows[a].getTextString();n&&(i=a+1,t?e.push("Row "+i+": '"+n+"'"):e.push(n.trim()))}return e.length>0&&(r=t?"["+e.join(" | ")+"]":e.join("\n")),r},t.prototype.getTextAndFormat=function(){return this.rows},t}(),gr=function(){function t(e,r){ct(this,t),this.chNr=e,this.outputFilter=r,this.mode=null,this.verbose=0,this.displayedMemory=new pr,this.nonDisplayedMemory=new pr,this.lastOutputScreen=new pr,this.currRollUpRow=this.displayedMemory.rows[rr-1],this.writeScreen=this.displayedMemory,this.mode=null,this.cueStartTime=null}return t.prototype.reset=function(){this.mode=null,this.displayedMemory.reset(),this.nonDisplayedMemory.reset(),this.lastOutputScreen.reset(),this.currRollUpRow=this.displayedMemory.rows[rr-1],this.writeScreen=this.displayedMemory,this.mode=null,this.cueStartTime=null,this.lastCueEndTime=null},t.prototype.getHandler=function(){return this.outputFilter},t.prototype.setHandler=function(t){this.outputFilter=t},t.prototype.setPAC=function(t){this.writeScreen.setPAC(t)},t.prototype.setBkgData=function(t){this.writeScreen.setBkgData(t)},t.prototype.setMode=function(t){t!==this.mode&&(this.mode=t,ur.log("INFO","MODE="+t),"MODE_POP-ON"===this.mode?this.writeScreen=this.nonDisplayedMemory:(this.writeScreen=this.displayedMemory,this.writeScreen.reset()),"MODE_ROLL-UP"!==this.mode&&(this.displayedMemory.nrRollUpRows=null,this.nonDisplayedMemory.nrRollUpRows=null),this.mode=t)},t.prototype.insertChars=function(t){for(var e=0;e<t.length;e++)this.writeScreen.insertChar(t[e]);var r=this.writeScreen===this.displayedMemory?"DISP":"NON_DISP";ur.log("INFO",r+": "+this.writeScreen.getDisplayText(!0)),"MODE_PAINT-ON"!==this.mode&&"MODE_ROLL-UP"!==this.mode||(ur.log("TEXT","DISPLAYED: "+this.displayedMemory.getDisplayText(!0)),this.outputDataUpdate())},t.prototype.ccRCL=function(){ur.log("INFO","RCL - Resume Caption Loading"),this.setMode("MODE_POP-ON")},t.prototype.ccBS=function(){ur.log("INFO","BS - BackSpace"),"MODE_TEXT"!==this.mode&&(this.writeScreen.backSpace(),this.writeScreen===this.displayedMemory&&this.outputDataUpdate())},t.prototype.ccAOF=function(){},t.prototype.ccAON=function(){},t.prototype.ccDER=function(){ur.log("INFO","DER- Delete to End of Row"),this.writeScreen.clearToEndOfRow(),this.outputDataUpdate()},t.prototype.ccRU=function(t){ur.log("INFO","RU("+t+") - Roll Up"),this.writeScreen=this.displayedMemory,this.setMode("MODE_ROLL-UP"),this.writeScreen.setRollUpRows(t)},t.prototype.ccFON=function(){ur.log("INFO","FON - Flash On"),this.writeScreen.setPen({flash:!0})},t.prototype.ccRDC=function(){ur.log("INFO","RDC - Resume Direct Captioning"),this.setMode("MODE_PAINT-ON")},t.prototype.ccTR=function(){ur.log("INFO","TR"),this.setMode("MODE_TEXT")},t.prototype.ccRTD=function(){ur.log("INFO","RTD"),this.setMode("MODE_TEXT")},t.prototype.ccEDM=function(){ur.log("INFO","EDM - Erase Displayed Memory"),this.displayedMemory.reset(),this.outputDataUpdate(!0)},t.prototype.ccCR=function(){ur.log("CR - Carriage Return"),this.writeScreen.rollUp(),this.outputDataUpdate(!0)},t.prototype.ccENM=function(){ur.log("INFO","ENM - Erase Non-displayed Memory"),this.nonDisplayedMemory.reset()},t.prototype.ccEOC=function(){if(ur.log("INFO","EOC - End Of Caption"),"MODE_POP-ON"===this.mode){var t=this.displayedMemory;this.displayedMemory=this.nonDisplayedMemory,this.nonDisplayedMemory=t,this.writeScreen=this.nonDisplayedMemory,ur.log("TEXT","DISP: "+this.displayedMemory.getDisplayText())}this.outputDataUpdate(!0)},t.prototype.ccTO=function(t){ur.log("INFO","TO("+t+") - Tab Offset"),this.writeScreen.moveCursor(t)},t.prototype.ccMIDROW=function(t){var e={flash:!1};if(e.underline=t%2==1,e.italics=t>=46,e.italics)e.foreground="white";else{var r=Math.floor(t/2)-16,i=["white","green","blue","cyan","red","yellow","magenta"];e.foreground=i[r]}ur.log("INFO","MIDROW: "+JSON.stringify(e)),this.writeScreen.setPen(e)},t.prototype.outputDataUpdate=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=ur.time;null!==e&&this.outputFilter&&(null!==this.cueStartTime||this.displayedMemory.isEmpty()?this.displayedMemory.equals(this.lastOutputScreen)||(this.outputFilter.newCue&&(this.outputFilter.newCue(this.cueStartTime,e,this.lastOutputScreen),!0===t&&this.outputFilter.dispatchCue&&this.outputFilter.dispatchCue()),this.cueStartTime=this.displayedMemory.isEmpty()?null:e):this.cueStartTime=e,this.lastOutputScreen.copy(this.displayedMemory))},t.prototype.cueSplitAtTime=function(t){this.outputFilter&&(this.displayedMemory.isEmpty()||(this.outputFilter.newCue&&this.outputFilter.newCue(this.cueStartTime,t,this.displayedMemory),this.cueStartTime=t))},t}(),vr=function(){function t(e,r,i){ct(this,t),this.field=e||1,this.outputs=[r,i],this.channels=[new gr(1,r),new gr(2,i)],this.currChNr=-1,this.lastCmdA=null,this.lastCmdB=null,this.bufferedData=[],this.startTime=null,this.lastTime=null,this.dataCounters={padding:0,char:0,cmd:0,other:0}}return t.prototype.getHandler=function(t){return this.channels[t].getHandler()},t.prototype.setHandler=function(t,e){this.channels[t].setHandler(e)},t.prototype.addData=function(t,e){var r,i,a,n=!1;this.lastTime=t,ur.setTime(t);for(var o=0;o<e.length;o+=2)if(i=127&e[o],a=127&e[o+1],0!==i||0!==a){if(ur.log("DATA","["+dr([e[o],e[o+1]])+"] -> ("+dr([i,a])+")"),r=this.parseCmd(i,a),r||(r=this.parseMidrow(i,a)),r||(r=this.parsePAC(i,a)),r||(r=this.parseBackgroundAttributes(i,a)),!r&&(n=this.parseChars(i,a)))if(this.currChNr&&this.currChNr>=0){var s=this.channels[this.currChNr-1];s.insertChars(n)}else ur.log("WARNING","No channel found yet. TEXT-MODE?");r?this.dataCounters.cmd+=2:n?this.dataCounters.char+=2:(this.dataCounters.other+=2,ur.log("WARNING","Couldn't parse cleaned data "+dr([i,a])+" orig: "+dr([e[o],e[o+1]])))}else this.dataCounters.padding+=2},t.prototype.parseCmd=function(t,e){var r=null,i=(20===t||28===t)&&32<=e&&e<=47,a=(23===t||31===t)&&33<=e&&e<=35;if(!i&&!a)return!1;if(t===this.lastCmdA&&e===this.lastCmdB)return this.lastCmdA=null,this.lastCmdB=null,ur.log("DEBUG","Repeated command ("+dr([t,e])+") is dropped"),!0;r=20===t||23===t?1:2;var n=this.channels[r-1];return 20===t||28===t?32===e?n.ccRCL():33===e?n.ccBS():34===e?n.ccAOF():35===e?n.ccAON():36===e?n.ccDER():37===e?n.ccRU(2):38===e?n.ccRU(3):39===e?n.ccRU(4):40===e?n.ccFON():41===e?n.ccRDC():42===e?n.ccTR():43===e?n.ccRTD():44===e?n.ccEDM():45===e?n.ccCR():46===e?n.ccENM():47===e&&n.ccEOC():n.ccTO(e-32),this.lastCmdA=t,this.lastCmdB=e,this.currChNr=r,!0},t.prototype.parseMidrow=function(t,e){var r=null;if((17===t||25===t)&&32<=e&&e<=47){if((r=17===t?1:2)!==this.currChNr)return ur.log("ERROR","Mismatch channel in midrow parsing"),!1;return this.channels[r-1].ccMIDROW(e),ur.log("DEBUG","MIDROW ("+dr([t,e])+")"),!0}return!1},t.prototype.parsePAC=function(t,e){var r=null,i=null,a=(17<=t&&t<=23||25<=t&&t<=31)&&64<=e&&e<=127,n=(16===t||24===t)&&64<=e&&e<=95;if(!a&&!n)return!1;if(t===this.lastCmdA&&e===this.lastCmdB)return this.lastCmdA=null,this.lastCmdB=null,!0;r=t<=23?1:2,i=64<=e&&e<=95?1===r?ar[t]:or[t]:1===r?nr[t]:sr[t];var o=this.interpretPAC(i,e);return this.channels[r-1].setPAC(o),this.lastCmdA=t,this.lastCmdB=e,this.currChNr=r,!0},t.prototype.interpretPAC=function(t,e){var r=e,i={color:null,italics:!1,indent:null,underline:!1,row:t};return r=e>95?e-96:e-64,i.underline=1==(1&r),r<=13?i.color=["white","green","blue","cyan","red","yellow","magenta","white"][Math.floor(r/2)]:r<=15?(i.italics=!0,i.color="white"):i.indent=4*Math.floor((r-16)/2),i},t.prototype.parseChars=function(t,e){var r=null,i=null,a=null;if(t>=25?(r=2,a=t-8):(r=1,a=t),17<=a&&a<=19){var n=e;n=17===a?e+80:18===a?e+112:e+144,ur.log("INFO","Special char '"+er(n)+"' in channel "+r),i=[n]}else 32<=t&&t<=127&&(i=0===e?[t]:[t,e]);if(i){var o=dr(i);ur.log("DEBUG","Char codes =  "+o.join(",")),this.lastCmdA=null,this.lastCmdB=null}return i},t.prototype.parseBackgroundAttributes=function(t,e){var r,i,a,n,o=(16===t||24===t)&&32<=e&&e<=47,s=(23===t||31===t)&&45<=e&&e<=47;return!(!o&&!s)&&(r={},16===t||24===t?(i=Math.floor((e-32)/2),r.background=lr[i],e%2==1&&(r.background=r.background+"_semi")):45===e?r.background="transparent":(r.foreground="black",47===e&&(r.underline=!0)),a=t<24?1:2,n=this.channels[a-1],n.setBkgData(r),this.lastCmdA=null,this.lastCmdB=null,!0)},t.prototype.reset=function(){for(var t=0;t<this.channels.length;t++)this.channels[t]&&this.channels[t].reset();this.lastCmdA=null,this.lastCmdB=null},t.prototype.cueSplitAtTime=function(t){for(var e=0;e<this.channels.length;e++)this.channels[e]&&this.channels[e].cueSplitAtTime(t)},t}(),yr=vr,mr=function(){function t(e,r){ft(this,t),this.timelineController=e,this.track=r,this.startTime=null,this.endTime=null,this.screen=null}return t.prototype.dispatchCue=function(){null!==this.startTime&&(this.timelineController.addCues("textTrack"+this.track,this.startTime,this.endTime,this.screen),this.startTime=null)},t.prototype.newCue=function(t,e,r){(null===this.startTime||this.startTime>t)&&(this.startTime=t),this.endTime=e,this.screen=r,this.timelineController.createCaptionsTrack(this.track)},t}(),br=mr,Er=function(t,e,r){return t.substr(r||0,e.length)===e},Tr=function(t){var e=parseInt(t.substr(-3)),r=parseInt(t.substr(-6,2)),i=parseInt(t.substr(-9,2)),a=t.length>9?parseInt(t.substr(0,t.indexOf(":"))):0;return isNaN(e)||isNaN(r)||isNaN(i)||isNaN(a)?-1:(e+=1e3*r,e+=6e4*i,e+=36e5*a)},Rr=function(t){for(var e=5381,r=t.length;r;)e=33*e^t.charCodeAt(--r);return(e>>>0).toString()},Ar=function(t,e,r){var i=t[e],a=t[i.prevCC];if(!a||!a.new&&i.new)return t.ccOffset=t.presentationOffset=i.start,void(i.new=!1);for(;a&&a.new;)t.ccOffset+=i.start-a.start,i.new=!1,i=a,a=t[i.prevCC];t.presentationOffset=r},Sr={parse:function(t,e,r,i,a,n){var o=/\r\n|\n\r|\n|\r/g,s=Object(Re.b)(new Uint8Array(t)).trim().replace(o,"\n").split("\n"),l="00:00.000",u=0,d=0,h=0,c=[],f=void 0,p=!0,g=new Ze;g.oncue=function(t){var e=r[i],a=r.ccOffset;e&&e.new&&(void 0!==d?a=r.ccOffset=e.start:Ar(r,i,h)),h&&(a=h+r.ccOffset-r.presentationOffset),t.startTime+=a-d,t.endTime+=a-d,t.id=Rr(t.startTime.toString())+Rr(t.endTime.toString())+Rr(t.text),t.text=decodeURIComponent(encodeURIComponent(t.text)),t.endTime>0&&c.push(t)},g.onparsingerror=function(t){f=t},g.onflush=function(){if(f&&n)return void n(f);a(c)},s.forEach(function(t){if(p){if(Er(t,"X-TIMESTAMP-MAP=")){p=!1,t.substr(16).split(",").forEach(function(t){Er(t,"LOCAL:")?l=t.substr(6):Er(t,"MPEGTS:")&&(u=parseInt(t.substr(7)))});try{e=e<0?e+8589934592:e,u-=e,d=Tr(l)/1e3,h=u/9e4,-1===d&&(f=new Error("Malformed X-TIMESTAMP-MAP: "+t))}catch(e){f=new Error("Malformed X-TIMESTAMP-MAP: "+t)}return}""===t&&(p=!1)}g.parse(t+"\n")}),g.flush()}},Lr=Sr,_r=function(t){function e(r){pt(this,e);var i=gt(this,t.call(this,r,Ot.a.MEDIA_ATTACHING,Ot.a.MEDIA_DETACHING,Ot.a.FRAG_PARSING_USERDATA,Ot.a.FRAG_DECRYPTED,Ot.a.MANIFEST_LOADING,Ot.a.MANIFEST_LOADED,Ot.a.FRAG_LOADED,Ot.a.LEVEL_SWITCHING,Ot.a.INIT_PTS_FOUND));if(i.hls=r,i.config=r.config,i.enabled=!0,i.Cues=r.config.cueHandler,i.textTracks=[],i.tracks=[],i.unparsedVttFrags=[],i.initPTS=void 0,i.cueRanges=[],i.config.enableCEA708Captions){var a=new br(i,1),n=new br(i,2);i.cea608Parser=new yr(0,a,n)}return i}return vt(e,t),e.prototype.addCues=function(t,e,r,i){for(var a=this.cueRanges,n=!1,o=a.length;o--;){var s=a[o],l=bt(s[0],s[1],e,r);if(l>=0&&(s[0]=Math.min(s[0],e),s[1]=Math.max(s[1],r),n=!0,l/(r-e)>.5))return}n||a.push([e,r]),this.Cues.newCue(this[t],e,r,i)},e.prototype.onInitPtsFound=function(t){var e=this;void 0===this.initPTS&&(this.initPTS=t.initPTS),this.unparsedVttFrags.length&&(this.unparsedVttFrags.forEach(function(t){e.onFragLoaded(t)}),this.unparsedVttFrags=[])},e.prototype.getExistingTrack=function(t){var e=this.media;if(e)for(var r=0;r<e.textTracks.length;r++){var i=e.textTracks[r],a="textTrack"+t;if(!0===i[a])return i}return null},e.prototype.sendAddTrackEvent=function(t,e){var r=null;try{r=new window.Event("addtrack")}catch(t){r=document.createEvent("Event"),r.initEvent("addtrack",!1,!1)}r.track=t,e.dispatchEvent(r)},e.prototype.createCaptionsTrack=function(t){var e="textTrack"+t;if(!this[e]){var r=this.getExistingTrack(t);if(r)this[e]=r,yt(this[e]),this.sendAddTrackEvent(this[e],this.media);else{var i=this.createTextTrack("captions",this.config["captionsTextTrack"+t+"Label"],this.config.captionsTextTrack1LanguageCode);i&&(i[e]=!0,this[e]=i)}}},e.prototype.createTextTrack=function(t,e,r){var i=this.media;if(i)return i.addTextTrack(t,e,r)},e.prototype.destroy=function(){Nt.prototype.destroy.call(this)},e.prototype.onMediaAttaching=function(t){this.media=t.media,this._cleanTracks()},e.prototype.onMediaDetaching=function(){yt(this.textTrack1),yt(this.textTrack2)},e.prototype.onManifestLoading=function(){this.lastSn=-1,this.prevCC=-1,this.vttCCs={ccOffset:0,presentationOffset:0},this._cleanTracks()},e.prototype._cleanTracks=function(){var t=this.media;if(t){var e=t.textTracks;if(e)for(var r=0;r<e.length;r++)yt(e[r])}},e.prototype.onManifestLoaded=function(t){var e=this;if(this.textTracks=[],this.unparsedVttFrags=this.unparsedVttFrags||[],this.initPTS=void 0,this.cueRanges=[],this.config.enableWebVTT){this.tracks=t.subtitles||[];var r=this.media?this.media.textTracks:[];this.tracks.forEach(function(t,i){var a=void 0;if(i<r.length){var n=r[i];mt(n,t)&&(a=n)}a||(a=e.createTextTrack("subtitles",t.name,t.lang)),a.mode=t.default?"showing":"hidden",e.textTracks.push(a)})}},e.prototype.onLevelSwitching=function(){this.enabled="NONE"!==this.hls.currentLevel.closedCaptions},e.prototype.onFragLoaded=function(t){var e=t.frag,r=t.payload;if("main"===e.type){var i=e.sn;if(i!==this.lastSn+1){var a=this.cea608Parser;a&&a.reset()}this.lastSn=i}else if("subtitle"===e.type)if(r.byteLength){if(void 0===this.initPTS)return void this.unparsedVttFrags.push(t);var n=e.decryptdata;null!=n&&null!=n.key&&"AES-128"===n.method||this._parseVTTs(e,r)}else this.hls.trigger(Ot.a.SUBTITLE_FRAG_PROCESSED,{success:!1,frag:e})},e.prototype._parseVTTs=function(t,e){var r=this.vttCCs;r[t.cc]||(r[t.cc]={start:t.start,prevCC:this.prevCC,new:!0},this.prevCC=t.cc);var i=this.textTracks,a=this.hls;Lr.parse(e,this.initPTS,r,t.cc,function(e){var r=i[t.trackId];e.forEach(function(t){if(!r.cues.getCueById(t.id))try{r.addCue(t)}catch(i){var e=new window.TextTrackCue(t.startTime,t.endTime,t.text);e.id=t.id,r.addCue(e)}}),a.trigger(Ot.a.SUBTITLE_FRAG_PROCESSED,{success:!0,frag:t})},function(e){Pt.b.log("Failed to parse VTT cue: "+e),a.trigger(Ot.a.SUBTITLE_FRAG_PROCESSED,{success:!1,frag:t})})},e.prototype.onFragDecrypted=function(t){var e=t.payload,r=t.frag;if("subtitle"===r.type){if(void 0===this.initPTS)return void this.unparsedVttFrags.push(t);this._parseVTTs(r,e)}},e.prototype.onFragParsingUserdata=function(t){if(this.enabled&&this.config.enableCEA708Captions)for(var e=0;e<t.samples.length;e++){var r=this.extractCea608Data(t.samples[e].bytes);this.cea608Parser.addData(t.samples[e].pts,r)}},e.prototype.extractCea608Data=function(t){for(var e,r,i,a,n,o=31&t[0],s=2,l=[],u=0;u<o;u++)e=t[s++],r=127&t[s++],i=127&t[s++],a=0!=(4&e),n=3&e,0===r&&0===i||a&&0===n&&(l.push(r),l.push(i));return l},e}(Nt),wr=_r,Dr=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),Ir=function(t){function e(r){Et(this,e);var i=Tt(this,t.call(this,r,Ot.a.MEDIA_ATTACHED,Ot.a.MEDIA_DETACHING,Ot.a.MANIFEST_LOADING,Ot.a.MANIFEST_LOADED,Ot.a.SUBTITLE_TRACK_LOADED));return i.tracks=[],i.trackId=-1,i.media=void 0,i.subtitleDisplay=!1,i}return Rt(e,t),e.prototype._onTextTracksChanged=function(){if(this.media){for(var t=-1,e=At(this.media.textTracks),r=0;r<e.length;r++)"showing"===e[r].mode&&(t=r);this.subtitleTrack=t}},e.prototype.destroy=function(){Nt.prototype.destroy.call(this)},e.prototype.onMediaAttached=function(t){var e=this;this.media=t.media,this.media&&(void 0!==this.queuedDefaultTrack&&(this.subtitleTrack=this.queuedDefaultTrack,delete this.queuedDefaultTrack),this.trackChangeListener=this._onTextTracksChanged.bind(this),this.useTextTrackPolling=!(this.media.textTracks&&"onchange"in this.media.textTracks),this.useTextTrackPolling?this.subtitlePollingInterval=setInterval(function(){e.trackChangeListener()},500):this.media.textTracks.addEventListener("change",this.trackChangeListener))},e.prototype.onMediaDetaching=function(){this.media&&(this.useTextTrackPolling?clearInterval(this.subtitlePollingInterval):this.media.textTracks.removeEventListener("change",this.trackChangeListener),this.media=void 0)},e.prototype.onManifestLoading=function(){this.tracks=[],this.trackId=-1},e.prototype.onManifestLoaded=function(t){var e=this,r=t.subtitles||[];this.tracks=r,this.trackId=-1,this.hls.trigger(Ot.a.SUBTITLE_TRACKS_UPDATED,{subtitleTracks:r}),r.forEach(function(t){t.default&&(e.media?e.subtitleTrack=t.id:e.queuedDefaultTrack=t.id)})},e.prototype.onTick=function(){var t=this.trackId,e=this.tracks[t];if(e){var r=e.details;void 0!==r&&!0!==r.live||(Pt.b.log("(re)loading playlist for subtitle track "+t),this.hls.trigger(Ot.a.SUBTITLE_TRACK_LOADING,{url:e.url,id:t}))}},e.prototype.onSubtitleTrackLoaded=function(t){var e=this;t.id<this.tracks.length&&(Pt.b.log("subtitle track "+t.id+" loaded"),this.tracks[t.id].details=t.details,t.details.live&&!this.timer&&(this.timer=setInterval(function(){e.onTick()},1e3*t.details.targetduration,this)),!t.details.live&&this.timer&&(clearInterval(this.timer),this.timer=null))},e.prototype.setSubtitleTrackInternal=function(t){if(!(t<-1||t>=this.tracks.length)){this.timer&&(clearInterval(this.timer),this.timer=null);var e=At(this.media.textTracks);if(-1!==this.trackId&&this.subtitleDisplay&&(e[this.trackId].mode="hidden"),this.trackId=t,Pt.b.log("switching to subtitle track "+t),this.hls.trigger(Ot.a.SUBTITLE_TRACK_SWITCH,{id:t}),-1!==t){var r=this.tracks[t];this.subtitleDisplay&&(e[t].mode="showing");var i=r.details;void 0!==i&&!0!==i.live||(Pt.b.log("(re)loading playlist for subtitle track "+t),this.hls.trigger(Ot.a.SUBTITLE_TRACK_LOADING,{url:r.url,id:t}))}}},Dr(e,[{key:"subtitleTracks",get:function(){return this.tracks}},{key:"subtitleTrack",get:function(){return this.trackId},set:function(t){this.trackId!==t&&this.setSubtitleTrackInternal(t)}}]),e}(Nt),kr=Ir,Or=r(4),Cr={STOPPED:"STOPPED",IDLE:"IDLE",KEY_LOADING:"KEY_LOADING",FRAG_LOADING:"FRAG_LOADING"},Pr=function(t){function e(r){St(this,e);var i=Lt(this,t.call(this,r,Ot.a.MEDIA_ATTACHED,Ot.a.ERROR,Ot.a.KEY_LOADED,Ot.a.FRAG_LOADED,Ot.a.SUBTITLE_TRACKS_UPDATED,Ot.a.SUBTITLE_TRACK_SWITCH,Ot.a.SUBTITLE_TRACK_LOADED,Ot.a.SUBTITLE_FRAG_PROCESSED));return i.config=r.config,i.vttFragSNsProcessed={},i.vttFragQueues=void 0,i.currentlyProcessing=null,i.state=Cr.STOPPED,i.currentTrackId=-1,i.ticks=0,i.decrypter=new Or.a(r.observer,r.config),i}return _t(e,t),e.prototype.destroy=function(){Nt.prototype.destroy.call(this),this.state=Cr.STOPPED},e.prototype.clearVttFragQueues=function(){var t=this;this.vttFragQueues={},this.tracks.forEach(function(e){t.vttFragQueues[e.id]=[]})},e.prototype.nextFrag=function(){if(null===this.currentlyProcessing&&this.currentTrackId>-1&&this.vttFragQueues[this.currentTrackId].length){var t=this.currentlyProcessing=this.vttFragQueues[this.currentTrackId].shift();this.fragCurrent=t,this.hls.trigger(Ot.a.FRAG_LOADING,{frag:t}),this.state=Cr.FRAG_LOADING}},e.prototype.onSubtitleFragProcessed=function(t){t.success&&this.vttFragSNsProcessed[t.frag.trackId].push(t.frag.sn),this.currentlyProcessing=null,this.state=Cr.IDLE,this.nextFrag()},e.prototype.onMediaAttached=function(){this.state=Cr.IDLE},e.prototype.onError=function(t){var e=t.frag;e&&"subtitle"!==e.type||this.currentlyProcessing&&(this.currentlyProcessing=null,this.nextFrag())},e.prototype.tick=function(){var t=this;1===++this.ticks&&(this.doTick(),this.ticks>1&&setTimeout(function(){t.tick()},1),this.ticks=0)},e.prototype.doTick=function(){var t=this;switch(this.state){case Cr.IDLE:var e=this.tracks,r=this.currentTrackId,i=this.vttFragSNsProcessed[r],a=this.vttFragQueues[r],n=this.currentlyProcessing?this.currentlyProcessing.sn:-1,o=function(t){return i.indexOf(t.sn)>-1},s=function(t){return a.some(function(e){return e.sn===t.sn})};if(!e)break;var l;if(r<e.length&&(l=e[r].details),void 0===l)break;l.fragments.forEach(function(e){o(e)||e.sn===n||s(e)||(e.decryptdata&&null!=e.decryptdata.uri&&null==e.decryptdata.key?(Pt.b.log("Loading key for "+e.sn),t.state=Cr.KEY_LOADING,t.hls.trigger(Ot.a.KEY_LOADING,{frag:e})):(e.trackId=r,a.push(e),t.nextFrag()))})}},e.prototype.onSubtitleTracksUpdated=function(t){var e=this;Pt.b.log("subtitle tracks updated"),this.tracks=t.subtitleTracks,this.clearVttFragQueues(),this.vttFragSNsProcessed={},this.tracks.forEach(function(t){e.vttFragSNsProcessed[t.id]=[]})},e.prototype.onSubtitleTrackSwitch=function(t){this.currentTrackId=t.id,this.clearVttFragQueues()},e.prototype.onSubtitleTrackLoaded=function(){this.tick()},e.prototype.onKeyLoaded=function(){this.state===Cr.KEY_LOADING&&(this.state=Cr.IDLE,this.tick())},e.prototype.onFragLoaded=function(t){var e=this.fragCurrent,r=t.frag.decryptdata,i=t.frag,a=this.hls;if(this.state===Cr.FRAG_LOADING&&e&&"subtitle"===t.frag.type&&e.sn===t.frag.sn&&t.payload.byteLength>0&&null!=r&&null!=r.key&&"AES-128"===r.method){var n;try{n=performance.now()}catch(t){n=Date.now()}this.decrypter.decrypt(t.payload,r.key.buffer,r.iv.buffer,function(t){var e;try{e=performance.now()}catch(t){e=Date.now()}a.trigger(Ot.a.FRAG_DECRYPTED,{frag:i,payload:t,stats:{tstart:n,tdecrypt:e}})})}},e}(Nt),xr=Pr,Fr={autoStartLoad:!0,startPosition:-1,defaultAudioCodec:void 0,debug:!1,capLevelOnFPSDrop:!1,capLevelToPlayerSize:!1,initialLiveManifestSize:1,maxBufferLength:30,maxBufferSize:6e7,maxBufferHole:.5,maxSeekHole:2,lowBufferWatchdogPeriod:.5,highBufferWatchdogPeriod:3,nudgeOffset:.1,nudgeMaxRetry:3,maxFragLookUpTolerance:.25,liveSyncDurationCount:3,liveMaxLatencyDurationCount:1/0,liveSyncDuration:void 0,liveMaxLatencyDuration:void 0,liveDurationInfinity:!1,maxMaxBufferLength:600,enableWorker:!0,enableSoftwareAES:!0,manifestLoadingTimeOut:1e4,manifestLoadingMaxRetry:1,manifestLoadingRetryDelay:1e3,manifestLoadingMaxRetryTimeout:64e3,startLevel:void 0,levelLoadingTimeOut:1e4,levelLoadingMaxRetry:4,levelLoadingRetryDelay:1e3,levelLoadingMaxRetryTimeout:64e3,fragLoadingTimeOut:2e4,fragLoadingMaxRetry:6,fragLoadingRetryDelay:1e3,fragLoadingMaxRetryTimeout:64e3,fragLoadingLoopThreshold:3,startFragPrefetch:!1,fpsDroppedMonitoringPeriod:5e3,fpsDroppedMonitoringThreshold:.2,appendErrorMaxRetry:3,loader:je,fLoader:void 0,pLoader:void 0,xhrSetup:void 0,fetchSetup:void 0,abrController:Oe,bufferController:xe,capLevelController:Me,fpsController:Be,stretchShortVideoTrack:!1,maxAudioFramesDrift:1,forceKeyFrameOnDiscontinuity:!0,abrEwmaFastLive:3,abrEwmaSlowLive:9,abrEwmaFastVoD:3,abrEwmaSlowVoD:9,abrEwmaDefaultEstimate:5e5,abrBandWidthFactor:.95,abrBandWidthUpFactor:.7,abrMaxWithRealBitrate:!1,maxStarvationDelay:4,maxLoadingDelay:4,minAutoBitrate:0};Fr.subtitleStreamController=xr,Fr.subtitleTrackController=kr,Fr.timelineController=wr,Fr.cueHandler=Dt,Fr.enableCEA708Captions=!0,Fr.enableWebVTT=!0,Fr.captionsTextTrack1Label="English",Fr.captionsTextTrack1LanguageCode="en",Fr.captionsTextTrack2Label="Spanish",Fr.captionsTextTrack2LanguageCode="es",Fr.audioStreamController=Xe,Fr.audioTrackController=We;var Nr=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),Mr=function(){function t(){var e=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};wt(this,t);var i=t.DefaultConfig;if((r.liveSyncDurationCount||r.liveMaxLatencyDurationCount)&&(r.liveSyncDuration||r.liveMaxLatencyDuration))throw new Error("Illegal hls.js config: don't mix up liveSyncDurationCount/liveMaxLatencyDurationCount and liveSyncDuration/liveMaxLatencyDuration");for(var a in i)a in r||(r[a]=i[a]);if(void 0!==r.liveMaxLatencyDurationCount&&r.liveMaxLatencyDurationCount<=r.liveSyncDurationCount)throw new Error('Illegal hls.js config: "liveMaxLatencyDurationCount" must be gt "liveSyncDurationCount"');if(void 0!==r.liveMaxLatencyDuration&&(r.liveMaxLatencyDuration<=r.liveSyncDuration||void 0===r.liveSyncDuration))throw new Error('Illegal hls.js config: "liveMaxLatencyDuration" must be gt "liveSyncDuration"');Object(Pt.a)(r.debug),this.config=r,this._autoLevelCapping=-1;var n=this.observer=new se.a;n.trigger=function(t){for(var e=arguments.length,r=Array(e>1?e-1:0),i=1;i<e;i++)r[i-1]=arguments[i];n.emit.apply(n,[t,t].concat(r))},n.off=function(t){for(var e=arguments.length,r=Array(e>1?e-1:0),i=1;i<e;i++)r[i-1]=arguments[i];n.removeListener.apply(n,[t].concat(r))},this.on=n.on.bind(n),this.off=n.off.bind(n),this.trigger=n.trigger.bind(n);var o=this.abrController=new r.abrController(this),s=new r.bufferController(this),l=new r.capLevelController(this),u=new r.fpsController(this),d=new Qt(this),h=new $t(this),c=new te(this),f=new Se(this),p=this.levelController=new Te(this),g=this.streamController=new me(this),v=[p,g],y=r.audioStreamController;y&&v.push(new y(this)),this.networkControllers=v;var m=[d,h,c,o,s,l,u,f];if(y=r.audioTrackController){var b=new y(this);this.audioTrackController=b,m.push(b)}if(y=r.subtitleTrackController){var E=new y(this);this.subtitleTrackController=E,m.push(E)}[r.subtitleStreamController,r.timelineController].forEach(function(t){t&&m.push(new t(e))}),this.coreComponents=m}return t.isSupported=function(){return M()},Nr(t,null,[{key:"version",get:function(){return"0.8.9"}},{key:"Events",get:function(){return Ot.a}},{key:"ErrorTypes",get:function(){return Ct.b}},{key:"ErrorDetails",get:function(){return Ct.a}},{key:"DefaultConfig",get:function(){return t.defaultConfig?t.defaultConfig:Fr},set:function(e){t.defaultConfig=e}}]),t.prototype.destroy=function(){Pt.b.log("destroy"),this.trigger(Ot.a.DESTROYING),this.detachMedia(),this.coreComponents.concat(this.networkControllers).forEach(function(t){t.destroy()}),this.url=null,this.observer.removeAllListeners(),this._autoLevelCapping=-1},t.prototype.attachMedia=function(t){Pt.b.log("attachMedia"),this.media=t,this.trigger(Ot.a.MEDIA_ATTACHING,{media:t})},t.prototype.detachMedia=function(){Pt.b.log("detachMedia"),this.trigger(Ot.a.MEDIA_DETACHING),this.media=null},t.prototype.loadSource=function(t){t=kt.a.buildAbsoluteURL(window.location.href,t,{alwaysNormalize:!0}),Pt.b.log("loadSource:"+t),this.url=t,this.trigger(Ot.a.MANIFEST_LOADING,{url:t})},t.prototype.startLoad=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1;Pt.b.log("startLoad("+t+")"),this.networkControllers.forEach(function(e){e.startLoad(t)})},t.prototype.stopLoad=function(){Pt.b.log("stopLoad"),this.networkControllers.forEach(function(t){t.stopLoad()})},t.prototype.swapAudioCodec=function(){Pt.b.log("swapAudioCodec"),this.streamController.swapAudioCodec()},t.prototype.recoverMediaError=function(){Pt.b.log("recoverMediaError");var t=this.media;this.detachMedia(),this.attachMedia(t)},Nr(t,[{key:"levels",get:function(){return this.levelController.levels}},{key:"currentLevel",get:function(){return this.streamController.currentLevel},set:function(t){Pt.b.log("set currentLevel:"+t),this.loadLevel=t,this.streamController.immediateLevelSwitch()}},{key:"nextLevel",get:function(){return this.streamController.nextLevel},set:function(t){Pt.b.log("set nextLevel:"+t),this.levelController.manualLevel=t,this.streamController.nextLevelSwitch()}},{key:"loadLevel",get:function(){return this.levelController.level},set:function(t){Pt.b.log("set loadLevel:"+t),this.levelController.manualLevel=t}},{key:"nextLoadLevel",get:function(){return this.levelController.nextLoadLevel},set:function(t){this.levelController.nextLoadLevel=t}},{key:"firstLevel",get:function(){return Math.max(this.levelController.firstLevel,this.minAutoLevel)},set:function(t){Pt.b.log("set firstLevel:"+t),this.levelController.firstLevel=t}},{key:"startLevel",get:function(){return this.levelController.startLevel},set:function(t){Pt.b.log("set startLevel:"+t);var e=this;-1!==t&&(t=Math.max(t,e.minAutoLevel)),e.levelController.startLevel=t}},{key:"autoLevelCapping",get:function(){return this._autoLevelCapping},set:function(t){Pt.b.log("set autoLevelCapping:"+t),this._autoLevelCapping=t}},{key:"autoLevelEnabled",get:function(){return-1===this.levelController.manualLevel}},{key:"manualLevel",get:function(){return this.levelController.manualLevel}},{key:"minAutoLevel",get:function(){for(var t=this,e=t.levels,r=t.config.minAutoBitrate,i=e?e.length:0,a=0;a<i;a++){if((e[a].realBitrate?Math.max(e[a].realBitrate,e[a].bitrate):e[a].bitrate)>r)return a}return 0}},{key:"maxAutoLevel",get:function(){var t=this,e=t.levels,r=t.autoLevelCapping;return-1===r&&e&&e.length?e.length-1:r}},{key:"nextAutoLevel",get:function(){var t=this;return Math.min(Math.max(t.abrController.nextAutoLevel,t.minAutoLevel),t.maxAutoLevel)},set:function(t){var e=this;e.abrController.nextAutoLevel=Math.max(e.minAutoLevel,t)}},{key:"audioTracks",get:function(){var t=this.audioTrackController;return t?t.audioTracks:[]}},{key:"audioTrack",get:function(){var t=this.audioTrackController;return t?t.audioTrack:-1},set:function(t){var e=this.audioTrackController;e&&(e.audioTrack=t)}},{key:"liveSyncPosition",get:function(){return this.streamController.liveSyncPosition}},{key:"subtitleTracks",get:function(){var t=this.subtitleTrackController;return t?t.subtitleTracks:[]}},{key:"subtitleTrack",get:function(){var t=this.subtitleTrackController;return t?t.subtitleTrack:-1},set:function(t){var e=this.subtitleTrackController;e&&(e.subtitleTrack=t)}},{key:"subtitleDisplay",get:function(){var t=this.subtitleTrackController;return!!t&&t.subtitleDisplay},set:function(t){var e=this.subtitleTrackController;e&&(e.subtitleDisplay=t)}}]),t}();e.default=Mr},function(t,e,r){function i(t){function e(i){if(r[i])return r[i].exports;var a=r[i]={i:i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,e),a.l=!0,a.exports}var r={};e.m=t,e.c=r,e.i=function(t){return t},e.d=function(t,r,i){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/",e.oe=function(t){throw console.error(t),t};var i=e(e.s=ENTRY_MODULE);return i.default||i}function a(t){return(t+"").replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}function n(t){var e=[],r=t.toString(),i=r.match(/^function\s?\(\w+,\s*\w+,\s*(\w+)\)/);if(!i)return e;for(var n,o=i[1],s=new RegExp("(\\\\n|\\W)"+a(o)+"\\((/\\*.*?\\*/)?s?.*?([\\.|\\-|\\w|/|@]+).*?\\)","g");n=s.exec(r);)e.push(n[3]);return e}function o(t,e){for(var r=[e],i=[],a={};r.length;){var o=r.pop();if(!a[o]&&t[o]){a[o]=!0,i.push(o);var s=n(t[o]);r=r.concat(s)}}return i}t.exports=function(t,e){e=e||{};var a=r.m,n=e.all?Object.keys(a):o(a,t),s="("+i.toString().replace("ENTRY_MODULE",JSON.stringify(t))+")({"+n.map(function(t){return JSON.stringify(t)+": "+a[t].toString()}).join(",")+"})(self);",l=new window.Blob([s],{type:"text/javascript"});if(e.bare)return l;var u=window.URL||window.webkitURL||window.mozURL||window.msURL,d=u.createObjectURL(l),h=new window.Worker(d);return h.objectURL=d,h}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(7),a=r(1),n=r(0),o=r(5),s=r.n(o),l=function(t){var e=new s.a;e.trigger=function(t){for(var r=arguments.length,i=Array(r>1?r-1:0),a=1;a<r;a++)i[a-1]=arguments[a];e.emit.apply(e,[t,t].concat(i))},e.off=function(t){for(var r=arguments.length,i=Array(r>1?r-1:0),a=1;a<r;a++)i[a-1]=arguments[a];e.removeListener.apply(e,[t].concat(i))};var r=function(e,r){t.postMessage({event:e,data:r})};t.addEventListener("message",function(a){var o=a.data;switch(o.cmd){case"init":var s=JSON.parse(o.config);t.demuxer=new i.a(e,o.typeSupported,s,o.vendor);try{Object(n.a)(!0===s.debug)}catch(t){console.warn("demuxerWorker: unable to enable logs")}r("init",null);break;case"demux":t.demuxer.push(o.data,o.decryptdata,o.initSegment,o.audioCodec,o.videoCodec,o.timeOffset,o.discontinuity,o.trackSwitch,o.contiguous,o.duration,o.accurateTimeOffset,o.defaultInitPTS)}}),e.on(a.a.FRAG_DECRYPTED,r),e.on(a.a.FRAG_PARSING_INIT_SEGMENT,r),e.on(a.a.FRAG_PARSED,r),e.on(a.a.ERROR,r),e.on(a.a.FRAG_PARSING_METADATA,r),e.on(a.a.FRAG_PARSING_USERDATA,r),e.on(a.a.INIT_PTS_FOUND,r),e.on(a.a.FRAG_PARSING_DATA,function(e,r){var i=[],a={event:e,data:r};r.data1&&(a.data1=r.data1.buffer,i.push(r.data1.buffer),delete r.data1),r.data2&&(a.data2=r.data2.buffer,i.push(r.data2.buffer),delete r.data2),t.postMessage(a,i)})};e.default=l}]).default});







