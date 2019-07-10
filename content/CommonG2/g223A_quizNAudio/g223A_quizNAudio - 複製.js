// JavaScript Document - G223A│g223A_quizNAudio.js
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
var g223A =  NOU.namespace('NOU.modules.g223A');
//------------------------


param.ivqHasMediaArr = [];
param.newMedia = [];
g223A.audioStatus = 'stop';


//1041202 - 需置於上方，method.lessThenIE9Css()才調用得到。
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



//●○※●○※ 1061108 - 覆蓋主程式tPlayer.js裡同名函式 ●○※●○※
//==============================================
method.choosePlayMode__XXX = function(){ 

	//alert(utils.currentBrowser);

	if(utils.isMobile === true && utils.isIOS === true){
		//以下為 Apple ios 行動裝置

		if(utils.currentBrowser === "safari"){

			param.playModeArr = ["html5",urlObj.iosMediaURLArr];

		}else if(utils.currentBrowser === "chrome"){
			// ios puffin 瀏覽器 一開始偵測為"chrome", 後來又變成"safari" ?????? 
			//ios puffin瀏覽器可以跑HTML5 Video Tag (Apple HLS mp4) / 也可以跑Flash mp4 rtmp, 但在目前程式下Flash畫面頓頓的, 1011003__testVideo.html則不會.
			//清除暫存檔後,似乎清不乾淨, 會不穩定的有時跑HTML%影音,有時跑Flash mp4

			param.playModeArr = ["html5",urlObj.iosMediaURLArr];

		}else{

			param.playModeArr = ["html5",urlObj.iosMediaURLArr];

		}

		//直接(將iosAudioPath)Apple http live streaming 的 URL 丟給 ios 裝置
		//location.href = iosAudioPath;

	}else if(utils.isMobile === true && utils.isAndroid === true){
		//以下非ios 行動裝置 - Browser, 例:Android - Chrome

		if(utils.currentBrowser === "chrome"){
			//Android Chrome 與 Android 預設瀏覽器都被判讀為chrome
			
			//Android版Chrome不支援Flash Player, 現在沒有,以後也不會有Flash Player
			//目前測試,Android版Chrome跑HTML5 Audio Tag + 串流mp3, 似乎跑不出來, mp3走 web server漸進式則可

			//Android os上, Chrome無Flash Player，可用HTML5 Video Tag播rtsp串流mp4，或播近端mp4
			//但1021101發現Android Chrome 無法吃 rtsp 串流，從Wowza官網技術文件找到資訊 → 可以吃 Apple HLS 串流

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

		//以下桌機上瀏覽器 - (非mobile) - 只在pc上測試過 / ***未能有http串流, 所以只好用Flash 

		if(utils.currentBrowser === "msie"){
			param.playModeArr = ["flash",urlObj.rtmpMediaURLArr];
			//param.playModeArr = ["html5",urlObj.iosMediaURLArr];

		}else if(utils.currentBrowser === "chrome"){
			//param.playModeArr = ["flash",urlObj.rtmpMediaURLArr];
			param.playModeArr = ["html5",urlObj.iosMediaURLArr];

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





//●1060831 - 此處method.createQuiz用來覆蓋tPlayer.js的同名方法。
//
//建立「評量」
method.createQuiz = function(indexNum){
	
	//●●●1031127 - 影音暫停點可選擇出現「●評量」或「●小反思」功能，只能選擇其一。寬度與影音寬度相同。
		//《 ◎評量 》
		if($('.quizSet:eq(' + indexNum + ') .quizzing').get(0) !== undefined){
			//alert($('.quizSet:eq(' + indexNum + ')').children('.quizzing'));

			//$('#info').html('quizDiv');

			//●1031127 - 改為放到此處
			//加入評量 / $('#quizDiv')被加入到$('.mediaDiv') --> ●●●1060831改為由.pageWrapper append #quizDiv
			/*********************************************************************/
			$('.pageWrapper').append('<div id="quizDiv"></div>');
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
			//method.quizAdjust();
			
	
				
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


//●1060831 - 此處method.quizAdjust用來覆蓋tPlayer.js的同名方法。
//調整「評量」的位置、寬高，使符合,影音區塊或mediaDiv的大小
method.quizAdjust = function(){
	
	//●○1060831 - 全部清空，不做任何動作。
	//《《《《《《《《《《《《===========================================《《《《《《《

	
};



g223A.getIvqHasMediaArr = function(){

	//●○//=================================================
	$('.quizSet').each(function(quizSetIndex) {
	//●○//=================================================
	
	
		
		//
		param.newMedia[quizSetIndex] = [];
		
		

		//●○●○●○1060727
		//●○//=================================================
		$('.quizSet:eq(' + quizSetIndex + ') .quizzing').each(function(quizzingIndex) {
		//●○//=================================================
		

		
			
			//●○●○●○
			//********************************************************************************************
			if( $('.quizSet:eq(' + quizSetIndex + ') .quizzing:eq(' + quizzingIndex +') .addVoice').get(0) !== undefined ){
				
				
				//●●●記錄哪些quizSetIndex、quizzingIndexu有加入語音檔
				//=============================================================================
				param.ivqHasMediaArr.push([quizSetIndex,quizzingIndex]) ;
				//=============================================================================
				
				
			}else{
				
				
			}
			//alert(param.ivqHasMediaArr);
			
			
		});
		
		
		
		
	});
	//●○//=================================================

};


//
g223A.createAudioHtml = function(){
	
	//●○//=================================================
	$.each(param.ivqHasMediaArr, function(index){
		
		//
		param.ivqHasMediaArr[index][2] = index;
		//
		
		//
		//●○1060728 - 產生 語音檔HTML設定字串
		//==========================================================================
		param.newMedia[index] = 
		
		'<div class="mediaWrapper">'+
			'<div class="mediaDiv">'+
				'<span class="mediaTarget">' + $('.quizSet:eq(' + param.ivqHasMediaArr[index][0] + ') .quizzing .addVoice:eq(' + param.ivqHasMediaArr[index][1] + ')').text() + '</span>'+
				'<span class="mediaAutoPlay">false</span>'+
				'<span class="mediaWidth">640</span>'+
				'<span class="mediaHeight">0</span>'+
				'<span class="beforeOrAfter">before</span>'+
			'</div>'+
		'</div>';
		
		
		////●○1060728
		//alert( param.newMedia[index] );
		//==========================================================================
		
		
		////●○1060728
		$('.pageWrapper').append( param.newMedia[index] );
			
		//
		//alert($('.pageWrapper .mediaWrapper:eq(' + (index+1) + ')').html());
		
		
		
		
		
		
	});
	//=============================================================================
	//=============================================================================
	
	
	//
	//alert($('.pageWrapper .mediaWrapper').length);
	//alert( $('.mediaWrapper').length );
	
};



$(document).ready(function(){
	
	//●整體縮放頁面 - 強迫設定為1.0，以避免播放控制失常
	//============================
	$('body').css('zoom','1.0');
	//============================
	
	
	
	//●從下面移上來，才能在method.createQuiz(0)、g223A.createAudioHtml()之前取得平台、瀏覽器等資訊，供其判斷。
	utils.userAgentProp();
	utils.detectBrowserVersion();
	
	
	//------------------------------------------------------
	g223A.getIvqHasMediaArr();
	
	
	//
	$('.g223A_help a img')
	.on('mouseover',function(){
		$(this).attr('src','images/help_over.png');
	})
	.on('mouseout',function(){
		$(this).attr('src','images/help.png');
	})
	.on('mousedown',function(){
		$('.g223A_help a').attr({'href':param.helpUrl,target:'_blank'});
	});
	
	
	//1060831
	//==================================《《《
	method.createQuiz(0);
	//==================================《《《
	
	
	g223A.createAudioHtml();
	//------------------------------------------------------
	
	
	
	
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
	//utils.userAgentProp();
	//utils.detectBrowserVersion();
	//
	method.choosePlayMode();
	method.deployment();


	//
	$('.mediaWrapper').each(function(index) {
		
		
		//●會造成小尺寸視窗時，影音播放進度列crash。所以改用透明度0.0，來隱藏語音的播放進度列。
		//●也不能使用display:none和visibility:hidden，否則IE會本機或線上看不到語音播放進度列，及評量題。
		//但後來又可以了。
		//===================================●
		//param.hasCustomControls = false;
		//===================================●
		
		method.embedMedia(index);
		//==================================================================●
		//●◎只能使用透明度隱藏語音播放進度列。
		$('.mediaWrapper:eq(' + index + ')').css({'opacity':'0.0','position':'absolute','top':'-600px'});
		
		
		//媒體介面是否有進場jQ動作 ? 
		//●這一定要在 method.embedMedia(index) 之後調用，所以移到各版型主程式調用。
		/*if(param.hasEnteringMotion){
			//媒體介面進場jQ動作 
			method.entering(index);
		}*/

		
	});
	//===================================
	
	
	
	//alert($('.mediaWrapper').length);
	
	
	
	// IE6~IE8
	method.lessThenIE9Css();
	
});

//1041202
$(window).on('resize', function(){
	// IE6~IE8
	method.lessThenIE9Css();
});









//>>>=============================================================>>>
})(jQuery); //↑↑↑


























