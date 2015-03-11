var v={
	page:1,
	maxPage:0,
	price_type:3,
	district:'',
	propertyList:[]
	
	
};
var favoriteProp=Ti.App.Properties.getList('favoriteProp',[]);

var evt={
	init:function(){
		
		f.setEvent();
		f.getData();
	},
	reloadData:function(){
		favoriteProp=Ti.App.Properties.getList('favoriteProp',[0]);
		f.getData();
	}
};

var f={
	setEvent:function(){
		$.searchResultTable.addEventListener('click',function(e){
			
			var obj={
					number:e.row.number,
					propertyList:v.propertyList,
					closeFunc:function(){
						evt.reloadData();
						//console.log('test');
						
					}
				};
			var detailWin=Alloy.createController('property/propertyDetail',obj).getView();
			detailWin.addEventListener('close',function(e){
				cosnole.log('qe12e');
			});
			
		});
		
	}
	,getData:function(){
			console.log(favoriteProp.length);
			if (favoriteProp.length==0)favoriteProp.push(99999999);
			var data={
							id:favoriteProp.toString()
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
							v.propertyList.push(elm.NUMBER);
							var result=Alloy.createController('property/sePropTmpl1',elm).getView();
							row.push(result);
						});
						$.searchResultTable.data=row;
						
					}
					,error:function(e){
						console.log(e);
					}
				}
			);
		}
	
};
var returnPrice=function(value){
	switch(v.price_type){
		case 1:
			switch($.minUnit.text){
				case '萬':
					value=value;
				break;
				case '十萬':
					value=value*10;
				break;
				case '百萬':
					value=value*100;
				break;
				case '千萬':
					value=value*1000;
				break;
				case '千':
					value=value/10;
				break;
				case '百':
					value=value/100;
				break;
			}
		break;
		case 2:
		switch($.minUnit.text){
				case '萬':
					value=value*10000000;
				break;
				case '十萬':
					value=value*100000000;
				break;
				case '百萬':
					value=value*1000000000;
				break;
				case '千萬':
					value=value*10000000000;
				break;
				case '千':
				
					value=value*1000000;
				break;
				case '百':
					value=value*100000;
				break;
			}
		break;
	}
	return Math.round(value);
	
};
var slider={
		changeValue:function(e){
			var valueLabel=this.change;
			eval('$.'+valueLabel+'.text=Math.round( e.value)');
		}
		
	};

evt.init();
