// JavaScript Document - G226A│g226A_Timeline.js
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
var g226A = NOU.namespace('NOU.modules.g226A');
//------------------------



//================================================
g226A.data = [];
g226A.currMenuSet = 0;
g226A.menuSetTotal = 0;
g226A.currPage = 0;
g226A.remainder = 0; //餘數 - 最後一組選單組有幾個選單按鈕
g226A.menuOpen = false;
g226A.iframeHtml = '';
//================================================ 



//================================================
$('#preloader').css({'display':'block'});
//================================================




//1041208 - 需置於上方，method.lessThenIE9Css()才調用得到。
method.lessThenIE9Css = function(){
	// IE6~IE8
	if (!window.addEventListener) { 
		//
		if($(window).width() <= param.breakpoint){
			method.rwdCss();
		}else if($(window).width() > param.breakpoint){
			method.normalCss();
		}
	}
	
	//
	//------------------------------------------------------
	//var xxx;
	
	//IE9及以上支援 window.addEventListener - // DOM2 standard
	//xxx = window.addEventListener;
	//if( xxx ){ alert( xxx ); }
	
	//IE5 quirks、IE7、8、9、quirks、10皆有支援 window.attachEvent - // Microsoft's precursor to it, IE8 and earlier
	//xxx = window.attachEvent;
	//if( xxx ){ alert( xxx ); }
	
	//IE5 quirks、7、8、9、quirks、10皆未支援 window.onload - // Some pre-1999 browser
	//xxx = window.onload; alert( xxx );
	//if( xxx ){ alert( xxx ); }
	//------------------------------------------------------
	
	
};




/*ColorBox*/
function openBox(_targetPath,_w,_h){
	/*$(document).ready(function(){
	//Examples of how to assign the ColorBox event to elements
	//alert(_targetPath);
	top.$.colorbox({href:_targetPath , width:_w, height:_h, iframe:true});

	});*/
	
	$.colorbox({href:_targetPath , width:_w, height:_h, iframe:true});

	
	//1050527 - colorbox燈箱
	//=============================================
	$(window).on('resize',function(){
		//
		if( $(window).width() <= param.breakpoint ){
			
			//擷取colorbox所跳出燈箱的下緣$('#cboxBottomCenter')高度
			var cboxBottomCenterHeight = $('#cboxBottomCenter').height();
			if( !cboxBottomCenterHeight ){
				cboxBottomCenterHeight = 0;
			}
			
			//
			var $win;
			if( $(top.window) ) {
				$win = $(top.window);
			}else{
				$win = $(window);
			}
			
			$.colorbox.resize({ 'innerWidth':'100%','innerHeight':$win.height()-cboxBottomCenterHeight*1.5 });
			
		}else{
			$.colorbox.resize({'width':_w,'height':_h});
		}
		
	});
	//=============================================
	$(window).trigger('resize');
	
	
}

//colorbox所需
g226A.jumpOut = function(){
	
	$('.innerDiv map area').each(function(index) {
		
        $('.innerDiv map area:eq(' + index + ')').on('mousedown', function(){
			openBox( g226A.data[index][0], g226A.data[index][1], g226A.data[index][2] );
		});
		
    });
	
};



$(window).on('resize',function(){
	
	//
	if($(window).width() <= param.breakpoint){
		//g226A.currPage
		//$('.iframeTag')[0].css({'position':'absolute','left':'0px','top':'0px'});
			
		
	}else if($(window).width() > param.breakpoint){
		//
	}
	

	//1071210 - 新增 try...catch
	try {

		//●○截取iframe裡面的網頁高度值，據以調整iframe的高度。本機僅IE生效，線上各瀏覽器皆可。
		//======================================================================●

			var iframeObj = document.getElementsByClassName("iframeTag")[0];
			var currHight = iframeObj.contentDocument.body.offsetHeight; 
			//★★★★★★ 1071205 - IF條件式由 if( currHight !== undefined )
			//★★★★★★ 1071205 - 增加為 if( currHight !== undefined && currHight > $(".iframeTag").height() )
			if( currHight !== undefined && currHight > $(".iframeTag").height() ){
				$(".iframeTag").height( currHight ); 
			}
		// alert(currHight);
		//======================================================================●

	}catch(err){
		//
	}
	
	
	
});



$('.iframeTag').on('change',function(){
	alert();
});




