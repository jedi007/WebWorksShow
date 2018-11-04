
for(var i = 0;i < gsMatrixRows;i++)
{
	doneMatrix[i] = new Array();
	for(var j = 0;j<gsMatrixCols;j++)
	{
		doneMatrix[i][j] = 0;
	}
}

var initGamediv = function (){
	var html = $("#gamediv").html();
	for(var i = 0;i < gsMatrixRows;i++)
	{
		for(var j = 0;j<gsMatrixCols;j++)
		{
			html += '<div :class="(nowarray['+i+']['+j+'] || currentmodel.transform('+i+','+j+'))? \'pixelmodel1\' : \'pixelmodel0\' " ' +
					':style="{top:cellHeight*'+i+'+\'px\', left:cellWidth*'+j+'+\'px\', '+
					'width:cellWidth+\'px\', height:cellHeight+\'px\'}"></div>';
		}
	}
	$("#gamediv").html(html);
}

var initNextdiv = function(){
	var html = $("#nextdiv").html();
	for(var i = 0;i < 4;i++)
	{
		for(var j = 0;j<4;j++)
		{
			html += '<div :class="nextmodel.data['+i+']['+j+']? \'pixelmodel1\' : \'pixelmodel0\' " ' +
					':style="{top:cellHeight*'+i+'+\'px\', left:cellWidth*'+j+'+\'px\', '+
					'width:cellWidth+\'px\', height:cellHeight+\'px\'}"></div>';
		}
	}
	$("#nextdiv").html(html);
}


$(function(){
	initGamediv();
	initNextdiv();
	
	var infoboard = {
        template: "#infoboard",
        props: ['usetime','score','cspeed','cdiflv','pwidth','pheight'],
        watch: {
            'cspeed.value': function (newV, oldV) {
                console.log("in child : the value changed from "+oldV +" to " + newV);
                stopfall();
                beginfall();
            },
            'cdiflv.value': function (newV, oldV) {
            	DifficultyLv = 7 + 1*newV;
            }
        }
    };
    app = new Vue({
        el: '#gamediv',
        components: {infoboard},
        watch: {
            'speed.value': function (newV, oldV) {
                console.log("in father : the value changed from "+oldV +" to " + newV);
            }
        },
        data: {
        	currentmodel:createModel(),
        	nextmodel:createModel(),
        	nowarray:doneMatrix,
        	cellWidth:cellWidth,
        	cellHeight:cellHeight,
        	gsMatrixRows:gsMatrixRows,
        	gsMatrixCols:gsMatrixCols,
        	usetime:0,
        	score:0,
        	speed:{value:1},  //实测值为一个对象才能使用.sync实现父子组件同步
        	difficutyLv:{value:1}
        	
        }
        
    });
    
    beginfall();
	SettimeID = setInterval(function(){
		app.usetime = (Date.now() - tBegin)/1000;
	},100)
});