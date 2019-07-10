// JavaScript Document - G2│tPlayer_Overlay.js
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
var g200A =  NOU.namespace('NOU.modules.g200A');
var g200B =  NOU.namespace('NOU.modules.g200B');
var g200C =  NOU.namespace('NOU.modules.g200C');
var g201A =  NOU.namespace('NOU.modules.g201A');
var g201B =  NOU.namespace('NOU.modules.g201B');
var g202 =  NOU.namespace('NOU.modules.g202');
var g203 =  NOU.namespace('NOU.modules.g203');
var g204A =  NOU.namespace('NOU.modules.g204A');
var g204B =  NOU.namespace('NOU.modules.g204B');
var g205 =  NOU.namespace('NOU.modules.g205');
var g206 =  NOU.namespace('NOU.modules.g206');
var g207 =  NOU.namespace('NOU.modules.g207');
var g208 =  NOU.namespace('NOU.modules.g208');
var g209A =  NOU.namespace('NOU.modules.g209A');
var g209B =  NOU.namespace('NOU.modules.g209B');
var g210A =  NOU.namespace('NOU.modules.g210A');
var g210B =  NOU.namespace('NOU.modules.g210B');
var g211A =  NOU.namespace('NOU.modules.g211A');
var g211B =  NOU.namespace('NOU.modules.g211B');
var g211C =  NOU.namespace('NOU.modules.g211C');
var g212A =  NOU.namespace('NOU.modules.g212A');
var g213A =  NOU.namespace('NOU.modules.g213A');
var g214A =  NOU.namespace('NOU.modules.g214A');
var g215A =  NOU.namespace('NOU.modules.g215A');
var g216A =  NOU.namespace('NOU.modules.g216A');
var g217A =  NOU.namespace('NOU.modules.g217A');
var g218A =  NOU.namespace('NOU.modules.g218A');
var g219A =  NOU.namespace('NOU.modules.g219A');
//------------------------
method.enableHelpControl = false;
//------------------------
//alert(method.enableHelpControl +' / ' + param.G2ID);

	
	
	//●需要時覆蓋用 - 務必小心服用。
	//----------------------------------------------------------《《
	//◎◎◎●Video - 若賦值為　'streaming'　- 則連結遠端串流影音檔 │ 若賦值為　'local'　- 則連結近端影音檔
	//param.chooseSreamingOrLocalVideo = "streaming";
	//----------------------------------------------------------《《

	
	
	//◎◎◎●1070122 - 測試用本機Wowza-暫時
	//param.streamingURLPrefix = "192.192.49.223:1935/vod/_definst_/"; //local Wowza Server
	
	//----------------------------------------------------------《
	//◎◎◎●1070122 - 串流來源前半段網址，需要時覆蓋用 - 務必小心服用
	//param.streamingURLPrefix = "lodm.nou.edu.tw/vod/_definst_/";
	//----------------------------------------------------------《
	//●○是否開啟fallback(http來源媒體)：true│false。(只能true。若false，IE就無法播放。)
	param.useHttpFallback = true;
	//----------------------------------------------------------《
	//●○1061123 - 暫時fallback之用的http來源：192.192.51.119/~terfict/
	//●○ - 新增 - 實際fallback之用的http來源：
	//----------------------------------------------------------《
	//param.httpURLPrefix = "192.192.51.119/~terfict/";
	//param.httpURLPrefix = "10.10.10.20/";  //◎◎◎http
	param.httpURLPrefix = "media-fallback.nou.edu.tw/";  //◎◎◎https
	//----------------------------------------------------------《
	//●○1070525 - 使用hls│smil，但不支援時，fallback備用來源的 「_+位元速率+mp4副檔名」 字串
	param.smilFallbackSuffix = "_1500.mp4";
	//----------------------------------------------------------《
	//預設HTML5 Video播放速度(通常為1.0)(7種數字可選擇：0.5、0.75、1.0、1.25、1.5、1.75、2.0)
	param.currPlaybackRate = param.defaultPlaybackRate  = 1.0;
	//----------------------------------------------------------《
	//1080318 - ★★★所在之iframe框架，或frameset之frame框架，其「name屬性值」 or 「0 base索引號」
	param.parentFrameName = [];
	//UU：frameset
	param.parentFrameName[0] = 's_main';
	//TL Moodle：iframe
	try{$('#scorm_object', parent.document).attr('name','scorm_object');}catch(err){}
	param.parentFrameName[1] = 'scorm_object';
	//本機版型：frameset (需透過本機web server瀏覽)
	param.parentFrameName[2] = 2 ;
	//本機版型：iframe (需透過本機web server瀏覽)
	param.parentFrameName[3] = 0 ;
	//----------------------------------------------------------《
	
	
	
	//1050823 - .toBigPic和.normalPic於小尺寸視窗時的上、右、下、左外距
	//----------------------------------------------------------《
	param.rwdPicMargin = {};
	param.rwdPicMargin.top = "auto";
	param.rwdPicMargin.right = "auto";
	param.rwdPicMargin.bottom = "10px";
	param.rwdPicMargin.left = "auto";
	//----------------------------------------------------------《
	
	
	
	
	method.helpControl = function(){

		//help連結網址 - 前半段 - 若不隱藏，會覆蓋所有externalData.js裡的設定
		//param.helpUrlRoot = "https://uu.nou.edu.tw/base/10001/door/tpl/";
		
		//help連結網址 - 後半段+組裝
		if(param.G2ID === "G201A"){
			//g201A.helpPath - 若不隱藏，會覆蓋G201A的externalData.js裡的設定
			//g201A.helpPath = "g2Help/html/g2Help_g201A/index.html";
			param.helpUrl = param.helpUrlRoot + g201A.helpPath;
		
		}else if(param.G2ID === "G201B"){
			//g201B.helpPath = "g2Help/html/g2Help_g201B/index.html";
			param.helpUrl = param.helpUrlRoot + g201B.helpPath;
			
		}else if(param.G2ID === "G202"){
			//g202.helpPath = "g2Help/html/g2Help_g202/index.html";
			param.helpUrl = param.helpUrlRoot + g202.helpPath;
			
		}else if(param.G2ID === "G203"){ 
			//g203.helpPath = "g2Help/html/g2Help_g203/index.html";
			param.helpUrl = param.helpUrlRoot + g203.helpPath;
			
		}else if(param.G2ID === "G204A"){
			//g204A.helpPath = "g2Help/html/g2Help_g204A/index.html";
			param.helpUrl = param.helpUrlRoot + g204A.helpPath;
			
		}else if(param.G2ID === "G204B"){
			//g204B.helpPath = "g2Help/html/g2Help_g204B/index.html";
			param.helpUrl = param.helpUrlRoot + g204B.helpPath;
			
		}else if(param.G2ID === "G205"){
			//g205.helpPath = "g2Help/html/g2Help_g205/index.html";
			param.helpUrl = param.helpUrlRoot + g205.helpPath;
			
		}else if(param.G2ID === "G206"){
			//g206.helpPath = "g2Help/html/g2Help_g206/index.html";
			param.helpUrl = param.helpUrlRoot + g206.helpPath;
			
		}else if(param.G2ID === "G207"){
			//g207.helpPath = "g2Help/html/g2Help_g207/index.html";
			param.helpUrl = param.helpUrlRoot + g207.helpPath;
			
		}else if(param.G2ID === "G208"){
			//g208.helpPath = "g2Help/html/g2Help_g208/index.html";
			param.helpUrl = param.helpUrlRoot + g208.helpPath;
			
		}else if(param.G2ID === "G209A"){
			//g209A.helpPath = "g2Help/html/g2Help_g209A/index.html";
			param.helpUrl = param.helpUrlRoot + g209A.helpPath;
			
		}else if(param.G2ID === "G209B"){
			//g209B.helpPath = "g2Help/html/g2Help_g209B/index.html";
			param.helpUrl = param.helpUrlRoot + g209B.helpPath;
			
		}else if(param.G2ID === "G210A"){
			//g210A.helpPath = "g2Help/html/g2Help_g210A/index.html";
			param.helpUrl = param.helpUrlRoot + g210A.helpPath;
			
		}else if(param.G2ID === "G210B"){
			//g210B.helpPath = "g2Help/html/g2Help_g210B/index.html";
			param.helpUrl = param.helpUrlRoot + g210B.helpPath;
			
		}else if(param.G2ID === "G211A"){ 
			//g211A.helpPath = "g2Help/html/g2Help_g211A/index.html";
			param.helpUrl = param.helpUrlRoot + g211A.helpPath;
			
		}else if(param.G2ID === "G211B"){
			//g211B.helpPath = "g2Help/html/g2Help_g211B/index.html";
			param.helpUrl = param.helpUrlRoot + g211B.helpPath;
			
		}else if(param.G2ID === "G211C"){
			//g211C.helpPath = "g2Help/html/g2Help_g211C/index.html";
			param.helpUrl = param.helpUrlRoot + g211C.helpPath;
			
		}else if(param.G2ID === "G212A"){
			//g212A.helpPath = "g2Help/html/g2Help_g212A/index.html";
			param.helpUrl = param.helpUrlRoot + g212A.helpPath;
			
		}else if(param.G2ID === "G213A"){
			//g213A.helpPath = "g2Help/html/g2Help_g213A/index.html";
			param.helpUrl = param.helpUrlRoot + g213A.helpPath;
			
		}else if(param.G2ID === "G214A"){
			//g214A.helpPath = "g2Help/html/g2Help_g214A/index.html";
			param.helpUrl = param.helpUrlRoot + g214A.helpPath;
		
		}else if(param.G2ID === "G215A"){
			//g215A.helpPath = "g2Help/html/g2Help_g215A/index.html";
			param.helpUrl = param.helpUrlRoot + g215A.helpPath;
			
		}else if(param.G2ID === "G216A"){
			//g216A.helpPath = "g2Help/html/g2Help_g216A/index.html";
			param.helpUrl = param.helpUrlRoot + g216A.helpPath;
			
		}else if(param.G2ID === "G217A"){
			//g217A.helpPath = "g2Help/html/g2Help_g217A/index.html";
			param.helpUrl = param.helpUrlRoot + g217A.helpPath;
			//alert(param.G2ID + '/' + param.helpUrl); //記得去上面打開開關：method.enableHelpControl = true;
					
		}else if(param.G2ID === "G218A"){
			//g218A.helpPath = "g2Help/html/g2Help_g218A/index.html";
			param.helpUrl = param.helpUrlRoot + g218A.helpPath;
			//alert(param.G2ID + '/' + param.helpUrl); //記得去上面打開開關：method.enableHelpControl = true;
					
		}else if(param.G2ID === "G219A"){
			//g219A.helpPath = "g2Help/html/g2Help_g219A/index.html";
			param.helpUrl = param.helpUrlRoot + g219A.helpPath;
			//alert(param.G2ID + '/' + param.helpUrl); //記得去上面打開開關：method.enableHelpControl = true;
					
		}else{
			param.helpUrl = param.helpUrlRoot + 'g2Help/html/g2Help/index.html';
		}
	
	};

	//
	if(method.enableHelpControl){
		method.helpControl();
	}


//>>>=============================================================>>>
})(jQuery); //↑↑↑














































