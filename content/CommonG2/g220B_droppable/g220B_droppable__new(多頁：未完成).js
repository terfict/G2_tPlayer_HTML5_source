// JavaScript Document - G2T01│g2T01_droppable.js
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
var g2T01 = NOU.namespace('NOU.modules.g2T01');
//------------------------



//================================================
//
g2T01.totalPage = 0; //總頁數
g2T01.currPage = 0; //目前頁面索引
//
g2T01.questionHtml = []; //題目HTML字串
g2T01.initFeedbackHtml = []; //初始頁面時，拖曳答題之後的「正確或錯誤」回饋區裡面的html內容
g2T01.initDraggerZoneHtml = []; //初始頁面時，.draggerZone裡的HTML內容
//
g2T01.draggerObj = []; //拖曳物件
g2T01.draggerImgSrc = []; //拖曳物件的圖形連結網址
g2T01.dropTargetObj = []; //目標放置物件
g2T01.targetImgSrc = []; //目標放置物件的圖形連結網址
g2T01.matchDraggerStr = []; //.target的data-match屬性：為拖曳答題的答案設定字串
//
g2T01.originalOrder = []; //拖曳物件的原始索引所組成的陣列：由小到大：例0~2
g2T01.newOrder = []; //使用Array.sort()方法，將g2T01.originalOrder陣列做亂數排序，存入本陣列
//
g2T01.draggerOuterIniArr = []; //儲存(.dragger的外圍容器).draggerOuter初始頁面時的jQery物件
//
g2T01.acceptStr = []; //儲存目標置放物件的droppable()方法的"accept"參數。(目標物件被置放時，所擷取的拖曳物件選擇器字串)
//
g2T01.totalAmount = []; //總題數
g2T01.hasBeenCompleted = []; //已經完成的拖曳答題數量
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



//取得HTML裡面的資料。
method.getData = function(){
	
	//
	$('.g2T01_page').each(function(pageIndex) {
		
		//g2T01.questionHtml ↑ .question:eq(' + questionIndex + ')').html()
		//各頁的題目(每頁一個題目)
        g2T01.questionHtml[pageIndex] = $('.g2T01_page:eq(' + pageIndex + ') .question').html();
		//alert(g2T01.questionHtml);
		
		
		//g2T01.initFeedbackHtml ↑ .feedbackString:eq(' + feedbackIndex + ')').html()
		//●拖曳答題之後的「正確或錯誤」回饋區裡面的html內容
		g2T01.initFeedbackHtml[pageIndex] = $('.g2T01_page:eq(' + pageIndex + ') .feedbackString').html();
		//alert(g2T01.initFeedbackHtml);
		
		
		//g2T01.initDraggerZoneHtml ↑ $('.draggerZone').html();
		//●初始頁面時，.draggerZone裡的HTML內容
		g2T01.initDraggerZoneHtml[pageIndex] = [];
		$('.g2T01_page:eq(' + pageIndex + ') .draggerZone').each(function(draggerZoneHtmlIndex) {
			g2T01.initDraggerZoneHtml[pageIndex][draggerZoneHtmlIndex] = $('.g2T01_page:eq(' + pageIndex + ') .draggerZone:eq(' + draggerZoneHtmlIndex + ')').html();
			//alert(g2T01.initDraggerZoneHtml[pageIndex][draggerZoneHtmlIndex]);
		});
		//alert(g2T01.initDraggerZoneHtml);
		
		
		//●拖曳物件
		g2T01.draggerObj[pageIndex] = [];
		g2T01.draggerImgSrc[pageIndex] = [];
		$('.g2T01_page:eq(' + pageIndex + ') .draggerZone .dragger').each(function(draggerIndex) {
			//●
			g2T01.draggerObj[pageIndex][draggerIndex] = $(this);
			//●
			g2T01.draggerImgSrc[pageIndex][draggerIndex] = $(this).find('img').attr('src');
		});
		//alert(g2T01.draggerObj);
		
		
		g2T01.matchDraggerStr[pageIndex] = [];
		g2T01.dropTargetObj[pageIndex] = [];
		g2T01.targetImgSrc[pageIndex] = [];
		$('.g2T01_page:eq(' + pageIndex + ') .targetZone .target').each(function(targetIndex) {
			//●
			g2T01.matchDraggerStr[pageIndex][targetIndex] = $(this).attr('data-match');
			//●
			g2T01.dropTargetObj[pageIndex][targetIndex] = $(this);
			//●
			g2T01.targetImgSrc[pageIndex][targetIndex] = $(this).find('img').attr('src');
		});
		//alert(g2T01.matchDraggerStr + '\n' + g2T01.dropTargetObj);
		//alert(g2T01.targetImgSrc);
		
		
		//●計算有幾組拖曳配對
		g2T01.totalAmount[pageIndex] = g2T01.draggerObj[pageIndex].length;
		//alert(g2T01.totalAmount[pageIndex]);
		
		
    });
	
	
	
	
	//●置放用目標物件
	/*$('.targetZone .target').each(function(index) {
		//●
		g2T01.matchDraggerStr[index] = $(this).attr('data-match');
		//●
		g2T01.dropTargetObj[index] = $(this);
		//●
		g2T01.targetImgSrc[index] = $(this).find('img').attr('src');
    });*/
	//alert(g2T01.matchDraggerStr + '\n' + g2T01.dropTargetObj);
	//alert(g2T01.targetImgSrc);
	
	
	
	//●拖曳答題之後的「正確或錯誤」回饋區裡面的html內容
	//g2T01.initFeedbackHtml = $('.feedbackString').html();
	
	
	//●初始頁面時，.draggerZone裡的HTML內容
	//g2T01.initDraggerZoneHtml = $('.draggerZone').html();
	
	
	//●拖曳物件
	/*$('.draggerZone .dragger').each(function(index) {
		//●
		g2T01.draggerObj[index] = $(this);
		//●
		g2T01.draggerImgSrc[index] = $(this).find('img').attr('src');
	});*/
	//alert(g2T01.draggerObj);
	
	
	//●計算有幾組拖曳配對
	//g2T01.totalAmount = g2T01.draggerObj.length;
	//alert(g2T01.totalAmount);
	
};


