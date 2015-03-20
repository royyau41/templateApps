var args = arguments[0] || {};
var viewFile=require('viewFile').viewFile;
var e={
	init:function(){
		this.getData();
		this.setEvent();
	}
	,setEvent:function(){
		$.transDetail.addEventListener('click',function(){
			var basicui=new basicUI(true,false);
			var win1=basicui.getBasic_win();
			var mainView=basicui.getContentView();
			var url=Alloy.Globals.webLink+'transDetailMobile.php?id='+args.number;
			 var webView = Titanium.UI.createWebView({url:url});
			 mainView.add(webView);
			 win1.open();
		});
	}
	,getData:function(){
		
		xhr.request({	
					postData:{mid:args.number},
					url:'getTransDetailProp.php?mid='+args.number,
					success:function(e){
											
						e=e[0];
						
						$.fulladdr.text=e.FULLADDR;
						$.memorial_date.text=e.MEMORIAL_DATE;
						$.district.text=e.DISTRICT;
						$.gfa.text=e.GFA;
						$.nfa.text=e.NFA;
						$.price.text=e.PRICE;
						$.avggfa.text=e.AVGGFA;
						$.natinst.text=e.NATINST;
						$.usage.text=e.USAGE;
												
					}
					,error:function(e){
						console.log(e);
				
					}
				});
	}
	
};

e.init();


