var g_timer = null;

window.onload=function()
{
	//left-------------------------------------------------------------------
	var oLlUL = document.getElementById("leftlist");
	var oLtitlelist = oLlUL.getElementsByClassName("Ltitle");
	
	for(var i = 0;i < oLtitlelist.length;i++)
	{
		oLtitlelist[i].onclick = function ()
		{
			var own = this.nextElementSibling;
			if(own.style.display != "block")
			{
				var oAllcontent = document.getElementsByClassName("left_list_content");
				for(var i = 0;i < oAllcontent.length;i++)
				{
					oAllcontent[i].style.display = "none";
				}
				own.style.display = "block";
			}
			else
			{
				own.style.display = "none";
			}
		}
	}
	
	//right-------------------------------------------------------------------
	// var oright_p = document.getElementsByClassName("right_p");
	// for(var i = 0;i < oright_p.length;i++)
	// {
		// oright_p[i].parentElement.onmouseover = function ()
		// {
			// this.children[1].style.display = "block";
			// this.children[2].style.display = "block";
		// }
		// oright_p[i].parentElement.onmouseout = function ()
		// {
			// this.children[1].style.display = "none";
			// this.children[2].style.display = "none";
		// }
	// }
	
	//CSS中hover替代这段代码
	// var oright_a = document.getElementsByClassName("lv1a");
	// console.log("oright_a.length:"+oright_a.length);
	// for(var i = 0;i < oright_a.length;i++)
	// {
		// oright_a[i].parentElement.onmouseover = function ()
		// {
			// this.children[1].style.display = "block";
		// }		
		// oright_a[i].parentElement.onmouseout = function ()
		// {
			// this.children[1].style.display = "none";
		// }
	// }

}