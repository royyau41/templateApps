var leftData = [];
var rightData = [];



//init View
var currentView;


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
				
				 
			 currentView = Alloy.createController("view1").getView();
			$.ds.contentview.add(currentView);	
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
			text : 'Menu',
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
