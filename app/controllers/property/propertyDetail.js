var args = arguments[0] || {};

var basicui=new basicUI(true,false);
var win=basicui.getBasic_win();
var mainView=basicui.getContentView();
var viewFile=require('viewFile').viewFile;

var e={
	init:function(){
		mainView.add($.propDtlMainView);
		for (var i=0;i<3;i++){
			var imageContain=Ti.UI.createView({
				width:pToD(Ti.Platform.displayCaps.platformWidth)*0.4,
				height:Ti.UI.FILL,
				left:'10dp',
				top:0
			});
			var imageNumber=[192204,191535,191533,191534,196064,196066,195988,194822,194821,194823];
							var arrayIdx=_.random(0,(imageNumber.length-1));
			var image=viewFile('jpg','http://property.hkfpa.com/thumbnailImage.php?id='+imageNumber[arrayIdx],true);
			imageContain.add(image);
			$.imgScrollView.add(imageContain);
		}
	}
	
};

e.init();
win.open();

