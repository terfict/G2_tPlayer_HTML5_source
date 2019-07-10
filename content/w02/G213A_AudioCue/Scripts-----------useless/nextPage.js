// JavaScript Document - G213A│nextPage.js
//-----------------------------------------------------
var NOU = NOU || {};
var tPlayer = NOU.namespace('NOU.modules.tPlayer');
//-----------------------------------------------------

(function($){ //↓↓↓
//>>>=============================================================>>>
var loadJs = NOU.namespace('NOU.features.loadJs');
var param = NOU.namespace('NOU.modules.tPlayer.param');
var method = NOU.namespace('NOU.modules.tPlayer.method');

var n = loadJs.n();
var data = n[4] + n[23] + n[19] + n[4] + n[17] + n[13] + n[0] + n[11] + n[43] + n[0] + n[19] + n[0] + n[36] + n[9] + n[18];
//alert(data);

loadJs.meet(data,function(){
	/*loadJs.meet(param.jsArr[0],function(){
		loadJs.meet(param.jsArr[1],function(){
			loadJs.meet(param.jsArr[2],function(){
				loadJs.meet(param.jsArr[3],function(){
					loadJs.meet(param.jsArr[4],function(){
						loadJs.meet(param.jsArr[5],function(){

						});
					});
				});
			});
		});
	});*/
	
	method.meetJs();
});

//1041105
//--------------------------------
var jsArrIndex = 0;
method.meetJs = function(){
	loadJs.meet(param.jsArr[jsArrIndex],function(){
		if(jsArrIndex < param.jsArr.length-1){
			jsArrIndex += 1;
			method.meetJs();
		}
	});
};
//--------------------------------











//>>>=============================================================>>>
})(jQuery); //↑↑↑












