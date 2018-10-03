var Speed = 300;
var delaySpeed = 150;

var delaytime = 0;


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
