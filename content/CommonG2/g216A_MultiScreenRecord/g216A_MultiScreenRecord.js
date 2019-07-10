// JavaScript Document - G216A│g216A_ScreenRecordVideo800x600.js
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
var g216A =  NOU.namespace('NOU.modules.g216A');
//------------------------


g216A.totalBtnPage = 0;
g216A.currBtnPage = 0;
g216A.totalCard = 0;
g216A.currCard = 0;

g216A.defaultMarginLeft = 0;
g216A.defaultMarginRight = 0;
//g216A.pageWrapperWidth = 0; //已設定在externalData.js
g216A.currBtnPageWidth = 0;

g216A.atInnerStatus = false;
g216A.initWinStatus = "normal"; //初始進入頁面時，視窗寬度的狀態為：normal(一般大視窗狀態)│rwd(小尺寸視窗RWD狀態)。

g216A.mediaDivProp = {};
g216A.mediaDivProp.label = []; //對應 .g216A_card > .label
g216A.mediaDivProp.mediaTarget = []; //對應 .g216A_card > .video
g216A.mediaDivProp.mediaAutoPlay = [];
g216A.mediaDivProp.mediaWidth = [];
g216A.mediaDivProp.mediaHeight = [];
g216A.mediaDivProp.beforeOrAfter = [];
g216A.mediaDivProp.atBtnPage = [];

g216A.menuBtnHTML = '';
g216A.menuOpen = false;




//媒體介面進場jQ動作 - ●1050729-覆蓋tPlayer.js的同名物件方法。
method.entering = function(index){
	//●○1041028 - 進場
	$('.mediaWrapper:eq('+index+') .mediaHeader').slideUp(0);
	$('.mediaWrapper:eq('+index+') .mediaDiv, .mediaWrapper:eq('+index+') .mediaDiv > object').fadeOut(0);
	$('.mediaWrapper:eq('+index+')').slideUp(360,function(){
		$('.mediaWrapper:eq('+index+') .mediaHeader').slideDown(0);
		$('.mediaWrapper:eq('+index+') .mediaDiv, .mediaWrapper:eq('+index+') .mediaDiv > object').fadeIn(0);
		$('.mediaWrapper:eq('+index+')').slideDown(180);
	});
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
}


//●程式化RWD處理：根據 視窗寬度 與 斷點 的關係，處理差異化
g216A.rwdFunc = function(){
	
	//normal
	if($(window).width() > param.breakpoint){
		//操控[頁碼組]的位置
		if( !$('.pageWrapper').hasClass('g216A_pageNum') ){
			$('.g216A_pageNum').insertAfter( $('.g216A_btnPageGroup') );
		}
		
		//1050727 - ●必要控制，否則破版。 - for IE8
		//==========================================
		$('.innerWrapper').css({'width':'auto'});
		//==========================================
		
		//==========================================
		//$('.pageWrapper').css({'width':g216A.pageWrapperWidth});
		$('.pageWrapper').css({'width':param.currW});
		//==========================================
		
		
		
	//rwd小尺寸
	}else{
		//操控[頁碼組]的位置
		if( !$('.g216A_prevNext').hasClass('g216A_pageNum') ){
			$('.g216A_pageNum').insertAfter( $('.g216A_prevBtn') );
		}
		
		//1050727 - ●必要控制，否則破版。 - for IE8
		//==========================================
		$('.innerWrapper').css({'width':'100%'});
		//==========================================
		
		//==========================================
		$('.pageWrapper').css({'width':'100%'});
		//==========================================
		
		
	}
	
	
	//======================================================================
	
	
	//●●● (param.breakpoint + g216A.breakpointOffset)
	//《《《 normal 》》》
	if($(window).width() > (g216A.mediaDivProp.mediaWidth[g216A.currCard] + g216A.breakpointOffset)){

		//g216A.atInnerStatus
		//內頁數字選單組容器 出現 - $('.numButtonNReturnContainerDiv')
		if( g216A.atInnerStatus && g216A.initWinStatus === "normal" ){ //alert($(document.body).hasClass('numButtonNReturnContainerDiv'));
			//if( $('.numButtonNReturnContainerDiv').get(0) === undefined ){
			//$('.numButtonNReturnContainerDiv').css({'display':'inline-block'});
				
			//}
		}else if( g216A.atInnerStatus && g216A.initWinStatus === "rwd" ){
			//$('.numButtonNReturnContainerDiv').css({'display':'inline-block','width':'50px','height':'670px'});
			
			//●●●
			//$('.pageWrapper').css({'display':'none'});
		}
		
		
		//●●●注意高度
		//----------------------------------------------------------------------
		//計算 .numButtonNReturnContainerDiv 的高度
		var targetHeight;
		// IE6~IE8
		if (!document.addEventListener) {
			var mediaHeaderHeight = $('.playbackDiv').height() ? $('.playbackDiv').height() : 38;
			var playbackDivHeight = $('.playbackDiv').height() ? $('.playbackDiv').height() : 26;
			//var targetHeight = g216A.mediaDivProp.mediaHeight[g216A.currCard] + $('.mediaHeader').height() + $('.playbackDiv').height() + 10;
			//配合旭聯平台將IE降階後，可能抓不到mediaHeaderHeight高度，等等處理。需一個微調參數。設定於externalData.js。
			targetHeight = g216A.mediaDivProp.mediaHeight[g216A.currCard] + mediaHeaderHeight + playbackDivHeight + g216A.numButtonNReturnContainerDivHeightOffset;
			//alert($('.mediaHeader').height() +'/' + $('.playbackDiv').height());
			
		}else{
			targetHeight = g216A.mediaDivProp.mediaHeight[g216A.currCard] + $('.mediaHeader').height() + $('.playbackDiv').height() + 10;
		}
		
		
		//●g216A.numButtonNReturnContainerDivWidth定義在externalData.js
		$('.numButtonNReturnContainerDiv').css({'display':'table','width':g216A.numButtonNReturnContainerDivWidth});
		//高度 先以auto來自動抓取
		$('.numButtonNReturnContainerDiv').css({'height':'auto'});
		
		
		//再來比較 targetHeight 和 $('.numButtonNReturnContainerDiv').height() 的數值：
		//如果 targetHeight 比  $('.numButtonNReturnContainerDiv').height() 更大，則讓$('.numButtonNReturnContainerDiv')再長高一些。
		if( targetHeight > $('.numButtonNReturnContainerDiv').height() ){
			$('.numButtonNReturnContainerDiv').css({'height':targetHeight});
		}
		//----------------------------------------------------------------------
		
		
		//1050802
		//==========================================================
		$('.g216A_menuBtnOuter').css({'display':'none'});
		//==========================================================
		
	
		//
		//==========================================================
		if( $('.numButtonDiv').get(0) === undefined ){
			$('.numButtonWrapper').css({'display':'block'});
			g216A.createInnerNumBtnNEvent();
		}
		//==========================================================
		
		
		//
		$('.returnBtnDiv').removeClass('returnBtnDiv_RwdAddOffset');
		
		//若下拉選單打開，則將之關閉。
		if(g216A.menuOpen === true){
			$('.g216A_menuCloseBtn').trigger('mousedown');
			g216A.menuOpen = false;
		}
		
		
		
	//《《《 rwd小尺寸 》》》
	}else{
		
		//●處於內頁狀態，且 ●初始進入頁面時，為大尺寸normal視窗
		if( g216A.atInnerStatus && g216A.initWinStatus === "normal" ){
			//$('.numButtonNReturnContainerDiv').css({'display':'inline-block','width':'800px','height':'50px'});
			
		}else{
			
		}
		
		
		//1050727 - ●width由800px，改成100%，Android Chrome瀏覽器，旋轉時，才能使媒體播放寬度正常RWD。
		//否則由垂直方向轉到水平，媒體本身即播放介面之寬度，會被.numButtonNReturnContainerDiv的寬度(800px)所影響，而太大。
		$('.numButtonNReturnContainerDiv').css({'width':'100%','height':'auto','display':'table'});
		
		//
		$('.returnBtnDiv').addClass('returnBtnDiv_RwdAddOffset');
		
		
		//alert($('.numButtonNReturnContainerDiv .g216A_menuBtnOuter').get(0));
		//1050802
		//==========================================================
		if( g216A.atInnerStatus && $('.numButtonNReturnContainerDiv .g216A_menuBtnOuter').get(0) === undefined ){
			$('.numButtonNReturnContainerDiv').append($('.g216A_menuBtnOuter'));
			$('.g216A_menuBtnOuter').css({'display':'table'});
		}else{
			$('.g216A_menuBtnOuter').css({'display':'table'});
		}
		//==========================================================
		
		
		//
		//==========================================================
		if( $('.numButtonDiv').get(0) !== undefined ){
			g216A.numBtnEventOff();
			$('.numButtonWrapper').css({'display':'none'});
			g216A.numBtnClear();
		}
		//==========================================================

		
		
		
	}
	
	
	
		
};






