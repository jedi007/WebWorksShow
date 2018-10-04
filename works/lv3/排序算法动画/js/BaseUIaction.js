var Speed = 300;
var delaySpeed = 150;

var delaytime = 0;

var TimeOutIDs = [];

function UIswap(Lnumber, Rnumber){
	if(Lnumber == Rnumber)
		return;
	
	var timeoutID = setTimeout(function(){
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
	
	TimeOutIDs.push(timeoutID);
	
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
	var timeoutID = setTimeout(function(){
		$('#sortAnimateBox>li[data-val="' + number + '"]').addClass("tagone");
	},delaytime);
	TimeOutIDs.push(timeoutID);
	delaytime += delaySpeed;
}

function UIuntagone(number){
	var timeoutID = setTimeout(function(){
		$('#sortAnimateBox>li[data-val="' + number + '"]').removeClass("tagone");
	},delaytime);
	TimeOutIDs.push(timeoutID);
	delaytime += delaySpeed;
}

function UItagLR(number){
	var timeoutID = setTimeout(function(){
		$('#sortAnimateBox>li[data-val="' + number + '"]').addClass("tagLR");
	},delaytime);
	TimeOutIDs.push(timeoutID);
	delaytime += delaySpeed;
}

function UIuntagLR(number){
	var timeoutID = setTimeout(function(){
		$('#sortAnimateBox>li[data-val="' + number + '"]').removeClass("tagLR");
	},delaytime);
	TimeOutIDs.push(timeoutID);
	delaytime += delaySpeed;
}

function UIpopout(number){
	let jdom = $('#sortAnimateBox>li[data-val="' + number + '"]');
	
	let originalTop = jdom.css("top");
	jdom.get(0).originalTop = originalTop;
	
	var timeoutID = setTimeout(function(){
		jdom.animate({top:"350px"}, Speed);
	},delaytime);
	TimeOutIDs.push(timeoutID);
	delaytime += Speed + 50;
}

function UIpushback(number){
	let jdom = $('#sortAnimateBox>li[data-val="' + number + '"]');
	let originalTop = jdom.get(0).originalTop;
	
	var timeoutID = setTimeout(function(){
		jdom.animate({top:originalTop}, Speed);
	},delaytime);
	TimeOutIDs.push(timeoutID);
	delaytime += Speed + 50;
}

function UIswapHorizontal(Lnumber, Rnumber){
	if(Lnumber == Rnumber)
		return;
	
	var timeoutID = setTimeout(function(){
		console.log("----------------swap is runing");
	
		let leftD  = $('#sortAnimateBox>li[data-val="' + Lnumber + '"]');
		let rightD = $('#sortAnimateBox>li[data-val="' + Rnumber + '"]');
		let originalLeft   = leftD.css("left");
		let originalRight  = rightD.css("left");
		
		leftD.addClass("active");
		rightD.addClass("active");
		
		leftD.animate({left: originalRight}, Speed, function(){
			rightD.animate({left: originalLeft}, Speed, function(){
				leftD.removeClass("active");
				rightD.removeClass("active");
			});
		});
		
	},delaytime);
	
	TimeOutIDs.push(timeoutID);
	
	delaytime += Speed*2+100;
}
