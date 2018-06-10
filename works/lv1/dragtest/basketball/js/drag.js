var iSpeedX=0;
var iSpeedY=0;
var oDiv=null;
var currentdeg = 10;
window.onload = function()
{
	oDiv = document.getElementById("div1");
	oDiv.style.left = '200px';
	oDiv.style.top = '200px';
	var lastX=0;
	var lastY=0;
	oDiv.onmouseover=function(ev)
	{
		this.style.cursor = 'url(./images/hand_4.ico),auto';
	}
	oDiv.onmousedown=function(ev)
	{
		this.style.cursor = 'url(./images/hand_5.ico),auto';
		
		var oEvent=ev||event;
		var disX=oEvent.clientX-oDiv.offsetLeft;
		var disY=oEvent.clientY-oDiv.offsetTop;
		
		document.onmousemove=function(ev)
		{
			var oEvent=ev||event;
			
			var l=oEvent.clientX-disX;
			var t=oEvent.clientY-disY;
			
			oDiv.style.left=l+'px';
			oDiv.style.top=t+'px';
			
			iSpeedX=l-lastX;
			iSpeedY=t-lastY;
			
			lastX=l;
			lastY=t;
			
			document.title='x:'+iSpeedX+', y:'+iSpeedY;
		}
		
		document.onmouseup=function()
		{
			document.onmousemove=null;
			document.onmouseup=null;
			
			startmove();
		}
	}			
}

var timer = null;
function startmove()
{
	clearInterval(timer);
	timer=setInterval(
	function()
	{
		iSpeedY+=3;
		
		var l=oDiv.offsetLeft+iSpeedX;
		var t=oDiv.offsetTop+iSpeedY;
		
		var floort=document.documentElement.clientHeight-oDiv.offsetHeight-25;//因为加了旋转，边角会出界，所以多加几个像素
		var rightsidel=document.documentElement.clientWidth-oDiv.offsetWidth-25;
		
		if(l > rightsidel)
		{
			iSpeedX*=-0.8;
			l = rightsidel;
		}
		if(l<=0)
		{
			iSpeedX*=-0.8;
			l=0;
		}
		
		
		
		if(t >= floort)
		{
			t = floort;
			iSpeedY*=-0.9;
			iSpeedX*=0.9;
		}
		
		if(t <= 0)
		{
			t = 0;
			iSpeedY*=-0.95;
		}									
		
		if(Math.abs(iSpeedX)<1)
		{
			iSpeedX=0;
		}
		
		if(Math.abs(iSpeedY)<1)
		{
			iSpeedY=0;
			iSpeedX*=0.95;
		}
		
		if(iSpeedY == 0 && iSpeedX==0 && t == floort)
		{
			clearInterval(timer);
			alert("停止了");
		}
		else
		{
			if(iSpeedX == 0)
			{
				currentdeg+=Math.ceil((floort-t)*0.008);
				currentdeg+=Math.abs(iSpeedY);
			}
			else
			{
				currentdeg+=iSpeedX;
			}
			currentdeg=currentdeg%360;
			
			oDiv.style.transform = 'rotate('+currentdeg+'deg)';
			oDiv.style.left = l + "px";
			oDiv.style.top = t + "px";
			document.title=oDiv.style.top+"---"+oDiv.offsetHeight+"---"+document.documentElement.clientHeight;
		}
	},30)
}