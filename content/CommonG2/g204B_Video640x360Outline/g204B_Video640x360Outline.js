// JavaScript Document - G204B│g204B_Video640x360.js
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
var g204B = NOU.namespace('NOU.modules.g204B');



g204B.flagStr = "hideOutline";



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



/*拖曳*/
method.mediaDragAndDrog = function(){
	//
	var mediaWrapperLeftX = -$('.mediaWrapper:eq(0)').width()*0.25;
	//
	//var mediaWrapperRightX = $('.pageWrapper').width() - $('.mediaWrapper:eq(0)').width();
	//var mediaWrapperRightX = $('.pageWrapper').width()*0.5 - $('.mediaWrapper:eq(0)').width()*0.5;
	var mediaWrapperRightX = $('.pageWrapper').width()*0.5 - $('.mediaWrapper:eq(0)').width()*0.5;
	//
	var mediaWrapperIniY = $('.mediaWrapper:eq(0)').offset().top;  //alert(mediaWrapperIniY);
	
	//
	$('.mediaWrapper:eq(0)').draggable({containment: [mediaWrapperLeftX,mediaWrapperIniY,0,mediaWrapperIniY]});
	
};

/*停止拖曳*/
method.mediaStopDrag = function(){
	$('.mediaWrapper:eq(0)').draggable( "destroy" );
};


//操控大綱文字區塊$('.g204B_outlineWrapper')
method.handlingOutline = function(){
	
	//outlineWrapperIniX改為不用↓↓↓
	/*改寫原因：因iPad以旭聯APP進入，G204B版型讀取.g204B_outlineWrapper的left屬性值，遭APP干擾，變成NaN*/
	//var outlineWrapperIniX = parseInt($('.g204B_outlineWrapper').css('left'));
	
	var showOutlineBtnIniX = parseInt($('.showHideOutlineBtnDiv').css('left'));
	var mediaWrapperIniX = parseInt($('.showHideOutlineBtnDiv').css('margin-left')); 
	var mediaWrapperTargetX = $('.pageWrapper').width()*0.5 - $('.mediaWrapper:eq(0)').width()*0.5;
	
		
	//
	$('.showHideOutlineBtnDiv').on('mousedown',function(){
		
		//
		//outlineWrapperIniX = parseInt($('.g204B_outlineWrapper').css('left'));
		//alert(outlineWrapperIniX + '/' + g204B.outlineOffset + '/' + (outlineWrapperIniX-g204B.outlineOffset));
		
		
		
		//「大綱文字」 從 關閉的狀態，轉換到 開啟的狀態。
		if( g204B.flagStr === "hideOutline" ){
			//
			$('.showHideOutlineBtnDiv').css({'background':'url(' + param.mainPath + 'g204B_Video640x360Outline/images/hideOutline.png)'});
			//
			$('.showHideOutlineBtnDiv').animate({'left':0},280);
			//
			$('.g204B_outlineWrapper').css({'display':'block','opacity':0.0}).animate({'opacity':1.0,'left':(g204B.outlineWrapperIniX-g204B.outlineOffset)},280, function(){
				//alert(outlineWrapperIniX + '/' + g204B.outlineOffset + '/' + (outlineWrapperIniX-g204B.outlineOffset));
			});
			//
			$('.mediaWrapper:eq(0)').css({'position':'absolute','z-index':'1','left':mediaWrapperTargetX}).animate({'left':0},280);
			
			//
			g204B.flagStr = 'showOutline';
			method.mediaDragAndDrog();
			
			//
			$('.mediaWrapper:eq(' + 0 + ') .fullNormalScreen').css({'display':'none'});
			
			
			
			//1050824 - ●○◎●○◎重新計算與定位放大鏡圖示的位置
			//=====================================
			method.locateMagnifierIcon();
			//=====================================
			
			
			
			
		//「大綱文字」 從 開啟的狀態，轉換到 關閉的狀態。
		}else if( g204B.flagStr === "showOutline" ){
			//
			$('.showHideOutlineBtnDiv').css({'background':'url(' + param.mainPath + 'g204B_Video640x360Outline/images/showOutline.png)'});
			//
			$('.showHideOutlineBtnDiv').animate({'left':showOutlineBtnIniX},280);
			//
			$('.g204B_outlineWrapper').animate({'left':g204B.outlineWrapperIniX,'opacity':0.0},280,function(){
				$('.g204B_outlineWrapper').css({'display':'none','opacity':1.0});
			});
			//
			$('.mediaWrapper:eq(0)').animate({'left':mediaWrapperTargetX},280,function(){
				$('.mediaWrapper:eq(0)').css({'position':'static','margin-left':'auto'});
			});
			//
			g204B.flagStr = 'hideOutline';
			method.mediaStopDrag();
			
			//
			$('.mediaWrapper:eq(' + 0 + ') .fullNormalScreen').css({'display':'inline-block'});
						
			
			
		}
				
	});

};


