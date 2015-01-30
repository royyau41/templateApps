var view1={
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
							if (i<=9){
							if (i%3==0){
									underRowView=Ti.UI.createView({
									top:'0', left:'0', top:'0',height:'35%', layout:'horizontal'
								});
							}
							
							var itemView=Ti.UI.createView({
								 width:'33%', height:'100%', top:'0', left:'0', backgroundColor:Alloy.Globals.indexbackgroundColor[i%2], layout:'vertical',
								 number:elm.NUMBER,
								 bubbles:false
								 
								 
							});
							
							var  imageViewContainer=Ti.UI.createView({
								width:'70%',
								height:'45%',
								top:'2%',
								number:elm.NUMBER,
								left:'15%'
							});
							var imageView=Ti.UI.createImageView({
								//image:imageRequestPath+elm.PIC_NUM,
								image:imageRequestPath+'24680',
								number:elm.number,
								defaultImage:'/images/default1.png'								
							});
							var addrField=Ti.UI.createLabel({
								top:'2%',
								left:'5%',
								number:elm.NUMBER,
								width:'90%',
								text:elm.CTITLE,
								color:Alloy.Globals.indexAddrColor,
								font:{fontSize:comjs.FitFontSize(2.2),fontWeight:'bold'}
							});
							
							var areaField=Ti.UI.createLabel({
								top:'2%',
								left:'5%',
								width:'100%',
								number:elm.NUMBER,
								text:'面積：'+elm.AREA,
								color:Alloy.Globals.indexItemColor,
								font:{fontSize:comjs.FitFontSize(1.9)}

							});
							var priceField=Ti.UI.createLabel({
								
								left:'5%',
								width:'100%',
								number:elm.NUMBER,
								text:'售價：'+elm.PRICE,
								color:Alloy.Globals.indexItemColor,
								font:{fontSize:comjs.FitFontSize(1.9)}
							});
							var rentField=Ti.UI.createLabel({
								
								left:'5%',
								width:'100%',
								number:elm.NUMBER,
								text:'租金：'+elm.RENT,
								color:Alloy.Globals.indexItemColor,
								font:{fontSize:comjs.FitFontSize(1.9)}
							});
							imageViewContainer.add(imageView);
							itemView.add(imageViewContainer);
							itemView.add(addrField);
							itemView.add(areaField);
							itemView.add(priceField);
							itemView.add(rentField);
							
							itemView.addEventListener('click',function(e){
								var obj={
										number:e.source.number
										
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
					}
					,error:function(e){
						console.log(e);
					}
				}
			);
		}		
	};


view1.init();
