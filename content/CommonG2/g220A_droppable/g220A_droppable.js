// JavaScript Document - G220A│g220A_droppable.js
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
var g220A = NOU.namespace('NOU.modules.g220A');
//------------------------



//================================================
//
g220A.totalPage = 0; //總頁數
g220A.currPage = 0; //目前頁面索引
//
g220A.initFeedbackString = ""; //初始頁面時，拖曳答題之後的「正確或錯誤」回饋區裡面的html內容
g220A.initDraggerZoneString = ""; //初始頁面時，.draggerZone裡的HTML內容
//
g220A.draggerObj = []; //拖曳物件
g220A.draggerImgSrc = []; //拖曳物件的圖形連結網址
g220A.draggerDataText = []; //拖曳物件.dropTarg的data-text屬性値
//
g220A.dropTargetObj = []; //目標放置物件
g220A.targetImgSrc = []; //目標放置物件的圖形連結網址
g220A.dropTargetDataText = []; //拖曳物件.dropTarget的data-text屬性値
g220A.matchDraggerStr = []; //.target的data-match屬性：為拖曳答題的答案設定字串
//
g220A.originalOrder = []; //拖曳物件的原始索引所組成的陣列：由小到大：例0~2
g220A.newOrder = []; //使用Array.sort()方法，將g220A.originalOrder陣列做亂數排序，存入本陣列
//
g220A.draggerOuterIniArr = []; //儲存(.dragger的外圍容器).draggerOuter初始頁面時的jQery物件
//
g220A.acceptStr = ""; //儲存目標置放物件的droppable()方法的"accept"參數。(目標物件被置放時，所擷取的拖曳物件選擇器字串)
//
g220A.totalAmount = 0; //總題數
g220A.hasBeenCompleted = 0; //已經完成的拖曳答題數量
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



