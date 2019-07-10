// JavaScript Document - G200C2│externalData.js
//-----------------------------------------------------
var NOU = NOU || {};
//-----------------------------------------------------

(function($){ //↓↓↓
//>>>=============================================================>>>
var tPlayer = NOU.namespace('NOU.modules.tPlayer');
//------------------------
var param = NOU.namespace('NOU.modules.tPlayer.param');
//------------------------
var g200C2 =  NOU.namespace('NOU.modules.g200C2');
//------------------------
param.G2ID = "G200C2";
//------------------------

	
	
	//----------------------------------------------------------《《《
	//help連結網址 - 前半段
	param.helpUrlRoot = "https://uu.nou.edu.tw/base/10001/door/tpl/";
	//help連結網址 - 後半段
	g200C2.helpPath = "";
	//help連結網址 - 完整
	param.helpUrl = param.helpUrlRoot + g200C2.helpPath;
	//---------------------------------------------------------
	//「新手上路」alt註解文字
	param.helpComment = "開啟「新手上路」";
	//help icon圖檔路徑 - 若留空白，會到tPlayer_CSS/images/目錄內抓圖
	param.helpIconPath = "";
	//help icon滑鼠over其上的圖檔路徑 - 若留空白，會到tPlayer_CSS/images/目錄內抓圖
	param.helpIconOverPath = "";
	//----------------------------------------------------------《《《

	
	
	//◎RWD寬度斷點。請勿修改。此寬度以下，會跑不同的播放介面UI。
	//----------------------------------------------------------《《《
	//param.breakpoint：RWD斷點。
	//g200C2_Overlay.css最下方的[Media Query]所設的斷點數值 必須和這裏一致。
	param.breakpoint = 769;
	//-----------------------------------------------
	
	


	//填寫共用Js 的網址路徑
	param.mainPath = "../../CommonG2/";
	param.jQMobilePath = param.mainPath + "lib/jquery.mobile.custom.min.js";
	//******************************************************************************
	param.jsArr = [];
	param.jsArr[0] = param.mainPath + "g200C2_LearningSchedules/g200C2_Overlay.js";
	param.jsArr[1] = param.mainPath + "tPlayer/tPlayer_Overlay.js";
	param.jsArr[2] = param.mainPath + "Global.js";
	param.jsArr[3] = param.mainPath + "tPlayer/tPlayer.js";
	param.jsArr[4] = param.mainPath + "g200C2_LearningSchedules/g200C2_LearningSchedules.js";
	//******************************************************************************








//>>>=============================================================>>>
})(jQuery); //↑↑↑






