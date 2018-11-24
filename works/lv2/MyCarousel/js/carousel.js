;(function(){
		
})();

var Mcarousel = function(jq){
		console.log('Mcarousel is called');
		
		var images = this.images = jq.find('li');
		var position_array = this.position_array = [];
		
		
		var len = images.size();
		if(len%2==0)
		{
			images.last().parent().append(images.first().clone());
			images = this.images = jq.find('li');
		}
		
		var mid_index = Math.floor(len/2);
		var initwidth = 0.66;
		
		var scale = 0.9;
		var opacityscale = Math.pow(0.2, 1/mid_index );
		var step_left = (1-initwidth)/2/mid_index;
		
		for(var i = 0;i < images.size();i++)
		{
			var coe = Math.pow(scale, Math.abs(i-mid_index) );
			var opacitycoe = Math.pow(opacityscale, Math.abs(i-mid_index) );// 底数:6*6*6*6=1296,Math.pow(1296,1/4)=6
			var width = initwidth*coe,left;
			if( i <= mid_index )
			{
				left = i*step_left;
			}
			else
			{
				left = 1 - (images.size()-1-i)*step_left - width;//(images.size()-1-i)*step_left: 距离右边边框的距离
			}
			position_array[i] = {
									"width"  : width,
									"left"   : left,
									"zIndex" : 100-Math.abs(i-mid_index),
									"opacity": opacitycoe/opacityscale
							}
		}
		this.autoplay("right",0);
		
		var _this = this;
		this.timer = window.setInterval(function(){
			_this.autoplay("left",500);
		},1000);
}

Mcarousel.prototype = {
	init:function(jq){
		console.log('i\'m called by init');
		console.log(jq);
	},
	autoplay:function(direction,speed)
	{
		var images = this.images;
		var len = images.size();
		
		if(direction == "right")
		{
			var first = this.position_array[0];
			this.position_array.splice(0, 1);
			this.position_array.push(first);
		}
		else
		{
			var last = this.position_array[len-1];
			this.position_array.splice(len-1, 1);
			this.position_array.unshift(last);
		}
		
		for(var i =0;i < images.length; i++)
		{
			images.eq(i).css("zIndex",this.position_array[i].zIndex);
			images.eq(i).animate({
				   				width:100*this.position_array[i].width+"%",
									left:100*this.position_array[i].left+"%",
									opacity:this.position_array[i].opacity
								},
								speed,
								function(){
									console.log("animate over");
									
								});
		}
		
	}
	
}