//---------------------------------------------------------------------《《《《《《
//●上一頁、下一頁按鈕的透明度狀態，滑鼠狀態、是否能點擊？
g216A.prevNextState = function(){
	
	//g216A_prevBtn
	if( g216A.currBtnPage === 0 ){
		$('.g216A_prevBtn').css({'opacity':g216A.prevNextBtnEdgeOpacity,'cursor':'default'});
		
	}else if( g216A.currBtnPage > 0 && g216A.currBtnPage < g216A.totalBtnPage ){
		$('.g216A_prevBtn').css({'opacity':g216A.prevNextBtnOpacity,'cursor':'pointer'});
	}
	
	//g216A_nextBtn
	if( g216A.currBtnPage === g216A.totalBtnPage-1 ){
		$('.g216A_nextBtn > img').attr('src', param.mainPath + 'g216A_MultiScreenRecord/images/next.png');
		$('.g216A_nextBtn').css({'opacity':g216A.prevNextBtnEdgeOpacity,'cursor':'default'});
		
	}else if( g216A.currBtnPage >= 0 && g216A.currBtnPage < g216A.totalBtnPage - 1 ){
		$('.g216A_prevBtn > img').attr('src', param.mainPath + 'g216A_MultiScreenRecord/images/prev.png');
		$('.g216A_nextBtn').css({'opacity':g216A.prevNextBtnOpacity,'cursor':'pointer'});
	}
	
	
};


//●[關閉] - 上一頁、下一頁按鈕的滑鼠事件註冊與處理
g216A.offPrevNextEvent = function(){
	$('.g216A_nextBtn').off('mouseover').off('mouseout').off('mousedown');
	$('.g216A_prevBtn').off('mouseover').off('mouseout').off('mousedown');
};


