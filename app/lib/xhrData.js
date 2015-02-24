//var XMLTools = require("XMLTools");
//var utf8 = require('utf8');

var xhrData = {
	format:'json',
	url:'http://www.theoneshop.com.hk/ajax/'
	,request:function(data,tries,testUse) {
		Alloy.Globals.loading.show('資料下載中',true);
		//Alloy.Globals.Loading.show();
//		var progress=Alloy.Globals.progressIndicator();
		/*if (OS_ANDROID){
			
			progress.show();
		}*/
		var url=this.url+data.url;

		var xhr = Titanium.Network.createHTTPClient({
			timeout:60000
		});
		
		data=data||{};
		
		tries = tries || 0;
		xhr.ondatastream = function(e)
			{
			
				
			};
		
		xhr.open('POST', url);
		
		xhr.onload = function(e) {
			
			var responseData;
			 
			var i=0;
			switch (xhrData.format){
				/*case 'xml':
					var xmldata=this.responseXML;
					xmldata = new XMLTools(xmldata).toJSON();
					xmldata=JSON.parse(xmldata);
					xmldata=xmldata['soap:Body'].data.group;
					responseData=xmldata;
				break;*/
				case 'json':
					responseData = JSON.parse(this.responseText);
				break;
			}
			
			if (data.success) { data.success(responseData); }
			
			else {
				//Alloy.Globals.Loading.hide();
			}
			Alloy.Globals.loading.hide();
			if (OS_ANDROID){
			//progress.hide();
		}
			
		};
		xhr.onerror = function(e) {
			Alloy.Globals.loading.hide();
			//Alloy.Globals.LoadingShow('下載失敗，請重新下載');
			if (data.error) { data.error(e); }
		};
		if (OS_ANDROID){
			//progress.hide();
		}
		if (data.start) { data.start(); }
		//xhr.setRequestHeader('Content-Type', 'text/xml');
		//xhr.setRequestHeader("Content-Type", "application/json-rpc");
		
		
		switch (xhrData.format){
				/*case 'xml':
					if (typeof xml=='object'){	
						data.postData=this.xmlFormat(data.postData);
					}
					var sendData=data.postData;
				break;*/
				case 'json':
					sendData =data.postData;
				break;
		}
		
		xhr.send(sendData);
		
	}
	
	,requestPic:function(data,tries,testUse) {
		
		var url=this.url+'thumbImage.php?id='+data.picId;

		var xhr = Titanium.Network.createHTTPClient({
			timeout:60000
		});
		
		data=data||{};
		
		tries = tries || 0;
		xhr.ondatastream = function(e)
			{
				//Alloy.Globals.Loading.value=e.progress;
				
			};
		
		
		
		xhr.onload = function(e) {
			
			if (data.success) { data.success(this.responseData ); }
			else {
				//Alloy.Globals.Loading.hide();
			}
		};
		xhr.onerror = function(e) {
			//Alloy.Globals.LoadingShow('下載失敗，請重新下載');
			if (data.error) { data.error(e); }
		};
	
		if (data.start) { data.start(); }
		//xhr.setRequestHeader('Content-Type', 'text/xml');
		xhr.setRequestHeader("Content-Type", "application/json-rpc");
		
		
		switch (xhrData.format){
				case 'xml':
					if (typeof xml=='object'){	
						data.postData=this.xmlFormat(data.postData);
					}
					var sendData=data.postData;
				break;
				case 'json':
					sendData =data.postData;
					sendData = JSON.stringify(sendData);
				break;
		}
		xhr.open('POST', url);
		xhr.send(sendData);
		
	}
	,objToXml:function(obj){
		var str='';
		for (var k in obj){
			str+='<'+k+'>'+obj[k]+'</'+k+'>';
		}
		return str;
	}
};




exports.xhrData=xhrData;