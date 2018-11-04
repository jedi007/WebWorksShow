var make_3lvbtn = function(divdom){
	var jdivdom = $(divdom);
	var parentH = jdivdom.height();
	var parentW = jdivdom.width();
	var ceilW = parentW*0.2;
	
	var _this = this;
	this.lvindex = 1;
	
	this.bindlvindex = function(callbackf){
		_this.callbf = callbackf;
	}
	
	
	
	console.log("w h:"+parentW+"   -  "+parentH);
	
	
	jdivdom.html('<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">');
	var jtsvg = jdivdom.find("svg");
	
	var strhtml = "";
	//strhtml += '<rect class="rectangle" width="100%" height="100%" fill="red" />';
	var lvstr = ['初级','中级','高级','变态'];
	for(var i = 1;i<5;i++)
	{
		if(i == this.lvindex)
			strhtml += '<line id="line'+i+'" x1="'+ceilW*i+'" y1="0" x2="'+ceilW*i+'" y2="100%" style="stroke:#ff0000;stroke-width:2"/>';
		else
			strhtml += '<line id="line'+i+'" x1="'+ceilW*i+'" y1="0" x2="'+ceilW*i+'" y2="100%" style="stroke:#FDF5E6;stroke-width:2"/>';
		strhtml += '<text x="'+ceilW*(i-0.2)+'" y="15" fill="red">'+lvstr[i-1]+'</text>';
	}
	strhtml += '<circle id="cir1" cx='+ceilW*this.lvindex+' cy="50%" r='+parentH*0.15+' stroke="black" stroke-width="2" fill="red" z-index:1000/>';//从画面上看，r=20%大概是是r=20%*（x+y）/2
	
	
	jtsvg.html(strhtml);

	var rlx = 0;
	
	$("#cir1").mousedown(function(evt){
		var cx = $(this).attr('cx');
		rlx = cx - evt.offsetX;
		$("#cir1").mousemove(function(evt){
			var targetcx = evt.offsetX+rlx;
			if((evt.offsetX+rlx)<ceilW)
				targetcx = ceilW;
			if((evt.offsetX+rlx)>ceilW*4)
				targetcx = ceilW*4;
				
			$(this).attr('cx',targetcx);
		});
		
		$("#cir1").mouseup(function(evt){
			moveover(evt);
		});	
		
		$("#cir1").mouseleave(function(evt){
			moveover(evt);
		});
	});
	
	var moveover = function(evt){
		console.log("mousemove is unbind by moveover");
		
		var targetcx = evt.offsetX+rlx;
		
		console.log(targetcx);
		
		_this.lvindex = Math.round(targetcx/ceilW);
		$("#cir1").attr('cx',_this.lvindex*ceilW);
		
		
		for(var i = 1;i<5;i++)
		{
			$('#line'+i).css({'stroke-width':'2','stroke':'#FDF5E6'});
		}
		$('#line'+_this.lvindex).css({'stroke-width':'2','stroke':'#ff0000'});
		//Style("stroke:#FDF5E6;stroke-width:12");
		_this.callbf(_this.lvindex);
		
		$("#cir1").unbind("mousemove");
		$("#cir1").unbind("mouseup");
		$("#cir1").unbind("mouseleave");
	}
	
	jdivdom.append(jtsvg);
}