//●[附加] - 上一頁、下一頁按鈕的滑鼠事件註冊與處理
g216A.prevNextEvent = function(){
	
	//●●●
	//=============================================
	$('.g216A_nextBtn')
	//=============================================
	.on('mouseover',function(){ 
		if( g216A.currBtnPage >= 0 && g216A.currBtnPage < g216A.totalBtnPage - 1 ){ 
			$('.g216A_nextBtn > img').attr('src', param.mainPath + 'g216A_MultiScreenRecord/images/next_over.png');
		}
	})
	//$('.g216A_nextBtn')
	.on('mouseout',function(){ 
		if( g216A.currBtnPage >= 0 && g216A.currBtnPage < g216A.totalBtnPage - 1 ){ 
			$('.g216A_nextBtn > img').attr('src', param.mainPath + 'g216A_MultiScreenRecord/images/next.png');
		}
	})
	

	//$('.g216A_nextBtn')
	.on('mousedown',function(e){ 
		
		//●○
		if( g216A.currBtnPage >= 0 && g216A.currBtnPage < g216A.totalBtnPage - 1 ){ 
		
			//
			//============================
			g216A.offPrevNextEvent();
			//============================
			
		
			$('.g216A_nextBtn > img').attr('src', param.mainPath + 'g216A_MultiScreenRecord/images/next_down.png');
			
			setTimeout(function(){
				//alert(e.currentTarget.className);
				/*if( e.currentTarget.className === "g216A_nextBtn" ){
					$('.g216A_nextBtn > img').attr('src', param.mainPath + 'g216A_MultiScreenRecord/images/next_over.png');
				}else{
					$('.g216A_nextBtn > img').attr('src', param.mainPath + 'g216A_MultiScreenRecord/images/next.png');
				}*/
				
				$('.g216A_nextBtn > img').attr('src', param.mainPath + 'g216A_MultiScreenRecord/images/next.png');
				
			},150);
			
			
			
			//1050721 - IE8(含)以下，抓不到defaultMarginLeft、defaultMarginRight。只得到NaN。
			var defaultMarginLeft = parseInt($('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').css('margin-left')); 
			var defaultMarginRight = parseInt($('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').css('margin-right'));
			
			//針對IE8(含)以下處理
			if( !utils.isMobile && utils.currentBrowser === 'msie' ){
				if( $('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').css('margin-left') === 'auto' ){
					defaultMarginLeft = 0; 
				}
				if( $('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').css('margin-right') === 'auto' ){
					defaultMarginRight = 0;
				}
				
			}
			//alert(defaultMarginRight + '/' + defaultMarginLeft);
			//alert($('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').css('margin-left'));
			
			var pageWrapperWidth = $('.pageWrapper').width(); 
			var currBtnPageWidth = $('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').width();
			
			
			
			//$('.g216A_nextBtn')
			//目前.g216A_btnPage頁面：出場
			$('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').animate({'margin-left':-pageWrapperWidth*0.5, 'opacity':0.0},180, function(){
				$('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').css({'margin-left':defaultMarginLeft});
				
				$('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').hide(0).css({'opacity':'1.0'});
				$('.g216A_pageNum').hide(0);
				
				
				g216A.currBtnPage++; 
				
				//上一頁、下一頁按鈕的透明度狀態，滑鼠狀態、是否能點擊？
				g216A.prevNextState();
				
				
				//$('.g216A_nextBtn')
				//下一頁.g216A_btnPage頁面：進場
				$('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').animate({'margin-left':pageWrapperWidth*0.5, 'opacity':0.0},0, function(){
					
					//$('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').show(280);
					
					$('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').show(280).animate({'margin-left':defaultMarginLeft, 'opacity':1.0},180, function(){
						
						g216A.updatePageNum();
						$('.g216A_pageNum').show(0);
						
						////上一頁、下一頁按鈕的滑鼠事件註冊與處理
						//============================
						g216A.prevNextEvent();
						//============================
						
						
					});
				});
				
			});
			
		}
		
		
	});
	//=============================================
	
	
	
	//●●●
	//=============================================
	$('.g216A_prevBtn')
	//=============================================
	.on('mouseover',function(){ 
		if( g216A.currBtnPage > 0 && g216A.currBtnPage < g216A.totalBtnPage ){ 
			$('.g216A_prevBtn > img').attr('src', param.mainPath + 'g216A_MultiScreenRecord/images/prev_over.png');
		}
	})
	//$('.g216A_prevBtn')
	.on('mouseout',function(){ 
		if( g216A.currBtnPage > 0 && g216A.currBtnPage < g216A.totalBtnPage ){ 
			$('.g216A_prevBtn > img').attr('src', param.mainPath + 'g216A_MultiScreenRecord/images/prev.png');
		}
	})
	
	
	//$('.g216A_prevBtn')
	.on('mousedown',function(){ 
		
		//●○
		if( g216A.currBtnPage > 0 && g216A.currBtnPage < g216A.totalBtnPage ){ 
		
			//
			//============================
			g216A.offPrevNextEvent();
			//============================
			
		
			$('.g216A_prevBtn > img').attr('src', param.mainPath + 'g216A_MultiScreenRecord/images/prev_down.png');
			
			setTimeout(function(){
				$('.g216A_prevBtn > img').attr('src', param.mainPath + 'g216A_MultiScreenRecord/images/prev.png');
			},150);
			
			
			
			//1050721 - IE8(含)以下，抓不到defaultMarginLeft、defaultMarginRight。只得到NaN。
			var defaultMarginLeft = parseInt($('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').css('margin-left'));
			var defaultMarginRight = parseInt($('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').css('margin-right'));
			
			//針對IE8(含)以下處理
			if( !utils.isMobile && utils.currentBrowser === 'msie' ){
				if( $('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').css('margin-left') === 'auto' ){
					defaultMarginLeft = 0;
				}
				if( $('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').css('margin-right') === 'auto' ){
					defaultMarginRight = 0;
				}
				
			}
			//alert(defaultMarginRight + '/' + defaultMarginLeft);
			//alert($('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').css('margin-left'));
			
			var pageWrapperWidth = $('.pageWrapper').width(); 
			var currBtnPageWidth = $('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').width();
			
			
			
			//$('.g216A_prevBtn')
			//目前.g216A_btnPage頁面：出場
			$('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').animate({'margin-left':pageWrapperWidth*0.5, 'opacity':0.0},180, function(){
				
				$('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').css({'margin-left':defaultMarginLeft});
				
				$('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').hide(0).css({'opacity':'1.0'});
				$('.g216A_pageNum').hide(0);
				
				
				g216A.currBtnPage--; 
				
				//上一頁、下一頁按鈕的透明度狀態，滑鼠狀態、是否能點擊？
				g216A.prevNextState();
				
				
				//$('.g216A_prevBtn')
				//上一頁.g216A_btnPage頁面：進場
				$('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').animate({'margin-left':-pageWrapperWidth*0.5, 'opacity':0.0},0, function(){
					
					
					$('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').show(280).animate({'margin-left':defaultMarginLeft, 'opacity':1.0},180, function(){
						
						g216A.updatePageNum();
						$('.g216A_pageNum').show(0);
						
						////上一頁、下一頁按鈕的滑鼠事件註冊與處理
						//============================
						g216A.prevNextEvent();
						//============================
												
						
					});
				});
				
			});
			
		}
		
		
	});
	//=============================================
	
	
};
//---------------------------------------------------------------------《《《




//---------------------------------------------------------------------《《《
//※●○由tPlayer.js裡的tPlayer.completed = function(_flag, index){}裡的
//行3949if(method.mediaCompleted){ method.mediaCompleted(index);}所調用。
method.mediaCompleted = function(){
	$('.returnBtn').trigger('mousedown');
};
//---------------------------------------------------------------------《《《




//---------------------------------------------------------------------《《《


//●○關掉「返回封面鈕」 的滑鼠事件處理
g216A.returnBtnMouseEventOff = function(){
	$('.returnBtn').off('mouseover');
	$('.returnBtn').off('mouseout');
	$('.returnBtn').off('mousedown');
};



//●○「返回封面鈕」 的滑鼠事件處理
g216A.returnBtnMouseEvent = function(){
	
	//
	//=======================================
	$('.returnBtn')
	//=======================================
	
	//
	.on('mouseover',function(){
		$('.returnBtn > img').attr('src', param.mainPath + 'g216A_MultiScreenRecord/images/arrowLeft_over.png');
	})
	
	//
	.on('mouseout',function(){
		$('.returnBtn > img').attr('src', param.mainPath + 'g216A_MultiScreenRecord/images/arrowLeft.png');
	})
	
	//
	.on('mousedown',function(){ 
	
	
		//※●○※●○※●○1050727 - 需做此段落處理，否則IE8(含)以下，第2頁讀取媒體檔，播放進度列和播放頭會不正常(來回跑)。※●○※●○※●○
			//************************************************************************************************************
			$('.mediaWrapper').each(function(index) {
				//tPlayer.swfMediaObj[index] = document.getElementById("tPlayer_"+index.toString());
				//$(tPlayer.swfMediaObj[index]).css({'display':'none'});
				
				//1050803- ●○●○●○避免按下return鈕，回封面時，發生error訊息。
				//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
				try{
					tPlayer.pause(index);
					tPlayer.pauseUpdateTimer(index);
				}catch(err){
					//
				}
				//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
				
				//delete tPlayer.swfMediaObj[index];
				//$(this).find($('.playbackDiv')).empty().remove();
               //$(this).css({'display':'none'}).empty().remove();
            });
			//************************************************************************************************************
			
			//$('#tPlayer_0').empty().remove();
		
		
	
		//關掉 「返回封面鈕」、「數字鈕」 的滑鼠事件處理
		//=====================================
		g216A.returnBtnMouseEventOff();
		//=====================================
		g216A.numBtnEventOff();
		g216A.numBtnClear();
		//=====================================
		g216A.menuRowMouseEventOff();
		//=====================================
		
		
		
		
		//●○1050803 - 若媒體檔全螢幕播放到結尾，必須有此行，才能清除.mediaWall(●媒體全畫面時，黑色半透明，遮檔媒體下方物件 之DIV)
		//=====================================
		$('#mediaWall').trigger('click');
		//=====================================
		
		
		
		var pageWrapperWidth = $('.pageWrapper').width(); //alert(pageWrapperWidth);
		

		
		//
		$('.numButtonNReturnContainerDiv').animate({/*'width':50,'height':50,*/'margin-left':-pageWrapperWidth, 'opacity':0.0},480, function(){
			$('.numButtonNReturnContainerDiv').empty().remove();
			
		});
		
		$('.innerWrapper').animate({'margin-left':-pageWrapperWidth,'opacity':0.0},480, function(){
			
	
			
			$('.innerWrapper').empty().remove();
			//
			
			$('.pageWrapper').show(0).animate({'margin-left':0, 'opacity':1.0},280, function(){
				$('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').css({'margin-left':0,'opacity':'1.0'});
				$('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').show(280);
				
				
				//
				$('.g216A_header').fadeIn(380);
				
				//1050919 - 新增條件式：
				if( g216A.totalBtnPage > 1 ){
					$('.g216A_pageNum').show(280);
				}
				
				//1050919 - 新增條件式
				if( g216A.totalBtnPage > 1 ){
					$('.g216A_prevNext').fadeIn(380);
				}
				
				
				
				//
				//處於封面狀態
				//------------------------------------
				g216A.atInnerStatus = false;
				//------------------------------------
				
			});
			
			
			
			
		});	
		
		
	});
	
	
};



