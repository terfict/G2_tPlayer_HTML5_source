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
//程式初始化時，會抓取.pageWrappe的width和min-height的字串值並存入
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
		$('#info').append(urlObj.rtmpMediaURLArr[index]+'</br>');
		


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
            $('.fontSize:eq(' + index + ')').css('font-size', parseInt($('.fontSize:eq(' + index + ')').css('font-size')) - 1);
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
            $('.fontSize:eq(' + index + ')').css('font-size', parseInt($('.fontSize:eq(' + index + ')').css('font-size')) + 1);
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
	var h5MediaObjId = "html5Media" + index.toString();


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
	'<video id=' + h5MediaObjId + ' preload="metadata">'+
	/*'<source class="source" type="video/mp4" />'+ */
	'您的瀏覽器不支援 HTML5 Video Tag，所以無法播放本單元教材，請嘗試更換瀏覽器以解決無法瀏覽問題。'+
	/*'<embed height='32' width='640' src=" + param.mediaURLArr[index] + "'>'+*/
	'</video>';

	//●●●
	$('.mediaDiv:eq(' + index + ')').prepend(embedH5MediaHtml);
	//
	tPlayer.h5MediaObj[index] = document.getElementById( h5MediaObjId );
	
	
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
	//●媒體檔在串流端，就算有●行700： tPlayer.h5MediaObj[index].load()，Android播放之前都抓不到duration，
	//在local端，不用●行700： tPlayer.h5MediaObj[index].load()，也能在播放前就抓到duration
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
	param.mediaAutoPlayArr[index] ? (/*tPlayer.setPlayFlag(true, index) & */tPlayer.h5MediaObj[index].play()) : tPlayer.setPlayFlag(false, index);
	
	
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
		
	//●○1040911 - 播放介面在下。
	}else if(param.beforeOrAfter[index] === "after"){
		$('.mediaWrapper:eq(' + index + ') .playbackDiv').insertAfter($('.mediaDiv:eq(' + index + ')'));
		$('.mediaDiv:eq(' + index + ')').height(param.mediaHeightArr[index]);
		$('.mediaWrapper:eq(' + index + ')').height(param.mediaHeightArr[index] + headerHeight + playbackDivHeight); 
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
	caculateTrackWidth($('.mediaWrapper:eq(' + index + ') .playbackDiv').width(), index);
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
function caculateTrackWidth(_allWidth, index){

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
			if(param.currTimeArr[0] <= param.timeCodeArr[indexNum]){
				method.pauseNQuiz(indexNum);
				//console.log('index=0');
			}

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
						//caculateTrackWidth($('.mediaWrapper:eq(' + index + ') .playbackDiv').width(), index);
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








//●●● TPlayer API ●●●
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
			tPlayer.h5MediaObj[index].play();

			return true;
		};


//●○1040513 - 暫停所有媒體檔
//------------------------
method.pauseAllMedia = function(_currIndex){
	$('.mediaWrapper').each(function(index, element) {
		if(_currIndex !== index){
			tPlayer.pause(index);
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
		tPlayer.h5MediaObj[index].currentTime = _targetTime;
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


//未用到
//MDN - Using fullscreen mode
//https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode
tPlayer.toggleFullScreen = function (element) {

	//
	if (!document.mozFullScreen && !document.webkitFullScreen) {
      if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else {
        element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else {
        document.webkitCancelFullScreen();
      }
    }

  /*document.addEventListener("keydown", function(e) {
    if (e.keyCode == 13) {
      toggleFullScreen();
    }
  }, false);*/


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
		caculateTrackWidth(mediaWidth, index);
		//==============================================
		method.jqUITouchPunchDrag(index);


		//1040630 - 從上方移到此位置，在caculateTrackWidth()之後
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
			caculateTrackWidth(mediaWidth, index); 
			//caculateTrackWidth(mediaWidth, index);
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
			caculateTrackWidth(_mediaW, index); 
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
			
			if( param.courseCode !== "" ){
				urlObj.rtmpMediaURLArr[index] = param.courseCode +'/' + 'mp4:' + param.mediaURLArr[index];
			}else if( param.courseCode === "" ){
				urlObj.rtmpMediaURLArr[index] = 'mp4:' + param.mediaURLArr[index];
			}
			

		//.mp3
		}else if(param.mediaFileExtArr[index] === ".mp3"){
			
			if( param.courseCode !== "" ){
				urlObj.rtmpMediaURLArr[index] = param.courseCode +'/' + 'mp3:' + param.mediaURLArr[index];
			}else if( param.courseCode === "" ){
				urlObj.rtmpMediaURLArr[index] = 'mp3:' + param.mediaURLArr[index];
			}
			
			
			//alert(urlObj.rtmpMediaURLArr[index]);
		//.m4a - ●不知是否可行 ? - 尚未測試驗證。
		//Using RTMP Streaming
		//http://support.jwplayer.com/customer/portal/articles/1430358-using-rtmp-streaming
		//An mp4: prefix is also required for M4A/F4A/AAC audio files:
		//●根據jWplayer網頁上說明：.m4a需要加上"mp4前綴"
		
		}else if(param.mediaFileExtArr[index] === ".m4a"){
			
			if( param.courseCode !== "" ){
				urlObj.rtmpMediaURLArr[index] = param.courseCode +'/' + 'mp4:' + param.mediaURLArr[index];
			}else if( param.courseCode === "" ){
				urlObj.rtmpMediaURLArr[index] = 'mp4:' + param.mediaURLArr[index];
			}
			//alert(urlObj.rtmpMediaURLArr[index]);
			
		}
		//alert(urlObj.rtmpMediaURLArr[index]);

		//如果要播mp3(串流)，此處必須標示mp3，且不能有.mp3延伸檔名。
		//urlObj.rtmpMediaURLArr[index] = param.courseCode +'/' + 'mp3:' + param.mediaURLArr[index];
		//------------------------------------------------------------------
		if( param.courseCode !== "" ){
			urlObj.rtspMediaURLArr[index] = param.rtspProtocol + '://' + param.streamingURLPrefix + param.courseCode +'/' + param.mediaURLArr[index];
			urlObj.iosMediaURLArr[index] = param.appleHlsProtocol + '://' + param.streamingURLPrefix + param.courseCode +'/' + param.mediaURLArr[index] + "/playlist.m3u8";
		}else if( param.courseCode === "" ){
			urlObj.rtspMediaURLArr[index] = param.rtspProtocol + '://' + param.streamingURLPrefix + param.mediaURLArr[index];
			urlObj.iosMediaURLArr[index] = param.appleHlsProtocol + '://' + param.streamingURLPrefix + param.mediaURLArr[index] + "/playlist.m3u8";
		}
		
		//
		urlObj.progressiveMediaURLArr[index] = param.localDirectoryRoot + param.mediaURLArr[index];
	
	
	//若賦值為　'local'　- 則連結近端影音檔
	}else if(param.chooseSreamingOrLocalVideo === 'local'){

		urlObj.rtmpMediaURLArr[index] = param.localDirectoryRoot + param.mediaURLArr[index];
		//alert(urlObj.rtmpMediaURLArr[index]);
		urlObj.rtspMediaURLArr[index] = param.localDirectoryRoot + param.mediaURLArr[index];
		urlObj.iosMediaURLArr[index] = param.localDirectoryRoot + param.mediaURLArr[index];
		urlObj.progressiveMediaURLArr[index] = param.localDirectoryRoot + param.mediaURLArr[index];
	
	
	//若為"else" - 可連結任意完整有效網址：需在HTML的mediaTarget設定完整有效網址。
	}else if(param.chooseSreamingOrLocalVideo === 'else'){
		
		urlObj.rtmpMediaURLArr[index] = param.mediaURLArr[index];
		urlObj.rtspMediaURLArr[index] = param.mediaURLArr[index];
		urlObj.iosMediaURLArr[index] = param.mediaURLArr[index];
		urlObj.progressiveMediaURLArr[index] = param.mediaURLArr[index];

	}else{
		alert('只能使用streaming或local');
	}

	//alert(urlObj.rtmpMediaURLArr+'\n\n'+urlObj.rtspMediaURLArr+'\n\n'+urlObj.iosMediaURLArr+'\n\n'+urlObj.progressiveMediaURLArr+'\n\n');

	//●return urlObj Object
	return urlObj;

};
//==============================================

//
//==============================================
method.choosePlayMode = function(){

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
			param.playModeArr = ["flash",urlObj.rtmpMediaURLArr];
			//param.playModeArr = ["html5",urlObj.iosMediaURLArr];

		}else if(utils.currentBrowser === "chrome"){
			param.playModeArr = ["flash",urlObj.rtmpMediaURLArr];
			//param.playModeArr = ["html5",urlObj.iosMediaURLArr];

		}else if(utils.currentBrowser === "safari"){
			param.playModeArr = ["flash",urlObj.rtmpMediaURLArr];
			//↓↓↓桌機筆電Windows的Safari 5.1.7版本，無法播放HTML5 Video
			//param.playModeArr = ["html5",urlObj.iosMediaURLArr];

		}else if(utils.currentBrowser === "firefox"){
			param.playModeArr = ["flash",urlObj.rtmpMediaURLArr];
			//param.playModeArr = ["html5",urlObj.iosMediaURLArr];

		}else if(utils.currentBrowser === "opera"){
			param.playModeArr = ["flash",urlObj.rtmpMediaURLArr];
			//param.playModeArr = ["html5",urlObj.iosMediaURLArr];

		}else{
			param.playModeArr = ["flash",urlObj.rtmpMediaURLArr];
			//param.playModeArr = ["html5",urlObj.iosMediaURLArr];

		}

	/*}else if(utils.isIE10 == true){
		//ie10

		*/
	}else{
		param.playModeArr = ["flash",urlObj.rtmpMediaURLArr];
		//param.playModeArr = ["html5",urlObj.iosMediaURLArr];

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
	
	var sec = parseInt(hmsArr[0])*60*60 + parseInt(hmsArr[1])*60 + parseFloat(hmsArr[2]);
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
			//●○●○●○1040630 - 必須有這行-即時計算 .playbackDiv寬度，再調用caculateTrackWidth()
			//否則，全畫面時，點即.barOuter，播放器介面會縮回一般畫面寬度，拖曳播放頭時，播放時間會不準確。
			//=============================================================================
			var currMediaWidth = $('.mediaWrapper:eq(' + 0 + ') .playbackDiv').width();
			//=============================================================================
	
			//
			currBarOuterWidth = caculateTrackWidth(currMediaWidth, 0);
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
		//●○●○●○1040630 - 必須有這行-即時計算 .playbackDiv寬度，再調用caculateTrackWidth()
		//否則，全畫面時，點即.barOuter，播放器介面會縮回一般畫面寬度，拖曳播放頭時，播放時間會不準確。
		//=============================================================================
		var currMediaWidth = $('.mediaWrapper:eq(' + 0 + ') .playbackDiv_2').width();
		//=============================================================================

		//
		currBarOuterWidth = caculateTrackWidth(currMediaWidth, 0);
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

	if(currT >= t1-0.25 && currT <= t1){

		//tmpHtml5VideoVolume = html5Video.volume;
		//html5Video.volume = 0.0;

		//●○●○●○ 1040807 ●○●○●○
		var _pauseDelayTime;
		if(param.playModeArr[0] === 'flash'){
			_pauseDelayTime = param.pauseDelayTime;

		}else if(param.playModeArr[0] === 'html5'){
			if(param.isAndroid){
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







/*************************『無』點小圖跳大圖之圖檔之取值計算、RWD大小尺寸************************/


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
				
				
				//●◎●◎●◎
				$('.zoomIconSpan:eq(' + index + ')').css({'position':'relative','left':toBigPicWH.w[index]-zoomIconW,'top':-toBigPicWH.h[index]});
				
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
	var $imgDomObj = $('<img src=' + imgSrc + ' width=' + _w /*+ ' height=' + _h*/ + '>');
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
				//
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















