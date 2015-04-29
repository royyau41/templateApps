var args = arguments[0] || {};
var viewFile=require('viewFile').viewFile;
var favoriteProp=Ti.App.Properties.getList('favoriteProp',[]);
var dtl={
	data:'',
	addr:'',
	showName:'',
	phone:'',
	email:'',
	init:function(){
		this.getData();
		/*
		for (var i=0;i<3;i++){
			var imageContain=Ti.UI.createView({
				width:pToD(Ti.Platform.displayCaps.platformWidth)*0.4,
				height:Ti.UI.FILL,
				left:'10dp',
				top:0
			});
			//var imageNumber=[192204,191535,191533,191534,196064,196066,195988,194822,194821,194823];
							//var arrayIdx=_.random(0,(imageNumber.length-1));
			var image=viewFile('jpg',Alloy.Globals.webLink+'appsImage.php?id='+imageNumber[arrayIdx],true);
			imageContain.add(image);
			$.imgScrollView.add(imageContain);
		}*/
		this.setEvent();
		this.checkFavorite();
	}
	,setImage:function(imageId){
		_.each(imageId,function(image){
			var imageContain=Ti.UI.createView({
				width:pToD(Ti.Platform.displayCaps.platformWidth)*0.4,
				height:Ti.UI.FILL,
				left:'10dp',
				top:0
			});
			//var imageNumber=[192204,191535,191533,191534,196064,196066,195988,194822,194821,194823];
							//var arrayIdx=_.random(0,(imageNumber.length-1));
			var image=viewFile('jpg',Alloy.Globals.webLink+'appsImage.php?id='+image,true);
			imageContain.add(image);
			$.imgScrollView.add(imageContain);
		});
		
	}
	,getData:function(){
		xhr.request({	
					postData:'',
					url:'getPropDetail.php?id='+args.number,
					success:function(e){						
						e=e[0];
						dtl.data=e;
						$.premisses.text=e.C_TITLE;
						$.update.text='更新日期：'+e.RECDATE;
						dtl.addr=e.C_GOOGLEMAP_ADDR;
						dtl.showName=e.C_PREMISES;
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
						dtl.email=e.CONTACTEMAIL;
						$.propContactImg.image=Alloy.Globals.webLink+'imageUser.php?user='+e.CONSULTANT;
						dtl.phone=e.CONTACTPHONE;
						if (e.SMALL_IMAGE_LIST.length){
							dtl.setImage(e.SMALL_IMAGE_LIST);	
						}
					}
					
					,error:function(e){
						console.log(e);
				
					}
				});
	}
	,setEvent:function(){
		$.propContactBtn.addEventListener('click',function(){
			if (OS_IOS){
				buttonNames= ['電郵', '致電', '取消','Whatsapp','Line'];
			}else {
				buttonNames= ['電郵', '致電', '取消', '其他'];
			}
			var dialog = Ti.UI.createAlertDialog({
			    cancel:2,
			    buttonNames: buttonNames,
			    message: '請選擇聯絡方式',
			    title: '聯絡壹專業'
			  });
			  dialog.addEventListener('click', function(e){
			  	switch(e.index){
			  		case 0:
			  		tools.email(dtl.data,{
			  				toEmail:dtl.email,
			  				title:$.premisses.text
			  			});
			  		break;
			  		case 1:
			  		tools.phone(dtl.phone);
			  		break;
			  		case 2:
			  		break;
			  		case 3:
			  			var text=tools.genTextFormat(dtl.email);
			  			if (OS_ISO){
			  			   Ti.Platform.openURL('whatsapp://send?text='+text);
			  			}else {
			  			   	
			  			   	}
			  			  
			  		break;
			  	}
			   
			  });
			  dialog.show();
			
			
			
		});
		$.propRefBtn.addEventListener('click',function(){
			
			if (OS_IOS){
				buttonNames= ['電郵','Whatsapp', '取消','Line'];
			}else {
				buttonNames= ['電郵', '其他', '取消'];
			}
			var dialog = Ti.UI.createAlertDialog({
			    cancel:3,
			    buttonNames: buttonNames,
			    message: '請選擇轉介方式',
			    title: '轉介方式'
			  });
			  dialog.addEventListener('click', function(e){
			  	switch(e.index){
			  		case 0:
			  		tools.email(dtl.data,{
			  				
			  				title:$.premisses.text
			  			});
			  		break;
			  		case 2:
			  		
			  		break;
			  		
			  		case 1:
			  	    var text=tools.genTextFormat(dtl.data);
			  			if (OS_IOS) {
			  			   Ti.Platform.openURL('whatsapp://send?text='+text);}
			  			else{ 
			  				 var intent = Ti.Android.createIntent({
							     action: Ti.Android.ACTION_SEND,
							   //  packageName: 'com.whatsapp',
							     type: 'text/plain'
  						      });

							 intent.putExtra(Ti.Android.EXTRA_TEXT, text);
							 Ti.Android.currentActivity.startActivityForResult(intent, function(e) {
							     if(e.error) {
							         Ti.UI.createAlertDialog({
							             title: L('app_not_installed'),
							             buttonNames: [L('ok')]
							         }).show();
							     }
							 });
			  			    }
			  		break;
			  	}
			   
			  });
			  dialog.show();
			
			
			/*
			tools.email(dtl.data,{
				title:$.premisses.text
			});
			*/
		});
		$.propMapImg.addEventListener('click',function(){
			tools.mapView(dtl.addr,dtl.showName,function(map){
				var basicui=new basicUI(true,false);
				var win=basicui.getBasic_win();
				var mainView=basicui.getContentView();
				mainView.add(map);
				win.open();
			});
		});
		
		$.propLikeImg.addEventListener('click',function(){
			var no=favoriteProp.indexOf(args.number);
			if (no==-1){
				favoriteProp.push(args.number);
				$.propLikeImg.image='/images/like_on.png';
			}else {
				favoriteProp.splice(no, 1);
				$.propLikeImg.image='/images/like.png';
			}
			Ti.App.Properties.setList('favoriteProp',favoriteProp);
			console.log(Ti.App.Properties.getList('favoriteProp',[]));
		});
		
		
	}
	,checkFavorite:function(){
		var no=favoriteProp.indexOf(args.number);
		if (no==-1){
			$.propLikeImg.image='/images/like.png';
		}else {
			$.propLikeImg.image='/images/like_on.png';
		}
		
	}
	
};

dtl.init();


