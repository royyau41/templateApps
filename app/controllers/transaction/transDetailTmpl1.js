var args = arguments[0] || {};
var viewFile=require('viewFile').viewFile;
var e={
	init:function(){
		this.getData();
	}
	,getData:function(){
		
		xhr.request({	
					postData:{mid:args.number},
					url:'getTransDetailProp.php?mid='+args.number,
					success:function(e){
											
						e=e[0];
						console.log(e);	
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


