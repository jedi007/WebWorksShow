$(function(){
	$('.libtn').each(function(index){
		this.index = index;
		$(this).click(function(){
			console.log('clicked');						
			$('#maindiv div').eq(0).siblings().hide();					
			$(this).siblings().removeClass('actived');			
			$(this).toggleClass('actived');
			
			init_lvdiv(this.index);
		});
	});
});

function init_lvdiv(index){
	$('.lvdiv').eq(index).show();
	var listli = $('.lvdiv').eq(index).find('li');
	var floorH = $('.lvdiv li').eq(0).outerHeight(true);
	
	listli.stop();
	$('.lvdiv').eq(index).stop();
	listli.css('top','10px');
	
	$('.lvdiv').eq(index).height('40px');
	$('.lvdiv').eq(index).animate({height:(floorH*listli.size()+10)+'px'},1000);
	
//	var recursion = function(index){
//		if(index < listli.size())
//			listli.eq(index).animate({top:'+='+(floorH*index)+'px'},2000,recursion(index+1));//为什么没有在完成后调用？
//	}
//	recursion(1);
	
	listli.each(function(index){
		$(this).animate({top:(10+floorH*index)+'px'},1000);
	});
	
}

