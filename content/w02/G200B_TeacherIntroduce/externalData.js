// JavaScript Document - G200B│externalData.js
//-----------------------------------------------------
var NOU = NOU || {};
//-----------------------------------------------------

(function($){ //↓↓↓
//>>>=============================================================>>>
var tPlayer = NOU.namespace('NOU.modules.tPlayer');
//------------------------
var param = NOU.namespace('NOU.modules.tPlayer.param');
//------------------------
var g200B =  NOU.namespace('NOU.modules.g200B');
//------------------------
param.G2ID = "G200B";
//------------------------

	
	
	//----------------------------------------------------------《《《
	//help連結網址 - 前半段
	param.helpUrlRoot = "https://uu.nou.edu.tw/base/10001/door/tpl/";
	//help連結網址 - 後半段
	g200B.helpPath = "";
	//help連結網址 - 完整
	param.helpUrl = param.helpUrlRoot + g200B.helpPath;
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
	//g200B_Overlay.css最下方的[Media Query]所設的斷點數值 必須和這裏一致。
	param.breakpoint = 769;
	//-----------------------------------------------
	
	


	//填寫共用Js 的網址路徑
	param.mainPath = "../../CommonG2/";
	param.jQMobilePath = param.mainPath + "lib/jquery.mobile.custom.min.js";
	//******************************************************************************
	param.jsArr = [];
	param.jsArr[0] = param.mainPath + "g200B_TeacherIntroduce/g200B_Overlay.js";
	param.jsArr[1] = param.mainPath + "tPlayer/tPlayer_Overlay.js";
	param.jsArr[2] = param.mainPath + "Global.js";
	param.jsArr[3] = param.mainPath + "tPlayer/tPlayer.js";
	param.jsArr[4] = param.mainPath + "g200B_TeacherIntroduce/g200B_TeacherIntroduce.js";
	//******************************************************************************








//>>>=============================================================>>>
})(jQuery); //↑↑↑






