// JavaScript Document - G229│g229_VideoPopVideo.js
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
var g229 =  NOU.namespace('NOU.modules.g229');
//------------------------



param.timeStartEndArr = [];



method.preloaderFadeOut = function(){
	//不設window.load
	//$(window).load(function() { // makes sure the whole site is loaded
	
		//$('#status').fadeOut(600); // will first fade out the loading animation
		$('#preloader').fadeOut(600,function(){// will fade out the white DIV that covers the website.
			$('body').css({'overflow':'auto','display':'block'});
		});
		 
	//});
};



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


//●○●○●○1050420 - 
//約從jPlayer.js之行3740~~~3750的tPlayer.completed = function(_flag, index){}裡面調用method.mediaCompleted(index)。
method.mediaCompleted = function(){
	//alert('mediaCompleted');
};



//
g229.getData = function(){

	$('.playPopvideo').each(function(index) {


		param.timeStartEndArr[index] = [];

		//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
        param.timeStartEndArr[index][0] = $('.playPopvideo:eq(' + index + ') .timeData').data('timestart');
        param.timeStartEndArr[index][1] = $('.playPopvideo:eq(' + index + ') .timeData').data('timeend');
        // param.timeStartEndArr[index][2] = $('.playPopvideo:eq(' + index + ') .timeData').data('timestart');
        // param.timeStartEndArr[index][3] = $('.playPopvideo:eq(' + index + ') .timeData').data('timeend');
        //★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★

        // alert( $('.playPopvideo:eq(' + index + ') .timeData').data('timestart') + '/' +$('.playPopvideo:eq(' + index + ') .timeData').data('timeend') );
        // alert( param.timeStartEndArr[index][0] + '/' +param.timeStartEndArr[index][1] );
        // alert(param.timeStartEndArr.length);
        // alert( param.timeStartEndArr[index][1] );

	});


	// alert( param.timeStartEndArr[0][0] + '/' + param.timeStartEndArr[0][1] );


};


param.targetVideoIndex = -1;

//點擊跳出 popVideo
g229.popVideoEvent = function(){


	//●○1060428 - 按下外連Youtube影音的連結，版型頁面上的影音立即暫停
	//=====================================================
	$('.playPopvideo').each(function(index) {


		//點擊任何一個.playPopvideo裡面的<a>標籤 (※都外連到Youtube影音)
		//◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
        $('.playPopvideo:eq(' + index + ') a').on('mousedown', function(e){
        //◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆


        	param.currScrollTop = $(window).scrollTop();
        	// alert(param.currScrollTop);


        	//紀錄目前被點擊的資料位置
        	//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
        	param.currIndex = index;	//alert(param.currIndex);
        	//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★

			
			//所有的影音都暫停播放
			$('.mediaWrapper').each(function(mediaIndex) {
                tPlayer.pause(mediaIndex);
            });
			// alert($('.mediaWrapper').length);	//5


			//================================================================★★★
			var targetClass = $('.playPopvideo:eq(' + index + ') a').data('targetvideo');	//★★★取得 data-targetvideo 資料
			//================================================================★★★
			param.targetVideoIndex = $('.mediaWrapper').index( $('.'+targetClass) );	//★★★取得 popVideo 的 索引值
			// alert(param.targetVideoIndex);
			//================================================================★★★


			//★★★ 因直接開啟為全螢幕，所以就不用定位影片位置 ★★★//
			//計算 popVideo 的居中位置 
			//================================================================★★★
			var targetVideoPosX = $(window).width()/2 - $('.'+targetClass).width()/2;
			var targetVideoPosY = $(window).scrollTop() + $(window).height()/2 - $('.'+targetClass).height()/2;
			// var targetVideoPosY = $(window).height()/2 - $('.'+targetClass).height()/2;
			//================================================================★★★
			// alert($(window).scrollTop());
			//★★★ 因直接開啟為全螢幕，所以就不用定位影片位置 ★★★//


			//
			$('.'+targetClass).css({
					//顯示 popVideo
					'display':'block',
					// //★★★ 因直接開啟為全螢幕，所以就不用定位影片位置 ★★★//
					'position':'absolute',
					'z-index':'100',
					//
					'left':targetVideoPosX,
					'top':targetVideoPosY,
					// //★★★ 因直接開啟為全螢幕，所以就不用定位影片位置 ★★★//
				});


			//================================================================★★★
			tPlayer.play(param.targetVideoIndex);
			//================================================================★★★
			tPlayer.seek( method.hmsToSecond( param.timeStartEndArr[param.currIndex][0] ), param.targetVideoIndex );
			// alert(method.hmsToSecond( param.timeStartEndArr[targetVideoIndex][0] ));
			//================================================================★★★




			//===================================================================
			if( $(window).width() > param.breakpoint){
			//===================================================================


				//trigger為全畫面
				$('.mediaWrapper:eq(' + param.targetVideoIndex + ') .fullNormalScreen').trigger('mousedown');


				//全畫面時，按下.fullNormalScreen按鈕，停播，隱藏video
				$('.mediaWrapper:eq(' + param.targetVideoIndex + ') .fullNormalScreen').on('mousedown', function(){
					setTimeout(function(){
						if( !param.fullScreenFlagArr[param.targetVideoIndex] ){
							tPlayer.pause(param.targetVideoIndex);
							$('.popVideo').css({'display':'none'});
							$('html, body').animate({scrollTop:(param.currScrollTop)},380);
						}
					},360);
				})

				//全畫面時，按下#mediaWall按鈕，停播，隱藏video
				$('#mediaWall').on('mousedown', function(){
					setTimeout(function(){
						if( !param.fullScreenFlagArr[param.targetVideoIndex] ){
							tPlayer.pause(param.targetVideoIndex);
							$('.popVideo').css({'display':'none'});
							$('html, body').animate({scrollTop:(param.currScrollTop)},380);

							$('.playPopvideo:eq(' + index + ') a')
								.delay(690)
								.animate({'opacity':'0.3'},99)
								.animate({'opacity':'1.0'},99)
								.animate({'opacity':'0.3'},99)
								.animate({'opacity':'1.0'},99)
								.animate({'opacity':'0.3'},99)
								.animate({'opacity':'1.0'},600);
						}
					},360);
				});


			//===================================================================
			}else{
			//===================================================================


				//調用 method.fullScreenObjAjust()，開啟為全畫面
				method.fullScreenObjAjust(tPlayer.h5MediaObj[param.targetVideoIndex],param.mediaWidthArr[param.targetVideoIndex],param.mediaHeightArr[param.targetVideoIndex], param.targetVideoIndex);


				//全畫面時，按下.fullNormalScreen按鈕，停播，隱藏video
				$('.mediaWrapper:eq(' + param.targetVideoIndex + ') .fullNormalScreen').on('mousedown', function(){
					setTimeout(function(){
						if( !param.fullScreenFlagArr[param.targetVideoIndex] ){
							tPlayer.pause(param.targetVideoIndex);
							$('.popVideo').css({'display':'none'});
							$('html, body').animate({scrollTop:(param.currScrollTop)},380);
						}
					},360);
				})

				//全畫面時，按下#mediaWall按鈕，停播，隱藏video
				$('#mediaWall').on('mousedown', function(){
					setTimeout(function(){
						if( !param.fullScreenFlagArr[param.targetVideoIndex] ){
							tPlayer.pause(param.targetVideoIndex);
							$('.popVideo').css({'display':'none'});
							$('html, body').animate({scrollTop:(param.currScrollTop)},380);

							$('.playPopvideo:eq(' + index + ') a')
								.delay(690)
								.animate({'opacity':'0.3'},99)
								.animate({'opacity':'1.0'},99)
								.animate({'opacity':'0.3'},99)
								.animate({'opacity':'1.0'},99)
								.animate({'opacity':'0.3'},99)
								.animate({'opacity':'1.0'},600);
						}
					},360);
				});


			//===================================================================
			}
			//===================================================================




			//
			$(window).on('resize', function(){
				
				if( $(window).width() <= param.breakpoint){
				}
				

			})
			

		//◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆
		});
		//◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆


    });
	//=====================================================
};



