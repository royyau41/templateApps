var v={
	page:1,
	maxPage:0,
	price_type:2,
	district:'',
	transList:[],
	fromYear:'',
	fromMonth:'',
	toYear:'',
	toMonth:''
	
	
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
				$.search.text='    搜尋更多田土廳成交 ↓';
			}
			else {
				$.searchParaContain.height=0;
				$.search.text='    搜尋更多田土廳成交 ↑';
			}
		});
		$.searchDis.addEventListener('click',function(e){
			f.setDistrictOption();
			
		
		});
		$.fromYear.addEventListener('click',function(evt){
			var currentTime = new Date();
			var date=[];
			for (var i = 2011;i<=currentTime.getFullYear();i++){
				date.push(i);	
			}
			date.push('取消');
			var opts = {
					  cancel: (date.length-1),
					  options: date,
					  selectedIndex: 2,
					  destructive: 0,
					  title: '選擇年份'
					};
			 var dialog = Ti.UI.createOptionDialog(opts);
			 dialog.show();
			 dialog.addEventListener('click',function(e){
			 	if (date[e.index]!='取消'){
			  	 $.fromYear.text=date[e.index];
			  	 v.fromYear=date[e.index];

			  	}else {
			  		v.fromYear='';
			  		$.fromYear.text='年';
			  	}
			 });
		});
		$.toYear.addEventListener('click',function(evt){
			var currentTime = new Date();
			var date=[];
			for (var i = 2011;i<=currentTime.getFullYear();i++){
				date.push(i);	
			}
			date.push('取消');
			var opts = {
					  cancel: (date.length-1),
					  options: date,
					  selectedIndex: 2,
					  destructive: 0,
					  title: '選擇年份'
					};
			 var dialog = Ti.UI.createOptionDialog(opts);
			 dialog.show();
			 dialog.addEventListener('click',function(e){
			 	if (date[e.index]!='取消'){
			  	 $.toYear.text=date[e.index];
			  	 v.toYear=date[e.index];
			  	}else {
			  		v.toYear='';
			  		$.toYear.text='年';
			  	}
			 });
		});
		
		$.fromMonth.addEventListener('click',function(evt){
			
			var date=[];
			for (var i = 1;i<=12;i++){
				date.push(((i.toString().length<2)?'0'+i:i));
			}
			date.push('取消');
			var opts = {
					  cancel: (date.length-1),
					  options: date,
					  selectedIndex: 2,
					  destructive: 0,
					  title: '選擇月份'
					};
			 var dialog = Ti.UI.createOptionDialog(opts);
			 dialog.show();
			 dialog.addEventListener('click',function(e){
			 	if (date[e.index]!='取消'){
			  	 $.fromMonth.text=date[e.index];
			  	 v.fromMonth=date[e.index];
			  	}else {
			  		v.fromMonth='';
			  		$.fromMonth.text='月';
			  	}
			 });
		});
		
		$.toMonth.addEventListener('click',function(evt){
			
			var date=[];
			for (var i = 1;i<=12;i++){
				
				
				date.push(((i.toString().length<2)?'0'+i:i));	
			}
			date.push('取消');
			var opts = {
					  cancel: (date.length-1),
					  options: date,
					  selectedIndex: 2,
					  destructive: 0,
					  title: '選擇月份'
					};
			 var dialog = Ti.UI.createOptionDialog(opts);
			 dialog.show();
			 dialog.addEventListener('click',function(e){
			 	if (date[e.index]!='取消'){
			  	 $.toMonth.text=date[e.index];
			  	 v.toMonth=date[e.index];
			  	}else {
			  		v.toMonth='';
			  		$.toMonth.text='月';
			  	}
			 });
		});
		$.submit.addEventListener('click',function(e){
			v.page=1;
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
		v.page=1;
		v.district='';
		v.fromYear='';
		$.fromYear.text='年';
		v.toMonth='';
		$.toMonth.text='月';
		v.toYear='';
		$.toYear.text='年';
		v.fromMonth='';
		$.fromMonth.text='月';
		
		
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
			var date1='';
			var date2='';
			if (v.fromYear&&v.fromMonth){
				date1=v.fromYear+'/'+v.fromMonth+'/01';
			}
			if (v.toYear&&v.toMonth){
				date2=v.toYear+'/'+v.toMonth+'/31';
			}
			
			var data={
							price_type:v.price_type,
							price1:Math.round($.minPriceSlider.value),
							price2:($.maxPriceSlider.value==$.maxPriceSlider.max)?$.maxPriceSlider.value+'+':Math.round($.maxPriceSlider.value),
							st:$.streetField.value,
							district:v.district,
							date1:date1,
							date2:date2,
							//area1:Math.round($.minAreaSlider.value),
							//area2:($.maxAreaSlider.value==$.maxPriceSlider.max)?$.maxAreaSlider.value+'+':Math.round($.maxAreaSlider.value),
							sort_by:'sort_date',
							sort_method:'d',
							page_position:v.page
				};
				console.log(data);
			xhr.request(
				{	
					postData:data,
					url:'getTransactionSearch.php',
					success:function(e){
						
						var row=[];
						var i=0;
						var underRowView;
						_.each(e.DAYBOOK_RESULT,function(elm){
							elm.backgroundColor=Alloy.Globals.indexbackgroundColor[i%2];
							
							v.transList.push(elm.MEMORIAL_NUM);
							var result=Alloy.createController('transaction/seTransTmpl1',elm).getView();
							row.push(result);
							i++;
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