$(document).ready(function(){
	
	//●整體縮放頁面 - 強迫設定為1.0，以避免播放控制失常
	//============================
	$('body').css('zoom','1.0');
	//============================
	
	
	//1050826 - ●○$(document).ready()之後，$('.g204B_outlineWrapper')，小於斷點就出現，大於斷點就隱藏 。
	if( $(window).width() <= param.breakpoint ){
		$('.g204B_outlineWrapper').css({'display':'block'});
	}else{
		$('.g204B_outlineWrapper').css({'display':'none'});
	}
	
	
	
	//1041204 - 大綱文字的延遲出現 (HTML的JS有先.fadeTo(0,0.0))
	//-----------------------------------------
	//$('.g204B_outline').fadeTo(0,0.0).delay(1000).fadeTo(360,1.0);
	//-----------------------------------------
	
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
	
	
	
	
	//===================================================
	//調用tPlayer.js裡的「.toBigPic點小圖跳大圖」功能
	if($('.toBigPic').get(0) !== undefined){
		//點小圖跳大圖 - 這得在method.lessThenIE9Css()上方。
		method.createMagnifierIcon();
	}
	
	//調用tPlayer.js裡的「.normalPic無點小圖跳大圖」功能(主要為RWD處理)
	if($('.normalPic').get(0) !== undefined){
		method.normalPicUtils();
	}
	
	//名詞解釋
	method.glossary();
	//===================================================
	
	
	
	
	// IE6~IE8
	method.lessThenIE9Css();
	
	//
	method.handlingOutline();
	
	

});


//1041202
$(window).on('resize', function(){
	// IE6~IE8
	method.lessThenIE9Css();
	
	/*if( g204B.flagStr === "hideOutline" ){
		$('.g204B_outlineWrapper').css({'display':'block'});
	}*/
	
	
	//●○※1050504 - rwd
	//========================================================
	if( $(window).width() <= param.breakpoint ){
		
		
		//1050826 - ●○$('.g204B_outlineWrapper')，小於斷點就出現，大於斷點，由純CSS處理。
		$('.g204B_outlineWrapper').css({'display':'block'});
		
		
		//跳圖模式：小於斷點使用['follow_middle']，大於斷點使用['top',30];
		param.bgScope2Img_definedHeight[0] = ['follow_middle'];
		
		
		//
		if( g204B.flagStr === "hideOutline" ){
			$('.g204B_outlineWrapper').css({'display':'block'});
			
		//==============================================================
		}else if( g204B.flagStr === "showOutline" ){
			$('.showHideOutlineBtnDiv').trigger('mousedown',function(){
				$('.g204B_outlineWrapper').css({'display':'none'});
			});
			
			
			
			//1050824 - 新增此行。必須延時0.3秒，再改變CSS
			setTimeout(function(){
				$('.g204B_outlineWrapper').css({'display':'block'});
			},300);
			
		}
		//==============================================================
		
		
		
		
	//normal
	//========================================================
	}else if(  $(window).width() > param.breakpoint ){
		
		
		//跳圖模式：小於斷點使用['follow_middle']，大於斷點使用['top',30];
		param.bgScope2Img_definedHeight[0] = ['top',30];
		
		//
		if( g204B.flagStr === "hideOutline" ){
			$('.g204B_outlineWrapper').css({'display':'none'});
			
			
			
			
			////●○※1050824 - ●此條件式於Windows桌機：IE、Chrome、FF皆有作用。
			//1050824 - 新增(揣摩此情境)：於rwd小尺寸視窗，若名詞解釋面板有打開，進入normal大尺寸視窗時，需強迫關閉名詞解釋面板
			//先Destroy所有.glossary_explain
			//===================================================
			if($('.glossary_explain').get(0) !== undefined){
				$('.glossary_content').empty();
				$('.glossary_explain').empty().remove();
				param.currGlossary = -1;
			}
			//===================================================
			
			//1050824 - 新增(揣摩此情境)：rwd小尺寸視窗，若點小圖跳大圖處於大圖跳出狀態，進入normal大尺寸視窗時，需強迫關閉跳出的大圖
			//===================================================
			$('#closeImgBtnDiv').trigger('mousedown');
			$('#wallDivForBigPic').trigger('mousedown');
			//===================================================
			
		
		
		
		//
		}else if( g204B.flagStr === "showOutline" ){
			$('.g204B_outlineWrapper').css({'display':'block'});
		}
		
	}
	//========================================================
	
	
	
	
});






//●○◎●○◎●○◎●○◎●○◎●○◎●○◎●○◎●○◎●○◎●○◎●○◎●○◎●○◎●○◎

/*************************處理.toBigPic圖形位置、及放大鏡圖示位置************************/

method.locateMagnifierIcon = function(){ //alert('G204B');
	 
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
		
		//1050826 - G204B不用新增放大鏡圖示
		//$('.toBigPic:eq(' + index + ')').append('<span class="zoomIconSpan"><img src=' + param.mainPath + "tPlayer_CSS/images/magnifier_40x40.png" + ' title="點擊小圖可跳出大圖"></span>');
		
		
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
		//1050826 - G204B不用調用method.triggerToBig()
		//method.triggerToBig(index, bigPicWidth[index], bigPicHeight[index]);
		
		
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








//>>>=============================================================>>>
})(jQuery); //↑↑↑


