//取得HTML裡面的資料。 
g226A.getData = function(){
	
	var show;
	
	$('.linkDataZone .set').each(function(index) {

		g226A.data.push([
						$('.linkDataZone .set:eq(' + index + ') .label').html(), 
						$('.linkDataZone .set:eq(' + index + ') .linkData').text(), 
						]);

		//
		show += g226A.data[index][0] + '《》' +  g226A.data[index][1] + '\n';
		
		/*if( $('.linkDataZone .set').length-1 === index ){
			alert(show);
		}*/
			
			
    });
	
	
	//共有幾組選單組(包含不足4個的選單組)
	g226A.menuSetTotal = Math.ceil(g226A.data.length/4);
	//alert(g226A.menuSetTotal);
	
	//餘數 - 最後一組選單組有幾個選單按鈕
	g226A.remainder = g226A.data.length%4;
	//alert(g226A.remainder);
	
	//<iframe class="iframeTag" name="iframeTag" title="子頁面載入此iframe"></iframe>
	
	//@@@ jquery获取自身元素的html @@@
	//=======================================================================
	//https://www.cnblogs.com/youxin/p/5303030.html
	//=======================================================================
	
	//●《A》创建一个匿名Object，然后将自身加入其中，再取出匿名Object的html()便可得到自身HTML。 - OK
	//=======================================================================
	//g226A.iframeHtml  = $('<p>').append( $('.iframeTag').clone() ).html();
	//=======================================================================
	
	//●《B》jquery获取outerhtml - OK
	//=======================================================================
	g226A.iframeHtml  = $('.iframeTag').prop('outerHTML');
	//=======================================================================
	//●jquery设置outerhtml - OK
	//$('.xxx').prop('outerHTML', '<input>');
	
	//alert(g226A.iframeHtml);
	
};


//初始頁面，
g226A.initPage = function(){
	
	//.timelineItem的HTML組成
	var timelineItemHTML = '<div class="timelineItem"><div class="label"><div class="labelText"></div></div></div>';
	
	//輪詢
	$.each(g226A.data, function(index){
		
		//4個.timelineItem以上
		if( index > 3 ){
			//
		
		
		//看得到的4個.timelineItem
		}else{
			
			//產生.timelineItem
			
			$('.timeline').append( timelineItemHTML );
			
			//組合.timelineItem的背景圖路徑
			var bgUrl = param.mainPath + 'g226A_Timeline/images/arrow_' + (index+1) + '.png';
			//引入.timelineItem的css背景圖
			$('.timelineItem:eq(' + index + ')').css({'background':'url(' + bgUrl + ')'});
			//填入.timelineItem裡面.labelText的小標文字內容
			$('.timelineItem:eq(' + index + ') .label .labelText').html( g226A.data[index][0] );
			
			
			//●將第2個至第4個.timelineItem向左調整位置-14px
			if( index > 0 ){
				$('.timelineItem:eq(' + index + ')').css({'margin':'0 0 0 -14px'});
			}
			
		}
		
	});
	
	
	//指定 作用中頁面所對應的按鈕背景圖
	var bgUrl_1_keep = param.mainPath + 'g226A_Timeline/images/arrow_' + (g226A.currPage+1) + '_keep.png';
	$('.timelineItem:eq(' + g226A.currPage + ')').css({'background':'url(' + bgUrl_1_keep + ')'});
	
	//組合.timelineItem .label 的背景圖路徑
	var label_bgUrl_keep = param.mainPath + 'g226A_Timeline/images/label_bg_keep.png';
	$('.timelineItem:eq(' + g226A.currPage + ') .label').css({'background':'url(' + label_bgUrl_keep + ')'});
	
	//載入第一頁
	$('.iframeTag').attr({'src':g226A.data[g226A.currPage][1]});
	
	//
	g226A.leftRightBtnOpacity();	
	
};






//help滑鼠事件 - 沒用到
g226A.helpMouseEvent = function(){
	
	//
	$('.help a img').attr('src', param.mainPath + 'g226A_Timeline/images/help.png');
	
	//
	$('.help').on('mouseover',function(){
		$('.help a img').attr('src', param.mainPath + 'g226A_Timeline/images/help_over.png');
	});
	$('.help').on('mouseout',function(){
		$('.help a img').attr('src', param.mainPath + 'g226A_Timeline/images/help.png');
	});
	$('.help').on('mousedown',function(){
		$('.help a img').attr('src', param.mainPath + 'g226A_Timeline/images/help.png');
		$('.help a').attr({'href':param.helpUrl,target:'_blank'});
	});
	
};



