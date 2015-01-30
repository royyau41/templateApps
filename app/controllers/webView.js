var CreatePDFView = function(_args){
		
		
		//alert("Open: "+_args.pdf);
		
		var ind=Ti.UI.createProgressBar({
			width:200,
			height:50,
			min:0,
			max:1,
			value:0,
			style:Titanium.UI.iPhone.ProgressBarStyle.PLAIN,
			top:10,
			message:'Downloading',
			font:{fontSize:12, fontWeight:'bold'},
			color:'#888'
		});
		
		$.webView.add(ind);
		ind.show();
		
		ind.value = 0;
		c = Ti.Network.createHTTPClient();
		c.setTimeout(10000);
		c.onload = function(e)
		{
			// Web View
			var webv = Ti.UI.createWebView({
				data: this.responseData,
				top: 0,
				scalesPageToFit: true
			});
			ind.hide();
			$.webView.remove(ind);
			$.webView.add(webv);
			//f.close();
		};
		c.ondatastream = function(e)
		{
			ind.value = e.progress ;
			ind.message = "Downloading (" + Math.round(e.progress*100) + "%)";
		};
		c.onerror = function(e)
		{
			Ti.UI.createAlertDialog({title:'ERROR', message:'Error: ' + e.error}).show();
		};
		
		c.open('GET','http://www.theoneshop.com.hk/pdf.php?id=404');
		c.send();
		
		
};

CreatePDFView();