//●○1070212 - 新增
//●○local近端語音所使用
//==============================================
method.getStreamingData_localAudio = function(index){

	
	//若賦值為　'streaming'　- 則連結遠端串流影音檔
	if(g220A.chooseSreamingOrLocalAudio === 'streaming'){

		//
		alert('xxx -g220A版型的語音只能設為local端。g220A.chooseSreamingOrLocalAudio = "local"。');

		
	
	
	//若賦值為　'local'　- 則連結近端影音檔
	}else if(g220A.chooseSreamingOrLocalAudio === 'local'){

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


//●○1070212 - 新增
//●○local近端語音所使用
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

			if( g220A.chooseSreamingOrLocalAudio === 'local' ){
					urlObj.iosMediaURLArr[index] = param.localDirectoryRoot + param.mediaURLArr[index];
					param.playModeArr = ["html5",urlObj.iosMediaURLArr];
				}else{
					alert('g220A版型的語音只能設為local端。g220A.chooseSreamingOrLocalAudio = "local"。');
				}

		}else if(utils.currentBrowser === "chrome"){
			//param.playModeArr = ["flash",urlObj.rtmpMediaURLArr];
			//param.playModeArr = ["html5",urlObj.iosMediaURLArr];
			
			//param.playModeArr = ["html5",urlObj.pcHttpMediaURLArr];
			//alert(urlObj.pcHttpMediaURLArr[0]);
			
			//hls.js
			//param.playModeArr = ["hlsHtml5",urlObj.iosMediaURLArr];

			if( g220A.chooseSreamingOrLocalAudio === 'local'){
					urlObj.iosMediaURLArr[index] = param.localDirectoryRoot + param.mediaURLArr[index];
					param.playModeArr = ["html5",urlObj.iosMediaURLArr];
				}else{
					alert('g220A版型的語音只能設為local端。g220A.chooseSreamingOrLocalAudio = "local"。');
				}

		}else if(utils.currentBrowser === "safari"){
			//param.playModeArr = ["flash",urlObj.rtmpMediaURLArr];
			//↓↓↓桌機筆電Windows的Safari 5.1.7版本，無法播放HTML5 Video
			//param.playModeArr = ["html5",urlObj.iosMediaURLArr];
			
			//param.playModeArr = ["html5",urlObj.pcHttpMediaURLArr];
			//alert(urlObj.pcHttpMediaURLArr[0]);
			
			//hls.js
			//param.playModeArr = ["hlsHtml5",urlObj.iosMediaURLArr];

			if( g220A.chooseSreamingOrLocalAudio === 'local'){
					urlObj.iosMediaURLArr[index] = param.localDirectoryRoot + param.mediaURLArr[index];
					param.playModeArr = ["html5",urlObj.iosMediaURLArr];
				}else{
					alert('g220A版型的語音只能設為local端。g220A.chooseSreamingOrLocalAudio = "local"。');
				}

		}else if(utils.currentBrowser === "firefox"){
			//param.playModeArr = ["flash",urlObj.rtmpMediaURLArr];
			//param.playModeArr = ["html5",urlObj.iosMediaURLArr];
			
			//param.playModeArr = ["html5",urlObj.pcHttpMediaURLArr];
			//alert(urlObj.pcHttpMediaURLArr[0]);
			
			//hls.js
			//param.playModeArr = ["hlsHtml5",urlObj.iosMediaURLArr];

			if( g220A.chooseSreamingOrLocalAudio === 'local'){
					urlObj.iosMediaURLArr[index] = param.localDirectoryRoot + param.mediaURLArr[index];
					param.playModeArr = ["html5",urlObj.iosMediaURLArr];
				}else{
					alert('g220A版型的語音只能設為local端。g220A.chooseSreamingOrLocalAudio = "local"。');
				}

		}else if(utils.currentBrowser === "opera"){
			//param.playModeArr = ["flash",urlObj.rtmpMediaURLArr];
			//param.playModeArr = ["html5",urlObj.iosMediaURLArr];
			
			//param.playModeArr = ["html5",urlObj.pcHttpMediaURLArr];
			//alert(urlObj.pcHttpMediaURLArr[0]);
			
			//hls.js
			//param.playModeArr = ["hlsHtml5",urlObj.iosMediaURLArr];

			if( g220A.chooseSreamingOrLocalAudio === 'local'){
					urlObj.iosMediaURLArr[index] = param.localDirectoryRoot + param.mediaURLArr[index];
					param.playModeArr = ["html5",urlObj.iosMediaURLArr];
				}else{
					alert('g220A版型的語音只能設為local端。g220A.chooseSreamingOrLocalAudio = "local"。');
				}

		}else{ //IE11靠此處抓取
			//param.playModeArr = ["flash",urlObj.rtmpMediaURLArr];
			//param.playModeArr = ["html5",urlObj.iosMediaURLArr];
			
			//param.playModeArr = ["html5",urlObj.pcHttpMediaURLArr];
			//alert(urlObj.pcHttpMediaURLArr[0]);
			
			//hls.js
			//param.playModeArr = ["hlsHtml5",urlObj.iosMediaURLArr]; 

			if( g220A.chooseSreamingOrLocalAudio === 'local'){
					urlObj.iosMediaURLArr[index] = param.localDirectoryRoot + param.mediaURLArr[index];
					param.playModeArr = ["html5",urlObj.iosMediaURLArr];
				}else{
					alert('g220A版型的語音只能設為local端。g220A.chooseSreamingOrLocalAudio = "local"。');
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

		if( g220A.chooseSreamingOrLocalAudio === 'local'){
				urlObj.iosMediaURLArr[index] = param.localDirectoryRoot + param.mediaURLArr[index];
				param.playModeArr = ["html5",urlObj.iosMediaURLArr];
			}else{
				alert('g220A版型的語音只能設為local端。g220A.chooseSreamingOrLocalAudio = "local"。');
			}

	}
};
//==============================================





//取得HTML裡面的資料。
method.getData = function(){
	
	
	//●置放用目標物件
	$('.targetZone .target').each(function(index) {
		//●
		g220A.matchDraggerStr[index] = $(this).attr('data-match');
		//●
		g220A.dropTargetObj[index] = $(this);
		//●
		g220A.targetImgSrc[index] = $(this).find('img').attr('src');
		//●
		g220A.dropTargetDataText[index] = $(this).attr('data-text');
		
    });
	//alert(g220A.matchDraggerStr + '\n' + g220A.dropTargetObj + '\n' + g220A.targetImgSrc + '\n' + g220A.dropTargetDataText);
	
	
	
	//●拖曳答題之後的「正確或錯誤」回饋區裡面的html內容
	g220A.initFeedbackString = $('.feedbackString').html();
	
	
	//●初始頁面時，.draggerZone裡的HTML內容
	g220A.initDraggerZoneString= $('.draggerZone').html();
	
	
	//●拖曳物件
	$('.draggerZone .dragger').each(function(index) {
		//●
		g220A.draggerObj[index] = $(this);
		//●
		g220A.draggerImgSrc[index] = $(this).find('img').attr('src');
		//●
		g220A.draggerDataText[index] = $(this).attr('data-text');
		
	});
	//alert(g220A.draggerDataText);
	
	
	//●計算有幾組拖曳配對
	//1060417 - 改為條件式，在此判斷有幾組有效拖曳。
	//=================================================================
	//- ● 大於等於
	if( g220A.draggerObj.length >= g220A.dropTargetObj.length ){
		g220A.totalAmount = g220A.dropTargetObj.length;
					
	}else if( g220A.draggerObj.length < g220A.dropTargetObj.length ){
		g220A.totalAmount = g220A.draggerObj.length;
		
	}
	//=================================================================
	//alert(g220A.totalAmount);
	
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
	$.each(g220A.draggerObj, function(index){
		//拖曳物件的原始陣列：由小到大：例0~2
		g220A.originalOrder[index] = index;
		$('.showInfo').append( g220A.originalOrder[index]+'/' );
	});
	
	$('.showInfo').append('<br>');
	
	//使用Array.sort()方法，●●●取得亂數排序
	g220A.newOrder = g220A.originalOrder.sort( method.randomJob );
	
	$.each(g220A.draggerObj, function(index){
		$('.showInfo').append( g220A.newOrder[index]+'/' );
	});
	
};
//========================================================


//
method.randomDraggerPosition = function(){
	//產生亂數排序陣列
	method.createRandomSortArr();	
	
	//
	$.each(g220A.originalOrder, function(index){
		g220A.draggerOuterIniArr[index] = $('.draggerOuter:eq(' + index + ')');
		//$('.showInfo').append(g220A.draggerOuterIniArr[index].html()+'/');
	});
	
	
	//
	$.each(g220A.originalOrder, function(index){
		$('.draggerOuter:eq(' + index + ')').remove();
	});
	
	//
	$.each(g220A.newOrder, function(index){
		g220A.draggerOuterIniArr[g220A.newOrder[index]].appendTo( $('.draggerZone') );
	});
	
	
};




//●○(_matchDraggerStr, _draggerObj, _dropTargetObj) ： (拖曳物件的類別名稱，包含前面的'.', 拖曳物件, 置放物件)
//●○ 《《《 B 》》》
method.droppableFunc = function(_matchDraggerStr, _draggerObj, _dropTargetObj, _draggerImgSrc, _dropTargetDataText){
	
	
	//●
	//==================================================《《《《《《《《
	if( _dropTargetObj ){
		
	_dropTargetObj.droppable({
		
		tolerance: "pointer", //tolerance：fit↑intersect↑pointer↑touch
		//http://api.jqueryui.com/droppable/#option-tolerance
		
		accept: _matchDraggerStr,
		
		drop: function( event, ui ) {   
			
			//
			g220A.acceptStr = _dropTargetObj.droppable( "option", "accept" );
			//alert( g220A.acceptStr );  
			
			
			//●○答題正確
			if( g220A.acceptStr === _matchDraggerStr ){
				
				
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
				//_draggerObj.css({'visibility':'hidden'});
				$(_matchDraggerStr).css({'visibility':'hidden'});
				
				
				//將.target appendTo .targetOuter
				//_draggerObj.appendTo( _draggerObj.parent() ).css({});
				//_draggerObj.css({'position':'relative'});
				//_draggerObj.animate({'left':'0px','top':'0px'},360);
				
				
				
				//拖曳到正確目標後，關掉拖曳功能。
				//_draggerObj.draggable( "option", "disabled", true );
				$(_matchDraggerStr).draggable( "option", "disabled", true );
				
				
				
				//●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○
				setTimeout(function(){
					//需將g220A.acceptStr賦値為空字串。(否則其他$(_matchDraggerStr)會失去「置放不正確時回到原位」的功能)
					g220A.acceptStr = "";
				},250);
				//●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○●○
				
				
				//清除先前class
				$('.feedbackZone .feedbackIcon').removeClass('feedbackIcon_wrong');
				$('.feedbackZone .feedbackString').removeClass('feedbackString_wrong');
				
				
				//答對：
				$('.feedbackZone .feedbackIcon').addClass('feedbackIcon_right');
				$('.feedbackZone .feedbackString').html('《 答對了 》').addClass('feedbackString_right'); 
				$(_matchDraggerStr).parent().addClass('draggerOuter_matching');
				
				
				//●○每一拖曳，答對時的回饋資訊 .correctFeedback。
				$('.correctFeedback').css({'visibility':'visible'}).html( '※您的答題：' + _dropTargetDataText );
				
				
				
				
				
				
				
				
				//●○計算：是否答完所有拖曳。
				//===================================================================
				//
				if( g220A.hasBeenCompleted < g220A.totalAmount ){
					g220A.hasBeenCompleted ++;
				}
				
				//
				if( g220A.hasBeenCompleted === g220A.totalAmount ){
					
					
					//●○把透明度不等於.draggerOuter_matching的.dragger都設成.draggerOuter_matching的透明度
					$.each(g220A.draggerObj, function(index){
						if ( g220A.draggerObj[index].css('opacity') !== parseFloat($('.draggerOuter_matching').css('opacity')) ){
							g220A.draggerObj[index].parent().css( 'opacity', parseFloat($('.draggerOuter_matching').css('opacity')) );
							g220A.draggerObj[index].draggable( "option", "disabled", true );
						}
					});
					
					
					
					//●○把透明度不等於.draggerOuter_matching的.dragger都設成.draggerOuter_matching的透明度
					$.each(g220A.dropTargetObj, function(index){ 
						//alert(g220A.dropTargetObj[index].attr('data-match'));
						
						if ( !g220A.dropTargetObj[index].attr('data-match') ){ 
							g220A.dropTargetObj[index].parent().parent().css( 'opacity', parseFloat($('.draggerOuter_matching').css('opacity')) );
						}
					});
					
					
					
					setTimeout(function(){
						
						//清除先前class
						$('.feedbackZone .feedbackIcon').removeClass('feedbackIcon_wrong');
						$('.feedbackZone .feedbackString').removeClass('feedbackString_wrong');
						$('.feedbackZone .feedbackIcon').removeClass('feedbackIcon_right');
						$('.feedbackZone .feedbackString').removeClass('feedbackString_right');
						
						//全部答對，您已經完成本單元。
						$('.feedbackZone .feedbackIcon').addClass('feedbackIcon_completed');
						var completedInfo = $('.completedInfo').html();
						$('.feedbackZone .feedbackString').html( completedInfo ).addClass('feedbackString_completed');
						
						
						//●○清空.correctFeedback(每一拖曳，答對時的回饋資訊)，但留一個全行空白字元。
						$('.correctFeedback').css({'visibility':'hidden'}).html('　');
						
						
					},1500);
					
					
				}
				//===================================================================
				
				
				
			}
		} 
		 
		
		
	});  
	
	}
	
	
	
	//●○處理拖曳錯誤
	//==================================================《《《《《《《《
	if ( _draggerObj ){
		
	_draggerObj.draggable({
		
		start:function(){
			
			//清空-答對或答錯的訊息：
			$('.feedbackZone .feedbackIcon').removeClass('feedbackIcon_right').removeClass('feedbackIcon_wrong');
			$('.feedbackZone .feedbackString').html( g220A.initFeedbackString ).removeClass('feedbackString_right').removeClass('feedbackString_wrong');
			
			
			//●○清空.correctFeedback(每一拖曳，答對時的回饋資訊)，但留一個全行空白字元。
			$('.correctFeedback').css({'visibility':'hidden'}).html('　');
			
		},
		
		stop:function(){
			
			//setTimeout(function(){
				//alert( g220A.acceptStr );
				
				
				//●○答題錯誤、或亂拖曳
				if( g220A.acceptStr === "" || g220A.acceptStr === undefined || !g220A.acceptStr ){
					
					//答題錯誤、或亂拖曳 之音效
					//=====================
					tPlayer.pause(1);
					tPlayer.seek(0,1);
					tPlayer.play(1);
					//=====================
					
					//alert( g220A.acceptStr );
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
	
	}
	
	
	
	//
	/*_draggerObj.on('mouseup',function(){
		
		setTimeout(function(){
			//alert( g220A.acceptStr );
			
			if( g220A.acceptStr === "" || g220A.acceptStr === undefined || !g220A.acceptStr ){
				
				//答題錯誤、或亂拖曳 之音效
				//=====================
				tPlayer.seek(0,1);
				tPlayer.play(1);
				//=====================
				
				//alert( g220A.acceptStr );
				_draggerObj.appendTo( _draggerObj.parent() ).css({});
				_draggerObj.css({'position':'relative'});
				_draggerObj.animate({'left':'0px','top':'0px'},360);
			}
			
		},200);
		
	});*/
		
	
	
};


//●○
method.mediaCompleted = function(index){
	tPlayer.pause(index);
	tPlayer.seek(0,index);
};



//●○ 《《《 A 》》》
function initDroppable(){
	
	//●○
	$.each(g220A.dropTargetObj, function(index) {
		//設定可置放
		g220A.dropTargetObj[index].droppable();
    });
	
	
	//●○
	$.each(g220A.draggerObj, function(index) {

		//設定可拖曳
        g220A.draggerObj[index].draggable({
			//revert: "valid", //設定：若未匹配，所拖曳物件自動返回原位置。(但此功能有瑕疵)
			snapMode: "inner"
		});
		
    });

	
	//●○
	$.each(g220A.draggerObj, function(index){
		method.droppableFunc( g220A.matchDraggerStr[index], g220A.draggerObj[index], g220A.dropTargetObj[index], g220A.draggerImgSrc[index], g220A.dropTargetDataText[index] );
	});

	//alert(g220A.matchDraggerStr);
}






//1041202
$(window).on('resize', function(){
	
	// IE6~IE8 - ※IE9在此處對window.attachEvent 則有反應
	method.lessThenIE9Css();
	
	
	//●○1060425 - G220A - 
	if($(window).width() <= param.breakpoint){
		
		$('.dragger').each(function(index, element) {
			$('.draggerOuter:eq(' + index + ')').css({'width':100/$('dragger').lenth+'%', 'height':$('.dragger:eq(' + index + ')').height()+6});
			$('.dragger:eq(' + index + ')').css({'width':'100%', 'height':$('.dragger:eq(' + index + ') img').height()});
		});
		
		
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
	if( g220A.usingRandomNumbers ){
		//拖曳項目的亂數排版處理
		method.randomDraggerPosition();
	}
	
	
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
	//method.choosePlayMode();
	method.deployment();
	
	//
	$('.mediaWrapper').each(function(index) {
		
		//
		//==============================================《●》
		//g220A.chooseSreamingOrLocalAudio在externalData.js設定為'local'。
		
		//●○1070212 - 新增
		urlObj = method.getStreamingData_localAudio(index);
		//==============================================《●》
		
		//●○1070212 - 新增
		method.choosePlayMode_localAudio(index);
		
		
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
	
	
	//點小圖跳大圖 - 這得在method.lessThenIE9Css()上方。
	method.createMagnifierIcon();
	
	//名詞解釋
	method.glossary();
	

});




//>>>=============================================================>>>
})(jQuery); //↑↑↑


