//●●●截取iframe裡面的網頁高度值，據以調整iframe的高度。本機僅IE生效，線上各瀏覽器皆可。
g226A.iframeLoadEvent = function(){
	
	var iframeObj = document.getElementsByClassName("iframeTag")[0];
	var currHight;
	var intervalID;


	
	$(".iframeTag").load(function(){
		
		intervalID = setInterval(function(){

			//1071210 - 新增 try...catch
			try {

				currHight = iframeObj.contentDocument.body.offsetHeight;
				if( currHight !== undefined ){
					clearInterval( intervalID );
					$(".iframeTag").height( currHight ); 
				}

			}catch(err){
				//
			}
			
		},100);
	
    });
	
};


//左、右按鈕滑鼠事件
g226A.leftRightBtnMouseEvent = function(){
	
	$('.rightBtn')
	
	.on('mouseover', function(){
		if( g226A.currMenuSet < (g226A.menuSetTotal-1) ){
			$(this).css({'background':'url(' + param.mainPath + 'g226A_Timeline/images/right_btn_over.png)'});
		}
	})
	
	.on('mouseout', function(){
		if( g226A.currMenuSet < (g226A.menuSetTotal-1) ){
			$(this).css({'background':'url(' + param.mainPath + 'g226A_Timeline/images/right_btn.png)'});
		}
	})
	
	.on('mousedown', function(){
		if( g226A.currMenuSet < (g226A.menuSetTotal-1) ){
			$(this).css({'background':'url(' + param.mainPath + 'g226A_Timeline/images/right_btn.png)'});
		
			//
			g226A.gotoNextMenu();
		
		}
	});
	
	
	
	$('.leftBtn')
	
	.on('mouseover', function(){
		if( g226A.currMenuSet > 0 ){
			$(this).css({'background':'url(' + param.mainPath + 'g226A_Timeline/images/left_btn_over.png)'});
		}
		
	})
	
	.on('mouseout', function(){
		if( g226A.currMenuSet > 0 ){
			$(this).css({'background':'url(' + param.mainPath + 'g226A_Timeline/images/left_btn.png)'});
		}
	})
	
	.on('mousedown', function(){
		if( g226A.currMenuSet > 0 ){
			$(this).css({'background':'url(' + param.mainPath + 'g226A_Timeline/images/left_btn.png)'});
			
			//
			g226A.gotoPrevMenu();
		}
		
		
	});
	
};


