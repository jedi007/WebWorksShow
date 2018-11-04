function CheckCouldMove(model, x, y){
	
	let len = model.data.length;
	let mx = model.origin['x'] + x;
	let my = model.origin['y'] + y;
	
	for(var i = 0; i < len; i++)
	{
		for(var j =0; j < len; j++)
		{
			if(model.data[i][j] == 1)
			{
				if(i+mx < 0 || i+mx >= gsMatrixRows)//上下边界检测
				{
					return false;
				}
				if(j+my < 0 || j+my >= gsMatrixCols)//左右边界检测
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

function uptoDoneMatrix(model){
	let len = model.data.length;
	let mx = model.origin['x'];
	let my = model.origin['y'];
	
	for(var i = 0; i < len; i++)
	{
		for(var j =0; j < len; j++)
		{
			if(model.data[i][j] == 1)
			{
				doneMatrix[i+mx][j+my] = 1
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
			//i--;//因为删掉了当前行
			continuescore++;
			ok =true;
			app.score += 100;
		}
		num = 0;
	}
	if(ok)
	{
//		playSound('sound/bang.wav');
//		score += continuescore*continuescore;
//		FallSpeed -= continuescore*8;
//		console.log("FallSpeed  is changed : "+FallSpeed)
//		window.clearInterval(FreefallID);
//		FreefallID = window.setInterval("ondown()",FallSpeed);
	}
	return ok;
}

function onup(){
	app.currentmodel.exchange(1);
	if( !CheckCouldMove(app.currentmodel, 0, 0) )
	{
		app.currentmodel.exchange(-1);
	}
}
function ondown(){
	if( CheckCouldMove(app.currentmodel, 1, 0) )
	{
		app.currentmodel.origin['x'] = app.currentmodel.origin['x'] + 1;
	}
	setTimeout(function(){
        if( !CheckCouldMove(app.currentmodel, 1, 0) )
		{
			uptoDoneMatrix(app.currentmodel);
			
			CheckEliminate();
			
			app.currentmodel = app.nextmodel;
			if( CheckCouldMove(app.currentmodel, 1, 0) )
			{
				app.nextmodel = createModel();
				console.log("----- show sync value: " + app.speed.value);
			}
			else
			{
				stopfall();
				window.clearInterval(SettimeID);
				
				if(document.onkeydown)
				{
					setTimeout(function(){
						alert("game over");
					},100);
				}
				document.onkeydown = null;
				
			}
		}
	},FallSpeed*0.5);
}
function onleft(){
	if( CheckCouldMove(app.currentmodel, 0, -1) )
	{
		app.currentmodel.origin['y'] = app.currentmodel.origin['y'] - 1;
	}
}
function onright(){
	if( CheckCouldMove(app.currentmodel, 0, 1) )
	{
		app.currentmodel.origin['y'] = app.currentmodel.origin['y'] + 1;
	}
}

function beginfall(){
	FreefallID = window.setInterval("ondown()",FallSpeed*( (101-app.speed.value)/100) );
}

function stopfall(){
	window.clearInterval(FreefallID);
}