//
g216A.createMedia = function(btnIndex){
	
	//
	//method.deployment_g16A();
	method.deployment();
	
	
	//
	$('.mediaWrapper').each(function(index) {
		
		$('.mediaWrapper:eq(' + index + ')').css({'display':'block'});
		
		//param.mediaAutoPlayArr[index] = true;
		method.embedMedia(index);
		
		
		//●1050727 - G216A版型 - ●必須延時執行才能奏效。
		//======================================================
		//======================================================
		setTimeout(
			function(){
		
				//1050727
				if( utils.isMobile ){ 
					//●1050616- 必要 - 在這裡控制.slider_2、progressBar_2 回到0的位置
					$('.mediaWrapper:eq(' + index + ') .slider_2').animate({'left':-9},0);
					$('.mediaWrapper:eq(' + index + ') .progressBar_2>img, .mediaWrapper:eq(' + index + ') .progressBar_2').css({'width':0});
				}
				
			},200);
		//======================================================
		//======================================================
		
		
		
		//媒體介面是否有進場jQ動作 ? 
		//●這一定要在 method.embedMedia(index) 之後調用，所以移到各版型主程式調用。
		if(param.hasEnteringMotion){
			//媒體介面進場jQ動作 
			method.entering(index);
		}
		
		
		
		
	});
	//===================================
	
	
	
};


//
g216A.createMediaWrapper = function(btnIndex){
	
	//
	var mediaWrapperHTML = 
	'<div class="mediaWrapper">'+
        '<div class="mediaHeader">'+
            '<span class="icon"></span>'+
            '<span class="mediaHeaderString">' + g216A.mediaDivProp.label[btnIndex] +
           	'</span>'+
            '<span class="buttons">'+
            	'<span class="notebook"></span>'+
                '<span class="help"></span>'+
            '</span>'+
       '</div>'+
       '<div class="mediaDiv">'+
			'<span class="mediaTarget">' + g216A.mediaDivProp.mediaTarget[btnIndex] + '</span>'+
            '<span class="mediaAutoPlay">' + g216A.mediaDivProp.mediaAutoPlay[btnIndex] + '</span>'+
            '<span class="mediaWidth">' + g216A.mediaDivProp.mediaWidth[btnIndex] + '</span>'+
            '<span class="mediaHeight">' + g216A.mediaDivProp.mediaHeight[btnIndex] + '</span>'+
            '<span class="beforeOrAfter">' + g216A.mediaDivProp.beforeOrAfter[btnIndex] + '</span>'+
        '</div>'+
    '</div>';
	
	//
	$('.innerWrapper').html( mediaWrapperHTML );
	//alert(mediaWrapperHTML);
	
	
	/*$('.innerWrapper').load('page.html',function(){
		//alert();
	});*/
	
	
};


//
g216A.numBtnEventOff = function(){
	//
	$.each(g216A.mediaDivProp.label, function(index){
		$('.numButtonDiv:eq(' + index + ')').off('mouseover');
		$('.numButtonDiv:eq(' + index + ')').off('mouseout');
		$('.numButtonDiv:eq(' + index + ')').off('mousedown');
	});
};


//
g216A.numBtnClear = function(){
	//
	$.each(g216A.mediaDivProp.label, function(index){
		$('.numButtonDiv:eq(' + index + ')').empty().remove();
	});
};


//滑鼠移到.numButton上，觸發的註解(annotation)處理
g216A.addNumButtonAnnotation = function(index){
	if( $('.bubble').get(0) === undefined && g216A.currCard !== index){
		//
		var annotationHTML = '<span class="bubble"><span class="bubble_left"></span><span class="bubble_center"></span><span class="bubble_right"></span></span>';
		//
		$('.numButtonDiv:eq(' + index + ')').append(annotationHTML);
		//
		var currX = $('.numButtonDiv:eq(' + index + ')').width();
		var currY = -$('.numButtonDiv:eq(' + index + ')').height()*1.8;
		//alert(index + '/' + currX + '/' + currY);
		//
		$('.numButtonDiv:eq(' + index + ') .bubble').css({'left':currX,'top':currY});
		//
		$('.numButtonDiv:eq(' + index + ') .bubble_center').html( g216A.mediaDivProp.label[index] );
		
	}
};

//●滑鼠移到.numButton之外，觸發的移除註解處理
g216A.removeNumButtonAnnotation = function(index){
	if( $('.bubble').get(0) !== undefined ){
		//
		$('.numButtonDiv:eq(' + index + ') .bubble').empty().remove();
		
	}
};


