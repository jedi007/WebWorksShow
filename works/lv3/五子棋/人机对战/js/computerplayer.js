var computerplayer = function(){
	this.computerstep = function (steps,cboard)
	{
		var color = ( steps%2 == 0?1:-1 );
		
		var beststep      = {i:-1,j:-1,score:-1};
		var enemybeststep = {i:-1,j:-1,score:-1};//对方的最佳落子点
		
		for(var i =0;i < 15;i++)
		{
			for(var j = 0;j<15;j++)
			{				
				if(cboard[i][j][0] == 0)
				{
					var score      = getscore(cboard,i,j,color);
					var enemyscore = getscore(cboard,i,j,-color);
					if(beststep.score < score )
					{
						beststep.i = i;
						beststep.j = j;
						beststep.score = score;
						console.log(beststep);
					}
					if(enemybeststep.score < enemyscore )
					{
						enemybeststep.i = i;
						enemybeststep.j = j;
						enemybeststep.score = enemyscore;
						console.log(enemybeststep);
					}
				}
			}
		}
		if(beststep.score >= 10000)
			return beststep;
		else if(enemybeststep.score >= 10000)
		{
			return enemybeststep;
		}
		else if(beststep.score >= 1000)
			return beststep;
		else if(enemybeststep.score >= 1000)
		{
			return enemybeststep;
		}
		else
			return beststep;
		
	}
	
	function getscore(cboard,i,j,color){
		return getRowScore(checkerboard,i,j,color)
			  +getColScore(checkerboard,i,j,color)
			  +getLeftSkewScore(checkerboard,i,j,color)
			  +getRightSkewScore(checkerboard,i,j,color);
	}
	
	var scoreArry = [0,1,10,100,1000,10000]
	
	function getRowScore(checkerboard,i,j,ncolor){
		var continuous = 1;
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
		return scoreArry[continuous];
	}

	function getColScore(checkerboard,i,j,ncolor){
		var continuous = 1;
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
		return scoreArry[continuous];
	}

	function getLeftSkewScore(checkerboard,i,j,ncolor){
		var continuous = 1;
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
		return scoreArry[continuous];
	}

	function getRightSkewScore(checkerboard,i,j,ncolor){
		var continuous = 1;
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
		return scoreArry[continuous];
	}

}

function deepcopy(obj) {
    var out = [],i = 0,len = obj.length;
    for (; i < len; i++) {
        if (obj[i] instanceof Array){
            out[i] = deepcopy(obj[i]);
        }
        else out[i] = obj[i];
    }
    return out;
}

var complayer = new computerplayer();