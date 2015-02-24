var args = arguments[0] || {};
var viewFile=require('viewFile').viewFile;
var e={
	init:function(){
		this.getData();
		
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
	,getData:function(){
		xhr.request({	
					postData:'',
					url:'getPropDetail.php?id='+args.number,
					success:function(e){						
						e=e[0];
						$.premisses.text=e.C_TITLE;
						$.addr.text='物業地址：'+e.C_PREMISES;
						$.district.text='地區：'+e.C_DISTRICT;
						$.street.text='街道：'+e.C_STREET;
						$.garea.text='建築面積：'+e.GAREA+'呎';
						$.narea.text='實用面積：'+e.NAREA+'呎';
						$.price.text='放售價格：'+e.PRICE;
						$.rent.text='放租價格：'+e.RENT;						
					}
					,error:function(e){
						console.log(e);
				
					}
				});
	}
	
};

e.init();


