package  terfict.customEvents{
	
	import flash.events.Event;
	import flash.events.EventDispatcher;
	
	/*繼承擴充Event類別，增加一個attachParams:Object屬性*/
	public class JackCustomEventParam extends Event{
		
		public static const DATA_LOADED:String = "dataLoaded";
		public static const XMLDATA_LOADED:String = "xmlDataLoaded";
		public static const SOUND_LOADED:String = "soundLoaded";
		public static const OBJECT_LOADED:String = "objectLoaded";
		public static const BG_IMG_DATA_LOADED:String = "bgImgDataLoaded";
		public static const FONTS_LOADED:String = "fontsLoaded";
		public static const IMAGE_LOADED:String = "imageLoaded";
		public static const ALL_IMAGE_LOADED:String = "allImageLoaded";
		public static const VIDEO_XML_LOADED = "videoXmlLoad";
		public static const VIDEO_TO_FULLSCREEN = "videoToFullScreen";
		
		private static var _dispatcher:EventDispatcher;
		public var attachParams:*;
		
		/*建構函式有參數 */
		public function JackCustomEventParam(_type:String, _attachParams:*, _bubbles:Boolean = false, _cancelable:Boolean = false) {
			super(_type, _bubbles, _cancelable);
			this.attachParams = _attachParams;
		}
		
		override public function toString():String { 
			return formatToString("JackCustomEventParam","type","attachParams","bubbles","cancelable","eventPhase"); 			
		}

		override public function clone():Event { 
			var _tmpEvent:Event = new JackCustomEventParam(type,this.attachParams,bubbles,cancelable);
			return _tmpEvent;
		}
		
		public static function get dispatcher():EventDispatcher{
			_dispatcher = _dispatcher == null ? new EventDispatcher() : _dispatcher;
			return _dispatcher;
		}

	}
	
}