method.initPage = function(){
	
	//●○需延遲.pageWrapper的dispaly隱藏，否則：以大視窗初始畫面後，拉小到小視窗，再拉大到大視窗，會破版。()
	setTimeout(function(){
		
		//
		$('.pageWrapper').css({'display':'none'});
	
		//
		$('.targetZone').css({'opacity':'0'});
		$('.feedbackZone').css({'opacity':'0'});
		$('.draggerZone').css({'opacity':'0'});
		
		//
		$('.pageWrapper').show(600, function(){
			$('.pageWrapper').css({'display':'block'});
		});
		$('.targetZone').delay(500).animate({'opacity':1.0},250, function(){
			$('.feedbackZone').animate({'opacity':1.0},250, function(){
				$('.draggerZone').animate({'opacity':1.0},250, function(){
					//
				});
			});
		});
	
	
	},100);
	
	
	//
	/*$('.targetZone').css({'visibility':'hidden'});
	$('.feedbackZone').css({'visibility':'hidden'});
	$('.draggerZone').css({'visibility':'hidden'});*/
	
	//
	/*$('.pageWrapper').css({'display':'none'});
	//
	$('.targetZone').css({'display':'none'});
	$('.feedbackZone').css({'display':'none'});
	$('.draggerZone').css({'display':'none'});*/
	
	//
	/*$('.pageWrapper').show(800);
	$('.targetZone').delay(300).show(200, function(){
		$('.feedbackZone').show(200, function(){
			$('.draggerZone').show(200, function(){
				
			});
		});
	});*/
	
	
};



//========================================================
method.getRandom = function(_length){
	var randomValue = Math.floor(Math.random()*_length); //alert(randomValue);
	return randomValue;
};
//========================================================


//========================================================
//排序函数(由小到大)
method.sortNumber1 = function(a,b){
	return a - b;
};

//排序函数(由大到小)
method.sortNumber2 = function(a,b){
	return b - a;
};
//========================================================


//========================================================
//●亂數排序：只要让比较函数随机返回1或者-1就行了
　method.randomJob = function(){
	　return Math.random()>0.5?-1:1;
　};

//排序
method.createRandomSortArr = function(){
	//
	$.each(g2T01.draggerObj, function(index){
		//拖曳物件的原始陣列：由小到大：例0~2
		g2T01.originalOrder[index] = index;
		$('.showInfo').append( g2T01.originalOrder[index]+'/' );
	});
	
	$('.showInfo').append('<br>');
	
	//使用Array.sort()方法，●●●取得亂數排序
	g2T01.newOrder = g2T01.originalOrder.sort( method.randomJob );
	
	$.each(g2T01.draggerObj, function(index){
		$('.showInfo').append( g2T01.newOrder[index]+'/' );
	});
	
};
//========================================================