//
g216A.createInnerNumBtnNEvent = function(){
	//
	var numCircleHTML = '<span class="numButtonDiv"><span class="numButtonLabel"></span></span>';
	
	//
	$.each(g216A.mediaDivProp.label, function(index){
		
		//
		$('.numButtonNReturnContainerDiv .numButtonWrapper').append(numCircleHTML);
		$('.numButtonLabel:eq(' + index + ')').html(index+1);
		
		
		
		//進入內頁，作用中的.numButtonDiv換背景。 .numButtonLabel更換字的顏色。
		//===========================================
		if( g216A.currCard === index){
			$('.numButtonDiv:eq(' + index + ')').css({'background':'URL(' + param.mainPath + 'g216A_MultiScreenRecord/images/numCircle_current.png)'});
			$('.numButtonLabel:eq(' + index + ')').addClass('numButtonCurrLabelTextColor');
		}
		//===========================================
		
		
		
		//●★●★●★
		//===========================================
		$('.numButtonDiv:eq(' + index + ')')
		//===========================================
		
		//
		.on('mouseover',function(){ 
			if( g216A.currCard !== index){
				$('.numButtonDiv:eq(' + index + ')').css({'background': 'URL(' + param.mainPath + 'g216A_MultiScreenRecord/images/numCircle_over.png' + ')'});
				$('.numButtonLabel:eq(' + index + ')').addClass('numButtonOverLabelTextColor');
			}
			
			//●滑鼠移到.numButton上，觸發的註解處理
			//=======================================
			g216A.addNumButtonAnnotation(index);
			//=======================================
			
		})
		
		//
		.on('mouseout',function(){
			if( g216A.currCard !== index){
				$('.numButtonDiv:eq(' + index + ')').css({'background': 'URL(' + param.mainPath + 'g216A_MultiScreenRecord/images/numCircle.png' + ')'});
				$('.numButtonLabel:eq(' + index + ')').removeClass('numButtonOverLabelTextColor');
			}
			
			//●滑鼠移到.numButton之外，觸發的移除註解處理
			//=======================================
			g216A.removeNumButtonAnnotation(index);
			//=======================================
			
		})
		
		//
		.on('mousedown',function(){
			if( g216A.currCard !== index){
				
				//清除舊的作用中數字按鈕的外觀屬性，回歸為非作用中外觀。
				$('.numButtonDiv:eq(' + g216A.currCard + ')').css({'background':'URL(' + param.mainPath + 'g216A_MultiScreenRecord/images/numCircle.png)'});
				$('.numButtonLabel:eq(' + g216A.currCard + ')').removeClass('numButtonOverLabelTextColor');
				$('.numButtonLabel:eq(' + g216A.currCard + ')').removeClass('numButtonCurrLabelTextColor');
				
				
				//●1050729 - IE8(含)以下，按數字鈕換頁時，播放進度列、播放頭會有殘留，所以，先予以隱藏。
				//-----------------------------------------------------------------
				//1050604 - 隱藏放大鏡圖示 (●針對 IE8(含)以下：換頁前先隱藏)
				$('.zoomIconSpan').css({'visibility':'hidden'});
				
				//
				$('.mediaWrapper').each(function(index) {
					//1050604 - 隱藏.track (●針對 IE8(含)以下：換頁前先隱藏)
					$('.mediaWrapper:eq(' + index + ') .track').css({'visibility':'hidden'});
					
				});
				//-----------------------------------------------------------------
				
				
				
				//更新作用中索引 g216A.currCard 
				//==================================
				g216A.currCard = index;
				//==================================
				
				
				//1050801 - ●○●○●○ 從內頁返回封面前計算該回到哪一頁封面。
				//==================================
				g216A.currBtnPage = g216A.mediaDivProp.atBtnPage[g216A.currCard];
				g216A.updatePageNum();
				g216A.prevNextState();
				//==================================
				
				
				
				
				
				//附加 作用中數字按鈕的外觀屬性。
				$('.numButtonDiv:eq(' + g216A.currCard + ')').css({'background': 'URL(' + param.mainPath + 'g216A_MultiScreenRecord/images/numCircle_current.png' + ')'});
				$('.numButtonLabel:eq(' + g216A.currCard + ')').addClass('numButtonCurrLabelTextColor');
				
				
				
				//●滑鼠按下.numButton，觸發的移除註解處理
				//=======================================
				g216A.removeNumButtonAnnotation(index);
				//=======================================
	
				
				
				//
				//$('.g216A_card:eq(' + index + ')').trigger('mousedown');
				
		
				
				//
				var pageWrapperWidth = $('.pageWrapper').width(); 
				
				$('.innerWrapper').animate({/*'margin-left':-pageWrapperWidth,*/'opacity':0.0},480, function(){
				
				
					//※●○※●○※●○1050727 - 需做此段落處理，否則IE8(含)以下，第2頁讀取媒體檔，播放進度列和播放頭會不正常(來回跑)。※●○※●○※●○
					//************************************************************************************************************
					/*$('.mediaWrapper').each(function( i ) {
						tPlayer.swfMediaObj[param.currMediaIndex] = document.getElementById("tPlayer_"+param.currMediaIndex.toString());
						$(tPlayer.swfMediaObj[param.currMediaIndex]).css({'display':'none'});
						//delete tPlayer.swfMediaObj[index];
						//$(this).find($('.playbackDiv')).empty().remove();
					   //$(this).css({'display':'none'}).empty().remove();
					});*/
					//************************************************************************************************************
					
					
					//$('.innerWrapper').empty().remove();
	
					
					//執行換頁動作
					//============================================
					g216A.createMediaWrapper(g216A.currCard);
					g216A.createMedia(g216A.currCard);
					//============================================
					
					
					$('.innerWrapper').animate({/*'margin-left':0,*/'opacity':1.0},480);
					
					//
					//===================================
					//$(window).trigger('resize');
					//===================================
					g216A.rwdFunc();
				
				});
				
				
			}

			
		});
		
	});

	
};



//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//
g216A.menuRowMouseEventOff = function(){
	
	//●○●○●○ g216A.mediaDivProp.label
	$.each(g216A.mediaDivProp.label,function(index) { 
		//●○※
		$('.g216A_menuRow:eq(' + index + ')').off('mouseover').off('mouseout').off('mousedown');
	});
	
};

//
g216A.menuRowMouseEvent = function(){
	
	//●○●○●○ g216A.mediaDivProp.label
	$.each(g216A.mediaDivProp.label,function(index) { 
		
		//●○※
		$('.g216A_menuRow:eq(' + index + ')')
			
		
			.on('mouseover',function(){
				if(index !== g216A.currCard){
					$('.g216A_menuRow:eq(' + index + ')').addClass('g216A_menuRow_hover');
					$('.g216A_menuRowOrder:eq(' + index + ')').addClass('g216A_menuRowOrder_hover');
					
				}else{
					$('.g216A_menuRow:eq(' + index + ')').css({'cursor':'default'});
				}
			})
			.on('mouseout',function(){
				$('.g216A_menuRow:eq(' + index + ')').removeClass('g216A_menuRow_hover');
				$('.g216A_menuRowOrder:eq(' + index + ')').removeClass('g216A_menuRowOrder_hover');
			})
			
			//
			.on('mousedown',function(){
				
				//●
				if(index !== g216A.currCard){
					
					//
					$('.g216A_menuZone').css({'opacity':1.0}).slideUp(250,function(){
						
						$('.g216A_menuZone').remove();
						//
						$('.g216A_menuCloseBtn').trigger('mousedown');
						
						
						//指定序號換頁
						//====================================
						g216A.currCard = index;
						//====================================
						
						
						//1050803 - ●○●○●○ 從內頁返回封面前計算該回到哪一頁封面。
						//==================================
						g216A.currBtnPage = g216A.mediaDivProp.atBtnPage[g216A.currCard];
						g216A.updatePageNum();
						g216A.prevNextState();
						//==================================
						
						
						//執行換頁動作
						//====================================
						g216A.createMediaWrapper(g216A.currCard);
						g216A.createMedia(g216A.currCard);
						//====================================
						
						
					});
				
				}
				
			});
		
		
	});
	
};


