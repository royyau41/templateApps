/**
 * @author Roy Yau
 */
var basic_ui=function(){
	
	this.win=Ti.UI.createWindow({
		theme: "Theme.noActionBar",
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		navBarHidden:true,
		fullscreen:true,
		 orientationModes : [
	        Titanium.UI.PORTRAIT,
	        Titanium.UI.UPSIDE_PORTRAIT
	   	 ],
	   	backgroundColor:'white'
	   	 
	});
	
	this.title =Ti.UI.createView({
		//layout:'vertical',
		width:Ti.UI.FILL,
		height:Ti.UI.FILL
	});
	
	var navview=Ti.UI.createView({
		top: "0dp",
		left: "0dp",
		width : Ti.UI.FILL,
		height : Alloy.Globals.topBannerHeight,
		backgroundColor	:Alloy.Globals.topBannerBGColor
	});
	
	var leftBtn=Ti.UI.createButton({
		backgroundImage:'images/back.png',
		width:'24dp',
		height:'24dp',
		//title:' ← ',
		//color:'white',
		left:'2%'
	});
	var win=this.win;
	leftBtn.addEventListener('click',function(){
		win.close();
	});
	var companyName=Ti.UI.createLabel({
		text:Alloy.Globals.companyName,
		font:{
			fontSize:Alloy.Globals.compName,
			fontWeight:'bold'
		},
		color:Alloy.Globals.companyColor
	});
	var mainContent=Ti.UI.createView({
		top:Alloy.Globals.topBannerHeight,
		left:0,
		width:Ti.UI.FILL,
		height:Ti.UI.FILL
	});
	
	navview.add(companyName);
	navview.add(leftBtn);
	this.title.add(navview);
	this.title.add(mainContent);
	
	this.mainContent=mainContent;
	
	
	this.win.add(this.title);
	
	

};



basic_ui.prototype.getBasic_win=function(){
	
	return this.win;
};


basic_ui.prototype.getContentView=function(){
	
	return this.mainContent;
};





module.exports = basic_ui;
