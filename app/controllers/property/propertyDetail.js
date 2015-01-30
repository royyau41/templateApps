var args = arguments[0] || {};

var basicui=new basicUI(true,false);
var win=basicui.getBasic_win();
var mainView=basicui.getContentView();


var e={
	init:function(){
		mainView.add($.propDtlMainView);
	}
	
};

e.init();
win.open();

