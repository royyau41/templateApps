v={
	page:1,
	newsList:[]
};

var e={
	init:function(){
		$.is.init($.searchResultTable);
		
		f.setEvent();
		f.getData();
	}
};

var f={
	setEvent:function(){
		
		
		$.searchResultTable.addEventListener('click',function(e){
			
			var obj={
					number:e.row.number,
					
					newsList:v.newsList
					
				};
			var detailWin=Alloy.createController('propNews/newsDetail',obj).getView();
			
		});
		
		
	}
	,tableLoader:function(e,collection){
		
		v.page++;
		f.getData();
		e.success();
	}
	,getData:function(){
			//console.log(xhr.request);
		
				//console.log(data);
			xhr.request(
				{	
					postData:{
						type:4,
						page:v.page
					},
					url:'getCompanyNews.php',
					success:function(e){
						
						var row=[];
						var i=0;
						var underRowView;
						_.each(e.SEARCH_RESULT,function(elm){
							v.newsList.push(elm.NUMBER);
							var result=Alloy.createController('propNews/seNewsTmpl1',elm).getView();
							row.push(result);
						});
						$.searchResultTable.appendRow(row);
						
					}
					,error:function(e){
						console.log(e);
					}
				}
			);
		}
	
};


e.init();