//將g216A.mediaDivProp.label陣列中的元素 - $('.g216A_cardTitle:eq(' + index +  ')').html()
//附加到$('.g216A_menuZone')
g216A.createCardTitleMenu = function(){
	
	
	//1050510 - 增加help按鈕 '<span class="help"></span>'
	$('.g216A_menuZone').append('<div class="g216A_menuHeader">' + g216A.menuHeader + '<span class="help"></span></div>');
	
	
	//新手上路 - 1050510
	//======================================================================
	/*if(param.hasHelpFlag){
		
		if(param.helpIconPath === undefined || param.helpIconPath === "" || typeof param.helpIconPath !== "string"){ 
			param.helpIconPath = param.tPlayer_CSSPath + "images/help.png";
			param.helpIconOverPath = param.tPlayer_CSSPath + "images/help_over.png";
		}
		
		$('.g216A_menuHeader .help')
				.append('<a><img src=' + param.helpIconPath + '></a>')
				.attr('title', param.helpComment); 
				
		//
		$('.g216A_menuHeader .help')
		
			.on('mouseover',function(){ 
					$('.g216A_menuHeader .help img').attr('src', param.helpIconOverPath); 
				})
			.on('mouseout',function(){
					$('.g216A_menuHeader .help img').attr('src', param.helpIconPath);
				})
			.on('mousedown',function(){
					//
					$('.g216A_menuCloseBtn').trigger('mousedown');
					//
					$('.g216A_menuHeader .help a').attr({'href':param.helpUrl,target:'_blank'});
					
				});
				
	}*/
	//======================================================================
	
	

	
	//●○●○●○ g216A.mediaDivProp.label
	$.each(g216A.mediaDivProp.label,function(index) { 
		
		
		//●○●○●○
		//******************************************************************************
		if( g216A.mediaDivProp.label[index] !== "" ){  
		//******************************************************************************
	
		
			//
			$('.g216A_menuZone').append(  
					'<div class="g216A_menuRow">' + 
						'<span class="g216A_menuRowOrder">' + (index+1) + '</span>' + 
						'<span class="g216A_menuRowItemOuter">' + 
							'<span class="g216A_menuRowItem">' + g216A.mediaDivProp.label[index] + '</span>' + 
						'</span>' + 
					'</div>' );
			
			//
			//g216A_menuRowOrder_current
			$('.g216A_menuRow:eq(' + g216A.currCard + ')').addClass('g216A_menuRow_current');
			$('.g216A_menuRow:eq(' + g216A.currCard + ') .g216A_menuRowOrder').addClass('g216A_menuRowOrder_current');
			$('.g216A_menuRow:eq(' + g216A.currCard + ') .g216A_menuRowItem').addClass('g216A_menuRowItem_current');
			
			
			
			
				
				
				
		//●●●●●●
		//******************************************************************************
		}else{ 
			//alert(index);
		}
		//******************************************************************************
		
				
		
    });
	//$.each()
	
	
	
	
	$('.pageWrapper, .innerWrapper, .g216A_btnPageGroup, .g216A_btnPage, .mediaWrapper, .numButtonNReturnContainerDiv').on('mousedown',function(){ 
		//若下拉選單打開，則將之關閉
		if(g216A.menuOpen === true){
			$('.g216A_menuCloseBtn').trigger('mousedown');
			g216A.menuOpen = false;
		}
	});
	
	
	//點擊在body標籤上
	$(document.body).on('mousedown',function(e){ 
		//alert(e.target.className + '/' + e.target.tagName);
		if(g216A.menuOpen === true){
			//if( e.target.tagName.toLowerCase() === "body"){ 
				$('.g216A_menuCloseBtn').trigger('mousedown');
				g216A.menuOpen = false;
			//}
		}
	});
	
	
	
};



//
//開啟menu按鈕 事件處理
g216A.menuBtnMouseEvent = function(){
	//
	$('.g216A_menuBtn')
	
		.on('mouseover',function(){
			$('.g216A_menuBtn > img').attr('src', param.mainPath + 'g216A_MultiScreenRecord/images/menuBtn_over.png');
		})
		
		.on('mouseout',function(){
			$('.g216A_menuBtn > img').attr('src', param.mainPath + 'g216A_MultiScreenRecord/images/menuBtn.png');
		})
		
		.on('mousedown',function(){
			//$('.g216A_menuBtn > img').attr('src', param.mainPath + 'g216A_MultiScreenRecord/images/menuBtn.png');
			//
			$('body').append('<div class="g216A_menuZone"></div>');
			
			//
			//$('.g216A_menuZone').css({'display':'block','opacity':0.0}).animate({'opacity':g216A.menuZoneOpacity},480);
			$('.g216A_menuZone').css({'opacity':g216A.menuZoneOpacity}).slideDown(250,function(){
				g216A.menuOpen = true;	
			});
			
			//
			$(this).off('mouseover');
			$(this).off('mouseout');
			$(this).off('mousedown');
			
			//
			$('.g216A_menuBtn').empty().remove();
			$('.g216A_menuBtnOuter').html('<div class="g216A_menuCloseBtn"></div>');
			$('.g216A_menuCloseBtn').append('<img src=' + param.mainPath + 'g216A_MultiScreenRecord/images/menuCloseBtn.png' + '>');
			
			
			
			//
			g216A.createCardTitleMenu();
			//
			g216A.menuRowMouseEvent();
			
			
			//關閉menu按鈕 事件處理
			g216A.menuCloseBtnMouseEvent();
			
			
		});
		
		
};


//關閉menu按鈕 事件處理
g216A.menuCloseBtnMouseEvent = function(){
	//
	$('.g216A_menuCloseBtn')
		.on('mouseover',function(){
			$('.g216A_menuCloseBtn > img').attr('src', param.mainPath + 'g216A_MultiScreenRecord/images/menuCloseBtn_over.png');
		})
		.on('mouseout',function(){
			$('.g216A_menuCloseBtn > img').attr('src', param.mainPath + 'g216A_MultiScreenRecord/images/menuCloseBtn.png');
		})
		.on('mousedown',function(){
			//$('.g216A_menuCloseBtn > img').attr('src', param.mainPath + 'g216A_MultiScreenRecord/images/menuCloseBtn.png');
			//
			/*$('.g216A_menuZone').animate({'opacity':0.0},480,function(){
				$('.g216A_menuZone').remove();	
			});*/
			$('.g216A_menuZone').css({'opacity':1.0}).slideUp(250,function(){
				$('.g216A_menuZone').remove();	
			});
			
			//
			g216A.menuOpen = false;
			
			//
			$(this).off('mouseover');
			$(this).off('mouseout');
			$(this).off('mousedown');
			
			//
			$('.g216A_menuCloseBtn').empty().remove();
			$('.g216A_menuBtnOuter').html('<div class="g216A_menuBtn"></div>');
			$('.g216A_menuBtn').append('<img src=' + param.mainPath + 'g216A_MultiScreenRecord/images/menuBtn.png' + '>');
			
			
			
			//
			g216A.menuRowMouseEventOff();
			
			
			
			//●○●○●○開啟menu按鈕 事件處理
			//=======================================
			g216A.menuBtnMouseEvent();
			//=======================================
			
			
			
		});
};
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



