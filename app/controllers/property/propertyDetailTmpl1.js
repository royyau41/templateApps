var args = arguments[0] || {};
var viewFile=require('viewFile').viewFile;
var dtl={
	data:'',
	addr:'',
	phone:'',
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
		this.setEvent();
	}
	,getData:function(){
		xhr.request({	
					postData:'',
					url:'getPropDetail.php?id='+args.number,
					success:function(e){						
						e=e[0];
						dtl.data=e;
						$.premisses.text=e.C_TITLE;
						$.update.text='更新日期：'+'2015/2/26';
						dtl.addr=e.C_GOOGLEMAP_ADDR;
						$.addr.text='物業地址：'+e.C_PREMISES;
						$.district.text='地區：'+e.C_DISTRICT;
						$.street.text='街道：'+e.C_STREET;
						$.garea.text='建築面積：'+e.GAREA+'呎';
						$.narea.text='實用面積：'+e.NAREA+'呎';
						$.price.text='放售價格：'+e.PRICE;
						$.rent.text='放租價格：'+e.RENT;	
						$.contactPerson.text='聯絡人：'+e.C_CONTACT;
						$.contactLincence.text='營業員牌照：'+e.LICENCE;
						$.contactPhone.text='聯絡電話：'+e.CONTACTPHONE;
						$.contactEmail.text='Email：'+e.CONTACTEMAIL;
						dtl.phone=e.CONTACTPHONE;
					}
					
					,error:function(e){
						console.log(e);
				
					}
				});
	}
	,setEvent:function(){
		$.propContactBtn.addEventListener('click',function(){
			tools.phone(dtl.phone);
		});
		$.propRefBtn.addEventListener('click',function(){
			tools.email(args.number,dtl.data);
		});
		$.propMapImg.addEventListener('click',function(){
			tools.mapView(dtl.addr,function(map){
				var basicui=new basicUI(true,false);
				var win=basicui.getBasic_win();
				var mainView=basicui.getContentView();
				mainView.add(map);
				win.open();
			});
		});
	
		
		
	}
	
};

dtl.init();


