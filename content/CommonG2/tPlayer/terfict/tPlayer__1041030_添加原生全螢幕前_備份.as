package terfict {

	import flash.display.Sprite;
	import flash.external.ExternalInterface;
	import flash.text.TextField;
	import flash.text.TextFieldType;
	import flash.text.TextFieldAutoSize;
	import flash.system.Security;
	import flash.display.Stage;
	import flash.display.StageDisplayState;
	import flash.media.Video;
	import flash.net.NetConnection;
	import flash.net.NetStream;
	import flash.display.StageScaleMode;
	import flash.display.StageAlign;
	import flash.display.Loader;
	import flash.external.ExternalInterface;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.events.FullScreenEvent;
	import flash.events.NetStatusEvent;
	import flash.events.SecurityErrorEvent;
	import flash.utils.Timer;
	import flash.events.TimerEvent;
	import flash.display.MovieClip;
	import flash.display.StageQuality;
	import flash.geom.Rectangle;
	import flash.net.LocalConnection;
	import terfict.customEvents.JackCustomEventParam;
	import flash.events.EventDispatcher;
	import flash.display.LoaderInfo;
	import flash.media.Sound;
	import flash.media.SoundChannel;
	import flash.media.SoundLoaderContext;
	import flash.media.SoundMixer;
	import flash.media.SoundTransform;
	import flash.media.SoundCodec;



	public class tPlayer extends Sprite {

		private var video: Video;
		private var videoWrapper: MovieClip;
		private var nc: NetConnection;
		private var ns: NetStream;
		private var videoCurrTime: Number;
		private var videoTotalTime: Number;

		private var urlForAs3Arr: Array;
		private var param: Object;

		private var chooseSreamingOrLocalVideo: String;
		private var chooseSreamingOrLocalAudio: String;
		private var streamingURLPrefix: String;
		private var courseCode: String;
		private var localDirectoryRoot: String;
		private var mediaURLArr:Array;
		private var mediaFileExtArr:Array;
		//private var videoURL: String;
		private var targetPath: String;
		private var targetURLPrefix: String;
		private var ncProtocol: String;
		private var playbackTech: String;

		private var flashVideoAutoPlay: Boolean;
		private var mediaWidthArr: Array;
		private var mediaHeightArr: Array;
		private var swfScopeWidthArr: Array;
		private var swfScopeHeightArr: Array;
		private var updateCurrTimeTimer: Timer;

		public var pauseBtn: MovieClip;
		public var playBtn: MovieClip;
		public var stopBtn: MovieClip;
		public var togglePauseBtn: MovieClip;
		public var fullScreenBtn: MovieClip;
		public var normalBtn: MovieClip;

		private var conn: LocalConnection;
		private var currIndex: uint;


		public function tPlayer() {
			// constructor code
			super();
			this.stageUtils();

			//====================
			Security.allowDomain("*");
			//====================
			this.isJavaScriptReady();
			//====================
			//this.localConn();
			//====================


		}

		/*stage屬性設置*/
		private function stageUtils(): void {
			//●○●○●○ 1040612 - StageScaleMode.EXACT_FIT
			//-------------------------------------------------------------
			this.stage.scaleMode = StageScaleMode.EXACT_FIT;
			//-------------------------------------------------------------
			this.stage.frameRate = 24;
			this.stage.align = StageAlign.TOP_LEFT;
			this.stage.quality = StageQuality.HIGH;
			//trace("stageUtils()================");
			//trace("================");

			//
			//this.addEventListener(Event.RESIZE,resizeEventHandler,false,0,false);

			this.addEventListener(Event.ADDED_TO_STAGE, addedToStage, false, 0, false);
			return;
		}

		//未使用
		private function resizeEventHandler(event: Event): void {
			//
			var swfWidth: int = this.stage.stageWidth;
			var swfHeight: int = this.stage.stageHeight;

			// Resize the video window. 
			//var newVideoHeight:Number = swfHeight; 
			this.video.height = this.stage.stageHeight;

			this.video.width = this.stage.stageWidth;
			//this.player.scaleX = this.player.scaleY; //這，當滾輪縮放後寬度不準確

			//必須加上這段，由全螢幕恢復一般畫面時，Video的寬高和位置才會正確
			//FLVPlayback.scaleMode	屬性 --- 檢視Help說明
			//http://help.adobe.com/zh_TW/FlashPlatform/reference/actionscript/3/fl/video/FLVPlayback.html#scaleMode
			/*this.video.registrationX = 0;
			this.video.registrationY = 0;
			this.video.registrationWidth = swfWidth;
			this.video.registrationHeight = swfHeight;*/

		}

		private function addedToStage(event: Event): void {
			this.removeEventListener(Event.ADDED_TO_STAGE, addedToStage);
			this.addEventListener(Event.REMOVED_FROM_STAGE, removedFromStage, false, 0, false);

			//在IDE環境預覽，不允許全螢幕，所以trace為false
			//trace('allowsFullScreen：' + this.stage.allowsFullScreen);
			//FullScreenEvent.FULL_SCREEN事件
			if (this.stage.allowsFullScreen) {
				this.stage.addEventListener(FullScreenEvent.FULL_SCREEN, fullScreenEventHandler);
			}

			//trace("addToStage()================");
			//trace("================");

			//====================
			this.initData();
			//====================
			//this.getParametersFmJs();
			
			


			return;
		}
		
		private function mouseMoveHandler(event:MouseEvent):void{
			this.stage.removeEventListener(MouseEvent.MOUSE_MOVE,mouseMoveHandler);
		}
		

		private function removedFromStage(event: Event): void {
			this.removeEventListener(Event.REMOVED_FROM_STAGE, removedFromStage);
			return;
		}

		private function initData(): void {
			this.urlForAs3Arr = [];
			this.param = {};
			this.mediaURLArr = [];
			this.mediaFileExtArr = [];
			this.mediaWidthArr = [];
			this.mediaHeightArr = [];
			this.swfScopeWidthArr = [];
			this.swfScopeHeightArr = [];
			this.videoCurrTime = 0;
			this.currIndex = 0;
		}

		//目前未用到
		//===========================================
		private function localConn(): void {
			conn = new LocalConnection();
			conn.client = this;
			try {
				conn.connect("swfConn");
			} catch (error: ArgumentError) {
				trace("Can't connect...the connection name is already being used by another SWF");
			}
		}

		public function lcToFullScreen(): void {
			//this.pauseHandler(null);
			//this.toFullScreenHandler(null);
			//var otherSwfClicked:JackCustomEventParam = new JackCustomEventParam(JackCustomEventParam.VIDEO_TO_FULLSCREEN,null,true,false);
			//JackCustomEventParam.dispatcher.dispatchEvent(otherSwfClicked);

			/*if(this.stage.displayState == "normal"){
				this.stage.displayState = StageDisplayState.FULL_SCREEN; 
				this.pauseHandler(null);
			}*/


			//this.pauseHandler(null);
		}

		private function clickedListener(): void {
			JackCustomEventParam.dispatcher.addEventListener(JackCustomEventParam.VIDEO_TO_FULLSCREEN, lcToFullScreenHandler);
		}

		private function lcToFullScreenHandler(event: JackCustomEventParam): void {
			this.toFullScreenHandler(null);
			this.pauseHandler(null);
		}
		//===========================================


		//※※※ 檢測「HTML+CSS+JavaScript」是否已經已經準備就緒 ※※※
		private function isJavaScriptReady(): void {

			if (ExternalInterface.available) {

				try {

					//output.appendText("Adding callback...\n");

					//
					if (checkJavaScriptReady()) {
						this.jsReadyMethod();

					} else {
						//output.appendText("JavaScript is not ready, creating timer.\n");
						//JavaScript is not ready，。。。持續檢測，直到JavaScript is ready.
						var readyTimer: Timer = new Timer(100, 0);
						readyTimer.addEventListener(TimerEvent.TIMER, timerHandler);
						readyTimer.start();
					}


				} catch (error: SecurityError) {

					//output.appendText("A SecurityError occurred: " + error.message + "\n");

				} catch (error: Error) {

					//output.appendText("An Error occurred: " + error.message + "\n");

				}
			} else {
				//output.appendText("External interface is not available for this container.");
			}
		}

		//JavaScript is not ready，。。。持續檢測，直到JavaScript is ready.
		private function timerHandler(event: TimerEvent): void {
			
			//output.appendText("Checking JavaScript status...\n");
			if (checkJavaScriptReady()) {
				Timer(event.currentTarget).stop();
				Timer(event.currentTarget).removeEventListener(TimerEvent.TIMER, timerHandler);
				
				this.jsReadyMethod();
			}
		}

		private function checkJavaScriptReady(): Boolean {
			var isReady: Boolean = ExternalInterface.call("tPlayer.isJsReadyFunc");
			return isReady;
		}

		//
		private function jsReadyMethod(): void {

			//output.appendText("Flash says: JavaScript is ready.\n");
			//output.appendText("ExternalInterface.objectID = " + ExternalInterface.objectID + "\n");

			var response: String = ExternalInterface.call("tPlayer.receiveFlashOk", "Flash says：Flash OK."); //在JS顯示
			//output.appendText("●調用Js的tPlayer.receiveFlashOk，return回來：\n" + response + "\n");


			//1040416 ●○●○●○●○●○●○●○●○
			//=======================================================
			var swfId: String = ExternalInterface.objectID; //取得HTML裡<object>標籤的id字串
			var tmp: int = swfId.indexOf('_'); //取得'_'的索引值
			this.currIndex = uint(swfId.substring(tmp + 1)); //取得底線之後的所有整數字串

			//
			ExternalInterface.call("tPlayer.receiveFlashOk", 'currIndex : ' + this.currIndex); //在JS顯示this.currIndex

			//※※※ 傳值到JS ※※※ ●1040504發覺可有效將this.currIndex傳值到JS，指定給param.currIndex
			//ExternalInterface.call("tPlayer.currIndexFunc", this.currIndex);
			//=======================================================


			//●●●取得JS資料●●●
			//=======================
			this.getUrlFmJs();
			//=======================
			this.getParametersFmJs();
			//=======================

			//====================
			this.initMedia();
			//====================
			
			//this.stage.addEventListener(MouseEvent.MOUSE_MOVE,mouseMoveHandler);

		}

		//◎※● 調用容器HTML/JS的 tPlayer.urlForTPlayer()函式，取得媒體播放相關URL資訊
		private function getUrlFmJs(): void {
			//取得JS中的 urlObj.rtmpMediaURLArr --> 這在choosePlayMode()中定義
			this.urlForAs3Arr = ExternalInterface.call("tPlayer.urlForTPlayer");
			//●●●
			this.targetPath = this.urlForAs3Arr[this.currIndex];
		}

		//◎※● 調用容器HTML/JS的js_parametersForTPlayer()函式，取得AS3需要的相關屬性
		private function getParametersFmJs(): void {

			//●●●調用 tPlayer.parametersForTPlayer
			this.param = ExternalInterface.call("tPlayer.parametersForTPlayer");

			this.chooseSreamingOrLocalVideo = this.param.chooseSreamingOrLocalVideo;
			this.chooseSreamingOrLocalAudio = this.param.chooseSreamingOrLocalAudio;
			this.streamingURLPrefix = this.param.streamingURLPrefix;
			this.courseCode = this.param.courseCode;
			this.localDirectoryRoot = this.param.localDirectoryRoot;
			
			//this.mediaURLArr為陣列，在此參照js中的param.mediaURLArr陣列
			this.mediaURLArr = this.param.mediaURLArr;
			
			//1040515 - ●●●這裡有問題
			//this.mediaFileExtArr[this.currIndex]取得副檔名，例如.mp4、m4a、mp3
			this.mediaFileExtArr = this.param.mediaFileExtArr;
			ExternalInterface.call("tPlayer.receiveFlashOk", "@getParametersFmJs()/this.mediaFileExtArr[this.currIndex] : " + this.mediaFileExtArr[this.currIndex]); //在JS顯示

			//Flash串流媒體使用rtmp通訊協定
			this.ncProtocol = this.param.rtmpProtocol;
			
			//1040513修改 - 是否自動播放，改為在HTML裡設定(.mediaAutoPlay)
			this.flashVideoAutoPlay = this.param.mediaAutoPlayArr[this.currIndex];
			
			this.mediaWidthArr = this.param.mediaWidthArr;
			this.mediaHeightArr = this.param.mediaHeightArr;
			this.swfScopeWidthArr = this.param.mediaWidthArr;
			this.swfScopeHeightArr = this.param.mediaHeightArr;
			
			ExternalInterface.call("tPlayer.receiveFlashOk", "@getParametersFmJs()/swfScopeWidthArr : " + this.swfScopeWidthArr[this.currIndex]); //在JS顯示
			
			//●○●○●○ 1040612 - swf的寬高依據HTML裡面的設定
			//-------------------------------------------------------------
			this.stage.stageWidth = this.swfScopeWidthArr[this.currIndex];
			this.stage.stageHeight = this.swfScopeHeightArr[this.currIndex];
			//-------------------------------------------------------------
			
			//1040612 - ???
			//ExternalInterface.call("tPlayer.updateSwfObjDimension", this.currIndex, this.swfScopeWidthArr[this.currIndex], this.swfScopeHeightArr[this.currIndex]);
			
			ExternalInterface.call("tPlayer.receiveFlashOk", "@getParametersFmJs()/order : " + this.param.order[this.currIndex]); //在JS顯示

		}
		
		
		//
		private function getMediaFileExtention(_mediaTargetStr:String): String {
			var captureStr = _mediaTargetStr.slice(-4);
			//trace(captureStr);
			ExternalInterface.call("tPlayer.receiveFlashOk", "@@getMediaFileExtention()/captureStr : " + captureStr); //在JS顯示
			/*switch(captureStr){
				case '.mp4':
				break;
				case '.mp3':
				break;
				case 'm4a':
				break;
				default:
				break;
			}*/
			
			return captureStr;
		}


		//●●●●●● addCallback For JS ●●●●●●
		//===============================================
		public function addCallbackForJS(): void {

			//if (ExternalInterface.available) {

			//ExternalInterface.addCallback("as3_getCurrIndex", as3_getCurrIndex);

			ExternalInterface.addCallback("as3_getTotalTime", as3_getTotalTime);
			ExternalInterface.addCallback("as3_getCurrTime", as3_getCurrTime);
			ExternalInterface.addCallback("as3_pauseVideo", as3_pauseVideo);
			ExternalInterface.addCallback("as3_playVideo", as3_playVideo);
			ExternalInterface.addCallback("as3_togglePause", as3_togglePause);
			ExternalInterface.addCallback("as3_toFullScreen", as3_toFullScreen);
			ExternalInterface.addCallback("as3_toNormalScreen", as3_toNormalScreen);

			//ExternalInterface.addCallback("as3_updateProgress", as3_updateProgress);
			ExternalInterface.addCallback("as3_pauseUpdateTimer", as3_pauseUpdateTimer);
			ExternalInterface.addCallback("as3_resumeUpdateTimer", as3_resumeUpdateTimer);
			ExternalInterface.addCallback("as3_seek", as3_seek);
			ExternalInterface.addCallback("as3_step", as3_step);
			ExternalInterface.addCallback("as3_updateTimerOnlyCallback", as3_updateTimerOnlyCallback);

			//
			ExternalInterface.addCallback("as3_adjustSwfWH", as3_adjustSwfWH);
			//???
			ExternalInterface.addCallback("as3_enterFullScreen", as3_enterFullScreen);

			ExternalInterface.addCallback("sendToActionScript", receivedFromJavaScript);
			//}

			return;
		}
		//===============================================



		//開始處理媒體播放
		//===========================================================================
		private function initMedia(): void {
			//
			//this.getMediaFileExtention(this.param.mediaFileExtArr(this.currIndex));
			ExternalInterface.call("tPlayer.receiveFlashOk", "@@initMedia()/this.param.mediaFileExtArr[this.currIndex] : " + this.param.mediaFileExtArr[this.currIndex]); //在JS顯示
			
			//●○●○●○1040521
			//--------------------------------------------------------------
			switch(this.param.mediaFileExtArr[this.currIndex]){
				case ".mp4":
					this.video = new Video();
					this.createNc();
					break;
				case ".m4a":
					this.video = new Video();
					this.createNc();
					break;
				case ".mp3": //.mp3這裡準備開始用Sound來寫。
					this.video = new Video();
					this.createNc();
				
					//createSound();
					break;
				default:
					break;
			}
			//--------------------------------------------------------------
			
			//this.video = new Video();
			this.stage.fullScreenSourceRect = new Rectangle(this.video.x, this.video.y, this.video.width, this.video.height);
			//this.createNc();
		}

		//nc
		private function createNc(): void {

			this.nc = new NetConnection();
			
			//●●●●●● this.nc.connect() 連結到串流伺服器，或local端
			if (this.chooseSreamingOrLocalVideo == "streaming") {
				this.targetURLPrefix = this.ncProtocol + "://" + this.streamingURLPrefix;
			} else if (chooseSreamingOrLocalVideo == "local") {
				this.targetURLPrefix = null;
			} else {
				//
			}
			
	
			//
			this.nc.addEventListener(NetStatusEvent.NET_STATUS, ncNetStatusHandler);
			this.nc.addEventListener(SecurityErrorEvent.SECURITY_ERROR, securityErrorHandler);
			//●●●●●●
			this.nc.connect(this.targetURLPrefix);
			
			//●○此處抓得到 this.currIndex
			//ExternalInterface.call("tPlayer.receiveFlashOk", "@createNc()/this.currIndex : " + this.currIndex); //在JS顯示

			//output.appendText("chooseSreamingOrLocalVideo：" + this.chooseSreamingOrLocalVideo + "\n");
			//output.appendText("streamingURLPrefix：" + this.streamingURLPrefix + "\n");
			//output.appendText("localDirectoryRoot：" + this.localDirectoryRoot + "\n");
			//output.appendText("mediaURLArr：" + this.mediaURLArr + "\n");
			//output.appendText("ncProtocol：" + this.ncProtocol + "\n");
			//output.appendText(this.mediaWidthArr + "/" + this.mediaHeightArr + "\n");
			//output.appendText("flashVideoAutoPlay：" + this.flashVideoAutoPlay + "\n");

			//output.appendText("targetURLPrefix：" + this.targetURLPrefix + "\n");
			//output.appendText("targetPath：" + this.targetPath + "\n");

			return;
		}

		//●
		private function ncNetStatusHandler(event: NetStatusEvent): void {
			this.nc.removeEventListener(NetStatusEvent.NET_STATUS, ncNetStatusHandler);
			
			switch (event.info.code) {
				case "NetConnection.Connect.Success":
					trace('nc：' + event.info.code);
					//output.appendText("@ncNetStatusHandler()/nc：event.info.code：" + event.info.code + "\n");
					ExternalInterface.call("tPlayer.receiveFlashOk", "@ncNetStatusHandler()/nc：event.info.code : " + event.info.code); //在JS顯示
				
				//
			//1040430 ●○●○●○●○●○●○●○●○ 當媒體檔使用串流來源時，此處必須再擷取一次 this.currIndex
			//=======================================================
			var swfId: String = ExternalInterface.objectID; //取得HTML裡<object>標籤的id字串
			var tmp: int = swfId.indexOf('_'); //取得'_'的索引值
			this.currIndex = uint(swfId.substring(tmp + 1)); //取得底線之後的所有整數字串
			//=======================================================	
				//
				
					//1040430
					//●○●○●○此處本來抓不到 this.currIndex，但加了上面這段，就行了。
					ExternalInterface.call("tPlayer.receiveFlashOk", "@ncNetStatusHandler()/this.currIndex : " + this.currIndex); //在JS顯示
					
					//●●●●●●●●●●●●
					//===============
					connectStream();
					//===============

					break;

				case "NetStream.Play.StreamNotFound":
					trace("Stream not found: " + this.targetURLPrefix);
					ExternalInterface.call("tPlayer.receiveFlashOk", "@ncNetStatusHandler/nc：event.info.code : " + event.info.code); //在JS顯示
					break;
			}
			return;
		}

		private function securityErrorHandler(event: SecurityErrorEvent): void {
			//this.nc.removeEventListener(SecurityErrorEvent.SECURITY_ERROR, securityErrorHandler);
			trace("securityErrorHandler: " + event);
			return;
		}



		//●●●●●●●●●●●●
		//===========================================
		private function connectStream(): void {
			//
			//this.videoWrapper = new MovieClip();
			//this.addChild(this.videoWrapper)
			//this.videoWrapper.addChild(this.video);
			this.addChild(this.video);
			//
			//=======================
			this.ns = new NetStream(this.nc);
			//=======================

			//###此處可分辨this.currIndex為0和1 - 
			//●○●○●○ 1040430使用串流來源時，必須在422~427行再擷取一次 this.currIndex，否則播放控制會錯亂
			ExternalInterface.call("tPlayer.receiveFlashOk", "@connectStream/currIndex : " + this.currIndex); //在JS顯示
			//
			this.ns.addEventListener(NetStatusEvent.NET_STATUS, nsNetStatusHandler);


			//●1040310 - 打開智慧型搜尋
			this.ns.inBufferSeek = true;

			//
			var customClient: Object = new Object();
			this.ns.client = customClient;
			//
			customClient.order = this.currIndex;
			customClient.onMetaData = onMetaDataHandler;
			//customClient.onCuePoint = onCuePointHandler;
			//customClient.onImageData = onImageDataHandler;
			//customClient.onTextData = onTextDataHandler;
			//●1040728
			customClient.onPlayStatus = onPlayStatusHandler;


			//●●●●●●●●●●●●指定將在Video 物件邊界範圍內顯示的視訊串流
			//=======================
			this.video.attachNetStream(this.ns);
			//=======================

			//指定是否在串流上使用硬體加速解碼。預設值為 true。
			//注意：您無法在視訊播放期間設定這個屬性。您必須在呼叫 NetStream.play() 之前設定。
			//this.ns.useHardwareDecoder = true; //●Flash Player 10.3未支援此功能，●Flash Player 11.1即可。



			//●●●●●●//@影音寬高設定於此 -- 影音原使寬高在onMetaDataHandler()擷取
			//==================================================================
			//
			//this.video.width = this.mediaWidthArr[this.currIndex];
			//this.video.height = this.mediaHeightArr[this.currIndex];
			
			//●○●○●○1040612 - 讓媒體檔的寬高與swf的寬高一致
			//-------------------------------------------------------------
			this.video.width = this.stage.stageWidth
			this.video.height = this.stage.stageHeight;
			//-------------------------------------------------------------
			
			//1040612 - ???
			//ExternalInterface.call("tPlayer.updateSwfObjDimension", this.currIndex, this.swfScopeWidthArr[this.currIndex], this.swfScopeHeightArr[this.currIndex]);
			
			this.video.smoothing = true;
			this.stage.fullScreenSourceRect = new Rectangle(this.video.x, this.video.y, this.video.width, this.video.height);


			//決定目標媒體路徑
			/*if (this.chooseSreamingOrLocalVideo == "streaming") {
				this.targetPath = this.courseCode + "/mp4:" + mediaURLArr;

			} else if (chooseSreamingOrLocalVideo == "local") {
				this.targetPath = this.localDirectoryRoot + mediaURLArr;

			} else {
			}*/


			//============================================
			//this.targetPath = this.urlForAs3Arr;
			//============================================


			//this.ns.addEventListener(NetStatusEvent.NET_STATUS,nsNetStatus);



			//決定是否autoPlay - ●●●this.targetPath - 在getUrlFmJs()已經取得資料
			//
			if (this.flashVideoAutoPlay == true) {
				this.ns.play(this.targetPath);
				//
				ExternalInterface.call('tPlayer.setPlayFlag', true, this.currIndex);

			} else {
				this.ns.play(this.targetPath);
				this.ns.pause();
				//
				ExternalInterface.call('tPlayer.setPlayFlag', false, this.currIndex);
			}
			
			ExternalInterface.call("tPlayer.receiveFlashOk", "@connectStream()/this.targetPath : "+this.targetPath); //在JS顯示


			//this.clickedListener();


			//●●●應放這裡。若放在onMetaDataHandler()，在 JS拖曳播放頭時，會不正常。
			//======================
			this.updateCurrTime();
			//======================


			//output.appendText("targetPath：" + this.targetPath + "\n");

			//==================================================================

			/*try {

				if (!param) {
					throw new Error("--- 抓不到Js的param物件 ---");
				} else {
					
					this.video.width = this.param.mediaWidthArr[this.currIndex];
					this.video.height = this.param.mediaHeightArr[this.currIndex];
					trace(this.param.mediaWidthArr[this.currIndex] + '/' + this.param.mediaHeightArr[this.currIndex]);

					if (param.flashVideoAutoPlay == true) {
						this.ns.play(this.mediaURLArr);
					} else {
						this.ns.play(this.mediaURLArr);
						this.ns.pause();
					}

				}

			} catch (e) {
				this.video.width = 640;
				this.video.height = 360;
				trace('● 抓到錯誤：' + e);
			}*/
			//==================================================================


			//附加playback事件偵聽
			//this.addPlaybackEventListen();


			//●●●●●●
			addCallbackForJS();


			return;
		}

		private function nsNetStatusHandler(event: NetStatusEvent): void {
			//1040615 - ●不可removeEventListener，否則後面的事件捕捉不到
			//this.ns.removeEventListener(NetStatusEvent.NET_STATUS, nsNetStatusHandler);
			
			trace('ns：' + event.info.code);
			//output.appendText("→nsNetStatusHandler：event.info.code：" + event.info.code + "\n");
			//
			//ExternalInterface.call("tPlayer.receiveFlashOk", "@nsNetStatusHandler()/event.info.code : "+event.info.code); //在JS顯示
			
			
			//=============================================
			switch(event.info.code){
				//●○媒體播放結束
				case "NetStream.Play.Stop":
					//ExternalInterface.call("tPlayer.receiveFlashOk", "@nsNetStatusHandler()/event.info.code : "+event.info.code+'\n'+this.videoCurrTime+'/'+this.videoTotalTime); //在JS顯示
					
					//●○播放至媒體結束時，event.info.code = "NetStream.Play.Stop"
					//ExternalInterface.call("tPlayer.completed", false, this.ns.client.order); //調用JS的tPlayer.complete()
					
					break;
			}
			//=============================================
			
			return;
		}
		
		//●1040728 - 
		//●http://help.adobe.com/zh_TW/FlashPlatform/reference/actionscript/3/flash/net/NetStream.html#event:onPlayStatus
		//●http://help.adobe.com/en_US/AS2LCR/Flash_10.0/help.html?content=00001406.html
		
		private function onPlayStatusHandler(info:Object):void{
			switch(info.code){
				
				case "NetStream.Buffer.Empty": //
					break;
				
				case "NetStream.Buffer.Full":
					break;
				
				case "NetStream.Buffer.Flush":
					break;
				
				case "NetStream.Play.Start":
					break;
				
				case "NetStream.Play.Stop":
					break;
				
				case "NetStream.Play.Complete":
					ExternalInterface.call("tPlayer.receiveFlashOk", "@onPlayStatusHandler()/info.code : "+info.code+'\n'+this.videoCurrTime+'/'+this.videoTotalTime); //在JS顯示
				//●○播放至媒體結束時，event.info.code = "NetStream.Play.Stop"
					ExternalInterface.call("tPlayer.completed", false, this.ns.client.order); //調用JS的tPlayer.complete()
					break;
				
				case "NetStream.SeekStart.Notify": //The seek operation is complete.
					break;
				
				case "NetStream.Seek.Notify": //The seek operation is complete.
					break;
				
				
			}
		}

		//
		//=====================================================================
		//onMetaData
		private function onMetaDataHandler(info: Object): void {
			trace("metadata: duration=" + info.duration + " width=" + info.width + " height=" + info.height + " framerate=" + info.framerate);
			//原始影音的寬高資訊
			//this.video.width = info.width;
			//this.video.height = info.height;

			//
			this.videoTotalTime = info.duration;
			ExternalInterface.call("tPlayer.receiveFlashOk", "videoTotalTime : " + this.videoTotalTime); //在JS顯示

			//output.appendText("→ videoTotalTime：" + this.videoTotalTime + "\n");


			//============●●● 調用JS的tPlayer.updateTotalTime()，初始化並顯示媒體長度
			//給已經格式化的xx:yy字串
			//ExternalInterface.call("tPlayer.updateTotalTime", this.minuteSecond(this.videoTotalTime));

			//●●●此處無法取得正確的this.currIndex。 this.currIndex錯誤的皆捕獲0。所以不能使用this.currIndex來分辨不同的影音
			//ExternalInterface.call("tPlayer.receiveFlashOk", "@onMetaDataHandler()/this.currIndex : "+this.currIndex);

			//給秒數(數字)
			//●●● 藉由在connectStream()方法，設定customClient.order = this.currIndex
			//由於customClient指定給this.ns.client
			//因此可在此取得this.ns.client.order
			ExternalInterface.call("tPlayer.updateTotalTime", this.videoTotalTime, this.ns.client.order);
			ExternalInterface.call("tPlayer.receiveFlashOk", "@onMetaDataHandler()/this.ns.client.order : " + this.ns.client.order);
		
	
			return;
		}

		//●取得目前播放時間
		//==========================================================
		private function updateCurrTime(): void {
			this.updateCurrTimeTimer = new Timer(66, 0); //1040720●○ - 改為100毫秒偵測一次
			this.updateCurrTimeTimer.addEventListener(TimerEvent.TIMER, updateCurrTimeTimerHandler);
			this.updateCurrTimeTimer.start();
		}

		private function updateCurrTimeTimerHandler(event: TimerEvent): void {
			//●NetStream.time屬性，唯讀。
			this.videoCurrTime = this.ns.time;
			//call JS：●tPlayer.updateCurrTime()，在JS更新顯示目前播放時間。
			//給已經格式化的xx:yy字串
			//ExternalInterface.call("tPlayer.updateCurrTime", this.minuteSecond(this.videoCurrTime));
			
			try {
				//給秒數(數字) - this.ns.client.order - 請看605 ~ 607行說明
				ExternalInterface.call("tPlayer.updateCurrTime", this.videoCurrTime, this.ns.client.order);
			}catch(err:Error){
				//
			}
			

			//
			event.updateAfterEvent();
		}
		//==========================================================


		//=====================================================================


		//●Flash裡的按鈕事件
		private function addPlaybackEventListen(): void {
			//附加playback事件偵聽
			//====================================================
			//this.pauseBtn.addEventListener(MouseEvent.CLICK, pauseHandler);
			//this.playBtn.addEventListener(MouseEvent.CLICK, playHandler);
			//this.stopBtn.addEventListener(MouseEvent.CLICK, stopHandler);
			//this.togglePauseBtn.addEventListener(MouseEvent.CLICK, togglePauseHandler);
			//
			//this.fullScreenBtn.addEventListener(MouseEvent.CLICK, toFullScreenHandler);
			//this.normalScreenBtn.addEventListener(MouseEvent.CLICK, toNormalScreenHandler);
			//====================================================


		}


		//●●●●●● callback For JS ●●●●●●
		//===============================================

		/*private function as3_getCurrIndex(_index:uint):void{
			this.currIndex = _index;
		}*/

		private function as3_pauseVideo(): Boolean {
			this.pauseHandler(null);
			return false;
		}

		private function as3_playVideo(): Boolean {
			this.playHandler(null);
			return true;
		}

		private function as3_togglePause(): void {
			this.togglePauseHandler(null);
			return;
		}

		private function as3_getTotalTime(): String {
			return this.minuteSecond(this.videoTotalTime);
		}

		private function as3_getCurrTime(): Number {
			this.videoCurrTime = this.ns.time;
			//return this.minuteSecond(this.videoCurrTime);
			return this.videoCurrTime;
		}

		//●從JS無法調用Flash的全螢幕
		private function as3_toFullScreen(): String {
			this.toFullScreenHandler(null);
			return this.stage.displayState;
		}

		private function as3_toNormalScreen(): String {
			this.toNormalScreenHandler(null);
			return this.stage.displayState;
		}

		//●○●○●○ 1040612 - 不需要從JS調用。關鍵其實在第一次設定this.video的寬高時，
		//將stage.stageWidth、stage.stageHeight指定給this.video.width和this.video.height
		//●○定義在connectStream()方法
		private function as3_adjustSwfWH(_w: uint, _h: uint): void {
			//
			this.stage.stageWidth = _w;
			this.stage.stageHeight = _h;
			//●○●○●○
			this.video.width = this.stage.stageWidth
			this.video.height = this.stage.stageHeight;
		}

		//● ??? 這是想操控影音寬高尺寸
		private function as3_enterFullScreen(_w: uint, _h: uint): void {
			this.video.width = _w;
			this.video.height = _h;

		} //

		//===========================================================
		//
		/*private function as3_updateProgress(_seekTime): void {
			this.ns.seek(_seekTime);
		}*/

		//
		private function as3_seek(_targetTime): void {
			this.ns.seek(_targetTime);
		}
		
		//as3_step
		private function as3_step(_frames): void {
			this.ns.step(_frames);
		}

		//
		private function as3_pauseUpdateTimer(): void {
			if (this.updateCurrTimeTimer.running) {
				this.updateCurrTimeTimer.stop();
			}
		}

		//
		private function as3_resumeUpdateTimer(): void {
			if (!this.updateCurrTimeTimer.running) {
				this.updateCurrTimeTimer.start();
			}
		}

		//
		private function as3_updateTimerOnlyCallback(_order: uint): void {
			
			//this.ns.client.order
			if (this.ns.client.order == _order) {
				//●NetStream.time屬性，唯讀。
				this.videoCurrTime = this.ns.time;

				//call JS：●tPlayer.updateCurrTime()，在JS更新顯示目前播放時間。
				//給已經格式化的xx:yy字串
				//ExternalInterface.call("tPlayer.updateCurrTime", this.minuteSecond(this.videoCurrTime));
				//
				//給秒數(數字) - ●此處也不能使用this.currIndex，而應用this.ns.client.order
				ExternalInterface.call("tPlayer.updateCurrTimeOnly", this.videoCurrTime, this.ns.client.order);

			}

		}

		//===========================================================


		private function receivedFromJavaScript(value: String): void {
			//output.appendText("JavaScript says: " + value + "\n");
		}


		/*private function toNormalScreen():String{
			this.stage.displayState = StageDisplayState.NORMAL;
			return this.stage.displayState;
		}
		
		private function toggleFullScreen():String {
			
            switch(this.stage.displayState) {
                case "normal":
                    this.stage.displayState = "fullScreen";    
                    break;
                case "fullScreen":
					this.stage.displayState = "normal";    
					break;
                default:
                    this.stage.displayState = "normal";    
                    break;
            }
			
			return this.stage.displayState;
        }  */
		//===============================================



		//Flash Playback Control
		//========================================================
		private function pauseHandler(event: MouseEvent): void {
			this.ns.pause();
		}

		private function playHandler(event: MouseEvent): void {
			this.ns.resume();
		}

		private function stopHandler(event: MouseEvent): void {
			// Pause the stream and move the playhead back to 
			// the beginning of the stream. 
			this.ns.pause();
			this.ns.seek(0);
		}

		function togglePauseHandler(event: MouseEvent): void {
			this.ns.togglePause();
		}

		public function toFullScreenHandler(event: MouseEvent): void {
			//this.stage.scaleMode = StageScaleMode.SHOW_ALL;
			this.stage.displayState = StageDisplayState.FULL_SCREEN;
		}
		public function toNormalScreenHandler(event: MouseEvent): void {
			//this.stage.scaleMode = StageScaleMode.SHOW_ALL;
			this.stage.displayState = StageDisplayState.NORMAL;
		}
		//========================================================




		private function fullScreenEventHandler(event: FullScreenEvent): void {

			if (event.fullScreen) {
				//this.player.scaleMode = StageScaleMode.NO_SCALE;

			} else {
				//this.player.scaleMode = swfObj.scalemode;

			}

			return;
		}



		/*傳入總秒數, 轉換為 分:秒格式, 並傳回*/
		private function minuteSecond(_tmpSec: uint): String {
			var _tmpMitute: uint = _tmpSec / 60;
			_tmpSec = _tmpSec % 60;

			//trace('_tmpMitute：' + (_tmpMitute<=9 ? '0' + (_tmpMitute) : (_tmpMitute)));

			//tmpMitute = (_tmpMitute<=9 ? '0' + String(_tmpMitute) : String(_tmpMitute));
			//_tmpSec = (_tmpSec<=9 ? '0' + String(_tmpSec) : String(_tmpSec));

			return String((_tmpMitute <= 9 ? '0' + String(_tmpMitute) : String(_tmpMitute)) + ":" + (_tmpSec <= 9 ? '0' + String(_tmpSec) : String(_tmpSec)));
		}



		//以下未用到
		//↓↓↓ =======================================================================

		//onCuePoint
		private function onCuePointHandler(info: Object): void {
			trace("cuepoint: time=" + info.time + " name=" + info.name + " type=" + info.type);
			return;
		}

		//onImageData
		/*private function onImageData(imageData:Object):void {
			trace("imageData length: " + imageData.data.length);
		}*/

		//public function onImageDataHandler(imageData: Object): void {

		//	trace("imageData length: " + imageData.data.length);
		//	var imageloader: Loader = new Loader();
		//	imageloader.loadBytes(imageData.data); // imageData.data is a ByteArray object.
		//	addChild(imageloader);
		//}

		//onTextData
		public function onTextDataHandler(textData: Object): void {

			trace("--- textData properties ----");
			var key: String;

			for (key in textData) {
				trace(key + ": " + textData[key]);
			}
		}

		//↑↑↑ =======================================================================
		
		
		
		//↓↓↓ =======================================================================
		private function createSound():void{
			
		}
		
		
		
		
		
		//↑↑↑ =======================================================================
		
		
		
	}
}