//
g216A.createInnerPage = function(index){
	
	//
	$('.g216A_prevNext, .g216A_header').fadeOut(380);
	
	//
	var innerWrapperHTML = '<div class="innerWrapper"></div>';
	//
	var numButtonHTML = '<div class="numButtonNReturnContainerDiv"></div>';
	
	//
	$(document.body).append( numButtonHTML );
	$(document.body).append( innerWrapperHTML );
	//$('.innerWrapper').append( numButtonHTML );
	
	
	
	
	
	//●●● (g216A.mediaDivProp.mediaWidth[g216A.currCard] + g216A.breakpointOffset)
	//normal
	if($(window).width() > (g216A.mediaDivProp.mediaWidth[g216A.currCard] + g216A.breakpointOffset)){

		//
		$('.numButtonNReturnContainerDiv')
			//
			.animate({'height':g216A.mediaDivProp.mediaHeight[g216A.currCard]},560,function(){g216A.rwdFunc();})
			//
			.css({'display':'block'})
			.append('<div class="returnBtnDiv"><div class="returnBtn"><img src="' + param.mainPath + 'g216A_MultiScreenRecord/images/arrowLeft.png"></div></div>')
			.append('<div class="numButtonWrapper"></div>');
			
			
			//1050802 - 此處也得附加 .g216A_menuBtnOuter，再予以隱藏。
			$('.numButtonNReturnContainerDiv').append('<span class="g216A_menuBtnOuter"><span class="g216A_menuBtn"></span></span>');
			$('.g216A_menuBtnOuter > .g216A_menuBtn').append('<img src=' + param.mainPath + 'g216A_MultiScreenRecord/images/menuBtn.png' + '>');
			//1050802
			$('.g216A_menuBtnOuter').css({'display':'none'});
			
			
			
			//
			//----------------------------
			g216A.createInnerNumBtnNEvent();
			//----------------------------
			
			
			//執行換頁動作
			//============================================
			g216A.createMediaWrapper(index);
			g216A.createMedia(index);
			//============================================
			
			//
			//===================================
			$(window).trigger('resize');
			//===================================
			
			
			//●改在 g216A.rwdFunc = function(){} 裡處理，有增加條件判斷
			//●●●注意 .numButtonNReturnContainerDiv 高度
			/*var targetHeight = g216A.mediaDivProp.mediaHeight[g216A.currCard] + $('.mediaHeader').height() + $('.playbackDiv').height() + 10;
			$('.numButtonNReturnContainerDiv').animate({'height':targetHeight},360, function(){
			//alert( g216A.currCard + '///' + targetHeight + ' = ' + g216A.mediaDivProp.mediaHeight[g216A.currCard] + ' + ' + $('.mediaHeader').height() + ' + ' + $('.playbackDiv').height() );	
			});*/
		
		
	//rwd小尺寸========================================================================================
	}else{
		
		//
		$('.numButtonNReturnContainerDiv')
			.css({'display':'table'}) 
			.append('<div class="returnBtnDiv"><div class="returnBtn"><img src="' + param.mainPath + 'g216A_MultiScreenRecord/images/arrowLeft.png"></div></div>')
			.append('<div class="numButtonWrapper"></div>');
			
			
			
			//1050802
			$('.numButtonNReturnContainerDiv').append('<span class="g216A_menuBtnOuter"><span class="g216A_menuBtn"></span></span>');
			$('.g216A_menuBtnOuter > .g216A_menuBtn').append('<img src=' + param.mainPath + 'g216A_MultiScreenRecord/images/menuBtn.png' + '>');
			

			
			
			//●○●○●○1050729 - 小尺寸視窗不要出現數字按鈕。所以不調用此方法。
			//----------------------------
			//g216A.createInnerNumBtnNEvent();
			//----------------------------
			
			
			
			//●●●注意高度
			$('.numButtonNReturnContainerDiv').animate({'width':$(window).width(),'height':50},360, function(){
				
				//執行換頁動作
				//============================================
				g216A.createMediaWrapper(index);
				g216A.createMedia(index);
				//============================================
	
				
				//
				//===================================
				$(window).trigger('resize');
				//===================================
				
				
			});
		
	}
	
	
	//處於內頁狀態
	//------------------------------------
	g216A.atInnerStatus = true;
	//------------------------------------
	
	
	//●○●○●○開啟menu按鈕 事件處理
			//=======================================
			g216A.menuBtnMouseEvent();
			//=======================================
	
	
	try{
		//
		g216A.returnBtnMouseEvent();
	
	}catch(err){
		//
	}
		
	
};



//●.g216A_card按鈕的滑鼠事件處理
g216A.cardBtnMouseEvent = function(){
	
	$('.g216A_card').each(function(index) {
        
		//==========================================
		$('.g216A_card:eq(' + index + ')')
		//==========================================
		
		//==========================================
		.on('mouseover',function(){
			$('.g216A_card:eq(' + index + ')').css({'opacity':0.7});
		})
		
		//==========================================
		.on('mouseout',function(){
			$('.g216A_card:eq(' + index + ')').css({'opacity':1.0});
		})
		
		//==========================================
		.on('mousedown',function(){
			
			
			//=================================================
			g216A.currCard = index;
			//=================================================
			
			
			
			//1050721 - IE8(含)以下，抓不到defaultMarginLeft、defaultMarginRight。只得到NaN。
			var defaultMarginLeft = parseInt($('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').css('margin-left'));
			var defaultMarginRight = parseInt($('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').css('margin-right'));
			
			//針對IE8(含)以下處理
			if( !utils.isMobile && utils.currentBrowser === 'msie' ){
				if( $('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').css('margin-left') === 'auto' ){
					defaultMarginLeft = 0;
				}
				if( $('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').css('margin-right') === 'auto' ){
					defaultMarginRight = 0;
				}
				
			}
			//alert(defaultMarginRight + '/' + defaultMarginLeft);
			//alert($('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').css('margin-left'));
			
			var pageWrapperWidth = $('.pageWrapper').width(); 
			//var currBtnPageWidth = $('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').width();
			
			
			
			//目前.g216A_btnPage頁面：出場
			$('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').animate({'margin-left':-pageWrapperWidth, 'opacity':0.0},280, function(){
				
				//$('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').css({'margin-left':defaultMarginLeft});
				
				$('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').hide(0).css({'opacity':'1.0'});
				$('.g216A_pageNum').hide(0);
				
				
				//$('.pageWrapper')出界隱藏 - 
				//●●●且依定要hide(0)起來，否則「小尺寸視窗入場，拉大為normal寬度以上，.pageWrapper會占據上方空間，其他物件往下掉。」
				//--------------------------------------------------------------------------------------
				$('.pageWrapper').animate({'margin-left':-pageWrapperWidth, 'opacity':0.0},280).hide(0);
				//--------------------------------------------------------------------------------------
				
				
				//
				//===================================
				g216A.createInnerPage(index);
				//===================================
				
				
			});
			
		});
		
    });
	
	
};
//---------------------------------------------------------------------《《《





