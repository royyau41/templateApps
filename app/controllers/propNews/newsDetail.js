var args = arguments[0] || {};

var basicui=new basicUI(true,false);
var win=basicui.getBasic_win();
var mainView=basicui.getContentView();
var viewFile=require('viewFile').viewFile;




var e={
	currentPage:0,
	containers:[],
	initNews:args.number,
	newsList:args.newsList,
	init:function(){	
		mainView.add($.newsDtlScrollView);
		this.setScrollView();
		
	}
	,setScrollView:function(){
		var i=0;
		for (var k in this.newsList){
			var basic_view= Ti.UI.createView({width:Ti.UI.FILL,height:Ti.UI.FIll });
			this.containers.push(basic_view);
			
			
			if (this.newsList[k]==this.initNews){
				f.loadView(this.containers[i],this.newsList[k]);
				showMessageTimeout((i+1)+'/'+e.newsList.length,1000);
				this.currentPage=i;
				$.newsDtlScrollView.currentPage=i;
			}
			i++;
		}
		$.newsDtlScrollView.views=this.containers;
		$.newsDtlScrollView.addEventListener('scroll',function(evt){
			
			if (e.currentPage!=evt.currentPage){
				e.currentPage=evt.currentPage;
		 		f.loadView(e.containers[evt.currentPage], e.newsList[evt.currentPage]);
		 		showMessageTimeout((evt.currentPage+1)+'/'+e.newsList.length,1000);
			}
		});
		$.newsDtlScrollView.currentPage=this.currentPage;
	}
	
};

var f={
	loadView:function(view,newsID){
		
		if (view){
	    if (view.children.length ) {
	    }else {
	    // add new children
	     	
		   var obj={
		   	win:win,
		   	number:newsID,
		   	
		   };
		   view.add(Alloy.createController('propNews/newsDetailTmpl'+(args.layout||1),obj).getView());
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






