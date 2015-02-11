var args = arguments[0] || {};

$.backBtn.addEventListener('click',function(e){
	if (OS_IOS)
	$.viewFileWin.close({transition:Titanium.UI.iPhone.AnimationStyle.CURL_DOWN});
	else 
	$.viewFileWin.close(
		
	);
});

var topViewShow = Ti.UI.createAnimation({
	top : 0,
	//curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
	duration : 500
});

var topViewHide=Ti.UI.createAnimation({
	top : '-'+$.topView.toImage().height, 
	//curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
	duration : 500
});

var bottomViewShow = Ti.UI.createAnimation({
	bottom : 0,
	//curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
	duration : 500
});

var bottomViewHide=Ti.UI.createAnimation({
	bottom : '-'+$.bottomView.toImage().height,
	//curve : Ti.UI.ANIMATION_CURVE_EASE_OUT,
	duration : 500
});


var showView=false;

if (args['type']!='pdf'){
	setTimeout(function(){
	   $.topView.animate(topViewHide);
	   $.bottomView.animate(bottomViewHide);
	}, 2000);
}

$.contentView.addEventListener('click',function(){
	if (showView){
		$.topView.animate(topViewHide);
   		$.bottomView.animate(bottomViewHide);
   		showView=false;
	}else{
		$.topView.animate(topViewShow);
   		$.bottomView.animate(bottomViewShow);
   		showView=true;
	} 
	
});
