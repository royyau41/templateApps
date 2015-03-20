var args = arguments[0] || {};

var e={
	init:function(){
		f.setData();
	}
};

var f={
	setData:function(){
		$.addr.text=args.C_PREMISES;
		$.dist.text=args.C_DISTRICT;
		$.area.text=args.AREA;
		$.contact.text=args.C_CONTACT;
		$.price.text=(args.PRICE.replace(/,/g,'')/10000)+'萬';
		$.rent.text=args.RENT;
		$.phone.text=args.CONTACTPHONE;
		$.reference.text=args.REFERENCE;
		$.sePropTmpl1Row.number=args.NUMBER;
		$.sePropTmpl1Row.backgroundColor=args.backgroundColor;

		
		$.image.image=Alloy.Globals.webLink+'appsImage.php?id='+args.PIC_NUM;
	}
	
};


e.init();
