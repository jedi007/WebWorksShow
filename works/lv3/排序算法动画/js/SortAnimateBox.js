var SortArr = [];


function randomArrayText( len ){
	clearSortArrayBar();
	$("#sortText").html("等待选择排序算法");
		
	len = len || 50;
	SortArr.splice(0,SortArr.length);
	delaytime = 0;
	for(var i=1; i<parseInt(len)+1;i++){
		SortArr.push( i );
	}
	SortArr.sort(function(){
		return Math.random() - 0.5;
	});
	$("#arrayText").val("["+ SortArr.toString() +"]");
		
	newSortArrayBar();
};

function clearSortArrayBar(){
	for(let i = 0; i< TimeOutIDs.length; i++)
	{
		clearTimeout(TimeOutIDs[i]);
	}
	TimeOutIDs.splice(0,TimeOutIDs.length);
	$("#sortAnimateBox>li").stop(true,true);
	$("#sortAnimateBox").html("");
}

function newSortArrayBar(){
	let html = "";
	let len = SortArr.length;
	for(let i = 0;i < len; i++)
	{
		html += getColumn(i, SortArr[i], len);
	}
	$("#sortAnimateBox").html(html);
};

function getColumn( indexi, number, len){
	return '<li class="column" style="height:'+parseInt(number/len*100)+'%;left:' + indexi*27 + 'px;" title="'+ number +'" data-val="'+ number +'" >' + number + '</li>';
};