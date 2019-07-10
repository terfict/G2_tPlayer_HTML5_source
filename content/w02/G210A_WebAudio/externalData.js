// JavaScript Document - G210A│externalData.js
//-----------------------------------------------------
var NOU = NOU || {};
//-----------------------------------------------------

(function($){ //↓↓↓
//>>>=============================================================>>>
var tPlayer = NOU.namespace('NOU.modules.tPlayer');
//------------------------
var param = NOU.namespace('NOU.modules.tPlayer.param');
//------------------------
var g210A =  NOU.namespace('NOU.modules.g210A');
//------------------------
param.G2ID = "G210A";
//------------------------


	//----------------------------------------------------------《《《
	//'streaming'：連結遠端串流影音檔│'local'：連結近端影音檔│"else"：連結任意完整有效網址
	param.chooseSreamingOrLocalVideo = "streaming"; //

	//◎◎◎本地端放置 mp3語音檔 和 mp4影音檔 的目錄路徑，必須包含正斜線「/」
	param.localDirectoryRoot = "../../localMedia/";

	//課程代碼
	param.courseCode = "5298";
	//streaming時：語音、影音檔網址路徑前置詞(前半段網址)
	param.streamingURLPrefix = "lodm.nou.edu.tw/vod/_definst_/";
	//----------------------------------------------------------《《《
	
	
	//----------------------------------------------------------《《《
	//●In-Video Quiz 偵測到暫停點，延遲XXX毫秒(ms)，再暫停。
	param.pauseDelayTime = 250; //●以毫秒(ms)為單位。300為預設值。
	param.pauseDelayTimeH5 = 200;
	//----------------------------------------------------------《《《
	//Flash媒體預設寬高，不需修改 - 當再HTML裡沒有設定寬高時，會來抓這裡的寬高。
	param.as3VideoScopeWidth = 640;
	param.as3VideoScopeHeight = 360;
	param.swfScopeWidth = param.as3VideoScopeWidth;
	param.swfScopeHeight = param.as3VideoScopeHeight;
	//※測試用 - 遮擋Flash媒體區塊的span，其透明度在此控制 (遮擋的目的在優化及解決IE的一些異狀)
	param.mediaDivOverlayOpacity = 0.0; //務必為0.0
	//----------------------------------------------------------《《《
	//HTML5媒體預設寬高，不需修改 - 當再HTML裡沒有設定寬高時，會來抓這裡的寬高。
	param.h5VideoScopeWidth = param.as3VideoScopeWidth;
	param.h5VideoScopeHeight = param.as3VideoScopeHeight;
	//----------------------------------------------------------《《《
	//全畫面時，遮擋下方網頁物件的半透明div的透明度設定
	param.mediaWallOpacity = 0.8;
	//----------------------------------------------------------《《《
	//是否出現自訂播放控制介面 - 一定要出現 - true│false
	param.hasCustomControls = true;
	//----------------------------------------------------------《《《
	
	
	//●↓↓↓ - 跳出燈箱提示面板_參數
	//----------------------------------------------------------《《《
	//跳出燈箱時，遮擋下方教材物件的Div的透明度
	param.opacityValue = 0.8;
	//設定遇到何種裝置時，跳出自訂警示盒 - 維持'all'不變
	//all：所有裝置(包括桌機、筆電、行動裝置...etc.) │ mobile：行動裝置 │ ios：ios裝置 │ android：android裝置
	param.targetCondition = 'all'; //維持'all'就好。
	//計算燈箱位置之用的外層範圍高度
	param.lightboxOuterHeightScope = 600;
	//燈箱的「關閉按鈕」x和y位置微調參數
	param.lightboxCloseBtnOffsetX = -50;
	param.lightboxCloseBtnOffsetY = 50;
	//----------------------------------------------------------《《《
	
	
	//媒體標題列各個icon圖示屬性
	//----------------------------------------------------------《《《
	//是否出現「Nou Media」Icon - true│false
	param.hasNOUMediaIconFlag = true;
	//「Nou Media」alt註解文字
	param.nouMediaComment = '「Nou Media Icon」';
	//NOU_Media Icon圖檔連結路徑 - 若留空白，會到tPlayer_CSS/images/目錄內抓圖
	param.nouMediaIconPath = "../../CommonG2/g210A_WebAudio/images/nou_media@g210A.png";
	//---------------------------------------------------------
	//是否出現旭聯平台/課程「筆記本」notebook按鈕 - true│false
	param.hasNotebookFlag = false;
	//◎旭聯平台/課程「筆記本」啟動網址 (原名：個人筆記)
	param.notebookUrl = "https://uu.nou.edu.tw/message/write.php?commonuse=true";
	//「筆記本」alt註解文字
	param.notebookComment = '開啟「筆記本」';
	//notebook圖檔路徑 - 若留空白，會到tPlayer_CSS/images/目錄內抓圖
	param.notebookIconPath = "";
	//notebook滑鼠over其上的圖檔路徑 - 若留空白，會到tPlayer_CSS/images/目錄內抓圖
	param.notebookIconOverPath = "";
	//---------------------------------------------------------
	//是否出現「新手上路」help按鈕 - true│false
	param.hasHelpFlag = true;
	//---------------------------------------------------------
	//help連結網址 - 前半段
	param.helpUrlRoot = "https://uu.nou.edu.tw/base/10001/door/tpl/";
	//help連結網址 - 後半段
	g210A.helpPath = "g2Help/html/g2Help_g210A/index.html";
	//help連結網址 - 完整
	param.helpUrl = param.helpUrlRoot + g210A.helpPath;
	//---------------------------------------------------------
	//「新手上路」alt註解文字
	param.helpComment = "開啟「新手上路」";
	//help icon圖檔路徑 - 若留空白，會到tPlayer_CSS/images/目錄內抓圖
	param.helpIconPath = "";
	//help icon滑鼠over其上的圖檔路徑 - 若留空白，會到tPlayer_CSS/images/目錄內抓圖
	param.helpIconOverPath = "";
	//---------------------------------------------------------
	//媒體介面是否有進場jQ動作 ? - true│false
	param.hasEnteringMotion = false;
	//----------------------------------------------------------《《《
	
	
	//◎RWD寬度斷點。請勿修改。此寬度以下，會跑不同的播放介面UI。
	//----------------------------------------------------------《《《
	//param.breakpoint：RWD斷點。
	//g210A_Overlay.css最下方的[Media Query]所設的斷點數值 必須和這裏一致。
	param.breakpoint = 769;
	//-----------------------------------------------
	//◎↓針對小裝置所設評量寬度斷點，寬度低於此數字，#quizDiv的高度會設為100%，讓評量可以一內容高度伸展。
	//但在某些寬度，有時評量的高度會小於#quizDiv高度，
	param.breakpointQuiz = 640; 
	//----------------------------------------------------------《《《
	
	
	//◎「點小圖放大圖」 - 跳出大圖的位置計算方式
	//----------------------------------------------------------《《《
	//寬度：
	/* 定義一個頁面寬度，此數值的1/2為中心點，會被放大之大圖的中心點所對齊，之後再加上bigImagePosOffsetX微調參數 */
	// 若為0，會被HTML文件所在框架寬度的中心點所對齊，之後再加上param.bigImagePosOffsetX微調參數 
	//var bgScope2Img_definedWidth = 800;
	param.bgScope2Img_definedWidth = 0;
	//==========================================================
	//高度：
	//宣告bgScope2Img_definedHeight變數，先初始化為空陣列 - ※此行勿修改
	param.bgScope2Img_definedHeight = [];
	//-----------------------------------------------
	//middle：會根據陣列第2個元素的數值，定義一個頁面高度，此數值的1/2為中心點，會被影音的垂直方向中心點所對齊，
	//之後再加上垂直捲軸捲動的距離，加上param.bigImagePosOffsetY微調參數
	//param.bgScope2Img_definedHeight[0] = ['middle',700];
	//-----------------------------------------------
	//top：會根據陣列第2個元素的數值，加上垂直捲軸捲動的距離，加上param.bigImagePosOffsetY微調參數，作為css的top的位置
	//param.bgScope2Img_definedHeight[0] = ['top',30];
	//-----------------------------------------------
	//follow：會跟隨小圖的Y位置(小圖上緣)，並根據陣列第2個元素的數值，(加或減)計算css的top的位置
	//param.bgScope2Img_definedHeight[0] = ['follow',-80];
	//-----------------------------------------------
	//follow_middle：會跟隨小圖的Y位置(小圖上緣)，加上小圖的1/2高度，減去大圖的1/2高度，做為大圖css的top的位置
	param.bgScope2Img_definedHeight[0] = ['follow_middle'];
	//==========================================================
	//「點小圖放大圖」之大圖 x位置 微調參數
	param.bigImagePosOffsetX = -0;
	//「點小圖放大圖」之大圖 y 位置 微調參數
	param.bigImagePosOffsetY = -0;
	//-----------------------------------------------
	//不管圖形是否有「點小圖放大圖」：●圖形在小尺寸視窗時，排板寬度(未放大的狀態)
	//包括.toBigPic 和 .normalPic
	param.rwdSmallWindowImgPercent = "100%";
	//----------------------------------------------------------《《《
	
	
	//「名詞解釋glossary」
	//----------------------------------------------------------《《《
	//「名詞解釋glossary」在小尺寸視窗出現時，為視窗寬度乘以 0.x ~ 1.0 (不可為0)
	param.rwdSmallWindowGlossaryWidthPercent = 0.9;
	//----------------------------------------------------------《《《



	//填寫共用Js 的網址路徑
	param.mainPath = "../../CommonG2/";
	param.jQMobilePath = param.mainPath + "lib/jquery.mobile.custom.min.js";
	//******************************************************************************
	param.jsArr = [];
	param.jsArr[0] = param.mainPath + "g210A_WebAudio/g210A_Overlay.js";
	param.jsArr[1] = param.mainPath + "tPlayer/tPlayer_Overlay.js";
	param.jsArr[2] = param.mainPath + "Global.js";
	param.jsArr[3] = param.mainPath + "tPlayer/tPlayer.js";
	param.jsArr[4] = param.mainPath + "g210A_WebAudio/g210A_WebAudio.js";
	//******************************************************************************








//>>>=============================================================>>>
})(jQuery); //↑↑↑






