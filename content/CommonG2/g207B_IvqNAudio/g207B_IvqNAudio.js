// JavaScript Document - G207B│g207B_IvqNAudio.js
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
var g207B =  NOU.namespace('NOU.modules.g207B');
//------------------------


param.ivqHasMediaArr = [];
param.newMedia = [];
g207B.audioStatus = 'stop';


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
//
//==============================================

//==============================================


//●
//==============================================
method.getStreamingData_localAudio = function(index){

	
	//若賦值為　'streaming'　- 則連結遠端串流影音檔
	if(g207B.chooseSreamingOrLocalAudio === 'streaming'){

		//
		alert('xxx -G207B版型的語音只能設為local端。g207B.chooseSreamingOrLocalAudio = "local"。');

		
	
	
	//若賦值為　'local'　- 則連結近端影音檔
	}else if(g207B.chooseSreamingOrLocalAudio === 'local'){

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
		alert('只能使用local或else');
	}

	//alert(urlObj.rtmpMediaURLArr+'\n\n'+urlObj.rtspMediaURLArr+'\n\n'+urlObj.iosMediaURLArr+'\n\n'+urlObj.progressiveMediaURLArr+'\n\n');

	//●return urlObj Object
	return urlObj;

};
//==============================================



//
//==============================================
method.choosePlayMode_localAudio = function(index){ 


	if(utils.isMobile === false){

		/*以下桌機上瀏覽器 - (非mobile) - 只在pc上測試過 / ***未能有http串流, 所以只好用Flash */

		if(utils.currentBrowser === "msie"){ //●抓不到IE11。用else抓IE
			//param.playModeArr = ["flash",urlObj.rtmpMediaURLArr];
			//param.playModeArr = ["html5",urlObj.iosMediaURLArr];
			
			//param.playModeArr = ["html5",urlObj.pcHttpMediaURLArr];
			//alert(urlObj.pcHttpMediaURLArr);
			
			//hls.js
			//param.playModeArr = ["hlsHtml5",urlObj.iosMediaURLArr];

			if( g207B.chooseSreamingOrLocalAudio === 'local' && index > 0){
					urlObj.iosMediaURLArr[index] = param.localDirectoryRoot + param.mediaURLArr[index];
					param.playModeArr = ["html5",urlObj.iosMediaURLArr];
				}else{
					alert('G207B版型的語音只能設為local端。g207B.chooseSreamingOrLocalAudio = "local"。');
				}

		}else if(utils.currentBrowser === "chrome"){
			//param.playModeArr = ["flash",urlObj.rtmpMediaURLArr];
			//param.playModeArr = ["html5",urlObj.iosMediaURLArr];
			
			//param.playModeArr = ["html5",urlObj.pcHttpMediaURLArr];
			//alert(urlObj.pcHttpMediaURLArr[0]);
			
			//hls.js
			//param.playModeArr = ["hlsHtml5",urlObj.iosMediaURLArr];

			if( g207B.chooseSreamingOrLocalAudio === 'local' && index > 0){
					urlObj.iosMediaURLArr[index] = param.localDirectoryRoot + param.mediaURLArr[index];
					param.playModeArr = ["html5",urlObj.iosMediaURLArr];
				}else{
					alert('G207B版型的語音只能設為local端。g207B.chooseSreamingOrLocalAudio = "local"。');
				}

		}else if(utils.currentBrowser === "safari"){
			//param.playModeArr = ["flash",urlObj.rtmpMediaURLArr];
			//↓↓↓桌機筆電Windows的Safari 5.1.7版本，無法播放HTML5 Video
			//param.playModeArr = ["html5",urlObj.iosMediaURLArr];
			
			//param.playModeArr = ["html5",urlObj.pcHttpMediaURLArr];
			//alert(urlObj.pcHttpMediaURLArr[0]);
			
			//hls.js
			//param.playModeArr = ["hlsHtml5",urlObj.iosMediaURLArr];

			if( g207B.chooseSreamingOrLocalAudio === 'local' && index > 0){
					urlObj.iosMediaURLArr[index] = param.localDirectoryRoot + param.mediaURLArr[index];
					param.playModeArr = ["html5",urlObj.iosMediaURLArr];
				}else{
					alert('G207B版型的語音只能設為local端。g207B.chooseSreamingOrLocalAudio = "local"。');
				}

		}else if(utils.currentBrowser === "firefox"){
			//param.playModeArr = ["flash",urlObj.rtmpMediaURLArr];
			//param.playModeArr = ["html5",urlObj.iosMediaURLArr];
			
			//param.playModeArr = ["html5",urlObj.pcHttpMediaURLArr];
			//alert(urlObj.pcHttpMediaURLArr[0]);
			
			//hls.js
			//param.playModeArr = ["hlsHtml5",urlObj.iosMediaURLArr];

			if( g207B.chooseSreamingOrLocalAudio === 'local' && index > 0){
					urlObj.iosMediaURLArr[index] = param.localDirectoryRoot + param.mediaURLArr[index];
					param.playModeArr = ["html5",urlObj.iosMediaURLArr];
				}else{
					alert('G207B版型的語音只能設為local端。g207B.chooseSreamingOrLocalAudio = "local"。');
				}

		}else if(utils.currentBrowser === "opera"){
			//param.playModeArr = ["flash",urlObj.rtmpMediaURLArr];
			//param.playModeArr = ["html5",urlObj.iosMediaURLArr];
			
			//param.playModeArr = ["html5",urlObj.pcHttpMediaURLArr];
			//alert(urlObj.pcHttpMediaURLArr[0]);
			
			//hls.js
			//param.playModeArr = ["hlsHtml5",urlObj.iosMediaURLArr];

			if( g207B.chooseSreamingOrLocalAudio === 'local' && index > 0){
					urlObj.iosMediaURLArr[index] = param.localDirectoryRoot + param.mediaURLArr[index];
					param.playModeArr = ["html5",urlObj.iosMediaURLArr];
				}else{
					alert('G207B版型的語音只能設為local端。g207B.chooseSreamingOrLocalAudio = "local"。');
				}

		}else{ //IE11靠此處抓取
			//param.playModeArr = ["flash",urlObj.rtmpMediaURLArr];
			//param.playModeArr = ["html5",urlObj.iosMediaURLArr];
			
			//param.playModeArr = ["html5",urlObj.pcHttpMediaURLArr];
			//alert(urlObj.pcHttpMediaURLArr[0]);
			
			//hls.js
			//param.playModeArr = ["hlsHtml5",urlObj.iosMediaURLArr]; 

			if( g207B.chooseSreamingOrLocalAudio === 'local' && index > 0){
					urlObj.iosMediaURLArr[index] = param.localDirectoryRoot + param.mediaURLArr[index];
					param.playModeArr = ["html5",urlObj.iosMediaURLArr];
				}else{
					alert('G207B版型的語音只能設為local端。g207B.chooseSreamingOrLocalAudio = "local"。');
				}

		}

	/*}else if(utils.isIE10 == true){
		//ie10

		*/
	}else{
		//param.playModeArr = ["flash",urlObj.rtmpMediaURLArr];
		//param.playModeArr = ["html5",urlObj.iosMediaURLArr];
		
		//param.playModeArr = ["html5",urlObj.pcHttpMediaURLArr];
		//alert(urlObj.pcHttpMediaURLArr[0]);
		
		//hls.js
		//param.playModeArr = ["hlsHtml5",urlObj.iosMediaURLArr];

		if( g207B.chooseSreamingOrLocalAudio === 'local' && index > 0){
				urlObj.iosMediaURLArr[index] = param.localDirectoryRoot + param.mediaURLArr[index];
				param.playModeArr = ["html5",urlObj.iosMediaURLArr];
			}else{
				alert('G207B版型的語音只能設為local端。g207B.chooseSreamingOrLocalAudio = "local"。');
			}

	}
};
//==============================================






