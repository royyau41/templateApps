var leftData = [];
var rightData = [];


var email=Ti.App.Properties.getString('email','');
//init View
var currentView;
var promoteView;


var index={
		init:function(){
			
			if (!Titanium.Network.online) {
			  var dialog = Ti.UI.createAlertDialog({
				    buttonNames: ['重試'],
				    message: '請先連接網絡',
				    title: 'Delete'
				  });
				  dialog.addEventListener('click', function(e){
				    index.init();   
				  });
				  dialog.show();
			
			}else {
				this.showPage();
			}
			
			
			
		}
		,showPage:function(){
			
			f.setLeftMenu();
			event.initEvent();
			event.leftTableEvent();
			if (Ti.Platform.osname === 'iphone')
				$.win.open({
					transition : Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
				});
			else
				$.win.open();
				
			if (email==''){
			 	this.promote();
			 }else {
			 currentView = Alloy.createController("view1").getView();
			 
			$.ds.contentview.add(currentView);
			}	
			
			
			
		}
		,promote:function(){
			
			 promoteView=Ti.UI.createView({
				width:Ti.UI.FILL,
				height:Ti.UI.FILL,
				backgroundColor:'black',
				layout:'horizontal'
			});
			var promoteHeader=Ti.UI.createView({
				width:Ti.UI.FILL,
				height:'7%',
				
			});
			var closeLabel=Ti.UI.createLabel({
				width:'50%',
				
				text:'X',
				color:'#FFFFFF',
				textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
				font:{
					fontSize:'20dp'
				},
				right:'10dp'
			});
			promoteHeader.add(closeLabel);
			
			var imageHolder=Ti.UI.createView({
				width:Ti.UI.FILL,
				height:Ti.UI.FILL,
				//backgroundColor:'black'
			});
			
			var imageView=Ti.UI.createImageView({
				image:'http://www.theoneshop.com.hk/images/theOnePromoteIOS.jpg'
			});
			promoteView.add(promoteHeader);
			promoteView.add(imageHolder);
			imageHolder.add(imageView);
			
			$.win.add(promoteView);
			closeLabel.addEventListener('click',function(){
				$.win.remove(promoteView);
				currentView = Alloy.createController("view1").getView();
			 	$.ds.contentview.add(currentView);
			});
			imageHolder.addEventListener('click',function(){
				promote.clickImage();
			});
			
		}
		
};

var promote={
	clickImage:function(){
		if (OS_ANDROID){
				var textfield = Ti.UI.createTextField();
				var dialog = Ti.UI.createAlertDialog({
   				 title: '請輸入電郵',
			 	  androidView: textfield,

			    buttonNames: ['OK', 'cancel']
			});
			dialog.addEventListener('click', function(e){
			     if (e.index==0){
			    	promote.setEmailDtl(textfield.value);
			    }
			});
			dialog.show();
				
			}else {
			var dialog = Ti.UI.createAlertDialog({
   				 title: '請輸入電郵',
			    style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
			    buttonNames: ['OK', 'cancel']
			});
			dialog.addEventListener('click', function(e){
			    Ti.API.info('e.text: ' + e.index);
			    if (e.index==0){
			    	promote.setEmailDtl(e.text);
			    }
			});
			dialog.show();
			}
	}
	,setEmailDtl:function(email){
		
		if (email!=''&&email!='undefined'&&email!=null){
			
		var data={
					email:email,
				};
				
			xhr.request(
				{	
					postData:data,
					url:'setEmailFromMobile.php',
					success:function(e){
						if (e){
							Ti.App.Properties.setString('email',e);
							$.win.remove(promoteView);
							currentView = Alloy.createController("view1").getView();
							$.ds.contentview.add(currentView);
						}else{
							promote.clickImage();
						} 
						
					}
					,error:function(e){
						console.log(e);
					}
				}
			);
		}else {
			promote.clickImage();
		}
	}
};

var event={
		initEvent:function(){
			Ti.App.addEventListener("sliderToggled", function(e) {
				if (e.direction == "right") {
					$.ds.leftMenu.zIndex = 2;
				} else if (e.direction == "left") {
					$.ds.leftMenu.zIndex = 1;
				}
			});		
		}

	,leftTableEvent:function(){
		$.ds.leftTableView.addEventListener('click', function selectRow(e) {
			$.ds.toggleLeftSlider();
			f.rowSelect(e);
			
		});
	
		
		// Set row title highlight colour (left table view)
		var storedRowTitle = null;
		$.ds.leftTableView.addEventListener('touchstart', function(e) {
			storedRowTitle = e.row.customTitle;
			storedRowTitle.color = "#FFF";
		});
		$.ds.leftTableView.addEventListener('touchend', function(e) {
			storedRowTitle.color = "#666";
		});
		
	}
};

var f={
	setLeftMenu:function(){
		
		var section = Ti.UI.createTableViewSection();

		var customView = Ti.UI.createView({
			height : 'auto',
			backgroundColor : "#EEE",
			backgroundGradient : {
				type : "linear",
				startPoint : {
					x : "0%",
					y : "0%"
				},
				endPoint : {
					x : "0%",
					y : "100%"
				},
				colors : [{
					color : "#EEE",
					offset : 0.0
				}, {
					color : "#CCC",
					offset : 1.0
				}]
			}
		});
	
		var customLabel = Ti.UI.createLabel({
			top : 8,
			bottom : 8,
			left : 10,
			right : 10,
			height : 'auto',
			text : '目錄',
			font : {
				fontSize : 12,
				fontWeight : 'bold'
			},
			color : '#666666'
		});
	
		customView.add(customLabel);
	
		section.headerView = customView;
		//loop menu
		_.each(Alloy.Globals.menu,function(elm){
			section.add(Alloy.createController('menurow', elm).getView());
		 	leftData[0]=section;
		});
		$.ds.leftTableView.data=leftData;
		//return section;
	}
	,rowSelect:function (e) {
			if (currentView.id != e.row.customView) {
				$.ds.contentview.remove(currentView);
				currentView = Alloy.createController(e.row.customView).getView();
				$.ds.contentview.add(currentView);
				
			}
		}
};



Alloy.Globals.changeView=f.rowSelect;


index.init();