//載入下一組選單
g226A.gotoNextMenu = function(){
	
	//載入下一組選單
	
	if( g226A.currMenuSet < (g226A.menuSetTotal-1) ){
		g226A.currMenuSet ++;
	}
	
	
	//
	$('.timeline').css({'position':'absolute'});
	var originalPosX = $('.timeline').offset().left; //alert(originalPosX);
	
	$('.timeline').animate({'left':600,'opacity':0.0},250, function(){
		

	
		//輪詢 - 清空.labelText
		$('.timelineItem').each(function(index){
			$('.timelineItem:eq(' + index + ') .label .labelText').html('');
		});
		
		//輪詢 - 加入的小標文字內容到.labelText
		$('.timelineItem').each(function(index){
			//更新.timelineItem
			
			//填入.timelineItem裡面.labelText的小標文字內容
			var tmp = g226A.currMenuSet*4 + (index); 
			if( g226A.data[tmp] !== undefined ){
				$('.timelineItem:eq(' + index + ') .label .labelText').html( g226A.data[tmp][0] );
				$('.timelineItem:eq(' + index + ')').css({'display':'block'});
			}else{
				$('.timelineItem:eq(' + index + ')').css({'display':'none'});
			}
			
		});
		
		//alert( g226A.currMenuSet + '/' +  (g226A.menuSetTotal-1));
		
		
		//
		g226A.restoreBgAllNormal();
		
		
		//取得作用中的.timelineItem，更換背景圖。
		//alert( '「Math.ceil( (g226A.currPage+1)/4 )」：' + Math.ceil( (g226A.currPage+1)/4 ) + '　↑↑↑　' + '「g226A.currMenuSet+1」：' + (g226A.currMenuSet+1) );
		
		if( Math.ceil( (g226A.currPage+1)/4 ) === (g226A.currMenuSet+1) ){
			
			//組合.timelineItem的背景圖路徑
			var bgUrl_keep = param.mainPath + 'g226A_Timeline/images/arrow_' + ((g226A.currPage)%4+1) + '_keep.png';
			$('.timelineItem:eq(' + g226A.currPage%4 + ')').css({'background':'url(' + bgUrl_keep + ')'});
			
			//
			//組合.timelineItem .label 的背景圖路徑
			var label_bgUrl_keep = param.mainPath + 'g226A_Timeline/images/label_bg_keep.png';
			$('.timelineItem:eq(' + g226A.currPage%4 + ') .label').css({'background':'url(' + label_bgUrl_keep + ')'});
			
			//
			/*$('.timelineItem:eq(' + g226A.currPage%4 + ') .label').on('mouseout', function(){
				$('.timelineItem:eq(' + g226A.currPage%4 + ') .label').css({'background':'url(' + label_bgUrl_keep + ')'});
			});*/
			
			
			
		}
	
		
		//
		g226A.leftRightBtnOpacity();
		
		$('.timeline').css({'left':'-600px'}).animate({'left':originalPosX,'opacity':1.0},200, function(){
			$('.timeline').css({'position':'static'});

			
	
		});
		
	
	});
	
	
};


	
//載入前一組選單
g226A.gotoPrevMenu = function(){
	
	//載入前一組選單
	
	if( g226A.currMenuSet > 0 ){
		g226A.currMenuSet --;
	}

	
	//
	$('.timeline').css({'position':'absolute'});
	var originalPosX = $('.timeline').offset().left; //alert(originalPosX);
	
	$('.timeline').animate({'left':-600,'opacity':0.0},250, function(){
	
	
	
		//輪詢 - 清空.labelText
		$('.timelineItem').each(function(index){
			$('.timelineItem:eq(' + index + ') .label .labelText').html('');
		});
		
		//輪詢 - 加入的小標文字內容到.labelText
		$('.timelineItem').each(function(index){
			//更新.timelineItem
			
			//填入.timelineItem裡面.labelText的小標文字內容
			var tmp = g226A.currMenuSet*4 + (index); 
			if( g226A.data[tmp] !== undefined ){
				$('.timelineItem:eq(' + index + ') .label .labelText').html( g226A.data[tmp][0] );
				$('.timelineItem:eq(' + index + ')').css({'display':'block'});
			}else{
				$('.timelineItem:eq(' + index + ')').css({'display':'none'});
			}
			
		});
		
		//alert( g226A.currMenuSet + '/' +  (g226A.menuSetTotal-1));
		
		//
		g226A.restoreBgAllNormal();
		
		
		//取得作用中的.timelineItem，更換背景圖。
		//alert(g226A.currPage+1);
		//alert( '「Math.ceil( (g226A.currPage+1)/4 )」：' + Math.ceil( (g226A.currPage+1)/4 ) + '　↑↑↑　' + '「g226A.currMenuSet+1」：' + (g226A.currMenuSet+1) );
		if( Math.ceil( (g226A.currPage+1)/4 ) === (g226A.currMenuSet+1) ){
			
			//組合.timelineItem的背景圖路徑
			var bgUrl_keep = param.mainPath + 'g226A_Timeline/images/arrow_' + ((g226A.currPage)%4+1) + '_keep.png';
			$('.timelineItem:eq(' + g226A.currPage%4 + ')').css({'background':'url(' + bgUrl_keep + ')'});
			
			//
			//組合.timelineItem .label 的背景圖路徑
			var label_bgUrl_keep = param.mainPath + 'g226A_Timeline/images/label_bg_keep.png';
			$('.timelineItem:eq(' + g226A.currPage%4 + ') .label').css({'background':'url(' + label_bgUrl_keep + ')'});
		}
		
		//
		g226A.leftRightBtnOpacity();
		
		$('.timeline').css({'left':'600px'}).animate({'left':originalPosX,'opacity':1.0},200, function(){
			$('.timeline').css({'position':'static'});

			
	
		});
		
		
	});	
		
	
};


