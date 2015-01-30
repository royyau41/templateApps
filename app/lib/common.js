
exports.getLoadingView=function(link,obj){
	var style;
			if (Ti.Platform.name === 'iPhone OS'){
			  style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
			}
			else {
			  style = Ti.UI.ActivityIndicatorStyle.DARK;
			}
	var activityIndicator = Ti.UI.createActivityIndicator({
		  color: 'black',
		  font: {fontSize:26, fontWeight:'bold'},
		  message: 'Loading...',
		  style:style,
		  top:10,
		  left:10,
		  height:Ti.UI.SIZE,
		  width:Ti.UI.SIZE
		});
	var win=Ti.UI.createWindow({
		navBarHidden:true,
		fullscreen:true,
		 orientationModes : [
	        Titanium.UI.LANDSCAPE_LEFT,
	        Titanium.UI.LANDSCAPE_RIGHT
	    ],
		width:Ti.UI.SIZE,
		height:Ti.UI.SIZE,
		
	});
	//Alloy.Globals.currentWindow.add(loadView);
	if (OS_ANDROID){
		
		var toast = Ti.UI.createNotification({
		    message:"Loading..."
		    
		});
		toast.show();
		var view=Alloy.createController(link,obj).getView();
		toast.hide();
		toast.setOpacity(0);
		toast.setVisible(false);
	}
	else {
		win.add(activityIndicator);
		win.open();
		activityIndicator.show();
		var view=Alloy.createController(link,obj).getView();
		activityIndicator.hide();
		win.close() ;
	}
	return view ;
};

exports.FitFontSize=function(size){
	var tmp = (Titanium.Platform.displayCaps.platformHeight*size)/100;
	if (OS_ANDROID){
		tmp=tmp/3+'sp';	
		}
	

	return tmp;
	
};

exports.PixelsToDPUnits=function(ThePixels)
{
	if (OS_ANDROID)
  return (ThePixels / (Titanium.Platform.displayCaps.dpi / 160));
  else 
  return ThePixels;
};
 
 
 exports.DPUnitsToPixels=function(TheDPUnits)
{
	if (OS_ANDROID)
  return (TheDPUnits * (Titanium.Platform.displayCaps.dpi / 160));
  else 
  return TheDPUnits;
};



exports.addCommas=function(number,id){
								number += '';
								x = number.split('.');
								x1 = x[0];
								x2 = x.length > 1 ? '.' + x[1] : '';
								var rgx = /(\d+)(\d{3})/;
								while (rgx.test(x1)) {
									x1 = x1.replace(rgx, '$1' + ',' + '$2');
								}
								return x1 + x2;
};




exports.displayValue=function(itemField,o_value,k){
//(itemField[fieldName].fieldType=='number')?(comjs.addCommas(detail[itemField[fieldName].field]*(itemField[fieldName].base||1))||''):(detail[itemField[fieldName].field]||'');

	switch(itemField.fieldType){
		case 'boolean':
					if (o_value==0||o_value==''){
						return 'N/A';
					}else if (o_value){
						return  'Y';
					}
		break;
		case 'number':
			var value=(comjs.addCommas(o_value*(itemField.base||1))||'');
			return value;
		break;
		default:
			switch(itemField.returnType){
				case 'boolean':
					if (o_value==0||o_value==''){
						return 'N/A';
					}else if (o_value){
						return  'Y';
					}
				default:
					return (o_value||'');
				break;	
			}
			
			
		break;
	};
};
exports.morAddCommas=function(s) {
	var output='';
	if (s){
	 s=s*100;
				s=Math.round(s);
				//dump_number=dump_number/10000;
	s=s.toString();
    //number before the decimal point
    num = s.substring(0,s.length-2);
    //number after the decimal point
    dec = s.substring(s.length-2,s.length);

    var amount = new String(num);
    amount = amount.split("").reverse();

    var output = "";
    for ( var i = 0; i <= amount.length-1; i++ ){
        output = amount[i] + output;
        if ((i+1) % 3 == 0 && (amount.length-1) !== i) output = ',' + output;
    }

    output = output + "." + dec;
   }
    return output;
};



exports.changeColor=function(elm,win){
	elm.addEventListener('longpress',function(e){
			
			var dialog = Ti.UI.createAlertDialog({
				    cancel: 0,
				    buttonNames: ['取消', 'backgroudColor','color'],
				    message: '改變顏色',
				    title: elm.id
				  });
				  dialog.addEventListener('click', function(colorE){
				  	
				    if (colorE.index == 1){
				    	var basicui=new baseUi();
						var colorPicker= basicui.getColorPickerView({
							width:300,
							height:300,
							selectedcolor:function(colPick){
								elm.backgroundColor='#'+colPick.color;
								
							}
							,clickCancel:function(colorPickview){
								win.remove(colorPickview);
							}
						});
						win.add(colorPicker);
				    }
				    if (colorE.index==2){
				     	var basicui=new baseUi();
						var colorPicker= basicui.getColorPickerView({
							width:300,
							height:300,
							selectedcolor:function(colPick){
								elm.color='#'+colPick.color;
								
							}
							,clickCancel:function(colorPickview){
								win.remove(colorPickview);
							}
						});
						win.add(colorPicker);
				    }
				  });
				  dialog.show();
				  
		});
};

