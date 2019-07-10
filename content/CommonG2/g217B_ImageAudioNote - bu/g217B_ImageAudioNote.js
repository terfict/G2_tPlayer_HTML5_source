// JavaScript Document - G217B│g217B_ImageAudioNote.js
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
var g217B = NOU.namespace('NOU.modules.g217B');
//------------------------


g217B.prevIndex = -1;
g217B.currIndex = 0;
g217B.toralCard;



//1041217B - 需置於上方，method.lessThenIE9Css()才調用得到。
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


/*●*/
method.mediaCompleted = function(index){
	
	if( g217B.currIndex < g217B.toralCard-1 ){

		//
		g217B.prevIndex = index;
		g217B.currIndex ++ ;
		
		
		//
		$('.g217B_card').each(function(i) {
			$('.g217B_numButton:eq(' + i + ')').removeClass('g217B_numButton_over');
			$('.g217B_numButton:eq(' + i + ')').removeClass('g217B_numButton_keep');
			$('.g217B_numButton:eq(' + i + ')').css({'cursor':'pointer'});
		});
		
		//
		$('.g217B_numButton:eq(' + g217B.currIndex + ')').addClass('g217B_numButton_keep').css({'cursor':'default'});
		
		//
		g217B.showCard(g217B.currIndex);
		
		//1051117 
		try{
			//
			$('.mediaWrapper:eq(' + g217B.prevIndex + ')').css({'display':'none'});
			
			//
			$('.mediaWrapper:eq(' + g217B.currIndex + ')').css({'display':'inline-block'});
			if( !param.playingFlagArr[g217B.currIndex] ){
				tPlayer.play(g217B.currIndex);
			}
			
		}catch(err){
		}
	
	
	}else{
		//
		//$('.mediaWrapper:eq(' + g217B.currIndex + ')').css({'display':'none'});
	}
	
	
};


//1051117 - 產生、顯示所有數字按鈕
g217B.showButton = function(){
	$('.g217B_card').each(function(index) {
		var btnLabelPrefixStr = $('.btnLabelPrefix').html();
		$('.g217B_numButtonGroup').append('<span class="g217B_numButton">' + btnLabelPrefixStr + (index+1) + '</span>');
    });
	
};

//1051117 - 顯示第x頁
g217B.showCard = function(index){

	$('.g217B_card:eq(' + g217B.prevIndex + ')').fadeOut(250,function(){
		//
		$('.g217B_card:eq(' + index + ')').fadeIn(250);
	});
	
};

//
g217B.replaceMedia = function(){
	
	//
	if( g217B.prevIndex !== -1 ){
		
		//
		if( param.playingFlagArr[g217B.prevIndex] ){
			tPlayer.pause(g217B.prevIndex);
		}
		tPlayer.seek(0, g217B.prevIndex);
		
		$('.mediaWrapper:eq(' + g217B.prevIndex + ')').css({'display':'none'});
	}
	
	//
	$('.mediaWrapper:eq(' + g217B.currIndex + ')').css({'display':'inline-block'});
	
	if( !param.playingFlagArr[g217B.currIndex] ){
		tPlayer.play(g217B.currIndex);
	}
	
};

