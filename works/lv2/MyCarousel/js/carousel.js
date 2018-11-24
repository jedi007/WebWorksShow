;var Mcarousel = function(jq){
		console.log('Mcarousel is called');
		var _this = this;
		this.init_btn(jq,this);
		
		var images = this.images = jq.find('ul>li');
		var position_array = this.position_array = [];
		
		var len = images.size();
		if(len%2==0)
		{
			images.first().clone().insertBefore(images.eq(Math.ceil(len/2)));
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
							};
							
			images.eq(i).hover(
				function () {
					window.clearInterval(_this.timer);
				},
				function () {
					_this.timer = window.setInterval(function(){
										_this.autoplay(_this.dataarrow,500);
									},1000);
				}
			);
		}
		
		this.dataarrow = "right";
		this.autoplay(_this.dataarrow,0);
		
		this.timer = window.setInterval(function(){
			_this.autoplay(_this.dataarrow,500);
		},1000);
}

Mcarousel.prototype = {
	init_btn:function(jq,_this){
		$('<div class="arrow-btn" data-arrow="left" style="position:absolute;top:0;left:0; width:60px;height:100%; cursor:pointer;  opacity:0.3; background: url(\'./img/btn_l.png\') no-repeat center center;z-index:1000; "></div>').insertBefore(jq.find("ul"));
		$('<div class="arrow-btn" data-arrow="right" style="position:absolute;top:0;right:0; width:60px;height:100%; cursor:pointer;  opacity:0.3; background: url(\'./img/btn_r.png\') no-repeat center center;z-index:1000; "></div>').insertBefore(jq.find("ul"));		
		
		$(".arrow-btn").each(function(){
			$(this).click(function(){
				_this.dataarrow = $(this).attr("data-arrow");
				console.log(_this.dataarrow+"btn clicked");
				window.clearInterval(_this.timer);
				
				_this.timer = window.setInterval(function(){
					_this.autoplay(_this.dataarrow,500);
				},1000);
			});
			
			$(this).hover(
				function () {
					$(this).css("opacity",1);
				},
				function () {
				$(this).css("opacity",0.3);
				}
			);
		});
	},
	autoplay:function(direction,speed)
	{
		var images = this.images;
		var len = images.size();
		
		console.log("direction:"+direction);
		
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
		
// 		images.each(function(){
// 			$(this).stop(true,true);
// 		});
		
		for(var i =0;i < images.length; i++)
		{
			images.eq(i).css("zIndex",this.position_array[i].zIndex);
			images.eq(i).animate({
				   				width:100*this.position_array[i].width+"%",
									left:100*this.position_array[i].left+"%",
									opacity:this.position_array[i].opacity
								},
								speed);
		}
	}
}
