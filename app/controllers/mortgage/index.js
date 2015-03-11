var evt={
	principal:0,
	init:function(){
		mor.setEvent();
	}
	
};


var mor={
	setEvent:function(){
		$.price.addEventListener('change',mor.calPrincipal);
		$.mortgagerate.addEventListener('change',mor.calPrincipal);
		$.cancel.addEventListener('click',function(e){
			$.price.value=200;
			$.mortgagerate.value=70;
			$.principal.text=1400000;
			$.rate.value=2.25;
			$.period.value=20;
			
		});
		$.submit.addEventListener('click',function(){
			var obj={
					price:$.price.value*10000,
					mortgagerate:$.mortgagerate.value,
					principal:$.principal.text,
					rate:$.rate.value,
					
					period:$.period.value
				};
			var detailWin=Alloy.createController('mortgage/mortgageCal',obj).getView();
		});
	}
	,calPrincipal:function(){
		var price=$.price.value*10000;
		var mortgagerate=$.mortgagerate.value;
		if (!isNaN(price)&&!isNaN(mortgagerate)){
			evt.principal=Math.round(price*mortgagerate/100);
			$.principal.text=evt.principal;
		}
	}
};
evt.init();