//
method.randomDraggerPosition = function(){
	//產生亂數排序陣列
	method.createRandomSortArr();	
	
	//
	$.each(g2T01.originalOrder, function(index){
		g2T01.draggerOuterIniArr[index] = $('.draggerOuter:eq(' + index + ')');
		//$('.showInfo').append(g2T01.draggerOuterIniArr[index].html()+'/');
	});
	
	
	//
	$.each(g2T01.originalOrder, function(index){
		$('.draggerOuter:eq(' + index + ')').remove();
	});
	
	//
	$.each(g2T01.newOrder, function(index){
		g2T01.draggerOuterIniArr[g2T01.newOrder[index]].appendTo( $('.draggerZone') );
	});
	
	
};




//●○(_matchDraggerStr, _draggerObj, _dropTargetObj) ： (拖曳物件的類別名稱，包含前面的'.', 拖曳物件, 置放物件)
//●○ 《《《 B 》》》
method.droppableFunc = function(_matchDraggerStr, _draggerObj, _dropTargetObj, _draggerImgSrc){
	
	
	//●
	//==================================================《《《《《《《《
	_dropTargetObj.droppable({
		
		tolerance: "pointer", //tolerance：fit↑intersect↑pointer↑touch
		//http://api.jqueryui.com/droppable/#option-tolerance
		
		accept: _matchDraggerStr,
		
		drop: function( event, ui ) {   
			
			//
			g2T01.acceptStr = _dropTargetObj.droppable( "option", "accept" );
			//alert( g2T01.acceptStr );  
			
			
			//●○答題正確
			if( g2T01.acceptStr === _matchDraggerStr ){
				
				//答題正確 之音效
				//=====================
				tPlayer.pause(0);
				tPlayer.seek(0,0);
				tPlayer.play(0);
				//=====================
				
				
				//用這方法，rwd小尺寸時，外框縮放高度不吻合
				//_dropTargetObj.css({'display':'none'}); //將放置目標裡面的圖形隱藏
				//_draggerObj.appendTo( _dropTargetObj.parent().get(0) );
				//_draggerObj.css({'position':'relative'});
				//_draggerObj.animate({'left':'0px','top':'0px'},0);
				
				
				//alert(_targetImgSrc);
				//alert(_dropTargetObj);
				
				
				//這方法可以，但全部拖曳完成時，_draggerObj的高度會失去
				//替換target裡面的圖形
				_dropTargetObj.find('img').attr('src', _draggerImgSrc);
				//隱藏dragger
				_draggerObj.css({'visibility':'hidden'});
				
				//將.target appendTo .targetOuter
				//_draggerObj.appendTo( _draggerObj.parent() ).css({});
				//_draggerObj.css({'position':'relative'});
				//_draggerObj.animate({'left':'0px','top':'0px'},360);
				
				
				
				//拖曳到正確目標後，關掉拖曳功能。
				_draggerObj.draggable( "option", "disabled", true );
				
				
				
				//●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○
				setTimeout(function(){
					//需將g2T01.acceptStr賦値為空字串。(否則其他_draggerObj會失去「置放不正確時回到原位」的功能)
					g2T01.acceptStr = "";
				},250);
				//●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○
				
				
				//清除先前class
				$('.feedbackZone .feedbackIcon').removeClass('feedbackIcon_wrong');
				$('.feedbackZone .feedbackString').removeClass('feedbackString_wrong');
				
				
				//答對：
				$('.feedbackZone .feedbackIcon').addClass('feedbackIcon_right');
				$('.feedbackZone .feedbackString').html('《 答對了 》').addClass('feedbackString_right'); 
				_draggerObj.parent().addClass('draggerOuter_matching');
	
				
				
				//
				if( g2T01.hasBeenCompleted < g2T01.totalAmount ){
					g2T01.hasBeenCompleted ++;
				}
				
				//
				if( g2T01.hasBeenCompleted === g2T01.totalAmount ){
					
					setTimeout(function(){
						
						//清除先前class
						$('.feedbackZone .feedbackIcon').removeClass('feedbackIcon_wrong');
						$('.feedbackZone .feedbackString').removeClass('feedbackString_wrong');
						$('.feedbackZone .feedbackIcon').removeClass('feedbackIcon_right');
						$('.feedbackZone .feedbackString').removeClass('feedbackString_right');
						
						//全部答對，您已經完成本單元。
						$('.feedbackZone .feedbackIcon').addClass('feedbackIcon_completed');
						$('.feedbackZone .feedbackString').html(' 全部答對，您已經完成本單元').addClass('feedbackString_completed');
						
					},1000);
					
					
				}
				
				
				
			}
		}  
		
		
	});  
	
	
	
	//==================================================《《《《《《《《
	_draggerObj.draggable({
		
		start:function(){
			
			//清空-答對或答錯的訊息：
			$('.feedbackZone .feedbackIcon').removeClass('feedbackIcon_right').removeClass('feedbackIcon_wrong');
			$('.feedbackZone .feedbackString').html( g2T01.initFeedbackHtml ).removeClass('feedbackString_right').removeClass('feedbackString_wrong');
			
		},
		
		stop:function(){
			
			//setTimeout(function(){
				//alert( g2T01.acceptStr );
				
				
				//●○答題錯誤、或亂拖曳
				if( g2T01.acceptStr === "" || g2T01.acceptStr === undefined || !g2T01.acceptStr ){
					
					//答題錯誤、或亂拖曳 之音效
					//=====================
					tPlayer.pause(1);
					tPlayer.seek(0,1);
					tPlayer.play(1);
					//=====================
					
					//alert( g2T01.acceptStr );
					_draggerObj.appendTo( _draggerObj.parent() ).css({});
					_draggerObj.css({'position':'relative'});
					_draggerObj.animate({'left':'0px','top':'0px'},360);
					
					
					//答錯：
					$('.feedbackZone .feedbackIcon').addClass('feedbackIcon_wrong');
					$('.feedbackZone .feedbackString').html('《 答錯了 》').addClass('feedbackString_wrong');
					
					//清除先前class
					$('.feedbackZone .feedbackIcon').removeClass('feedbackIcon_right');
					$('.feedbackZone .feedbackString').removeClass('feedbackString_right');
					
					
				}
	
				
			//},200);
			
		}
		
	});
	
	//
	/*_draggerObj.on('mouseup',function(){
		
		setTimeout(function(){
			//alert( g2T01.acceptStr );
			
			if( g2T01.acceptStr === "" || g2T01.acceptStr === undefined || !g2T01.acceptStr ){
				
				//答題錯誤、或亂拖曳 之音效
				//=====================
				tPlayer.seek(0,1);
				tPlayer.play(1);
				//=====================
				
				//alert( g2T01.acceptStr );
				_draggerObj.appendTo( _draggerObj.parent() ).css({});
				_draggerObj.css({'position':'relative'});
				_draggerObj.animate({'left':'0px','top':'0px'},360);
			}
			
		},200);
		
	});*/
		
	
	
};


