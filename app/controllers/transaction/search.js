var v={
	page:1,
	maxPage:0,
	price_type:2,
	district:'',
	transList:[]
	
	
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
				$.search.text='    搜尋 ↓';
			}
			else {
				$.searchParaContain.height=0;
				$.search.text='    搜尋 ↑';
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
		
		$.searchResultTable.addEventListener('click',function(e){
			
			var obj={
					number:e.row.number,
					transList:v.transList
					
				};
			var detailWin=Alloy.createController('transaction/transDetail',obj).getView();
			
		});
		$.minPriceSlider.addEventListener('change', slider.changeValue);
		$.maxPriceSlider.addEventListener('change', slider.changeValue);
		//$.minAreaSlider.addEventListener('change', slider.changeValue);
		//$.maxAreaSlider.addEventListener('change', slider.changeValue);
		
	}
	,tableLoader:function(e,collection){
		
		v.page++;
		f.getData();
		e.success();
	}
	,setDistrictOption:function(){
		if (!Alloy.Globals.transDistArry){
			xhr.request(
				{	
					postData:{},
					url:'loadTransDistList.php',
					success:function(e){
						Alloy.Globals.transDistArry=e.HK.concat(e.HK,e.KLN,e.NT,e.NT);
						Alloy.Globals.transDistArry.push({NUMBER:0,DISTRICTNAME:'取消'});
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
		var arrayList=[];
		_.each(Alloy.Globals.transDistArry,function(elm){
			arrayList.push(elm.DISTRICTNAME);
		});
		var opts = {
					  cancel: (Alloy.Globals.transDistArry.length-1),
					  options: arrayList,
					  selectedIndex: 2,
					  destructive: 0,
					  title: '選擇區域'
					};
		 var dialog = Ti.UI.createOptionDialog(opts);
		 dialog.show();
		 dialog.addEventListener('click',function(e){
		 	if (Alloy.Globals.transDistArry[e.index].NUMBER!=0){
		  	 $.searchDistVal.text=Alloy.Globals.transDistArry[e.index].DISTRICTNAME;
		  	 v.district=Alloy.Globals.transDistArry[e.index].NUMBER;
		  	}
		 });
	}
	,resetSearch:function(){
		$.searchDistVal.text='全部';
		v.district='';
		$.minPriceSlider.setValue($.maxPriceSlider.min);
		$.maxPriceSlider.setValue($.maxPriceSlider.max);
		//$.minAreaSlider.setValue($.maxAreaSlider.min);
		//$.maxAreaSlider.setValue($.maxAreaSlider.max);
	}
	,resetTable:function(){
		var rd = []; $.searchResultTable.data = rd;
		v.transList= [];
	}
	,getData:function(){
			//console.log(xhr.request);
			var data={
							price_type:v.price_type,
							price1:Math.round($.minPriceSlider.value),
							price2:($.maxPriceSlider.value==$.maxPriceSlider.max)?$.maxPriceSlider.value+'+':Math.round($.maxPriceSlider.value),
							street_name:$.streetField.value,
							district:v.district,
							//area1:Math.round($.minAreaSlider.value),
							//area2:($.maxAreaSlider.value==$.maxPriceSlider.max)?$.maxAreaSlider.value+'+':Math.round($.maxAreaSlider.value),
							sort_by:'sort_date',
							sort_method:'d',
							page_position:v.page
				};
				//console.log(data);
			xhr.request(
				{	
					postData:data,
					url:'getTransactionSearch.php',
					success:function(e){
						
						var row=[];
						var i=0;
						var underRowView;
						_.each(e.DAYBOOK_RESULT,function(elm){
							v.transList.push(elm.MEMORIAL_NUM);
							var result=Alloy.createController('transaction/seTransTmpl1',elm).getView();
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