//控制左右按鈕的透明度
g226A.leftRightBtnOpacity = function(){ 

	if( g226A.menuSetTotal === 1 ){
		
		$('.rightBtn').css({'opacity':g226A.prevNextBtnEdgeOpacity, 'cursor':'default'});
		$('.leftBtn').css({'opacity':g226A.prevNextBtnEdgeOpacity, 'cursor':'default'});
		
	}else if( g226A.menuSetTotal !== 1 ){
		
		if( g226A.currMenuSet >= (g226A.menuSetTotal-1) ){
			$('.rightBtn').css({'opacity':g226A.prevNextBtnEdgeOpacity, 'cursor':'default'});
			
		}else{
			$('.rightBtn').css({'opacity':'1.0', 'cursor':'pointer'});
		}
		
		if( g226A.currMenuSet <= 0 ){
			$('.leftBtn').css({'opacity':g226A.prevNextBtnEdgeOpacity, 'cursor':'default'});
		}else{
			$('.leftBtn').css({'opacity':'1.0', 'cursor':'pointer'});
		}
		
	}
	
	
	
};


//.timelineItem的滑鼠事件處理
g226A.timelineItemMouseEvent = function(){
	
	//
	$('.timelineItem').each(function(index) {
        
		$('.timelineItem:eq(' + index + ') .label')
	
		.on('mouseover', function(){
			if( g226A.currPage%4 !== index || Math.ceil( (g226A.currPage+1)/4 ) !== (g226A.currMenuSet+1)){
				$('.timelineItem:eq(' + index + ') .label').css({'background':'url(' + param.mainPath + 'g226A_Timeline/images/label_bg_over.png)'});
			}
		})
		
		.on('mouseout', function(){
			if( g226A.currPage%4 !== index || Math.ceil( (g226A.currPage+1)/4 ) !== (g226A.currMenuSet+1)){
				$('.timelineItem:eq(' + index + ') .label').css({'background':'url(' + param.mainPath + 'g226A_Timeline/images/label_bg.png)'});
			}
		})
		
		.on('mousedown', function(){
			
			if( g226A.currPage%4 !== index || Math.ceil( (g226A.currPage+1)/4 ) !== (g226A.currMenuSet+1)){
				
				//
				g226A.restoreBgAllNormal();
				
				//
				$('.timelineItem:eq(' + index + ') .label').css({'background':'url(' + param.mainPath + 'g226A_Timeline/images/label_bg_keep.png)'});
				
				
				//
				//組合.timelineItem的背景圖路徑
				var bgUrl_keep = param.mainPath + 'g226A_Timeline/images/arrow_' + (index+1) + '_keep.png';
				$('.timelineItem:eq(' + index + ')').css({'background':'url(' + bgUrl_keep + ')'});
				
				
				//●●●
				g226A.currPage = g226A.currMenuSet*4 + index;
				//
				g226A.switchPage();
			
			}
			
		});
	
	
	});
	
};


//目前沒用到
g226A.timelineItemRemoveMouseEvent = function(){
	
	//
	$('.timelineItem').each(function(index) {
		$('.timelineItem:eq(' + index + ') .label').off('mouseover');
		$('.timelineItem:eq(' + index + ') .label').off('mouseout');
		$('.timelineItem:eq(' + index + ') .label').off('mousedown');
	});
	
};


//回復.timelineItem的一般狀態背景圖
g226A.restoreBgAllNormal = function(){
	//
	$('.timelineItem').each(function(index) {
		//組合.timelineItem的背景圖路徑
		var bgUrl = param.mainPath + 'g226A_Timeline/images/arrow_' + (index+1) + '.png';
		//
		$('.timelineItem:eq(' + index + ')').css({'background':'url(' + bgUrl + ')'});
		
		//組合.timelineItem .label 的背景圖路徑
		var label_bgUrl = param.mainPath + 'g226A_Timeline/images/label_bg.png';
		//
		$('.timelineItem:eq(' + index + ') .label').css({'background':'url(' + label_bgUrl + ')'});
	});
	
};


//切換頁面
g226A.switchPage = function(){
	
	//g226A.iframeHtml
	$('.iframeTag').attr({'src':''});
	$('.iframeTag').empty().remove();
	
	$('.g226A_workArea').append(g226A.iframeHtml);
	
	//
	//載入第(g226A.currPage)頁
	$('.iframeTag').attr({'src':g226A.data[g226A.currPage][1]});
	
	//
	g226A.iframeLoadEvent();
	
};



