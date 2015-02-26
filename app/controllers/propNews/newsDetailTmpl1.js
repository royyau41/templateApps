var args = arguments[0] || {};
var viewFile=require('viewFile').viewFile;
var e={
	init:function(){
		this.getData();
	}
	,getData:function(){
		
		xhr.request({	
					postData:{mid:args.number},
					url:'getCompanyNewsDetail.php?number='+args.number,
					success:function(e){
											
						e=e[0];
						
						$.title.text=e.TITLE;
						$.content.text=e.CONTENT;
						
												
					}
					,error:function(e){
						console.log(e);
				
					}
				});
	}
	
};

e.init();