$(document).ready(function(){
	
	//●整體縮放頁面 - 強迫設定為1.0，以避免播放控制失常
	//============================
	$('body').css('zoom','1.0');
	//============================
	
	
		
	
	
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
	//
	method.choosePlayMode();
	//
	method.deployment();

	
	
	
	//
	$('.mediaWrapper').each(function(index) {
		
		if( index === 0 ){
			
			
			//==============================================《●》
			//param.chooseSreamingOrLocalVideo = "streaming"; //在externalData.js裡面已經有設定。●這裡不可打開。否則網址介接匯錯亂。
			urlObj = method.getStreamingData(index);
			//==============================================《●》
			
			//method.choosePlayMode();
			
			
			//param.mediaAutoPlayArr[index] = true;
			method.embedMedia(index);
			
			//媒體介面是否有進場jQ動作 ? 
			//●這一定要在 method.embedMedia(index) 之後調用，所以移到各版型主程式調用。
			if(param.hasEnteringMotion){
				//媒體介面進場jQ動作 
				method.entering(index);
			}
			
		}else{
			
			//
			//================================================================《《《●
			if( !utils.isMobile ){ 
				

				
				//●●●桌機(非Mobile)●讀取線上G207B，需有setTimeout延遲時間
				//setTimeout(function(){
					//
					//==============================================《●》
					//g207B.chooseSreamingOrLocalAudio在externalData.js設定為'local'。
					urlObj = method.getStreamingData_localAudio(index);
					//==============================================《●》
					
			
					
				//},3000);
			
			//G207B版型，語音必採用local端來源，在行動裝置才能正常播放。所以只好全部語音採local端
			}else if( utils.isMobile ){
				//g207B.chooseSreamingOrLocalAudio在externalData.js設定為'local'。
				urlObj = method.getStreamingData_localAudio(index);
			}
			//================================================================《《《●
			
			//
			method.choosePlayMode_localAudio(index);
			
				
			//●會造成小尺寸視窗時，影音播放進度列crash。所以改用透明度0.0，來隱藏語音的播放進度列。
			//●也不能使用display:none和visibility:hidden，否則IE會本機或線上看不到語音播放進度列，及評量題。
			//===================================●
			//param.hasCustomControls = false;
			//===================================●
			
			method.embedMedia(index);
			//==================================================================●
			//●◎只能使用透明度隱藏語音播放進度列。
			//$('.mediaWrapper:eq(' + index + ')').css({'opacity':'0.0','position':'absolute','top':'-600px'});
			
			//$('.mediaWrapper:eq(' + index + ')').css({'opacity':'0.0'});
			
			//1061109
			$('.mediaWrapper:eq(' + index + ') .mediaHeader').css({'display':'none'});
			$('.mediaWrapper:eq(' + index + ') .playbackDiv').css({'display':'none'});
			
		}
		
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

	//
	$('.mediaWrapper').each(function(index) {
		
		if( index > 0 ){
			if($(window).width() > param.breakpoint){
				$('.mediaWrapper:eq(' + index + ') .mediaHeader').css({'display':'none'});
					$('.mediaWrapper:eq(' + index + ') .playbackDiv').css({'display':'none'});
				
				
			}else if($(window).width() <= param.breakpoint){
				$('.mediaWrapper:eq(' + index + ') .mediaHeader').css({'display':'none'});
					$('.mediaWrapper:eq(' + index + ') .playbackDiv').css({'display':'none'});
			}
		
		}
		
	});
	
});











//>>>=============================================================>>>
})(jQuery); //↑↑↑


























