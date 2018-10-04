var Speed = 300;
var delaySpeed = 150;

var delaytime = 0;


function UIswap(Lnumber, Rnumber){
	if(Lnumber == Rnumber)
		return;
	
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
	UItagLR(Lnumber);
	UItagLR(Rnumber);
}

function UIunactive(Lnumber, Rnumber){
	UIuntagLR(Lnumber);
	UIuntagLR(Rnumber);
}

function UItagone(number){
	setTimeout(function(){
		$('#sortAnimateBox>li[data-val="' + number + '"]').addClass("tagone");
	},delaytime);
	delaytime += delaySpeed;
}

function UIuntagone(number){
	setTimeout(function(){
		$('#sortAnimateBox>li[data-val="' + number + '"]').removeClass("tagone");
	},delaytime);
	delaytime += delaySpeed;
}

function UItagLR(number){
	setTimeout(function(){
		$('#sortAnimateBox>li[data-val="' + number + '"]').addClass("tagLR");
	},delaytime);
	delaytime += delaySpeed;
}

function UIuntagLR(number){
	setTimeout(function(){
		$('#sortAnimateBox>li[data-val="' + number + '"]').removeClass("tagLR");
	},delaytime);
	delaytime += delaySpeed;
}
