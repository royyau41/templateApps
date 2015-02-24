var args = arguments[0] || {};

var basicui=new basicUI(true,false);
var win=basicui.getBasic_win();
var mainView=basicui.getContentView();
var viewFile=require('viewFile').viewFile;




var e={
	currentPage:0,
	containers:[],
	initTrans:args.number,
	transList:args.transList,
	init:function(){	
		mainView.add($.transDtlScrollView);
		this.setScrollView();
		
	}
	,setScrollView:function(){
		var i=0;
		for (var k in this.transList){
			var basic_view= Ti.UI.createView({width:Ti.UI.FILL,height:Ti.UI.FIll });
			this.containers.push(basic_view);
			
			
			if (this.transList[k]==this.initTrans){
				f.loadView(this.containers[i],this.transList[k]);
				showMessageTimeout((i+1)+'/'+e.transList.length,1000);
				this.currentPage=i;
				$.transDtlScrollView.currentPage=i;
			}
			i++;
		}
		$.transDtlScrollView.views=this.containers;
		$.transDtlScrollView.addEventListener('scroll',function(evt){
			
			if (e.currentPage!=evt.currentPage){
				e.currentPage=evt.currentPage;
		 		f.loadView(e.containers[evt.currentPage], e.transList[evt.currentPage]);
		 		showMessageTimeout((evt.currentPage+1)+'/'+e.transList.length,1000);
			}
		});
		$.transDtlScrollView.currentPage=this.currentPage;
	}
	
};

var f={
	loadView:function(view,transID){
		
		if (view){
	    if (view.children.length ) {
	    }else {
	    // add new children
	     	
		   var obj={
		   	win:win,
		   	number:transID,
		   	
		   };
		   view.add(Alloy.createController('transaction/transDetailTmpl'+(args.layout||1),obj).getView());
	   }
	   }
	}
};

var showMessageTimeout = function(customMessage,interval){
        var indView = Titanium.UI.createView({
        		height:Ti.UI.SIZE,
        		width:Ti.UI.SIZE,
        		right:10,
        		top :10,
        		borderRadius:10,
        		opacity:0.5,
        		backgroundColor:'#2E2E2E',
        		zIndex:1000,});
        // message
        var message = Titanium.UI.createLabel({
            text: customMessage && typeof(customMessage!=='undefined') ? customMessage : L('please_wait'),
            color:'#fff',width:'auto',height:'auto',textAlign:'center',
            top:10,
            left:10,
            right:10,
            bottom:10,
            zIndex:1000,
            font:{fontFamily:'Helvetica Neue', fontSize:12,fontWeight:'bold'}});
 
        indView.add(message);
        mainView.add(indView);
 
        interval = interval ? interval : 3000;
        setTimeout(function(){
        	mainView.remove(indView);
        },interval);	
    };


e.init();
win.open();






