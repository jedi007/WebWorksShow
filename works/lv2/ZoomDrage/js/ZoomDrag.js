;
function extend(target, source) {
	for (var obj in source) {
		target[obj] = source[obj];
	}
	return target;
}

function Zoomer(div){
	var zoombtn = document.createElement('div');
	console.log('Zoomer is called');
	console.log(div);
	
	div.style.position = "absolute";
	
	div.appendChild(zoombtn);
	
	zoombtn.style = "width:15px;height:15px;position: absolute;bottom:0;right:0;background:"+
					"linear-gradient(-45deg, white, white 8%, black 0,black 16%,white 0,white 24%, black 0,black 32%, white 0,white 40%, black 0,rgba(0,0,0,0) 48%, rgba(0,0,0,0) 0,rgba(0,0,0,0) 100%);";
	
	zoombtn.onmouseover = function(event){
		window.event? window.event.cancelBubble = true : event.stopPropagation();
		zoombtn.style.cursor = "se-resize";
	};
	
	var settings = {
		MinWidth:15,
		MinHeight:15,
		MaxWidth: 500,
		MaxHeight:500,
		onResize:null
	};
	
	this.setsettings = function(obj){
		console.log("obj:"+typeof(obj));
		if(typeof(obj) == "object")
		{
			extend(settings,obj);
		}
	}
	
	zoombtn.onmousedown = function(ev){
		ev.preventDefault?ev.preventDefault():window.event.returnValue == false;
		
		var oevent = ev || event;
		var oX = oevent.clientX;
		var oY = oevent.clientY;
		
		var oW = div.offsetWidth;
		var oH = div.offsetHeight;
		
		document.body.style.cursor = "se-resize";

　　　　 document.onmousemove = function(ev){
　　　　　	var oevent = ev || event;
			var nX = oevent.clientX;
　　　　 	var nY = oevent.clientY;
			var tW = oW+(nX-oX);
			var tH = oH+(nY-oY);
			if(tW < settings.MinWidth) tW = settings.MinWidth;
			if(tH < settings.MinHeight) tH = settings.MinHeight;
			if(tW > settings.MaxWidth) tW = settings.MaxWidth;
			if(tH > settings.MaxHeight) tH = settings.MaxHeight;
			div.style.width = tW+"px";
			div.style.height = tH+"px";
			if(settings.onResize)
				settings.onResize();
　　　　 };
		
		document.onmouseup = function(){
　　　　　	document.onmousemove = null;
　　　　　	document.onmouseup = null;
			
			document.body.style.cursor = 'default';
　　　　};
	};
}

function Drager(div){
	var dragertitle = document.createElement('div');
	dragertitle.style = "position: absolute;width:100%;height:10px;background-color:#636363;top:-10px;";
	div.appendChild(dragertitle);
	
	this.settitleclass = function(vclass){
		dragertitle.className = vclass;
		dragertitle.style = "";
	}
	
	dragertitle.onmousedown = function(ev){
		ev.preventDefault?ev.preventDefault():window.event.returnValue == false;
		
		var oevent = ev || event;
		var oX = oevent.clientX;
		var oY = oevent.clientY;
		var disX = oX - div.offsetLeft;
		var disY = oY - div.offsetTop;
		
　　　　 document.onmousemove = function(ev){
　　　　　	var oevent = ev || event;
			var nX = oevent.clientX;
　　　　 	var nY = oevent.clientY;

			div.style.left = (nX-disX)+"px";
			div.style.top = (nY-disY)+"px";
　　　　 };
		
		document.onmouseup = function(){
　　　　　	document.onmousemove = null;
　　　　　	document.onmouseup = null;
　　　　};
	}
}