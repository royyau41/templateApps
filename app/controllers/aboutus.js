var evt={
	init:function(){
		about.setEvent();
	}
};

var about={
	setEvent:function(){
		$.contact.addEventListener('click',function(e){
			var dialog = Ti.UI.createAlertDialog({
			    cancel:2,
			    buttonNames: ['電郵', '致電', '取消'],
			    message: '請選擇聯絡方式',
			    title: '聯絡壹專業'
			  });
			  dialog.addEventListener('click', function(e){
			  	switch(e.index){
			  		case 0:
			  		tools.email({},{
			  				toEmail:'tc@theoneshop.com.hk',
			  				title:'聯絡我們',
			  				type:'contactUs'
			  			});
			  		break;
			  		case 1:
			  		tools.phone('23662833');
			  		break;
			  		case 2:
			  		break;
			  	}
			   
			  });
			  dialog.show();
		});
	}
};
evt.init();
