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
		//$.image.image=imageRequestPath+args.PIC_NUM;
		
		
		var imageNumber=[192204,191535,191533,191534,196064,196066,195988,194822,194821,194823];
		var arrayIdx=_.random(0,(imageNumber.length-1));
		//$.image.image=imageRequestPath+'24680';
		
		$.image.image='http://property.hkfpa.com/thumbnailImage.php?id='+imageNumber[arrayIdx];
	}
	
};


e.init();
