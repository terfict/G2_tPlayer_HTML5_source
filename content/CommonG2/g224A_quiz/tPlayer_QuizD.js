////////////////////////////////////////////////////////
/******************************************************/
var NOU = NOU || {};
//-----------------------------------------------------

(function($){
/*----------------------------------------------------*/
var tPlayer = NOU.namespace('NOU.modules.tPlayer');
//------------------------
var utils = NOU.namespace('NOU.modules.tPlayer.utils');
//------------------------
var param = NOU.namespace('NOU.modules.tPlayer.param');
//------------------------
var method = NOU.namespace('NOU.modules.tPlayer.method');
//------------------------
var c21Quiz = NOU.namespace('NOU.modules.c21Quiz');
//------------------------
var g224A =  NOU.namespace('NOU.modules.g224A');
//------------------------


var quizTotal;
var singleChoiceTotal;
var trueFalseTotal;
var currentQuiz;
var currentSingleChoiceAnswer;
var currentTrueFalseAnswer;
var rightFalseArr;
var singleChoiceRight;
var singleChoiceWrong;
var trueFalseRight;
var trueFalseWrong;
/*tmpType：題型的英文字串*/
var tmpType;

var quizSetTotal;
var currentQuizSet;

//●1031130
var quizzingFRNumArr;



$(document).ready(function(e) {
	//init();
});


/*******************************************/
/*******************************************/
c21Quiz.initQuiz = function(_currentQuizSet){
	
	//1041201
	param.quizImgPath = param.mainPath + "tPlayer_CSS/quizUI/";
	
	//quizzingFRNumArr = [];
	currentQuizSet = _currentQuizSet;
	
	initData();
	
};
/*******************************************/
/*******************************************/



function initData(){
	
	//●1031201
	//---------------------
	quizzingFRNumArr = [];
	initQuizingFRArr();
	//---------------------
	
	
	/**/
	quizTotal = 0;
	singleChoiceTotal = 0;
	trueFalseTotal = 0;
	
	//目前的題目索引編號 - o base
	currentQuiz = 0;
	
	rightFalseArr = [];
	singleChoiceRight = 0;
	singleChoiceWrong = 0;
	trueFalseRight = 0;
	trueFalseWrong = 0;
	
	//有多少個題組 -- 即會暫停幾次跳出評量
	quizSetTotal = $('#questionsData .quizSet').length;
	//alert(quizSetTotal);
	
	//備用
	//$('#questionsData .quizSet:eq(' + _currentQuizSet + ')')
	
	
	/**/
	//quizTotal = $('#questionsData .quizzing').length;
	
	/*取得單選題數目*/
	singleChoiceTotal = getSingleTotal();
	/*取得是非題數目*/
	trueFalseTotal = getTrueFalseTotal();
	/*alert("singleChoiceTotal : " + singleChoiceTotal + "\n" + "trueFalseTotal : " + trueFalseTotal);*/
	/*題目總數*/
	quizTotal = singleChoiceTotal + trueFalseTotal;
	/*alert('singleChoiceTotal:'+singleChoiceTotal+' ↑ trueFalseTotal:'+trueFalseTotal+' ↑ quizTotal:'+quizTotal);*/
	
	/*顯示題目總數*/
	showQuizTotal();
	
	
	/*if($('#quizFeedbackContainer')){
		alert('zzz');
		$('#quizFeedbackContainer').empty().remove();
	}*/

	
	/*************第一題*************/
	determineQuizType(currentQuiz);
	/*************第一題*************/
	
	/*var intervalCurrentQuiz = intervar();*/
	
}


//●1031130
//---------------------------------------------
function initQuizingFRArr(){
	//$('#info').css({'display':'block'});
	
	var showInfo = [];
		
	$('.quizSet').each(function(index1){
		//$('#info').append('第'+(index1+1)+'個 .quizSet： ');
		
		$('.quizSet:eq(' + index1 + ') .quizzing').each(function(index2){
			
			//if($('.quizSet:eq(' + index1 + ') .quizzing:eq(' + index2 + ')').get(0) != undefined){
				//$('#info').append($('.quizSet:eq(' + index1 + ') .quizzing:eq(' + index2 + ')' ).html()+'<br>');
				
				//A.
				/*quizzingFRNumArr[index1] = [index1,index2];
				showInfo[index1] = ([index1+1,index2+1]);
				$('#info').append(showInfo[index1]+'<br>');*/
				
				//B.
				/*quizzingFRNumArr[index1] = [index2+1,0];
				$('#info').append((index1+1)+'. quizSet '+(index1+1)+' ： quizzing '+quizzingFRNumArr[index1][0]+' ： '+quizzingFRNumArr[index1][1]+'<br>');*/
				
				
				//●1031201 - 將評量題的答錯累計數量初始化為0，並依照評量題資料定義的前後順序賦值為1維陣列
			  //●程式處理請見 - 單選題：行691、697、703 │ 是非題：行1285、1298、1304、
				quizzingFRNumArr.push(0);				
				
			//}
			
		});
		
	});
	
}



/*取得單選題數目*/
function getSingleTotal(){
	var tmp = 0;
	$('#questionsData .quizSet:eq(' + currentQuizSet + ') .questionType').each(function(index){
		if($('#questionsData .quizSet:eq(' + currentQuizSet + ') .questionType:eq(' + index + ')').text() == "singleChoice"){
			tmp ++;
		}
	});
	//alert('getSingleTotal : ' + tmp);
	return tmp;
}

/*取得是非題數目*/
function getTrueFalseTotal(_currentQuizSet){
	var tmp = 0;
	$('#questionsData .quizSet:eq(' + currentQuizSet + ') .questionType').each(function(index){
		if($('#questionsData .quizSet:eq(' + currentQuizSet + ') .questionType:eq(' + index + ')').text() == "trueFalse"){
			tmp ++;
		}
	});
	//alert('getTrueFalseTotal : ' + tmp);
	return tmp;
}

/*資訊回饋區 --> 顯示題目總數*/
function showQuizTotal(){
	
	//◎共幾題、第幾題│#continueBtnSpan繼續播放按鈕│#submitBtnSpan提交按鈕
	//●●●1031201 - 對調#submitBtnSpan和#continueBtnSpan
	/*var quizTotalContainerHtmlStr = '<span id="quizTotalContainer"><span id="interactiveLeft">' + '《共 ' + '<span id="quizTotalSpan">' + quizTotal + '</span>' + ' 題' + ' / 第 ' + '<span id="feedbackCurrentQuizSpan">' + (currentQuiz+1) + '</span>' + ' 題》' + '</span></span><span id="interactiveRight"><span id="submitBtnSpan"><img src=' + param.quizImgPath + "submit.png" + ' alt="提交按鈕圖像"></span><span id="continueBtnSpan"><img src=' + param.quizImgPath + "continue.png" + ' alt="繼續播放按鈕圖像"></span></span>';*/
	
	//●1060831-砍掉繼續播放按鈕
	var quizTotalContainerHtmlStr = '<span id="quizTotalContainer"><span id="interactiveLeft">' + '《共 ' + '<span id="quizTotalSpan">' + quizTotal + '</span>' + ' 題' + ' / 第 ' + '<span id="feedbackCurrentQuizSpan">' + (currentQuiz+1) + '</span>' + ' 題》' + '</span></span><span id="interactiveRight"><span id="submitBtnSpan"><img src=' + param.quizImgPath + "submit.png" + ' alt="提交按鈕圖像"></span></span>';
	
	
	//
	$('#interactiveArea').html(quizTotalContainerHtmlStr);
	
	//繼續播放按鈕的滑鼠事件與處理
	continueBtnEvent();
}


//「繼續播放」按鈕的滑鼠事件與處理
function continueBtnEvent(){
	
	$('#continueBtnSpan img').on('mouseover',function(e){
		$(this).attr("src", param.quizImgPath + "continue_over.png");
	});
	
	$('#continueBtnSpan img').on('mouseout',function(e){
		$(this).attr("src", param.quizImgPath + "continue.png");
	});
	
	$('#continueBtnSpan img').on('mousedown',function(e){
		$(this).attr("src", param.quizImgPath + "continue_down.png");
		
		
	
		
		//●○●○●○●○●○●○1040703 =========================================================
		
		tPlayer.play(0);
		//$('#quizDiv, quizContainer').css({'display':'none'}); 
		
		//●○●○●○●○●○●○1040703 =========================================================
		
		
		
		
	});
}


/*目前沒用到*/
function xxxzzz(){
	
	$('.quizzing').each(function(index, element) {
		/*alert($('.quizzing .questionType:eq(' + index + ')').text());*/
        switch ($('.quizzing .questionType:eq(' + index + ')').text()){
			case "singleChoice":
			/*alert("zzz");*/
				$('#tmpInfo').append($('.quizzing .questionType:eq(' + index + ')').text() + ' ↑ ');
			break;
			case "trueFalse":
				
			break;
			default:
			break;
		}
    });
}



/*根據題型，調用題型創建的方法*/
function determineQuizType(_currentQuiz){
	
	
	/*提交鈕初始為不可使用狀態(opacity設為0.2) - 等點擊radio後才能使用*/
	$('#submitBtnSpan img').css({'opacity':'0.3'});
	
	
	/*取得題型英文字串*/
	tmpType = $('#questionsData .quizSet:eq(' + currentQuizSet + ') .quizzing:eq(' + _currentQuiz + ') .questionType').text();
	/*alert(tmpType);*/
	/*題型中文字串*/
	var tmpTypeChineseStr;
	
	if(tmpType == "singleChoice"){
		tmpTypeChineseStr = "單選題";
	}else if(tmpType == "trueFalse"){
		tmpTypeChineseStr = "是非題";
	}
	
	
	
	/*根據題型，調用題型創建的方法*/
	switch (tmpType){
		case "singleChoice":
			createSingleChoice(_currentQuiz, tmpTypeChineseStr);
		break;
		case "trueFalse":
			createTrueFalse(_currentQuiz, tmpTypeChineseStr)
		break;
		default:
		break;
	}
	
	
}

/*進入下一題*/
function nextQuiz(){
	
	
	//====================================================================●
	//●1060901
	//====================================================================●
	$.each(param.ivqHasMediaArr, function(index){
		tPlayer.pause( param.ivqHasMediaArr[index][2] );
		tPlayer.seek( 0, param.ivqHasMediaArr[index][2] );
		
		//
		playBtnState(index);
		//
		pauseBtnOffEvent();
		stopBtnOffEvent();
	});
	//====================================================================●
	//alert(param.ivqHasMediaArr);
	//====================================================================●
		
		
	
	/**/
	if(currentQuiz < quizTotal-1){
		
		/*調用determineQuizType()方法，currentQuiz先++再傳入為引數 --> ++currentQuiz*/
		currentQuiz++;
		
		/**/
		showQuizTotal();
		determineQuizType(currentQuiz);
		
		
		
		
		
	}
}




//●○●○●○1060725-修改●○●○●○ - tPlayer.play2 用來播放語音
tPlayer.play2 = function(index){


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

//========↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑





//HTML5 & Flash 媒體播放完成。
method.mediaCompleted = function(index){
	
		tPlayer.pause(index);
		tPlayer.seek(0, index);
		
		pauseBtnOffEvent();
		stopBtnOffEvent();
		$('.stopBtn img').trigger('mousedown');
		
		//●●●
		playBtnState(index);
		
	
	
};



function playBtnOffEvent(){
	$('.playBtn img').off('mouseover');
	$('.playBtn img').off('mouseout');
	$('.playBtn img').off('mousedown');
	
	$('.playBtn img').css({'opacity':'0.5','cursor':'default'});
	
	$('.pauseBtn img').css({'opacity':'1.0','cursor':'pointer'});
	$('.stopBtn img').css({'opacity':'1.0','cursor':'pointer'});
}

function pauseBtnOffEvent(){
	$('.pauseBtn img').off('mouseover');
	$('.pauseBtn img').off('mouseout');
	$('.pauseBtn img').off('mousedown');
	
	$('.pauseBtn img').css({'opacity':'0.5','cursor':'default'});
	
	$('.stopBtn img').css({'opacity':'1.0','cursor':'pointer'});
	$('.playBtn img').css({'opacity':'1.0','cursor':'pointer'});
}

function stopBtnOffEvent(){
	$('.stopBtn img').off('mouseover');
	$('.stopBtn img').off('mouseout');
	$('.stopBtn img').off('mousedown');
	
	$('.pauseBtn img').css({'opacity':'0.5','cursor':'default'});
	$('.stopBtn img').css({'opacity':'0.5','cursor':'default'});
	
	$('.playBtn img').css({'opacity':'1.0','cursor':'pointer'});
}

//
function initBtnState(index){
	
	//alert(utils.isAndroid + '/' + g224A.audioAutoPlay);
	
	
	if( (utils.isMobile && utils.isAndroid) || (utils.isMobile && utils.isIOS) ){
		 g224A.audioAutoPlay = false; 
	}else{
		g224A.audioAutoPlay = true; 
	}
	//alert('g224A.audioAutoPlay : ' + g224A.audioAutoPlay);
	
	
	
	//●○ 語音是否自動播放 - 自動播放：true│不自動播放：false
	if( g224A.audioAutoPlay ){ 
		
		
		//●1060905
		//==============================================================●
		setTimeout(function(){
			//
			//-------------------------------《《《
			//自動播放
			tPlayer.play2( param.ivqHasMediaArr[index][2] );
			
			//
			g224A.audioStatus = 'play';  
			//
			playBtnOffEvent();
			//
			pauseBtnState(index);
			stopBtnState(index);
			
			//-------------------------------《《《
		},2000);
		//==============================================================●
		
		
	//	
	}else if( !g224A.audioAutoPlay ){
		//
		g224A.audioStatus = 'stop'; 
		// 
		pauseBtnOffEvent();
		stopBtnOffEvent();
		//
		playBtnState(index);
		
	}
}

//
c21Quiz.leaveAudio = function(){
	$('.playBtn img').off('mouseover');
	$('.playBtn img').off('mouseout');
	$('.playBtn img').off('mousedown');
	$('.pauseBtn img').off('mouseover');
	$('.pauseBtn img').off('mouseout');
	$('.pauseBtn img').off('mousedown');
	$('.pauseBtn img').off('mouseover');
	$('.pauseBtn img').off('mouseout');
	$('.pauseBtn img').off('mousedown');
};

//
function playBtnState(index){
	
	//=======================================
	$('.playBtn img').css({'opacity':1.0})
	
		.on('mouseover',function(){
			$(this).attr('src',param.mainPath + 'g224A_quiz/images/simplePlayer_playBtn_over.png');
		})
		.on('mouseout',function(){
			$(this).attr('src',param.mainPath + 'g224A_quiz/images/simplePlayer_playBtn.png');
		})
		
		.on('mousedown', function(){ 
			$(this).attr('src',param.mainPath + 'g224A_quiz/images/simplePlayer_playBtn.png').css({'opacity':0.5});
			//alert(param.ivqHasMediaArr[index][2]);
			
			tPlayer.play2( param.ivqHasMediaArr[index][2] );  //alert(param.ivqHasMediaArr[index][2]);
			g224A.audioStatus = 'play';  
					
			//
			pauseBtnState(index);
			stopBtnState(index);
			//
			playBtnOffEvent();
			
		})
		;
		
}

//
function pauseBtnState(index){
	
	//=======================================
	$('.pauseBtn img').css({'opacity':1.0})
		.on('mouseover',function(){
			$(this).attr('src',param.mainPath + 'g224A_quiz/images/simplePlayer_pauseBtn_over.png');
		})
		.on('mouseout',function(){
			$(this).attr('src',param.mainPath + 'g224A_quiz/images/simplePlayer_pauseBtn.png');
		})
		
		.on('mousedown', function(){ 
			$(this).attr('src',param.mainPath + 'g224A_quiz/images/simplePlayer_pauseBtn.png').css({'opacity':0.5});

								
			tPlayer.pause( param.ivqHasMediaArr[index][2] );
			g224A.audioStatus = 'pause';
			
			//
			playBtnState(index);
			stopBtnState(index);
			//
			pauseBtnOffEvent();
		})
		;
	
}

//
function stopBtnState(index){
	
	//=======================================
	$('.stopBtn img').css({'opacity':1.0})
		.on('mouseover',function(){
			$(this).attr('src',param.mainPath + 'g224A_quiz/images/simplePlayer_stopBtn_over.png');
		})
		.on('mouseout',function(){
			$(this).attr('src',param.mainPath + 'g224A_quiz/images/simplePlayer_stopBtn.png');
		})
		
		.on('mousedown', function(){ 
			$(this).attr('src',param.mainPath + 'g224A_quiz/images/simplePlayer_stopBtn.png').css({'opacity':0.5});
			
			
			tPlayer.pause( param.ivqHasMediaArr[index][2] );
			tPlayer.seek( 0, param.ivqHasMediaArr[index][2] );
			g224A.audioStatus = 'pause';
			
			//
			playBtnState(index);
			//
			pauseBtnOffEvent();
			stopBtnOffEvent();
		})
		;
	
}




//
/****************************建立單選題****************************/
function createSingleChoice(_currentQuiz, _tmpTypeChineseStr){
	
	
	/*搞定單選題-題目標題 - id="scQuestion"的sc二字，是singleChoice的簡寫 */
	/*quizArea：載入單選題或是非題的容器，例如載入singleChoiceDiv / singleChoiceDiv：單選題的容器 / scQuestion：單選題的題目 / 單選題被選擇的答案(會有幾個)*/
	/*--------------------------------------------------------------------------------------*/
	var singleChoiceDivHtmlStr = '<form><div id="singleChoiceDiv"><div id="scQuestion"></div><div id="scAnswer"><span><span></span></span></div></div></form>';
	
	$('#quizArea').html(singleChoiceDivHtmlStr);
	
	/*currentQuizSpan：載入題號 / _tmpTypeChineseStr：題型字串 */
	var tmpQuestion = '第 ' + '<span id="currentQuizSpan">' + (_currentQuiz+1) + '</span>' + ' 題 (' + _tmpTypeChineseStr + ')' + '： ' + $('#questionsData .quizSet:eq(' + currentQuizSet + ') .quizzing .question').get(_currentQuiz).innerHTML;
	
	$('#scQuestion').html(tmpQuestion);
	
	/*--------------------------------------------------------------------------------------*/
	
	
	
	//●○●○●○1060725-修改●○●○●○
	//===================================================================================
	
	//alert(currentQuiz);
	//alert(currentQuizSet + '/' + singleChoiceTotal + '/' + _currentQuiz);
	
	
	//====================================================================●
	$.each(param.ivqHasMediaArr, function(index){
		
			tPlayer.seek( 0, index );
			tPlayer.pause(index);
			//$('.mediaWrapper:eq(' + (index) + ')').css({'visibility':'hidden'});
		
	});
	//====================================================================●
	//alert(param.ivqHasMediaArr);
	
	
	
	
	//
	$.each( param.ivqHasMediaArr, function(index){ 
		
		//
		if( param.ivqHasMediaArr[index][0] === currentQuizSet ){ 
		
			
			if( param.ivqHasMediaArr[index][1] === _currentQuiz ){
				
				
				//1060726 - ●○加入語音專用播放介面
				var htmlStr = 
					'<div class="simplePlayer">'+
					'<div class="btnWrapper">'+
						'<span class="playBtn"><img src="' + param.mainPath + 'g224A_quiz/images/simplePlayer_playBtn.png" alt="play按鈕"></span>'+
						'<span class="pauseBtn"><img src="' + param.mainPath + 'g224A_quiz/images/simplePlayer_pauseBtn.png" alt="pause按鈕"></span>'+
						'<span class="stopBtn"><img src="' + param.mainPath + 'g224A_quiz/images/simplePlayer_stopBtn.png" alt="stop按鈕"></span>'+
					'</div>'+
					'</div>';
					
				$('#scQuestion').append(htmlStr);
				
				
				//alert(param.mainPath + 'g224A_quiz/images/simplePlayer_stopBtn.png');


				//●1060905
				//================================================================●
				//setTimeout(function(){
					//
					//-------------------------------《《《
					initBtnState(index);
					//-------------------------------《《《
				//},2000);
				//================================================================●
			}
			
		}
	
	});
	

	//===================================================================================
	//========↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
	
	
	
	
	/*搞定單選題-供選擇之答案 radio group*/
	/*--------------------------------------------------------------------------------------*/
	/*定義題目橫列的<input type="radio">，及其屬性*/
	var radioHtmlStr = '<input type="radio" name="singleChoiceRadio" class="singleChoiceRadio" value="">';
	
	/*第_currentQuiz組的 $(.quizzing .answerContainer) 會包含不特定數量的 .answer 。取得其包裹集合，指定給變數$tmpAnswer */
	var $tmpAnswer = $('#questionsData .quizSet:eq(' + currentQuizSet + ') .quizzing:eq(' + _currentQuiz + ') .answerContainer .answer');
	
	
	
	$('#quizArea').fadeOut(0);
	
	/*Radio group - 單選題的幾則將被選擇的答案 排版*/
	/*************************************************************/
	$tmpAnswer.each(function(index, element) {
		
		/*$('#scAnswer')：為答案容器 / $tmpAnswer：為不特定數量的 .answer 的包裹集合*/
		/*$tmpAnswer.get(index).innerHTML <-- 取得index位置的答案資訊，排版第index個答案列*/
		/*$$$$$$$$$$$ radio外面會被一個<p></p>包圍 $$$$$$$$$$$*/
        $('#scAnswer').append('<p></p><p class="horizontalRow">' + radioHtmlStr + ' ' + (index+1) + '. ' + $tmpAnswer.get(index).innerHTML + '</p><p></p>');
		
		
		/*為每一個radio的value屬性賦值*/
		$('.singleChoiceRadio:eq(' + index + ')').attr('value',(index+1));
		/*alert($('.singleChoiceRadio:eq(' + index + ')').attr('value'));*/
		
		
		/*單選題 --- singleChoiceRadioClickedGetValue --> 
		  註冊及處理radio滑鼠事件 - ※※※截獲被點選radio的value值*/
		singleChoiceRadioClickedGetValue(index);

		
    });
	/*************************************************************/
	
	/*--------------------------------------------------------------------------------------*/
	
	
	
	/*取得單選題/圖檔配置資訊*/
	scGetPicturesData();
	
	$('#quizArea').fadeIn(800);
	
}


/*----------------------------------------------------------------------------*/
/*單選題 --- 取得圖檔配置資訊*/
function scGetPicturesData(){
	
	/*如果有圖檔*/
	/******************************************/
	
	/*Type A - 圖檔放在題目和所有答案之間*/
	/*------------------------------------------------------*/
	var $tmpPicA = $('#questionsData .quizSet:eq(' + currentQuizSet + ') .quizzing:eq(' + currentQuiz + ') .question').next();
	
	/*1021101-----------測試*/
	/*if($tmpPicA && $tmpPicA.parent()){
		alert($tmpPicA.parent().html());
	}*/
	
	
	if( $tmpPicA.size() > 0 ){
		/*alert('$tmpPicA.size() : ' + $tmpPicA.size());*/
		var imgType = 'A';
		$('#scAnswer').prepend('<div id="addPicDiv"></div>');
		
		$tmpPicA.each(function(index, element) {
			/**/
			var order = null;
			var imgPath = $(this).text();
			
			/*alert('[order : ' + order +'] / [imgPath : ' + imgPath + ']');*/
            scPicturesLayout(imgType, order, imgPath);
			
        });
		
		
	}
	
	/*Type B - 圖檔放在每個答案橫列的下方*/
	/*------------------------------------------------------*/
	var $tmpPicB = $('#questionsData .quizSet:eq(' + currentQuizSet + ') .quizzing:eq(' + currentQuiz + ') > .answerContainer > p > span.pic');
		
	if( $tmpPicB.size() > 0 ){
		/*alert($tmpPicB.size());*/
		var imgType = 'B';
		
		$tmpPicB.each(function(index, element) {
			/**/
			var order = $(this).parent().index();
			var imgPath = $(this).text();
			
			/*alert('[order : ' + order +'] / [imgPath : ' + imgPath + ']');*/
            scPicturesLayout(imgType, order, imgPath);
			
        });
		
	}
}

/*單選題 --- 圖檔排版嵌入*/
function scPicturesLayout(imgType, order, imgPath){
	
		switch (imgType){
			case 'A':
				$('#scAnswer > #addPicDiv').append(' <img class="addPic" src=' + imgPath + '>');
			break;
			case 'B':
				$('#singleChoiceDiv #scAnswer input:eq(' + order + ')').parent().append('<p><img class="addPic" src=' + imgPath + '></p>');
			break;
			case 'C':
				//
			break;
			default:
				//
			break;
			
		}
		
}
/*----------------------------------------------------------------------------*/



/*單選題 --- radio滑鼠事件 - ※※※截獲被點選radio的value值*/
function singleChoiceRadioClickedGetValue(_index){

	/*點擊在radio上*/
	$('.singleChoiceRadio:eq(' + _index + ')').on('click',function(){
		/*$('#tmpInfo').html($('.singleChoiceRadio:eq(' + _index + ')').attr('value'));*/
		/*alert($('.singleChoiceRadio:eq(' + _index + ')').attr('value'));*/
		
		/**************************************/
		//截獲被點選radio的value值 + 1 = 答題序號 --- ※這變數其實不需用到，也沒用到
		currentSingleChoiceAnswer = _index + 1;
		/**************************************/
		
		/* $('input:radio:checked').attr('value') <-- ※這也可取得被點選的radio的value值*/
		/*currentSingleChoiceAnswer = $('input:radio:checked').attr('value');
		alert($('input:radio:checked').attr('value'));*/
		
		/*提交鈕-cursor：手形*/
		$('#submitBtnSpan img').css({'cursor':'pointer'});
		/*提交鈕-cursor：手形-透明度恢復1.0*/
		$('#submitBtnSpan img').css({'opacity':'1.0'});
		
		/*這if條件似乎沒必要 - 因為每個radio在前面就已賦值*/
		/*if($(this).attr('value') != undefined){*/
			
			/*alert($(this).attr('value'));*/
			
			/*先移除事件的原因：若反覆點選radio，緊接著按提交鈕，答對或答錯icon圖示會出現好幾個*/
			removeSubmitBtnMouseEvent();
			
			/*註冊及處理提交鈕滑鼠事件*/
			submitBtnMouseEvent();
		/*}*/
		
	})
	
	
	/*每個radio的父層 .horizontalRow 橫列 被點擊時，觸發radio被checked，並擁有radio實際被checked的滑鼠事件處理*/
	/*************************************************************************************/
	$('.horizontalRow:eq(' + _index + ')').on('click',function(){
		
		/*----------------------------------*/
		$('.horizontalRow:eq(' + _index + ')' + ' input:radio').attr('checked',true);
		/*----------------------------------*/
		
		/**/
		/*$('.singleChoiceRadio:eq(' + _index + ')').trigger('click');*/
		
		/**************************************/
		//截獲被點選radio的value值 + 1 = 答題序號 --- ※這變數其實不需用到，也沒用到
		currentSingleChoiceAnswer = _index + 1;
		/**************************************/
		
		/*提交鈕-cursor：手形*/
		$('#submitBtnSpan img').css({'cursor':'pointer'});
		/*提交鈕-cursor：手形-透明度恢復1.0*/
		$('#submitBtnSpan img').css({'opacity':'1.0'});
		
		/*先移除事件的原因：若反覆點選radio，緊接著按提交鈕，答對或答錯icon圖示會出現好幾個*/
		removeSubmitBtnMouseEvent();
			
		/*註冊及處理提交鈕滑鼠事件*/
		submitBtnMouseEvent();
		
	})
	/*************************************************************************************/
	
	
}

/*註冊及處理「提交按鈕」的滑鼠事件*/
function submitBtnMouseEvent(){

	$('#submitBtnSpan img').on('mouseover',function(){
		$('#submitBtnSpan img').attr("src", param.quizImgPath + "submit_over.png");
	});
	$('#submitBtnSpan img').on('mouseout',function(){
		$('#submitBtnSpan img').attr("src",  param.quizImgPath + "submit.png");
	});
	
	/*按下提交鈕*/
	$('#submitBtnSpan img').on('mousedown',function(){
		$('#submitBtnSpan img').attr("src",  param.quizImgPath + "submit_down.png");
		
		
		/*↓↓↓ 按下「提交按鈕」的各種組態控制 ↓↓↓*/
		
		/*提交鈕按下後，替換為下一題按鈕，下一題按鈕這時直接可用，所以cursor依舊維持手形不變，不用改成default*/
		/*$('#submitBtnSpan img').css({'cursor':'default'});*/
		
		/*移除提交鈕滑鼠事件*/
		removeSubmitBtnMouseEvent();
		
		/*手動置換提交鈕圖檔 - 因其事件已移除，無法回到一般狀態 <--這個處置也免了，因為馬上要替換為下一題按鈕或檢視結果按鈕*/
		/*$('#submitBtnSpan img').attr("src",  param.quizImgPath + "submit.png");*/
		
		/*Radio group - 單選題的全部答案被disabled，即禁用而不能選*/
		disabledRadio();
		
		/*每個radio的父層 .horizontalRow 橫列 - 關閉'click'事件
		 ，並移除class --> .horizontalRow <-- 如此，.horizontalRow:hover 的css背景色設定才會失效 */
		/*******************************/
		$('.horizontalRow').off('click');
		$('.horizontalRow').removeClass('horizontalRow');
		/**/
		/*alert($(this).context.tagName);*/
		/*******************************/
		
		/*↑↑↑ 按下「提交按鈕」的各種組態控制 ↑↑↑*/
		
		
		/**/
		/**************************************/
		if(tmpType == 'singleChoice'){
			
			//檢查單選題答題是否正確
			checkSingleChoiceAnswer();
			
		}else if(tmpType == 'trueFalse'){
			
			//檢查是非題答題是否正確
			checkTrueFalseAnswer();
		}
		/**************************************/
		
		
		
		/*若還有下一題，則才會出現下一題按鈕，及註冊其事件*/
		/******************************************************************/
		if(currentQuiz < quizTotal-1){
			
			/*隱藏提交鈕，顯示下一題按鈕*/
			showNextAHideSubmit();
		
			/*註冊及處理下一題按鈕滑鼠事件*/
			nextbtnMouseEvent();
		
		/*如果已經是最後一題*/
		}else{
			
			if(quizTotal > 1){
				
				/*隱藏提交鈕，顯示檢視結果按鈕*/
				showViewResultNHideSubmit();
				
				/*註冊「檢視結果」滑鼠事件*/
				viewResultBtnMouseEvent();
				
			
			//●如果某個quiz暫停點只有一題quiz，則不出現「檢視結果按鈕」，而直接出現「重新作題按鈕」
			/*-----------------------------------------------*/
			/*-----------------------------------------------*/
			}else if(quizTotal == 1){
				
				//
				$('#submitBtnSpan img').attr({"src": param.quizImgPath + "reAnswer.png"});
				//
				reAnswerBtnClickedEvent();
	
				
			}
			/*-----------------------------------------------*/
			/*-----------------------------------------------*/
			
			
		}
		/******************************************************************/
		
		
	});
	
}


/*按下「提交按鈕」之後，Radio group - 單選題的全部答題radio被disabled，即禁用而不能點選*/
function disabledRadio(){
	/*************************************************************/
	$('form input[type=radio]').each(function(index, element) {

		$(this).attr('disabled','true');
		
    });
	/*************************************************************/
}

/*移除「提交按鈕」的滑鼠事件*/
function removeSubmitBtnMouseEvent(){
	$('#submitBtnSpan img').off('mouseover');
	$('#submitBtnSpan img').off('mouseout');
	$('#submitBtnSpan img').off('mousedown');
}

//單選題 --- 檢查單選題答題是否正確
function checkSingleChoiceAnswer(){
	
	/*這個可行*/
	/*alert($('input:radio:checked').attr('value'));*/
	
	/*這沒用到*/
	var $tmpAnswer = $('#questionsData .quizSet:eq(' + currentQuizSet + ') .quizzing:eq(' + currentQuiz + ') .answerContainer .answer');
	
	/*alert($('.singleChoiceRadio[checked]').attr('value'));*/
	
	/*答對的條件 - 這個可行*/
	/*if(currentSingleChoiceAnswer == $('.correctAnswer:eq(' + currentQuiz + ')').text()){
		$('#tmpInfo').html('<br>'+'正確答案：' + currentSingleChoiceAnswer + '<br>' + '您的答案：' + $('.correctAnswer:eq(' + currentQuiz + ')').text());
	}*/
	
	
	/*答對的條件 - 這個可行*/
	/*答對或答錯的判斷與處理 - 因應答對或答錯，showRightWrongImg()方法可在所點擊radio答案橫列前面產生對或錯的icon圖示*/
	if($('input:radio:checked').attr('value') === $('#questionsData .quizSet:eq(' + currentQuizSet + ') .quizzing:eq(' + currentQuiz + ') .correctAnswer').text()){
		showRightWrongImg(param.quizImgPath + "right.png");
		rightFalseArr.push(true);
		singleChoiceRight ++;
		//
		var isRightWrong = '您答對了!!!';
		
		
		//●●●1030220
		//在答對的前提下，如果題目總數只有1題，則將「重新答題」按鈕清空移除。
		//此處的$('#submitBtnSpan')為「重新答題」按鈕
		/**************************************************/
		if(quizTotal === 1){
			$('#submitBtnSpan').empty().remove();
		}
		/**************************************************/
		
		
	}else{
		showRightWrongImg(param.quizImgPath + "wrong.png");
		rightFalseArr.push(false);
		singleChoiceWrong ++;
		//
		var isRightWrong = '您答錯了!!!';
		
		
		//●1021130
		quizzingFRNumArr[currentQuiz] += 1;
		//alert(quizzingFRNumArr[currentQuiz]);
		
		
	}
	
	
	/*回饋資訊的取得與組合 - 正確答案是甚麼，您的答案是甚麼 的資訊*/
	/*$('#tmpInfo').html('<br>'+'正確答案是：' + $('.correctAnswer:eq(' + currentQuiz + ')').text() + '<br>' + '您的答案是：' + $('input:radio:checked').attr('value'));*/
	
	//var tmpFeedbackStr = '<br>'+'正確答案：' + $('#questionsData .quizSet:eq(' + currentQuizSet + ') .correctAnswer:eq(' + currentQuiz + ')').text() + ' / ' + '您的答案：' + $('input:radio:checked').attr('value');
	
	var tmpFeedbackStr = isRightWrong;
	
	
	//●1031130
	/*if(rightFalseArr[currentQuiz] == false){
		quizzingFRNumArr[currentQuiz][1] += 1;
		alert(quizzingFRNumArr[currentQuiz][1]);
	}*/

	/*●回饋資訊tmpFeedbackStr字串的顯示處理*/
	if(quizzingFRNumArr[currentQuiz] >= 2){
		showFeedback(tmpFeedbackStr);
	}
	
	
	//●1031201 - 改到此處
	/*回饋資訊處理(正確答案是甚麼。您的答案是甚麼。) --- ●已改成「您答錯了」???*/
	var quizFeedbackContainerHtmlStr = '<span id="quizFeedbackContainer"></span>';
	$('#interactiveArea').append(quizFeedbackContainerHtmlStr);
	$('#quizFeedbackContainer').html(tmpFeedbackStr);
	
	
	
}

/*回饋資訊tmpFeedbackStr字串的顯示處理 + 補救學習資訊面板處理*/
function showFeedback(tmpFeedbackStr){

	
	/*如果答錯，會出現補救學習資訊面板*/
	if(rightFalseArr[currentQuiz] == false && $('.quizSet:eq(' + currentQuizSet + ') .suggestion:eq(' + currentQuiz + ')').text() != ''){
		
		
		/**********補救學習資訊面板建立**********/
		var suggestionZoneHtmlStr = '<div id="suggestionZoneDiv"><span id="suggestionZone">' + $('.quizSet:eq(' + currentQuizSet + ') .suggestion:eq(' + currentQuiz + ')').text() + '</span></div>';
		
		var suggestionCloseIconHtmlStr = '<span id="suggestionCloseIcon"><img src=' + param.quizImgPath + "closeBtn_w48px.png" + '></span>';
		
		
		/**/
		$('.quizContainer').append(suggestionZoneHtmlStr);
		$('#suggestionZoneDiv').append(suggestionCloseIconHtmlStr);
		/*$('#suggestionZoneDiv').css({'width':'90%','top':30});*/
		
		//●○1040930 - 『補救學習建議資訊面版』添加拖曳功能
		//-----------------------------------------
		$('#suggestionZoneDiv').draggable();
		//-----------------------------------------
		
		var delayTime = 400;
		
		$('#suggestionCloseIcon img').fadeOut(0);
		$('#suggestionZoneDiv').fadeOut(0,function(){
			
			$(this).delay(delayTime).fadeIn(500,function(){

				/*補救學習面板-關閉按鈕按下後，完成漸淡處理#suggestionZoneDiv之後，清空#suggestionZoneDiv之下所有內容，並移除#suggestionZoneDiv*/
				$('#suggestionCloseIcon').on('mousedown',function(){
					closeSuggestionZoneDiv(suggestionCloseIconHtmlStr);
				});

			});
		  
			$('#suggestionCloseIcon img').delay(delayTime).fadeIn(500);
			
		})
		
	}
	
}

/*完成漸淡處理#suggestionZoneDiv之後，清空#suggestionZoneDiv之下所有內容，並移除#suggestionZoneDiv*/
function closeSuggestionZoneDiv(){
	$('#suggestionCloseIcon img').fadeOut(400);
	$('#suggestionZoneDiv').fadeOut(400,function(){
		//
		$('#suggestionZoneDiv').draggable( "destroy" );
		//
		$('#suggestionZoneDiv').empty().remove();
	});
}

/*在所點擊radio答案橫列前面產生對或錯的icon圖示*/
function showRightWrongImg(_src){
	var rightWrongImgdivStr = '<span id="rightWrongImgdiv"><img></span>';
	
	/*在單選題-所選擇答案文字前面加上icon圖示 - (指向對或錯的icon路徑，由_src決定)*/
	$('input:radio:checked').parent().prepend(rightWrongImgdivStr);
	$('#rightWrongImgdiv img').attr('src',_src);
	
	/*在所選擇答案容器，上底色和線框*/
	/*$('input:radio:checked').parent().css({'background':'#FFF','padding':'6px 6px 6px 15px','border':'dashed 1px'});*/
	$('input:radio:checked').parent().css({'background':'#FFF'});
	$('input:radio:checked').parent().animate({'padding':'6px 6px 6px 15px','border':'dashed 1px'},200);
	
}

/*隱藏提交鈕，顯示下一題按鈕*/
function showNextAHideSubmit(){
	/*$('#submitBtnSpan').addClass('nextBtnSpan');*/
	$('#submitBtnSpan img').attr({"src": param.quizImgPath + "next.png"});
}

/*隱藏提交鈕，顯示檢視結果按鈕*/
function showViewResultNHideSubmit(){
	/*$('#submitBtnSpan').addClass('viewResultBtn');*/
	$('#submitBtnSpan img').attr({"src": param.quizImgPath + "viewResult.png"});
}

/*註冊及處理下一題按鈕滑鼠事件*/
function nextbtnMouseEvent(){
	$('#submitBtnSpan img').on('mouseover',function(){
		$('#submitBtnSpan img').attr("src", param.quizImgPath + "next_over.png");
	});
	$('#submitBtnSpan img').on('mouseout',function(){
		$('#submitBtnSpan img').attr("src", param.quizImgPath + "next.png");
	});
	
	
	$('#submitBtnSpan img').on('mousedown',function(){
		$('#submitBtnSpan img').attr("src", param.quizImgPath + "next_down.png");
		
		/**/
		destroyAfterNextBtnClicked();
		
	});
	
}

function RemoveNextbtnMouseEvent(){
	$('#submitBtnSpan img').off('mouseover')
	$('#submitBtnSpan img').off('mouseout')
	$('#submitBtnSpan img').off('mousedown')
}

function destroyAfterNextBtnClicked(){
	/**/
	RemoveNextbtnMouseEvent();
	
	/**/
	$('#quizArea').empty();
	$('#quizTotalContainer').empty().remove();
	
	/*完成漸淡處理#suggestionZoneDiv之後，清空#suggestionZoneDiv之下所有內容，並移除#suggestionZoneDiv*/
	closeSuggestionZoneDiv();
	
	/*單選或是非 以下處置其實一樣*/
	switch (tmpType){
		case 'singleChoice':
			$('#quizFeedbackContainer').empty().remove();
		break;
		case 'trueFalse':
			$('#quizFeedbackContainer').empty().remove();
		break;
		case 'C':
			//
		break;
		default:
			//
		break;
		
	}
	
	
	/*切換為提交鈕圖形*/
	$('#submitBtnSpan img').attr({"src": param.quizImgPath + "submit.png"});
	
	/*提交按鈕-cursor：default*/
	$('#submitBtnSpan img').css({'cursor':'default'});
	$('#submitBtnSpan img').css({'opacity':'1.0'});
	
	
	
	//====================================================================●
	/*$.each(param.ivqHasMediaArr, function(index){
		if(index !== 0){
			tPlayer.seek( 0, index );
			tPlayer.pause(index);
			//$('.mediaWrapper:eq(' + (index) + ')').css({'display':'none'});
		}
	});*/
	//====================================================================●
	
	
	
	/**/
	nextQuiz();
	
}



/**/
/*-------------------------------------------------------------------*/
/*註冊「檢視結果」滑鼠事件*/
function viewResultBtnMouseEvent(){
	$('#submitBtnSpan img').on('mouseover',function(){
		$('#submitBtnSpan img').attr({"src": param.quizImgPath + "viewResult_over.png"});
	});
	$('#submitBtnSpan img').on('mouseout',function(){
		$('#submitBtnSpan img').attr({"src": param.quizImgPath + "viewResult.png"});
	});
	
	
	$('#submitBtnSpan img').on('mousedown',function(){
		$('#submitBtnSpan img').attr({"src": param.quizImgPath + "viewResult_down.png"});
		
		/**/
		destroyAfterViewResultBtnClicked();
		
		
		//●1060901
		//====================================================================●
		$.each(param.ivqHasMediaArr, function(index){
			tPlayer.pause( param.ivqHasMediaArr[index][2] );
			tPlayer.seek( 0, param.ivqHasMediaArr[index][2] );
			
			//
			playBtnState(index);
			//
			pauseBtnOffEvent();
			stopBtnOffEvent();
		});
		//====================================================================●
		//alert(param.ivqHasMediaArr);
		
	});
}

/*移除「檢視結果」滑鼠事件*/
function removeViewResultBtnMouseEvent(){
	$('#submitBtnSpan img').off('mouseover');
	$('#submitBtnSpan img').off('mouseout');
	$('#submitBtnSpan img').off('mousedown');
}

/*按下「檢視結果」按鈕後的回收及後續*/
function destroyAfterViewResultBtnClicked(){
	/**/
	removeViewResultBtnMouseEvent();
	
	/**/
	$('#quizArea').empty();
	$('#quizTotalContainer').empty().remove();
	$('#quizFeedbackContainer').empty().remove();
	
	/*完成漸淡處理#suggestionZoneDiv之後，清空#suggestionZoneDiv之下所有內容，並移除#suggestionZoneDiv*/
	closeSuggestionZoneDiv();
	
	
	//在下「檢視結果」面板狀態下，如果(單選題答對的數量+是非題答對的數量) < 總題數 , 則
	if((singleChoiceRight + trueFalseRight) < quizTotal){
		
		/*切換為「重新作題」鈕圖形*/
		$('#submitBtnSpan img').attr({"src": param.quizImgPath + "reAnswer.png"});
		/*「重新作題」鈕 - cursot:手形*/
		$('#submitBtnSpan img').css({'cursor':'pointer'});
		
		/**/
		reAnswerBtnClickedEvent();
		
	}else if((singleChoiceRight + trueFalseRight) == quizTotal){
		
		
		//●●●1030220
		//此處的$('#submitBtnSpan')為「重新答題」按鈕
		/**************************************************/
		$('#submitBtnSpan').empty().remove();
		/**************************************************/
		
	}
	
	
	/**/
	viewResultMethod();
	
	

}

/*建構「檢視結果」*/
function viewResultMethod(){
	
	/*quizArea：載入「檢視結果」的 標題+內容*/
	
	/*搞定「檢視結果」-標題*/
	/*--------------------------------------------------------------------------------------*/
	var viewResultDivHtmlStr = '<div id="viewResultDiv"><div id="viewResultTitle"></div><div id="viewResultContent"><span><span></span></span></div></div>';
	
	$('#quizArea').append(viewResultDivHtmlStr);
	
	/*currentQuizSpan：載入題號 / _tmpTypeChineseStr：題型字串 */
	var viewResultTitleStr = '檢視結果：';
	$('#viewResultTitle').html('<img id="iconViewResult" src=' +  param.quizImgPath + "brankic1979-icon-set_clipboard_1.gif" + '> ' + viewResultTitleStr + '( 共 ' + quizTotal + ' 題 ' + ' / <span  class="redColor">答錯 ' + (singleChoiceWrong + trueFalseWrong) + ' 題</span>' + ' /  答對 '  + (singleChoiceRight + trueFalseRight) + ' 題 )' + '<p>　答對比率：' + Math.floor(((singleChoiceRight+trueFalseRight)/quizTotal)*100) + '%');
	
	/*--------------------------------------------------------------------------------------*/
	
	$('#quizArea').fadeOut(0);
	
	/*搞定「檢視結果」-內容*/
	/*--------------------------------------------------------------------------------------*/
	
	
	$('#questionsData .quizSet:eq(' + currentQuizSet + ') .quizzing').each(function(index, element) {
		
		/*取得題型英文字串*/
		var tmpType = $('#questionsData .quizSet:eq(' + currentQuizSet + ') .quizzing:eq(' + index + ') .questionType').text();
		/*alert(tmpType);*/
		/*題型中文字串*/
		var tmpTypeChineseStr;
		
		
		/***************************************/
		if(tmpType == "singleChoice"){
			
			/**/
			tmpTypeChineseStr = "單選題";
			
			
			/*index：載入題號 / tmpTypeChineseStr：題型字串 */
			var tmpQuestion = '第 ' + '<span id="quizNumSpan">' + (index+1) + '</span>' + ' 題 (' + tmpTypeChineseStr + ')' + '： ' + $('#questionsData .quizSet:eq(' + currentQuizSet + ') .quizzing:eq(' + index + ') .question').text();
			

		
		}else if(tmpType == "trueFalse"){
			
			/**/
			tmpTypeChineseStr = "是非題";
			
			/*index：載入題號 / tmpTypeChineseStr：題型字串 */
			var tmpQuestion = '第 ' + '<span id="quizNumSpan">' + (index+1) + '</span>' + ' 題 (' + tmpTypeChineseStr + ')' + '： ' + $('#questionsData .quizSet:eq(' + currentQuizSet + ') .quizzing:eq(' + index + ') .question').text();
			
		}
		/***************************************/
		
		
		if(rightFalseArr[index]){
			var tmpRightFalse = '<span id="resultRightSpan">' + ' → 答對。 ' + '</span>';
			var suggestionHtmlStr = '';
		}else{
			var tmpRightFalse = '<span id="resultWrongSpan">' + ' → 答錯。 ' + '</span>';
			/*補救學習之建議*/
			var suggestionHtmlStr = '<span class="redColor">' + $('#questionsData .quizSet:eq(' + currentQuizSet + ') .suggestion:eq(' + index + ')').text() + '</span>';
		}
		
		/*alert(rightFalseArr[index]);*/
		
		//●●●1031201 - 將補救學習資訊(或稱回饋資訊)改為隱藏
		tmpQuestion += '<br>' + tmpRightFalse/* + suggestionHtmlStr*/;
		
		$('#viewResultContent').append('<p>' + tmpQuestion + '</p>');
		
		
    });
	
	$('#quizArea').fadeIn(800);
	/*--------------------------------------------------------------------------------------*/
	
}
/*-------------------------------------------------------------------*/



function reAnswerBtnClickedEvent(){
	$('#submitBtnSpan img').on('mouseover',function(){
		$('#submitBtnSpan img').attr({"src": param.quizImgPath + "reAnswer_over.png"});
	});
	$('#submitBtnSpan img').on('mouseout',function(){
		$('#submitBtnSpan img').attr({"src": param.quizImgPath + "reAnswer.png"});
	});
	
	
	$('#submitBtnSpan img').on('mousedown',function(){
		$('#submitBtnSpan img').attr({"src": param.quizImgPath + "reAnswer_down.png"});
		
		/**/
		destroyAfterreAnswerBtnClicked();
		
		
		/*重要 --- 將「儲存對或錯之陣列」清空，否則重新答題後 --> 到最後檢視結果時，陣列會錯亂，對與錯的回饋會不正確*/
		/******************************************/
		rightFalseArr = [];
		/*alert(rightFalseArr.length);*/
		/******************************************/
		
		/**/
		currentQuiz = 0;
		/**/
		singleChoiceRight = 0;
		singleChoiceWrong = 0;
		trueFalseRight = 0;
		trueFalseWrong = 0;

		/*顯示題目總數*/
		showQuizTotal();
		/**/
		determineQuizType(currentQuiz);
		
	});
}

/*移除「重新答題按鈕」滑鼠事件*/
function removeViewResultBtnMouseEvent(){
	$('#submitBtnSpan img').off('mouseover');
	$('#submitBtnSpan img').off('mouseout');
	$('#submitBtnSpan img').off('mousedown');
}

function destroyAfterreAnswerBtnClicked(){
	
	/*切換為「重新作題」鈕圖形*/
	$('#submitBtnSpan img').attr({"src": param.quizImgPath + "submit.png"});
	$('#submitBtnSpan img').css({'cursor':'default'});
	
	removeViewResultBtnMouseEvent();
	
	$('#quizArea').empty();
	
	
	/********************************************************/
	//↓↓↓↓↓↓●●●按下「重新答題」按鈕後，如果存在「補救學習建議面板」，則將之清空、移除
	/********************************************************/
	//如果前一個「quiz暫停點」，因答錯而出現「補救學習建議面板」，則在此處做回收。
	/********************************************************/
	if($('#suggestionZoneDiv')){
		//alert('zzz');
		//
		$('#suggestionZoneDiv').draggable( "destroy" );
		$('#suggestionZoneDiv').empty().remove();
	}
	/********************************************************/
	
	
}


//清除 「補救學習建議面板」
c21Quiz.clearSuggestionZoneDiv = function(){
	//如果前一個「quiz暫停點」，因答錯而出現「補救學習建議面板」，則在此處做回收。
	/********************************************************/
	if($('#suggestionZoneDiv')){
		//alert('zzz');
		//
		$('#suggestionZoneDiv').draggable( "destroy" );
		$('#suggestionZoneDiv').empty().remove();
	}
	/********************************************************/
};







/*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/
/*//////////////////////////////////////////////////////////////////////////////////////////*/






/****************************建立是非題****************************/
function createTrueFalse(_currentQuiz, _tmpTypeChineseStr){
	
	/*搞定是非題-題目標題 - id="scQuestion"的sc二字，是trueFalse的簡寫 */
	/*quizArea：載入是非題或是非題的容器，例如載入trueFalseDiv / trueFalseDiv：是非題的容器 / scQuestion：是非題的題目 / 是非題被選擇的答案(會有幾個)*/
	/*--------------------------------------------------------------------------------------*/
	var trueFalseDivHtmlStr = '<form><div id="trueFalseDiv"><div id="tfQuestion"></div><div id="tfAnswer"><span><span></span></span></div></div></form>';
	
	$('#quizArea').html(trueFalseDivHtmlStr);
	
	/*currentQuizSpan：載入題號 / _tmpTypeChineseStr：題型字串 */
	var tmpQuestion = '第 ' + '<span id="currentQuizSpan">' + (_currentQuiz+1) + '</span>' + ' 題 (' + _tmpTypeChineseStr + ')' + '： ' + $('#questionsData .quizSet:eq(' + currentQuizSet + ') .quizzing .question').get(_currentQuiz).innerHTML;
	
	$('#tfQuestion').html(tmpQuestion);
	/*--------------------------------------------------------------------------------------*/
	
	
	
	
	/*搞定是非題-供選擇知答案 radio group*/
	/*--------------------------------------------------------------------------------------*/
	/*定義題目橫列的<input type="radio">，及其屬性*/
	var radioHtmlStr = '<input type="radio" name="trueFalseRadio" class="trueFalseRadio" value="">';
	
	/*第_currentQuiz組的 $(.quizzing .answerContainer) 會包含不特定數量的 .answer 。取得其包裹集合，指定給變數$tmpAnswer */
	var $tmpAnswer = $('#questionsData .quizSet:eq(' + currentQuizSet + ') .quizzing:eq(' + _currentQuiz + ') .answer');
	
	
	
	$('#quizArea').fadeOut(0);
	
	/*Radio group - 是非題的幾則將被選擇的答案 排版*/
	/*************************************************************/
	$tmpAnswer.each(function(index, element) {
		
		/*$('#tfAnswer')：為答案容器 / $tmpAnswer：為不特定數量的 .answer 的包裹集合*/
		/*$tmpAnswer.get(index).innerHTML <-- 取得index位置的答案資訊，排版第index個答案列*/
		/*radio外面會被一個<p></p>包圍*/
        $('#tfAnswer').append('<p></p><p class="horizontalRow">' + radioHtmlStr + ' ' + (index+1) + '. ' + $tmpAnswer.get(index).innerHTML + '</p><p></p>')
		
		/*為每一個radio的value屬性賦值*/
		$('.trueFalseRadio:eq(' + index + ')').attr('value',(index+1));
		/*alert($('.trueFalseRadio:eq(' + index + ')').attr('value'));*/
		
		
		/*是非題 --- trueFalseRadioClickedGetValue --> 
		  註冊及處理radio滑鼠事件 - ※※※截獲被點選radio的value值*/
		trueFalseRadioClickedGetValue(index);
		
    });
	/*************************************************************/
	
	/*--------------------------------------------------------------------------------------*/
	
	
	/*取得圖檔配置資訊*/
	tfGetPicturesData();
	
	$('#quizArea').fadeIn(800);
}


/*是非題 --- radio滑鼠事件 - ※※※截獲被點選radio的value值*/
function trueFalseRadioClickedGetValue(_index){
	
	$('.trueFalseRadio:eq(' + _index + ')').on('click',function(){
		/*$('#tmpInfo').html($('.trueFalseRadio:eq(' + _index + ')').attr('value'));*/
		/*alert($('.trueFalseRadio:eq(' + _index + ')').attr('value'));*/
		
		/**************************************/
		//截獲被點選radio的value值 + 1 = 答題序號 --- ※這變數其實不需用到，也沒用到
		currentTrueFalseAnswer = _index + 1;
		/**************************************/
		
		/* $('input:radio:checked').attr('value') <-- ※這也可取得被點選的radio的value值*/
		/*currentSingleChoiceAnswer = $('input:radio:checked').attr('value');
		alert($('input:radio:checked').attr('value'));*/
		
		/*提交鈕-cursor：手形*/
		$('#submitBtnSpan img').css({'cursor':'pointer'});
		/*提交鈕-透明度恢復：1.0*/
		$('#submitBtnSpan img').css({'opacity':'1.0'});
		
		/**/
		/*if($('.trueFalseRadio').attr('value') != undefined){*/
			
			/*先移除事件的原因：若反覆點選radio，緊接著按提交鈕，答對或答錯icon圖示會出現好幾個*/
			removeSubmitBtnMouseEvent();
			
			/*註冊及處理提交鈕滑鼠事件*/
			submitBtnMouseEvent();
		/*}*/
		
	})
	
	
	/*每個radio的父層 .horizontalRow 橫列 被點擊時，觸發radio被checked，並擁有radio實際被checked的滑鼠事件處理*/
	/*************************************************************************************/
	$('.horizontalRow:eq(' + _index + ')').on('click',function(){
		
		/*----------------------------------*/
		$('.horizontalRow:eq(' + _index + ')' + ' input:radio').attr('checked',true);
		/*----------------------------------*/
		
		/**/
		/*$('.singleChoiceRadio:eq(' + _index + ')').trigger('click');*/
		
		/**************************************/
		//截獲被點選radio的value值 + 1 = 答題序號 --- ※這變數其實不需用到，也沒用到
		currentSingleChoiceAnswer = _index + 1;
		/**************************************/
		
		/*提交鈕-cursor：手形*/
		$('#submitBtnSpan img').css({'cursor':'pointer'});
		/*提交鈕-cursor：手形-透明度恢復1.0*/
		$('#submitBtnSpan img').css({'opacity':'1.0'});
		
		/*先移除事件的原因：若反覆點選radio，緊接著按提交鈕，答對或答錯icon圖示會出現好幾個*/
		removeSubmitBtnMouseEvent();
			
		/*註冊及處理提交鈕滑鼠事件*/
		submitBtnMouseEvent();
		
	})
	/*************************************************************************************/
	
	
	
}

//是非題 --- 檢查是非題答題是否正確
function checkTrueFalseAnswer(){
	
	var tfAnswerCHStr;
	switch($('input:radio:checked').attr('value')){
		case '1':
			tfAnswerCHStr = '是';
		break;
		case '2':
			tfAnswerCHStr = '否';
		break;
		default:
		break;
	}
	
	var tfCorrectAnswerCHStr;
	switch($('#questionsData .quizSet:eq(' + currentQuizSet + ') .correctAnswer:eq(' + currentQuiz + ')').text()){
		case 'true':
			tfCorrectAnswerCHStr = '是';
		break;
		case 'false':
			tfCorrectAnswerCHStr = '否';
		break;
		default:
		break;
	}
	
	
	var isRightWrong;
	
	/*答對的條件 - 這個可行*/
	/*答對或答錯的判斷與處理 - 因應答對或答錯，showRightWrongImg()方法可在所點擊radio答案橫列前面產生對或錯的icon圖示*/
	if(tfAnswerCHStr === tfCorrectAnswerCHStr){
		showRightWrongImg(param.quizImgPath + "right.png");
		rightFalseArr.push(true);
		trueFalseRight ++;
		//
		isRightWrong = '您答對了!!!';
		
		
		//●●●1030220
		//在答對的前提下，如果題目總數只有1題，則將「重新答題」按鈕清空移除。
		//此處的$('#submitBtnSpan')為「重新答題」按鈕
		/**************************************************/
		if(quizTotal === 1){
			$('#submitBtnSpan').empty().remove();
		}
		/**************************************************/
		
		
	}else{
		showRightWrongImg(param.quizImgPath + "wrong.png");
		rightFalseArr.push(false);
		trueFalseWrong ++;
		//
		isRightWrong = '您答錯了!!!';
		
		
		//●1031130
		quizzingFRNumArr[currentQuiz] += 1;
		//alert(quizzingFRNumArr[currentQuiz]);
		
	}
	
	
	/*回饋資訊的取得與組合 - 正確答案是甚麼，您的答案是甚麼 的資訊*/
	/*$('#tmpInfo').html('<br>'+'正確答案是：' + $('.correctAnswer:eq(' + currentQuiz + ')').text() + '<br>' + '您的答案是：' + $('input:radio:checked').attr('value'));*/
	
	/*var tmpFeedbackStr = '<br>'+'正確答案：' + tfCorrectAnswerCHStr + '　/　' + '您的答案：' + tfAnswerCHStr;*/
	var tmpFeedbackStr = isRightWrong;
	
	
	//●1031130
	/*●回饋資訊tmpFeedbackStr字串的顯示處理*/
	if(quizzingFRNumArr[currentQuiz] >= 2){
		showFeedback(tmpFeedbackStr);
	}
	
	//●1031201 - 改到此處
	/*回饋資訊處理(正確答案是甚麼。您的答案是甚麼。) --- ●已改成「您答錯了」???*/
	var quizFeedbackContainerHtmlStr = '<span id="quizFeedbackContainer"></span>';
	$('#interactiveArea').append(quizFeedbackContainerHtmlStr);
	$('#quizFeedbackContainer').html(tmpFeedbackStr);
	
	
}


/*----------------------------------------------------------------------------*/
/*是非題 --- 取得是非題/圖檔配置資訊*/
function tfGetPicturesData(){
	
	/*如果有圖檔*/
	/******************************************/
	
	/*Type A*/
	/*------------------------------------------------------*/
	var $tmpPicA = $('#questionsData .quizSet:eq(' + currentQuizSet + ') .quizzing:eq(' + currentQuiz + ') > .pic');
	
	if( $tmpPicA.size() > 0 ){
		/*alert('$tmpPicA.size() : ' + $tmpPicA.size());*/
		var imgType = 'A';
		$('#tfAnswer').prepend('<div id="addPicDiv"></div>');
		
		$tmpPicA.each(function(index, element) {
			/**/
			var order = null;
			var imgPath = $(this).text();
			
			/*alert('[order : ' + order +'] / [imgPath : ' + imgPath + ']');*/
            tfPicturesLayout(imgType, order, imgPath);
			
        });
		
	}
	
}

/*是非題 --- 圖檔排版嵌入*/
function tfPicturesLayout(imgType, order, imgPath){
	
		switch (imgType){
			case 'A':
				$('#tfAnswer > #addPicDiv').append(' <img src=' + imgPath + '>');
			break;
			case 'B':
				//
			break;
			case 'C':
				//
			break;
			default:
				//
			break;
			
		}
		
}
/*----------------------------------------------------------------------------*/






/*************************處理放大鏡圖示************************/

function createMagnifierIcon(){
		/************************************************************************/
		/*如果有調用clickSmallToBig() 「點小圖跳出大圖功能」，則小圖上動態添加放大鏡圖示*/
		/************************************************************************/
		$('.needHandCursor').each(function(index, element) {
			/*alert($('.needHandCursor:eq(' + index + ')').offset().left + ' / ' + $('.needHandCursor:eq(' + index + ')').offset().top);*/
			
			$('.needHandCursor:eq(' + index + ')').after('<span class="zoomIconSpan"><img id="zoomIcon" src=' + param.quizImgPath + "zoomImg.png" + ' width="36" height="36" title="點擊左方小圖可跳出大圖"></span>');
			
			/*若圖檔寬度太大，附加上去的放大鏡圖示可能超出圖文Div範圍，因而掉到下一行，HTML例子如下：
			→→→ <p><img class="needHandCursor" onClick='clickSmallToBig(this,658,387);' src="contentImages/p1.jpg" width="472" height="277"  alt="圖形"></p>
			→→→ 此行可將css附加到<img>Tag的parent()，即<p>Tag，使 放大鏡圖示不會掉到下一行 - 此css為強迫折行*/
			$('.needHandCursor:eq(' + index + ')').parent().css({'white-space':'nowrap','overflow':'hidden'});
			
			var thisX = $('.needHandCursor:eq(' + index + ')').offset().left;
			var thisY = $('.needHandCursor:eq(' + index + ')').offset().top;
			var thisW = $('.needHandCursor:eq(' + index + ')').width();
			var thisH = $('.needHandCursor:eq(' + index + ')').height();
			/*alert(thisW + ' / ' + thisH);*/
			
			var zoomIconW = $('#zoomIcon').width();
			var zoomIconH = $('#zoomIcon').height();
			$('.zoomIconSpan').width(zoomIconW).height(zoomIconH);
			
			$('.zoomIconSpan').css({'position':'relative','left':-zoomIconW,'top':-thisH+zoomIconH-2});
			
			$('.needHandCursor:eq(' + index + ')').css({'border-color':'#cccccc','border-width':'1px','border-style':'solid'});
			
        });

}

/*************************處理放大鏡圖示************************/



/*************************點小圖跳出大圖************************/

function clickSmallToBig(_imgTag,_w,_h){	
	/* 取得圖檔相對網址(小圖與大圖為同一圖檔)*/
	var imgSrc = $(_imgTag).attr('src');
	
	/*建立盛載跳大圖的DIV組合*/
	var bigDivHtml = '<div id="bigDiv"></div>';
	$(document.body).append(bigDivHtml);
	
	/*將目標圖檔appendTo進入bigDiv*/
	var $imgDomObj = $('<img src=' + imgSrc + ' width=' + _w + ' height=' + _h + '>');
	$('#bigDiv').html($imgDomObj);

	if(isBig == false){
		/*DIV比影像外擴10px*/
		var halfExpandW = 12;
		var halfExpandH = 12;
		
		/*計算DIV在800x600px範圍的中心點*/
		var initX = 800/2-(_w+halfExpandW*2)/2;
		var initY = 600/2-(_h+halfExpandH*2)/2;
		$('#bigDiv').css({left:initX,top:initY});
		/*alert($('#bigDivOut').offset().left);*/
		$imgDomObj.css({'position':'relative','left':halfExpandW,'top':halfExpandH,'width':_w,'height':'_h'});
		$imgDomObj.animate({'width':_w,'height':_h,'opacity':'0.0'},0);
		/*$imgDomObj.css({'position':'relative','left':'0','top':'0'});*/
		
		/*DIV被指定的放大寬高 + 外擴值*/
		var bigDivWidth = _w + halfExpandW*2;
		var bigDivHeight = _h + halfExpandH*2;
		
		/*控制跳出大圖的位置*/
		/*------------------------------------------------------------------------------*/
		if(bgScope_definedWidth == 0){
			var targetX = $(document).width()/2-bigDivWidth/2 + bigImagePosOffsetX;
		}else{
			var targetX = bgScope_definedWidth/2-bigDivWidth/2 + bigImagePosOffsetX;
		}
		
		if(bgScope_definedHeight==0){
			var targetY = $(document).height()/2-bigDivHeight/2 + bigImagePosOffsetY;
		}else{
			var targetY = bgScope_definedHeight/2-bigDivHeight/2 + bigImagePosOffsetY;
		}
		/*------------------------------------------------------------------------------*/
		
		var bigDivX = targetX;
		var bigDivY = targetY;
		
		/**/
		addWall();
		
		/*動態放大，加入關閉按鈕*/
		$('#bigDiv').animate({'left':bigDivX,'top':bigDivY,'width':bigDivWidth,'height':bigDivHeight},200,function(){
			/*加入關閉鈕*/
			addCloseBtn();
			/*圖片放大*/
			$imgDomObj.animate({'width':_w,'height':_h,'opacity':'1.0'},200);
			/*旗標：放大狀態：true*/
			isBig = true;
			/**/
			$imgDomObj.css({'border-style':'dashed','border-width':'1','border-color':'#666666'});
		});
		
		
	}
}

function addCloseBtn(){
	var closeBtnOffsetX = 12;
	var closeBtnOffsetY = -12;
	$('#bigDiv').append('<div id="closeImgBtnDiv"></div>');
	var closeImgBtnDivPosX = $('#bigDiv').width() - $('#closeImgBtnDiv').width() + closeBtnOffsetX;
	var closeImgBtnDivPosY = $('#bigDiv').height() - $('#closeImgBtnDiv').height();
	$('#closeImgBtnDiv').css({'left':closeImgBtnDivPosX,'top':closeBtnOffsetY});


	
	/**/
	addCloseBtnClickHandler();
}

function addWall(){
	var wallDivHtmlStr = '<div id="wallDiv"></div>';
	$(document.body).append(wallDivHtmlStr);
	
	$('#wallDiv').animate({'opacity':'0.8','width':$(document).width(),'height':$(document).height()},300);
}

function removeWall(){
	$('#wallDiv').animate({'opacity':'0.0'},300,function(){
		$('#wallDiv').fadeOut(0);
		$('#wallDiv').remove();
		$(document.body).remove($('#wallDiv'));
		
	});
	
}

function addCloseBtnClickHandler(){
	$('#closeImgBtnDiv').bind('mousedown',closeBtnClickHandler);
	$('#wallDiv').bind('mousedown',closeBtnClickHandler);
}

function closeBtnClickHandler(){
	/**/
	isBig = false;
	removeWall();
	
	$('#closeImgBtnDiv').remove();
	$('#bigDiv').remove();
	$('#bigDivOut').remove();
	$(document.body).remove($('#bigDivOut'));
}

/*************************點小圖跳出大圖************************/







/*************************************************************/

/*指定<title>內容*/
function addDocumentTitle(){
	/*如果存在documentTitle，將其字串指定給document.title*/
	if(documentTitle){
		document.title = documentTitle;
		/*alert('zzz');*/
	}
	
	$('#titleStringDiv').html(document.title);
}
	

/**/
function helpBtnClicked(){
	$('#helpBtnDiv').click(function(){
		MM_openBrWindow(helpLink);
	});
}


/*於本視窗替換網頁文件(有history)*/
/*window.location.replace轉移到新URL,會有history*/
function replaceURL(_thisURL){
	window.location.replace(_thisURL);
}

/*於本視窗替換網頁文件(無history)*
/*window.location.href轉移到新URL,不會有history*/
/*w3c school - Location 对象 - http://www.w3cschool.cn/dom_obj_location.html*/
function gotoURL(_thisURL){
	window.location.href = _thisURL;
}

/*開啟新視窗*/
function MM_openBrWindow(_theURL) { //v2.0
	var _screenW=window.screen.availWidth;
	var _screenH=window.screen.availHeight;
	/*alert(_screenW + " / " + _screenH);*/
	var _myWin;
  	
	if(currentBrowser != "msie"){
		/*除ie外，所跳出視窗改變寬高至_screenW, _screenH*/
		_myWin = window.open(_theURL,'new1','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width=400, height=300, top=0, left=0');
		_myWin.resizeTo(_screenW,_screenH);
		_myWin.focus();
	}else{
		/*ie直接開出(_screenW,_screenH)的視窗尺寸*/
		_myWin = window.open(_theURL,'new1','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width=' + _screenW + ', height=' + _screenH + ', top=0, left=0');
	}
	
}











/*----------------------------------------------------*/
})(jQuery)

