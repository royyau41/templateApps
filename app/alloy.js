/**
 * @author Roy Yau
 */
if (OS_IOS || OS_ANDROID) {
	Alloy.Globals.Map = require('ti.map');
}

var comjs=require('common');
var pToD=comjs.PixelsToDPUnits;
var xhr=require('xhrData').xhrData;
var basicUI=require('basic_ui');
var imageRequestPath='http://www.theoneshop.com.hk/thumbImage.php?id=';


Alloy.Globals.menu=[
	{title :'主頁',customView : 'view1',image : "images/ic_search.png"},
	{title :'搜尋',customView : 'property/search',image : "images/ic_search.png"},
	{title :'測試PDF',customView : 'webView',image : "images/ic_search.png"}
	
];

Alloy.Globals.indexAddrColor='#a2631d';
Alloy.Globals.indexItemColor='#707070';
Alloy.Globals.indexbackgroundColor=['#FFFFFF','#FBD781'];


Alloy.Globals.companyName='壹專業旺餔';
Alloy.Globals.companyColor='#EE1C27';
Alloy.Globals.topBannerBGColor='#f7e7ad';
Alloy.Globals.topBannerHeight='44dp';


Alloy.Globals.titleFont=comjs.FitFontSize(2.6);
Alloy.Globals.itemFont=(OS_IOS)?comjs.FitFontSize(2.4):comjs.FitFontSize(2.0);
Alloy.Globals.seAddrFont=comjs.FitFontSize(2);

Alloy.Globals.propDtlItemFont=comjs.FitFontSize(2.6);
Alloy.Globals.propDtlAddrFont=comjs.FitFontSize(3.3);











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
