/**
 * @author Roy Yau
 */
if (OS_IOS || OS_ANDROID) {
	Alloy.Globals.Map = require('ti.map');
}

var comjs=require('common');
var pToD=comjs.PixelsToDPUnits;
var xhr=require('xhrData').xhrData;
var tools=require('tools');
var basicUI=require('basic_ui');
var imageRequestPath='http://www.theoneshop.com.hk/thumbImage.php?id=';


Alloy.Globals.menu=[
	{title :'主頁',customView : 'view1',image : "images/ic_search.png"},
	{title :'搜尋',customView : 'property/search',image : "images/ic_search.png"},
	{title :'田土廰成交',customView : 'transaction/search',image : "images/ic_search.png"},
	{title :'市場消息',customView : 'propNews/search',image : "images/ic_search.png"},
	
	{title :'測試PDF',customView : 'webView',image : "images/ic_search.png"}
	
	
];
Alloy.Globals.changeView='';

Alloy.Globals.transDistArry=null;
Alloy.Globals.loading = Alloy.createWidget("nl.fokkezb.loading");
Alloy.Globals.loading.progress=true;


Alloy.Globals.indexAddrColor='#a2631d';
Alloy.Globals.indexItemColor='#707070';
Alloy.Globals.indexbackgroundColor=['#FFFFFF','#FBD781'];


Alloy.Globals.companyName='壹  專  業  旺  舖';
Alloy.Globals.companyColor='#EE1C27';
Alloy.Globals.topBannerBGColor='#f7e7ad';
Alloy.Globals.topBannerHeight='44dp';


Alloy.Globals.titleFont=comjs.FitFontSize(2.6);
//Alloy.Globals.itemFont=(OS_IOS)?comjs.FitFontSize(2.2):comjs.FitFontSize(2.0);
Alloy.Globals.itemFont=(OS_IOS)?comjs.FitFontSize(2.2):'12dp';

Alloy.Globals.indexAddrFont=(OS_IOS)?comjs.FitFontSize(2.2):'14dp';
Alloy.Globals.indexitemFont=(OS_IOS)?comjs.FitFontSize(2):'11dp';

Alloy.Globals.seAddrFont=(OS_IOS)?comjs.FitFontSize(2.6):'14dp';

//Alloy.Globals.propDtlItemFont=comjs.FitFontSize(2.6);
Alloy.Globals.propDtlItemFont=(OS_IOS)?comjs.FitFontSize(2.4):'15dp';
Alloy.Globals.propDtlAddrFont=(OS_IOS)?comjs.FitFontSize(3.3):'20dp';











Alloy.Globals.actIndicator=Ti.UI.createActivityIndicator({
	height:Ti.UI.SIZE,
  	width:Ti.UI.SIZE
});

Alloy.Globals.progressIndicator=function(){
	var progress=''
	if (OS_ANDROID){
		progress=Ti.UI.Android.createProgressIndicator({
			  
			  location: Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
			  type: Ti.UI.Android.PROGRESS_INDICATOR_DETERMINANT,
			  cancelable: true,
			  min: 0,
			  max: 1,
			  zIndex:1000
			});
	}
	else if (OS_IOS) {
		
	}
	return progress;
};
