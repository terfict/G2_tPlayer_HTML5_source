package terfict{

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
	


	public class ExternalInterfaceExam extends Sprite {
		
		private var videoArr:Array;
		//private var nc: NetConnection;
		private var ncArr:Array;
		//private var ns: NetStream;
		private var nsArr:Array;
		private var urlForAs3Arr:Array;
		//private var videoTotalTime: Number;
		private var mediaTotalTime:Array;
		//private var videoCurrTime: Number;
		private var mediaCurrTime:Array;
		private var parametersForAs3: Object;

		private var chooseSreamingOrLocalVideo: String;
		private var chooseSreamingOrLocalAudio: String;
		private var streamingURLPrefix: String;
		private var courseCode: String;
		private var localDirectoryRoot: String;
		private var mediaURL: String;
		//private var videoURL: String;
		private var targetURLPrefix: String;
		private var ncProtocol: String;
		private var playbackTech: String;

		private var flashVideoAutoPlay: Boolean;
		private var swfScopeWidth: uint;
		private var swfScopeHeight: uint;
		private var videoScopeWidth: uint;
		private var videoScopeHeight: uint;
		private var updateCurrTimeTimer: Timer;

		public var pauseBtn: MovieClip;
		public var playBtn: MovieClip;
		public var stopBtn: MovieClip;
		public var togglePauseBtn: MovieClip;
		public var fullScreenBtn: MovieClip;
		public var normalBtn:MovieClip;
		
		private var conn:LocalConnection;
		private var currIndex:uint;


		public function ExternalInterfaceExam() {
			// constructor code
			super();
			this.stageUtils();

			//====================
			Security.allowDomain("*");
			//====================
			
			//this.localConn();

		}

		/*stage屬性設置*/
		private function stageUtils(): void {

			this.stage.scaleMode = StageScaleMode.EXACT_FIT;
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
		private function resizeEventHandler(event:Event):void{
			//
			var swfWidth:int = this.stage.stageWidth; 
    		var swfHeight:int = this.stage.stageHeight; 
			
			// Resize the video window. 
    		//var newVideoHeight:Number = swfHeight; 
    		this.videoArr[this.currIndex].height = this.stage.stageHeight; 
			
			this.videoArr[this.currIndex].width = this.stage.stageWidth;
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
			this.isJavaScriptReady();
			//====================


			return;
		}

		private function removedFromStage(event: Event): void {
			this.removeEventListener(Event.REMOVED_FROM_STAGE, removedFromStage);
			return;
		}
		
		//
		private function initData(): void {
			
			this.videoArr = [];
			this.ncArr = [];
			this.nsArr = [];
			this.urlForAs3Arr = [];
			//this.videoTotalTime = 0;
			this.mediaTotalTime = [];
			//this.videoCurrTime = 0;
			this.mediaCurrTime = [];
			
			this.currIndex = 0;
			
			
			//
			this.parametersForAs3 = {};
			
			
		}
		
		
		//目前未用到
		//===========================================
		private function localConn():void{
			conn = new LocalConnection();
            conn.client = this;
            try {
                conn.connect("swfConn");
            } catch (error:ArgumentError) {
                trace("Can't connect...the connection name is already being used by another SWF");
            }
		}
		
		public function lcToFullScreen():void {
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
		
		private function clickedListener():void{
			JackCustomEventParam.dispatcher.addEventListener(JackCustomEventParam.VIDEO_TO_FULLSCREEN,lcToFullScreenHandler);
		}
		
		private function lcToFullScreenHandler(event:JackCustomEventParam):void{
			this.toFullScreenHandler(null);
			this.pauseHandler(null);
		}
		//===========================================
		

		//※※※ 檢測「HTML+CSS+JavaScript」是否已經已經準備就緒 ※※※
		private function isJavaScriptReady(): void {

			if (ExternalInterface.available) {

				try {
					
					output.appendText("Adding callback...\n");

					//
					if (checkJavaScriptReady()) {
						this.jsReadyMethod();

					} else {
						output.appendText("JavaScript is not ready, creating timer.\n");
						//JavaScript is not ready，。。。持續檢測，直到JavaScript is ready.
						var readyTimer: Timer = new Timer(100, 0);
						readyTimer.addEventListener(TimerEvent.TIMER, timerHandler);
						readyTimer.start();
					}
					

				} catch (error: SecurityError) {

					output.appendText("A SecurityError occurred: " + error.message + "\n");

				} catch (error: Error) {

					output.appendText("An Error occurred: " + error.message + "\n");

				}
			} else {
				output.appendText("External interface is not available for this container.");
			}
		}
		
		//JavaScript is not ready，。。。持續檢測，直到JavaScript is ready.
		private function timerHandler(event: TimerEvent): void {
			output.appendText("Checking JavaScript status...\n");
			if (checkJavaScriptReady()) {
				this.jsReadyMethod();
				Timer(event.target).stop();
			}
		}

		private function checkJavaScriptReady(): Boolean {
			var isReady: Boolean = ExternalInterface.call("tPlayer.isJsReadyFunc");
			return isReady;
		}

		//
		private function jsReadyMethod(): void {

			output.appendText("Flash says: JavaScript is ready.\n");
			output.appendText("ExternalInterface.objectID = " + ExternalInterface.objectID + "\n");

			var response: String = ExternalInterface.call("tPlayer.receiveFlashOk", "Flash says：Flash OK.");
			output.appendText("●調用Js的tPlayer.receiveFlashOk，return回來：\n" + response + "\n");
			
			
			//1040416 ●○●○●○●○●○●○●○●○
			//=======================================================
			var swfId:String = ExternalInterface.objectID; //取得HTML裡<object>標籤的id字串
			var tmp:int = swfId.indexOf('_'); //取得'_'的索引值
			
			//--------------------------------------------
			this.currIndex = uint(swfId.substring(tmp+1)); //取得底線之後的所有整數字串
			//this.currIndex = uint(0);
			//--------------------------------------------
			
			//●○●○●○●○ 這裡的 - this.currIndex可分別抓到0和1 ●○●○●○●○
			ExternalInterface.call("tPlayer.receiveFlashOk", "this.currIndex : "+this.currIndex); //在JS顯示this.currIndex
			
			//※※※ 傳值到JS ※※※ ??????
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

		}
		
		//◎※● 調用容器HTML/JS的 tPlayer.urlForTPlayer()函式，取得媒體播放相關URL資訊
		private function getUrlFmJs():void{
			this.urlForAs3Arr = ExternalInterface.call("tPlayer.urlForTPlayer");
		}

		//◎※● 調用容器HTML/JS的js_parametersForTPlayer()函式，取得AS3需要的相關屬性
		private function getParametersFmJs(): void {
			
			//●●●調用 tPlayer.parametersForTPlayer
			this.parametersForAs3 = ExternalInterface.call("tPlayer.parametersForTPlayer");

			this.chooseSreamingOrLocalVideo = this.parametersForAs3.chooseSreamingOrLocalVideo;
			this.chooseSreamingOrLocalAudio = this.parametersForAs3.chooseSreamingOrLocalAudio;
			this.streamingURLPrefix = this.parametersForAs3.streamingURLPrefix;
			this.courseCode = this.parametersForAs3.courseCode;
			this.localDirectoryRoot = this.parametersForAs3.localDirectoryRoot;
			//
			this.mediaURL = this.parametersForAs3.mediaURL;
			//Flash串流媒體使用rtmp通訊協定
			this.ncProtocol = this.parametersForAs3.rtmpProtocol;

			this.flashVideoAutoPlay = this.parametersForAs3.flashVideoAutoPlay;
			this.swfScopeWidth = this.parametersForAs3.swfScopeWidth;
			this.swfScopeHeight = this.parametersForAs3.swfScopeHeight;
			this.videoScopeWidth = this.parametersForAs3.as3VideoScopeWidth;
			this.videoScopeHeight = this.parametersForAs3.as3VideoScopeHeight;
			
			this.stage.stageWidth = this.swfScopeWidth;
			this.stage.stageHeight = this.swfScopeHeight

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
			//this.video = new Video();
			this.videoArr.push(new Video());
			this.stage.fullScreenSourceRect = new Rectangle(this.videoArr[this.currIndex].x,this.videoArr[this.currIndex].y,this.videoArr[this.currIndex].width,this.videoArr[this.currIndex].height);
			//
			//----------------------
			this.createNc();
			//----------------------
		}

		//nc
		private function createNc(): void {

			//this.nc = new NetConnection();
			this.ncArr.push(new NetConnection);
			
			
			//
			this.ncArr[this.currIndex].addEventListener(NetStatusEvent.NET_STATUS, ncNetStatusHandler);
			this.ncArr[this.currIndex].addEventListener(SecurityErrorEvent.SECURITY_ERROR, securityErrorHandler);
			
			
			//●●●●●● this.nc.connect() 連結到串流伺服器，或local端
			if (this.chooseSreamingOrLocalVideo == "streaming") {
				this.targetURLPrefix = this.ncProtocol + "://" + this.streamingURLPrefix;
			} else if (chooseSreamingOrLocalVideo == "local") {
				this.targetURLPrefix = null;
			} else {
				//
			}

			//●●●●●●
			this.ncArr[this.currIndex].connect(targetURLPrefix);
			//
			ExternalInterface.call("tPlayer.receiveFlashOk", "targetURLPrefix : "+targetURLPrefix);

			output.appendText("chooseSreamingOrLocalVideo：" + this.chooseSreamingOrLocalVideo + "\n");
			output.appendText("streamingURLPrefix：" + this.streamingURLPrefix + "\n");
			output.appendText("localDirectoryRoot：" + this.localDirectoryRoot + "\n");
			output.appendText("mediaURL：" + this.mediaURL + "\n");
			output.appendText("ncProtocol：" + this.ncProtocol + "\n");
			output.appendText(this.videoScopeWidth + "/" + this.videoScopeHeight + "\n");
			output.appendText("flashVideoAutoPlay：" + this.flashVideoAutoPlay + "\n");

			output.appendText("targetURLPrefix：" + this.targetURLPrefix + "\n");
			output.appendText("urlForAs3Arr：" + this.urlForAs3Arr[this.currIndex] + "\n");

			return;
		}
		
		//●
		private function ncNetStatusHandler(event: NetStatusEvent): void {
			switch (event.info.code) {
				case "NetConnection.Connect.Success":
					trace('nc：' + event.info.code);
					output.appendText("nc：event.info.code：" + event.info.code + "\n");
					ExternalInterface.call("tPlayer.receiveFlashOk", "ncNetStatusHandler : " + event.info.code); //在JS顯示資訊
					//●●●●●●●●●●●●
					//===============
					connectStream(this.ncArr[this.currIndex]);
					//===============

					break;

				case "NetStream.Play.StreamNotFound":
					trace("Stream not found: " + this.targetURLPrefix);
					ExternalInterface.call("tPlayer.receiveFlashOk", "Stream not found: " + event.info.code); //在JS顯示資訊
					break;
				
				default:
					//ExternalInterface.call("tPlayer.receiveFlashOk", "ncNetStatusHandler : " + event.info.code); 
					break;
			}
			return;
		}

		private function securityErrorHandler(event: SecurityErrorEvent): void {
			trace("securityErrorHandler: " + event);
			return;
		}



		//●●●●●●●●●●●●
		//===========================================
		private function connectStream(_currNc:NetConnection): void {
			//
			this.addChild(this.videoArr[this.currIndex]);
			//
			//=======================
			//this.ns = new NetStream(this.ncArr[this.currIndex]);
			this.nsArr.push(new NetStream(_currNc));
			//=======================
			
			this.nsArr[this.currIndex].addEventListener(NetStatusEvent.NET_STATUS, nsNetStatusHandler);
			
			//●1040310 - 打開智慧型搜尋
			this.nsArr[this.currIndex].inBufferSeek = true;

			//
			var customClient: Object = new Object();
			this.nsArr[this.currIndex].client = customClient;
			customClient.onMetaData = onMetaDataHandler;
			//customClient.onCuePoint = onCuePointHandler;
			//customClient.onImageData = onImageDataHandler;
			//customClient.onTextData = onTextDataHandler;


			//●●●●●●●●●●●●指定將在Video 物件邊界範圍內顯示的視訊串流
			//=======================
			this.videoArr[this.currIndex].attachNetStream(this.nsArr[this.currIndex]);
			//=======================

			//指定是否在串流上使用硬體加速解碼。預設值為 true。
			//注意：您無法在視訊播放期間設定這個屬性。您必須在呼叫 NetStream.play() 之前設定。
			//this.ns.useHardwareDecoder = true; //●Flash Player 10.3未支援此功能，●Flash Player 11.1即可。



			//●●●●●●//@影音寬高設定於此 -- 影音原使寬高在onMetaDataHandler()擷取
			//==================================================================
			this.videoArr[this.currIndex].width = this.videoScopeWidth
			this.videoArr[this.currIndex].height = this.videoScopeHeight;
			this.videoArr[this.currIndex].smoothing = true;
			this.stage.fullScreenSourceRect = new Rectangle(this.videoArr[this.currIndex].x,this.videoArr[this.currIndex].y,this.videoArr[this.currIndex].width,this.videoArr[this.currIndex].height);

			
			//this.nsArr[this.currIndex].addEventListener(NetStatusEvent.NET_STATUS,nsNetStatus);
			

			//決定是否autoPlay - this.urlForAs3Arr - 在getUrlFmJs()已經取得資料
			//
			if (this.flashVideoAutoPlay == true) {
				//※●○
				this.nsArr[this.currIndex].play(this.urlForAs3Arr[this.currIndex]);
				//
				ExternalInterface.call('tPlayer.setPlayFlag',true, this.currIndex);
				
			} else {
				this.nsArr[this.currIndex].play(this.urlForAs3Arr[this.currIndex]);
				this.nsArr[this.currIndex].pause();
				//
				ExternalInterface.call('tPlayer.setPlayFlag',false, this.currIndex);
			}
			
			
			this.clickedListener();
			
			
			//●●●應放這裡。若放在onMetaDataHandler()，在 JS拖曳播放頭時，會不正常。
			//======================
			this.updateCurrTime();
			//======================
			

			output.appendText("urlForAs3Arr：" + this.urlForAs3Arr[this.currIndex] + "\n");

			//==================================================================

			/*try {

				if (!parametersForAs3) {
					throw new Error("--- 抓不到Js的parametersForAs3物件 ---");
				} else {
					
					this.video.width = this.parametersForAs3.videoScopeWidth;
					this.video.height = this.parametersForAs3.videoScopeHeight;
					trace(this.parametersForAs3.videoScopeWidth + '/' + this.parametersForAs3.videoScopeHeight);

					if (parametersForAs3.flashVideoAutoPlay == true) {
						this.nsArr[this.currIndex].play(this.mediaURL);
					} else {
						this.nsArr[this.currIndex].play(this.mediaURL);
						this.nsArr[this.currIndex].pause();
					}

				}

			} catch (e) {
				this.video.width = 640;
				this.video.height = 360;
				trace('● 抓到錯誤：' + e);
			}*/
			//==================================================================


			//附加playback事件偵聽
			this.addPlaybackEventListen();
			
			
			//●●●●●●
			addCallbackForJS();


			return;
		}
		
		//NetStatusEvent
		//http://help.adobe.com/zh_TW/FlashPlatform/reference/actionscript/3/flash/events/NetStatusEvent.html#info
		private function nsNetStatusHandler(event: NetStatusEvent): void {
			trace('ns：' + event.info.code);
			output.appendText("→nsNetStatusHandler：event.info.code：" + event.info.code + "\n");
			return;
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
			//this.videoTotalTime = info.duration;
			this.mediaTotalTime.push(info.duration);

			output.appendText("→ this.mediaTotalTime[currIndex]：" + this.mediaTotalTime[currIndex] + "\n");
			
			
			//============●●● 調用JS的tPlayer.updateTotalTime()，初始化並顯示媒體長度
			//給已經格式化的xx:yy字串
			//ExternalInterface.call("tPlayer.updateTotalTime", this.minuteSecond(this.mediaTotalTime[currIndex]));
			//給秒數(數字)
			ExternalInterface.call("tPlayer.updateTotalTime", this.mediaTotalTime[currIndex], this.currIndex);



			return;
		}
		
		//●取得目前播放時間
		//==========================================================
		private function updateCurrTime(): void {
			this.updateCurrTimeTimer = new Timer(30, 0);
			this.updateCurrTimeTimer.addEventListener(TimerEvent.TIMER, updateCurrTimeTimerHandler);
			this.updateCurrTimeTimer.start();
		}
		
		private function updateCurrTimeTimerHandler(event:TimerEvent):void{
			//●NetStream.time屬性，唯讀。
			//this.videoCurrTime = this.nsArr[this.currIndex].time; 
			this.mediaCurrTime[this.currIndex] = this.nsArr[this.currIndex].time;
			
			//call JS：●tPlayer.updateCurrTime()，在JS更新顯示目前播放時間。
			//給已經格式化的xx:yy字串
			//ExternalInterface.call("tPlayer.updateCurrTime", this.minuteSecond(this.mediaCurrTime[currIndex]));
			//給秒數(數字)
			ExternalInterface.call("tPlayer.updateCurrTime", this.mediaCurrTime[currIndex], this.currIndex);
			
			//
			event.updateAfterEvent();
		}
		//==========================================================

		
		//=====================================================================


		//●Flash裡的按鈕事件
		private function addPlaybackEventListen(): void {
			//附加playback事件偵聽
			//====================================================
			this.pauseBtn.addEventListener(MouseEvent.CLICK, pauseHandler);
			this.playBtn.addEventListener(MouseEvent.CLICK, playHandler);
			this.stopBtn.addEventListener(MouseEvent.CLICK, stopHandler);
			this.togglePauseBtn.addEventListener(MouseEvent.CLICK, togglePauseHandler);
			//
			this.fullScreenBtn.addEventListener(MouseEvent.CLICK, toFullScreenHandler);
			this.normalScreenBtn.addEventListener(MouseEvent.CLICK, toNormalScreenHandler);
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
			return this.minuteSecond(this.mediaTotalTime[currIndex]);
		}
		
		private function as3_getCurrTime(): String {
			this.mediaCurrTime[currIndex] = this.nsArr[this.currIndex].time;
			return this.minuteSecond(this.mediaCurrTime[currIndex]);
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
		
		//
		private function as3_adjustSwfWH(_w:uint,_h:uint):void{
			this.stage.stageWidth = _w;
			this.stage.stageHeight = _h;
			
		}
		
		//● ??? 這是想操控影音寬高尺寸
		private function as3_enterFullScreen(_w:uint,_h:uint):void{
			this.videoArr[this.currIndex].width = _w;
			this.videoArr[this.currIndex].height = _h;
			
		}//
		
		//===========================================================
		//
		/*private function as3_updateProgress(_seekTime): void {
			this.nsArr[this.currIndex].seek(_seekTime);
		}*/
		
		//
		private function as3_seek(_targetTime): void {
			this.nsArr[this.currIndex].seek(_targetTime);
		}
		
		//
		private function as3_pauseUpdateTimer(): void {
			if(this.updateCurrTimeTimer.running){
				this.updateCurrTimeTimer.stop();
			}
		}
		
		//
		private function as3_resumeUpdateTimer(): void {
			if(!this.updateCurrTimeTimer.running){
				this.updateCurrTimeTimer.start();
			}
		}
		
		//
		private function as3_updateTimerOnlyCallback():void{
			//●NetStream.time屬性，唯讀。
			this.mediaCurrTime[currIndex] = this.nsArr[this.currIndex].time;
			//call JS：●tPlayer.updateCurrTime()，在JS更新顯示目前播放時間。
			//給已經格式化的xx:yy字串
			//ExternalInterface.call("tPlayer.updateCurrTime", this.minuteSecond(this.mediaCurrTime[currIndex]));
			//給秒數(數字)
			ExternalInterface.call("tPlayer.updateCurrTimeOnly", this.mediaCurrTime[currIndex], this.currIndex);
			
		}
		
		//===========================================================
		

		private function receivedFromJavaScript(value: String): void {
			output.appendText("JavaScript says: " + value + "\n");
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
			this.nsArr[this.currIndex].pause();
		}

		private function playHandler(event: MouseEvent): void {
			this.nsArr[this.currIndex].resume();
		}

		private function stopHandler(event: MouseEvent): void {
			// Pause the stream and move the playhead back to 
			// the beginning of the stream. 
			this.nsArr[this.currIndex].pause();
			this.nsArr[this.currIndex].seek(0);
		}

		function togglePauseHandler(event: MouseEvent): void {
			this.nsArr[this.currIndex].togglePause();
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
	}
}