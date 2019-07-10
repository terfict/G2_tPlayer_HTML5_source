package  terfict{
	
	import flash.events.EventDispatcher;
	import flash.text.Font;
	import flash.display.Loader;
	import flash.display.Sprite;
		
	public class GlobalData {
		
		private static var _dispatcher:EventDispatcher;
		private static var _no1Big5Font:Font;
		private static var _imageArr:Array = [];
		private static var _currentImageLoaderContainer:Sprite;
		private static var _audioAutoPlay:int;

		public function GlobalData() {
			return;
		}
		
		public static function get dispatcher():EventDispatcher{
			_dispatcher = _dispatcher == null ? new EventDispatcher() : _dispatcher;
			return _dispatcher;
		}
		
		public static function get no1Big5Font():Font{
			return _no1Big5Font;
		}
		
		public static function set no1Big5Font(_value:Font):void{
			_no1Big5Font = _value;
			return;
		}
		
		public static function get imageArr():Array{
			return _imageArr;
		}
		
		public static function set imageArr(_value:Array):void{
			_imageArr = _value;
			return;
		}
		
		public static function get currentImageLoaderContainer():Sprite{
			return _currentImageLoaderContainer;
		}
		
		public static function set currentImageLoaderContainer(_value:Sprite):void{
			_currentImageLoaderContainer = _value;
			return;
		}
		
		public static function get audioAutoPlay():int{
			return _audioAutoPlay;
		}
		
		public static function set audioAutoPlay(_value:int):void{
			_audioAutoPlay = _value;
			trace("@GlobalData / _audioAutoPlay : " + _audioAutoPlay);
			return;
		}

	}
	
}
