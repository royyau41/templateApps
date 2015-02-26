var args = arguments[0] || {};

var e={
	init:function(){
		f.setData();
	}
};

var f={
	setData:function(){
		$.content.text=args.CONTENT;
		$.title.text=args.TITLE;
		$.seNewsTmpl1Row.number=args.NUMBER;
		
		//$.image.image=imageRequestPath+args.PIC_NUM;
		
		
		
		
		//$.image.image=imageRequestPath+'24680';
	
		
	}
	
};
/*
AVGGFA: "0"
AVGNFA: "0"
DISTRICT: "銅鑼灣"
FLOOR: "1樓"
FULLADDR: "白沙道5號"
GFA: "0"
MEMORIAL_DATE: "2015/02/16"
MEMORIAL_NUM: "15021600530080"
NFA: "0"
PRICE: "28,000,000"
TRANS_DATE: "2015/02/03"
UNIT: ""
USAGE: "商舖"
*/

e.init();