//隱藏目前頁面 - 沒用到
/**********************************************************/
g216A.hideCurrBtnPage = function(){
	$('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').css({'display':'none'});
};
/**********************************************************/

//跳轉到新頁
/**********************************************************/
g216A.gotoBtnPage = function(){
	$('.g216A_btnPage:eq(' + g216A.currBtnPage + ')').css({'display':'block'});
};
/**********************************************************/

//更新顯示頁碼
g216A.updatePageNum = function(){
	$('.g216A_pageNum > .g216A_pageNumStr').html('─　' + (g216A.currBtnPage+1) +' / ' + g216A.totalBtnPage + '　─');
};



//判斷是否超過一頁，以及處置
g216A.isMoreThenOnePage = function (){
	
	
	//如果總頁數多於1，代表選單為多頁
	//================================
	if(g216A.totalBtnPage > 1){
		
		
		//如果(g216A.totalBtnPage > 1)，則讓$('.prevNext')出現
		$('.g216A_prevNext').css({'display':'block'});
		

		//讓$('.g216A_pageNum')顯示第1頁頁碼
		//============================================
		g216A.updatePageNum();
		
		//上一頁、下一頁按鈕的透明度狀態，滑鼠狀態、是否能點擊？
		//============================================
		g216A.prevNextState();
		
		//上一頁、下一頁按鈕的滑鼠事件註冊與處理
		//============================================
		g216A.prevNextEvent();
		
		//●○1050804 - 若不調用此物件方法，於Android手機 旭聯APP 進入頁面，封面的頁碼會掉在最下方。
		//============================================
		g216A.rwdFunc();
		
		
		
	//選單僅1頁
	//================================
	}else{
		//否則，則讓$('.g216A_prevNext')隱藏
		$('.g216A_prevNext').css({'display':'none'});
		//否則，則讓$('.g216A_pageNum')隱藏
		$('.g216A_pageNum').css({'display':'none'});
	}
	
	
	
	
	//不論是否為多頁，●第一頁●總是得出現
	//=======================================
	g216A.gotoBtnPage();
	//=======================================
	
	
	//●○●○●○.g216A_card按鈕的滑鼠事件處理
	//=======================================
	g216A.cardBtnMouseEvent();
	//=======================================
	
	
};


//1050805
//●附加：三角形圖示 & ●附加$('.g216A_card:eq(' + index + ') .mediaIconDiv')的循環顏色
g216A.attachMediaIcon = function(){
	
	var colorIndex = 0;
	var colorTotal = g216A.cardBgColor.length;
	
	$.each(g216A.mediaDivProp.label, function(index){
		$('.g216A_card:eq(' + index + ')').prepend('<span class="mediaIconDiv"><img></span>');
		$('.g216A_card:eq(' + index + ') .mediaIconDiv > img').attr('src', param.mainPath + 'g216A_MultiScreenRecord/images/mediaIcon.png');
		
		
		//●附加$('.g216A_card:eq(' + index + ') .mediaIconDiv')的循環顏色
		//================================================
		if( index > colorTotal-1){
			colorIndex = index % colorTotal;
		}else{
			colorIndex = index;
		}
		
		$('.g216A_card:eq(' + index + ') .mediaIconDiv').css({'background':g216A.cardBgColor[colorIndex]});
		//================================================
		
		
		
	});

	
};


//附加上一頁、下一頁按鈕的圖檔
g216A.attachPrevNextBtnImg = function(){
	$('.g216A_prevBtn').html('<img src="' + param.mainPath + 'g216A_MultiScreenRecord/images/prev.png" alt="上一頁按鈕">');
	$('.g216A_nextBtn').html('<img src="' + param.mainPath + 'g216A_MultiScreenRecord/images/next.png" alt="下一頁按鈕">');
};


//取得資料
g216A.getData = function(){
	
	//
	if( $(window).width() > (param.breakpoint) ){
		g216A.initWinStatus = "normal";
	}else{
		g216A.initWinStatus = "rwd";
	}
	
	
	//封面按鈕頁，共有多少頁 .g216A_btnPage
	g216A.totalBtnPage = $('.g216A_btnPage').length;
	//alert(g216A.totalBtnPage);
	
	//封面各頁的按鈕，共有多少個 .g216A_card。
	g216A.totalCard = $('.g216A_card').length;
	//alert(g216A.totalCard);
	
	
	//
	$('.g216A_card').each(function(index) {
        
		g216A.mediaDivProp.label.push( $('.g216A_card:eq(' + index + ') > .label').html() );
		g216A.mediaDivProp.mediaTarget.push( $('.g216A_card:eq(' + index + ') > .video').text() );
		g216A.mediaDivProp.mediaAutoPlay.push( $('.g216A_card:eq(' + index + ') .mediaAutoPlay').text() );
		g216A.mediaDivProp.mediaWidth.push( parseInt($('.g216A_card:eq(' + index + ') > .mediaWidth').text()) );
		g216A.mediaDivProp.mediaHeight.push( parseInt($('.g216A_card:eq(' + index + ') > .mediaHeight').text()) );
		g216A.mediaDivProp.beforeOrAfter.push( $('.g216A_card:eq(' + index + ') .beforeOrAfter').text() );
		g216A.mediaDivProp.atBtnPage.push( $('.g216A_card:eq(' + index + ')').parent( $('g216A_btnPage') ).index() );
		
    });
	
	//alert(g216A.mediaDivProp.label);
	//alert(g216A.mediaDivProp.mediaTarget);
	//alert(g216A.mediaDivProp.mediaAutoPlay);
	//alert(g216A.mediaDivProp.mediaWidth);
	//alert(g216A.mediaDivProp.mediaHeight);
	//alert(g216A.mediaDivProp.beforeOrAfter);
	//alert(g216A.mediaDivProp.atBtnPage);
	
	
	
	
	
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
	
	//===================================
	
	
	//
	g216A.getData();
	
	//
	g216A.attachMediaIcon();
	
	
	//================================================《《《《《《《
	//
	g216A.attachPrevNextBtnImg();
	//
	g216A.isMoreThenOnePage();
	
	//================================================《《《《《《《
	
	
		
	//
	//method.deployment();
	//
	//method.deployment_g16A();
	
	//
	/*$('.mediaWrapper').each(function(index) {
		//param.mediaAutoPlayArr[index] = true;
		method.embedMedia(index);
		
		//媒體介面是否有進場jQ動作 ? 
		//●這一定要在 method.embedMedia(index) 之後調用，所以移到各版型主程式調用。
		if(param.hasEnteringMotion){
			//媒體介面進場jQ動作 
			method.entering(index);
		}
	});*/
	//===================================
	
	
	
	
	
	// IE6~IE8
	method.lessThenIE9Css();
	//
	$(window).trigger('resize');
	
	
});


//1041202
$(window).on('resize', function(){
	//
	g216A.rwdFunc();
	
	// IE6~IE8
	method.lessThenIE9Css();
});








//>>>=============================================================>>>
})(jQuery); //↑↑↑


