$(document).ready(function(){


	//延遲300毫秒再調用 - 預載方法method.preloaderFadeOut()
	//--------------------------------------------
	//setTimeout( method.preloaderFadeOut, 300);
	setTimeout( method.preloaderFadeOut, 300);
	//--------------------------------------------

	
	//●整體縮放頁面 - 強迫設定為1.0，以避免播放控制失常
	//============================
	$('body').css('zoom','1.0');
	//============================
	
	/*method.addDocumentTitle();

	method.getPath();
	method.pageInit();
	method.init();*/
	
	
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
	
	
	// IE6~IE8
	method.lessThenIE9Css();




//《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《《



	//放在 $(document).ready 上面，才能調用得到
	g229.getData();

	//放在 $(document).ready 上面，才能調用得到
	g229.popVideoEvent();
	
	
	//★★★ 延遲380毫秒，再隱藏，才能隱藏。
	//=====================================================★★★★★★
	setTimeout(function(){
		$('.popVideo').css({'display':'none'});
	},380);
	//=====================================================★★★★★★
	

});




//==========================================================================●》》》
//●●●○○○由tPlayer.js調用此處的method.updateCurrTime()
method.updateCurrTime = function(mediaIndex){

	// console.log(method.hmsToSecond( param.timeStartEndArr[param.currIndex][1] ));
	// console.log(param.currIndex);
	//★★★★★★★★★★★★★★★★★★★★★ 需有這條件式，才不會error
	if( param.targetVideoIndex !== -1 ){
		console.log(mediaIndex);
		g229.checkTimeCode( mediaIndex, method.hmsToSecond( param.timeStartEndArr[param.currIndex][1] ) ) ;
	}
	//★★★★★★★★★★★★★★★★★★★★★ 需有這條件式，才不會error
};


//●○●○●○被method.updateCurrTime(){}所調用
g229.checkTimeCode = function(mediaIndex, timeend){

	var currTime = param.currTimeArr[mediaIndex];

	//持續偵測 是否到達 停止時間
	if( currTime >=  timeend && currTime < (timeend+0.5) ){
		setTimeout(function(){
			tPlayer.pause(mediaIndex);
		},300);
		
	}

};


//1041202
$(window).on('resize', function(){
	// IE6~IE8
	method.lessThenIE9Css();
});







//>>>=============================================================>>>
})(jQuery); //↑↑↑