//●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●
//===============================================================●
//開啟menu按鈕 事件處理
g226A.menuBtnMouseEvent = function(){
	//
	$('.menuBtn')
	
		.on('mouseover',function(){
			$('.menuBtn').css({'background':'url(' + param.mainPath + 'g226A_Timeline/images/menuBtn_over.png' + ')'});
		})
		.on('mouseout',function(){
			$('.menuBtn').css({'background':'url(' + param.mainPath + 'g226A_Timeline/images/menuBtn.png' + ')'});
		})
		
		.on('mousedown',function(){
			//
			$('body').append('<div class="g226A_menuZone"></div>');
			
			//
			//$('.g226A_menuZone').css({'display':'block','opacity':0.0}).animate({'opacity':g226A.menuZoneOpacity},480);
			$('.g226A_menuZone').css({'opacity':g226A.menuZoneOpacity}).slideDown(250,function(){
				g226A.menuOpen = true;	
			});
			
			//
			$(this).off('mouseover');
			$(this).off('mouseout');
			$(this).off('mousedown');
			
			//
			$('.menuBtn').empty().remove();
			$('.menuBtnOuter').html('<div class="menuCloseBtn"></div>');
			//$('.menuCloseBtn').append('<img src=' + param.mainPath + 'g226A_Timeline/images/menuCloseBtn.png' + '>');
			
			
			
			//
			g226A.createCardTitleMenu();
			
			//關閉menu按鈕 事件處理
			g226A.menuCloseBtnMouseEvent();
			
		});
};

//關閉menu按鈕 事件處理
g226A.menuCloseBtnMouseEvent = function(){
	//
	$('.menuCloseBtn')
		.on('mouseover',function(){
			$('.menuCloseBtn').css({'background':'url(' + param.mainPath + 'g226A_Timeline/images/menuCloseBtn_over.png' + ')'});
		})
		.on('mouseout',function(){
			$('.menuCloseBtn').css({'background':'url(' + param.mainPath + 'g226A_Timeline/images/menuCloseBtn.png' + ')'});
		})
		.on('mousedown',function(){
			//
			/*$('.g226A_menuZone').animate({'opacity':0.0},480,function(){
				$('.g226A_menuZone').remove();	
			});*/
			$('.g226A_menuZone').css({'opacity':1.0}).slideUp(250,function(){
				$('.g226A_menuZone').remove();	
			});
			
			//
			g226A.menuOpen = false;
			
			//
			$(this).off('mouseover');
			$(this).off('mouseout');
			$(this).off('mousedown');
			
			//
			$('.menuCloseBtn').empty().remove();
			$('.menuBtnOuter').html('<div class="menuBtn"></div>');
			//$('.menuBtn').append('<img src=' + param.mainPath + 'g226A_Timeline/images/menuBtn.png' + '>');
			
			
			//開啟menu按鈕 事件處理
			g226A.menuBtnMouseEvent();
			
		});
};


//沒用到
g226A.rwdCloseContentBtnMouseEvent = function(){
	
	$('.rwdCloseContentBtn')
	
	.on('mouseover', function(){
		$('.rwdCloseContentBtn').css({'background':'URL(' + param.mainPath + 'g226A_Timeline/images/rwdCloseContentBtn_over.png' + ')'});
	})
	
	.on('mouseout', function(){
		$('.rwdCloseContentBtn').css({'background':'URL(' + param.mainPath + 'g226A_Timeline/images/rwdCloseContentBtn.png' + ')'});
	})
	
	.on('mousedown', function(){
		//
		$('.iframeTag').attr({'src':''});
		$('.iframeTag').addClass('iframeTag_close');
		//
		$('.rwdCloseContentColumn').addClass('rwdCloseContentColumn_close');
		//
		$('.menuBtn').trigger('mousedown');
		//
		//$('.iframeTag').css({'display':'none'});
	});
	
};


//沒用到
//將網頁上的.g226A_cardTitle存入陣列g226A.cardTitle
g226A.cardTitleToArr = function(){
	//
	$('.g226A_cardTitle').each(function(index) {
        g226A.cardTitle[index] = $('.g226A_cardTitle:eq(' + index +  ')').html();
		//alert(g226A.cardTitle[index]);
    });
};


