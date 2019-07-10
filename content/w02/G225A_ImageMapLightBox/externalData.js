// JavaScript Document - G225A│externalData.js
//-----------------------------------------------------
var NOU = NOU || {};
//-----------------------------------------------------

(function(){ //↓↓↓
//>>>=============================================================>>>
var tPlayer = NOU.namespace('NOU.modules.tPlayer');
//------------------------
var param = NOU.namespace('NOU.modules.tPlayer.param');
//------------------------
var g225A =  NOU.namespace('NOU.modules.g225A');
//------------------------
param.G2ID = "G225A";
//------------------------


	//----------------------------------------------------------《《《
	//'streaming'：連結遠端串流影音檔│'local'：連結近端影音檔│"else"：連結任意完整有效網址
	//----------------------------------------------------------《《《

	
	//---------------------------------------------------------
	//help連結網址 - 前半段
	param.helpUrlRoot = "https://uu.nou.edu.tw/base/10001/door/tpl/";
	//help連結網址 - 後半段
	g225A.helpPath = "g2Help/html/g2Help_g225A/index.html";
	//help連結網址 - 完整
	param.helpUrl = param.helpUrlRoot + g225A.helpPath;
	//---------------------------------------------------------

	
	
	//◎RWD寬度斷點。請勿修改。此寬度以下，會跑不同的播放介面UI。
	//----------------------------------------------------------《《《
	//param.breakpoint：RWD斷點。
	//g225A_Overlay.css最下方的[Media Query]所設的斷點數值 必須和這裏一致。
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
	param.bgScope2Img_definedHeight[0] = ['top',30];
	//-----------------------------------------------
	//follow：會跟隨小圖的Y位置(小圖上緣)，並根據陣列第2個元素的數值，(加或減)計算css的top的位置
	//param.bgScope2Img_definedHeight[0] = ['follow',-80];
	//-----------------------------------------------
	//follow_middle：會跟隨小圖的Y位置(小圖上緣)，加上小圖的1/2高度，減去大圖的1/2高度，做為大圖css的top的位置
	//param.bgScope2Img_definedHeight[0] = ['follow_middle'];
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
	


	

	//Prototype Js
	//******************************************************************************
	param.jsArr = [];
	param.jsArr[0] = param.mainPath + "g225A_ImageMapLightBox/g225A_Overlay.js";
	param.jsArr[1] = param.mainPath + "tPlayer/tPlayer_Overlay.js";
	param.jsArr[2] = param.mainPath + "Global.js";
	param.jsArr[3] = param.mainPath + "tPlayer/tPlayer.js";
	param.jsArr[4] = param.mainPath + "g225A_ImageMapLightBox/g225A_ImageMapLightBox.js";
	//******************************************************************************
	
	
	//Lib JS
	//******************************************************************************
	param.libsArr = [];
	param.libsArr[0] = param.mainPath + "lib/jquery-1.11.1.min.js";
	param.libsArr[1] = param.mainPath + "lib/jquery-migrate-1.2.1.min.js";
	param.libsArr[2] = param.mainPath + "lib/jquery-ui-1.11.4.min.js";
	param.libsArr[3] = param.mainPath + "lib/jquery.ui.touch-punch.min.js";
	param.libsArr[4] = param.mainPath + "g225A_ImageMapLightBox/jquery.rwdImageMaps.min.js";
	param.libsArr[5] = param.mainPath + "g225A_ImageMapLightBox/colorbox/jquery.colorbox-min.js";
	param.libsArr[6] = param.mainPath + "prog/APIWrapper.js";
	param.libsArr[7] = param.mainPath + "prog/SCOFunctions.js";
	param.libsArr[8] = param.mainPath + "prog/init.js";
	//******************************************************************************
	param.jQMobilePath = param.mainPath + "lib/jquery.mobile.custom.min.js";


	//CSS - 目前沒用到
	//******************************************************************************
	param.cssArr = [];
	param.cssArr[0] = param.mainPath + "tPlayer_CSS/preloadMe.css";
	param.cssArr[1] = param.mainPath + "tPlayer_CSS/tPlayer.css";
	param.cssArr[2] = param.mainPath + "g225A_ImageMapLightBox/g225A_Overlay.css";
	//******************************************************************************


//>>>=============================================================>>>
})(); //↑↑↑






