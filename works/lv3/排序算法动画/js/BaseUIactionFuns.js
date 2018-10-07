var TimeOutIDs = [];
var UIanimatesarray = [];
var stepcount = -1;//初始值-1
var Speed = 300;
	
function UIdonextstep(){
	if(stepcount == -1)
	{
		console.log(UIanimatesarray);
	}
	
	stepcount++;
	console.log("do next step , stepcount : "+stepcount);
	if(stepcount >= UIanimatesarray.length)
		return;
		
	let fun = UIanimatesarray[stepcount].fun;
	if(typeof(fun) == "function")
		fun(UIanimatesarray[stepcount].args);
	else
		console.log("find its not a function  at stepcount : "+stepcount);
}

function newtimeoutAction(fun){
	var timeoutID = setTimeout(function(){
		fun();
		UIdonextstep();
	},Speed);
	TimeOutIDs.push(timeoutID);
}

function UIswap(args){
	if(args.length != 2)
		alert("error args.length in UIswap2, now step count is : "+stepcount);
	
	let Lnumber = args[0];
	let Rnumber = args[1];
	
	if(Lnumber == Rnumber)
	{
		UIdonextstep();
		return;
	}
		
	
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
						
						UIdonextstep();
				});
			});
		});
	});
};

function UItagLR(args){
	TagLR(args, true);
}

function UIuntagLR(args){
	TagLR(args, false);
}

function TagLR(args, Badd){
	if(args.length != 1)
		alert("error args.length in test, now step count is : "+stepcount);
	
	let number = args[0];
	
	newtimeoutAction(function(){
		if(Badd)
			$('#sortAnimateBox>li[data-val="' + number + '"]').css("background-color","red");
		else
			$('#sortAnimateBox>li[data-val="' + number + '"]').css("background-color","");
	});
}

function UItagone(args){
	Tagone(args, true);
}

function UIuntagone(args){
	Tagone(args, false);
}

function Tagone(args, Badd){
	if(args.length != 1)
		alert("error args.length in test, now step count is : "+stepcount);
	
	let number = args[0];
	
	newtimeoutAction(function(){
		if(Badd)
			$('#sortAnimateBox>li[data-val="' + number + '"]').addClass("tagone");
		else
			$('#sortAnimateBox>li[data-val="' + number + '"]').removeClass("tagone");
	});
}

function UIpopout(args){
	if(args.length != 1)
		alert("error args.length in test, now step count is : "+stepcount);
	
	let number = args[0];
	
	
	let tempdom = $('#sortAnimateBox>li[data-val="' + number + '"]');
	
	let originalTop = tempdom.css("top");
	tempdom.get(0).originalTop = originalTop;
	
	tempdom.animate({top:"350px"}, Speed, function(){
		UIdonextstep();
	});
}

function UIpushback(args){
	if(args.length != 1)
		alert("error args.length in test, now step count is : "+stepcount);
	
	let number = args[0];
	
	
	let tempdom = $('#sortAnimateBox>li[data-val="' + number + '"]');
	let originalTop = tempdom.get(0).originalTop;
	
	tempdom.animate({top:originalTop}, Speed, function(){
		UIdonextstep();
	});
}

function UIswapHorizontal(args){
	if(args.length != 2)
		alert("error args.length in UIswap2, now step count is : "+stepcount);
	
	let Lnumber = args[0];
	let Rnumber = args[1];
	
	if(Lnumber == Rnumber)
	{
		UIdonextstep();
		return;
	}
		
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
			
			UIdonextstep();
		});
	});
}

function ActiveShellGroup(args){
	newtimeoutAction(function(){
		for(let i = 0;i < args.length;i ++)
		{
			$('#sortAnimateBox>li[data-val="' + args[i] + '"]').addClass("shellGroup");
		}
	});
}

function UIshellGroup(start, step){
	var numbers = [];//因为当timeout执行时，SortAr已经变化了。所以要提前将调用该方法时的SortArr中的分组数存下来。
	for(let i = start;i < SortArr.length; i += step)
	{
		numbers.push(SortArr[i]);
	}
	
	UIanimatesarray.push({fun:ActiveShellGroup, args:numbers});
}

function UIuntagallshell(){
	newtimeoutAction(function(){
		for(let i = 0;i < SortArr.length;i ++)
		{
			$('#sortAnimateBox>li[data-val="' + SortArr[i] + '"]').removeClass("shellGroup");
		}
	});
}

function UIactive(Lnumber, Rnumber){
	UIanimatesarray.push({fun:UItagLR, args:[Lnumber]});
	UIanimatesarray.push({fun:UItagLR, args:[Rnumber]});
}

function UIunactive(Lnumber, Rnumber){
	UIanimatesarray.push({fun:UIuntagLR, args:[Lnumber]});
	UIanimatesarray.push({fun:UIuntagLR, args:[Rnumber]});
}
