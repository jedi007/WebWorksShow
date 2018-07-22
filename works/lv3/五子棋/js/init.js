$(function(){
	var lines = '';
	for(var i = 0; i< 15;i++)
	{
		var lingheight = i*40 + 40;
		lines += '<line x1="40"  y1='+lingheight+'   x2="600" y2='+lingheight+' style="stroke:rgb(0,0,0);stroke-width:1" />';
	}
	for(var i = 0; i< 15;i++)
	{
		var linx = i*40+40;
		lines += '<line x1="'+linx+'"  y1="40"   x2="'+linx+'" y2="600" style="stroke:rgb(0,0,0);stroke-width:1" />';
	}
	$("g").html(lines);
});

var checkerboard = new Array();
for(var i=0;i<15;i++){		
	checkerboard[i] = new Array();
	for(var j=0;j<15;j++){	
		checkerboard[i][j] = new Array();
		checkerboard[i][j][0] = 0;
		checkerboard[i][j][1] = 0;
	}
}

var steps = 0;
var TotalTime = 0,BlackTime = 0,WhiteTime = 0;
var t;
var bplaying = true;
function timedCount()
{
	if(bplaying)
	{
		t=setTimeout("timedCount()",100)
		TotalTime++;
		steps%2==0?BlackTime++:WhiteTime++;
		$('.timeboard>span').eq(0).html(TotalTime/10+"s");
		$('.timeboard>span').eq(1).html(BlackTime/10+"s");
		$('.timeboard>span').eq(2).html(WhiteTime/10+"s");
	}
}
timedCount();


$(function(){
	$("svg").click(function(e){
		console.log("in click------------------------");
		var ex = e.offsetX;
		var ey = e.offsetY;
		
		if( (0 <= ex%40 && ex%40 < 15) || (25 < ex%40 && ex%40 < 40) )
		{
			if( (0 <= ey%40 && ey%40 < 15) || (25 < ey%40 && ey%40 < 40) )
			{
				var col = Math.round(ex/40);
				var row = Math.round(ey/40);
				if(0 < col && col < 16 && 0 < row && row < 16 && checkerboard[row-1][col-1][0] != 1)
				{
					addchess(col,row);
				}
				else
				{
					console.log('there already have one chess');
				}
			}
		}
	});
});

function addchess(col,row){
	var color = 'black';
	if(steps%2 == 1)
	{
		color = 'white';
		checkerboard[row-1][col-1][0] = 2;
	}
	else
	{
		checkerboard[row-1][col-1][0] = 1;
	}
	
	var chesst = document.createElementNS("http://www.w3.org/2000/svg", "circle")
		chesst.setAttribute('cx', col*40);
		chesst.setAttribute('cy', row*40);
		chesst.setAttribute('r', 15);
		chesst.setAttribute('fill', color);
		chesst.setAttribute('stroke', 'black');
		chesst.setAttribute('stroke-width', 1);
		
	$('svg').append($(chesst));
	
	steps++;
	checkerboard[row-1][col-1][1] = steps;
	if(steps%2 == 0)
	{
		$(".nextinfoboard>span").css("background-color","black");
	}
	else
	{
		console.log("set white next");
		$(".nextinfoboard>span").css("background-color","white");
	}
	
	
	if(checkwin(checkerboard,row-1,col-1))
	{
		var strh = color+'  WIN!!!';
		strh = '<h1>'+strh+'</h1>';
		strh += '<button id="AgainBtn">Again</button>'
		var allhtml = $('body').html();
		allhtml = strh + allhtml;
		$('body').html(allhtml);
		$('#AgainBtn').click(function(){
			location.reload();
		});
	}
}

function checkwin(checkerboard,i,j){
	console.log("begin check win");
	if(checkColWin(checkerboard,i,j)      || checkRowWin(checkerboard,i,j) || 
	   checkLeftSkewWin(checkerboard,i,j) || checkRightSkewWin(checkerboard,i,j) )
	{
		bplaying = false;
		return true;
	}
}

function checkColWin(checkerboard,i,j){
	var continuous = 1;
	var ncolor = checkerboard[i][j][0];
	for(var ci = i-1;ci>=0;ci--)
	{
		if(ncolor == checkerboard[ci][j][0])
		{
			continuous++;
		}
		else
		{
			break;
		}
	}
	for(var ci = i+1;ci<15;ci++)
	{
		if(ncolor == checkerboard[ci][j][0])
		{
			continuous++;
		}
		else
		{
			break;
		}
	}
	if(continuous >= 5)
	{
		console.log(ncolor+'-----------------Col---WIN!!!---------------------');
		return true;
	}
}

function checkRowWin(checkerboard,i,j){
	var continuous = 1;
	var ncolor = checkerboard[i][j][0];
	for(var cj = j-1;cj>=0;cj--)
	{
		if(ncolor == checkerboard[i][cj][0])
		{
			continuous++;
		}
		else
		{
			break;
		}
	}
	for(var cj = j+1;cj<15;cj++)
	{
		if(ncolor == checkerboard[i][cj][0])
		{
			continuous++;
		}
		else
		{
			break;
		}
	}
	if(continuous >= 5)
	{
		console.log(ncolor+'-----------------RoW---WIN!!!----------------------');
		return true;
	}
}

function checkLeftSkewWin(checkerboard,i,j){
	var continuous = 1;
	var ncolor = checkerboard[i][j][0];
	for(var ci = i-1,cj = j-1;ci>=0 && cj>=0;ci--,cj--)
	{
		if(ncolor == checkerboard[ci][cj][0])
		{
			continuous++;
		}
		else
		{
			break;
		}
	}
	for(var ci = i+1,cj = j+1;ci<15 && cj<15;ci++,cj++)
	{
		if(ncolor == checkerboard[ci][cj][0])
		{
			continuous++;
		}
		else
		{
			break;
		}
	}
	if(continuous >= 5)
	{
		console.log(ncolor+'----------------LeftSkewWin---WIN!!!---------------------');
		return true;
	}
}

function checkRightSkewWin(checkerboard,i,j){
	var continuous = 1;
	var ncolor = checkerboard[i][j][0];
	for(var ci = i-1,cj = j+1;ci>=0 && cj<15;ci--,cj++)
	{
		if(ncolor == checkerboard[ci][cj][0])
		{
			continuous++;
		}
		else
		{
			break;
		}
	}
	for(var ci = i+1,cj = j-1;ci<15 && cj>=0;ci++,cj--)
	{
		if(ncolor == checkerboard[ci][cj][0])
		{
			continuous++;
		}
		else
		{
			break;
		}
	}
	if(continuous >= 5)
	{
		console.log(ncolor+'----------------RightSkewWin---WIN!!!---------------------');
		return true;
	}
}

$(function(){
	$(".controlboard>button").click(function(){
		console.log("悔棋 被点击");
		$("svg").children().last().remove();
		setTimeout(function(){
			$("svg").children().last().remove();
			for(var i = 0;i<15;i++)
			{
				for(var j = 0;j<15;j++)
				{
					if(checkerboard[i][j][1] == steps)
					{
						checkerboard[i][j][0] = 0;
						checkerboard[i][j][1] = 0;
					}
					else if(checkerboard[i][j][1] == steps-1)
					{
						checkerboard[i][j][0] = 0;
						checkerboard[i][j][1] = 0;
					}
				}
			}	
			steps -= 2;
		},500);
	});	
})