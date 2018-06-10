var Degree_Difficulty = 8;


var model1 = [ [[0,1,0,0],
			    [1,1,1,0],
			    [0,0,0,0],
			    [0,0,0,0]],
			   [[0,1,0,0],
			    [0,1,1,0],
			    [0,1,0,0],
			    [0,0,0,0]],
			 ];
var model2 = [ [[1,0,0,0],
			    [1,1,1,0],
			    [0,0,0,0],
			    [0,0,0,0]],
			   [[1,1,0,0],
			    [1,0,0,0],
			    [1,0,0,0],
			    [1,0,0,0]],
			 ];
var model3 = [ [[0,1,0,0],
			    [0,1,0,0],
			    [0,1,0,0],
			    [0,1,0,0]],
			   [[0,0,0,0],
			    [1,1,1,1],
			    [0,0,0,0],
			    [0,0,0,0]],
			 ];
var model4 = [ [[0,1,1,0],
			    [0,1,1,0],
			    [0,0,0,0],
			    [0,0,0,0]],
			   [[0,0,0,0],
			    [1,1,1,1],
			    [0,0,0,0],
			    [0,0,0,0]],
			 ];	
var model5 = [ [[0,1,0,0],
			    [0,0,0,0],
			    [0,0,0,0],
			    [0,0,0,0]],
			   [[0,0,0,0],
			    [1,1,1,1],
			    [0,0,0,0],
			    [0,0,0,0]],
			 ];		
var model6 = [ [[0,0,1,0],
			    [1,1,1,0],
			    [0,0,0,0],
			    [0,0,0,0]],
			   [[0,1,1,0],
			    [0,0,1,0],
			    [0,0,1,0],
			    [0,0,0,0]],
			 ];	
var model7 = [ [[0,0,0,0],
			    [0,1,1,0],
			    [1,1,0,0],
			    [0,0,0,0]],
			   [[0,1,0,0],
			    [0,1,1,0],
			    [0,0,1,0],
			    [0,0,0,0]],
			 ];	
var model8 = [ [[0,0,0,0],
			    [1,1,0,0],
			    [0,1,1,0],
			    [0,0,0,0]],
			   [[0,0,1,0],
			    [0,1,1,0],
			    [0,1,0,0],
			    [0,0,0,0]],
			 ];	
var model9 = [ [[1,0,0,0],
			    [1,0,0,0],
			    [1,1,1,0],
			    [0,0,0,0]],
			   [[1,1,1,0],
			    [1,0,0,0],
			    [1,0,0,0],
			    [0,0,0,0]],
			 ];	
var model10 = [ [[1,1,1,0],
			     [0,1,0,0],
			     [1,1,1,0],
			     [0,0,0,0]],
			   [[1,0,1,0],
			    [1,1,1,0],
			    [1,0,1,0],
			    [0,0,0,0]],
			 ];
var model11 = [ [[1,1,1,0],
			     [1,0,1,0],
			     [1,1,1,0],
			     [0,0,0,0]],
			   [[1,1,1,0],
			    [1,0,1,0],
			    [1,1,1,0],
			    [0,0,0,0]],
			 ];

var models = new Array();
models[0] = model1;
models[1] = model2;
models[2] = model3;
models[3] = model4;
models[4] = model5;
models[5] = model6;
models[6] = model7;
models[7] = model8;
models[8] = model9;
models[9] = model10;
models[10] = model11;

var modelx = function () {
	var indexi = Math.round(Math.random()*Degree_Difficulty*3);
	indexi = indexi%Degree_Difficulty;
	if(indexi>7)
	{
		indexi = Math.round(Math.random()*Degree_Difficulty*3);
		indexi = indexi%Degree_Difficulty;
		if(indexi<(Degree_Difficulty-1))
			indexi = indexi + 1;
	}
	this.data = models[indexi][0];
	this.origin = {x:0,y:2}
}


var turnright = function(tmpmodel){
	var returnmodel = new Array();
	for(var i = 0;i < tmpmodel.length;i++)
	{
		returnmodel[i] = new Array();
		for(var j = 0;j < 4;j++)
		{
			returnmodel[i][j] = tmpmodel[3-j][i];
		}
	}
	return returnmodel;
}

var Curmodel = new modelx();
var Nextmodel = new modelx();
