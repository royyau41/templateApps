var view1={
	prop_number:[],
	init:function(){
		
		var scrollViewImage=[];
		/*
		for(var i=0;i<3;i++){
			scrollViewImage.push('/temp/image'+(1)+'.jpeg');
		}
		var view=Ti.UI.createView({
				width:'auto',
				height:'auto'
			});
		var image =Ti.UI.createImageView({
				images:scrollViewImage,
				duration: 2000,
				top:0,
				touchEnabled: true,
				repeatCount: 0
			});
			
		$.scrollContain.add(image);
		image.start();*/
		f.getData();
	}
	
};	

var f={
		getData:function(){
			//console.log(xhr.request);
			xhr.request(
				{	
					postData:'',
					url:'getIndexSixProp.php',
					success:function(e){
						var i=0;
						var underRowView;
						_.each(e,function(elm){
							if (i<=47){
								view1.prop_number.push(elm.NUMBER);
							if (i%3==0){
									underRowView=Ti.UI.createView({
									top:'0', left:'0', top:'0',
									height:pToD(Ti.Platform.displayCaps.platformHeight)*0.35, 
									layout:'horizontal'
								});
							}
							
							var itemView=Ti.UI.createView({
								 width:'32%', height:'98%', top:'2%', left:'1%',
								 backgroundColor:Alloy.Globals.indexbackgroundColor[i%2], 
								 layout:'vertical',
								 number:elm.NUMBER,
								 //backgroundImage:'/index/indexpropBg.png',
								 bubbles:false
								 
								 
							});
							
							var  imageViewContainer=Ti.UI.createView({
								width:'90%',
								height:'45%',
								top:'2%',
								number:elm.NUMBER,
								
								left:'5%'
							});
							var imageNumber=[192204,191535,191533,191534,196064,196066,195988,194822,194821,194823];
							var arrayIdx=_.random(0,(imageNumber.length-1));
							
							var imageView=Ti.UI.createImageView({
								//image:imageRequestPath+elm.PIC_NUM,
								image:'http://property.hkfpa.com/thumbnailImage.php?id='+imageNumber[arrayIdx],
								//image:imageRequestPath+'24680',
								number:elm.NUMBER,
								defaultImage:'/images/default1.png'								
							});
							var addrField=Ti.UI.createLabel({
								top:'1%',
								left:'5%',
								number:elm.NUMBER,
								width:'90%',
								text:elm.CTITLE,
								color:Alloy.Globals.indexAddrColor,
								font:{fontSize:Alloy.Globals.indexAddrFont,fontWeight:'bold'}
							});
							
							var areaField=Ti.UI.createLabel({
								top:'2%',
								left:'5%',
								width:'100%',
								number:elm.NUMBER,
								text:'面積：'+elm.AREA,
								color:Alloy.Globals.indexItemColor,
								font:{fontSize:Alloy.Globals.indexitemFont}

							});
							var priceField=Ti.UI.createLabel({
								
								left:'5%',
								width:'100%',
								number:elm.NUMBER,
								text:'售價：'+elm.PRICE,
								color:Alloy.Globals.indexItemColor,
								font:{fontSize:Alloy.Globals.indexitemFont}
							});
							var rentField=Ti.UI.createLabel({
								
								left:'5%',
								width:'100%',
								number:elm.NUMBER,
								text:'租金：'+elm.RENT,
								color:Alloy.Globals.indexItemColor,
								font:{fontSize:Alloy.Globals.indexitemFont}
							});
							var updatedateField=Ti.UI.createLabel({
								
								left:'5%',
								width:'100%',
								number:elm.NUMBER,
								text:'更新：'+elm.UPDATEDATE,
								color:Alloy.Globals.indexItemColor,
								font:{fontSize:Alloy.Globals.indexitemFont}
							});
							imageViewContainer.add(imageView);
							itemView.add(imageViewContainer);
							itemView.add(addrField);
							itemView.add(areaField);
							itemView.add(priceField);
							itemView.add(rentField);
							itemView.add(updatedateField);
							
							itemView.addEventListener('click',function(e){
								var obj={
										number:e.source.number,
										propertyList:view1.prop_number
										
									};
								var detailWin=Alloy.createController('property/propertyDetail',obj).getView();
								
							});
							
							underRowView.add(itemView);
							
							if (i%3==2){
								$.view1.add(underRowView);
								
							}
							i++;
							}
						});
						f.addLinkBar();
					}
					,error:function(e){
						console.log(e);
					}
				}
			);
		}
		,addLinkBar:function(){
			var viewBar =Ti.UI.createView({
				height:pToD(Ti.Platform.displayCaps.platformHeight)*0.1,
				backgroundColor:Alloy.Globals.topBannerBGColor, 
				top:'1dp'
			});
			var searchLabel=Ti.UI.createLabel({
				text:'搜尋更多筍盤',
				color:Alloy.Globals.indexAddrColor,
				left:'5%'		
			});
			var rightLabel=Ti.UI.createLabel({
				text:'》',
				color:Alloy.Globals.indexAddrColor,
				right:'5%'		
			});
			viewBar.add(searchLabel);
			viewBar.add(rightLabel);
			$.view1.add(viewBar);
			
			viewBar.addEventListener('click',function(){
				var e={
					row:{
						customView:'property/search'	
					}
				};
				Alloy.Globals.changeView(e);
				
			});
		}		
	};


view1.init();
