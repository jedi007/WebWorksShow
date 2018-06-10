var oDiv=null;
var oUl=null;
var Lilist=null;
var timer=null;
var speed = 2;
var global_pause = true;
var g_iPauseTime = 1000;
window.onload=function()
{
	var oChk=document.getElementById('chk_pause');
	global_pause = oChk.getElementsByTagName("input")[0].checked;
	oChk.getElementsByTagName("input")[0].onchange = function ()
	{
		global_pause = this.checked;
	}
	
	var global=document.getElementsByClassName("global");
	global[0].style.left="200px";
	global[0].style.top="200px";
				
	oDiv=document.getElementById("rolldiv");
	oUl=oDiv.getElementsByTagName("ul")[0];
	oUl.innerHTML+=oUl.innerHTML;
	
	Lilist=document.getElementsByTagName("li");
	oUl.style.width=Lilist[0].offsetWidth*Lilist.length+'px';
	
	for(var i = 0;i < Lilist.length;i++)
	{
		Lilist[i].onmousemove = function ()
		{
			clearInterval(timer);
		}
		Lilist[i].onmouseout = function ()
		{
			startmove();
		}
	}
	
	var btnleft=document.getElementsByClassName("btn_left");
	var btnright=document.getElementsByClassName("btn_right");
	btnleft[0].onmousemove = function()
	{
		speed = Math.abs(speed);
		console.log("im working");
	}
	btnright[0].onmousemove = function()
	{
		speed = -Math.abs(speed);
		console.log("im working");
	}
	
	startmove();
	
	console.log("onloadfunction is down");
	
	var select_speed = document.getElementById("sel_speed")
	select_speed.onchange = function()
	{
		speed = parseInt(this.value);
	}
	

}


function startmove()
{
	clearInterval(timer);
	timer=setInterval(
	function()
	{
		var targetL=oUl.offsetLeft-speed;
		
		if(speed > 0)
		{
			if(targetL<=-oUl.offsetWidth/2)
			{
				targetL+=oUl.offsetWidth/2;
			}
		}
		else
		{
			if(targetL>=0)
			{
				targetL-=oUl.offsetWidth/2;
			}
		}			

		if(global_pause)
		{
			if(Math.abs(targetL%Lilist[0].offsetWidth)<Math.abs(speed))
			{
				clearInterval(timer);
				targetL=-Math.round(-targetL/Lilist[0].offsetWidth)*Lilist[0].offsetWidth;
				g_iPauseTime = parseInt(document.getElementById("pause_time").value);
				setTimeout
				(
					function ()
					{
						startmove();
					}, g_iPauseTime
				);
			}
		}
		oUl.style.left=targetL+"px";
	}
	,30);
}