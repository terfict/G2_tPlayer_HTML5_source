// JavaScript Document - G216A│externalData.js
//-----------------------------------------------------
var NOU = NOU || {};
//-----------------------------------------------------

(function($){ //↓↓↓
//>>>=============================================================>>>
var tPlayer = NOU.namespace('NOU.modules.tPlayer');
//------------------------
var param = NOU.namespace('NOU.modules.tPlayer.param');
//------------------------
var g216A =  NOU.namespace('NOU.modules.g216A');
//------------------------
param.G2ID = "G216A";
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
	param.nouMediaIconPath = "";
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
	g216A.helpPath = "g2Help/html/g2Help_g216A/index.html";
	//help連結網址 - 完整
	param.helpUrl = param.helpUrlRoot + g216A.helpPath;
	//---------------------------------------------------------
	//「新手上路」alt註解文字
	param.helpComment = "開啟「新手上路」";
	//help icon圖檔路徑 - 若留空白，會到tPlayer_CSS/images/目錄內抓圖
	param.helpIconPath = "";
	//help icon滑鼠over其上的圖檔路徑 - 若留空白，會到tPlayer_CSS/images/目錄內抓圖
	param.helpIconOverPath = "";
	//---------------------------------------------------------
	//媒體介面是否有進場jQ動作 ? - true│false
	param.hasEnteringMotion = true;
	//----------------------------------------------------------《《《
	
	
	//◎RWD寬度斷點。請勿修改。此寬度以下，會跑不同的播放介面UI。
	//----------------------------------------------------------《《《
	//param.breakpoint：RWD斷點。
	//g216A_Overlay.css最下方的[Media Query]所設的斷點數值 必須和這裏一致。
	param.breakpoint = 800;
	//-----------------------------------------------
	//◎↓針對小裝置所設評量寬度斷點，寬度低於此數字，#quizDiv的高度會設為100%，讓評量可以一內容高度伸展。
	//但在某些寬度，有時評量的高度會小於#quizDiv高度，
	param.breakpointQuiz = 640; 
	//----------------------------------------------------------《《《
	
	
	
	
	//g216A
	//----------------------------------------------------------《《《
	g216A.prevNextBtnOpacity = 1.0; //下一頁、上一頁按鈕的透明度
	g216A.prevNextBtnEdgeOpacity = 0.5; //於最後一頁時，下一頁按鈕的透明度。於第一頁時，上一頁按鈕的透明度。
	g216A.menuZoneOpacity = 0.95; //下拉選單的透明度
	g216A.menuHeader = "《 換頁選單 》"; //下拉選單的標題列文字
	//-----------------------------------------------
	//因為內頁多了一列數字鈕(.numButtonNReturnContainerDiv)，需微調增加斷點寬度，否則視窗未到達斷點寬度時，影音就已往下掉。
	//.numButtonNReturnContainerDiv寬度為50px，加上影片寬度800px，為850px。
	//寬度縮到到達850px時，.numButtonNReturnContainerDiv就會做rwd小尺寸處理。(隱藏，或改為水平排列)
	g216A.breakpointOffset = g216A.numButtonNReturnContainerDivWidth = 50; 
	/*微調[IE進旭聯被降階渲染]內頁按鈕選單容器.numButtonNReturnContainerDiv的高度*/
	g216A.numButtonNReturnContainerDivHeightOffset = 20;
	//-----------------------------------------------
	//.g216A_card > .mediaIconDiv 的循環背景色配置。
	g216A.cardBgColor = [];
	g216A.cardBgColor[0] = '#f10382';
	g216A.cardBgColor[1] = '#ff5700';
	g216A.cardBgColor[2] = '#00c148';
	g216A.cardBgColor[3] = '#0099f5';
	g216A.cardBgColor[4] = '#c8dd64';
	g216A.cardBgColor[5] = '#4ebb77';
	//----------------------------------------------------------《《
	
	



	//填寫共用Js 的網址路徑
	param.mainPath = "../../CommonG2/";
	param.jQMobilePath = param.mainPath + "lib/jquery.mobile.custom.min.js";
	//******************************************************************************
	param.jsArr = [];
	param.jsArr[0] = param.mainPath + "g216A_MultiScreenRecord/g216A_Overlay.js";
	param.jsArr[1] = param.mainPath + "tPlayer/tPlayer_Overlay.js";
	param.jsArr[2] = param.mainPath + "Global.js";
	param.jsArr[3] = param.mainPath + "tPlayer/tPlayer.js";
	param.jsArr[4] = param.mainPath + "g216A_MultiScreenRecord/g216A_MultiScreenRecord.js";
	//******************************************************************************








//>>>=============================================================>>>
})(jQuery); //↑↑↑