//1051117 - 
g217B.mouseEvent = function(){
	
	$('.g217B_card').each(function(index) {
		
		$('.g217B_numButton:eq(' + index + ')')
		
			//
			.on('mouseover',function(){
				if( g217B.currIndex !== index ){
					$('.g217B_numButton:eq(' + index + ')').addClass('g217B_numButton_over');
				}
			})
			//
			.on('mouseout',function(){
				if( g217B.currIndex !== index ){
					$('.g217B_numButton:eq(' + index + ')').removeClass('g217B_numButton_over');
				}
			})
			
			
			//
			.on('mousedown',function(){
				
				if( g217B.currIndex !== index ){
					//
					g217B.prevIndex = g217B.currIndex;
					g217B.currIndex = index;
					
					//
					$('.g217B_card').each(function(i) {
						$('.g217B_numButton:eq(' + i + ')').removeClass('g217B_numButton_over');
						$('.g217B_numButton:eq(' + i + ')').removeClass('g217B_numButton_keep');
						$('.g217B_numButton:eq(' + i + ')').css({'cursor':'pointer'});
					});
					
					//
					$('.g217B_numButton:eq(' + index + ')').addClass('g217B_numButton_keep').css({'cursor':'default'});
					
					//
					g217B.showCard(index);
					
					//1051117 - 
					try{
						g217B.replaceMedia();
					}catch(err){
					}
				
				}
				
			});
			
			
			
			
			//●○1051118 - 大視窗時，播放進度列因被設為無背景，所以全畫面時，在此做補償，將背景加回來。回一般畫面，則再去除背景。
			//======================================================================
			var tmpCount = 0;
			
			//playbackDiv_showBg
			//fullScreen & normalScreen
			//-----------------------------------------------------------
			$('.mediaWrapper:eq(' + index + ') .fullNormalScreen').on('mousedown',function(){
				
				//
				if(tmpCount <= 0){
				
		
					//================●○●○●○
					if( $('#mediaWall') !== undefined ){ 
						//alert($('#mediaWall'));
						$('.mediaWrapper:eq(' + index + ') .playbackDiv').addClass('playbackDiv_showBg');
						//
						tmpCount ++ ;
						
						//
						$('#mediaWall').on('mousedown',function(){
							setTimeout(function(){
								$('.mediaWrapper:eq(' + index + ') .playbackDiv').removeClass('playbackDiv_showBg');
								$('#mediaWall').off('mousedown');
								//
								tmpCount = 0 ;
							}, 100);
							
						});
						
					}
				
				//
				}else{
					$('.mediaWrapper:eq(' + index + ') .playbackDiv').removeClass('playbackDiv_showBg');
					$('#mediaWall').off('mousedown');
					//
					tmpCount = 0;
				}
		
			});
			//-----------------------------------------------------------
			
			//======================================================================
			
			
			
			
	});
	
	
	
};

//1051117 - 處理數字按鈕外觀
g217B.btnState = function(index){ 
	//alert(param.mainPath + 'g217B_ImageAudioNote/images/numBtnBg_keep.png');
	//$('.g217B_numButton:eq(' + index + ')').css({'background':'URL(' + param.mainPath + "g217B_ImageAudioNote/images/numBtnBg_keep.png" + ')'});
	$('.g217B_numButton:eq(' + index + ')').addClass('g217B_numButton_keep');
	
	//
	$('.g217B_card').each(function(i) {
		$('.g217B_numButton:eq(' + i + ')').css({'cursor':'pointer'});
	});
	//
	$('.g217B_numButton:eq(' + index + ')').css({'cursor':'default'});
};


//1051117 - 初始化賦值
g217B.initData = function(){
	g217B.prevIndex = -1;
	g217B.currIndex = 0;
	g217B.toralCard = $('.g217B_card').length;
};

//沒用到
g217B.embedMedia = function(index){
	//
	method.embedMedia(index);

	//媒體介面是否有進場jQ動作 ? 
	//●這一定要在 method.embedMedia(index) 之後調用，所以移到各版型主程式調用。
	if(param.hasEnteringMotion){
		//媒體介面進場jQ動作 
		method.entering(index);
	}
		
};


$(document).ready(function(){
	
	//●整體縮放頁面 - 強迫設定為1.0，以避免播放控制失常
	//============================
	$('body').css('zoom','1.0');
	//============================

	
	
	//啟動媒體播放相關處理
	//===================================
	//
	method.addDocumentTitle();
	//1051118
	$('.mediaHeaderString').append(document.title);
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
	method.deployment();
	
	
	//
	$('.mediaWrapper').each(function(index) {
		
		method.embedMedia(index);
	
		//媒體介面是否有進場jQ動作 ? 
		//●這一定要在 method.embedMedia(index) 之後調用，所以移到各版型主程式調用。
		if(param.hasEnteringMotion){
			//媒體介面進場jQ動作 
			method.entering(index);
		}
		
		//●
		$('.mediaWrapper:eq(' + index + ')').css({'display':'none'});
		
		
	});
	//===================================
	
	
		
	//1051117 - 初始化賦值
	g217B.initData();
	
		
	//1051117 - 產生、顯示所有數字按鈕
	g217B.showButton();
	
	//1051117 - 處理數字按鈕外觀(page_1)
	g217B.btnState(g217B.currIndex);
	
	//1051117 - 
	g217B.mouseEvent();
	
	//1051117 - 顯示第x頁(page_1)
	g217B.showCard(g217B.currIndex);
	
	

	//
	$('.mediaWrapper:eq(' + g217B.currIndex + ')').css({'display':'inline-block'});
	
	
	
	
	//===================================
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


