//將g226A.data陣列中的元素 - $('.g226A_cardTitle:eq(' + index +  ')').html()
//附加到$('.g226A_menuZone')
g226A.createCardTitleMenu = function(){
	
	
	//1050510 - 增加help按鈕 '<span class="help"></span>'
	$('.g226A_menuZone').append('<div class="g226A_menuHeader">' + g226A.menuHeader + '<span class="help"></span></div>');
	
	
	//新手上路 - 1050510
	//======================================================================
	if(param.hasHelpFlag){ //alert(param.tPlayer_CSSPath);
		
		if(param.helpIconPath === undefined || param.helpIconPath === "" || typeof param.helpIconPath !== "string"){ 
			param.helpIconPath = param.tPlayer_CSSPath + "images/help.png";
			param.helpIconOverPath = param.tPlayer_CSSPath + "images/help_over.png";
		}
		
		$('.g226A_menuHeader .help')
				.append('<a><img src=' + param.helpIconPath + '></a>')
				.attr('title', param.helpComment); 
				
		//
		$('.g226A_menuHeader .help')
		
			.on('mouseover',function(){ 
					$('.g226A_menuHeader .help img').attr('src', param.helpIconOverPath); 
				})
			.on('mouseout',function(){
					$('.g226A_menuHeader .help img').attr('src', param.helpIconPath);
				})
			.on('mousedown',function(){
					//
					$('.menuCloseBtn').trigger('mousedown');
					//
					$('.g226A_menuHeader .help a').attr({'href':param.helpUrl,target:'_blank'});
					
				});
				
	}
	//======================================================================
	
	

	
	//
	$.each(g226A.data,function(index) { 
		
		
		//●○●○●○
		//******************************************************************************
		if( g226A.data[index][0] !== "" ){  
		//******************************************************************************
	
		
			//
			$('.g226A_menuZone').append(  
					'<div class="g226A_menuRow">' + 
						'<span class="g226A_menuRowOrder">' + (index+1) + '</span>' + 
						'<span class="g226A_menuRowItemOuter">' + 
							'<span class="g226A_menuRowItem">' + g226A.data[index][0] + '</span>' + 
						'</span>' + 
					'</div>' );
			
			//
			//g226A_menuRowOrder_current
			$('.g226A_menuRow:eq(' + g226A.currPage + ')').addClass('g226A_menuRow_current');
			$('.g226A_menuRow:eq(' + g226A.currPage + ') .g226A_menuRowOrder').addClass('g226A_menuRowOrder_current');
			$('.g226A_menuRow:eq(' + g226A.currPage + ') .g226A_menuRowItem').addClass('g226A_menuRowItem_current');
			
			
			
			//●○※
			$('.g226A_menuRow:eq(' + index + ')')
			
			
				.on('mouseover',function(){
					if(index !== g226A.currPage){
						$('.g226A_menuRow:eq(' + index + ')').addClass('g226A_menuRow_hover');
						$('.g226A_menuRowOrder:eq(' + index + ')').addClass('g226A_menuRowOrder_hover');
						
					}else{
						$('.g226A_menuRow:eq(' + index + ')').css({'cursor':'default'});
					}
				})
				.on('mouseout',function(){
					$('.g226A_menuRow:eq(' + index + ')').removeClass('g226A_menuRow_hover');
					$('.g226A_menuRowOrder:eq(' + index + ')').removeClass('g226A_menuRowOrder_hover');
				})
				
				//
				.on('mousedown',function(){
					
					//●
					if(index !== g226A.currPage){
						
						//
						$('.g226A_menuZone').css({'opacity':1.0}).slideUp(250,function(){
							
							$('.g226A_menuZone').remove();
							//
							$('.menuCloseBtn').trigger('mousedown');
							
							
							//●○
							//====================================
							//指定換頁序號。
							g226A.currPage = index;
							//====================================
							//根據g226A.currPage，載入分頁。
							g226A.switchPage();
							//====================================
							g226A.currMenuSet = Math.ceil((g226A.currPage+1)/4)-1;  //alert(g226A.currMenuSet);
							//====================================
							
							
							//輪詢 - 清空.labelText
							$('.timelineItem').each(function(index){
								$('.timelineItem:eq(' + index + ') .label .labelText').html('');
							});
							
							//輪詢 - 加入小標文字內容到.labelText
							$('.timelineItem').each(function(index){
								//更新.timelineItem
								
								//填入.timelineItem裡面.labelText的小標文字內容
								var tmp = g226A.currMenuSet*4 + (index); 
								if( g226A.data[tmp] !== undefined ){
									$('.timelineItem:eq(' + index + ') .label .labelText').html( g226A.data[tmp][0] );
									$('.timelineItem:eq(' + index + ')').css({'display':'block'});
								}else{
									$('.timelineItem:eq(' + index + ')').css({'display':'none'});
								}
								
							});
							
							
							//●○
							g226A.restoreBgAllNormal();
							//●○
							g226A.leftRightBtnOpacity();
							
							
							//●○
							//組合.timelineItem的背景圖路徑
							var bgUrl_keep = param.mainPath + 'g226A_Timeline/images/arrow_' + ((g226A.currPage)%4+1) + '_keep.png';
							$('.timelineItem:eq(' + g226A.currPage%4 + ')').css({'background':'url(' + bgUrl_keep + ')'});
							
							//
							//組合.timelineItem .label 的背景圖路徑
							var label_bgUrl_keep = param.mainPath + 'g226A_Timeline/images/label_bg_keep.png';
							$('.timelineItem:eq(' + g226A.currPage%4 + ') .label').css({'background':'url(' + label_bgUrl_keep + ')'});
							
							
						});
					
					}
					
				});
				
				
				
		//●●●●●●
		//******************************************************************************
		}else{ 
			//alert(index);
		}
		//******************************************************************************
		
				
		
    });
	//$.each()
	
	
	

	
	
	//點擊在body標籤上
		$(document).on('mousedown',document,function(e){ 
		
			//alert(e.target.className + '/' + e.target.tagName);
			if(g226A.menuOpen === true){
				//if( e.target.tagName.toLowerCase() === "body"){ 
					$('.menuCloseBtn').trigger('mousedown');
					g226A.menuOpen = false;
					$(document).off('mousedown');
				//}
			}
		});
		
		//點擊在.pageWrapper上
		/*$('.pageWrapper').on('mousedown',function(){ 
			if(g226A.menuOpen === true){
				$('.menuCloseBtn').trigger('mousedown');
				g226A.menuOpen = false;
			}
		});*/
		
	
	
};
//===============================================================●




