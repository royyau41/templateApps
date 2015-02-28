var args = arguments[0] || {};

var basicui=new basicUI(true,false);
var win=basicui.getBasic_win();
var mainView=basicui.getContentView();

var e={
	init:function(){
		var url='http://www.theoneshop.com.hk/mortgagecalMobile.php?price='+args.price+'&mortgagerate='+args.mortgagerate+'&rate='+args.rate+'&period='+args.period+'&principal='+args.principal;
		 var webView = Titanium.UI.createWebView({url:url});
		 mainView.add(webView);
		 win.open();
	}
};
e.init();
