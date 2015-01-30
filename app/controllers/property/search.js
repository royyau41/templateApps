var v={
	page:1,
	maxPage:0
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
		$.search.addEventListener('click',function(e){
			if ($.searchParaContain.height==0){
				$.searchParaContain.height=Ti.UI.FILL;
				$.search.text='搜尋 ↓';
			}
			else {
				$.searchParaContain.height=0;
				$.search.text='搜尋 ↑';
			}
		});
		
	}
	,tableLoader:function(e,collection){
		
		v.page++;
		f.getData();
		e.success();
	}
	,getData:function(){
			//console.log(xhr.request);
			xhr.request(
				{	
					postData:{
							price_type:1,
							price1:1,
							price2:'10005+',
							street_name:'',
							area1:'1',
							area2:'6000+',
							sort_by:'sort_date',
							sort_method:'d',
							page_position:v.page
					},
					url:'getPropSearch.php',
					success:function(e){
						
						var row=[];
						var i=0;
						var underRowView;
						_.each(e.SEARCH_RESULT,function(elm){
							
							var result=Alloy.createController('property/sePropTmpl1',elm).getView();
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