//●○
/*method.mediaCompleted = function(index){
	tPlayer.pause(index);
	tPlayer.seek(0,index);
};*/



//●○ 《《《 A 》》》
function initDroppable(){
	
	//●○
	$.each(g2T01.dropTargetObj, function(index) {
		//設定可拖曳
		g2T01.dropTargetObj[index].droppable();
    });
	
	
	//●○
	$.each(g2T01.dropTargetObj, function(index) {

		//設定可置放
        g2T01.draggerObj[index].draggable({
			//revert: "valid", //設定：若未匹配，所拖曳物件自動返回原位置。(但此功能有瑕疵)
			snapMode: "inner"
		});
		
    });

	
	//●○
	$.each(g2T01.matchDraggerStr, function(index){
		method.droppableFunc( g2T01.matchDraggerStr[index], g2T01.draggerObj[index], g2T01.dropTargetObj[index], g2T01.draggerImgSrc[index] );
	});

	//alert(g2T01.matchDraggerStr);
}






//1041202
$(window).on('resize', function(){
	
	// IE6~IE8 - ※IE9在此處對window.attachEvent 則有反應
	method.lessThenIE9Css();
	
	
	//
	if($(window).width() <= param.breakpoint){
		
		
	}else if($(window).width() > param.breakpoint){
		
		
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
	method.getData();
	
	//
	method.initPage();
	
	//
	method.randomDraggerPosition();
	
	//●
	initDroppable();
	
	
	

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
	

});




//>>>=============================================================>>>
})(jQuery); //↑↑↑


























