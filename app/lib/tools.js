var Map = require('ti.map');
exports.phone=function(no){
	
	
	if (OS_ANDROID){
		var intent = Ti.Android.createIntent({
        action : Ti.Android.ACTION_DIAL,
        data : 'tel:'+no
        });
	Ti.Android.currentActivity.startActivity(intent);
	}else{
		//Ti.Platform.openURL('http://www.yahoo.com.hk');
		Ti.Platform.openURL("tel://"+no.replace(/ /g,''));
	}
};

exports.mapView=function(addr,showName,func){		
		//mapHeight=pToD($.bottomView.size.height-$.iconLabel.size.height-$.iconView.size.height)-50;
		var mapHeight='50%';
		var xhrLocationCode = Ti.Network.createHTTPClient();
		xhrLocationCode.setTimeout(120000);
		 
		var requestUrl = "http://maps.google.com/maps/api/geocode/json?address="+addr;
		requestUrl += "&sensor=" + (Ti.Geolocation.locationServicesEnabled == true);
		xhrLocationCode.open("GET", requestUrl);
		//Define the content type
		xhrLocationCode.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
		//Send request
		xhrLocationCode.send();
		//If error occurs
		xhrLocationCode.onerror = function(e) {
		//TODO: code to handle error
		};
		//On Success
		xhrLocationCode.onload = function(e) {
			
			var response = JSON.parse(this.responseText);
			//Check the response
			if (response.status == 'OK' && response.results != undefined && response.results.length > 0) {
				
				var mapView=Map.createView({
					animate : true,                                                        //Map region animated
					regionFit : true,                                                       //Fits the  aspect ratio
					//userLocation : false, 
					location:{
						latitude: response.results[0].geometry.location.lat,
						longitude: response.results[0].geometry.location.lng,
						latitudeDelta: 0.005,
						longitudeDelta: 0.005
					},  
					region:{
						latitude: response.results[0].geometry.location.lat,
						longitude: response.results[0].geometry.location.lng,
						latitudeDelta: 0.005,
						longitudeDelta: 0.005
					},                                             //To display user location
					top:20,
					width:Ti.UI.FILL,
					height:Ti.UI.FILL,
					mapType:Map.NORMAL_TYPE
					});
					
				//Get the response
			 
			//Define annotation to show location
			var objLocationAnnotation = Map.createAnnotation({
				latitude: response.results[0].geometry.location.lat,
				longitude: response.results[0].geometry.location.lng,
				title: showName,
				subtitle: showName,
				animate:true,
				id: 1
				//pincolor:Map.ANNOTATION_GREEN
			});
			mapView.addAnnotation(objLocationAnnotation);
			
			objLocationAnnotation = null;
			if (func)func(mapView);
			}
			response = null;
	
	};
};



var email=function(data,emailData){
	if (emailData=='')emailData={};
		var emailDialog = Ti.UI.createEmailDialog();
			emailDialog.subject = emailData.title||"樓盤資料";
			if (emailData.toEmail){
				emailDialog.toRecipients = [emailData.toEmail];
			
			}
			//emailDialog.toRecipients = ['royyau41@gmail.com'];
			emailDialog.html=true;
			
			switch(emailData.type){
				case 'contactUs':
				break;
				default:
					emailDialog.messageBody = genpropHtml(data);
				break;	
			}
			
			emailDialog.open();
};


function genpropHtml(data){
	var propDetail=data;
	
	var title=propDetail['C_TITLE'];
	var detail_item={
			'title'		:{field:'C_PREMISES',display:'物業地址'},
			'district'	:{field:'C_DISTRICT',display:'區域'},
			'narea'		:{field:'NAREA',display:'實用面積'},
			'garea'		:{field:'GAREA',display:'建築面積'},
			'price'		:{field:'PRICE',fieldType:'number',base:1000000,display:'售價'},
			'rent'		:{field:'RENT',fieldType:'number',display:'租金'},
			'contact'		:{field:'C_CONTACT',display:'聯絡人'},
			'contactPhone'		:{field:'CONTACTPHONE',display:'聯絡人電話'},
			'contactEmail'		:{field:'CONTACTEMAIL',display:'聯絡人電郵'}
		};
	//console.log(propDetail);
	var detailhtml='';
	for (var k in detail_item){
		
		var value=propDetail[detail_item[k].field];
		if (OS_IOS){
			detailhtml=detailhtml+'<tr valign="top""> '+
							'<td>'+detail_item[k].display+'</td> '+
							'<td>:</td> '+
							'<td>'+value+'</td>'+			
						'</tr> ';
		}else {
			
			detailhtml=detailhtml+detail_item[k].display+':'+value+' <br/> ';
		}
	}
	
	var propHtml=
	'<div style="width:600px;margin:0 auto;border:1px solid #BFBFBF"> '+
					
			'<div class="clear"></div> '+
			'<div class="content" style="font-size: 14px;"> '+
				'<table style=" line-height:150%""> '+
					'<tr valign="top""> '+
						detailhtml+
						
					'</tr> '+
					'<tr valign="top""> '+
							'<td>網址</td> '+
							'<td>:</td> '+
							'<td>'+Alloy.Globals.webLink+'propDetail.php?id='+propDetail['ID']+'</td>'+			
						'</tr> ';
					
				'</table> '+
			'</div>'+'</div>';
	
	
	return propHtml;
}
exports.email=email;