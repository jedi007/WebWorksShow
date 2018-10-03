var SortArr = [];
var Speed = 1200;
var delaySpeed = 300;

var delaytime = 0;


function randomArrayText( len ){
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

function newSortArrayBar(){
	let html = "";
	let len = SortArr.length;
	for(let i = 0;i < len; i++)
	{
		html += getColumn(i+1, SortArr[i], len);
	}
	$("#sortAnimateBox").html(html);
};

function getColumn( indexi, number, len){
	return '<li class="column" style="height:'+parseInt(number/len*100)+'%;left:' + indexi*50 + 'px;" title="'+ number +'" data-val="'+ number +'" ></li>';
};

function UIswap(Lnumber, Rnumber){
	setTimeout(function(){
		console.log("----------------swap is runing");
	
		let leftD  = $('#sortAnimateBox>li[data-val="' + Lnumber + '"]');
		let rightD = $('#sortAnimateBox>li[data-val="' + Rnumber + '"]');
		let originalLeft   = leftD.css("left");
		let originalRight  = rightD.css("left");
		let originalRtop   = rightD.css("top");
		
		leftD.addClass("active");
		rightD.addClass("active");
		
		rightD.animate({top:"350px"}, Speed, function(){
			leftD.animate({left: originalRight}, Speed, function(){
				rightD.animate({left: originalLeft}, Speed, function(){
					rightD.animate({top: originalRtop}, Speed, function(){
							leftD.removeClass("active");
							rightD.removeClass("active");
					});
				});
			});
		});
	},delaytime);
	
	delaytime += Speed*4+100;
};

function UIactive(Lnumber, Rnumber){
	setTimeout(function(){
		actioningone(Lnumber);
	},delaytime);
	delaytime += delaySpeed;
	
	setTimeout(function(){
		actioningone(Rnumber);
	},delaytime);
	delaytime += delaySpeed;
}

function UIunactive(Lnumber, Rnumber, delaytimet){
	setTimeout(function(){
		unactioningone(Lnumber);
		unactioningone(Rnumber);
	},delaytime);
	delaytime += delaySpeed;
}

function actioningone(number){
	$('#sortAnimateBox>li[data-val="' + number + '"]').addClass("actioning");	
}

function unactioningone(number){
	$('#sortAnimateBox>li[data-val="' + number + '"]').removeClass("actioning");	
}
