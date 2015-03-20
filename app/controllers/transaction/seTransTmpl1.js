var args = arguments[0] || {};

var e={
	init:function(){
		f.setData();
	}
};

var f={
	setData:function(){
		$.date.text=args.MEMORIAL_DATE;
		$.addr.text=args.FULLADDR;
		$.dist.text=args.DISTRICT;
		
		$.floor.text=args.FLOOR;
		$.narea.text=args.NFA;
		$.price.text=Math.round((args.PRICE.replace(/,/g,'')/10000))+'萬';
		
		$.flat.text=args.UNIT;
		$.garea.text=args.GFA;
		$.avgnfa.text=args.AVGGFA;
		$.sePropTmpl1Row.number=args.MEMORIAL_NUM;
		$.sePropTmpl1Row.backgroundColor=args.backgroundColor;
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