//1041202
$(window).on('resize', function(){
	
	// IE6~IE8 - ※IE9在此處對window.attachEvent 則有反應
	method.lessThenIE9Css();
	
	
	//●○1060425 - G226A - 
	if($(window).width() <= param.breakpoint){
		//
	}else if($(window).width() > param.breakpoint){
		//
	}
	
});


//預載控制 - 從HTML移過來。
//1051104 - 從$(document).ready裡面調用
method.preloaderFadeOut = function(){
	//不設window.load
	//$(window).load(function() { // makes sure the whole site is loaded
	
		//$('#status').fadeOut(600); // will first fade out the loading animation
		$('#preloader').fadeOut(600,function(){// will fade out the white DIV that covers the website.
			$('body').css({'overflow':'auto','display':'block'});
		});
		 
	//});
};




//
$(document).ready(function(){
	
	//1051104 - 延遲300毫秒再調用 - 預載方法method.preloaderFadeOut()
	//--------------------------------------------
	//setTimeout( method.preloaderFadeOut, 300);
	setTimeout( method.preloaderFadeOut, 300);
	//--------------------------------------------

	
	//●整體縮放頁面 - 強迫設定為1.0，以避免播放控制失常
	//============================
	$('body').css('zoom','1.0');
	//============================
	
	
	method.addDocumentTitle();
	
	
	//●
	g226A.getData();
	//
	g226A.initPage();
	
	
	

	//啟動媒體播放相關處理
	//===================================
	//●method.getPath()必要。●為了抓取tPlayer.js裡的param.tPlayer_CSSPath
	method.getPath();
	//
	//method.pageInit();
	//
	//method.init();
	//
	utils.userAgentProp();
	utils.detectBrowserVersion();
	//
	//method.choosePlayMode();
	//method.deployment();
	
	//
	/*$('.mediaWrapper').each(function(index) {
		method.embedMedia(index);
		
		//媒體介面是否有進場jQ動作 ? 
		//●這一定要在 method.embedMedia(index) 之後調用，所以移到各版型主程式調用。
		if(param.hasEnteringMotion){
			//媒體介面進場jQ動作 
			method.entering(index);
		}


	});*/
	//===================================
	
	
	//
	//g226A.helpMouseEvent();
	
	//
	g226A.iframeLoadEvent();
	
	//
	g226A.leftRightBtnMouseEvent();
	
	//
	g226A.timelineItemMouseEvent();
	
	//
	g226A.menuBtnMouseEvent();
	
	//
	//g226A.rwdCloseContentBtnMouseEvent();

});





//>>>=============================================================>>>
})(jQuery); //↑↑↑


























