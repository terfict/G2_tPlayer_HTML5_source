// JavaScript Document - G224A│g224A_quiz.js
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
var g224A =  NOU.namespace('NOU.modules.g224A');
//------------------------


param.ivqHasMediaArr = [];
param.newMedia = [];
g224A.audioStatus = 'stop';


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




$(document).ready(function(){
	
	//●整體縮放頁面 - 強迫設定為1.0，以避免播放控制失常
	//============================
	$('body').css('zoom','1.0');
	//============================
	
	
	
	//●從下面移上來，才能在method.createQuiz(0)、g224A.createAudioHtml()之前取得平台、瀏覽器等資訊，供其判斷。
	utils.userAgentProp();
	utils.detectBrowserVersion();
	
	
	
	//
	$('.g224A_help a img')
	.on('mouseover',function(){
		$(this).attr('src','images/help_over.png');
	})
	.on('mouseout',function(){
		$(this).attr('src','images/help.png');
	})
	.on('mousedown',function(){
		$('.g224A_help a').attr({'href':param.helpUrl,target:'_blank'});
	});
	
	
	
	//------------------------------------------------------
	
	//1060831
	//==================================《《《
	method.createQuiz(0);
	//==================================《《《
	
	
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


























