function playSound(src){ 
	var _s = $("#snd"); 
	console.log(_s);
	if(src!='' && typeof src!=undefined){ 
		_s.attr('src',src);
	} 
};


var doneMatrix = new Array();
for(var i = 0;i < 20;i++)
{
	doneMatrix[i] = new Array();
	for(var j = 0;j<10;j++)
	{
		doneMatrix[i][j] = 0;
	}
}

var gamedivs = [];
var initGamediv = function (){
	var gamediv = $("#gamediv").get(0);
	for(var i = 0;i < 20;i++)
	{
		var gamedivr = [];
		for(var j = 0;j<10;j++)
		{
			var tdiv = document.createElement('div'); //1、创建元素 
			tdiv.className = "none";
			tdiv.style.top = (i*40) + "px";
			tdiv.style.left = (j*40) + "px";
			gamediv.appendChild(tdiv);
			gamedivr.push(tdiv);
		}
		gamedivs.push(gamedivr);
	}
}

var nextdivs = [];
var initNextdiv = function (){
	var nextdiv = $("#next").get(0);
	for(var i = 0;i < 4;i++)
	{
		var nextdivr = [];
		for(var j = 0;j<4;j++)
		{
			var tdiv = document.createElement('div'); //1、创建元素 
			tdiv.className = "none";
			tdiv.style.top = (i*40) + "px";
			tdiv.style.left = (j*40) + "px";
			nextdiv.appendChild(tdiv);
			nextdivr.push(tdiv);
		}
		nextdivs.push(nextdivr);
	}
}
$(function(){
	initGamediv();
	initNextdiv();
});

var refreshdoneMatrix = function (){
	for(var i = 0;i < 20;i++)
	{
		for(var j = 0;j<10;j++)
		{
			if(doneMatrix[i][j] == 1)
			{
				gamedivs[i][j].className = "done";
			}
			else
			{
				gamedivs[i][j].className = "none";
			}
		}
	}
}

var loadmodel = function (model){
	for(var i = 0;i < 4;i++)
	{
		for(var j = 0;j<4;j++)
		{
			if(model.data[i][j] == 1)
			{
				gamedivs[i+model.origin['x']][j+model.origin['y']].className = "done";
			}
		}
	}
	loadnextmodel(Nextmodel);
}

var loadnextmodel = function(nextmodel){
	for(var i = 0;i < 4;i++)
	{
		for(var j = 0;j<4;j++)
		{
			if(nextmodel.data[i][j] == 1)
			{
				nextdivs[i][j].className = "done";
			}
			else
			{
				nextdivs[i][j].className = "none";
			}
		}
	}
}

var CheckCouldMove = function (model){
	var mx = model.origin['x'];
	var my = model.origin['y'];
	for(var i = 0;i < 4;i++)
	{
		for(var j = 0;j<4;j++)
		{
			if(model.data[i][j] == 1)
			{
				if(i+mx > 19)//下边界检测
				{
					return false;
				}
				if(j+my < 0 || j+my > 9)//左右边界检测
				{
					return false;
				}
				if(doneMatrix[i+mx][j+my] == 1)//点位是否已被占领的检测
				{
					return false;
				}
			}
		}
	}
	return true;
}

var CheckDone = function (model){
	var mx = model.origin['x'];
	var my = model.origin['y'];
	var checkx = mx + 1;
	var checky = my + 1;
	for(var i = 0;i < 4;i++)
	{
		for(var j = 0;j<4;j++)
		{
			if(model.data[i][j] == 1)
			{
				if(i+checkx > 19 || doneMatrix[i+checkx][j+my] == 1)
				{
					MakeModelDone(model);
					Curmodel = Nextmodel;
					Nextmodel = new modelx();
					return true;
				}
			}
		}
	}
}

var MakeModelDone = function(model){
	var mx = model.origin['x'];
	var my = model.origin['y'];
	for(var i = 0;i < 4;i++)
	{
		for(var j = 0;j<4;j++)
		{
			if(model.data[i][j] == 1)
			{
				doneMatrix[i+mx][j+my] = 1;
			}
		}
	}
}

var CheckEliminate = function(){
	var ok = false;
	var num = 0;
	var continuescore = 0;
	for(var i = 0;i < 20;i++)
	{
		for(var j = 0;j<10;j++)
		{
			num += doneMatrix[i][j];
		}
		if(num == 10)
		{
			doneMatrix.splice(i,1);
			doneMatrix.splice(0,0,[0,0,0,0,0,0,0,0,0,0]);
			i--;
			continuescore++;
			ok =true;
		}
		num = 0;
	}
	if(ok)
	{
		playSound('sound/bang.wav');
		score += continuescore*continuescore;
		FallSpeed -= continuescore*8;
		console.log("FallSpeed  is changed : "+FallSpeed)
		window.clearInterval(FreefallID);
		FreefallID = window.setInterval("ondown()",FallSpeed);
	}
	return ok;
}

var CheckGameover = function (nextmodel){
	var mx = nextmodel.origin['x'];
	var my = nextmodel.origin['y'];
	for(var i = 0;i < 4;i++)
	{
		for(var j = 0;j<4;j++)
		{
			if(nextmodel.data[i][j] == 1 && doneMatrix[i+mx][j+my] == 1)
			{
				document.onkeydown = function(){};
				window.clearInterval(FreefallID);
				window.clearInterval(refreshTimeID);
				return true;
			}
		}
	}
	return false;
}

function sleep(d){
  for(var t = Date.now();Date.now() - t <= d;);
}

var refreshTime = function (){
	var elapsedTime = Math.floor((Date.now() - tBegin)/1000);
	$("#time>span").html(""+elapsedTime);
	$("#score>span").html(""+score*10);
}