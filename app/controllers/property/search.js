var v={
	page:1,
	maxPage:0,
	price_type:2,
	district:''
	
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
		
		$.sell.addEventListener('click',function(e){
			if (v.price_type!=1){
				v.price_type=1;
				$.searchResultTable.setBackgroundColor(this.backgroundColor);
				f.resetTable();
				f.getData();
			}
			
			
			
			//$.searchResultTable
		});
		$.rent.addEventListener('click',function(e){
			if (v.price_type!=0){
				v.price_type=0;
				$.searchResultTable.setBackgroundColor(this.backgroundColor);
				f.resetTable();
				f.getData();
			}
		});
		$.searchDis.addEventListener('click',function(e){
			f.setDistrictOption();
			
		
		});
		$.submit.addEventListener('click',function(e){
			f.resetTable();
			f.getData();
			$.search.fireEvent('click');
		});
		$.cancel.addEventListener('click',function(e){
			f.resetSearch();
		});
		
		$.minPriceSlider.addEventListener('change', slider.changeValue);
		$.maxPriceSlider.addEventListener('change', slider.changeValue);
		$.minAreaSlider.addEventListener('change', slider.changeValue);
		$.maxAreaSlider.addEventListener('change', slider.changeValue);
		
	}
	,tableLoader:function(e,collection){
		
		v.page++;
		f.getData();
		e.success();
	}
	,setDistrictOption:function(){
		if (!Alloy.Globals.distArry){
			xhr.request(
				{	
					postData:{},
					url:'loadDistList.php',
					success:function(e){
						Alloy.Globals.distArry=e.HK.concat(e.KLN,e.NT);
						f.setDistrictArry();
						
					}
					,error:function(e){
						console.log(e);
					}
				}
			);
		}else {
			f.setDistrictArry();
		}
		
	}
	,setDistrictArry:function(){
		var opts = {
					  //cancel: 2,
					  options: Alloy.Globals.distArry,
					  selectedIndex: 2,
					  destructive: 0,
					  title: '選擇區域'
					};
		 var dialog = Ti.UI.createOptionDialog(opts);
		 dialog.show();
		 dialog.addEventListener('click',function(e){
		  	 $.searchDistVal.text=Alloy.Globals.distArry[e.index];
		  	 v.district=Alloy.Globals.distArry[e.index];
		 });
	}
	,resetSearch:function(){
		$.searchDistVal.text='全部';
		v.district='';
		$.minPriceSlider.setValue($.maxPriceSlider.min);
		$.maxPriceSlider.setValue($.maxPriceSlider.max);
		$.minAreaSlider.setValue($.maxAreaSlider.min);
		$.maxAreaSlider.setValue($.maxAreaSlider.max);
	}
	,resetTable:function(){
		var rd = []; $.searchResultTable.data = rd;
	}
	,getData:function(){
			//console.log(xhr.request);
			var data={
							price_type:v.price_type,
							price1:Math.round($.minPriceSlider.value),
							price2:($.maxPriceSlider.value==$.maxPriceSlider.max)?$.maxPriceSlider.value+'+':Math.round($.maxPriceSlider.value),
							street_name:$.streetField.value,
							district:v.district,
							area1:Math.round($.minAreaSlider.value),
							area2:($.maxAreaSlider.value==$.maxPriceSlider.max)?$.maxAreaSlider.value+'+':Math.round($.maxAreaSlider.value),
							sort_by:'sort_date',
							sort_method:'d',
							page_position:v.page
				};
				//console.log(data);
			xhr.request(
				{	
					postData:data,
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
var slider={
		changeValue:function(e){
			var valueLabel=this.change;
			eval('$.'+valueLabel+'.text=Math.round( e.value)');
		}
		
	};

e.init();
